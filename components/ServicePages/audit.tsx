import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Globe, Share2, Megaphone, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'

interface AuditCategory {
  title: string
  description: string
  icon: any
  points: string[]
}

export default function AuditPage() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const seoData = servicesSEO['audit-digital-gratuit-reunion']

  const auditCategories: AuditCategory[] = [
    {
      title: 'Analyse de vos Supports',
      description: 'Nous analysons en détail votre site web, blog, boutique en ligne, application mobile, tunnel de vente ou plateforme pour identifier les points forts et les opportunités d\'amélioration.',
      icon: Globe,
      points: [
        'Performance et vitesse de chargement',
        'Expérience utilisateur (UX) et navigation',
        'Responsive design et compatibilité mobile',
        'Architecture de l\'information',
        'Analyse SEO technique',
        'Sécurité et certificats SSL',
        'Taux de conversion et parcours client',
        'Accessibilité web (WCAG)'
      ]
    },
    {
      title: 'Analyse de vos Réseaux Sociaux',
      description: 'Nous évaluons votre présence sur les réseaux sociaux, y compris Facebook, Instagram, Twitter, LinkedIn et TikTok, pour optimiser votre stratégie de communication et augmenter votre engagement.',
      icon: Share2,
      points: [
        'Cohérence de l\'image de marque',
        'Qualité et pertinence du contenu',
        'Taux d\'engagement et portée',
        'Fréquence de publication',
        'Interaction avec la communauté',
        'Analyse de la concurrence',
        'Optimisation des profils',
        'Stratégie de hashtags'
      ]
    },
    {
      title: 'Analyse de vos Campagnes Pub',
      description: 'Nous scrutons vos campagnes SMA et SEA (Réseaux Sociaux et Moteurs de Recherche), Meta Ads, TikTok Ads et Google Ads pour maximiser leur efficacité et atteindre vos objectifs de conversion.',
      icon: Megaphone,
      points: [
        'ROI et performance des campagnes',
        'Ciblage et audiences',
        'Qualité des créatives publicitaires',
        'Budget et enchères optimales',
        'Taux de conversion',
        'Score de qualité Google Ads',
        'A/B testing et optimisations',
        'Tracking et attribution'
      ]
    }
  ]

  const auditBenefits = [
    {
      title: 'Diagnostic Complet',
      description: '360° de votre présence digitale'
    },
    {
      title: 'Rapport Détaillé',
      description: 'Document PDF avec recommandations'
    },
    {
      title: '100% Gratuit',
      description: 'Sans engagement ni frais cachés'
    },
    {
      title: 'Expertise Locale',
      description: 'Spécialistes du marché réunionnais'
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Audit Digital Gratuit - Digiqo",
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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
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
        <meta property="og:image" content="https://digiqo.fr/og-audit.jpg" />
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
            <Link href="/#contact">
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                100% GRATUIT
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#199CB7] to-[#2ABED9] bg-clip-text text-transparent">
                Audit Digital Gratuit
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Audit de votre Environnement Digital - Découvrez le potentiel inexploité de votre présence en ligne
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-20"
            >
              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {auditBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Audit Categories */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Notre Audit Complet en 3 Axes
              </h2>

              <div className="max-w-6xl mx-auto">
                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {auditCategories.map((category, index) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(index)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                          selectedCategory === index
                            ? 'bg-gradient-to-r from-[#199CB7] to-[#2ABED9] text-white shadow-lg shadow-[#199CB7]/25'
                            : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {category.title}
                      </button>
                    )
                  })}
                </div>

                {/* Category Content */}
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                >
                  <p className="text-gray-300 mb-8 text-lg">
                    {auditCategories[selectedCategory].description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {auditCategories[selectedCategory].points.map((point, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-[#199CB7] flex-shrink-0" />
                        <span className="text-gray-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Process Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Comment ça marche ?
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {[
                    { step: '1', title: 'Demandez votre audit', desc: 'Remplissez le formulaire en 2 minutes' },
                    { step: '2', title: 'Analyse approfondie', desc: 'Nos experts analysent votre présence digitale' },
                    { step: '3', title: 'Rapport personnalisé', desc: 'Recevez votre audit complet sous 48h' },
                    { step: '4', title: 'Session stratégique', desc: 'Échangez avec nos experts sur les recommandations' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-center space-x-6"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#199CB7] to-[#2ABED9] flex items-center justify-center text-white text-2xl font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                      {index < 3 && (
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-[#199CB7]/20 to-[#2ABED9]/20 rounded-2xl p-12 border border-[#199CB7]/30">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Prêt à booster votre présence digitale ?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Découvrez gratuitement les opportunités d'amélioration de votre stratégie digitale
                </p>
                <Button 
                  className="bg-gradient-to-r from-[#199CB7] to-[#2ABED9] hover:from-[#1890AA] hover:to-[#25ACC7] text-white font-semibold py-6 px-8 text-lg shadow-lg shadow-[#199CB7]/25"
                >
                  J'en profite - C'est gratuit !
                </Button>
                <p className="text-gray-500 text-sm mt-4">
                  Aucune carte bancaire requise • Résultats sous 48h
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </ServiceLayout>
    </>
  )
}