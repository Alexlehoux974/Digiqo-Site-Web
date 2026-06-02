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
  Shield,
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

interface Formula {
  id: string
  name: string
  subtitle: string
  price: {
    shortTerm: string
    annual: string
    originalAnnual: string
  }
  billingPeriod: string
  highlights: { icon: any; text: string | React.ReactNode }[]
  includesFormula?: string
  gradient: string
  accentColor: string
  icon: any
  bonus: {
    title: string
    items: string[]
  } | null
  paymentLinkShortTerm: string
  paymentLinkAnnual: string
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
    title: 'Reporting mensuel',
    description: "Un reporting mensuel en contact direct avec votre expert attitré pour suivre vos performances",
    highlight: 'Expert dédié',
  },
  {
    icon: Video,
    title: 'Vidéos publicitaires premium',
    description: 'Tarif préférentiel exclusif pour les clients abonnés en publicité en ligne',
    highlight: '300€ au lieu de 549€',
  },
  {
    icon: Shield,
    title: 'Sans Engagement',
    description: 'Contrats flexibles, vous restez libre de vos choix à tout moment',
    highlight: 'Liberté totale',
  },
  {
    icon: Award,
    title: 'Experts Certifiés',
    description: 'Équipe certifiée avec accès aux dernières innovations publicitaires',
    highlight: 'Meta / Google / TikTok',
  },
]

export default function FormulesSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const formulas: Formula[] = [
    {
      id: 'formula-initiation',
      name: 'INITIATION',
      subtitle: 'Faites-vous connaître',
      price: { shortTerm: '550,00 €', annual: '5 610,00 €', originalAnnual: '6 600,00 €' },
      billingPeriod: '/mois',
      highlights: [
        { icon: Megaphone, text: 'Campagne de Notoriété et de Considération' },
        { icon: Monitor, text: 'Plateforme de diffusion au choix : META (Facebook & Instagram) ou TikTok ou Google Ads' },
        { icon: Coins, text: "Jusqu'à 2 500€ de budget publicitaire géré/mois" },
        { icon: Palette, text: '3 visuels publicitaires (statiques et/ou dynamiques) inclus/mois (non cumulables)' },
        { icon: Lightbulb, text: 'Création & ciblage stratégique des campagnes' },
        { icon: Settings, text: 'Optimisation des performances' },
        { icon: BarChart3, text: 'Reporting mensuel' },
        { icon: FolderOpen, text: 'Espace collaboratif : Google Chat + Drive' },
        { icon: Key, text: <span>Installation des pixels &amp; API — incluse (si site web développé par Digiqo<sup>1</sup>)</span> },
      ],
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: '#10B981',
      icon: Target,
      bonus: isAnnual ? { title: 'Offre promotionnelle', items: ['1 vidéo offerte'] } : null,
      paymentLinkShortTerm: 'https://payments-eu1.hubspot.com/payments/9QqvwjS4d?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://payments-eu1.hubspot.com/payments/FXp6sywrCqpx?referrer=PAYMENT_LINK',
    },
    {
      id: 'formula-propulsion',
      name: 'PROPULSION',
      subtitle: 'Convertissez vos audiences',
      price: { shortTerm: '2 250,00 €', annual: '7 650,00 €', originalAnnual: '9 000,00 €' },
      billingPeriod: '/trimestre',
      includesFormula: 'INITIATION',
      highlights: [
        { icon: Crosshair, text: 'Campagne de Conversion — Monocanal' },
        { icon: Palette, text: '6 visuels publicitaires inclus/mois (au lieu de 3)' },
        { icon: Users, text: 'Exploitation des audiences similaires' },
        { icon: BarChart3, text: <span>Dashboard de gestion et de reporting personnalisé — <a href="https://app-digiqo.fr/demo" target="_blank" rel="noopener noreferrer" className="text-digiqo-secondary underline hover:text-digiqo-secondary-dark">app-digiqo.fr</a></span> },
      ],
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: '#3B82F6',
      icon: Zap,
      bonus: isAnnual ? { title: 'Offre promotionnelle', items: ['1 vidéo offerte'] } : null,
      paymentLinkShortTerm: 'https://payments-eu1.hubspot.com/payments/hvKD4PsM?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://payments-eu1.hubspot.com/payments/JCJGmsRC?referrer=PAYMENT_LINK',
      bestValue: true,
    },
    {
      id: 'formula-expansion',
      name: 'EXPANSION',
      subtitle: 'Dominez votre marché',
      price: { shortTerm: '3 250,00 €', annual: '11 050,00 €', originalAnnual: '13 000,00 €' },
      billingPeriod: '/trimestre',
      includesFormula: 'PROPULSION',
      highlights: [
        { icon: Crosshair, text: 'Campagne de Conversion — Multicanal' },
        { icon: Monitor, text: '2 plateformes de diffusion : SMA (META ou TikTok) + SEA (Google Ads)' },
        { icon: Palette, text: '9 visuels publicitaires inclus/mois (au lieu de 6)' },
        { icon: BarChart3, text: <span>Dashboard de gestion et de reporting personnalisé — <a href="https://app-digiqo.fr/demo" target="_blank" rel="noopener noreferrer" className="text-digiqo-secondary underline hover:text-digiqo-secondary-dark">app-digiqo.fr</a></span> },
      ],
      gradient: 'from-purple-500 to-pink-600',
      accentColor: '#A855F7',
      icon: Rocket,
      bonus: { title: 'Offre promotionnelle', items: isAnnual ? ['3 vidéos offertes'] : ['1 vidéo offerte à la souscription'] },
      paymentLinkShortTerm: 'https://payments-eu1.hubspot.com/payments/qgwyN9Hj4W7hK?referrer=PAYMENT_LINK',
      paymentLinkAnnual: 'https://payments-eu1.hubspot.com/payments/KwTYqpVjwVK26?referrer=PAYMENT_LINK',
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

          {/* Toggle Sans engagement/Annuel */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg font-semibold transition-colors ${!isAnnual ? 'text-digiqo-primary' : 'text-gray-500'}`}>
              Sans engagement
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              aria-label={isAnnual ? 'Tarification annuelle activée — basculer sur sans engagement' : 'Tarification sans engagement activée — basculer sur annuel'}
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
                  animate={{ opacity: [1, 0.7, 1], scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                >
                  -15%
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Formula Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
          {formulas.map((formula, index) => (
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

                <div className="p-4 sm:p-8 flex flex-col flex-grow">
                  <div className="text-center mb-6">
                    {isAnnual && (
                      <p className="text-lg text-gray-400 line-through mb-1">
                        {formula.price.originalAnnual.replace(' €', '')} € HT
                      </p>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl sm:text-5xl font-bold" style={{ color: formula.accentColor }}>
                        {isAnnual ? formula.price.annual.split(',')[0] : formula.price.shortTerm.split(',')[0]}
                      </span>
                      <span className="text-3xl font-bold" style={{ color: formula.accentColor }}>
                        {isAnnual ? ',' + (formula.price.annual.split(',')[1] || '00') : ',' + (formula.price.shortTerm.split(',')[1] || '00')}
                      </span>
                      <span className="text-2xl font-semibold text-gray-600 ml-1">HT</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 font-medium h-5">
                      {isAnnual ? 'PAR AN' : `PAR ${formula.billingPeriod === '/mois' ? 'MOIS' : 'TRIMESTRE'}`}
                    </p>
                    {isAnnual && (
                      <motion.span
                        animate={{ opacity: [1, 0.7, 1], scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="inline-block mt-2 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 rounded-full"
                      >
                        -15% de réduction
                      </motion.span>
                    )}
                    {!isAnnual && <p className="text-xs text-gray-500 mt-1">Sans engagement</p>}
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
                      {formula.bonus && (
                        <>
                          <p className="text-sm font-semibold mb-2 flex items-center gap-1.5" style={{ color: formula.accentColor }}>
                            <Gift aria-hidden="true" className="w-4 h-4" />
                            {formula.bonus.title}
                          </p>
                          {formula.bonus.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Gift aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: formula.accentColor }} />
                              <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <motion.a
                      href={isAnnual ? formula.paymentLinkAnnual : formula.paymentLinkShortTerm}
                      target="_blank"
                      rel="noopener noreferrer"
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
          ))}
        </div>

        <p className="mt-10 max-w-4xl mx-auto text-xs text-gray-500 italic leading-relaxed text-center px-2">
          <sup>1</sup> L'installation des pixels Meta + API CAPI est incluse dans toutes nos formules SMA si le site web a été développé par Digiqo. Pour les sites web tiers, cette prestation n'est temporairement pas proposée — elle sera disponible en option payante (sur devis) dès finalisation du process scalable courant 2026.
        </p>
      </div>
    </section>
  )
}
