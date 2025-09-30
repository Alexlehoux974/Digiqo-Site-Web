import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Target,
  ArrowRight,
  // Zap,
  Users,
  LineChart,
  CheckCircle2,
  MessageCircle,
  Camera,
  Sparkles
  // Shield,
  // Award
} from 'lucide-react'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { generateWhatsAppLink } from '../../lib/whatsapp-utils'
import { generateContactUrl } from '../../lib/contact-utils'
import { UnderConstructionModal } from '@/components/UnderConstructionModal'

// Interface Formula supprimée - approche sur devis uniquement

const processSteps = [
  {
    number: '01',
    title: 'Analyse',
    description: 'Étude approfondie de votre audience Gen Z et Millennials',
    icon: Target,
    color: 'from-digiqo-primary to-digiqo-primary/80'
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Création de contenus natifs et authentiques pour Snapchat',
    icon: Users,
    color: 'from-digiqo-secondary to-digiqo-secondary/80'
  },
  {
    number: '03',
    title: 'Création',
    description: 'Conception de Snap Ads, AR Lenses et filtres interactifs',
    icon: Sparkles,
    color: 'from-digiqo-accent to-digiqo-accent/80'
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Ajustements continus pour maximiser l\'engagement',
    icon: LineChart,
    color: 'from-digiqo-accent to-amber-600'
  }
]

export default function SnapchatPage() {

  // Avantages différenciants - À implémenter dans une prochaine version
  // const advantages = [
  //   {
  //     title: 'Audience Gen Z',
  //     description: '90% des utilisateurs ont moins de 35 ans',
  //     icon: Users
  //   },
  //   {
  //     title: 'Engagement Record',
  //     description: '5x plus d\'engagement que les autres réseaux',
  //     icon: Zap
  //   },
  //   {
  //     title: 'Tarifs Sur Mesure',
  //     description: 'Budget adapté à vos objectifs et moyens',
  //     icon: Shield
  //   },
  //   {
  //     title: 'Expertise Locale',
  //     description: 'Connaissance du marché réunionnais',
  //     icon: Award
  //   }
  // ]

  // Exemples de campagnes réussies - À implémenter dans une prochaine version
  // const successCases = [
  //   {
  //     client: 'Boutique Mode',
  //     metric: '+180%',
  //     detail: 'de ventes en ligne',
  //     period: 'en 3 mois',
  //     testimonial: 'ROI exceptionnel avec les filtres AR'
  //   },
  //   {
  //     client: 'Restaurant Fast-Food',
  //     metric: '25K',
  //     detail: 'vues sur les stories',
  //     period: 'par semaine',
  //     testimonial: 'Files d\'attente tous les soirs'
  //   },
  //   {
  //     client: 'Salle de Sport',
  //     metric: '150',
  //     detail: 'nouveaux abonnés',
  //     period: 'en 1 mois',
  //     testimonial: 'Campagne virale avec les lenses'
  //   }
  // ]

  // Suppression des formules - pas nécessaire ici
  // Quote-based pricing approach (similar to Google Ads)
  const pricingApproach = {
    title: 'Tarification sur mesure',
    description: 'Chaque entreprise est unique. Nous créons des stratégies publicitaires Snapchat personnalisées selon vos objectifs et votre budget.',
    features: [
      'Budget publicitaire adapté à vos besoins',
      'Nombre de visuels selon vos campagnes',
      'Niveau d\'optimisation personnalisé',
      'Reporting adapté à votre organisation'
    ]
  }

  return (
    <ServiceLayout>
      <Head>
        <title>Publicité Snapchat à La Réunion | Agence Digitale Digiqo</title>
        <meta name="description" content="Boostez votre visibilité sur Snapchat avec nos services publicitaires. Snap Ads, AR Lenses, Story Ads. Touchez la Gen Z et les Millennials à La Réunion." />
      </Head>

      {/* Modal de page en construction */}
      <UnderConstructionModal />

      {/* Hero Section */}
      <ServiceHero
        icon={Camera}
        title={{
          line1: "Publicité Snapchat",
          line2: "Touchez la Gen Z"
        }}
        subtitle="Créez des expériences immersives avec Snap Ads, AR Lenses et Story Ads. Touchez 397 millions d'utilisateurs actifs quotidiens."
        ctaButtons={{
          primary: {
            text: "Démarrer sur Snapchat",
            href: generateWhatsAppLink({ service: 'publicite-snapchat', context: 'hero' })
          },
          secondary: {
            text: "Voir les formules",
            href: "#formules"
          }
        }}
        gradientFrom="from-digiqo-primary"
        gradientTo="to-digiqo-accent"
        iconColor="text-white"
      />

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre processus Snapchat Ads
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une approche créative et data-driven pour maximiser votre impact sur Snapchat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-200 mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formules Section avec design moderne */}
      <section id="formules" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Des solutions adaptées à chaque étape de votre croissance
            </p>

            {/* Badge Bientôt disponible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-digiqo-primary/10 to-digiqo-accent/10 backdrop-blur-sm text-digiqo-primary px-6 py-3 rounded-full text-lg font-bold mb-4 border-2 border-digiqo-primary/20"
            >
              <Sparkles className="w-5 h-5" />
              Bientôt disponible
            </motion.div>
          </motion.div>

          {/* Quote-Based Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-br from-[#8B1431] to-[#DA6530] p-8">
              <h3 className="text-3xl font-bold text-white text-center">
                {pricingApproach.title}
              </h3>
            </div>

            <div className="p-10">
              <p className="text-xl text-gray-700 text-center mb-10">
                {pricingApproach.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {pricingApproach.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#8B1431] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="font-bold text-lg text-gray-900 mb-4">
                  Nos services incluent toujours :
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#8B1431]">✓</span>
                    <span className="text-gray-700">Gestion complète de vos campagnes Snapchat</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8B1431]">✓</span>
                    <span className="text-gray-700">Création des visuels publicitaires adaptés</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8B1431]">✓</span>
                    <span className="text-gray-700">Optimisation continue des performances</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8B1431]">✓</span>
                    <span className="text-gray-700">Reporting détaillé et suivi personnalisé</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href={generateContactUrl({ service: 'snapchat' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Demander votre devis personnalisé
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href={generateWhatsAppLink({ service: 'snapchat' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Discuter sur WhatsApp
                </motion.a>
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                ✓ Sans engagement ✓ Réponse sous 24h ✓ Étude gratuite
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Prêt à booster votre visibilité ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 mb-8"
          >
            Rejoignez les entreprises réunionnaises qui font confiance à Digiqo
            pour leur publicité digitale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={generateContactUrl({ service: 'snapchat' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href={generateWhatsAppLink({ service: 'snapchat' })}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Discuter sur WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}