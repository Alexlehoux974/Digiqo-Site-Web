import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RichText } from './RichText'
import type { FAQItem } from './types'

export type { FAQItem } from './types'

interface FAQProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
  /** When true, the first item is rendered open by default. */
  defaultOpenFirst?: boolean
  className?: string
}

// FAQ accordion. Answers are light-markdown strings rendered via RichText so
// inline backlinks and **bold** work without dangerous HTML interpretation.
// JSON-LD FAQPage emission is centralized in buildArticleSchemas.ts.
export function FAQ({
  title = 'Questions fréquentes',
  subtitle,
  items,
  defaultOpenFirst = true,
  className,
}: FAQProps) {
  return (
    <section className={cn('mt-16', className)}>
      <h2 className="font-display font-bold text-[28px] text-digiqo-black m-0 mb-1.5 tracking-[-0.025em]">
        {title}
      </h2>
      {subtitle && <p className="text-slate-500 m-0 mb-6 text-[15px]">{subtitle}</p>}

      <div className="border-t border-slate-100">
        {items.map((item, idx) => (
          <details
            key={idx}
            open={defaultOpenFirst && idx === 0}
            className="group border-b border-slate-100"
          >
            <summary className="cursor-pointer list-none flex justify-between items-center py-5 px-1 gap-4 font-display font-semibold text-[17px] text-digiqo-black hover:text-digiqo-primary [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="w-[30px] h-[30px] rounded-full bg-slate-50 flex items-center justify-center transition-all flex-shrink-0 group-open:bg-digiqo-primary/[0.08] group-open:rotate-180"
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-600 group-open:text-digiqo-primary" />
              </span>
            </summary>
            <div className="px-1 pb-5 -mt-1 text-[16px] leading-[1.7] text-slate-700">
              <RichText source={item.answer} as="p" />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
