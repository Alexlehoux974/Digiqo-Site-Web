import { motion } from 'framer-motion'
import FormField from '../../../components/WebQuoteForm/FormField'

const TIMELINE_OPTIONS = [
  { value: 'urgent', label: 'Urgent — moins de 2 semaines' },
  { value: 'normal', label: 'Normal — 2 à 4 semaines' },
  { value: 'flexible', label: 'Flexible — 1 à 2 mois' },
  { value: 'pas-presse', label: 'Pas pressé — plus de 2 mois' },
]

const BUDGET_OPTIONS = [
  { value: 'moins-500', label: 'Moins de 500 €' },
  { value: '500-1000', label: '500 € – 1 000 €' },
  { value: '1000-2000', label: '1 000 € – 2 000 €' },
  { value: '2000-5000', label: '2 000 € – 5 000 €' },
  { value: 'plus-5000', label: 'Plus de 5 000 €' },
  { value: 'ne-sait-pas', label: 'Je ne sais pas encore' },
]

interface ProjectStepProps {
  data: any
  updateData: (field: string, value: any) => void
}

export default function ProjectStep({ data, updateData }: ProjectStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Délais & Budget</h2>
      <p className="text-gray-500 mb-6">Pour vous proposer la meilleure solution</p>

      <div className="space-y-6">
        <FormField
          label="Quel est votre délai ?"
          name="project-timeline"
          type="radio"
          value={data?.project?.timeline || ''}
          onChange={(e: any) => updateData('project.timeline', e.target.value)}
          options={TIMELINE_OPTIONS}
        />

        <FormField
          label="Quel budget avez-vous en tête ?"
          name="project-budget"
          type="radio"
          value={data?.project?.budget || ''}
          onChange={(e: any) => updateData('project.budget', e.target.value)}
          options={BUDGET_OPTIONS}
        />

        <FormField
          label="Informations complémentaires"
          name="project-additional"
          type="textarea"
          value={data?.project?.additionalInfo || ''}
          onChange={(e: any) => updateData('project.additionalInfo', e.target.value)}
          placeholder="Autre chose que vous souhaitez nous dire ?"
        />
      </div>
    </motion.div>
  )
}
