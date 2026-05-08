
import { m as motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { TrendingUp, Target, DollarSign, BarChart3 } from 'lucide-react';

interface AdvertisingStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function AdvertisingStep({ data, updateData }: AdvertisingStepProps) {
  const platforms = [
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook-ads', label: 'Facebook Ads' },
    { value: 'instagram-ads', label: 'Instagram Ads' },
    { value: 'linkedin-ads', label: 'LinkedIn Ads' },
    { value: 'tiktok-ads', label: 'TikTok Ads' },
    { value: 'youtube-ads', label: 'YouTube Ads' },
    { value: 'display', label: 'Display/Bannières' },
    { value: 'native', label: 'Native Advertising' },
  ];

  const objectives = [
    { value: 'traffic', label: 'Trafic vers le site' },
    { value: 'conversions', label: 'Conversions/Ventes' },
    { value: 'leads', label: 'Génération de leads' },
    { value: 'awareness', label: 'Notoriété de marque' },
    { value: 'app-installs', label: 'Installations d\'app' },
    { value: 'video-views', label: 'Vues vidéo' },
    { value: 'local', label: 'Visites en magasin' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Publicité & Acquisition Payante
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analysons vos investissements publicitaires et performances
        </p>
      </div>

      {/* Utilisation de la publicité */}
      <div className="space-y-4">
        <FormField
          label=""
          name="useAdvertising"
          type="checkbox"
          placeholder="Nous utilisons de la publicité payante"
          value={data.advertising?.useAdvertising || false}
          onChange={(e) => {
            updateData('advertising.useAdvertising', (e.target as HTMLInputElement).checked);
            if (!(e.target as HTMLInputElement).checked) {
              updateData('advertising.testedPlatforms', []);
            }
          }}
        />
      </div>

      {data.advertising?.useAdvertising && (
        <>
          {/* Plateformes publicitaires */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Plateformes publicitaires utilisées</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {platforms.map(platform => (
                <label
                  key={platform.value}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value={platform.value}
                    checked={data.advertising?.testedPlatforms?.includes(platform.value) || false}
                    onChange={(e) => {
                      const current = data.advertising?.testedPlatforms || [];
                      if (e.target.checked) {
                        updateData('advertising.testedPlatforms', [...current, platform.value]);
                      } else {
                        updateData('advertising.testedPlatforms', current.filter(v => v !== platform.value));
                      }
                    }}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="text-sm">{platform.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget mensuel */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <DollarSign className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Budget publicitaire</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Budget mensuel moyen"
                name="averageBudget"
                type="select"
                options={[
                  { value: '<500', label: 'Moins de 500€' },
                  { value: '500-1000', label: '500€ à 1 000€' },
                  { value: '1000-2500', label: '1 000€ à 2 500€' },
                  { value: '2500-5000', label: '2 500€ à 5 000€' },
                  { value: '5000-10000', label: '5 000€ à 10 000€' },
                  { value: '10000-25000', label: '10 000€ à 25 000€' },
                  { value: '25000+', label: 'Plus de 25 000€' },
                ]}
                value={data.advertising?.averageBudget || ''}
                onChange={(e) => updateData('advertising.averageBudget', e.target.value)}
              />
              <FormField
                label="Résultats perçus"
                name="perceivedResults"
                type="select"
                options={[
                  { value: 'excellent', label: 'Excellents' },
                  { value: 'good', label: 'Bons' },
                  { value: 'average', label: 'Moyens' },
                  { value: 'poor', label: 'Faibles' },
                  { value: 'none', label: 'Aucun résultat' },
                  { value: 'unknown', label: 'Non mesurés' },
                ]}
                value={data.advertising?.perceivedResults || ''}
                onChange={(e) => updateData('advertising.perceivedResults', e.target.value)}
              />
            </div>
          </div>

          {/* Objectifs publicitaires */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Objectifs de vos campagnes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {objectives.map(objective => (
                <label
                  key={objective.value}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value={objective.value}
                    checked={data.advertising?.campaignObjectives?.includes(objective.value) || false}
                    onChange={(e) => {
                      const current = data.advertising?.campaignObjectives || [];
                      if (e.target.checked) {
                        updateData('advertising.campaignObjectives', [...current, objective.value]);
                      } else {
                        updateData('advertising.campaignObjectives', current.filter(v => v !== objective.value));
                      }
                    }}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="text-sm">{objective.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Suivi et tracking */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <BarChart3 className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Suivi et optimisation</h3>
            </div>
            <div className="space-y-3">
              <FormField
                label=""
                name="tracking"
                type="checkbox"
                placeholder="Nous avons un système de tracking configuré"
                value={data.advertising?.tracking || false}
                onChange={(e) => updateData('advertising.tracking', (e.target as HTMLInputElement).checked)}
              />
              <FormField
                label=""
                name="conversionTunnel"
                type="checkbox"
                placeholder="Nous avons un tunnel de conversion défini"
                value={data.advertising?.conversionTunnel || false}
                onChange={(e) => updateData('advertising.conversionTunnel', (e.target as HTMLInputElement).checked)}
              />
            </div>
          </div>

          {/* Attentes et objectifs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Vos attentes</h3>
            </div>
            <FormField
              label=""
              name="expectations"
              multiline
              rows={3}
              placeholder="Ex: Améliorer le ROI, réduire les coûts d'acquisition, augmenter les conversions, cibler plus précisément..."
              value={data.advertising?.expectations || ''}
              onChange={(e) => updateData('advertising.expectations', e.target.value)}
              helper="Décrivez vos attentes concernant la publicité digitale"
            />
          </div>
        </>
      )}

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Info:</strong> Une stratégie publicitaire efficace combine ciblage précis, 
          créativités engageantes et optimisation continue basée sur les données.
        </p>
      </div>
    </motion.div>
  );
}
