import Head from 'next/head'
import { m as motion } from 'framer-motion'
import {
  Bot,
  MessageCircle,
  CalendarCheck,
  CreditCard,
  Bell,
  Gauge,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { SectionGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { generateContactUrl } from '../../lib/contact-utils'

// Page de service dédiée au Chatbot IA.
// Route concrète : elle prend le pas sur pages/services/[slug].tsx.
// Architecture et design system alignés sur les autres pages services
// (ServiceLayout, ServiceHero, sections framer-motion).
// La vente passe par un devis : aucun tunnel de paiement sur cette page.

const CTA_HREF = generateContactUrl({ service: 'chatbot' })

// Ce que le chatbot sait faire (les cinq capacités du produit, ni plus ni moins).
const capabilities = [
  {
    icon: MessageCircle,
    title: 'Répond dans Messenger',
    description:
      'Le chatbot répond aux messages Messenger à partir de vos instructions métier, modifiables à tout moment.',
  },
  {
    icon: CalendarCheck,
    title: 'Prend les rendez-vous',
    description:
      'Il prend des rendez-vous directement dans la conversation, synchronisés avec votre agenda Google.',
  },
  {
    icon: CreditCard,
    title: 'Encaisse dans la conversation',
    description:
      'Il encaisse vos ventes dans la conversation, via votre compte Stripe.',
  },
  {
    icon: Bell,
    title: 'Vous notifie',
    description:
      'Vous êtes prévenu à chaque commande payée et à chaque rendez-vous pris.',
  },
  {
    icon: Gauge,
    title: 'Affiche votre consommation',
    description:
      'Votre tableau de bord affiche votre consommation de conversations, en toute transparence.',
  },
]

// Les deux arguments qui vendent l'offre.
const sellingArgs = [
  {
    icon: Clock,
    title: 'Un client qui attend est un client perdu',
    description:
      'Un prospect qui écrit un dimanche à 23h et attend jusqu’au lundi a déjà écrit au concurrent. Le chatbot répond en quelques secondes, toute l’année.',
  },
  {
    icon: ShieldCheck,
    title: 'Jamais coupé en cas de dépassement',
    description:
      'Si vous dépassez votre quota, le chatbot n’est jamais coupé. Nous vous prévenons et vous proposons la formule supérieure. Aucune conversation perdue.',
  },
]

// Les deux formules d'abonnement. La mise en place est un frais d'entrée commun,
// pas une troisième formule (présentée séparément sous les cartes).
const formulas = [
  {
    name: '300 conversations',
    volume: '300 conversations par mois',
    perDay: 'soit environ 10 par jour',
    price: '80 €',
    gradient: 'from-digiqo-secondary to-digiqo-secondary-dark',
    popular: false,
  },
  {
    name: '1 000 conversations',
    volume: '1 000 conversations par mois',
    perDay: 'soit environ 33 par jour',
    price: '130 €',
    gradient: 'from-digiqo-secondary to-digiqo-accent',
    popular: true,
  },
]

// Fonctionnalités incluses dans les deux formules.
const includedFeatures = [
  'Réponses Messenger 24h/24 et 7j/7',
  'Instructions métier modifiables à tout moment',
  'Prise de rendez-vous synchronisée avec Google',
  'Encaissement via votre compte Stripe',
  'Notifications des commandes et des rendez-vous',
  'Suivi de la consommation dans le tableau de bord',
]

const faqs = [
  {
    question: 'Sur quel réseau fonctionne le chatbot ?',
    answer:
      'Le chatbot est connecté à votre page Facebook et répond à vos clients dans Messenger.',
  },
  {
    question: 'Puis-je modifier ce que dit le chatbot ?',
    answer:
      'Oui, à tout moment. Depuis votre tableau de bord, vous ajustez les instructions métier données au chatbot. Vous restez autonome après la prise en main.',
  },
  {
    question: 'Que comprend la mise en place ?',
    answer:
      'La mise en place est un frais d’entrée de 380 € HT, une seule fois au démarrage. Elle comprend la création et le paramétrage du chatbot, ainsi qu’une heure de rendez-vous avec le spécialiste chatbot Digiqo pour la configuration et la prise en main.',
  },
  {
    question: 'Que se passe-t-il si je dépasse mon quota de conversations ?',
    answer:
      'Le chatbot n’est jamais coupé. Nous vous prévenons et nous vous proposons la formule supérieure. Aucune conversation n’est perdue.',
  },
  {
    question: 'Le chatbot peut-il prendre des rendez-vous et encaisser ?',
    answer:
      'Oui. Il prend des rendez-vous synchronisés avec votre agenda Google et encaisse dans la conversation via votre compte Stripe. Vous êtes notifié à chaque commande payée et à chaque rendez-vous pris.',
  },
]

export default function ChatbotPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Chatbot IA Messenger à La Réunion',
    serviceType: 'Chatbot IA / agent conversationnel',
    provider: {
      '@type': 'Organization',
      name: 'Digiqo',
      url: 'https://digiqo.fr',
    },
    areaServed: {
      '@type': 'Place',
      name: 'La Réunion',
    },
    description:
      'Chatbot IA connecté à votre page Facebook Messenger. Il répond à vos clients 24h/24 et 7j/7, prend des rendez-vous synchronisés avec Google, encaisse via Stripe et vous notifie. Deux formules, à partir de 80 € HT par mois, avec une mise en place de 380 € HT.',
    offers: formulas.map((f) => ({
      '@type': 'Offer',
      name: `Formule ${f.name}`,
      price: f.price.replace(/[^0-9]/g, ''),
      priceCurrency: 'EUR',
    })),
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <ServiceLayout>
      <Head>
        <title>Chatbot IA Messenger La Réunion | Agent conversationnel 24h/24 974, Digiqo</title>
        <meta
          name="description"
          content="Chatbot IA connecté à votre page Facebook Messenger. Il répond à vos clients 24h/24 et 7j/7, prend des rendez-vous, encaisse via Stripe et vous notifie. Deux formules, dès 80 € HT par mois."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Chatbot IA Messenger La Réunion | Agent conversationnel 24h/24 974, Digiqo"
        />
        <meta
          property="og:description"
          content="Un chatbot IA sur votre page Facebook Messenger, qui répond à vos clients jour et nuit, prend des rendez-vous et encaisse via Stripe. Dès 80 € HT par mois."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/services/chatbot" />
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chatbot IA Messenger La Réunion | Digiqo" />
        <meta
          name="twitter:description"
          content="Chatbot IA sur Messenger à La Réunion (974). Il répond jour et nuit, prend des rendez-vous et encaisse via Stripe. Dès 80 € HT par mois."
        />
        <meta name="twitter:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://digiqo.fr/services/chatbot" />

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

      {/* Hero */}
      <ServiceHero
        icon={Bot}
        title={{
          line1: 'Chatbot IA',
          line2: 'Répond jour et nuit',
        }}
        subtitle="Un chatbot IA branché sur votre page Facebook, qui répond à vos clients dans Messenger 24h/24 et 7j/7. Vous pilotez tout depuis votre tableau de bord, et vous restez autonome après la prise en main."
        ctaButtons={{
          primary: {
            text: 'Demander un devis',
            href: CTA_HREF,
          },
          secondary: {
            text: 'Parler à un expert',
            href: 'tel:+262262025102',
          },
        }}
        gradientFrom="from-digiqo-secondary"
        gradientTo="to-digiqo-accent"
        iconColor="text-digiqo-secondary"
      />

      {/* Pourquoi : les deux arguments qui vendent */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <SectionGradientOrbs />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white text-sm font-bold rounded-full mb-6">
              POURQUOI UN CHATBOT
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Répondre vite,{' '}
              <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">
                sans jamais rater un client
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {sellingArgs.map((arg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-digiqo-secondary flex flex-col"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-2xl flex items-center justify-center mb-6">
                  <arg.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-digiqo-primary mb-4">{arg.title}</h3>
                <p className="text-digiqo-primary/70 flex-grow">{arg.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que fait le chatbot */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark text-white text-sm font-bold rounded-full mb-6">
              CE QUE FAIT LE CHATBOT
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Un assistant qui{' '}
              <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark bg-clip-text text-transparent">
                travaille pour vous
              </span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Les deux formules incluent l’ensemble de ces fonctionnalités.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-digiqo-primary mb-3">{item.title}</h3>
                <p className="text-sm text-digiqo-primary/70 flex-grow">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formules */}
      <section className="py-24 bg-gradient-to-br from-white to-digiqo-secondary/5">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white text-sm font-bold rounded-full mb-6">
              NOS FORMULES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Deux formules,{' '}
              <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">
                selon votre volume
              </span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Même service complet dans les deux cas. Vous choisissez le nombre de conversations. Prix HT.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {formulas.map((formula, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {formula.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-digiqo-accent px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg border-2 border-digiqo-accent">
                    LE PLUS DEMANDÉ
                  </div>
                )}
                <div
                  className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden ${
                    formula.popular ? 'ring-2 ring-digiqo-accent' : ''
                  }`}
                >
                  <div className={`p-8 bg-gradient-to-br ${formula.gradient} text-center`}>
                    <h3 className="text-2xl font-bold text-white mb-1">{formula.volume}</h3>
                    <p className="text-white/90 text-sm mb-4">{formula.perDay}</p>
                    <p className="text-4xl font-bold text-white">{formula.price}</p>
                    <p className="text-white/90 text-sm mt-1">HT par mois</p>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <ul className="space-y-3 mb-8">
                      {includedFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-digiqo-primary/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={generateContactUrl({
                        service: 'chatbot',
                        formula: formula.name,
                        description: `Chatbot IA, formule ${formula.volume}`,
                      })}
                      className={`mt-auto block w-full py-4 px-6 text-center font-semibold rounded-full transition-all bg-gradient-to-r ${formula.gradient} text-white shadow-lg hover:shadow-xl hover:-translate-y-1`}
                    >
                      Demander un devis
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Frais d'entrée commun (mise en place) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-digiqo-primary rounded-3xl p-8 md:p-10 shadow-xl text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-digiqo-accent" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-2xl font-bold">Mise en place et onboarding</h3>
                  <span className="text-2xl font-bold text-digiqo-accent">380 € HT</span>
                </div>
                <p className="text-white/80">
                  Une seule fois au démarrage, commun aux deux formules. Comprend la création et le
                  paramétrage du chatbot, ainsi qu’une heure de rendez-vous avec le spécialiste chatbot
                  Digiqo pour la configuration et la prise en main.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white text-sm font-bold rounded-full mb-6">
              QUESTIONS FRÉQUENTES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Vos questions, nos{' '}
              <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">
                réponses
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-digiqo-primary mb-3">{faq.question}</h3>
                <p className="text-digiqo-primary/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ne laissez plus un client attendre
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Parlons de votre chatbot. Devis gratuit, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CTA_HREF}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-digiqo-secondary-dark font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Demander un devis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+262262025102"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-digiqo-primary text-white font-bold rounded-full hover:bg-digiqo-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5" />
                02 62 02 51 02
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}
