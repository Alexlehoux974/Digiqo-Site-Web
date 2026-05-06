import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { getArticleBySlug, getAllArticles, type BlogArticle } from '@/lib/blog-articles'
import { SEO } from '@/components/SEO'

const SITE_URL = 'https://digiqo.fr'

const FRENCH_MONTHS: Record<string, string> = {
  Janvier: '01', Février: '02', Mars: '03', Avril: '04',
  Mai: '05', Juin: '06', Juillet: '07', Août: '08',
  Septembre: '09', Octobre: '10', Novembre: '11', Décembre: '12',
}

// "25 Septembre 2025" -> "2025-09-25T08:00:00+04:00" (Réunion timezone)
function parseFrenchDateToIso(date: string): string {
  const match = date.match(/(\d{1,2})\s+(\S+)\s+(\d{4})/)
  if (!match) return date
  const [, day, month, year] = match
  const monthNum = FRENCH_MONTHS[month] ?? '01'
  return `${year}-${monthNum}-${day.padStart(2, '0')}T08:00:00+04:00`
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

function buildBlogPostingSchema(article: BlogArticle) {
  const datePublished = parseFrenchDateToIso(article.date)
  const dateModified = article.dateModified ?? datePublished
  const articleUrl = `${SITE_URL}/blog/${article.slug}`
  const articleImage = article.featuredImage.startsWith('http')
    ? article.featuredImage
    : `${SITE_URL}${article.featuredImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: articleImage,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: 'Alexandre Lehoux',
      jobTitle: 'CMO Dirigeant Associé Digiqo',
      url: `${SITE_URL}/agence`,
      sameAs: ['https://www.linkedin.com/in/alexandre-le-houx/'],
    },
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
      '@id': articleUrl,
    },
    url: articleUrl,
    articleSection: article.category,
    wordCount: countWords(article.content),
    inLanguage: 'fr-FR',
    keywords: article.tags?.join(', '),
  }
}

interface ArticlePageProps {
  article: BlogArticle
}

export default function ArticlePage({ article }: ArticlePageProps) {
  const pageDescription = article.metaDescription || article.excerpt
  const articleUrl = `${SITE_URL}/blog/${article.slug}`
  const articleImage = article.featuredImage.startsWith('http')
    ? article.featuredImage
    : `${SITE_URL}${article.featuredImage}`
  const blogPostingSchema = buildBlogPostingSchema(article)
  return (
    <>
      <SEO
        title={article.title}
        description={pageDescription}
        image={articleImage}
        url={articleUrl}
        type="article"
        siteName="Digiqo Blog"
        structuredData={blogPostingSchema}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <div className="bg-gradient-digiqo text-white">
          <div className="container mx-auto px-4 py-12">
            <Link href="/blog" className="inline-block mb-8">
              <motion.div
                whileHover={{ x: -5 }}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour au blog
              </motion.div>
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 text-white/80 mb-4 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {article.title}
              </h1>

              <p className="text-xl text-white/90">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-2 mt-8">
                <User className="w-5 h-5" />
                <span className="font-medium">{article.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-4 -mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 py-12">
          <div
            className="max-w-4xl mx-auto article-content"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />
          <style jsx global>{`
            .article-content {
              font-size: 1.125rem;
              line-height: 1.8;
              color: #334155;
            }

            .article-content h1 {
              font-size: 2.5rem;
              font-weight: bold;
              color: #0f172a;
              margin-top: 3rem;
              margin-bottom: 2rem;
              line-height: 1.2;
            }

            .article-content h2 {
              font-size: 2rem;
              font-weight: bold;
              color: #1e293b;
              margin-top: 2.5rem;
              margin-bottom: 1.5rem;
              line-height: 1.3;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 0.5rem;
            }

            .article-content h3 {
              font-size: 1.5rem;
              font-weight: 600;
              color: #334155;
              margin-top: 2rem;
              margin-bottom: 1rem;
              line-height: 1.4;
            }

            .article-content p {
              margin-bottom: 1.5rem;
              line-height: 1.8;
              color: #475569;
              text-align: justify;
            }

            .article-content strong {
              font-weight: 600;
              color: #1e293b;
            }

            .article-content em {
              font-style: italic;
              color: #475569;
            }

            .article-content ul {
              list-style-type: disc;
              padding-left: 2rem;
              margin-bottom: 1.5rem;
            }

            .article-content li {
              margin-bottom: 0.75rem;
              line-height: 1.7;
              color: #475569;
            }

            .article-content li strong {
              color: #1e293b;
              font-weight: 600;
            }

            .article-content img {
              width: 100%;
              height: auto;
              border-radius: 0.75rem;
              box-shadow: 0 10px 30px -10px rgba(0,0,0,0.2);
              margin: 2.5rem auto;
              display: block;
            }

            .article-content a {
              color: #8B1431;
              text-decoration: underline;
              font-weight: 500;
              transition: color 0.2s;
            }

            .article-content a:hover {
              color: #DA6530;
            }

            .article-content blockquote {
              border-left: 4px solid #8B1431;
              padding-left: 1.5rem;
              margin: 2rem 0;
              font-style: italic;
              color: #64748b;
            }

            /* Espacement entre les sections */
            .article-content > * + * {
              margin-top: 1.5rem;
            }

            .article-content h1 + p,
            .article-content h2 + p,
            .article-content h3 + p {
              margin-top: 1rem;
            }

            /* Amélioration de la lisibilité sur mobile */
            @media (max-width: 768px) {
              .article-content {
                font-size: 1rem;
              }

              .article-content h1 {
                font-size: 2rem;
              }

              .article-content h2 {
                font-size: 1.5rem;
              }

              .article-content h3 {
                font-size: 1.25rem;
              }

              .article-content p {
                text-align: left;
              }
            }
          `}</style>
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl mx-auto">
              <div className="border-t pt-8">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-digiqo text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {article.category === 'Social Media' || article.slug.includes('tiktok')                  ? 'Prêt à booster votre présence sur les réseaux sociaux ?'
                  : article.category === 'SEO'
                  ? 'Prêt à améliorer votre référencement naturel ?'
                  : article.category === 'Développement Web'
                  ? 'Prêt à créer votre site web performant ?'
                  : 'Prêt à optimiser vos campagnes Google Ads ?'}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                {article.category === 'Social Media' || article.slug.includes('tiktok')                  ? 'Contactez nos experts pour une stratégie social media sur mesure'
                  : article.category === 'SEO'
                  ? 'Contactez nos experts pour un audit SEO complet'
                  : article.category === 'Développement Web'
                  ? 'Contactez nos experts pour votre projet web'
                  : 'Contactez nos experts pour un audit gratuit de vos campagnes'}
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-[#8B1431] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:shadow-xl transition-all cursor-pointer"
              >
                {article.category === 'Social Media' || article.slug.includes('tiktok')                  ? 'Découvrir nos offres social media'
                  : article.category === 'SEO'
                  ? 'Demander un audit SEO'
                  : article.category === 'Développement Web'
                  ? 'Démarrer mon projet'
                  : 'Demander un audit gratuit'}
              </motion.a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function formatContent(content: string): string {
  // Convert Markdown to HTML (basic conversion)
  // Process links separately to avoid conflicts with Next.js Link component
  let formattedContent = content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/^- (.+)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^([^<].*)$/gim, '<p>$1</p>')

  // Handle links separately - use a span with onClick for internal links
  formattedContent = formattedContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, text, href) => {
      // For internal links, we'll just use a regular anchor tag
      // Next.js will handle client-side navigation automatically
      return `<a href="${href}">${text}</a>`
    }
  )

  // Sanitize: strip script tags, event handlers, and dangerous attributes
  formattedContent = formattedContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')

  // The page header already renders the article title as <h1>. Strip any
  // <h1> the markdown produced so we end up with a single h1 per page.
  formattedContent = formattedContent.replace(/<h1>[\s\S]*?<\/h1>/gi, '')

  return formattedContent
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles()

  return {
    paths: articles.map(article => ({
      params: { slug: article.slug }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ArticlePageProps> = async ({ params }) => {
  const slug = params?.slug as string
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      article
    }
  }
}