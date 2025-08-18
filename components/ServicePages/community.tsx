import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { 
  MessageCircle, 
  ArrowRight, 
  BarChart3,
  Gift,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Target,
  ArrowUpRight,
  Crown,
  Rocket,
  TrendingUp
} from 'lucide-react'
// Removed unused icon imports
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { ServiceHero } from './ServiceHero'
import { getProductsForService } from '../../lib/airtable-products'
// Removed unused Button import

interface Formula {
  id: string
  name: string
  summary: string
  price: {
    monthly: string
    annual: string
  }
  highlights: string[]
  gradient: string
  accentColor: string
  icon: any
  sections: {
    content: {
      title: string
      items: string[]
    }
    engagement: {
      title: string
      items: string[]
    }
    analytics: {
      title: string
      items: string[]
    }
    bonus?: {
      title: string
      items: string[]
    }
  }
  paymentLinkMonthly?: string
  paymentLinkAnnual?: string
  bestValue?: boolean
}

export default function CommunityPage() {
  const [engagementType, setEngagementType] = useState<'mensuel' | 'annuel'>('mensuel')
  const seoData = servicesSEO['community-management-974']
  
  // Get real products from Airtable
  const communityProducts = getProductsForService('community')
  
  // Map products to formulas
  const essMonthly = communityProducts.find(p => p.name.includes('Essentielle') && p.name.includes('Mensuelle'))
  const essAnnual = communityProducts.find(p => p.name.includes('Essentielle') && p.name.includes('Annuelle'))
  const croissMonthly = communityProducts.find(p => p.name.includes('Croissance') && p.name.includes('Mensuelle'))
  const croissAnnual = communityProducts.find(p => p.name.includes('Croissance') && p.name.includes('Annuelle'))
  const premMonthly = communityProducts.find(p => p.name.includes('Premium') && p.name.includes('Mensuelle'))
  const premAnnual = communityProducts.find(p => p.name.includes('Premium') && p.name.includes('Annuelle'))
  
  const formulas: Formula[] = [
    {
      id: 'formula-essentielle',
      name: 'Essentielle',
      summary: 'Idéal pour maintenir une présence active sur les réseaux sociaux',
      price: {
        monthly: essMonthly?.priceFormatted || '349,00 €',
        annual: essAnnual?.priceFormatted || '3 350,00 €'
      },
      highlights: [
        '2 réseaux sociaux gérés',
        '3 posts + 3 stories/semaine',
        'Modération J+1'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: 'emerald',
      icon: Sparkles,
      sections: {
        content: {
          title: '📱 Gestion & Création',
          items: [
            'Gestion de 2 réseaux sociaux au choix',
            '3 publications par semaine',
            '3 stories par semaine',
            'Création de visuels adaptés',
            'Rédaction de contenus engageants',
            'Calendrier éditorial mensuel'
          ]
        },
        engagement: {
          title: '💬 Modération & Engagement',
          items: [
            'Modération des commentaires',
            'Réponses aux messages privés (J+1)',
            'Gestion basique de la e-réputation',
            'Veille concurrentielle basique'
          ]
        },
        analytics: {
          title: '📊 Analyse & Reporting',
          items: [
            'Rapport mensuel de performance',
            'Statistiques d\'engagement',
            'Recommandations d\'amélioration'
          ]
        },
        bonus: engagementType === 'annuel' ? {
          title: '🎁 Bonus annuel',
          items: [
            '20% de réduction sur le tarif mensuel',
            '1 shooting photo professionnel offert',
            'Audit réseaux sociaux trimestriel',
            'Formation équipe aux réseaux sociaux'
          ]
        } : undefined
      },
      paymentLinkMonthly: essMonthly?.paymentLink,
      paymentLinkAnnual: essAnnual?.paymentLink
    },
    {
      id: 'formula-croissance',
      name: 'Croissance',
      summary: 'Pour développer activement votre communauté et votre engagement',
      price: {
        monthly: croissMonthly?.priceFormatted || '649,00 €',
        annual: croissAnnual?.priceFormatted || '6 230,00 €'
      },
      highlights: [
        '3-4 réseaux sociaux gérés',
        '5 posts + 5 stories/semaine',
        '1 Reel/TikTok par semaine'
      ],
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: 'blue',
      icon: Rocket,
      sections: {
        content: {
          title: '📱 Gestion & Création',
          items: [
            'Gestion de 3-4 réseaux sociaux',
            '5 publications par semaine',
            '5 stories par semaine',
            '1 Reel/TikTok par semaine',
            'Création de contenus variés',
            'Planning éditorial bi-mensuel',
            'Photographie et retouche'
          ]
        },
        engagement: {
          title: '💬 Modération & Engagement',
          items: [
            'Modération avancée',
            'Réponses aux messages privés (H+4)',
            'Stratégie de hashtags optimisée',
            'Gestion des avis et réputation en ligne',
            'Animation de la communauté',
            'Jeux concours mensuels'
          ]
        },
        analytics: {
          title: '📊 Analyse & Reporting',
          items: [
            'Analyse bi-mensuelle des performances',
            'Tracking des conversions',
            'Étude de l\'audience',
            'Benchmark concurrentiel'
          ]
        },
        bonus: engagementType === 'annuel' ? {
          title: '🎁 Bonus annuel',
          items: [
            '20% de réduction sur le tarif mensuel',
            '2 shootings photo professionnels offerts',
            '1 vidéo promotionnelle offerte',
            'Audit concurrentiel trimestriel',
            'Accès prioritaire aux nouvelles fonctionnalités'
          ]
        } : undefined
      },
      paymentLinkMonthly: croissMonthly?.paymentLink,
      paymentLinkAnnual: croissAnnual?.paymentLink,
      bestValue: true
    },
    {
      id: 'formula-premium',
      name: 'Premium',
      summary: 'Gestion complète et stratégique de votre présence sociale',
      price: {
        monthly: premMonthly?.priceFormatted || '1 249,00 €',
        annual: premAnnual?.priceFormatted || '11 990,00 €'
      },
      highlights: [
        'Tous réseaux sociaux',
        'Publications quotidiennes',
        '2-3 Reels/TikToks par semaine'
      ],
      gradient: 'from-purple-500 to-pink-600',
      accentColor: 'purple',
      icon: Crown,
      sections: {
        content: {
          title: '📱 Gestion & Création',
          items: [
            'Gestion de tous vos réseaux sociaux',
            'Publications quotidiennes',
            'Stories quotidiennes',
            '2-3 Reels/TikToks par semaine',
            'Création de contenu exclusif',
            'Live streaming mensuel',
            'Production vidéo professionnelle',
            'Direction artistique'
          ]
        },
        engagement: {
          title: '💬 Modération & Engagement',
          items: [
            'Modération en temps réel',
            'Réponses immédiates aux messages',
            'Gestion des influenceurs et partenariats',
            'Stratégie de growth hacking',
            'Gestion de crise',
            'Community management 24/7'
          ]
        },
        analytics: {
          title: '📊 Analyse & Reporting',
          items: [
            'Rapport hebdomadaire détaillé',
            'Dashboard en temps réel',
            'ROI et KPIs avancés',
            'Réunion stratégique mensuelle',
            'Recommandations personnalisées'
          ]
        },
        bonus: engagementType === 'annuel' ? {
          title: '🎁 Bonus annuel',
          items: [
            '20% de réduction sur le tarif mensuel',
            '4 shootings photo professionnels offerts',
            '2 vidéos promotionnelles offertes',
            'Community manager dédié',
            'Veille et benchmark concurrentiel mensuel',
            'Formation complète de votre équipe'
          ]
        } : undefined
      },
      paymentLinkMonthly: premMonthly?.paymentLink,
      paymentLinkAnnual: premAnnual?.paymentLink
    }
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Community Management La Réunion',
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
    offers: formulas.map(formula => ({
      '@type': 'Offer',
      name: `Formule ${formula.name}`,
      price: formula.price.monthly.replace('€', '').replace(/\s/g, ''),
      priceCurrency: 'EUR'
    }))
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
        icon={MessageCircle}
        title={{
          line1: "Community",
          line2: "Management"
        }}
        subtitle="Développez votre communauté et votre engagement sur les réseaux sociaux"
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Demander un devis",
            href: generateContactUrl({ service: 'community' })
          }
        }}
        gradientFrom="from-digiqo-secondary"
        gradientTo="to-digiqo-secondary-dark"
        iconColor="text-digiqo-secondary"
      />

      {/* Formules Section */}
      <section id="formules" className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Choisissez la formule adaptée à vos besoins et votre budget
            </p>

            {/* Engagement Selector */}
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-1 shadow-lg">
                <button
                  onClick={() => setEngagementType('mensuel')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    engagementType === 'mensuel'
                      ? 'bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Engagement mensuel
                </button>
                <button
                  onClick={() => setEngagementType('annuel')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    engagementType === 'annuel'
                      ? 'bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Engagement annuel
                  <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">-20%</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Formulas Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {formulas.map((formula, index) => (
              <motion.div
                key={formula.id}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="relative"
              >
                {formula.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      Meilleur rapport qualité/prix
                    </span>
                  </div>
                )}
                
                <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  formula.bestValue ? 'ring-2 ring-digiqo-accent' : ''
                }`}>
                  {/* Header */}
                  <div className={`p-8 bg-gradient-to-br ${formula.gradient}`}>
                    <formula.icon className="w-12 h-12 text-white mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">{formula.name}</h3>
                    <p className="text-white/90 text-sm">{formula.summary}</p>
                  </div>

                  {/* Price */}
                  <div className="p-8 bg-gray-50">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-digiqo-primary">
                        {engagementType === 'mensuel' ? formula.price.monthly : formula.price.annual}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {engagementType === 'mensuel' ? '/mois' : '/an'}
                      </p>
                      {engagementType === 'annuel' && (
                        <p className="text-green-600 text-sm mt-1">
                          Économisez 20% par rapport au mensuel
                        </p>
                      )}
                    </div>

                    {/* Highlights */}
                    <div className="mt-6 space-y-3">
                      {formula.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="p-8 space-y-6">
                    {/* Content Section */}
                    <div>
                      <h4 className="font-bold text-digiqo-primary mb-3">{formula.sections.content.title}</h4>
                      <ul className="space-y-2">
                        {formula.sections.content.items.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <ChevronRight className="w-4 h-4 text-digiqo-accent mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Engagement Section */}
                    <div>
                      <h4 className="font-bold text-digiqo-primary mb-3">{formula.sections.engagement.title}</h4>
                      <ul className="space-y-2">
                        {formula.sections.engagement.items.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <ChevronRight className="w-4 h-4 text-digiqo-accent mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Analytics Section */}
                    <div>
                      <h4 className="font-bold text-digiqo-primary mb-3">{formula.sections.analytics.title}</h4>
                      <ul className="space-y-2">
                        {formula.sections.analytics.items.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <ChevronRight className="w-4 h-4 text-digiqo-accent mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bonus Section */}
                    {formula.sections.bonus && (
                      <div className="border-t pt-6">
                        <h4 className="font-bold text-digiqo-primary mb-3">{formula.sections.bonus.title}</h4>
                        <ul className="space-y-2">
                          {formula.sections.bonus.items.map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <Gift className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-600 font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="p-8 pt-0">
                    <motion.a
                      href={
                        engagementType === 'mensuel'
                          ? (formula.paymentLinkMonthly || generateContactUrl({ 
                              formula: formula.name.toLowerCase(), 
                              service: 'community',
                              description: `Formule ${formula.name} - Engagement mensuel`
                            }))
                          : (formula.paymentLinkAnnual || generateContactUrl({ 
                              formula: formula.name.toLowerCase(), 
                              service: 'community',
                              description: `Formule ${formula.name} - Engagement annuel`
                            }))
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={ANIMATION.tap.scaleSmall}
                      className={`block w-full text-center px-8 py-4 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Choisir cette formule
                      <ArrowUpRight className="inline-block ml-2 w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Notre <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark bg-clip-text text-transparent">Processus</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Une approche structurée pour développer votre présence sociale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Audit',
                description: 'Analyse complète de votre présence actuelle',
                icon: BarChart3,
                color: 'from-blue-500 to-indigo-600'
              },
              {
                number: '02',
                title: 'Stratégie',
                description: 'Définition d\'objectifs et de KPIs clairs',
                icon: Target,
                color: 'from-purple-500 to-pink-600'
              },
              {
                number: '03',
                title: 'Création',
                description: 'Production de contenus engageants',
                icon: Sparkles,
                color: 'from-orange-500 to-red-600'
              },
              {
                number: '04',
                title: 'Optimisation',
                description: 'Ajustements basés sur les performances',
                icon: TrendingUp,
                color: 'from-green-500 to-teal-600'
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-200 mb-2">{step.number}</div>
                  <h3 className="text-xl font-bold text-digiqo-primary mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à développer votre communauté ?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Contactez-nous pour discuter de votre stratégie sociale
            </p>
            <motion.a
              href={generateContactUrl({ service: 'community' })}
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-digiqo-secondary font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}