
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Monitor, Search, Zap, Palette, Smartphone, BarChart } from 'lucide-react';

interface WebsiteStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function WebsiteStep({ data, updateData }: WebsiteStepProps) {
  const objectiveOptions = [
    { value: 'vitrine', label: 'Site vitrine' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'lead', label: 'Génération de leads' },
    { value: 'blog', label: 'Blog/Contenu' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'service', label: 'Plateforme de service' },
    { value: 'community', label: 'Communauté' },
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
          Analyse de votre Site Web
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Évaluons la performance et l'efficacité de votre site
        </p>
      </div>

      {/* Existence du site */}
      <div className="space-y-4">
        <FormField
          label=""
          name="hasWebsite"
          type="checkbox"
          placeholder="J'ai un site web actif"
          value={data.website?.hasWebsite || false}
          onChange={(e) => updateData('website.hasWebsite', (e.target as HTMLInputElement).checked)}
        />
      </div>

      {data.website?.hasWebsite && (
        <>
          {/* Objectifs */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Monitor className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Objectifs du site</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {objectiveOptions.map(option => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={data.website?.objectives?.includes(option.value) || false}
                    onChange={(e) => {
                      const current = data.website?.objectives || [];
                      if (e.target.checked) {
                        updateData('website.objectives', [...current, option.value]);
                      } else {
                        updateData('website.objectives', current.filter(v => v !== option.value));
                      }
                    }}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Qualité perçue */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Qualité perçue (0 = mauvais, 10 = excellent)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Expérience utilisateur (UX)</span>
                </div>
                <FormField
                  label=""
                  name="ux"
                  type="range"
                  value={data.website?.perceivedQuality?.ux || 5}
                  onChange={(e) => updateData('website.perceivedQuality.ux', parseInt(e.target.value))}
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Version mobile</span>
                </div>
                <FormField
                  label=""
                  name="mobile"
                  type="range"
                  value={data.website?.perceivedQuality?.mobile || 5}
                  onChange={(e) => updateData('website.perceivedQuality.mobile', parseInt(e.target.value))}
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Rapidité</span>
                </div>
                <FormField
                  label=""
                  name="speed"
                  type="range"
                  value={data.website?.perceivedQuality?.speed || 5}
                  onChange={(e) => updateData('website.perceivedQuality.speed', parseInt(e.target.value))}
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Palette className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Design</span>
                </div>
                <FormField
                  label=""
                  name="design"
                  type="range"
                  value={data.website?.perceivedQuality?.design || 5}
                  onChange={(e) => updateData('website.perceivedQuality.design', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Search className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Référencement naturel (SEO)</h3>
            </div>
            <FormField
              label=""
              name="seoOptimized"
              type="checkbox"
              placeholder="Mon site est optimisé pour le SEO"
              value={data.website?.seo?.optimized || false}
              onChange={(e) => updateData('website.seo.optimized', (e.target as HTMLInputElement).checked)}
            />
            <FormField
              label="Mots-clés principaux"
              name="keywords"
              placeholder="Ex: agence digitale réunion, marketing digital..."
              value={data.website?.seo?.keywords || ''}
              onChange={(e) => updateData('website.seo.keywords', e.target.value)}
              helper="Séparez les mots-clés par des virgules"
            />
            <FormField
              label="Position moyenne sur Google"
              name="ranking"
              type="select"
              options={[
                { value: 'top3', label: 'Top 3' },
                { value: 'top10', label: 'Top 10 (1ère page)' },
                { value: 'page2', label: '2ème page' },
                { value: 'beyond', label: 'Au-delà' },
                { value: 'unknown', label: 'Je ne sais pas' },
              ]}
              value={data.website?.seo?.ranking || ''}
              onChange={(e) => updateData('website.seo.ranking', e.target.value)}
            />
          </div>

          {/* Outils connectés */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <BarChart className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Outils de tracking</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label=""
                name="analytics"
                type="checkbox"
                placeholder="Google Analytics"
                value={data.website?.tools?.analytics || false}
                onChange={(e) => updateData('website.tools.analytics', (e.target as HTMLInputElement).checked)}
              />
              <FormField
                label=""
                name="pixel"
                type="checkbox"
                placeholder="Facebook Pixel"
                value={data.website?.tools?.pixel || false}
                onChange={(e) => updateData('website.tools.pixel', (e.target as HTMLInputElement).checked)}
              />
              <FormField
                label=""
                name="tagManager"
                type="checkbox"
                placeholder="Google Tag Manager"
                value={data.website?.tools?.tagManager || false}
                onChange={(e) => updateData('website.tools.tagManager', (e.target as HTMLInputElement).checked)}
              />
            </div>
          </div>
        </>
      )}

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Info:</strong> Un site web performant est la base de votre stratégie digitale. 
          Il doit être rapide, mobile-friendly et optimisé pour les moteurs de recherche.
        </p>
      </div>
    </motion.div>
  );
}