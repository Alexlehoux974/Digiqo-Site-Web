import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PartnerImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
}

export function PartnerImage({
  src,
  alt,
  width = 1024,
  height = 1024,
  className,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
  quality = 85
}: PartnerImageProps) {
  const [isInView, setIsInView] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        },
        {
          threshold: 0.01,
          rootMargin: '50px'
        }
      )

      if (imageRef.current) {
        observer.observe(imageRef.current)
      }

      return () => observer.disconnect()
    } else {
      setIsInView(true)
    }
  }, [priority])

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative overflow-hidden bg-gray-100 rounded-lg transition-all duration-300',
        hasLoaded ? 'bg-transparent' : 'animate-pulse',
        className
      )}
    >
      {(isInView || priority) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={quality}
          className={cn(
            'transition-opacity duration-300',
            hasLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setHasLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
      )}
    </div>
  )
}