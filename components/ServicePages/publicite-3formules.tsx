import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { HeroGradientOrbs } from '@/components/ui/animated-gradient-orb'
import {
  TrendingUp,
  Target,
  Palette,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  LineChart,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  X,
  Rocket,
  Phone
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'

interface Formula {
  id: string
  name: string
  summary: string
  price: {
    threeMonths: string // Prix pour engagement 3 mois
    annual: string      // Prix pour engagement annuel
  }
  highlights: string[]
  gradient: string
  accentColor: string
  icon: any
  sections: {
    services: {
      title: string
      items: string[]
    }
    tracking: {
      title: string
      items: string[]
    }
    creation: {
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
  engagement?: string
  bestValue?: boolean
  details?: string[]
}

const processSteps = [
  {
    number: '01',
    title: 'Analyse',
    description: 'Étude approfondie de votre marché et de vos objectifs commerciaux',
    icon: Target,
    color: 'from-digiqo-primary to-digiqo-primary/80'
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Définition précise des audiences et des messages publicitaires',
    icon: Users,
    color: 'from-digiqo-secondary to-digiqo-secondary/80'
  },
  {
    number: '03',
    title: 'Création',
    description: 'Conception de visuels et contenus publicitaires haute performance',
    icon: Palette,
    color: 'from-digiqo-accent to-digiqo-accent/80'
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Ajustements data-driven pour maximiser votre retour sur investissement',
    icon: LineChart,
    color: 'from-digiqo-accent to-amber-600'
  }
]

export default function PublicitePage() {
  const [compareMode] = useState(false)
  const seoData = servicesSEO['publicite-en-ligne-reunion']

  // Create formulas with real data - 3 formules uniquement
  const formulas: Formula[] = [
    {
      id: 'formula-initiation',
      name: 'INITIATION',
      summary: 'Idéal pour débuter dans la publicité en ligne avec un budget maîtrisé',
      price: {
        threeMonths: '549,00 €',
        annual: '5 270,40 €'
      },
      highlights: [
        'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
        '3 visuels publicitaires inclus/mois',
        'Création & ciblage stratégique'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: 'emerald',
      icon: Target,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
            'Création & ciblage stratégique des campagnes',
            'Optimisation hebdomadaire des performances',
            'Retargeting : reciblage des audiences'
          ]
        },
        tracking: {
          title: '📂 Suivi & collaboration',
          items: [
            'Canal Google Chat dédié pour vos questions',
            'Espace Drive dédié pour vos contenus',
            'Reporting mensuel détaillé'
          ]
        },
        creation: {
          title: '🎨 Création visuelle',
          items: [
            '3 visuels publicitaires inclus chaque mois (non cumulables)',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5)',
            'Valeur de 135€ offerts chaque mois'
          ]
        },
        bonus: {
          title: '🎆 Bonus',
          items: ['1 vidéo offerte immédiatement']
        }
      },
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/CqxfynTqvw?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/cfbgbDkKrqhPX?referrer=PAYMENT_LINK',
      engagement: '3 mois minimum puis mensuel',
      bestValue: true
    },
    {
      id: 'formula-propulsion',
      name: 'PROPULSION',
      summary: 'Pour les entreprises en croissance cherchant à augmenter leur visibilité',
      price: {
        threeMonths: '990,00 €',
        annual: '10 098,00 €'
      },
      highlights: [
        'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
        '6 visuels publicitaires inclus/mois',
        'Audiences similaires incluses'
      ],
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: 'blue',
      icon: Zap,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
            'Création & ciblage stratégique des campagnes',
            'Optimisation hebdomadaire des performances',
            'Retargeting : reciblage des audiences',
            'Exploitation des audiences similaires',
            'Intégration basique des pixels & API'
          ]
        },
        tracking: {
          title: '📂 Suivi & collaboration',
          items: [
            'Canal Google Chat dédié pour vos questions',
            'Espace Drive dédié pour vos contenus',
            'Reporting mensuel détaillé',
            'Réunions de suivi régulières'
          ]
        },
        creation: {
          title: '🎨 Création visuelle',
          items: [
            '6 visuels publicitaires inclus chaque mois (non cumulables)',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5)',
            'Valeur de 270€ offerts chaque mois'
          ]
        },
        bonus: {
          title: '🎆 Bonus',
          items: ['2 vidéos offertes immédiatement', 'Audiences similaires incluses']
        }
      },
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/CqxfynTqvw?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/cfbgbDkKrqhPX?referrer=PAYMENT_LINK',
      engagement: '3 mois minimum puis mensuel'
    },
    {
      id: 'formula-expansion',
      name: 'EXPANSION',
      summary: 'Pour les entreprises ambitieuses visant une croissance forte',
      price: {
        threeMonths: '1 490,00 €',
        annual: '16 092,00 €'
      },
      highlights: [
        'Jusqu\'à 10 000€ de budget publicitaire géré/mois',
        '9 visuels publicitaires inclus/mois',
        'Intégration avancée pixels & API'
      ],
      gradient: 'from-purple-500 to-pink-600',
      accentColor: 'purple',
      icon: Rocket,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 10 000€ de budget publicitaire géré/mois',
            'Création & ciblage stratégique des campagnes',
            'Optimisation quotidienne des performances',
            'Retargeting avancé : reciblage des audiences',
            'Exploitation des audiences similaires',
            'Intégration avancée des pixels & API'
          ]
        },
        tracking: {
          title: '📂 Suivi & collaboration',
          items: [
            'Canal Google Chat dédié pour vos questions',
            'Espace Drive dédié pour vos contenus',
            'Reporting hebdomadaire et mensuel détaillé',
            'Réunions de suivi hebdomadaires',
            'Support prioritaire'
          ]
        },
        creation: {
          title: '🎨 Création visuelle',
          items: [
            '9 visuels publicitaires inclus chaque mois (non cumulables)',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5)',
            'Valeur de 405€ offerts chaque mois'
          ]
        },
        bonus: {
          title: '🎆 Bonus',
          items: ['3 vidéos offertes immédiatement', 'Intégration avancée incluse']
        }
      },
      details: [
        '(+10% du dépassement facturé séparément en fin de mois si budget > 10 000€)'
      ],
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/CqxfynTqvw?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/cfbgbDkKrqhPX?referrer=PAYMENT_LINK',
      engagement: '3 mois minimum puis mensuel',
      bestValue: false
    }
  ]

  const quickWins = [
    {
      icon: Target,
      title: "Ciblage précis",
      description: "Touchez exactement votre audience idéale grâce à nos techniques de ciblage avancées",
      highlight: "+85% de précision"
    },
    {
      icon: TrendingUp,
      title: "ROI optimisé",
      description: "Chaque euro investi est analysé et optimisé pour maximiser votre retour sur investissement",
      highlight: "3-5x ROI moyen"
    },
    {
      icon: BarChart3,
      title: "Reporting en temps réel",
      description: "Suivez vos performances avec des tableaux de bord actualisés et des rapports détaillés",
      highlight: "24/7 accessible"
    }
  ]

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
      </Head>

      {/* Hero Section avec animations premium */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-digiqo-primary/10 via-white to-digiqo-accent/10">
        <HeroGradientOrbs />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              transition={{ delay: getStaggerDelay(0) }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              <Sparkles className="w-5 h-5 text-digiqo-accent" />
              <span className="text-sm font-semibold text-digiqo-primary">
                Expert en Publicité Digitale à La Réunion
              </span>
              <Sparkles className="w-5 h-5 text-digiqo-accent" />
            </motion.div>

            <motion.h1
              {...ANIMATION.entry.fadeInUp}
              transition={{ delay: getStaggerDelay(1) }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent leading-tight"
            >
              Boostez votre visibilité<br />
              <span className="text-3xl md:text-5xl">avec la publicité en ligne</span>
            </motion.h1>

            <motion.p
              {...ANIMATION.entry.fadeInUp}
              transition={{ delay: getStaggerDelay(2) }}
              className="text-xl md:text-2xl text-digiqo-primary/80 max-w-3xl mx-auto mb-8"
            >
              Transformez vos visiteurs en clients grâce à des campagnes publicitaires
              ultra-ciblées sur Meta Ads (Facebook & Instagram) et Google Ads.
            </motion.p>

            {/* CTA Section avec WhatsApp */}
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              transition={{ delay: getStaggerDelay(3) }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#formules"
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-amber-400 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                Découvrir nos formules
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="tel:+262262025102"
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-primary text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <Phone className="w-5 h-5" />
                02 62 02 51 02
              </motion.a>
            </motion.div>
          </div>

          {/* Quick Wins Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {quickWins.map((item, index) => (
              <motion.div
                key={index}
                {...ANIMATION.entry.scaleIn}
                whileInView={ANIMATION.entry.scaleIn.animate}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-digiqo-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-digiqo-primary/70 mb-2">{item.description}</p>
                    <span className="text-xs font-semibold text-digiqo-accent bg-digiqo-accent/10 px-3 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-24 bg-gradient-to-b from-white to-digiqo-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Notre <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Processus</span>
            </motion.h2>
            <motion.p
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto"
            >
              Une méthodologie éprouvée pour maximiser votre retour sur investissement publicitaire
            </motion.p>
          </div>

          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-digiqo-accent to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  {...ANIMATION.entry.scaleIn}
                  whileInView={ANIMATION.entry.scaleIn.animate}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center">
                    <div className="text-6xl font-bold text-digiqo-primary/10 mb-4">
                      {step.number}
                    </div>

                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: ANIMATION.duration.normal }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 mt-4`}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-digiqo-primary/70">{step.description}</p>

                    {/* Connection dot for timeline */}
                    <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-digiqo-accent to-digiqo-accent/70 rounded-full -translate-x-1/2 hidden lg:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formules Section avec design moderne */}
      <section id="formules" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Des solutions adaptées à chaque étape de votre croissance
            </p>
          </motion.div>

          {/* Formula Cards - Simple 3 card layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {formulas.map((formula, index) => (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Badge populaire qui suit le mouvement de hover */}
                {formula.bestValue && (
                  <div className="absolute -top-3 -right-2 sm:-right-6 bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-blue-500">
                    LE PLUS POPULAIRE
                  </div>
                )}

                {/* Carte */}
                <div
                  className={`relative bg-white rounded-2xl shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${
                    formula.bestValue ? 'ring-4 ring-blue-500 shadow-2xl md:scale-105' : ''
                  }`}
                >
                  {/* Header with colored gradient */}
                  <div className={`p-6 bg-gradient-to-br ${formula.gradient} rounded-t-2xl`}>
                    <h3 className={`text-2xl font-bold text-center text-white`}>{formula.name}</h3>
                  </div>

                  <div className="p-4 sm:p-8 flex flex-col flex-grow">
                    {/* Prix */}
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl sm:text-5xl font-bold text-blue-600">
                          {formula.price.threeMonths.split(',')[0]}
                        </span>
                        <span className="text-3xl font-bold text-blue-600">
                          {',' + (formula.price.threeMonths.split(',')[1] || '00')}
                        </span>
                        <span className="text-2xl font-semibold text-gray-600 ml-1">
                          €
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 font-medium h-5">
                        PAR MOIS
                      </p>
                    </div>

                    {/* Caractéristiques principales - Flex grow pour prendre tout l'espace disponible */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {formula.sections.services.items.concat(
                        formula.sections.creation.items.slice(0, 1),
                        formula.sections.tracking.items.slice(0, 1)
                      ).slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Section détails supplémentaires - Hauteur fixe mais réduite */}
                    {formula.details && formula.details.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 mb-6 min-h-[40px]">
                        <div className="space-y-2">
                          {formula.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600 text-xs font-bold">✓</span>
                              <span className="text-xs text-gray-600 leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bouton CTA - Sans marge excessive */}
                    <motion.a
                      href={generateContactUrl({ service: 'publicite', formula: formula.name })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-2xl shadow-lg`}
                    >
                      Choisir cette formule
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Vue comparative */}
          {compareMode && (
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-7xl mx-auto mt-12"
            >
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-digiqo-primary to-digiqo-primary/80 text-white">
                      <th className="p-6 text-left">Caractéristiques</th>
                      {formulas.map((formula) => (
                        <th key={formula.id} className="p-6 text-center">
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold">{formula.name}</h3>
                            <p className="text-3xl font-bold">
                              {formula.price.threeMonths}
                            </p>
                            <p className="text-sm opacity-80">
                              /mois
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Budget géré */}
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Budget publicitaire géré</td>
                      <td className="p-4 text-center">Jusqu'à 2 500€</td>
                      <td className="p-4 text-center">Jusqu'à 5 000€</td>
                      <td className="p-4 text-center">Jusqu'à 10 000€</td>
                    </tr>
                    {/* Visuels inclus */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Visuels publicitaires/mois</td>
                      <td className="p-4 text-center">3 visuels</td>
                      <td className="p-4 text-center">6 visuels</td>
                      <td className="p-4 text-center">9 visuels</td>
                    </tr>
                    {/* Audiences similaires */}
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Audiences similaires</td>
                      <td className="p-4 text-center">
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    {/* Intégration Pixels & API */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Intégration Pixels & API</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">Basique</td>
                      <td className="p-4 text-center">Avancée</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Prêt à booster votre visibilité ?
          </motion.h2>

          <motion.p
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Rejoignez les entreprises réunionnaises qui font confiance à Digiqo
            pour leur publicité digitale.
          </motion.p>

          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={generateContactUrl({ service: 'publicite' })}
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="tel:+262262025102"
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
              className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-primary text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <Phone className="w-5 h-5" />
              02 62 02 51 02
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}