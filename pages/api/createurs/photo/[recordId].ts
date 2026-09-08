import type { NextApiRequest, NextApiResponse } from 'next'

// ──────────────────────────────────────────────
// PHOTO D'UN CRÉATEUR — proxy vers l'attachment Airtable.
//
// Les URLs d'attachment Airtable expirent en quelques heures : elles ne peuvent
// pas être figées dans une page ISR régénérée toutes les 30 min. Cette route
// résout l'URL fraîche à la demande et renvoie l'image, mise en cache par le CDN.
//
// Le PAT reste côté serveur : le client ne voit qu'un identifiant de fiche.
// ──────────────────────────────────────────────

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'
const CREATEURS_TABLE_ID = 'tblBGZ8bj26D4hd02'
const PHOTO_FIELD_ID = 'fldMbGhLLpnJyFSN8' // « Photo de profil »

// Seul un identifiant de fiche est accepté : la route ne peut pas être détournée
// en proxy HTTP générique.
const RECORD_ID_RE = /^rec[A-Za-z0-9]{14}$/

const RECORD_TIMEOUT_MS = 8000
const IMAGE_TIMEOUT_MS = 12000
const MAX_BYTES = 10 * 1024 * 1024

// Une image de créateur change rarement : une heure de cache, et la version
// périmée peut être resservie 24 h le temps de la rafraîchir.
//
// Deux en-têtes, parce que le runtime Next de Netlify réécrit `Cache-Control`
// en un simple `public` avant de le renvoyer au navigateur : sans `max-age`,
// chaque affichage de la page revalide les six photos. `Netlify-CDN-Cache-Control`
// est lu par le CDN puis retiré de la réponse, `Cache-Control` reste pour le
// navigateur et pour tout autre intermédiaire.
const CDN_CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'
const CACHE_CONTROL = 'public, max-age=3600, stale-while-revalidate=86400'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

interface Attachment {
  url?: string
  type?: string
  thumbnails?: { large?: { url?: string }; full?: { url?: string } }
}

const fetchWithTimeout = async (url: string, init: RequestInit, timeoutMs: number): Promise<Response> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const raw = req.query.recordId
  const recordId = Array.isArray(raw) ? raw[0] : raw
  if (!recordId || !RECORD_ID_RE.test(recordId)) {
    return res.status(400).json({ error: 'Identifiant de fiche invalide' })
  }

  const pat = process.env.AIRTABLE_PAT || ''
  if (!pat) {
    console.error('[createurs/photo] AIRTABLE_PAT absente')
    return res.status(404).json({ error: 'Photo indisponible' })
  }

  try {
    // `fields[]` n'existe que sur le listing : sur « get record » il fait échouer
    // la requête. On lit donc la fiche entière et on n'en garde que la photo.
    const params = new URLSearchParams({ returnFieldsByFieldId: 'true' })

    const recordResponse = await fetchWithTimeout(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CREATEURS_TABLE_ID}/${recordId}?${params.toString()}`,
      { headers: { Authorization: `Bearer ${pat}` } },
      RECORD_TIMEOUT_MS,
    )
    if (!recordResponse.ok) {
      // 403 comme 404 : de l'extérieur, la fiche n'est simplement pas disponible.
      return res.status(404).json({ error: 'Photo introuvable' })
    }

    const record = (await recordResponse.json()) as { fields?: Record<string, unknown> }
    const attachments = record.fields?.[PHOTO_FIELD_ID]
    const first = (Array.isArray(attachments) ? attachments[0] : undefined) as Attachment | undefined

    // La miniature « large » suffit à la grille et pèse bien moins que l'original.
    const sourceUrl = first?.thumbnails?.large?.url || first?.url
    if (!sourceUrl) return res.status(404).json({ error: 'Photo introuvable' })

    const imageResponse = await fetchWithTimeout(sourceUrl, {}, IMAGE_TIMEOUT_MS)
    if (!imageResponse.ok) {
      console.error('[createurs/photo] attachment illisible:', imageResponse.status)
      return res.status(404).json({ error: 'Photo introuvable' })
    }

    const contentType = imageResponse.headers.get('content-type') || first?.type || 'image/jpeg'
    // On ne relaie que des images : l'origine est de confiance, la vérification
    // évite qu'un type inattendu se retrouve servi sous notre domaine.
    if (!ALLOWED_TYPES.some((t) => contentType.startsWith(t))) {
      console.error('[createurs/photo] type inattendu:', contentType)
      return res.status(404).json({ error: 'Photo introuvable' })
    }

    const buffer = Buffer.from(await imageResponse.arrayBuffer())
    if (buffer.byteLength > MAX_BYTES) {
      console.error('[createurs/photo] image trop volumineuse:', buffer.byteLength)
      return res.status(404).json({ error: 'Photo introuvable' })
    }

    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Length', String(buffer.byteLength))
    res.setHeader('Cache-Control', CACHE_CONTROL)
    res.setHeader('Netlify-CDN-Cache-Control', CDN_CACHE_CONTROL)
    if (req.method === 'HEAD') return res.status(200).end()
    return res.status(200).send(buffer)
  } catch (error) {
    console.error('[createurs/photo] erreur inattendue:', (error as Error).message)
    return res.status(404).json({ error: 'Photo indisponible' })
  }
}
