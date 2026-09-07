import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { animate, m as motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { Heart, X, RotateCcw, MapPin, Zap, Sparkles } from 'lucide-react'
import type { Influencer } from '@/lib/createurs/types'
import { getAvgEngagement, getAvgEngagementValue, getNicheColor } from '@/lib/createurs/helpers'

const SWIPE_DISTANCE = 100 // px avant validation du swipe
const SWIPE_VELOCITY = 0.4 // ou vélocité suffisante pour un geste rapide

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

  const x = useMotionValue(0)
  // Rotation proportionnelle au déplacement — désactivée en reduced-motion.
  const rotate = useTransform(x, [-200, 0, 200], reduce ? [0, 0, 0] : [-14, 0, 14])
  const likeOpacity = useTransform(x, [20, 120], [0, 1])
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0])

  const current = creators[index]
  const upcoming = useMemo(() => creators.slice(index + 1, index + 3), [creators, index])

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
      const target = direction * (typeof window !== 'undefined' ? window.innerWidth : 500)
      if (reduce) {
        advance(direction, current)
        return
      }
      animate(x, target, { duration: 0.25, ease: 'easeOut', onComplete: () => advance(direction, current) })
    },
    [current, reduce, x, advance],
  )

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const previous = h[h.length - 1]
      setIndex(previous)
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
      const passed = Math.abs(mx) > SWIPE_DISTANCE || vx > SWIPE_VELOCITY
      if (passed) {
        commit(mx > 0 || dx > 0 ? 1 : -1)
      } else {
        animate(x, 0, { type: reduce ? 'tween' : 'spring', duration: reduce ? 0.15 : undefined, stiffness: 400, damping: 30 })
      }
    },
    { filterTaps: true, axis: 'x', pointer: { touch: true } },
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
      <div className="relative h-[460px] w-full max-w-[340px]">
        {/* Cartes suivantes, décalées et réduites */}
        {upcoming
          .slice()
          .reverse()
          .map((c, i) => {
            const depth = upcoming.length - i
            return (
              <div
                key={c.handle}
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
                style={{ transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.04})`, zIndex: 10 - depth }}
              >
                <div className="relative h-[62%] w-full bg-gray-100">
                  <Image src={c.photo} alt="" fill sizes="340px" className="object-cover" />
                </div>
              </div>
            )
          })}

        {/* Carte active */}
        {/* La cible du geste est un div simple : les handlers DOM de @use-gesture
            (dont onAnimationStart) sont incompatibles avec les props de framer-motion.
            Le transform vit sur le motion.div interne. */}
        <div
          {...bind()}
          style={{ touchAction: 'pan-y', zIndex: 20 }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
        <motion.div
          style={{ x, rotate }}
          className="h-full w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
        >
          <div className="relative h-[62%] w-full bg-gray-100">
            <Image src={current.photo} alt={current.name} fill sizes="340px" className="object-cover" priority />
            {/* Overlays façon Tinder */}
            <motion.span
              style={{ opacity: likeOpacity }}
              className="pointer-events-none absolute left-4 top-4 rounded-lg border-[3px] border-emerald-500 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-emerald-500"
            >
              Sélection
            </motion.span>
            <motion.span
              style={{ opacity: nopeOpacity }}
              className="pointer-events-none absolute right-4 top-4 rounded-lg border-[3px] border-rose-500 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-rose-500"
            >
              Passer
            </motion.span>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <div>
              <h3 className="truncate text-lg font-bold leading-tight text-gray-900">{current.name}</h3>
              <p className="truncate text-xs text-gray-500">{current.handle}</p>
            </div>
            <p className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{current.location}</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {current.niches.slice(0, 3).map((n) => (
                <span
                  key={n}
                  className={`inline-flex items-center rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-semibold text-white ${getNicheColor(n)}`}
                >
                  {n}
                </span>
              ))}
            </div>
            {getAvgEngagementValue(current) !== null && (
              <div className="mt-1 flex items-center justify-between rounded-lg bg-gray-900 px-3 py-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-gray-300">
                  <Zap className="h-3 w-3 text-amber-400" aria-hidden="true" />
                  Engagement moyen
                </span>
                <span className="text-sm font-extrabold text-white">{getAvgEngagement(current)}</span>
              </div>
            )}
          </div>
        </motion.div>
        </div>
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
