import { m as motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { ANIMATION } from '@/lib/animation-constants'
import { generateContactUrl } from '../../../../lib/contact-utils'

export default function CtaFinalSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-accent">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          {...ANIMATION.entry.fadeInUp}
          whileInView={ANIMATION.entry.fadeInUp.animate}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Prêt à booster votre visibilité ?
        </motion.h2>

        <motion.p
          {...ANIMATION.entry.fadeInUp}
          whileInView={ANIMATION.entry.fadeInUp.animate}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/90 mb-8"
        >
          Rejoignez les entreprises réunionnaises qui font confiance à Digiqo
          pour leur publicité en ligne.
        </motion.p>

        <motion.div
          {...ANIMATION.entry.fadeInUp}
          whileInView={ANIMATION.entry.fadeInUp.animate}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href={generateContactUrl({ service: 'publicite' })}
            whileHover={ANIMATION.hover.scale}
            whileTap={ANIMATION.tap.scale}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-primary font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            Demander un devis gratuit
            <ArrowRight aria-hidden="true" className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="tel:+262262025102"
            whileHover={ANIMATION.hover.scale}
            whileTap={ANIMATION.tap.scale}
            className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-primary text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <Phone aria-hidden="true" className="w-5 h-5" />
            02 62 02 51 02
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
