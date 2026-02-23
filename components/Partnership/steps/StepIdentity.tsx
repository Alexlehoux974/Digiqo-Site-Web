import type { StepProps } from '@/lib/partnership-types'

export default function StepIdentity({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Identité & Contact</h3>
        <p className="text-sm text-gray-500 mb-6">Informations de base pour vous identifier</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} error={errors.prenom} required />
        <Field label="Nom" name="nom" value={formData.nom} onChange={handleChange} error={errors.nom} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Téléphone" name="telephone" type="tel" value={formData.telephone} onChange={handleChange} error={errors.telephone} required />
        <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
      </div>

      <Field label="Ville / Zone principale" name="villeZone" value={formData.villeZone} onChange={handleChange} error={errors.villeZone} required />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Statut <span className="text-red-500">*</span>
        </label>
        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          className={`
            w-full px-4 py-3 rounded-xl border bg-white text-gray-800
            focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all
            ${errors.statut ? 'border-red-400' : 'border-gray-300'}
          `}
        >
          <option value="">Sélectionner...</option>
          <option value="particulier">Particulier</option>
          <option value="auto-entrepreneur">Auto-entrepreneur</option>
          <option value="association">Association</option>
          <option value="societe">Société</option>
        </select>
        {errors.statut && <p className="text-xs text-red-500 mt-1">{errors.statut}</p>}
      </div>

      <Field label="SIRET" name="siret" value={formData.siret} onChange={handleChange} placeholder="Si applicable" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Site web / Portfolio" name="sitePortfolio" value={formData.sitePortfolio} onChange={handleChange} placeholder="https://..." />
        <Field label="Contact manager / agent" name="contactManager" value={formData.contactManager} onChange={handleChange} placeholder="Nom + email ou tél" />
      </div>
    </div>
  )
}

interface FieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  type?: string
  placeholder?: string
}

function Field({ label, name, value, onChange, error, required, type = 'text', placeholder }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-xl border bg-white text-gray-800
          focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all
          ${error ? 'border-red-400' : 'border-gray-300'}
        `}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
