import type { StepProps } from '@/lib/partnership-types'
import FileUploadField from '../FileUploadField'

export default function StepFinalReview({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  const isAthlete = formData.profileType === 'athlete'
  const isSpeaker = formData.profileType === 'speaker'

  return (
    <div className="space-y-8">
      {/* === Section F : Question filtre === */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Dernière question</h3>
        <p className="text-sm text-gray-500 mb-6">Avant de finaliser ta candidature</p>
      </div>

      <div className="bg-digiqo-accent/5 border border-digiqo-accent/20 rounded-2xl p-5">
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Si Digiqo ne finance pas immédiatement mais propose un partenariat visibilité + création de contenus + opportunités, ça t'intéresse ? <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {([
            { value: 'oui', label: 'Oui, carrément' },
            { value: 'non', label: 'Non' },
            { value: 'ca_depend', label: 'Ça dépend' },
          ] as const).map(opt => (
            <button key={opt.value} type="button" onClick={() => updateFormData({ questionFiltre: opt.value })}
              className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${formData.questionFiltre === opt.value ? 'border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent' : 'border-gray-200 bg-white text-gray-600 hover:border-digiqo-accent/30'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        {errors.questionFiltre && <p className="text-xs text-red-500 mt-1">{errors.questionFiltre}</p>}

        {(formData.questionFiltre === 'ca_depend' || formData.questionFiltre === 'non') && (
          <textarea name="questionFiltreDetails" value={formData.questionFiltreDetails} onChange={handleChange}
            rows={2} placeholder="Précise tes conditions..."
            className="mt-3 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none" />
        )}
      </div>

      {/* === Uploads === */}
      <div className="space-y-5">
        <h4 className="text-base font-semibold text-gray-800">Documents & médias</h4>

        {isAthlete && (
          <>
            <FileUploadField
              label="Media kit / dossier sponsoring (PDF)"
              accept=".pdf"
              maxSizeMB={10}
              multiple={false}
              files={formData.athMediaKit}
              onChange={(files) => updateFormData({ athMediaKit: files })}
              helpText="Ton dossier de sponsoring si tu en as un"
            />
            <FileUploadField
              label="Photos HD en action (min 2 recommandées)"
              accept=".jpg,.jpeg,.png,.webp"
              maxSizeMB={5}
              multiple
              files={formData.athPhotosHD}
              onChange={(files) => updateFormData({ athPhotosHD: files })}
              helpText="Photos de compétition, entraînement, podium..."
            />
          </>
        )}

        {isSpeaker && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Showreel vidéo (lien)</label>
              <input type="url" name="spkShowreelUrl" value={formData.spkShowreelUrl} onChange={handleChange}
                placeholder="YouTube, Vimeo, Google Drive..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
            </div>
            <FileUploadField
              label="Showreel vidéo (upload)"
              accept=".mp4"
              maxSizeMB={20}
              multiple={false}
              files={formData.spkShowreelFile}
              onChange={(files) => updateFormData({ spkShowreelFile: files })}
              helpText="Optionnel si tu as fourni un lien ci-dessus"
            />
            <FileUploadField
              label="Photos en événement"
              accept=".jpg,.jpeg,.png,.webp"
              maxSizeMB={5}
              multiple
              files={formData.spkPhotosEvenement}
              onChange={(files) => updateFormData({ spkPhotosEvenement: files })}
            />
            <FileUploadField
              label="Plaquette / dossier (PDF)"
              accept=".pdf"
              maxSizeMB={10}
              multiple={false}
              files={formData.spkPlaquetteDossier}
              onChange={(files) => updateFormData({ spkPlaquetteDossier: files })}
            />
          </>
        )}
      </div>

      {/* === Récapitulatif === */}
      <div className="bg-gray-50 rounded-2xl p-5">
        <h4 className="text-base font-semibold text-gray-800 mb-4">Récapitulatif</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <SummaryItem label="Profil" value={formData.profileType === 'athlete' ? 'Athlète' : 'Speaker / Animateur'} />
          <SummaryItem label="Type" value={
            formData.partnershipType === 'sponsoring' ? 'Sponsoring financier' :
            formData.partnershipType === 'visibilite' ? 'Partenariat visibilité' : 'Mixte'
          } />
          <SummaryItem label="Nom" value={`${formData.prenom} ${formData.nom}`} />
          <SummaryItem label="Email" value={formData.email} />
          <SummaryItem label="Ville" value={formData.villeZone} />
          {formData.budgetParMois && <SummaryItem label="Budget / mois" value={`${formData.budgetParMois} EUR`} />}
          {formData.budgetParEvenement && <SummaryItem label="Budget / événement" value={`${formData.budgetParEvenement} EUR`} />}
          {formData.budgetParSaison && <SummaryItem label="Budget / saison" value={`${formData.budgetParSaison} EUR`} />}
          <SummaryItem label="Durée" value={formData.dureeSouhaitee ? `${formData.dureeSouhaitee} mois` : '—'} />
          {isAthlete && <SummaryItem label="Discipline" value={formData.athDiscipline} />}
          {isAthlete && <SummaryItem label="Niveau" value={formData.athNiveau} />}
          {isSpeaker && <SummaryItem label="Type speaker" value={formData.spkType} />}
          {isSpeaker && <SummaryItem label="Thématiques" value={formData.spkThematiques} />}
        </div>
      </div>

      {/* Honeypot */}
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} aria-hidden="true">
        <input type="text" name="honeypot" value={formData.honeypot}
          onChange={(e) => updateFormData({ honeypot: e.target.value })} tabIndex={-1} autoComplete="off" />
      </div>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  if (!value || value === '—') return null
  return (
    <div className="flex justify-between gap-2 py-1.5 border-b border-gray-200 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800 text-right">{value}</span>
    </div>
  )
}
