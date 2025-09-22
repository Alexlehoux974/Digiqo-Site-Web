import Head from 'next/head'
import { motion } from 'framer-motion'
import { ANIMATION } from '@/lib/animation-constants'
import { HeroGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { Heart, ArrowRight } from 'lucide-react'

export default function MerciPage() {
  return (
    <>
      <Head>
        <title>Merci - Digiqo | Votre confiance nous honore</title>
        <meta name="description" content="Merci de votre confiance. Toute collaboration commence par un acte de confiance, et nous sommes honorés de la vôtre." />
        <meta property="og:title" content="Merci - Digiqo | Votre confiance nous honore" />
        <meta property="og:description" content="Merci de votre confiance. Toute collaboration commence par un acte de confiance, et nous sommes honorés de la vôtre." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/merci" />
        <link rel="canonical" href="https://digiqo.fr/merci" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen pt-56 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary">
          {/* Animated gradient orbs */}
          <HeroGradientOrbs />
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-30">
            </div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-4 text-center">
            <motion.div
              {...ANIMATION.entry.fadeInUpLarge}
              transition={{ duration: ANIMATION.duration.slow }}
              className="space-y-8"
            >
              {/* Animated icon */}
              <motion.div
                {...ANIMATION.entry.springIn}
                transition={{
                  ...ANIMATION.ease.spring,
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="inline-flex"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-digiqo-primary to-digiqo-primary/80 p-8 rounded-3xl border border-digiqo-primary/30">
                    <Heart className="w-16 h-16 text-digiqo-accent" />
                  </div>
                </div>
              </motion.div>

              {/* Title with animation */}
              <div className="space-y-6">
                <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-bold">
                  <span className="text-white">Toute collaboration commence</span>
                  <br />
                  <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">
                    par un acte de confiance.
                  </span>
                </h1>

                <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto px-2 sm:px-0">
                  Merci de nous l'accorder.
                </p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                {...ANIMATION.entry.fadeInUp}
                transition={{ delay: ANIMATION.delay.section * 2 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0 mt-12"
              >
                <motion.a
                  href="/blog"
                  whileHover={ANIMATION.hover.scale}
                  whileTap={ANIMATION.tap.scale}
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-digiqo-accent to-amber-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  Nos actus web, marketing et IA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="/agence"
                  whileHover={ANIMATION.hover.scale}
                  whileTap={ANIMATION.tap.scale}
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-digiqo-secondary/90 text-white font-bold rounded-2xl border border-digiqo-secondary/50 hover:border-digiqo-secondary shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  Découvrez notre agence
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Additional message */}
              <motion.div
                {...ANIMATION.entry.fadeInUp}
                transition={{ delay: ANIMATION.delay.section * 3 }}
                className="mt-16"
              >
                <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
                  Nous avons bien reçu votre message et notre équipe vous contactera dans les plus brefs délais.
                  <br className="hidden sm:block" />
                  En attendant, n'hésitez pas à explorer nos services et réalisations.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-digiqo-accent/30 rounded-full"
                initial={{
                  x: (i * 97) % 1920,
                  y: 1080,
                }}
                animate={{
                  y: -100,
                }}
                transition={{
                  duration: ANIMATION.duration.verySlow * (7 + (i % 7)),
                  repeat: Infinity,
                  delay: (i % 5),
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}