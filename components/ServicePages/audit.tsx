import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Globe, Share2, Megaphone, ChevronRight, Sparkles, Search, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'
import { generateContactUrl } from '../../lib/contact-utils'
import { ServiceHero } from './ServiceHero'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'

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
      description: 'Analyse de votre marché local'
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
        {/* Hero Section */}
        <ServiceHero
          icon={Search}
          title={{
            line1: "Audit Digital",
            line2: "100% Gratuit"
          }}
          subtitle="Découvrez le potentiel inexploité de votre présence en ligne"
          ctaButtons={{
            primary: {
              text: "Demander mon audit",
              href: generateContactUrl({ service: 'audit', description: 'Je souhaite recevoir mon audit digital gratuit' })
            },
            secondary: {
              text: "En savoir plus",
              href: "#process"
            }
          }}
          gradientFrom="from-digiqo-secondary"
          gradientTo="to-blue-400"
          iconColor="text-digiqo-secondary"
        />

        {/* Benefits Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Pourquoi un <span className="bg-gradient-to-r from-digiqo-secondary to-blue-400 bg-clip-text text-transparent">Audit Digital</span> ?
              </h2>
              <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
                Un diagnostic complet pour identifier vos opportunités de croissance
              </p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {auditBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  {...ANIMATION.entry.fadeInUp}
                  whileInView={ANIMATION.entry.fadeInUp.animate}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(index) }}
                  className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-digiqo-primary mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Categories Section */}
        <section className="py-24 bg-gradient-to-br from-white to-digiqo-secondary/5">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Notre Audit <span className="bg-gradient-to-r from-digiqo-secondary to-blue-400 bg-clip-text text-transparent">Complet</span>
              </h2>
              <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
                3 axes d'analyse pour une vision à 360° de votre présence digitale
              </p>
            </motion.div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {auditCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    {...ANIMATION.entry.fadeIn}
                    whileInView={ANIMATION.entry.fadeIn.animate}
                    viewport={{ once: true }}
                    transition={{ delay: getStaggerDelay(index) }}
                    whileHover={ANIMATION.hover.scale}
                    whileTap={ANIMATION.tap.scale}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                      selectedCategory === index
                        ? 'bg-gradient-to-r from-digiqo-secondary to-blue-400 text-white shadow-lg'
                        : 'bg-white text-digiqo-primary hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {category.title}
                  </motion.button>
                )
              })}
            </div>

            {/* Category Content */}
            <motion.div
              key={selectedCategory}
              {...ANIMATION.entry.fadeInUpLarge}
              whileInView={ANIMATION.entry.fadeInUpLarge.animate}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <p className="text-gray-700 mb-8 text-lg">
                {auditCategories[selectedCategory].description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {auditCategories[selectedCategory].points.map((point, index) => (
                  <motion.div 
                    key={index} 
                    {...ANIMATION.entry.fadeInUp}
                    whileInView={ANIMATION.entry.fadeInUp.animate}
                    viewport={{ once: true }}
                    transition={{ delay: getStaggerDelay(index) }}
                    className="flex items-center space-x-3"
                  >
                    <Check className="h-5 w-5 text-digiqo-secondary flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Comment ça <span className="bg-gradient-to-r from-digiqo-secondary to-blue-400 bg-clip-text text-transparent">marche</span> ?
              </h2>
              <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
                Un processus simple et rapide pour obtenir votre audit
              </p>
            </motion.div>

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
                    {...ANIMATION.entry.fadeInUp}
                    whileInView={ANIMATION.entry.fadeInUp.animate}
                    viewport={{ once: true }}
                    transition={{ delay: getStaggerDelay(index) }}
                    className="flex items-center space-x-6 bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-digiqo-secondary to-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-digiqo-primary mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                100% GRATUIT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Prêt à booster votre présence digitale ?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Découvrez gratuitement les opportunités d'amélioration de votre stratégie digitale
              </p>
              <motion.a
                href={generateContactUrl({ service: 'audit', description: 'Je souhaite recevoir mon audit digital gratuit' })}
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                J'en profite - C'est gratuit !
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <p className="text-white/60 text-sm mt-6">
                Aucune carte bancaire requise • Résultats sous 48h
              </p>
            </motion.div>
          </div>
        </section>
      </ServiceLayout>
    </>
  )
}