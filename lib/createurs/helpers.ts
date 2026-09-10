import type { Influencer, PlatformFilter, PlatformStats, Zone } from './types'

// ──────────────────────────────────────────────
// PARSING — tolérant aux données incomplètes ("À définir", champ vide).
// Aucune de ces fonctions ne jette : elles renvoient null et l'appelant décide.
// ──────────────────────────────────────────────

// "3,3%" → 3.3 · "À définir" → null
export const parsePct = (value: string): number | null => {
  const match = value.match(/(\d+(?:[.,]\d+)?)/)
  return match ? parseFloat(match[1].replace(',', '.')) : null
}

// ──────────────────────────────────────────────
// SEUIL DE SIGNIFICATIVITÉ
// Un taux calculé sur 200 abonnés n'a aucune valeur comparative : trois likes de
// plus le font varier de plusieurs points. En dessous du seuil, le taux n'est ni
// affiché ni pris en compte par le tri — il est traité comme absent.
// ──────────────────────────────────────────────

export const MIN_FOLLOWERS_FOR_ENGAGEMENT = 500

export const SMALL_AUDIENCE_TITLE = 'Audience trop petite pour un taux significatif'

/** Le taux à afficher, ou `null` s'il est absent ou adossé à moins de 500 abonnés. */
export const displayedEngagement = (stats: PlatformStats | undefined): string | null => {
  if (!stats || !stats.url) return null
  if (parsePct(stats.engagement) === null) return null
  const followers = parseCount(stats.followers)
  if (followers === null || followers < MIN_FOLLOWERS_FOR_ENGAGEMENT) return null
  return stats.engagement
}

// "1,1K" → 1100 · "14,2K" → 14200 · "375" → 375 · "À définir" → null
// Accepte aussi un nombre brut : Airtable renverra des nombres en PR 3.
export const parseCount = (value: string | number | null | undefined): number | null => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (!value) return null
  const match = String(value).match(/(\d+(?:[.,]\d+)?)\s*([KkMm])?/)
  if (!match) return null
  const n = parseFloat(match[1].replace(',', '.'))
  if (!Number.isFinite(n)) return null
  const suffix = match[2] ? match[2].toLowerCase() : ''
  if (suffix === 'k') return Math.round(n * 1000)
  if (suffix === 'm') return Math.round(n * 1000000)
  return Math.round(n)
}

// 1100 → "1,1K" · 375 → "375" — format français, cohérent avec les fiches existantes.
export const formatCount = (n: number): string => {
  if (n >= 1000000) return `${(Math.round((n / 1000000) * 10) / 10).toString().replace('.', ',')}M`
  if (n >= 1000) return `${(Math.round((n / 1000) * 10) / 10).toString().replace('.', ',')}K`
  return String(n)
}

// 8.7 → "8,7%"
export const formatPct = (n: number): string =>
  `${(Math.round(n * 10) / 10).toString().replace('.', ',')}%`

// ──────────────────────────────────────────────
// AGRÉGATS PAR CRÉATEUR
// ──────────────────────────────────────────────

// Moyenne des plateformes dont le taux est affichable (chiffré et ≥ 500 abonnés).
// null si aucune — une créatrice en dessous du seuil partout n'a pas de moyenne.
// Accepte toute forme portant les plateformes : `airtable.ts` trie ses fiches
// avant même de leur avoir attribué un slug.
export const getAvgEngagementValue = (
  inf: Pick<Influencer, 'instagram' | 'tiktok' | 'youtube'>,
): number | null => {
  const values = [inf.instagram, inf.tiktok, inf.youtube]
    .map((stats) => displayedEngagement(stats))
    .map((value) => (value === null ? null : parsePct(value)))
    .filter((n): n is number => n !== null)
  if (values.length === 0) return null
  return values.reduce((a, b) => a + b, 0) / values.length
}

// Taux d'engagement moyen des plateformes renseignées ("À définir" si aucune)
export const getAvgEngagement = (inf: Influencer): string => {
  const avg = getAvgEngagementValue(inf)
  return avg === null ? 'À définir' : formatPct(avg)
}

// Une créatrice « a » une plateforme si l'URL est renseignée.
export const hasPlatform = (inf: Influencer, platform: 'instagram' | 'tiktok' | 'youtube'): boolean =>
  Boolean(inf[platform]?.url)

// Abonnés sur la plateforme demandée, ou le max de toutes si « tous ».
export const getFollowers = (inf: Influencer, platform: PlatformFilter): number | null => {
  if (platform !== 'tous') return parseCount(inf[platform]?.followers)
  const counts = [inf.instagram, inf.tiktok, inf.youtube]
    .map((stats) => parseCount(stats?.followers))
    .filter((n): n is number => n !== null)
  return counts.length ? Math.max(...counts) : null
}

// ──────────────────────────────────────────────
// ZONES — dérivées du champ `location`, texte libre.
// Tolérant : une localisation non reconnue renvoie null et n'est filtrée
// que si l'utilisateur a explicitement coché une zone.
// ──────────────────────────────────────────────

const COMMUNES: Record<Exclude<Zone, "Toute l'île" | 'Hors Réunion'>, string[]> = {
  Nord: ['saint-denis', 'st-denis', 'sainte-marie', 'sainte-suzanne'],
  Est: ['saint-andre', 'st-andre', 'bras-panon', 'saint-benoit', 'sainte-rose', 'salazie', 'plaine-des-palmistes'],
  Sud: ['saint-pierre', 'st-pierre', 'tampon', 'saint-louis', 'st-louis', 'saint-joseph', 'petite-ile', 'saint-philippe', 'cilaos', 'entre-deux', 'les-avirons', 'etang-sale'],
  Ouest: ['saint-paul', 'st-paul', 'le-port', 'la-possession', 'saint-leu', 'st-leu', 'trois-bassins', 'saint-gilles'],
}

const HORS_REUNION = ['paris', 'lyon', 'marseille', 'bordeaux', 'toulouse', 'lille', 'nantes', 'nice', 'montpellier', 'strasbourg', 'rennes', 'metropole', 'mayotte', 'maurice', 'madagascar']

// Normalise pour comparer sans accents ni ponctuation : "Saint-Pierre (Sud)" → "saint-pierre sud"
const normalize = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9-]+/g, ' ')
    .trim()

export const getZone = (location: string | undefined | null): Zone | null => {
  if (!location) return null
  const n = normalize(location)

  // 1. Marqueur explicite de zone, ex. "Saint-Louis (Sud)"
  if (/\bnord\b/.test(n)) return 'Nord'
  if (/\bsud\b/.test(n)) return 'Sud'
  if (/\best\b/.test(n)) return 'Est'
  if (/\bouest\b/.test(n)) return 'Ouest'

  // 2. Couverture totale de l'île
  if (/toute\s+l\s*ile|toute\s+lile|toute\s+la\s+reunion/.test(n)) return "Toute l'île"

  // 3. Commune réunionnaise reconnue
  for (const zone of Object.keys(COMMUNES) as Array<keyof typeof COMMUNES>) {
    if (COMMUNES[zone].some((c) => n.includes(c))) return zone
  }

  // 4. Ville hors Réunion
  if (HORS_REUNION.some((c) => n.includes(c))) return 'Hors Réunion'

  return null
}

// ──────────────────────────────────────────────
// NICHES
// ──────────────────────────────────────────────

const nicheColors: Record<string, string> = {
  'Mode': 'from-pink-500 to-rose-500',
  'Beauté': 'from-fuchsia-500 to-pink-500',
  'Hygiène': 'from-teal-400 to-cyan-500',
  'Cheveux bouclés': 'from-amber-400 to-orange-500',
  'Sport': 'from-emerald-400 to-green-500',
  'Food': 'from-orange-400 to-red-500',
  'Voyage': 'from-blue-400 to-indigo-500',
  'Lifestyle': 'from-purple-400 to-violet-500',
  'Tech': 'from-cyan-400 to-blue-500',
  'Famille': 'from-yellow-400 to-amber-500',
  'Musique': 'from-indigo-400 to-purple-500',
  'Fitness': 'from-lime-400 to-emerald-500',
  'Gaming': 'from-violet-500 to-purple-600',
  'Humour': 'from-yellow-500 to-orange-500',
  'Podcast': 'from-rose-400 to-red-500',
  'Île': 'from-sky-400 to-blue-500',
  'Activités touristiques': 'from-teal-500 to-emerald-500',
}

export const getNicheColor = (niche: string) => nicheColors[niche] || 'from-gray-400 to-gray-500'

// Niches réellement présentes dans le jeu de données, triées.
export const collectNiches = (creators: Influencer[]): string[] =>
  Array.from(new Set(creators.flatMap((c) => c.niches))).sort((a, b) => a.localeCompare(b, 'fr'))

// Zones réellement représentées, dans l'ordre canonique.
export const collectZones = (creators: Influencer[], order: readonly Zone[]): Zone[] => {
  const present = new Set(creators.map((c) => getZone(c.location)).filter((z): z is Zone => z !== null))
  return order.filter((z) => present.has(z))
}

// ──────────────────────────────────────────────
// VILLES — compteur du hero « N créateurs · M villes ».
// ──────────────────────────────────────────────

// Ces libellés désignent l'île entière, pas une ville : les compter gonflerait
// le compteur d'une « ville » qui n'en est pas une.
const REGION_KEYS = new Set([
  'la reunion',
  'reunion',
  'ile de la reunion',
  '974',
  'toute l ile',
  'toute la reunion',
])

// « Saint-Pierre » et « saint pierre » sont la même ville ; le tiret des noms
// composés est conservé comme séparateur de mots, pas comme séparateur de villes.
const cityKey = (raw: string): string =>
  raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

/**
 * Villes distinctes représentées par les fiches. « La Réunion — Paris » compte
 * pour Paris : le tiret cadratin sépare deux lieux, pas un nom composé.
 */
export const collectCities = (creators: Influencer[]): string[] => {
  const seen = new Map<string, string>()
  for (const creator of creators) {
    for (const part of (creator.city || creator.location || '').split(/[—–/,]/)) {
      const label = part.trim()
      if (!label) continue
      const key = cityKey(label)
      if (!key || REGION_KEYS.has(key) || seen.has(key)) continue
      seen.set(key, label)
    }
  }
  return Array.from(seen.values())
}
