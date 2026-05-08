import { Calendar, Clock, RefreshCw } from 'lucide-react'
import { m as motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ClusterPill } from './ClusterPill'
import { MetaPill, MetaDot } from './MetaPill'
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'
import { AuthorCardCompact } from './AuthorCard'
import type { ArticleAuthor } from './types'

interface ArticleHeroProps {
  breadcrumb: BreadcrumbItem[]
  cluster: string
  clusterHref?: string
  readTime: string
  date: string
  dateModified?: string
  dateModifiedIso?: string
  title: string
  /** Last word(s) of the H1 highlighted with the bordeaux→orange gradient. Optional. */
  titleAccent?: string
  lede: string
  author: ArticleAuthor
  className?: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export function ArticleHero({
  breadcrumb,
  cluster,
  clusterHref,
  readTime,
  date,
  dateModified,
  dateModifiedIso,
  title,
  titleAccent,
  lede,
  author,
  className,
}: ArticleHeroProps) {
  // Split title for gradient accent — render the accent in a span so it picks
  // up the bordeaux→orange gradient. If titleAccent is missing, render plain.
  let titleNode: React.ReactNode = title
  if (titleAccent && title.endsWith(titleAccent)) {
    const head = title.slice(0, title.length - titleAccent.length)
    titleNode = (
      <>
        {head}
        <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">
          {titleAccent}
        </span>
      </>
    )
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'pt-14 pb-10 px-6',
        'bg-white',
        className,
      )}
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(139,20,49,0.06), transparent 60%), radial-gradient(ellipse 60% 60% at 100% 30%, rgba(218,101,48,0.06), transparent 60%)',
      }}
    >
      {/* Subtle grid backdrop, masked from the center to avoid distraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(#EDEFF3 1px, transparent 1px), linear-gradient(90deg, #EDEFF3 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 50% 0%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 0%, black 30%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[880px] mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <Breadcrumb items={breadcrumb} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="flex flex-wrap gap-2.5 items-center mb-7"
        >
          <ClusterPill label={cluster} href={clusterHref} />
          <MetaDot />
          <MetaPill icon={<Clock />}>{readTime}</MetaPill>
          <MetaDot />
          <MetaPill icon={<Calendar />}>Publié {date}</MetaPill>
          {dateModified && (
            <>
              <MetaDot />
              <MetaPill icon={<RefreshCw />} dateTime={dateModifiedIso} emphasize>
                Mis à jour {dateModified}
              </MetaPill>
            </>
          )}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="font-display font-extrabold text-digiqo-black m-0 mb-5 tracking-[-0.035em] leading-[1.08] text-[clamp(2.125rem,4.4vw,3.125rem)]"
        >
          {titleNode}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="text-[19px] leading-[1.6] text-slate-600 max-w-[740px] m-0 mb-7"
        >
          {lede}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        >
          <AuthorCardCompact author={author} />
        </motion.div>
      </div>
    </section>
  )
}
