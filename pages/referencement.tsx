import { motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Search, TrendingUp, Globe, CheckCircle, BarChart3, Target, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { generateContactUrl } from '@/lib/contact-utils'

const seoPackages = [
  {
    name: 'SEO Essentiel',
    price: '490€',
    duration: '/mois',
    description: 'Pour les petites entreprises qui veulent améliorer leur visibilité locale',
    features: [
      'Audit SEO initial complet',
      'Optimisation de 5 pages',
      'Recherche de mots-clés',
      'Optimisation Google My Business',
      'Rapport mensuel de positionnement',
      'Support par email'
    ],
    highlighted: false
  },
  {
    name: 'SEO Performance',
    price: '990€',
    duration: '/mois',
    description: 'La solution idéale pour dominer votre marché à La Réunion',
    features: [
      'Tout le pack Essentiel +',
      'Optimisation de 15 pages',
      'Création de contenu SEO (2 articles/mois)',
      'Netlinking local (5 backlinks/mois)',
      'Optimisation technique avancée',
      'Suivi hebdomadaire',
      'Support prioritaire'
    ],
    highlighted: true
  },
  {
    name: 'SEO Premium',
    price: '1990€',
    duration: '/mois',
    description: 'Pour les entreprises ambitieuses visant le leadership régional',
    features: [
      'Tout le pack Performance +',
      'Optimisation illimitée de pages',
      'Création de contenu SEO (4 articles/mois)',
      'Netlinking premium (10 backlinks/mois)',
      'Audit concurrentiel mensuel',
      'Stratégie de contenu personnalisée',
      'Account manager dédié',
      'Appels stratégiques mensuels'
    ],
    highlighted: false
  }
]

const seoProcess = [
  {
    step: '1',
    title: 'Audit & Analyse',
    description: 'Analyse complète de votre site et de votre positionnement actuel'
  },
  {
    step: '2',
    title: 'Stratégie sur mesure',
    description: 'Élaboration d\'une stratégie SEO adaptée à vos objectifs'
  },
  {
    step: '3',
    title: 'Optimisation',
    description: 'Mise en œuvre des optimisations techniques et de contenu'
  },
  {
    step: '4',
    title: 'Suivi & Ajustements',
    description: 'Monitoring des résultats et optimisations continues'
  }
]

const seoStats = [
  { value: '93%', label: 'des clics vont aux résultats de la 1ère page' },
  { value: '75%', label: 'des utilisateurs ne dépassent pas la 1ère page' },
  { value: '3.5x', label: 'plus de trafic pour les 3 premières positions' },
  { value: '14.6%', label: 'taux de conversion moyen du SEO' }
]

export default function Referencement() {
  return (
    <>
      <SEO
        title="Référencement SEO La Réunion - Agence Digiqo"
        description="Agence de référencement naturel SEO à La Réunion. Améliorez votre visibilité sur Google et augmentez votre trafic qualifié avec nos experts SEO."
        keywords="référencement seo réunion, agence seo 974, référencement naturel, consultant seo réunion"
        url="https://digiqo.com/referencement"
      />

      <HeaderLuxury />

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
              <div className="inline-flex items-center gap-2 bg-digiqo-secondary/10 text-digiqo-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Search className="w-4 h-4" />
                Référencement naturel SEO
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-digiqo-black mb-6">
                Dominez les résultats <span className="text-digiqo-secondary">Google</span> à La Réunion
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Propulsez votre site web en première page de Google avec notre expertise 
                en référencement naturel. Attirez plus de clients qualifiés et développez 
                votre activité grâce au SEO local.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#tarifs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Voir nos offres SEO
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={generateContactUrl({
                    service: 'audit',
                    description: 'Je souhaite réaliser un audit SEO gratuit de mon site web'
                  })}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-semibold rounded-lg border-2 border-digiqo-secondary hover:bg-digiqo-secondary hover:text-white transition-all duration-300"
                >
                  Audit SEO gratuit
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEO Stats */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Pourquoi le SEO est crucial pour votre business
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {seoStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-digiqo-secondary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Notre méthode SEO éprouvée
              </h2>
              <p className="text-xl text-gray-600">
                Un processus structuré pour des résultats durables
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {seoProcess.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-digiqo-black mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    {index < seoProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full">
                        <div className="w-full h-0.5 bg-gradient-to-r from-digiqo-secondary to-transparent"></div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Packages */}
        <section id="tarifs" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Nos formules SEO
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez l'accompagnement adapté à vos ambitions
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {seoPackages.map((pack, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                    pack.highlighted ? 'ring-2 ring-digiqo-secondary transform scale-105' : ''
                  }`}
                >
                  {pack.highlighted && (
                    <div className="absolute top-0 right-0 bg-digiqo-secondary text-white px-4 py-1 text-sm font-semibold">
                      Populaire
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-digiqo-black mb-2">
                      {pack.name}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold text-digiqo-secondary">
                        {pack.price}
                      </span>
                      <span className="text-gray-600 ml-2">{pack.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      {pack.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {pack.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      href={generateContactUrl({
                        service: 'seo',
                        description: `Je suis intéressé par la formule ${pack.name} - ${pack.price}/mois`
                      })}
                      className={`block w-full text-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
                        pack.highlighted
                          ? 'bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white hover:shadow-lg'
                          : 'bg-gray-100 text-digiqo-black hover:bg-gray-200'
                      }`}
                    >
                      Choisir cette formule
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Nos prestations SEO détaillées
              </h2>
              <p className="text-xl text-gray-600">
                Une approche complète pour votre référencement
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Search,
                  title: 'Audit SEO complet',
                  description: 'Analyse technique, sémantique et de popularité de votre site'
                },
                {
                  icon: Target,
                  title: 'Stratégie de mots-clés',
                  description: 'Recherche et sélection des mots-clés les plus pertinents'
                },
                {
                  icon: Globe,
                  title: 'SEO local',
                  description: 'Optimisation pour les recherches géolocalisées à La Réunion'
                },
                {
                  icon: TrendingUp,
                  title: 'Optimisation on-page',
                  description: 'Amélioration du contenu et de la structure de vos pages'
                },
                {
                  icon: BarChart3,
                  title: 'Suivi de performance',
                  description: 'Rapports détaillés sur vos positions et votre trafic'
                },
                {
                  icon: Star,
                  title: 'Netlinking',
                  description: 'Création de liens de qualité pour booster votre autorité'
                }
              ].map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-digiqo-secondary/10 to-digiqo-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-digiqo-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-digiqo-black mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Prêt à conquérir Google ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Bénéficiez d'un audit SEO gratuit et découvrez comment 
                améliorer votre visibilité sur les moteurs de recherche
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={generateContactUrl({
                    service: 'audit',
                    description: 'Je souhaite bénéficier d\'un audit SEO gratuit pour améliorer ma visibilité sur Google'
                  })}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Demander mon audit gratuit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+262693737297"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-digiqo-secondary transition-all duration-300"
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