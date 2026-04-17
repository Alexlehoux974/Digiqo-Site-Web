import { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Configuration HubSpot
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || ''
const HUBSPOT_API_URL = 'https://api.hubapi.com'
const MAXIME_SIN_OWNER_ID = '30783659'

async function createOrUpdateHubSpotContact(formData: any) {
  const email = formData.email
  if (!email) return null

  try {
    // Recherche contact existant
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

    if (!searchResponse.ok) {
      console.error('Erreur recherche HubSpot contact:', searchResponse.status)
      return null
    }

    const searchData = await searchResponse.json()

    const contactProperties: any = {
      email: email.toLowerCase().trim(),
      firstname: formData.firstName || '',
      lastname: formData.lastName || '',
      phone: formData.phone || '',
      company: formData.companyName || '',
      hubspot_owner_id: MAXIME_SIN_OWNER_ID,
      digiqo_form_source: 'contact',
      hs_lead_status: 'NEW'
    }

    // Ajout description = message du formulaire
    if (formData.description) {
      contactProperties.message = formData.description
    }

    if (searchData.total > 0) {
      // Update contact existant (on ne change PAS le owner si déjà assigné)
      const contactId = searchData.results[0].id
      const existingOwner = searchData.results[0].properties?.hubspot_owner_id
      const updateProperties: any = { ...contactProperties }
      if (existingOwner) {
        delete updateProperties.hubspot_owner_id
      }
      await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: updateProperties })
      })
      console.log('Contact form — HubSpot contact updated:', contactId)
      return contactId
    } else {
      // Create nouveau contact
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
        console.error('Erreur création contact HubSpot:', createResponse.status, errorText)
        return null
      }

      const createData = await createResponse.json()
      console.log('Contact form — HubSpot contact created:', createData.id)
      return createData.id
    }
  } catch (error) {
    console.error('Erreur HubSpot contact form:', error)
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
    if (!formData.firstName && !formData.lastName) {
      return res.status(400).json({ error: 'Au moins le prénom ou le nom est requis.' })
    }

    // 1. Créer/update contact HubSpot (priorité 1)
    let hubspotContactId = null
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
        hubspotContactId = await createOrUpdateHubSpotContact(formData)
      } catch (error) {
        console.error('HubSpot error:', error)
      }
    }

    // 2. Conserver le POST webhook n8n (fail-safe silencieux si URL vide)
    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'website-contact-form',
      email: { to: 'contact@digiqo.fr' },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        companyType: formData.companyType,
        phone: formData.phone,
        email: formData.email,
        services: formData.services,
        description: formData.description,
        consent: formData.consent
      },
      hubspot_contact_id: hubspotContactId,
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        origin: req.headers.origin || req.headers.referer
      }
    }

    if (process.env.N8N_CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify(webhookData)
        })
      } catch (e) {
        // silent fail — webhook optionnel
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Votre demande a été envoyée avec succès',
      hubspotContactId
    })

  } catch (error) {
    console.error('Error submitting contact form:', error)
    return res.status(200).json({
      success: true,
      message: 'Votre demande a été enregistrée'
    })
  }
}
