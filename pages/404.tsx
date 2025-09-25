import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Home, ArrowLeft, Phone } from 'lucide-react'
import { Button } from '../components/Button'
import { HeaderLuxury } from '../components/Header'
import { SEO } from '../components/SEO'
import Link from 'next/link'

export default function Custom404() {
  const router = useRouter()

  // Animation de la fusée
  const rocketAnimation = {
    initial: { y: 100, x: -100, rotate: 45 },
    animate: {
      y: [-100, -150, -100],
      x: [100, 150, 100],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  // Animation des étoiles
  const starAnimation = (delay: number) => ({
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  })

  // Animation des planètes
  const planetAnimation = (duration: number) => ({
    animate: {
      rotate: 360,
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "linear"
      }
    }
  })

  return (
    <>
      <SEO
        title="404 - Page non trouvée"
        description="Oops! La page que vous cherchez n'existe pas. Retournez à l'accueil de Digiqo, votre agence de marketing digital à La Réunion."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Page 404 - Erreur",
          "description": "Page d'erreur 404 du site Digiqo",
          "url": "https://www.digiqo.fr/404",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Digiqo",
            "url": "https://www.digiqo.fr"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://www.digiqo.fr"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "404"
              }
            ]
          }
        }}
      />

      <HeaderLuxury />

      <div className="min-h-screen bg-gradient-to-b from-digiqo-primary via-digiqo-primary/90 to-digiqo-primary/80 relative overflow-hidden pt-24">
        {/* Fond étoilé animé */}
        <div className="absolute inset-0">
          {/* Étoiles */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              {...starAnimation(Math.random() * 5)}
            />
          ))}

          {/* Grandes étoiles brillantes */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`big-star-${i}`}
              className="absolute w-2 h-2 bg-digiqo-accent rounded-full blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Planète 1 - Orange */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-digiqo-accent to-orange-600 shadow-2xl shadow-digiqo-accent/50"
            {...planetAnimation(60)}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />
            <div className="absolute top-4 left-6 w-8 h-6 bg-orange-700/50 rounded-full blur-lg" />
            <div className="absolute bottom-8 right-8 w-6 h-6 bg-orange-700/30 rounded-full blur-md" />
          </motion.div>

          {/* Planète 2 - Bleue */}
          <motion.div
            className="absolute bottom-32 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-digiqo-secondary to-blue-600 shadow-xl shadow-digiqo-secondary/50"
            {...planetAnimation(45)}
          >
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-transparent via-white/20 to-transparent" />
            <div className="absolute top-3 right-4 w-4 h-4 bg-blue-700/50 rounded-full blur-md" />
          </motion.div>

          {/* Planète 3 - Petite */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Fusée animée */}
        <motion.div
          className="absolute"
          {...rocketAnimation}
        >
          <div className="relative">
            {/* Corps de la fusée */}
            <div className="w-20 h-32 bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-full relative shadow-2xl">
              {/* Fenêtre */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 bg-digiqo-secondary rounded-full border-4 border-gray-300 shadow-inner" />
              {/* Logo Digiqo sur la fusée */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700">D</div>
              {/* Ailerons */}
              <div className="absolute -bottom-2 -left-4 w-0 h-0 border-t-[20px] border-t-red-600 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent" />
              <div className="absolute -bottom-2 -right-4 w-0 h-0 border-t-[20px] border-t-red-600 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent" />
            </div>
            
            {/* Flammes du moteur */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-12 h-16 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 rounded-b-full blur-sm" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-b-full" />
            </motion.div>

            {/* Traînée de fumée */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.5, 2],
                y: [0, 20, 40],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <div className="w-16 h-16 bg-white/30 rounded-full blur-xl" />
            </motion.div>
          </div>
        </motion.div>

        {/* Contenu principal */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* 404 en gros */}
            <motion.h1
              className="text-[150px] md:text-[200px] font-bold leading-none"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2 
              }}
            >
              <span className="bg-gradient-to-r from-white via-digiqo-accent to-white bg-clip-text text-transparent">
                404
              </span>
            </motion.h1>

            {/* Message d'erreur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Houston, nous avons un problème !
              </h2>
              <p className="text-xl text-white/80 mb-2">
                La page que vous cherchez s'est perdue dans l'espace digital.
              </p>
              <p className="text-lg text-white/60">
                Pas de panique, on va vous aider à retrouver votre trajectoire !
              </p>
            </motion.div>

            {/* Suggestions de pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-xl text-white/80 mb-4">Pages populaires :</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/services/publicite-google"
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  Publicité Google
                </Link>
                <Link
                  href="/services/sites-web"
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  Développement Web
                </Link>
                <Link
                  href="/services/seo"
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  SEO
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </motion.div>

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/')}
                className="group"
              >
                <Home className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Retour à la base
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.back()}
                className="group border border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Page précédente
              </Button>
            </motion.div>

            {/* Message humoristique */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-white/60 text-sm"
            >
              PS : Si vous êtes vraiment perdu, appelez-nous au{' '}
              <a href="tel:+262262025102" className="text-digiqo-accent hover:text-digiqo-secondary transition-colors inline-flex items-center gap-1">
                <Phone className="w-4 h-4" />
                +262 262 02 51 02
              </a>
              {' '}— on a le GPS marketing !
            </motion.p>
          </motion.div>
        </div>

        {/* Effet de particules flottantes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}