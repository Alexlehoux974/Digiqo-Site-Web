import { motion } from 'framer-motion'
import { Trophy, Mic } from 'lucide-react'
import type { StepProps, ProfileType, PartnershipType } from '@/lib/partnership-types'

const profileOptions: { value: ProfileType; label: string; icon: typeof Trophy; description: string }[] = [
  {
    value: 'athlete',
    label: 'Athlète',
    icon: Trophy,
    description: 'Sportif amateur ou professionnel, en compétition',
  },
  {
    value: 'speaker',
    label: 'Animateur / Speaker',
    icon: Mic,
    description: "Animateur, maître de cérémonie, speaker d'événements",
  },
]

const partnershipOptions: { value: PartnershipType; label: string; description: string }[] = [
  {
    value: 'sponsoring',
    label: 'Sponsoring financier (cachet)',
    description: 'Soutien financier en échange de visibilité et contreparties',
  },
  {
    value: 'visibilite',
    label: 'Partenariat visibilité (contreparties)',
    description: 'Échange de visibilité, contenus et opportunités mutuelles',
  },
  {
    value: 'mixte',
    label: 'Mixte',
    description: 'Combinaison sponsoring financier + partenariat visibilité',
  },
]

export default function StepProfileChoice({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Profile type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Tu es :</h3>
        <p className="text-sm text-gray-500 mb-4">Choisis le profil qui te correspond</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profileOptions.map((option) => {
            const Icon = option.icon
            const isSelected = formData.profileType === option.value
            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => updateFormData({ profileType: option.value })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative p-6 rounded-2xl border-2 text-left transition-all duration-300
                  ${isSelected
                    ? 'border-digiqo-accent bg-digiqo-accent/5 shadow-lg shadow-digiqo-accent/10'
                    : 'border-gray-200 bg-white hover:border-digiqo-accent/30'
                  }
                `}
              >
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-3
                  ${isSelected ? 'bg-digiqo-accent text-white' : 'bg-gray-100 text-gray-500'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-gray-800">{option.label}</h4>
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                {isSelected && (
                  <motion.div
                    layoutId="profile-check"
                    className="absolute top-3 right-3 w-6 h-6 bg-digiqo-accent rounded-full flex items-center justify-center"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
        {errors.profileType && <p className="text-xs text-red-500 mt-2">{errors.profileType}</p>}
      </div>

      {/* Partnership type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Type de partenariat demandé :</h3>
        <p className="text-sm text-gray-500 mb-4">Quel type de collaboration recherches-tu ?</p>

        <div className="space-y-3">
          {partnershipOptions.map((option) => {
            const isSelected = formData.partnershipType === option.value
            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => updateFormData({ partnershipType: option.value })}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all duration-300
                  ${isSelected
                    ? 'border-digiqo-primary bg-digiqo-primary/5'
                    : 'border-gray-200 bg-white hover:border-digiqo-primary/30'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? 'border-digiqo-primary' : 'border-gray-300'}
                  `}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-digiqo-primary" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{option.label}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
        {errors.partnershipType && <p className="text-xs text-red-500 mt-2">{errors.partnershipType}</p>}
      </div>
    </div>
  )
}
