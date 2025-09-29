// useState supprimé - approche sur devis uniquement
import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Target,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  LineChart,
  CheckCircle2,
  MessageCircle,
  Music,
  Hash,
  Shield,
  Award,
  TrendingUp,
  Sparkles,
  Eye,
  Gift
} from 'lucide-react'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { generateContactUrl } from '../../lib/contact-utils'
import { generateWhatsAppLink } from '../../lib/whatsapp-utils'
import { UnderConstructionModal } from '@/components/UnderConstructionModal'
// Import Airtable supprimé - approche sur devis uniquement

// Interface Formula supprimée - approche sur devis uniquement

const processSteps = [
  {
    number: '01',
    title: 'Analyse',
    description: 'Étude approfondie des tendances TikTok et de votre audience cible',
    icon: Target,
    color: 'from-digiqo-primary to-digiqo-secondary'
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Création de contenu viral adapté aux codes de TikTok',
    icon: Users,
    color: 'from-digiqo-accent to-digiqo-primary'
  },
  {
    number: '03',
    title: 'Création',
    description: 'Production de vidéos engageantes et de campagnes créatives',
    icon: Music,
    color: 'from-digiqo-secondary to-digiqo-accent'
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Analyse des performances et ajustements pour maximiser la viralité',
    icon: LineChart,
    color: 'from-digiqo-primary to-digiqo-secondary'
  }
]

export default function TikTokPage() {

  // Quote-based pricing approach - similar to Google Ads
  const pricingApproach = {
    title: 'Tarification sur mesure',
    description: 'Chaque entreprise est unique. Nous créons des stratégies publicitaires TikTok personnalisées selon vos objectifs et votre budget.',
    features: [
      'Budget publicitaire adapté à vos besoins',
      'Nombre de visuels selon vos campagnes',
      'Niveau d\'optimisation personnalisé',
      'Reporting adapté à votre organisation'
    ]
  }

  // Avantages différenciants
  const advantages = [
    {
      title: 'Audience Gen Z',
      description: '60% des utilisateurs ont moins de 30 ans',
      icon: Users
    },
    {
      title: 'Engagement Record',
      description: 'Taux d\'engagement 15% supérieur aux autres réseaux',
      icon: Zap
    },
    {
      title: 'Tarifs Sur Mesure',
      description: 'Budget adapté à vos objectifs et moyens',
      icon: Shield
    },
    {
      title: 'Expertise Locale',
      description: 'Connaissance du marché réunionnais',
      icon: Award
    }
  ]

  // Exemples de campagnes réussies
  const successCases = [
    {
      client: 'Marque de mode',
      metric: '+300%',
      detail: 'de vues en 2 semaines',
      period: 'Challenge viral',
      testimonial: 'Buzz incroyable sur TikTok'
    },
    {
      client: 'Restaurant tendance',
      metric: '500K',
      detail: 'vues sur une vidéo',
      period: 'en 48h',
      testimonial: 'File d\'attente tous les soirs'
    },
    {
      client: 'E-commerce beauté',
      metric: '+250%',
      detail: 'de ventes',
      period: 'en 1 mois',
      testimonial: 'Produits en rupture de stock'
    }
  ]

  const quickWins = [
    {
      icon: Music,
      title: "1 Milliard+ d'utilisateurs",
      description: "Touchez l'audience la plus engagée avec du contenu viral et créatif",
      highlight: "Croissance explosive"
    },
    {
      icon: Hash,
      title: "Hashtag Challenges",
      description: "Créez des tendances virales et engagez votre communauté",
      highlight: "Viralité x10"
    },
    {
      icon: BarChart3,
      title: "ROI impressionnant",
      description: "67% des utilisateurs affirment que TikTok les inspire à acheter",
      highlight: "Conversions élevées"
    }
  ]

  return (
    <ServiceLayout>
      <Head>
        <title>Publicité TikTok à La Réunion | Agence Digitale Digiqo</title>
        <meta name="description" content="Boostez votre visibilité sur TikTok avec nos services publicitaires. In-Feed Ads, TopView, Spark Ads, Branded Hashtag Challenges." />
      </Head>

      {/* Modal de page en construction */}
      <UnderConstructionModal />

      {/* Hero Section avec ServiceHero */}
      <ServiceHero
        icon={Music}
        title={{
          line1: "Publicité",
          line2: "TIKTOK"
        }}
        subtitle="Créez le buzz et touchez une audience massive avec des campagnes TikTok virales"
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Parler à un expert",
            href: generateWhatsAppLink({ context: 'tiktok' })
          }
        }}
        gradientFrom="from-digiqo-primary"
        gradientTo="to-digiqo-accent"
      />

      {/* Quick Wins Section */}
      <section className="relative py-16 -mt-20">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickWins.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-digiqo-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-digiqo-primary/70 mb-2">{item.description}</p>
                    <span className="text-xs font-semibold text-digiqo-accent bg-digiqo-accent/10 px-3 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Notre <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Processus</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto"
            >
              Une méthodologie virale pour conquérir TikTok
            </motion.p>
          </div>

          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-digiqo-accent to-transparent -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center">
                    <div className="text-6xl font-bold text-digiqo-accent/20 mb-4">
                      {step.number}
                    </div>

                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 mt-4`}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-digiqo-primary/70">{step.description}</p>

                    {/* Connection dot for timeline */}
                    <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-digiqo-accent to-digiqo-primary rounded-full -translate-x-1/2 hidden lg:block" />
                  </div>
                </motion.div>
              ))}
            </div>
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
              Nos <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Des solutions adaptées à chaque étape de votre croissance
            </p>

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
                    <span className="text-gray-700">Gestion complète de vos campagnes TikTok</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#8B1431]">✓</span>
                    <span className="text-gray-700">Création des vidéos publicitaires adaptées</span>
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
                  href={generateContactUrl({ service: 'tiktok' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Demander votre devis personnalisé
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href={generateWhatsAppLink({ service: 'tiktok' })}
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
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Prêt à booster votre visibilité ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Rejoignez les entreprises réunionnaises qui font confiance à Digiqo
            pour leur publicité digitale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={generateContactUrl({ service: 'tiktok' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href={generateWhatsAppLink({ service: 'tiktok' })}
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