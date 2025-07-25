import { useEffect, useRef, useState, ReactNode, TouchEvent, WheelEvent } from 'react'
import { motion } from 'framer-motion'

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image'
  mediaSrc: string
  posterSrc?: string
  bgImageSrc?: string
  title?: string
  date?: string
  scrollToExpand?: string
  textBlend?: boolean
  children?: ReactNode
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc: _bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend: _textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [showContent, setShowContent] = useState<boolean>(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false)
  const [touchStartY, setTouchStartY] = useState<number>(0)
  const [isMobileState, setIsMobileState] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [_expansionCompleteTime, setExpansionCompleteTime] = useState<number>(0)
  const [contentReadyDelay, setContentReadyDelay] = useState<boolean>(false)

  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setScrollProgress(0)
    setShowContent(false)
    setMediaFullyExpanded(false)
    setContentReadyDelay(false)
    setExpansionCompleteTime(0)
  }, [mediaType])

  // Delay initialization to prevent scroll blocking on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInitialized) return
      
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      
      // Vérifier si on a scrollé assez pour voir la vidéo miniature + le texte
      // On déclenche quand le haut de la section est à 20% du haut de l'écran
      const sectionFullyVisible = rect.top < window.innerHeight * 0.2
      
      // État 1: Vidéo miniature, scroll libre
      if (!sectionFullyVisible && scrollProgress === 0) {
        return // Laisser le scroll libre
      }
      
      // État 2: Déclencher l'expansion une fois la section entièrement visible
      if (sectionFullyVisible && !mediaFullyExpanded && scrollProgress < 1) {
        e.preventDefault() // TOUJOURS bloquer le scroll pendant l'expansion
        
        if (e.deltaY > 0) { // Scroll vers le bas
          const scrollDelta = e.deltaY * 0.0015
          const newProgress = Math.min(scrollProgress + scrollDelta, 1)
          setScrollProgress(newProgress)
          
          if (newProgress >= 1) {
            setMediaFullyExpanded(true)
            setExpansionCompleteTime(Date.now())
            // Délai avant d'afficher le contenu pour s'assurer que l'animation est terminée
            setTimeout(() => {
              setContentReadyDelay(true)
              setShowContent(true)
            }, 500)
          }
        } else if (e.deltaY < 0 && scrollProgress > 0) { // Scroll vers le haut pendant l'expansion
          const scrollDelta = Math.abs(e.deltaY) * 0.0015
          const newProgress = Math.max(scrollProgress - scrollDelta, 0)
          setScrollProgress(newProgress)
        }
      }
      
      // État 3: Vidéo plein écran - bloquer le scroll vers le bas tant que le délai n'est pas écoulé
      if (mediaFullyExpanded && scrollProgress >= 1 && !contentReadyDelay) {
        if (e.deltaY > 0) {
          e.preventDefault() // Bloquer tout scroll vers le bas jusqu'à ce que le délai soit écoulé
        }
      }
      
      // État 4: Après le délai, permettre le scroll naturel
      if (mediaFullyExpanded && contentReadyDelay) {
        // Laisser le scroll naturel se faire
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInitialized || !touchStartY) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      
      // Vérifier si on a scrollé assez pour voir la vidéo miniature + le texte
      // On déclenche quand le haut de la section est à 20% du haut de l'écran
      const sectionFullyVisible = rect.top < window.innerHeight * 0.2
      
      // État 1: Vidéo miniature, scroll libre
      if (!sectionFullyVisible && scrollProgress === 0) {
        return // Laisser le scroll libre
      }
      
      // État 2: Déclencher l'expansion une fois la section entièrement visible
      if (sectionFullyVisible && !mediaFullyExpanded && scrollProgress < 1) {
        e.preventDefault() // TOUJOURS bloquer le scroll pendant l'expansion
        
        if (deltaY > 0) { // Scroll vers le bas
          const scrollDelta = deltaY * 0.004
          const newProgress = Math.min(scrollProgress + scrollDelta, 1)
          setScrollProgress(newProgress)
          
          if (newProgress >= 1) {
            setMediaFullyExpanded(true)
            setExpansionCompleteTime(Date.now())
            // Délai avant d'afficher le contenu pour s'assurer que l'animation est terminée
            setTimeout(() => {
              setContentReadyDelay(true)
              setShowContent(true)
            }, 500)
          }
        } else if (deltaY < 0 && scrollProgress > 0) { // Scroll vers le haut pendant l'expansion
          const scrollDelta = Math.abs(deltaY) * 0.004
          const newProgress = Math.max(scrollProgress - scrollDelta, 0)
          setScrollProgress(newProgress)
        }
      }
      
      // État 3: Vidéo plein écran - bloquer le scroll vers le bas tant que le délai n'est pas écoulé
      if (mediaFullyExpanded && scrollProgress >= 1 && !contentReadyDelay) {
        if (deltaY > 0) {
          e.preventDefault() // Bloquer tout scroll vers le bas jusqu'à ce que le délai soit écoulé
        }
      }
      
      // État 4: Après le délai, permettre le scroll naturel
      if (mediaFullyExpanded && contentReadyDelay) {
        // Laisser le scroll naturel se faire
      }
      
      setTouchStartY(touchY)
    }

    const handleTouchEnd = (): void => {
      setTouchStartY(0)
    }

    const handleScroll = (): void => {
      // Remove scroll blocking to allow free scrolling
    }

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    })
    window.addEventListener('scroll', handleScroll as EventListener)
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    )
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    )
    window.addEventListener('touchend', handleTouchEnd as EventListener)

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      )
      window.removeEventListener('scroll', handleScroll as EventListener)
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      )
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      )
      window.removeEventListener('touchend', handleTouchEnd as EventListener)
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isInitialized, contentReadyDelay])

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Start small and expand to full width
  const mediaWidth = 280 + scrollProgress * (window.innerWidth - 280)
  const mediaHeight = 160 + scrollProgress * (window.innerHeight - 160)
  const textTranslateX = scrollProgress * (isMobileState ? 300 : 600)
  const textTranslateY = scrollProgress * (isMobileState ? 100 : 200)

  const firstWord = title ? title.split(' ')[0] : ''
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <div
      ref={sectionRef}
      className='relative transition-colors duration-700 ease-in-out'
    >
      <section className='relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          {/* Gradient background avec clipPath pour limiter sa portée */}
          <motion.div
            className='absolute inset-0 -z-10'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 - scrollProgress * 0.8 }}
            transition={{ duration: 0.1 }}
            style={{
              clipPath: 'inset(0 0 0 0)'
            }}
          >
            <div className='absolute inset-0 bg-[#8B1431]' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: scrollProgress > 0.9 ? '95vw' : `${mediaWidth}px`,
                  maxHeight: scrollProgress > 0.9 ? '85vh' : `${mediaHeight}px`,
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.5)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be') ? (
                    <div className='relative w-full h-full'>
                      <iframe
                        title='Vidéo Digiqo'
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=0&loop=1&controls=1&showinfo=0&rel=0&modestbranding=1'
                            : mediaSrc.includes('youtu.be')
                            ? mediaSrc.replace('youtu.be/', 'youtube.com/embed/') +
                              '?autoplay=1&mute=0&loop=1&controls=1&showinfo=0&rel=0&modestbranding=1&playlist=' +
                              mediaSrc.split('/').pop()
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=0&loop=1&controls=1&showinfo=0&rel=0&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                      />

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

              </div>

              {/* Titre superposé à la vidéo */}
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none'>
                <div className='flex items-center justify-center gap-8 whitespace-nowrap'>
                  <motion.h2
                    className='text-5xl md:text-7xl lg:text-9xl font-display font-black text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                    style={{ 
                      transform: `translateX(${-textTranslateX}px)`,
                      opacity: 1 - scrollProgress
                    }}
                  >
                    {firstWord}
                  </motion.h2>
                  <motion.h2
                    className='text-5xl md:text-7xl lg:text-9xl font-display font-black text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                    style={{ 
                      transform: `translateX(${textTranslateX}px)`,
                      opacity: 1 - scrollProgress
                    }}
                  >
                    {restOfTitle}
                  </motion.h2>
                </div>
                
                {/* Sous-titre */}
                {date && (
                  <motion.p
                    className='text-xl md:text-2xl text-white font-display text-center mt-6'
                    style={{ 
                      transform: `translateY(${-textTranslateY}px)`,
                      opacity: 1 - scrollProgress
                    }}
                  >
                    {date}
                  </motion.p>
                )}
              </div>

              {/* Instruction de scroll */}
              {scrollToExpand && (
                <motion.div
                  className='absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20'
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 - scrollProgress }}
                >
                  <p className='text-white/80 font-medium text-center animate-bounce'>
                    {scrollToExpand}
                  </p>
                </motion.div>
              )}
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ScrollExpandMedia