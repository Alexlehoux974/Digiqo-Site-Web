import { m as motion } from 'framer-motion'
import { AlertCircle, Check } from 'lucide-react'
import { ANIMATION } from '@/lib/animation-constants'

const risks = [
  'Invisibilité sur les recherches et les réseaux sociaux',
  'Perte de parts de marché face aux concurrents à La Réunion',
  'Croissance lente et opportunités manquées',
  'Dépendance au bouche-à-oreille uniquement',
  "Difficulté à mesurer l'efficacité de vos actions marketing",
]

const solutions = [
  'Visibilité sur Google et les réseaux sociaux à La Réunion',
  'Leads qualifiés qui cherchent activement vos services',
  'Suivi détaillé de vos performances publicitaires',
  'Contrôle total sur votre budget et ciblage',
  'Stratégie multicanal évolutive selon vos objectifs',
]

export default function WhySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-digiqo-accent/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-digiqo-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          {...ANIMATION.entry.fadeInUp}
          whileInView={ANIMATION.entry.fadeInUp.animate}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Pourquoi investir dans la
            <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent"> publicité en ligne ?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            92% des consommateurs utilisent Internet pour trouver des entreprises locales à La Réunion.
            Sans présence publicitaire, vous laissez vos concurrents capter vos clients potentiels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            {...ANIMATION.entry.fadeInLeft}
            whileInView={ANIMATION.entry.fadeInLeft.animate}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-digiqo-primary mb-6">
              Sans publicité en ligne, vous risquez :
            </h3>
            {risks.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100"
              >
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle aria-hidden="true" className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-gray-700">{risk}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            {...ANIMATION.entry.fadeInRight}
            whileInView={ANIMATION.entry.fadeInRight.animate}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-digiqo-accent mb-6">
              Avec Digiqo, vous obtenez :
            </h3>
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100"
              >
                <div className="p-2 bg-green-100 rounded-lg">
                  <Check aria-hidden="true" className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{solution}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
