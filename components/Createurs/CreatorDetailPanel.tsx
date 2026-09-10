import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion'
import {
  X, MapPin, Heart, Zap, Star, MessageCircle, ArrowUpRight, Camera,
} from 'lucide-react'
import { contentTypeIcons } from './contentTypeIcons'
import { CategoryPill, LevelBadge } from './CreatorBadges'
import { platformsOf } from './platforms'
import type { Influencer } from '@/lib/createurs/types'
import {
  SMALL_AUDIENCE_TITLE,
  displayedEngagement,
  getAvgEngagement,
  getAvgEngagementValue,
  getNicheColor,
} from '@/lib/createurs/helpers'
import { demandeHref } from '@/lib/createurs/demande'
import { fichePath } from '@/lib/createurs/fiche'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

interface Props {
  influencer: Influencer | null
  onClose: () => void
}

export const CreatorDetailPanel = ({ influencer, onClose }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const open = influencer !== null

  // Échap ferme, Tab reste piégé dans le panneau.
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
    // Verrouille le scroll de la page derrière le panneau.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Le focus part sur la fermeture : première action attendue.
    const timer = window.setTimeout(() => closeRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
    }
  }, [open, onKeyDown])

  const avg = influencer ? getAvgEngagementValue(influencer) : null
  const platforms = influencer ? platformsOf(influencer) : []

  return (
    <AnimatePresence>
      {influencer && (
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
            aria-label={`Profil de ${influencer.name}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={{ type: reduce ? 'tween' : 'spring', duration: reduce ? 0 : undefined, damping: 32, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[120] max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[420px] sm:rounded-l-3xl sm:rounded-tr-none"
          >
            {/* Poignée visuelle du bottom sheet (mobile uniquement) */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-3 backdrop-blur">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Profil créateur</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Fermer le panneau"
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 pb-8 pt-5">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={influencer.photo}
                    alt={influencer.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold leading-tight text-gray-900">{influencer.name}</h2>
                  <p className="text-sm text-gray-500">{influencer.handle}</p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                    {influencer.location}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <LevelBadge niveau={influencer.niveau} />
                    <CategoryPill categorie={influencer.categorie} />
                  </div>
                </div>
              </div>

              {avg !== null && (
                <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Zap className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                    Engagement moyen
                  </span>
                  <span className="text-lg font-extrabold text-gray-900">{getAvgEngagement(influencer)}</span>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3">
                {platforms.map((platform) => {
                  const engagement = displayedEngagement(platform.stats)
                  return (
                    <div key={platform.key} className="rounded-xl border border-gray-200 p-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                        {platform.icon}
                        {platform.label}
                      </span>
                      <div className="mt-1 text-xl font-extrabold leading-none text-gray-900">
                        {platform.stats.followers}
                      </div>
                      <div className="mt-0.5 text-[10px] text-gray-400">abonnés</div>
                      {/* Sous 500 abonnés, « — » plutôt qu'un taux qui ne veut rien dire. */}
                      <div
                        title={engagement ? undefined : SMALL_AUDIENCE_TITLE}
                        className={`mt-2 inline-flex items-center gap-1 text-[11px] font-semibold ${
                          engagement ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        <Heart
                          className={`h-3 w-3 ${engagement ? 'text-gray-400' : 'text-gray-300'}`}
                          aria-hidden="true"
                        />
                        {engagement ?? '—'}
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-gray-600">{influencer.bio}</p>

              {influencer.niches.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Niches</h3>
                  <div className="flex flex-wrap gap-2">
                    {influencer.niches.map((niche) => (
                      <span
                        key={niche}
                        className={`inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${getNicheColor(niche)}`}
                      >
                        {niche}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {influencer.contentTypes.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Formats</h3>
                  <div className="flex flex-wrap gap-2">
                    {influencer.contentTypes.map((type) => {
                      const Icon = contentTypeIcons[type] || Camera
                      return (
                        <span key={type} className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1">
                          <Icon className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />
                          <span className="text-xs font-medium text-gray-600">{type}</span>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
                <span className="text-gray-500">Tarifs</span>
                <span className="font-semibold text-gray-800">Sur demande</span>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <a
                      key={platform.key}
                      href={platform.stats.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:border-[#111111] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                    >
                      {platform.icon}
                      {platform.label}
                    </a>
                  ))}
                </div>
                <a
                  href={demandeHref([influencer.handle])}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Engager ce créateur
                </a>
                {/* Le panneau reste le parcours principal ; la fiche est l'URL
                    partageable, utile à la créatrice comme au client. */}
                <Link
                  href={fichePath(influencer.slug)}
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                >
                  Voir la fiche
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
