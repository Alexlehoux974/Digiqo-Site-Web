import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BlogCTAConfig } from './types'

interface BlogCTAProps extends BlogCTAConfig {
  className?: string
}

// Full-width gradient banner that closes every article. Bordeaux core with
// orange + cyan radial accents at the corners — same gradient family as the
// home /agence pages so the article feels native to the site.
export function BlogCTA({ eyebrow, heading, body, primary, secondary, className }: BlogCTAProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'mt-20 px-6 py-14 text-white text-center relative overflow-hidden',
        'bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark',
        className,
      )}
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 60% at 80% 0%, rgba(218,101,48,0.18), transparent 60%), radial-gradient(ellipse 60% 60% at 0% 100%, rgba(25,156,183,0.16), transparent 60%), linear-gradient(135deg, #8B1431, #6B0F26)',
      }}
    >
      <div className="max-w-[720px] mx-auto relative">
        <span className="inline-block font-display font-semibold uppercase tracking-[0.12em] text-xs text-white/[0.78] mb-3.5">
          {eyebrow}
        </span>
        <h2 className="font-display font-extrabold text-white m-0 mb-3.5 tracking-[-0.025em] leading-[1.15] text-[clamp(1.75rem,3.4vw,2.375rem)]">
          {heading}
        </h2>
        <p className="text-[17px] text-white/[0.84] m-0 mb-7 leading-[1.6]">{body}</p>

        <div className="inline-flex flex-wrap gap-3.5 justify-center">
          <Link
            href={primary.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-br from-digiqo-accent to-digiqo-accent-dark text-white font-semibold text-[15px] hover:-translate-y-0.5 transition-transform shadow-accent"
          >
            {primary.label}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-white/[0.08] border border-white/[0.22] text-white font-semibold text-[15px] hover:bg-white/[0.14] transition-colors"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  )
}
