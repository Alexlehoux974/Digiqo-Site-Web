import { CheckSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RichText } from './RichText'

interface TldrBoxProps {
  /** Each item is a light-markdown string parsed by RichText. */
  forWhom: string[]
  whatYouLearn: string[]
  className?: string
}

export function TldrBox({ forWhom, whatYouLearn, className }: TldrBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-slate-200 overflow-hidden shadow-sm',
        className,
      )}
    >
      <div className="bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark text-white px-5 py-3.5 font-display font-bold text-sm uppercase tracking-[0.04em] flex items-center gap-2.5">
        <CheckSquare className="w-[18px] h-[18px]" aria-hidden="true" />
        Pour qui · Ce que tu vas apprendre
      </div>

      <div className="bg-white grid sm:grid-cols-2 grid-cols-1">
        <TldrColumn
          title="Pour qui est cet article ?"
          items={forWhom}
          className="sm:border-r border-slate-100 sm:border-b-0 border-b"
        />
        <TldrColumn title="Ce que tu vas apprendre" items={whatYouLearn} />
      </div>
    </motion.div>
  )
}

function TldrColumn({
  title,
  items,
  className,
}: {
  title: string
  items: string[]
  className?: string
}) {
  return (
    <div className={cn('px-6 py-5', className)}>
      <h4 className="font-display font-bold text-[12px] uppercase tracking-[0.08em] text-slate-500 m-0 mb-3">
        {title}
      </h4>
      <ul className="m-0 p-0 list-none space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative pl-7 text-[14.5px] leading-[1.5] text-slate-700"
          >
            <span
              aria-hidden="true"
              className="absolute left-1 top-[7px] w-3.5 h-3.5 rounded-full bg-digiqo-primary/[0.08] flex items-center justify-center"
            >
              <span className="block w-[7px] h-[4px] border-l-[1.5px] border-b-[1.5px] border-digiqo-primary -rotate-45 -translate-y-[1px]" />
            </span>
            <RichText source={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
