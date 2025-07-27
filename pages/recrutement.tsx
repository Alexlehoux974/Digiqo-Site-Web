import { motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Mail, Users, Briefcase, GraduationCap, Linkedin } from 'lucide-react'
import Link from 'next/link'

const positions = [
  {
    id: 'stagiaires',
    title: 'Stagiaires',
    icon: GraduationCap,
    description: 'Vous êtes à la recherche d\'un stage au sein d\'une entreprise de marketing digital moderne et innovante ? Nous sommes exactement ce que vous cherchez !',
    color: 'from-digiqo-secondary to-digiqo-secondary-dark'
  },
  {
    id: 'alternants',
    title: 'Alternants',
    icon: Users,
    description: 'À la recherche d\'une alternance ? Vous êtes au bon endroit ! Rejoignez-nous pour une expérience enrichissante et dynamique !',
    color: 'from-digiqo-primary to-digiqo-accent'
  },
  {
    id: 'commerciaux',
    title: 'Commerciaux',
    icon: Briefcase,
    description: 'Vous cherchez une opportunité en tant que commercial au sein d\'une entreprise dynamique ? Rejoignez notre équipe !',
    color: 'from-digiqo-accent to-digiqo-orange'
  }
]

export default function Recrutement() {
  return (
    <>
      <SEO
        title="On Recrute ! - Digiqo"
        description="Digiqo recrute ! Rejoignez notre équipe de marketing digital à La Réunion. Postes ouverts : stagiaires, alternants et commerciaux."
        keywords="recrutement digiqo, stage marketing digital réunion, alternance marketing réunion, emploi commercial réunion"
        url="https://digiqo.com/recrutement"
      />

      <HeaderLuxury />

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
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-digiqo-black mb-4">
                On Recrute !
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-digiqo-primary mb-8">
                Digiqo - Ladi Lafé zot Pub! 🇷🇪
              </p>
              
              <div className="inline-flex flex-col items-center gap-2 bg-digiqo-secondary/10 text-digiqo-secondary px-6 py-4 rounded-2xl">
                <span className="text-lg font-semibold">Le recrutement</span>
                <span className="text-base">Comment ça marche</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Positions Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Postes Disponibles
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {positions.map((position, index) => {
                const Icon = position.icon
                return (
                  <motion.div
                    key={position.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className={`h-2 bg-gradient-to-r ${position.color}`} />
                    <div className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${position.color} rounded-full flex items-center justify-center mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-digiqo-black mb-4">
                        {position.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {position.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-8">
                Envoyez-nous votre candidature !
              </h2>
              
              <a 
                href="mailto:recrutement@digiqo.fr"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 mb-12"
              >
                <Mail className="w-6 h-6" />
                <span className="text-xl">recrutement@digiqo.fr</span>
              </a>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-semibold rounded-lg border-2 border-digiqo-primary hover:bg-digiqo-primary hover:text-white transition-all duration-300"
                >
                  Poursuivre la visite
                </Link>
                <a
                  href="https://www.linkedin.com/company/digiqo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0077B5] text-white font-semibold rounded-lg hover:bg-[#005885] transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
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