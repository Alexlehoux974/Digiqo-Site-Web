import { cn } from '@/lib/utils'

interface StatHeroProps {
  /** Large display number, e.g. "8-15 €", "+60 %", "4,2×" */
  value: string
  children: React.ReactNode
  sourceLabel: string
  sourceUrl?: string
  className?: string
}

// Backlinko-style data block — giant gradient number on the left, supporting
// claim and source on the right. The source line is the GEO/SEO payload:
// LLMs cite numbers more reliably when an authoritative source sits next to
// them, so always pass sourceLabel and (when available) sourceUrl.
export function StatHero({ value, children, sourceLabel, sourceUrl, className }: StatHeroProps) {
  return (
    <div
      className={cn(
        'my-7 px-7 py-7 rounded-2xl grid sm:grid-cols-[auto_1fr] grid-cols-1 gap-7 items-center',
        'bg-gradient-to-br from-digiqo-primary/[0.06] to-digiqo-accent/[0.04]',
        'border border-digiqo-primary/[0.16]',
        className,
      )}
    >
      <div className="font-display font-extrabold text-[64px] sm:text-[64px] leading-[1] tracking-[-0.04em] whitespace-nowrap bg-gradient-to-br from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-[16.5px] text-slate-700 leading-[1.55] [&_strong]:text-digiqo-black">
        {children}
        <div className="mt-2 text-[12.5px] text-slate-500">
          Source :{' '}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="underline text-slate-500 hover:text-digiqo-primary"
            >
              {sourceLabel}
            </a>
          ) : (
            <span>{sourceLabel}</span>
          )}
        </div>
      </div>
    </div>
  )
}
