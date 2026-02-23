import Head from 'next/head'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Handshake,
  Send,
  UserCheck,
  BarChart3,
  Megaphone,
  Eye,
  BadgeDollarSign,
  Share2,
  FileText,
  Search,
  MessageSquare,
  CheckCircle,
  Plus,
  AlertTriangle,
} from 'lucide-react'
import ServiceLayout from '../components/ServiceLayout/ServiceLayout'
import { ANIMATION } from '@/lib/animation-constants'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const PartnershipForm = dynamic(() => import('@/components/Partnership/PartnershipForm'), { ssr: false })

const whatWeLookFor = [
  {
    icon: UserCheck,
    title: 'Profil sérieux & image compatible',
    description: "Un comportement exemplaire et une image alignée avec les valeurs Digiqo. On ne s'associe pas avec n'importe qui.",
  },
  {
    icon: BarChart3,
    title: 'Exposition réelle & mesurable',
    description: "Un calendrier d'événements concret, une audience prouvée (stats, insights) et une visibilité quantifiable.",
  },
  {
    icon: Megaphone,
    title: 'Contreparties concrètes',
    description: "Des engagements clairs : contenus, mentions, logo, présence événements. Du concret, pas du vague.",
  },
]

const whatWeOffer = [
  {
    icon: Eye,
    title: 'Partenariat visibilité',
    description: "Logo Digiqo sur tes supports (tenue, scène, publications). Mise en avant de ta collaboration.",
  },
  {
    icon: BadgeDollarSign,
    title: 'Sponsoring possible',
    description: "Selon la qualité du dossier et l'alignement avec notre stratégie, un sponsoring financier peut être proposé.",
  },
  {
    icon: Share2,
    title: 'Mise en avant contenus & réseaux',
    description: "Co-création de contenus, partage sur nos réseaux, intégration dans nos campagnes et communications.",
  },
]

const processSteps = [
  { icon: FileText, title: 'Candidature', description: 'Remplis le formulaire complet ci-dessous' },
  { icon: Search, title: 'Analyse', description: 'Étude de ton dossier sous 7 à 14 jours' },
  { icon: MessageSquare, title: 'Échange', description: 'Proposition personnalisée si ton profil matche' },
  { icon: CheckCircle, title: 'Partenariat', description: 'Lancement de la collaboration !' },
]

const faqItems = [
  {
    q: "Digiqo fournit-il du matériel ou de l'équipement ?",
    a: "Non, Digiqo n'est pas équipementier. On ne fournit pas de matos complet. Le partenariat concerne la visibilité (logo, contenus, réseaux) et éventuellement un sponsoring financier selon le dossier.",
  },
  {
    q: 'Je suis débutant / peu suivi, ai-je une chance ?',
    a: "On évalue chaque dossier globalement. Un petit compte avec une audience ultra-engagée et locale peut avoir plus de valeur qu'un gros compte passif. L'important c'est la qualité du dossier et la motivation.",
  },
  {
    q: 'Quel délai pour avoir une réponse ?',
    a: "Nous analysons chaque candidature sous 7 à 14 jours ouvrés. Si ton profil nous intéresse, on te recontacte pour discuter d'une proposition. Sinon, tu recevras un retour par email.",
  },
  {
    q: "Puis-je postuler en tant qu'athlète ET speaker ?",
    a: "Le formulaire te demande de choisir un profil principal. Si tu cumules les deux, choisis celui qui correspond le mieux à ta demande et précise l'autre dans tes réponses.",
  },
]

export default function PartenariatsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <ServiceLayout>
      <Head>
        <title>Partenariats & Sponsoring - Digiqo</title>
        <meta name="description" content="Athlètes et speakers : proposez une collaboration avec Digiqo. Partenariat visibilité, sponsoring, mise en avant contenus et réseaux." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-digiqo-accent/20 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-digiqo-primary/30 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            className="inline-flex mb-8"
          >
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Handshake className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.h1
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Partenariats & <span className="text-digiqo-accent">Sponsoring</span>
          </motion.h1>

          <motion.p
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Athlètes & speakers : proposez une collaboration avec Digiqo.
          </motion.p>

          <motion.div
            {...ANIMATION.entry.fadeInUp}
            initial={ANIMATION.entry.fadeInUp.initial}
            animate={ANIMATION.entry.fadeInUp.animate}
            transition={{ delay: 0.3 }}
          >
            <a
              href="#formulaire"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-full hover:bg-digiqo-accent hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Send className="w-5 h-5" />
              Candidater
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== CE QU'ON RECHERCHE ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce qu'on <span className="text-digiqo-accent">recherche</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              On ne cherche pas juste un logo sur un maillot. On cherche des profils sérieux avec qui construire quelque chose.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whatWeLookFor.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex mb-4">
                  <div className="p-4 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-digiqo-primary">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CE QU'ON PROPOSE ===== */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ce qu'on <span className="text-digiqo-accent">propose</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whatWeOffer.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-3 bg-digiqo-accent/10 rounded-xl w-fit mb-4">
                  <item.icon className="w-7 h-7 text-digiqo-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex items-start gap-3 p-4 bg-digiqo-primary/5 rounded-xl max-w-2xl mx-auto"
          >
            <AlertTriangle className="w-5 h-5 text-digiqo-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              <strong className="text-digiqo-primary">Important :</strong> Digiqo n'est pas équipementier. On ne fournit pas de matériel complet. Le partenariat porte sur la visibilité, les contenus et éventuellement un soutien financier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comment ça <span className="text-digiqo-accent">marche</span> ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative"
              >
                <div className="inline-flex mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-digiqo-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Questions <span className="text-digiqo-accent">fréquentes</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  border rounded-xl overflow-hidden transition-all duration-300
                  ${openFaq === index
                    ? 'border-digiqo-accent/50 bg-white/5 backdrop-blur-sm'
                    : 'border-white/10 bg-white/[0.02]'
                  }
                `}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium pr-4">{item.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <Plus className={`w-5 h-5 transition-colors ${openFaq === index ? 'text-digiqo-accent' : 'text-gray-400'}`} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.4 }, opacity: { duration: 0.3, delay: 0.1 } } }}
                      exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2 } } }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1">
                        <div className="h-0.5 w-12 bg-gradient-to-r from-digiqo-accent to-transparent rounded-full mb-3" />
                        <p className="text-white/80 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORMULAIRE ===== */}
      <section id="formulaire" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Dépose ta <span className="text-digiqo-accent">candidature</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Remplis le formulaire ci-dessous. Plus ton dossier est complet, plus tes chances sont élevées.
            </p>
          </motion.div>

          <PartnershipForm />
        </div>
      </section>
    </ServiceLayout>
  )
}
