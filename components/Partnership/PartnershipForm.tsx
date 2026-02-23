import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { initialFormData, type PartnershipFormData } from '@/lib/partnership-types'
import { validateStep } from '@/lib/partnership-validation'
import FormProgressBar from './FormProgressBar'

import StepProfileChoice from './steps/StepProfileChoice'
import StepIdentity from './steps/StepIdentity'
import StepSocialMedia from './steps/StepSocialMedia'
import StepAthleteProfile from './steps/StepAthleteProfile'
import StepSpeakerProfile from './steps/StepSpeakerProfile'
import StepAthleteCalendar from './steps/StepAthleteCalendar'
import StepSpeakerCalendar from './steps/StepSpeakerCalendar'
import StepAthleteVisibility from './steps/StepAthleteVisibility'
import StepSpeakerVisibility from './steps/StepSpeakerVisibility'
import StepBudgetReporting from './steps/StepBudgetReporting'
import StepFinalReview from './steps/StepFinalReview'

interface StepConfig {
  id: string
  label: string
  component: React.ComponentType<any>
  validationId: string
}

const SESSION_KEY = 'digiqo-partnership-form'

export default function PartnershipForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<PartnershipFormData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(SESSION_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          // Restore but keep file arrays empty (base64 strings are too large for sessionStorage)
          return {
            ...initialFormData,
            ...parsed,
            capturesInsights: [],
            athMediaKit: [],
            athPhotosHD: [],
            spkShowreelFile: [],
            spkPhotosEvenement: [],
            spkPlaquetteDossier: [],
          }
        }
      } catch { /* ignore */ }
    }
    return initialFormData
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  // Save form data to sessionStorage (excluding file attachments)
  useEffect(() => {
    try {
      const { capturesInsights, athMediaKit, athPhotosHD, spkShowreelFile, spkPhotosEvenement, spkPlaquetteDossier, ...saveable } = formData
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(saveable))
    } catch { /* ignore */ }
  }, [formData])

  // Build steps array based on profile type
  const steps: StepConfig[] = useMemo(() => {
    const base: StepConfig[] = [
      { id: 'profile', label: 'Profil', component: StepProfileChoice, validationId: 'profile' },
      { id: 'identity', label: 'Identité', component: StepIdentity, validationId: 'identity' },
      { id: 'social', label: 'Réseaux', component: StepSocialMedia, validationId: 'social' },
    ]

    if (formData.profileType === 'athlete') {
      base.push(
        { id: 'ath-profile', label: 'Sport', component: StepAthleteProfile, validationId: 'athlete-profile' },
        { id: 'ath-calendar', label: 'Calendrier', component: StepAthleteCalendar, validationId: 'athlete-calendar' },
        { id: 'ath-visibility', label: 'Visibilité', component: StepAthleteVisibility, validationId: 'athlete-visibility' },
      )
    } else if (formData.profileType === 'speaker') {
      base.push(
        { id: 'spk-profile', label: 'Speaker', component: StepSpeakerProfile, validationId: 'speaker-profile' },
        { id: 'spk-calendar', label: 'Références', component: StepSpeakerCalendar, validationId: 'speaker-calendar' },
        { id: 'spk-visibility', label: 'Visibilité', component: StepSpeakerVisibility, validationId: 'speaker-visibility' },
      )
    }

    base.push(
      { id: 'budget', label: 'Budget', component: StepBudgetReporting, validationId: 'budget' },
      { id: 'final', label: 'Envoi', component: StepFinalReview, validationId: 'final' },
    )

    return base
  }, [formData.profileType])

  const updateFormData = useCallback((partial: Partial<PartnershipFormData>) => {
    setFormData(prev => ({ ...prev, ...partial }))
    // Clear errors for updated fields
    const clearedErrors = { ...errors }
    Object.keys(partial).forEach(key => delete clearedErrors[key])
    setErrors(clearedErrors)
  }, [errors])

  const currentStepConfig = steps[currentStep]
  const CurrentComponent = currentStepConfig?.component

  const goNext = () => {
    if (!currentStepConfig) return

    // For step 0, allow going next even if profile type not yet selected
    // (to show errors), but only step 1 without profile = block at step 3
    const validation = validateStep(currentStepConfig.validationId, formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setErrors({})
    setCompletedSteps(prev => { const next = new Set(Array.from(prev)); next.add(currentStep); return next })

    // When profile changes on step 0, reset completed steps beyond step 2
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goPrev = () => {
    if (currentStep > 0) {
      setErrors({})
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Validate final step
    const validation = validateStep(currentStepConfig.validationId, formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    // Check honeypot
    if (formData.honeypot) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const res = await fetch('/api/partnership-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Erreur serveur')

      setSubmitStatus('success')
      sessionStorage.removeItem(SESSION_KEY)

      // GA4 tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'partnership',
          event_label: formData.profileType,
          value: 1,
        })
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLastStep = currentStep === steps.length - 1

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16 px-6"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Candidature envoyée !</h3>
        <p className="text-gray-600 mb-2">
          Merci {formData.prenom} ! Ta candidature a bien été reçue.
        </p>
        <p className="text-gray-500 text-sm">
          Notre équipe l'analysera et te répondra sous 7 à 14 jours.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <FormProgressBar
        steps={steps.map(s => ({ id: s.id, label: s.label }))}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-700">Erreur lors de l'envoi</p>
            <p className="text-xs text-red-600 mt-1">Veuillez réessayer. Si le problème persiste, contactez-nous directement.</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepConfig?.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          {CurrentComponent && (
            <CurrentComponent
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={goPrev}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </button>
        ) : (
          <div />
        )}

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark text-white font-semibold rounded-full
              hover:shadow-lg hover:shadow-digiqo-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer ma candidature
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-digiqo-primary text-white font-medium rounded-full
              hover:bg-digiqo-primary-light transition-all duration-300"
          >
            Suivant
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
