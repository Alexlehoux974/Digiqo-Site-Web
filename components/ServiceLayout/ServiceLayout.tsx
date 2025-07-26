import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react'

interface ServiceLayoutProps {
  children: ReactNode
}

export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-digiqo-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Retour à l'accueil</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <a href="tel:+262693737297" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-digiqo-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>0693 73 72 97</span>
              </a>
              <Link href="/contact" className="px-6 py-2 bg-digiqo-accent text-white font-medium rounded-full hover:bg-digiqo-accent-dark transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Digiqo</h3>
              <p className="text-gray-400 mb-4">
                Votre partenaire digital à La Réunion pour une croissance exponentielle.
              </p>
              <div className="space-y-2">
                <a href="tel:+262693737297" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  0693 73 72 97
                </a>
                <a href="mailto:contact@digiqo.fr" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  contact@digiqo.fr
                </a>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  Saint-Denis, La Réunion
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link href="/services/publicite" className="text-gray-400 hover:text-white transition-colors">Publicité en ligne</Link></li>
                <li><Link href="/services/dev-web" className="text-gray-400 hover:text-white transition-colors">Développement Web</Link></li>
                <li><Link href="/services/community" className="text-gray-400 hover:text-white transition-colors">Community Management</Link></li>
                <li><Link href="/services/seo" className="text-gray-400 hover:text-white transition-colors">Référencement SEO</Link></li>
                <li><Link href="/services/video" className="text-gray-400 hover:text-white transition-colors">Visuels & Vidéos</Link></li>
                <li><Link href="/services/identite" className="text-gray-400 hover:text-white transition-colors">Identité de Marque</Link></li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="font-bold mb-4">Prêt à démarrer ?</h4>
              <p className="text-gray-400 mb-4">
                Transformez votre présence digitale dès aujourd'hui.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-digiqo-accent text-white font-bold rounded-full hover:bg-digiqo-accent-dark transition-all duration-300"
              >
                Demander un devis gratuit
              </motion.a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Digiqo. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}