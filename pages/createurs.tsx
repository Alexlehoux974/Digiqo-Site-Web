import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Camera,
  MapPin,
  Users,
  Heart,
  ExternalLink,
  ArrowRight,
  FileText,
  Search,
  Sparkles,
  Play,
  Image as ImageIcon,
  Video,
  MessageCircle,
  Instagram,
  Star,
  Zap,
  CheckCircle2,
} from 'lucide-react'
import ServiceLayout from '../components/ServiceLayout/ServiceLayout'
import { ServiceHero } from '../components/ServicePages/ServiceHero'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { generateContactUrl } from '../lib/contact-utils'

// ──────────────────────────────────────────────
// INFLUENCER DATA — Add new profiles here
// ──────────────────────────────────────────────

interface Influencer {
  name: string
  handle: string
  photo: string
  location: string
  followers: string
  niches: string[]
  bio: string
  instagram: string
  contentTypes: string[]
  engagement: string
  featured?: boolean
}

const influencers: Influencer[] = [
  {
    name: 'Ophélie Le Houx',
    handle: '@op_lehoux',
    photo: '/assets/createurs/ophelie-lehoux.webp',
    location: 'La Réunion — Paris',
    followers: '15K',
    niches: ['Mode', 'Beauté', 'Hygiène', 'Cheveux bouclés', 'Sport'],
    bio: 'Créatrice de contenu passionnée par la mode, la beauté et le sport. Son authenticité et son énergie captivent une communauté engagée entre La Réunion et Paris.',
    instagram: 'https://www.instagram.com/op_lehoux/',
    contentTypes: ['Reels', 'Stories', 'Posts', 'UGC'],
    engagement: 'À définir',
    featured: true,
  },
]

// ──────────────────────────────────────────────
// NICHE TAG COLORS
// ──────────────────────────────────────────────

const nicheColors: Record<string, string> = {
  'Mode': 'from-pink-500 to-rose-500',
  'Beauté': 'from-fuchsia-500 to-pink-500',
  'Hygiène': 'from-teal-400 to-cyan-500',
  'Cheveux bouclés': 'from-amber-400 to-orange-500',
  'Sport': 'from-emerald-400 to-green-500',
  'Food': 'from-orange-400 to-red-500',
  'Voyage': 'from-blue-400 to-indigo-500',
  'Lifestyle': 'from-purple-400 to-violet-500',
  'Tech': 'from-cyan-400 to-blue-500',
  'Famille': 'from-yellow-400 to-amber-500',
  'Musique': 'from-indigo-400 to-purple-500',
  'Fitness': 'from-lime-400 to-emerald-500',
  'Gaming': 'from-violet-500 to-purple-600',
  'Humour': 'from-yellow-500 to-orange-500',
}

const getNicheColor = (niche: string) => nicheColors[niche] || 'from-gray-400 to-gray-500'

// ──────────────────────────────────────────────
// CONTENT TYPE ICONS
// ──────────────────────────────────────────────

const contentTypeIcons: Record<string, typeof Play> = {
  'Reels': Video,
  'Stories': Play,
  'Posts': ImageIcon,
  'UGC': Camera,
  'Lives': Zap,
  'TikTok': Video,
}

// ──────────────────────────────────────────────
// PROCESS STEPS
// ──────────────────────────────────────────────

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

// ──────────────────────────────────────────────
// INFLUENCER CARD COMPONENT
// ──────────────────────────────────────────────

const InfluencerCard = ({ influencer, index }: { influencer: Influencer; index: number }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      {...ANIMATION.entry.fadeInUp}
      transition={{ duration: ANIMATION.duration.normal, delay: getStaggerDelay(index) }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">

        {/* Top gradient accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-amber-400" />

        <div className="p-8">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-6">
            {/* Instagram-style gradient ring photo */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600">
                <div className="w-full h-full rounded-full p-[2px] bg-white">
                  {!imageError ? (
                    <img
                      src={influencer.photo}
                      alt={influencer.name}
                      className="w-full h-full rounded-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-pink-400" />
                    </div>
                  )}
                </div>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-emerald-400 rounded-full border-[3px] border-white" />
            </div>

            {/* Name & Meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900 truncate">{influencer.name}</h3>
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
              </div>
              <p className="text-sm text-gray-500 mb-2">{influencer.handle}</p>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>{influencer.location}</span>
              </div>
            </div>

            {/* Follower badge */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-2 rounded-2xl text-center">
                <div className="text-lg font-bold leading-tight">{influencer.followers}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-400">followers</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            {influencer.bio}
          </p>

          {/* Niches */}
          <div className="flex flex-wrap gap-2 mb-5">
            {influencer.niches.map((niche) => (
              <span
                key={niche}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getNicheColor(niche)} shadow-sm`}
              >
                {niche}
              </span>
            ))}
          </div>

          {/* Content Types */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Formats</span>
            <div className="flex gap-2">
              {influencer.contentTypes.map((type) => {
                const IconComponent = contentTypeIcons[type] || Camera
                return (
                  <div
                    key={type}
                    className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg"
                    title={type}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs text-gray-600 font-medium">{type}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Heart className="w-4 h-4 text-pink-500 mx-auto mb-1" />
              <div className="text-xs text-gray-500">Engagement</div>
              <div className="text-sm font-semibold text-gray-800">{influencer.engagement}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <div className="text-xs text-gray-500">Tarifs</div>
              <div className="text-sm font-semibold text-gray-800">Sur demande</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={influencer.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
              Voir le profil
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={generateContactUrl({
                description: `Je souhaite collaborer avec ${influencer.name} (${influencer.handle}) pour une campagne de contenu`,
              })}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Engager
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ──────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ──────────────────────────────────────────────

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
              href: '#createurs',
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

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-6xl mx-auto px-6">
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

            <div className="grid md:grid-cols-3 gap-8">
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

        {/* ── INFLUENCER PROFILES ── */}
        <section id="createurs" className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-30" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              transition={{ duration: ANIMATION.duration.normal }}
              className="text-center mb-16"
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

            {/* Influencer Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {influencers.map((influencer, index) => (
                <InfluencerCard key={influencer.handle} influencer={influencer} index={index} />
              ))}
            </div>

            {/* Coming soon hint if only 1-2 influencers */}
            {influencers.length < 3 && (
              <motion.div
                {...ANIMATION.entry.fadeIn}
                transition={{ duration: ANIMATION.duration.normal, delay: 0.5 }}
                className="mt-12 text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium">D&apos;autres créateurs arrivent bientôt...</span>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── CTA: BECOME A CREATOR ── */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/95 to-digiqo-primary-dark relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
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
                  Rejoignez notre réseau et accédez à des collaborations rémunérées avec des marques locales et nationales. Digiqo gère les contrats, briefs et paiements.
                </p>
                <a
                  href={generateContactUrl({
                    description: "Je suis créateur de contenu et je souhaite rejoindre le réseau Digiqo",
                  })}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  Rejoindre le réseau
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
                  href={generateContactUrl({
                    description: "Je souhaite lancer une campagne de contenu avec des créateurs pour ma marque",
                  })}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-amber-400 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-digiqo-accent/25 transition-all duration-300"
                >
                  Lancer une campagne
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </ServiceLayout>
    </>
  )
}
