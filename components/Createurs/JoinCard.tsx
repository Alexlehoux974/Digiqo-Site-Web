import { m as motion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'

// Dernière tuile de la grille : appel à candidature.
// `href` reste paramétrable pour que la PR 2 puisse pointer vers /createurs/inscription
// sans toucher au composant.
export const JoinCard = ({ index, href }: { index: number; href: string }) => (
  <motion.a
    href={href}
    {...ANIMATION.entry.fadeInUp}
    transition={{ duration: ANIMATION.duration.normal, delay: getStaggerDelay(index) }}
    className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-white/60 p-8 text-center transition-colors duration-300 hover:border-[#111111] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
  >
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-white transition-transform duration-300 group-hover:scale-110">
      <Plus className="h-6 w-6" />
    </span>
    <span className="text-base font-bold text-gray-900">Vous êtes créateur ?</span>
    <span className="text-sm leading-relaxed text-gray-500">
      Rejoignez le réseau Digiqo et collaborez avec des marques réunionnaises.
    </span>
    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111111]">
      Ajouter mon profil
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  </motion.a>
)
