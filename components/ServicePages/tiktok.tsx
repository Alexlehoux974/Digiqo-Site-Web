import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Target,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  LineChart,
  CheckCircle2,
  ArrowUpRight,
  X,
  Rocket,
  MessageCircle,
  Music,
  Hash
} from 'lucide-react'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { generateContactUrl } from '../../lib/contact-utils'
import { generateWhatsAppLink } from '../../lib/whatsapp-utils'
import {
  getProductsForService
} from '../../lib/airtable-products'

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
    description: 'Étude approfondie des tendances TikTok et de votre audience cible',
    icon: Target,
    color: 'from-digiqo-primary to-digiqo-secondary'
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Création de contenu viral adapté aux codes de TikTok',
    icon: Users,
    color: 'from-digiqo-accent to-digiqo-primary'
  },
  {
    number: '03',
    title: 'Création',
    description: 'Production de vidéos engageantes et de campagnes créatives',
    icon: Music,
    color: 'from-digiqo-secondary to-digiqo-accent'
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Analyse des performances et ajustements pour maximiser la viralité',
    icon: LineChart,
    color: 'from-digiqo-primary to-digiqo-secondary'
  }
]

export default function TikTokPage() {
  const [compareMode] = useState(false)
  const [isAnnual, setIsAnnual] = useState(false)

  // Get real products from Airtable (même que publicité)
  const publiciteProducts = getProductsForService('publicite')

  // Helper function to calculate annual price with discount
  const calculateAnnualPrice = (monthlyPrice: number, discount: number): string => {
    const annualTotal = monthlyPrice * 12
    const discountedTotal = annualTotal * (1 - discount / 100)
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(discountedTotal) + ' €'
  }

  // Map Airtable products by formula name
  const initMonthly = publiciteProducts.find(p => p.name.includes('Initiation') && p.name.includes('Mensuelle'))
  const initAnnual = publiciteProducts.find(p => p.name.includes('Initiation') && p.name.includes('Annuelle'))
  const propMonthly = publiciteProducts.find(p => p.name.includes('Propulsion') && p.name.includes('Mensuelle'))
  const propAnnual = publiciteProducts.find(p => p.name.includes('Propulsion') && p.name.includes('Annuelle'))
  const expMonthly = publiciteProducts.find(p => p.name.includes('Expansion') && p.name.includes('Mensuelle'))
  const expAnnual = publiciteProducts.find(p => p.name.includes('Expansion') && p.name.includes('Annuelle'))

  // Create formulas with real data - EXACTEMENT LES MEMES PRIX QUE PUBLICITE
  const formulas: Formula[] = [
    {
      id: 'formula-initiation',
      name: 'INITIATION',
      summary: 'Idéal pour débuter dans la publicité en ligne avec un budget maîtrisé',
      price: {
        threeMonths: isAnnual ? calculateAnnualPrice(549, 15) : (initMonthly?.priceFormatted || '549,00 €'),
        annual: initAnnual?.priceFormatted || '5 604,60 €'
      },
      highlights: [
        'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
        '3 visuels publicitaires inclus/mois',
        'Création & ciblage stratégique'
      ],
      gradient: 'from-gray-400 to-gray-600',
      accentColor: 'gray',
      icon: Target,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur TikTok',
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
      bestValue: false
    },
    {
      id: 'formula-propulsion',
      name: 'PROPULSION',
      summary: 'Pour les entreprises en croissance cherchant à augmenter leur visibilité',
      price: {
        threeMonths: isAnnual ? calculateAnnualPrice(949, 15) : (propMonthly?.priceFormatted || '949,00 €'),
        annual: propAnnual?.priceFormatted || '9 690,60 €'
      },
      highlights: [
        'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
        '6 visuels publicitaires inclus/mois',
        'Audiences similaires incluses'
      ],
      gradient: 'from-[#8B1431] to-red-700',
      accentColor: 'red',
      icon: Zap,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur TikTok',
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
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/4gntC6Vznt2d?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/bpgDysyjrtZmyhm9?referrer=PAYMENT_LINK',
      bestValue: true
    },
    {
      id: 'formula-expansion',
      name: 'EXPANSION',
      summary: 'Pour les entreprises ambitieuses visant une croissance forte',
      price: {
        threeMonths: isAnnual ? calculateAnnualPrice(1990, 15) : (expMonthly?.priceFormatted || '1 990,00 €'),
        annual: expAnnual?.priceFormatted || '20 292,60 €'
      },
      highlights: [
        'Jusqu\'à 10 000€ de budget publicitaire géré/mois',
        '9 visuels publicitaires inclus/mois',
        'Intégration avancée pixels & API'
      ],
      gradient: 'from-[#199CB7] to-[#0F6980]',
      accentColor: 'blue',
      icon: Rocket,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur TikTok',
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
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/WQ6DrgtrDNrt7Dtr?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/D7nW622G?referrer=PAYMENT_LINK',
      bestValue: false
    }
  ]

  const quickWins = [
    {
      icon: Music,
      title: "1 Milliard+ d'utilisateurs",
      description: "Touchez l'audience la plus engagée avec du contenu viral et créatif",
      highlight: "Croissance explosive"
    },
    {
      icon: Hash,
      title: "Hashtag Challenges",
      description: "Créez des tendances virales et engagez votre communauté",
      highlight: "Viralité x10"
    },
    {
      icon: BarChart3,
      title: "ROI impressionnant",
      description: "67% des utilisateurs affirment que TikTok les inspire à acheter",
      highlight: "Conversions élevées"
    }
  ]

  return (
    <ServiceLayout>
      <Head>
        <title>Publicité TikTok à La Réunion | Agence Digitale Digiqo</title>
        <meta name="description" content="Boostez votre visibilité sur TikTok avec nos services publicitaires. In-Feed Ads, TopView, Spark Ads, Branded Hashtag Challenges." />
      </Head>

      {/* Hero Section avec ServiceHero */}
      <ServiceHero
        icon={Music}
        title={{
          line1: "Publicité",
          line2: "TIKTOK"
        }}
        subtitle="Créez le buzz et touchez une audience massive avec des campagnes TikTok virales"
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Parler à un expert",
            href: generateWhatsAppLink({ context: 'tiktok' })
          }
        }}
        gradientFrom="from-digiqo-primary"
        gradientTo="to-digiqo-accent"
      />

      {/* Quick Wins Section */}
      <section className="relative py-16 -mt-20">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickWins.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl flex items-center justify-center flex-shrink-0">
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
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Notre <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Processus</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto"
            >
              Une méthodologie virale pour conquérir TikTok
            </motion.p>
          </div>

          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-digiqo-accent to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center">
                    <div className="text-6xl font-bold text-digiqo-accent/20 mb-4">
                      {step.number}
                    </div>

                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 mt-4`}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-digiqo-primary/70">{step.description}</p>

                    {/* Connection dot for timeline */}
                    <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-digiqo-accent to-digiqo-primary rounded-full -translate-x-1/2 hidden lg:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formules Section avec design moderne */}
      <section id="formules" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Des solutions pour dominer TikTok à tous les niveaux
            </p>

            {/* Toggle Mensuel/Annuel */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-lg font-semibold transition-colors ${!isAnnual ? 'text-digiqo-primary' : 'text-gray-500'}`}>
                Mensuel
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-20 h-10 bg-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:ring-offset-2"
                style={{ backgroundColor: isAnnual ? '#DA6530' : '#D1D5DB' }}
              >
                <motion.div
                  className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-md"
                  animate={{ left: isAnnual ? '44px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-semibold transition-colors ${isAnnual ? 'text-digiqo-primary' : 'text-gray-500'}`}>
                  Annuel
                </span>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    Jusqu'à -20%
                  </motion.span>
                )}
              </div>
            </div>
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
                  <div className="absolute -top-3 -right-10 bg-white text-digiqo-accent px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-digiqo-accent">
                    LE PLUS POPULAIRE
                  </div>
                )}

                {/* Carte */}
                <div
                  className={`relative bg-white rounded-2xl shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${
                    formula.bestValue ? 'ring-4 ring-digiqo-accent shadow-2xl md:scale-105' : ''
                  }`}
                >
                  {/* Header with colored gradient */}
                  <div className={`p-6 bg-gradient-to-br ${formula.gradient} rounded-t-2xl`}>
                    <h3 className={`text-2xl font-bold text-center text-white`}>{formula.name}</h3>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Prix */}
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-digiqo-primary">
                          {formula.price.threeMonths.split(',')[0]}
                        </span>
                        <span className="text-3xl font-bold text-digiqo-primary">
                          {',' + (formula.price.threeMonths.split(',')[1] || '00')}
                        </span>
                        <span className="text-2xl font-semibold text-gray-600 ml-1">
                          HT
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 font-medium h-5">
                        {isAnnual ? 'PAR AN' : 'PAR MOIS'}
                      </p>
                      {isAnnual && (
                        <p className="text-xs text-green-600 mt-1 font-semibold">
                          -15% de réduction
                        </p>
                      )}
                    </div>

                    {/* Caractéristiques principales - Flex grow pour prendre tout l'espace disponible */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {formula.sections.services.items.concat(
                        formula.sections.creation.items.slice(0, 1),
                        formula.sections.tracking.items.slice(0, 1)
                      ).slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-digiqo-accent mt-0.5 flex-shrink-0" />
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
                              <span className="text-digiqo-accent text-xs font-bold">✓</span>
                              <span className="text-xs text-gray-600 leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bouton CTA - Sans marge excessive */}
                    <motion.a
                      href={isAnnual ? formula.paymentLinkAnnual : formula.paymentLinkMonthly}
                      target="_blank"
                      rel="noopener noreferrer"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto mt-12"
            >
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white">
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
                    <tr className="border-t border-digiqo-accent/20">
                      <td className="p-4 font-medium text-digiqo-primary">Budget publicitaire géré</td>
                      <td className="p-4 text-center">Jusqu'à 2 500€</td>
                      <td className="p-4 text-center">Jusqu'à 5 000€</td>
                      <td className="p-4 text-center">Jusqu'à 10 000€</td>
                    </tr>
                    {/* Contenus inclus */}
                    <tr className="border-t border-digiqo-accent/20 bg-digiqo-accent/5">
                      <td className="p-4 font-medium text-digiqo-primary">Contenus TikTok/mois</td>
                      <td className="p-4 text-center">3 vidéos</td>
                      <td className="p-4 text-center">6 vidéos</td>
                      <td className="p-4 text-center">9 contenus</td>
                    </tr>
                    {/* Spark Ads */}
                    <tr className="border-t border-digiqo-accent/20">
                      <td className="p-4 font-medium text-digiqo-primary">Spark Ads</td>
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
                    {/* Branded Effects */}
                    <tr className="border-t border-digiqo-accent/20 bg-digiqo-accent/5">
                      <td className="p-4 font-medium text-digiqo-primary">Branded Effects</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">Inclus</td>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Prêt à booster votre visibilité ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Rejoignez les entreprises réunionnaises qui font confiance à Digiqo
            pour leur publicité digitale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={generateContactUrl({ service: 'tiktok' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href={generateWhatsAppLink({ service: 'tiktok' })}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Discuter sur WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}