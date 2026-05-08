import { cn } from '@/lib/utils'

interface MetaPillProps {
  icon: React.ReactNode
  children: React.ReactNode
  emphasize?: boolean   // bordeaux text — used for "Mis à jour le ..."
  dateTime?: string     // ISO date for <time>
  className?: string
}

export function MetaPill({ icon, children, emphasize, dateTime, className }: MetaPillProps) {
  const Tag = dateTime ? 'time' : 'span'
  return (
    <Tag
      {...(dateTime ? { dateTime } : {})}
      className={cn(
        'inline-flex items-center gap-1.5 text-[13px] font-medium',
        emphasize ? 'text-digiqo-primary font-semibold' : 'text-slate-500',
        className,
      )}
    >
      <span className="w-3.5 h-3.5 [&>svg]:w-3.5 [&>svg]:h-3.5" aria-hidden="true">
        {icon}
      </span>
      {children}
    </Tag>
  )
}

export function MetaDot() {
  return <span className="w-[3px] h-[3px] rounded-full bg-slate-300 inline-block" aria-hidden="true" />
}
