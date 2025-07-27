import Head from 'next/head'
import { motion } from 'framer-motion'
import { MessageCircle, Check, ArrowRight, Calendar, Users, Zap, TrendingUp } from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'

interface Formula {
  name: string
  price: {
    threeMonths: string
    sixMonths: string
    twelveMonths: string
  }
  savings: {
    sixMonths: string
    twelveMonths: string
  }
  content: {
    posts: number
    stories: number
    reels: number
    visits: string
  }
  moderation: {
    title: string
    features: string[]
  }
  gradient: string
  popular?: boolean
}

const formulas: Formula[] = [
  {
    name: 'Essentielle',
    price: {
      threeMonths: '690€',
      sixMonths: '621€',
      twelveMonths: '552€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    content: {
      posts: 5,
      stories: 5,
      reels: 0,
      visits: '1 déplacement bimensuel (1h)'
    },
    moderation: {
      title: 'Modération Basique',
      features: [
        'Réponses aux commentaires et messages en 48h ouvrées',
        'Gestion des interactions pendant les heures de bureau (lundi-vendredi, 9h-18h)',
        'Suppression des commentaires inappropriés si nécessaire'
      ]
    },
    gradient: 'from-digiqo-secondary to-teal-400'
  },
  {
    name: 'Dynamique',
    price: {
      threeMonths: '1 190€',
      sixMonths: '1 071€',
      twelveMonths: '952€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    content: {
      posts: 10,
      stories: 10,
      reels: 2,
      visits: '1 déplacement mensuel (2h)'
    },
    moderation: {
      title: 'Modération Active (Hors Week-end)',
      features: [
        'Réponses aux commentaires et messages en 24h ouvrées',
        'Surveillance des interactions du lundi au vendredi, 9h-18h',
        'Gestion des avis clients avec des réponses personnalisées',
        'Suppression immédiate des commentaires négatifs ou inappropriés'
      ]
    },
    gradient: 'from-digiqo-primary to-pink-600',
    popular: true
  },
  {
    name: 'Stratégique',
    price: {
      threeMonths: '1 790€',
      sixMonths: '1 611€',
      twelveMonths: '1 432€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    content: {
      posts: 20,
      stories: 20,
      reels: 4,
      visits: '2 déplacements mensuels (3h)'
    },
    moderation: {
      title: 'Modération Active (Week-end Inclus)',
      features: [
        'Réponses aux commentaires et messages en 12h maximum',
        'Surveillance des interactions 7j/7 de 9h à 20h',
        'Modération proactive pour stimuler l\'engagement (likes, réponses, conversations)',
        'Signalement des avis et commentaires critiques pour gestion rapide'
      ]
    },
    gradient: 'from-digiqo-accent to-orange-500'
  },
  {
    name: 'Élite',
    price: {
      threeMonths: '2 790€',
      sixMonths: '2 511€',
      twelveMonths: '2 232€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    content: {
      posts: 30,
      stories: 30,
      reels: 6,
      visits: '3 déplacements mensuels (6h)'
    },
    moderation: {
      title: 'Modération Premium (7J/7)',
      features: [
        'Réponses aux commentaires et messages en moins de 6h, 7j/7',
        'Gestion et animation en continu de 8h à 22h',
        'Analyse des tendances et recommandations stratégiques pour l\'engagement',
        'Gestion avancée des avis et crises : signalement, modération et intervention rapide',
        'Community management actif : relance des discussions, interactions stratégiques avec les abonnés'
      ]
    },
    gradient: 'from-purple-600 to-digiqo-primary'
  }
]

export default function CommunityPage() {
  const seoData = servicesSEO['community-management-974']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Community Management La Réunion',
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
      price: formula.price.threeMonths.replace('€', '').replace(' ', ''),
      priceCurrency: 'EUR',
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          price: formula.price.threeMonths.replace('€', '').replace(' ', ''),
          priceCurrency: 'EUR',
          unitText: '3 MONTHS'
        },
        {
          '@type': 'PriceSpecification',
          price: formula.price.sixMonths.replace('€', '').replace(' ', ''),
          priceCurrency: 'EUR',
          unitText: '6 MONTHS'
        },
        {
          '@type': 'PriceSpecification',
          price: formula.price.twelveMonths.replace('€', '').replace(' ', ''),
          priceCurrency: 'EUR',
          unitText: '12 MONTHS'
        }
      ]
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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-digiqo-accent/10 rounded-full blur-3xl"
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
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-white rounded-2xl shadow-2xl"
          >
            <MessageCircle className="w-12 h-12 text-digiqo-secondary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Vous avez dit <span className="text-digiqo-accent">Community Management</span> ?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Communication sur les Réseaux Sociaux (CM) - Nous créons, pilotons et optimisons vos campagnes publicitaires sur les réseaux sociaux.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#formules"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Voir nos formules
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={generateContactUrl({
                service: 'community',
                description: 'Je souhaite en savoir plus sur vos services de community management'
              })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-accent text-white font-bold rounded-full hover:bg-digiqo-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Demander un devis
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Pourquoi choisir notre <span className="text-digiqo-secondary">Community Management</span> ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <Users className="w-12 h-12 text-digiqo-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Expertise Locale</h3>
              <p className="text-gray-600">Connaissance approfondie du marché réunionnais et de ses spécificités</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <Zap className="w-12 h-12 text-digiqo-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Contenu Engageant</h3>
              <p className="text-gray-600">Création de contenus qui captivent et fidélisent votre audience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <TrendingUp className="w-12 h-12 text-digiqo-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Croissance Garantie</h3>
              <p className="text-gray-600">Augmentation mesurable de votre engagement et de votre communauté</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Flexibilité</h3>
              <p className="text-gray-600">Formules adaptées à vos besoins : 3, 6 ou 12 mois</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulas Section */}
      <section id="formules" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nos <span className="text-digiqo-secondary">Formules</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choisissez la formule adaptée à vos besoins et votre budget
            </p>

            {/* Duration selector */}
            <div className="inline-flex items-center gap-4 p-2 bg-gray-100 rounded-full">
              <span className="px-6 py-3 bg-white rounded-full font-bold text-digiqo-primary shadow">12 mois</span>
              <span className="px-6 py-3 text-gray-600 font-medium">6 mois</span>
              <span className="px-6 py-3 text-gray-600 font-medium">3 mois</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {formulas.map((formula, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  formula.popular ? 'ring-2 ring-digiqo-accent' : ''
                }`}
              >
                {formula.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-digiqo-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                      POPULAIRE
                    </span>
                  </div>
                )}

                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-full text-sm mb-6`}>
                  FORMULE {formula.name.toUpperCase()}
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-digiqo-primary">{formula.price.twelveMonths}</span>
                    <span className="text-gray-600">HT/mois</span>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      -{formula.savings.twelveMonths}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Prix normal : <span className="line-through">{formula.price.threeMonths}</span> HT/mois
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Contenu inclus :</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-digiqo-secondary">{formula.content.posts}</div>
                      <div className="text-sm text-gray-600">posts/mois</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-digiqo-secondary">{formula.content.stories}</div>
                      <div className="text-sm text-gray-600">stories/mois</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-digiqo-secondary">{formula.content.reels}</div>
                      <div className="text-sm text-gray-600">reels/mois</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center col-span-2">
                      <div className="text-sm text-gray-600">{formula.content.visits}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">{formula.moderation.title} :</h4>
                  <div className="space-y-2">
                    {formula.moderation.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-digiqo-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.a
                  href={generateContactUrl({
                    service: 'community',
                    description: `Je suis intéressé par la formule ${formula.name} - ${formula.content.posts} posts, ${formula.content.stories} stories${formula.content.reels ? `, ${formula.content.reels} reels` : ''} par mois`
                  })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-full hover:shadow-lg transition-all duration-300`}
                >
                  Choisir cette formule
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à développer votre communauté ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Confiez-nous la gestion de vos réseaux sociaux et concentrez-vous sur votre cœur de métier.
            </p>
            <motion.a
              href={generateContactUrl({
                service: 'community',
                description: 'Je souhaite booster ma présence sur les réseaux sociaux avec un community manager professionnel'
              })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Démarrer maintenant
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}

