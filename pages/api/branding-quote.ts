import { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'
import { formatPhoneForDisplay } from '../../lib/phone-formatter'
import { servicesToHubSpot } from '../../lib/hubspot-services-map'
import { formeJuridiqueToHubSpot } from '../../lib/hubspot-forme-juridique-map'
import { createContactNote } from '../../lib/hubspot-notes'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Configuration HubSpot
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || ''
const HUBSPOT_API_URL = 'https://api.hubapi.com'
const MAXIME_SIN_OWNER_ID = '30783659'

async function createOrUpdateHubSpotContact(formData: any) {
  const email = formData.contact?.email
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
      firstname: formData.contact?.firstName || '',
      lastname: formData.contact?.lastName || '',
      phone: formatPhoneForDisplay(formData.contact?.phone),
      company: formData.project?.companyName || formData.brand?.name || '',
      hubspot_owner_id: MAXIME_SIN_OWNER_ID,
      digiqo_form_source: 'devis-branding',
      hs_lead_status: 'NEW',
      digiqo_services_souhaites: servicesToHubSpot(formData.project?.services),
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
      console.log('Branding quote — HubSpot contact updated:', contactId)
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
        console.error('Erreur création contact HubSpot branding:', createResponse.status, errorText)
        return null
      }

      const createData = await createResponse.json()
      console.log('Branding quote — HubSpot contact created:', createData.id)
      return createData.id
    }
  } catch (error) {
    console.error('Erreur HubSpot branding:', error)
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

    const contactEmail = formData.contact?.email
    if (!contactEmail || !EMAIL_REGEX.test(contactEmail)) {
      return res.status(400).json({ error: 'Un email valide est requis dans le contact.' })
    }

    // 1. HubSpot contact
    let hubspotContactId = null
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
        hubspotContactId = await createOrUpdateHubSpotContact(formData)
      } catch (error) {
        console.error('HubSpot branding error:', error)
      }
    }

    if (hubspotContactId) {
      await createContactNote(hubspotContactId, {
        source: 'Devis Branding',
        firstName: formData.contact?.firstName,
        lastName: formData.contact?.lastName,
        email: formData.contact?.email,
        phone: formData.contact?.phone,
        company: formData.brand?.name || formData.project?.companyName,
        companyType: formData.project?.companyType,
        services: ['branding'],
        description: formData.project?.description || formData.brand?.vision,
        consent: formData.contact?.consent === true,
      })
    }

    // 2. POST webhook n8n (silent fail si URL vide)
    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'branding-quote-form',
      email: { to: 'devis@digiqo.fr' },
      data: formData,
      hubspot_contact_id: hubspotContactId,
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        origin: req.headers.origin || req.headers.referer
      }
    }

    const webhookUrl = process.env.N8N_BRANDING_WEBHOOK_URL || ''
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify(webhookData)
        })
      } catch (e) {
        // silent fail
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Votre demande de devis branding a été envoyée avec succès',
      hubspotContactId
    })

  } catch (error) {
    console.error('Error submitting branding quote form:', error)
    return res.status(200).json({
      success: true,
      message: 'Votre demande a été enregistrée'
    })
  }
}
