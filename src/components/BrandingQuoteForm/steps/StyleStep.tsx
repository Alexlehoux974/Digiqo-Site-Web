import { motion } from 'framer-motion'
import FormField from '../../../components/WebQuoteForm/FormField'

const STYLE_DIRECTIONS = [
  { value: 'moderne', label: 'Moderne & Épuré' },
  { value: 'classique', label: 'Classique & Intemporel' },
  { value: 'minimaliste', label: 'Minimaliste' },
  { value: 'audacieux', label: 'Audacieux & Créatif' },
  { value: 'luxe', label: 'Luxe & Premium' },
]

const BRAND_KEYWORDS = [
  { value: 'professionnel', label: 'Professionnel' },
  { value: 'dynamique', label: 'Dynamique' },
  { value: 'elegant', label: 'Élégant' },
  { value: 'creatif', label: 'Créatif' },
  { value: 'serieux', label: 'Sérieux' },
  { value: 'fun', label: 'Fun' },
  { value: 'innovant', label: 'Innovant' },
  { value: 'traditionnel', label: 'Traditionnel' },
  { value: 'ecologique', label: 'Écologique' },
  { value: 'premium', label: 'Premium' },
]

interface StyleStepProps {
  data: any
  updateData: (field: string, value: any) => void
}

export default function StyleStep({ data, updateData }: StyleStepProps) {
  const keywords = data?.style?.keywords || []

  const toggleKeyword = (value: string) => {
    const current = [...keywords]
    const index = current.indexOf(value)
    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(value)
    }
    updateData('style.keywords', current)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Style & Direction artistique</h2>
      <p className="text-gray-500 mb-6">Aidez-nous à cerner l'univers visuel que vous recherchez</p>

      <div className="space-y-6">
        <FormField
          label="Direction artistique souhaitée"
          name="style-direction"
          type="radio"
          value={data?.style?.direction || ''}
          onChange={(e: any) => updateData('style.direction', e.target.value)}
          options={STYLE_DIRECTIONS}
        />

        <FormField
          label="Couleurs préférées"
          name="style-colors"
          value={data?.style?.colors || ''}
          onChange={(e: any) => updateData('style.colors', e.target.value)}
          placeholder="Ex: bleu foncé, doré, tons naturels..."
          helper="Indiquez des couleurs ou des ambiances de couleur"
        />

        <FormField
          label="Marques ou sites qui vous inspirent"
          name="style-references"
          type="textarea"
          value={data?.style?.references || ''}
          onChange={(e: any) => updateData('style.references', e.target.value)}
          placeholder="Ex: Apple pour le minimalisme, Nike pour le dynamisme..."
          helper="Des exemples nous aident à comprendre vos goûts"
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Mots-clés qui décrivent votre marque
          </label>
          <div className="flex flex-wrap gap-2">
            {BRAND_KEYWORDS.map(kw => (
              <button
                key={kw.value}
                type="button"
                onClick={() => toggleKeyword(kw.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  keywords.includes(kw.value)
                    ? 'bg-[#8B1431] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {kw.label}
              </button>
            ))}
          </div>
        </div>

        <FormField
          label="Quelle est votre audience cible ?"
          name="style-audience"
          value={data?.style?.targetAudience || ''}
          onChange={(e: any) => updateData('style.targetAudience', e.target.value)}
          placeholder="Ex: Jeunes professionnels 25-40 ans, familles..."
        />
      </div>
    </motion.div>
  )
}
