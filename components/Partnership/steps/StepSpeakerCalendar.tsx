import type { StepProps, SpeakerReferenceEntry, SpeakerEventEntry } from '@/lib/partnership-types'
import RepeaterTable from '../RepeaterTable'

let nextRefId = 200
let nextEvtId = 300

export default function StepSpeakerCalendar({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  const createEmptyRef = (): SpeakerReferenceEntry => ({
    id: String(nextRefId++),
    nomEvenement: '',
    date: '',
    lieu: '',
    role: '',
    audienceEstimee: '',
    lienPreuve: '',
  })

  const createEmptyEvent = (): SpeakerEventEntry => ({
    id: String(nextEvtId++),
    nom: '',
    dates: '',
    lieu: '',
    statut: '',
    audienceEstimee: '',
    lienOfficiel: '',
  })

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Références & Calendrier</h3>
        <p className="text-sm text-gray-500 mb-6">Tes expériences passées et événements à venir</p>
      </div>

      {/* S6 - Nombre d'événements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre d'événements animés sur 12 mois <span className="text-red-500">*</span>
        </label>
        <input type="number" name="spkNbEvenements12Mois" value={formData.spkNbEvenements12Mois} onChange={handleChange}
          min="0" placeholder="ex: 20"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all ${errors.spkNbEvenements12Mois ? 'border-red-400' : 'border-gray-300'}`} />
        {errors.spkNbEvenements12Mois && <p className="text-xs text-red-500 mt-1">{errors.spkNbEvenements12Mois}</p>}
      </div>

      {/* S7 - Top références (repeater) */}
      <RepeaterTable<SpeakerReferenceEntry>
        label="Top références (3-5 événements marquants)"
        entries={formData.spkReferences}
        onChange={(entries) => updateFormData({ spkReferences: entries })}
        createEmpty={createEmptyRef}
        minEntries={1}
        maxEntries={5}
        error={errors.spkReferences}
        renderEntry={(entry, _index, update) => (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nom de l'événement</label>
                <input type="text" value={entry.nomEvenement} onChange={(e) => update({ nomEvenement: e.target.value })}
                  placeholder="Grand Raid Talk" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input type="text" value={entry.date} onChange={(e) => update({ date: e.target.value })}
                  placeholder="Oct 2025" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Lieu</label>
                <input type="text" value={entry.lieu} onChange={(e) => update({ lieu: e.target.value })}
                  placeholder="Saint-Denis" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rôle</label>
                <input type="text" value={entry.role} onChange={(e) => update({ role: e.target.value })}
                  placeholder="MC, podium, interviews..." className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Audience estimée</label>
                <input type="text" value={entry.audienceEstimee} onChange={(e) => update({ audienceEstimee: e.target.value })}
                  placeholder="ex: 2000" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Lien preuve (vidéo, article...)</label>
              <input type="url" value={entry.lienPreuve} onChange={(e) => update({ lienPreuve: e.target.value })}
                placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
            </div>
          </div>
        )}
      />

      {/* S8 - Événements à venir (repeater) */}
      <RepeaterTable<SpeakerEventEntry>
        label="Événements à venir"
        entries={formData.spkEvenements}
        onChange={(entries) => updateFormData({ spkEvenements: entries })}
        createEmpty={createEmptyEvent}
        minEntries={1}
        maxEntries={10}
        renderEntry={(entry, _index, update) => (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nom</label>
                <input type="text" value={entry.nom} onChange={(e) => update({ nom: e.target.value })}
                  placeholder="Salon du sport" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date(s)</label>
                <input type="text" value={entry.dates} onChange={(e) => update({ dates: e.target.value })}
                  placeholder="5-7 juin 2026" className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Lieu</label>
                <input type="text" value={entry.lieu} onChange={(e) => update({ lieu: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
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
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Audience estimée</label>
                <input type="text" value={entry.audienceEstimee} onChange={(e) => update({ audienceEstimee: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Lien officiel</label>
              <input type="url" value={entry.lienOfficiel} onChange={(e) => update({ lienOfficiel: e.target.value })}
                placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
            </div>
          </div>
        )}
      />

      {/* S9 - Contrats confirmés */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contrats confirmés à venir ?</label>
        <div className="flex gap-3">
          {(['oui', 'non'] as const).map(val => (
            <button key={val} type="button" onClick={() => updateFormData({ spkContratsConfirmes: val })}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.spkContratsConfirmes === val ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
              {val === 'oui' ? 'Oui' : 'Non'}
            </button>
          ))}
        </div>
        {formData.spkContratsConfirmes === 'oui' && (
          <textarea name="spkContratsDetails" value={formData.spkContratsDetails} onChange={handleChange}
            rows={2} placeholder="Détails des contrats confirmés..."
            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none" />
        )}
      </div>
    </div>
  )
}
