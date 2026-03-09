import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight, Check, Target, BarChart3, Users, Zap, Shield, Award, ChevronRight, AlertCircle, Rocket, Gift, CheckCircle2, ArrowUpRight } from 'lucide-react'
import ServiceLayout from '../ServiceLayout/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { ANIMATION } from '@/lib/animation-constants'
import { HeroGradientOrbs } from '@/components/ui/animated-gradient-orb'

export default function PubliciteGooglePage() {
  const [isAnnual, setIsAnnual] = useState(false)


  // Processus en 4 étapes
  const processSteps = [
    {
      number: '01',
      title: 'Audit Gratuit',
      description: 'Analyse complète de votre marché et potentiel Google Ads en 30 minutes',
      icon: Target,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      number: '02',
      title: 'Stratégie Sur-Mesure',
      description: 'Plan de campagne personnalisé avec prévisions de résultats réalistes',
      icon: BarChart3,
      color: 'from-indigo-600 to-blue-600'
    },
    {
      number: '03',
      title: 'Lancement Optimisé',
      description: 'Mise en ligne des campagnes avec tracking et dashboard temps réel',
      icon: Rocket,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      number: '04',
      title: 'Croissance Continue',
      description: 'Optimisation hebdomadaire et rapports mensuels détaillés',
      icon: TrendingUp,
      color: 'from-cyan-600 to-teal-600'
    }
  ]

  // Avantages différenciants
  const advantages = [
    {
      title: 'Sans Engagement',
      description: 'Contrats flexibles, vous restez libre de vos choix',
      icon: Shield
    },
    {
      title: 'Budget Flexible',
      description: 'À partir de 500€/mois, adaptable selon vos objectifs',
      icon: Zap
    },
    {
      title: 'Support WhatsApp',
      description: 'Réponse rapide, suivi personnalisé et réactif',
      icon: Users
    },
    {
      title: 'Google Partner',
      description: 'Équipe certifiée, accès aux dernières innovations',
      icon: Award
    }
  ]

  // Exemples de services
  const services = [
    {
      client: 'E-commerce',
      metric: 'Campagnes',
      detail: 'de visibilité immédiate',
      period: 'Search & Shopping',
      testimonial: 'Ciblage précis de votre audience'
    },
    {
      client: 'Services Locaux',
      metric: 'Géo-ciblage',
      detail: 'La Réunion & alentours',
      period: 'Stratégie locale',
      testimonial: 'Touchez vos clients au bon moment'
    },
    {
      client: 'B2B & Prestations',
      metric: 'Leads',
      detail: 'qualifiés ciblés',
      period: 'Budget optimisé',
      testimonial: 'Maximisez votre budget publicitaire'
    }
  ]

  // FAQ orientée business
  const faqs = [
    {
      question: "Comment fonctionne Google Ads ?",
      answer: "Google Ads fonctionne sur un système d'enchères : vous payez quand quelqu'un clique sur votre annonce. Nous créons des campagnes ciblées pour apparaître en haut de Google quand vos clients potentiels recherchent vos services à La Réunion."
    },
    {
      question: "Pourquoi faire appel à une agence plutôt que gérer seul ?",
      answer: "La gestion Google Ads demande expertise technique, temps et optimisation constante. Nous maîtrisons les stratégies avancées, évitons les erreurs coûteuses et optimisons continuellement vos campagnes pour de meilleurs résultats."
    },
    {
      question: "Comment suivre les performances de mes campagnes ?",
      answer: "Nous fournissons un accès à Google Ads pour suivre vos campagnes en temps réel. Vous recevez également des rapports réguliers avec analyse des performances, nombre de clics, conversions et recommandations d'amélioration."
    },
    {
      question: "Google Ads convient-il à mon entreprise ?",
      answer: "Google Ads est efficace pour la plupart des secteurs à La Réunion. Lors de notre audit gratuit, nous analysons votre marché, la concurrence locale et déterminons ensemble si c'est le bon canal pour atteindre vos objectifs commerciaux."
    }
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Publicité Google Ads La Réunion',
    provider: {
      '@type': 'Organization',
      name: 'Digiqo',
      url: 'https://digiqo.fr'
    },
    areaServed: {
      '@type': 'Place',
      name: 'La Réunion'
    },
    description: 'Gestion professionnelle de campagnes Google Ads à La Réunion. Audit gratuit pour évaluer votre potentiel.'
  }

  return (
    <ServiceLayout>
      <Head>
        <title>Google Ads La Réunion - Gestion Campagnes Professionnelle | Digiqo</title>
        <meta name="description" content="Transformez vos clics en clients avec Google Ads. Campagnes sur-mesure, gestion experte, suivi détaillé. Audit gratuit et sans engagement." />

        {/* Open Graph */}
        <meta property="og:title" content="Google Ads La Réunion - Gestion Campagnes Professionnelle | Digiqo" />
        <meta property="og:description" content="Transformez vos clics en clients avec Google Ads. Gestion experte, suivi détaillé." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/services/publicite-google" />
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Google Ads La Réunion - Gestion Professionnelle" />
        <meta name="twitter:description" content="Campagnes Google Ads sur-mesure avec gestion experte" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://digiqo.fr/services/publicite-google" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section avec promesse forte */}
      <section className="relative min-h-[80vh] pt-56 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary">
        <HeroGradientOrbs />
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUpLarge}
            transition={{ duration: ANIMATION.duration.slow }}
            className="space-y-8"
          >
            {/* Badge urgent */}
            <motion.div
              {...ANIMATION.entry.springIn}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-digiqo-accent/20 backdrop-blur-sm rounded-full border border-digiqo-accent/30"
            >
              <AlertCircle className="w-4 h-4 text-digiqo-accent animate-pulse" />
              <span className="text-sm font-semibold text-white">
                Vos concurrents captent déjà 70% des recherches Google
              </span>
            </motion.div>

            {/* Titre principal */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
                <span className="text-white">Transformez vos</span>
                <br />
                <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">
                  Clics en Clients
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                Campagnes Google Ads sur-mesure avec
                <span className="font-bold text-digiqo-accent"> suivi et optimisation continue</span>
              </p>
            </div>

            {/* CTA Hero */}
            <motion.div
              {...ANIMATION.entry.fadeInUp}
              transition={{ delay: 0.6 }}
              className="flex justify-center pt-8"
            >
              <motion.a
                href={generateContactUrl({
                  service: 'publicite-google',
                  description: 'Je veux mon audit Google Ads gratuit (valeur 500€)'
                })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Gift className="w-5 h-5" />
                Audit Gratuit (Valeur 500€)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Pourquoi Google Ads */}
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
              Perdez-vous de l'argent
              <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent"> sans Google Ads ?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              92% des consommateurs utilisent Google pour trouver des entreprises locales.
              Sans présence publicitaire, vous laissez vos concurrents capter vos clients potentiels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Problèmes sans Google Ads */}
            <motion.div
              {...ANIMATION.entry.fadeInLeft}
              whileInView={ANIMATION.entry.fadeInLeft.animate}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-digiqo-primary mb-6">
                Sans Google Ads, vous risquez :
              </h3>
              {[
                'Invisibilité sur les recherches commerciales',
                'Perte de parts de marché face aux concurrents',
                'Croissance lente et opportunités manquées',
                'Dépendance au bouche-à-oreille uniquement',
                'Difficulté à suivre l\'efficacité de vos actions'
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

            {/* Solutions avec Google Ads */}
            <motion.div
              {...ANIMATION.entry.fadeInRight}
              whileInView={ANIMATION.entry.fadeInRight.animate}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-digiqo-accent mb-6">
                Avec Google Ads Digiqo :
              </h3>
              {[
                'Top 3 Google sur vos mots-clés business',
                'Leads qualifiés qui cherchent vos services',
                'Suivi détaillé de vos performances publicitaires',
                'Contrôle total sur votre budget et ciblage',
                'Stratégie évolutive selon vos objectifs'
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

      {/* Section Processus */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Votre succès en
              <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent"> 4 étapes simples</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De l'audit gratuit aux premiers résultats, un processus transparent et efficace
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  {/* Numéro */}
                  <div className="text-6xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>

                  {/* Icône */}
                  <div className={`inline-flex p-3 bg-gradient-to-br ${step.color} rounded-2xl mb-4`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Contenu */}
                  <h3 className="text-xl font-bold mb-3 text-digiqo-primary">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Flèche de connexion */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Résultats Clients */}
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
              Découvrez nos solutions Google Ads pour tous types d'activités
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-sm font-semibold text-digiqo-accent mb-2">
                  {result.client}
                </div>
                <div className="text-5xl font-bold text-white mb-2">
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
                    "{result.testimonial}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Pourquoi choisir
              <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent"> Digiqo ?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche unique qui garantit votre succès
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-4 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl mb-4"
                >
                  <advantage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-digiqo-primary">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
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
              Tout ce que vous devez savoir avant de commencer
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
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
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

      {/* Formules Section */}
      <section id="formules" className="py-24 bg-white">
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
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    -15%
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Formula Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
            {/* INITIATION */}
            {[
              {
                id: 'formula-initiation',
                name: 'INITIATION',
                subtitle: 'Campagne de Notoriété — Monocanal',
                priceShort: '550,00 €',
                priceAnnual: '5 610,00 €',
                billingLabel: 'MOIS',
                gradient: 'from-gray-400 to-gray-600',
                bestValue: true,
                isMulticanal: false,
                highlights: [
                  '🖥 Diffusion sur Google Ads',
                  '💰 Jusqu\'à 2 500€ de budget publicitaire géré/mois',
                  '🎨 3 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)',
                  '🧠 Création & ciblage stratégique des campagnes',
                  '⚙️ Optimisation des performances',
                  '📈 Reporting mensuel',
                  '📂 Espace collaboratif : Google Chat + Drive'
                ],
                promoItems: isAnnual
                  ? ['2 vidéos offertes']
                  : ['1 vidéo offerte au paiement de la 2ème mensualité'],
                paymentShort: 'https://app-eu1.hubspot.com/payments/CqxfynTqvw?referrer=PAYMENT_LINK',
                paymentAnnual: 'https://app-eu1.hubspot.com/payments/cfbgbDkKrqhPX?referrer=PAYMENT_LINK'
              },
              {
                id: 'formula-propulsion',
                name: 'PROPULSION',
                subtitle: 'Campagne de Conversion — Monocanal',
                priceShort: '2 250,00 €',
                priceAnnual: '7 650,00 €',
                billingLabel: 'TRIMESTRE',
                gradient: 'from-[#8B1431] to-red-700',
                bestValue: false,
                isMulticanal: false,
                highlights: [
                  '🖥 Diffusion sur Google Ads',
                  '💰 Jusqu\'à 2 500€ de budget publicitaire géré/mois',
                  '🎨 6 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)',
                  '🧠 Création & ciblage stratégique des campagnes',
                  '⚙️ Optimisation des performances',
                  '📈 Reporting mensuel',
                  '📂 Espace collaboratif : Google Chat + Drive',
                  '👥 Exploitation des audiences similaires',
                  '🔧 Intégration basique des pixels & API'
                ],
                promoItems: isAnnual
                  ? ['2 vidéos offertes']
                  : ['1 vidéo offerte', 'Budget pub du 3ème mois offert'],
                paymentShort: 'https://app-eu1.hubspot.com/payments/4gntC6Vznt2d?referrer=PAYMENT_LINK',
                paymentAnnual: 'https://app-eu1.hubspot.com/payments/bpgDysyjrtZmyhm9?referrer=PAYMENT_LINK'
              },
              {
                id: 'formula-expansion',
                name: 'EXPANSION',
                subtitle: 'Campagne de Conversion — Multicanal',
                priceShort: '3 250,00 €',
                priceAnnual: '11 050,00 €',
                billingLabel: 'TRIMESTRE',
                gradient: 'from-[#199CB7] to-[#0F6980]',
                bestValue: false,
                isMulticanal: true,
                highlights: [
                  '🖥 2 plateformes : SMA (META ou TikTok) + SEA (Google Ads)',
                  '💰 Jusqu\'à 2 500€ de budget publicitaire géré/mois',
                  '🎨 9 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)',
                  '🧠 Création & ciblage stratégique des campagnes',
                  '⚙️ Optimisation des performances',
                  '📈 Reporting mensuel',
                  '📂 Espace collaboratif : Google Chat + Drive',
                  '👥 Exploitation des audiences similaires',
                  '🔧 Intégration avancée des pixels & API'
                ],
                promoItems: isAnnual
                  ? ['2 vidéos offertes', 'Budget pub du 3ème mois offert sur Google']
                  : ['1 vidéo offerte', 'Budget pub du 3ème mois offert sur Google'],
                paymentShort: 'https://app-eu1.hubspot.com/payments/WQ6DrgtrDNrt7Dtr?referrer=PAYMENT_LINK',
                paymentAnnual: 'https://app-eu1.hubspot.com/payments/D7nW622G?referrer=PAYMENT_LINK'
              }
            ].map((formula, index) => (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-full"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {formula.bestValue && (
                  <div className="absolute -top-3 -right-10 bg-white text-[#8B1431] px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2 border-[#8B1431]">
                    LE PLUS POPULAIRE
                  </div>
                )}
                {formula.isMulticanal && (
                  <div className="absolute -top-3 left-4 bg-gradient-to-r from-[#199CB7] to-[#0F6980] text-white px-4 py-1.5 rounded-full text-xs font-bold z-20 shadow-lg">
                    SMA + SEA
                  </div>
                )}
                <div className={`relative bg-white rounded-2xl shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${formula.bestValue ? 'ring-4 ring-[#8B1431] shadow-2xl' : ''}`}>
                  <div className={`p-6 bg-gradient-to-br ${formula.gradient} rounded-t-2xl`}>
                    <h3 className="text-2xl font-bold text-center text-white">{formula.name}</h3>
                    <p className="text-sm text-white/80 text-center mt-1">{formula.subtitle}</p>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-[#8B1431]">
                          {isAnnual ? formula.priceAnnual.split(',')[0] : formula.priceShort.split(',')[0]}
                        </span>
                        <span className="text-3xl font-bold text-[#8B1431]">
                          {isAnnual ? ',' + (formula.priceAnnual.split(',')[1] || '00') : ',' + (formula.priceShort.split(',')[1] || '00')}
                        </span>
                        <span className="text-2xl font-semibold text-gray-600 ml-1">HT</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 font-medium h-5">
                        {isAnnual ? 'PAR AN' : `PAR ${formula.billingLabel}`}
                      </p>
                      {isAnnual && <p className="text-xs text-green-600 mt-1 font-semibold">-15% de réduction</p>}
                      {!isAnnual && <p className="text-xs text-gray-500 mt-1">Sans engagement</p>}
                    </div>
                    <div className="space-y-3 mb-6">
                      {formula.highlights.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#8B1431] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto">
                    <div className="border-t border-gray-200 pt-4 mb-6 min-h-[80px]">
                      <p className="text-sm font-semibold text-[#8B1431] mb-2">🎁 Offre promotionnelle</p>
                      {formula.promoItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-[#8B1431] text-xs font-bold">🎁</span>
                          <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                    <motion.a
                      href={isAnnual ? formula.paymentAnnual : formula.paymentShort}
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

      {/* CTA Final avec urgence */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-[500px] h-[500px]"
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-digiqo-accent/30 to-orange-500/30 rounded-full blur-3xl" />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUpLarge}
            whileInView={ANIMATION.entry.fadeInUpLarge.animate}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20"
          >
            {/* Badge d'urgence */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-digiqo-accent/20 backdrop-blur-sm rounded-full border border-digiqo-accent/30 mb-8"
            >
              <Rocket className="w-4 h-4 text-digiqo-accent animate-pulse" />
              <span className="text-sm font-semibold text-white">
                Audit gratuit : Découvrez votre potentiel sur Google Ads
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prêt à multiplier
              <br />
              <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">
                vos ventes par 3 ?
              </span>
            </h2>

            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Découvrez comment Google Ads peut développer votre activité.
              Audit gratuit personnalisé, sans engagement.
            </p>

            <div className="flex justify-center">
              <motion.a
                href={generateContactUrl({
                  service: 'publicite-google',
                  description: 'Je veux mon audit Google Ads gratuit maintenant'
                })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Gift className="w-5 h-5" />
                Réserver mon Audit Gratuit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            <p className="text-sm text-white/60 mt-8">
              ✓ Sans engagement ✓ Analyse personnalisée ✓ Stratégie sur-mesure
            </p>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}