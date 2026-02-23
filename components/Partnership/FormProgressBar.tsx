import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
  id: string
  label: string
}

interface FormProgressBarProps {
  steps: Step[]
  currentStep: number
  completedSteps: Set<number>
}

export default function FormProgressBar({ steps, currentStep, completedSteps }: FormProgressBarProps) {
  return (
    <div className="w-full">
      {/* Mobile: compact text */}
      <div className="flex md:hidden items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-500">
          Étape {currentStep + 1} / {steps.length}
        </span>
        <span className="text-sm font-semibold text-digiqo-primary">
          {steps[currentStep]?.label}
        </span>
      </div>

      {/* Mobile: progress bar */}
      <div className="block md:hidden mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-digiqo-primary to-digiqo-accent rounded-full"
            initial={false}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Desktop: full step indicator */}
      <div className="hidden md:flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(index)
          const isCurrent = index === currentStep
          const isPast = index < currentStep

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold
                    transition-all duration-300 border-2
                    ${isCurrent
                      ? 'bg-digiqo-accent text-white border-digiqo-accent shadow-lg shadow-digiqo-accent/30'
                      : isCompleted || isPast
                        ? 'bg-digiqo-primary text-white border-digiqo-primary'
                        : 'bg-gray-100 text-gray-400 border-gray-200'
                    }
                  `}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {isCompleted || isPast ? <Check className="w-4 h-4" /> : index + 1}
                </motion.div>
                <span className={`
                  text-xs mt-1.5 font-medium whitespace-nowrap
                  ${isCurrent ? 'text-digiqo-accent' : isPast ? 'text-digiqo-primary' : 'text-gray-400'}
                `}>
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 mt-[-18px]">
                  <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-digiqo-primary rounded-full"
                      initial={false}
                      animate={{ width: isPast || isCompleted ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
