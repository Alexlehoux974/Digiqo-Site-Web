import { motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Briefcase, Users, Rocket, Heart, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const positions = [
  {
    title: 'Développeur Web Full Stack',
    contract: 'CDI',
    location: 'Saint-Denis, La Réunion',
    department: 'Technique',
    description: 'Nous recherchons un développeur passionné pour rejoindre notre équipe technique et participer au développement de solutions web innovantes pour nos clients.',
    requirements: [
      'Minimum 2 ans d\'expérience en développement web',
      'Maîtrise de React, Node.js et des technologies modernes',
      'Connaissance des bonnes pratiques de développement',
      'Capacité à travailler en équipe'
    ]
  },
  {
    title: 'Community Manager',
    contract: 'CDI',
    location: 'Saint-Denis, La Réunion',
    department: 'Marketing',
    description: 'Rejoignez notre équipe pour gérer et développer la présence en ligne de nos clients sur les réseaux sociaux.',
    requirements: [
      'Excellente maîtrise des réseaux sociaux',
      'Créativité et sens de la communication',
      'Capacité rédactionnelle irréprochable',
      'Connaissance des outils de planification'
    ]
  },
  {
    title: 'Commercial B2B',
    contract: 'CDI',
    location: 'Saint-Denis, La Réunion',
    department: 'Commercial',
    description: 'Développez notre portefeuille clients et accompagnez les entreprises réunionnaises dans leur transformation digitale.',
    requirements: [
      'Expérience en vente B2B',
      'Excellente présentation et relationnel',
      'Autonomie et orientation résultats',
      'Permis B indispensable'
    ]
  }
]

const benefits = [
  {
    icon: Heart,
    title: 'Équipe passionnée',
    description: 'Travaillez avec des experts passionnés par le digital'
  },
  {
    icon: Rocket,
    title: 'Projets innovants',
    description: 'Participez à des projets variés et stimulants'
  },
  {
    icon: Users,
    title: 'Ambiance conviviale',
    description: 'Évoluez dans un environnement de travail agréable'
  },
  {
    icon: Briefcase,
    title: 'Évolution de carrière',
    description: 'Opportunités de formation et de progression'
  }
]

export default function Recrutement() {
  return (
    <>
      <SEO
        title="Digiqo Recrute ! - Rejoignez notre équipe"
        description="Digiqo recrute des talents passionnés par le digital à La Réunion. Découvrez nos offres d'emploi et rejoignez une équipe dynamique."
        keywords="emploi digital la réunion, recrutement marketing, offre emploi développeur, community manager réunion"
        url="https://digiqo.com/recrutement"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-digiqo-primary/5 via-white to-digiqo-accent/5">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-0 w-96 h-96 bg-digiqo-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-digiqo-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-digiqo-black mb-6">
                Digiqo <span className="text-digiqo-primary">Recrute</span> !
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Rejoignez une équipe passionnée et participez à la transformation digitale 
                des entreprises réunionnaises. Nous recherchons des talents créatifs et motivés 
                pour accompagner notre croissance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Pourquoi rejoindre Digiqo ?
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez ce qui fait de Digiqo un employeur de choix
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
                    <div className="w-20 h-20 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Open Positions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Nos offres d'emploi
              </h2>
              <p className="text-xl text-gray-600">
                Trouvez le poste qui correspond à vos ambitions
              </p>
            </motion.div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {positions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-digiqo-black mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {position.contract}
                        </span>
                        <span className="flex items-center gap-1">
                          📍 {position.location}
                        </span>
                        <span className="bg-digiqo-primary/10 text-digiqo-primary px-3 py-1 rounded-full">
                          {position.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{position.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-digiqo-black mb-3">Profil recherché :</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="w-5 h-5 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Postuler maintenant
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Spontaneous Application */}
        <section className="py-20 bg-gradient-to-r from-digiqo-primary to-digiqo-accent">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Vous ne trouvez pas le poste idéal ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Envoyez-nous votre candidature spontanée ! Nous sommes toujours à la recherche 
                de talents passionnés pour renforcer notre équipe.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Candidature spontanée
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