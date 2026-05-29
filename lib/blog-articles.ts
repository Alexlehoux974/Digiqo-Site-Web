// Single source of truth for blog articles.
//
// Content is now 100% JSON-serializable (no JSX, no React.ReactNode). This
// is the prerequisite for the future Airtable / Supabase integration: an
// external CMS can produce this exact shape via a build step or fetch, and
// no component/template change will be needed.
//
// Rich text inside strings uses a tiny markdown subset parsed by RichText
// at render time:
//   **bold**, *italic*, [text](url), ^sup^
//
// Sprint 2 starts the new template with one canonical article. The 6 legacy
// articles were deleted after Alexandre validated the redesign on
// `/blog-preview` (2026-05-08, branche seo-geo-rattrapage-s2).

import type {
  ArticleAuthor,
  BlogArticleContent,
  BlogArticleData,
  RelatedArticleRef,
} from '@/components/blog'
import { AUTHORS, DIGIQO_AUTHOR } from '@/components/blog'

// Build-time generated registry of articles sourced from content/blog/*.md.
// See scripts/generate-blog-md-articles.js — runs as part of `npm run build`
// (and on demand via `npm run generate-md-articles`). Pure data, no fs at
// runtime, so safe in both server bundle and client bundle.
import { MD_ARTICLES_DATA } from './blog-articles-from-md.generated'

// ─── Article registry (hybrid: TS legacy + MD pipeline) ──────────────────
//
// TS_ARTICLES_DATA   : structured Sprint 2 articles defined in this file
// MD_ARTICLES_DATA   : pipeline-generated .md articles (build-time scan)
// MERGED_ARTICLES_DATA combines both. If a slug exists in both, TS wins
// (legacy article preserved, MD copy ignored with a console warning).

const TS_ARTICLES_DATA: Record<string, BlogArticleData> = {}

const ARTICLES_CONTENT: Record<string, BlogArticleContent> = {}

const MERGED_ARTICLES_DATA: Record<string, BlogArticleData> = (() => {
  const merged: Record<string, BlogArticleData> = { ...TS_ARTICLES_DATA }
  for (const mdArticle of MD_ARTICLES_DATA) {
    if (merged[mdArticle.slug]) {
      // Slug collision: keep TS, skip MD. Logged but non-fatal.
      // eslint-disable-next-line no-console
      console.warn(
        `[blog-articles] slug collision: "${mdArticle.slug}" exists in TS legacy registry; MD copy from ${mdArticle.sourcePath} ignored`,
      )
      continue
    }
    merged[mdArticle.slug] = mdArticle
  }
  return merged
})()

// ─── Public helpers ────────────────────────────────────────────────────────

export function getAllArticles(): BlogArticleData[] {
  return Object.values(MERGED_ARTICLES_DATA)
}

export function getArticleData(slug: string): BlogArticleData | undefined {
  return MERGED_ARTICLES_DATA[slug]
}

/** Returns structured content for TS legacy articles only. For markdown
 *  articles (data.format === 'markdown'), returns undefined — the slug
 *  page renders the body via <MarkdownBody source={data.bodyMarkdown} />
 *  instead of the structured BlockRenderer pipeline. */
export function getArticleContent(slug: string): BlogArticleContent | undefined {
  return ARTICLES_CONTENT[slug]
}

export function getArticlesByCategory(category: string): BlogArticleData[] {
  if (category === 'Tous') return getAllArticles()
  return getAllArticles().filter((a) => a.category === category)
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllArticles().map((a) => a.category)))
}

export function resolveAuthor(authorKey: string): ArticleAuthor {
  return AUTHORS[authorKey] ?? DIGIQO_AUTHOR
}

// Hand-curated map of related articles. The slugs in `relatedSlugs` may
// point to articles that don't exist yet — RelatedArticles renders them with
// a gradient backdrop until content is written.
const RELATED_REGISTRY: Record<string, RelatedArticleRef> = {
  'tiktok-strategie-organique-reunion': {
    slug: 'tiktok-strategie-organique-reunion',
    title: 'TikTok à La Réunion : la stratégie organique en 2026',
    excerpt: 'Avant de payer, sache scaler ton organique. Le guide complet.',
    pillLabel: 'TikTok organique',
    readTime: '12 min de lecture',
  },
  'pixel-tiktok-installation-974': {
    slug: 'pixel-tiktok-installation-974',
    title: "Pixel TikTok + API Conversions : guide d'installation 974",
    excerpt: 'Le tracking étape par étape pour ne pas rater de conversion en 2026.',
    pillLabel: 'Tracking',
    readTime: '8 min de lecture',
  },
  'tiktok-vs-meta-vs-google-ads-reunion': {
    slug: 'tiktok-vs-meta-vs-google-ads-reunion',
    title: 'TikTok vs Meta vs Google Ads : quel canal en 2026 à La Réunion ?',
    excerpt: 'Comparatif data-driven sur 100 campagnes. Le guide définitif.',
    pillLabel: 'Stratégie',
    readTime: '11 min de lecture',
  },
}

export function resolveRelated(slugs: string[]): RelatedArticleRef[] {
  return slugs
    .map((slug) => RELATED_REGISTRY[slug])
    .filter((r): r is RelatedArticleRef => Boolean(r))
}

// Backward-compat alias for /pages/blog.tsx which still imports the old name.
export type BlogArticle = BlogArticleData
