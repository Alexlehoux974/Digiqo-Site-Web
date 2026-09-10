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

/** Calculé par n8n dans Airtable (« Niveau ») — pilote la hiérarchie visuelle des cartes. */
export type CreatorLevel = 'top' | 'confirme' | 'nouveau'

/** Calculé par n8n dans Airtable (« Catégorie »). */
export type CreatorCategory = 'ugc' | 'influence' | 'ugc-influence'

export const LEVEL_LABELS: Record<CreatorLevel, string> = {
  top: 'Top',
  confirme: 'Confirmé',
  nouveau: 'Nouveau',
}

export const CATEGORY_LABELS: Record<CreatorCategory, string> = {
  ugc: 'UGC',
  influence: 'Influence',
  'ugc-influence': 'UGC + Influence',
}

export interface Influencer {
  /** Identifiant d'URL de la fiche, ex. « op_lehoux » → /createurs/op_lehoux. Unique. */
  slug: string
  name: string
  /** « Prénom » Airtable, replié sur le premier mot du nom. Utilisé par le titre SEO de la fiche. */
  firstName: string
  handle: string
  photo: string
  /** « Ville » brute, sans la zone : le titre SEO de la fiche dit « à {Ville} ». */
  city: string
  location: string
  niveau: CreatorLevel
  categorie: CreatorCategory
  niches: string[]
  bio: string
  instagram: PlatformStats
  tiktok: PlatformStats
  youtube?: PlatformStats
  contentTypes: string[]
  featured?: boolean
  pending?: boolean // en attente de l'accord de la créatrice → non affiché
}

export type PlatformFilter = 'tous' | 'instagram' | 'tiktok' | 'youtube'

/** Filtre « Profil » : « UGC + Influence » ressort dans les deux entrées. */
export type ProfileFilter = 'tous' | 'ugc' | 'influence'
export type FollowerBucket = 'tous' | 'lt1k' | '1k10k' | '10k50k' | 'gt50k'
export type EngagementFloor = 'tous' | '3' | '5' | '10'
export type SortKey = 'engagement' | 'abonnes' | 'az'

export const ZONES = ['Nord', 'Sud', 'Est', 'Ouest', "Toute l'île", 'Hors Réunion'] as const
export type Zone = (typeof ZONES)[number]

export interface CreatorFilters {
  platform: PlatformFilter
  profil: ProfileFilter
  followers: FollowerBucket
  engagement: EngagementFloor
  niches: string[]
  zones: Zone[]
  sort: SortKey
}

export const DEFAULT_FILTERS: CreatorFilters = {
  platform: 'tous',
  profil: 'tous',
  followers: 'tous',
  engagement: 'tous',
  niches: [],
  zones: [],
  sort: 'engagement',
}
