import { motion } from 'framer-motion'
import { Pencil, RefreshCw, BookOpen, Rocket } from 'lucide-react'
import { BrandingService } from '../../../lib/branding-quote-types'

const SERVICE_OPTIONS: { id: BrandingService; label: string; description: string; icon: any; gradient: string }[] = [
  { id: 'creation-logo', label: 'Création Logo', description: 'Logo professionnel unique et mémorable', icon: Pencil, gradient: 'from-emerald-500 to-teal-500' },
  { id: 'refonte-logo', label: 'Refonte Logo', description: 'Modernisation en conservant votre ADN', icon: RefreshCw, gradient: 'from-blue-500 to-indigo-500' },
  { id: 'charte-graphique', label: 'Charte Graphique Complète', description: 'Guide complet de votre identité visuelle', icon: BookOpen, gradient: 'from-purple-500 to-pink-500' },
  { id: 'branding-complet', label: 'Branding Complet Startup', description: 'Pack identité complète pour lancer votre entreprise', icon: Rocket, gradient: 'from-amber-500 to-orange-500' },
]

const ADDITIONAL_OPTIONS = [
  { value: 'papeterie', label: 'Papeterie (cartes de visite, en-têtes, etc.)' },
  { value: 'templates-digitaux', label: 'Templates digitaux (réseaux sociaux, email)' },
  { value: 'guide-communication', label: 'Guide de communication' },
  { value: 'kit-lancement', label: 'Kit de lancement web' },
]

interface ServiceStepProps {
  data: any
  updateData: (field: string, value: any) => void
}

export default function ServiceStep({ data, updateData }: ServiceStepProps) {
  const selectedService = data?.service?.type || ''
  const additionalServices = data?.service?.additionalServices || []

  const toggleAdditional = (value: string) => {
    const current = [...additionalServices]
    const index = current.indexOf(value)
    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(value)
    }
    updateData('service.additionalServices', current)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Quel service vous intéresse ?</h2>
      <p className="text-gray-500 mb-6">Sélectionnez le type de prestation souhaitée</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {SERVICE_OPTIONS.map(option => {
          const Icon = option.icon
          const isSelected = selectedService === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => updateData('service.type', option.id)}
              className={`relative p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#8B1431] bg-[#8B1431]/5 shadow-lg scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">{option.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#8B1431] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">Livrables additionnels souhaités</h3>
      <p className="text-sm text-gray-500 mb-4">Optionnel — cochez ce qui vous intéresse</p>
      <div className="space-y-3">
        {ADDITIONAL_OPTIONS.map(option => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={additionalServices.includes(option.value)}
              onChange={() => toggleAdditional(option.value)}
              className="w-5 h-5 text-[#8B1431] border-2 border-gray-300 rounded focus:ring-[#8B1431]"
            />
            <span className="text-sm font-medium text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </motion.div>
  )
}
