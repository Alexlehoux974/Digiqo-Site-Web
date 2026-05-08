// Block-based content model for the new article template.
// Each section is a list of typed blocks rather than a single markdown blob —
// this lets us render with React components, validate with TypeScript, and
// generate precise JSON-LD (HowTo from NumberedSteps, FAQPage from FAQ, etc.).

export type CalloutVariant = 'anecdote' | 'opinion' | 'stat' | 'warning'

export type ArticleBlock =
  | { type: 'paragraph'; html: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'list'; items: string[] }
  | { type: 'definition'; term: string; bodyHtml: string }
  | { type: 'statHero'; big: string; bodyHtml: string; sourceLabel: string; sourceUrl?: string }
  | { type: 'barChart'; title: string; bars: { label: string; widthPct: number; valueLabel: string }[] }
  | { type: 'inlineQA'; question: string; answerHtml: string }
  | { type: 'callout'; variant: CalloutVariant; label: string; bodyHtml: string }
  | { type: 'comparisonTable'; title: string; subtitle?: string; headers: string[]; rows: ComparisonCell[][] }
  | { type: 'numberedSteps'; steps: { title: string; bodyHtml: string }[] }
  | { type: 'pullQuote'; text: string; attribution?: string }
  | { type: 'blockquote'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type ComparisonCell =
  | { kind: 'text'; value: string; bold?: boolean }
  | { kind: 'badge'; value: string; tone: 'good' | 'mid' | 'bad' }
  | { kind: 'verdict'; value: string; winner: 'left' | 'right' | 'tie' }

export interface ArticleSection {
  id: string             // anchor id, e.g. 'section-1'
  number: string         // display number, e.g. '01'
  title: string          // H2 text
  blocks: ArticleBlock[]
}

export interface FAQItem {
  question: string
  answerHtml: string
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
  // Inline gradient when no featured image is set, keeps cards visually distinct.
  gradientFrom?: string
  gradientTo?: string
}

export interface ArticleAuthor {
  name: string
  initials: string       // fallback for avatar
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

// Extended article shape for the new template.
// Backward-compatible field `content` is dropped — sections[] replaces it.
export interface BlogArticleV2 {
  id: string
  slug: string
  title: string
  excerpt: string                // hero lede
  metaDescription: string

  category: string               // top-level cluster (Social Media, SEO, ...)
  cluster: string                // sub-cluster shown in pill (TikTok Ads, etc.)

  date: string                   // human-readable French
  dateModified: string           // ISO 8601 with timezone

  readTime: string               // '9 min de lecture'
  author: ArticleAuthor

  featuredImage?: string         // optional now — hero is text-first
  tags: string[]

  tldr: {
    forWhom: string[]
    whatYouLearn: string[]
  }

  quickAnswer: {
    question: string
    answerHtml: string
    wordCount: number
    targetQuery: string
  }

  sections: ArticleSection[]

  faq: FAQItem[]

  sources: SourceRef[]

  relatedSlugs: string[]         // resolved at build time

  cta: BlogCTAConfig
}

// Author shared across all articles for now (single-author blog).
export const DIGIQO_AUTHOR: ArticleAuthor = {
  name: 'Alexandre Lehoux',
  initials: 'AL',
  role: 'CMO Dirigeant Associé · Digiqo',
  bio: 'Stratège marketing digital à La Réunion depuis 2018, Alexandre dirige la stratégie acquisition de Digiqo qu\'il a co-fondée. Il a piloté plus de 4 M€ d\'investissement publicitaire pour des PME locales et publie régulièrement sur le blog Digiqo.',
  expertise: ['TikTok Ads', 'Meta Ads', 'Stratégie acquisition 974', 'Tracking publicitaire'],
  linkedinUrl: 'https://www.linkedin.com/in/alexandre-le-houx/',
}
