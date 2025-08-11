import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Récupérer les données du formulaire
    const formData = req.body

    // Préparer les données pour n8n
    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'website-contact-form',
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
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
    const webhookResponse = await fetch('https://n8n.srv763918.hstgr.cloud/webhook-test/99a49cd4-35f2-4e9d-be50-6130ef061bba', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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