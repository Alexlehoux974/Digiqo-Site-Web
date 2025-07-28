import { motion } from 'framer-motion'
import { ANIMATION } from '@/lib/animation-constants'

interface AnimatedGradientOrbProps {
  gradient: string
  size?: string
  blur?: string
  opacity?: number
  animation?: 'primary' | 'secondary' | 'center' | 'custom'
  customAnimation?: any
  className?: string
}

export const AnimatedGradientOrb = ({
  gradient,
  size = "w-[600px] h-[600px]",
  blur = "blur-3xl",
  opacity = 0.3,
  animation = 'primary',
  customAnimation,
  className = ""
}: AnimatedGradientOrbProps) => {
  const animationConfig = customAnimation || (animation !== 'custom' ? ANIMATION.orb[animation] : undefined)
  
  return (
    <motion.div
      className={`absolute ${size} bg-gradient-to-br ${gradient} rounded-full ${blur} ${className}`}
      initial={{ opacity }}
      animate={animationConfig}
    />
  )
}

interface GradientOrbSystemProps {
  children?: React.ReactNode
}

export const GradientOrbSystem = ({ children }: GradientOrbSystemProps) => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 opacity-30">
        {/* Primary orb */}
        <AnimatedGradientOrb
          gradient="from-digiqo-accent/30 to-transparent"
          className="top-1/4 -left-1/4"
          animation="primary"
        />
        
        {/* Secondary orb */}
        <AnimatedGradientOrb
          gradient="from-digiqo-secondary/30 to-transparent"
          className="bottom-1/4 -right-1/4"
          animation="secondary"
        />
        
        {/* Center orb */}
        <AnimatedGradientOrb
          gradient="from-digiqo-primary/20 to-transparent"
          size="w-[800px] h-[800px]"
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animation="center"
          opacity={0.2}
        />
        
        {children}
      </div>
    </div>
  )
}

// Specialized gradient configurations
export const HeroGradientOrbs = () => (
  <GradientOrbSystem>
    <AnimatedGradientOrb
      gradient="from-white/10 to-transparent"
      size="w-[400px] h-[400px]"
      className="top-0 right-0"
      blur="blur-2xl"
      customAnimation={{
        scale: [1, 1.5, 1],
        opacity: [0.1, 0.3, 0.1],
        transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
      }}
    />
  </GradientOrbSystem>
)

export const SectionGradientOrbs = () => (
  <div className="absolute inset-0 pointer-events-none">
    <AnimatedGradientOrb
      gradient="from-digiqo-secondary/10 to-transparent"
      size="w-96 h-96"
      className="top-0 right-0"
      blur="blur-3xl"
      opacity={1}
      customAnimation={{
        scale: [1, 1.1, 1],
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
      }}
    />
    <AnimatedGradientOrb
      gradient="from-digiqo-accent/10 to-transparent"
      size="w-96 h-96"
      className="bottom-0 left-0"
      blur="blur-3xl"
      opacity={1}
      customAnimation={{
        scale: [1, 1.2, 1],
        transition: { duration: 12, repeat: Infinity, ease: "easeInOut" }
      }}
    />
  </div>
)