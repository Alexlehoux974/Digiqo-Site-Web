import Head from 'next/head'
import { motion } from 'framer-motion'
import { Palette, ArrowRight, Sparkles, Check, ChevronRight, Clock, PaintBucket, CheckSquare, Handshake, Brush, Layers, Package, RefreshCw } from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { ServiceHero } from './ServiceHero'
import { getProductsForService } from '../../lib/airtable-products'

interface BrandProduct {
  id: string
  name: string
  price: string
  description: string
  features: string[]
  paymentLink?: string
  icon?: any
  gradient?: string
  bestValue?: boolean
}


export default function IdentitePage() {
  const seoData = servicesSEO['identite-marque-reunion']

  // Get real products from Airtable - IDENTITÉ DE MARQUE (4 main products)
  const brandProductsData = getProductsForService('identite')
  
  // Map the products to our interface with proper icons and gradients
  const brandProducts: BrandProduct[] = [
    {
      id: brandProductsData[0]?.id || 'brand-001',
      name: 'Création Logo',
      price: '850€',
      description: 'Logo professionnel unique et mémorable pour votre marque',
      features: [
        '🎨 3 propositions de concepts créatifs',
        '✏️ Révisions illimitées pendant 30 jours',
        '📁 Tous les formats vectoriels et bitmap',
        '📜 Cession complète des droits',
        '🎯 Brief créatif approfondi',
        '🔍 Recherche de style et tendances',
        '📐 Versions noir et blanc incluses',
        '💾 Fichiers sources AI, EPS, PNG, JPG, PDF'
      ],
      paymentLink: brandProductsData.find(p => p.name === 'Création Logo')?.paymentLink,
      icon: Brush,
      gradient: 'from-purple-600 to-pink-700'
    },
    {
      id: brandProductsData[3]?.id || 'brand-004',
      name: 'Refonte Logo',
      price: '650€',
      description: 'Modernisation de votre logo existant en conservant votre ADN',
      features: [
        '🔍 Analyse de l\'existant',
        '💡 2 propositions de modernisation',
        '🧬 Conservation de l\'ADN de marque',
        '📋 Guide de transition',
        '✂️ Versions simplifiées',
        '🔄 Migration progressive',
        '📁 Tous les formats inclus'
      ],
      paymentLink: brandProductsData.find(p => p.name === 'Refonte Logo')?.paymentLink,
      icon: RefreshCw,
      gradient: 'from-emerald-600 to-teal-700'
    },
    {
      id: brandProductsData[1]?.id || 'brand-002',
      name: 'Charte Graphique Complète',
      price: '2 800€',
      description: 'Guide complet de votre identité visuelle pour une cohérence parfaite',
      features: [
        '📖 Document de 30+ pages personnalisé',
        '🎨 Logo et toutes ses déclinaisons',
        '🎨 Palette de couleurs complète',
        '🔤 Typographies principales et secondaires',
        '📏 Règles d\'utilisation détaillées',
        '✨ Éléments graphiques distinctifs',
        '📑 Templates pour documents',
        '🖼️ Exemples d\'applications concrètes'
      ],
      paymentLink: brandProductsData.find(p => p.name === 'Charte Graphique Complète')?.paymentLink,
      icon: Layers,
      gradient: 'from-indigo-600 to-blue-700',
      bestValue: true
    },
    {
      id: brandProductsData[2]?.id || 'brand-003',
      name: 'Branding Complet Startup',
      price: '5 500€',
      description: 'Pack identité complète pour lancer votre entreprise avec impact',
      features: [
        '🚀 Stratégie de marque complète',
        '🎨 Logo et charte graphique',
        '📇 Papeterie complète (cartes, en-têtes, etc.)',
        '💻 Templates digitaux (réseaux sociaux, email)',
        '🌐 Kit de lancement web',
        '📊 Présentation investisseurs',
        '🎯 Positionnement et messaging',
        '📚 Guide de communication',
        '🤝 3 mois d\'accompagnement inclus'
      ],
      paymentLink: brandProductsData.find(p => p.name === 'Branding Complet Startup')?.paymentLink,
      icon: Package,
      gradient: 'from-orange-600 to-red-700'
    }
  ]

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
      price: '650',
      priceCurrency: 'EUR',
      name: 'Services Identité de Marque',
      description: 'Création de logo, charte graphique et branding complet'
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

      {/* Hero Section */}
      <ServiceHero
        icon={Palette}
        title={{
          line1: "Identité de",
          line2: "Marque Premium"
        }}
        subtitle="Créez une identité visuelle unique et mémorable avec nos services de conception de logos et de chartes graphiques haute performance. Votre image de marque est votre première impression - nous la rendons inoubliable."
        ctaButtons={{
          primary: {
            text: "Démarrer mon projet",
            href: generateContactUrl({ 
              service: 'identite',
              description: 'Je souhaite créer mon identité de marque' 
            })
          },
          secondary: {
            text: "Découvrir le processus",
            href: "#processus"
          }
        }}
        gradientFrom="from-digiqo-primary"
        gradientTo="to-digiqo-accent"
        iconColor="text-digiqo-accent"
      />

      {/* Products Section */}
      <section id="produits" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Solutions d'Identité</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              De la création de logo à l'identité complète, nous avons la solution parfaite pour votre marque.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandProducts.map((product, index) => (
              <motion.div
                key={product.id}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="relative"
              >
                {product.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Le plus populaire
                    </span>
                  </div>
                )}
                
                <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full ${
                  product.bestValue ? 'ring-2 ring-digiqo-accent' : ''
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
                      <p className="text-gray-600 text-sm mt-1">Projet unique</p>
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
                      href={product.paymentLink || generateContactUrl({ service: 'identite', description: `Je souhaite commander : ${product.name}` })}
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
                answer: "Nous présentons généralement 2 à 3 concepts créatifs différents. Vous pourrez ensuite affiner votre préféré avec 2 tours de modifications inclus.",
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
                    href={(() => {
                      const brandProducts = getProductsForService('identite')
                      const logoProduct = brandProducts.find(p => p.name.includes('Logo'))
                      return logoProduct?.paymentLink || generateContactUrl({ 
                        service: 'identite',
                        description: 'Je souhaite une consultation gratuite pour mon identité de marque' 
                      })
                    })()}
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