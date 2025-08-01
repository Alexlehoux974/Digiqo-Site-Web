import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { OptimizedImage } from '../ui/OptimizedImage'
import { Instagram, Facebook, Linkedin, Youtube, Phone } from 'lucide-react'
import { SiTiktok, SiX } from 'react-icons/si'

const navigation = {
  main: [
    { name: 'ACCUEIL', href: '/' },
    { name: 'DEVIS GRATUITS', href: '/devis', highlight: true },
    { 
      name: 'Nos services', 
      href: '#',
      submenu: [
        { name: 'Publicité en Ligne (SMA/SEA)', href: '/services/publicite' },
        { name: 'Production Vidéo', href: '/services/video' },
        { name: 'Développement Web', href: '/services/dev-web' },
        { name: 'Référencement (SEO)', href: '/services/seo' },
        { name: 'Community Management', href: '/services/community' },
        { name: 'Identité de Marque', href: '/services/identite' },
        { name: 'Forfaits SiteKeeper', href: '/services/sitekeeper' },
        { name: 'Audit Gratuit', href: '/services/audit' },
      ]
    },
    { 
      name: "L'AGENCE", 
      href: '#',
      submenu: [
        { name: 'Découvrez notre Agence', href: '/agence' },
        { name: 'Digiqo Recrute !', href: '/recrutement' },
        { name: 'Le Blog', href: '/blog' },
        { name: 'F.A.Q', href: '/faq' },
      ]
    },
    { name: 'actus', href: '/actualites' },
    { name: 'Contact', href: '/contact' },
    { name: 'F.A.Q', href: '/faq' },
  ],
  actions: [
    { name: 'Être rappelé(e)', href: '/rappel', variant: 'secondary' },
    { name: 'Kap Numérik', href: '/kap-numerik', variant: 'secondary' },
    { name: 'CONTACT', href: '/contact', variant: 'primary' },
  ]
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  
  useEffect(() => {
    console.log('Header mounted, isMenuOpen:', isMenuOpen)
    // Ajouter un log pour déboguer le menu mobile
    if (isMenuOpen) {
      console.log('Menu mobile ouvert')
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] shadow-lg">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-lg border-b border-digiqo-primary/10" />
      
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <OptimizedImage 
                src="/assets/logo1.png" 
                alt="Digiqo - Ladi Lafé Zot Pub!" 
                width={200}
                height={60}
                priority
                className="h-16 w-auto"
                objectFit="contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.main.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                    ${item.highlight 
                      ? 'text-digiqo-accent hover:bg-digiqo-accent/10 hover:text-digiqo-primary' 
                      : 'text-gray-700 hover:text-digiqo-primary hover:bg-digiqo-primary/5'
                    }`}
                >
                  {item.name}
                  {item.submenu && (
                    <svg className="ml-1 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      onMouseEnter={() => setActiveSubmenu(item.name)}
                      onMouseLeave={() => setActiveSubmenu(null)}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-digiqo-primary/10 overflow-hidden"
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-3 text-sm text-gray-700 hover:text-digiqo-primary hover:bg-digiqo-primary/5 transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Phone, Social Links and Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Phone */}
            <a href="tel:+262262025102" className="flex items-center gap-2 text-gray-700 hover:text-digiqo-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+262 262 02 51 02</span>
            </a>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <a
                href="https://www.instagram.com/digiqo_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-digiqo-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/digiqo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-digiqo-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@digiqo_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-digiqo-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/digiqo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-digiqo-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@digiqo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-digiqo-primary transition-colors"
                aria-label="TikTok"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/digiqo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-digiqo-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            {navigation.actions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                  ${action.variant === 'primary'
                    ? 'bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white shadow-lg hover:shadow-xl hover:shadow-digiqo-primary/20'
                    : 'text-digiqo-primary border border-digiqo-primary/20 hover:bg-digiqo-primary/5 hover:border-digiqo-primary/40'
                  }`}
              >
                {action.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              console.log('Menu button clicked, current state:', isMenuOpen);
              setIsMenuOpen(!isMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-digiqo-primary/5 hover:text-digiqo-primary relative z-[150]"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </nav>
      
      {/* Mobile menu - Moved inside header for proper z-index context */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/20 z-[110]"
              onClick={() => {
                console.log('Overlay clicked, closing menu');
                setIsMenuOpen(false);
              }}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed top-[80px] left-0 right-0 bg-white backdrop-blur-lg border-b border-digiqo-primary/10 shadow-xl z-[120] overflow-visible"
              style={{ maxHeight: 'calc(100vh - 80px)' }}
            >
              <div className="px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.main.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-base font-medium rounded-lg
                        ${item.highlight 
                          ? 'text-digiqo-accent' 
                          : 'text-gray-700'
                        }`}
                    >
                      {item.name}
                      <svg 
                        className={`w-4 h-4 transition-transform ${activeSubmenu === item.name ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 text-base font-medium rounded-lg
                        ${item.highlight 
                          ? 'text-digiqo-accent' 
                          : 'text-gray-700'
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-digiqo-primary"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2 border-t border-gray-200">
                {navigation.actions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-center text-base font-medium rounded-lg
                      ${action.variant === 'primary'
                        ? 'bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white'
                        : 'text-digiqo-primary border border-digiqo-primary/20'
                      }`}
                  >
                    {action.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}