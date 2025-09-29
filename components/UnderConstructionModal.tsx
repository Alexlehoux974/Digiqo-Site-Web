import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Construction, Home } from 'lucide-react'
import Link from 'next/link'

export function UnderConstructionModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Afficher le modal après un court délai pour que l'animation soit visible
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay non-cliquable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
            style={{ pointerEvents: 'all' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            style={{ pointerEvents: 'all' }}
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
              {/* Effet de gradient en arrière-plan */}
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/5 to-digiqo-accent/5" />

              {/* Contenu */}
              <div className="relative space-y-6 text-center">
                {/* Icône animée */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-flex"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl flex items-center justify-center">
                    <Construction className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Titre */}
                <h2 className="text-3xl font-bold text-gray-900">
                  Page en construction
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600">
                  Cette section est actuellement en cours de développement.
                  Nous travaillons dur pour vous offrir bientôt une expérience complète.
                </p>

                {/* Message supplémentaire */}
                <div className="bg-digiqo-primary/5 rounded-xl p-4">
                  <p className="text-sm text-digiqo-primary font-medium">
                    Revenez prochainement pour découvrir nos nouvelles offres !
                  </p>
                </div>

                {/* Bouton retour */}
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Home className="w-5 h-5" />
                    Retour à l'accueil
                  </motion.button>
                </Link>

                {/* Note de non-fermeture */}
                <p className="text-xs text-gray-400 mt-4">
                  Cette fenêtre ne peut pas être fermée pour le moment
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}