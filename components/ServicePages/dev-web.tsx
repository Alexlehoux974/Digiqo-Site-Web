import Head from 'next/head'
import { motion } from 'framer-motion'
import { Code, Check, ArrowRight, Clock, Shield, Zap } from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'

interface WebPackage {
  name: string
  price: string
  description: string
  bonus: string[]
  features: string[]
  deliveryTime: string
  gradient: string
  popular?: boolean
}

const packages: WebPackage[] = [
  {
    name: 'Landing Page',
    price: '899,95€ HT',
    description: '1 page unique sur-mesure, optimisée et parfaitement adaptée à tous les appareils',
    bonus: [
      'Hébergement & Domaine : Inclus (1 an)',
      'Maintenance : 1 mois offert',
      'Retouches : 1 retouche comprise'
    ],
    features: [
      'Titre percutant, visuel fort, bouton d\'action visible',
      'Témoignages clients, logos partenaires',
      'Formulaire de contact / Conversion',
      'Intégration charte graphique',
      'Liens réseaux sociaux',
      'Google Analytics intégré',
      'Certificat SSL (HTTPS)',
      'Optimisation campagnes publicitaires'
    ],
    deliveryTime: '7 jours ouvrés',
    gradient: 'from-digiqo-secondary to-teal-400'
  },
  {
    name: 'Web Start',
    price: '1 599,95€ HT',
    description: 'Site de 1 à 3 pages sur-mesure responsive : Adapté aux mobiles et tablettes',
    bonus: [
      'Hébergement & Domaine : Inclus (1 an)',
      'Maintenance : 1 mois offert',
      'Retouches : 2 retouches comprises'
    ],
    features: [
      'Formulaire de contact optimisé',
      'Liens vers réseaux sociaux',
      'Bouton WhatsApp / Messenger',
      'Avis clients en page d\'accueil',
      'Tunnel de conversion simplifié',
      'Certificat SSL (HTTPS)',
      'SEO avancé (meta tags, indexation)',
      'Performance : Score PageSpeed &gt; 85/100',
      'Conformité RGPD incluse'
    ],
    deliveryTime: '10 jours ouvrés',
    gradient: 'from-digiqo-primary to-pink-600'
  },
  {
    name: 'Web Plus',
    price: '2 999,95€ HT',
    description: 'Jusqu\'à 5 pages sur-mesure responsive : optimisé tous appareils',
    bonus: [
      'Hébergement & Domaine : Inclus (1 an)',
      'Maintenance : 1 mois offert',
      'Retouches : 2 retouches comprises'
    ],
    features: [
      'Formulaire contact avec options dynamiques',
      'Plan contenu SEO (2000 mots inclus)',
      'Portfolio ou galerie photos/vidéos',
      'Intégration Google Maps',
      'Chatbot simple (FAQ automatisée)',
      'Tunnel de conversion optimisé',
      'Pixel Meta et Google Analytics',
      'Certificat SSL, protection anti-spam',
      'Score PageSpeed &gt; 85/100'
    ],
    deliveryTime: '20 jours ouvrés',
    gradient: 'from-digiqo-accent to-orange-500',
    popular: true
  },
  {
    name: 'Web Premium',
    price: '4 999,95€ HT',
    description: 'Jusqu\'à 10 pages sur-mesure responsive : optimisé tous appareils',
    bonus: [
      'Hébergement & Domaine : Inclus (1 an)',
      'Maintenance : 1 mois offert',
      'Retouches : 3 retouches comprises'
    ],
    features: [
      'Module prise de RDV en ligne',
      'Chat en direct (Messenger, WhatsApp)',
      'Plan contenu SEO (5000 mots inclus)',
      'Portfolio ou galerie avancée',
      'Tunnel conversion avec relances email',
      'Pixel Meta et Google Analytics',
      'Chatbot FAQ automatisée',
      'Certificat SSL avancé, pare-feu',
      'Sauvegardes automatiques',
      'Score PageSpeed &gt; 85/100'
    ],
    deliveryTime: '30 jours ouvrés',
    gradient: 'from-purple-600 to-digiqo-primary'
  }
]

const portfolio = [
  { name: 'CMX FACTORY', description: 'Vos pièces Cross & Supermot.', image: '/portfolio/cmx-factory.jpg' },
  { name: 'CBD RUN', description: 'CBD Bio à la Réunion !', image: '/portfolio/cbd-run.jpg' },
  { name: 'SNOWKITE SENTATION', description: 'Passez du Kitesurf au Snowkite', image: '/portfolio/snowkite.jpg' },
  { name: 'CLICKNVAN', description: 'L\'aventure commence !', image: '/portfolio/clicknvan.jpg' }
]

export default function DevWebPage() {
  const seoData = servicesSEO['developpement-web-reunion']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Développement Web La Réunion',
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
      price: pkg.price.replace(' HT', '').replace('€', ''),
      priceCurrency: 'EUR',
      deliveryLeadTime: pkg.deliveryTime
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
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-secondary to-teal-500">
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
            className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-white rounded-2xl shadow-2xl"
          >
            <Code className="w-12 h-12 text-digiqo-secondary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Des Sites taillés pour <span className="text-digiqo-primary">l'Action</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Sites web sur-mesure, responsive et optimisés. De la landing page au site e-commerce, nous créons votre présence digitale.
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
              href="#portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-primary text-white font-bold rounded-full hover:bg-digiqo-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Voir nos réalisations
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Pourquoi choisir <span className="text-digiqo-secondary">Digiqo</span> ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <Zap className="w-12 h-12 text-digiqo-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Performance Garantie</h3>
              <p className="text-gray-600">Score PageSpeed &gt; 85/100 pour une expérience utilisateur optimale</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <Shield className="w-12 h-12 text-digiqo-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Sécurité Maximale</h3>
              <p className="text-gray-600">SSL, pare-feu, sauvegardes automatiques et conformité RGPD</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <Clock className="w-12 h-12 text-digiqo-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Livraison Rapide</h3>
              <p className="text-gray-600">De 7 à 30 jours selon la formule choisie</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Du site vitrine à la plateforme e-commerce, trouvez la solution adaptée à vos besoins
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-digiqo-accent' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-digiqo-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                      POPULAIRE
                    </span>
                  </div>
                )}

                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${pkg.gradient} text-white font-bold rounded-full text-sm mb-6`}>
                  {pkg.name}
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-digiqo-primary">{pkg.price}</span>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">🎁 Bonus inclus :</h4>
                  <div className="space-y-2">
                    {pkg.bonus.map((bonus, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-digiqo-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Fonctionnalités :</h4>
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-digiqo-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Livraison : {pkg.deliveryTime}</span>
                  </div>
                </div>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${pkg.gradient} text-white font-bold rounded-full hover:shadow-lg transition-all duration-300`}
                >
                  Choisir cette formule
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nos <span className="text-digiqo-secondary">Réalisations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-uns des sites web que nous avons créés pour nos clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-2xl font-bold">{project.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-digiqo-secondary font-bold hover:underline"
                  >
                    Voir le site
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-digiqo-secondary to-teal-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à créer votre site web ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Discutons de votre projet et trouvons ensemble la solution parfaite pour votre entreprise.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Démarrer mon projet
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}

