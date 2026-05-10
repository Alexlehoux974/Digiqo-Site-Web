import { m as motion } from 'framer-motion'
import { Target, Users, Palette, LineChart } from 'lucide-react'
import { ANIMATION } from '@/lib/animation-constants'

const processSteps = [
  {
    number: '01',
    title: 'Audit & Analyse',
    description: 'Analyse complète de votre marché, concurrence locale et potentiel publicitaire à La Réunion',
    icon: Target,
    color: 'from-digiqo-primary to-digiqo-primary/80',
  },
  {
    number: '02',
    title: 'Stratégie Sur-Mesure',
    description: 'Plan de campagne personnalisé avec ciblage précis et prévisions de résultats réalistes',
    icon: Users,
    color: 'from-digiqo-secondary to-digiqo-secondary/80',
  },
  {
    number: '03',
    title: 'Création & Lancement',
    description: 'Conception de visuels haute performance et mise en ligne avec tracking temps réel',
    icon: Palette,
    color: 'from-digiqo-accent to-digiqo-accent/80',
  },
  {
    number: '04',
    title: 'Optimisation & Croissance',
    description: 'Ajustements data-driven hebdomadaires et rapports mensuels détaillés',
    icon: LineChart,
    color: 'from-digiqo-accent to-amber-600',
  },
]

export default function ProcessStepsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-digiqo-primary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Votre succès en <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">4 étapes simples</span>
          </motion.h2>
          <motion.p
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto"
          >
            De l'audit gratuit aux premiers résultats, un processus transparent et efficace
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-digiqo-accent to-transparent -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                {...ANIMATION.entry.scaleIn}
                whileInView={ANIMATION.entry.scaleIn.animate}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative h-full"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center h-full flex flex-col items-center">
                  <div className="text-6xl font-bold text-digiqo-primary/10 mb-4">
                    {step.number}
                  </div>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: ANIMATION.duration.normal }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 mt-4`}
                  >
                    <step.icon aria-hidden="true" className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-digiqo-primary/70">{step.description}</p>
                  <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-digiqo-accent to-digiqo-accent/70 rounded-full -translate-x-1/2 hidden lg:block" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
