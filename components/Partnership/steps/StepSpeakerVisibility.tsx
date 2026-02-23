import type { StepProps } from '@/lib/partnership-types'

const emplacementsOptions = [
  { value: 'tenue', label: 'Tenue' },
  { value: 'backdrop_photocall', label: 'Backdrop / Photocall' },
  { value: 'scene_ecran', label: 'Scène (écran/slide)' },
  { value: 'micro_pupitre_badge', label: 'Micro / Pupitre / Badge' },
  { value: 'publications_officielles', label: 'Publications officielles' },
  { value: 'autre', label: 'Autre' },
]

export default function StepSpeakerVisibility({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  const toggleEmplacement = (value: string) => {
    const current = formData.spkEmplacementsPossibles
    if (current.includes(value)) {
      updateFormData({ spkEmplacementsPossibles: current.filter(s => s !== value) })
    } else {
      updateFormData({ spkEmplacementsPossibles: [...current, value] })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Visibilité Digiqo & Contreparties</h3>
        <p className="text-sm text-gray-500 mb-6">Emplacements, mentions et engagements de contenus</p>
      </div>

      {/* === SPK3 : Visibilité === */}
      <div className="bg-gray-50 rounded-2xl p-5 space-y-5">
        <h4 className="text-base font-semibold text-digiqo-primary">Visibilité Digiqo sur événements</h4>

        {/* S10 - Emplacements possibles */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emplacements possibles <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {emplacementsOptions.map(opt => {
              const isSelected = formData.spkEmplacementsPossibles.includes(opt.value)
              return (
                <button key={opt.value} type="button" onClick={() => toggleEmplacement(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${isSelected ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                  {opt.label}
                </button>
              )
            })}
          </div>
          {errors.spkEmplacementsPossibles && <p className="text-xs text-red-500 mt-1">{errors.spkEmplacementsPossibles}</p>}
        </div>

        {/* S11 - Mention orale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mention orale "partenaire Digiqo" possible ? <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {([
              { value: 'oui', label: 'Oui' },
              { value: 'non', label: 'Non' },
              { value: 'a_valider_orga', label: "À valider avec l'orga" },
            ] as const).map(opt => (
              <button key={opt.value} type="button" onClick={() => updateFormData({ spkMentionOraleDigiqo: opt.value })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.spkMentionOraleDigiqo === opt.value ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {opt.label}
              </button>
            ))}
          </div>
          {errors.spkMentionOraleDigiqo && <p className="text-xs text-red-500 mt-1">{errors.spkMentionOraleDigiqo}</p>}
        </div>

        {/* S12 - Fréquence mentions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fréquence estimée des mentions</label>
          <input type="text" name="spkFrequenceMentions" value={formData.spkFrequenceMentions} onChange={handleChange}
            placeholder="ex: 2-3 mentions par événement" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
        </div>

        {/* S13 - Négocier emplacements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Peut négocier emplacements/logo avec l'organisateur ? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {(['oui', 'non'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ spkNegocierEmplacements: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.spkNegocierEmplacements === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val === 'oui' ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
          {errors.spkNegocierEmplacements && <p className="text-xs text-red-500 mt-1">{errors.spkNegocierEmplacements}</p>}
        </div>
      </div>

      {/* === SPK4 : Contreparties === */}
      <div className="bg-gray-50 rounded-2xl p-5 space-y-5">
        <h4 className="text-base font-semibold text-digiqo-primary">Contreparties concrètes</h4>

        {/* S14 - Engagements mensuels */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Engagements mensuels (nombre par mois)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'spkEngagementsPosts', label: 'Posts' },
              { name: 'spkEngagementsReels', label: 'Reels' },
              { name: 'spkEngagementsStories', label: 'Stories' },
              { name: 'spkEngagementsMentions', label: 'Mentions / Tags' },
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
                  <button key={val} type="button" onClick={() => updateFormData({ spkEngagementsLienBio: val })}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${formData.spkEngagementsLienBio === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600'}`}>
                    {val === 'oui' ? 'Oui' : 'Non'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Coulisses événement</label>
              <input type="text" name="spkEngagementsCoulissesEvent" value={formData.spkEngagementsCoulissesEvent} onChange={handleChange}
                placeholder="ex: stories backstage"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* S15 - 3 idées de contenus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            3 idées de contenus que tu pourrais produire <span className="text-red-500">*</span>
          </label>
          <textarea name="spkIdeesContenus" value={formData.spkIdeesContenus} onChange={handleChange}
            rows={4} placeholder={"1. Reel coulisses avant un événement\n2. Interview vidéo avec mention Digiqo\n3. Podcast collaboratif sport x digital"}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none ${errors.spkIdeesContenus ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.spkIdeesContenus && <p className="text-xs text-red-500 mt-1">{errors.spkIdeesContenus}</p>}
        </div>

        {/* S16 - Intros/opportunités */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Intros / opportunités business possibles ?</label>
          <div className="flex gap-3">
            {(['oui', 'non'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ spkIntrosOpportunites: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.spkIntrosOpportunites === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val === 'oui' ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
          {formData.spkIntrosOpportunites === 'oui' && (
            <input type="text" name="spkIntrosEstimation" value={formData.spkIntrosEstimation} onChange={handleChange}
              placeholder="Estimation (nombre, type...)"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          )}
        </div>
      </div>
    </div>
  )
}
