
import { m as motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Target, ShoppingCart, TrendingUp, BarChart3, Database, Filter } from 'lucide-react';

interface ConversionStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function ConversionStep({ data, updateData }: ConversionStepProps) {
  const funnelStages = [
    { value: 'awareness', label: 'Sensibilisation (découverte)' },
    { value: 'interest', label: 'Intérêt (engagement)' },
    { value: 'consideration', label: 'Considération (comparaison)' },
    { value: 'intent', label: 'Intention (pré-achat)' },
    { value: 'purchase', label: 'Achat/Conversion' },
    { value: 'retention', label: 'Fidélisation' },
    { value: 'advocacy', label: 'Recommandation' },
  ];

  const trackingTools = [
    { value: 'google-analytics', label: 'Google Analytics' },
    { value: 'gtm', label: 'Google Tag Manager' },
    { value: 'facebook-pixel', label: 'Facebook Pixel' },
    { value: 'hotjar', label: 'Hotjar/Clarity' },
    { value: 'mixpanel', label: 'Mixpanel' },
    { value: 'segment', label: 'Segment' },
    { value: 'matomo', label: 'Matomo' },
    { value: 'custom', label: 'Solution custom' },
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
          Tunnel de Conversion & Données
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analysons votre processus de conversion et utilisation des données
        </p>
      </div>

      {/* Tunnel de vente */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Filter className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Tunnel de vente</h3>
        </div>
        <FormField
          label=""
          name="hasLandingPages"
          type="checkbox"
          placeholder="Nous avons des pages de destination dédiées"
          value={data.conversion?.hasLandingPages || false}
          onChange={(e) => updateData('conversion.hasLandingPages', (e.target as HTMLInputElement).checked)}
        />
        <FormField
          label=""
          name="hasForms"
          type="checkbox"
          placeholder="Nous avons des formulaires de conversion"
          value={data.conversion?.hasForms || false}
          onChange={(e) => updateData('conversion.hasForms', (e.target as HTMLInputElement).checked)}
        />
        <FormField
          label=""
          name="hasCtaButtons"
          type="checkbox"
          placeholder="Nos boutons d'action sont optimisés"
          value={data.conversion?.hasCtaButtons || false}
          onChange={(e) => updateData('conversion.hasCtaButtons', (e.target as HTMLInputElement).checked)}
        />
        {(data.conversion?.hasLandingPages || data.conversion?.hasForms) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {funnelStages.map(stage => (
                <label
                  key={stage.value}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value={stage.value}
                    checked={data.conversion?.funnelStages?.includes(stage.value) || false}
                    onChange={(e) => {
                      const current = data.conversion?.funnelStages || [];
                      if (e.target.checked) {
                        updateData('conversion.funnelStages', [...current, stage.value]);
                      } else {
                        updateData('conversion.funnelStages', current.filter(v => v !== stage.value));
                      }
                    }}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="text-sm">{stage.label}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Efficacité du tunnel (0-10)</span>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Configuration du tunnel en cours de développement...
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Métriques de conversion */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Target className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Métriques de conversion</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Taux de conversion moyen"
            name="conversionRate"
            type="select"
            options={[
              { value: '<1', label: 'Moins de 1%' },
              { value: '1-2', label: '1% à 2%' },
              { value: '2-3', label: '2% à 3%' },
              { value: '3-5', label: '3% à 5%' },
              { value: '5-10', label: '5% à 10%' },
              { value: '10+', label: 'Plus de 10%' },
              { value: 'unknown', label: 'Non mesuré' },
            ]}
            value={data.conversion?.estimatedConversionRate || ''}
            onChange={(e) => updateData('conversion.estimatedConversionRate', e.target.value)}
          />
          <FormField
            label="Valeur moyenne par client"
            name="averageOrderValue"
            placeholder="Ex: 150€, 1500€..."
            value={data.conversion?.averageOrderValue || ''}
            onChange={(e) => updateData('conversion.averageOrderValue', e.target.value)}
          />
        </div>
        <FormField
          label="Principaux points de friction"
          name="frictionPoints"
          multiline
          rows={3}
          placeholder="Ex: Abandon de panier élevé, formulaires trop longs, manque de confiance..."
          value={data.conversion?.frictionPoints || ''}
          onChange={(e) => updateData('conversion.frictionPoints', e.target.value)}
        />
      </div>

      {/* E-commerce spécifique */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <ShoppingCart className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">E-commerce</h3>
        </div>
        <FormField
          label=""
          name="hasEcommerce"
          type="checkbox"
          placeholder="Nous vendons en ligne"
          value={data.conversion?.hasEcommerce || false}
          onChange={(e) => updateData('conversion.hasEcommerce', (e.target as HTMLInputElement).checked)}
        />
        {data.conversion?.hasEcommerce && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Taux d'abandon de panier"
              name="cartAbandonmentRate"
              type="select"
              options={[
                { value: '<50', label: 'Moins de 50%' },
                { value: '50-60', label: '50% à 60%' },
                { value: '60-70', label: '60% à 70%' },
                { value: '70-80', label: '70% à 80%' },
                { value: '80+', label: 'Plus de 80%' },
                { value: 'unknown', label: 'Non mesuré' },
              ]}
              value={data.conversion?.cartAbandonmentRate || ''}
              onChange={(e) => updateData('conversion.cartAbandonmentRate', e.target.value)}
            />
            <FormField
              label="Nombre de ventes/mois"
              name="monthlySales"
              placeholder="Ex: 10, 100, 1000..."
              value={data.conversion?.monthlySales || ''}
              onChange={(e) => updateData('conversion.monthlySales', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Analytics et tracking */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Analytics et tracking</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {trackingTools.map(tool => (
            <label
              key={tool.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={tool.value}
                checked={data.conversion?.trackingTools?.includes(tool.value) || false}
                onChange={(e) => {
                  const current = data.conversion?.trackingTools || [];
                  if (e.target.checked) {
                    updateData('conversion.trackingTools', [...current, tool.value]);
                  } else {
                    updateData('conversion.trackingTools', current.filter(v => v !== tool.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{tool.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Utilisation des données */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Database className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Utilisation des données</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="dataAnalysis"
            type="checkbox"
            placeholder="Nous analysons régulièrement nos données"
            value={data.conversion?.dataAnalysis || false}
            onChange={(e) => updateData('conversion.dataAnalysis', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="dataDecisions"
            type="checkbox"
            placeholder="Nous prenons des décisions basées sur les données"
            value={data.conversion?.dataDecisions || false}
            onChange={(e) => updateData('conversion.dataDecisions', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="gdprCompliant"
            type="checkbox"
            placeholder="Nous sommes conformes RGPD"
            value={data.conversion?.gdprCompliant || false}
            onChange={(e) => updateData('conversion.gdprCompliant', (e.target as HTMLInputElement).checked)}
          />
        </div>
        <FormField
          label="Fréquence d'analyse des données"
          name="analysisFrequency"
          type="select"
          options={[
            { value: 'daily', label: 'Quotidienne' },
            { value: 'weekly', label: 'Hebdomadaire' },
            { value: 'monthly', label: 'Mensuelle' },
            { value: 'quarterly', label: 'Trimestrielle' },
            { value: 'yearly', label: 'Annuelle' },
            { value: 'never', label: 'Jamais' },
          ]}
          value={data.conversion?.analysisFrequency || ''}
          onChange={(e) => updateData('conversion.analysisFrequency', e.target.value)}
        />
      </div>

      {/* Optimisation de conversion */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Optimisation de conversion</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="abTesting"
            type="checkbox"
            placeholder="Nous faisons des tests A/B"
            value={data.conversion?.abTesting || false}
            onChange={(e) => updateData('conversion.abTesting', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="heatmaps"
            type="checkbox"
            placeholder="Nous utilisons des heatmaps"
            value={data.conversion?.heatmaps || false}
            onChange={(e) => updateData('conversion.heatmaps', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="userFeedback"
            type="checkbox"
            placeholder="Nous collectons les retours utilisateurs"
            value={data.conversion?.userFeedback || false}
            onChange={(e) => updateData('conversion.userFeedback', (e.target as HTMLInputElement).checked)}
          />
        </div>
      </div>

      {/* Lead Management */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Target className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Gestion des leads</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="leadTracking"
            type="checkbox"
            placeholder="Nous suivons nos leads"
            value={data.conversion?.leadTracking || false}
            onChange={(e) => updateData('conversion.leadTracking', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="leadNurturing"
            type="checkbox"
            placeholder="Nous avons un système de lead nurturing"
            value={data.conversion?.leadNurturing || false}
            onChange={(e) => updateData('conversion.leadNurturing', (e.target as HTMLInputElement).checked)}
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Info:</strong> Un tunnel de conversion optimisé et une utilisation intelligente 
          des données peuvent multiplier votre ROI par 2 à 5.
        </p>
      </div>
    </motion.div>
  );
}
