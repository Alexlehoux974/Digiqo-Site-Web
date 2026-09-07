import type { Influencer, CreatorFilters, FollowerBucket, Zone } from './types'
import { ZONES, DEFAULT_FILTERS } from './types'
import { getAvgEngagementValue, getFollowers, getZone, hasPlatform, parseCount } from './helpers'

// ──────────────────────────────────────────────
// FILTRAGE — aucune combinaison ne doit jeter sur des données incomplètes.
// Règle générale : une donnée manquante exclut la fiche du filtre correspondant
// seulement si ce filtre est actif ; sinon la fiche reste visible.
// ──────────────────────────────────────────────

const BUCKETS: Record<Exclude<FollowerBucket, 'tous'>, [number, number]> = {
  lt1k: [0, 1000],
  '1k10k': [1000, 10000],
  '10k50k': [10000, 50000],
  gt50k: [50000, Number.POSITIVE_INFINITY],
}

export const matchesFilters = (inf: Influencer, f: CreatorFilters): boolean => {
  // Plateforme : la créatrice doit avoir un compte sur la plateforme demandée.
  if (f.platform !== 'tous' && !hasPlatform(inf, f.platform)) return false

  // Abonnés, sur la plateforme sélectionnée (ou le max des deux si « tous »).
  if (f.followers !== 'tous') {
    const count = getFollowers(inf, f.platform)
    if (count === null) return false
    const [min, max] = BUCKETS[f.followers]
    if (count < min || count >= max) return false
  }

  // Engagement minimum, sur la moyenne des plateformes chiffrées.
  if (f.engagement !== 'tous') {
    const avg = getAvgEngagementValue(inf)
    if (avg === null || avg < Number(f.engagement)) return false
  }

  // Niches : multi-sélection en OU (au moins une niche commune).
  if (f.niches.length > 0 && !f.niches.some((n) => inf.niches.includes(n))) return false

  // Zones : multi-sélection en OU.
  if (f.zones.length > 0) {
    const zone = getZone(inf.location)
    if (zone === null || !f.zones.includes(zone)) return false
  }

  return true
}

// ──────────────────────────────────────────────
// TRI — les fiches sans donnée passent toujours en dernier,
// pour ne jamais faire remonter un profil incomplet en tête de liste.
// ──────────────────────────────────────────────

const compareNullableDesc = (a: number | null, b: number | null): number => {
  if (a === null && b === null) return 0
  if (a === null) return 1
  if (b === null) return -1
  return b - a
}

export const sortCreators = (creators: Influencer[], f: CreatorFilters): Influencer[] => {
  const sorted = [...creators]
  if (f.sort === 'az') {
    sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  } else if (f.sort === 'abonnes') {
    sorted.sort((a, b) => compareNullableDesc(getFollowers(a, f.platform), getFollowers(b, f.platform)))
  } else {
    sorted.sort((a, b) => compareNullableDesc(getAvgEngagementValue(a), getAvgEngagementValue(b)))
  }
  return sorted
}

export const applyFilters = (creators: Influencer[], f: CreatorFilters): Influencer[] =>
  sortCreators(creators.filter((c) => matchesFilters(c, f)), f)

export const countActiveFilters = (f: CreatorFilters): number =>
  (f.platform !== 'tous' ? 1 : 0) +
  (f.followers !== 'tous' ? 1 : 0) +
  (f.engagement !== 'tous' ? 1 : 0) +
  f.niches.length +
  f.zones.length

export const isDefaultFilters = (f: CreatorFilters): boolean =>
  countActiveFilters(f) === 0 && f.sort === DEFAULT_FILTERS.sort

// ──────────────────────────────────────────────
// ÉTAT DANS L'URL — partageable, ex. ?plateforme=tiktok&min_eng=5
// Sérialisation volontairement partielle : seules les valeurs non par défaut
// sont écrites, pour garder /createurs propre tant qu'aucun filtre n'est actif.
// ──────────────────────────────────────────────

type Query = Record<string, string | string[] | undefined>

const first = (v: string | string[] | undefined): string => (Array.isArray(v) ? v[0] ?? '' : v ?? '')

const oneOf = <T extends string>(value: string, allowed: readonly T[], fallback: T): T =>
  (allowed as readonly string[]).includes(value) ? (value as T) : fallback

const list = (value: string): string[] =>
  value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []

export const filtersToQuery = (f: CreatorFilters): Record<string, string> => {
  const q: Record<string, string> = {}
  if (f.platform !== 'tous') q.plateforme = f.platform
  if (f.followers !== 'tous') q.abonnes = f.followers
  if (f.engagement !== 'tous') q.min_eng = f.engagement
  if (f.niches.length) q.niches = f.niches.join(',')
  if (f.zones.length) q.zones = f.zones.join(',')
  if (f.sort !== DEFAULT_FILTERS.sort) q.tri = f.sort
  return q
}

// Tolérant : toute valeur inconnue retombe sur le défaut plutôt que de casser la page.
export const filtersFromQuery = (query: Query, knownNiches: string[]): CreatorFilters => ({
  platform: oneOf(first(query.plateforme), ['tous', 'instagram', 'tiktok'] as const, 'tous'),
  followers: oneOf(first(query.abonnes), ['tous', 'lt1k', '1k10k', '10k50k', 'gt50k'] as const, 'tous'),
  engagement: oneOf(first(query.min_eng), ['tous', '3', '5', '10'] as const, 'tous'),
  niches: list(first(query.niches)).filter((n) => knownNiches.includes(n)),
  zones: list(first(query.zones)).filter((z): z is Zone => (ZONES as readonly string[]).includes(z)),
  sort: oneOf(first(query.tri), ['engagement', 'abonnes', 'az'] as const, 'engagement'),
})

// Libellés d'affichage, centralisés pour rester cohérents entre grille et pile mobile.
export const FOLLOWER_LABELS: Record<FollowerBucket, string> = {
  tous: 'Tous',
  lt1k: '< 1K',
  '1k10k': '1K – 10K',
  '10k50k': '10K – 50K',
  gt50k: '> 50K',
}

export const ENGAGEMENT_LABELS: Record<CreatorFilters['engagement'], string> = {
  tous: 'Tous',
  '3': '≥ 3 %',
  '5': '≥ 5 %',
  '10': '≥ 10 %',
}

export const SORT_LABELS: Record<CreatorFilters['sort'], string> = {
  engagement: 'Engagement ↓',
  abonnes: 'Abonnés ↓',
  az: 'A → Z',
}

// Réexport utilisé par la pile mobile pour afficher un compteur cohérent.
export const totalFollowers = (inf: Influencer): number =>
  (parseCount(inf.instagram.followers) ?? 0) + (parseCount(inf.tiktok.followers) ?? 0)
