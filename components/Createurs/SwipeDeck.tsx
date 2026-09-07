import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { animate, m as motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { Heart, X, RotateCcw, MapPin, Zap, Sparkles, Instagram } from 'lucide-react'
import { TikTokIcon } from './TikTokIcon'
import { PlatformRow } from './PlatformRow'
import type { Influencer } from '@/lib/createurs/types'
import { getAvgEngagement, getAvgEngagementValue, getNicheColor, hasPlatform } from '@/lib/createurs/helpers'

const SWIPE_DISTANCE = 90 // px avant validation
const SWIPE_VELOCITY = 0.5 // ou vélocité suffisante pour un geste rapide
const EXIT_SPRING = { type: 'spring' as const, stiffness: 500, damping: 40, mass: 0.8 }
const VISIBLE = 3 // cartes montées simultanément

// Contenu visuel d'une carte. Aucun état interne : rien ne se re-rend pendant le drag.
const DeckCardBody = ({ influencer, active }: { influencer: Influencer; active: boolean }) => (
  <>
    <div className="relative h-[58%] w-full bg-gray-100">
      <Image
        src={influencer.photo}
        alt={active ? influencer.name : ''}
        fill
        sizes="340px"
        priority
        className="object-cover"
      />
    </div>
    <div className="flex flex-col gap-2 p-4">
      <div>
        <h3 className="truncate text-lg font-bold leading-tight text-gray-900">{influencer.name}</h3>
        <p className="truncate text-xs text-gray-500">{influencer.handle}</p>
      </div>
      <p className="inline-flex items-center gap-1.5 text-xs text-gray-500">
        <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        <span className="truncate">{influencer.location}</span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {influencer.niches.slice(0, 3).map((n) => (
          <span
            key={n}
            className={`inline-flex items-center rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-semibold text-white ${getNicheColor(n)}`}
          >
            {n}
          </span>
        ))}
      </div>
      {/* Abonnés + engagement par plateforme, identiques à la fiche de grille */}
      <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-2">
        {hasPlatform(influencer, 'instagram') && (
          <PlatformRow
            icon={<Instagram className="h-4 w-4" />}
            label="Instagram"
            followers={influencer.instagram.followers}
            engagement={influencer.instagram.engagement}
          />
        )}
        {hasPlatform(influencer, 'tiktok') && (
          <PlatformRow
            icon={<TikTokIcon className="h-4 w-4" />}
            label="TikTok"
            followers={influencer.tiktok.followers}
            engagement={influencer.tiktok.engagement}
          />
        )}
      </div>
      {getAvgEngagementValue(influencer) !== null && (
        <div className="mt-0.5 flex items-center justify-between rounded-lg bg-gray-100 px-3 py-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-gray-500">
            <Zap className="h-3 w-3 text-amber-400" aria-hidden="true" />
            Engagement moyen
          </span>
          <span className="text-sm font-extrabold text-gray-900">{getAvgEngagement(influencer)}</span>
        </div>
      )}
    </div>
  </>
)

interface Props {
  creators: Influencer[]
  onSelect: (influencer: Influencer) => void
  onOpen: (influencer: Influencer) => void
  onExhausted: React.ReactNode
}

export const SwipeDeck = ({ creators, onSelect, onOpen, onExhausted }: Props) => {
  const [index, setIndex] = useState(0)
  const [history, setHistory] = useState<number[]>([])
  const reduce = useReducedMotion()

  // Toute la mécanique du geste passe par des MotionValues : aucun setState
  // pendant le drag, donc aucun re-render de React entre deux frames.
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 0, 220], reduce ? [0, 0, 0] : [-13, 0, 13])
  const likeOpacity = useTransform(x, [24, 110], [0, 1])
  const nopeOpacity = useTransform(x, [-110, -24], [1, 0])
  // Progression du geste (0 → 1) qui pilote l'échelle des cartes arrière.
  const progress = useTransform(x, (v: number) => Math.min(Math.abs(v) / 140, 1))
  const scale1 = useTransform(progress, [0, 1], [0.96, 1])
  const y1 = useTransform(progress, [0, 1], [10, 0])
  const scale2 = useTransform(progress, [0, 1], [0.92, 0.96])
  const y2 = useTransform(progress, [0, 1], [20, 10])

  // Fenêtre glissante de 3 cartes, clés stables par handle : une carte qui
  // remonte d'un cran conserve son nœud DOM au lieu d'être démontée/remontée.
  const window3 = useMemo(() => creators.slice(index, index + VISIBLE), [creators, index])
  const current = window3[0]

  const backStyles: Array<{ scale: MotionValue<number>; y: MotionValue<number> }> = useMemo(
    () => [
      { scale: scale1, y: y1 },
      { scale: scale2, y: y2 },
    ],
    [scale1, y1, scale2, y2],
  )

  const advance = useCallback(
    (direction: 1 | -1, influencer: Influencer) => {
      if (direction === 1) onSelect(influencer)
      setHistory((h) => [...h, index])
      setIndex((i) => i + 1)
      x.set(0)
    },
    [index, onSelect, x],
  )

  const commit = useCallback(
    (direction: 1 | -1) => {
      if (!current) return
      if (reduce) {
        advance(direction, current)
        return
      }
      const target = direction * 520
      animate(x, target, { ...EXIT_SPRING, onComplete: () => advance(direction, current) })
    },
    [current, reduce, x, advance],
  )

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      setIndex(h[h.length - 1])
      x.set(0)
      return h.slice(0, -1)
    })
  }, [x])

  const bind = useDrag(
    ({ down, movement: [mx], velocity: [vx], direction: [dx], tap }) => {
      if (!current) return
      if (tap) {
        onOpen(current)
        return
      }
      if (down) {
        x.set(mx)
        return
      }
      if (Math.abs(mx) > SWIPE_DISTANCE || vx > SWIPE_VELOCITY) {
        commit(mx > 0 || dx > 0 ? 1 : -1)
      } else {
        animate(x, 0, reduce ? { duration: 0.12 } : EXIT_SPRING)
      }
    },
    { axis: 'x', filterTaps: true, pointer: { touch: true }, eventOptions: { passive: true } },
  )

  if (!current) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
          <Sparkles className="h-8 w-8 text-gray-300" aria-hidden="true" />
          <p className="text-base font-bold text-gray-900">Vous avez tout vu</p>
          <p className="text-sm text-gray-500">Revoyez les profils ou affinez vos filtres.</p>
          <button
            type="button"
            onClick={() => {
              setIndex(0)
              setHistory([])
              x.set(0)
            }}
            className="mt-1 inline-flex items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Revoir
          </button>
        </div>
        {onExhausted}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-[480px] w-full max-w-[340px]">
        {window3.map((c, depth) => {
          const isActive = depth === 0
          const back = backStyles[depth - 1]
          return (
            <motion.div
              key={c.handle}
              aria-hidden={!isActive}
              style={
                isActive
                  ? { x, rotate, zIndex: 30, willChange: 'transform' }
                  : { scale: back.scale, y: back.y, zIndex: 30 - depth, willChange: 'transform' }
              }
              className="absolute inset-0 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md"
            >
              <DeckCardBody influencer={c} active={isActive} />
              {isActive && (
                <>
                  {/* Overlays pilotés par MotionValue : opacity seule, jamais de state */}
                  <motion.span
                    style={{ opacity: likeOpacity, willChange: 'opacity' }}
                    className="pointer-events-none absolute left-4 top-4 rounded-lg border-[3px] border-emerald-500 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-emerald-500"
                  >
                    Sélection
                  </motion.span>
                  <motion.span
                    style={{ opacity: nopeOpacity, willChange: 'opacity' }}
                    className="pointer-events-none absolute right-4 top-4 rounded-lg border-[3px] border-rose-500 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-rose-500"
                  >
                    Passer
                  </motion.span>
                </>
              )}
            </motion.div>
          )
        })}

        {/* Cible du geste au-dessus de la pile : les handlers DOM de @use-gesture
            sont incompatibles avec les props de framer-motion, on les isole ici. */}
        <div
          {...bind()}
          style={{ touchAction: 'pan-y', zIndex: 40 }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        />
      </div>

      {/* Commandes accessibles — équivalent clavier/clic du geste */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => commit(-1)}
          aria-label={`Passer ${current.name}`}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:border-rose-400 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          <X className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={undo}
          disabled={history.length === 0}
          aria-label="Annuler la dernière action"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => commit(1)}
          aria-label={`Ajouter ${current.name} à ma sélection`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          <Heart className="h-6 w-6" />
        </button>
      </div>
      <p className="text-xs text-gray-400">
        {index + 1} / {creators.length} — glissez ou utilisez les boutons
      </p>
    </div>
  )
}
