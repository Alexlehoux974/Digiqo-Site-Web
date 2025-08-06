// Utilitaires pour optimiser les animations Framer Motion

// Détection mobile/tablette pour réduire les animations
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export const isTablet = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Configuration d'animation optimisée pour mobile
export const getAnimationConfig = () => {
  const reducedMotion = shouldReduceMotion()
  const mobile = isMobile()
  
  if (reducedMotion) {
    return {
      animate: false,
      transition: { duration: 0 }
    }
  }
  
  if (mobile) {
    return {
      animate: true,
      transition: { 
        duration: 0.3, // Animations plus courtes sur mobile
        ease: "easeOut"
      }
    }
  }
  
  return {
    animate: true,
    transition: { 
      duration: 0.6,
      ease: "easeInOut"
    }
  }
}

// Variants d'animation optimisés
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (custom?: any) => {
    const config = getAnimationConfig()
    return {
      opacity: 1,
      transition: {
        ...config.transition,
        delay: custom?.delay || 0
      }
    }
  }
}

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom?: any) => {
    const config = getAnimationConfig()
    const mobile = isMobile()
    
    return {
      opacity: 1,
      y: 0,
      transition: {
        ...config.transition,
        delay: custom?.delay || 0,
        y: { 
          duration: mobile ? 0.2 : 0.4,
          ease: "easeOut"
        }
      }
    }
  }
}

// Hook pour désactiver les animations complexes sur mobile
export const useOptimizedAnimation = () => {
  const config = getAnimationConfig()
  const mobile = isMobile()
  const reducedMotion = shouldReduceMotion()
  
  return {
    isEnabled: !reducedMotion,
    isMobile: mobile,
    config,
    // Désactiver certaines animations lourdes sur mobile
    enableParallax: !mobile && !reducedMotion,
    enableComplexAnimations: !mobile && !reducedMotion,
    enableHoverEffects: !mobile
  }
}