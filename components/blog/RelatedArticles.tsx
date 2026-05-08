import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { RelatedArticleRef } from './types'

interface RelatedArticlesProps {
  title?: string
  /** Link rendered on the right of the heading, e.g. "Voir tout le cluster Social Media →" */
  clusterLink?: { label: string; href: string }
  articles: RelatedArticleRef[]
  className?: string
}

export function RelatedArticles({
  title = 'Ces articles peuvent vous intéresser',
  clusterLink,
  articles,
  className,
}: RelatedArticlesProps) {
  return (
    <section
      className={cn('max-w-[1200px] mx-auto mt-20 px-6', className)}
      aria-label="Articles liés"
    >
      <div className="flex justify-between items-end mb-7 border-t border-slate-200 pt-8 gap-4 flex-wrap">
        <h2 className="font-display font-bold text-[26px] text-digiqo-black m-0 tracking-[-0.02em]">
          {title}
        </h2>
        {clusterLink && (
          <Link
            href={clusterLink.href}
            className="text-sm font-semibold text-digiqo-primary hover:text-digiqo-accent transition-colors"
          >
            {clusterLink.label}
          </Link>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <RelatedCard key={article.slug} article={article} idx={idx} />
        ))}
      </div>
    </section>
  )
}

function RelatedCard({ article, idx }: { article: RelatedArticleRef; idx: number }) {
  // Lightweight gradient backdrop when the article hasn't been written yet
  // and has no featured image. Falls back to bordeaux→accent rotation.
  const gradients = [
    'from-digiqo-primary to-digiqo-accent',
    'from-digiqo-accent to-digiqo-secondary',
    'from-digiqo-secondary to-digiqo-primary',
  ]
  const gradient = gradients[idx % gradients.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.06 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-digiqo-lg hover:border-digiqo-primary/30 transition-all"
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <div className={cn('h-[170px] relative bg-gradient-to-br', gradient)}>
          {article.featuredImage && (
            <Image
              src={article.featuredImage}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          )}
          <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-white/[0.94] backdrop-blur-md rounded-full text-[11.5px] font-bold text-digiqo-primary uppercase tracking-[0.04em]">
            {article.pillLabel}
          </span>
        </div>
        <div className="px-5 pt-4 pb-5">
          <h3 className="font-display font-bold text-[17px] text-digiqo-black m-0 mb-2 leading-[1.3]">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500 m-0 mb-3.5 leading-[1.5]">{article.excerpt}</p>
          <div className="flex justify-between text-[12.5px] text-slate-500">
            <span>{article.readTime}</span>
            <span className="text-digiqo-primary font-semibold">Lire →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
