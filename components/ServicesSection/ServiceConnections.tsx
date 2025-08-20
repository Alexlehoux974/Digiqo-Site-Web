import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ServiceConnection {
  fromId: string
  toId: string
  path: string
  gradient: string
}

export const ServiceConnections = ({ services }: { services: Array<{ id: string; connections?: string[]; gradient: string }> }) => {
  const [connections, setConnections] = useState<ServiceConnection[]>([])
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateConnections = () => {
      if (!containerRef.current) return

      const newConnections: ServiceConnection[] = []
      const container = containerRef.current
      const rect = container.getBoundingClientRect()

      services.forEach(service => {
        if (!service.connections) return

        service.connections.forEach(targetId => {
          const fromElement = document.querySelector(`[data-service-id="${service.id}"]`)
          const toElement = document.querySelector(`[data-service-id="${targetId}"]`)

          if (fromElement && toElement) {
            const fromRect = fromElement.getBoundingClientRect()
            const toRect = toElement.getBoundingClientRect()

            // Calculate center points relative to container
            const fromX = fromRect.left + fromRect.width / 2 - rect.left
            const fromY = fromRect.top + fromRect.height / 2 - rect.top
            const toX = toRect.left + toRect.width / 2 - rect.left
            const toY = toRect.top + toRect.height / 2 - rect.top

            // Calculate control points for curved path
            const midX = (fromX + toX) / 2
            const midY = (fromY + toY) / 2
            const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2))
            const curve = distance * 0.2

            // Create curved path
            const path = `M ${fromX} ${fromY} Q ${midX} ${midY - curve} ${toX} ${toY}`

            newConnections.push({
              fromId: service.id,
              toId: targetId,
              path,
              gradient: service.gradient
            })
          }
        })
      })

      setConnections(newConnections)
    }

    calculateConnections()
    window.addEventListener('resize', calculateConnections)
    
    // Recalculate after layout settles
    const timer = setTimeout(calculateConnections, 100)

    return () => {
      window.removeEventListener('resize', calculateConnections)
      clearTimeout(timer)
    }
  }, [services])

  // Add hover detection
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const serviceCard = target.closest('[data-service-id]')
      if (serviceCard) {
        const serviceId = serviceCard.getAttribute('data-service-id')
        setHoveredService(serviceId)
      }
    }

    const handleMouseOut = () => {
      setHoveredService(null)
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {connections.map((conn, index) => {
            // Extract colors from gradient classes
            const fromColor = conn.gradient.includes('digiqo-orange') ? '#DA6530' :
                             conn.gradient.includes('digiqo-blue-light') ? '#199CB7' :
                             conn.gradient.includes('pink-500') ? '#ec4899' :
                             conn.gradient.includes('green-500') ? '#10b981' :
                             conn.gradient.includes('red-500') ? '#ef4444' :
                             conn.gradient.includes('purple-600') ? '#9333ea' :
                             conn.gradient.includes('gray-600') ? '#4b5563' : '#DA6530'
                             
            const toColor = conn.gradient.includes('amber-400') ? '#fbbf24' :
                           conn.gradient.includes('digiqo-blue-dark') ? '#127387' :
                           conn.gradient.includes('purple-600') ? '#9333ea' :
                           conn.gradient.includes('teal-500') ? '#14b8a6' :
                           conn.gradient.includes('orange-500') ? '#f97316' :
                           conn.gradient.includes('pink-600') ? '#db2777' :
                           conn.gradient.includes('blue-600') ? '#2563eb' : fromColor
            
            return (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${conn.fromId}-${conn.toId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={fromColor} stopOpacity="0.6" />
                <stop offset="100%" stopColor={toColor} stopOpacity="0.6" />
              </linearGradient>
            )
          })}
        </defs>
        
        {connections.map((conn, index) => {
          const isActive = hoveredService === conn.fromId || hoveredService === conn.toId
          const shouldDim = hoveredService && !isActive
          
          return (
            <motion.g key={`${conn.fromId}-${conn.toId}`}>
              {/* Connection path */}
              <motion.path
                id={`path-${conn.fromId}-${conn.toId}`}
                d={conn.path}
                stroke={`url(#gradient-${conn.fromId}-${conn.toId})`}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: shouldDim ? 0.1 : isActive ? 0.8 : 0.3,
                  strokeWidth: isActive ? 3 : 2
                }}
                transition={{
                  pathLength: {
                    duration: 2,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.3 },
                  strokeWidth: { duration: 0.3 }
                }}
              />
              
              {/* Glow effect */}
              <motion.path
                d={conn.path}
                stroke={`url(#gradient-${conn.fromId}-${conn.toId})`}
                strokeWidth="4"
                fill="none"
                filter="blur(4px)"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: shouldDim ? 0.05 : isActive ? 0.3 : 0.1,
                  strokeWidth: isActive ? 8 : 4
                }}
                transition={{
                  pathLength: {
                    duration: 2,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  },
                  opacity: { duration: 0.3 },
                  strokeWidth: { duration: 0.3 }
                }}
              />
              
              {/* Animated particles along path */}
              <motion.circle 
                r="4" 
                fill={`url(#gradient-${conn.fromId}-${conn.toId})`}
                animate={{
                  opacity: shouldDim ? 0 : isActive ? 1 : 0.8
                }}
                transition={{ duration: 0.3 }}
              >
                <animateMotion
                  dur={isActive ? "2s" : "4s"}
                  repeatCount="indefinite"
                  begin={`${index * 0.5}s`}
                  path={conn.path}
                />
              </motion.circle>
              
              <motion.circle 
                r="3" 
                fill={`url(#gradient-${conn.fromId}-${conn.toId})`}
                animate={{
                  opacity: shouldDim ? 0 : isActive ? 0.8 : 0.6
                }}
                transition={{ duration: 0.3 }}
              >
                <animateMotion
                  dur={isActive ? "2s" : "4s"}
                  repeatCount="indefinite"
                  begin={`${index * 0.5 + 2}s`}
                  path={conn.path}
                />
              </motion.circle>
              
              {/* Extra particle when active */}
              {isActive && (
                <motion.circle 
                  r="5" 
                  fill={`url(#gradient-${conn.fromId}-${conn.toId})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <animateMotion
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="0s"
                    path={conn.path}
                  />
                </motion.circle>
              )}
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}