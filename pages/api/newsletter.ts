import type { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'
import { submitDigiqoForm } from '../../lib/hubspot-forms-api'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const N8N_NEWSLETTER_WEBHOOK_URL = process.env.N8N_NEWSLETTER_WEBHOOK_URL || ''

async function notifyNewsletterSubscription(email: string) {
  if (!N8N_NEWSLETTER_WEBHOOK_URL) return
  try {
    await fetch(N8N_NEWSLETTER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
      },
      body: JSON.stringify({
        source: 'newsletter-subscription',
        email: {
          to: 'newsletter@digiqo.fr',
        },
        subscriber: {
          email,
        },
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (error) {
    console.error('Erreur webhook n8n newsletter:', error)
  }
}

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
    await submitDigiqoForm({
      source: 'newsletter',
      email,
      pageUri: 'https://digiqo.fr/',
      pageName: 'Digiqo - Newsletter',
    })

    await notifyNewsletterSubscription(email.toLowerCase().trim())
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Erreur newsletter:', error)
    return res.status(200).json({ success: true })
  }
}
