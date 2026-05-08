import { motion } from 'framer-motion'
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

// Lightweight dependency-free horizontal bar chart. Bars animate from 0 to
// widthPct on first scroll into view. CSS-only, no chart library — keeps the
// blog bundle small.
export function BarChart({ title, rows, className }: BarChartProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
          <Bar key={idx} {...row} delayMs={idx * 80} />
        ))}
      </div>
    </motion.figure>
  )
}

function Bar({ label, widthPct, valueLabel, delayMs }: BarChartRow & { delayMs: number }) {
  const clamped = Math.max(0, Math.min(100, widthPct))
  return (
    <div role="listitem" className="grid grid-cols-[110px_1fr_80px] gap-3 items-center text-[13.5px]">
      <span className="text-slate-700 font-medium">{label}</span>
      <span
        className="bg-slate-200 rounded-full h-3 overflow-hidden"
        aria-label={`${label} : ${valueLabel}`}
      >
        <motion.span
          className="block h-full rounded-full bg-gradient-to-r from-digiqo-primary to-digiqo-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: delayMs / 1000 }}
        />
      </span>
      <span className="font-display font-bold text-digiqo-black text-right">{valueLabel}</span>
    </div>
  )
}
