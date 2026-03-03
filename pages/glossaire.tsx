import { useState, useMemo } from 'react'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Search, MessageSquare, BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Term {
  term: string
  acronym?: string
  definition: string
  practice: string
}

interface Category {
  id: string
  label: string
  emoji: string
  terms: Term[]
}

// ─── Données du glossaire ─────────────────────────────────────────────────────

const glossaryData: Category[] = [
  {
    id: 'pub-ligne',
    label: 'Publicité en ligne et objectifs',
    emoji: '🎯',
    terms: [
      {
        term: 'Budget publicitaire',
        definition: "Le montant alloué à la diffusion de vos publicités sur les plateformes, distinct des honoraires de gestion.",
        practice: "Chez Digiqo, nous définissons le budget publicitaire avec vous lors de l'onboarding. Il est intégralement reversé aux plateformes (Meta, Google…) et n'inclut pas les frais de gestion Digiqo.",
      },
      {
        term: 'Campagne',
        definition: "L'unité de base d'organisation de la publicité en ligne, regroupant des groupes d'annonces autour d'un objectif commun (notoriété, trafic, conversion).",
        practice: "Chaque client SMA dispose de campagnes dédiées par objectif. Nous créons, optimisons et monitornons les campagnes en continu.",
      },
      {
        term: "Groupe d'annonces",
        acronym: 'Ensemble de publicités',
        definition: "Un sous-ensemble d'une campagne qui regroupe plusieurs publicités ciblant une même audience. Appelé « Ensemble de publicités » sur Meta.",
        practice: "Nous structurons les groupes d'annonces pour tester différents ciblages et créatifs en parallèle, et identifier rapidement ce qui performe.",
      },
      {
        term: 'Audience',
        definition: "L'ensemble des personnes susceptibles de voir vos publicités, définies selon des critères précis (âge, localisation, intérêts, comportements).",
        practice: "Nous construisons des audiences personnalisées (clients existants, visiteurs du site, lookalikes) et des audiences larges pour maximiser la pertinence et le volume.",
      },
      {
        term: 'Ciblage',
        definition: "Le processus de sélection des critères (géographiques, démographiques, comportementaux) pour atteindre les bonnes personnes avec vos publicités.",
        practice: "Digiqo affine le ciblage en continu selon les performances observées. Un bon ciblage est déterminant pour réduire le coût par lead.",
      },
      {
        term: 'Notoriété',
        definition: "Un objectif publicitaire visant à faire connaître votre marque au plus grand nombre de personnes possible.",
        practice: "Les campagnes de notoriété sont recommandées pour les nouveaux clients qui lancent ou relancent une activité. Elles préparent le terrain pour des campagnes de conversion.",
      },
      {
        term: 'Trafic',
        definition: "Un objectif publicitaire visant à générer des visites qualifiées sur votre site web, votre page de vente ou votre landing page.",
        practice: "Cet objectif est recommandé pour les clients disposant d'un site e-commerce ou d'une landing page bien optimisée pour convertir.",
      },
      {
        term: 'Conversion',
        definition: "Un objectif publicitaire visant à inciter l'internaute à accomplir une action précise : achat, remplissage de formulaire, appel, etc.",
        practice: "C'est l'objectif le plus fréquemment utilisé dans nos offres SMA. Il nécessite un Pixel ou une Conversions API correctement configurés.",
      },
      {
        term: 'Landing page',
        definition: "Une page web dédiée, conçue spécifiquement pour accueillir les visiteurs venant d'une publicité et les inciter à passer à l'action.",
        practice: "Nous conseillons toujours une landing page dédiée plutôt que la page d'accueil du site. Une bonne landing page améliore significativement le taux de conversion.",
      },
    ],
  },
  {
    id: 'meta-sea',
    label: 'Meta et SEA',
    emoji: '📣',
    terms: [
      {
        term: 'SMA',
        acronym: 'Social Media Advertising',
        definition: "La publicité payante diffusée sur les réseaux sociaux : Facebook, Instagram, TikTok, Snapchat, LinkedIn, etc.",
        practice: "C'est la spécialité principale de Digiqo. Nos offres Initiation, Propulsion et Expansion sont toutes structurées autour du SMA.",
      },
      {
        term: 'SEA',
        acronym: 'Search Engine Advertising',
        definition: "La publicité payante diffusée sur les moteurs de recherche, principalement via Google Ads.",
        practice: "Digiqo propose la gestion SEA en complément du SMA pour toucher les internautes en phase de recherche active (intentionnistes).",
      },
      {
        term: 'Publicité Meta',
        definition: "La publicité diffusée sur les plateformes du groupe Meta : Facebook, Instagram, Messenger et Audience Network.",
        practice: "C'est le canal principal de la plupart de nos clients SMA. Les campagnes sont gérées depuis le Meta Business Manager et optimisées en continu.",
      },
      {
        term: 'Google Ads',
        definition: "La régie publicitaire de Google, permettant de diffuser des annonces sur le moteur de recherche Google, YouTube et le réseau display.",
        practice: "Digiqo gère les campagnes Google Ads pour les clients souhaitant combiner SEA et SMA, ou cibler des internautes en intention d'achat.",
      },
      {
        term: 'CPC',
        acronym: 'Coût Par Clic',
        definition: "Le montant payé à chaque fois qu'un internaute clique sur votre publicité.",
        practice: "Nous surveillons le CPC pour évaluer l'efficacité des créatifs et du ciblage. Un CPC élevé peut indiquer un manque de pertinence de l'annonce.",
      },
      {
        term: 'CPM',
        acronym: 'Coût Pour Mille impressions',
        definition: "Le montant payé pour 1 000 affichages de votre publicité, indépendamment des clics.",
        practice: "Un CPM élevé peut signaler une audience très concurrentielle ou des créatifs peu engageants. Nous l'analysons en corrélation avec le CTR.",
      },
      {
        term: 'CTR',
        acronym: 'Click-Through Rate – Taux de clic',
        definition: "Le pourcentage de personnes ayant cliqué sur une publicité par rapport au nombre de fois où elle a été affichée.",
        practice: "Un CTR élevé indique un créatif et un message pertinents. Nous comparons les CTR entre les variantes pour identifier les visuels et accroches les plus performants.",
      },
      {
        term: 'ROAS',
        acronym: 'Return On Ad Spend – Retour sur dépenses publicitaires',
        definition: "Le revenu généré pour chaque euro investi en publicité. ROAS = Revenus / Dépenses publicitaires.",
        practice: "Pour les clients e-commerce, nous visons généralement un ROAS minimum de 3 à 5 selon le secteur. Cet indicateur guide nos décisions d'optimisation et de scaling.",
      },
    ],
  },
  {
    id: 'tracking',
    label: 'Tracking et mesure',
    emoji: '📊',
    terms: [
      {
        term: 'Pixel',
        definition: "Un code JavaScript installé sur votre site web qui remonte les actions des visiteurs vers la plateforme publicitaire (achats, formulaires, clics…).",
        practice: "L'installation du Pixel est obligatoire avant le lancement de toute campagne de conversion chez Digiqo. Nous nous en chargeons lors de l'onboarding.",
      },
      {
        term: 'Conversions API',
        acronym: 'CAPI',
        definition: "Un système qui remonte les données de conversion directement depuis votre serveur vers la plateforme publicitaire, en complément du Pixel navigateur.",
        practice: "Nous recommandons la CAPI pour sécuriser le tracking face aux restrictions des navigateurs sur les cookies tiers. Cela améliore la qualité des données et l'optimisation algorithmique.",
      },
      {
        term: 'GA4',
        acronym: 'Google Analytics 4',
        definition: "L'outil d'analyse d'audience de Google, permettant de mesurer le comportement des visiteurs sur votre site et de suivre les événements clés.",
        practice: "Digiqo configure GA4 pour suivre les événements importants (soumissions de formulaires, achats, clics CTA) et croiser ces données avec les performances publicitaires.",
      },
      {
        term: 'Google Tag Manager',
        acronym: 'GTM',
        definition: "Un outil qui permet de gérer et déployer facilement des balises de tracking sur un site web sans modifier directement le code source.",
        practice: "Digiqo utilise GTM pour centraliser le déploiement du Pixel Meta, de GA4 et d'autres scripts de suivi. Cela simplifie la maintenance et réduit les erreurs.",
      },
      {
        term: 'Tracking',
        definition: "L'ensemble des outils et configurations mis en place pour mesurer les performances publicitaires et le comportement des utilisateurs.",
        practice: "Un tracking bien configuré est la condition sine qua non d'une optimisation efficace. Chez Digiqo, nous vérifions systématiquement la qualité du tracking avant tout lancement.",
      },
      {
        term: 'Coût par lead',
        acronym: 'CPL',
        definition: "Le montant dépensé en publicité pour obtenir un lead (contact qualifié ayant laissé ses coordonnées).",
        practice: "C'est l'un des KPIs centraux dans nos rapports mensuels pour les clients orientés génération de contacts. Nous l'optimisons en jouant sur les créatifs, le ciblage et la landing page.",
      },
    ],
  },
  {
    id: 'creation',
    label: 'Création et contenus',
    emoji: '🎨',
    terms: [
      {
        term: 'Créatif fixe',
        definition: "Un visuel image réalisé par nos graphistes ou via IA, livré prêt à diffuser en publicité. Il n'inclut ni vidéo, ni animation.",
        practice: "Les créatifs fixes sont inclus dans nos offres SMA selon les paliers (ex. : 2 visuels/mois en Initiation). Ils sont livrés aux formats requis par la plateforme.",
      },
      {
        term: 'Créatif dynamique',
        definition: "Une vidéo publicitaire courte réalisée par nos graphistes ou via IA, sans tournage. Elle intègre animations, transitions et texte animé, et est livrée prête à diffuser.",
        practice: "À ne pas confondre avec la production vidéo : aucun déplacement ni tournage n'est nécessaire. Le créatif dynamique est produit 100% en studio ou par IA à partir de vos assets.",
      },
      {
        term: 'Production vidéo',
        definition: "Une prestation distincte incluant un tournage physique et un montage, réalisés par une société de production qui se déplace sur site. Prestation payante, à distinguer du créatif dynamique.",
        practice: "Si vous souhaitez un film d'entreprise, un reportage ou des interviews avec caméra sur site, il s'agit d'une production vidéo — à chiffrer séparément de l'abonnement SMA et confiée à un prestataire externe.",
      },
      {
        term: 'Visuels inclus',
        definition: "Les créatifs (fixes ou dynamiques) fournis par Digiqo dans le cadre de l'abonnement SMA, sans facturation supplémentaire.",
        practice: "Le nombre de visuels inclus varie selon l'offre souscrite : Initiation, Propulsion ou Expansion. Les visuels supplémentaires sont facturables en option.",
      },
    ],
  },
  {
    id: 'offres',
    label: 'Offres Digiqo',
    emoji: '🚀',
    terms: [
      {
        term: 'Offre Initiation',
        definition: "La formule d'entrée de gamme SMA de Digiqo, idéale pour les entreprises qui démarrent la publicité en ligne.",
        practice: "Inclut la gestion d'un canal publicitaire, des créatifs fixes mensuels et un reporting. Parfait pour tester et valider une première stratégie publicitaire.",
      },
      {
        term: 'Offre Propulsion',
        definition: "La formule intermédiaire SMA, pour les entreprises souhaitant accélérer leur croissance sur plusieurs canaux publicitaires.",
        practice: "Inclut plusieurs canaux, davantage de créatifs, un suivi renforcé et des optimisations plus fréquentes. Recommandée pour les entreprises avec des résultats initiaux à amplifier.",
      },
      {
        term: 'Offre Expansion',
        definition: "La formule premium SMA de Digiqo, pour les entreprises avec des ambitions de croissance forte et une stratégie multi-canal avancée.",
        practice: "Inclut tous les canaux disponibles, un volume élevé de créatifs, un accompagnement stratégique complet et un interlocuteur dédié.",
      },
      {
        term: 'Abonnement SMA',
        definition: "Le modèle contractuel mensuel par lequel Digiqo prend en charge la création, la gestion et l'optimisation de vos campagnes publicitaires.",
        practice: "L'abonnement se renouvelle automatiquement chaque mois. Il peut être mis en pause ou résilié selon les conditions de nos CGV.",
      },
      {
        term: 'Mise en pause',
        definition: "La suspension temporaire de votre abonnement SMA, sans résiliation définitive. Vos configurations et historiques de campagnes sont conservés.",
        practice: "La mise en pause permet de stopper les services pour une période donnée (congés, saisonnalité…) sans perdre votre compte et sans recommencer de zéro à la reprise.",
      },
      {
        term: 'Résiliation',
        definition: "La fin définitive de votre abonnement SMA. Elle met un terme au contrat de gestion des campagnes publicitaires par Digiqo.",
        practice: "Une demande de résiliation doit être soumise via le formulaire dédié sur digiqo.fr/desabonnement, conformément à nos CGV. La résiliation prend effet à la fin de la période en cours.",
      },
      {
        term: 'Cycle de vie SMA',
        definition: "Les différentes phases que traverse un client SMA, depuis la signature jusqu'à la résiliation ou la montée en gamme.",
        practice: "Chez Digiqo, le cycle comprend : onboarding → phase de test → optimisation continue → reporting mensuel → éventuellement mise en pause ou résiliation, ou montée vers une offre supérieure.",
      },
    ],
  },
  {
    id: 'vocab',
    label: 'Vocabulaire commercial',
    emoji: '💼',
    terms: [
      {
        term: 'Lead',
        definition: "Un contact qualifié qui a manifesté un intérêt concret pour votre offre en laissant ses coordonnées (via formulaire, appel, message).",
        practice: "Dans nos rapports mensuels, nous indiquons le nombre de leads générés et le coût par lead (CPL) pour chaque campagne.",
      },
      {
        term: 'Prospect',
        definition: "Une personne ou entreprise identifiée comme potentiellement intéressée par vos produits ou services, mais n'ayant pas encore pris contact.",
        practice: "On parle de prospect avant qu'il devienne lead. La publicité digitale permet de cibler des prospects qualifiés à grande échelle.",
      },
      {
        term: 'Client',
        definition: "Une personne ou entreprise qui a déjà acheté ou souscrit à vos produits ou services.",
        practice: "Le tunnel Notoriété → Prospect → Lead → Client est le fil directeur de notre stratégie SMA. Nous construisons des audiences «clients» pour exclure ou recibler selon l'objectif.",
      },
    ],
  },
]

// ─── Composant terme ──────────────────────────────────────────────────────────

function TermCard({ term, acronym, definition, practice }: Term) {
  const termId = term.toLowerCase().replace(/[^a-z0-9]/g, '-')
  return (
    <div id={termId} className="scroll-mt-24 border-b border-gray-100 last:border-0 py-6">
      <div className="flex flex-wrap items-baseline gap-2 mb-2">
        <h3 className="text-lg font-bold text-digiqo-primary">{term}</h3>
        {acronym && (
          <span className="text-sm text-digiqo-secondary font-medium bg-digiqo-secondary/10 px-2 py-0.5 rounded-full">
            {acronym}
          </span>
        )}
      </div>
      <p className="text-gray-700 mb-3 leading-relaxed">{definition}</p>
      <div className="flex items-start gap-2 bg-digiqo-primary/5 border-l-4 border-digiqo-primary rounded-r-lg px-4 py-3">
        <span className="text-digiqo-primary font-semibold text-sm whitespace-nowrap mt-0.5">En pratique :</span>
        <p className="text-gray-600 text-sm leading-relaxed">{practice}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Glossaire() {
  const [search, setSearch] = useState('')

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if (!q) return glossaryData
    return glossaryData
      .map(cat => ({
        ...cat,
        terms: cat.terms.filter(t => {
          const haystack = [t.term, t.acronym ?? '', t.definition, t.practice]
            .join(' ')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
          return haystack.includes(q)
        }),
      }))
      .filter(cat => cat.terms.length > 0)
  }, [search])

  const totalTerms = glossaryData.reduce((acc, cat) => acc + cat.terms.length, 0)

  return (
    <>
      <SEO
        title="Glossaire Digiqo – Lexique du marketing digital"
        description="Retrouvez toutes les définitions des termes utilisés par Digiqo : SMA, SEA, ROAS, CPL, Pixel, créatif fixe, créatif dynamique… Pour que clients et équipes parlent le même langage."
        keywords="glossaire marketing digital, lexique SMA, définitions publicité en ligne, ROAS, CPL, CPC, Meta Ads, Google Ads, Digiqo"
        url="https://digiqo.fr/glossaire"
      />

      <HeaderLuxury />

      <main className="min-h-screen bg-gray-50 pt-24">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-4 py-1.5 rounded-full mb-6">
                <BookOpen className="w-4 h-4" />
                {totalTerms} termes définis
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-5">
                Glossaire Digiqo
              </h1>
              <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Cette page définit les termes utilisés par Digiqo — sur le site, dans les devis et lors de nos échanges.
                Pour que clients et équipes parlent exactement le même langage.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">

          {/* ── Barre de recherche ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="relative mb-10"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un terme… (ex. : ROAS, Pixel, Créatif)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-digiqo-primary/30 focus:border-digiqo-primary transition-all text-base"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                Effacer
              </button>
            )}
          </motion.div>

          {/* ── Sommaire (masqué si recherche active) ── */}
          {!search && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-10"
              aria-label="Sommaire du glossaire"
            >
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Sommaire</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {glossaryData.map(cat => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-digiqo-primary transition-colors group text-sm py-1"
                  >
                    <span>{cat.emoji}</span>
                    <span className="group-hover:underline">{cat.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-digiqo-primary ml-auto" />
                  </a>
                ))}
              </div>
            </motion.nav>
          )}

          {/* ── Résultats de recherche ── */}
          {search && filteredCategories.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <Search className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">Aucun terme trouvé pour «&nbsp;{search}&nbsp;»</p>
              <p className="text-sm mt-1">Vous pouvez nous suggérer ce terme via le lien en bas de page.</p>
            </div>
          )}

          {/* ── Catégories et termes ── */}
          <div className="space-y-10">
            {filteredCategories.map((cat, i) => (
              <motion.section
                key={cat.id}
                id={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="scroll-mt-24 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <span className="text-2xl">{cat.emoji}</span>
                  <h2 className="text-lg font-bold text-digiqo-primary">{cat.label}</h2>
                  <span className="ml-auto text-xs text-gray-400 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                    {cat.terms.length} terme{cat.terms.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="px-6">
                  {cat.terms.map(term => (
                    <TermCard key={term.term} {...term} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* ── Bloc "Vous ne trouvez pas un terme ?" ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-14 bg-digiqo-primary rounded-xl p-8 text-white text-center"
          >
            <MessageSquare className="w-10 h-10 mx-auto mb-3 text-white/70" />
            <h2 className="text-xl font-bold mb-2">Vous ne trouvez pas un terme ?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
              Ce glossaire est amené à évoluer. Si un terme utilisé dans vos échanges avec Digiqo n'y figure pas,
              signalez-le nous — nous l'ajouterons rapidement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-digiqo-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors shadow"
            >
              Suggérer un terme
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </main>

      <Footer />
    </>
  )
}
