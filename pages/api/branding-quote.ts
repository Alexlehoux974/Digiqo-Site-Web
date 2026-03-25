import { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  if (!checkRateLimit(req, res)) return

  try {
    const formData = req.body

    // Input validation
    const contactEmail = formData.contact?.email
    if (!contactEmail || !EMAIL_REGEX.test(contactEmail)) {
      return res.status(400).json({ error: 'Un email valide est requis dans le contact.' })
    }

    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'branding-quote-form',
      data: formData,
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        origin: req.headers.origin || req.headers.referer
      }
    }

    const webhookUrl = process.env.N8N_BRANDING_WEBHOOK_URL || 'https://n8n.srv763918.hstgr.cloud/webhook/branding-quote-placeholder'

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
      },
      body: JSON.stringify(webhookData)
    })

    if (!webhookResponse.ok) {
      console.error('Branding webhook error:', webhookResponse.status, webhookResponse.statusText)
    }

    return res.status(200).json({
      success: true,
      message: 'Votre demande de devis branding a été envoyée avec succès'
    })

  } catch (error) {
    console.error('Error submitting branding quote form:', error)

    return res.status(200).json({
      success: true,
      message: 'Votre demande a été enregistrée'
    })
  }
}
