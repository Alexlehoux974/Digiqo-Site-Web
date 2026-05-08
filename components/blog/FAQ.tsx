import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { renderToStaticMarkup } from 'react-dom/server'
import { cn } from '@/lib/utils'

export interface FAQItem {
  question: string
  /** Pass JSX with inline backlinks. The accordion body renders this; the
   *  schema serializer flattens it to plain text. */
  answer: React.ReactNode
}

interface FAQProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
  /** When true, the first item is rendered open by default. */
  defaultOpenFirst?: boolean
  className?: string
}

export function FAQ({
  title = 'Questions fréquentes',
  subtitle,
  items,
  defaultOpenFirst = true,
  className,
}: FAQProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('mt-16', className)}
    >
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
            <div className="px-1 pb-5 -mt-1 text-[16px] leading-[1.7] text-slate-700 [&_a]:text-digiqo-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-digiqo-accent">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </motion.section>
  )
}

// Strip rendered JSX answer down to plain text for FAQPage schema.
// Schema.org requires acceptedAnswer.text to be a string. We render the JSX
// to static HTML, then strip tags. Used by buildFAQPageSchema below.
function flattenAnswer(answer: React.ReactNode): string {
  if (typeof answer === 'string') return answer
  if (typeof answer === 'number') return String(answer)
  const html = renderToStaticMarkup(<>{answer}</>)
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

// Generates FAQPage JSON-LD ready to inject in next/head. Inline links in
// answers are preserved as visible text (the URLs themselves are dropped to
// keep the schema clean).
export function buildFAQPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: flattenAnswer(item.answer),
      },
    })),
  }
}
