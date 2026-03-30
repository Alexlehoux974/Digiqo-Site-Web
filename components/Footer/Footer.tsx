import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { SiTiktok, SiX } from 'react-icons/si'
import Link from 'next/link'

const navigation = {
  services: [
    { name: 'Publicité en ligne', href: '/services/publicite-en-ligne' },
    { name: 'Développement Web', href: '/services/sites-web' },
    { name: 'Community Management', href: '/services/community-management' },
    { name: 'Référencement SEO', href: '/services/seo' },
    { name: 'Créatifs Publicitaires', href: '/services/creatifs' },
    { name: 'Identité de Marque', href: '/services/identite-de-marque' },
    { name: 'Maintenance Web', href: '/services/sitekeeper' },
    { name: 'Créateurs de Contenu', href: '/createurs' },
    { name: 'Audit Digital Gratuit', href: '/audit' },
  ],
  company: [
    { name: "L'Agence", href: '/agence' },
    { name: 'Notre Histoire', href: '/agence#histoire' },
    { name: 'Nos Valeurs', href: '/agence#valeurs' },
    { name: "L'Équipe", href: '/agence#equipe' },
    { name: 'Digicademy', href: '/digicademy' },
    { name: 'FAQ', href: '/?instant=true#faq' },
    { name: 'Digiqo Recrute !', href: '/digiqo-recrute' },
    { name: 'Partenariats & Sponsoring', href: '/partenariats' },
    { name: 'Glossaire Digiqo', href: '/glossaire' },
    { name: 'Résilier ou mettre en pause votre abonnement SMA', href: '/desabonnement' },
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
  const currentYear = new Date().getFullYear()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || loading) return
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      router.push('/merci')
    } catch {
      router.push('/merci')
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Modern gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-digiqo-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-x-12 lg:gap-y-8">
            {/* Company info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="mb-8 flex flex-col items-center">
                <Link href="/" className="block">
                  <img
                    src="/android-chrome-512x512.png"
                    alt="Digiqo Logo"
                    width={120}
                    height={120}
                    className="h-28 w-28 object-contain mx-auto"
                  />
                </Link>
              </div>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed text-center">
                Votre partenaire digital depuis 2020
              </p>
              <div className="space-y-3">
                <a href="tel:+262262025102" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <Phone className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+262 262 02 51 02</span>
                </a>
                <a href="mailto:contact@digiqo.fr" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors group">
                  <Mail className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">contact@digiqo.fr</span>
                </a>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-500" />
                  <span className="text-sm">Saint-Denis, La Réunion</span>
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
              <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6">Nos Services</h3>
              <ul className="space-y-2.5">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 text-sm hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-cyan-500/50 rounded-full group-hover:w-2 group-hover:bg-cyan-400 transition-all duration-200" />
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
              <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6">L'Entreprise</h3>
              <ul className="space-y-2">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 text-sm hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-cyan-500/50 rounded-full group-hover:w-2 group-hover:bg-cyan-400 transition-all duration-200" />
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
              <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-6">Restez Connecté</h3>
              
              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-gray-300 text-sm mb-3">Recevez nos dernières actualités</p>
                <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-2.5 bg-white/5 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50"
                  >
                    {loading ? 'Envoi...' : "S'abonner"}
                  </button>
                  <p className="text-xs text-gray-500">
                    En vous inscrivant, vous acceptez que vos données soient traitées conformément à notre{' '}
                    <Link href="/politique-confidentialite" className="underline hover:text-gray-400">
                      politique de confidentialité
                    </Link>.
                  </p>
                </form>
              </div>

              {/* Social links */}
              <div>
                <p className="text-gray-300 text-sm mb-3">Suivez-nous</p>
                <div className="flex flex-wrap gap-2">
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
                        className="w-11 h-11 bg-white/5 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
                      >
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="text-gray-400 text-xs text-center md:text-left">
                © {currentYear} Digiqo. Tous droits réservés. Made with
                <span className="text-cyan-500 mx-1">♥</span>
                in La Réunion 🇷🇪
              </div>

              {/* Legal links */}
              <div className="flex flex-wrap justify-center gap-1 text-xs">
                {navigation.legal.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 px-2"
                    >
                      {item.name}
                    </Link>
                    <span className="text-gray-700">•</span>
                  </div>
                ))}
                <button
                  onClick={() => {
                    localStorage.removeItem('cookieConsent')
                    window.dispatchEvent(new Event('cookieConsentUpdate'))
                    window.location.reload()
                  }}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 px-2 cursor-pointer"
                >
                  Gérer mes cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}