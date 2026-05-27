import { GetStaticProps, GetStaticPaths } from 'next'
import dynamic from 'next/dynamic'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SEO } from '@/components/SEO'
import {
  ArticleHero,
  BlockRenderer,
  buildArticleSchemas,
  FAQ,
  MarkdownBody,
  parseMarkdownBody,
  QuickAnswer,
  RichText,
  SourcesBlock,
  TableOfContents,
  TldrBox,
} from '@/components/blog'
import type { BreadcrumbItem, TocItem } from '@/components/blog'

// Below-the-fold + non-critical for SEO: defer JS load until client-side
// hydration. The HTML for these blocks is not in the initial SSR payload —
// AuthorCardExtended bio, RelatedArticles cards, BlogCTA banner come in
// after first paint. ComparisonTable / BarChart / NumberedSteps / FAQ /
// SourcesBlock stay SSR (their data is critical for non-JS-rendering bots
// like Bing/Perplexity).
const AuthorCardExtended = dynamic(
  () => import('@/components/blog/AuthorCard').then((m) => m.AuthorCardExtended),
  { ssr: false },
)
const RelatedArticles = dynamic(
  () => import('@/components/blog/RelatedArticles').then((m) => m.RelatedArticles),
  { ssr: false },
)
const BlogCTA = dynamic(
  () => import('@/components/blog/BlogCTA').then((m) => m.BlogCTA),
  { ssr: false },
)
import {
  getArticleContent,
  getArticleData,
  getAllArticles,
  resolveAuthor,
  resolveRelated,
} from '@/lib/blog-articles'
import type { BlogArticleData } from '@/components/blog'

const SITE_URL = 'https://digiqo.fr'

interface ArticlePageProps {
  data: BlogArticleData
}

export default function ArticlePage({ data }: ArticlePageProps) {
  const author = resolveAuthor(data.authorKey)
  const related = resolveRelated(data.relatedSlugs)
  const articleUrl = `${SITE_URL}/blog/${data.slug}`
  const articleImage = data.featuredImage
    ? data.featuredImage.startsWith('http')
      ? data.featuredImage
      : `${SITE_URL}${data.featuredImage}`
    : `${SITE_URL}/assets/logo2-digiqo.png`

  const breadcrumb: BreadcrumbItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: data.category, href: data.clusterHref ?? '/blog' },
    { label: data.title },
  ]

  // ─── Markdown-format branch ─────────────────────────────────────────────
  // Articles sourced from content/blog/*.md (pipeline output) render with
  // a simplified layout: ArticleHero + MarkdownBody + AuthorCard. No
  // TldrBox / QuickAnswer / FAQ / SourcesBlock / BlogCTA — those are
  // structural blocks specific to the Sprint 2 TS template. MD articles
  // get their CTA inline in the body. JSON-LD omits FAQPage (no
  // structured FAQ data) — BlogPosting + BreadcrumbList + Person stay.
  if (data.format === 'markdown' && data.bodyMarkdown) {
    const { combinedSchema } = buildArticleSchemas({ data, author, breadcrumb })
    const toc: TocItem[] = parseMarkdownBody(data.bodyMarkdown)
      .filter((b): b is { kind: 'h2'; id: string; text: string } => b.kind === 'h2')
      .map((b) => ({ id: b.id, label: <RichText source={b.text} /> }))

    return (
      <>
        <SEO
          title={data.title}
          description={data.metaDescription || data.excerpt}
          image={articleImage}
          url={articleUrl}
          type="article"
          siteName="Digiqo Blog"
          structuredData={combinedSchema}
        />

        <HeaderLuxury />

        <main className="pt-32 bg-white">
          <ArticleHero
            breadcrumb={breadcrumb}
            cluster={data.cluster}
            clusterHref={data.clusterHref}
            readTime={data.readTime}
            date={data.date}
            dateModified={data.dateModifiedLabel}
            dateModifiedIso={data.dateModified}
            title={data.title}
            titleAccent={data.titleAccent}
            lede={data.excerpt}
            author={author}
          />

          <div className="max-w-[1200px] mx-auto px-6 mt-3 grid lg:grid-cols-[1fr_240px] lg:gap-16 gap-6 pb-16">
            <article className="max-w-[760px] min-w-0">
              <MarkdownBody source={data.bodyMarkdown} className="mt-8" />
              <AuthorCardExtended author={author} />
            </article>

            <aside>
              <TableOfContents items={toc} />
            </aside>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  // ─── Legacy structured (Sprint 2 TS) branch ─────────────────────────────
  // Content holds React.ReactNode (sections, FAQ answers) so it cannot be
  // serialized through getStaticProps. We resolve it from the static module
  // registry at render time — the module is included in the build, so this
  // adds zero runtime cost.
  const content = getArticleContent(data.slug)
  if (!content) {
    // Legacy article missing its content registry entry — should never
    // happen since getStaticPaths only emits TS slugs that have both data
    // and content.
    return null
  }

  // Multi-schema JSON-LD via single @graph payload. The schema.org @graph
  // pattern bundles BlogPosting + BreadcrumbList + FAQPage in one
  // <script type="application/ld+json"> emitted in SSR HTML by <SEO>.
  const { combinedSchema } = buildArticleSchemas({
    data,
    content,
    author,
    breadcrumb,
  })

  const toc: TocItem[] = content.sections.map((s) => ({
    id: s.id,
    label: <RichText source={s.title} />,
  }))

  return (
    <>
      <SEO
        title={data.title}
        description={data.metaDescription || data.excerpt}
        image={articleImage}
        url={articleUrl}
        type="article"
        siteName="Digiqo Blog"
        structuredData={combinedSchema}
      />

      <HeaderLuxury />

      {/* pt-32 clears the sticky HeaderLuxury (topbar + main nav). */}
      <main className="pt-32 bg-white">
        <ArticleHero
          breadcrumb={breadcrumb}
          cluster={data.cluster}
          clusterHref={data.clusterHref}
          readTime={data.readTime}
          date={data.date}
          dateModified={data.dateModifiedLabel}
          dateModifiedIso={data.dateModified}
          title={data.title}
          titleAccent={data.titleAccent}
          lede={data.excerpt}
          author={author}
        />

        <div className="max-w-[1200px] mx-auto px-6 mt-3 grid lg:grid-cols-[1fr_240px] lg:gap-16 gap-6 pb-16">
          <article className="max-w-[760px] min-w-0">
            <div className="mt-9">
              <TldrBox forWhom={content.tldr.forWhom} whatYouLearn={content.tldr.whatYouLearn} />
            </div>

            <div className="mt-8">
              <QuickAnswer
                question={content.quickAnswer.question}
                answer={content.quickAnswer.answer}
                wordCount={content.quickAnswer.wordCount}
                targetQuery={content.quickAnswer.targetQuery}
              />
            </div>

            {content.sections.map((section) => (
              <section key={section.id} className="mt-16">
                <h2
                  id={section.id}
                  className="font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] scroll-mt-[96px]"
                >
                  <span className="inline-block text-[13px] font-bold text-digiqo-primary bg-digiqo-primary/[0.08] px-2.5 py-1 rounded-md mr-2.5 align-middle -translate-y-[3px] tracking-[0.04em] font-display">
                    {section.number}
                  </span>
                  <RichText source={section.title} />
                </h2>
                <div className="mt-2">
                  {section.blocks.map((block, idx) => (
                    <BlockRenderer key={idx} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {content.faq.length > 0 && (
              <FAQ
                title={`Questions fréquentes sur ${data.cluster.split('·').pop()?.trim() ?? data.category}`}
                subtitle="Les questions qu'on nous pose le plus en consultation."
                items={content.faq}
              />
            )}

            {content.sources.length > 0 && <SourcesBlock sources={content.sources} />}

            <AuthorCardExtended author={author} />
          </article>

          <aside>
            <TableOfContents items={toc} />
          </aside>
        </div>

        {related.length > 0 && (
          <RelatedArticles
            clusterLink={
              data.clusterHref
                ? { label: `Voir tout le cluster ${data.category} →`, href: data.clusterHref }
                : undefined
            }
            articles={related}
          />
        )}

        <BlogCTA
          eyebrow={content.cta.eyebrow}
          heading={content.cta.heading}
          body={content.cta.body}
          primary={content.cta.primary}
          secondary={content.cta.secondary}
        />
      </main>

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles()
  return {
    paths: articles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const data = getArticleData(slug)
  if (!data) return { notFound: true }
  // Only `data` is serializable. Content (with React nodes) is fetched
  // synchronously at render time from the static module registry.
  return { props: { data } }
}
