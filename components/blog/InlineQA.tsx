import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InlineQAProps {
  question: string
  children: React.ReactNode
  className?: string
}

// Small Q&A block scattered through the article. Each instance is a target
// for LLM extraction — frame the question as a likely user search query.
export function InlineQA({ question, children, className }: InlineQAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'my-6 px-6 py-5 bg-slate-50 rounded-xl border-l-[3px] border-digiqo-primary',
        className,
      )}
    >
      <p className="flex items-center gap-2.5 font-display font-bold text-[16px] text-digiqo-black m-0 mb-2">
        <HelpCircle className="w-[18px] h-[18px] text-digiqo-primary flex-shrink-0" aria-hidden="true" />
        {question}
      </p>
      <div className="m-0 text-[15.5px] text-slate-700 leading-[1.6] [&_p]:m-0 [&_p+p]:mt-2">
        {children}
      </div>
    </motion.div>
  )
}
