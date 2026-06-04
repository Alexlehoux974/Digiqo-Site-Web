import { m as motion } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FAQAccordion } from '@/components/FAQSection'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
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

// Lien de prise du RDV de démarrage avec Maxime Sin (Head of Sales) : une seule
// fois au début pour cadrer le programme et donner des arguments de vente.
// Ensuite, les mises en relation se font directement avec l'équipe commerciale.
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
    title: 'Tu cales le RDV',
    description:
      "Tu réserves un créneau entre ton prospect et notre équipe commerciale. C'est ton prospect qui rencontre Digiqo — tu n'as pas besoin d'être présent, ni de vendre quoi que ce soit. Cette mise en relation enregistre l'apport à ton nom.",
  },
  {
    icon: BadgePercent,
    step: '3',
    title: 'On signe, tu touches 5%',
    description:
      "Digiqo gère tout le commercial et le closing. Une fois le client signé, tu touches 5% HT sur les factures encaissées pendant les 12 premiers mois après conversion.",
  },
]

// Produits éligibles à la commission apporteur d'affaires.
const webProducts = [
  {
    name: 'Site internet vitrine clé en main',
    detail: 'Sur devis uniquement',
    commission: '5% du montant HT payé par le client',
  },
  {
    name: 'Boutique en ligne sur mesure',
    detail: 'Sur devis uniquement',
    commission: '5% du montant HT payé par le client',
  },
]

const adProducts = [
  {
    name: 'Propulsion Trimestrielle',
    price: '2 250€ HT',
    commission: "Jusqu'à 450€ de commission",
    commissionNote: '4 × 112,50€',
  },
  {
    name: 'Propulsion Annuelle',
    price: '7 650€ HT',
    commission: '382,50€ de commission',
  },
  {
    name: 'Initiation Annuelle',
    price: '5 610€ HT',
    commission: '280,50€ de commission',
  },
  {
    name: 'Expansion Trimestrielle',
    price: '3 250€ HT',
    commission: "Jusqu'à 650€ de commission",
    commissionNote: '4 × 162,50€',
  },
  {
    name: 'Expansion Annuelle',
    price: '11 050€ HT',
    commission: '552,50€ de commission',
  },
]

const conditions = [
  {
    icon: BadgePercent,
    title: '5% HT de commission',
    description:
      "Tu touches 5% HT de chaque facture encaissée pendant les 12 mois battants à partir de la date de la première facture du client — pas à partir de la mise en relation.",
  },
  {
    icon: Wallet,
    title: '12 premiers mois après conversion',
    description:
      "La commission court sur les 12 mois suivant la date de la première facturation. Si aucune facture n'est émise dans les 12 mois suivant l'introduction, la commission est nulle.",
  },
  {
    icon: ShieldCheck,
    title: 'Produits éligibles',
    description:
      "Uniquement la publicité en ligne (hors Initiation Mensuelle) et les sites web sur mesure.",
  },
]

const faqs = [
  {
    question: 'Est-ce que je dois vendre ou négocier moi-même ?',
    answer:
      "Non. Ton rôle s'arrête à la mise en relation. Tu présentes le prospect, et c'est Digiqo qui prend en charge l'intégralité du commercial : découverte du besoin, devis, négociation et closing. Tu n'as aucune pression de vente.",
  },
  {
    question: "Avec qui je prends rendez-vous, et quand ?",
    answer:
      "Il y a deux moments à ne pas confondre. **Au démarrage, tu poses un seul RDV avec Maxime** (notre Head of Sales) : il cadre le programme avec toi et te donne quelques arguments de vente. **Ensuite, pour chaque prospect, tu cales un RDV entre lui et notre équipe commerciale** : c'est ton prospect qui rencontre Digiqo, tu n'as pas besoin d'être présent. C'est cette mise en relation qui attribue l'apport à ton nom et évite tout doublon — tu n'as jamais à vendre ni à négocier toi-même.",
  },
  {
    question: 'Comment la commission de 5% est-elle calculée ?',
    answer:
      "Tu touches 5% HT sur chaque facture HT réellement encaissée par Digiqo pour le client que tu as apporté, pendant les 12 mois battants à partir de la date de sa première facture (et non à partir de la mise en relation). Il n'y a pas de montant minimum de commande.",
  },
  {
    question: 'Quels produits sont éligibles ?',
    answer:
      "Deux catégories :\n• **Sites web** (sur devis) : site internet vitrine clé en main et boutique en ligne sur mesure.\n• **Publicité en ligne** : toutes les formules à l'exception de l'Initiation Mensuelle.",
  },
  {
    question: 'Quand suis-je payé ?',
    answer:
      "Au fur et à mesure : ta commission est due sur chaque facture du client encaissée par Digiqo pendant les 12 premiers mois après sa conversion. Tant qu'une facture n'est pas encaissée, la part correspondante n'est pas déclenchée. Si aucune facture n'est émise dans les 12 mois suivant l'introduction, la commission est nulle.",
  },
  {
    question: 'Faut-il un SIRET pour percevoir une commission ?',
    answer:
      "Oui. Pour percevoir une commission, tu dois disposer d'un SIRET valide. Ce point est vérifié avec Maxime lors du premier rendez-vous.",
  },
  {
    question: 'Combien de prospects puis-je apporter ?',
    answer:
      "Autant que tu veux. Chaque prospect que tu présentes à notre équipe commerciale et qui aboutit à une commande éligible ouvre droit à ta commission de 5% HT.",
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
        "Deviens apporteur d'affaires Digiqo : présente des prospects de ton réseau et touche 5% HT sur les 12 premiers mois après conversion du client. Digiqo gère tout le commercial.",
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
        description="Deviens apporteur d'affaires Digiqo : présente des prospects de ton réseau et touche 5% HT sur les 12 premiers mois après conversion du client. Tu présentes, Digiqo gère tout le commercial."
        keywords="apporteur d'affaires digiqo, programme partenaire réunion, commission apporteur, recommandation client agence digitale, partenaire digiqo"
        url="https://digiqo.fr/apporteur"
        structuredData={apporteurStructuredData}
      />

      <HeaderLuxury />

      <main>
        {/* Hero — composant partagé ServiceHero, identique aux pages services */}
        <ServiceHero
          icon={Handshake}
          title={{
            line1: 'Recommande Digiqo,',
            line2: 'touche 5%',
          }}
          subtitle="Présente à Digiqo une entreprise de ton réseau qui a besoin d'un site web ou de publicité en ligne. Tu ne fais pas le closing : touche 5% HT sur les 12 premiers mois après conversion du client."
          ctaButtons={{
            primary: {
              text: 'Poser un RDV avec Maxime',
              href: RDV_MAXIME_URL,
            },
            secondary: {
              text: 'Voir les offres éligibles',
              href: '#offres',
            },
          }}
          gradientFrom="from-digiqo-accent"
          gradientTo="to-amber-400"
        />

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
                Deux catégories de produits ouvrent droit à ta commission
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
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-1.5 text-[13px] font-bold text-white shadow-md shadow-emerald-600/30">
                          <Wallet className="w-3.5 h-3.5" />
                          {product.commission}
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
                      className="border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-3 font-semibold text-digiqo-black">
                          <CheckCircle className="w-5 h-5 text-digiqo-secondary flex-shrink-0" />
                          {product.name}
                        </span>
                        <span className="text-digiqo-secondary font-bold whitespace-nowrap">
                          {product.price}
                        </span>
                      </div>
                      <div className="ml-8 mt-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-1.5 text-[13px] font-bold text-white shadow-md shadow-emerald-600/30">
                          <Wallet className="w-3.5 h-3.5" />
                          {product.commission}
                          {product.commissionNote && (
                            <span className="font-medium text-white/80">
                              ({product.commissionNote})
                            </span>
                          )}
                        </span>
                      </div>
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
              Côté publicité en ligne, toutes les formules sont éligibles à
              l'exception de l'Initiation Mensuelle.
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
                Aucune zone grise&nbsp;: voici exactement comment tu es rémunéré
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
                La première étape est de poser ton RDV de démarrage avec Maxime,
                notre Head of Sales. Il t'explique le programme et te donne tes
                premiers arguments de vente.
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
                  href="tel:+262693659545"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-digiqo-primary transition-all duration-300"
                >
                  📱 Maxime&nbsp;: +262 693 65 95 45
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
