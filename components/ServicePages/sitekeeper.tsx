import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Shield, Server, RefreshCw, Headphones, Phone, ShoppingCart, Globe, Star, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'
import { generateContactUrl } from '../../lib/contact-utils'
import { ServiceHero } from './ServiceHero'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'

interface MaintenancePackage {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  highlighted?: boolean
  type: 'site' | 'shop'
}

export default function SiteKeeperPage() {
  const [activeType, setActiveType] = useState<'site' | 'shop'>('site')
  const seoData = servicesSEO['maintenance-site-web-reunion']

  const sitePackages: MaintenancePackage[] = [
    {
      name: 'SiteKeeper Essential',
      price: '490€',
      duration: 'HT /an',
      description: 'Idéal pour les petits sites vitrines avec peu de mises à jour et une gestion technique basique.',
      type: 'site',
      features: [
        'Mises à jour mensuelles du CMS (WordPress) et des plugins',
        'Sauvegardes hebdomadaires automatisées avec restauration rapide',
        'Monitoring de la disponibilité en temps réel',
        '2 révisions/retouches par an pour ajustements mineurs',
        'Mises à jour PHP sur demande (facturées séparément)',
        'Support technique basique (réponse sous 72h)',
        'Domaine, hébergement et abonnements à la charge du client'
      ]
    },
    {
      name: 'SiteKeeper Pro',
      price: '990€',
      duration: 'HT /an',
      description: 'Parfait pour les sites de taille moyenne nécessitant un suivi régulier, des performances optimisées et des mises à jour fréquentes.',
      type: 'site',
      highlighted: true,
      features: [
        'Mises à jour hebdomadaires du CMS, plugins et thèmes',
        'Sauvegardes hebdomadaires avec vérification manuelle',
        'Monitoring performance et disponibilité',
        '4 révisions/retouches par an pour ajustements mineurs',
        'Mises à jour PHP incluses avec tests de compatibilité',
        'Support prioritaire (réponse sous 48h)',
        'Domaine, hébergement et abonnements à la charge du client'
      ]
    },
    {
      name: 'SiteKeeper Ultimate',
      price: '1 990€',
      duration: 'HT /an',
      description: 'Solution complète pour les sites complexes avec un fort trafic, offrant sécurité renforcée, révisions illimitées et support premium.',
      type: 'site',
      features: [
        'Mises à jour hebdomadaires complètes (CMS, plugins, thèmes, PHP)',
        'Sauvegardes quotidiennes avec restauration prioritaire',
        'Monitoring complet en temps réel (disponibilité, performances, sécurité)',
        '6 révisions/retouches par an pour ajustements mineurs',
        'Sécurité renforcée (pare-feu, protection DDoS, audits semestriels)',
        'Support technique premium (réponse sous 24h)',
        'Domaine, hébergement et abonnements à la charge du client'
      ]
    }
  ]

  const shopPackages: MaintenancePackage[] = [
    {
      name: 'ShopKeeper Essential',
      price: '690€',
      duration: 'HT /an',
      description: 'Ce forfait est parfait pour les petites boutiques en ligne avec un catalogue limité et des besoins techniques simples.',
      type: 'shop',
      features: [
        'Mises à jour mensuelles du CMS (Shopify/WooCommerce) et passerelle de paiement',
        'Sauvegardes hebdomadaires automatisées avec restauration rapide',
        'Monitoring de la disponibilité de la boutique',
        '2 révisions/retouches par an (produits, textes)',
        'Support technique basique (réponse sous 72h)',
        'Domaine, hébergement et abonnements à la charge du client'
      ]
    },
    {
      name: 'ShopKeeper Pro',
      price: '1 990€',
      duration: 'HT /an',
      description: 'Destiné aux boutiques en ligne de taille moyenne, ce forfait propose un suivi technique plus régulier avec des améliorations de performance et de sécurité.',
      type: 'shop',
      highlighted: true,
      features: [
        'Mises à jour hebdomadaires du CMS, plugins et passerelle de paiement',
        'Sauvegardes hebdomadaires avec vérification manuelle',
        'Monitoring des performances et des transactions',
        '4 révisions/retouches par an (produits, textes)',
        'Optimisation des performances pour garantir la fluidité',
        'Support prioritaire (réponse sous 48h)',
        'Domaine, hébergement et abonnements à la charge du client'
      ]
    }
  ]

  const currentPackages = activeType === 'site' ? sitePackages : shopPackages

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sitekeeper/Shopkeeper - Maintenance Site Web - Digiqo",
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
      "name": "Services de Maintenance Web",
      "itemListElement": [...sitePackages, ...shopPackages].map(pkg => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": pkg.name,
          "description": pkg.description
        },
        "price": pkg.price.replace('€', ''),
        "priceCurrency": "EUR"
      }))
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
        <meta property="og:image" content="https://digiqo.fr/og-sitekeeper.jpg" />
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
        {/* Hero Section */}
        <ServiceHero
          icon={activeType === 'site' ? Globe : ShoppingCart}
          title={{
            line1: "Sitekeeper/Shopkeeper",
            line2: "Maintenance Premium"
          }}
          subtitle={activeType === 'site' 
            ? "Votre Site sous Haute Protection - Mises à jour, sauvegardes, sécurité… On s'occupe de tout !"
            : "Votre eCommerce, notre Priorité ! - Mises à jour, sécurité, et gestion du catalogue : on veille sur votre boutique en ligne pour maximiser vos ventes."
          }
          ctaButtons={{
            primary: {
              text: "Voir nos forfaits",
              href: "#forfaits"
            },
            secondary: {
              text: "Audit gratuit",
              href: generateContactUrl({ 
                service: 'sitekeeper',
                description: 'Je souhaite un audit gratuit de mon site' 
              })
            }
          }}
          gradientFrom="from-digiqo-secondary"
          gradientTo="to-blue-500"
          iconColor="text-digiqo-secondary"
        />

        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-16">

            {/* Type Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-12"
            >
              <div className="bg-gray-100 rounded-full p-1 inline-flex">
                <button
                  onClick={() => setActiveType('site')}
                  className={`px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    activeType === 'site'
                      ? 'bg-gradient-to-r from-digiqo-secondary to-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  Sites Web
                </button>
                <button
                  onClick={() => setActiveType('shop')}
                  className={`px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    activeType === 'shop'
                      ? 'bg-gradient-to-r from-digiqo-secondary to-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  E-Commerce
                </button>
              </div>
            </motion.div>

            {/* Packages Grid */}
            <motion.section
              id="forfaits"
              key={activeType}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {currentPackages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className={`relative ${pkg.highlighted ? 'scale-105' : ''}`}
                  >
                    {pkg.highlighted && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-digiqo-secondary to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center z-20 shadow-xl whitespace-nowrap">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        Plus populaire
                      </div>
                    )}
                    <div className={`h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                      pkg.highlighted ? 'border-digiqo-secondary' : 'border-gray-100'
                    }`}>
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-digiqo-primary mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-digiqo-secondary">{pkg.price}</span>
                          <span className="text-gray-600">{pkg.duration}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-digiqo-secondary mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <motion.a
                        href={generateContactUrl({
                          service: 'sitekeeper',
                          description: `Je suis intéressé par le forfait ${pkg.name} - ${pkg.description}`
                        })}
                        whileHover={ANIMATION.hover.scale}
                        whileTap={ANIMATION.tap.scale}
                        className="block"
                      >
                        <Button 
                          className={`w-full ${
                            pkg.highlighted 
                              ? 'bg-gradient-to-r from-digiqo-secondary to-blue-500 hover:from-digiqo-secondary/90 hover:to-blue-500/90 text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-digiqo-primary'
                          } font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                          Choisir ce forfait
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Benefits Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20 py-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-digiqo-primary mb-12 text-center">
                Pourquoi choisir <span className="text-digiqo-secondary">Sitekeeper/Shopkeeper</span> ?
              </h2>

              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto px-8">
                {[
                  { icon: Shield, title: 'Sécurité Maximale', desc: 'Protection contre les menaces et mises à jour de sécurité', color: 'from-red-500 to-pink-500' },
                  { icon: Server, title: 'Haute Disponibilité', desc: 'Monitoring 24/7 et interventions rapides', color: 'from-blue-500 to-cyan-500' },
                  { icon: RefreshCw, title: 'Toujours à Jour', desc: 'Mises à jour régulières et compatibilité garantie', color: 'from-green-500 to-emerald-500' },
                  { icon: Headphones, title: 'Support Dédié', desc: 'Une équipe d\'experts à votre service', color: 'from-purple-500 to-indigo-500' }
                ].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: getStaggerDelay(index, 0.15),
                        ease: "easeOut"
                      }}
                      className="text-center group relative"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative"
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40`}
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                        <motion.div 
                          className={`relative w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-shadow`}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <motion.div
                            animate={{ 
                              rotate: index % 2 === 0 ? [0, 360] : [360, 0]
                            }}
                            transition={{ 
                              duration: 20, 
                              repeat: Infinity, 
                              ease: "linear" 
                            }}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                      
                      <motion.h3 
                        className="text-lg font-semibold text-digiqo-primary mb-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {benefit.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-600 text-sm"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {benefit.desc}
                      </motion.p>
                      
                      {/* Particules flottantes */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-2 h-2 bg-gradient-to-br ${benefit.color} rounded-full`}
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${20 + i * 25}%`
                            }}
                            animate={{
                              y: [-20, 20],
                              x: [-10, 10],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3,
                              delay: i * 0.5,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center py-16"
            >
              <div className="bg-gradient-to-r from-digiqo-secondary to-blue-500 rounded-3xl p-12 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Prêt à sécuriser votre {activeType === 'site' ? 'site web' : 'boutique en ligne'} ?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Contactez-nous pour discuter de vos besoins et choisir le forfait adapté
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href={generateContactUrl({
                      service: 'sitekeeper',
                      description: `Je souhaite être rappelé pour discuter de la maintenance de mon ${activeType === 'site' ? 'site web' : 'boutique en ligne'}`
                    })}
                    whileHover={ANIMATION.hover.scale}
                    whileTap={ANIMATION.tap.scale}
                  >
                    <Button 
                      className="bg-white text-digiqo-secondary hover:bg-gray-100 font-semibold py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Être rappelé(e)
                    </Button>
                  </motion.a>
                  <motion.a
                    href="#forfaits"
                    whileHover={ANIMATION.hover.scale}
                    whileTap={ANIMATION.tap.scale}
                  >
                    <Button 
                      className="bg-digiqo-primary text-white hover:bg-digiqo-primary-dark font-semibold py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Voir les forfaits
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.a>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </ServiceLayout>
    </>
  )
}