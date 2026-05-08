import { motion } from 'framer-motion'
import { MessageSquare, BarChart3, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CalloutVariant } from './types'

interface CallOutProps {
  variant: CalloutVariant
  label: string
  children: React.ReactNode
  /** Used by the `stat` variant to show a giant number above the body. */
  statValue?: string
  className?: string
}

const variantConfig: Record<
  CalloutVariant,
  {
    container: string
    iconWrap: string
    label: string
    icon: React.ReactNode
  }
> = {
  anecdote: {
    container: 'bg-gradient-to-br from-[#FFF5EE] to-[#FFEEE0] border border-digiqo-accent/[0.22]',
    iconWrap: 'bg-digiqo-accent/[0.15] text-digiqo-accent-dark',
    label: 'text-digiqo-accent-dark',
    icon: <span className="text-[22px] leading-none">☀️</span>,
  },
  opinion: {
    container: 'bg-gradient-to-br from-[#F0F9FB] to-[#E5F2F5] border border-digiqo-secondary/[0.22]',
    iconWrap: 'bg-digiqo-secondary/[0.14] text-digiqo-secondary-dark',
    label: 'text-digiqo-secondary-dark',
    icon: <MessageSquare className="w-[22px] h-[22px]" aria-hidden="true" />,
  },
  stat: {
    container: 'bg-gradient-to-br from-[#FAEFF1] to-[#F4E5E8] border border-digiqo-primary/[0.22]',
    iconWrap: 'bg-digiqo-primary/[0.12] text-digiqo-primary',
    label: 'text-digiqo-primary',
    icon: <BarChart3 className="w-[22px] h-[22px]" aria-hidden="true" />,
  },
  warning: {
    container: 'bg-gradient-to-br from-[#FFFAEB] to-[#FFF3D6] border border-[#B48C1E]/[0.28]',
    iconWrap: 'bg-[#B48C1E]/[0.15] text-[#8C6B12]',
    label: 'text-[#8C6B12]',
    icon: <AlertTriangle className="w-[22px] h-[22px]" aria-hidden="true" />,
  },
}

export function CallOut({ variant, label, children, statValue, className }: CallOutProps) {
  const cfg = variantConfig[variant]
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn(
        'grid grid-cols-[56px_1fr] gap-[18px] px-6 py-[22px] rounded-2xl shadow-sm my-7',
        cfg.container,
        className,
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          cfg.iconWrap,
        )}
      >
        {cfg.icon}
      </div>
      <div>
        <div
          className={cn(
            'font-display font-bold uppercase tracking-[0.08em] text-[11px] mb-1.5',
            cfg.label,
          )}
        >
          {label}
        </div>
        {statValue && (
          <div className="font-display font-extrabold text-[38px] text-digiqo-primary leading-[1] tracking-[-0.03em] my-1 mb-2">
            {statValue}
          </div>
        )}
        <div className="text-[16px] leading-[1.6] text-slate-700 [&_p]:m-0 [&_p+p]:mt-3 [&_strong]:text-digiqo-black [&_strong]:font-semibold">
          {children}
        </div>
      </div>
    </motion.aside>
  )
}
