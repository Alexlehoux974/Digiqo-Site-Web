import type { StepProps } from '@/lib/partnership-types'
import FileUploadField from '../FileUploadField'

const networks = [
  { key: 'instagram', label: 'Instagram', urlField: 'instagramUrl', followersField: 'instagramAbonnes', placeholder: '@votre_compte' },
  { key: 'tiktok', label: 'TikTok', urlField: 'tiktokUrl', followersField: 'tiktokAbonnes', placeholder: '@votre_compte' },
  { key: 'youtube', label: 'YouTube', urlField: 'youtubeUrl', followersField: 'youtubeAbonnes', placeholder: 'Lien chaîne' },
  { key: 'facebook', label: 'Facebook', urlField: 'facebookUrl', followersField: 'facebookAbonnes', placeholder: 'Lien page' },
  { key: 'linkedin', label: 'LinkedIn', urlField: 'linkedinUrl', followersField: 'linkedinAbonnes', placeholder: 'Lien profil' },
  { key: 'autre', label: 'Autre', urlField: 'autreReseauUrl', followersField: 'autreReseauAbonnes', placeholder: 'Lien' },
] as const

export default function StepSocialMedia({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Réseaux sociaux & Audience</h3>
        <p className="text-sm text-gray-500 mb-6">Au moins 1 réseau social est requis. Les preuves renforcent votre candidature.</p>
      </div>

      {errors.reseaux && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">{errors.reseaux}</p>
        </div>
      )}

      {/* Social networks */}
      <div className="space-y-4">
        {networks.map(({ key, label, urlField, followersField, placeholder }) => (
          <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                name={urlField}
                value={(formData as any)[urlField]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Abonnés</label>
              <input
                type="number"
                name={followersField}
                value={(formData as any)[followersField]}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats 30 derniers jours */}
      <div className="mt-8">
        <h4 className="text-base font-semibold text-gray-800 mb-1">Stats 30 derniers jours</h4>
        <p className="text-xs text-gray-500 mb-4">Recommandé — renforce significativement votre candidature</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reach (portée)</label>
            <input type="text" name="statsReach" value={formData.statsReach} onChange={handleChange}
              placeholder="ex: 50 000" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Impressions</label>
            <input type="text" name="statsImpressions" value={formData.statsImpressions} onChange={handleChange}
              placeholder="ex: 120 000" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vues vidéo</label>
            <input type="text" name="statsVuesVideo" value={formData.statsVuesVideo} onChange={handleChange}
              placeholder="ex: 200 000" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taux d'engagement</label>
            <input type="text" name="statsEngagement" value={formData.statsEngagement} onChange={handleChange}
              placeholder="ex: 4.5%" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Localisation audience principale</label>
          <input type="text" name="statsLocalisationAudience" value={formData.statsLocalisationAudience} onChange={handleChange}
            placeholder="ex: 60% La Réunion, 20% France métro..." className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
        </div>
      </div>

      {/* Captures insights */}
      <div className="mt-8">
        <FileUploadField
          label="Captures d'écran insights / statistiques"
          accept=".jpg,.jpeg,.png,.pdf"
          maxSizeMB={5}
          multiple
          files={formData.capturesInsights}
          onChange={(files) => updateFormData({ capturesInsights: files })}
          helpText="Screenshots de vos statistiques Instagram, TikTok, YouTube, etc. Recommandé pour renforcer votre dossier."
        />
      </div>
    </div>
  )
}
