import { motion } from 'framer-motion'
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { SiTiktok, SiX } from 'react-icons/si'
import Link from 'next/link'
import { OptimizedImage } from '../ui/OptimizedImage'

const navigation = {
  services: [
    { name: 'Publicité en Ligne', href: '/services/publicite' },
    { name: 'Développement Web', href: '/services/dev-web' },
    { name: 'Community Management', href: '/services/community' },
    { name: 'Référencement SEO', href: '/services/seo' },
    { name: 'Visuels & Vidéos', href: '/services/video' },
    { name: 'Identité de Marque', href: '/services/identite' },
  ],
  company: [
    { name: "L'Agence", href: '/agence' },
    { name: 'Le Blog', href: '/blog' },
    { name: 'Digiqo Recrute !', href: '/recrutement' },
  ],
  legal: [
    { name: 'Mentions Légales', href: '/mentions-legales' },
    { name: 'CGV', href: '/conditions-generales-vente' },
    { name: 'CGU', href: '/conditions-generales-utilisation' },
    { name: 'Politique de Confidentialité', href: '/politique-confidentialite' },
    { name: 'Politique de Cookies', href: '/politique-cookies' },
  ],
  social: [
    { name: 'TikTok', href: 'https://www.tiktok.com/@digiqo', icon: SiTiktok },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/digiqo', icon: Linkedin },
    { name: 'YouTube', href: 'https://www.youtube.com/@digiqo_', icon: Youtube },
    { name: 'Instagram', href: 'https://www.instagram.com/digiqo_', icon: Instagram },
    { name: 'X', href: 'https://twitter.com/digiqo', icon: SiX },
    { name: 'Facebook', href: 'https://www.facebook.com/digiqo', icon: Facebook },
  ],
}

export const Footer = () => {
  const currentYear = 2024

  return (
    <footer className="relative bg-gradient-to-b from-cyan-600 via-cyan-500 to-cyan-400 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-digiqo-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="mb-6">
                <Link href="/">
                  <OptimizedImage
                    src="/assets/logo1.png"
                    alt="Digiqo Logo"
                    width={200}
                    height={80}
                    className="h-20 w-auto"
                  />
                </Link>
              </div>
              <p className="text-white font-semibold mb-6 text-lg">
                Votre partenaire digital depuis 2020
              </p>
              <div className="space-y-3">
                <a href="tel:+262262025102" className="flex items-center gap-3 text-white font-medium hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">+262 262 02 51 02</span>
                </a>
                <a href="mailto:contact@digiqo.fr" className="flex items-center gap-3 text-white font-medium hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">contact@digiqo.fr</span>
                </a>
                <div className="flex items-start gap-3 text-white font-medium">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="font-semibold">Saint-Denis, La Réunion</span>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-bold text-lg mb-6 text-white">Nos Services</h3>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white font-medium hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-digiqo-accent rounded-full group-hover:w-2 transition-all duration-200" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-bold text-lg mb-6 text-white">L'Entreprise</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white font-medium hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-digiqo-accent rounded-full group-hover:w-2 transition-all duration-200" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-bold text-lg mb-6 text-white">Restez Connecté</h3>
              
              {/* Newsletter */}
              <div className="mb-8">
                <p className="text-white font-medium mb-4">Recevez nos dernières actualités</p>
                <form className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-digiqo-accent transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-digiqo-accent to-digiqo-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-digiqo-accent/20 transition-all duration-300 transform hover:scale-105"
                  >
                    S'abonner
                  </button>
                </form>
              </div>

              {/* Social links */}
              <div>
                <p className="text-white font-medium mb-4">Suivez-nous</p>
                <div className="flex flex-wrap gap-3">
                  {navigation.social.map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-digiqo-accent rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-white font-medium text-sm text-center md:text-left">
                © {currentYear} Digiqo. Tous droits réservés. Made with 
                <span className="text-digiqo-accent mx-1">♥</span> 
                in La Réunion 🇷🇪
              </div>

              {/* Legal links */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {navigation.legal.map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    <Link
                      href={item.href}
                      className="text-white font-medium hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                    {index < navigation.legal.length - 1 && (
                      <span className="ml-4 text-white/20">|</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}