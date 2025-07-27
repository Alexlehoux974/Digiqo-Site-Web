import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { OptimizedImage } from '../ui/OptimizedImage'

const navigation = {
  main: [
    { name: 'ACCUEIL', href: '/' },
    { name: 'DEVIS GRATUITS', href: '/devis', highlight: true },
    { 
      name: 'Nos services', 
      href: '#',
      submenu: [
        { name: 'Publicité en Ligne (SMA/SEA)', href: '/services/publicite' },
        { name: 'Visuels et vidéos publicitaires', href: '/services/visuels' },
        { name: 'Développement Web', href: '/services/developpement' },
        { name: 'Référencement (SEO)', href: '/services/seo' },
        { name: 'Community Management', href: '/services/community' },
        { name: 'Identité de Marque', href: '/services/identite' },
        { name: 'Forfaits SiteKeeper & ShopKeeper', href: '/services/forfaits' },
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
    console.log('Header mounted')
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] shadow-lg">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-lg border-b border-digiqo-primary/10" />
      
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <OptimizedImage 
                src="/assets/logo1.png" 
                alt="Digiqo - Ladi Lafé Zot Pub!" 
                width={160}
                height={48}
                priority
                className="h-12 w-auto"
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

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-digiqo-primary/5 hover:text-digiqo-primary"
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

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="py-4 space-y-2">
                {navigation.main.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-base font-medium rounded-lg
                        ${item.highlight 
                          ? 'text-digiqo-accent' 
                          : 'text-gray-700'
                        }`}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-gray-600"
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
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}