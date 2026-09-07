import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { animate, m as motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { Heart, X, RotateCcw, MapPin, Zap, Sparkles, Instagram, Check } from 'lucide-react'
import { TikTokIcon } from './TikTokIcon'
import { PlatformRow } from './PlatformRow'
import type { Influencer } from '@/lib/createurs/types'
import { getAvgEngagement, getAvgEngagementValue, getNicheColor, hasPlatform } from '@/lib/createurs/helpers'

const SWIPE_DISTANCE = 90
const SWIPE_VELOCITY = 0.5
const EXIT_SPRING = { type: 'spring' as const, stiffness: 500, damping: 40, mass: 0.8 }
const EXIT_X = 520
const VISIBLE = 3
const MIN_HEIGHT = 420

type Direction = 1 | -1

// ──────────────────────────────────────────────
// CARTE
// Chaque carte possède SA PROPRE motion value x. Rien n'est jamais remis à zéro
// sur un nœud visible : la carte sortante anime son x jusqu'au bout puis est
// démontée, la carte suivante a toujours eu x = 0. C'est ce qui supprime le
// flash (l'ancienne version partageait un x remis à 0 pendant que la carte
// sortante y était encore liée).
// ──────────────────────────────────────────────
const DeckCard = ({
  influencer,
  depth,
  isActive,
  reduce,
  onExit,
  onOpen,
  onRegister,
  onMeasure,
}: {
  influencer: Influencer
  depth: number
  isActive: boolean
  reduce: boolean | null
  onExit: (direction: Direction, influencer: Influencer) => void
  onOpen: (influencer: Influencer) => void
  onRegister: (commit: ((direction: Direction) => void) | null) => void
  onMeasure: (height: number) => void
}) => {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 0, 220], reduce ? [0, 0, 0] : [-13, 0, 13])
  const likeOpacity = useTransform(x, [24, 110], [0, 1])
  const nopeOpacity = useTransform(x, [-110, -24], [1, 0])
  const innerRef = useRef<HTMLDivElement>(null)

  // Sortie : l'index n'avance qu'à la fin de l'animation (onComplete).
  const commit = useCallback(
    (direction: Direction) => {
      if (reduce) {
        onExit(direction, influencer)
        return
      }
      animate(x, direction * EXIT_X, {
        ...EXIT_SPRING,
        onComplete: () => onExit(direction, influencer),
      })
    },
    [reduce, x, onExit, influencer],
  )

  // La carte active expose sa commande aux boutons ✕ / ♥.
  useEffect(() => {
    if (!isActive) return
    onRegister(commit)
    return () => onRegister(null)
  }, [isActive, commit, onRegister])

  // Hauteur réelle du contenu → le conteneur s'y adapte, plus de rognage.
  useEffect(() => {
    if (!isActive || !innerRef.current) return
    const el = innerRef.current
    const ro = new ResizeObserver(() => onMeasure(el.offsetHeight))
    ro.observe(el)
    onMeasure(el.offsetHeight)
    return () => ro.disconnect()
  }, [isActive, onMeasure])

  const bind = useDrag(
    ({ down, movement: [mx], velocity: [vx], direction: [dx], tap }) => {
      if (tap) {
        onOpen(influencer)
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
    { axis: 'x', filterTaps: true, pointer: { touch: true }, eventOptions: { passive: true }, enabled: isActive },
  )

  return (
    <>
      <motion.div
        style={{ x, rotate, zIndex: 30 - depth, willChange: isActive ? 'transform' : undefined }}
        // Promotion d'un cran animée par la carte elle-même : pas de saut
        // quand elle passe de l'arrière-plan au premier plan.
        initial={false}
        animate={{ scale: 1 - depth * 0.04, y: depth * 10 }}
        transition={{ duration: reduce ? 0 : 0.24, ease: 'easeOut' }}
        aria-hidden={!isActive}
        className={`absolute inset-x-0 top-0 overflow-hidden rounded-3xl border border-gray-200 bg-white ${
          isActive ? 'shadow-md' : ''
        }`}
      >
        <div ref={innerRef}>
          <div className="relative aspect-[3/2] w-full bg-gray-100">
            <Image
              src={influencer.photo}
              alt={isActive ? influencer.name : ''}
              fill
              sizes="340px"
              priority
              className="object-cover"
            />
          </div>
          {isActive ? (
            <div className="flex flex-col gap-2 p-4">
              <div>
                <h3 className="truncate text-lg font-bold leading-tight text-gray-900">{influencer.name}</h3>
                <p className="truncate text-xs text-gray-500">{influencer.handle}</p>
              </div>
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
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
                <div className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-gray-500">
                    <Zap className="h-3 w-3 text-amber-400" aria-hidden="true" />
                    Engagement moyen
                  </span>
                  <span className="text-sm font-extrabold text-gray-900">{getAvgEngagement(influencer)}</span>
                </div>
              )}
            </div>
          ) : (
            // Carte d'arrière-plan : on réserve la même hauteur sans rendre le
            // contenu (moins de DOM à rastériser sous la carte active).
            <div className="h-[196px]" />
          )}
        </div>

        {isActive && (
          <>
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

      {/* Cible du geste, uniquement sur la carte active. Div simple : les
          handlers DOM de @use-gesture sont incompatibles avec framer-motion. */}
      {isActive && (
        <div
          {...bind()}
          style={{ touchAction: 'pan-y', zIndex: 40 }}
          className="absolute inset-x-0 top-0 cursor-grab active:cursor-grabbing"
          // eslint-disable-next-line react/forbid-dom-props
          ref={(el) => {
            if (el && innerRef.current) el.style.height = `${innerRef.current.offsetHeight}px`
          }}
        />
      )}
    </>
  )
}

// ──────────────────────────────────────────────
// PILE
// ──────────────────────────────────────────────
interface Props {
  creators: Influencer[]
  onSelect: (influencer: Influencer) => void
  onOpen: (influencer: Influencer) => void
  onExhausted: React.ReactNode
}

export const SwipeDeck = ({ creators, onSelect, onOpen, onExhausted }: Props) => {
  const [index, setIndex] = useState(0)
  const [history, setHistory] = useState<number[]>([])
  const [height, setHeight] = useState(MIN_HEIGHT)
  const [justAdded, setJustAdded] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const commitRef = useRef<((direction: Direction) => void) | null>(null)

  const window3 = useMemo(() => creators.slice(index, index + VISIBLE), [creators, index])
  const current = window3[0]

  // Appelé à la FIN de l'animation de sortie : c'est seulement là que l'index
  // avance et que la carte sortante est démontée.
  // `index` passe par une ref : handleExit garde une identité stable, sinon il
  // changeait à chaque swipe et relançait commit + l'effet onRegister des cartes.
  const indexRef = useRef(index)
  indexRef.current = index

  const handleExit = useCallback(
    (direction: Direction, influencer: Influencer) => {
      if (direction === 1) {
        onSelect(influencer)
        setJustAdded(influencer.handle)
        window.setTimeout(() => setJustAdded(null), 1600)
      }
      setHistory((h) => [...h, indexRef.current])
      setIndex((i) => i + 1)
    },
    [onSelect],
  )

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      setIndex(h[h.length - 1])
      return h.slice(0, -1)
    })
  }, [])

  const registerCommit = useCallback((fn: ((direction: Direction) => void) | null) => {
    commitRef.current = fn
  }, [])

  const onMeasure = useCallback((h: number) => {
    const next = Math.max(h, MIN_HEIGHT)
    setHeight((prev) => (Math.abs(prev - next) < 2 ? prev : next))
  }, [])

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
      {/* Hauteur pilotée par la carte active mesurée au ResizeObserver :
          plus rien n'est rogné, quelle que soit la largeur. */}
      <div
        className="relative w-full max-w-[340px] transition-[height] duration-200"
        style={{ height: height + 20 }}
      >
        {window3.map((c, depth) => (
          <DeckCard
            key={c.handle}
            influencer={c}
            depth={depth}
            isActive={depth === 0}
            reduce={reduce}
            onExit={handleExit}
            onOpen={onOpen}
            onRegister={registerCommit}
            onMeasure={onMeasure}
          />
        ))}
      </div>

      {/* Retour visuel immédiat après un ♥ */}
      <div className="h-5" aria-live="polite">
        {justAdded && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Ajouté à votre sélection
          </motion.span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => commitRef.current?.(-1)}
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
          onClick={() => commitRef.current?.(1)}
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
