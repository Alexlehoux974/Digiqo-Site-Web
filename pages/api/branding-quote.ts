import { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'
import { submitDigiqoForm } from '../../lib/hubspot-forms-api'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    // 1. Soumettre à HubSpot Forms API
    await submitDigiqoForm({
      source: 'devis-branding',
      email: contactEmail,
      firstName: formData.contact?.firstName,
      lastName: formData.contact?.lastName,
      phone: formData.contact?.phone,
      company: formData.project?.companyName || formData.brand?.name,
      companyType: formData.companyType || formData.project?.companyType,
      services: formData.project?.services,
      description: formData.project?.description,
      consent: formData.consent === true,
      pageUri: 'https://digiqo.fr/devis-branding',
      pageName: 'Digiqo - Devis Branding',
    })

    // 2. POST webhook n8n (silent fail si URL vide)
    const webhookUrl = process.env.N8N_BRANDING_WEBHOOK_URL || ''
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            source: 'branding-quote-form',
            email: { to: 'devis@digiqo.fr' },
            data: formData,
            metadata: {
              ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
              userAgent: req.headers['user-agent'],
              origin: req.headers.origin || req.headers.referer
            }
          })
        })
      } catch (e) {
        // silent fail
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Votre demande de devis branding a été envoyée avec succès',
    })

  } catch (error) {
    console.error('Error submitting branding quote form:', error)
    return res.status(200).json({
      success: true,
      message: 'Votre demande a été enregistrée'
    })
  }
}
