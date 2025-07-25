import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  FaGoogle, 
  FaFacebookF, 
  FaWhatsapp, 
  FaYoutube, 
  FaLinkedinIn, 
  FaInstagram, 
  FaPinterestP,
  FaTiktok,
  FaSnapchatGhost
} from 'react-icons/fa'
import { SiGoogleads, SiMeta } from 'react-icons/si'

interface Icon {
  id: string
  component: React.ReactNode
  color: string
  size: number
}

const icons: Icon[] = [
  { id: 'google', component: <FaGoogle />, color: '#4285F4', size: 32 },
  { id: 'googleads', component: <SiGoogleads />, color: '#4285F4', size: 28 },
  { id: 'facebook', component: <FaFacebookF />, color: '#1877F2', size: 30 },
  { id: 'meta', component: <SiMeta />, color: '#0081FB', size: 34 },
  { id: 'whatsapp', component: <FaWhatsapp />, color: '#25D366', size: 32 },
  { id: 'youtube', component: <FaYoutube />, color: '#FF0000', size: 36 },
  { id: 'linkedin', component: <FaLinkedinIn />, color: '#0A66C2', size: 28 },
  { id: 'instagram', component: <FaInstagram />, color: '#E4405F', size: 32 },
  { id: 'pinterest', component: <FaPinterestP />, color: '#BD081C', size: 28 },
  { id: 'tiktok', component: <FaTiktok />, color: '#000000', size: 30 },
  { id: 'snapchat', component: <FaSnapchatGhost />, color: '#FFFC00', size: 30 }
]

interface IconCloudProps {
  className?: string
}

export const IconCloud = ({ className = '' }: IconCloudProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const radius = container.offsetWidth * 0.35
    let rotation = 0

    const updatePositions = () => {
      icons.forEach((_, index) => {
        const icon = iconsRef.current[index]
        if (!icon) return

        const angle = (index / icons.length) * Math.PI * 2
        const x = Math.cos(angle + rotation) * radius
        const y = Math.sin(angle + rotation * 0.5) * radius * 0.5
        const z = Math.sin(angle + rotation) * radius * 0.5
        
        const scale = (z + radius) / (radius * 2)
        const opacity = 0.4 + scale * 0.6
        
        icon.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${0.8 + scale * 0.4})`
        icon.style.opacity = opacity.toString()
        icon.style.zIndex = Math.floor(scale * 100).toString()
      })

      rotation += 0.005
      animationRef.current = requestAnimationFrame(updatePositions)
    }

    updatePositions()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {icons.map((icon, index) => (
          <motion.div
            key={icon.id}
            ref={(el) => {
              if (el) iconsRef.current[index] = el
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.5,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.2 }}
          >
            <div 
              className="flex items-center justify-center p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ 
                fontSize: `${icon.size}px`,
                color: icon.color,
              }}
            >
              {icon.component}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay pour l'effet de profondeur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 rounded-full blur-2xl" />
      </div>
    </div>
  )
}