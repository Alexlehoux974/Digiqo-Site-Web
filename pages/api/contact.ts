import { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  if (!checkRateLimit(req, res)) return;

  try {
    // Récupérer les données du formulaire
    const formData = req.body

    // Input validation
    if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
      return res.status(400).json({ error: 'Un email valide est requis.' })
    }
    if (!formData.firstName && !formData.lastName) {
      return res.status(400).json({ error: 'Au moins le prénom ou le nom est requis.' })
    }

    // Préparer les données pour n8n ou HubSpot
    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'website-contact-form',
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
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        origin: req.headers.origin || req.headers.referer
      }
    }

    // Envoyer les données au webhook n8n
    const webhookResponse = await fetch(process.env.N8N_CONTACT_WEBHOOK_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
      },
      body: JSON.stringify(webhookData)
    })

    if (!webhookResponse.ok) {
      console.error('Webhook error:', webhookResponse.status, webhookResponse.statusText)
      // On ne bloque pas l'utilisateur même si le webhook échoue
    }

    // Répondre avec succès
    return res.status(200).json({ 
      success: true, 
      message: 'Votre demande a été envoyée avec succès' 
    })
    
  } catch (error) {
    console.error('Error submitting contact form:', error)
    
    // Retourner un succès même en cas d'erreur pour ne pas bloquer l'utilisateur
    return res.status(200).json({ 
      success: true, 
      message: 'Votre demande a été enregistrée' 
    })
  }
}