import { cn } from '@/lib/utils'

export interface NumberedStep {
  title: string
  body: React.ReactNode
}

interface NumberedStepsProps {
  steps: NumberedStep[]
  className?: string
}

// Numbered cards 01/02/03... — used for "5 steps to do X" sections. Pairs
// nicely with HowTo JSON-LD: the page generator can map each step.title /
// step.body to a HowToStep schema entry, surfacing the article in Google's
// step-by-step rich result.
//
// Static layout (Sprint 2 commit S2-#13) — the per-step stagger animation
// was removed for mobile CWV.
export function NumberedSteps({ steps, className }: NumberedStepsProps) {
  return (
    <div className={cn('my-7 grid gap-3.5', className)}>
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[56px_1fr] gap-4 px-5 py-4 bg-white rounded-xl border border-slate-200 hover:border-digiqo-primary hover:translate-x-0.5 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark text-white flex items-center justify-center font-display font-extrabold text-base flex-shrink-0">
            {String(idx + 1).padStart(2, '0')}
          </div>
          <div>
            <h4 className="font-display font-bold text-[17px] text-digiqo-black m-0 my-1">
              {step.title}
            </h4>
            <div className="m-0 text-[15px] text-slate-600 leading-[1.55] [&_a]:text-digiqo-primary [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-digiqo-accent">
              {step.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
