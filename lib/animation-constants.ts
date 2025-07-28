/**
 * Animation Constants for DIGIQO Service Pages
 * Provides consistent animation values across all service pages
 */

export const ANIMATION = {
  // Transition durations
  duration: {
    instant: 0.1,
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
    verySlow: 1.5,
  },
  
  // Easing functions
  ease: {
    default: "easeInOut",
    spring: { type: "spring", stiffness: 260, damping: 20 },
    springBounce: { type: "spring", bounce: 0.5 },
    linear: "linear",
  },
  
  // Standard delays for sequential animations
  delay: {
    stagger: 0.1,
    staggerFast: 0.05,
    staggerSlow: 0.2,
    section: 0.3,
  },
  
  // Entry animations
  entry: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    fadeInUpLarge: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
    springIn: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
    },
  },
  
  // Hover animations
  hover: {
    scale: { scale: 1.05 },
    scaleLarge: { scale: 1.1 },
    lift: { y: -5 },
    liftLarge: { y: -10 },
  },
  
  // Tap animations
  tap: {
    scale: { scale: 0.95 },
    scaleSmall: { scale: 0.98 },
  },
  
  // Continuous animations
  loop: {
    float: {
      y: [-10, 10, -10],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    rotate: {
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: "linear" },
    },
    glow: {
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  },
  
  // Gradient orb animations
  orb: {
    primary: {
      scale: [1, 1.2, 1],
      x: [0, 100, 0],
      y: [0, -50, 0],
      opacity: [0.3, 0.5, 0.3],
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
    },
    secondary: {
      scale: [1, 1.3, 1],
      x: [0, -100, 0],
      y: [0, 50, 0],
      opacity: [0.3, 0.5, 0.3],
      transition: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 },
    },
    center: {
      scale: [0.8, 1.1, 0.8],
      rotate: [0, 180, 360],
      transition: { duration: 30, repeat: Infinity, ease: "easeInOut" },
    },
  },
  
  // Particle system settings
  particles: {
    count: 30,
    duration: { min: 10, max: 20 },
    delay: { min: 0, max: 5 },
  },
} as const

// Helper functions
export const getStaggerDelay = (index: number, baseDelay = ANIMATION.delay.stagger) => 
  index * baseDelay

export const getRandomDuration = (min: number, max: number) => 
  Math.random() * (max - min) + min

export const getRandomDelay = (max: number) => 
  Math.random() * max