import { m as motion } from 'framer-motion'
import { ANIMATION } from '@/lib/animation-constants'

const clientResults = [
  {
    client: 'E-commerce',
    metric: 'Campagnes',
    detail: 'de visibilité immédiate',
    period: 'Search, Shopping & Social Ads',
    testimonial: 'Ciblage précis de votre audience sur tous les canaux',
  },
  {
    client: 'Services Locaux',
    metric: 'Géo-ciblage',
    detail: 'La Réunion & alentours',
    period: 'Stratégie locale multicanal',
    testimonial: 'Touchez vos clients réunionnais au bon moment',
  },
  {
    client: 'B2B & Prestations',
    metric: 'Leads',
    detail: 'qualifiés ciblés',
    period: 'Budget optimisé SMA + SEA',
    testimonial: 'Maximisez votre budget publicitaire',
  },
]

export default function ClientResultsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          {...ANIMATION.entry.fadeInUp}
          whileInView={ANIMATION.entry.fadeInUp.animate}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Des campagnes adaptées
            <span className="bg-gradient-to-r from-digiqo-accent to-amber-400 bg-clip-text text-transparent"> à vos besoins</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Découvrez nos solutions publicitaires pour tous types d'activités à La Réunion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {clientResults.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-sm font-semibold text-digiqo-accent mb-2">
                {result.client}
              </div>
              <div className="text-3xl sm:text-5xl font-bold text-white mb-2">
                {result.metric}
              </div>
              <div className="text-lg text-white/90 mb-1">
                {result.detail}
              </div>
              <div className="text-sm text-white/70 mb-6">
                {result.period}
              </div>
              <div className="pt-6 border-t border-white/20">
                <p className="text-white/80 italic">
                  &ldquo;{result.testimonial}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
