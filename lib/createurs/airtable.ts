import { CREATORS } from './data'
import { formatCount, formatPct, getAvgEngagementValue } from './helpers'
import type { CreatorCategory, CreatorLevel, Influencer, PlatformStats } from './types'

// ──────────────────────────────────────────────
// SOURCE AIRTABLE — lecture serveur uniquement (getStaticProps + ISR).
// Le PAT ne franchit jamais la frontière client : ce module n'est jamais importé
// par un composant, seulement par `getStaticProps`.
//
// Rien ici ne jette : toute panne renvoie une liste vide, et l'appelant bascule
// sur FALLBACK_INFLUENCERS. Une page créateurs vide serait pire qu'une page figée.
// ──────────────────────────────────────────────

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'
const CREATEURS_TABLE_ID = 'tblBGZ8bj26D4hd02'
const FETCH_TIMEOUT_MS = 10000

const STATUT_PUBLIE = 'Publié sur le site'

/** Liste figée conservée comme filet : elle reste la page telle qu'elle était avant Airtable. */
export const FALLBACK_INFLUENCERS: Influencer[] = CREATORS.filter((c) => !c.pending)

const F = {
  nom: 'fldc89nmEMDwpd5Ib',
  instagram: 'fldp0qO7xwENwLyrf',
  tiktok: 'fld3l41eQ1K0YLO40',
  abonnesInstagram: 'fld8lmMBF6Qim6iKX',
  abonnesTiktok: 'fldcLXoGhO7j16yMu',
  tauxInstagram: 'fldWDZz4a3s9Gxiyj',
  tauxTiktok: 'fldbsvFwCtV5PsVUK',
  niches: 'fldD7EcrA8BYMhhD2',
  typesContenu: 'fld2gJKPQ4xxJNymN',
  bio: 'fldGwf08wx8pZfXLA',
  ville: 'fldlWcx3PTnm38WHn',
  zone: 'fldxDbzNDk8prTQld',
  photo: 'fldMbGhLLpnJyFSN8',
  ordre: 'fldMBNpkIrXg7fWwY',
  featured: 'fldvxuhh6Mb87Tt0K',
  prenom: 'fldMQzoISbW3cci6H',
  youtube: 'fldHLkVUTNyLdsCJQ',
  abonnesYoutube: 'fldWclOYPe66aNwut',
  tauxYoutube: 'fld8PwfqwGDYzbV5y',
  niveau: 'fldhXbffl8xja8SdL',
  categorie: 'fldjMCdeKTVFKwSIL',
} as const

const UNDEFINED_LABEL = 'À définir'

interface AirtableRecord {
  id: string
  fields?: Record<string, unknown>
}

// ──────────────────────────────────────────────
// Conversions champ → UI
// ──────────────────────────────────────────────

const asText = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

const asNumber = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null)

const asList = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim() !== '') : []

/** Les pièces jointes Airtable sont des objets : seule la longueur du tableau compte ici. */
const hasAttachment = (v: unknown): boolean => Array.isArray(v) && v.length > 0

/** `https://www.instagram.com/op_lehoux/` → `@op_lehoux` */
export const handleFromUrl = (url: string): string | null => {
  const last = url.trim().replace(/[?#].*$/, '').replace(/\/+$/, '').split('/').pop() || ''
  const clean = last.replace(/^@+/, '').toLowerCase()
  return /^[a-z0-9._-]{1,60}$/.test(clean) ? `@${clean}` : null
}

/**
 * Airtable stocke les pourcents en fraction : 0.087 → « 8,7% ».
 * Un taux absent devient « À définir », que `displayedEngagement` masque à
 * l'affichage plutôt que d'afficher un zéro trompeur.
 */
const toPlatform = (url: string, followers: number | null, rate: number | null): PlatformStats => ({
  url,
  followers: followers === null ? UNDEFINED_LABEL : formatCount(followers),
  engagement: rate === null ? UNDEFINED_LABEL : formatPct(rate * 100),
})

// Vocabulaire Airtable → vocabulaire d'icônes de la page (`contentTypeIcons`).
// Les formats sans équivalent sont conservés tels quels : la page retombe sur
// l'icône générique plutôt que de perdre l'information.
const CONTENT_TYPE_MAP: Record<string, string[]> = {
  UGC: ['UGC'],
  'Reels / TikTok': ['Reels', 'TikTok'],
  Photo: ['Posts'],
}

export const mapContentTypes = (types: string[]): string[] => {
  const out: string[] = []
  for (const type of types) {
    for (const mapped of CONTENT_TYPE_MAP[type] ?? [type]) {
      if (!out.includes(mapped)) out.push(mapped)
    }
  }
  return out
}

/** Compare deux libellés de lieu sans accent ni ponctuation, pour éviter « Paris — Paris ». */
const samePlace = (a: string, b: string): boolean => {
  const norm = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
  const na = norm(a)
  const nb = norm(b)
  return na === nb || na.includes(nb) || nb.includes(na)
}

/** « Saint-Louis » + « Sud de l'île » → « Saint-Louis — Sud de l'île ». Doublon évité. */
export const buildLocation = (ville: string, zone: string): string => {
  if (!ville) return zone
  if (!zone || samePlace(ville, zone)) return ville
  return `${ville} — ${zone}`
}

// Photos déjà versionnées dans le repo, indexées par handle : elles servent de
// repli tant que la fiche Airtable n'a pas d'attachment.
const REPO_PHOTOS: Record<string, string> = Object.fromEntries(
  FALLBACK_INFLUENCERS.map((c) => [c.handle.toLowerCase(), c.photo]),
)

// Niveau et catégorie sont calculés par n8n dans Airtable. Une valeur inconnue
// (option renommée, champ vide sur une fiche publiée avant le calcul) retombe sur
// le choix le plus neutre plutôt que de faire disparaître la fiche.
const LEVEL_BY_LABEL: Record<string, CreatorLevel> = {
  Top: 'top',
  'Confirmé': 'confirme',
  Nouveau: 'nouveau',
}

const CATEGORY_BY_LABEL: Record<string, CreatorCategory> = {
  UGC: 'ugc',
  Influence: 'influence',
  'UGC + Influence': 'ugc-influence',
}

const toLevel = (v: unknown): CreatorLevel => LEVEL_BY_LABEL[asText(v)] ?? 'nouveau'

const toCategory = (v: unknown): CreatorCategory => CATEGORY_BY_LABEL[asText(v)] ?? 'ugc'

const PLACEHOLDER_PHOTO = '/assets/createurs/placeholder.png'

/**
 * L'URL d'attachment Airtable expire en quelques heures : elle ne peut pas être
 * figée dans une page ISR. On sert la photo par notre propre route, qui la
 * récupère à la demande et la met en cache côté CDN.
 */
const photoFor = (recordId: string, withAttachment: boolean, handle: string | null): string => {
  if (withAttachment) return `/api/createurs/photo/${recordId}`
  const repo = handle ? REPO_PHOTOS[handle.toLowerCase()] : undefined
  return repo || PLACEHOLDER_PHOTO
}

/** Une fiche telle que la lit Airtable : le slug n'est attribué qu'une fois la liste complète connue. */
type MappedCreator = Omit<Influencer, 'slug'>

const mapRecord = (record: AirtableRecord): MappedCreator | null => {
  const f = record.fields || {}
  const name = asText(f[F.nom])
  if (!name) return null

  const instagramUrl = asText(f[F.instagram])
  const tiktokUrl = asText(f[F.tiktok])
  const youtubeUrl = asText(f[F.youtube])
  const handle = (instagramUrl && handleFromUrl(instagramUrl)) || (tiktokUrl && handleFromUrl(tiktokUrl)) || null
  const ville = asText(f[F.ville])

  return {
    name,
    // Le prénom porte le titre SEO de la fiche : à défaut, le premier mot du nom.
    firstName: asText(f[F.prenom]) || name.split(' ')[0],
    handle: handle || '',
    photo: photoFor(record.id, hasAttachment(f[F.photo]), handle),
    city: ville,
    location: buildLocation(ville, asText(f[F.zone])),
    niveau: toLevel(f[F.niveau]),
    categorie: toCategory(f[F.categorie]),
    niches: asList(f[F.niches]),
    bio: asText(f[F.bio]),
    instagram: toPlatform(instagramUrl, asNumber(f[F.abonnesInstagram]), asNumber(f[F.tauxInstagram])),
    tiktok: toPlatform(tiktokUrl, asNumber(f[F.abonnesTiktok]), asNumber(f[F.tauxTiktok])),
    // Clé absente et non `undefined` : `getStaticProps` refuse de sérialiser `undefined`.
    ...(youtubeUrl
      ? { youtube: toPlatform(youtubeUrl, asNumber(f[F.abonnesYoutube]), asNumber(f[F.tauxYoutube])) }
      : {}),
    contentTypes: mapContentTypes(asList(f[F.typesContenu])),
    featured: f[F.featured] === true,
  }
}

/**
 * Un slug par fiche, garanti unique : deux comptes Instagram ne peuvent pas
 * porter le même identifiant, mais un repli TikTok le peut. La première fiche
 * dans l'ordre d'affichage garde le slug propre, la suivante prend un suffixe —
 * son URL change, mais aucune des deux ne disparaît de la liste.
 */
const assignSlugs = (rows: MappedCreator[]): Influencer[] => {
  const used = new Set<string>()
  return rows.map((inf, index) => {
    const base = inf.handle.replace(/^@+/, '').toLowerCase() || `createur-${index + 1}`
    let slug = base
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`
    if (slug !== base) {
      console.warn(`[createurs] slug « ${base} » déjà pris (${inf.name}) — fiche servie sur « ${slug} »`)
    }
    used.add(slug)
    return { ...inf, slug }
  })
}

/**
 * « Ordre site » croissant, les fiches sans ordre à la fin, puis engagement moyen
 * décroissant. Les fiches sans engagement chiffré ferment la marche.
 */
const compare = (a: { inf: MappedCreator; ordre: number | null }, b: { inf: MappedCreator; ordre: number | null }): number => {
  if (a.ordre !== b.ordre) {
    if (a.ordre === null) return 1
    if (b.ordre === null) return -1
    return a.ordre - b.ordre
  }
  const ea = getAvgEngagementValue(a.inf)
  const eb = getAvgEngagementValue(b.inf)
  if (ea === eb) return a.inf.name.localeCompare(b.inf.name, 'fr')
  if (ea === null) return 1
  if (eb === null) return -1
  return eb - ea
}

export const fetchPublishedCreators = async (): Promise<Influencer[]> => {
  const pat = process.env.AIRTABLE_PAT || ''
  if (!pat) {
    console.warn('[createurs] AIRTABLE_PAT absente — page servie depuis la liste figée')
    return []
  }

  const params = new URLSearchParams({
    filterByFormula: `{Statut} = '${STATUT_PUBLIE}'`,
    pageSize: '100',
    returnFieldsByFieldId: 'true',
  })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CREATEURS_TABLE_ID}?${params.toString()}`,
      { headers: { Authorization: `Bearer ${pat}` }, signal: controller.signal },
    )
    if (!response.ok) {
      console.error('[createurs] Airtable a refusé la lecture:', response.status, await response.text())
      return []
    }

    const data = (await response.json()) as { records?: AirtableRecord[] }
    const rows = (data.records || [])
      .map((record) => ({ inf: mapRecord(record), ordre: asNumber(record.fields?.[F.ordre]) }))
      .filter((row): row is { inf: MappedCreator; ordre: number | null } => row.inf !== null)

    rows.sort(compare)
    return assignSlugs(rows.map((row) => row.inf))
  } catch (error) {
    console.error('[createurs] Airtable injoignable:', (error as Error).message)
    return []
  } finally {
    clearTimeout(timeout)
  }
}

/** Fiches à afficher : Airtable si elle répond avec au moins une fiche, sinon la liste figée. */
export const getCreatorsForPage = async (): Promise<{ creators: Influencer[]; source: 'airtable' | 'fallback' }> => {
  const creators = await fetchPublishedCreators()
  if (creators.length === 0) {
    console.warn('[createurs] aucune fiche publiée reçue — bascule sur la liste figée')
    return { creators: FALLBACK_INFLUENCERS, source: 'fallback' }
  }
  return { creators, source: 'airtable' }
}

/**
 * Fiche unique, lue dans la même liste que /createurs : slugs, ordre et repli
 * restent cohérents entre la liste et la fiche, au prix d'une seule requête.
 * `null` = fiche inconnue ou non publiée → 404 côté page.
 */
export const getCreatorBySlug = async (slug: string): Promise<Influencer | null> => {
  const { creators } = await getCreatorsForPage()
  return creators.find((creator) => creator.slug === slug) ?? null
}
