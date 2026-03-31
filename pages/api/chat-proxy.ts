import type { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'

const N8N_CHAT_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL || ''

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Seules les requêtes POST sont acceptées
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting : 20 messages par minute par IP
  if (!checkRateLimit(req, res, 20, 60000)) return

  // Vérifier que le body n'est pas vide
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Request body is required' })
  }

  try {
    const webhookResponse = await fetch(N8N_CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
      },
      body: JSON.stringify(req.body),
    })

    // Transmettre le status code et le body de la réponse n8n
    const contentType = webhookResponse.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const data = await webhookResponse.json()
      return res.status(webhookResponse.status).json(data)
    }

    // Fallback pour les réponses non-JSON (text, SSE, etc.)
    const text = await webhookResponse.text()
    res
      .status(webhookResponse.status)
      .setHeader('Content-Type', contentType || 'text/plain')
      .send(text)
  } catch (error) {
    console.error('Chat proxy error:', error)
    return res.status(502).json({ error: 'Unable to reach chat backend' })
  }
}
