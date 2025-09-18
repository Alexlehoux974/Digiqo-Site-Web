import React from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'

// Animation constants
const ANIMATION = {
  duration: {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 25
  },
  delay: {
    stagger: 0.1,
    section: 0.2
  },
  hover: {
    scale: { scale: 1.05 },
    glow: {
      boxShadow: "0 0 20px rgba(218, 101, 48, 0.3)"
    }
  },
  tap: {
    scale: { scale: 0.95 },
    scaleSmall: { scale: 0.98 }
  },
  entry: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    },
    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    },
    scaleIn: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5 }
    },
    slideInLeft: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.5 }
    },
    slideInRight: {
      initial: { x: 50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 0.5 }
    }
  }
}

// Updated formulas with new pricing from the image
const formulas = [
  {
    id: 1,
    name: 'INITIATION',
    price: '549,00',
    engagement: 'Sans engagement • Résiliable à tout moment',
    features: [
      '1 campagne active',
      'Gestion du budget publicitaire',
      'Création visuelle basique',
      'Rapport mensuel',
      'Support par email',
      'Optimisation mensuelle'
    ],
    details: [
      'Idéal pour découvrir la publicité en ligne',
      'Budget publicitaire non inclus',
      'Formation initiale incluse'
    ],
    gradient: 'from-gray-400 to-gray-500'
  },
  {
    id: 2,
    name: 'PROPULSION',
    price: '949,00',
    isPopular: true,
    engagement: 'Sans engagement • Le plus populaire',
    features: [
      '2-3 campagnes actives',
      'Gestion optimisée du budget',
      'Créations visuelles avancées',
      'Audiences personnalisées',
      'Rapport bi-mensuel + appel',
      'Support prioritaire',
      'Optimisation bi-hebdomadaire'
    ],
    details: [
      'Pour une croissance rapide et maîtrisée',
      'Budget publicitaire non inclus',
      'Stratégie multi-plateformes'
    ],
    gradient: 'from-digiqo to-red-600'
  },
  {
    id: 3,
    name: 'EXPANSION',
    price: '1990,00',
    engagement: 'Sans engagement • Service premium',
    features: [
      'Campagnes illimitées',
      'Account Manager dédié',
      'Créations premium illimitées',
      'Audiences avancées + lookalike',
      'Rapports hebdomadaires',
      'Support dédié 7j/7',
      'Optimisation continue',
      'Tests A/B systématiques'
    ],
    details: [
      'Solution complète pour entreprises ambitieuses',
      'Budget publicitaire non inclus',
      'Réunions stratégiques mensuelles'
    ],
    gradient: 'from-amber-500 to-orange-600'
  }
]

interface QuickWin {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  highlight: string
}

const quickWins: QuickWin[] = [
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
    title: "Rapports détaillés",
    description: "Suivez vos performances en temps réel avec nos tableaux de bord personnalisés",
    highlight: "100% transparent"
  },
  {
    icon: Sparkles,
    title: "Créativité illimitée",
    description: "Nos designers créent des visuels percutants qui captent l'attention de votre audience",
    highlight: "+2x engagement"
  }
]

interface Statistic {
  value: string
  label: string
  color: string
}

const statistics: Statistic[] = [
  {
    value: "+250%",
    label: "Croissance moyenne",
    color: "from-digiqo-accent to-amber-500"
  },
  {
    value: "3M€",
    label: "Budget géré en 2024",
    color: "from-digiqo-secondary to-cyan-400"
  },
  {
    value: "98%",
    label: "Clients satisfaits",
    color: "from-green-400 to-emerald-500"
  },
  {
    value: "24h",
    label: "Mise en ligne",
    color: "from-purple-400 to-indigo-500"
  }
]

export default function PublicitePage() {
  const seoData = Object.values(servicesSEO).find((s: any) => s.urlSlug === 'publicite') || servicesSEO['publicite-en-ligne-reunion']

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent/20 py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-digiqo-accent/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-digiqo-secondary/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              {...ANIMATION.entry.fadeInDown}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-8"
            >
              <Zap className="w-4 h-4" />
              Expertise Meta Business Partner
            </motion.div>

            {/* Title */}
            <div className="space-y-4 mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Publicité
                <span className="block bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">
                  Haute Performance
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
      </section>

      {/* Quick Wins Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">
                Digiqo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des résultats concrets, mesurables et durables pour votre entreprise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickWins.map((win, index) => (
              <motion.div
                key={win.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-digiqo-accent/20">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-digiqo-accent/10 to-amber-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <win.icon className="w-8 h-8 text-digiqo-accent" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{win.title}</h3>
                  <p className="text-gray-600 mb-4">{win.description}</p>

                  {/* Highlight */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-digiqo-accent/10 rounded-full">
                    <Sparkles className="w-4 h-4 text-digiqo-accent" />
                    <span className="text-sm font-semibold text-digiqo-accent">{win.highlight}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-digiqo-primary to-digiqo-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulas Section - New Design */}
      <section id="formules" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nos formules{" "}
              <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">
                publicitaires
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions adaptées à votre budget et vos objectifs
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
              >
                {/* Badge populaire HORS de la carte, positionné au-dessus */}
                {index === 1 && (
                  <div className="absolute -top-3 -right-3 bg-[#8B1431] text-white px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12">
                    LE PLUS POPULAIRE
                  </div>
                )}

                {/* Carte avec effet hover */}
                <motion.div
                  className={`relative bg-white rounded-2xl overflow-hidden shadow-xl h-full transition-all duration-300 ${
                    index === 1 ? 'ring-4 ring-[#8B1431] shadow-2xl md:scale-105' : ''
                  }`}
                  whileHover={{
                    y: -10,
                    shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Header with colored gradient */}
                  <div className={`p-6 bg-gradient-to-br ${
                    index === 0 ? 'from-gray-100 to-gray-200' :
                    index === 1 ? 'from-[#8B1431] to-red-700' :
                    'from-orange-100 to-amber-200'
                  }`}>
                    <h3 className={`text-2xl font-bold text-center ${
                      index === 1 ? 'text-white' : 'text-gray-800'
                    }`}>{formula.name}</h3>
                  </div>

                <div className="p-8">
                  {/* Prix */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-[#8B1431]">
                        {formula.price.split(',')[0]}
                      </span>
                      <span className="text-3xl font-bold text-[#8B1431]">
                        ,{formula.price.split(',')[1]}
                      </span>
                      <span className="text-2xl font-semibold text-gray-600 ml-1">
                        €
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      {formula.engagement}
                    </p>
                  </div>

                  {/* Caractéristiques principales */}
                  <div className="space-y-3 mb-8 min-h-[280px]">
                    {formula.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#8B1431] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bouton CTA */}
                  <motion.a
                    href={generateContactUrl({ service: 'publicite', formula: formula.name })}
                    className={`block w-full py-4 px-6 font-bold rounded-full text-center transition-all duration-300 ${
                      index === 1
                        ? 'bg-[#8B1431] text-white hover:bg-[#6B0F25] shadow-lg'
                        : 'bg-white text-[#8B1431] border-2 border-[#8B1431] hover:bg-[#8B1431] hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Je choisis cette formule
                  </motion.a>

                  {/* Section détails supplémentaires */}
                  {formula.details && formula.details.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-xs text-gray-500 font-semibold mb-3 tracking-wider">INCLUS ÉGALEMENT :</p>
                      <div className="space-y-2">
                        {formula.details.slice(0, 3).map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-[#8B1431] text-xs font-bold">✓</span>
                            <span className="text-xs text-gray-600 leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Note en bas */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600">
              <span className="font-semibold">Sans engagement</span> •
              <span className="mx-2">Résultats garantis</span> •
              <span>Support dédié</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Budget publicitaire non inclus dans les tarifs affichés
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
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