import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Palette, Camera, Edit3, Music, Smartphone, RefreshCw, Phone } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'
import { generateContactUrl } from '../../lib/contact-utils'

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
    <>
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

      <ServiceLayout>
        <div className="min-h-screen bg-gradient-to-b from-digiqo-primary via-digiqo-primary/90 to-digiqo-primary">
          <div className="container mx-auto px-4 py-20">
            <Link href="/#contact">
              <Button
                variant="ghost"
                className="mb-8 text-digiqo-primary/50 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux services
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#DA6530] to-[#E6834F] bg-clip-text text-transparent">
                Visuels et Vidéos Publicitaires
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Nous créons votre contenu, pour vous et à votre image.
              </p>
            </motion.div>

            {/* Production Vidéo Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                Production Vidéo pour les Réseaux Sociaux
              </h2>
              <p className="text-white/70 text-center mb-12 max-w-3xl mx-auto">
                {videoPackage.description}
              </p>

              <div className="max-w-4xl mx-auto">
                <div className="bg-digiqo-primary/50 backdrop-blur-sm rounded-2xl p-8 border border-digiqo-primary/30">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{videoPackage.name}</h3>
                      <p className="text-digiqo-primary/50">Votre message, au bon format, prêt à performer.</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-4xl font-bold text-[#DA6530]">{videoPackage.price}</p>
                      <p className="text-digiqo-primary/50">par vidéo</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {videoPackage.features.map((feature, index) => {
                      const icons = [Camera, Edit3, Edit3, Edit3, Music, Smartphone, Palette, RefreshCw]
                      const Icon = icons[index] || Check
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 text-[#DA6530] mt-0.5 flex-shrink-0" />
                          <span className="text-white/70">{feature}</span>
                        </div>
                      )
                    })}
                  </div>

                  <Link href={generateContactUrl({
                    service: 'video',
                    description: 'Je souhaite commander une production vidéo professionnelle'
                  })}>
                    <Button className="w-full bg-gradient-to-r from-[#DA6530] to-[#E6834F] hover:from-[#C5541F] hover:to-[#D6723F] text-white font-semibold py-6 text-lg">
                      Acheter
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.section>

            {/* Création de Visuels Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                Création de Visuels Publicitaires
              </h2>
              <p className="text-white/70 text-center mb-8 max-w-3xl mx-auto">
                Nous concevons des visuels impactants, adaptés à tous les formats Meta (fil, story, reel). 
                Design soigné, messages percutants et optimisation pour l'engagement et la conversion.
              </p>
              <p className="text-digiqo-primary/50 text-center mb-12">
                Options disponibles :
              </p>

              {/* Package Selector */}
              <div className="flex justify-center mb-12">
                <div className="bg-digiqo-primary/50 backdrop-blur-sm rounded-lg p-1 inline-flex">
                  {Object.keys(visualPackages).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period as '1' | '3' | '5' | '10')}
                      className={`px-6 py-3 rounded-md font-semibold transition-all ${
                        selectedPeriod === period
                          ? 'bg-gradient-to-r from-[#DA6530] to-[#E6834F] text-white'
                          : 'text-digiqo-primary/50 hover:text-white'
                      }`}
                    >
                      {visualPackages[period].quantity} visuel{visualPackages[period].quantity > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-digiqo-primary/50 backdrop-blur-sm rounded-2xl p-8 border border-digiqo-primary/30">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Créatif publicitaire ({visualPackages[selectedPeriod].quantity} visuel{visualPackages[selectedPeriod].quantity > 1 ? 's' : ''})
                    </h3>
                    <p className="text-5xl font-bold text-[#DA6530]">
                      {visualPackages[selectedPeriod].price}
                    </p>
                  </div>

                  <div className="mb-8">
                    <p className="text-white/70 mb-6">
                      Visuel publicitaire fixe, spécialement conçu pour la diffusion sur Meta (Facebook & Instagram).
                    </p>
                    <div className="space-y-4">
                      {visualFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-[#DA6530] mt-0.5 flex-shrink-0" />
                          <span className="text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={generateContactUrl({
                    service: 'video',
                    description: `Je souhaite commander ${visualPackages[selectedPeriod].quantity} visuel${visualPackages[selectedPeriod].quantity > 1 ? 's' : ''} publicitaire${visualPackages[selectedPeriod].quantity > 1 ? 's' : ''}`
                  })}>
                    <Button className="w-full bg-gradient-to-r from-[#DA6530] to-[#E6834F] hover:from-[#C5541F] hover:to-[#D6723F] text-white font-semibold py-6 text-lg">
                      Acheter
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.section>

            {/* Contact Link */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mb-20"
            >
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-[#199CB7] to-[#2ABED9] hover:from-[#1890AA] hover:to-[#25ACC7] text-white font-semibold py-6 px-8 text-lg">
                  Nous contacter
                </Button>
              </Link>
            </motion.div>

            {/* SEA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-20"
            >
              <div className="bg-gradient-to-r from-digiqo-primary/80 to-digiqo-primary/70 rounded-2xl p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Publicité sur les Moteurs de Recherche (SEA)
                </h2>
                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                  Nous créons, pilotons et optimisons vos campagnes publicitaires sur les moteurs de recherche.
                </p>
                <p className="text-lg text-digiqo-primary/50 mb-8">Uniquement sur devis</p>
                <Link href={generateContactUrl({
                  service: 'video',
                  description: 'Je souhaite être rappelé pour discuter de mes besoins en publicité sur les moteurs de recherche (SEA)'
                })}>
                  <Button 
                    className="bg-white text-digiqo-primary hover:bg-digiqo-primary/10 font-semibold py-6 px-8 text-lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Être rappelé(e)
                  </Button>
                </Link>
              </div>
            </motion.section>

            {/* CTA Final */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <p className="text-2xl text-white/70 mb-8">Besoin d'un site web ?</p>
              <Link href="/services/dev-web">
                <Button className="bg-gradient-to-r from-[#199CB7] to-[#2ABED9] hover:from-[#1890AA] hover:to-[#25ACC7] text-white font-semibold py-6 px-8 text-lg">
                  Découvrir nos Services Web
                </Button>
              </Link>
            </motion.section>
          </div>
        </div>
      </ServiceLayout>
    </>
  )
}