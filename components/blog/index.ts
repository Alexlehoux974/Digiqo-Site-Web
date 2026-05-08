// Barrel export for the blog component system.

export { ClusterPill } from './ClusterPill'
export { MetaPill, MetaDot } from './MetaPill'
export { Breadcrumb, buildBreadcrumbSchema } from './Breadcrumb'
export type { BreadcrumbItem } from './Breadcrumb'
export { AuthorAvatar } from './AuthorAvatar'
export { AuthorCardCompact, AuthorCardExtended, buildPersonSchema } from './AuthorCard'
export { ArticleHero } from './ArticleHero'
export { TldrBox } from './TldrBox'
export { QuickAnswer } from './QuickAnswer'
export { TableOfContents } from './TableOfContents'
export type { TocItem } from './TableOfContents'
export { CallOut } from './CallOut'
export { InlineQA } from './InlineQA'
export { DefinitionBox } from './DefinitionBox'
export { StatHero } from './StatHero'
export { BarChart } from './BarChart'
export type { BarChartRow } from './BarChart'
export { PullQuote } from './PullQuote'
export { NumberedSteps } from './NumberedSteps'
export type { NumberedStep } from './NumberedSteps'
export { ComparisonTable } from './ComparisonTable'
export type { ComparisonCell } from './ComparisonTable'
export { FAQ } from './FAQ'
export { SourcesBlock } from './SourcesBlock'
export { RelatedArticles } from './RelatedArticles'
export { BlogCTA } from './BlogCTA'
export { buildArticleSchemas } from './buildArticleSchemas'

// JSON-driven content layer (Sprint 2 commit #10)
export { RichText, parseInline, stripMarkdown } from './RichText'
export { BlockRenderer } from './BlockRenderer'

export type {
  ArticleBlock,
  ArticleSection,
  BlogArticleData,
  BlogArticleContent,
  ArticleQuickAnswer,
  ArticleTldr,
  BlogCTAConfig,
  CalloutVariant,
  ComparisonCellData,
  FAQItem,
  RelatedArticleRef,
  SourceRef,
  ArticleAuthor,
} from './types'
export { DIGIQO_AUTHOR, AUTHORS } from './types'
