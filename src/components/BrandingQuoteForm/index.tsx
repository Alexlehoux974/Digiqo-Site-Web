import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ServiceStep from './steps/ServiceStep'
import CompanyStep from './steps/CompanyStep'
import StyleStep from './steps/StyleStep'
import ProjectStep from './steps/ProjectStep'
import ContactStep from './steps/ContactStep'
import { BrandingQuoteFormData, BrandingService } from '../../lib/branding-quote-types'

const STEPS = [
  { id: 1, name: 'Votre besoin', component: ServiceStep },
  { id: 2, name: 'Entreprise', component: CompanyStep },
  { id: 3, name: 'Style', component: StyleStep },
  { id: 4, name: 'Délais & Budget', component: ProjectStep },
  { id: 5, name: 'Contact', component: ContactStep },
]

interface BrandingQuoteFormProps {
  preSelectedService?: BrandingService
  onClose: () => void
}

export default function BrandingQuoteForm({ preSelectedService, onClose }: BrandingQuoteFormProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<BrandingQuoteFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('brandingQuoteFormData')
    if (saved) {
      setFormData(JSON.parse(saved))
    } else if (preSelectedService) {
      setFormData({ service: { type: preSelectedService, additionalServices: [] } })
    }
  }, [])

  useEffect(() => {
    if (preSelectedService && !formData?.service?.type) {
      setFormData(prev => ({
        ...prev,
        service: { type: preSelectedService, additionalServices: prev?.service?.additionalServices || [] }
      }))
    }
  }, [preSelectedService])

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('brandingQuoteFormData', JSON.stringify(formData))
    }
  }, [formData])

  const updateData = (field: string, value: any) => {
    const keys = field.split('.')
    setFormData(prev => {
      const newData = { ...prev }
      let current: any = newData

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/branding-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        localStorage.removeItem('brandingQuoteFormData')
        onClose()
        router.push('/merci')
      } else {
        alert('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="p-6 md:p-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
            >
              <div className="relative">
                <div
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step.id === currentStep
                      ? 'bg-[#8B1431] text-white'
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <span className="absolute top-12 left-1/2 transform -translate-x-1/2 text-[10px] md:text-xs text-gray-600 whitespace-nowrap hidden sm:block">
                  {step.name}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="mt-12">
        <AnimatePresence mode="wait">
          <CurrentStepComponent
            key={currentStep}
            data={formData}
            updateData={updateData}
          />
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={currentStep === 1 ? onClose : handlePrevious}
          className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          {currentStep === 1 ? 'Annuler' : 'Précédent'}
        </button>

        <div className="flex flex-col items-end gap-2">
          {currentStep === STEPS.length && (
            <p className="text-xs text-gray-500">
              En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre{' '}
              <Link href="/politique-confidentialite" className="underline hover:text-gray-700">
                politique de confidentialité
              </Link>.
            </p>
          )}
          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[#8B1431] text-white rounded-full hover:bg-[#6B0F25] transition-colors"
            >
              Suivant
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-full transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-[#8B1431] text-white hover:bg-[#6B0F25]'
              }`}
            >
              {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
