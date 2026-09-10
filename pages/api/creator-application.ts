import type { NextApiRequest, NextApiResponse } from 'next'
import { checkRateLimit } from '../../lib/rate-limit'
import {
  EMPTY_APPLICATION,
  NICHES,
  SOCIAL_URL_MAX_LENGTH,
  TYPES_CONTENU,
  parseFollowers,
  parseRate,
  validateApplication,
  type CreatorApplicationPayload,
  type PhotoPayload,
} from '../../lib/createurs/inscription'

const AIRTABLE_PAT = process.env.AIRTABLE_PAT || ''
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9' // Base « Site Web Digiqo »
const CREATEURS_TABLE_ID = 'tblBGZ8bj26D4hd02' // Table « Créateurs de contenu »
const N8N_WEBHOOK_URL = process.env.N8N_CREATOR_SIGNUP_WEBHOOK_URL || ''

// La photo voyage en base64 : ~4/3 des 5 Mo autorisés, plus le reste du formulaire.
export const config = { api: { bodyParser: { sizeLimit: '8mb' } } }

// Champs de la table « Créateurs de contenu », adressés par field ID :
// un renommage de colonne côté Airtable ne casse pas le formulaire.
const F = {
  prenom: 'fldMQzoISbW3cci6H',
  // « Nom complet » côté Airtable : il attend prénom + nom, pas le seul patronyme.
  nomComplet: 'fldc89nmEMDwpd5Ib',
  email: 'fldYubCLeroHYZkTN',
  telephone: 'fldcvRVVFTFPPEImD',
  ville: 'fldlWcx3PTnm38WHn',
  zone: 'fldxDbzNDk8prTQld',
  instagram: 'fldp0qO7xwENwLyrf',
  abonnesInstagram: 'fld8lmMBF6Qim6iKX',
  tauxInstagram: 'fldWDZz4a3s9Gxiyj',
  tiktok: 'fld3l41eQ1K0YLO40',
  abonnesTiktok: 'fldcLXoGhO7j16yMu',
  tauxTiktok: 'fldbsvFwCtV5PsVUK',
  youtube: 'fldHLkVUTNyLdsCJQ',
  facebook: 'fldJiyJLRxB5SMUih',
  autresReseaux: 'fldOYtD0x152ayyPE',
  niches: 'fldD7EcrA8BYMhhD2',
  typesContenu: 'fld2gJKPQ4xxJNymN',
  bio: 'fldGwf08wx8pZfXLA',
  portfolio: 'fldhTjbhoutAjDQ5T',
  tarifs: 'fldBCHALiJu1lNhx8',
  disponibilites: 'fldYhdVfvHXZLOReZ',
  collaboration: 'fldmELFw2Gl5woUqv',
  photo: 'fldMbGhLLpnJyFSN8',
  consentement: 'fld4ygxmZM2FOc4nT',
  statut: 'fldD4Es2o0TFkwhxo',
  source: 'fldfN12WO8VydpRak',
  datePremierContact: 'fldvCc5MSihYXILQ0',
  notes: 'fldzpVuDEWRQ5kDzw',
} as const

const STATUT_NOUVEAU = 'Nouveau'
const SOURCE_VALUE = 'Formulaire site'

const WEBHOOK_TIMEOUT_MS = 5000
const AIRTABLE_TIMEOUT_MS = 10000
// L'upload d'image est plus lent que l'écriture d'un record : il a sa propre marge.
const UPLOAD_TIMEOUT_MS = 20000

// Seule la production écrit réellement dans Airtable. Les deploy-previews et
// branch-deploys Netlify, comme le dev local, tournent à vide : une candidature
// de test ne pollue jamais la base d'Alexandre.
const PRODUCTION_HOSTS = (process.env.CREATOR_APPLICATION_PRODUCTION_HOSTS || 'digiqo.fr,www.digiqo.fr')
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

const asStringArray = (v: unknown, max = 20): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, max).map((s) => s.trim()) : []

const BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/

const readPhoto = (v: unknown): PhotoPayload | null => {
  if (!v || typeof v !== 'object') return null
  const p = v as Record<string, unknown>
  // Un préfixe `data:image/png;base64,` peut survivre côté client : on le retire.
  const raw = typeof p.data === 'string' ? p.data.replace(/^data:[^;]+;base64,/, '').replace(/\s/g, '') : ''
  if (!raw || !BASE64_RE.test(raw)) return null
  return {
    filename: asString(p.filename, 120) || 'photo',
    contentType: asString(p.contentType, 60),
    data: raw,
  }
}

const readPayload = (body: unknown): CreatorApplicationPayload => {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  return {
    ...EMPTY_APPLICATION,
    prenom: asString(b.prenom, 80),
    nom: asString(b.nom, 120),
    email: asString(b.email, 200),
    telephone: asString(b.telephone, 40),
    ville: asString(b.ville, 80),
    zone: asString(b.zone, 120),
    instagram: asString(b.instagram, 300),
    abonnesInstagram: asString(b.abonnesInstagram, 20),
    tauxInstagram: asString(b.tauxInstagram, 20),
    tiktok: asString(b.tiktok, 300),
    abonnesTiktok: asString(b.abonnesTiktok, 20),
    tauxTiktok: asString(b.tauxTiktok, 20),
    // Lues au-delà de la limite pour que `validateStep2` puisse refuser une URL
    // trop longue, plutôt que d'en stocker une version tronquée donc cassée.
    youtube: asString(b.youtube, SOCIAL_URL_MAX_LENGTH + 100),
    facebook: asString(b.facebook, SOCIAL_URL_MAX_LENGTH + 100),
    autresReseaux: asString(b.autresReseaux, 200),
    niches: asStringArray(b.niches, NICHES.length),
    typesContenu: asStringArray(b.typesContenu, TYPES_CONTENU.length),
    bio: asString(b.bio, 300),
    portfolio: asString(b.portfolio, 300),
    tarifs: asString(b.tarifs, 200),
    disponibilites: asString(b.disponibilites, 500),
    collaboration: asString(b.collaboration, 40),
    photo: readPhoto(b.photo),
    consentement: b.consentement === true,
    website: asString(b.website, 200),
  }
}

// ──────────────────────────────────────────────
// Airtable
// ──────────────────────────────────────────────

const airtableFetch = async (url: string, init: RequestInit, timeoutMs: number): Promise<Response> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      ...init,
      headers: { Authorization: `Bearer ${AIRTABLE_PAT}`, ...(init.headers || {}) },
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Une fiche existe-t-elle déjà pour cet email ?
 * `null` = impossible de savoir : on laisse alors la création se faire plutôt
 * que de renvoyer un faux « déjà inscrit » qui bloquerait un vrai créateur.
 */
const findExistingByEmail = async (email: string): Promise<string | null | undefined> => {
  // L'email vient d'être validé par regex ; on échappe malgré tout les guillemets.
  const escaped = email.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const params = new URLSearchParams({
    filterByFormula: `LOWER({Email}) = "${escaped.toLowerCase()}"`,
    pageSize: '1',
  })
  try {
    const response = await airtableFetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CREATEURS_TABLE_ID}?${params.toString()}`,
      {},
      AIRTABLE_TIMEOUT_MS,
    )
    if (!response.ok) {
      console.error('[creator-application] recherche de doublon impossible:', response.status)
      return undefined
    }
    const data = (await response.json()) as { records?: Array<{ id: string }> }
    return data.records?.[0]?.id ?? null
  } catch (error) {
    console.error('[creator-application] recherche de doublon injoignable:', (error as Error).message)
    return undefined
  }
}

/**
 * Retire les paramètres de suivi collés par les applications mobiles quand on
 * partage un profil (`?igsh=`, `?_t=`, `?stkn=`, `utm_*`…). Seuls l'origine et
 * le chemin sont conservés : c'est ce qui identifie le compte.
 *
 * Ne s'applique qu'aux URLs entrantes — les valeurs déjà en base ne bougent pas.
 * Une URL illisible est renvoyée telle quelle : la validation est déjà passée,
 * ce nettoyage ne doit jamais faire perdre une donnée.
 */
const stripTracking = (raw: string): string => {
  const value = raw.trim()
  if (!value) return ''
  try {
    const url = new URL(value)
    return `${url.origin}${url.pathname}`.replace(/\/$/, '') || url.origin
  } catch {
    return value
  }
}

/**
 * Airtable stocke le nom complet dans un seul champ ; le formulaire, lui, demande
 * le prénom et le nom séparément. On recompose ici plutôt que de laisser la
 * colonne « Nom complet » ne contenir que le patronyme.
 * Les parties vides sont écartées : jamais d'espace en trop.
 */
const fullName = (d: CreatorApplicationPayload): string =>
  [d.prenom.trim(), d.nom.trim()].filter(Boolean).join(' ')

const buildFields = (d: CreatorApplicationPayload): Record<string, unknown> => {
  const fields: Record<string, unknown> = {
    [F.prenom]: d.prenom,
    [F.nomComplet]: fullName(d),
    [F.email]: d.email,
    [F.ville]: d.ville,
    [F.zone]: d.zone,
    [F.niches]: d.niches,
    [F.typesContenu]: d.typesContenu,
    [F.bio]: d.bio,
    [F.consentement]: true,
    [F.statut]: STATUT_NOUVEAU,
    [F.source]: SOURCE_VALUE,
    // Champ « date » Airtable : la partie jour suffit.
    [F.datePremierContact]: new Date().toISOString().slice(0, 10),
  }

  // Optionnels : on n'écrit pas de chaîne vide pour garder la vue Airtable lisible.
  if (d.telephone) fields[F.telephone] = d.telephone
  if (d.instagram) fields[F.instagram] = stripTracking(d.instagram)
  if (d.tiktok) fields[F.tiktok] = stripTracking(d.tiktok)
  if (d.youtube) fields[F.youtube] = stripTracking(d.youtube)
  if (d.facebook) fields[F.facebook] = stripTracking(d.facebook)
  if (d.autresReseaux) fields[F.autresReseaux] = d.autresReseaux
  if (d.portfolio) fields[F.portfolio] = d.portfolio
  if (d.tarifs) fields[F.tarifs] = d.tarifs
  if (d.disponibilites) fields[F.disponibilites] = d.disponibilites
  if (d.collaboration) fields[F.collaboration] = d.collaboration

  const abonnesIg = parseFollowers(d.abonnesInstagram)
  if (d.instagram && abonnesIg !== null) fields[F.abonnesInstagram] = abonnesIg
  const abonnesTt = parseFollowers(d.abonnesTiktok)
  if (d.tiktok && abonnesTt !== null) fields[F.abonnesTiktok] = abonnesTt

  // Airtable stocke les pourcents en fraction : 3,25 % → 0.0325.
  const tauxIg = parseRate(d.tauxInstagram)
  if (tauxIg !== null) fields[F.tauxInstagram] = tauxIg
  const tauxTt = parseRate(d.tauxTiktok)
  if (tauxTt !== null) fields[F.tauxTiktok] = tauxTt

  return fields
}

/**
 * Photo → champ attachment, via l'endpoint dédié d'Airtable.
 * Best-effort : une photo perdue ne doit pas coûter la candidature, l'équipe
 * peut toujours la redemander. Le nom du fichier est tracé dans les notes en cas d'échec.
 */
const uploadPhoto = async (recordId: string, photo: PhotoPayload): Promise<boolean> => {
  try {
    const response = await airtableFetch(
      `https://content.airtable.com/v0/${AIRTABLE_BASE_ID}/${recordId}/${F.photo}/uploadAttachment`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: photo.contentType,
          file: photo.data,
          filename: photo.filename,
        }),
      },
      UPLOAD_TIMEOUT_MS,
    )
    if (response.ok) return true
    console.error('[creator-application] upload photo refusé:', response.status, await response.text())
    return false
  } catch (error) {
    console.error('[creator-application] upload photo injoignable:', (error as Error).message)
    return false
  }
}

/** Trace l'échec d'upload dans les notes internes, pour que l'équipe relance le créateur. */
const noteFailedUpload = async (recordId: string, filename: string): Promise<void> => {
  try {
    await airtableFetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CREATEURS_TABLE_ID}/${recordId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: { [F.notes]: `Photo non enregistrée automatiquement : « ${filename} ». À redemander au créateur.` },
        }),
      },
      AIRTABLE_TIMEOUT_MS,
    )
  } catch (error) {
    console.error('[creator-application] note d’échec impossible:', (error as Error).message)
  }
}

// ──────────────────────────────────────────────
// Notification n8n : même patron que creator-request.ts.
// Attendue, pour que Netlify ne gèle pas la lambda avant que la requête parte.
// Bornée à 5 s, et toute erreur reste interne : la fonction ne rejette jamais.
// ──────────────────────────────────────────────

const notifyWebhook = async (payload: Record<string, unknown>): Promise<void> => {
  if (!N8N_WEBHOOK_URL) {
    console.warn(
      '[creator-application] N8N_CREATOR_SIGNUP_WEBHOOK_URL absente — notification n8n ignorée, ' +
        'la candidature reste enregistrée dans Airtable',
    )
    return
  }

  const secret = process.env.N8N_WEBHOOK_SECRET || ''
  const headers: Record<string, string> = { 'Content-Type': 'application/json', 'X-Webhook-Secret': secret }
  // Signature partagée, à vérifier côté n8n. Absente si le secret ne l'est pas :
  // un en-tête vide se distingue mal d'une signature valide.
  if (secret) headers['X-Digiqo-Signature'] = secret

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!response.ok) console.error('[creator-application] webhook n8n:', response.status)
  } catch (error) {
    const message = controller.signal.aborted
      ? `pas de réponse en ${WEBHOOK_TIMEOUT_MS} ms`
      : (error as Error).message
    console.error('[creator-application] webhook n8n injoignable:', message)
  } finally {
    clearTimeout(timeout)
  }
}

/** Payload plat attendu côté n8n. La photo n'y figure pas : elle vit dans Airtable. */
const buildWebhookPayload = (
  d: CreatorApplicationPayload,
  recordId: string | null,
): Record<string, unknown> => ({
  prenom: d.prenom,
  nom: d.nom,
  email: d.email,
  telephone: d.telephone,
  ville: d.ville,
  zone: d.zone,
  instagram: d.instagram,
  abonnesInstagram: parseFollowers(d.abonnesInstagram),
  tiktok: d.tiktok,
  abonnesTiktok: parseFollowers(d.abonnesTiktok),
  youtube: d.youtube,
  facebook: d.facebook,
  autresReseaux: d.autresReseaux,
  niches: d.niches,
  typesContenu: d.typesContenu,
  bio: d.bio,
  portfolio: d.portfolio,
  tarifs: d.tarifs,
  disponibilites: d.disponibilites,
  collaboration: d.collaboration,
  airtableRecordId: recordId,
  createdAt: new Date().toISOString(),
})

const DUPLICATE_MESSAGE = 'Profil déjà enregistré, on revient vers vous'

// ──────────────────────────────────────────────

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkRateLimit(req, res)) return

  const data = readPayload(req.body)

  // Honeypot : on répond comme à un envoi normal, sans rien enregistrer.
  if (data.website) {
    console.warn('[creator-application] honeypot déclenché, candidature ignorée')
    return res.status(200).json({ success: true })
  }

  // Validation stricte : sans `typecast`, une valeur de select inconnue serait
  // refusée par Airtable — autant la refuser ici, avec un message utile.
  const errors = validateApplication(data)
  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0], details: errors })
  }

  const dryRun = !isProductionRequest(req)

  if (dryRun) {
    console.log(
      `[creator-application] DRY-RUN (hôte hors production) — ni écriture Airtable, ni upload photo, ni webhook n8n. ` +
        `${data.prenom} ${data.nom}, niches: ${data.niches.length}, photo: ${data.photo?.contentType || 'aucune'}`,
    )
    return res.status(200).json({ success: true, dryRun: true })
  }

  try {
    const existing = await findExistingByEmail(data.email)
    if (existing) {
      console.log('[creator-application] doublon email, aucune fiche créée:', existing)
      return res.status(200).json({ success: true, duplicate: true, message: DUPLICATE_MESSAGE })
    }

    const response = await airtableFetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CREATEURS_TABLE_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Pas de `typecast` : les valeurs des selects sont validées en amont,
        // et une option ne doit jamais être créée par le formulaire.
        body: JSON.stringify({ fields: buildFields(data) }),
      },
      AIRTABLE_TIMEOUT_MS,
    )

    if (!response.ok) {
      const detail = `${response.status} — ${await response.text()}`
      console.error('[creator-application] Airtable a refusé la candidature:', detail)
      return res.status(502).json({ error: "L'enregistrement a échoué. Réessaie dans un instant." })
    }

    const recordId = ((await response.json()) as { id?: string }).id ?? null
    console.log('[creator-application] candidature enregistrée:', recordId)

    let photoUploaded = false
    if (recordId && data.photo) {
      photoUploaded = await uploadPhoto(recordId, data.photo)
      if (!photoUploaded) await noteFailedUpload(recordId, data.photo.filename)
    }

    await notifyWebhook({ ...buildWebhookPayload(data, recordId), photoUploaded })

    return res.status(200).json({ success: true, recordId })
  } catch (error) {
    console.error('[creator-application] erreur inattendue:', error)
    return res.status(502).json({ error: "L'enregistrement a échoué. Réessaie dans un instant." })
  }
}
