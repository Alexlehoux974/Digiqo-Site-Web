import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Check, Palette, Camera, Edit3, Music, Smartphone, RefreshCw, Video, ArrowRight, Shield, Star } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'
import { generateContactUrl } from '../../lib/contact-utils'
import { ServiceHero } from './ServiceHero'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { 
  getProductsForService, 
  formatPrice
} from '../../lib/airtable-products'

interface VideoPackage {
  id: string
  name: string
  price: string
  features: string[]
  description?: string
  paymentLink?: string
}

interface VisualPackage {
  id: string
  quantity: number
  price: string
  pricePerVisual: string
  paymentLink?: string
}

export default function VideoPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'1' | '3' | '5' | '10'>('1')
  const seoData = servicesSEO['video-visuel-publicitaire-974']

  // Get real product data from Airtable
  const creativesProducts = getProductsForService('video')
  
  // Find video production packages (15-30 sec and Premium)
  const videoShort = creativesProducts.find(p => p.name.includes('Vidéo Publicitaire 15-30 sec'))
  const videoPremium = creativesProducts.find(p => p.name.includes('Spot Publicitaire Premium'))
  
  // Find other creative products
  const motionDesign = creativesProducts.find(p => p.name.includes('Motion Design'))
  const bannieres = creativesProducts.find(p => p.name.includes('Bannières Display'))
  const shootingPhoto = creativesProducts.find(p => p.name.includes('Shooting Photo'))
  
  // Use the 15-30 sec video as the main package (REAL price: 1200€)
  const videoPackage: VideoPackage = videoShort ? {
    id: videoShort.id,
    name: videoShort.name,
    price: formatPrice(videoShort),
    description: videoShort.description,
    features: videoShort.features || [
      'Script inclus',
      'Montage professionnel',
      'Musique libre de droits',
      'Formats optimisés pour toutes plateformes',
      'Sous-titres inclus',
      'Révisions incluses'
    ],
    paymentLink: videoShort.paymentLink
  } : {
    id: 'video-default',
    name: 'Vidéo Publicitaire 15-30 sec',
    price: '1 200€',
    description: 'Production vidéo courte pour réseaux sociaux',
    features: [
      'Script inclus',
      'Montage pro',
      'Musique libre',
      'Formats optimisés'
    ]
  }

  // Find visual packages from real Airtable data
  const pack10Visuels = creativesProducts.find(p => p.name.includes('Pack 10 Visuels'))
  
  // Calculate pricing for different quantities based on real data
  const visualPackages: Record<string, VisualPackage> = {
    '1': { 
      id: 'visual-1',
      quantity: 1, 
      price: '50€',
      pricePerVisual: '50€',
      paymentLink: generateContactUrl({
        service: 'video',
        description: 'Je souhaite commander 1 visuel publicitaire'
      })
    },
    '3': { 
      id: 'visual-3',
      quantity: 3, 
      price: '120€',
      pricePerVisual: '40€',
      paymentLink: generateContactUrl({
        service: 'video',
        description: 'Je souhaite commander 3 visuels publicitaires'
      })
    },
    '5': { 
      id: 'visual-5',
      quantity: 5, 
      price: '200€',
      pricePerVisual: '40€',
      paymentLink: generateContactUrl({
        service: 'video',
        description: 'Je souhaite commander 5 visuels publicitaires'
      })
    },
    '10': { 
      id: 'visual-10',
      quantity: 10, 
      price: pack10Visuels ? formatPrice(pack10Visuels) : '350€',
      pricePerVisual: pack10Visuels ? `${(pack10Visuels.price / 10).toFixed(0)}€` : '35€',
      paymentLink: pack10Visuels?.paymentLink || generateContactUrl({
        service: 'video',
        description: 'Je souhaite commander le Pack 10 Visuels'
      })
    }
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
            "name": videoPackage.name,
            "description": videoPackage.description
          },
          "price": videoPackage.price.replace('€', '').replace(/\s/g, ''),
          "priceCurrency": "EUR"
        },
        ...Object.entries(visualPackages).map(([, pkg]) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Création de ${pkg.quantity} visuel${pkg.quantity > 1 ? 's' : ''} publicitaire${pkg.quantity > 1 ? 's' : ''}`,
            "description": "Visuels publicitaires optimisés pour Meta (Facebook & Instagram)"
          },
          "price": pkg.price.replace('€', '').replace(/\s/g, ''),
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
                href={videoPackage.paymentLink || generateContactUrl({
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

      {/* Premium Video Section */}
      {videoPremium && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Production <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">Premium</span>
              </h2>
              <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
                {videoPremium.description}
              </p>
            </motion.div>

            <motion.div
              {...ANIMATION.entry.fadeInUpLarge}
              whileInView={ANIMATION.entry.fadeInUpLarge.animate}
              viewport={{ once: true }}
              transition={{ delay: getStaggerDelay(0) }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white to-digiqo-accent/5 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-digiqo-accent/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-digiqo-primary mb-2">{videoPremium.name}</h3>
                    <p className="text-gray-600">Production haut de gamme avec équipe complète</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-4xl font-bold text-digiqo-accent">{formatPrice(videoPremium)}</p>
                    <p className="text-gray-600">Projet complet</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {(videoPremium.features || []).map((feature, index) => {
                    const icons = [Video, Camera, Edit3, Music, Palette, RefreshCw, Shield, Star]
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
                  href={videoPremium.paymentLink || generateContactUrl({
                    service: 'video',
                    description: 'Je souhaite commander un Spot Publicitaire Premium'
                  })}
                  whileHover={ANIMATION.hover.scale}
                  whileTap={ANIMATION.tap.scale}
                  className="block"
                >
                  <Button className="w-full bg-gradient-to-r from-digiqo-accent to-orange-500 hover:from-digiqo-accent/90 hover:to-orange-500/90 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    Commander Production Premium
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
                  Créatif{visualPackages[selectedPeriod].quantity > 1 ? 's' : ''} publicitaire{visualPackages[selectedPeriod].quantity > 1 ? 's' : ''} ({visualPackages[selectedPeriod].quantity} visuel{visualPackages[selectedPeriod].quantity > 1 ? 's' : ''})
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
                href={visualPackages[selectedPeriod].paymentLink || generateContactUrl({
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

      {/* Autres Services Créatifs Section */}
      {(motionDesign || bannieres || shootingPhoto) && (
        <section className="py-24 bg-gradient-to-br from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Services <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">Complémentaires</span>
              </h2>
              <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
                Des solutions créatives supplémentaires pour maximiser votre impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {motionDesign && (
                <motion.div
                  {...ANIMATION.entry.fadeInUp}
                  whileInView={ANIMATION.entry.fadeInUp.animate}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(0) }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Edit3 className="h-12 w-12 text-digiqo-accent mb-4" />
                  <h3 className="text-xl font-bold text-digiqo-primary mb-2">{motionDesign.name}</h3>
                  <p className="text-gray-600 mb-4">{motionDesign.description}</p>
                  <p className="text-3xl font-bold text-digiqo-accent mb-4">{formatPrice(motionDesign)}</p>
                  <ul className="space-y-2 mb-6">
                    {(motionDesign.features || []).slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-digiqo-accent mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-digiqo-accent hover:bg-digiqo-accent/90 text-white"
                    onClick={() => window.location.href = motionDesign.paymentLink || generateContactUrl({
                      service: 'video',
                      description: `Je souhaite commander ${motionDesign.name}`
                    })}
                  >
                    Commander
                  </Button>
                </motion.div>
              )}

              {bannieres && (
                <motion.div
                  {...ANIMATION.entry.fadeInUp}
                  whileInView={ANIMATION.entry.fadeInUp.animate}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(1) }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Palette className="h-12 w-12 text-digiqo-accent mb-4" />
                  <h3 className="text-xl font-bold text-digiqo-primary mb-2">{bannieres.name}</h3>
                  <p className="text-gray-600 mb-4">{bannieres.description}</p>
                  <p className="text-3xl font-bold text-digiqo-accent mb-4">{formatPrice(bannieres)}</p>
                  <ul className="space-y-2 mb-6">
                    {(bannieres.features || []).slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-digiqo-accent mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-digiqo-accent hover:bg-digiqo-accent/90 text-white"
                    onClick={() => window.location.href = bannieres.paymentLink || generateContactUrl({
                      service: 'video',
                      description: `Je souhaite commander ${bannieres.name}`
                    })}
                  >
                    Commander
                  </Button>
                </motion.div>
              )}

              {shootingPhoto && (
                <motion.div
                  {...ANIMATION.entry.fadeInUp}
                  whileInView={ANIMATION.entry.fadeInUp.animate}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(2) }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Camera className="h-12 w-12 text-digiqo-accent mb-4" />
                  <h3 className="text-xl font-bold text-digiqo-primary mb-2">{shootingPhoto.name}</h3>
                  <p className="text-gray-600 mb-4">{shootingPhoto.description}</p>
                  <p className="text-3xl font-bold text-digiqo-accent mb-4">{formatPrice(shootingPhoto)}</p>
                  <ul className="space-y-2 mb-6">
                    {(shootingPhoto.features || []).slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-digiqo-accent mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-digiqo-accent hover:bg-digiqo-accent/90 text-white"
                    onClick={() => window.location.href = shootingPhoto.paymentLink || generateContactUrl({
                      service: 'video',
                      description: `Je souhaite commander ${shootingPhoto.name}`
                    })}
                  >
                    Commander
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

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