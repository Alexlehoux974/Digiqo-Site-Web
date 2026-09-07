import { useState } from 'react'
import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion'
import { ChevronUp, X, Send } from 'lucide-react'
import type { Influencer } from '@/lib/createurs/types'
import { generateContactUrl } from '@/lib/contact-utils'

interface Props {
  selection: Influencer[]
  onRemove: (handle: string) => void
  onClear: () => void
}

// Barre sticky de sélection (mobile). La sélection vit en useState :
// rien n'est stocké ni persisté, conformément au brief.
export const SelectionBar = ({ selection, onRemove, onClear }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const reduce = useReducedMotion()

  if (selection.length === 0) return null

  const handles = selection.map((c) => c.handle).join(', ')
  const quoteHref = generateContactUrl({
    description: `Je souhaite un devis pour une campagne avec ${selection.length} créateur${
      selection.length > 1 ? 's' : ''
    } : ${handles}`,
  })

  return (
    <div className="sticky bottom-0 z-40 -mx-3 mt-6 border-t border-gray-200 bg-white/95 px-3 pb-3 pt-2 backdrop-blur md:hidden">
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

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          Ma sélection ({selection.length})
          <ChevronUp className={`h-4 w-4 transition-transform duration-200 ${expanded ? '' : 'rotate-180'}`} aria-hidden="true" />
        </button>
        <a
          href={quoteHref}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#111111] px-3 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Demander un devis
        </a>
        <button
          type="button"
          onClick={onClear}
          aria-label="Vider ma sélection"
          className="rounded-xl p-2.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
