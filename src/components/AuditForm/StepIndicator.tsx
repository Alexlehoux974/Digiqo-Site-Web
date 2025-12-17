'use client';


import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { AuditStep } from '@/src/lib/audit-types';

interface StepIndicatorProps {
  steps: AuditStep[];
  currentStep: number;
  completedSteps: number[];
}

export default function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="relative">
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          const isPrevious = index < currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold
                    transition-all duration-300 border-2
                    ${isActive 
                      ? 'bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-accent-light text-white border-digiqo-accent shadow-xl shadow-digiqo-accent/40 scale-110' 
                      : isCompleted 
                        ? 'bg-digiqo-secondary text-white border-digiqo-secondary shadow-md'
                        : isPrevious
                          ? 'bg-digiqo-primary/20 text-digiqo-primary border-digiqo-primary/30'
                          : 'bg-white text-digiqo-gray-dark border-digiqo-gray'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {/* Pulse Animation for Active Step */}
                {isActive && (
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-digiqo-accent rounded-full"
                  />
                )}
              </motion.div>
              
              {/* Step Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`
                  mt-2 text-xs font-semibold text-center max-w-[100px]
                  ${isActive ? 'text-digiqo-accent font-bold' : isCompleted ? 'text-digiqo-secondary' : 'text-digiqo-gray-dark'}
                `}
              >
                {step.title}
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Line */}
      <div className="absolute top-6 left-0 right-0 h-1 bg-digiqo-gray/30 rounded-full -z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-secondary rounded-full shadow-md"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}