import type { NextApiRequest, NextApiResponse } from 'next'
import { computePartnershipScore } from '../../lib/partnership-scoring'
import { checkRateLimit } from '../../lib/rate-limit'
import { submitDigiqoForm } from '../../lib/hubspot-forms-api'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
}

const N8N_WEBHOOK_URL = process.env.N8N_PARTNERSHIP_WEBHOOK_URL || ''

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

    // 1. Soumettre à HubSpot Forms API
    const extraFields: Array<{ name: string; value: string }> = []
    if (formData.villeZone) extraFields.push({ name: 'city', value: formData.villeZone })

    await submitDigiqoForm({
      source: 'partenariats',
      email: formData.email,
      firstName: formData.prenom,
      lastName: formData.nom,
      phone: formData.telephone,
      companyType: formData.companyType || formData.project?.companyType,
      consent: formData.consent === true,
      pageUri: 'https://digiqo.fr/partenariats',
      pageName: 'Digiqo - Partenariats',
      extraFields,
    })

    // 2. POST webhook n8n (silent fail si URL vide)
    const payload = {
      source: 'partnership-application',
      timestamp: new Date().toISOString(),
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

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[Partnership] Error:', error)
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
