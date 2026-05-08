import { cn } from '@/lib/utils'

export interface BarChartRow {
  label: string
  /** 0-100 — controls the bar fill width as a percentage */
  widthPct: number
  /** Display value next to the bar, e.g. "11,20 €" */
  valueLabel: string
}

interface BarChartProps {
  title: string
  rows: BarChartRow[]
  className?: string
}

// Lightweight dependency-free horizontal bar chart. Bars are static (no
// scroll-into-view animation) — the framer-motion path was removed for
// mobile CWV in Sprint 2 commit S2-#13. The fill is set via inline width
// style.
export function BarChart({ title, rows, className }: BarChartProps) {
  return (
    <figure
      className={cn(
        'my-7 px-6 py-5 bg-slate-50 rounded-xl border border-slate-200',
        className,
      )}
    >
      <figcaption className="font-display font-bold text-[14px] text-digiqo-black m-0 mb-3.5">
        {title}
      </figcaption>
      <div role="list" aria-label={title} className="space-y-2">
        {rows.map((row, idx) => (
          <Bar key={idx} {...row} />
        ))}
      </div>
    </figure>
  )
}

function Bar({ label, widthPct, valueLabel }: BarChartRow) {
  const clamped = Math.max(0, Math.min(100, widthPct))
  return (
    <div role="listitem" className="grid grid-cols-[110px_1fr_80px] gap-3 items-center text-[13.5px]">
      <span className="text-slate-700 font-medium">{label}</span>
      <span
        className="bg-slate-200 rounded-full h-3 overflow-hidden"
        aria-label={`${label} : ${valueLabel}`}
      >
        <span
          className="block h-full rounded-full bg-gradient-to-r from-digiqo-primary to-digiqo-accent"
          style={{ width: `${clamped}%` }}
        />
      </span>
      <span className="font-display font-bold text-digiqo-black text-right">{valueLabel}</span>
    </div>
  )
}
