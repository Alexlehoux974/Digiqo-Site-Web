import { GetStaticProps, GetStaticPaths } from 'next'
import Script from 'next/script'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SEO } from '@/components/SEO'
import {
  ArticleHero,
  AuthorCardExtended,
  BlockRenderer,
  BlogCTA,
  buildArticleSchemas,
  FAQ,
  QuickAnswer,
  RelatedArticles,
  RichText,
  SourcesBlock,
  TableOfContents,
  TldrBox,
} from '@/components/blog'
import type { BreadcrumbItem, TocItem } from '@/components/blog'
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

// Escape `<` for safe inline JSON-LD per OWASP guidance — JSON.stringify can
// emit `<` inside URLs and would otherwise risk breaking the </script> tag.
function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export default function ArticlePage({ data }: ArticlePageProps) {
  // Content holds React.ReactNode (sections, FAQ answers) so it cannot be
  // serialized through getStaticProps. We resolve it from the static module
  // registry at render time — the module is included in the build, so this
  // adds zero runtime cost.
  const content = getArticleContent(data.slug)
  if (!content) {
    // Should never happen: getStaticPaths only emits known slugs.
    return null
  }

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

  // Multi-schema JSON-LD stack: BlogPosting + BreadcrumbList + FAQPage.
  const { blogPostingSchema, breadcrumbSchema, faqPageSchema } = buildArticleSchemas({
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
        structuredData={blogPostingSchema}
      />

      <Script id="schema-breadcrumb" type="application/ld+json">
        {safeJsonLd(breadcrumbSchema)}
      </Script>
      {faqPageSchema && (
        <Script id="schema-faqpage" type="application/ld+json">
          {safeJsonLd(faqPageSchema)}
        </Script>
      )}

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
