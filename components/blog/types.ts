// Type definitions for the Sprint 2 blog article system.
//
// We split each article in two pieces:
// - BlogArticleData (serializable, returned by getStaticProps and used by
//   the /blog list) — only primitive metadata.
// - BlogArticleContent (rich, contains React.ReactNode for sections/answers/
//   FAQ) — loaded directly at render time, not sent through getStaticProps.

export type CalloutVariant = 'anecdote' | 'opinion' | 'stat' | 'warning'

export interface FAQItem {
  question: string
  /** Inline ReactNode so backlinks and <strong> stay readable. The schema
   *  serializer flattens this to plain text for FAQPage JSON-LD. */
  answer: React.ReactNode
}

export interface SourceRef {
  label: string
  url?: string           // omit for primary Digiqo data
  description: string
  primary?: boolean      // true for "Données primaires Digiqo"
}

export interface RelatedArticleRef {
  slug: string
  title: string
  excerpt: string
  pillLabel: string
  readTime: string
  /** Optional cover image. When omitted, RelatedArticles renders a bordeaux→accent gradient backdrop. */
  featuredImage?: string
}

export interface ArticleAuthor {
  name: string
  initials: string
  role: string
  bio: string
  expertise: string[]
  linkedinUrl?: string
  authorPath?: string    // /agence/alexandre-lehoux
}

export interface BlogCTAConfig {
  eyebrow: string        // 'Audit gratuit · 30 minutes'
  heading: string
  body: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

// ─── Article shape ─────────────────────────────────────────────────────────

/** Serializable subset — safe to pass through getStaticProps and to render
 *  on the /blog list. Contains no React nodes. */
export interface BlogArticleData {
  id: string
  slug: string
  title: string
  /** One-paragraph hero lede — also used as the listing card excerpt. */
  excerpt: string
  metaDescription: string
  /** Headline accent — last word(s) of the H1, picks up the bordeaux→orange
   *  gradient. Optional. Must be a suffix of `title` to render correctly. */
  titleAccent?: string
  category: string                  // top-level cluster (Social Media, SEO, ...)
  cluster: string                   // sub-cluster shown in pill (TikTok Ads, ...)
  clusterHref?: string
  date: string                      // human-readable French ("12 mars 2026")
  dateModified: string              // ISO 8601 with timezone
  /** Human-readable label shown in the hero ("06 mai 2026") */
  dateModifiedLabel?: string
  readTime: string                  // '9 min de lecture'
  featuredImage?: string
  tags: string[]
  authorKey: string                 // resolves to an ArticleAuthor in lib
  /** Slugs of related articles — resolved to full RelatedArticleRef in lib. */
  relatedSlugs: string[]
}

export interface ArticleSectionContent {
  id: string                        // anchor id, e.g. 'section-1'
  number: string                    // display number, e.g. '01'
  title: React.ReactNode            // H2 text — ReactNode allows <em> in titles
  /** Whole section body assembled with components/blog blocks. */
  children: React.ReactNode
}

export interface ArticleQuickAnswer {
  question: string
  answer: React.ReactNode
  wordCount: number
  targetQuery: string
}

export interface ArticleTldr {
  forWhom: React.ReactNode[]
  whatYouLearn: React.ReactNode[]
}

/** Rich content side — loaded at render time, never sent through props. */
export interface BlogArticleContent {
  tldr: ArticleTldr
  quickAnswer: ArticleQuickAnswer
  sections: ArticleSectionContent[]
  faq: FAQItem[]
  sources: SourceRef[]
  cta: BlogCTAConfig
}

// ─── Author registry ──────────────────────────────────────────────────────

export const DIGIQO_AUTHOR: ArticleAuthor = {
  name: 'Alexandre Lehoux',
  initials: 'AL',
  role: 'CMO Dirigeant Associé · Digiqo',
  bio: 'Stratège marketing digital à La Réunion depuis 2018, Alexandre dirige la stratégie acquisition de Digiqo qu\'il a co-fondée. Il a piloté plus de 4 M€ d\'investissement publicitaire pour des PME locales et publie régulièrement sur le blog Digiqo.',
  expertise: ['TikTok Ads', 'Meta Ads', 'Stratégie acquisition 974', 'Tracking publicitaire'],
  linkedinUrl: 'https://www.linkedin.com/in/alexandre-le-houx/',
}

export const AUTHORS: Record<string, ArticleAuthor> = {
  'alexandre-lehoux': DIGIQO_AUTHOR,
}
