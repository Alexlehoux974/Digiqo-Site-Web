import { m as motion } from 'framer-motion'
import { ArrowRight, ClipboardList, Handshake, Users } from 'lucide-react'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { DEMANDE_PATHNAME } from '@/lib/createurs/demande'

// ──────────────────────────────────────────────
// « Comment ça marche » — version orientée client, juste sous le hero.
//
// Le lien vers /createurs/demande reste un vrai `<a>` : sur /createurs il est
// intercepté par CreatorRequestLauncher (panneau latéral desktop), ailleurs il
// navigue vers la page pleine.
// ──────────────────────────────────────────────

const STEPS = [
  {
    number: '1',
    title: 'Vous décrivez votre besoin',
    text: '2 minutes via le formulaire : objectif, format, budget, échéance.',
    icon: ClipboardList,
  },
  {
    number: '2',
    title: 'Digiqo sélectionne',
    text: 'on vous propose les créateurs adaptés sous 48 h ouvrées, avec un devis clair.',
    icon: Users,
  },
  {
    number: '3',
    title: 'On coordonne, vous validez',
    text: 'brief, planning, livraison et facturation passent par Digiqo. Un seul interlocuteur.',
    icon: Handshake,
  },
]

export const HowItWorks = () => (
  <section className="border-b border-gray-100 bg-white py-14 sm:py-16">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">Comment ça marche</h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            {...ANIMATION.entry.fadeInUp}
            transition={{ duration: ANIMATION.duration.normal, delay: getStaggerDelay(index) }}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#111111] text-sm font-bold text-white">
                {step.number}
              </span>
              <step.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
              <strong className="font-bold text-gray-900">{step.title}</strong> — {step.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={DEMANDE_PATHNAME}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          Décrire mon besoin
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
)
