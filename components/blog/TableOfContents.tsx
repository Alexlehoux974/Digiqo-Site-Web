import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TocItem {
  id: string
  label: React.ReactNode
}

interface TableOfContentsProps {
  items: TocItem[]
  /** Pixel offset accounted for by sticky header — defaults to 128px (pt-32). */
  scrollOffset?: number
  className?: string
}

// IntersectionObserver-based scrollspy. We track which H2 is closest to the
// top reading area (rootMargin -30%/-60%) and mark it active in both the
// desktop and mobile TOCs. Single hook drives both because they share state.
function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (typeof window === 'undefined' || ids.length === 0) return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          // Prefer the topmost visible heading
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

export function TableOfContents({ items, scrollOffset = 128, className }: TableOfContentsProps) {
  const ids = items.map((item) => item.id)
  const activeId = useActiveHeading(ids)

  // Anchor scroll handler that respects the sticky header offset — without
  // this, the heading lands behind the header.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset
    window.scrollTo({ top, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  // Shared link list rendered in both desktop and mobile variants.
  const linkList = (
    <ol className="list-none p-0 m-0 [counter-reset:toc]">
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <li key={item.id} className="[counter-increment:toc] m-0">
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                'flex gap-2.5 items-baseline py-2 -ml-[22px] pl-5 leading-[1.45]',
                'border-l-2 transition-all',
                'before:content-[counter(toc,decimal-leading-zero)] before:font-display before:font-semibold before:text-[11px] before:flex-shrink-0 before:pt-px',
                isActive
                  ? 'text-digiqo-primary font-semibold border-l-digiqo-primary before:text-digiqo-primary'
                  : 'text-slate-600 border-l-transparent hover:text-digiqo-primary before:text-slate-500',
              )}
            >
              {item.label}
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <>
      {/* Desktop: sticky right column */}
      <nav
        aria-label="Sommaire de l'article"
        className={cn(
          'hidden lg:block sticky pl-5 border-l border-slate-200 text-[13.5px]',
          className,
        )}
        style={{ top: scrollOffset + 16 }}
      >
        <p className="font-display font-bold uppercase tracking-[0.08em] text-[11px] text-slate-500 m-0 mb-3.5">
          Sommaire
        </p>
        {linkList}
      </nav>

      {/* Mobile: collapsible block, expanded by default */}
      <details
        open
        aria-label="Sommaire de l'article"
        className={cn(
          'lg:hidden border border-slate-200 rounded-xl px-4 py-3.5 my-3 [&[open]]:pb-4 group',
          className,
        )}
      >
        <summary className="cursor-pointer list-none flex justify-between items-center [&::-webkit-details-marker]:hidden">
          <span className="font-display font-bold uppercase tracking-[0.08em] text-[11px] text-slate-500">
            Sommaire
          </span>
          <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="mt-3.5">{linkList}</div>
      </details>
    </>
  )
}
