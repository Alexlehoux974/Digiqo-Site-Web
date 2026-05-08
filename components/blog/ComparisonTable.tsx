import { cn } from '@/lib/utils'

export type ComparisonCell =
  | { kind: 'text'; value: React.ReactNode }
  | { kind: 'badge'; value: string; tone: 'good' | 'mid' | 'bad' }
  | { kind: 'verdict'; value: string; winner: 'left' | 'right' | 'tie' }

interface ComparisonTableProps {
  title: string
  subtitle?: string
  headers: string[]
  /** Each row's first cell is treated as the row label (Montserrat bold). */
  rows: ComparisonCell[][]
  className?: string
}

const badgeTones = {
  good: 'bg-[#1B7A4E]/[0.12] text-[#1B7A4E]',
  mid: 'bg-[#B48C1E]/[0.14] text-[#8C6B12]',
  bad: 'bg-digiqo-primary/[0.10] text-digiqo-primary',
} as const

const verdictColor = {
  left: 'text-[#1B7A4E]',   // green when the left column wins
  right: 'text-digiqo-primary', // bordeaux when the right column wins
  tie: 'text-slate-500',
} as const

export function ComparisonTable({
  title,
  subtitle,
  headers,
  rows,
  className,
}: ComparisonTableProps) {
  return (
    <figure
      className={cn('my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm', className)}
    >
      <figcaption className="bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark text-white px-6 py-4">
        <div className="font-display font-bold text-[17px]">{title}</div>
        {subtitle && (
          <div className="text-[13px] text-white/[0.78] mt-1">{subtitle}</div>
        )}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[14.5px] bg-white">
          <thead>
            <tr>
              {headers.map((h, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="bg-slate-50 px-5 py-3 text-left font-display font-bold text-[12.5px] text-digiqo-black uppercase tracking-[0.04em] border-b border-slate-100"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-digiqo-primary/[0.02]">
                {row.map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className={cn(
                      'px-5 py-3.5 align-top border-b border-slate-100 last:border-b-0',
                      colIdx === 0 && 'font-display font-semibold text-digiqo-black',
                    )}
                  >
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}

function renderCell(cell: ComparisonCell) {
  switch (cell.kind) {
    case 'text':
      return cell.value
    case 'badge':
      return (
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold',
            badgeTones[cell.tone],
          )}
        >
          {cell.value}
        </span>
      )
    case 'verdict':
      return (
        <span className={cn('font-semibold', verdictColor[cell.winner])}>{cell.value}</span>
      )
  }
}
