'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight, ExternalLink, Youtube } from 'lucide-react'
import { ANIMATION } from '@/lib/animation-constants'

interface Short {
  videoId: string
  title: string
  views: number
}

const SHORTS: Short[] = [
  { videoId: 'ti4ZpWIwVzw', title: 'OpenClaw : Puissant mais Dangereux !', views: 987 },
  { videoId: '8JOO2lyVPDI', title: 'Surveillance IA dans vos communes', views: 968 },
  { videoId: 'RaiclkQKI7c', title: 'Claude Chrome : Automatisez TOUTES vos tâches', views: 961 },
  { videoId: 'KXiMsTIB8Bo', title: 'Automatisez votre Business avec Claude', views: 960 },
  { videoId: 'tU6_voQncRg', title: 'Automatisez toutes vos tâches : le futur est là', views: 955 },
  { videoId: '5bBTbw-vX00', title: "L'IA et nous : nos cerveaux s'endorment", views: 949 },
  { videoId: 'ldIEGJ3Aw7k', title: 'Apprends à Claude, il te fait gagner du temps', views: 868 },
  { videoId: 'P39G04UN0os', title: 'ChatGPT-5 : Analyse des nouveautés IA', views: 860 },
]

const formatViews = (views: number) => {
  if (views >= 1000) return `${(views / 1000).toFixed(1).replace('.0', '')}K`
  return `${views}`
}

const ShortCard = ({ short, index }: { short: Short; index: number }) => {
  const [playing, setPlaying] = useState(false)

  return (
    <motion.div
      {...ANIMATION.entry.fadeInUp}
      transition={{ duration: ANIMATION.duration.normal, delay: index * 0.05 }}
      className="flex-shrink-0 w-[200px] sm:w-[220px] group"
    >
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {!playing ? (
          <>
            <img
              src={`https://i.ytimg.com/vi/${short.videoId}/oar2.jpg`}
              alt={short.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              aria-label={`Lire ${short.title}`}
            >
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </div>
            </button>

            {/* Views badge */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Play className="w-3 h-3" fill="white" />
              {formatViews(short.views)} vues
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white text-xs font-medium leading-snug line-clamp-2">
                {short.title}
              </p>
            </div>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&loop=1&playlist=${short.videoId}&rel=0`}
            title={short.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </motion.div>
  )
}

export const YoutubeShortsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', checkScroll, { passive: true })
    return () => el?.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = direction === 'left' ? -460 : 460
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          {...ANIMATION.entry.fadeInUp}
          transition={{ duration: ANIMATION.duration.normal }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-semibold mb-4">
              <Youtube className="w-4 h-4" />
              YouTube Shorts
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Nos derniers Shorts
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base max-w-lg">
              Veille IA, tips marketing et coulisses agence en moins de 60 secondes.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@digiqo_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors duration-200 self-start sm:self-auto"
          >
            <Youtube className="w-4 h-4" />
            S&apos;abonner
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Défiler vers la droite"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-0 sm:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SHORTS.map((short, index) => (
              <div key={short.videoId} className="snap-start">
                <ShortCard short={short} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default YoutubeShortsSection
