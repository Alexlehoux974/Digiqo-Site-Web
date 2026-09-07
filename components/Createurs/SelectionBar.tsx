import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion'
import { ChevronUp, X, Send } from 'lucide-react'
import type { Influencer } from '@/lib/createurs/types'
import { generateContactUrl } from '@/lib/contact-utils'

interface Props {
  selection: Influencer[]
  onRemove: (handle: string) => void
  onClear: () => void
}

// Barre de sélection (mobile). En `fixed` et non `sticky` : en sticky elle
// restait sous la pile, hors du champ de vision au moment du ♥.
// La sélection vit en useState : rien n'est stocké ni persisté.
export const SelectionBar = ({ selection, onRemove, onClear }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const reduce = useReducedMotion()
  const barRef = useRef<HTMLDivElement>(null)

  const count = selection.length

  // Publie la hauteur occupée en bas d'écran (safe-area incluse) pour que les
  // éléments flottants — le bouton du chat — puissent se décaler au-dessus.
  // Remise à 0 dès que la barre disparaît.
  useEffect(() => {
    const root = document.documentElement
    if (count === 0) {
      root.style.setProperty('--digiqo-bottom-offset', '0px')
      return
    }
    const el = barRef.current
    if (!el) return
    const publish = () => root.style.setProperty('--digiqo-bottom-offset', `${Math.round(el.offsetHeight)}px`)
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    return () => {
      ro.disconnect()
      root.style.setProperty('--digiqo-bottom-offset', '0px')
    }
  }, [count])
  const handles = selection.map((c) => c.handle).join(', ')
  const quoteHref = generateContactUrl({
    description: `Je souhaite un devis pour une campagne avec ${count} créateur${
      count > 1 ? 's' : ''
    } : ${handles}`,
  })

  return (
    <>
      {/* Réserve la place sous la pile pour que la barre ne masque rien */}
      {count > 0 && <div className="h-28 md:hidden" aria-hidden="true" />}

      <AnimatePresence>
        {count > 0 && (
          <motion.div
            ref={barRef}
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: reduce ? 'tween' : 'spring', stiffness: 420, damping: 34, duration: reduce ? 0.15 : undefined }}
            className="fixed inset-x-0 bottom-0 z-[90] border-t border-gray-200 bg-white px-3 pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden"
          >
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                  className="mb-2 max-h-44 overflow-y-auto"
                >
                  {selection.map((c) => (
                    <li key={c.handle} className="flex items-center justify-between gap-2 py-1.5">
                      <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
                        {c.name} <span className="text-gray-400">{c.handle}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemove(c.handle)}
                        aria-label={`Retirer ${c.name} de ma sélection`}
                        className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900"
              >
                <motion.span
                  key={count}
                  initial={reduce ? false : { scale: 1.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#111111] px-1.5 text-xs font-bold text-white"
                >
                  {count}
                </motion.span>
                Ma sélection
                <ChevronUp className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expanded ? '' : 'rotate-180'}`} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onClear}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Vider
              </button>
            </div>

            <a
              href={quoteHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-3 py-3 text-sm font-bold text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Demander un devis pour {count} créateur{count > 1 ? 's' : ''}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
