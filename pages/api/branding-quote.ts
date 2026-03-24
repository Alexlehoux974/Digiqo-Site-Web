import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const formData = req.body

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
