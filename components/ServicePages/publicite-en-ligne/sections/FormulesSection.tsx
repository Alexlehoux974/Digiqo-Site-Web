import { useState } from 'react'
import { m as motion } from 'framer-motion'
import {
  Target,
  Palette,
  BarChart3,
  ArrowUpRight,
  Zap,
  Users,
  Rocket,
  Video,
  CalendarCheck,
  Award,
  Monitor,
  Coins,
  Settings,
  FolderOpen,
  Lightbulb,
  Gift,
  Megaphone,
  Crosshair,
  TrendingUp,
  Key,
} from 'lucide-react'
import { ANIMATION } from '@/lib/animation-constants'
import { generateContactUrl } from '@/lib/contact-utils'

/** Durées d'accompagnement proposées, en mois. */
type DurationKey = '3' | '12'

interface Duration {
  key: DurationKey
  label: string
  /** Libellé affiché sous le prix sur chaque carte. */
  priceLabel: string
  /** Badge de remise affiché sur la carte, absent pour la durée de référence. */
  savingBadge: string | null
  /** Phrase commerciale affichée sous le sélecteur de durée. */
  pitch: string
}

const DURATIONS: Duration[] = [
  {
    key: '3',
    label: '3 mois',
    priceLabel: 'POUR 3 MOIS',
    savingBadge: null,
    pitch: "Durée minimale d'accompagnement, réglée à la commande.",
  },
  {
    key: '12',
    label: '12 mois',
    priceLabel: 'POUR 12 MOIS',
    savingBadge: '-15 %',
    pitch: '15 % de remise par rapport au tarif 3 mois.',
  },
]

interface Bonus {
  title: string
  items: (string | React.ReactNode)[]
}

interface Formula {
  id: string
  name: string
  subtitle: string
  /** Prix HT par durée souscrite, payables à la commande. */
  prices: Record<DurationKey, string>
  /** Tarif de référence barré : prix 3 mois multiplié par le nombre de trimestres. */
  referencePrices: Partial<Record<DurationKey, string>>
  highlights: { icon: any; text: string | React.ReactNode }[]
  includesFormula?: string
  gradient: string
  accentColor: string
  icon: any
  bonus: Partial<Record<DurationKey, Bonus>>
  /** Clé de pré-remplissage du formulaire de contact (voir lib/service-mappings). */
  contactFormula: string
  bestValue?: boolean
  isMulticanal?: boolean
}

// Re-export for outer references
export const quickWins = [
  {
    icon: Target,
    title: 'Ciblage précis',
    description: "Touchez exactement votre audience idéale à La Réunion grâce à nos techniques de ciblage avancées",
    highlight: '+86% de précision',
  },
  {
    icon: TrendingUp,
    title: 'ROI optimisé',
    description: "Chaque euro investi est analysé et optimisé pour maximiser votre retour sur investissement",
    highlight: '3-5x ROI moyen',
  },
  {
    icon: BarChart3,
    title: 'Reporting chaque mois',
    description: "Un point complet chaque mois en contact direct avec votre expert attitré pour suivre vos performances",
    highlight: 'Expert dédié',
  },
  {
    icon: Video,
    title: 'Vidéos publicitaires premium',
    description: 'Tarif préférentiel exclusif pour les clients accompagnés en publicité en ligne',
    highlight: '300€ au lieu de 549€',
  },
  {
    icon: CalendarCheck,
    title: 'Accompagnement 3 mois minimum',
    description: "Le temps nécessaire pour que l'algorithme apprenne et que vos campagnes donnent leur pleine mesure",
    highlight: 'Réglé à la commande',
  },
  {
    icon: Award,
    title: 'Experts Certifiés',
    description: 'Équipe certifiée avec accès aux dernières innovations publicitaires',
    highlight: 'Meta / Google / TikTok',
  },
]

export default function FormulesSection() {
  const [duration, setDuration] = useState<DurationKey>('3')
  const activeDuration = DURATIONS.find(d => d.key === duration) as Duration

  const formulas: Formula[] = [
    {
      id: 'formula-initiation',
      name: 'INITIATION',
      subtitle: 'Faites-vous connaître',
      prices: { '3': '1 650,00 €', '12': '5 610,00 €' },
      referencePrices: { '12': '6 600,00 €' },
      highlights: [
        { icon: Megaphone, text: 'Campagne de Notoriété et de Considération' },
        { icon: Monitor, text: 'Plateforme de diffusion au choix : META (Facebook & Instagram) ou TikTok ou Google Ads' },
        { icon: Coins, text: "Jusqu'à 2 500€ de budget publicitaire géré par mois" },
        { icon: Palette, text: '3 visuels publicitaires statiques inclus par mois (non cumulables)' },
        { icon: Lightbulb, text: 'Création & ciblage stratégique des campagnes' },
        { icon: Settings, text: 'Optimisation des performances' },
        { icon: BarChart3, text: 'Reporting chaque mois' },
        { icon: FolderOpen, text: 'Espace collaboratif : Google Chat + Drive' },
        { icon: Key, text: <span>Installation des pixels &amp; API : incluse (si site web développé par Digiqo<sup>1</sup>)</span> },
      ],
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: '#10B981',
      icon: Target,
      bonus: {
        '12': { title: 'Offre promotionnelle', items: ['1 vidéo offerte'] },
      },
      contactFormula: 'initiation',
    },
    {
      id: 'formula-propulsion',
      name: 'PROPULSION',
      subtitle: 'Convertissez vos audiences',
      prices: { '3': '2 250,00 €', '12': '7 650,00 €' },
      referencePrices: { '12': '9 000,00 €' },
      includesFormula: 'INITIATION',
      highlights: [
        { icon: Crosshair, text: 'Campagne de Conversion : monocanal' },
        { icon: Palette, text: '6 visuels publicitaires inclus par mois (au lieu de 3)' },
        { icon: Users, text: 'Exploitation des audiences similaires' },
        { icon: BarChart3, text: <span>Dashboard de gestion et de reporting personnalisé : <a href="https://app-digiqo.fr/demo" target="_blank" rel="noopener noreferrer" className="text-digiqo-secondary underline hover:text-digiqo-secondary-dark">app-digiqo.fr</a></span> },
      ],
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: '#3B82F6',
      icon: Zap,
      bonus: {
        '3': { title: 'Offre promotionnelle', items: [<a key="video-20" href="/services/creatifs#prod" className="underline hover:text-digiqo-secondary-dark transition-colors">20% de réduction sur la production vidéo de votre choix</a>] },
        '12': { title: 'Offre promotionnelle', items: ['1 vidéo offerte'] },
      },
      contactFormula: 'propulsion',
      bestValue: true,
    },
    {
      id: 'formula-expansion',
      name: 'EXPANSION',
      subtitle: 'Dominez votre marché',
      prices: { '3': '3 250,00 €', '12': '11 050,00 €' },
      referencePrices: { '12': '13 000,00 €' },
      includesFormula: 'PROPULSION',
      highlights: [
        { icon: Crosshair, text: 'Campagne de Conversion : multicanal' },
        { icon: Monitor, text: '2 plateformes de diffusion : SMA (META ou TikTok) + SEA (Google Ads)' },
        { icon: Palette, text: '9 visuels publicitaires inclus par mois (au lieu de 6)' },
        { icon: BarChart3, text: <span>Dashboard de gestion et de reporting personnalisé : <a href="https://app-digiqo.fr/demo" target="_blank" rel="noopener noreferrer" className="text-digiqo-secondary underline hover:text-digiqo-secondary-dark">app-digiqo.fr</a></span> },
      ],
      gradient: 'from-purple-500 to-pink-600',
      accentColor: '#A855F7',
      icon: Rocket,
      bonus: {
        '3': { title: 'Offre promotionnelle', items: ['1 production vidéo offerte à la souscription'] },
        '12': { title: 'Offre promotionnelle', items: ['2 vidéos offertes'] },
      },
      contactFormula: 'expansion',
      isMulticanal: true,
    },
  ]

  return (
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

          {/* Texte de positionnement : pourquoi trois mois minimum. */}
          <p className="text-base sm:text-lg text-digiqo-primary/80 max-w-3xl mx-auto mb-10 leading-relaxed text-left sm:text-center">
            Chez Digiqo, nous ne vendons pas un mois de publicité, nous accompagnons votre
            croissance. Un algorithme publicitaire apprend pendant les premières semaines :
            les résultats se construisent au deuxième et au troisième mois. C'est pour cela
            que nos accompagnements commencent à trois mois, réglés à la commande, comme un
            engagement réciproque.
          </p>

          {/* Sélecteur de durée : 3, 6 ou 12 mois. */}
          <div
            role="group"
            aria-label="Choisir la durée de l'accompagnement"
            className="mx-auto flex w-full max-w-md items-stretch gap-1 rounded-2xl bg-gray-100 p-1.5"
          >
            {DURATIONS.map(d => (
              <button
                key={d.key}
                type="button"
                aria-pressed={duration === d.key}
                onClick={() => setDuration(d.key)}
                className={`flex-1 rounded-xl px-2 py-2.5 text-sm sm:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-digiqo-accent focus-visible:ring-offset-2 ${
                  duration === d.key
                    ? 'bg-white text-digiqo-primary shadow'
                    : 'text-gray-500 hover:text-digiqo-primary'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm sm:text-base font-medium text-digiqo-primary/70">
            {activeDuration.pitch}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Tous les prix sont indiqués hors taxes et payables à la commande.
          </p>
        </motion.div>

        {/* Formula Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {formulas.map((formula, index) => {
            const referencePrice = formula.referencePrices[duration]
            const bonus = formula.bonus[duration]
            const price = formula.prices[duration]
            const contactUrl = generateContactUrl({
              formula: formula.contactFormula,
              description: `Je souhaite souscrire la formule ${formula.name} pour un accompagnement de ${activeDuration.label}, soit ${price} HT payables à la commande.`,
            })

            return (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative h-full ${formula.bestValue ? 'z-10' : 'z-0 hover:z-10'}`}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {formula.bestValue && (
                  <div
                    className="absolute -top-3 -right-2 sm:-right-6 bg-white px-6 py-2 rounded-full text-sm font-bold z-20 shadow-lg transform rotate-12 border-2"
                    style={{ color: formula.accentColor, borderColor: formula.accentColor }}
                  >
                    LE PLUS POPULAIRE
                  </div>
                )}

                {formula.isMulticanal && (
                  <div className={`absolute -top-3 left-4 bg-gradient-to-r ${formula.gradient} text-white px-4 py-1.5 rounded-full text-xs font-bold z-20 shadow-lg`}>
                    SMA + SEA
                  </div>
                )}

                <div
                  className="relative bg-white rounded-2xl shadow-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl"
                  style={formula.bestValue ? { boxShadow: `0 0 0 4px ${formula.accentColor}, 0 25px 50px -12px rgba(0, 0, 0, 0.25)` } : {}}
                >
                  <div className={`p-6 bg-gradient-to-br ${formula.gradient} rounded-t-2xl`}>
                    <h3 className="text-2xl font-bold text-center text-white">{formula.name}</h3>
                    <p className="text-sm text-white/80 text-center mt-1">{formula.subtitle}</p>
                  </div>

                  <div className="p-4 sm:p-8 md:p-4 lg:p-8 flex flex-col flex-grow">
                    <div className="text-center mb-6">
                      {referencePrice && (
                        <p className="text-lg md:text-base lg:text-lg text-gray-400 line-through mb-1 whitespace-nowrap">
                          {referencePrice.replace(' €', '')} € HT
                        </p>
                      )}
                      <div className="flex items-baseline justify-center gap-1 whitespace-nowrap">
                        <span className="text-3xl sm:text-5xl md:text-3xl lg:text-5xl font-bold" style={{ color: formula.accentColor }}>
                          {price.split(',')[0]}
                        </span>
                        <span className="text-3xl md:text-xl lg:text-3xl font-bold" style={{ color: formula.accentColor }}>
                          {',' + (price.split(',')[1] || '00')}
                        </span>
                        <span className="text-2xl md:text-lg lg:text-2xl font-semibold text-gray-600 ml-1">HT</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 font-medium h-5">
                        {activeDuration.priceLabel}
                      </p>
                      {activeDuration.savingBadge && (
                        <motion.span
                          animate={{ opacity: [1, 0.7, 1], scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="inline-block mt-2 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 rounded-full"
                        >
                          {activeDuration.savingBadge}
                        </motion.span>
                      )}
                      <p className="text-xs text-gray-500 mt-2">Payable à la commande</p>
                    </div>

                    {formula.includesFormula && (
                      <div
                        className="mb-4 p-3 rounded-xl text-sm font-semibold text-center"
                        style={{ color: formula.accentColor, backgroundColor: `${formula.accentColor}10` }}
                      >
                        Toute la formule {formula.includesFormula}, plus :
                      </div>
                    )}

                    <div className="space-y-3 mb-6">
                      {formula.highlights.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <feature.icon aria-hidden="true" className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: formula.accentColor }} />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="border-t border-gray-200 pt-4 mb-6 min-h-[80px]">
                        {bonus && (
                          <>
                            <p className="text-sm font-semibold mb-2 flex items-center gap-1.5" style={{ color: formula.accentColor }}>
                              <Gift aria-hidden="true" className="w-4 h-4" />
                              {bonus.title}
                            </p>
                            {bonus.items.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Gift aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: formula.accentColor }} />
                                <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>

                      <motion.a
                        href={contactUrl}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-2xl shadow-lg`}
                      >
                        Choisir cette formule
                        <ArrowUpRight aria-hidden="true" className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-10 max-w-4xl mx-auto text-xs text-gray-500 italic leading-relaxed text-center px-2">
          <sup>1</sup> L'installation des pixels Meta + API CAPI est incluse dans toutes nos formules SMA si le site web a été développé par Digiqo. Pour les sites web tiers, cette prestation n'est temporairement pas proposée : elle sera disponible en option payante (sur devis) dès finalisation du process scalable courant 2026.
        </p>
      </div>
    </section>
  )
}
