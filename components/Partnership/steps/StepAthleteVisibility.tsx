import type { StepProps } from '@/lib/partnership-types'

const supportsOptions = [
  { value: 'maillot_face', label: 'Maillot (face)' },
  { value: 'maillot_dos', label: 'Maillot (dos)' },
  { value: 'short', label: 'Short' },
  { value: 'casquette', label: 'Casquette' },
  { value: 'dossard', label: 'Dossard' },
  { value: 'sac', label: 'Sac' },
  { value: 'autre', label: 'Autre' },
]

export default function StepAthleteVisibility({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  const toggleSupport = (value: string) => {
    const current = formData.athSupportsLogo
    if (current.includes(value)) {
      updateFormData({ athSupportsLogo: current.filter(s => s !== value) })
    } else {
      updateFormData({ athSupportsLogo: [...current, value] })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Visibilité Digiqo & Contreparties</h3>
        <p className="text-sm text-gray-500 mb-6">Logo Digiqo, engagements mensuels et idées de contenus</p>
      </div>

      {/* === ATH3 : Visibilité === */}
      <div className="bg-gray-50 rounded-2xl p-5 space-y-5">
        <h4 className="text-base font-semibold text-digiqo-primary">Visibilité logo Digiqo</h4>

        {/* A13 - Supports */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supports possibles <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {supportsOptions.map(opt => {
              const isSelected = formData.athSupportsLogo.includes(opt.value)
              return (
                <button key={opt.value} type="button" onClick={() => toggleSupport(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${isSelected ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                  {opt.label}
                </button>
              )
            })}
          </div>
          {errors.athSupportsLogo && <p className="text-xs text-red-500 mt-1">{errors.athSupportsLogo}</p>}
        </div>

        {/* A14 - Emplacements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Emplacements / tailles possibles</label>
          <input type="text" name="athEmplacementsTailles" value={formData.athEmplacementsTailles} onChange={handleChange}
            placeholder="ex: poitrine 10x10cm, dos 15x15cm..." className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
        </div>

        {/* A15 - Qui fournit la tenue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qui fournit la tenue ? <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {([
              { value: 'athlete', label: "L'athlète" },
              { value: 'digiqo', label: 'Digiqo' },
              { value: 'organisateur', label: "L'organisateur" },
            ] as const).map(opt => (
              <button key={opt.value} type="button" onClick={() => updateFormData({ athFournitTenue: opt.value })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.athFournitTenue === opt.value ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {opt.label}
              </button>
            ))}
          </div>
          {errors.athFournitTenue && <p className="text-xs text-red-500 mt-1">{errors.athFournitTenue}</p>}
        </div>

        {/* A16 - OK logo X events min */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OK pour porter le logo Digiqo sur un minimum d'événements ? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 items-center">
            {(['oui', 'non'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ athOkLogoMinEvents: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.athOkLogoMinEvents === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val === 'oui' ? 'Oui' : 'Non'}
              </button>
            ))}
            {formData.athOkLogoMinEvents === 'oui' && (
              <input type="number" name="athNbEventsMinLogo" value={formData.athNbEventsMinLogo} onChange={handleChange}
                min="1" placeholder="Combien ?"
                className="w-32 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
            )}
          </div>
          {errors.athOkLogoMinEvents && <p className="text-xs text-red-500 mt-1">{errors.athOkLogoMinEvents}</p>}
        </div>
      </div>

      {/* === ATH4 : Contreparties === */}
      <div className="bg-gray-50 rounded-2xl p-5 space-y-5">
        <h4 className="text-base font-semibold text-digiqo-primary">Contreparties concrètes</h4>

        {/* A17 - Engagements mensuels */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Engagements mensuels (nombre par mois)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'athEngagementsPosts', label: 'Posts' },
              { name: 'athEngagementsReels', label: 'Reels' },
              { name: 'athEngagementsStories', label: 'Stories' },
              { name: 'athEngagementsMentions', label: 'Mentions / Tags' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                <input type="number" name={field.name} value={(formData as any)[field.name]} onChange={handleChange}
                  min="0" placeholder="0"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Lien en bio ?</label>
              <div className="flex gap-2">
                {(['oui', 'non'] as const).map(val => (
                  <button key={val} type="button" onClick={() => updateFormData({ athEngagementsLienBio: val })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${formData.athEngagementsLienBio === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600'}`}>
                    {val === 'oui' ? 'Oui' : 'Non'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Présence événements (jours/h)</label>
              <input type="text" name="athEngagementsPresenceEvent" value={formData.athEngagementsPresenceEvent} onChange={handleChange}
                placeholder="ex: 2 jours/mois"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* A18 - 3 idées de contenus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            3 idées de contenus que tu pourrais produire <span className="text-red-500">*</span>
          </label>
          <textarea name="athIdeesContenus" value={formData.athIdeesContenus} onChange={handleChange}
            rows={4} placeholder={"1. Vidéo behind the scenes entraînement\n2. Post avant/après compétition avec le maillot Digiqo\n3. Story Q&A partenariat sport/digital"}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none ${errors.athIdeesContenus ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.athIdeesContenus && <p className="text-xs text-red-500 mt-1">{errors.athIdeesContenus}</p>}
        </div>

        {/* A19 - Intros/opportunités */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Intros / opportunités business possibles ?</label>
          <div className="flex gap-3">
            {(['oui', 'non'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ athIntrosOpportunites: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.athIntrosOpportunites === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val === 'oui' ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
          {formData.athIntrosOpportunites === 'oui' && (
            <input type="text" name="athIntrosEstimation" value={formData.athIntrosEstimation} onChange={handleChange}
              placeholder="Estimation (nombre, type...)"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          )}
        </div>
      </div>
    </div>
  )
}
