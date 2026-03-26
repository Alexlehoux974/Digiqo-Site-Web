import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ANIMATION } from '@/lib/animation-constants'
import {
  TrendingUp,
  Target,
  Palette,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  LineChart,
  ArrowUpRight,
  Rocket,
  Video,
  Shield,
  Award,
  Check,
  AlertCircle,
  Monitor,
  Search,
  Coins,
  Settings,
  FolderOpen,
  Wrench,
  Lightbulb,
  Gift,
  Megaphone,
  Crosshair,
  Phone
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { generateContactUrl } from '../../lib/contact-utils'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

interface Formula {
  id: string
  name: string
  subtitle: string
  price: {
    shortTerm: string
    annual: string
    originalAnnual: string
  }
  billingPeriod: string
  highlights: { icon: any; text: string }[]
  includesFormula?: string
  gradient: string
  accentColor: string
  icon: any
  bonus: {
    title: string
    items: string[]
  }
  paymentLinkShortTerm: string
  paymentLinkAnnual: string
  bestValue?: boolean
  isMulticanal?: boolean
}

export default function PubliciteEnLignePage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const seoData = servicesSEO['publicite-en-ligne']

  const formulas: Formula[] = [
    {
      id: 'formula-initiation',
      name: 'INITIATION',
      subtitle: 'Faites-vous connaître',
      price: {
        shortTerm: '550,00 €',
        annual: '5 610,00 €',
        originalAnnual: '6 600,00 €'
      },
      billingPeriod: '/mois',
      highlights: [
        { icon: Megaphone, text: 'Campagne de Notoriété et de Considération' },
        { icon: Monitor, text: 'Plateforme de diffusion au choix : META (Facebook & Instagram) ou TikTok ou Google Ads' },
        { icon: Coins, text: 'Jusqu\'à 2 500€ de budget publicitaire géré/mois' },
        { icon: Palette, text: '3 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)' },
        { icon: Lightbulb, text: 'Création & ciblage stratégique des campagnes' },
        { icon: Settings, text: 'Optimisation des performances' },
        { icon: BarChart3, text: 'Reporting mensuel' },
        { icon: FolderOpen, text: 'Espace collaboratif : Google Chat + Drive' }
      ],
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: '#10B981',
      icon: Target,
      bonus: {
        title: 'Offre promotionnelle',
        items: isAnnual
          ? ['2 vidéos offertes']
          : ['1 vidéo offerte au paiement de la 2ème mensualité']
      },
      paymentLinkShortTerm: 'https://payments-eu1.hubspot.com/payments/9QqvwjS4d?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://payments-eu1.hubspot.com/payments/FXp6sywrCqpx?referrer=PAYMENT_LINK'
    },
    {
      id: 'formula-propulsion',
      name: 'PROPULSION',
      subtitle: 'Convertissez vos audiences',
      price: {
        shortTerm: '2 250,00 €',
        annual: '7 650,00 €',
        originalAnnual: '9 000,00 €'
      },
      billingPeriod: '/trimestre',
      includesFormula: 'INITIATION',
      highlights: [
        { icon: Crosshair, text: 'Campagne de Conversion — Monocanal' },
        { icon: Palette, text: '6 visuels publicitaires inclus/mois (au lieu de 3)' },
        { icon: Users, text: 'Exploitation des audiences similaires' },
        { icon: Wrench, text: 'Intégration basique des pixels & API' }
      ],
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: '#3B82F6',
      icon: Zap,
      bonus: {
        title: 'Offre promotionnelle',
        items: isAnnual
          ? ['2 vidéos offertes']
          : ['1 vidéo offerte à la souscription']
      },
      paymentLinkShortTerm: 'https://payments-eu1.hubspot.com/payments/hvKD4PsM?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://payments-eu1.hubspot.com/payments/JCJGmsRC?referrer=PAYMENT_LINK',
      bestValue: true
    },
    {
      id: 'formula-expansion',
      name: 'EXPANSION',
      subtitle: 'Dominez votre marché',
      price: {
        shortTerm: '3 250,00 €',
        annual: '11 050,00 €',
        originalAnnual: '13 000,00 €'
      },
      billingPeriod: '/trimestre',
      includesFormula: 'PROPULSION',
      highlights: [
        { icon: Crosshair, text: 'Campagne de Conversion — Multicanal' },
        { icon: Monitor, text: '2 plateformes de diffusion : SMA (META ou TikTok) + SEA (Google Ads)' },
        { icon: Palette, text: '9 visuels publicitaires inclus/mois (au lieu de 6)' },
        { icon: Wrench, text: 'Intégration avancée des pixels & API' }
      ],
      gradient: 'from-purple-500 to-pink-600',
      accentColor: '#A855F7',
      icon: Rocket,
      bonus: {
        title: 'Offre promotionnelle',
        items: isAnnual
          ? ['2 vidéos offertes', 'Budget pub du 3ème mois offert sur Google']
          : ['1 vidéo offerte à la souscription', 'Budget pub du 3ème mois offert sur Google']
      },
      paymentLinkShortTerm: 'https://payments-eu1.hubspot.com/payments/qgwyN9Hj4W7hK?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://payments-eu1.hubspot.com/payments/KwTYqpVjwVK26?referrer=PAYMENT_LINK',
      isMulticanal: true
    }
  ]

  const quickWins = [
    {
      icon: Target,
      title: "Ciblage précis",
      description: "Touchez exactement votre audience idéale à La Réunion grâce à nos techniques de ciblage avancées",
      highlight: "+86% de précision"
    },
    {
      icon: TrendingUp,
      title: "ROI optimisé",
      description: "Chaque euro investi est analysé et optimisé pour maximiser votre retour sur investissement",
      highlight: "3-5x ROI moyen"
    },
    {
      icon: BarChart3,
      title: "Reporting mensuel",
      description: "Un reporting mensuel en contact direct avec votre expert attitré pour suivre vos performances",
      highlight: "Expert dédié"
    },
    {
      icon: Video,
      title: "Vidéos publicitaires premium",
      description: "Tarif préférentiel exclusif pour les clients abonnés en publicité en ligne",
      highlight: "300€ au lieu de 549€"
    },
    {
      icon: Shield,
      title: "Sans Engagement",
      description: "Contrats flexibles, vous restez libre de vos choix à tout moment",
      highlight: "Liberté totale"
    },
    {
      icon: Award,
      title: "Experts Certifiés",
      description: "Équipe certifiée avec accès aux dernières innovations publicitaires",
      highlight: "Meta / Google / TikTok"
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Audit & Analyse',
      description: 'Analyse complète de votre marché, concurrence locale et potentiel publicitaire à La Réunion',
      icon: Target,
      color: 'from-digiqo-primary to-digiqo-primary/80'
    },
    {
      number: '02',
      title: 'Stratégie Sur-Mesure',
      description: 'Plan de campagne personnalisé avec ciblage précis et prévisions de résultats réalistes',
      icon: Users,
      color: 'from-digiqo-secondary to-digiqo-secondary/80'
    },
    {
      number: '03',
      title: 'Création & Lancement',
      description: 'Conception de visuels haute performance et mise en ligne avec tracking temps réel',
      icon: Palette,
      color: 'from-digiqo-accent to-digiqo-accent/80'
    },
    {
      number: '04',
      title: 'Optimisation & Croissance',
      description: 'Ajustements data-driven hebdomadaires et rapports mensuels détaillés',
      icon: LineChart,
      color: 'from-digiqo-accent to-amber-600'
    }
  ]

  const clientResults = [
    {
      client: 'E-commerce',
      metric: 'Campagnes',
      detail: 'de visibilité immédiate',
      period: 'Search, Shopping & Social Ads',
      testimonial: 'Ciblage précis de votre audience sur tous les canaux'
    },
    {
      client: 'Services Locaux',
      metric: 'Géo-ciblage',
      detail: 'La Réunion & alentours',
      period: 'Stratégie locale multicanal',
      testimonial: 'Touchez vos clients réunionnais au bon moment'
    },
    {
      client: 'B2B & Prestations',
      metric: 'Leads',
      detail: 'qualifiés ciblés',
      period: 'Budget optimisé SMA + SEA',
      testimonial: 'Maximisez votre budget publicitaire'
    }
  ]

  const faqs = [
    {
      question: "Comment fonctionne la publicité en ligne ?",
      answer: "La publicité en ligne fonctionne sur un système d'enchères : vous payez quand quelqu'un interagit avec votre annonce (clic, vue, engagement). Nous créons des campagnes ciblées sur les réseaux sociaux (Facebook, Instagram, TikTok) et Google Ads pour atteindre vos clients potentiels à La Réunion."
    },
    {
      question: "Quelle plateforme choisir pour mon entreprise à La Réunion ?",
      answer: "Le choix dépend de votre activité et de vos objectifs. Les réseaux sociaux (META, TikTok) sont idéaux pour la notoriété et l'engagement visuel. Google Ads cible les personnes qui recherchent activement vos services. Notre formule EXPANSION combine les deux pour une stratégie multicanal complète. Lors de notre audit, nous analysons votre marché réunionnais pour vous recommander la meilleure approche."
    },
    {
      question: "Quelle est la différence entre SMA et SEA ?",
      answer: "Le SMA (Social Media Advertising) désigne la publicité sur les réseaux sociaux : Facebook, Instagram, TikTok. Il permet de cibler des audiences par centres d'intérêt et comportements. Le SEA (Search Engine Advertising) désigne la publicité sur Google. Il cible les personnes qui recherchent activement vos produits ou services. Les deux sont complémentaires pour une stratégie digitale efficace à La Réunion."
    },
    {
      question: "Pourquoi faire appel à une agence plutôt que gérer seul ?",
      answer: "La gestion publicitaire demande expertise technique, temps et optimisation constante. Nous maîtrisons les stratégies avancées sur toutes les plateformes, évitons les erreurs coûteuses et optimisons continuellement vos campagnes pour de meilleurs résultats. Notre connaissance du marché réunionnais est un atout supplémentaire."
    },
    {
      question: "Comment suivre les performances de mes campagnes ?",
      answer: "Nous fournissons un accès aux plateformes publicitaires pour suivre vos campagnes en temps réel. Vous recevez également des rapports mensuels détaillés avec analyse des performances, nombre de clics, conversions et recommandations d'amélioration via votre espace collaboratif dédié."
    },
    {
      question: "Combien de temps avant de voir des résultats ?",
      answer: "Les premiers résultats sont visibles dès les premières semaines : impressions, clics et trafic. Pour les conversions et leads qualifiés, comptez 1 à 3 mois d'optimisation selon votre secteur d'activité à La Réunion. Notre approche data-driven permet d'ajuster les campagnes en continu pour améliorer les performances."
    },
    {
      question: "La publicité en ligne convient-elle à mon entreprise ?",
      answer: "La publicité en ligne est efficace pour la plupart des secteurs à La Réunion : e-commerce, services locaux, B2B, restauration, immobilier, santé... Lors de notre consultation gratuite, nous analysons votre marché, la concurrence locale et déterminons ensemble la meilleure stratégie pour atteindre vos objectifs commerciaux."
    }
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Publicité en Ligne à La Réunion - SMA & SEA',
    provider: {
      '@type': 'Organization',
      name: 'Digiqo',
      url: 'https://digiqo.fr'
    },
    areaServed: {
      '@type': 'Place',
      name: 'La Réunion'
    },
    description: 'Gestion professionnelle de campagnes publicitaires en ligne à La Réunion : Facebook Ads, Instagram Ads, TikTok Ads et Google Ads. Ciblage local, optimisation continue.'
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData?.title || 'Publicité en Ligne La Réunion | Google Ads, Facebook, Instagram, TikTok 974 | Digiqo'}</title>
        <meta name="description" content={seoData?.description || 'Agence publicité en ligne à La Réunion (974). Campagnes Google Ads, Facebook Ads, Instagram Ads, TikTok Ads. Ciblage local, optimisation continue, reporting mensuel.'} />

        {/* Open Graph */}
        <meta property="og:title" content="Publicité en Ligne La Réunion | Google Ads, Facebook, Instagram, TikTok 974 | Digiqo" />
        <meta property="og:description" content="Campagnes publicitaires sur-mesure à La Réunion : réseaux sociaux et Google Ads. Ciblage local, optimisation continue." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/services/publicite-en-ligne" />
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Publicité en Ligne La Réunion | Digiqo" />
        <meta name="twitter:description" content="Campagnes Google Ads, Facebook Ads, Instagram Ads, TikTok Ads à La Réunion (974)" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://digiqo.fr/services/publicite-en-ligne" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={TrendingUp}
        title={{
          line1: "Publicité en Ligne",
          line2: "à La Réunion"
        }}
        subtitle="Campagnes ultra-performantes sur Facebook, Instagram, TikTok et Google Ads qui transforment vos prospects en clients fidèles"
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Parler à un expert",
            href: "tel:+262262025102"
          }
        }}
        gradientFrom="from-digiqo-accent"
        gradientTo="to-amber-400"
      />

      {/* Quick Wins Section */}
      <section className="relative py-16 -mt-20">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickWins.map((item, index) => (
              <motion.div
                key={index}
                {...ANIMATION.entry.scaleIn}
                whileInView={ANIMATION.entry.scaleIn.animate}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col flex-grow text-center">
                  <h3 className="text-lg font-bold text-digiqo-primary mb-3 min-h-[28px]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-digiqo-primary/70 mb-4 flex-grow min-h-[60px]">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block text-xs font-semibold text-digiqo-accent bg-digiqo-accent/10 px-3 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Pourquoi la publicité en ligne */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-digiqo-accent/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-digiqo-primary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Pourquoi investir dans la
              <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent"> publicité en ligne ?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              92% des consommateurs utilisent Internet pour trouver des entreprises locales à La Réunion.
              Sans présence publicitaire, vous laissez vos concurrents capter vos clients potentiels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Risques */}
            <motion.div
              {...ANIMATION.entry.fadeInLeft}
              whileInView={ANIMATION.entry.fadeInLeft.animate}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-digiqo-primary mb-6">
                Sans publicité en ligne, vous risquez :
              </h3>
              {[
                'Invisibilité sur les recherches et les réseaux sociaux',
                'Perte de parts de marché face aux concurrents à La Réunion',
                'Croissance lente et opportunités manquées',
                'Dépendance au bouche-à-oreille uniquement',
                'Difficulté à mesurer l\'efficacité de vos actions marketing'
              ].map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100"
                >
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-gray-700">{risk}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Bénéfices */}
            <motion.div
              {...ANIMATION.entry.fadeInRight}
              whileInView={ANIMATION.entry.fadeInRight.animate}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-digiqo-accent mb-6">
                Avec Digiqo, vous obtenez :
              </h3>
              {[
                'Visibilité sur Google et les réseaux sociaux à La Réunion',
                'Leads qualifiés qui cherchent activement vos services',
                'Suivi détaillé de vos performances publicitaires',
                'Contrôle total sur votre budget et ciblage',
                'Stratégie multicanal évolutive selon vos objectifs'
              ].map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{solution}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plateformes Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Toutes les <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">plateformes</span> couvertes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une stratégie publicitaire complète sur les réseaux sociaux et les moteurs de recherche
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* SMA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-800 to-purple-900 rounded-3xl p-4 sm:p-8 text-white"
            >
              <div className="flex items-center gap-2 mb-6">
                <Monitor className="w-6 h-6 text-blue-300" />
                <h3 className="text-2xl font-bold">Réseaux Sociaux (SMA)</h3>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                  <OptimizedImage src="/instagram.jpg" alt="Instagram" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                  <OptimizedImage src="/facebook.jpg" alt="Facebook" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                  <OptimizedImage src="/partenaires/tiktok.png" alt="TikTok" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                  <OptimizedImage src="/whatsapp.png" alt="WhatsApp" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
                </div>
              </div>
              <p className="text-blue-100 mb-4">
                Facebook, Instagram, TikTok, WhatsApp
              </p>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>Ciblage ultra-précis par centres d'intérêt, localisation et comportements</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>Formats visuels engageants : créatifs publicitaires statiques, dynamiques et production vidéo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span>Notoriété, considération et conversion</span>
                </li>
              </ul>
            </motion.div>

            {/* SEA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-4 sm:p-8 text-white"
            >
              <div className="flex items-center gap-2 mb-6">
                <Search className="w-6 h-6 text-green-300" />
                <h3 className="text-2xl font-bold">Moteurs de Recherche (SEA)</h3>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2">
                  <OptimizedImage src="/Google_Ads_logo.svg.png" alt="Google Ads" width={40} height={40} className="w-full h-full object-contain" objectFit="contain" />
                </div>
                <div className="w-12 h-12 rounded-lg bg-white shadow-md p-2 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#FF0000">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </div>
              <p className="text-blue-100 mb-4">
                Google Ads (Search, Display, YouTube)
              </p>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Ciblez les personnes qui recherchent activement vos services</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Intention d'achat immédiate, ROI mesurable</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0" />
                  <span>Top des résultats Google sur vos mots-clés business</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-24 bg-gradient-to-b from-white to-digiqo-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Votre succès en <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">4 étapes simples</span>
            </motion.h2>
            <motion.p
              {...ANIMATION.entry.fadeInUp}
              whileInView={ANIMATION.entry.fadeInUp.animate}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto"
            >
              De l'audit gratuit aux premiers résultats, un processus transparent et efficace
            </motion.p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-digiqo-accent to-transparent -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  {...ANIMATION.entry.scaleIn}
                  whileInView={ANIMATION.entry.scaleIn.animate}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative h-full"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center h-full flex flex-col items-center">
                    <div className="text-6xl font-bold text-digiqo-primary/10 mb-4">
                      {step.number}
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: ANIMATION.duration.normal }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 mt-4`}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-digiqo-primary/70">{step.description}</p>
                    <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-digiqo-accent to-digiqo-accent/70 rounded-full -translate-x-1/2 hidden lg:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Résultats / Cas clients */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Des campagnes adaptées
              <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent"> à vos besoins</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Découvrez nos solutions publicitaires pour tous types d'activités à La Réunion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {clientResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-sm font-semibold text-digiqo-accent mb-2">
                  {result.client}
                </div>
                <div className="text-3xl sm:text-5xl font-bold text-white mb-2">
                  {result.metric}
                </div>
                <div className="text-lg text-white/90 mb-1">
                  {result.detail}
                </div>
                <div className="text-sm text-white/70 mb-6">
                  {result.period}
                </div>
                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/80 italic">
                    &ldquo;{result.testimonial}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formules Section */}
      <section id="formules" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Prix pour la <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">publicité en ligne</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Des solutions adaptées à chaque étape de votre croissance
            </p>

            {/* Toggle Sans engagement/Annuel */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-lg font-semibold transition-colors ${!isAnnual ? 'text-digiqo-primary' : 'text-gray-500'}`}>
                Sans engagement
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-20 h-10 bg-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:ring-offset-2"
                style={{ backgroundColor: isAnnual ? '#8B1431' : '#D1D5DB' }}
              >
                <motion.div
                  className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-md"
                  animate={{ left: isAnnual ? '44px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-semibold transition-colors ${isAnnual ? 'text-digiqo-primary' : 'text-gray-500'}`}>
                  Annuel
                </span>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [1, 0.7, 1], scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    -15%
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Formula Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
            {formulas.map((formula, index) => (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative h-full ${formula.bestValue ? 'z-10' : 'z-0 hover:z-10'}`}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Badge populaire */}
                {formula.bestValue && (
                  <div
                    className="absolute -top-3 -right-2 sm:-right-6 bg-white px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2"
                    style={{ color: formula.accentColor, borderColor: formula.accentColor }}
                  >
                    LE PLUS POPULAIRE
                  </div>
                )}

                {/* Badge Multicanal */}
                {formula.isMulticanal && (
                  <div className={`absolute -top-3 left-4 bg-gradient-to-r ${formula.gradient} text-white px-4 py-1.5 rounded-full text-xs font-bold z-20 shadow-lg`}>
                    SMA + SEA
                  </div>
                )}

                <div
                  className="relative bg-white rounded-2xl shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl"
                  style={formula.bestValue ? { boxShadow: `0 0 0 4px ${formula.accentColor}, 0 25px 50px -12px rgba(0, 0, 0, 0.25)` } : {}}
                >
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${formula.gradient} rounded-t-2xl`}>
                    <h3 className="text-2xl font-bold text-center text-white">{formula.name}</h3>
                    <p className="text-sm text-white/80 text-center mt-1">{formula.subtitle}</p>
                  </div>

                  <div className="p-4 sm:p-8 flex flex-col flex-grow">
                    {/* Prix */}
                    <div className="text-center mb-6">
                      {isAnnual && (
                        <p className="text-lg text-gray-400 line-through mb-1">
                          {formula.price.originalAnnual.replace(' €', '')} € HT
                        </p>
                      )}
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl sm:text-5xl font-bold" style={{ color: formula.accentColor }}>
                          {isAnnual
                            ? formula.price.annual.split(',')[0]
                            : formula.price.shortTerm.split(',')[0]
                          }
                        </span>
                        <span className="text-3xl font-bold" style={{ color: formula.accentColor }}>
                          {isAnnual
                            ? ',' + (formula.price.annual.split(',')[1] || '00')
                            : ',' + (formula.price.shortTerm.split(',')[1] || '00')
                          }
                        </span>
                        <span className="text-2xl font-semibold text-gray-600 ml-1">
                          HT
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 font-medium h-5">
                        {isAnnual ? 'PAR AN' : `PAR ${formula.billingPeriod === '/mois' ? 'MOIS' : 'TRIMESTRE'}`}
                      </p>
                      {isAnnual && (
                        <motion.span
                          animate={{ opacity: [1, 0.7, 1], scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="inline-block mt-2 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 rounded-full"
                        >
                          -15% de réduction
                        </motion.span>
                      )}
                      {!isAnnual && (
                        <p className="text-xs text-gray-500 mt-1">
                          Sans engagement
                        </p>
                      )}
                    </div>

                    {/* Inclut formule précédente */}
                    {formula.includesFormula && (
                      <div
                        className="mb-4 p-3 rounded-xl text-sm font-semibold text-center"
                        style={{ color: formula.accentColor, backgroundColor: `${formula.accentColor}10` }}
                      >
                        Toute la formule {formula.includesFormula}, plus :
                      </div>
                    )}

                    {/* Caractéristiques */}
                    <div className="space-y-3 mb-6">
                      {formula.highlights.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <feature.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: formula.accentColor }} />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bonus promo + CTA toujours alignés en bas */}
                    <div className="mt-auto">
                      <div className="border-t border-gray-200 pt-4 mb-6 min-h-[80px]">
                        <p className="text-sm font-semibold mb-2 flex items-center gap-1.5" style={{ color: formula.accentColor }}>
                          <Gift className="w-4 h-4" />
                          {formula.bonus.title}
                        </p>
                        {formula.bonus.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Gift className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: formula.accentColor }} />
                            <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.a
                        href={isAnnual ? formula.paymentLinkAnnual : formula.paymentLinkShortTerm}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-2xl shadow-lg`}
                      >
                        Choisir cette formule
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Questions
              <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent"> Fréquentes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur la publicité en ligne à La Réunion
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-bold mb-4 text-digiqo-primary flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-digiqo-accent shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-9">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Prêt à booster votre visibilité ?
          </motion.h2>

          <motion.p
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Rejoignez les entreprises réunionnaises qui font confiance à Digiqo
            pour leur publicité en ligne.
          </motion.p>

          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={generateContactUrl({ service: 'publicite' })}
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="tel:+262262025102"
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
              className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-primary text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <Phone className="w-5 h-5" />
              02 62 02 51 02
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}
