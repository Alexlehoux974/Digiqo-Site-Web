import type { NextApiRequest, NextApiResponse } from 'next'
import { computePartnershipScore } from '../../lib/partnership-scoring'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
}

const N8N_WEBHOOK_URL = 'https://n8n.srv763918.hstgr.cloud/webhook/3dff5295-b10f-400e-b3e1-e25ae2a5d8ae'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const formData = req.body

    // Honeypot check — silently accept but do nothing
    if (formData.honeypot) {
      return res.status(200).json({ success: true })
    }

    // Compute scoring
    const score = computePartnershipScore(formData)

    // Build email metadata
    const isAthlete = formData.profileType === 'athlete'
    const profileLabel = isAthlete ? 'ATHLETE' : 'SPEAKER'
    const specialite = isAthlete ? formData.athDiscipline : formData.spkType
    const budget = [
      formData.budgetParMois && `${formData.budgetParMois}EUR/mois`,
      formData.budgetParEvenement && `${formData.budgetParEvenement}EUR/event`,
      formData.budgetParSaison && `${formData.budgetParSaison}EUR/saison`,
    ].filter(Boolean).join(' + ') || 'Non précisé'

    const emailSubject = `[CANDIDATURE][${profileLabel}] ${formData.prenom} ${formData.nom} – ${specialite} – ${budget}`

    // Extract file attachment summaries (names only, base64 forwarded in full payload)
    const allFiles: { field: string; name: string; size: number }[] = []
    const fileFields = [
      'capturesInsights', 'athMediaKit', 'athPhotosHD',
      'spkShowreelFile', 'spkPhotosEvenement', 'spkPlaquetteDossier',
    ]
    for (const field of fileFields) {
      const files = formData[field]
      if (Array.isArray(files)) {
        files.forEach((f: any) => {
          if (f?.name) allFiles.push({ field, name: f.name, size: f.size || 0 })
        })
      }
    }

    // Build N8N payload
    const payload = {
      source: 'partnership-application',
      timestamp: new Date().toISOString(),
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        origin: req.headers.origin || req.headers.referer || 'unknown',
      },
      email: {
        to: 'partenariats@digiqo.fr',
        cc: 'contact@digiqo.fr',
        subject: emailSubject,
      },
      score: {
        total: score.total,
        details: {
          audiencePreuves: `${score.audiencePreuves}/30`,
          calendrierConfirme: `${score.calendrierConfirme}/25`,
          contrepartiesQuantifiees: `${score.contrepartiesQuantifiees}/25`,
          brandFitRisques: `${score.brandFitRisques}/20`,
        },
      },
      summary: {
        profil: formData.profileType,
        type: formData.partnershipType,
        nom: `${formData.prenom} ${formData.nom}`,
        email: formData.email,
        telephone: formData.telephone,
        ville: formData.villeZone,
        budget,
        duree: formData.dureeSouhaitee ? `${formData.dureeSouhaitee} mois` : 'Non précisé',
        specialite,
        fichiers: allFiles.length > 0 ? allFiles.map(f => f.name).join(', ') : 'Aucun',
      },
      formData,
    }

    // Send to N8N webhook
    console.log(`[Partnership] Sending to N8N: ${formData.prenom} ${formData.nom} (${profileLabel}) - Score: ${score.total}/100`)

    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!webhookResponse.ok) {
      console.error(`[Partnership] N8N webhook error: ${webhookResponse.status}`)
      return res.status(500).json({ error: 'Erreur lors de l\'envoi', details: `Webhook: ${webhookResponse.status}` })
    }

    console.log('[Partnership] Webhook N8N sent successfully')

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('[Partnership] Error:', error)
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
