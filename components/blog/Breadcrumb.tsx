import Link from 'next/link'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string   // omit on the last item (current page)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={cn('flex flex-wrap items-center gap-2 text-[13px] text-slate-500 mb-7', className)}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <Fragment key={`${item.label}-${idx}`}>
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-digiqo-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-slate-600' : ''}>
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-slate-300" aria-hidden="true">/</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}

const SITE_URL = 'https://digiqo.fr'

// Generates JSON-LD BreadcrumbList — feed it to next/head.
// Items must have absolute paths (we prepend SITE_URL automatically).
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}` } : {}),
    })),
  }
}
