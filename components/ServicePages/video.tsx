import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Palette, Camera, Edit3, Music, Smartphone, RefreshCw, Video, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'
import { generateContactUrl } from '../../lib/contact-utils'
import { ServiceHero } from './ServiceHero'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'

interface VideoPackage {
  name: string
  price: string
  features: string[]
  description?: string
}

interface VisualPackage {
  quantity: number
  price: string
  pricePerVisual: string
}

export default function VideoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'1' | '3' | '5' | '10'>('1')
  const seoData = servicesSEO['video-visuel-publicitaire-974']

  const videoPackage: VideoPackage = {
    name: 'Production vidéo',
    price: '549,50€',
    description: 'Nous réalisons vos vidéos publicitaires de A à Z : captation pro, montage rythmé, sous-titres, effets visuels et format 100 % optimisé pour Meta (Facebook & Instagram).',
    features: [
      'Captation vidéo 1h avec prise de son (SONY A7IV)',
      'Montage dynamique (20 à 60 sec) avec transitions fluides',
      'Ajout de textes & sous-titres pour améliorer l\'accessibilité',
      'Effets visuels & animations pour renforcer l\'impact',
      'Musique libre de droits et synchronisation audio/vidéo',
      'Format optimisé pour Facebook & Instagram',
      'Personnalisation avec logos et messages',
      '2 retouches incluses par vidéo'
    ]
  }

  const visualPackages: Record<string, VisualPackage> = {
    '1': { quantity: 1, price: '55€', pricePerVisual: '55€' },
    '3': { quantity: 3, price: '135€', pricePerVisual: '45€' },
    '5': { quantity: 5, price: '200€', pricePerVisual: '40€' },
    '10': { quantity: 10, price: '350€', pricePerVisual: '35€' }
  }

  const visualFeatures = [
    '3 formats livrés : 1:1 (1080×1080 px), 9:16 (1080×1920 px - story/reel), 4:5 (1080×1350 px - fil d\'actualité)',
    'Personnalisation avec logo et message',
    'Optimisé pour l\'engagement et la conversion'
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Visuels et Vidéos Publicitaires - Digiqo",
    "provider": {
      "@type": "Organization",
      "name": "Digiqo",
      "url": "https://digiqo.fr"
    },
    "description": seoData.description,
    "areaServed": {
      "@type": "Place",
      "name": "La Réunion"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Production Vidéo et Visuels",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Production vidéo publicitaire",
            "description": "Production vidéo complète avec captation, montage et optimisation pour les réseaux sociaux"
          },
          "price": "549.50",
          "priceCurrency": "EUR"
        },
        ...Object.entries(visualPackages).map(([, pkg]) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Création de ${pkg.quantity} visuel${pkg.quantity > 1 ? 's' : ''} publicitaire${pkg.quantity > 1 ? 's' : ''}`,
            "description": "Visuels publicitaires optimisés pour Meta (Facebook & Instagram)"
          },
          "price": pkg.price.replace('€', ''),
          "priceCurrency": "EUR"
        }))
      ]
    }
  }

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <meta property="og:image" content="https://digiqo.fr/og-video.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <link rel="canonical" href={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={Video}
        title={{
          line1: "Visuels et Vidéos",
          line2: "Publicitaires"
        }}
        subtitle="Nous créons votre contenu, pour vous et à votre image."
        ctaButtons={{
          primary: {
            text: "Découvrir nos offres",
            href: "#offres"
          },
          secondary: {
            text: "Commander maintenant",
            href: generateContactUrl({ service: 'video' })
          }
        }}
        gradientFrom="from-digiqo-accent"
        gradientTo="to-orange-500"
        iconColor="text-digiqo-accent"
      />

      {/* Production Vidéo Section */}
      <section id="offres" className="py-24 bg-gradient-to-br from-white to-digiqo-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Production <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">Vidéo</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              {videoPackage.description}
            </p>
          </motion.div>

          <motion.div
            {...ANIMATION.entry.fadeInUpLarge}
            whileInView={ANIMATION.entry.fadeInUpLarge.animate}
            viewport={{ once: true }}
            transition={{ delay: getStaggerDelay(0) }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-digiqo-primary mb-2">{videoPackage.name}</h3>
                  <p className="text-gray-600">Votre message, au bon format, prêt à performer.</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-4xl font-bold text-digiqo-accent">{videoPackage.price}</p>
                  <p className="text-gray-600">par vidéo</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {videoPackage.features.map((feature, index) => {
                  const icons = [Camera, Edit3, Edit3, Edit3, Music, Smartphone, Palette, RefreshCw]
                  const Icon = icons[index] || Check
                  return (
                    <motion.div 
                      key={index} 
                      {...ANIMATION.entry.fadeInUp}
                      whileInView={ANIMATION.entry.fadeInUp.animate}
                      viewport={{ once: true }}
                      transition={{ delay: getStaggerDelay(index) }}
                      className="flex items-start space-x-3"
                    >
                      <Icon className="h-5 w-5 text-digiqo-accent mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  )
                })}
              </div>

              <motion.a
                href={generateContactUrl({
                  service: 'video',
                  description: 'Je souhaite commander une production vidéo professionnelle'
                })}
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-digiqo-accent to-orange-500 hover:from-digiqo-accent/90 hover:to-orange-500/90 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Commander une vidéo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Création de Visuels Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Création de <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">Visuels</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Nous concevons des visuels impactants, adaptés à tous les formats Meta (fil, story, reel). 
              Design soigné, messages percutants et optimisation pour l'engagement et la conversion.
            </p>
          </motion.div>

          {/* Package Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-1 inline-flex">
              {Object.keys(visualPackages).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period as '1' | '3' | '5' | '10')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-digiqo-accent to-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {visualPackages[period].quantity} visuel{visualPackages[period].quantity > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            {...ANIMATION.entry.fadeInUpLarge}
            whileInView={ANIMATION.entry.fadeInUpLarge.animate}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-digiqo-primary mb-4">
                  Créatif publicitaire ({visualPackages[selectedPeriod].quantity} visuel{visualPackages[selectedPeriod].quantity > 1 ? 's' : ''})
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <p className="text-5xl font-bold text-digiqo-accent">
                    {visualPackages[selectedPeriod].price}
                  </p>
                  <span className="text-gray-600">soit {visualPackages[selectedPeriod].pricePerVisual}/visuel</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 mb-6 text-center">
                  Visuel publicitaire fixe, spécialement conçu pour la diffusion sur Meta (Facebook & Instagram).
                </p>
                <div className="space-y-4">
                  {visualFeatures.map((feature, index) => (
                    <motion.div 
                      key={index}
                      {...ANIMATION.entry.fadeInUp}
                      whileInView={ANIMATION.entry.fadeInUp.animate}
                      viewport={{ once: true }}
                      transition={{ delay: getStaggerDelay(index) }}
                      className="flex items-start space-x-3"
                    >
                      <Check className="h-5 w-5 text-digiqo-accent mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.a
                href={generateContactUrl({
                  service: 'video',
                  description: `Je souhaite commander ${visualPackages[selectedPeriod].quantity} visuel${visualPackages[selectedPeriod].quantity > 1 ? 's' : ''} publicitaire${visualPackages[selectedPeriod].quantity > 1 ? 's' : ''}`
                })}
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="block"
              >
                <Button className="w-full bg-gradient-to-r from-digiqo-accent to-orange-500 hover:from-digiqo-accent/90 hover:to-orange-500/90 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Commander {visualPackages[selectedPeriod].quantity} visuel{visualPackages[selectedPeriod].quantity > 1 ? 's' : ''}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à créer du contenu qui performe ?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Contactez-nous pour discuter de votre projet vidéo ou visuel
            </p>
            <motion.a
              href={generateContactUrl({ service: 'video' })}
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contactez-nous
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}