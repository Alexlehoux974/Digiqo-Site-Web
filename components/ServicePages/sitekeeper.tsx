import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Shield, Server, RefreshCw, Headphones, Phone, ShoppingCart, Globe, Star } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'

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
    },
    {
      name: 'ShopKeeper Ultimate',
      price: '3 490€',
      duration: 'HT /an',
      description: 'Solution complète pour les boutiques e-commerce à fort trafic avec gestion avancée du catalogue, sécurité maximale et support dédié.',
      type: 'shop',
      features: [
        'Mises à jour hebdomadaires complètes avec tests automatisés',
        'Sauvegardes quotidiennes avec système de rollback',
        'Monitoring 24/7 des transactions et performances',
        'Révisions illimitées pour le catalogue produits',
        'Sécurité e-commerce avancée (PCI DSS, SSL, audits)',
        'Support dédié avec hotline prioritaire',
        'Optimisation continue des conversions',
        'Domaine, hébergement et abonnements à la charge du client'
      ]
    }
  ]

  const currentPackages = activeType === 'site' ? sitePackages : shopPackages

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SiteKeeper - Maintenance Site Web - Digiqo",
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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="container mx-auto px-4 py-20">
            <Link href="/#services">
              <Button
                variant="ghost"
                className="mb-8 text-gray-400 hover:text-white"
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#199CB7] to-[#2ABED9] bg-clip-text text-transparent">
                {activeType === 'site' ? 'SiteKeeper' : 'ShopKeeper'}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {activeType === 'site' 
                  ? 'Votre Site sous Haute Protection - Mises à jour, sauvegardes, sécurité… On s\'occupe de tout !'
                  : 'Votre eCommerce, notre Priorité ! - Mises à jour, sécurité, et gestion du catalogue : on veille sur votre boutique en ligne pour maximiser vos ventes.'
                }
              </p>
            </motion.div>

            {/* Type Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-12"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 inline-flex">
                <button
                  onClick={() => setActiveType('site')}
                  className={`px-8 py-4 rounded-md font-semibold transition-all flex items-center gap-2 ${
                    activeType === 'site'
                      ? 'bg-gradient-to-r from-[#199CB7] to-[#2ABED9] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                  Sites Web
                </button>
                <button
                  onClick={() => setActiveType('shop')}
                  className={`px-8 py-4 rounded-md font-semibold transition-all flex items-center gap-2 ${
                    activeType === 'shop'
                      ? 'bg-gradient-to-r from-[#199CB7] to-[#2ABED9] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  E-Commerce
                </button>
              </div>
            </motion.div>

            {/* Packages Grid */}
            <motion.section
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
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#199CB7] to-[#2ABED9] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Plus populaire
                      </div>
                    )}
                    <div className={`h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border ${
                      pkg.highlighted ? 'border-[#199CB7]' : 'border-gray-700'
                    } hover:border-[#199CB7]/50 transition-colors`}>
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                        <p className="text-gray-400 mb-4 text-sm">{pkg.description}</p>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-[#199CB7]">{pkg.price}</span>
                          <span className="text-gray-400">{pkg.duration}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-[#199CB7] mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        className={`w-full ${
                          pkg.highlighted 
                            ? 'bg-gradient-to-r from-[#199CB7] to-[#2ABED9] hover:from-[#1890AA] hover:to-[#25ACC7]' 
                            : 'bg-gray-700 hover:bg-gray-600'
                        } text-white font-semibold py-3`}
                      >
                        Choisir ce forfait
                      </Button>
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
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Pourquoi choisir {activeType === 'site' ? 'SiteKeeper' : 'ShopKeeper'} ?
              </h2>

              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Shield, title: 'Sécurité Maximale', desc: 'Protection contre les menaces et mises à jour de sécurité' },
                  { icon: Server, title: 'Haute Disponibilité', desc: 'Monitoring 24/7 et interventions rapides' },
                  { icon: RefreshCw, title: 'Toujours à Jour', desc: 'Mises à jour régulières et compatibilité garantie' },
                  { icon: Headphones, title: 'Support Dédié', desc: 'Une équipe d\'experts à votre service' }
                ].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-[#199CB7]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-[#199CB7]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm">{benefit.desc}</p>
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
              className="text-center"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Prêt à sécuriser votre {activeType === 'site' ? 'site web' : 'boutique en ligne'} ?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Contactez-nous pour discuter de vos besoins et choisir le forfait adapté
                </p>
                <Button 
                  className="bg-gradient-to-r from-[#199CB7] to-[#2ABED9] hover:from-[#1890AA] hover:to-[#25ACC7] text-white font-semibold py-6 px-8 text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Être rappelé(e)
                </Button>
              </div>
            </motion.section>
          </div>
        </div>
      </ServiceLayout>
    </>
  )
}