import { motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Linkedin, Mail, Users, Rocket, Heart, Target } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import Link from 'next/link'

const team = [
  {
    name: 'Rodolphe Le Houx',
    role: 'CEO & Fondateur',
    description: "Rodolphe est le cœur battant de Digiqo. En tant que CEO, il fait preuve d'une vision stratégique claire et d'une passion inébranlable pour le numérique. Il guide l'entreprise avec dynamisme, cherchant constamment à innover et à anticiper les tendances du marché. Son objectif : offrir à nos clients des solutions digitales sur-mesure, en forgeant des partenariats durables.",
    image: '/partenaires/Rodolphe.webp',
    linkedin: 'https://www.linkedin.com/in/rodolphe-le-houx/',
    email: 'rodolphe@digiqo.fr'
  },
  {
    name: 'Angelo Rapazzini',
    role: 'Directeur Général & Fondateur',
    description: "Angelo est notre expert incontournable en publicité en ligne. Ancien marketer chez Meta (anciennement Facebook), il maîtrise parfaitement les codes du digital et les dynamiques de vente. Chez Digiqo, il joue un rôle clé en traduisant les besoins de nos clients en stratégies performantes, tout en entretenant des relations solides et durables avec nos partenaires.",
    image: '/partenaires/Angelo.webp',
    linkedin: 'https://www.linkedin.com/in/angelo-rapazzini/',
    email: 'angelo@digiqo.fr'
  },
  {
    name: 'Alexandre Le Houx',
    role: 'Directeur de la Communication & Fondateur',
    description: "Alexandre est la voix de Digiqo. Il donne le ton de notre communication, crée des contenus percutants et tisse chaque jour des liens authentiques avec notre communauté en ligne. Son énergie contagieuse, sa créativité débordante et son sens de l'écoute font de lui un pilier dans la construction de l'image positive de Digiqo.",
    image: '/partenaires/Alexandre.webp',
    linkedin: 'https://www.linkedin.com/in/alexandre-le-houx/',
    email: 'alexandre@digiqo.fr'
  },
  {
    name: 'Thomas Hoareau',
    role: 'Directeur Commercial',
    description: "Thomas est un commercial talentueux qui a fait ses armes en métropole au sein de grandes entreprises. Reconnu pour sa détermination, son sens du contact et son efficacité, il sait cerner rapidement les besoins des clients pour proposer des solutions sur-mesure, efficaces et rentables.",
    image: '/partenaires/Thomas.webp',
    linkedin: 'https://www.linkedin.com/in/thomas-hoareau/',
    email: 'thomas@digiqo.fr'
  },
  {
    name: 'Adrien Trudel',
    role: 'Expert Marketing certifié Meta',
    description: "Adrien est notre sniper des campagnes publicitaires. Certifié et formé par Meta, il maîtrise toutes les subtilités de l'écosystème Facebook & Instagram Ads. Sa spécialité ? Créer des campagnes puissantes, rentables et ultra ciblées, avec un suivi pointu des performances.",
    image: '/partenaires/Adrien.webp',
    linkedin: 'https://www.linkedin.com/in/adrien-trudel/',
    email: 'adrien@digiqo.fr'
  }
]

const values = [
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Toujours à la pointe des dernières tendances digitales'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Une équipe passionnée qui vit et respire le digital'
  },
  {
    icon: Target,
    title: 'Performance',
    description: 'Des résultats mesurables et un ROI optimisé'
  },
  {
    icon: Users,
    title: 'Partenariat',
    description: 'Une relation de confiance avec nos clients'
  }
]

export default function Agence() {
  return (
    <>
      <SEO
        title="L'Agence - Digiqo"
        description="Découvrez Digiqo, votre agence digitale à La Réunion. Une équipe d'experts passionnés pour booster votre présence en ligne depuis 2020."
        keywords="agence digitale la réunion, digiqo team, marketing digital, publicité en ligne"
        url="https://digiqo.com/agence"
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
                L'agence qui fait 
                <span className="text-digiqo-primary"> vibrer </span>
                votre digital
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fondée en 2020, Digiqo est une agence dynamique spécialisée dans les stratégies digitales innovantes. 
                Notre équipe d'experts passionnés s'engage à offrir des solutions sur mesure pour renforcer la présence 
                en ligne de nos clients et accélérer leur croissance.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: '2020', label: 'Année de création' },
                { number: '127+', label: 'Clients satisfaits' },
                { number: '500+', label: 'Projets réalisés' },
                { number: '100%', label: 'Passion' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-digiqo-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">Nos valeurs</h2>
              <p className="text-xl text-gray-600">Ce qui nous anime au quotidien</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
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
                    <h3 className="text-xl font-bold text-digiqo-black mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">Notre équipe</h2>
              <p className="text-xl text-gray-600">Les talents qui font la différence</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-digiqo-primary/10 to-digiqo-accent/10">
                    <OptimizedImage
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-digiqo-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-digiqo-black mb-1">{member.name}</h3>
                    <p className="text-digiqo-primary font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-4">{member.description}</p>
                    <div className="flex gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-digiqo-primary/10 hover:bg-digiqo-primary hover:text-white text-digiqo-primary rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 bg-digiqo-accent/10 hover:bg-digiqo-accent hover:text-white text-digiqo-accent rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                Prêt à propulser votre présence digitale ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Rejoignez les 127+ entreprises qui nous font confiance pour leur croissance digitale
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Découvrir nos services
                <Rocket className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}