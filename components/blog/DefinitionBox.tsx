import { BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DefinitionBoxProps {
  term: string
  children: React.ReactNode
  className?: string
}

// Glossary-inline mini box for technical terms (CPM, CPA, ROAS, etc.).
// Visually distinct (cyan) so it doesn't compete with bordeaux callouts.
export function DefinitionBox({ term, children, className }: DefinitionBoxProps) {
  return (
    <div
      className={cn(
        'my-6 px-5 py-4 grid grid-cols-[36px_1fr] gap-3.5 rounded-xl',
        'bg-gradient-to-br from-digiqo-secondary/[0.06] to-digiqo-secondary/[0.02]',
        'border border-digiqo-secondary/[0.22]',
        className,
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-digiqo-secondary/[0.14] text-digiqo-secondary-dark flex items-center justify-center">
        <BookOpen className="w-[18px] h-[18px]" aria-hidden="true" />
      </div>
      <div>
        <div className="font-display font-bold text-[14.5px] text-digiqo-secondary-dark m-0 mb-1 uppercase tracking-[0.04em]">
          {term}
        </div>
        <div className="m-0 text-[15px] text-slate-700 leading-[1.6] [&_a]:text-digiqo-secondary-dark [&_a]:font-semibold [&_a]:underline [&_a:hover]:text-digiqo-primary">
          {children}
        </div>
      </div>
    </div>
  )
}
