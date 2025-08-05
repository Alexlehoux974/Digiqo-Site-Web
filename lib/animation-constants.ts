/**
 * Animation Constants for DIGIQO Service Pages
 * Provides consistent animation values across all service pages
 * Optimized for mobile performance
 */

import { isMobile, shouldReduceMotion } from './animation-utils'

// Durées adaptatives selon le device
const getDuration = (desktop: number, mobile: number) => {
  if (shouldReduceMotion()) return 0
  return isMobile() ? mobile : desktop
}

export const ANIMATION = {
  // Transition durations optimized for mobile
  duration: {
    instant: 0.1,
    fast: getDuration(0.3, 0.2),
    normal: getDuration(0.6, 0.3),
    slow: getDuration(0.8, 0.4),
    verySlow: getDuration(1.5, 0.6),
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
  
  // Hover animations (désactivées sur mobile)
  hover: {
    scale: isMobile() ? {} : { scale: 1.05 },
    scaleLarge: isMobile() ? {} : { scale: 1.1 },
    lift: isMobile() ? {} : { y: -5 },
    liftLarge: isMobile() ? {} : { y: -10 },
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
  
  // Gradient orb animations (simplifiées sur mobile)
  orb: isMobile() ? {
    // Animations statiques sur mobile pour économiser les ressources
    primary: { opacity: 0.3 },
    secondary: { opacity: 0.3 },
    center: { opacity: 0.3 },
  } : {
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
  
  // Particle system settings (réduit sur mobile)
  particles: {
    count: isMobile() ? 10 : 30,
    duration: { min: isMobile() ? 5 : 10, max: isMobile() ? 10 : 20 },
    delay: { min: 0, max: isMobile() ? 2 : 5 },
  },
} as const

// Helper functions
export const getStaggerDelay = (index: number, baseDelay = ANIMATION.delay.stagger) => 
  index * baseDelay

export const getRandomDuration = (min: number, max: number) => 
  Math.random() * (max - min) + min

export const getRandomDelay = (max: number) => 
  Math.random() * max