import { cn } from '@/lib/utils'

interface PullQuoteProps {
  children: React.ReactNode
  attribution?: string
  className?: string
}

// Center-aligned typographic quote, used to surface the standalone insight
// of a section. Static (no scroll-into-view animation) since Sprint 2
// commit S2-#13 — keeps mobile TBT low.
export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <figure className={cn('my-9 text-center', className)}>
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
    </figure>
  )
}
