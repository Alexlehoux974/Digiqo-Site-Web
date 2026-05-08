// Barrel export for the blog component system.
// Components are added incrementally — see Sprint 2 plan.

export { ClusterPill } from './ClusterPill'
export { MetaPill, MetaDot } from './MetaPill'
export { Breadcrumb, buildBreadcrumbSchema } from './Breadcrumb'
export type { BreadcrumbItem } from './Breadcrumb'
export { AuthorAvatar } from './AuthorAvatar'

export type {
  ArticleBlock,
  ArticleSection,
  BlogArticleV2,
  BlogCTAConfig,
  CalloutVariant,
  ComparisonCell,
  FAQItem,
  RelatedArticleRef,
  SourceRef,
  ArticleAuthor,
} from './types'
export { DIGIQO_AUTHOR } from './types'
