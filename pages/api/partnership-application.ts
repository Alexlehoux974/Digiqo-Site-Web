import type { NextApiRequest, NextApiResponse } from 'next'
import { computePartnershipScore } from '../../lib/partnership-scoring'
import { checkRateLimit } from '../../lib/rate-limit'
import { formatPhoneForDisplay } from '../../lib/phone-formatter'
import { formeJuridiqueToHubSpot } from '../../lib/hubspot-forme-juridique-map'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
}

// Configuration HubSpot
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || ''
const HUBSPOT_API_URL = 'https://api.hubapi.com'
const MAXIME_SIN_OWNER_ID = '30783659'
const N8N_WEBHOOK_URL = process.env.N8N_PARTNERSHIP_WEBHOOK_URL || ''

async function createOrUpdateHubSpotContact(formData: any) {
  const email = formData.email
  if (!email) return null

  try {
    const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{ propertyName: 'email', operator: 'EQ', value: email.toLowerCase().trim() }]
        }]
      })
    })

    if (!searchResponse.ok) return null
    const searchData = await searchResponse.json()

    const contactProperties: any = {
      email: email.toLowerCase().trim(),
      firstname: formData.prenom || '',
      lastname: formData.nom || '',
      phone: formatPhoneForDisplay(formData.telephone),
      city: formData.villeZone || '',
      hubspot_owner_id: MAXIME_SIN_OWNER_ID,
      digiqo_form_source: 'partenariats',
      hs_lead_status: 'NEW',
      digiqo_consent_marketing: formData.consent === true ? 'true' : 'false'
    }

    const formeJuridique = formeJuridiqueToHubSpot(formData.companyType || formData.project?.companyType)
    if (formeJuridique) {
      contactProperties.forme_juridique_de_l_entreprise = formeJuridique
    }

    if (searchData.total > 0) {
      const contactId = searchData.results[0].id
      const existingOwner = searchData.results[0].properties?.hubspot_owner_id
      const updateProperties: any = { ...contactProperties }
      if (existingOwner) delete updateProperties.hubspot_owner_id

      await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: updateProperties })
      })
      console.log('Partnership — HubSpot contact updated:', contactId)
      return contactId
    } else {
      const createResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: contactProperties })
      })

      if (!createResponse.ok) {
        const errorText = await createResponse.text()
        console.error('Erreur création contact HubSpot partnership:', createResponse.status, errorText)
        return null
      }

      const createData = await createResponse.json()
      console.log('Partnership — HubSpot contact created:', createData.id)
      return createData.id
    }
  } catch (error) {
    console.error('Erreur HubSpot partnership:', error)
    return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkRateLimit(req, res)) return

  try {
    const formData = req.body

    if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
      return res.status(400).json({ error: 'Un email valide est requis.' })
    }

    if (formData.honeypot) {
      return res.status(200).json({ success: true })
    }

    const score = computePartnershipScore(formData)
    const isAthlete = formData.profileType === 'athlete'
    const profileLabel = isAthlete ? 'ATHLETE' : 'SPEAKER'
    const specialite = isAthlete ? formData.athDiscipline : formData.spkType
    const budget = [
      formData.budgetParMois && `${formData.budgetParMois}EUR/mois`,
      formData.budgetParEvenement && `${formData.budgetParEvenement}EUR/event`,
      formData.budgetParSaison && `${formData.budgetParSaison}EUR/saison`,
    ].filter(Boolean).join(' + ') || 'Non précisé'

    const emailSubject = `[CANDIDATURE][${profileLabel}] ${formData.prenom} ${formData.nom} – ${specialite} – ${budget}`

    const allFiles: { field: string; name: string; size: number }[] = []
    const fileFields = [
      'capturesInsights', 'athMediaKit', 'athPhotosHD',
      'spkShowreelFile', 'spkPhotosEvenement', 'spkPlaquetteDossier',
    ]
    for (const field of fileFields) {
      const files = formData[field]
      if (Array.isArray(files)) {
        files.forEach((f: any) => {
          if (f?.name) allFiles.push({ field, name: f.name, size: f.size || 0 })
        })
      }
    }

    // 1. HubSpot contact
    let hubspotContactId = null
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
        hubspotContactId = await createOrUpdateHubSpotContact(formData)
      } catch (error) {
        console.error('HubSpot partnership error:', error)
      }
    }

    // 2. POST webhook n8n (silent fail si URL vide)
    const payload = {
      source: 'partnership-application',
      timestamp: new Date().toISOString(),
      hubspot_contact_id: hubspotContactId,
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        origin: req.headers.origin || req.headers.referer || 'unknown',
      },
      email: {
        to: 'partenariats@digiqo.fr',
        subject: emailSubject,
      },
      score: {
        total: score.total,
        details: {
          audiencePreuves: `${score.audiencePreuves}/30`,
          calendrierConfirme: `${score.calendrierConfirme}/25`,
          contrepartiesQuantifiees: `${score.contrepartiesQuantifiees}/25`,
          brandFitRisques: `${score.brandFitRisques}/20`,
        },
      },
      summary: {
        profil: formData.profileType,
        type: formData.partnershipType,
        nom: `${formData.prenom} ${formData.nom}`,
        email: formData.email,
        telephone: formData.telephone,
        ville: formData.villeZone,
        budget,
        duree: formData.dureeSouhaitee ? `${formData.dureeSouhaitee} mois` : 'Non précisé',
        specialite,
        fichiers: allFiles.length > 0 ? allFiles.map(f => f.name).join(', ') : 'Aucun',
      },
      formData,
    }

    if (N8N_WEBHOOK_URL) {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify(payload),
        })
      } catch (e) {
        // silent fail
      }
    }

    return res.status(200).json({ success: true, hubspotContactId })
  } catch (error) {
    console.error('[Partnership] Error:', error)
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
