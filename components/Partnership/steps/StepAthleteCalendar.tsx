import type { StepProps, AthleteEventEntry } from '@/lib/partnership-types'
import RepeaterTable from '../RepeaterTable'

let nextId = 100

export default function StepAthleteCalendar({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  const createEmptyEvent = (): AthleteEventEntry => ({
    id: String(nextId++),
    nom: '',
    dates: '',
    lieu: '',
    niveau: '',
    statut: '',
    lienOfficiel: '',
    audienceEstimee: '',
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Calendrier & Exposition</h3>
        <p className="text-sm text-gray-500 mb-6">Compétitions prévues, médiatisation et événements organisés</p>
      </div>

      {/* A9 - Nombre de compétitions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de compétitions prévues sur 12 mois <span className="text-red-500">*</span>
        </label>
        <input type="number" name="athNbCompetitions12Mois" value={formData.athNbCompetitions12Mois} onChange={handleChange}
          min="0" placeholder="ex: 15"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all ${errors.athNbCompetitions12Mois ? 'border-red-400' : 'border-gray-300'}`} />
        {errors.athNbCompetitions12Mois && <p className="text-xs text-red-500 mt-1">{errors.athNbCompetitions12Mois}</p>}
      </div>

      {/* A10 - Événements à venir (repeater) */}
      <RepeaterTable<AthleteEventEntry>
        label="Événements à venir (min. 3 recommandés)"
        entries={formData.athEvenements}
        onChange={(entries) => updateFormData({ athEvenements: entries })}
        createEmpty={createEmptyEvent}
        minEntries={1}
        maxEntries={10}
        error={errors.athEvenements}
        renderEntry={(entry, _index, update) => (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nom de l'événement</label>
                <input type="text" value={entry.nom} onChange={(e) => update({ nom: e.target.value })}
                  placeholder="Open de Saint-Denis" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date(s)</label>
                <input type="text" value={entry.dates} onChange={(e) => update({ dates: e.target.value })}
                  placeholder="15-16 mars 2026" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Lieu</label>
                <input type="text" value={entry.lieu} onChange={(e) => update({ lieu: e.target.value })}
                  placeholder="Saint-Denis" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Niveau</label>
                <select value={entry.niveau} onChange={(e) => update({ niveau: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all">
                  <option value="">—</option>
                  <option value="local">Local</option>
                  <option value="national">National</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Statut</label>
                <select value={entry.statut} onChange={(e) => update({ statut: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all">
                  <option value="">—</option>
                  <option value="confirme">Confirmé</option>
                  <option value="en_attente">En attente</option>
                  <option value="objectif">Objectif</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Lien officiel</label>
                <input type="url" value={entry.lienOfficiel} onChange={(e) => update({ lienOfficiel: e.target.value })}
                  placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Audience estimée</label>
                <input type="text" value={entry.audienceEstimee} onChange={(e) => update({ audienceEstimee: e.target.value })}
                  placeholder="ex: 500 spectateurs" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
            </div>
          </div>
        )}
      />

      {/* A11 - Médias */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Couverture médias (TV/radio/presse) ?</label>
        <div className="flex gap-3">
          {(['oui', 'non'] as const).map(val => (
            <button key={val} type="button" onClick={() => updateFormData({ athMedias: val })}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.athMedias === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
              {val === 'oui' ? 'Oui' : 'Non'}
            </button>
          ))}
        </div>
        {formData.athMedias === 'oui' && (
          <textarea name="athMediasDetails" value={formData.athMediasDetails} onChange={handleChange}
            rows={2} placeholder="Détails de la couverture média..."
            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none" />
        )}
      </div>

      {/* A12 - Stages/événements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Organises-tu des stages/événements ?</label>
        <div className="flex gap-3">
          {(['oui', 'non'] as const).map(val => (
            <button key={val} type="button" onClick={() => updateFormData({ athOrganiseStages: val })}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.athOrganiseStages === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
              {val === 'oui' ? 'Oui' : 'Non'}
            </button>
          ))}
        </div>
        {formData.athOrganiseStages === 'oui' && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <textarea name="athStagesDetails" value={formData.athStagesDetails} onChange={handleChange}
              rows={2} placeholder="Détails (type, fréquence...)"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none" />
            <input type="text" name="athStagesFrequentation" value={formData.athStagesFrequentation} onChange={handleChange}
              placeholder="Fréquentation moyenne"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          </div>
        )}
      </div>
    </div>
  )
}
