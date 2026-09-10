import { seoConfig } from '@/lib/seo-config'

// ──────────────────────────────────────────────
// FICHE CRÉATEUR — contrat d'URL partagé.
//
// La carte, le panneau détail, le sitemap, la route de régénération et la fiche
// elle-même construisent tous leur lien ici : une seule définition du slug
// autorisé, une seule forme d'URL.
// ──────────────────────────────────────────────

export const SITE_URL = seoConfig.default.siteUrl

/** Même alphabet que les handles de `demande.ts`, suffixe de collision compris (« ss.rn97-2 »). */
const SLUG_RE = /^[a-z0-9._-]{1,64}$/

/** Normalise ce qui arrive de l'URL : `/createurs/OP_Lehoux` retombe sur la fiche `op_lehoux`. */
export const normalizeSlug = (raw: string | string[] | undefined): string | null => {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (!value) return null
  const clean = value.trim().replace(/^@+/, '').toLowerCase()
  return SLUG_RE.test(clean) ? clean : null
}

/** Chemin interne : `/createurs/op_lehoux`. */
export const fichePath = (slug: string): string => `/createurs/${slug}`

/** URL publique complète, celle que la créatrice colle dans sa bio. */
export const ficheUrl = (slug: string): string => `${SITE_URL}${fichePath(slug)}`

/**
 * Coupe une bio à la limite d'une meta description, sur un mot entier.
 * Une description tronquée en plein mot passe mal dans les SERP.
 */
export const truncateForMeta = (text: string, max = 155): string => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, '')}…`
}
