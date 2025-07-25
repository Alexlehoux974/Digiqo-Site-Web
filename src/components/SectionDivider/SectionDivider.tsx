import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'wave' | 'gradient' | 'dots'
  className?: string
}

export function SectionDivider({ variant = 'wave', className = '' }: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className={`relative h-32 overflow-hidden ${className}`}>
        <svg 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ d: "M0,160L60,144C120,128,240,96,360,112C480,128,600,192,720,208C840,224,960,192,1080,160C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" }}
            animate={{ 
              d: [
                "M0,160L60,144C120,128,240,96,360,112C480,128,600,192,720,208C840,224,960,192,1080,160C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                "M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,240C840,256,960,224,1080,192C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            fill="url(#waveGradient)"
            fillOpacity="0.1"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DA6530" />
              <stop offset="50%" stopColor="#199CB7" />
              <stop offset="100%" stopColor="#127387" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <motion.div 
        className={`h-24 ${className}`}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(218, 101, 48, 0.05) 50%, transparent 100%)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
    )
  }

  // Variant 'dots'
  return (
    <div className={`relative h-20 flex items-center justify-center ${className}`}>
      <div className="flex gap-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-digiqo-orange to-digiqo-blue-light"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    </div>
  )
}