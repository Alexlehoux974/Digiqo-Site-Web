// JSON-LD stack for the new article template.
//
// Emits a graph of schemas instead of a single BlogPosting — Google and LLMs
// pick up FAQPage / BreadcrumbList / Person independently when each is
// exposed at the document level.
//
// FAQ answers are stored as light-markdown strings (with **bold**, *italic*,
// [text](url), ^sup^). For schema.org FAQPage.acceptedAnswer.text we must
// emit plain text — no markdown delimiters. stripMarkdown() handles that.

import { stripMarkdown } from './RichText'
import type {
  ArticleAuthor,
  BlogArticleContent,
  BlogArticleData,
} from './types'
import type { BreadcrumbItem } from './Breadcrumb'

const SITE_URL = 'https://digiqo.fr'

interface BuildSchemasInput {
  data: BlogArticleData
  /** Structured content (sections + FAQ). Optional: markdown-format articles
   *  from `content/blog/*.md` don't have structured FAQ, so the FAQPage
   *  schema is simply omitted. */
  content?: BlogArticleContent
  author: ArticleAuthor
  breadcrumb: BreadcrumbItem[]
}

export function buildArticleSchemas({ data, content, author, breadcrumb }: BuildSchemasInput) {
  const url = `${SITE_URL}/blog/${data.slug}`
  const image = data.featuredImage
    ? data.featuredImage.startsWith('http')
      ? data.featuredImage
      : `${SITE_URL}${data.featuredImage}`
    : `${SITE_URL}/assets/logo2-digiqo.png`

  const personSchema = {
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role.split('·')[0]?.trim() ?? author.role,
    description: author.bio,
    url: author.authorPath ? `${SITE_URL}${author.authorPath}` : `${SITE_URL}/agence`,
    sameAs: author.linkedinUrl ? [author.linkedinUrl] : undefined,
    knowsAbout: author.expertise,
  }

  const blogPostingSchema = {
    '@type': 'BlogPosting',
    headline: data.title,
    description: stripMarkdown(data.metaDescription || data.excerpt),
    image,
    datePublished: data.dateModified,
    dateModified: data.dateModified,
    author: personSchema,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Digiqo',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo2-digiqo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    articleSection: data.category,
    inLanguage: 'fr-FR',
    keywords: data.tags.join(', '),
  }

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href
        ? { item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}` }
        : {}),
    })),
  }

  const faqPageSchema = content && content.faq.length
    ? {
        '@type': 'FAQPage',
        mainEntity: content.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            // stripMarkdown removes **, *, [...](url), ^...^ so the schema
            // contains plain readable text. URLs are dropped from the
            // schema; the link still renders in the visible FAQ accordion.
            text: stripMarkdown(item.answer),
          },
        })),
      }
    : null

  // Single @graph payload — schema.org pattern that bundles multiple
  // schemas in one <script type="application/ld+json"> tag. Lets us emit
  // BlogPosting + BreadcrumbList + FAQPage via a single SSR injection
  // through SEO.structuredData (which handles the Head/script wiring).
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [blogPostingSchema, breadcrumbSchema, ...(faqPageSchema ? [faqPageSchema] : [])],
  }

  return {
    blogPostingSchema,
    breadcrumbSchema,
    faqPageSchema,
    combinedSchema,
  }
}
