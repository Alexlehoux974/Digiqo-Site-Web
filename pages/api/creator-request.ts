import type { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'
import {
  EMPTY_REQUEST,
  canonicalNiches,
  normalizeHandle,
  validateRequest,
  type CreatorRequestPayload,
} from '../../lib/createurs/demande'

const AIRTABLE_PAT = process.env.AIRTABLE_PAT || ''
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9' // Base « Site Web Digiqo »
const DEMANDES_TABLE_ID = 'tbldTuyAdjtaxN8l9' // Table « Demandes créateurs »
const CREATEURS_TABLE_ID = 'tblBGZ8bj26D4hd02' // Table « Créateurs de contenu »
const N8N_WEBHOOK_URL = process.env.N8N_CREATOR_REQUEST_WEBHOOK_URL || ''

// Champs de la table « Demandes créateurs », adressés par field ID :
// un renommage de colonne côté Airtable ne casse pas le formulaire.
const F = {
  entreprise: 'fld5E3mz6SaGfSjb1',
  statut: 'fld8xqoTsHwDSUVPt',
  secteur: 'fldqyPb9nNVxw1wqh',
  contact: 'fldws7FbWSAazMCDf',
  email: 'fldB40Gtc7w5JD9OW',
  telephone: 'fldD4aytSiwNPPSsq',
  siteEntreprise: 'fldV4ENapus1ZUHD6',
  createursLies: 'fldZf1a31yNCGwV9I',
  handlesBruts: 'fldTYCBY5qcuuJMXu',
  objectif: 'fldKzT1gdCysFesu6',
  typesContenu: 'fldW8bzaKu4H07kv5',
  diffusion: 'fld3qxABlnBZm1Coh',
  formatCollaboration: 'fld0q1woq2Tk1qnoZ',
  volume: 'fldfQ0TeAoBZrE4wa',
  budget: 'fldfObMPSWvHc2B7I',
  echeance: 'fld0QeermKQEse1bS',
  criteresNiches: 'fld6xcWWbZX8dHJHh',
  criteresZones: 'fldevjGvQQXYDpjah',
  tailleAudience: 'fldlSCqkDiJWjH81d',
  brief: 'fld6FMw3liapOn90d',
  consentement: 'fldR85oZWMcARr1DF',
  source: 'fld1RhKvRS4PGXtXk',
  dateDemande: 'fldMbxZqWHkgtMhvC',
} as const

// Champs de la table « Créateurs de contenu » utilisés pour résoudre les handles.
const CREATEUR_INSTAGRAM = 'fldp0qO7xwENwLyrf'
const CREATEUR_TIKTOK = 'fld3l41eQ1K0YLO40'

const SOURCE_VALUE = 'Formulaire site — page créateurs'
const STATUT_NOUVELLE = 'Nouvelle'

const RECORD_ID_RE = /^rec[A-Za-z0-9]{14}$/

// Seule la production écrit réellement dans Airtable. Les deploy-previews et
// branch-deploys Netlify, comme le dev local, tournent à vide : une demande de
// test ne pollue jamais la base d'Alexandre.
const PRODUCTION_HOSTS = (process.env.CREATOR_REQUEST_PRODUCTION_HOSTS || 'digiqo.fr,www.digiqo.fr')
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean)

const isProductionRequest = (req: NextApiRequest): boolean => {
  const forwarded = req.headers['x-forwarded-host']
  const raw = (Array.isArray(forwarded) ? forwarded[0] : forwarded) || req.headers.host || ''
  const host = String(raw).split(',')[0].trim().toLowerCase().split(':')[0]
  return PRODUCTION_HOSTS.includes(host)
}

// ──────────────────────────────────────────────
// Normalisation du corps de requête : on ne fait jamais confiance au client.
// ──────────────────────────────────────────────

const asString = (v: unknown, max = 500): string => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const asStringArray = (v: unknown, max = 30): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, max).map((s) => s.trim()) : []

const readPayload = (body: unknown): CreatorRequestPayload => {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  return {
    ...EMPTY_REQUEST,
    entreprise: asString(b.entreprise, 120),
    secteur: asString(b.secteur, 60),
    contact: asString(b.contact, 120),
    email: asString(b.email, 200),
    telephone: asString(b.telephone, 40),
    siteEntreprise: asString(b.siteEntreprise, 200),
    handles: asStringArray(b.handles, 20)
      .map((h) => normalizeHandle(h))
      .filter((h): h is string => h !== null)
      .map((h) => `@${h}`),
    objectif: asString(b.objectif, 60),
    typesContenu: asStringArray(b.typesContenu, 10),
    diffusion: asStringArray(b.diffusion, 10),
    formatCollaboration: asString(b.formatCollaboration, 40),
    volume: asString(b.volume, 40),
    budget: asString(b.budget, 40),
    echeance: asString(b.echeance, 40),
    criteresNiches: canonicalNiches(asStringArray(b.criteresNiches, 30)),
    criteresZones: asStringArray(b.criteresZones, 10),
    tailleAudience: asString(b.tailleAudience, 40),
    brief: asString(b.brief, 800),
    consentement: b.consentement === true,
    website: asString(b.website, 200),
  }
}

// ──────────────────────────────────────────────
// Résolution handle → record ID de la table Créateurs.
// Best-effort : toute erreur laisse simplement les handles en texte brut.
// ──────────────────────────────────────────────

const slugFromProfileUrl = (url: unknown): string | null => {
  if (typeof url !== 'string' || !url.trim()) return null
  const segments = url.trim().replace(/[?#].*$/, '').replace(/\/+$/, '').split('/')
  const last = segments[segments.length - 1] || ''
  return normalizeHandle(last)
}

interface ResolvedHandles {
  recordIds: string[]
  unresolved: string[]
}

const resolveHandles = async (handles: string[]): Promise<ResolvedHandles> => {
  if (handles.length === 0) return { recordIds: [], unresolved: [] }
  if (!AIRTABLE_PAT) return { recordIds: [], unresolved: handles }

  const bySlug = new Map<string, string>()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6000)

  try {
    let offset: string | undefined
    // La table compte quelques dizaines de fiches ; la borne évite toute boucle longue.
    for (let page = 0; page < 4; page++) {
      const params = new URLSearchParams({ returnFieldsByFieldId: 'true', pageSize: '100' })
      params.append('fields[]', CREATEUR_INSTAGRAM)
      params.append('fields[]', CREATEUR_TIKTOK)
      if (offset) params.set('offset', offset)

      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CREATEURS_TABLE_ID}?${params.toString()}`,
        { headers: { Authorization: `Bearer ${AIRTABLE_PAT}` }, signal: controller.signal },
      )
      if (!response.ok) break

      const data = (await response.json()) as {
        records?: Array<{ id: string; fields?: Record<string, unknown> }>
        offset?: string
      }
      for (const record of data.records || []) {
        for (const slug of [
          slugFromProfileUrl(record.fields?.[CREATEUR_INSTAGRAM]),
          slugFromProfileUrl(record.fields?.[CREATEUR_TIKTOK]),
        ]) {
          if (slug && !bySlug.has(slug)) bySlug.set(slug, record.id)
        }
      }
      offset = data.offset
      if (!offset) break
    }
  } catch (error) {
    console.error('[creator-request] résolution des handles impossible:', (error as Error).message)
    return { recordIds: [], unresolved: handles }
  } finally {
    clearTimeout(timeout)
  }

  const recordIds: string[] = []
  const unresolved: string[] = []
  for (const handle of handles) {
    const slug = normalizeHandle(handle)
    const recordId = slug ? bySlug.get(slug) : undefined
    if (recordId && RECORD_ID_RE.test(recordId) && !recordIds.includes(recordId)) recordIds.push(recordId)
    else unresolved.push(handle)
  }
  return { recordIds, unresolved }
}

// ──────────────────────────────────────────────

const buildFields = (d: CreatorRequestPayload, resolved: ResolvedHandles): Record<string, unknown> => {
  const fields: Record<string, unknown> = {
    [F.entreprise]: d.entreprise,
    [F.statut]: STATUT_NOUVELLE,
    [F.secteur]: d.secteur,
    [F.contact]: d.contact,
    [F.email]: d.email,
    [F.telephone]: d.telephone,
    [F.objectif]: d.objectif,
    [F.typesContenu]: d.typesContenu,
    [F.diffusion]: d.diffusion,
    [F.formatCollaboration]: d.formatCollaboration,
    [F.budget]: d.budget,
    [F.echeance]: d.echeance,
    [F.consentement]: true,
    [F.source]: SOURCE_VALUE,
    [F.dateDemande]: new Date().toISOString(),
  }

  // Optionnels : on n'écrit pas de chaîne vide pour garder la vue Airtable lisible.
  if (d.siteEntreprise) fields[F.siteEntreprise] = d.siteEntreprise
  if (d.volume) fields[F.volume] = d.volume
  if (d.tailleAudience) fields[F.tailleAudience] = d.tailleAudience
  if (d.criteresNiches.length) fields[F.criteresNiches] = d.criteresNiches
  if (d.criteresZones.length) fields[F.criteresZones] = d.criteresZones
  if (d.brief) fields[F.brief] = d.brief
  // Uniquement des record IDs validés : avec `typecast`, une valeur texte sur un
  // champ de liaison créerait une fiche créateur fantôme.
  if (resolved.recordIds.length) fields[F.createursLies] = resolved.recordIds
  if (resolved.unresolved.length) fields[F.handlesBruts] = resolved.unresolved.join(', ')

  return fields
}

const notifyWebhook = async (payload: Record<string, unknown>): Promise<void> => {
  if (!N8N_WEBHOOK_URL) return
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) console.error('[creator-request] webhook n8n:', response.status)
  } catch (error) {
    console.error('[creator-request] webhook n8n injoignable:', (error as Error).message)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkRateLimit(req, res)) return

  const data = readPayload(req.body)

  // Honeypot : on répond comme à un envoi normal, sans rien enregistrer.
  if (data.website) {
    console.warn('[creator-request] honeypot déclenché, demande ignorée')
    return res.status(200).json({ success: true })
  }

  const errors = validateRequest(data)
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0], details: errors })
  }

  const dryRun = !isProductionRequest(req)

  try {
    const resolved = await resolveHandles(data.handles)

    if (dryRun) {
      console.log(
        `[creator-request] DRY-RUN (hôte hors production) — aucune écriture Airtable. ` +
          `Créateurs liés: ${resolved.recordIds.length}, handles bruts: ${resolved.unresolved.length}`,
      )
      return res.status(200).json({ success: true, dryRun: true })
    }

    let recordId: string | null = null
    let airtableError: string | null = null

    try {
      const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DEMANDES_TABLE_ID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: buildFields(data, resolved), typecast: true }),
      })
      if (!response.ok) {
        airtableError = `${response.status} — ${await response.text()}`
        console.error('[creator-request] Airtable a refusé la demande:', airtableError)
      } else {
        recordId = ((await response.json()) as { id?: string }).id ?? null
        console.log('[creator-request] demande enregistrée:', recordId)
      }
    } catch (error) {
      airtableError = (error as Error).message
      console.error('[creator-request] Airtable injoignable:', airtableError)
    }

    // Airtable en échec : on garde la demande côté n8n plutôt que de la perdre,
    // et le client voit un envoi réussi — il n'y peut rien.
    await notifyWebhook({
      source: 'creator-request',
      airtable_record_id: recordId,
      airtable_error: airtableError,
      form_data: data,
      linked_creator_ids: resolved.recordIds,
      unresolved_handles: resolved.unresolved,
      timestamp: new Date().toISOString(),
    })

    return res.status(200).json({ success: true, recordId })
  } catch (error) {
    // Dernier filet : la demande ne doit jamais se solder par une 500 côté client.
    console.error('[creator-request] erreur inattendue:', error)
    return res.status(200).json({ success: true })
  }
}
