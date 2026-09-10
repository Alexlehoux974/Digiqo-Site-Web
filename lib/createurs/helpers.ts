import type { Influencer, PlatformFilter, Zone } from './types'

// ──────────────────────────────────────────────
// PARSING — tolérant aux données incomplètes ("À définir", champ vide).
// Aucune de ces fonctions ne jette : elles renvoient null et l'appelant décide.
// ──────────────────────────────────────────────

// "3,3%" → 3.3 · "À définir" → null
export const parsePct = (value: string): number | null => {
  const match = value.match(/(\d+(?:[.,]\d+)?)/)
  return match ? parseFloat(match[1].replace(',', '.')) : null
}

// Une valeur d'engagement n'est affichée que si elle est chiffrée
// (« À définir » → la ligne Engagement est masquée plutôt que rendue telle quelle)
export const hasEngagement = (value: string): boolean => parsePct(value) !== null

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

// Moyenne des plateformes disposant d'un taux chiffré. null si aucune.
// Accepte toute forme portant les deux plateformes : `airtable.ts` trie ses fiches
// avant même de leur avoir attribué un slug.
export const getAvgEngagementValue = (inf: Pick<Influencer, 'instagram' | 'tiktok'>): number | null => {
  const values = [inf.instagram.engagement, inf.tiktok.engagement]
    .map(parsePct)
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
export const hasPlatform = (inf: Influencer, platform: 'instagram' | 'tiktok'): boolean =>
  Boolean(inf[platform] && inf[platform].url)

// Abonnés sur la plateforme demandée, ou le max des deux si « tous ».
export const getFollowers = (inf: Influencer, platform: PlatformFilter): number | null => {
  if (platform === 'instagram') return parseCount(inf.instagram.followers)
  if (platform === 'tiktok') return parseCount(inf.tiktok.followers)
  const counts = [parseCount(inf.instagram.followers), parseCount(inf.tiktok.followers)]
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
//
// Seules les communes de La Réunion comptent : le compteur annonce la
// couverture de l'île. « La Réunion » n'est pas une commune, et une créatrice
// basée « La Réunion — Paris » n'ajoute pas Paris au décompte.
// ──────────────────────────────────────────────

// Les 24 communes, plus quelques localités que les créatrices écrivent à la
// place de leur commune. La valeur est la commune : Saint-Gilles et Saint-Paul
// ne comptent qu'une fois.
const COMMUNES_974: Record<string, string> = {
  'les avirons': 'Les Avirons',
  'bras panon': 'Bras-Panon',
  cilaos: 'Cilaos',
  'entre deux': 'Entre-Deux',
  'l etang sale': "L'Étang-Salé",
  'etang sale': "L'Étang-Salé",
  'petite ile': 'Petite-Île',
  'la plaine des palmistes': 'La Plaine-des-Palmistes',
  'plaine des palmistes': 'La Plaine-des-Palmistes',
  'le port': 'Le Port',
  'la possession': 'La Possession',
  'saint andre': 'Saint-André',
  'saint benoit': 'Saint-Benoît',
  'saint denis': 'Saint-Denis',
  'sainte clotilde': 'Saint-Denis',
  'le chaudron': 'Saint-Denis',
  'saint joseph': 'Saint-Joseph',
  'saint leu': 'Saint-Leu',
  'saint louis': 'Saint-Louis',
  'la riviere': 'Saint-Louis',
  'saint paul': 'Saint-Paul',
  'saint gilles': 'Saint-Paul',
  'la saline': 'Saint-Paul',
  'l hermitage': 'Saint-Paul',
  hermitage: 'Saint-Paul',
  'saint philippe': 'Saint-Philippe',
  'saint pierre': 'Saint-Pierre',
  'terre sainte': 'Saint-Pierre',
  'grand bois': 'Saint-Pierre',
  'sainte marie': 'Sainte-Marie',
  'sainte rose': 'Sainte-Rose',
  'sainte suzanne': 'Sainte-Suzanne',
  salazie: 'Salazie',
  'le tampon': 'Le Tampon',
  'les trois bassins': 'Les Trois-Bassins',
  'trois bassins': 'Les Trois-Bassins',
}

// « Saint-Pierre (974) » → « saint pierre 974 » · « St-Denis » → « saint denis ».
const cityKey = (raw: string): string =>
  raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\bst\b/g, 'saint')
    .replace(/\bste\b/g, 'sainte')
    .replace(/\s+/g, ' ')

/** La commune reconnue dans un libellé, ou `null`. Comparaison sur mots entiers. */
const communeIn = (label: string): string | null => {
  const key = cityKey(label)
  if (!key) return null
  if (COMMUNES_974[key]) return COMMUNES_974[key]
  const padded = ` ${key} `
  for (const [name, commune] of Object.entries(COMMUNES_974)) {
    if (padded.includes(` ${name} `)) return commune
  }
  return null
}

/**
 * Communes réunionnaises distinctes représentées par les fiches. Le tiret
 * cadratin sépare deux lieux : « La Réunion — Paris » ne donne aucune commune.
 */
export const collectCities = (creators: Influencer[]): string[] => {
  const seen = new Set<string>()
  for (const creator of creators) {
    for (const part of (creator.city || creator.location || '').split(/[—–/,]/)) {
      const commune = communeIn(part)
      if (commune) seen.add(commune)
    }
  }
  return Array.from(seen)
}
