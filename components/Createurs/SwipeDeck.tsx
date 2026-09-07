import { memo, startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
const INTENT_THRESHOLD = 6 // px avant de trancher l'intention du geste
const INTENT_ANGLE = 60 // < 60° par rapport à l'horizontale = swipe
const VISIBLE = 3 // cartes de l'éventail
const WINDOW = 5 // cartes montées : les 3 visibles + 2 d'avance, prêtes à promouvoir
const MIN_HEIGHT = 420
// Éventail : transforms STATIQUES des cartes d'arrière-plan (aucune motion
// value pilotée pendant le drag, conformément au profil de perf validé).
const DEPTH = [
  { y: 0, scale: 1, rotate: 0 },
  { y: 6, scale: 0.97, rotate: -3 },
  { y: 12, scale: 0.94, rotate: 3 },
]
const depthAt = (d: number) => DEPTH[d] || DEPTH[DEPTH.length - 1]
const NUDGE_KEY = 'digiqo-createurs-nudge'

type Direction = 1 | -1

// ──────────────────────────────────────────────
// CARTE
// Chaque carte possède SA PROPRE motion value x. Rien n'est jamais remis à zéro
// sur un nœud visible : la carte sortante anime son x jusqu'au bout puis est
// démontée, la carte suivante a toujours eu x = 0. C'est ce qui supprime le
// flash (l'ancienne version partageait un x remis à 0 pendant que la carte
// sortante y était encore liée).
// ──────────────────────────────────────────────
// Contenu de la carte : ne dépend QUE de la créatrice. Mémoïsé pour que
// le changement de profondeur à chaque avancée ne re-rende pas les 5
// cartes montées (photo + texte + lignes plateforme + badge).
const CardBody = memo(({ influencer }: { influencer: Influencer }) => (
  <>
      <div className="relative aspect-[3/2] w-full bg-gray-100">
        <Image
          src={influencer.photo}
          alt={influencer.name}
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
  </>
))
CardBody.displayName = 'CardBody'

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
  // Hors éventail : carte déjà sortie (depth < 0) ou en attente (depth >= 3).
  // Montée et complète, mais invisible et sans coût d'animation.
  const hidden = depth < 0 || depth >= VISIBLE
  const x = useMotionValue(0)
  // Le doigt peut avoir une composante verticale : on la suit à 30 % pour que
  // le geste reste naturel sans transformer la pile en carrousel vertical.
  const dragY = useMotionValue(0)
  // Profondeur et geste composés dans UNE SEULE transform : imbriquer deux
  // motion.div doublait le nombre de calques animés (mesuré : -2 fps,
  // +15 frames tombées, 3 long tasks au lieu d'1).
  const depthY = useMotionValue(depthAt(depth).y)
  const scale = useMotionValue(depthAt(depth).scale)
  const y = useTransform<number, number>([dragY, depthY], ([d, dy]) => d * 0.3 + dy)
  // Rotation = celle du geste + celle de l'éventail (nulle sur la carte active).
  const dragRotate = useTransform(x, [-220, 0, 220], reduce ? [0, 0, 0] : [-13, 0, 13])
  const depthRotate = useMotionValue(depthAt(depth).rotate)
  const rotate = useTransform<number, number>([dragRotate, depthRotate], ([a, b]) => a + b)
  // Intention du geste, décidée une fois par drag après 6 px de déplacement.
  const intentRef = useRef<'undecided' | 'swipe' | 'ignore'>('undecided')
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
      animate(dragY, 0, EXIT_SPRING)
      animate(x, direction * EXIT_X, {
        ...EXIT_SPRING,
        onComplete: () => onExit(direction, influencer),
      })
    },
    [reduce, x, dragY, onExit, influencer],
  )

  // Promotion/rétrogradation d'un cran : animée sur les motion values,
  // donc hors du cycle de rendu React.
  useEffect(() => {
    // Les cartes en attente sont posées d'emblée sur la transform de la
    // dernière position visible : leur entrée dans l'éventail n'anime rien.
    if (hidden) {
      if (depth >= VISIBLE) {
        const d = depthAt(VISIBLE - 1)
        depthY.set(d.y)
        scale.set(d.scale)
        depthRotate.set(d.rotate)
      }
      return
    }
    const d = depthAt(depth)
    // Tween court plutôt que le spring de sortie : animer rotate + scale sur
    // deux cartes d'arrière-plan force une re-rastérisation à chaque frame, et
    // un spring dure bien plus longtemps qu'un tween (mesuré : 5 long tasks
    // pendant les swipes contre 0).
    const opts = reduce ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' as const }
    const a1 = animate(depthY, d.y, opts)
    const a2 = animate(scale, d.scale, opts)
    const a3 = animate(depthRotate, d.rotate, opts)
    return () => {
      a1.stop()
      a2.stop()
      a3.stop()
    }
  }, [depth, hidden, depthY, scale, depthRotate, reduce])

  // « Nudge » d'invite au swipe : une seule fois par session, sur la carte de
  // tête, désactivé si l'utilisateur limite les animations.
  useEffect(() => {
    if (!isActive || reduce) return
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return
      sessionStorage.setItem(NUDGE_KEY, '1')
    } catch {
      return
    }
    const t = window.setTimeout(() => {
      animate(x, 14, {
        duration: 0.125,
        ease: 'easeOut',
        onComplete: () => animate(x, 0, { duration: 0.125, ease: 'easeIn' }),
      })
    }, 500)
    return () => window.clearTimeout(t)
    // Volontairement au montage seulement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // La carte active expose sa commande aux boutons ✕ / ♥.
  useEffect(() => {
    if (!isActive) return
    onRegister(commit)
    return () => onRegister(null)
  }, [isActive, commit, onRegister])

  // Hauteur réelle du contenu → le conteneur s'y adapte, plus de rognage.
  useEffect(() => {
    if (!isActive || hidden || !innerRef.current) return
    const el = innerRef.current
    // getBoundingClientRect (fractionnaire) et non offsetHeight (entier
    // tronqué) : le conteneur était 1 px trop court et le badge dépassait.
    const publish = () => onMeasure(Math.ceil(el.getBoundingClientRect().height))
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isActive, hidden, onMeasure])

  const bind = useDrag(
    ({ first, down, movement: [mx, my], velocity: [vx], direction: [dx], tap }) => {
      if (tap) {
        onOpen(influencer)
        return
      }
      if (first) intentRef.current = 'undecided'

      // Décision d'intention : sous 6 px on ne tranche pas encore.
      if (intentRef.current === 'undecided') {
        if (Math.hypot(mx, my) < INTENT_THRESHOLD) return
        const angle = Math.abs((Math.atan2(my, mx) * 180) / Math.PI)
        const fromHorizontal = Math.min(angle, 180 - angle)
        intentRef.current = fromHorizontal < INTENT_ANGLE ? 'swipe' : 'ignore'
      }
      // Geste vertical : la carte ne bouge pas (et touch-action: none empêche
      // le navigateur de scroller à sa place).
      if (intentRef.current !== 'swipe') return

      if (down) {
        x.set(mx)
        dragY.set(my)
        return
      }
      if (Math.abs(mx) > SWIPE_DISTANCE || vx > SWIPE_VELOCITY) {
        commit(mx > 0 || dx > 0 ? 1 : -1)
      } else {
        const back = reduce ? { duration: 0.12 } : EXIT_SPRING
        animate(x, 0, back)
        animate(dragY, 0, back)
      }
    },
    { filterTaps: true, pointer: { touch: true }, eventOptions: { passive: true }, enabled: isActive },
  )

  return (
    <>
      <motion.div
        style={{
          x,
          y,
          rotate,
          scale,
          zIndex: 30 - depth,
          transformOrigin: 'bottom center',
          // Cartes hors éventail : montées et complètes, mais invisibles.
          // visibility (et non display: none) pour qu'elles restent mises en
          // page et prêtes à être promues sans aucun montage.
          visibility: hidden ? 'hidden' : 'visible',
          pointerEvents: hidden ? 'none' : undefined,
          willChange: hidden ? undefined : 'transform',
        }}
        aria-hidden={!isActive}
        className={`absolute inset-x-0 top-0 overflow-hidden rounded-3xl border border-gray-200 bg-white ${
          isActive ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div ref={innerRef}>
          <CardBody influencer={influencer} />
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
          // touch-action: none — sans quoi le navigateur préempte tout geste ayant
          // une composante verticale et scrolle au lieu de laisser swiper.
          // Uniquement sur la carte active : cartes arrière, boutons et reste
          // de la page gardent leur comportement de scroll natif.
          style={{ touchAction: 'none', zIndex: 40 }}
          className="absolute inset-x-0 top-0 cursor-grab active:cursor-grabbing"
          // eslint-disable-next-line react/forbid-dom-props
          ref={(el) => {
            if (el && innerRef.current) el.style.height = `${Math.ceil(innerRef.current.getBoundingClientRect().height)}px`
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

  // La plage MONTÉE est découplée de l'index : une avancée ne monte ni ne
  // démonte rien, elle ne fait que décaler les profondeurs. La plage est
  // resynchronisée après coup, hors du chemin critique.
  const [mount, setMount] = useState({ start: 0, end: Math.min(WINDOW, creators.length) })
  const mounted = useMemo(() => creators.slice(mount.start, mount.end), [creators, mount])
  const current = creators[index]

  useEffect(() => {
    const want = { start: index, end: Math.min(index + WINDOW, creators.length) }
    if (want.start === mount.start && want.end === mount.end) return
    // Filet de sécurité : si l'éventail n'a plus assez de cartes montées
    // (swipes très rapides), on resynchronise sans attendre.
    if (mount.start > index || (index + VISIBLE > mount.end && mount.end < creators.length)) {
      setMount(want)
      return
    }
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMount(want), { timeout: 400 })
      return () => w.cancelIdleCallback && w.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setMount(want), 150)
    return () => window.clearTimeout(id)
  }, [index, creators.length, mount])

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
      // L'avancée monte la carte entrante (contenu complet) : en transition,
      // React peut découper ce travail au lieu de bloquer une frame > 50 ms.
      // Sans risque visuel : la carte sortante reste montée hors écran (x=520)
      // jusqu'au commit, donc aucun trou pendant le rendu.
      startTransition(() => {
        setHistory((h) => [...h, indexRef.current])
        setIndex((i) => i + 1)
      })
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

  // Précharge la photo de la carte n+3 : elle sera montée au prochain swipe.
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Les cartes en visibility:hidden sont mises en page mais pas peintes :
    // leur image n'est décodée qu'au moment où elles deviennent visibles, ce
    // qui tombe en pleine promotion. On décode à l'avance, hors du thread
    // principal, toutes les photos de la fenêtre montée + la suivante.
    let annule = false
    const cibles = creators.slice(index, index + WINDOW + 1)
    for (const c of cibles) {
      const img = new window.Image()
      img.src = c.photo
      if (img.decode) img.decode().catch(() => {})
    }
    return () => {
      annule = true
      void annule
    }
  }, [creators, index])

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
    <div className="flex flex-col items-center">
      {/* Hauteur pilotée par la carte active mesurée au ResizeObserver :
          plus rien n'est rogné, quelle que soit la largeur. */}
      <div
        className="relative w-full max-w-[340px] transition-[height] duration-200"
        style={{ height }}
      >
        {mounted.map((c, i) => (
          <DeckCard
            key={c.handle}
            influencer={c}
            depth={mount.start + i - index}
            isActive={mount.start + i - index === 0}
            reduce={reduce}
            onExit={handleExit}
            onOpen={onOpen}
            onRegister={registerCommit}
            onMeasure={onMeasure}
          />
        ))}
      </div>

      {/* Retour visuel immédiat après un ♥ — en surimpression, il ne pousse
          pas les boutons vers le bas. */}
      <div className="pointer-events-none relative z-50 h-0 w-full max-w-[340px]" aria-live="polite">
        {justAdded && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Ajouté à votre sélection
          </motion.span>
        )}
      </div>

      <div className="mt-[14px] flex items-center gap-4">
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
      <p className="mt-3 text-xs text-gray-400">
        {index + 1} / {creators.length} — glissez ou utilisez les boutons
      </p>
    </div>
  )
}
