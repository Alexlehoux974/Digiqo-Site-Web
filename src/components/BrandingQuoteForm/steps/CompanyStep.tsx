import { motion } from 'framer-motion'
import FormField from '../../../components/WebQuoteForm/FormField'

const SECTORS = [
  { value: 'restauration', label: 'Restauration / Food' },
  { value: 'commerce', label: 'Commerce / Retail' },
  { value: 'tech', label: 'Tech / Digital' },
  { value: 'sante', label: 'Santé / Bien-être' },
  { value: 'immobilier', label: 'Immobilier' },
  { value: 'education', label: 'Éducation / Formation' },
  { value: 'sport', label: 'Sport / Fitness' },
  { value: 'beaute', label: 'Beauté / Mode' },
  { value: 'tourisme', label: 'Tourisme / Hôtellerie' },
  { value: 'artisanat', label: 'Artisanat / Services' },
  { value: 'autre', label: 'Autre' },
]

interface CompanyStepProps {
  data: any
  updateData: (field: string, value: any) => void
}

export default function CompanyStep({ data, updateData }: CompanyStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Parlez-nous de votre entreprise</h2>
      <p className="text-gray-500 mb-6">Ces informations nous aident à comprendre votre contexte</p>

      <div className="space-y-5">
        <FormField
          label="Nom de l'entreprise"
          name="company-name"
          value={data?.company?.name || ''}
          onChange={(e: any) => updateData('company.name', e.target.value)}
          placeholder="Ex: Mon Entreprise"
          required
        />

        <FormField
          label="Secteur d'activité"
          name="company-sector"
          type="select"
          value={data?.company?.sector || ''}
          onChange={(e: any) => updateData('company.sector', e.target.value)}
          options={SECTORS}
          required
        />

        <FormField
          label="Décrivez brièvement votre activité"
          name="company-description"
          type="textarea"
          value={data?.company?.description || ''}
          onChange={(e: any) => updateData('company.description', e.target.value)}
          placeholder="Que fait votre entreprise ? Quels produits/services proposez-vous ?"
        />

        <FormField
          label="Avez-vous déjà une identité visuelle ?"
          name="company-existing-brand"
          type="radio"
          value={data?.company?.hasExistingBrand || ''}
          onChange={(e: any) => updateData('company.hasExistingBrand', e.target.value)}
          options={[
            { value: 'oui', label: 'Oui, j\'ai déjà un logo / une charte' },
            { value: 'partiel', label: 'Partiellement (logo mais pas de charte complète)' },
            { value: 'non', label: 'Non, je pars de zéro' },
          ]}
        />

        {(data?.company?.hasExistingBrand === 'oui' || data?.company?.hasExistingBrand === 'partiel') && (
          <FormField
            label="Décrivez ce que vous avez actuellement"
            name="company-existing-details"
            type="textarea"
            value={data?.company?.existingBrandDetails || ''}
            onChange={(e: any) => updateData('company.existingBrandDetails', e.target.value)}
            placeholder="Logo, couleurs, polices, supports existants..."
          />
        )}
      </div>
    </motion.div>
  )
}
