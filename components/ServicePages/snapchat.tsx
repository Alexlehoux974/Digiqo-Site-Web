import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Target,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Users,
  LineChart,
  CheckCircle2,
  Rocket,
  MessageCircle,
  Camera,
  Sparkles
} from 'lucide-react'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { generateWhatsAppLink } from '../../lib/whatsapp-utils'
import { generateContactUrl } from '../../lib/contact-utils'
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
    description: 'Étude approfondie de votre audience Gen Z et Millennials',
    icon: Target,
    color: 'from-digiqo-primary to-digiqo-primary/80'
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Création de contenus natifs et authentiques pour Snapchat',
    icon: Users,
    color: 'from-digiqo-secondary to-digiqo-secondary/80'
  },
  {
    number: '03',
    title: 'Création',
    description: 'Conception de Snap Ads, AR Lenses et filtres interactifs',
    icon: Sparkles,
    color: 'from-digiqo-accent to-digiqo-accent/80'
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Ajustements continus pour maximiser l\'engagement',
    icon: LineChart,
    color: 'from-digiqo-accent to-amber-600'
  }
]

export default function SnapchatPage() {
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

  // Create formulas with real data - 3 formules uniquement
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
            'Gestion & diffusion sur Snapchat',
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
            'Gestion & diffusion sur Snapchat',
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
            'Gestion & diffusion sur Snapchat',
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

  return (
    <ServiceLayout>
      <Head>
        <title>Publicité Snapchat à La Réunion | Agence Digitale Digiqo</title>
        <meta name="description" content="Boostez votre visibilité sur Snapchat avec nos services publicitaires. Snap Ads, AR Lenses, Story Ads. Touchez la Gen Z et les Millennials à La Réunion." />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={Camera}
        title={{
          line1: "Publicité Snapchat",
          line2: "Touchez la Gen Z"
        }}
        subtitle="Créez des expériences immersives avec Snap Ads, AR Lenses et Story Ads. Touchez 397 millions d'utilisateurs actifs quotidiens."
        ctaButtons={{
          primary: {
            text: "Démarrer sur Snapchat",
            href: generateWhatsAppLink({ service: 'publicite-snapchat', context: 'hero' })
          },
          secondary: {
            text: "Voir les formules",
            href: "#formules"
          }
        }}
        gradientFrom="from-digiqo-primary"
        gradientTo="to-digiqo-accent"
        iconColor="text-white"
      />

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre processus Snapchat Ads
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche créative et data-driven pour maximiser votre impact sur Snapchat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-200 mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
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
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Des solutions adaptées à chaque étape de votre croissance
            </p>

            {/* Toggle Mensuel/Annuel */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-lg font-semibold transition-colors ${!isAnnual ? 'text-digiqo-primary' : 'text-gray-500'}`}>
                Mensuel
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-20 h-10 bg-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:ring-offset-2"
                style={{ backgroundColor: isAnnual ? '#8B1431' : '#D1D5DB' }}
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
                  <div className="absolute -top-3 -right-10 bg-white text-[#8B1431] px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-[#8B1431]">
                    LE PLUS POPULAIRE
                  </div>
                )}

                {/* Carte */}
                <div
                  className={`relative bg-white rounded-2xl shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${
                    formula.bestValue ? 'ring-4 ring-[#8B1431] shadow-2xl md:scale-105' : ''
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
                        <span className="text-5xl font-bold text-[#8B1431]">
                          {formula.price.threeMonths.split(',')[0]}
                        </span>
                        <span className="text-3xl font-bold text-[#8B1431]">
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
                          <CheckCircle2 className="w-5 h-5 text-[#8B1431] mt-0.5 flex-shrink-0" />
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
                              <span className="text-[#8B1431] text-xs font-bold">✓</span>
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
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Prêt à booster votre visibilité ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8"
          >
            Rejoignez les entreprises réunionnaises qui font confiance à Digiqo
            pour leur publicité digitale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={generateContactUrl({ service: 'snapchat' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href={generateWhatsAppLink({ service: 'snapchat' })}
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