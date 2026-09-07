// ──────────────────────────────────────────────
// TYPES — page Créateurs
// Isolés du composant pour que la source de données puisse changer
// (tableau codé en dur aujourd'hui, Airtable ensuite) sans toucher à l'UI.
// ──────────────────────────────────────────────

export interface PlatformStats {
  url: string
  followers: string // ex. "15K" ou "À définir"
  engagement: string // ex. "7%" ou "À définir"
}

export interface Influencer {
  name: string
  handle: string
  photo: string
  location: string
  niches: string[]
  bio: string
  instagram: PlatformStats
  tiktok: PlatformStats
  contentTypes: string[]
  featured?: boolean
  pending?: boolean // en attente de l'accord de la créatrice → non affiché
}

export type PlatformFilter = 'tous' | 'instagram' | 'tiktok'
export type FollowerBucket = 'tous' | 'lt1k' | '1k10k' | '10k50k' | 'gt50k'
export type EngagementFloor = 'tous' | '3' | '5' | '10'
export type SortKey = 'engagement' | 'abonnes' | 'az'

export const ZONES = ['Nord', 'Sud', 'Est', 'Ouest', "Toute l'île", 'Hors Réunion'] as const
export type Zone = (typeof ZONES)[number]

export interface CreatorFilters {
  platform: PlatformFilter
  followers: FollowerBucket
  engagement: EngagementFloor
  niches: string[]
  zones: Zone[]
  sort: SortKey
}

export const DEFAULT_FILTERS: CreatorFilters = {
  platform: 'tous',
  followers: 'tous',
  engagement: 'tous',
  niches: [],
  zones: [],
  sort: 'engagement',
}
