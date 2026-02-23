import type { StepProps } from '@/lib/partnership-types'

const speakerTypes = [
  { value: 'animateur', label: 'Animateur' },
  { value: 'maitre_ceremonie', label: 'Maître de cérémonie' },
  { value: 'speaker_sportif', label: 'Speaker sportif' },
  { value: 'interviews', label: 'Interviews' },
  { value: 'village', label: 'Village / stand' },
  { value: 'autre', label: 'Autre' },
]

const zones = [
  { value: 'reunion', label: 'La Réunion' },
  { value: 'metropole', label: 'France métropolitaine' },
  { value: 'international', label: 'International' },
]

export default function StepSpeakerProfile({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  const toggleZone = (zone: string) => {
    const current = formData.spkZoneDeplacement
    if (current.includes(zone)) {
      updateFormData({ spkZoneDeplacement: current.filter(z => z !== zone) })
    } else {
      updateFormData({ spkZoneDeplacement: [...current, zone] })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Profil Speaker / Animateur</h3>
        <p className="text-sm text-gray-500 mb-6">Détails sur ton activité et tes interventions</p>
      </div>

      {/* S1 - Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type <span className="text-red-500">*</span>
        </label>
        <select name="spkType" value={formData.spkType} onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all ${errors.spkType ? 'border-red-400' : 'border-gray-300'}`}>
          <option value="">Sélectionner...</option>
          {speakerTypes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {errors.spkType && <p className="text-xs text-red-500 mt-1">{errors.spkType}</p>}
      </div>

      {/* S2 - Thématiques */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Thématiques (3 max) <span className="text-red-500">*</span>
        </label>
        <textarea
          name="spkThematiques"
          value={formData.spkThematiques}
          onChange={handleChange}
          rows={2}
          placeholder="Sport, bien-être, entrepreneuriat..."
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none ${errors.spkThematiques ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.spkThematiques && <p className="text-xs text-red-500 mt-1">{errors.spkThematiques}</p>}
      </div>

      {/* S3 - Langues */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Langues parlées <span className="text-red-500">*</span>
        </label>
        <input type="text" name="spkLangues" value={formData.spkLangues} onChange={handleChange}
          placeholder="Français, Créole, Anglais..."
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all ${errors.spkLangues ? 'border-red-400' : 'border-gray-300'}`} />
        {errors.spkLangues && <p className="text-xs text-red-500 mt-1">{errors.spkLangues}</p>}
      </div>

      {/* S4 - Matériel */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Matériel</label>
        <select name="spkMateriel" value={formData.spkMateriel} onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all">
          <option value="">Sélectionner...</option>
          <option value="autonome">Autonome (matériel propre)</option>
          <option value="besoin_regie">Besoin de régie / sono</option>
          <option value="ca_depend">Ça dépend de l'événement</option>
        </select>
      </div>

      {/* S5 - Zone de déplacement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Zone de déplacement <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {zones.map(zone => {
            const isSelected = formData.spkZoneDeplacement.includes(zone.value)
            return (
              <button
                key={zone.value}
                type="button"
                onClick={() => toggleZone(zone.value)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
                  ${isSelected
                    ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'
                  }
                `}
              >
                {zone.label}
              </button>
            )
          })}
        </div>
        {errors.spkZoneDeplacement && <p className="text-xs text-red-500 mt-1">{errors.spkZoneDeplacement}</p>}
      </div>
    </div>
  )
}
