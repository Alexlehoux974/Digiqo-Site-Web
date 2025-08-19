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
  Calendar, 
  Zap,
  Users,
  LineChart,
  Layers,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  X,
  Crown,
  Rocket
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
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
  const [compareMode, setCompareMode] = useState(false)
  const [engagementType, setEngagementType] = useState<'3mois' | 'annuel'>('3mois')
  const seoData = servicesSEO['publicite-en-ligne-reunion']
  
  // Get real products from Airtable
  const publiciteProducts = getProductsForService('publicite')
  
  // Map Airtable products by formula name
  const initMonthly = publiciteProducts.find(p => p.name.includes('Initiation') && p.name.includes('Mensuelle'))
  const initAnnual = publiciteProducts.find(p => p.name.includes('Initiation') && p.name.includes('Annuelle'))
  const propMonthly = publiciteProducts.find(p => p.name.includes('Propulsion') && p.name.includes('Mensuelle'))
  const propAnnual = publiciteProducts.find(p => p.name.includes('Propulsion') && p.name.includes('Annuelle'))
  const expMonthly = publiciteProducts.find(p => p.name.includes('Expansion') && p.name.includes('Mensuelle'))
  const expAnnual = publiciteProducts.find(p => p.name.includes('Expansion') && p.name.includes('Annuelle'))
  const domMonthly = publiciteProducts.find(p => p.name.includes('Domination') && p.name.includes('Mensuelle'))
  const domAnnual = publiciteProducts.find(p => p.name.includes('Domination') && p.name.includes('Annuelle'))
  
  // Create formulas with real data
  const formulas: Formula[] = [
    {
      id: 'formula-initiation',
      name: 'Initiation',
      summary: 'Idéal pour débuter dans la publicité en ligne avec un budget maîtrisé',
      price: {
        threeMonths: initMonthly?.priceFormatted || '549,00 €',
        annual: initAnnual?.priceFormatted || '5 270,00 €'
      },
      highlights: [
        'Jusqu\'à 1 000€ de budget publicitaire géré/mois',
        'Jusqu\'à 3 campagnes simultanées',
        '3 visuels publicitaires offerts/mois'
      ],
      gradient: 'from-amber-300 to-orange-400',
      accentColor: 'amber',
      icon: Target,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 1 000€ de budget publicitaire géré/mois',
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
          title: '🎆 Bonus',
          items: ['1 vidéo offerte dès le 3ème mois']
        } : {
          title: '🎆 Bonus annuel',
          items: ['2 vidéos offertes/an', 'Économie de 20% sur le tarif mensuel']
        }
      },
      paymentLinkMonthly: initMonthly?.paymentLink,
      paymentLinkAnnual: initAnnual?.paymentLink,
      engagement: engagementType === '3mois' ? '3 mois minimum puis mensuel' : '12 mois fermes',
      bestValue: false
    },
    {
      id: 'formula-propulsion',
      name: 'Propulsion',
      summary: 'Pour les entreprises en croissance cherchant à augmenter leur visibilité',
      price: {
        threeMonths: propMonthly?.priceFormatted || '949,00 €',
        annual: propAnnual?.priceFormatted || '9 110,40 €'
      },
      highlights: [
        'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
        'Jusqu\'à 4 campagnes simultanées',
        'Audiences similaires incluses'
      ],
      gradient: 'from-blue-300 to-indigo-400',
      accentColor: 'blue',
      icon: Zap,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
            'Jusqu\'à 4 campagnes publicitaires simultanées',
            'Création, ciblage & testing stratégique',
            'Optimisation hebdomadaire des performances',
            'Retargeting : reciblage des audiences',
            'Création & exploitation d\'audiences similaires'
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
          title: '🎆 Bonus',
          items: ['1 vidéo offerte dès le 3ème mois']
        } : {
          title: '🎆 Bonus annuel',
          items: ['2 vidéos offertes/an', 'Économie de 20% sur le tarif mensuel']
        }
      },
      paymentLinkMonthly: propMonthly?.paymentLink,
      paymentLinkAnnual: propAnnual?.paymentLink,
      engagement: engagementType === '3mois' ? '3 mois minimum puis mensuel' : '12 mois fermes',
      bestValue: true
    },
    {
      id: 'formula-expansion',
      name: 'Expansion',
      summary: 'Stratégie avancée pour une présence dominante sur les réseaux sociaux',
      price: {
        threeMonths: expMonthly?.priceFormatted || '1 490,00 €',
        annual: expAnnual?.priceFormatted || '14 304,00 €'
      },
      highlights: [
        'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
        'Jusqu\'à 6 campagnes simultanées',
        'Audiences similaires avancées'
      ],
      gradient: 'from-purple-300 to-pink-400',
      accentColor: 'purple',
      icon: Rocket,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
            'Jusqu\'à 6 campagnes publicitaires simultanées',
            'Création, ciblage & testing stratégique',
            'Optimisation hebdomadaire des performances',
            'Retargeting : reciblage des audiences',
            'Création & exploitation d\'audiences similaires'
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
          title: '🎆 Bonus',
          items: ['1 vidéo offerte dès le 3ème mois']
        } : {
          title: '🎆 Bonus annuel',
          items: ['2 vidéos offertes/an', 'Économie de 20% sur le tarif mensuel']
        }
      },
      paymentLinkMonthly: expMonthly?.paymentLink,
      paymentLinkAnnual: expAnnual?.paymentLink,
      engagement: engagementType === '3mois' ? '3 mois minimum puis mensuel' : '12 mois fermes',
      bestValue: false
    },
    {
      id: 'formula-domination',
      name: 'Domination',
      summary: 'Solution complète pour les leaders du marché',
      price: {
        threeMonths: domMonthly?.priceFormatted || '1 990,00 €',
        annual: domAnnual?.priceFormatted || '19 104,00 €'
      },
      highlights: [
        'Jusqu\'à 10 000€ de budget publicitaire géré/mois',
        'Jusqu\'à 10 campagnes simultanées',
        'Implémentation Pixel incluse'
      ],
      gradient: 'from-red-300 to-rose-400',
      accentColor: 'red',
      icon: Crown,
      sections: {
        services: {
          title: '🎯 Services publicitaires',
          items: [
            'Gestion & diffusion sur Meta (Facebook & Instagram)',
            'Jusqu\'à 10 000€ de budget publicitaire géré/mois',
            'Jusqu\'à 10 campagnes publicitaires simultanées',
            'Création, ciblage & testing stratégique',
            'Optimisation hebdomadaire des performances',
            'Retargeting : reciblage des audiences',
            'Création & exploitation d\'audiences similaires',
            'Implémentation & programmation du Pixel de base'
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
          title: '🎆 Bonus',
          items: ['1 vidéo offerte dès le 3ème mois']
        } : {
          title: '🎆 Bonus annuel',
          items: ['2 vidéos offertes/an', 'Économie de 20% sur le tarif mensuel']
        }
      },
      paymentLinkMonthly: domMonthly?.paymentLink,
      paymentLinkAnnual: domAnnual?.paymentLink,
      engagement: engagementType === '3mois' ? '3 mois minimum puis mensuel' : '12 mois fermes',
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
        <meta property="og:image" content="https://digiqo.fr/og-publicite.jpg" />
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
      <section className="relative min-h-[80vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary">
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
            
            {/* Compare toggle */}
            <button
              onClick={() => setCompareMode(!compareMode)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-digiqo-secondary/10 hover:bg-digiqo-secondary/20 rounded-full font-medium transition-colors"
            >
              <Layers className="w-5 h-5" />
              {compareMode ? 'Vue normale' : 'Comparer les formules'}
            </button>
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
                  <div className="hidden md:block relative h-[450px]" style={{ perspective: '1000px' }}>
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
                          
                          <div className="p-8">
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
                                <span className="text-digiqo-primary/60">/mois</span>
                                {engagementType === '3mois' && (
                                  <span className="text-sm text-digiqo-primary/50">
                                    {formula.engagement || 'Engagement 3 mois minimum'}
                                  </span>
                                )}
                                {engagementType === 'annuel' && (
                                  <span className="text-sm text-green-600 font-semibold">
                                    Économisez 15%
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Interactive sections grid - Show all 4 */}
                            <div className="grid grid-cols-4 gap-3">
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
                          {engagementType === '3mois' ? '/mois' : ''}
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
                              {engagementType === '3mois' ? '/mois' : ''}
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
                      <td className="p-4 text-center">Jusqu'à 1 000€</td>
                      <td className="p-4 text-center">Jusqu'à 2 500€</td>
                      <td className="p-4 text-center">Jusqu'à 5 000€</td>
                      <td className="p-4 text-center">Jusqu'à 10 000€</td>
                    </tr>
                    {/* Campagnes simultanées */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Campagnes simultanées</td>
                      <td className="p-4 text-center">1 campagne</td>
                      <td className="p-4 text-center">2-3 campagnes</td>
                      <td className="p-4 text-center">Illimitées</td>
                    </tr>
                    {/* Créatifs offerts */}
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Créatifs publicitaires/mois</td>
                      <td className="p-4 text-center">Basiques</td>
                      <td className="p-4 text-center">Avancés</td>
                      <td className="p-4 text-center">Premium</td>
                    </tr>
                    {/* Audiences similaires */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
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
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Optimisation</td>
                      <td className="p-4 text-center">Mensuelle</td>
                      <td className="p-4 text-center">Bi-hebdomadaire</td>
                      <td className="p-4 text-center">Hebdomadaire</td>
                    </tr>
                    {/* Support */}
                    <tr className="border-t border-digiqo-primary/10 bg-digiqo-primary/5">
                      <td className="p-4 font-medium text-digiqo-primary">Support</td>
                      <td className="p-4 text-center">Email</td>
                      <td className="p-4 text-center">Prioritaire</td>
                      <td className="p-4 text-center">Dédié 7j/7</td>
                    </tr>
                    {/* Rapports */}
                    <tr className="border-t border-digiqo-primary/10">
                      <td className="p-4 font-medium text-digiqo-primary">Rapports</td>
                      <td className="p-4 text-center">Mensuel</td>
                      <td className="p-4 text-center">Bi-mensuel + appel</td>
                      <td className="p-4 text-center">Hebdomadaire + réunions</td>
                    </tr>
                    {/* Account Manager */}
                    <tr className="border-t border-digiqo-primary/10 bg-gradient-to-r from-digiqo-accent/10 to-amber-500/10">
                      <td className="p-4 font-medium text-digiqo-primary">Account Manager</td>
                      <td className="p-4 text-center">
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    {/* CTA */}
                    <tr className="bg-gradient-to-r from-digiqo-primary/5 to-digiqo-accent/5">
                      <td className="p-6" colSpan={3}>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                          {formulas.map((formula) => (
                            <motion.a
                              key={formula.id}
                              href={(engagementType === '3mois' ? formula.paymentLinkMonthly : formula.paymentLinkAnnual) || generateContactUrl({ formula: formula.name.toLowerCase(), service: 'publicite', description: `Formule ${formula.name} - Engagement ${engagementType === '3mois' ? '3 mois' : 'annuel'}` })}
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

          {/* Additional formulas mention */}
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <a
              href={generateContactUrl({ 
                service: 'publicite', 
                description: 'Je souhaite des informations sur les formules Expansion et Domination' 
              })}
              className="inline-flex items-center gap-2 text-digiqo-accent font-bold hover:underline"
            >
              En savoir plus
              <ArrowRight className="w-4 h-4" />
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
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href={generateContactUrl({ 
                  service: 'publicite', 
                  description: 'Je souhaite planifier un rendez-vous pour discuter de mes besoins en publicité' 
                })}
                whileHover={ANIMATION.hover.scale}
                whileTap={ANIMATION.tap.scale}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Planifier un rendez-vous
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
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