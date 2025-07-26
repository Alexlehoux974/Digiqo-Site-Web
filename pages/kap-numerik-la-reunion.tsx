import { motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Shield, Users, Globe, CheckCircle, TrendingUp, Building, ArrowRight, Award } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    title: 'Audit Digital Complet',
    description: 'Évaluation complète de votre maturité digitale et identification des axes d\'amélioration.',
    icon: Shield,
    features: [
      'Analyse de votre présence en ligne',
      'Audit de vos outils digitaux',
      'Benchmark concurrentiel',
      'Rapport détaillé avec recommandations'
    ]
  },
  {
    title: 'Stratégie Digitale',
    description: 'Élaboration d\'une feuille de route digitale adaptée à vos objectifs business.',
    icon: TrendingUp,
    features: [
      'Définition des objectifs SMART',
      'Plan d\'action priorisé',
      'Budget prévisionnel',
      'KPIs de suivi'
    ]
  },
  {
    title: 'Accompagnement 360°',
    description: 'Support complet dans la mise en œuvre de votre transformation digitale.',
    icon: Users,
    features: [
      'Chef de projet dédié',
      'Formation de vos équipes',
      'Suivi mensuel des actions',
      'Optimisation continue'
    ]
  }
]

const benefits = [
  {
    title: '100% financé',
    description: 'Grâce au programme Kap Numérik, bénéficiez d\'un accompagnement sans frais pour votre entreprise.',
    highlight: true
  },
  {
    title: 'Expertise locale',
    description: 'Une équipe qui connaît parfaitement le tissu économique réunionnais et ses spécificités.',
    highlight: false
  },
  {
    title: 'Résultats garantis',
    description: 'Un accompagnement orienté performance avec des objectifs clairs et mesurables.',
    highlight: false
  }
]

const eligibilityCriteria = [
  'Entreprise immatriculée à La Réunion',
  'Effectif inférieur à 250 salariés',
  'Chiffre d\'affaires < 50M€ ou bilan < 43M€',
  'Volonté de développer sa présence digitale'
]

export default function KapNumerik() {
  return (
    <>
      <SEO
        title="Kap Numérik La Réunion - Transformation Digitale Financée"
        description="Digiqo, partenaire officiel du programme Kap Numérik. Accompagnement gratuit pour la transformation digitale de votre entreprise à La Réunion."
        keywords="kap numerik reunion, transformation digitale, aide entreprise, digitalisation reunion"
        url="https://digiqo.com/kap-numerik-la-reunion"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-digiqo-secondary/5 via-white to-digiqo-primary/5">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-0 w-96 h-96 bg-digiqo-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-digiqo-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Programme 100% financé
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-digiqo-black mb-6">
                Kap Numérik <span className="text-digiqo-secondary">La Réunion</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Digiqo est partenaire officiel du programme Kap Numérik. 
                Bénéficiez d'un accompagnement gratuit et personnalisé pour 
                accélérer la transformation digitale de votre entreprise.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#eligibilite"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Vérifier mon éligibilité
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-semibold rounded-lg border-2 border-digiqo-secondary hover:bg-digiqo-secondary hover:text-white transition-all duration-300"
                >
                  En savoir plus
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Kap Numérik */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-digiqo-black mb-6">
                  Qu'est-ce que Kap Numérik ?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Kap Numérik est un programme régional destiné à accompagner les TPE/PME 
                  réunionnaises dans leur transformation digitale. Financé par la Région Réunion 
                  et l'Europe, ce dispositif permet aux entreprises éligibles de bénéficier 
                  d'un accompagnement expert sans avancer de frais.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  En tant que partenaire agréé, Digiqo vous accompagne de A à Z : 
                  audit, stratégie, mise en œuvre et suivi de vos projets digitaux.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-digiqo-secondary/10 rounded-full flex items-center justify-center">
                    <Building className="w-10 h-10 text-digiqo-secondary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-digiqo-secondary">500+</p>
                    <p className="text-gray-600">entreprises accompagnées</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-video bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark rounded-lg flex items-center justify-center">
                  <Globe className="w-32 h-32 text-white/20" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-6">
                  <p className="text-2xl font-bold text-digiqo-primary mb-1">100%</p>
                  <p className="text-gray-600">Pris en charge</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Notre accompagnement Kap Numérik
              </h2>
              <p className="text-xl text-gray-600">
                Un parcours structuré pour votre réussite digitale
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-digiqo-black mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="w-5 h-5 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Les avantages du programme
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-center p-8 rounded-lg ${
                    benefit.highlight 
                      ? 'bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark text-white' 
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <h3 className={`text-2xl font-bold mb-4 ${
                    benefit.highlight ? 'text-white' : 'text-digiqo-black'
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={benefit.highlight ? 'text-white/90' : 'text-gray-600'}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section id="eligibilite" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                  Êtes-vous éligible ?
                </h2>
                <p className="text-xl text-gray-600">
                  Vérifiez si votre entreprise peut bénéficier du programme
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-digiqo-black mb-6">
                  Critères d'éligibilité
                </h3>
                <ul className="space-y-4 mb-8">
                  {eligibilityCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700">{criteria}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-digiqo-secondary/5 rounded-lg p-6 mb-8">
                  <p className="text-center text-gray-700 mb-4">
                    <strong>Vous remplissez tous les critères ?</strong>
                  </p>
                  <p className="text-center text-gray-600">
                    Contactez-nous pour démarrer votre accompagnement gratuit
                  </p>
                </div>

                <Link
                  href="/#contact"
                  className="block w-full text-center px-8 py-4 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Je démarre mon accompagnement
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-digiqo-primary to-digiqo-accent">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ne passez pas à côté de cette opportunité
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Le programme Kap Numérik est une chance unique d'accélérer votre 
                transformation digitale sans impacter votre trésorerie. 
                Nos experts vous accompagnent à chaque étape.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Contactez-nous maintenant
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+262693737297"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-digiqo-primary transition-all duration-300"
                >
                  📞 0693 73 72 97
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}