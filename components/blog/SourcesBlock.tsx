import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SourceRef } from './types'

interface SourcesBlockProps {
  sources: SourceRef[]
  className?: string
}

// Authoritative external references with rel="nofollow" — keeps PageRank in
// while giving LLMs a citation trail. Primary Digiqo data is rendered
// without a link (own data), distinguished by `primary: true`.
export function SourcesBlock({ sources, className }: SourcesBlockProps) {
  return (
    <section
      className={cn('mt-14 px-7 py-7 bg-slate-50 border border-slate-200 rounded-2xl', className)}
    >
      <h3 className="font-display font-bold text-lg m-0 mb-4 flex items-center gap-2.5">
        <FileText className="w-[18px] h-[18px] text-digiqo-primary" aria-hidden="true" />
        Sources et références
      </h3>
      <ul className="list-none p-0 m-0 grid gap-3">
        {sources.map((source, idx) => (
          <li
            key={idx}
            className="relative pl-[18px] text-[14.5px] before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:bg-digiqo-primary before:rounded-full"
          >
            {source.primary ? (
              <span className="text-slate-700 font-semibold">{source.label}</span>
            ) : source.url ? (
              <a
                href={source.url}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="font-semibold text-digiqo-primary hover:text-digiqo-accent underline-offset-2 hover:underline"
              >
                {source.label}
              </a>
            ) : (
              <span className="text-slate-700 font-semibold">{source.label}</span>
            )}
            {!source.primary && source.url && (
              <span className="text-[11px] px-1.5 py-px rounded bg-slate-200 text-slate-500 ml-1.5 font-medium align-[1px]">
                nofollow
              </span>
            )}
            <span className="block text-[13px] text-slate-500 mt-0.5">{source.description}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
