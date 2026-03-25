'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight, ExternalLink, Youtube, Eye } from 'lucide-react'
import { ANIMATION } from '@/lib/animation-constants'

interface Short {
  videoId: string
  title: string
  views: number
}

// Top 6 shorts par nombre de vues
const SHORTS: Short[] = [
  { videoId: 'ti4ZpWIwVzw', title: 'OpenClaw : Puissant mais Dangereux !', views: 987 },
  { videoId: '8JOO2lyVPDI', title: 'Surveillance IA dans vos communes', views: 968 },
  { videoId: 'RaiclkQKI7c', title: 'Claude Chrome : Automatisez TOUTES vos tâches', views: 961 },
  { videoId: 'KXiMsTIB8Bo', title: 'Automatisez votre Business avec Claude', views: 960 },
  { videoId: 'tU6_voQncRg', title: 'Automatisez toutes vos tâches : le futur est là', views: 955 },
  { videoId: '5bBTbw-vX00', title: "L'IA et nous : nos cerveaux s'endorment", views: 949 },
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
      transition={{ duration: ANIMATION.duration.normal, delay: index * 0.08 }}
      className="flex-shrink-0 w-[180px] sm:w-[200px] group"
    >
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/40 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-red-500/20">
        {!playing ? (
          <>
            <img
              src={`https://i.ytimg.com/vi/${short.videoId}/oar2.jpg`}
              alt={short.title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              aria-label={`Lire ${short.title}`}
            >
              <div className="w-14 h-14 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </div>
            </button>

            {/* Views badge */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ring-1 ring-white/10">
              <Eye className="w-3 h-3" />
              {formatViews(short.views)}
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3.5">
              <p className="text-white text-xs font-medium leading-snug line-clamp-2 drop-shadow-lg">
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
    <section className="py-16 sm:py-24 bg-gray-950 relative overflow-hidden">
      {/* Cinema ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          {...ANIMATION.entry.fadeInUp}
          transition={{ duration: ANIMATION.duration.normal }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 text-red-400 rounded-full text-sm font-semibold mb-4 ring-1 ring-red-500/20">
              <Youtube className="w-4 h-4" />
              Les + vus
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Nos Shorts les plus populaires
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-lg">
              Veille IA, tips marketing et coulisses agence en moins de 60 secondes.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@digiqo_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-500 transition-colors duration-200 self-start sm:self-auto shadow-lg shadow-red-600/20"
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
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Défiler vers la droite"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-0 sm:px-0 snap-x snap-mandatory"
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
