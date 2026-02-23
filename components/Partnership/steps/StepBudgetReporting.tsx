import type { StepProps } from '@/lib/partnership-types'

export default function StepBudgetReporting({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  return (
    <div className="space-y-8">
      {/* === Section C : Budget & Conditions === */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Budget & Conditions</h3>
        <p className="text-sm text-gray-500 mb-6">Attentes financières et conditions du partenariat</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 space-y-5">
        <h4 className="text-base font-semibold text-digiqo-primary">Budget demandé</h4>
        {errors.budget && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{errors.budget}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Par mois</label>
            <div className="relative">
              <input type="text" name="budgetParMois" value={formData.budgetParMois} onChange={handleChange}
                placeholder="0" className="w-full px-4 py-3 pr-8 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">EUR</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Par événement</label>
            <div className="relative">
              <input type="text" name="budgetParEvenement" value={formData.budgetParEvenement} onChange={handleChange}
                placeholder="0" className="w-full px-4 py-3 pr-8 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">EUR</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Par saison</label>
            <div className="relative">
              <input type="text" name="budgetParSaison" value={formData.budgetParSaison} onChange={handleChange}
                placeholder="0" className="w-full px-4 py-3 pr-8 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">EUR</span>
            </div>
          </div>
        </div>

        {/* Durée souhaitée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durée souhaitée <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {(['3', '6', '12'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ dureeSouhaitee: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.dureeSouhaitee === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val} mois
              </button>
            ))}
          </div>
          {errors.dureeSouhaitee && <p className="text-xs text-red-500 mt-1">{errors.dureeSouhaitee}</p>}
        </div>

        {/* Autres sponsors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Autres sponsors actuels <span className="text-red-500">*</span>
          </label>
          <textarea name="autresSponsors" value={formData.autresSponsors} onChange={handleChange}
            rows={2} placeholder="Liste des sponsors/partenaires actuels (ou 'aucun')"
            className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none ${errors.autresSponsors ? 'border-red-400' : 'border-gray-300'}`} />
          {errors.autresSponsors && <p className="text-xs text-red-500 mt-1">{errors.autresSponsors}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secteurs des sponsors actuels</label>
          <input type="text" name="autresSponsorsSecteurs" value={formData.autresSponsorsSecteurs} onChange={handleChange}
            placeholder="Sport, nutrition, tech..." className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
        </div>

        {/* Exclusivité */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exclusivité demandée ? <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {(['oui', 'non'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ exclusiviteDemandee: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.exclusiviteDemandee === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val === 'oui' ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
          {errors.exclusiviteDemandee && <p className="text-xs text-red-500 mt-1">{errors.exclusiviteDemandee}</p>}
          {formData.exclusiviteDemandee === 'oui' && (
            <input type="text" name="exclusiviteDetails" value={formData.exclusiviteDetails} onChange={handleChange}
              placeholder="Détails de l'exclusivité demandée..."
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          )}
        </div>
      </div>

      {/* === Section D : Reporting === */}
      <div className="bg-gray-50 rounded-2xl p-5 space-y-5">
        <h4 className="text-base font-semibold text-digiqo-primary">Reporting & Tracking</h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reporting mensuel (stats + preuves) ?</label>
          <div className="flex gap-3">
            {(['oui', 'non'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ reportingMensuel: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.reportingMensuel === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val === 'oui' ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Liens trackés (UTM) + code promo si besoin ?</label>
          <div className="flex gap-3">
            {(['oui', 'non'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ liensTrackes: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.liensTrackes === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val === 'oui' ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Section E : Droits à l'image === */}
      <div className="bg-gray-50 rounded-2xl p-5 space-y-5">
        <h4 className="text-base font-semibold text-digiqo-primary">Droits à l'image & Conformité</h4>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Réutilisation des contenus par Digiqo <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {([
              { value: 'organique', label: 'Organique uniquement' },
              { value: 'organique_ads', label: 'Organique + publicités (ads)' },
              { value: 'non', label: 'Non' },
            ] as const).map(opt => (
              <button key={opt.value} type="button" onClick={() => updateFormData({ reutilisationContenus: opt.value })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.reutilisationContenus === opt.value ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {opt.label}
              </button>
            ))}
          </div>
          {errors.reutilisationContenus && <p className="text-xs text-red-500 mt-1">{errors.reutilisationContenus}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Durée d'autorisation <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {(['3', '6', '12', '24'] as const).map(val => (
              <button key={val} type="button" onClick={() => updateFormData({ dureeAutorisation: val })}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.dureeAutorisation === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
                {val} mois
              </button>
            ))}
          </div>
          {errors.dureeAutorisation && <p className="text-xs text-red-500 mt-1">{errors.dureeAutorisation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Restrictions / incompatibilités</label>
          <input type="text" name="restrictionsIncompatibilites" value={formData.restrictionsIncompatibilites} onChange={handleChange}
            placeholder="Marques ou secteurs incompatibles..." className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
        </div>

        <div>
          <label className={`flex items-start gap-3 cursor-pointer ${errors.comportementCompatible ? 'text-red-600' : ''}`}>
            <input
              type="checkbox"
              name="comportementCompatible"
              checked={formData.comportementCompatible}
              onChange={(e) => updateFormData({ comportementCompatible: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-digiqo-accent focus:ring-digiqo-accent"
            />
            <span className="text-sm text-gray-700">
              Je confirme que mon comportement et mon image sont compatibles avec les valeurs de Digiqo.{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.comportementCompatible && <p className="text-xs text-red-500 mt-1">{errors.comportementCompatible}</p>}
        </div>
      </div>
    </div>
  )
}
