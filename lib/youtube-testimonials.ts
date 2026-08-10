// Source de données de la section Témoignages de la home.
//
// SERVER-ONLY. Ce module lit YOUTUBE_API_KEY / AIRTABLE_PAT : il ne doit être
// importé que depuis un getStaticProps (Next retire getStaticProps et ses
// imports exclusifs du bundle client). Le composant TestimonialsSection
// n'en importe que des *types* (`import type`), effacés à la compilation.
//
// Vidéos : playlist « uploads » de la chaîne YouTube, filtrée sur les titres
// se terminant par « — Témoignage client Digiqo ».
// Citations écrites : table Airtable « Témoignage Clients » existante,
// associées par correspondance sur le nom du client (casse/accents ignorés).

export interface VideoTestimonial {
  id: string
  videoId: string
  /** Nom du client tel qu'écrit dans le titre YouTube, avant le « — ». */
  username: string
  /** Citation Airtable associée. Chaîne vide si aucune correspondance. */
  content: string
  thumbnail?: string
  likes: number
  comments: number
  /**
   * Date ISO de mise en ligne de la vidéo, pour le JSON-LD VideoObject
   * uniquement. Jamais affichée : sur YouTube c'est une date de
   * republication, pas la date réelle du témoignage.
   */
  uploadDate: string
}

// Suffixe marquant un témoignage client. Les variantes de tiret (—, –, -) sont
// tolérées : une faute de frappe dans un titre ne doit pas faire disparaître
// une vidéo de la section.
const TESTIMONIAL_SUFFIX = /\s*[—–-]\s*Témoignage client Digiqo\s*$/i

// Clé de rapprochement YouTube ↔ Airtable : minuscules, sans accents, sans
// ponctuation ni espaces. « Côte Seine » et « COTE-SEINE » collent.
function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

interface PlaylistItem {
  snippet?: {
    title?: string
    publishedAt?: string
    resourceId?: { videoId?: string }
    thumbnails?: Record<string, { url: string; width: number; height: number } | undefined>
  }
}

// playlistItems, part=snippet, maxResults=50, pagination via nextPageToken.
// La chaîne compte ~241 vidéos → ~5 pages. Garde-fou à 20 pages.
async function fetchPlaylistItems(playlistId: string, apiKey: string): Promise<PlaylistItem[]> {
  const items: PlaylistItem[] = []
  let pageToken: string | undefined
  let pages = 0

  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('key', apiKey)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const response = await fetch(url.toString())
    if (!response.ok) {
      // Ne jamais laisser fuiter l'URL (elle contient la clé) dans les logs.
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()
    if (Array.isArray(data.items)) items.push(...data.items)
    pageToken = data.nextPageToken
    pages++
  } while (pageToken && pages < 20)

  return items
}

interface AirtableRecord {
  fields?: {
    /** Nom exact tel qu'il apparaît dans le titre YouTube — clé prioritaire. */
    'Nom YouTube'?: string
    "Nom d'entreprise"?: string
    'Témoignage écrit'?: string
  }
}

// Citations écrites : même base/table que pages/api/testimonials.ts.
// Un échec ici ne doit pas faire tomber les vidéos → on renvoie une Map vide.
async function fetchWrittenQuotes(): Promise<Map<string, string>> {
  const quotes = new Map<string, string>()

  const AIRTABLE_PAT = process.env.AIRTABLE_PAT
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || 'tbloGgkShulfnYDCw'

  if (!AIRTABLE_PAT) {
    console.warn('[testimonials] AIRTABLE_PAT absent — cartes sans citation')
    return quotes
  }

  try {
    const records: AirtableRecord[] = []
    let offset: string | undefined
    let pages = 0

    do {
      const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`)
      if (offset) url.searchParams.set('offset', offset)

      const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${AIRTABLE_PAT}` },
      })
      if (!response.ok) throw new Error(`Airtable API error: ${response.status}`)

      const data = await response.json()
      records.push(...((data.records || []) as AirtableRecord[]))
      offset = data.offset
      pages++
    } while (offset && pages < 20)

    // Deux passes : « Nom d'entreprise » d'abord (fallback historique, souvent
    // un handle Instagram), puis « Nom YouTube » qui écrase en cas de collision.
    for (const record of records) {
      const company = record.fields?.["Nom d'entreprise"]
      const quote = record.fields?.['Témoignage écrit']
      if (company && quote) quotes.set(normalizeName(company), quote)
    }
    for (const record of records) {
      const youtubeName = record.fields?.['Nom YouTube']
      const quote = record.fields?.['Témoignage écrit']
      if (youtubeName && quote) quotes.set(normalizeName(youtubeName), quote)
    }
  } catch (error) {
    console.error('[testimonials] Airtable indisponible, citations ignorées:', error)
    return new Map()
  }

  return quotes
}

/**
 * Renvoie les témoignages vidéo pour la home. Ne lève jamais : en cas
 * d'erreur API ou de quota dépassé, renvoie un tableau vide et la section
 * se masque d'elle-même (fallback silencieux).
 */
export async function getVideoTestimonials(): Promise<VideoTestimonial[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const playlistId = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID

  if (!apiKey || !playlistId) {
    console.warn('[testimonials] YOUTUBE_API_KEY / YOUTUBE_UPLOADS_PLAYLIST_ID absents')
    return []
  }

  try {
    const [items, quotes] = await Promise.all([
      fetchPlaylistItems(playlistId, apiKey),
      fetchWrittenQuotes(),
    ])

    return items
      .filter((item) => {
        const title = item.snippet?.title
        return !!title && !!item.snippet?.resourceId?.videoId && TESTIMONIAL_SUFFIX.test(title)
      })
      .map((item, index) => {
        const snippet = item.snippet!
        const videoId = snippet.resourceId!.videoId!
        const username = snippet.title!.replace(TESTIMONIAL_SUFFIX, '').trim()
        const thumbnails = snippet.thumbnails || {}
        const thumbnail =
          thumbnails.standard?.url ||
          thumbnails.high?.url ||
          thumbnails.medium?.url ||
          thumbnails.default?.url

        return {
          id: videoId,
          videoId,
          username,
          // Vidéo sans citation → carte sans texte, pas d'erreur.
          content: quotes.get(normalizeName(username)) || '',
          thumbnail,
          // Mêmes formules que l'ancienne source, pour un rendu identique.
          likes: 150 + ((index * 23) % 100),
          comments: 10 + ((index * 7) % 30),
          uploadDate: snippet.publishedAt || '',
        }
      })
  } catch (error) {
    console.error('[testimonials] YouTube indisponible, section masquée:', error)
    return []
  }
}
