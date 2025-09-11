import { useState, useRef, useEffect } from 'react'
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
import { generateContactUrl } from '@/lib/contact-utils'

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
    description: 'Boostez votre visibilité avec nos campagnes publicitaires sur Google Ads et Meta. Expertise locale pour des résultats mesurables.',
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
    link: '/services/creatifs',
    keywords: ['production vidéo Réunion', 'création visuelle 974']
  },
  {
    id: 'identite',
    title: 'Identité de Marque',
    description: 'Création d\'identité visuelle unique. Logo et branding.',
    icon: <Palette className="w-5 h-5" />,
    gradient: 'from-purple-600 to-pink-600',
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
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      className={`${isMobile ? 'h-full' : service.gridClass} relative`}
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
            h-full
          `}>
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 hover:opacity-15 transition-opacity duration-500`} />
          
          {/* Structure différente pour la carte publicité */}
          {service.id === 'publicite' ? (
            <div className={`relative z-10 h-full flex flex-col ${isMobile ? 'p-6' : 'p-4'}`}>
              {/* Zone Contenu en premier - titre et description */}
              <div className={`${isMobile ? 'mb-6' : 'mb-4'} text-center`}>
                <h2 className={`font-bold mb-2 bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-xl'}`}>
                  {service.title}
                </h2>
                <p className={`text-gray-700 leading-relaxed px-2 ${isMobile ? 'text-base' : 'text-sm'}`}>
                  {service.description}
                </p>
              </div>
              
              {/* Animation grande en dessous du texte - masquée sur mobile */}
              {!isMobile && (
                <div className="flex-1 flex items-center justify-center overflow-hidden py-4">
                  <div className="w-full h-full mx-auto max-w-[280px] max-h-[220px]">
                    <IconCloud className="w-full h-full" />
                  </div>
                </div>
              )}
              
              {/* Zone CTA */}
              <div className={`flex items-center justify-center mt-4 ${isMobile ? 'h-12' : 'h-14'}`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-digiqo-orange via-amber-400 to-yellow-300 bg-clip-text text-transparent text-base">
                    En savoir plus
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className={`relative z-10 h-full flex flex-col ${isMobile ? 'p-6' : service.size === 'small' ? 'p-2' : 'p-4'}`}>
              {/* Zone Header avec icône - hauteur fixe pour alignement */}
              <div className={`flex items-center justify-center relative overflow-hidden ${isMobile ? 'h-20 mb-3' : service.size === 'small' ? 'h-10 mb-1' : 'h-24 mb-2'}`}>
                <motion.div 
                  animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`
                    inline-flex items-center justify-center rounded-xl
                    bg-gradient-to-br ${service.gradient} text-white
                    ${isMobile ? 'w-16 h-16 p-4' : service.size === 'large' ? 'w-16 h-16 p-4' : service.size === 'medium' ? 'w-12 h-12 p-3' : 'w-10 h-10 p-2'}
                  `}>
                    {service.icon}
                  </div>
                </motion.div>
              </div>
              
              {/* Zone titre - hauteur fixe pour alignement */}
              <div className={`text-center ${isMobile ? 'h-12 mb-4' : ''}`}>
                <h2 className={`
                  font-bold text-digiqo-primary
                  ${isMobile ? 'text-xl' : service.size === 'small' ? 'text-sm' : 'text-lg'}
                `}>
                  {service.title}
                </h2>
              </div>
              
              {/* Zone description - flex-1 pour prendre l'espace restant */}
              <div className="flex-1 flex items-center justify-center text-center px-2">
                <p className={`
                  text-gray-700 leading-relaxed
                  ${isMobile ? 'text-base' : service.size === 'large' ? 'text-sm' : service.size === 'medium' ? 'text-xs' : 'text-xs line-clamp-2'}
                `}>
                  {service.description}
                </p>
              </div>
              
              {/* Zone CTA - hauteur fixe */}
              <div className={`flex items-center justify-center ${isMobile ? 'h-12 mt-4' : service.size === 'small' ? 'h-10 mt-1' : 'h-14'}`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={`
                    inline-flex items-center gap-2 font-semibold
                    bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent
                    ${service.size === 'small' ? 'text-sm' : 'text-base'}
                  `}>
                    En savoir plus
                    <svg className={`${service.size === 'small' ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </motion.div>
              </div>
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
    <section id="services" className="relative py-12 overflow-hidden">
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
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-white">Nos </span>
            <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-accent-light bg-clip-text text-transparent">
              Services Premium
            </span>
          </h3>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Une gamme complète de services digitaux pour propulser votre entreprise
          </p>
        </motion.div>

        {/* Mobile: Défilement horizontal */}
        <div className="md:hidden">
          {/* Flèches de navigation positionnées au-dessus */}
          <div className="flex justify-between items-center mb-4 px-4">
            <button
              onClick={() => {
                const container = document.getElementById('services-mobile-scroll');
                if (container) container.scrollBy({ left: -320, behavior: 'smooth' });
              }}
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-digiqo-primary shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Précédent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-white/80 text-sm font-medium">Glissez pour découvrir</span>
            
            <button
              onClick={() => {
                const container = document.getElementById('services-mobile-scroll');
                if (container) container.scrollBy({ left: 320, behavior: 'smooth' });
              }}
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-digiqo-primary shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Suivant"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Conteneur scrollable */}
          <div
            id="services-mobile-scroll"
            className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 -mx-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {services.map((service, index) => (
              <div key={service.id} className="flex-shrink-0 w-80 h-96 snap-center">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop: Bento Grid */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-8 gap-4 auto-rows-[160px]">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-2xl font-bold text-white mb-3">
            Prêt à digitaliser votre entreprise ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={generateContactUrl({
              description: 'Je souhaite obtenir un devis gratuit pour digitaliser mon entreprise'
            })}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-accent text-white font-bold rounded-full hover:shadow-accent-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Demander un devis gratuit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </Link>
            <Link href="/services/audit">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-digiqo-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Audit gratuit
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}