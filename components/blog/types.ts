// Type definitions for the Sprint 2 blog article system.
//
// Both `BlogArticleData` and `BlogArticleContent` are now 100% serializable
// (string-based, no React.ReactNode anywhere). This is the prerequisite for
// future Airtable / Supabase integration: the shape produced by an external
// CMS will match exactly what we render today.
//
// Rich text inside strings uses a tiny markdown subset parsed by RichText:
//   **bold**, *italic*, [text](url), ^sup^

import type { BarChartRow } from './BarChart'

export type CalloutVariant = 'anecdote' | 'opinion' | 'stat' | 'warning'

// ─── Comparison table cell (data-side) ────────────────────────────────────
// Mirrors the runtime ComparisonCell from ./ComparisonTable.tsx but with
// `value: string` instead of ReactNode. The renderer adapts at render time.

export type ComparisonCellData =
  | { kind: 'text'; value: string }
  | { kind: 'badge'; value: string; tone: 'good' | 'mid' | 'bad' }
  | { kind: 'verdict'; value: string; winner: 'left' | 'right' | 'tie' }

// ─── Block model ──────────────────────────────────────────────────────────
// Each section's body is a list of typed blocks. The BlockRenderer maps
// each variant to the matching React component.

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'list'; items: string[] }
  | { type: 'definition'; term: string; body: string }
  | { type: 'statHero'; value: string; body: string; sourceLabel: string; sourceUrl?: string }
  | { type: 'barChart'; title: string; rows: BarChartRow[] }
  | { type: 'inlineQA'; question: string; answer: string }
  | { type: 'callout'; variant: CalloutVariant; label: string; body: string; statValue?: string }
  | {
      type: 'comparisonTable'
      title: string
      subtitle?: string
      headers: string[]
      rows: ComparisonCellData[][]
    }
  | { type: 'numberedSteps'; steps: { title: string; body: string }[] }
  | { type: 'pullQuote'; text: string; attribution?: string }

export interface ArticleSection {
  id: string                  // anchor id, e.g. 'section-1'
  number: string              // display number, e.g. '01'
  title: string               // H2 text — accepts inline <em>X</em> for emphasis
  blocks: ArticleBlock[]
}

// ─── FAQ / Sources / Related / Author / CTA ──────────────────────────────

export interface FAQItem {
  question: string
  /** Light-markdown string. The accordion body parses it via RichText; the
   *  schema serializer flattens it via stripMarkdown for FAQPage JSON-LD. */
  answer: string
}

export interface SourceRef {
  label: string
  url?: string                // omit for primary Digiqo data
  description: string
  primary?: boolean
}

export interface RelatedArticleRef {
  slug: string
  title: string
  excerpt: string
  pillLabel: string
  readTime: string
  featuredImage?: string
}

export interface ArticleAuthor {
  name: string
  initials: string
  role: string
  bio: string
  expertise: string[]
  linkedinUrl?: string
  authorPath?: string
}

export interface BlogCTAConfig {
  eyebrow: string
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
  excerpt: string
  metaDescription: string
  /** Headline accent — last word(s) of the H1 picks up the bordeaux→orange
   *  gradient. Must be a suffix of `title`. */
  titleAccent?: string
  category: string
  cluster: string
  clusterHref?: string
  date: string
  dateModified: string
  dateModifiedLabel?: string
  readTime: string
  featuredImage?: string
  tags: string[]
  authorKey: string
  relatedSlugs: string[]
}

export interface ArticleQuickAnswer {
  question: string
  /** Light-markdown string. */
  answer: string
  wordCount: number
  targetQuery: string
}

export interface ArticleTldr {
  /** Each item is a light-markdown string. */
  forWhom: string[]
  whatYouLearn: string[]
}

/** Rich content side — fully serializable. Loaded from a static module
 *  registry today; will come from Airtable/Supabase later with no shape
 *  change. */
export interface BlogArticleContent {
  tldr: ArticleTldr
  quickAnswer: ArticleQuickAnswer
  sections: ArticleSection[]
  faq: FAQItem[]
  sources: SourceRef[]
  cta: BlogCTAConfig
}

// ─── Author registry ──────────────────────────────────────────────────────

export const DIGIQO_AUTHOR: ArticleAuthor = {
  name: 'Alexandre Lehoux',
  initials: 'AL',
  role: 'CMO Dirigeant Associé · Digiqo',
  bio: "Stratège marketing digital à La Réunion depuis 2018, Alexandre dirige la stratégie acquisition de Digiqo qu'il a co-fondée. Il a piloté plus de 4 M€ d'investissement publicitaire pour des PME locales et publie régulièrement sur le blog Digiqo.",
  expertise: ['TikTok Ads', 'Meta Ads', 'Stratégie acquisition 974', 'Tracking publicitaire'],
  linkedinUrl: 'https://www.linkedin.com/in/alexandre-le-houx/',
}

export const AUTHORS: Record<string, ArticleAuthor> = {
  'alexandre-lehoux': DIGIQO_AUTHOR,
}
