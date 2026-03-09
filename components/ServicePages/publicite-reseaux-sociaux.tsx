import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ANIMATION } from '@/lib/animation-constants'
import {
  TrendingUp,
  Target,
  Palette,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  LineChart,
  CheckCircle2,
  ArrowUpRight,
  Rocket,
  MessageCircle,
  Video
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { generateContactUrl } from '../../lib/contact-utils'
import { generateWhatsAppLink } from '../../lib/whatsapp-utils'

interface Formula {
  id: string
  name: string
  subtitle: string
  summary: string
  price: {
    shortTerm: string
    annual: string
  }
  billingPeriod: string
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
  paymentLinkShortTerm?: string
  paymentLinkAnnual?: string
  bestValue?: boolean
  isMulticanal?: boolean
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

export default function PubliciteReseauxSociauxPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const seoData = servicesSEO['publicite-reseaux-sociaux']

  const formulas: Formula[] = [
    {
      id: 'formula-initiation',
      name: 'INITIATION',
      subtitle: 'Campagne de Notoriété — Monocanal',
      summary: 'Idéal pour débuter dans la publicité en ligne avec un budget maîtrisé',
      price: {
        shortTerm: '550,00 €',
        annual: '5 610,00 €'
      },
      billingPeriod: '/mois',
      highlights: [
        '🖥 Une plateforme au choix : META (Facebook & Instagram), TikTok ou Snapchat',
        '💰 Jusqu\'à 2 500€ de budget publicitaire géré/mois',
        '🎨 3 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)',
        '🧠 Création & ciblage stratégique des campagnes',
        '⚙️ Optimisation des performances',
        '📈 Reporting mensuel',
        '📂 Espace collaboratif : Google Chat + Drive'
      ],
      gradient: 'from-gray-400 to-gray-600',
      accentColor: 'gray',
      icon: Target,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur une plateforme au choix (META, TikTok ou Snapchat)',
            'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
            'Création & ciblage stratégique des campagnes',
            'Optimisation des performances',
            'Campagne de notoriété & considération'
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
            'Formats statiques et/ou dynamiques',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5)'
          ]
        },
        bonus: {
          title: '🎁 Offre promotionnelle',
          items: isAnnual
            ? ['2 vidéos offertes']
            : ['1 vidéo offerte au paiement de la 2ème mensualité']
        }
      },
      paymentLinkShortTerm: 'https://app-eu1.hubspot.com/payments/CqxfynTqvw?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/cfbgbDkKrqhPX?referrer=PAYMENT_LINK',
      bestValue: true
    },
    {
      id: 'formula-propulsion',
      name: 'PROPULSION',
      subtitle: 'Campagne de Conversion — Monocanal',
      summary: 'Pour les entreprises en croissance cherchant à générer des leads',
      price: {
        shortTerm: '2 250,00 €',
        annual: '7 650,00 €'
      },
      billingPeriod: '/trimestre',
      highlights: [
        '🖥 Une plateforme au choix : META (Facebook & Instagram), TikTok ou Snapchat',
        '💰 Jusqu\'à 2 500€ de budget publicitaire géré/mois',
        '🎨 6 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)',
        '🧠 Création & ciblage stratégique des campagnes',
        '⚙️ Optimisation des performances',
        '📈 Reporting mensuel',
        '📂 Espace collaboratif : Google Chat + Drive',
        '👥 Exploitation des audiences similaires',
        '🔧 Intégration basique des pixels & API'
      ],
      gradient: 'from-[#8B1431] to-red-700',
      accentColor: 'red',
      icon: Zap,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur une plateforme au choix (META, TikTok ou Snapchat)',
            'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
            'Création & ciblage stratégique des campagnes',
            'Optimisation des performances',
            'Campagne de conversion & génération de leads',
            'Exploitation des audiences similaires',
            'Intégration basique des pixels & API'
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
            '6 visuels publicitaires inclus chaque mois (non cumulables)',
            'Formats statiques et/ou dynamiques',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5)'
          ]
        },
        bonus: {
          title: '🎁 Offre promotionnelle',
          items: isAnnual
            ? ['2 vidéos offertes']
            : ['1 vidéo offerte']
        }
      },
      paymentLinkShortTerm: 'https://app-eu1.hubspot.com/payments/4gntC6Vznt2d?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/bpgDysyjrtZmyhm9?referrer=PAYMENT_LINK'
    },
    {
      id: 'formula-expansion',
      name: 'EXPANSION',
      subtitle: 'Campagne de Conversion — Multicanal',
      summary: 'Performance maximale avec la complémentarité SMA + SEA',
      price: {
        shortTerm: '3 250,00 €',
        annual: '11 050,00 €'
      },
      billingPeriod: '/trimestre',
      highlights: [
        '🖥 2 plateformes : SMA (META ou TikTok) + SEA (Google Ads)',
        '💰 Jusqu\'à 2 500€ de budget publicitaire géré/mois',
        '🎨 9 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)',
        '🧠 Création & ciblage stratégique des campagnes',
        '⚙️ Optimisation des performances',
        '📈 Reporting mensuel',
        '📂 Espace collaboratif : Google Chat + Drive',
        '👥 Exploitation des audiences similaires',
        '🔧 Intégration avancée des pixels & API'
      ],
      gradient: 'from-[#199CB7] to-[#0F6980]',
      accentColor: 'blue',
      icon: Rocket,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur 2 plateformes : SMA (META ou TikTok) + SEA (Google Ads)',
            'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
            'Création & ciblage stratégique des campagnes',
            'Optimisation des performances',
            'Campagne de conversion multicanal',
            'Exploitation des audiences similaires',
            'Intégration avancée des pixels & API'
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
            '9 visuels publicitaires inclus chaque mois (non cumulables)',
            'Formats statiques et/ou dynamiques',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5)'
          ]
        },
        bonus: {
          title: '🎁 Offre promotionnelle',
          items: isAnnual
            ? ['2 vidéos offertes', 'Budget pub du 3ème mois offert sur Google']
            : ['1 vidéo offerte', 'Budget pub du 3ème mois offert sur Google']
        }
      },
      paymentLinkShortTerm: 'https://app-eu1.hubspot.com/payments/WQ6DrgtrDNrt7Dtr?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/D7nW622G?referrer=PAYMENT_LINK',
      isMulticanal: true
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
    },
    {
      icon: Video,
      title: "Vidéos publicitaires premium",
      description: "Tarif préférentiel exclusif pour les clients abonnés en Social Media Ads",
      highlight: "300€ au lieu de 549€"
    }
  ]

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={Target}
        title={{
          line1: "Publicité sur les",
          line2: "Réseaux Sociaux"
        }}
        subtitle="Campagnes ultra-performantes sur Facebook, Instagram, TikTok, Snapchat et WhatsApp qui transforment vos prospects en clients fidèles"
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Parler à un expert",
            href: generateWhatsAppLink({ context: 'publicite' })
          }
        }}
        gradientFrom="from-digiqo-accent"
        gradientTo="to-amber-400"
      />

      {/* Quick Wins Section */}
      <section className="relative py-16 -mt-20">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickWins.map((item, index) => (
              <motion.div
                key={index}
                {...ANIMATION.entry.scaleIn}
                whileInView={ANIMATION.entry.scaleIn.animate}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col flex-grow text-center">
                  <h3 className="text-lg font-bold text-digiqo-primary mb-3 min-h-[28px]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-digiqo-primary/70 mb-4 flex-grow min-h-[60px]">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block text-xs font-semibold text-digiqo-accent bg-digiqo-accent/10 px-3 py-1 rounded-full">
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
                    <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-digiqo-accent to-digiqo-accent/70 rounded-full -translate-x-1/2 hidden lg:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Formules Section */}
      <section id="formules" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Prix pour la <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">publicité en ligne</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Des solutions adaptées à chaque étape de votre croissance
            </p>

            {/* Toggle Sans engagement/Annuel */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-lg font-semibold transition-colors ${!isAnnual ? 'text-digiqo-primary' : 'text-gray-500'}`}>
                Sans engagement
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
                    -15%
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Formula Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
            {formulas.map((formula, index) => (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-full"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Badge populaire */}
                {formula.bestValue && (
                  <div className="absolute -top-3 -right-10 bg-white text-[#8B1431] px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-[#8B1431]">
                    LE PLUS POPULAIRE
                  </div>
                )}

                {/* Badge Multicanal */}
                {formula.isMulticanal && (
                  <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#199CB7] to-[#0F6980] text-white px-4 py-1.5 rounded-full text-xs font-bold z-20 shadow-lg">
                    SMA + SEA
                  </div>
                )}

                <div
                  className={`relative bg-white rounded-2xl shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${
                    formula.bestValue ? 'ring-4 ring-[#8B1431] shadow-2xl' : ''
                  }`}
                >
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${formula.gradient} rounded-t-2xl`}>
                    <h3 className="text-2xl font-bold text-center text-white">{formula.name}</h3>
                    <p className="text-sm text-white/80 text-center mt-1">{formula.subtitle}</p>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Prix */}
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-[#8B1431]">
                          {isAnnual
                            ? formula.price.annual.split(',')[0]
                            : formula.price.shortTerm.split(',')[0]
                          }
                        </span>
                        <span className="text-3xl font-bold text-[#8B1431]">
                          {isAnnual
                            ? ',' + (formula.price.annual.split(',')[1] || '00')
                            : ',' + (formula.price.shortTerm.split(',')[1] || '00')
                          }
                        </span>
                        <span className="text-2xl font-semibold text-gray-600 ml-1">
                          HT
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 font-medium h-5">
                        {isAnnual ? 'PAR AN' : `PAR ${formula.billingPeriod === '/mois' ? 'MOIS' : 'TRIMESTRE'}`}
                      </p>
                      {isAnnual && (
                        <p className="text-xs text-green-600 mt-1 font-semibold">
                          -15% de réduction
                        </p>
                      )}
                      {!isAnnual && (
                        <p className="text-xs text-gray-500 mt-1">
                          Sans engagement
                        </p>
                      )}
                    </div>

                    {/* Caractéristiques */}
                    <div className="space-y-3 mb-6">
                      {formula.highlights.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#8B1431] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bonus promo + CTA toujours alignés en bas */}
                    <div className="mt-auto">
                    <div className="border-t border-gray-200 pt-4 mb-6 min-h-[80px]">
                    {formula.sections.bonus && (
                      <>
                        <p className="text-sm font-semibold text-[#8B1431] mb-2">{formula.sections.bonus.title}</p>
                        {formula.sections.bonus.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[#8B1431] text-xs font-bold">🎁</span>
                            <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </>
                    )}
                    </div>

                    {/* CTA */}
                    <motion.a
                      href={isAnnual ? formula.paymentLinkAnnual : formula.paymentLinkShortTerm}
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
            pour leur publicité sur les réseaux sociaux.
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
              href={generateWhatsAppLink({ service: 'publicite' })}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
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
