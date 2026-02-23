import type { StepProps } from '@/lib/partnership-types'

export default function StepAthleteProfile({ formData, updateFormData, errors }: StepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateFormData({ [e.target.name]: e.target.value } as any)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Profil sportif</h3>
        <p className="text-sm text-gray-500 mb-6">Détails sur ta pratique sportive et tes résultats</p>
      </div>

      {/* A1 - Discipline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Discipline <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="athDiscipline"
          value={formData.athDiscipline}
          onChange={handleChange}
          placeholder="Beach Tennis"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all ${errors.athDiscipline ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.athDiscipline && <p className="text-xs text-red-500 mt-1">{errors.athDiscipline}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* A2 - Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select name="athCategorie" value={formData.athCategorie} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all">
            <option value="">Sélectionner...</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="mixte">Mixte</option>
            <option value="junior">Junior</option>
          </select>
        </div>

        {/* A3 - Niveau */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Niveau <span className="text-red-500">*</span>
          </label>
          <select name="athNiveau" value={formData.athNiveau} onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all ${errors.athNiveau ? 'border-red-400' : 'border-gray-300'}`}>
            <option value="">Sélectionner...</option>
            <option value="departemental">Départemental</option>
            <option value="regional">Régional</option>
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
          {errors.athNiveau && <p className="text-xs text-red-500 mt-1">{errors.athNiveau}</p>}
        </div>
      </div>

      {/* A4 - Classement/ranking */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Classement / Ranking</label>
          <input type="text" name="athClassementRanking" value={formData.athClassementRanking} onChange={handleChange}
            placeholder="ex: Top 10 France" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lien preuve classement</label>
          <input type="url" name="athLienPreuveClassement" value={formData.athLienPreuveClassement} onChange={handleChange}
            placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
        </div>
      </div>

      {/* A5 - Club */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Club / Structure</label>
        <input type="text" name="athClubStructure" value={formData.athClubStructure} onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
      </div>

      {/* A6 - Palmarès */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Palmarès (Top 5 résultats + année) <span className="text-red-500">*</span>
        </label>
        <textarea
          name="athPalmares"
          value={formData.athPalmares}
          onChange={handleChange}
          rows={4}
          placeholder={"1. Champion régional Beach Tennis 2024\n2. Vainqueur Open de Saint-Denis 2023\n3. ..."}
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none ${errors.athPalmares ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.athPalmares && <p className="text-xs text-red-500 mt-1">{errors.athPalmares}</p>}
      </div>

      {/* A7 - Objectifs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Objectifs 12 mois <span className="text-red-500">*</span>
        </label>
        <textarea
          name="athObjectifs12Mois"
          value={formData.athObjectifs12Mois}
          onChange={handleChange}
          rows={3}
          placeholder="Quels sont tes objectifs sportifs pour les 12 prochains mois ?"
          className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all resize-none ${errors.athObjectifs12Mois ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.athObjectifs12Mois && <p className="text-xs text-red-500 mt-1">{errors.athObjectifs12Mois}</p>}
      </div>

      {/* A8 - Volume d'entraînement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Volume d'entraînement (h/semaine)</label>
        <input type="text" name="athVolumeEntrainement" value={formData.athVolumeEntrainement} onChange={handleChange}
          placeholder="ex: 15h/semaine" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-digiqo-accent/50 focus:border-digiqo-accent outline-none transition-all" />
      </div>
    </div>
  )
}
