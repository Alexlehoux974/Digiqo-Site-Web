import { useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
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
  ArrowUpRight
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'

interface Formula {
  id: string
  name: string
  summary: string
  price: {
    monthly: string
    yearly: string
  }
  highlights: string[]
  gradient: string
  accentColor: string
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
}

const formulas: Formula[] = [
  {
    id: 'initiation',
    name: 'Initiation',
    summary: 'Idéal pour démarrer votre présence publicitaire en ligne avec un budget maîtrisé',
    price: {
      monthly: '549€',
      yearly: '5 270€'
    },
    highlights: [
      'Jusqu\'à 1 000€ de budget géré',
      '3 campagnes simultanées',
      '3 visuels offerts/mois'
    ],
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    sections: {
      services: {
        title: 'Services publicitaires',
        items: [
          'Gestion & diffusion sur META (Facebook, Instagram)',
          'Budget publicitaire jusqu\'à 1 000€/mois',
          'Maximum 3 campagnes simultanées',
          'Création et ciblage stratégique',
          'Optimisation hebdomadaire',
          'Retargeting des audiences',
          'Exploitation des Pixels existants'
        ]
      },
      tracking: {
        title: 'Suivi & collaboration',
        items: [
          'Canal Google Chat dédié',
          'Espace Drive centralisé',
          'Rapports d\'activité réguliers'
        ]
      },
      creation: {
        title: 'Création visuelle',
        items: [
          '3 créatifs publicitaires/mois (valeur 135€)',
          'Tous formats adaptés (1:1, 9:16, 4:5)',
          'Non cumulables si non utilisés'
        ]
      },
      bonus: {
        title: 'Bonus forfait annuel',
        items: [
          'Captation vidéo 1h (SONY A7IV)',
          'Montage dynamique 20-60 sec',
          'Textes et sous-titres inclus',
          'Effets visuels professionnels',
          'Musique libre de droits',
          'Export tous formats',
          '2 retouches incluses'
        ]
      }
    }
  },
  {
    id: 'propulsion',
    name: 'Propulsion',
    summary: 'Pour accélérer votre croissance avec des campagnes plus ambitieuses et un suivi renforcé',
    price: {
      monthly: '949€',
      yearly: '9 110€'
    },
    highlights: [
      'Jusqu\'à 2 500€ de budget géré',
      '4 campagnes simultanées',
      'Audiences similaires'
    ],
    gradient: 'from-blue-500 to-indigo-600',
    accentColor: 'blue',
    sections: {
      services: {
        title: 'Services publicitaires',
        items: [
          'Gestion & diffusion sur META (Facebook, Instagram)',
          'Budget publicitaire jusqu\'à 2 500€/mois',
          'Maximum 4 campagnes simultanées',
          'Création et ciblage stratégique avancé',
          'Optimisation hebdomadaire des performances',
          'Retargeting des audiences qualifiées',
          'Création d\'audiences similaires',
          'Exploitation optimale des Pixels/API'
        ]
      },
      tracking: {
        title: 'Suivi & collaboration',
        items: [
          'Canal Google Chat prioritaire',
          'Espace Drive dédié et organisé',
          'Rapports détaillés bi-mensuels'
        ]
      },
      creation: {
        title: 'Création visuelle',
        items: [
          '3 créatifs publicitaires/mois (valeur 135€)',
          'Déclinaisons multi-formats optimisées',
          'A/B testing des visuels'
        ]
      },
      bonus: {
        title: 'Bonus forfait annuel',
        items: [
          'Captation vidéo premium 1h',
          'Montage cinématique avancé',
          'Motion design professionnel',
          'Color grading sur mesure',
          'Sound design immersif',
          'Exports optimisés par plateforme',
          'Révisions illimitées'
        ]
      }
    }
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Analyse',
    description: 'Étude approfondie de votre marché et de vos objectifs commerciaux',
    icon: Target,
    color: 'from-purple-500 to-indigo-600'
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Définition précise des audiences et des messages publicitaires',
    icon: Users,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    number: '03',
    title: 'Création',
    description: 'Conception de visuels et contenus publicitaires haute performance',
    icon: Palette,
    color: 'from-pink-500 to-rose-600'
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Ajustements data-driven pour maximiser votre retour sur investissement',
    icon: LineChart,
    color: 'from-amber-500 to-orange-600'
  }
]

export default function PublicitePage() {
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<{ [key: string]: string }>({})
  const [compareMode, setCompareMode] = useState(false)
  const seoData = servicesSEO['publicite-en-ligne-reunion']

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
      price: formula.price.monthly.replace('€', ''),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: formula.price.monthly.replace('€', ''),
        priceCurrency: 'EUR',
        unitText: 'MONTH'
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
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-digiqo-accent/30 to-transparent rounded-full blur-3xl animate-pulse" />
            <motion.div 
              className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-digiqo-secondary/30 to-transparent rounded-full blur-3xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="inline-flex"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-3xl blur-2xl opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700">
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
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Campagnes publicitaires haute performance sur les réseaux sociaux.
                ROI optimisé, résultats mesurables.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <motion.a
                href="#formules"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Découvrir nos formules
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href={generateContactUrl({ service: 'publicite' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-800 text-white font-bold rounded-2xl border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300"
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
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1080,
              }}
              animate={{
                y: -100,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </section>

      {/* Process Section avec Timeline Horizontale */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Notre <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">Processus</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée en 4 étapes pour maximiser votre retour sur investissement
            </p>
          </motion.div>

          {/* Timeline horizontale */}
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className="absolute -top-4 left-8 bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm font-bold px-4 py-2 rounded-full">
                      ÉTAPE {step.number}
                    </div>
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 mt-4`}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    
                    {/* Connection dot for timeline */}
                    <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full -translate-x-1/2 hidden lg:block" />
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
              Nos <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Des solutions adaptées à chaque étape de votre croissance
            </p>
            
            {/* Compare toggle */}
            <button
              onClick={() => setCompareMode(!compareMode)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-medium transition-colors"
            >
              <Layers className="w-5 h-5" />
              {compareMode ? 'Vue normale' : 'Comparer les formules'}
            </button>
          </motion.div>

          {/* Formula Cards */}
          <div className={`grid ${compareMode ? 'lg:grid-cols-2' : 'lg:grid-cols-2'} gap-8 max-w-6xl mx-auto`}>
            {formulas.map((formula, index) => (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                layout
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedFormula(selectedFormula === formula.id ? null : formula.id)}
                  className={`relative bg-gray-50 rounded-3xl p-8 cursor-pointer transition-all duration-500 ${
                    selectedFormula === formula.id ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: selectedFormula === formula.id ? 'perspective(1000px) rotateX(2deg)' : 'none'
                  }}
                >
                  {/* Gradient border effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${formula.gradient} rounded-3xl opacity-10`} />
                  
                  {/* Header */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className={`text-3xl font-bold bg-gradient-to-r ${formula.gradient} bg-clip-text text-transparent`}>
                          {formula.name}
                        </h3>
                        <p className="text-gray-600 mt-2">{formula.summary}</p>
                      </div>
                      <ChevronRight 
                        className={`w-6 h-6 text-gray-400 transition-transform ${
                          selectedFormula === formula.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-5xl font-bold">{formula.price.monthly}</span>
                      <span className="text-gray-600">/mois</span>
                      <span className="text-sm text-gray-500">
                        ou {formula.price.yearly}/an
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {formula.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle2 className={`w-5 h-5 text-${formula.accentColor}-500`} />
                          <span className="font-medium">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {selectedFormula === formula.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t pt-6"
                        >
                          {/* Tabs */}
                          <div className="flex gap-2 mb-6 overflow-x-auto">
                            {Object.keys(formula.sections).map((section) => (
                              <button
                                key={section}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveTab({ ...activeTab, [formula.id]: section })
                                }}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                                  (activeTab[formula.id] || 'services') === section
                                    ? `bg-gradient-to-r ${formula.gradient} text-white`
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                {formula.sections[section as keyof typeof formula.sections]?.title}
                              </button>
                            ))}
                          </div>

                          {/* Tab content */}
                          <AnimatePresence mode="wait">
                            {Object.entries(formula.sections).map(([key, section]) => {
                              if ((activeTab[formula.id] || 'services') === key && section) {
                                return (
                                  <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-3"
                                  >
                                    {section.items.map((item, idx) => (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-start gap-3"
                                      >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${formula.gradient} mt-2 flex-shrink-0`} />
                                        <span className="text-gray-700">{item}</span>
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                )
                              }
                              return null
                            })}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CTA Button */}
                    <motion.a
                      href={generateContactUrl({ formula: formula.name.toLowerCase() })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                      className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Choisir cette formule
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional formulas mention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 mb-4">
              Des formules <span className="font-bold">Expansion</span> et <span className="font-bold">Domination</span> sont disponibles pour des besoins plus importants.
            </p>
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
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-digiqo-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Prêt à <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">propulser</span> votre entreprise ?
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bénéficiez d'un audit gratuit et découvrez comment nos campagnes peuvent transformer votre présence digitale
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href={generateContactUrl({ 
                  service: 'publicite', 
                  description: 'Je souhaite planifier un rendez-vous pour discuter de mes besoins en publicité' 
                })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-800 text-white font-bold rounded-2xl border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300"
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