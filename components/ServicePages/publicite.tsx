import { useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
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
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  X,
  Rocket,
  MessageCircle
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
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
  const [engagementType, setEngagementType] = useState<'3mois' | 'annuel'>('3mois')
  const seoData = servicesSEO['publicite-en-ligne-reunion']
  
  // Get real products from Airtable
  const publiciteProducts = getProductsForService('publicite')
  
  // Map Airtable products by formula name
  const starterMonthly = publiciteProducts.find(p => p.name.includes('Starter') && p.name.includes('Mensuelle')) || publiciteProducts.find(p => p.name.includes('Initiation') && p.name.includes('Mensuelle'))
  const starterAnnual = publiciteProducts.find(p => p.name.includes('Starter') && p.name.includes('Annuelle')) || publiciteProducts.find(p => p.name.includes('Initiation') && p.name.includes('Annuelle'))
  const growthMonthly = publiciteProducts.find(p => p.name.includes('Growth') && p.name.includes('Mensuelle')) || publiciteProducts.find(p => p.name.includes('Propulsion') && p.name.includes('Mensuelle'))
  const growthAnnual = publiciteProducts.find(p => p.name.includes('Growth') && p.name.includes('Annuelle')) || publiciteProducts.find(p => p.name.includes('Propulsion') && p.name.includes('Annuelle'))
  
  // Create formulas with real data
  const formulas: Formula[] = [
    {
      id: 'formula-starter',
      name: 'Starter',
      summary: 'Idéal pour démarrer votre présence digitale avec un budget maîtrisé',
      price: {
        threeMonths: starterMonthly?.priceFormatted || '999,00 €',
        annual: starterAnnual?.priceFormatted || '9 590,00 €'
      },
      highlights: [
        'Jusqu\'à 2 000€ de budget publicitaire géré/mois',
        'Jusqu\'à 3 campagnes simultanées',
        '3 visuels publicitaires offerts/mois',
        'Suivi et optimisation hebdomadaire'
      ],
      gradient: 'from-emerald-400 to-teal-500',
      accentColor: 'emerald',
      icon: Target,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 2 000€ de budget publicitaire géré/mois',
            'Jusqu\'à 3 campagnes publicitaires simultanées',
            'Création, ciblage & testing stratégique',
            'Optimisation hebdomadaire des performances',
            'Retargeting : reciblage des audiences'
          ]
        },
        tracking: {
          title: '📂 Suivi & collaboration',
          items: [
            'Canal Google Chat dédié pour vos questions',
            'Espace Drive dédié pour vos contenus',
            'Rapports d\'activité réguliers'
          ]
        },
        creation: {
          title: '🎨 Création visuelle',
          items: [
            '3 créatifs publicitaires inclus chaque mois',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5)',
            'Valeur de 135€ offerts chaque mois'
          ]
        },
        bonus: engagementType === '3mois' ? {
          title: '🎆 Bonus engagement',
          items: ['100€ de budget publicitaire offert', 'Audit de votre concurrence inclus']
        } : {
          title: '🎆 Bonus annuel',
          items: ['200€ de budget publicitaire offert', 'Audit trimestriel inclus', 'Économie de 20% sur le tarif mensuel']
        }
      },
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/CqxfynTqvw?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/cfbgbDkKrqhPX?referrer=PAYMENT_LINK',
      engagement: engagementType === '3mois' ? '3 mois minimum puis mensuel' : '12 mois fermes',
      bestValue: false
    },
    {
      id: 'formula-growth',
      name: 'Growth',
      summary: 'Pour accélérer votre croissance et dominer votre marché',
      price: {
        threeMonths: growthMonthly?.priceFormatted || '1 499,00 €',
        annual: growthAnnual?.priceFormatted || '14 390,00 €'
      },
      highlights: [
        'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
        'Campagnes illimitées',
        '8 visuels publicitaires offerts/mois',
        'Audiences similaires avancées',
        'Account Manager dédié'
      ],
      gradient: 'from-blue-400 to-indigo-500',
      accentColor: 'blue',
      icon: Zap,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Gestion Google Ads & YouTube Ads',
            'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
            'Campagnes publicitaires illimitées',
            'Création, ciblage & testing stratégique avancé',
            'Optimisation quotidienne des performances',
            'Retargeting : reciblage multi-plateformes',
            'Création & exploitation d\'audiences similaires',
            'Pixel & tracking avancé'
          ]
        },
        tracking: {
          title: '📂 Suivi & collaboration',
          items: [
            'Account Manager dédié',
            'Canal Google Chat prioritaire',
            'Espace Drive dédié pour vos contenus',
            'Rapports d\'activité hebdomadaires',
            'Call mensuel de suivi stratégique'
          ]
        },
        creation: {
          title: '🎨 Création visuelle',
          items: [
            '8 créatifs publicitaires inclus chaque mois',
            'Déclinés dans tous les formats (1:1, 9:16, 4:5, 16:9)',
            '2 vidéos publicitaires par mois',
            'Tests A/B illimités',
            'Valeur de 500€ offerts chaque mois'
          ]
        },
        bonus: engagementType === '3mois' ? {
          title: '🎆 Bonus engagement',
          items: ['300€ de budget publicitaire offert', 'Formation marketing digital incluse', 'Landing page offerte']
        } : {
          title: '🎆 Bonus annuel',
          items: ['500€ de budget publicitaire offert', 'Formation complète de vos équipes', '2 landing pages offertes', 'Économie de 20% sur le tarif mensuel']
        }
      },
      paymentLinkMonthly: 'https://app-eu1.hubspot.com/payments/4gntC6Vznt2d?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://app-eu1.hubspot.com/payments/bpgDysyjrtZmyhm9?referrer=PAYMENT_LINK',
      engagement: engagementType === '3mois' ? '3 mois minimum puis mensuel' : '12 mois fermes',
      bestValue: true
    },
    {
      id: 'formula-premium',
      name: 'Premium',
      summary: 'Solution sur-mesure pour les entreprises ambitieuses',
      price: {
        threeMonths: 'Sur devis',
        annual: 'Sur devis'
      },
      highlights: [
        'Budget publicitaire illimité',
        'Campagnes illimitées multi-plateformes',
        'Créations publicitaires illimitées',
        'Stratégie personnalisée',
        'Équipe dédiée'
      ],
      gradient: 'from-purple-400 to-pink-500',
      accentColor: 'purple',
      icon: Rocket,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion multi-plateformes : Meta, Google, LinkedIn, TikTok',
            'Budget publicitaire illimité',
            'Campagnes publicitaires illimitées',
            'Stratégie sur-mesure pour votre secteur',
            'Équipe dédiée d\'experts',
            'Optimisation en temps réel avec IA',
            'Retargeting avancé multi-touch',
            'Audiences personnalisées et lookalike',
            'Tracking server-side et attribution avancée'
          ]
        },
        tracking: {
          title: '📂 Suivi & collaboration',
          items: [
            'Équipe dédiée (Account Manager + Créatifs + Data Analyst)',
            'Ligne directe prioritaire 7j/7',
            'Dashboard personnalisé en temps réel',
            'Rapports quotidiens personnalisés',
            'Réunions stratégiques bi-hebdomadaires',
            'Formation de vos équipes incluse'
          ]
        },
        creation: {
          title: '🎨 Création visuelle',
          items: [
            'Créations publicitaires illimitées',
            'Vidéos publicitaires professionnelles illimitées',
            'Landing pages sur-mesure',
            'Tests A/B/C/D illimités',
            'Studio créatif dédié',
            'Direction artistique personnalisée'
          ]
        },
        bonus: {
          title: '🎆 Bonus Premium',
          items: [
            'Budget publicitaire selon vos besoins',
            'Stratégie personnalisée offerte',
            'Formation équipe complète incluse',
            'Accès prioritaire aux nouvelles fonctionnalités',
            'Partenariat stratégique'
          ]
        }
      },
      paymentLinkMonthly: undefined,
      paymentLinkAnnual: undefined,
      engagement: 'Sur-mesure selon vos besoins',
      bestValue: false
    }
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Publicité en Ligne La Réunion',
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
      price: engagementType === '3mois' 
        ? formula.price.threeMonths.replace('€', '').replace(/\s/g, '') 
        : formula.price.annual.replace('€', '').replace(/\s/g, ''),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: engagementType === '3mois' 
          ? formula.price.threeMonths.replace('€', '').replace(/\s/g, '') 
          : formula.price.annual.replace('€', '').replace(/\s/g, ''),
        priceCurrency: 'EUR',
        unitText: engagementType === '3mois' ? 'MONTH' : 'YEAR'
      }
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
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <link rel="canonical" href={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section avec animation sophistiquée */}
      <section className="relative min-h-[80vh] pt-48 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary">
        {/* Animated gradient orbs */}
        <HeroGradientOrbs />
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30">
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUpLarge}
            transition={{ duration: ANIMATION.duration.slow }}
            className="space-y-8"
          >
            {/* Animated icon */}
            <motion.div
              {...ANIMATION.entry.springIn}
              transition={{ 
                ...ANIMATION.ease.spring,
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="inline-flex"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-br from-digiqo-primary to-digiqo-primary/80 p-8 rounded-3xl border border-digiqo-primary/30">
                  <TrendingUp className="w-16 h-16 text-digiqo-accent" />
                </div>
              </div>
            </motion.div>

            {/* Title with letter animation */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="text-white">Amplifiez votre</span>
                <br />
                <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">
                  Impact Digital
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                Campagnes publicitaires haute performance sur les réseaux sociaux.
                ROI optimisé, résultats mesurables.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              transition={{ delay: ANIMATION.delay.section * 2 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <motion.a
                href="#formules"
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Découvrir nos formules
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href={generateContactUrl({ service: 'publicite' })}
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-digiqo-secondary/90 text-white font-bold rounded-2xl border border-digiqo-secondary/50 hover:border-digiqo-secondary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Audit gratuit
                <Sparkles className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-digiqo-accent/30 rounded-full"
              initial={{
                x: (i * 97) % 1920,
                y: 1080,
              }}
              animate={{
                y: -100,
              }}
              transition={{
                duration: ANIMATION.duration.verySlow * (7 + (i % 7)),
                repeat: Infinity,
                delay: (i % 5),
                ease: "linear",
              }}
            />
          ))}
        </div>
      </section>

      {/* Process Section avec Timeline Horizontale */}
      <section className="py-24 bg-gradient-to-br from-white to-digiqo-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Notre <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">Processus</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Une méthodologie éprouvée en 4 étapes pour maximiser votre retour sur investissement
            </p>
          </motion.div>

          {/* Timeline horizontale */}
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-digiqo-accent/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  {...ANIMATION.entry.fadeInUpLarge}
                  whileInView={ANIMATION.entry.fadeInUpLarge.animate}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(index) }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 left-8 bg-gradient-to-r from-digiqo-primary to-digiqo-primary/80 text-white text-sm font-bold px-4 py-2 rounded-full">
                      ÉTAPE {step.number}
                    </div>
                    
                    {/* Icon */}
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
      <section id="formules" className="py-24 bg-white">
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
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Des solutions adaptées à chaque étape de votre croissance
            </p>
            
            {/* Sélecteur d'engagement */}
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="inline-flex bg-digiqo-primary/5 rounded-full p-1">
                <button
                  onClick={() => setEngagementType('3mois')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    engagementType === '3mois'
                      ? 'bg-gradient-to-r from-digiqo-accent to-amber-400 text-white shadow-lg'
                      : 'text-digiqo-primary/70 hover:text-digiqo-primary'
                  }`}
                >
                  Engagement 3 mois
                </button>
                <button
                  onClick={() => setEngagementType('annuel')}
                  className={`px-8 py-3 rounded-full font-semibold transition-all ${
                    engagementType === 'annuel'
                      ? 'bg-gradient-to-r from-digiqo-accent to-amber-400 text-white shadow-lg'
                      : 'text-digiqo-primary/70 hover:text-digiqo-primary'
                  }`}
                >
                  Engagement annuel
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    -20%
                  </span>
                </button>
              </div>
              <p className="text-sm text-digiqo-primary/60">
                {engagementType === '3mois' 
                  ? 'Engagement minimum de 3 mois, puis renouvellement mensuel automatique'
                  : 'Engagement annuel avec tarif préférentiel et accompagnement premium'
                }
              </p>
            </div>
          </motion.div>

          {/* Formula Cards - Mode normal ou comparatif */}
          {!compareMode ? (
            <div className="space-y-8 max-w-5xl mx-auto">
              {formulas.map((formula, index) => {
              const [isFlipped, setIsFlipped] = useState(false)
              const [activeSection, setActiveSection] = useState<string | null>(null)
              const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(null)
              
              return (
                <motion.div
                  key={formula.id}
                  {...ANIMATION.entry.scaleIn}
                  whileInView={ANIMATION.entry.scaleIn.animate}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Desktop: Dynamic Flip Card */}
                  <div className="hidden md:block relative h-[500px]" style={{ perspective: '1000px' }}>
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: ANIMATION.duration.normal }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front of card */}
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="h-full bg-white rounded-3xl shadow-xl border border-digiqo-accent/10 overflow-hidden">
                          {/* Gradient accent */}
                          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${formula.gradient}`} />
                          
                          <div className="p-8 pb-10">
                            {/* Header */}
                            <div className="mb-8">
                              <h3 className={`text-4xl font-bold bg-gradient-to-r ${formula.gradient} bg-clip-text text-transparent mb-4`}>
                                {formula.name}
                              </h3>
                              <p className="text-digiqo-primary/60 text-lg mb-6">{formula.summary}</p>
                              
                              {/* Price */}
                              <div className="flex items-baseline gap-4">
                                <span className="text-digiqo-primary/60 text-lg">À partir de</span>
                                <span className="text-5xl font-bold">
                                  {engagementType === '3mois' ? formula.price.threeMonths : formula.price.annual}
                                </span>
                                <span className="text-digiqo-primary/60">{engagementType === '3mois' ? '/mois' : '/an'}</span>
                                {engagementType === '3mois' && (
                                  <span className="text-sm text-digiqo-primary/50">
                                    {formula.engagement || 'Engagement 3 mois minimum'}
                                  </span>
                                )}
                                {engagementType === 'annuel' && (
                                  <span className="text-sm text-green-600 font-semibold">
                                    Économisez 20%
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Interactive sections grid - Show all 4 */}
                            <div className="grid grid-cols-4 gap-3 mb-6">
                              {Object.entries(formula.sections).map(([key, section]) => {
                                if (!section) return null
                                const Icon = key === 'services' ? TrendingUp : 
                                           key === 'tracking' ? BarChart3 : 
                                           key === 'creation' ? Palette : 
                                           Sparkles
                                
                                return (
                                  <motion.button
                                    key={key}
                                    onClick={() => {
                                      setActiveSection(key)
                                      setIsFlipped(true)
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={ANIMATION.tap.scaleSmall}
                                    className="relative bg-digiqo-secondary/5 hover:bg-digiqo-secondary/10 rounded-xl p-4 text-left transition-all group"
                                  >
                                    {/* Hover glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${formula.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                                    
                                    <div className="relative">
                                      <div className="flex flex-col items-center text-center">
                                        <div className={`p-3 rounded-lg bg-gradient-to-br ${formula.gradient} text-white mb-2`}>
                                          <Icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="font-bold text-digiqo-primary text-sm mb-1">{section.title}</h4>
                                        <p className="text-xs text-digiqo-primary/70 mb-2">
                                          {section.items.length} inclus
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-digiqo-accent">
                                          <span>Voir</span>
                                          <ArrowRight className="w-3 h-3" />
                                        </div>
                                      </div>
                                    </div>
                                  </motion.button>
                                )
                              })}
                            </div>

                            {/* CTA Button on Front */}
                            <motion.a
                              href={
                                engagementType === '3mois' 
                                  ? (formula.paymentLinkMonthly || generateContactUrl({ formula: formula.name.toLowerCase(), service: 'publicite', description: `Formule ${formula.name} - Engagement 3 mois` }))
                                  : (formula.paymentLinkAnnual || generateContactUrl({ formula: formula.name.toLowerCase(), service: 'publicite', description: `Formule ${formula.name} - Engagement annuel` }))
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={ANIMATION.tap.scaleSmall}
                              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                              Choisir cette formule
                              <ArrowUpRight className="w-5 h-5" />
                            </motion.a>
                          </div>
                        </div>
                      </div>

                      {/* Back of card - Dynamic content */}
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="h-full bg-white rounded-3xl shadow-xl border border-digiqo-accent/10 overflow-hidden">
                          {/* Gradient accent */}
                          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${formula.gradient}`} />
                          
                          {activeSection && formula.sections[activeSection as keyof typeof formula.sections] && (
                            <div className="p-8 h-full flex flex-col">
                              {/* Header with back button */}
                              <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                  <div className={`p-3 rounded-xl bg-gradient-to-br ${formula.gradient} text-white`}>
                                    {activeSection === 'services' ? <TrendingUp className="w-6 h-6" /> : 
                                     activeSection === 'tracking' ? <BarChart3 className="w-6 h-6" /> : 
                                     activeSection === 'creation' ? <Palette className="w-6 h-6" /> : 
                                     <Sparkles className="w-6 h-6" />}
                                  </div>
                                  <div>
                                    <h3 className="text-2xl font-bold text-digiqo-primary">
                                      {formula.sections[activeSection as keyof typeof formula.sections]?.title}
                                    </h3>
                                    <p className="text-sm text-digiqo-primary/70">{formula.name}</p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    setIsFlipped(false)
                                    setTimeout(() => setActiveSection(null), 600)
                                  }}
                                  className="p-2 hover:bg-digiqo-secondary/10 rounded-lg transition-colors"
                                >
                                  <X className="w-5 h-5 text-digiqo-primary/50" />
                                </button>
                              </div>

                              {/* Content */}
                              <div className="flex-1 overflow-y-auto">
                                <ul className="space-y-2">
                                  {formula.sections[activeSection as keyof typeof formula.sections]?.items.map((item, idx) => (
                                    <motion.li 
                                      key={idx} 
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                      className="flex items-start gap-2"
                                    >
                                      <div className={`p-0.5 rounded-full bg-gradient-to-r ${formula.gradient} flex-shrink-0 mt-1`}>
                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                      </div>
                                      <span className="text-sm text-digiqo-primary/80">{item}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>

                              {/* CTA */}
                              <motion.a
                                href={
                                  engagementType === '3mois' 
                                    ? (formula.paymentLinkMonthly || generateContactUrl({ formula: formula.name.toLowerCase(), service: activeSection, description: `Formule ${formula.name} - Engagement 3 mois` }))
                                    : (formula.paymentLinkAnnual || generateContactUrl({ formula: formula.name.toLowerCase(), service: activeSection, description: `Formule ${formula.name} - Engagement annuel` }))
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={ANIMATION.tap.scaleSmall}
                                className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                              >
                                Choisir cette formule
                                <ArrowUpRight className="w-5 h-5" />
                              </motion.a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile: Accordion */}
                  <div className="md:hidden bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Header always visible */}
                    <div className="p-6 border-b border-digiqo-accent/10">
                      <h3 className={`text-3xl font-bold bg-gradient-to-r ${formula.gradient} bg-clip-text text-transparent mb-2`}>
                        {formula.name}
                      </h3>
                      <p className="text-digiqo-primary/70 mb-6">{formula.summary}</p>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-4xl font-bold">
                          {engagementType === '3mois' ? formula.price.threeMonths : formula.price.annual}
                        </span>
                        <span className="text-digiqo-primary/60">
                          {engagementType === '3mois' ? '/mois' : '/an'}
                        </span>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-3">
                        {formula.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-digiqo-accent flex-shrink-0" />
                            <span className="text-sm font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable sections */}
                    <div className="border-t border-digiqo-accent/10">
                      {Object.entries(formula.sections).map(([key, section]) => {
                        if (!section) return null
                        const Icon = key === 'services' ? TrendingUp : 
                                   key === 'tracking' ? BarChart3 : 
                                   key === 'creation' ? Palette : 
                                   Sparkles
                        const isOpen = mobileActiveSection === `${formula.id}-${key}`
                        
                        return (
                          <div key={key} className="border-b border-digiqo-accent/10 last:border-0">
                            <button
                              onClick={() => setMobileActiveSection(
                                isOpen ? null : `${formula.id}-${key}`
                              )}
                              className="w-full p-4 flex items-center justify-between hover:bg-digiqo-secondary/5 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${formula.gradient} text-white`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-digiqo-primary">{section.title}</span>
                              </div>
                              <ChevronRight className={`w-5 h-5 text-digiqo-primary/40 transition-transform ${
                                isOpen ? 'rotate-90' : ''
                              }`} />
                            </button>
                            
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  transition={{ duration: ANIMATION.duration.fast }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4">
                                    <ul className="space-y-2">
                                      {section.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${formula.gradient} mt-1.5 flex-shrink-0`} />
                                          <span className="text-digiqo-primary/70">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>

                    {/* CTA */}
                    <div className="p-6 bg-gradient-to-br from-digiqo-accent/5 to-digiqo-secondary/5">
                      <motion.a
                        href={
                          engagementType === '3mois' 
                            ? (formula.paymentLinkMonthly || generateContactUrl({ formula: formula.name.toLowerCase(), description: `Formule ${formula.name} - Engagement 3 mois` }))
                            : (formula.paymentLinkAnnual || generateContactUrl({ formula: formula.name.toLowerCase(), description: `Formule ${formula.name} - Engagement annuel` }))
                        }
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
              )
            })}
            </div>
          ) : (
            /* Vue comparative */
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-7xl mx-auto"
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
                              {engagementType === '3mois' ? formula.price.threeMonths : formula.price.annual}
                            </p>
                            <p className="text-sm opacity-80">
                              {engagementType === '3mois' ? '/mois' : '/an'}
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
                      <td className="p-4 text-center">Jusqu'à 2 000€</td>
                      <td className="p-4 text-center">Jusqu'à 5 000€</td>
                      <td className="p-4 text-center">Illimité</td>
                    </tr>
                    {/* Campagnes simultanées */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Campagnes simultanées</td>
                      <td className="p-4 text-center">3 campagnes</td>
                      <td className="p-4 text-center">Illimitées</td>
                      <td className="p-4 text-center">Illimitées</td>
                    </tr>
                    {/* Plateformes */}
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Plateformes gérées</td>
                      <td className="p-4 text-center">Meta</td>
                      <td className="p-4 text-center">Meta + Google</td>
                      <td className="p-4 text-center">Toutes plateformes</td>
                    </tr>
                    {/* Créatifs offerts */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Créatifs publicitaires/mois</td>
                      <td className="p-4 text-center">3 créatifs</td>
                      <td className="p-4 text-center">8 créatifs + 2 vidéos</td>
                      <td className="p-4 text-center">Illimités</td>
                    </tr>
                    {/* Audiences similaires */}
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Audiences personnalisées</td>
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
                    {/* Optimisation */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Optimisation</td>
                      <td className="p-4 text-center">Hebdomadaire</td>
                      <td className="p-4 text-center">Quotidienne</td>
                      <td className="p-4 text-center">Temps réel avec IA</td>
                    </tr>
                    {/* Support */}
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Support</td>
                      <td className="p-4 text-center">Email & Chat</td>
                      <td className="p-4 text-center">Prioritaire + AM dédié</td>
                      <td className="p-4 text-center">Équipe dédiée 7j/7</td>
                    </tr>
                    {/* Rapports */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Rapports</td>
                      <td className="p-4 text-center">Mensuel</td>
                      <td className="p-4 text-center">Hebdomadaire + calls</td>
                      <td className="p-4 text-center">Dashboard temps réel</td>
                    </tr>
                    {/* Account Manager */}
                    <tr className="border-t border-digiqo-primary/10 bg-gradient-to-r from-digiqo-accent/10 to-amber-500/10">
                      <td className="p-4 font-medium text-digiqo-primary">Account Manager</td>
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
                    {/* CTA */}
                    <tr className="bg-gradient-to-r from-digiqo-primary/5 to-digiqo-accent/5">
                      <td className="p-6" colSpan={4}>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                          {formulas.map((formula) => (
                            <motion.a
                              key={formula.id}
                              href={(engagementType === '3mois' ? formula.paymentLinkMonthly : formula.paymentLinkAnnual) || generateContactUrl({ formula: formula.name.toLowerCase(), service: 'publicite', description: `Formule ${formula.name} - Engagement ${engagementType === '3mois' ? '3 mois' : 'annuel'}` })}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-xl shadow-lg`}
                            >
                              Choisir {formula.name}
                              <ArrowUpRight className="w-5 h-5" />
                            </motion.a>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* WhatsApp CTA */}
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <a
              href={generateWhatsAppLink({ service: 'publicite' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6" />
              Contactez-nous sur WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-digiqo-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Prêt à <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">propulser</span> votre entreprise ?
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Bénéficiez d'un audit gratuit et découvrez comment nos campagnes peuvent transformer votre présence digitale
            </p>
            
            <div className="flex justify-center">
              <motion.a
                href={generateContactUrl({ 
                  service: 'audit', 
                  description: "Je souhaite bénéficier d'un audit gratuit avant de lancer mes campagnes publicitaires" 
                })}
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-digiqo-secondary/90 text-white font-bold rounded-2xl border border-digiqo-secondary/50 hover:border-digiqo-secondary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BarChart3 className="w-5 h-5" />
                Audit gratuit
                <Zap className="w-5 h-5 text-digiqo-accent" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}