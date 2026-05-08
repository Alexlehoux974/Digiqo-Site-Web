import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ClusterPillProps {
  label: string
  href?: string
  className?: string
}

const baseClasses = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors bg-digiqo-primary/[0.08] border-digiqo-primary/[0.18] text-digiqo-primary hover:bg-digiqo-primary/[0.12]'
const dot = 'w-1.5 h-1.5 rounded-full bg-digiqo-primary'

export function ClusterPill({ label, href, className }: ClusterPillProps) {
  const content = (
    <>
      <span className={dot} aria-hidden="true" />
      {label}
    </>
  )
  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, className)}>
        {content}
      </Link>
    )
  }
  return <span className={cn(baseClasses, className)}>{content}</span>
}
