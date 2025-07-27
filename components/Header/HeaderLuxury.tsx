import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
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
  Star,
  Award,
  Clock,
  MessageCircle
} from 'lucide-react'


// Luxury navigation data
const navigation = {
  topBar: {
    left: [
      { icon: Phone, text: '0692 73 11 11', href: 'tel:0692731111' },
      { icon: Mail, text: 'contact@digiqo.fr', href: 'mailto:contact@digiqo.fr' }
    ],
    right: [
      { icon: Clock, text: 'Lun-Ven 9h-18h' },
      { icon: MapPin, text: 'Saint-Denis, La Réunion', href: '/#contact' }
    ],
    social: [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/digiqo' },
      { name: 'Instagram', href: 'https://www.instagram.com/digiqo.re' },
      { name: 'Facebook', href: 'https://www.facebook.com/digiqo.re' }
    ]
  },
  main: [
    { 
      name: 'ACCUEIL', 
      href: '/',
      luxuryIcon: Star
    },
    { 
      name: 'SERVICES', 
      href: '#',
      luxuryIcon: Award,
      megaMenu: {
        featured: {
          title: 'Service Premium',
          subtitle: 'Notre expertise à votre service',
          image: '/assets/services-featured.jpg',
          href: '/services/publicite'
        },
        categories: [
          {
            title: 'Marketing Digital',
            items: [
              { 
                name: 'Publicité en Ligne', 
                href: '/services/publicite',
                description: 'Campagnes SMA/SEA haute performance',
                icon: TrendingUp,
                badge: 'ROI Garanti'
              },
              { 
                name: 'Community Management', 
                href: '/services/community',
                description: 'Votre présence sociale optimisée',
                icon: Users
              },
              { 
                name: 'Référencement SEO', 
                href: '/services/seo',
                description: 'Dominez les résultats Google',
                icon: Search,
                badge: 'Top 3'
              }
            ]
          },
          {
            title: 'Création & Design',
            items: [
              { 
                name: 'Identité de Marque', 
                href: '/services/identite',
                description: 'Votre image de marque unique',
                icon: Sparkles,
                premium: true
              },
              { 
                name: 'Visuels & Vidéos', 
                href: '/services/video',
                description: 'Contenus visuels impactants',
                icon: Palette
              },
              { 
                name: 'Développement Web', 
                href: '/services/dev-web',
                description: 'Sites web haute couture',
                icon: Code,
                badge: 'Sur mesure'
              }
            ]
          },
          {
            title: 'Support & Conseil',
            items: [
              { 
                name: 'Forfaits SiteKeeper', 
                href: '/services/sitekeeper',
                description: 'Maintenance premium garantie',
                icon: Shield
              },
              { 
                name: 'Audit Gratuit', 
                href: '/services/audit',
                description: 'Analyse complète offerte',
                icon: Zap,
                highlight: true
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
      name: 'RÉALISATIONS', 
      href: '/#case-studies',
      badge: 'New'
    },
    { 
      name: 'L\'AGENCE', 
      href: '/agence',
      submenu: [
        { name: 'Notre Histoire', href: '/agence#histoire' },
        { name: 'L\'Équipe', href: '/agence#equipe' },
        { name: 'Nos Valeurs', href: '/agence#valeurs' },
        { name: 'Rejoignez-nous', href: '/recrutement', highlight: true }
      ]
    },
    { name: 'FAQ', href: '/#faq' }
  ],
  cta: {
    contact: { text: 'Contact', href: '/#contact' }
  }
}

export const HeaderLuxury = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 100], [0, -40])
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85])
  
  const springConfig = { stiffness: 400, damping: 30 }
  const headerYSpring = useSpring(headerY, springConfig)
  const headerScaleSpring = useSpring(headerScale, springConfig)
  const logoScaleSpring = useSpring(logoScale, springConfig)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Smooth scroll to section
  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle links that start with /#
    if (href.startsWith('/#')) {
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
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{ 
        y: headerYSpring,
        scale: headerScaleSpring
      }}
    >
      {/* Ultra-luxury glass effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/30" />
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
          <div className="flex items-center justify-between h-24">
            {/* Animated Logo */}
            <Link href="/" className="relative">
              <motion.div
                style={{ scale: logoScaleSpring }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <OptimizedImage 
                  src="/assets/logo1.png" 
                  alt="Digiqo - Excellence Digitale" 
                  width={200}
                  height={60}
                  priority
                  className="h-16 w-auto relative z-10"
                  objectFit="contain"
                />
                
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
            <div className="hidden lg:flex items-center space-x-2">
              {navigation.main.map((item) => (
                <div key={item.name} className="relative">
                  <motion.button
                    onMouseEnter={() => (item.megaMenu || item.submenu) && setActiveSubmenu(item.name)}
                    onMouseLeave={() => !isNavigating && setActiveSubmenu(null)}
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault()
                        const target = document.querySelector(item.href.substring(1))
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth' })
                        }
                      } else if (item.href !== '#') {
                        window.location.href = item.href
                      }
                    }}
                    className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-digiqo-primary transition-all relative group"
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
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-digiqo-accent text-white rounded-full">
                          {item.badge}
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[900px]"
                      >
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                            {/* Premium gradient border */}
                            <div className="absolute inset-0 p-[1px] bg-gradient-to-br from-digiqo-primary/20 via-transparent to-digiqo-accent/20 rounded-2xl" />
                            
                            <div className="relative bg-white rounded-2xl">
                              {/* Featured section */}
                              {item.megaMenu.featured && (
                                <div className="p-8 bg-gradient-to-br from-digiqo-primary/5 to-digiqo-accent/5 border-b border-gray-100">
                                  <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                      {item.megaMenu.featured.title}
                                    </h3>
                                    <p className="text-gray-600">
                                      {item.megaMenu.featured.subtitle}
                                    </p>
                                  </div>
                                </div>
                              )}
                              
                              {/* Services grid */}
                              <div className="grid grid-cols-3 gap-8 p-8">
                                {item.megaMenu.categories.map((category) => (
                                  <div key={category.title}>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                      {category.title}
                                    </h4>
                                    <div className="space-y-3">
                                      {category.items.map((service) => {
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
                                              ('premium' in service && service.premium) 
                                                ? 'bg-gradient-to-r from-digiqo-primary/5 to-digiqo-accent/5 border border-digiqo-primary/10' 
                                                : hoveredService === service.name
                                                ? 'bg-gray-50'
                                                : ''
                                            }`}
                                          >
                                            <div className="flex items-start space-x-3">
                                              <motion.div 
                                                className={`p-2 rounded-lg ${
                                                  ('premium' in service && service.premium)
                                                    ? 'bg-gradient-to-br from-digiqo-primary to-digiqo-accent text-white'
                                                    : 'bg-gray-100 text-gray-600 group-hover:bg-digiqo-primary/10 group-hover:text-digiqo-primary'
                                                } transition-all`}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                              >
                                                <Icon className="w-4 h-4" />
                                              </motion.div>
                                              <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                  <h5 className="font-semibold text-gray-900 group-hover:text-digiqo-primary transition-colors">
                                                    {service.name}
                                                  </h5>
                                                  {('badge' in service && service.badge) && (
                                                    <span className="px-2 py-0.5 text-[10px] font-bold bg-digiqo-accent/10 text-digiqo-accent rounded-full">
                                                      {service.badge}
                                                    </span>
                                                  )}
                                                  {('premium' in service && service.premium) && (
                                                    <Sparkles className="w-3 h-3 text-digiqo-accent" />
                                                  )}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-0.5">
                                                  {service.description}
                                                </p>
                                              </div>
                                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-digiqo-accent opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </div>
                                          </Link>
                                        )
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
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
                  className="px-6 py-2.5 text-sm font-medium text-digiqo-secondary border-2 border-digiqo-secondary/20 rounded-full hover:border-digiqo-secondary/40 hover:bg-digiqo-secondary/5 transition-all"
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

            {/* Mobile Luxury Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center"
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
                  className="block h-0.5 bg-gradient-to-r from-digiqo-primary to-digiqo-accent rounded-full"
                />
                <motion.span
                  animate={{ 
                    opacity: isMenuOpen ? 0 : 1,
                    scaleX: isMenuOpen ? 0 : 1
                  }}
                  className="block h-0.5 w-6 bg-gradient-to-r from-digiqo-primary to-digiqo-accent rounded-full mt-1.5"
                />
                <motion.span
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                    width: isMenuOpen ? 24 : 20
                  }}
                  className="block h-0.5 bg-gradient-to-r from-digiqo-primary to-digiqo-accent rounded-full mt-1.5"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}