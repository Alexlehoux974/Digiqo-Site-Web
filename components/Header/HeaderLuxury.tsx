import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { OptimizedImage } from '../ui/OptimizedImage'
import { generateContactUrl } from '../../lib/contact-utils'
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Palette,
  Code,
  Search,
  Shield,
  Zap,
  Award,
  MessageCircle,
  X,
  ChevronRight
} from 'lucide-react'


// Luxury navigation data
const navigation = {
  topBar: {
    left: [
      { icon: Phone, text: '+262 262 02 51 02', href: 'tel:+262262025102' },
      { icon: Mail, text: 'contact@digiqo.fr', href: 'mailto:contact@digiqo.fr' }
    ],
    right: [
      { icon: MapPin, text: 'Saint-Denis, La Réunion', href: '/#contact' }
    ],
    social: [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/digiqo' },
      { name: 'Instagram', href: 'https://www.instagram.com/digiqo_' },
      { name: 'Facebook', href: 'https://www.facebook.com/digiqo' }
    ]
  },
  main: [
    {
      name: 'PUBLICITÉ',
      href: '#',
      luxuryIcon: TrendingUp,
      megaMenu: {
        categories: [
          {
            items: [
              {
                name: 'Publicité META',
                href: '/services/publicite-meta',
                description: 'Campagnes Facebook & Instagram',
                icon: TrendingUp,
                badge: 'Best Seller',
                certifiedBadge: 'Expert certifié'
              },
              {
                name: 'Publicité Google',
                href: '/services/publicite-google',
                description: 'Google Ads & YouTube',
                icon: Search,
                badge: 'ROI Max',
                certifiedBadge: 'Expert certifié'
              },
              {
                name: 'Publicité Snapchat',
                href: '/services/publicite-snapchat',
                description: 'Touchez la génération Z',
                icon: Sparkles,
                badge: 'Nouveau',
                certifiedBadge: 'Expert certifié'
              },
              {
                name: 'Publicité TikTok',
                href: '/services/publicite-tiktok',
                description: 'Viralité et engagement maximum',
                icon: Zap,
                badge: 'Tendance',
                certifiedBadge: 'Expert certifié'
              }
            ]
          }
        ],
        cta: {
          title: 'Lancez vos campagnes publicitaires',
          subtitle: 'Consultation gratuite avec nos experts',
          href: generateContactUrl({
            description: 'Je souhaite discuter de mes campagnes publicitaires'
          }),
          icon: MessageCircle
        }
      }
    },
    {
      name: 'AUTRES SERVICES',
      href: '#',
      luxuryIcon: Award,
      megaMenu: {
        categories: [
          {
            items: [
              {
                name: 'Community Management',
                href: '/services/community-management',
                description: 'Présence sociale optimisée',
                icon: Users
              },
              {
                name: 'Référencement SEO',
                href: '/services/seo',
                description: 'Dominez Google',
                icon: Zap
              },
              {
                name: 'Identité de Marque',
                href: '/services/identite-de-marque',
                description: 'Image de marque unique',
                icon: Sparkles
              },
              {
                name: 'Créatifs Publicitaires',
                href: '/services/creatifs',
                description: 'Contenus visuels impactants',
                icon: Palette
              },
              {
                name: 'Site-web, Ecommerce, Plateforme',
                href: '/services/sites-web',
                description: 'Votre vitrine digitale personnalisée',
                icon: Code,
                badge: 'Sur Mesure'
              },
              {
                name: 'Maintenance Site-web',
                href: '/services/sitekeeper',
                description: 'Sitekeeper/Shopkeeper',
                icon: Shield
              },
              {
                name: 'Audit Digital',
                href: '/services/audit',
                description: 'Analyse gratuite',
                icon: Award,
                highlight: true,
                badge: 'Gratuit'
              }
            ]
          }
        ],
        cta: {
          title: 'Parlons de votre projet',
          subtitle: 'Consultation gratuite avec nos experts',
          href: generateContactUrl({
            description: 'Je souhaite discuter de mon projet digital'
          }),
          icon: MessageCircle
        }
      }
    },
    {
      name: 'L\'AGENCE',
      href: '/agence',
      submenu: [
        { name: 'Notre Histoire', href: '/agence#histoire' },
        { name: 'Nos Valeurs', href: '/agence#valeurs' },
        { name: 'L\'Équipe', href: '/agence#equipe' },
        { name: 'Rejoignez-nous', href: '/digiqo-recrute', highlight: true }
      ]
    },
    {
      name: 'BLOG',
      href: '/blog'
    }
  ],
  cta: {
    contact: { text: 'Contact', href: '/?instant=true#contact' }
  }
}

export const HeaderLuxury = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false) // Désactivé pour garder le header fixe
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [menuPosition, setMenuPosition] = useState<'left' | 'center' | 'right'>('center')
  
  // Désactivation des transformations de scroll pour garder le header fixe
  // const { scrollY } = useScroll()
  // const headerY = useTransform(scrollY, [0, 100], [0, -40])
  // const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])
  // const logoScale = useTransform(scrollY, [0, 100], [1, 0.85])
  
  // Valeurs fixes au lieu d'animations - non utilisées maintenant
  // const headerYSpring = 0
  // const headerScaleSpring = 1
  // const logoScaleSpring = 1
  
  // Désactivation du comportement de scroll
  useEffect(() => {
    // const handleScroll = () => {
    //   setIsScrolled(window.scrollY > 50)
    // }
    // window.addEventListener('scroll', handleScroll)
    // return () => window.removeEventListener('scroll', handleScroll)
    // Toujours garder isScrolled à false pour conserver le header complet
    setIsScrolled(false)
  }, [])


  // Smooth scroll to section
  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle links with query params and hash (instant scroll)
    if (href.includes('?instant=true#')) {
      // Let the default behavior handle it - the useInstantScroll hook will take care of it
      return
    }
    // Handle links that start with /#
    else if (href.startsWith('/#')) {
      e.preventDefault()
      const target = document.querySelector(href.substring(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // Handle links to other pages with hash like /agence#histoire
    else if (href.includes('#') && !href.startsWith('#')) {
      // Let the default behavior happen for navigation to another page with hash
      setIsNavigating(true)
      setTimeout(() => setIsNavigating(false), 1000)
    }
  }

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-[100]"
        // Pas de transformation sur le header
        // style={{ 
        //   y: headerYSpring,
        //   scale: headerScaleSpring
        // }}
      >
      {/* Ultra-luxury glass effect - Bordeaux on mobile */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-digiqo-primary/95 lg:bg-white/80 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-digiqo-primary/85 lg:from-white/50 to-digiqo-primary/75 lg:to-white/30" />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 20, 49, 0.05) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, rgba(218, 101, 48, 0.05) 0%, transparent 50%)`
          }}
        />
      </div>
      
      {/* Premium Top Bar */}
      <motion.div 
        className={`relative transition-all duration-500 ${
          isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'
        } overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-digiqo-primary via-digiqo-primary-dark to-digiqo-primary">
          {/* Animated luxury pattern */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
              )`
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full text-white/90 text-xs">
            <div className="flex items-center space-x-6">
              {navigation.topBar.left.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-1.5 hover:text-white transition-all group"
                >
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <item.icon className="w-3 h-3" />
                  </motion.div>
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navigation.topBar.right.map((item, index) => (
                <div key={index} className="flex items-center space-x-1.5 text-white/80">
                  <item.icon className="w-3 h-3" />
                  <span>{item.text}</span>
                </div>
              ))}
              
              <div className="flex items-center space-x-3 pl-6 border-l border-white/20">
                {navigation.topBar.social.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Luxury Navigation */}
      <nav className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Animated Logo - Different for mobile */}
            <Link href="/" className="relative">
              <motion.div
                // Pas de transformation sur le logo
                // style={{ scale: logoScaleSpring }}
                whileHover={{ scale: 1.25 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative"
              >
                {/* Desktop logo */}
                <div className="hidden lg:block">
                  <OptimizedImage
                    src="/apple-touch-icon.png"
                    alt="Digiqo - Excellence Digitale"
                    width={120}
                    height={40}
                    priority
                    className="h-12 w-auto relative z-10"
                    objectFit="contain"
                  />
                </div>
                {/* Mobile logo - Using same as desktop */}
                <div className="block lg:hidden">
                  <OptimizedImage
                    src="/apple-touch-icon.png"
                    alt="Digiqo - Excellence Digitale"
                    width={160}
                    height={48}
                    priority
                    className="h-12 w-auto relative z-10"
                    objectFit="contain"
                  />
                </div>
                
                {/* Logo glow effect */}
                <motion.div
                  className="absolute inset-0 blur-2xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: 'radial-gradient(circle, rgba(139, 20, 49, 0.3) 0%, transparent 70%)'
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.main.map((item) => (
                <div key={item.name} className="relative">
                  <motion.button
                    onMouseEnter={(e) => {
                      if (item.megaMenu || item.submenu) {
                        setActiveSubmenu(item.name)
                        // Calculate menu position based on button position
                        const rect = e.currentTarget.getBoundingClientRect()
                        const windowWidth = window.innerWidth
                        const menuWidth = 900 // max menu width
                        
                        if (rect.left < menuWidth / 2) {
                          setMenuPosition('left')
                        } else if (windowWidth - rect.right < menuWidth / 2) {
                          setMenuPosition('right')
                        } else {
                          setMenuPosition('center')
                        }
                      }
                    }}
                    onMouseLeave={() => !isNavigating && setActiveSubmenu(null)}
                    onClick={(e) => {
                      // Pour RÉALISATIONS spécifiquement
                      if (item.name === 'RÉALISATIONS') {
                        e.preventDefault()
                        const target = document.querySelector('#case-studies')
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' })
                        } else {
                          // Si on n'est pas sur la page d'accueil, naviguer puis scroller
                          window.location.href = '/#case-studies'
                        }
                      } else if (item.href.startsWith('/#')) {
                        e.preventDefault()
                        const target = document.querySelector(item.href.substring(1))
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' })
                        }
                      } else if (item.href !== '#') {
                        window.location.href = item.href
                      }
                    }}
                    className="px-3 py-3 text-xs font-medium text-gray-700 hover:text-digiqo-primary transition-all relative group"
                    whileHover={{ y: -2 }}
                  >
                    {/* Luxury hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-digiqo-primary/0 via-digiqo-primary/5 to-digiqo-primary/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    />
                    
                    <span className="relative flex items-center space-x-2">
                      {item.luxuryIcon && (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <item.luxuryIcon className="w-3 h-3 text-digiqo-accent" />
                        </motion.div>
                      )}
                      <span className={('highlight' in item && item.highlight) ? 'text-digiqo-accent font-semibold' : ''}>
                        {item.name}
                      </span>
                      {'badge' in item && (item as any).badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-digiqo-secondary text-white rounded-full">
                          {(item as any).badge}
                        </span>
                      )}
                      {(item.megaMenu || item.submenu) && (
                        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                      )}
                    </span>
                    
                    {/* Luxury underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-digiqo-primary to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {item.megaMenu && activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setActiveSubmenu(item.name)}
                        onMouseLeave={() => !isNavigating && setActiveSubmenu(null)}
                        className={`absolute mt-6 w-[90vw] max-w-[900px] xl:w-[900px] ${
                          menuPosition === 'left' ? 'left-[5vw]' : 
                          menuPosition === 'right' ? 'right-[5vw]' : 
                          'left-1/2 -translate-x-1/2'
                        }`}
                      >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[calc(100vh-120px)] overflow-y-auto">
                            {/* Premium gradient border */}
                            <div className="absolute inset-0 p-[1px] bg-gradient-to-br from-digiqo-primary/20 via-transparent to-digiqo-accent/20 rounded-2xl" />

                            <div className="relative bg-white rounded-2xl">
                              {/* Affichage différent pour Publicité */}
                              {item.name === 'PUBLICITÉ' ? (
                                // Cartes de publicité comme dans le modal
                                <div className="grid grid-cols-2 gap-6 p-6 lg:p-8 max-w-4xl mx-auto">
                                  {/* Option Meta */}
                                  <Link href="/services/publicite-meta" onClick={() => setActiveSubmenu(null)}>
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-transparent hover:border-blue-400 transition-all cursor-pointer group"
                                    >
                                      <div className="flex items-center justify-center gap-2 mb-4 mx-auto">
                                        <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2 group-hover:scale-110 transition-transform">
                                          <OptimizedImage
                                            src="/instagram.jpg"
                                            alt="Instagram"
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-contain"
                                            objectFit="contain"
                                          />
                                        </div>
                                        <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2 group-hover:scale-110 transition-transform">
                                          <OptimizedImage
                                            src="/facebook.jpg"
                                            alt="Facebook"
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-contain"
                                            objectFit="contain"
                                          />
                                        </div>
                                        <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2 group-hover:scale-110 transition-transform">
                                          <OptimizedImage
                                            src="/whatsapp.png"
                                            alt="WhatsApp"
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-contain"
                                            objectFit="contain"
                                          />
                                        </div>
                                      </div>
                                      <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        Publicité META
                                      </h3>
                                      <p className="text-gray-700 text-center text-sm mb-3">
                                        Facebook, Instagram & WhatsApp
                                      </p>
                                      <ul className="space-y-1 text-xs">
                                        <li className="flex items-start gap-2">
                                          <span className="text-blue-500 mt-0.5">✓</span>
                                          <span>Ciblage ultra-précis de votre audience</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                          <span className="text-blue-500 mt-0.5">✓</span>
                                          <span>Formats visuels engageants</span>
                                        </li>
                                      </ul>
                                      <div className="absolute -top-2 -right-2 transform rotate-12 origin-center">
                                        <span className="inline-block px-2 py-1 text-[9px] font-bold bg-green-500 text-white rounded-md shadow-md border border-green-600 whitespace-nowrap">
                                          Expert certifié
                                        </span>
                                      </div>
                                    </motion.div>
                                  </Link>

                                  {/* Option Google */}
                                  <Link href="/services/publicite-google" onClick={() => setActiveSubmenu(null)}>
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="relative bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-6 border-2 border-transparent hover:border-green-400 transition-all cursor-pointer group"
                                    >
                                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-md mb-4 mx-auto group-hover:scale-110 transition-transform">
                                        <OptimizedImage
                                          src="/Google_Ads_logo.svg.png"
                                          alt="Google Ads"
                                          width={48}
                                          height={48}
                                          className="w-12 h-12 object-contain"
                                          objectFit="contain"
                                        />
                                      </div>
                                      <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
                                        Publicité Google
                                      </h3>
                                      <p className="text-gray-700 text-center text-sm mb-3">
                                        Search, Display, Shopping & YouTube
                                      </p>
                                      <ul className="space-y-1 text-xs">
                                        <li className="flex items-start gap-2">
                                          <span className="text-green-500 mt-0.5">✓</span>
                                          <span>Intention d'achat immédiate</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                          <span className="text-green-500 mt-0.5">✓</span>
                                          <span>ROI mesurable et rapide</span>
                                        </li>
                                      </ul>
                                      <div className="absolute -top-2 -right-2 transform rotate-12 origin-center">
                                        <span className="inline-block px-2 py-1 text-[9px] font-bold bg-green-500 text-white rounded-md shadow-md border border-green-600 whitespace-nowrap">
                                          Expert certifié
                                        </span>
                                      </div>
                                    </motion.div>
                                  </Link>

                                  {/* Option Snapchat */}
                                  <Link href="/services/publicite-snapchat" onClick={() => setActiveSubmenu(null)}>
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-transparent hover:border-yellow-400 transition-all cursor-pointer group"
                                    >
                                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#FFFC00] shadow-md mb-4 mx-auto group-hover:scale-110 transition-transform p-2">
                                        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="black">
                                          <path d="M12.065 2a5.526 5.526 0 0 1 3.132.892 5.854 5.854 0 0 1 1.864 2.2c.461.9.654 1.917.628 2.916-.01.316-.018.632-.02.949.003.06.003.18.01.36.018.264.03.42.046.539.028.138.06.234.135.315.064.054.161.082.258.074.153 0 .324-.049.512-.158a.86.86 0 0 1 .515-.074c.184.033.315.175.368.352a.688.688 0 0 1-.074.455c-.12.225-.356.41-.712.61-.89.495-1.335.803-1.422 1.129-.03.128-.015.248.067.31.06.045.142.074.234.09.419.074.822.23 1.161.453.376.26.61.545.726.894a.707.707 0 0 1-.087.693c-.28.299-.773.48-1.353.532a4.167 4.167 0 0 0-.797.171c-.329.138-.655.34-.988.617-.38.316-.787.764-1.217 1.322a5.715 5.715 0 0 1-1.638 1.392c-.62.251-1.34.382-1.989.382-.663 0-1.378-.131-1.992-.378a5.712 5.712 0 0 1-1.638-1.396c-.432-.558-.837-1.006-1.217-1.322a2.866 2.866 0 0 0-.984-.617 4.167 4.167 0 0 0-.798-.171c-.58-.052-1.073-.233-1.353-.532a.707.707 0 0 1-.087-.693c.117-.349.351-.633.726-.894.339-.224.742-.379 1.161-.453a.61.61 0 0 0 .234-.09c.082-.062.097-.182.067-.31-.087-.327-.533-.635-1.423-1.129-.356-.2-.592-.385-.712-.61a.688.688 0 0 1-.074-.455c.054-.177.185-.319.369-.352a.86.86 0 0 1 .515.074c.188.11.358.158.512.158.097.008.194-.02.258-.074.075-.08.107-.177.135-.315.015-.12.027-.275.045-.54.008-.18.008-.3.011-.36-.003-.316-.011-.632-.02-.948-.026-1 .167-2.016.628-2.917a5.854 5.854 0 0 1 1.864-2.2A5.526 5.526 0 0 1 12.065 2z"/>
                                        </svg>
                                      </div>
                                      <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                                        Publicité Snapchat
                                      </h3>
                                      <p className="text-gray-700 text-center text-sm mb-3">
                                        Touchez la génération Z
                                      </p>
                                      <ul className="space-y-1 text-xs">
                                        <li className="flex items-start gap-2">
                                          <span className="text-yellow-500 mt-0.5">✓</span>
                                          <span>Audience jeune et engagée</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                          <span className="text-yellow-500 mt-0.5">✓</span>
                                          <span>Formats immersifs et créatifs</span>
                                        </li>
                                      </ul>
                                      <div className="absolute -top-2 -right-2 transform rotate-12 origin-center">
                                        <span className="inline-block px-2 py-1 text-[9px] font-bold bg-amber-500 text-white rounded-md shadow-md border border-amber-600 whitespace-nowrap">
                                          Bientôt disponible
                                        </span>
                                      </div>
                                    </motion.div>
                                  </Link>

                                  {/* Option TikTok */}
                                  <Link href="/services/publicite-tiktok" onClick={() => setActiveSubmenu(null)}>
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border-2 border-transparent hover:border-gray-600 transition-all cursor-pointer group"
                                    >
                                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-black shadow-md mb-4 mx-auto group-hover:scale-110 transition-transform p-2">
                                        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                        </svg>
                                      </div>
                                      <h3 className="text-xl font-bold text-center mb-2 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                        Publicité TikTok
                                      </h3>
                                      <p className="text-gray-300 text-center text-sm mb-3">
                                        Viralité et engagement maximum
                                      </p>
                                      <ul className="space-y-1 text-xs text-gray-300">
                                        <li className="flex items-start gap-2">
                                          <span className="text-cyan-400 mt-0.5">✓</span>
                                          <span>Contenu viral et tendance</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                          <span className="text-cyan-400 mt-0.5">✓</span>
                                          <span>Engagement exceptionnel</span>
                                        </li>
                                      </ul>
                                      <div className="absolute -top-2 -right-2 transform rotate-12 origin-center">
                                        <span className="inline-block px-2 py-1 text-[9px] font-bold bg-amber-500 text-white rounded-md shadow-md border border-amber-600 whitespace-nowrap">
                                          Bientôt disponible
                                        </span>
                                      </div>
                                    </motion.div>
                                  </Link>
                                </div>
                              ) : (
                                // Affichage normal pour les autres menus
                                <div className="grid grid-cols-3 gap-4 p-6 lg:p-8">
                                  {item.megaMenu.categories[0].items.map((service) => {
                                    const Icon = service.icon
                                    return (
                                    <Link
                                      key={service.name}
                                      href={service.href}
                                      onClick={() => {
                                        setIsNavigating(true)
                                        // Reset after navigation
                                        setTimeout(() => setIsNavigating(false), 1000)
                                      }}
                                      onMouseEnter={() => setHoveredService(service.name)}
                                      onMouseLeave={() => setHoveredService(null)}
                                      className={`group block p-3 rounded-xl transition-all ${
                                        'highlight' in service && service.highlight
                                          ? 'bg-gradient-to-r from-digiqo-primary/5 to-digiqo-accent/5 border border-digiqo-primary/10'
                                          : hoveredService === service.name
                                          ? 'bg-gray-50'
                                          : ''
                                      }`}
                                    >
                                      <div className="flex flex-col items-center text-center space-y-2">
                                        <div className="relative">
                                          <motion.div
                                            className={`p-3 rounded-lg ${
                                              'highlight' in service && service.highlight
                                                ? 'bg-gradient-to-br from-digiqo-primary to-digiqo-accent text-white'
                                                : 'bg-gray-100 text-gray-600 group-hover:bg-digiqo-primary/10 group-hover:text-digiqo-primary'
                                            } transition-all`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                          >
                                            <Icon className="w-5 h-5" />
                                          </motion.div>
                                          {(service as any).certifiedBadge && (
                                            <div className="absolute -top-2 -right-2 transform rotate-12 origin-center">
                                              <span className="inline-block px-2 py-1 text-[9px] font-bold bg-green-500 text-white rounded-md shadow-md border border-green-600 whitespace-nowrap">
                                                {(service as any).certifiedBadge}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                        <div>
                                          <h5 className="font-semibold text-gray-900 group-hover:text-digiqo-primary transition-colors text-sm">
                                            {service.name}
                                          </h5>
                                          {service.badge && (
                                            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-digiqo-secondary/10 text-digiqo-secondary rounded-full">
                                              {service.badge}
                                            </span>
                                          )}
                                          <p className="text-xs text-gray-600 mt-1">
                                            {service.description}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  )
                                  })}
                                </div>
                              )}

                              {/* CTA Section */}
                              {item.megaMenu.cta && (
                                <div className="p-6 bg-gradient-to-r from-digiqo-primary to-digiqo-primary-dark">
                                  <Link
                                    href={item.megaMenu.cta.href}
                                    onClick={(e) => {
                                      handleHashLink(e, item.megaMenu.cta.href)
                                      setIsNavigating(true)
                                      setTimeout(() => setIsNavigating(false), 1000)
                                    }}
                                    className="flex items-center justify-between group"
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className="p-3 bg-white/10 rounded-xl">
                                        <item.megaMenu.cta.icon className="w-6 h-6 text-white" />
                                      </div>
                                      <div>
                                        <h4 className="text-white font-semibold">
                                          {item.megaMenu.cta.title}
                                        </h4>
                                        <p className="text-white/80 text-sm">
                                          {item.megaMenu.cta.subtitle}
                                        </p>
                                      </div>
                                    </div>
                                    <motion.div
                                      className="px-6 py-3 bg-white text-digiqo-primary rounded-xl font-medium group-hover:shadow-lg transition-all"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      Commencer
                                    </motion.div>
                                  </Link>
                                </div>
                              )}
                            </div>
                            </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Regular Submenu */}
                  <AnimatePresence>
                    {item.submenu && activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onMouseEnter={() => setActiveSubmenu(item.name)}
                        onMouseLeave={() => !isNavigating && setActiveSubmenu(null)}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        {item.submenu.map((subitem, index) => (
                          <motion.div
                            key={subitem.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={subitem.href}
                              onClick={(e) => handleHashLink(e, subitem.href)}
                              className={`block px-4 py-3 text-sm transition-all ${
                                subitem.highlight 
                                  ? 'text-digiqo-accent font-medium hover:bg-digiqo-accent/10'
                                  : 'text-gray-700 hover:text-digiqo-primary hover:bg-gray-50'
                              }`}
                            >
                              <span className="flex items-center justify-between">
                                {subitem.name}
                                {subitem.highlight && <Sparkles className="w-3 h-3" />}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Luxury CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Kap Numérik Button */}
              <Link
                href="/kap-numerik-la-reunion"
              >
                <motion.button
                  className="px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-digiqo-secondary to-cyan-500 border-2 border-transparent rounded-full hover:shadow-lg hover:shadow-digiqo-secondary/40 hover:scale-110 active:scale-105 transition-all duration-300 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Kap Numérik
                </motion.button>
              </Link>

              {/* Contact Button */}
              <Link 
                href={navigation.cta.contact.href}
                onClick={(e) => handleHashLink(e, navigation.cta.contact.href)}
              >
                <motion.button
                  className="relative px-8 py-3 text-sm font-medium text-white rounded-full overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-primary"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: [-200, 200] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  
                  <span className="relative flex items-center space-x-2">
                    <span>{navigation.cta.contact.text}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Luxury Menu - White bars on bordeaux background */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center z-50 bg-digiqo-primary/20 backdrop-blur-sm rounded-lg"
            >
              <motion.div
                className="w-8 h-8 flex flex-col justify-center items-center"
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
              >
                <motion.span
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0,
                    width: isMenuOpen ? 24 : 28
                  }}
                  className="block h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={{ 
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1
                  }}
                  className="block h-0.5 w-6 bg-white rounded-full mt-1.5"
                />
                <motion.span
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                    width: isMenuOpen ? 24 : 20
                  }}
                  className="block h-0.5 bg-white rounded-full mt-1.5"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </nav>
    </motion.header>

    {/* Mobile Menu Outside of Header to Fix Positioning */}
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden fixed top-0 right-0 h-full w-[90%] max-w-md bg-white/95 backdrop-blur-2xl shadow-2xl z-[95] overflow-y-auto safe-top"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center p-6 pt-8 border-b border-gray-100">
              <OptimizedImage 
                src="/assets/logo1.png" 
                alt="Digiqo"
                width={150}
                height={50}
                className="h-12 w-auto"
                objectFit="contain"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-6 pt-4">
              <div className="space-y-6 mt-4">
                {navigation.main.map((item) => (
                  <div key={item.name}>
                    {item.megaMenu ? (
                      // Services with submenu
                      <>
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <span className="text-lg font-semibold text-gray-900">{item.name}</span>
                          <ChevronRight 
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              activeSubmenu === item.name ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-4 ml-4 space-y-3"
                            >
                              {item.megaMenu.categories[0].items.map(service => (
                                <Link
                                  key={service.href}
                                  href={service.href}
                                  onClick={() => {
                                    setIsMenuOpen(false)
                                    setActiveSubmenu(null)
                                  }}
                                  className="block py-2 text-gray-600 hover:text-digiqo-primary transition-colors"
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : item.submenu ? (
                      // Items with submenu (like L'AGENCE)
                      <>
                        <button
                          onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <span className="text-lg font-semibold text-gray-900">{item.name}</span>
                          <ChevronRight
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              activeSubmenu === item.name ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-4 ml-4 space-y-3"
                            >
                              {item.submenu.map(subitem => (
                                <Link
                                  key={subitem.href}
                                  href={subitem.href}
                                  onClick={(e) => {
                                    handleHashLink(e, subitem.href)
                                    setIsMenuOpen(false)
                                    setActiveSubmenu(null)
                                  }}
                                  className={`block py-2 transition-colors ${
                                    subitem.highlight
                                      ? 'text-digiqo-accent font-medium hover:text-digiqo-accent/80'
                                      : 'text-gray-600 hover:text-digiqo-primary'
                                  }`}
                                >
                                  {subitem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      // Regular links
                      <Link
                        href={item.href || '#'}
                        onClick={(e) => {
                          if (item.href) {
                            handleHashLink(e, item.href)
                          }
                          setIsMenuOpen(false)
                        }}
                        className={`block text-lg font-semibold ${
                          'highlight' in item && item.highlight
                            ? 'text-digiqo-accent hover:text-digiqo-accent/80'
                            : 'text-gray-900 hover:text-digiqo-primary'
                        } transition-colors`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Contact CTA */}
                <div className="pt-6 border-t border-gray-100">
                  <Link
                    href={navigation.cta.contact.href}
                    onClick={(e) => {
                      handleHashLink(e, navigation.cta.contact.href)
                      setIsMenuOpen(false)
                    }}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-bold rounded-2xl text-center"
                  >
                    {navigation.cta.contact.text}
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  )
}