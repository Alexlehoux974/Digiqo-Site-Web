import Head from 'next/head'
import { motion } from 'framer-motion'
import { Check, Camera, Video, ArrowRight, Package, Image, Film, Sparkles, ChevronRight, Palette, Drone, Rocket, Star } from 'lucide-react'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'
import { generateContactUrl } from '../../lib/contact-utils'
import { AnimatedMarqueeHero } from '@/components/ui/hero-3'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'

interface CreativeProduct {
  id: string
  name: string
  price: string
  features: string[]
  description?: string
  paymentLink?: string
  icon?: any
  bestValue?: boolean
  gradient?: string
  type?: 'MRR' | 'ONE_SHOT'
}

export default function VideoPage() {
  const seoData = servicesSEO['creatifs-publicitaires-974']

  // Produits MRR depuis Airtable (4 abonnements mensuels)
  const mrrProducts: CreativeProduct[] = [
    {
      id: 'reczqLYRjB5SMRhbR',
      name: 'Abonnement Photo Mensuel',
      price: '300€/mois',
      description: '1 session photo par mois pour votre contenu visuel',
      features: [
        '📸 1 session photo par mois',
        '1h de prise de vue maximum',
        'Portrait, produit ou lifestyle',
        '15 photos HD soigneusement retouchées',
        '🎨 Colorimétrie professionnelle',
        '📦 Livraison via Google Drive sous 5 jours',
        '🎯 Formats adaptés réseaux sociaux et e-commerce',
        '💼 Idéal pour communication régulière'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/QQWTrKWr?referrer=PAYMENT_LINK',
      icon: Camera,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'recuPCFUNllSLXNdT',
      name: 'Abonnement Drone Mensuel',
      price: '380€/mois',
      description: 'Prises de vue aériennes mensuelles pour vos projets',
      features: [
        '🚁 Session drone mensuelle',
        '1 session drone par mois (1h sur site)',
        'Montage dynamique (20-25 sec)',
        'OU livraison des rushs bruts',
        'Livraison sous 5 jours ouvrés',
        'Idéal pour l\'immobilier',
        'Parfait pour le tourisme',
        'Mise en valeur d\'espaces'
      ],
      paymentLink: '',
      icon: Drone,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'recd5un6ZP7QrnG13',
      name: 'Abonnement Vidéo Mensuel',
      price: '449€/mois',
      description: '1 vidéo par mois pour votre communication régulière',
      features: [
        '🎥 1 vidéo par mois',
        '1h de tournage maximum',
        'Durée finale : 20 à 60 secondes',
        'Montage dynamique avec textes, musique et effets visuels',
        '✂ Jusqu\'à 2 retouches incluses',
        '📦 Livraison via Google Drive sous 5 jours ouvrés',
        '🎯 Formats adaptés pour réseaux sociaux',
        '💼 Idéal pour communication régulière'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/ThjGnSsb9J4JKy7?referrer=PAYMENT_LINK',
      icon: Video,
      gradient: 'from-purple-500 to-pink-600',
      bestValue: true
    },
    {
      id: 'recq3eiG1G0NYHdXZ',
      name: 'Abonnement Créatif Mensuel',
      price: '750€/mois',
      description: 'Pack complet vidéo + photo pour une stratégie content complète',
      features: [
        '🎥 & 📸 Pack mensuel vidéo + photo',
        '1 vidéo par mois (1h de tournage)',
        '15 photos HD retouchées par mois',
        '🎨 Retouches photo professionnelles',
        'Montage vidéo dynamique (20-60 sec)',
        '📂 Livraison Google Drive organisé',
        '🗓 RDV mensuel stratégie contenu',
        '🔁 2 retouches vidéo + illimitées photos'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/nX9dsyCXPnVRw?referrer=PAYMENT_LINK',
      icon: Sparkles,
      gradient: 'from-amber-300 to-orange-400'
    }
  ]

  // Produits ONE_SHOT Visuels depuis Airtable
  const visualProducts: CreativeProduct[] = [
    {
      id: 'recO8j4iHW4GodWVS',
      name: 'Créatif Publicitaire (1 visuel)',
      price: '55€',
      description: 'Visuel publicitaire fixe optimisé pour Meta',
      features: [
        '✔️ 3 formats livrés',
        '1:1 (1080x1080 px)',
        '9:16 (1080x1920 px – story/reel)',
        '4:5 (1080x1350 px – fil d\'actualité)',
        '🎨 Personnalisation avec logo et message',
        '⚡ Optimisé pour l\'engagement',
        'Livraison sous 2 jours'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/XkHTtXxqwdhTKq?referrer=PAYMENT_LINK',
      icon: Image,
      gradient: 'from-emerald-500 to-teal-600',
      type: 'ONE_SHOT'
    },
    {
      id: 'recvWHa8RcOVCnYme',
      name: 'Créatifs Publicitaires (3 visuels)',
      price: '135€',
      description: 'Pack de 3 visuels publicitaires pour vos campagnes',
      features: [
        '✔️ 3 visuels différents',
        '3 formats pour chaque visuel',
        'Total : 9 fichiers livrés',
        '🎨 Personnalisation complète',
        '⚡ Optimisés pour Meta',
        'Livraison sous 3 jours'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/9NQsT7dQJQPxmYb?referrer=PAYMENT_LINK',
      icon: Package,
      gradient: 'from-blue-500 to-indigo-600',
      type: 'ONE_SHOT'
    },
    {
      id: 'recAgNyB1qRGariSN',
      name: 'Créatifs Publicitaires (5 visuels)',
      price: '200€',
      description: 'Pack de 5 visuels pour une campagne complète',
      features: [
        '✔️ 5 visuels différents',
        '3 formats pour chaque visuel',
        'Total : 15 fichiers livrés',
        '🎨 Personnalisation avec identité',
        '⚡ Optimisés pour conversion',
        'Livraison sous 5 jours'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/tRYRM4GvxbsNdf?referrer=PAYMENT_LINK',
      icon: Palette,
      gradient: 'from-purple-500 to-pink-600',
      bestValue: true,
      type: 'ONE_SHOT'
    },
    {
      id: 'recZqsm9zn89WiCqx',
      name: 'Créatifs Publicitaires (10 visuels)',
      price: '350€',
      description: 'Pack premium de 10 visuels pour campagnes d\'envergure',
      features: [
        '✔️ 10 visuels différents',
        '3 formats pour chaque visuel',
        'Total : 30 fichiers livrés',
        '🎨 Direction artistique complète',
        '⚡ A/B testing ready',
        'Livraison sous 7 jours'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/9JdDMShWzwp?referrer=PAYMENT_LINK',
      icon: Star,
      gradient: 'from-amber-300 to-orange-400',
      type: 'ONE_SHOT'
    }
  ]

  // Produits ONE_SHOT Vidéo & Photo depuis Airtable
  const videoPhotoProducts: CreativeProduct[] = [
    {
      id: 'montage-ads-ready',
      name: 'Montage Ads Ready',
      price: '149,90€',
      description: 'Vidéos existantes en pubs SMA prêtes à diffuser',
      features: [
        '🎬 Adaptation au format pub SMA (Meta, Instagram, etc.)',
        '⏱ Durée optimisée pour la conversion (15 à 30 sec)',
        '📱 Formats adaptés mobile (vertical / carré selon besoin)',
        '🧠 Validation par un expert SMA avant lancement',
        '✨ Habillage simple : titrage, logo, call-to-action',
        'Cette offre est réservée aux prospects qui disposent déjà de vidéos de bonne qualité.',
        'Nos experts SMA vérifient d\'abord si vos rushs sont exploitables pour de la publicité (cadrage, définition, stabilité, cohérence de message).',
        'Si les vidéos ne permettent pas d\'atteindre un niveau de qualité suffisant, nous vous orienterons vers nos offres de tournage + montage (Vidéo Signature ou Pack Lancement Social).',
        'Tarif de 149,90€ par vidéo montée et validée pour diffusion en campagne.'
      ],
      paymentLink: '',
      icon: Film,
      gradient: 'from-emerald-500 to-teal-600',
      type: 'ONE_SHOT'
    },
    {
      id: 'reclbwrxo9cO4nD5D',
      name: 'Shooting Essentiel 15',
      price: '349,90€',
      description: 'Session photo professionnelle avec 15 photos HD',
      features: [
        '📸 Session photo pro (1h)',
        'Portrait, produit ou lifestyle',
        '🖼 15 photos HD retouchées',
        '🎨 Colorimétrie & retouches',
        '📂 Export multi-formats',
        'Version web optimisée',
        'Version HD pour impressions',
        '🎯 Formats adaptés réseaux sociaux'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/PWc9PydMfP?referrer=PAYMENT_LINK',
      icon: Camera,
      gradient: 'from-blue-500 to-indigo-600',
      type: 'ONE_SHOT'
    },
    {
      id: 'recmZh9DBusca14x7',
      name: 'Vidéo Signature',
      price: '549,90€',
      description: 'Vidéo professionnelle pour votre marque',
      features: [
        '🎥 Captation vidéo pro (1h)',
        'Sony A7IV qualité exceptionnelle',
        '✂️ Montage dynamique (20-25 sec)',
        'Transitions fluides et rythmées',
        '🔤 Textes & sous-titres inclus',
        '✨ Effets visuels & animations',
        '🎵 Musique libre de droits',
        '📱 Formats optimisés réseaux sociaux'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/MMSQQJtDzx?referrer=PAYMENT_LINK',
      icon: Film,
      gradient: 'from-purple-500 to-pink-600',
      type: 'ONE_SHOT'
    },
    {
      id: 'reczBL4BwuphVXhJ0',
      name: 'Pack Lancement Social',
      price: '799€',
      description: 'Pack complet pour lancer votre présence sociale',
      features: [
        '🎥 1 vidéo dynamique de teasing',
        'Durée : 20 à 25 secondes',
        '📸 10 photos d\'ambiance/teasing',
        '🎨 Montages & retouches incluses',
        '📱 Contenu prêt à poster',
        'Formats Facebook & Instagram',
        '🚀 Idéal lancement produit',
        'Parfait pour événements'
      ],
      paymentLink: 'https://app-eu1.hubspot.com/payments/dNkrhYhrDg22rc?referrer=PAYMENT_LINK',
      icon: Rocket,
      gradient: 'from-amber-300 to-orange-400',
      type: 'ONE_SHOT'
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Créatifs Publicitaires - Vidéo, Photo & Display - Digiqo",
    "provider": {
      "@type": "Organization",
      "name": "Digiqo",
      "url": "https://digiqo.fr"
    },
    "description": seoData.description,
    "areaServed": {
      "@type": "Place",
      "name": "La Réunion"
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
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />
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
      <AnimatedMarqueeHero
        tagline="Créatifs Digiqo"
        title={
          <>
            <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent inline-block px-2">
              Créatifs
            </span>
            {' '}
            <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent inline-block px-2">
              Publicitaires
            </span>
          </>
        }
        description="Production vidéo, création visuelle et design publicitaire pour booster votre communication."
        ctaText="Découvrir nos offres"
        images={[
          '/visuel-client/story-01.webp',
          '/visuel-client/story-02.webp',
          '/visuel-client/story-03.webp',
          '/visuel-client/story-04.webp',
          '/visuel-client/story-05.webp',
          '/visuel-client/story-06.webp',
          '/visuel-client/story-07.webp',
          '/visuel-client/story-08.webp',
          '/visuel-client/visuel-9x16.webp',
          '/visuel-client/piton-fougere-9x16.webp',
          '/visuel-client/sweetjab-crosstraining-9x16.webp',
          '/visuel-client/yoga-lechoka-9x16.webp',
          '/visuel-client/paragraphe-story-01.webp'
        ]}
        onCtaClick={() => {
          const element = document.getElementById('abonnements');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* MRR Section - Abonnements Créatifs Mensuels */}
      <section id="abonnements" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Abonnements <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">Créatifs Mensuels</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Production créative continue pour votre communication digitale. Engagement minimum 3 mois, puis renouvelable mensuellement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mrrProducts.map((product, index) => (
              <motion.div
                key={product.id}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="relative"
              >
                {product.bestValue && (
                  <div className="absolute -top-3 -right-10 bg-white text-purple-600 px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-purple-500">
                    LE PLUS POPULAIRE
                  </div>
                )}
                
                <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full ${
                  product.bestValue ? 'ring-2 ring-purple-500' : ''
                }`}>
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${product.gradient}`}>
                    <product.icon className="w-10 h-10 text-white mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-white/90 text-xs">{product.description}</p>
                  </div>

                  {/* Price */}
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-digiqo-primary">
                        {product.price}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Engagement 3 mois min.</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-4">
                    <ul className="space-y-2">
                      {product.features.slice(0, 5).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-digiqo-accent shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {product.features.length > 5 && (
                      <details className="mt-3 group">
                        <summary className="cursor-pointer text-xs text-gray-600 hover:text-gray-800 font-medium">
                          Voir plus
                        </summary>
                        <ul className="mt-2 space-y-1.5">
                          {product.features.slice(5).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                              <span className="text-gray-600 text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="p-4 bg-gray-50">
                    <a
                      href={product.paymentLink || generateContactUrl({ service: 'video', description: `Je souhaite souscrire à : ${product.name}` })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 px-4 text-center font-semibold rounded-full transition-all text-sm
                        ${product.bestValue 
                          ? 'bg-gradient-to-r from-digiqo-accent to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-digiqo-accent hover:text-digiqo-accent'
                        }`}
                    >
                      S'abonner
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE_SHOT Visuels Section */}
      <section id="productions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Créatifs <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">Visuels</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Visuels publicitaires optimisés pour vos campagnes Meta (Facebook & Instagram).
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visualProducts.map((product, index) => (
              <motion.div
                key={product.id}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="relative"
              >
                {product.bestValue && (
                  <div className="absolute -top-3 -right-10 bg-white text-purple-600 px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-purple-500">
                    LE PLUS POPULAIRE
                  </div>
                )}
                
                <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full ${
                  product.bestValue ? 'ring-2 ring-purple-500' : ''
                }`}>
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${product.gradient}`}>
                    <product.icon className="w-10 h-10 text-white mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-white/90 text-xs">{product.description}</p>
                  </div>

                  {/* Price */}
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-digiqo-primary">
                        {product.price}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Achat unique</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-4">
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-digiqo-accent shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="p-4 bg-gray-50">
                    <a
                      href={product.paymentLink || generateContactUrl({ service: 'video', description: `Je souhaite commander : ${product.name}` })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 px-4 text-center font-semibold rounded-full transition-all text-sm
                        ${product.bestValue 
                          ? 'bg-gradient-to-r from-digiqo-accent to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-digiqo-accent hover:text-digiqo-accent'
                        }`}
                    >
                      Commander
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE_SHOT Vidéo & Photo Section */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Production <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">Vidéo & Photo</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Captation professionnelle et montage dynamique pour votre marque.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {videoPhotoProducts.map((product, index) => (
              <motion.div
                key={product.id}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="relative"
              >
                {product.price === 'GRATUIT' && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full blur-sm opacity-75 group-hover:blur-md transition-all duration-300 animate-pulse"></div>
                      <span className="relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white/20 backdrop-blur-sm">
                        <svg className="w-4 h-4 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        OFFERT
                        <svg className="w-4 h-4 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
                
                <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col ${
                  product.price === 'GRATUIT' ? 'ring-2 ring-green-500' : ''
                }`}>
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${product.gradient} h-[200px] flex flex-col`}>
                    <product.icon className="w-10 h-10 text-white mb-3 shrink-0" />
                    <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-white/90 text-xs line-clamp-3 mt-auto">{product.description}</p>
                  </div>

                  {/* Price */}
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <div className="text-center">
                      <p className={`text-3xl font-bold ${product.price === 'GRATUIT' ? 'text-green-600' : 'text-digiqo-primary'}`}>
                        {product.price}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {product.price === 'GRATUIT' ? 'Offre découverte' : 'Prestation unique'}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-4 flex-grow">
                    <ul className="space-y-2">
                      {product.features.slice(0, 6).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-digiqo-accent shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {product.features.length > 6 && (
                      <details className="mt-3 group">
                        <summary className="cursor-pointer text-xs text-gray-600 hover:text-gray-800 font-medium">
                          Voir plus
                        </summary>
                        <ul className="mt-2 space-y-1.5">
                          {product.features.slice(6).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0 mt-0.5" />
                              <span className="text-gray-600 text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="p-4 bg-gray-50 mt-auto">
                    {product.paymentLink !== '-' ? (
                      <a
                        href={product.paymentLink || generateContactUrl({ service: 'video', description: `Je souhaite commander : ${product.name}` })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full py-3 px-4 text-center font-semibold rounded-full transition-all text-sm
                          ${product.price === 'GRATUIT'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-digiqo-accent hover:text-digiqo-accent'
                          }`}
                      >
                        {product.price === 'GRATUIT' ? 'Obtenir gratuitement' : 'Commander'}
                      </a>
                    ) : (
                      <a
                        href={generateContactUrl({ service: 'video', description: `Je souhaite obtenir : ${product.name}` })}
                        className="block w-full py-3 px-4 text-center font-semibold rounded-full transition-all text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Obtenir gratuitement
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Prêt à booster votre communication ?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Nos experts créatifs sont là pour donner vie à vos idées et faire briller votre marque.
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