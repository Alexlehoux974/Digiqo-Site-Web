import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedBeam } from '@/components/magicui/animated-beam'
import { cn } from '@/lib/utils'

const clientLogos = [
  { name: 'CCI Réunion', logo: '/partenaires/CCI-REUNION-1024x1024.webp' },
  { name: '3M', logo: '/partenaires/3M-1024x1024.webp' },
  { name: 'Beauvallon', logo: '/partenaires/BEAUVALLON-1024x1024.webp' }
]

const caseStudies = [
  {
    title: 'Campagne Digitale',
    result: '+250% de leads',
    description: 'Stratégie multi-canal optimisée'
  },
  {
    title: 'Refonte E-commerce',
    result: '+180% de conversion',
    description: 'UX/UI repensée pour la performance'
  },
  {
    title: 'Social Media 360°',
    result: '+500% d\'engagement',
    description: 'Community management expert'
  }
]

export function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const clientRefs = useRef<(HTMLDivElement | null)[]>([])
  const digiqoRef = useRef<HTMLDivElement>(null)
  const resultRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Force re-render when refs are ready
    const checkRefs = () => {
      if (containerRef.current && digiqoRef.current && clientRefs.current.some(ref => ref !== null)) {
        setIsReady(true)
      }
    }
    // Check after animations complete
    const timer = setTimeout(checkRefs, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-digiqo-blue-dark">Études de Cas</span>{' '}
          <span className="bg-gradient-to-r from-digiqo-orange to-digiqo-blue-light bg-clip-text text-transparent">
            Récentes
          </span>
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          De l'idée à la réussite, Digiqo est le pont entre vos ambitions et vos résultats.
        </p>
      </motion.div>

      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto w-full flex flex-col md:flex-row md:justify-between items-center gap-8 p-4 md:px-0 md:py-8 min-h-[400px] md:min-h-[600px]"
      >
        {/* Mobile Version - Case Studies Grid */}
        <div className="block md:hidden w-full">
          <div className="grid grid-cols-1 gap-4">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <h4 className="text-lg font-bold text-digiqo-blue-dark mb-2">
                  {study.title}
                </h4>
                <p className="text-2xl font-bold bg-gradient-to-r from-digiqo-orange to-digiqo-blue-light bg-clip-text text-transparent mb-2">
                  {study.result}
                </p>
                <p className="text-sm text-gray-600">
                  {study.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Version - Client Logos Column */}
        <div className="hidden md:flex flex-col gap-6 justify-evenly items-center h-full">
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              ref={el => clientRefs.current[index] = el}
              className="relative bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-2 md:p-3 flex items-center justify-center border border-gray-100 hover:border-digiqo-orange/20 hover:scale-105"
            >
              <img 
                src={client.logo} 
                alt={client.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* Digiqo Logo Center - Desktop Only */}
        <div className="hidden md:flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            ref={digiqoRef}
            className="relative z-20"
          >
          <div className="bg-gradient-to-br from-digiqo-orange to-digiqo-blue-light p-[2px] rounded-2xl md:rounded-3xl shadow-2xl">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-xl">
              <img 
                src="/assets/logo2-digiqo.png" 
                alt="Digiqo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-digiqo-orange to-digiqo-blue-light rounded-3xl blur-2xl opacity-40 -z-10 animate-pulse"></div>
          </motion.div>
        </div>

        {/* Result Cards Column - Desktop Only */}
        <div className="hidden md:flex flex-col gap-6 justify-evenly items-stretch h-full">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              viewport={{ once: true }}
              ref={el => resultRefs.current[index] = el}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 md:p-6 border border-gray-100 hover:border-digiqo-blue-light/20 hover:scale-105 group"
            >
              <h4 className="text-lg font-bold text-digiqo-blue-dark mb-2">
                {study.title}
              </h4>
              <p className="text-2xl font-bold bg-gradient-to-r from-digiqo-orange to-digiqo-blue-light bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {study.result}
              </p>
              <p className="text-sm text-gray-600">
                {study.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated Beams - Only show on desktop */}
        {isReady && (
          <div className="hidden md:block">
            {clientRefs.current.map((clientRef, index) => (
            clientRef && digiqoRef.current && (
              <AnimatedBeam
              key={`client-${index}`}
              containerRef={containerRef}
              fromRef={{ current: clientRef }}
              toRef={digiqoRef}
              curvature={-20}
              duration={4}
              delay={index * 0.3}
              pathColor="#DA6530"
              pathOpacity={0.3}
              gradientStartColor="#DA6530"
              gradientStopColor="#DA6530"
              startXOffset={80}
              startYOffset={0}
              endXOffset={-100}
              endYOffset={0}
              reverse={false}
            />
          )
        ))}

        {resultRefs.current.map((resultRef, index) => (
          digiqoRef.current && resultRef && (
            <AnimatedBeam
              key={`result-${index}`}
              containerRef={containerRef}
              fromRef={digiqoRef}
              toRef={{ current: resultRef }}
              curvature={20}
              duration={4}
              delay={1.2 + index * 0.3}
              pathColor="#199CB7"
              pathOpacity={0.3}
              gradientStartColor="#199CB7"
              gradientStopColor="#199CB7"
              startXOffset={100}
              startYOffset={0}
              endXOffset={-140}
              endYOffset={0}
              reverse={false}
            />
          )
        ))}
          </div>
        )}
      </div>
    </div>
  )
}