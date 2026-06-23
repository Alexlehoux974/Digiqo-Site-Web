import Head from 'next/head'
import { m as motion } from 'framer-motion'
import {
  Globe,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  RefreshCw,
  CheckCircle2,
  XCircle,
  FileText,
  Layout,
  Code,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { SectionGradientOrbs } from '@/components/ui/animated-gradient-orb'

// Page d'atterrissage dédiée à la campagne Google Ads « création site web ».
// Route concrète : elle prend le pas sur pages/services/[slug].tsx (qui gère
// les autres services). Architecture et design system alignés sur les pages
// services existantes (ServiceLayout + ServiceHero + sections framer-motion).

const CTA_HREF = '/?instant=true#contact'

const benefits = [
  {
    icon: Rocket,
    title: 'Site livré en 4 à 8 semaines',
    description:
      'Un planning maîtrisé du brief à la mise en ligne. Vous êtes en ligne rapidement, sans mauvaise surprise.',
  },
  {
    icon: Search,
    title: 'SEO optimisé dès le départ',
    description:
      'Structure, vitesse et balises pensées pour Google dès la conception. Votre site est trouvable sur vos mots-clés business.',
  },
  {
    icon: ShieldCheck,
    title: 'Hébergement sécurisé inclus',
    description:
      'Hébergement haute disponibilité, certificat SSL et sauvegardes. Votre site reste rapide, sûr et toujours en ligne.',
  },
]

const withoutUs = [
  'Site lent qui fait fuir vos visiteurs',
  'Invisible sur Google, aucun trafic qualifié',
  'Design daté qui ne reflète pas votre image',
  'Aucun suivi, vous êtes seul face aux pannes',
  'Pas adapté au mobile, vous perdez 60 % de visiteurs',
]

const withUs = [
  'Site rapide, optimisé pour la conversion',
  'Référencement naturel pensé dès la conception',
  'Design moderne et 100 % à votre image',
  'Hébergement, maintenance et support inclus',
  'Responsive parfait sur mobile, tablette et desktop',
]

const siteTypes = [
  {
    icon: Globe,
    title: 'Site Vitrine',
    description:
      'Présentez votre entreprise, vos services et vos réalisations avec un site élégant et performant qui convertit vos visiteurs en clients.',
    features: ['Pages sur mesure', 'Formulaire de contact', 'Galerie & réalisations', 'SEO local 974'],
    gradient: 'from-digiqo-secondary to-digiqo-secondary-dark',
  },
  {
    icon: ShoppingCart,
    title: 'Site E-commerce',
    description:
      'Vendez en ligne 24h/24 avec une boutique sécurisée, un tunnel de commande optimisé et des paiements en ligne fiables.',
    features: ['Catalogue produits', 'Paiement sécurisé', 'Gestion des stocks', 'Tunnel de conversion'],
    gradient: 'from-digiqo-accent to-digiqo-accent-dark',
  },
  {
    icon: RefreshCw,
    title: 'Refonte complète',
    description:
      'Votre site est daté, lent ou ne convertit plus ? Nous le repensons entièrement sans perdre votre référencement acquis.',
    features: ['Audit de l’existant', 'Nouveau design', 'Migration SEO', 'Performances boostées'],
    gradient: 'from-digiqo-primary to-digiqo-primary-light',
  },
]

const processSteps = [
  {
    icon: FileText,
    step: '1',
    title: 'Brief',
    description: 'Nous analysons vos objectifs, votre cible et vos concurrents pour définir le cahier des charges.',
  },
  {
    icon: Layout,
    step: '2',
    title: 'Maquettes',
    description: 'Nous concevons les maquettes UI/UX de votre site et les validons ensemble avant le développement.',
  },
  {
    icon: Code,
    step: '3',
    title: 'Développement',
    description: 'Nous développons votre site, optimisé pour le SEO, la vitesse et tous les écrans.',
  },
  {
    icon: GraduationCap,
    step: '4',
    title: 'Formation',
    description: 'Nous vous formons à la gestion de votre site et assurons la mise en ligne et le suivi.',
  },
]

const pricingTiers = [
  {
    name: 'Site Vitrine',
    price: 'à partir de 1 490 € HT',
    description: 'Idéal pour présenter votre activité et générer des contacts.',
    features: [
      'Jusqu’à 5 pages sur mesure',
      'Design responsive premium',
      'SEO optimisé dès le départ',
      'Formulaire de contact',
      'Hébergement sécurisé inclus',
    ],
    gradient: 'from-digiqo-secondary to-digiqo-secondary-dark',
    popular: false,
  },
  {
    name: 'Site E-commerce',
    price: 'sur devis',
    description: 'Une boutique en ligne complète pour vendre vos produits 24h/24.',
    features: [
      'Catalogue produits illimité',
      'Paiement en ligne sécurisé',
      'Gestion des stocks & commandes',
      'Tunnel de conversion optimisé',
      'Formation à la gestion',
    ],
    gradient: 'from-digiqo-accent to-digiqo-accent-dark',
    popular: true,
  },
  {
    name: 'Sur-mesure',
    price: 'sur devis',
    description: 'Plateforme, application web ou projet spécifique entièrement personnalisé.',
    features: [
      'Cahier des charges dédié',
      'Développement 100 % sur mesure',
      'Intégrations & API',
      'Évolutivité garantie',
      'Accompagnement complet',
    ],
    gradient: 'from-digiqo-primary to-digiqo-primary-light',
    popular: false,
  },
]

const faqs = [
  {
    question: 'Quel est le délai de livraison d’un site web ?',
    answer:
      'La plupart de nos sites vitrines sont livrés en 4 à 8 semaines selon la complexité et la rapidité de validation des étapes. Un site e-commerce ou une plateforme sur-mesure peut demander davantage de temps : nous vous communiquons un planning précis dès le brief.',
  },
  {
    question: 'Quelles technologies utilisez-vous ?',
    answer:
      'Nous développons des sites modernes, rapides et sécurisés avec des technologies de pointe (React, Next.js, Tailwind CSS) ainsi que WordPress lorsque le projet s’y prête. Le choix dépend de vos besoins en performance, en autonomie de gestion et en évolutivité.',
  },
  {
    question: 'La maintenance est-elle incluse ?',
    answer:
      'L’hébergement sécurisé est inclus et nous proposons des formules de maintenance pour les mises à jour, la sécurité, les sauvegardes et le support technique. Votre site reste rapide, à jour et toujours en ligne.',
  },
  {
    question: 'Le référencement (SEO) est-il inclus ?',
    answer:
      'Oui. Chaque site est optimisé pour le référencement naturel dès sa conception : structure des pages, vitesse de chargement, balises, version mobile et SEO local à La Réunion. Vous démarrez avec des bases solides pour être visible sur Google.',
  },
]

export default function CreationSiteWebPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Création & Refonte de Site Web à La Réunion',
    serviceType: 'Création de site web',
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
      'Agence de création de site web à La Réunion (974) : site vitrine, e-commerce et refonte. Design moderne, SEO optimisé, livraison en 4 à 8 semaines.',
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
        <title>Création Site Web La Réunion | Agence Web & Refonte 974 - Digiqo</title>
        <meta
          name="description"
          content="Agence création site web à La Réunion (974). Site vitrine, e-commerce, refonte. Design moderne, SEO optimisé, livraison 4 à 8 semaines. Devis gratuit 24h."
        />

        {/* Open Graph */}
        <meta property="og:title" content="Création Site Web La Réunion | Agence Web & Refonte 974 - Digiqo" />
        <meta
          property="og:description"
          content="Site vitrine, e-commerce, refonte à La Réunion. Design moderne, SEO optimisé, livraison 4 à 8 semaines. Devis gratuit sous 24h."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/services/creation-site-web" />
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Création Site Web La Réunion | Digiqo" />
        <meta
          name="twitter:description"
          content="Agence création & refonte de site web à La Réunion (974). Vitrine, e-commerce, sur-mesure."
        />
        <meta name="twitter:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://digiqo.fr/services/creation-site-web" />

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
        icon={Globe}
        title={{
          line1: 'Création & Refonte de',
          line2: 'Site Web à La Réunion',
        }}
        subtitle="Agence web à La Réunion : site vitrine, e-commerce et refonte. Design moderne, SEO optimisé, livraison en 4 à 8 semaines. Devis gratuit sous 24h."
        ctaButtons={{
          primary: {
            text: 'Devis gratuit',
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

      {/* Bénéfices */}
      <section className="relative py-16 -mt-20">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg font-bold text-digiqo-primary mb-3">{item.title}</h2>
                <p className="text-sm text-digiqo-primary/70 flex-grow">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi (sans nous / avec nous) */}
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
              POURQUOI DIGIQO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Un site web qui <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">travaille pour vous</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              La différence entre un site qui dort et un site qui génère des clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-red-400"
            >
              <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Sans nous</h3>
              <ul className="space-y-4">
                {withoutUs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-digiqo-primary/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-digiqo-secondary"
            >
              <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Avec nous</h3>
              <ul className="space-y-4">
                {withUs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-digiqo-primary/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types de sites */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark text-white text-sm font-bold rounded-full mb-6">
              NOS RÉALISATIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Quel <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark bg-clip-text text-transparent">type de site</span> pour votre projet ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {siteTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className={`p-8 bg-gradient-to-br ${type.gradient}`}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center">{type.title}</h3>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-digiqo-primary/70 mb-6">{type.description}</p>
                  <ul className="space-y-3 mt-auto">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-digiqo-secondary flex-shrink-0" />
                        <span className="text-digiqo-primary/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process 4 étapes */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white text-sm font-bold rounded-full mb-6">
              NOTRE PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              De l’idée à la <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">mise en ligne</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Une méthode claire en 4 étapes, du premier brief à votre autonomie complète.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-digiqo-secondary to-transparent -translate-y-1/2 hidden lg:block" />
            <div className="grid lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-digiqo-primary/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-digiqo-secondary transition-all duration-300"
                >
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-digiqo-primary">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prix 3 tiers */}
      <section className="py-24 bg-gradient-to-br from-white to-digiqo-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark text-white text-sm font-bold rounded-full mb-6">
              NOS TARIFS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Un site web pour <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark bg-clip-text text-transparent">chaque budget</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Des tarifs transparents. Un devis personnalisé et gratuit sous 24h.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-digiqo-accent px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg border-2 border-digiqo-accent">
                    LE PLUS POPULAIRE
                  </div>
                )}
                <div
                  className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden ${
                    tier.popular ? 'ring-2 ring-digiqo-accent' : ''
                  }`}
                >
                  <div className={`p-8 bg-gradient-to-br ${tier.gradient}`}>
                    <h3 className="text-2xl font-bold text-white text-center mb-2">{tier.name}</h3>
                    <p className="text-3xl font-bold text-white text-center">{tier.price}</p>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-digiqo-primary/70 mb-6 text-center">{tier.description}</p>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-digiqo-primary/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={CTA_HREF}
                      className={`mt-auto block w-full py-4 px-6 text-center font-semibold rounded-full transition-all bg-gradient-to-r ${tier.gradient} text-white shadow-lg hover:shadow-xl hover:-translate-y-1`}
                    >
                      Devis gratuit
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Vos questions, nos <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">réponses</span>
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
              Prêt à lancer votre site web ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Recevez un devis gratuit et personnalisé sous 24h. Sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CTA_HREF}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-digiqo-secondary-dark font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Devis gratuit
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
