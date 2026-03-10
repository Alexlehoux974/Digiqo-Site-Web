import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { 
  MessageCircle, 
  ArrowRight, 
  BarChart3,
  CheckCircle2,
  Sparkles,
  Target,
  ArrowUpRight,
  Crown,
  Rocket,
  TrendingUp,
  Star
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { generateWhatsAppLink } from '../../lib/whatsapp-utils'
import { ServiceHero } from './ServiceHero'

interface Formula {
  id: string
  name: string
  summary: string
  price: {
    monthly: string
    annual: string
    annualSaving?: string
  }
  highlights: string[]
  gradient: string
  accentColor: string
  icon: any
  features: string[]
  paymentLinkMonthly?: string
  paymentLinkAnnual?: string
  bestValue?: boolean
}

export default function CommunityPage() {
  const [engagementType, setEngagementType] = useState<'mensuel' | 'annuel'>('mensuel')
  const seoData = servicesSEO['community-management-974']
  
  // Données réelles depuis Airtable via MCP
  const formulas: Formula[] = [
    {
      id: 'formula-essentiel',
      name: 'Essentiel',
      summary: 'Présence active et régulière sur les réseaux sociaux',
      price: {
        monthly: '662,40 €',
        annual: '6 359,04 €',
        annualSaving: '20% de remise'
      },
      highlights: [
        '5 posts par mois',
        '5 stories par mois',
        '1 déplacement sur site (1h)'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: 'emerald',
      icon: Sparkles,
      features: engagementType === 'mensuel' ? [
        '📝 5 posts, 5 stories, 0 reels / mois',
        '🚗 1 déplacement sur site (1h)',
        '⏱️ Réponses aux commentaires et messages en 48h ouvrées',
        '🕘 Gestion des interactions pendant les heures de bureau (lundi-vendredi, 9h-18h)',
        '🧹 Suppression des commentaires inappropriés si nécessaire',
        '📊 Abonnement de 3 mois minimum',
        '♻️ Renouvellement automatique mensuel après 3 mois'
      ] : [
        '📝 5 posts, 5 stories, 0 reels / mois',
        '🚗 1 déplacement sur site (1h)',
        '⏱️ Réponses aux commentaires et messages en 48h ouvrées',
        '🕘 Gestion des interactions pendant les heures de bureau (lundi-vendredi, 9h-18h)',
        '🧹 Suppression des commentaires inappropriés si nécessaire',
        '🎁 20% de remise sur le tarif annuel',
        '📅 Engagement ferme de 12 mois',
        '♻️ Renouvellement automatique annuel'
      ],
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/TNDWcYjrn6tgWJ?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/NGdjtzHrmW6772ts?referrer=PAYMENT_LINK'
    },
    {
      id: 'formula-dynamique',
      name: 'Dynamique',
      summary: 'Pour développer activement votre communauté',
      price: {
        monthly: '1 142,40 €',
        annual: '10 967,04 €',
        annualSaving: '20% de remise'
      },
      highlights: [
        '10 posts par mois',
        '10 stories par mois',
        '2 Reels/TikToks par mois'
      ],
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: 'blue',
      icon: Rocket,
      features: engagementType === 'mensuel' ? [
        '📝 10 posts, 10 stories, 2 reels / mois',
        '🚗 1 déplacement sur site (2h)',
        '⏱️ Réponses aux commentaires et messages en 24h ouvrées',
        '🕘 Gestion des interactions pendant les heures de bureau (lundi-vendredi, 9h-18h)',
        '🧹 Suppression des commentaires inappropriés si nécessaire',
        '📊 Abonnement de 3 mois minimum',
        '♻️ Renouvellement automatique mensuel après 3 mois'
      ] : [
        '📝 10 posts, 10 stories, 2 reels / mois',
        '🚗 1 déplacement sur site (2h)',
        '⏱️ Réponses aux commentaires et messages en 24h ouvrées',
        '🕘 Gestion des interactions pendant les heures de bureau (lundi-vendredi, 9h-18h)',
        '🧹 Suppression des commentaires inappropriés si nécessaire',
        '🎁 20% de remise sur le tarif annuel',
        '📅 Engagement ferme de 12 mois',
        '♻️ Renouvellement automatique annuel'
      ],
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/njwTQq7r?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/pDpVRmkC?referrer=PAYMENT_LINK',
      bestValue: true
    },
    {
      id: 'formula-strategique',
      name: 'Stratégique',
      summary: 'Gestion professionnelle avec modération proactive',
      price: {
        monthly: '1 718,40 €',
        annual: '16 496,64 €',
        annualSaving: '20% de remise'
      },
      highlights: [
        '20 posts par mois',
        '20 stories par mois',
        '4 Reels/TikToks par mois'
      ],
      gradient: 'from-purple-500 to-pink-600',
      accentColor: 'purple',
      icon: Star,
      features: engagementType === 'mensuel' ? [
        '📝 20 posts, 20 stories, 4 reels / mois',
        '🚗 2 déplacements sur site (3h)',
        '⏱️ Réponses aux commentaires et messages en 12h maximum',
        '🔥 Modération proactive pour stimuler l\'engagement (likes, réponses, conversations)',
        '🧹 Suppression des commentaires inappropriés si nécessaire',
        '📊 Abonnement de 3 mois minimum',
        '♻️ Renouvellement automatique mensuel après 3 mois'
      ] : [
        '📝 20 posts, 20 stories, 4 reels / mois',
        '🚗 2 déplacements sur site (3h)',
        '⏱️ Réponses aux commentaires et messages en 12h maximum',
        '🔥 Modération proactive pour stimuler l\'engagement (likes, réponses, conversations)',
        '🧹 Suppression des commentaires inappropriés si nécessaire',
        '🎁 20% de remise sur le tarif annuel',
        '📅 Engagement ferme de 12 mois',
        '♻️ Renouvellement automatique annuel'
      ],
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/TYMT9Tfyxyf?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/6ChGWqRfYMf?referrer=PAYMENT_LINK'
    },
    {
      id: 'formula-elite',
      name: 'Élite',
      summary: 'Gestion complète et animation continue 7j/7',
      price: {
        monthly: '2 678,40 €',
        annual: '25 712,64 €',
        annualSaving: '20% de remise'
      },
      highlights: [
        '30 posts par mois',
        '30 stories par mois',
        '6 Reels/TikToks par mois'
      ],
      gradient: 'from-amber-300 to-orange-400',
      accentColor: 'amber',
      icon: Crown,
      features: engagementType === 'mensuel' ? [
        '📝 30 posts, 30 stories, 6 reels / mois',
        '🚗 3 déplacements sur site (6h)',
        '⚡ Réponses aux commentaires et messages en moins de 6h, 7j/7',
        '🔁 Gestion et animation en continu de 8h à 22h',
        '📈 Analyse des tendances et recommandations stratégiques pour l\'engagement',
        '🛡️ Gestion avancée des avis et crises : signalement, modération et intervention rapide',
        '🤝 Community management actif : relance des discussions, interaction stratégique avec les abonnés',
        '📊 Abonnement de 3 mois minimum',
        '♻️ Renouvellement automatique mensuel après 3 mois'
      ] : [
        '📝 30 posts, 30 stories, 6 reels / mois',
        '🚗 3 déplacements sur site (6h)',
        '⚡ Réponses aux commentaires et messages en moins de 6h, 7j/7',
        '🔁 Gestion et animation en continu de 8h à 22h',
        '📈 Analyse des tendances et recommandations stratégiques pour l\'engagement',
        '🛡️ Gestion avancée des avis et crises : signalement, modération et intervention rapide',
        '🤝 Community management actif : relance des discussions, interaction stratégique avec les abonnés',
        '🎁 20% de remise sur le tarif annuel',
        '📅 Engagement ferme de 12 mois',
        '♻️ Renouvellement automatique annuel'
      ],
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/pjJS4ys7NnmKbctq?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/66rx24Dn?referrer=PAYMENT_LINK'
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
      price: formula.price.monthly.replace('€', '').replace(/\s/g, '').replace(',', '.'),
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
            text: "Contactez-nous sur WhatsApp",
            href: generateWhatsAppLink({ service: 'community' })
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
              Choisissez la formule adaptée à vos besoins et votre budget - Prix HT
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="absolute -top-3 -right-10 bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-blue-500">
                    LE PLUS POPULAIRE
                  </div>
                )}
                
                <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col ${
                  formula.bestValue ? 'ring-2 ring-digiqo-accent' : ''
                }`}>
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${formula.gradient}`}>
                    <formula.icon className="w-10 h-10 text-white mb-3" />
                    <h3 className="text-xl font-bold text-white mb-1">{formula.name}</h3>
                    <p className="text-white/90 text-sm">{formula.summary}</p>
                  </div>

                  {/* Price */}
                  <div className="p-6 bg-gray-50">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-digiqo-primary">
                        {engagementType === 'mensuel' ? formula.price.monthly : formula.price.annual}
                      </p>
                      <p className="text-gray-600 mt-1 text-sm">
                        {engagementType === 'mensuel' ? 'HT/mois' : 'HT/an'}
                      </p>
                      {engagementType === 'annuel' && formula.price.annualSaving && (
                        <p className="text-green-600 text-xs mt-1 font-medium">
                          {formula.price.annualSaving}
                        </p>
                      )}
                    </div>

                    {/* Highlights */}
                    <div className="mt-4 space-y-2">
                      {formula.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 flex-grow">
                    <h4 className="font-bold text-digiqo-primary mb-3 text-sm">Détails de la formule :</h4>
                    <ul className="space-y-2">
                      {formula.features.map((feature, idx) => {
                        const isBonus = feature.includes('🎁') || feature.includes('remise')
                        return (
                          <li key={idx} className="flex items-start">
                            <span className={`text-xs text-gray-700 ${isBonus ? 'font-medium' : ''}`}>
                              {feature}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="p-6 pt-0">
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
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={ANIMATION.tap.scaleSmall}
                      className={`block w-full text-center px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm`}
                    >
                      Choisir cette formule
                      <ArrowUpRight className="inline-block ml-1 w-4 h-4" />
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
                description: 'Reporting Mensuel',
                icon: TrendingUp,
                color: 'from-green-500 to-teal-600',
                hasButton: true,
                buttonUrl: 'https://claude.ai/public/artifacts/720d5c82-ac2c-4a39-8a4b-51654abd9677'
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="relative h-full"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-200 mb-2">{step.number}</div>
                  <h3 className="text-xl font-bold text-digiqo-primary mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{step.description}</p>
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
              Contactez-nous
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}