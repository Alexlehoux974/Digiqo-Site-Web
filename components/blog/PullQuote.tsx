import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PullQuoteProps {
  children: React.ReactNode
  attribution?: string
  className?: string
}

// Center-aligned typographic quote, used to surface the standalone insight
// of a section ("TikTok wins on acquisition. Meta wins on retention.").
// Reads as a visual breath between two prose blocks.
export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('my-9 text-center', className)}
    >
      <span
        aria-hidden="true"
        className="block font-display text-[100px] leading-[1] -mb-5 text-digiqo-primary/15"
      >
        “
      </span>
      <blockquote className="font-display font-bold text-[26px] text-digiqo-black leading-[1.25] tracking-[-0.025em] m-0 mb-3 whitespace-pre-line">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="text-[13.5px] text-slate-500 uppercase tracking-[0.06em] font-semibold">
          — {attribution}
        </figcaption>
      )}
    </motion.figure>
  )
}
