import { useEffect, useRef, useState } from 'react'

interface YouTubeFacadeProps {
  videoId: string
  title: string
  className?: string
}

export function YouTubeFacade({ videoId, title, className }: YouTubeFacadeProps) {
  const [activated, setActivated] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (activated && iframeRef.current) {
      iframeRef.current.focus()
    }
  }, [activated])

  if (activated) {
    return (
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={`w-full h-full ${className || ''}`}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Lecture vidéo ${title}`}
      className={`relative block w-full h-full cursor-pointer p-0 border-0 bg-black ${className || ''}`}
    >
      <picture>
        <source
          srcSet={`https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`}
          type="image/webp"
        />
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          loading="lazy"
          decoding="async"
          width="1280"
          height="720"
          className="w-full h-full object-cover"
        />
      </picture>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <svg width="68" height="48" viewBox="0 0 68 48" className="drop-shadow-lg">
          <path
            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
            fill="#212121"
            fillOpacity="0.85"
          />
          <path d="M 45,24 27,14 27,34" fill="#fff" />
        </svg>
      </span>
    </button>
  )
}
