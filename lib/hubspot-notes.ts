import { formatPhoneForDisplay } from './phone-formatter'
import { HUBSPOT_SERVICES_MAP } from './hubspot-services-map'
import { formeJuridiqueToHubSpot } from './hubspot-forme-juridique-map'

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || ''
const HUBSPOT_API_URL = 'https://api.hubapi.com'

// Type d'association HubSpot-defined pour Note → Contact (PRIMARY)
const NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID = 202

export interface NoteContext {
  source: string // ex: 'Formulaire Contact', 'Formulaire Audit Digital', 'Devis Web'
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  company?: string
  companyType?: string
  services?: string[]
  description?: string
  consent?: boolean
  /** Champs additionnels spécifiques à certains formulaires (clé = label HTML affiché, valeur = contenu) */
  extra?: Record<string, string | undefined | null>
}

function buildNoteBody(ctx: NoteContext): string {
  const lines: string[] = []
  lines.push(`<b>📋 Nouveau lead — ${ctx.source}</b>`)
  lines.push('')

  const fullName = [ctx.firstName, ctx.lastName].filter(Boolean).join(' ').trim()
  if (fullName) lines.push(`👤 <b>Nom :</b> ${fullName}`)
  lines.push(`📧 <b>Email :</b> ${ctx.email}`)

  if (ctx.phone) {
    const formatted = formatPhoneForDisplay(ctx.phone)
    if (formatted) lines.push(`📞 <b>Téléphone :</b> ${formatted}`)
  }

  if (ctx.company) lines.push(`🏢 <b>Entreprise :</b> ${ctx.company}`)

  const formeJuridique = formeJuridiqueToHubSpot(ctx.companyType)
  if (formeJuridique) lines.push(`📋 <b>Forme juridique :</b> ${formeJuridique}`)

  if (Array.isArray(ctx.services) && ctx.services.length > 0) {
    const labels = ctx.services
      .map((id) => HUBSPOT_SERVICES_MAP[id])
      .filter((l): l is string => Boolean(l))
    if (labels.length > 0) {
      lines.push(`🎯 <b>Services souhaités :</b> ${labels.join(', ')}`)
    }
  }

  if (typeof ctx.consent === 'boolean') {
    lines.push(`✅ <b>Consentement marketing :</b> ${ctx.consent ? 'Oui' : 'Non'}`)
  }

  // Champs additionnels (pour Partenariats : score, budget, spécialité, etc.)
  if (ctx.extra) {
    for (const [label, value] of Object.entries(ctx.extra)) {
      if (value) lines.push(`${label} ${value}`)
    }
  }

  if (ctx.description) {
    lines.push('')
    lines.push(`💬 <b>Message :</b>`)
    lines.push(ctx.description)
  }

  lines.push('')
  lines.push(`<i>Source : ${ctx.source}</i>`)

  return lines.join('<br>')
}

/**
 * Crée une Note HubSpot associée à un contact, récapitulant la soumission du formulaire.
 * Fail-safe silencieux : si ça échoue, on log mais on ne casse rien.
 */
export async function createContactNote(
  contactId: string | number,
  ctx: NoteContext
): Promise<boolean> {
  if (!contactId || !HUBSPOT_ACCESS_TOKEN) return false

  const body = buildNoteBody(ctx)

  try {
    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/notes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          hs_note_body: body,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [
          {
            to: { id: String(contactId) },
            types: [
              {
                associationCategory: 'HUBSPOT_DEFINED',
                associationTypeId: NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID,
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[HubSpot Note] API error:', response.status, errText)
      return false
    }

    console.log('[HubSpot Note] Created for contact', contactId)
    return true
  } catch (error) {
    console.error('[HubSpot Note] Network error:', error)
    return false
  }
}
