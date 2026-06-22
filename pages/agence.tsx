import { m as motion, useInView } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TrustpilotWidget } from '@/components/Trustpilot'
import {
  Linkedin, Mail, Users, Calendar, TrendingDown, Target,
  Activity, LayoutDashboard, BadgeCheck, ArrowRight, Sparkles, MapPin,
  Rocket, Heart, ShieldCheck, Eye
} from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// Équipe — les 8 membres sont conservés (validation Alexandre : on ne retire
// aucun profil). Bios réécrites pour les 3 fondateurs (Rodolphe, Alexandre,
// Angelo) selon le nouveau positionnement ; les autres profils sont gardés.
// ---------------------------------------------------------------------------
const team = [
  {
    name: 'Rodolphe Le Houx',
    role: 'Fondateur & CEO',
    description: "Rodolphe dirige la stratégie et la croissance de Digiqo. Avant de co-fonder l'agence, il a accompagné des dizaines d'entreprises réunionnaises dans leur transformation digitale. Son obsession : que chaque euro investi en pub soit traçable et rentable.",
    image: '/images/rodolphe-lehoux-photo.webp',
    linkedin: 'https://www.linkedin.com/in/rodolphe-le-houx/',
    email: 'rodolphe@digiqo.fr'
  },
  {
    name: 'Alexandre Le Houx',
    role: 'Fondateur & CMO',
    description: "Alexandre pilote la communication et le contenu de Digiqo. Certifié Meta, il conçoit les stratégies de contenu et de CM qui construisent la présence en ligne de nos clients dans la durée.",
    image: '/partenaires/Alexandre.webp',
    linkedin: 'https://www.linkedin.com/in/alexandre-le-houx/',
    email: 'alexandre@digiqo.fr'
  },
  {
    name: 'Angelo Rapazzini',
    role: 'Fondateur & Associé',
    description: "Angelo accompagne le développement commercial et les partenariats stratégiques de Digiqo. Sa vision long terme est au cœur de l'ambition de l'agence.",
    image: '/partenaires/Angelo.webp',
    linkedin: 'https://www.linkedin.com/in/angelo-rapazzini/',
    email: 'angelo@digiqo.fr'
  },
  {
    name: 'Maxime Sin',
    role: 'Head of Sales',
    description: "Après plus de 10 ans d'expérience en tant que Responsable Commercial BtoB dans des startups parisiennes à forte valeur ajoutée, Maxime a rejoint Digiqo avec une conviction forte : la réussite passe avant tout par l'écoute et la compréhension des besoins clients. Son moteur ? Construire des relations de confiance durables et aider chaque client à atteindre ses objectifs de croissance, avec engagement, transparence et proximité.",
    image: '/partenaires/MAXIME-SIN.JPG',
    linkedin: 'https://www.linkedin.com/in/maxime-sin/',
    email: 'maxime@digiqo.fr'
  },
  {
    name: 'Jaemeson Dieu',
    role: 'Head of Products',
    description: "Jaemeson est notre maître d'orchestre de la publicité sur Google. Grâce à sa parfaite maîtrise des outils et langages de l'écosystème Google (Ads, Analytics, Tag Manager, etc.), il conçoit des campagnes précises et redoutablement efficaces. Sa force ? Transformer chaque clic en opportunité, en alliant stratégie, optimisation et analyse poussée des résultats pour générer un maximum de valeur pour nos clients.",
    image: '/partenaires/jaemeson.webp',
    linkedin: 'https://www.linkedin.com/in/jaemeson-dieu/',
    email: 'jaemeson@digiqo.fr'
  },
  {
    name: 'Adrien Trudel',
    role: 'Expert Marketing certifié Meta & TikTok',
    description: "Adrien est notre sniper des campagnes publicitaires. Certifié et formé par Meta, il maîtrise toutes les subtilités de l'écosystème Facebook & Instagram Ads. Sa spécialité ? Créer des campagnes puissantes, rentables et ultra ciblées, avec un suivi pointu des performances.",
    image: '/partenaires/Adrien.webp',
    linkedin: 'https://www.linkedin.com/in/adrien-trudel/',
    email: 'adrien@digiqo.fr'
  },
  {
    name: 'Lilian Apithy',
    role: 'Expert Marketing certifié Meta',
    description: "Lilian est notre véritable couteau suisse : il veille à ce que chaque client Digiqo soit écouté, accompagné et satisfait. Spécialiste des publicités Meta (Facebook & Instagram Ads), il combine expertise technique et sens du relationnel pour offrir des résultats concrets et une expérience client irréprochable.",
    image: '/partenaires/lilian.webp',
    linkedin: 'https://www.linkedin.com/in/lilian-apithy/',
    email: 'lilian@digiqo.fr'
  },
  {
    name: 'Romain Cano',
    role: 'CTO (Directeur Technique)',
    description: "Romain est notre spécialiste en intelligence artificielle et automatisation. Il conçoit et implémente des solutions innovantes pour optimiser les processus métiers de nos clients. Son expertise en IA permet de transformer les données en insights actionnables et d'automatiser les tâches répétitives pour maximiser l'efficacité.",
    image: '/partenaires/Romain.webp',
    linkedin: 'https://www.linkedin.com/in/romain-cano/',
    email: 'romain@digiqo.fr'
  }
]

// Schema.org @graph for /agence — AboutPage + BreadcrumbList + Person for
// each team member. Bot-readable identity that strengthens E-E-A-T and
// helps GEO/LLM surfacing distinguish the agency page from the homepage.
const agenceStructuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://digiqo.fr/agence#aboutpage",
      "name": "L'Agence Digiqo",
      "url": "https://digiqo.fr/agence",
      "description":
        "Agence digitale de La Réunion certifiée Meta Business Partner. Publicité Meta Ads & Google Ads, tracking complet server-side, dashboard client en temps réel. Des résultats mesurables, depuis 2024.",
      "inLanguage": "fr-FR",
      "isPartOf": { "@id": "https://digiqo.fr/#website" },
      "mainEntity": { "@id": "https://digiqo.fr/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://digiqo.fr/agence#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://digiqo.fr/" },
        { "@type": "ListItem", "position": 2, "name": "L'Agence", "item": "https://digiqo.fr/agence" }
      ]
    },
    ...team.map((member) => ({
      "@type": "Person",
      "@id": `https://digiqo.fr/agence#${member.name.toLowerCase().replace(/\s+/g, '-')}`,
      "name": member.name,
      "jobTitle": member.role,
      "image": `https://digiqo.fr${member.image}`,
      "email": `mailto:${member.email}`,
      "sameAs": [member.linkedin],
      "worksFor": { "@id": "https://digiqo.fr/#organization" }
    }))
  ]
}

const stats = [
  { value: 23, decimals: 0, suffix: '', animate: true, label: 'Comptes actifs Meta & Google', icon: Activity },
  { value: 4, decimals: 0, suffix: '', animate: true, label: 'Experts certifiés Meta & Google', icon: BadgeCheck },
  { value: 1.52, decimals: 2, suffix: ' €', animate: true, label: 'CPM Meta moyen (vs 5-12 € en métropole)', icon: TrendingDown },
  { value: 2024, decimals: 0, suffix: '', animate: false, label: 'Année de création', icon: Calendar },
]

const values = [
  { icon: Rocket, title: 'Innovation', description: 'Toujours à la pointe des dernières tendances digitales.' },
  { icon: Heart, title: 'Passion', description: 'Une équipe passionnée qui vit et respire le digital.' },
  { icon: Target, title: 'Performance', description: 'Des résultats mesurables et un ROI optimisé.' },
  { icon: Users, title: 'Partenariat', description: 'Une relation de confiance avec nos clients.' },
]

const pillars = [
  {
    icon: Activity,
    title: 'Tracking complet',
    description: "Chaque conversion est tracée. Vous savez exactement ce que votre budget pub génère.",
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard en temps réel',
    description: "Accès à votre espace sur app.digiqo.fr pour suivre vos campagnes au quotidien.",
  },
  {
    icon: BadgeCheck,
    title: 'Experts certifiés',
    description: "Pas de stagiaires. Chaque compte est géré par un expert certifié Meta ou Google.",
  },
]

// Reveal animation partagée : slide-in depuis le bas au scroll.
const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

// Compteur animé pour la bande chiffres. L'état initial = valeur cible pour
// que le HTML SSR porte le vrai nombre (bots/LLM), puis remise à 0 à l'entrée
// dans le viewport pour l'animation visible.
function StatCounter({
  value, decimals = 0, suffix = '', animate = true,
}: { value: number; decimals?: number; suffix?: string; animate?: boolean }) {
  const [count, setCount] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!animate || !isInView) return
    setCount(0)
    let start = 0
    const duration = 1.6
    const increment = value / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, value, animate])

  const display =
    decimals > 0 ? count.toFixed(decimals).replace('.', ',') : Math.round(count).toString()

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  )
}

const certifications = [
  { type: 'logo', src: '/meta-logo.svg', label: 'Meta Business Partner', alt: 'Logo Meta Business Partner' },
  { type: 'logo', src: '/Google_Ads_logo.svg.png', label: 'Google Partner', alt: 'Logo Google Ads Partner' },
  { type: 'text', icon: BadgeCheck, label: 'Experts certifiés Meta Ads' },
  { type: 'text', icon: ShieldCheck, label: 'Google Analytics & Tag Manager' },
] as const

export default function Agence() {
  return (
    <>
      <SEO
        title="Digiqo — Agence digitale certifiée Meta Business Partner à La Réunion"
        description="Digiqo est l'agence digitale certifiée Meta Business Partner de La Réunion. Publicité Meta Ads & Google Ads, tracking complet, dashboard client en temps réel. Résultats mesurables."
        keywords="agence digitale la réunion, meta business partner réunion, publicité meta ads 974, google ads réunion, tracking server-side, agence marketing digital 974"
        url="https://digiqo.fr/agence"
        structuredData={agenceStructuredDataGraph}
      />

      <HeaderLuxury />

      <main className="overflow-hidden">
        {/* ============================================================== */}
        {/* 1. HERO                                                         */}
        {/* ============================================================== */}
        <section
          id="histoire"
          className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-to-br from-digiqo-primary/5 via-white to-digiqo-accent/5"
        >
          {/* Décor animé (purement décoratif, derrière le contenu) */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <motion.div
              className="absolute top-10 right-0 w-96 h-96 bg-digiqo-accent/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-96 h-96 bg-digiqo-primary/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={false}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-digiqo-primary/10 to-digiqo-accent/10 backdrop-blur-sm text-digiqo-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-8"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Agence certifiée Meta Business Partner — La Réunion
              </motion.div>

              {/* H1 = élément LCP : initial={false} pour peindre au premier rendu. */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-digiqo-black mb-6 leading-[1.1]">
                <motion.span initial={false}>Votre budget pub vaut </motion.span>
                <motion.span
                  initial={false}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-primary"
                >
                  8 fois plus
                </motion.span>
                <motion.span initial={false}> à La Réunion. On vous explique comment.</motion.span>
              </h1>

              <motion.p
                initial={false}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10"
              >
                Digiqo, agence digitale certifiée Meta Business Partner. 23 comptes actifs gérés.
                Des résultats mesurables, ou on ne travaille pas ensemble.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/?instant=true#contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-primary to-digiqo-primary-light text-white font-bold rounded-2xl shadow-digiqo hover:shadow-digiqo-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-lg">Parlons de votre projet</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. BANDE CHIFFRES                                               */}
        {/* ============================================================== */}
        <section className="relative -mt-10 md:-mt-14 z-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 md:p-7 shadow-lg border border-gray-100 text-center flex flex-col items-center"
                  >
                    <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-digiqo-primary/10 to-digiqo-accent/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-digiqo-primary" aria-hidden="true" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-digiqo-primary to-digiqo-accent mb-2">
                      <StatCounter
                        value={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                        animate={stat.animate}
                      />
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-snug">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. LE PROBLÈME QU'ON RÉSOUT                                     */}
        {/* ============================================================== */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-digiqo-black leading-tight">
                  La plupart des agences vous vendent de la visibilité.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-digiqo-primary to-digiqo-accent">
                    Nous, on vous vend des résultats.
                  </span>
                </h2>
              </motion.div>

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5 text-gray-600 text-lg leading-relaxed"
              >
                <p>
                  La publicité digitale sans tracking complet, c'est piloter à l'aveugle.
                  Vous dépensez, vous espérez, mais vous ne savez pas vraiment ce qui génère
                  vos ventes — ni ce qui les freine.
                </p>
                <p>
                  Chez Digiqo, on implémente le tracking server-side et le Consent Mode v2,
                  puis on vous donne accès à un dashboard client en temps réel sur{' '}
                  <span className="font-semibold text-digiqo-primary">app.digiqo.fr</span>.
                  Chaque euro investi devient lisible. Chaque décision, justifiable.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-digiqo-primary/10">
                    <Eye className="w-5 h-5 text-digiqo-primary" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-digiqo-black">Fini le pilotage à l'aveugle.</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. L'AVANTAGE DOM (section signature)                           */}
        {/* ============================================================== */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-digiqo-black text-white">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-digiqo-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-digiqo-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <MapPin className="w-4 h-4 text-digiqo-accent" aria-hidden="true" />
                L'avantage La Réunion
              </motion.div>

              <motion.h2
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
              >
                Pourquoi La Réunion est un terrain idéal pour la pub digitale —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-digiqo-accent to-digiqo-primary-light">
                  et pourquoi ça ne suffit pas
                </span>
              </motion.h2>

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5 text-lg text-gray-300 leading-relaxed"
              >
                <p>
                  Le CPM Meta à La Réunion est structurellement plus bas qu'en métropole :
                  l'inventaire publicitaire local subit moins de concurrence. Concrètement,
                  pour <span className="font-semibold text-white">1 000 € investis, vous touchez
                  bien plus de personnes</span> qu'avec le même budget sur le continent.
                </p>
                <p>
                  Mais ce levier ne fonctionne que si la stratégie, le ciblage et le tracking
                  sont irréprochables. Un CPM bas sur une campagne mal construite, ça reste de
                  l'argent gaspillé — juste moins cher.
                </p>
                <p className="text-white font-medium">
                  C'est exactement ce que Digiqo apporte : la connaissance du marché local,
                  couplée à la maîtrise des outils des plus grandes agences.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. NOTRE HISTOIRE                                               */}
        {/* ============================================================== */}
        <section id="notre-histoire" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-digiqo-black mb-10"
              >
                Trois Réunionnais qui auraient pu partir.
              </motion.h2>

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5 text-lg text-gray-600 leading-relaxed text-left"
              >
                <p>
                  Rodolphe, Alexandre, Angelo. Trois associés nés ou ancrés à La Réunion.
                  Ils auraient pu rejoindre des agences parisiennes ou créer à l'étranger.
                  Ils ont choisi de rester — et de construire à La Réunion une agence au
                  niveau des meilleures agences de France.
                </p>
                <p>
                  Digiqo naît de ce pari : prouver que l'excellence digitale n'est pas
                  réservée à la métropole.
                </p>
                <p className="text-digiqo-black font-medium">
                  La certification Meta Business Partner est venue confirmer, de l'extérieur,
                  ce niveau d'exigence — celui que l'on s'impose à chaque campagne.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. L'ÉQUIPE                                                     */}
        {/* ============================================================== */}
        <section id="equipe" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-digiqo-black mb-4">
                Notre équipe
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Les talents qui font la différence — fondateurs et experts certifiés, mobilisés
                sur chaque projet.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <OptimizedImage
                      src={member.image}
                      alt={`${member.name}, ${member.role} chez Digiqo`}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-digiqo-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-digiqo-black mb-1">{member.name}</h3>
                    <p className="text-digiqo-primary font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{member.description}</p>

                    <div className="flex gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Profil LinkedIn de ${member.name}`}
                        className="w-10 h-10 rounded-full bg-digiqo-primary/10 hover:bg-digiqo-primary text-digiqo-primary hover:text-white flex items-center justify-center transition-colors duration-300"
                      >
                        <Linkedin className="w-5 h-5" aria-hidden="true" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Envoyer un email à ${member.name}`}
                        className="w-10 h-10 rounded-full bg-digiqo-accent/10 hover:bg-digiqo-accent text-digiqo-accent hover:text-white flex items-center justify-center transition-colors duration-300"
                      >
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-gray-600 max-w-3xl mx-auto mt-12 text-base md:text-lg"
            >
              Appuyée par une équipe d'experts certifiés (Meta, Google, création de contenu,
              développement web), Digiqo mobilise les bonnes compétences sur chaque projet.
            </motion.p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 7. CERTIFICATIONS & PARTENARIATS                                */}
        {/* ============================================================== */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-center text-digiqo-black mb-10"
            >
              Nos certifications & partenariats
            </motion.h2>

            <div className="flex flex-wrap items-stretch justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.label}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md hover:border-digiqo-primary/30 transition-all duration-300"
                >
                  {cert.type === 'logo' ? (
                    <img
                      src={cert.src}
                      alt={cert.alt}
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-digiqo-primary/10">
                      <cert.icon className="w-5 h-5 text-digiqo-primary" aria-hidden="true" />
                    </span>
                  )}
                  <span className="font-semibold text-digiqo-black text-sm md:text-base whitespace-nowrap">
                    {cert.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 8. AVIS CLIENTS                                                 */}
        {/* ============================================================== */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-digiqo-black mb-10"
            >
              Ce que nos clients disent de nous
            </motion.h2>

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10"
            >
              <TrustpilotWidget variant="carousel" theme="light" />
            </motion.div>

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <a
                href="https://www.facebook.com/digiqo/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-digiqo-primary font-semibold hover:text-digiqo-accent transition-colors"
              >
                Voir tous les avis
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 9. NOTRE APPROCHE (3 piliers)                                   */}
        {/* ============================================================== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-digiqo-black mb-4">
                Notre approche
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trois principes non négociables qui font la différence sur chaque compte.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="group bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-digiqo-primary to-digiqo-accent flex items-center justify-center shadow-digiqo">
                      <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-digiqo-black mb-3">{pillar.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* NOS VALEURS (conservée — validation Alexandre)                  */}
        {/* ============================================================== */}
        <section id="valeurs" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-digiqo-black mb-4">
                Nos valeurs
              </h2>
              <p className="text-lg text-gray-600">Ce qui nous anime au quotidien</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-1.5"
                  >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-digiqo-primary/10 to-digiqo-accent/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-digiqo-primary" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-digiqo-black mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10. CTA FINAL                                                   */}
        {/* ============================================================== */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-digiqo-primary via-digiqo-accent to-digiqo-primary"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)',
            }}
          />

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Prêt à faire travailler votre budget plus intelligemment ?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                Audit gratuit de vos campagnes en cours. On vous dit ce qui fonctionne, ce qui
                ne fonctionne pas, et comment on peut améliorer.
              </p>
              <Link
                href="/?instant=true#contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-digiqo-primary font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="text-lg">Demander mon audit gratuit</span>
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
