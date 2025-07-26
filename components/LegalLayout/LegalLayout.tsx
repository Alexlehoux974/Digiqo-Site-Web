import { Header } from '../Header'
import { Footer } from '../Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface LegalLayoutProps {
  children: React.ReactNode
  title: string
  lastUpdated?: string
}

export const LegalLayout = ({ children, title, lastUpdated }: LegalLayoutProps) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-digiqo-primary hover:text-digiqo-primary-light transition-colors mb-8"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Retour à l'accueil
            </Link>

            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-digiqo-primary mb-8">
                {title}
              </h1>
              
              {lastUpdated && (
                <p className="text-sm text-gray-600 mb-8 italic">
                  Dernière mise à jour : {lastUpdated}
                </p>
              )}

              <div className="prose prose-lg max-w-none">
                {children}
              </div>
            </div>

            <div className="mt-12 bg-digiqo-gray-light rounded-lg p-6">
              <h3 className="text-lg font-semibold text-digiqo-primary mb-4">
                Pages légales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/mentions-legales"
                  className="text-digiqo-secondary hover:text-digiqo-secondary-dark transition-colors"
                >
                  Mentions légales
                </Link>
                <Link
                  href="/politique-confidentialite"
                  className="text-digiqo-secondary hover:text-digiqo-secondary-dark transition-colors"
                >
                  Politique de confidentialité
                </Link>
                <Link
                  href="/politique-cookies"
                  className="text-digiqo-secondary hover:text-digiqo-secondary-dark transition-colors"
                >
                  Politique de cookies
                </Link>
                <Link
                  href="/conditions-generales-utilisation"
                  className="text-digiqo-secondary hover:text-digiqo-secondary-dark transition-colors"
                >
                  CGU
                </Link>
                <Link
                  href="/conditions-generales-vente"
                  className="text-digiqo-secondary hover:text-digiqo-secondary-dark transition-colors"
                >
                  CGV
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}