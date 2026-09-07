import Head from 'next/head'
import { m as motion } from 'framer-motion'
import {
  ArrowRight,
  Camera,
  FileText,
  Instagram,
  Search,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import ServiceLayout from '../components/ServiceLayout/ServiceLayout'
import { ServiceHero } from '../components/ServicePages/ServiceHero'
import { CreatorsExplorer } from '../components/Createurs/CreatorsExplorer'
import { CreatorRequestLauncher } from '../components/Createurs/CreatorRequestLauncher'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { generateContactUrl } from '../lib/contact-utils'
import { CREATORS } from '@/lib/createurs/data'
import { DEMANDE_PATHNAME } from '@/lib/createurs/demande'

// Créateurs affichés (on masque ceux en attente d'accord)
const visibleCreators = CREATORS.filter((inf) => !inf.pending)


const joinHref = `/?instant=true&description=${encodeURIComponent(
  "Je suis créateur de contenu / influenceur et je souhaite rejoindre le réseau de créateurs Digiqo",
)}#contact`

const processSteps = [
  {
    number: '01',
    title: 'Brief',
    description: 'Partagez-nous votre besoin : objectifs, cible, message, budget. On s\'occupe du reste.',
    icon: FileText,
    accent: 'from-digiqo-accent to-amber-400',
  },
  {
    number: '02',
    title: 'Matching',
    description: 'Digiqo sélectionne le créateur idéal selon votre marque, votre audience et vos objectifs.',
    icon: Search,
    accent: 'from-fuchsia-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Création & Livraison',
    description: 'Le contenu est produit, validé avec vous, puis livré prêt à publier ou à sponsoriser.',
    icon: Sparkles,
    accent: 'from-emerald-400 to-teal-500',
  },
]

export default function CreateursPage() {
  return (
    <>
      <Head>
        <title>Créateurs de Contenu & Influenceurs | La Réunion & France | Digiqo</title>
        <meta
          name="description"
          content="Accédez à notre réseau de créateurs de contenu et influenceurs à La Réunion et en France. Digiqo sélectionne le profil idéal pour vos campagnes publicitaires."
        />
        <meta
          name="keywords"
          content="influenceur réunion, créateur de contenu 974, UGC réunion, marketing d'influence réunion, micro-influenceur 974, contenu publicitaire réunion"
        />
        <link rel="canonical" href="https://digiqo.fr/createurs" />
        <meta property="og:title" content="Créateurs de Contenu & Influenceurs | Digiqo" />
        <meta property="og:description" content="Accédez à notre réseau de créateurs de contenu et influenceurs à La Réunion et en France." />
        <meta property="og:url" content="https://digiqo.fr/createurs" />
        <meta property="og:type" content="website" />
      </Head>

      <ServiceLayout>
        {/* ── HERO ── */}
        <ServiceHero
          icon={Camera}
          title={{
            line1: 'Créateurs de',
            line2: 'Contenu',
          }}
          subtitle="Connectez votre marque avec des créateurs authentiques. Digiqo sélectionne, coordonne et livre du contenu publicitaire impactant grâce à son réseau d'influenceurs."
          ctaButtons={{
            primary: {
              text: 'Trouver un créateur',
              href: DEMANDE_PATHNAME,
            },
            secondary: {
              text: 'Nous contacter',
              href: generateContactUrl({
                description: "Je souhaite collaborer avec un créateur de contenu pour ma marque",
              }),
            },
          }}
          gradientFrom="from-pink-500"
          gradientTo="to-purple-600"
          iconColor="text-pink-400"
        />

        {/* ── INFLUENCER PROFILES ── */}
        <section id="createurs" className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-30" />
          </div>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-6">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              transition={{ duration: ANIMATION.duration.normal }}
              className="text-center mb-16 px-3 sm:px-0"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                Notre Réseau
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Nos Créateurs
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Des profils vérifiés et sélectionnés pour leur authenticité, leur créativité et leur engagement.
              </p>
            </motion.div>

            {/* Grille compacte + filtres + pile swipe mobile */}
            <CreatorsExplorer creators={visibleCreators} joinHref={joinHref} />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              transition={{ duration: ANIMATION.duration.normal }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-sm font-semibold mb-4">
                <Zap className="w-4 h-4" />
                Simple & Efficace
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Comment ça marche
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                De votre brief à la livraison du contenu, Digiqo gère tout pour vous.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  {...ANIMATION.entry.fadeInUp}
                  transition={{ duration: ANIMATION.duration.normal, delay: getStaggerDelay(index) }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-gradient-to-r from-gray-200 to-gray-100" />
                  )}

                  <div className="text-center">
                    {/* Step number & icon */}
                    <div className="relative inline-flex mb-6">
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.accent} p-[1px]`}>
                        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                          <step.icon className="w-10 h-10 text-gray-800" />
                        </div>
                      </div>
                      <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                        {step.number}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA: BECOME A CREATOR ── */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/95 to-digiqo-primary-dark relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
              {/* Creator CTA */}
              <motion.div
                {...ANIMATION.entry.fadeInUp}
                transition={{ duration: ANIMATION.duration.normal }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm text-pink-300 rounded-full text-sm font-medium mb-4 border border-white/10">
                  <Camera className="w-4 h-4" />
                  Influenceurs
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Vous êtes créateur de contenu ?
                </h2>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  On attend votre DM.
                </p>
                <a
                  href="https://www.instagram.com/digiqo_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                  Nous envoyer un DM
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>

              {/* Brand CTA */}
              <motion.div
                {...ANIMATION.entry.fadeInUp}
                transition={{ duration: ANIMATION.duration.normal, delay: 0.15 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm text-amber-300 rounded-full text-sm font-medium mb-4 border border-white/10">
                  <Sparkles className="w-4 h-4" />
                  Marques & Entreprises
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Besoin de contenu authentique ?
                </h2>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Du brief à la livraison, on gère votre campagne d&apos;influence de A à Z. Contenu UGC, placements produits, stories sponsorisées — on a le créateur qu&apos;il vous faut.
                </p>
                <a
                  href={DEMANDE_PATHNAME}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-amber-400 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-digiqo-accent/25 transition-all duration-300"
                >
                  Lancer une campagne
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Panneau « Demande de créateur » : intercepte les liens /createurs/demande
            (panneau latéral sur desktop, page pleine sur mobile). */}
        <CreatorRequestLauncher />
      </ServiceLayout>
    </>
  )
}
