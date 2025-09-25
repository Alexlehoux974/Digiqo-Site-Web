import React, { useState } from 'react'
import { Play, Clock } from 'lucide-react'

interface DigicademyYouTubePlayerProps {
  videoId?: string
  placeholder?: string
  className?: string
}

export default function DigicademyYouTubePlayer({
  videoId,
  placeholder = 'Vidéo de formation',
  className = ''
}: DigicademyYouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!videoId) {
    // Si pas de videoId, afficher un placeholder élégant
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 flex flex-col items-center justify-center min-h-[360px] ${className}`}>
        <div className="w-20 h-20 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4">
          <Play className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-500 text-center font-medium">{placeholder}</p>
        <p className="text-sm text-gray-400 mt-2">Vidéo bientôt disponible</p>
      </div>
    )
  }

  // Si on n'a pas encore cliqué sur play, afficher la miniature personnalisée
  if (!isPlaying) {
    return (
      <div className={`relative rounded-xl overflow-hidden shadow-lg group cursor-pointer ${className}`}>
        <div className="relative aspect-video">
          {/* Miniature personnalisée */}
          <img
            src="/screen/miniature etape1.png"
            alt={placeholder}
            className="w-full h-full object-cover"
          />

          {/* Overlay sombre au survol */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

          {/* Bouton Play */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Lancer la vidéo"
          >
            <div className="w-20 h-20 rounded-full bg-[#DA6530] flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </button>

          {/* Badge durée (si disponible) */}
          {placeholder && placeholder.includes('min') && (
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">
                {placeholder.match(/\d+\s*min/)?.[0] || ''}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Lecteur YouTube avec iframe masqué
  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg bg-black ${className}`}>
      <div className="relative aspect-video">
        {/* Container avec overflow caché pour masquer les éléments YouTube */}
        <div className="absolute inset-0 overflow-hidden">
          {/* iframe YouTube avec paramètres pour masquer au maximum les contrôles */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=0&fs=0&playsinline=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            className="absolute top-[-60px] left-[-2px] w-[calc(100%+4px)] h-[calc(100%+120px)] pointer-events-auto"
            style={{
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Masques pour cacher les éléments YouTube indésirables */}
          <div className="absolute top-0 left-0 right-0 h-[60px] bg-black pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-black pointer-events-none z-10" />
        </div>

        {/* Bouton pour fermer et revenir à la miniature */}
        <button
          onClick={() => setIsPlaying(false)}
          className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black/90 text-white px-3 py-1 rounded-lg text-sm transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}