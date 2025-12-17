import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, X } from 'lucide-react'

interface DigicademyYouTubePlayerProps {
  videoId?: string
  googleDriveId?: string
  placeholder?: string
  className?: string
}

export default function DigicademyYouTubePlayer({
  videoId,
  googleDriveId,
  placeholder = 'Vidéo de formation',
  className = ''
}: DigicademyYouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(100)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Charger l'API YouTube (seulement si c'est une vidéo YouTube)
  useEffect(() => {
    if (!isPlaying || !videoId || googleDriveId) return

    // Charger le script YouTube IFrame API
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Initialiser le player quand l'API est prête
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player-' + videoId, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          fs: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : ''
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
            setDuration(event.target.getDuration())
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPaused(false)
              startTimeUpdate()
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPaused(true)
            }
          }
        }
      })
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
    }
  }, [isPlaying, videoId])

  // Mettre à jour le temps de lecture
  const startTimeUpdate = () => {
    const updateTime = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime())
        setDuration(playerRef.current.getDuration())
      }
    }, 100)

    return () => clearInterval(updateTime)
  }

  // Contrôles du lecteur
  const togglePlayPause = () => {
    if (!playerRef.current) return

    if (isPaused) {
      playerRef.current.playVideo()
    } else {
      playerRef.current.pauseVideo()
    }
  }

  const toggleMute = () => {
    if (!playerRef.current) return

    if (isMuted) {
      playerRef.current.unMute()
      playerRef.current.setVolume(volume)
    } else {
      playerRef.current.mute()
    }
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume)
      if (newVolume === 0) {
        setIsMuted(true)
      } else if (isMuted) {
        setIsMuted(false)
        playerRef.current.unMute()
      }
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true)
    }
  }

  const skipBack = () => {
    if (playerRef.current) {
      const newTime = Math.max(0, currentTime - 10)
      playerRef.current.seekTo(newTime, true)
      setCurrentTime(newTime)
    }
  }

  const skipForward = () => {
    if (playerRef.current) {
      const newTime = Math.min(duration, currentTime + 10)
      playerRef.current.seekTo(newTime, true)
      setCurrentTime(newTime)
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Gestion de l'affichage des contrôles
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        setShowControls(false)
      }
    }, 3000)
  }

  if (!videoId && !googleDriveId) {
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

  // Si c'est une vidéo Google Drive, afficher directement l'iframe
  if (googleDriveId) {
    return (
      <div className={`relative rounded-xl overflow-hidden shadow-lg bg-black ${className}`}>
        <div className="relative aspect-video">
          <iframe
            src={`https://drive.google.com/file/d/${googleDriveId}/preview`}
            className="absolute inset-0 w-full h-full"
            style={{
              border: 'none',
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  if (!isPlaying) {
    return (
      <div className={`relative rounded-xl overflow-hidden shadow-lg group cursor-pointer ${className}`}>
        <div className="relative aspect-video">
          <img
            src="/screen/miniature etape1.png"
            alt={placeholder}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Lancer la vidéo"
          >
            <div className="w-20 h-20 rounded-full bg-[#DA6530] flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </button>
        </div>
      </div>
    )
  }

  // Lecteur personnalisé avec contrôles custom pour YouTube
  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden shadow-lg bg-black ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isPaused && setShowControls(false)}
    >
      <div className="relative aspect-video">
        {/* Container YouTube masqué */}
        <div className="absolute inset-0">
          <div id={`youtube-player-${videoId}`} className="w-full h-full" />
        </div>

        {/* Overlay pour intercepter les clics */}
        <div
          className="absolute inset-0 z-10"
          onClick={togglePlayPause}
          style={{ cursor: showControls ? 'pointer' : 'none' }}
        />

        {/* Contrôles personnalisés */}
        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Gradient pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Bouton fermer */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsPlaying(false)
            }}
            className="absolute top-4 right-4 pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Bouton play/pause central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlayPause()
              }}
              className={`pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all transform ${isPaused ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
            >
              {isPaused ? (
                <Play className="w-12 h-12 ml-1" fill="white" />
              ) : (
                <Pause className="w-12 h-12" fill="white" />
              )}
            </button>
          </div>

          {/* Barre de contrôles en bas */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
            {/* Barre de progression */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#DA6530] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#DA6530] [&::-moz-range-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 hover:[&::-moz-range-thumb]:scale-125 transition-all"
                style={{
                  background: `linear-gradient(to right, #DA6530 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`
                }}
              />
            </div>

            {/* Contrôles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlayPause}
                  className="text-white hover:text-[#DA6530] transition-colors"
                >
                  {isPaused ? (
                    <Play className="w-6 h-6" fill="currentColor" />
                  ) : (
                    <Pause className="w-6 h-6" fill="currentColor" />
                  )}
                </button>

                {/* Skip back */}
                <button
                  onClick={skipBack}
                  className="text-white hover:text-[#DA6530] transition-colors"
                >
                  <SkipBack className="w-5 h-5" fill="currentColor" />
                </button>

                {/* Skip forward */}
                <button
                  onClick={skipForward}
                  className="text-white hover:text-[#DA6530] transition-colors"
                >
                  <SkipForward className="w-5 h-5" fill="currentColor" />
                </button>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-[#DA6530] transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>

                {/* Temps */}
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Plein écran */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#DA6530] transition-colors"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}