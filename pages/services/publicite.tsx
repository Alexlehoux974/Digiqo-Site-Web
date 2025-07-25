import { GetStaticProps } from 'next'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Megaphone, Check, ArrowRight, Calendar, DollarSign } from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'

interface Formula {
  name: string
  price: {
    monthly: string
    yearly: string
  }
  features: string[]
  bonus?: string[]
  gradient: string
}

const formulas: Formula[] = [
  {
    name: 'Initiation',
    price: {
      monthly: '549,00€',
      yearly: '5 270,40€'
    },
    features: [
      'Gestion & diffusion sur les plateformes META',
      'Jusqu\'à 1 000 € de budget publicitaire géré / mois',
      'Jusqu\'à 3 campagnes publicitaires simultanées',
      'Création, ciblage & testing stratégique',
      'Optimisation hebdomadaire des performances',
      'Retargeting : reciblage des audiences',
      'Exploitation des Pixels/API existants',
      '3 créatifs publicitaires offerts / mois'
    ],
    bonus: [
      'Captation vidéo 1h avec prise de son (SONY A7IV)',
      'Montage dynamique (20-60 sec)',
      'Textes & sous-titres inclus',
      'Effets visuels & animations',
      'Musique libre de droits',
      'Tous formats (1:1, 9:16, 4:5)',
      '2 retouches incluses'
    ],
    gradient: 'from-digiqo-orange to-amber-400'
  },
  {
    name: 'Propulsion',
    price: {
      monthly: '949,00€',
      yearly: '9 110,40€'
    },
    features: [
      'Gestion & diffusion sur les plateformes META',
      'Jusqu\'à 2 500 € de budget publicitaire géré / mois',
      'Jusqu\'à 4 campagnes publicitaires simultanées',
      'Création, ciblage & testing stratégique',
      'Optimisation hebdomadaire des performances',
      'Retargeting : reciblage des audiences',
      'Création & exploitation d\'audiences similaires',
      'Exploitation des Pixels/API existants',
      '3 créatifs publicitaires offerts / mois'
    ],
    bonus: [
      'Captation vidéo 1h avec prise de son (SONY A7IV)',
      'Montage dynamique (20-60 sec)',
      'Textes & sous-titres inclus',
      'Effets visuels & animations',
      'Musique libre de droits',
      'Tous formats (1:1, 9:16, 4:5)',
      '2 retouches incluses'
    ],
    gradient: 'from-digiqo-blue-light to-digiqo-blue-dark'
  }
]

export default function PublicitePage() {
  const seoData = servicesSEO['publicite-en-ligne-reunion']

  // Schema.org structured data for Service
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
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <meta property="og:image" content="https://digiqo.fr/og-publicite.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-digiqo-accent/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-digiqo-secondary/20 rounded-full blur-3xl"
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
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-2xl shadow-2xl"
          >
            <Megaphone className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Boostez votre <span className="text-digiqo-accent">Visibilité en Ligne</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            Publicité sur les Réseaux Sociaux (SMA) - Nous créons, pilotons et optimisons vos campagnes publicitaires sur les réseaux sociaux.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#formules"
              className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-accent text-white font-bold rounded-full hover:bg-digiqo-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Découvrir nos formules
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Demander un devis
            </a>
          </motion.div>
        </div>
      </section>

      {/* Comment ça marche Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Comment ça <span className="text-digiqo-accent">marche</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre processus en 4 étapes pour maximiser votre retour sur investissement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Analyse',
                description: 'Étude approfondie de votre marché et de vos objectifs',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Stratégie',
                description: 'Définition des audiences et des messages clés',
                icon: '🧠'
              },
              {
                step: '03',
                title: 'Création',
                description: 'Conception de visuels et textes publicitaires impactants',
                icon: '🎨'
              },
              {
                step: '04',
                title: 'Optimisation',
                description: 'Ajustements continus pour maximiser les performances',
                icon: '📊'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-digiqo-accent font-bold text-sm mb-2">ÉTAPE {item.step}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formules Section */}
      <section id="formules" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nos <span className="text-digiqo-accent">Formules</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez la formule adaptée à vos besoins et votre budget
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {formulas.map((formula, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-full text-sm mb-6`}>
                  FORMULE {formula.name.toUpperCase()}
                </div>

                <div className="flex items-baseline gap-4 mb-8">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-digiqo-primary">{formula.price.monthly}</span>
                      <span className="text-gray-600">/mois</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      ou {formula.price.yearly} /an
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-bold text-lg mb-4">Services inclus :</h4>
                  {formula.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-digiqo-accent mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {formula.bonus && (
                  <div className="border-t pt-6">
                    <h4 className="font-bold text-lg mb-4 text-digiqo-accent">
                      🎁 Bonus forfait annuel (x2) :
                    </h4>
                    <div className="space-y-2">
                      {formula.bonus.map((bonus, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-digiqo-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{bonus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-full hover:shadow-lg transition-all duration-300`}
                >
                  Choisir cette formule
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">
              Des formules <span className="font-bold">Expansion</span> et <span className="font-bold">Domination</span> sont également disponibles pour les besoins plus importants.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-digiqo-accent font-bold hover:underline"
            >
              Contactez-nous pour plus d'informations
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à propulser votre entreprise ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Bénéficiez d'un audit gratuit et découvrez comment nos campagnes publicitaires peuvent transformer votre présence en ligne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-accent text-white font-bold rounded-full hover:bg-digiqo-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Planifier un rendez-vous
              </motion.a>
              <motion.a
                href="/services/audit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <DollarSign className="w-5 h-5" />
                Audit gratuit
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}