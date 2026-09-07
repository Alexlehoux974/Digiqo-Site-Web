import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { CreatorRequestForm } from './CreatorRequestForm'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

interface Props {
  open: boolean
  handles: string[]
  onClose: () => void
}

// Panneau latéral « Demande de créateur » (desktop). Même contrat d'interaction
// que la fiche détail : croix, Échap, clic hors panneau, focus piégé, z-[120].
// Sur mobile le parcours passe par la page pleine /createurs/demande.
export const CreatorRequestPanel = ({ open, handles, onClose }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (nodes.length === 0) return
      const firstEl = nodes[0]
      const lastEl = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => closeRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
    }
  }, [open, onKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Demande de créateur"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={{ type: reduce ? 'tween' : 'spring', duration: reduce ? 0 : undefined, damping: 32, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[120] max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[560px] sm:max-w-[92vw] sm:rounded-l-3xl sm:rounded-tr-none"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-3 backdrop-blur">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Demande de créateur
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Fermer le formulaire"
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* pb généreux : le bouton du chat (z-index 99999) et le bandeau cookies
                flottent au-dessus du panneau — l'action de l'étape doit rester
                atteignable une fois le panneau scrollé à fond. */}
            <div className="px-5 pb-28 pt-5">
              <h2 className="text-xl font-bold leading-tight text-gray-900">
                Décrivez votre besoin en 2 minutes
              </h2>
              <p className="mb-6 mt-2 text-sm leading-relaxed text-gray-500">
                Digiqo fait le matchmaking avec les créateurs de son réseau et revient vers vous sous
                48 h ouvrées.
              </p>

              <CreatorRequestForm
                initialHandles={handles}
                variant="panel"
                onDone={onClose}
                doneLabel="Revenir aux créateurs"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
