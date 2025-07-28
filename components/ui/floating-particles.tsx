import { motion } from 'framer-motion'
import { ANIMATION, getRandomDuration } from '@/lib/animation-constants'

interface FloatingParticleProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export const FloatingParticle = ({ 
  children, 
  className = "absolute w-1 h-1 bg-white/20 rounded-full",
  delay = 0,
  duration
}: FloatingParticleProps) => {
  const particleDuration = duration || getRandomDuration(ANIMATION.particles.duration.min, ANIMATION.particles.duration.max)
  
  return (
    <motion.div
      className={className}
      initial={{ 
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
        y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1080,
      }}
      animate={{
        y: -100,
      }}
      transition={{
        duration: particleDuration,
        repeat: Infinity,
        delay: delay,
        ease: ANIMATION.ease.linear,
      }}
    >
      {children}
    </motion.div>
  )
}

interface ParticleSystemProps {
  count?: number
  className?: string
  particleClassName?: string
  children?: (index: number) => React.ReactNode
}

export const ParticleSystem = ({ 
  count = ANIMATION.particles.count,
  className = "absolute inset-0 pointer-events-none overflow-hidden",
  particleClassName,
  children
}: ParticleSystemProps) => {
  return (
    <div className={className}>
      {[...Array(count)].map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.5}
          className={particleClassName}
        >
          {children ? children(i) : null}
        </FloatingParticle>
      ))}
    </div>
  )
}

// Specialized particle types
export const CodeParticleSystem = ({ count = 30 }: { count?: number }) => {
  const symbols = ['<>', '{}', '[]', '()', '/>', ':::', '===', '!==', '=>', '...']
  
  return (
    <ParticleSystem 
      count={count}
      particleClassName="absolute text-digiqo-secondary/20 font-mono text-sm pointer-events-none"
    >
      {() => symbols[Math.floor(Math.random() * symbols.length)]}
    </ParticleSystem>
  )
}

// Removed - use IconParticleSystem with Lucide icons instead

export const SEOParticleSystem = ({ count = 20 }: { count?: number }) => {
  const keywords = ['<meta/>', 'H1', 'alt=""', 'SEO', '200ms', 'index', 'rank', 'SERP']
  
  return (
    <ParticleSystem 
      count={count}
      particleClassName="absolute text-digiqo-secondary/30 font-mono text-xs pointer-events-none"
    >
      {() => keywords[Math.floor(Math.random() * keywords.length)]}
    </ParticleSystem>
  )
}

// Icon-based particle system
interface IconParticleSystemProps {
  count?: number
  icons: React.ComponentType<{ className?: string }>[]
  particleClassName?: string
}

export const IconParticleSystem = ({ 
  count = 20, 
  icons,
  particleClassName = "absolute pointer-events-none"
}: IconParticleSystemProps) => {
  return (
    <ParticleSystem 
      count={count}
      particleClassName={particleClassName}
    >
      {() => {
        const Icon = icons[Math.floor(Math.random() * icons.length)]
        return <Icon className="w-full h-full" />
      }}
    </ParticleSystem>
  )
}