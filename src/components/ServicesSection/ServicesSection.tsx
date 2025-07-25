import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import { 
  Megaphone, 
  Code, 
  Users, 
  Video, 
  Search, 
  Palette, 
  Shield, 
  FileSearch 
} from 'lucide-react'
import { IconCloud } from '../IconCloud'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  gridClass: string
  size: 'small' | 'medium' | 'large'
  link: string
  keywords: string[]
}

const services: Service[] = [
  {
    id: 'publicite',
    title: 'Publicité en Ligne',
    description: 'Boostez votre visibilité avec nos campagnes publicitaires sur Google Ads et Meta. Expertise locale à La Réunion pour des résultats mesurables.',
    icon: <Megaphone className="w-8 h-8" />,
    gradient: 'from-digiqo-orange via-amber-400 to-yellow-300',
    gridClass: 'col-span-2 md:col-span-4 row-span-3 md:col-start-3 md:row-start-1',
    size: 'large',
    link: '/services/publicite',
    keywords: ['Google Ads Réunion', 'Facebook Ads 974', 'publicité digitale']
  },
  {
    id: 'dev-web',
    title: 'Développement Web',
    description: 'Sites web sur-mesure, responsive et optimisés. De la landing page au site e-commerce.',
    icon: <Code className="w-6 h-6" />,
    gradient: 'from-digiqo-blue-light to-digiqo-blue-dark',
    gridClass: 'col-span-2 md:col-span-3 row-span-2 md:col-start-7 md:row-start-1',
    size: 'medium',
    link: '/services/dev-web',
    keywords: ['création site web Réunion', 'développeur web 974']
  },
  {
    id: 'community',
    title: 'Community Management',
    description: 'Gestion professionnelle de vos réseaux sociaux. Créez une communauté engagée.',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-pink-500 to-purple-600',
    gridClass: 'col-span-2 row-span-2 md:col-start-1 md:row-start-1',
    size: 'medium',
    link: '/services/community',
    keywords: ['community manager Réunion', 'gestion réseaux sociaux']
  },
  {
    id: 'seo',
    title: 'Référencement SEO',
    description: 'Optimisez votre visibilité sur Google. Stratégie SEO locale pour dominer.',
    icon: <Search className="w-5 h-5" />,
    gradient: 'from-green-500 to-teal-500',
    gridClass: 'col-span-1 md:col-span-3 row-span-1 md:col-start-7 md:row-start-3',
    size: 'small',
    link: '/services/seo',
    keywords: ['référencement naturel Réunion', 'SEO local 974']
  },
  {
    id: 'video',
    title: 'Visuels & Vidéos',
    description: 'Production de contenus visuels impactants pour votre communication.',
    icon: <Video className="w-6 h-6" />,
    gradient: 'from-red-500 to-orange-500',
    gridClass: 'col-span-2 row-span-2 md:col-start-1 md:row-start-3',
    size: 'medium',
    link: '/services/video',
    keywords: ['production vidéo Réunion', 'création visuelle 974']
  },
  {
    id: 'identite',
    title: 'Identité de Marque',
    description: 'Création d\'identité visuelle unique. Logo et branding.',
    icon: <Palette className="w-5 h-5" />,
    gradient: 'from-purple-600 to-digiqo-bordeaux',
    gridClass: 'col-span-1 md:col-span-2 row-span-1 md:col-start-3 md:row-start-4',
    size: 'small',
    link: '/services/identite',
    keywords: ['branding Réunion', 'création logo 974']
  },
  {
    id: 'audit',
    title: 'Audit Gratuit',
    description: 'Analysez gratuitement votre présence digitale.',
    icon: <FileSearch className="w-5 h-5" />,
    gradient: 'from-white to-digiqo-orange',
    gridClass: 'col-span-1 md:col-span-2 row-span-1 md:col-start-5 md:row-start-4',
    size: 'small',
    link: '/services/audit',
    keywords: ['audit digital gratuit', 'analyse marketing Réunion']
  },
  {
    id: 'sitekeeper',
    title: 'SiteKeeper',
    description: 'Maintenance et sécurité de votre site web.',
    icon: <Shield className="w-5 h-5" />,
    gradient: 'from-gray-600 to-blue-600',
    gridClass: 'col-span-2 md:col-span-3 row-span-1 md:col-start-7 md:row-start-4',
    size: 'small',
    link: '/services/sitekeeper',
    keywords: ['maintenance site web', 'sécurité web Réunion']
  }
]


function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${service.gridClass} relative`}
      data-service-id={service.id}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full"
        style={{ 
          rotateX: service.id === 'publicite' ? 0 : (service.size === 'large' ? rotateX : 0), 
          rotateY: service.id === 'publicite' ? 0 : (service.size === 'large' ? rotateY : 0),
          transformStyle: "preserve-3d"
        }}
      >
        <Link href={service.link || '#'} className="block w-full h-full">
          <div className={`
            relative w-full h-full rounded-2xl overflow-hidden cursor-pointer
            bg-white/95 backdrop-blur-sm border border-white/30
            hover:shadow-2xl transition-all duration-500
            ${service.size === 'large' ? 'min-h-[400px]' : service.size === 'medium' ? 'min-h-[200px]' : 'min-h-[150px]'}
          `}>
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 hover:opacity-15 transition-opacity duration-500`} />
          
          
          {/* Contenu */}
          {service.id === 'publicite' ? (
            <div className="relative z-10 p-6 h-full flex flex-col items-center justify-between">
              {/* Titre */}
              <div className="text-center">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>
              
              {/* Icon Cloud */}
              <div className="flex-1 w-full max-w-sm mx-auto">
                <IconCloud className="w-full h-full min-h-[250px]" />
              </div>
              
              {/* CTA */}
              <motion.div 
                className="mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`
                  inline-flex items-center gap-2 font-semibold
                  bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent text-lg
                `}>
                  En savoir plus
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            </div>
          ) : (
            <div className={`relative z-10 p-6 h-full flex flex-col`}>
              {/* Icône */}
              <motion.div 
                className={`${service.size === 'large' ? 'mx-auto' : ''}`}
                animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`
                  inline-flex items-center justify-center rounded-xl
                  bg-gradient-to-br ${service.gradient} text-white
                  ${service.size === 'large' ? 'w-20 h-20 p-6' : service.size === 'medium' ? 'w-14 h-14 p-3' : 'w-12 h-12 p-2.5'}
                `}>
                  {service.icon}
                </div>
              </motion.div>
              
              {/* Titre et description - flex-1 pour prendre tout l'espace disponible */}
              <div className="flex-1 flex flex-col justify-center py-4">
                <h3 className={`
                  font-bold text-digiqo-primary
                  ${service.size === 'large' ? 'text-3xl' : service.size === 'medium' ? 'text-xl' : 'text-lg'}
                  mb-3
                `}>
                  {service.title}
                </h3>
                <p className={`
                  text-gray-700 leading-relaxed
                  ${service.size === 'large' ? 'text-base' : 'text-sm'}
                  ${['community', 'publicite', 'dev-web', 'video'].includes(service.id) ? 'line-clamp-4' : 'line-clamp-3'}
                `}>
                  {service.description}
                </p>
              </div>
              
              {/* CTA - toujours en bas */}
              <motion.div 
                className={`${service.size === 'large' ? 'mx-auto' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`
                  inline-flex items-center gap-2 font-semibold
                  bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent
                  ${service.size === 'large' ? 'text-lg' : 'text-sm'}
                `}>
                  En savoir plus
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            </div>
          )}
          
          {/* Effet de brillance au hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100"
            initial={{ x: '-100%', y: '-100%' }}
            animate={isHovered ? { x: '100%', y: '100%' } : { x: '-100%', y: '-100%' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export const ServicesSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient avec les vraies couleurs Digiqo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-digiqo-primary" />
      </div>
      
      {/* Effets de fond animés */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Nos </span>
            <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-accent-light bg-clip-text text-transparent">
              Services Premium
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Une gamme complète de services digitaux pour propulser votre entreprise à La Réunion
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4 md:gap-6 auto-rows-[minmax(100px,_1fr)]">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Prêt à digitaliser votre entreprise ?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-accent text-white font-bold rounded-full hover:shadow-accent-lg hover:scale-105 transition-all duration-300"
            >
              Demander un devis gratuit
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-digiqo-primary hover:shadow-lg transition-all duration-300"
            >
              Audit gratuit
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}