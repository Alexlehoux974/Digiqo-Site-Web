import type { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || ''
const HUBSPOT_API_URL = 'https://api.hubapi.com'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkRateLimit(req, res)) return

  const { email } = req.body

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Un email valide est requis.' })
  }

  try {
    // Rechercher si le contact existe déjà
    const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{
            propertyName: 'email',
            operator: 'EQ',
            value: email.toLowerCase().trim()
          }]
        }]
      })
    })

    if (!searchResponse.ok) {
      console.error('Erreur recherche HubSpot newsletter:', searchResponse.status)
      return res.status(200).json({ success: true })
    }

    const searchData = await searchResponse.json()

    if (searchData.total > 0) {
      // Contact existe déjà — on ne modifie pas son lifecycle stage
      return res.status(200).json({ success: true })
    }

    // Nouveau contact — créer avec lifecycle stage "subscriber"
    const createResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          email: email.toLowerCase().trim(),
          lifecyclestage: 'subscriber'
        }
      })
    })

    if (!createResponse.ok) {
      const errorText = await createResponse.text()
      console.error('Erreur création contact HubSpot newsletter:', createResponse.status, errorText)
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Erreur newsletter:', error)
    return res.status(200).json({ success: true })
  }
}
