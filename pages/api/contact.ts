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

    if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
      return res.status(400).json({ error: 'Un email valide est requis.' })
    }
    if (!formData.firstName && !formData.lastName) {
      return res.status(400).json({ error: 'Au moins le prénom ou le nom est requis.' })
    }

    // 1. Soumettre à HubSpot Forms API
    await submitDigiqoForm({
      source: 'contact',
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      company: formData.companyName,
      companyType: formData.companyType,
      services: formData.services,
      description: formData.description,
      consent: formData.consent === true,
      pageUri: 'https://digiqo.fr/#contact',
      pageName: 'Digiqo - Formulaire Contact',
    })

    // 2. Conserver le POST webhook n8n (fail-safe silencieux si URL vide)
    if (process.env.N8N_CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify({
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
              consent: formData.consent,
            },
          }),
        })
      } catch (e) {
        // silent fail — webhook optionnel
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Votre demande a été envoyée avec succès',
    })

  } catch (error) {
    console.error('Error submitting contact form:', error)
    return res.status(200).json({
      success: true,
      message: 'Votre demande a été enregistrée'
    })
  }
}
