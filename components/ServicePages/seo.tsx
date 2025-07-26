import Head from 'next/head'
import { motion } from 'framer-motion'
import { Search, Check, ArrowRight, TrendingUp, BarChart3, Target, Zap } from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'

interface SEOPackage {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  results: string[]
  gradient: string
  popular?: boolean
}

const packages: SEOPackage[] = [
  {
    name: 'SEO Starter',
    price: '799€',
    duration: '/mois',
    description: 'Idéal pour les petites entreprises souhaitant améliorer leur visibilité locale',
    features: [
      'Audit SEO technique complet',
      'Recherche de 20 mots-clés pertinents',
      'Optimisation de 10 pages',
      'Création de 2 articles de blog/mois',
      'Optimisation Google My Business',
      'Suivi mensuel des positions',
      'Rapport mensuel détaillé',
      'Support par email'
    ],
    results: [
      'Amélioration du référencement local',
      'Augmentation du trafic organique',
      'Meilleure visibilité sur Google Maps',
      'Premiers résultats en 3-6 mois'
    ],
    gradient: 'from-digiqo-secondary to-teal-400'
  },
  {
    name: 'SEO Performance',
    price: '1 499€',
    duration: '/mois',
    description: 'Pour les entreprises ambitieuses visant la première page Google',
    features: [
      'Audit SEO technique et sémantique approfondi',
      'Recherche de 50 mots-clés stratégiques',
      'Optimisation de 25 pages',
      'Création de 4 articles de blog/mois',
      'Optimisation Google My Business avancée',
      'Netlinking (5 backlinks de qualité/mois)',
      'Suivi hebdomadaire des positions',
      'Rapport mensuel avec recommandations',
      'Support prioritaire par téléphone'
    ],
    results: [
      'Présence en première page Google',
      'Trafic organique x2 à x3',
      'Autorité de domaine renforcée',
      'ROI mesurable en 4-8 mois'
    ],
    gradient: 'from-digiqo-primary to-pink-600',
    popular: true
  },
  {
    name: 'SEO Premium',
    price: '2 999€',
    duration: '/mois',
    description: 'Solution complète pour dominer votre marché en ligne',
    features: [
      'Audit SEO complet multi-niveaux',
      'Recherche de 100+ mots-clés avec analyse concurrentielle',
      'Optimisation illimitée de pages',
      'Création de 8 articles de blog/mois',
      'Stratégie de contenu personnalisée',
      'Netlinking premium (15 backlinks/mois)',
      'Optimisation technique avancée',
      'Suivi temps réel avec dashboard dédié',
      'Account manager dédié',
      'Formation SEO pour votre équipe'
    ],
    results: [
      'Domination des mots-clés stratégiques',
      'Trafic organique x5 à x10',
      'Positions top 3 garanties',
      'Retour sur investissement maximal'
    ],
    gradient: 'from-digiqo-accent to-orange-500'
  }
]

const processSteps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Audit SEO',
    description: 'Analyse complète de votre site et identification des opportunités'
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Stratégie',
    description: 'Définition des mots-clés cibles et plan d\'action personnalisé'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Optimisation',
    description: 'Mise en œuvre technique et rédaction de contenus optimisés'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Suivi & Ajustement',
    description: 'Monitoring des performances et optimisations continues'
  }
]

export default function SEOPage() {
  const seoData = servicesSEO['referencement-seo-reunion']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Référencement SEO La Réunion',
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
    offers: packages.map(pkg => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace('€', ''),
      priceCurrency: 'EUR',
      description: pkg.description
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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 to-digiqo-primary">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl"
          >
            <Search className="w-12 h-12 text-purple-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Dominez <span className="text-digiqo-accent">Google</span> à La Réunion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Référencement naturel (SEO) sur Google et les moteurs de recherche. Nous améliorons votre position sur Google grâce à des stratégies SEO efficaces : audit, contenus optimisés et mots-clés ciblés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Découvrir nos offres
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/services/audit-digital-gratuit-reunion"
              className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-accent text-white font-bold rounded-full hover:bg-digiqo-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Audit SEO gratuit
            </a>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Notre <span className="text-purple-600">Méthodologie SEO</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche éprouvée pour propulser votre site en première page
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nos <span className="text-purple-600">Offres SEO</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions adaptées à chaque ambition
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-purple-600 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      RECOMMANDÉ
                    </span>
                  </div>
                )}

                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${pkg.gradient} text-white font-bold rounded-full text-sm mb-6`}>
                  {pkg.name}
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-digiqo-primary">{pkg.price}</span>
                    <span className="text-gray-600">{pkg.duration}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Services inclus :</h4>
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-bold mb-2 text-purple-800">Résultats attendus :</h4>
                  <div className="space-y-1">
                    {pkg.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-purple-700">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${pkg.gradient} text-white font-bold rounded-full hover:shadow-lg transition-all duration-300`}
                >
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-digiqo-primary">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Nos résultats parlent d'eux-mêmes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '+150%', label: 'Trafic organique moyen' },
              { value: '1ère page', label: '95% de nos clients' },
              { value: '-60%', label: 'Coût d\'acquisition' },
              { value: 'x3 ROI', label: 'Retour sur investissement' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à conquérir la <span className="text-purple-600">première page Google</span> ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Commencez avec un audit SEO gratuit et découvrez le potentiel de votre site web.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/services/audit-digital-gratuit-reunion"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Audit SEO gratuit
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-purple-600"
              >
                Être rappelé(e)
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}

