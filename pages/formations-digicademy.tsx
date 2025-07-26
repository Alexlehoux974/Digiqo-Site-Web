import { motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { GraduationCap, Users, Clock, CheckCircle, Award, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

const formations = [
  {
    title: 'Marketing Digital - Les Fondamentaux',
    duration: '2 jours',
    level: 'Débutant',
    price: '990€ HT',
    description: 'Maîtrisez les bases du marketing digital et développez votre présence en ligne efficacement.',
    objectives: [
      'Comprendre l\'écosystème digital',
      'Définir une stratégie digitale adaptée',
      'Utiliser les principaux leviers marketing',
      'Mesurer et analyser les performances'
    ],
    program: [
      'Introduction au marketing digital',
      'Les réseaux sociaux pour l\'entreprise',
      'Publicité en ligne (Google Ads, Meta Ads)',
      'Analytics et KPIs'
    ]
  },
  {
    title: 'Community Management Professionnel',
    duration: '3 jours',
    level: 'Intermédiaire',
    price: '1 490€ HT',
    description: 'Devenez un expert de la gestion des réseaux sociaux et de l\'animation de communautés.',
    objectives: [
      'Élaborer une stratégie social media',
      'Créer du contenu engageant',
      'Gérer et modérer une communauté',
      'Utiliser les outils professionnels'
    ],
    program: [
      'Stratégie de contenu',
      'Création visuelle avec Canva',
      'Gestion de crise sur les réseaux',
      'Outils de planification et analyse'
    ]
  },
  {
    title: 'Google Ads - Certification',
    duration: '5 jours',
    level: 'Avancé',
    price: '2 490€ HT',
    description: 'Préparez et obtenez votre certification Google Ads avec notre formation intensive.',
    objectives: [
      'Maîtriser Google Ads de A à Z',
      'Optimiser les campagnes publicitaires',
      'Gérer les budgets efficacement',
      'Obtenir la certification Google'
    ],
    program: [
      'Search, Display et Shopping',
      'YouTube Ads et campagnes vidéo',
      'Stratégies d\'enchères avancées',
      'Préparation à la certification'
    ]
  }
]

const benefits = [
  {
    icon: Users,
    title: 'Petits groupes',
    description: 'Maximum 8 participants pour un accompagnement personnalisé'
  },
  {
    icon: Award,
    title: 'Formateurs experts',
    description: 'Professionnels certifiés avec expérience terrain'
  },
  {
    icon: BookOpen,
    title: 'Cas pratiques',
    description: '80% de pratique sur des cas réels d\'entreprises'
  },
  {
    icon: CheckCircle,
    title: 'Certification',
    description: 'Attestation de formation et préparation aux certifications'
  }
]

export default function FormationsDigiCademy() {
  return (
    <>
      <SEO
        title="DigiCademy - Formations Marketing Digital à La Réunion"
        description="DigiCademy, l'organisme de formation de Digiqo. Formations professionnelles en marketing digital, réseaux sociaux et publicité en ligne à La Réunion."
        keywords="formation marketing digital réunion, formation réseaux sociaux, formation google ads, digicademy"
        url="https://digiqo.com/formations-digicademy"
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
              <div className="inline-flex items-center gap-2 bg-digiqo-secondary/10 text-digiqo-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <GraduationCap className="w-4 h-4" />
                Organisme de formation certifié
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-digiqo-black mb-6">
                DigiCademy by <span className="text-digiqo-primary">Digiqo</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Montez en compétences sur le digital avec nos formations professionnelles 
                adaptées au marché réunionnais. Des formations pratiques, concrètes et 
                directement applicables en entreprise.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#formations"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Découvrir nos formations
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-semibold rounded-lg border-2 border-digiqo-primary hover:bg-digiqo-primary hover:text-white transition-all duration-300"
                >
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                L'excellence pédagogique
              </h2>
              <p className="text-xl text-gray-600">
                Une approche unique pour une montée en compétences efficace
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-digiqo-black mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Formations */}
        <section id="formations" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Nos formations
              </h2>
              <p className="text-xl text-gray-600">
                Des parcours adaptés à tous les niveaux
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {formations.map((formation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        formation.level === 'Débutant' ? 'bg-green-100 text-green-800' :
                        formation.level === 'Intermédiaire' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {formation.level}
                      </span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formation.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-digiqo-black mb-3">
                      {formation.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {formation.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-digiqo-black mb-3">Objectifs :</h4>
                      <ul className="space-y-2">
                        {formation.objectives.slice(0, 3).map((objective, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-digiqo-primary">
                          {formation.price}
                        </span>
                        <span className="text-gray-600">par personne</span>
                      </div>
                      
                      <Link
                        href="/#contact"
                        className="block w-full text-center px-6 py-3 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        S'inscrire
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                Formation sur mesure pour votre entreprise
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Nous adaptons nos formations à vos besoins spécifiques. 
                Formations en intra-entreprise, programmes personnalisés, 
                accompagnement de vos équipes.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Demander un programme personnalisé
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}