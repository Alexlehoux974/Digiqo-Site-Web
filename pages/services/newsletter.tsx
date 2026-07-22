import Head from 'next/head'
import { m as motion } from 'framer-motion'
import {
  Mail,
  CalendarDays,
  PenLine,
  Palette,
  Database,
  ShieldCheck,
  Send,
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { SectionGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { generateContactUrl } from '../../lib/contact-utils'

// Page de service dédiée à la Newsletter.
// Route concrète : elle prend le pas sur pages/services/[slug].tsx (qui gère
// les autres services). Architecture et design system alignés sur les pages
// services existantes (ServiceLayout + ServiceHero + sections framer-motion).
// Angle éditorial : la liste d'emails est le seul canal que le client possède
// vraiment — indépendant des plateformes tierces.

const CTA_HREF = generateContactUrl({ service: 'newsletter' })

// Ce que comprend la prestation, dans les deux formules.
const prestations = [
  {
    icon: CalendarDays,
    title: 'Stratégie & calendrier',
    description:
      'Stratégie éditoriale et calendrier d’envoi construits autour de vos temps forts et de vos objectifs business.',
  },
  {
    icon: PenLine,
    title: 'Rédaction des contenus',
    description:
      'Nous écrivons chaque newsletter : objet, accroche, corps et appels à l’action pensés pour être lus et cliqués.',
  },
  {
    icon: Palette,
    title: 'Design à votre marque',
    description:
      'Un template email aux couleurs de votre marque, responsive et cohérent avec votre univers visuel.',
  },
  {
    icon: Database,
    title: 'Gestion de la base',
    description:
      'Import, segmentation, hygiène de la liste et gestion des désinscriptions : votre base reste propre et performante.',
  },
  {
    icon: ShieldCheck,
    title: 'Conformité RGPD',
    description:
      'Consentement, mentions obligatoires et registre : vos envois sont conformes au RGPD, sans zone grise.',
  },
  {
    icon: Send,
    title: 'Routage & envoi',
    description:
      'Nous prenons en charge le routage et l’envoi pour maximiser la délivrabilité et éviter les spams.',
  },
  {
    icon: BarChart3,
    title: 'Reporting mensuel',
    description:
      'Ouvertures, clics, désinscriptions et ventes générées : un reporting mensuel clair pour piloter la performance.',
  },
]

// L'angle « votre audience vous appartient ».
const rented = [
  'Votre page Facebook peut être suspendue du jour au lendemain',
  'Un changement d’algorithme et votre reach s’effondre',
  'Votre compte Instagram ne vous appartient pas vraiment',
  'Votre classement Google dépend d’une décision de Google',
  'Vous louez l’accès à votre audience à des plateformes tierces',
]

const owned = [
  'Votre liste d’emails vous appartient, à 100 %',
  'Vous contactez votre audience quand vous le décidez',
  'Aucun algorithme entre vous et vos clients',
  'Un canal stable, mesurable et rentable sur la durée',
  'Un actif qui prend de la valeur à chaque nouveau contact',
]

// Tableau comparatif des deux formules.
const formulaColumns = ['Essentiel', 'Performance'] as const

const formulaRows: { label: string; values: [string, string] }[] = [
  { label: 'Envois par mois', values: ['2', '4'] },
  { label: 'Segmentation', values: ['1 segment', 'Segments multiples'] },
  { label: 'Design', values: ['Template unique', 'Template + variantes campagne'] },
  {
    label: 'Automatisations',
    values: ['Bienvenue', 'Bienvenue, panier abandonné, réactivation'],
  },
  { label: 'A/B testing des objets', values: ['non', 'oui'] },
  { label: 'Reporting', values: ['Mensuel', 'Mensuel + point trimestriel'] },
  { label: 'Tarif', values: ['150 €/mois', '300 €/mois'] },
]

// Paliers selon la taille de la base de contacts.
const basePricing = [
  { range: 'jusqu’à 5 000', supplement: 'inclus' },
  { range: '5 001 à 20 000', supplement: '+50 €' },
  { range: '20 001 à 50 000', supplement: '+120 €' },
  { range: 'au-delà de 50 000', supplement: 'sur devis' },
]

const faqs = [
  {
    question: 'À quelle fréquence partent les newsletters ?',
    answer:
      'Deux envois par mois avec la formule Essentiel, quatre avec la formule Performance. Nous calons le calendrier sur vos temps forts commerciaux pour rester présent sans jamais lasser votre audience.',
  },
  {
    question: 'Qui écrit les contenus ?',
    answer:
      'Nous nous en chargeons. Objet, accroche, corps du message et appels à l’action sont rédigés par notre équipe, à votre image et validés avec vous. Vous n’avez pas de page blanche à remplir.',
  },
  {
    question: 'Je n’ai pas encore de base d’emails, est-ce un problème ?',
    answer:
      'Non. Nous mettons en place la collecte de consentements conforme au RGPD (formulaires, mentions, registre) et faisons grandir votre liste dans le temps. On construit votre audience, puis on l’anime.',
  },
  {
    question: 'Suis-je propriétaire de ma liste de contacts ?',
    answer:
      'Oui, totalement. Votre liste d’emails vous appartient et reste exportable à tout moment. C’est le principe même de ce service : contrairement à une page sociale, cet actif est le vôtre et personne ne peut vous en priver.',
  },
  {
    question: 'Puis-je changer de formule en cours de route ?',
    answer:
      'Oui. L’abonnement est mensuel et vous pouvez passer d’Essentiel à Performance (ou l’inverse) d’un mois à l’autre, selon vos besoins et vos résultats.',
  },
  {
    question: 'Quel est le délai de démarrage ?',
    answer:
      'Comptez une à deux semaines après le brief : le temps de créer votre template, de préparer votre base et de programmer le premier envoi. Il n’y a aucun frais de mise en place.',
  },
]

export default function NewsletterPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Newsletter & Email Marketing à La Réunion',
    serviceType: 'Newsletter / Email marketing',
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
      'Service de newsletter géré par Digiqo à La Réunion (974) : stratégie, rédaction, design, conformité RGPD, envoi et reporting. Votre liste d’emails vous appartient. À partir de 150 €/mois, sans frais de mise en place.',
    offers: formulaColumns.map((name, i) => ({
      '@type': 'Offer',
      name: `Formule ${name}`,
      price: formulaRows[formulaRows.length - 1].values[i].replace(/[^0-9]/g, ''),
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
        <title>Newsletter La Réunion | Email Marketing & Newsletter gérée 974 - Digiqo</title>
        <meta
          name="description"
          content="Service de newsletter géré à La Réunion (974) : stratégie, rédaction, design, RGPD, envoi et reporting. Votre liste d’emails vous appartient. Dès 150 €/mois, sans frais de mise en place."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Newsletter La Réunion | Email Marketing & Newsletter gérée 974 - Digiqo"
        />
        <meta
          property="og:description"
          content="Le seul canal que vous possédez vraiment. Newsletter clé en main à La Réunion : stratégie, rédaction, design, RGPD, envoi et reporting. Dès 150 €/mois."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/services/newsletter" />
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Newsletter La Réunion | Digiqo" />
        <meta
          name="twitter:description"
          content="Newsletter clé en main à La Réunion (974). Votre audience vous appartient. Dès 150 €/mois, sans frais de mise en place."
        />
        <meta name="twitter:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://digiqo.fr/services/newsletter" />

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
        icon={Mail}
        title={{
          line1: 'Votre audience',
          line2: 'vous appartient',
        }}
        subtitle="Votre page Facebook, votre compte Instagram, votre classement Google : tout peut changer du jour au lendemain. Votre liste d’emails, non. On la construit, on l’anime et on la fait travailler pour vous."
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

      {/* Le seul canal que vous possédez (loué / possédé) */}
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
              POURQUOI LA NEWSLETTER
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Le seul canal que vous{' '}
              <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">
                possédez vraiment
              </span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Sur les réseaux et sur Google, vous louez l’accès à votre audience. Avec une newsletter,
              vous en devenez propriétaire.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-red-400"
            >
              <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Une audience louée</h3>
              <ul className="space-y-4">
                {rented.map((item, i) => (
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
              <h3 className="text-2xl font-bold text-digiqo-primary mb-6">Une audience qui vous appartient</h3>
              <ul className="space-y-4">
                {owned.map((item, i) => (
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

      {/* Ce que comprend la prestation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark text-white text-sm font-bold rounded-full mb-6">
              PRESTATION CLÉ EN MAIN
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-6">
              Tout est{' '}
              <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark bg-clip-text text-transparent">
                inclus
              </span>
              , dans les deux formules
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              De la stratégie au reporting, on s’occupe de tout. Vous gardez le contrôle, sans la charge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prestations.map((item, index) => (
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

      {/* Formules — tableau comparatif */}
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
                zéro frais de mise en place
              </span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Un abonnement mensuel, sans engagement de mise en place. Vous choisissez le rythme.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-3xl shadow-xl bg-white"
          >
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Comparatif des formules Newsletter Essentiel et Performance
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="p-5 md:p-6 text-digiqo-primary/60 font-semibold text-sm">
                    &nbsp;
                  </th>
                  <th scope="col" className="p-5 md:p-6 text-center">
                    <span className="block text-xl font-bold text-digiqo-primary">Essentiel</span>
                  </th>
                  <th scope="col" className="p-5 md:p-6 text-center bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-t-2xl">
                    <span className="block text-xl font-bold text-white">Performance</span>
                    <span className="block text-xs font-semibold text-white/90 mt-1">Le plus complet</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {formulaRows.map((row, i) => {
                  const isPrice = row.label === 'Tarif'
                  return (
                    <tr
                      key={row.label}
                      className={i % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'}
                    >
                      <th
                        scope="row"
                        className={`p-5 md:p-6 font-semibold text-digiqo-primary ${
                          isPrice ? 'text-base md:text-lg' : 'text-sm md:text-base'
                        }`}
                      >
                        {row.label}
                      </th>
                      <td
                        className={`p-5 md:p-6 text-center text-digiqo-primary/80 ${
                          isPrice ? 'text-xl md:text-2xl font-bold text-digiqo-primary' : 'text-sm md:text-base'
                        }`}
                      >
                        {row.values[0]}
                      </td>
                      <td
                        className={`p-5 md:p-6 text-center bg-digiqo-secondary/5 text-digiqo-primary/90 ${
                          isPrice ? 'text-xl md:text-2xl font-bold text-digiqo-secondary-dark' : 'text-sm md:text-base font-medium'
                        }`}
                      >
                        {row.values[1]}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td className="p-5 md:p-6" />
                  <td className="p-5 md:p-6 text-center">
                    <a
                      href={CTA_HREF}
                      className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-full font-semibold bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      Choisir Essentiel
                    </a>
                  </td>
                  <td className="p-5 md:p-6 text-center bg-digiqo-secondary/5 rounded-b-2xl">
                    <a
                      href={CTA_HREF}
                      className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-full font-semibold bg-gradient-to-r from-digiqo-secondary to-digiqo-accent text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      Choisir Performance
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          <p className="text-center text-sm text-digiqo-primary/60 mt-6">
            Abonnement mensuel, sans frais de mise en place.
          </p>

          {/* Paliers selon la taille de la base */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-digiqo-primary text-center mb-3">
              Supplément selon la taille de votre base
            </h3>
            <p className="text-center text-digiqo-primary/70 max-w-2xl mx-auto mb-8">
              Vous connaissez le prix réel avant de demander un devis, pas après.
            </p>
            <div className="overflow-x-auto rounded-3xl shadow-xl bg-white max-w-3xl mx-auto">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <caption className="sr-only">
                  Supplément mensuel selon la taille de la base de contacts
                </caption>
                <thead>
                  <tr className="bg-gradient-to-r from-digiqo-primary to-digiqo-primary-light">
                    <th scope="col" className="p-5 text-white font-semibold text-sm md:text-base">
                      Base de contacts
                    </th>
                    <th scope="col" className="p-5 text-white font-semibold text-sm md:text-base text-right">
                      Supplément mensuel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {basePricing.map((tier, i) => (
                    <tr key={tier.range} className={i % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'}>
                      <th scope="row" className="p-5 font-medium text-digiqo-primary/90 text-sm md:text-base">
                        {tier.range}
                      </th>
                      <td className="p-5 text-right font-bold text-digiqo-secondary-dark text-sm md:text-base">
                        {tier.supplement}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Reprenez le contrôle de votre audience
            </h2>
            <p className="text-xl text-white/90 mb-8">
              On construit votre newsletter, vous en gardez la propriété. Devis gratuit, sans engagement.
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
