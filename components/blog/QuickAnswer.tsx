import { Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface QuickAnswerProps {
  question: string
  /** Pass JSX with <strong> highlights as needed, e.g. <>Compte <strong>8 à 15 € de CPM</strong>…</> */
  answer: React.ReactNode
  wordCount: number
  targetQuery: string
  className?: string
}

export function QuickAnswer({ question, answer, wordCount, targetQuery, className }: QuickAnswerProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'relative px-7 py-6 rounded-2xl border-l-4 border-l-digiqo-primary border border-digiqo-primary/[0.16]',
        'bg-gradient-to-br from-digiqo-primary/[0.04] to-digiqo-accent/[0.05]',
        className,
      )}
    >
      <div className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-[0.08em] text-[12px] text-digiqo-primary mb-2.5">
        <Lightbulb className="w-4 h-4" aria-hidden="true" />
        Réponse en 30 secondes
      </div>

      <h2 className="font-display font-bold text-[18.5px] text-digiqo-black m-0 mb-2.5 leading-[1.3]">
        {question}
      </h2>

      <p className="m-0 text-[16px] text-slate-700 leading-[1.6]">{answer}</p>

      <div className="mt-3 text-[12px] text-slate-500">
        Réponse extractible · {wordCount} mots · cible « {targetQuery} »
      </div>
    </motion.aside>
  )
}
