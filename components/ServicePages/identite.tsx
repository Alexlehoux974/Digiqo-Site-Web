import Head from 'next/head'
import { motion } from 'framer-motion'
import { Palette, ArrowRight, Sparkles, CheckCircle2, Layers, Brush, Gem, Package, HeartHandshake, Shield, Clock, PaintBucket, CheckSquare, Handshake, Printer } from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { HeroGradientOrbs } from '@/components/ui/animated-gradient-orb'

// Floating design elements component
const FloatingDesignElement = ({ delay = 0, index = 0 }) => {
  const shapes = ['circle', 'square', 'triangle', 'hexagon']
  const shape = shapes[index % shapes.length]
  
  const renderShape = () => {
    switch(shape) {
      case 'circle':
        return <div className="w-full h-full rounded-full bg-gradient-to-br from-digiqo-primary/20 to-digiqo-accent/20" />
      case 'square':
        return <div className="w-full h-full bg-gradient-to-br from-digiqo-accent/20 to-amber-500/20" />
      case 'triangle':
        return <div className="w-full h-full bg-gradient-to-br from-digiqo-secondary/20 to-cyan-500/20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      case 'hexagon':
        return <div className="w-full h-full bg-gradient-to-br from-digiqo-primary/20 to-digiqo-accent/20" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
    }
  }

  return (
    <motion.div
      className="absolute w-8 h-8"
      initial={{
        x: (index * 237) % 1920,
        y: (index * 341) % 1080,
        rotate: 0,
        scale: 0,
      }}
      animate={{
        y: [null, -((index * 97) % 200) - 100],
        x: [null, ((index * 73) % 200) - 100],
        rotate: [0, 360],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: ANIMATION.particles.duration.min + (index % (ANIMATION.particles.duration.max - ANIMATION.particles.duration.min)),
        repeat: Infinity,
        delay: delay,
        ease: ANIMATION.ease.default,
      }}
    >
      {renderShape()}
    </motion.div>
  )
}

export default function IdentitePage() {
  const seoData = servicesSEO['identite-marque-reunion']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Identité de Marque La Réunion',
    provider: {
      '@type': 'Organization',
      name: 'Digiqo',
      url: 'https://digiqo.fr'
    },
    areaServed: {
      '@type': 'Place',
      name: 'La Réunion'
    },
    description: seoData.description,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'EUR',
      name: 'Consultation Gratuite',
      description: 'Analyse de votre image de marque actuelle et recommandations personnalisées'
    },
    serviceType: 'Brand Identity Design',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Identité de Marque',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Création de Logo',
            description: 'Design de logo professionnel et mémorable'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Charte Graphique',
            description: 'Guide complet de votre identité visuelle'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Déclinaisons Visuelles',
            description: 'Adaptation sur tous vos supports de communication'
          }
        }
      ]
    }
  }

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <meta property="og:image" content="https://digiqo.fr/og-identite.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section avec glassmorphism et animations sophistiquées */}
      <section className="relative min-h-[90vh] pt-32 flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary">
        {/* 3D Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" 
            style={{ perspective: '1000px' }} 
          />
        </div>

        {/* Animated gradient orbs avec effet glassmorphism */}
        <HeroGradientOrbs />

        {/* Floating design elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <FloatingDesignElement key={i} delay={i * 0.5} index={i} />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* 3D Rotating Icon with glassmorphism */}
          <motion.div
            {...ANIMATION.entry.springIn}
            transition={{ 
              ...ANIMATION.ease.spring,
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
            className="inline-flex mb-8"
          >
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                rotateZ: [0, 10, 0, -10, 0],
              }}
              transition={{
                rotateY: { duration: ANIMATION.duration.verySlow * 13, repeat: Infinity, ease: ANIMATION.ease.linear },
                rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-3xl blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                <Palette className="w-16 h-16 text-white relative z-10" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            {...ANIMATION.entry.fadeInUpLarge}
            transition={{ delay: ANIMATION.delay.section + 0.1, duration: ANIMATION.duration.slow }}
            className="space-y-8"
          >
            {/* Title with gradient animation */}
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white">Identité de</span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-accent bg-clip-text text-transparent animate-gradient bg-300"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: ANIMATION.duration.verySlow * 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Marque Premium
              </motion.span>
            </h1>

            {/* Descriptions with glassmorphism cards */}
            <div className="max-w-4xl mx-auto space-y-6">
              <motion.div
                {...ANIMATION.entry.fadeInUp}
                transition={{ delay: ANIMATION.delay.section * 2 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <p className="text-xl md:text-2xl text-white/80">
                  Créez une <span className="text-digiqo-accent font-bold">identité visuelle unique</span> et mémorable 
                  avec nos services de conception de logos et de chartes graphiques haute performance.
                </p>
              </motion.div>

              <motion.div
                {...ANIMATION.entry.fadeInUp}
                transition={{ delay: ANIMATION.delay.section * 2.3 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <p className="text-lg text-white/70">
                  Votre image de marque est votre <span className="text-digiqo-accent">première impression</span>. 
                  Nous la rendons inoubliable avec une identité visuelle qui raconte votre histoire 
                  et connecte avec votre audience à La Réunion.
                </p>
              </motion.div>
            </div>

            {/* CTA Buttons avec glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ANIMATION.delay.section * 2.7 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <motion.a
                href={generateContactUrl({ 
                  service: 'identite',
                  description: 'Je souhaite créer mon identité de marque' 
                })}
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-2xl font-bold transition-all duration-300"
              >
                {/* Gradient background with animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-digiqo-primary to-digiqo-accent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-digiqo-accent to-digiqo-accent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                
                {/* Content */}
                <span className="relative z-10 text-white">Démarrer mon projet</span>
                <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#processus"
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Découvrir le processus
                <Sparkles className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pourquoi l'identité de marque Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pourquoi une <span className="text-digiqo-primary">identité forte</span> est cruciale ?
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              À La Réunion, où le bouche-à-oreille est roi, votre image de marque est votre meilleur ambassadeur. 
              Une identité visuelle professionnelle augmente votre crédibilité de 75%.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger }}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-digiqo-primary/10 hover:border-digiqo-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div 
                  className="relative w-24 h-24 mx-auto mb-6"
                  whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: 360 }}
                  transition={{ duration: ANIMATION.duration.normal }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="relative w-full h-full bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">5s</span>
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Première Impression</h3>
                <p className="text-digiqo-primary/70">Il faut seulement 5 secondes pour qu'un client se fasse une opinion sur votre marque</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 2 }}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-digiqo-primary/10 hover:border-digiqo-accent/20">
                <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div 
                  className="relative w-24 h-24 mx-auto mb-6"
                  whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: -360 }}
                  transition={{ duration: ANIMATION.duration.normal }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-amber-500 rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="relative w-full h-full bg-gradient-to-br from-digiqo-accent to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">+23%</span>
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Valeur Perçue</h3>
                <p className="text-digiqo-primary/70">Une identité cohérente augmente la valeur perçue de vos produits et services</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 3 }}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-digiqo-primary/10 hover:border-digiqo-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div 
                  className="relative w-24 h-24 mx-auto mb-6"
                  whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: 360 }}
                  transition={{ duration: ANIMATION.duration.normal }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary to-cyan-500 rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="relative w-full h-full bg-gradient-to-br from-digiqo-secondary to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">x3.5</span>
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">Reconnaissance</h3>
                <p className="text-digiqo-primary/70">Une marque cohérente est 3.5x plus mémorable qu'une marque incohérente</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre Processus Section avec glassmorphism */}
      <section id="processus" className="py-24 bg-gradient-to-br from-white via-digiqo-primary/5 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-digiqo-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-digiqo-accent/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Notre <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Processus Créatif</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              De la découverte à la livraison, chaque étape est pensée pour créer une identité qui vous ressemble
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-digiqo-primary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-primary/20">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: 360 }}
                    transition={{ duration: ANIMATION.duration.normal }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl blur-lg opacity-50" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-digiqo-primary to-digiqo-accent text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      1
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      Découverte & Stratégie
                      <Gem className="w-6 h-6 text-digiqo-primary" />
                    </h3>
                    <p className="text-digiqo-primary/70 mb-4">
                      Nous plongeons dans l'univers de votre entreprise pour comprendre vos valeurs, 
                      votre vision et votre positionnement unique sur le marché réunionnais.
                    </p>
                    <ul className="space-y-2 text-digiqo-primary/70">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-primary" />
                        Analyse de votre marché et concurrence
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-primary" />
                        Définition de votre personnalité de marque
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-primary" />
                        Identification de votre audience cible
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-digiqo-accent/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-accent/20">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: -360 }}
                    transition={{ duration: ANIMATION.duration.normal }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-amber-500 rounded-2xl blur-lg opacity-50" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-digiqo-accent to-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      2
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      Création du Logo
                      <Brush className="w-6 h-6 text-digiqo-accent" />
                    </h3>
                    <p className="text-digiqo-primary/70 mb-4">
                      Nous concevons plusieurs propositions de logos uniques, 
                      chacune racontant votre histoire d'une manière différente et mémorable.
                    </p>
                    <ul className="space-y-2 text-digiqo-primary/70">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-accent" />
                        3 à 5 concepts créatifs originaux
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-accent" />
                        Variations et déclinaisons
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-accent" />
                        Tests d'application sur différents supports
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-digiqo-secondary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-secondary/20">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: 360 }}
                    transition={{ duration: ANIMATION.duration.normal }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary to-cyan-500 rounded-2xl blur-lg opacity-50" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-digiqo-secondary to-cyan-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      3
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      Charte Graphique
                      <Layers className="w-6 h-6 text-digiqo-secondary" />
                    </h3>
                    <p className="text-digiqo-primary/70 mb-4">
                      Développement d'un guide complet qui assure la cohérence de votre identité 
                      sur tous vos supports de communication.
                    </p>
                    <ul className="space-y-2 text-digiqo-primary/70">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-secondary" />
                        Palette de couleurs et typographies
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-secondary" />
                        Règles d'utilisation du logo
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-secondary" />
                        Templates pour vos documents
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-digiqo-primary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:border-digiqo-primary/20">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: -360 }}
                    transition={{ duration: ANIMATION.duration.normal }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl blur-lg opacity-50" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-digiqo-primary to-digiqo-accent text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      4
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                      Déclinaisons & Livraison
                      <Package className="w-6 h-6 text-digiqo-primary" />
                    </h3>
                    <p className="text-digiqo-primary/70 mb-4">
                      Application de votre nouvelle identité sur tous vos supports et formation 
                      de votre équipe pour une utilisation optimale.
                    </p>
                    <ul className="space-y-2 text-digiqo-primary/70">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-primary" />
                        Cartes de visite et papeterie
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-primary" />
                        Signatures email et réseaux sociaux
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-digiqo-primary" />
                        Fichiers sources et exports haute définition
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ce qui est <span className="text-digiqo-primary">inclus</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Un package complet pour lancer votre marque avec professionnalisme
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Logo Professionnel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-primary/20 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-xl text-white flex-shrink-0">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Logo Professionnel</h3>
                    <p className="text-digiqo-primary/70">
                      Design unique et mémorable, livré en formats vectoriels et bitmap pour tous vos usages.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charte Graphique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-accent/20 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-digiqo-accent to-amber-500 rounded-xl text-white flex-shrink-0">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Charte Graphique</h3>
                    <p className="text-digiqo-primary/70">
                      Guide détaillé avec couleurs, typographies et règles d'utilisation pour garantir la cohérence.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Déclinaisons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 3 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-secondary/20 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-digiqo-secondary to-cyan-500 rounded-xl text-white flex-shrink-0">
                    <Brush className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Déclinaisons</h3>
                    <p className="text-digiqo-primary/70">
                      Adaptations pour cartes de visite, en-têtes, signatures email et réseaux sociaux.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fichiers Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 4 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-digiqo-primary/20 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-xl text-white flex-shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fichiers Sources</h3>
                    <p className="text-digiqo-primary/70">
                      Tous les fichiers originaux en formats professionnels (AI, EPS, PNG, JPG, PDF).
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support & Conseils */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-digiqo-primary/10 hover:border-indigo-500/20 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-digiqo-secondary to-digiqo-primary rounded-xl text-white flex-shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Support & Conseils</h3>
                    <p className="text-digiqo-primary/70">
                      Accompagnement personnalisé et conseils d'utilisation pendant 3 mois après livraison.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Propriété Totale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-secondary/20 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary/80 rounded-xl text-white flex-shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Propriété Totale</h3>
                    <p className="text-digiqo-primary/70">
                      Droits complets sur votre identité visuelle, sans redevances ni restrictions d'utilisation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section avec glassmorphism */}
      <section className="py-24 bg-gradient-to-br from-white via-digiqo-accent/5 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-gradient-to-br from-digiqo-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-gradient-to-br from-digiqo-accent/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Questions <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Fréquentes</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70">
              Tout ce que vous devez savoir sur notre processus de création
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Combien de temps prend la création d'une identité de marque ?",
                answer: "En moyenne, comptez 2 à 4 semaines pour un projet complet incluant logo et charte graphique. Les délais peuvent varier selon la complexité et le nombre de révisions souhaitées.",
                Icon: Clock
              },
              {
                question: "Combien de propositions de logo vais-je recevoir ?",
                answer: "Nous présentons généralement 3 à 5 concepts créatifs différents. Vous pourrez ensuite affiner votre préféré avec 2 tours de modifications inclus.",
                Icon: PaintBucket
              },
              {
                question: "Puis-je utiliser mon logo partout ?",
                answer: "Absolument ! Vous recevez les droits complets d'utilisation. Votre logo peut être utilisé sur tous supports : print, web, textile, signalétique, etc.",
                Icon: CheckSquare
              },
              {
                question: "Que se passe-t-il si je ne suis pas satisfait ?",
                answer: "Nous travaillons en étroite collaboration jusqu'à votre satisfaction complète. Avec notre processus itératif, nous affinons les créations selon vos retours.",
                Icon: Handshake
              },
              {
                question: "Proposez-vous des services d'impression ?",
                answer: "Oui ! Nous pouvons gérer l'impression de vos cartes de visite, flyers et autres supports. Nous travaillons avec les meilleurs imprimeurs de La Réunion.",
                Icon: Printer
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-digiqo-primary/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-digiqo-primary/10 hover:border-digiqo-primary/20">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-digiqo-primary to-digiqo-primary/80 rounded-2xl"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: ANIMATION.duration.normal }}
                    >
                      <faq.Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-digiqo-primary">{faq.question}</h3>
                      <p className="text-digiqo-primary/70">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section avec glassmorphism sophistiqué */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/50 to-digiqo-primary relative overflow-hidden">
        {/* Multiple animated gradient orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-[500px] h-[500px]"
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: ANIMATION.duration.verySlow * 13,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-digiqo-primary/30 to-digiqo-accent/30 rounded-full blur-3xl" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
            animate={{
              y: [0, -100, 0],
              x: [0, -50, 0],
            }}
            transition={{
              duration: ANIMATION.duration.verySlow * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-digiqo-accent/30 to-amber-500/30 rounded-full blur-3xl" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: ANIMATION.duration.verySlow * 17,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-digiqo-primary/20 to-digiqo-accent/20 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUpLarge}
            whileInView={ANIMATION.entry.fadeInUpLarge.animate}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Glassmorphism card container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10">
                <motion.div
                  {...ANIMATION.entry.springIn}
                  whileInView={ANIMATION.entry.springIn.animate}
                  viewport={{ once: true }}
                  transition={{ 
                    ...ANIMATION.ease.spring,
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2 
                  }}
                  className="inline-flex mb-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-full blur-2xl opacity-50 animate-pulse" />
                    <div className="relative bg-white/10 backdrop-blur-xl p-6 rounded-full border border-white/20">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Prêt à créer votre
                  <br />
                  <span className="bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-accent bg-clip-text text-transparent animate-gradient bg-300">
                    identité unique ?
                  </span>
                </h2>
                
                <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                  Commencez avec une consultation gratuite pour découvrir comment nous pouvons 
                  transformer votre vision en réalité visuelle exceptionnelle
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.a
                    href={generateContactUrl({ 
                      service: 'identite',
                      description: 'Je souhaite une consultation gratuite pour mon identité de marque' 
                    })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-2xl font-bold transition-all duration-300"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-digiqo-primary to-digiqo-accent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-digiqo-accent to-digiqo-accent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                    
                    {/* Content */}
                    <span className="relative z-10 text-white">Consultation Gratuite</span>
                    <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  
                  <motion.a
                    href="tel:0692731111"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Appeler maintenant</span>
                    <div className="relative">
                      <div className="absolute inset-0 bg-digiqo-accent rounded-full blur-md opacity-50 animate-pulse" />
                      <div className="relative bg-digiqo-accent text-white p-1 rounded-full">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}