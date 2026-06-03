import { m as motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FAQAccordion } from '@/components/FAQSection'
import {
  Handshake,
  Users,
  CalendarCheck,
  BadgePercent,
  ArrowRight,
  Globe,
  Megaphone,
  CheckCircle,
  Wallet,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'

// Lien de prise de RDV obligatoire avec Maxime Sin (Head of Sales) avant
// toute mise en relation. Conditionne tout le programme apporteur d'affaires.
const RDV_MAXIME_URL =
  'https://meetings-eu1.hubspot.com/maxime-sin?uuid=0606bf0f-7df4-4d46-ac3d-bfc173a732ed'

const steps = [
  {
    icon: Users,
    step: '1',
    title: 'Tu rencontres',
    description:
      "Dans ton réseau, tu identifies une entreprise qui a besoin d'un site web ou de publicité en ligne. Tu n'as rien à vendre : tu repères simplement le besoin.",
  },
  {
    icon: CalendarCheck,
    step: '2',
    title: 'Tu nous présentes',
    description:
      "Tu poses toi-même un rendez-vous avec Maxime Sin, notre Head of Sales, avant toute mise en relation. C'est la condition obligatoire pour valider l'apport.",
  },
  {
    icon: BadgePercent,
    step: '3',
    title: 'On signe, tu touches 5%',
    description:
      "Digiqo gère tout le commercial et le closing. Dès la première facture encaissée, tu reçois 5% HT du montant, sur toute commande d'au moins 2 000€ HT.",
  },
]

// Produits éligibles à la commission apporteur d'affaires.
const webProducts = [
  {
    name: 'Site internet vitrine clé en main',
    detail: 'Sur devis uniquement',
  },
  {
    name: 'Boutique en ligne sur mesure',
    detail: 'Sur devis uniquement',
  },
]

const adProducts = [
  { name: 'Propulsion Trimestrielle', price: '2 250€ HT' },
  { name: 'Propulsion Annuelle', price: '7 650€ HT' },
  { name: 'Initiation Annuelle', price: '5 610€ HT' },
  { name: 'Expansion Trimestrielle', price: '3 250€ HT' },
  { name: 'Expansion Annuelle', price: '11 050€ HT' },
]

const conditions = [
  {
    icon: BadgePercent,
    title: '5% HT de commission',
    description:
      'Tu touches 5% HT du montant de la première facture encaissée par Digiqo.',
  },
  {
    icon: Wallet,
    title: 'À partir de 2 000€ HT',
    description:
      "La commande doit représenter au minimum 2 000€ HT pour ouvrir droit à la commission.",
  },
  {
    icon: ShieldCheck,
    title: 'Première facture encaissée',
    description:
      'La commission est calculée et versée sur la première facture réellement encaissée par Digiqo.',
  },
]

const faqs = [
  {
    question: 'Est-ce que je dois vendre ou négocier moi-même ?',
    answer:
      "Non. Ton rôle s'arrête à la mise en relation. Tu présentes le prospect, et c'est Digiqo qui prend en charge l'intégralité du commercial : découverte du besoin, devis, négociation et closing. Tu n'as aucune pression de vente.",
  },
  {
    question: 'Pourquoi dois-je poser un RDV avec Maxime avant de présenter un prospect ?',
    answer:
      "C'est la condition obligatoire du programme. Le rendez-vous avec Maxime Sin (Head of Sales) en amont permet de cadrer l'opportunité, d'attribuer l'apport à ton nom et d'éviter tout doublon. **Sans ce RDV préalable, l'apport ne peut pas être validé.**",
  },
  {
    question: 'Sur quel montant la commission de 5% est-elle calculée ?',
    answer:
      "Sur la première facture HT réellement encaissée par Digiqo, dès lors que la commande atteint au minimum 2 000€ HT. La commission représente 5% HT de ce montant.",
  },
  {
    question: 'Quels produits sont éligibles ?',
    answer:
      "Deux catégories :\n• **Sites web** (sur devis) : site internet vitrine clé en main et boutique en ligne sur mesure.\n• **Publicité en ligne** : Propulsion Trimestrielle, Propulsion Annuelle, Initiation Annuelle, Expansion Trimestrielle et Expansion Annuelle.",
  },
  {
    question: 'Quand suis-je payé ?',
    answer:
      "La commission est due dès que la première facture liée à la commande est encaissée par Digiqo. Tant que le paiement n'est pas reçu, la commission n'est pas déclenchée.",
  },
  {
    question: 'Combien de prospects puis-je apporter ?',
    answer:
      "Autant que tu veux. Chaque mise en relation valide — précédée d'un RDV avec Maxime et aboutissant à une commande éligible — ouvre droit à ta commission de 5% HT.",
  },
]

// JSON-LD : WebPage + BreadcrumbList + FAQPage. Même logique GEO/E-E-A-T que
// /agence — décrit la page apporteur d'affaires pour les moteurs et les LLM.
const apporteurStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://digiqo.fr/apporteur#webpage',
      name: "Programme Apporteur d'Affaires Digiqo",
      url: 'https://digiqo.fr/apporteur',
      description:
        "Devenez apporteur d'affaires Digiqo : présentez des prospects de votre réseau et touchez 5% HT de la première facture encaissée, sur toute commande d'au moins 2 000€ HT. Digiqo gère tout le commercial.",
      inLanguage: 'fr-FR',
      isPartOf: { '@id': 'https://digiqo.fr/#website' },
      about: { '@id': 'https://digiqo.fr/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://digiqo.fr/apporteur#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://digiqo.fr/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: "Programme Apporteur d'Affaires",
          item: 'https://digiqo.fr/apporteur',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://digiqo.fr/apporteur#faq',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer.replace(/\*\*/g, '').replace(/\n•/g, ' '),
        },
      })),
    },
  ],
}

export default function Partenaires() {
  return (
    <>
      <SEO
        title="Programme Apporteur d'Affaires - Digiqo"
        description="Devenez apporteur d'affaires Digiqo : présentez des prospects de votre réseau et touchez 5% HT de la première facture encaissée, dès 2 000€ HT de commande. Vous présentez, Digiqo gère tout le commercial."
        keywords="apporteur d'affaires digiqo, programme partenaire réunion, commission apporteur, recommandation client agence digitale, partenaire digiqo"
        url="https://digiqo.fr/apporteur"
        structuredData={apporteurStructuredData}
      />

      <HeaderLuxury />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-digiqo-primary/5 via-white to-digiqo-secondary/5">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-0 w-96 h-96 bg-digiqo-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-digiqo-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-digiqo-primary/10 text-digiqo-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Handshake className="w-4 h-4" />
                Programme apporteur d'affaires
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-digiqo-black mb-6">
                Recommandez Digiqo,{' '}
                <span className="text-digiqo-primary">touchez 5%</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
                Vous croisez des entreprises qui ont besoin d'un site web ou de
                publicité en ligne&nbsp;? Présentez-les à Digiqo. Vous ne faites pas
                le closing&nbsp;: <strong>nous gérons tout le commercial</strong>. En
                échange, vous touchez <strong>5% HT de la première facture
                encaissée</strong>, sur toute commande d'au moins 2&nbsp;000€ HT.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={RDV_MAXIME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-primary to-digiqo-primary-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Poser un RDV avec Maxime
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="#offres"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-semibold rounded-lg border-2 border-digiqo-primary hover:bg-digiqo-primary hover:text-white transition-all duration-300"
                >
                  Voir les offres éligibles
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-digiqo-black mb-4">
                Comment ça marche&nbsp;?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Trois étapes simples, zéro pression commerciale
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {item.step}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                            <Icon className="w-4 h-4 text-digiqo-primary" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-digiqo-black mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full -translate-x-1/2">
                          <div className="w-full h-0.5 bg-gradient-to-r from-digiqo-primary to-transparent" />
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Offres éligibles */}
        <section id="offres" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-digiqo-black mb-4">
                Sur quelles offres&nbsp;?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Deux catégories de produits ouvrent droit à votre commission
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Sites web */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-digiqo-primary to-digiqo-primary-dark p-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Sites web</h3>
                    <p className="text-white/80 text-sm">Sur devis uniquement</p>
                  </div>
                </div>
                <ul className="p-6 space-y-4">
                  {webProducts.map((product, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-digiqo-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-semibold text-digiqo-black">
                          {product.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Publicité en ligne */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark p-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Publicité en ligne
                    </h3>
                    <p className="text-white/80 text-sm">Formules au tarif public</p>
                  </div>
                </div>
                <ul className="p-6 space-y-3">
                  {adProducts.map((product, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-3 border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                    >
                      <span className="flex items-center gap-3 font-semibold text-digiqo-black">
                        <CheckCircle className="w-5 h-5 text-digiqo-secondary flex-shrink-0" />
                        {product.name}
                      </span>
                      <span className="text-digiqo-secondary font-bold whitespace-nowrap">
                        {product.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto"
            >
              Seules les commandes d'au moins 2&nbsp;000€ HT ouvrent droit à la
              commission apporteur d'affaires.
            </motion.p>
          </div>
        </section>

        {/* Conditions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-digiqo-black mb-4">
                Les conditions, en clair
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Aucune zone grise&nbsp;: voici exactement comment vous êtes rémunéré
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {conditions.map((condition, index) => {
                const Icon = condition.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-digiqo-primary/10 to-digiqo-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-digiqo-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-digiqo-black mb-2">
                      {condition.title}
                    </h3>
                    <p className="text-gray-600">{condition.description}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Rappel condition obligatoire */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mt-12"
            >
              <div className="bg-digiqo-primary/5 border border-digiqo-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-14 h-14 bg-digiqo-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-digiqo-black mb-1">
                    Condition obligatoire
                  </h3>
                  <p className="text-gray-600">
                    Avant toute mise en relation, vous posez vous-même un rendez-vous
                    avec <strong>Maxime Sin, Head of Sales</strong>. C'est ce qui
                    valide et attribue votre apport.
                  </p>
                </div>
                <a
                  href={RDV_MAXIME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-digiqo-primary text-white font-semibold rounded-lg hover:bg-digiqo-primary-dark transition-all duration-300 whitespace-nowrap"
                >
                  Poser un RDV
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA principal */}
        <section className="py-20 bg-gradient-to-r from-digiqo-primary to-digiqo-primary-dark">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Prêt à devenir apporteur d'affaires&nbsp;?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8">
                La première étape est de poser un RDV avec Maxime. Il vous explique le
                programme et cadre votre première mise en relation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={RDV_MAXIME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Poser un RDV avec Maxime
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="tel:+262262025102"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-digiqo-primary transition-all duration-300"
                >
                  📞 02 62 02 51 02
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-digiqo-black mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Tout ce qu'il faut savoir avant de recommander Digiqo
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQAccordion
                  key={index}
                  index={index}
                  question={faq.question}
                  answer={faq.answer}
                  color="#8a1431"
                  glowColor="rgba(138, 20, 49, 0.25)"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
