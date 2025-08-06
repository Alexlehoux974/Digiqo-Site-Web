'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { TrendingUp, Target, DollarSign, BarChart3, PieChart, Settings } from 'lucide-react';

interface AdvertisingStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
  errors: Record<string, string>;
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
          onChange={(e) => updateData('advertising.useAdvertising', (e.target as HTMLInputElement).checked)}
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
                    checked={data.advertising?.platforms?.includes(platform.value) || false}
                    onChange={(e) => {
                      const current = data.advertising?.platforms || [];
                      if (e.target.checked) {
                        updateData('advertising.platforms', [...current, platform.value]);
                      } else {
                        updateData('advertising.platforms', current.filter(v => v !== platform.value));
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
                label="Budget mensuel total"
                name="monthlyBudget"
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
                value={data.advertising?.monthlyBudget || ''}
                onChange={(e) => updateData('advertising.monthlyBudget', e.target.value)}
              />
              <FormField
                label="Évolution du budget"
                name="budgetTrend"
                type="select"
                options={[
                  { value: 'increasing', label: 'En augmentation' },
                  { value: 'stable', label: 'Stable' },
                  { value: 'decreasing', label: 'En diminution' },
                  { value: 'variable', label: 'Variable selon saisons' },
                ]}
                value={data.advertising?.budgetTrend || ''}
                onChange={(e) => updateData('advertising.budgetTrend', e.target.value)}
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
                    checked={data.advertising?.objectives?.includes(objective.value) || false}
                    onChange={(e) => {
                      const current = data.advertising?.objectives || [];
                      if (e.target.checked) {
                        updateData('advertising.objectives', [...current, objective.value]);
                      } else {
                        updateData('advertising.objectives', current.filter(v => v !== objective.value));
                      }
                    }}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="text-sm">{objective.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Performances */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <BarChart3 className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Performances actuelles</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Retour sur investissement (ROI)"
                name="roi"
                type="select"
                options={[
                  { value: 'excellent', label: 'Excellent (>300%)' },
                  { value: 'good', label: 'Bon (150-300%)' },
                  { value: 'average', label: 'Moyen (50-150%)' },
                  { value: 'poor', label: 'Faible (<50%)' },
                  { value: 'negative', label: 'Négatif' },
                  { value: 'unknown', label: 'Non mesuré' },
                ]}
                value={data.advertising?.roi || ''}
                onChange={(e) => updateData('advertising.roi', e.target.value)}
              />
              <FormField
                label="Coût par acquisition (CPA)"
                name="cpa"
                placeholder="Ex: 25€ par lead, 150€ par vente..."
                value={data.advertising?.cpa || ''}
                onChange={(e) => updateData('advertising.cpa', e.target.value)}
              />
            </div>
          </div>

          {/* Ciblage et optimisation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <PieChart className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Ciblage et optimisation</h3>
            </div>
            <div className="space-y-3">
              <FormField
                label=""
                name="remarketing"
                type="checkbox"
                placeholder="Nous utilisons le remarketing/retargeting"
                value={data.advertising?.remarketing || false}
                onChange={(e) => updateData('advertising.remarketing', (e.target as HTMLInputElement).checked)}
              />
              <FormField
                label=""
                name="audienceSegmentation"
                type="checkbox"
                placeholder="Nous avons des audiences segmentées"
                value={data.advertising?.audienceSegmentation || false}
                onChange={(e) => updateData('advertising.audienceSegmentation', (e.target as HTMLInputElement).checked)}
              />
              <FormField
                label=""
                name="abTesting"
                type="checkbox"
                placeholder="Nous faisons des tests A/B réguliers"
                value={data.advertising?.abTesting || false}
                onChange={(e) => updateData('advertising.abTesting', (e.target as HTMLInputElement).checked)}
              />
              <FormField
                label=""
                name="conversionTracking"
                type="checkbox"
                placeholder="Nous trackons les conversions"
                value={data.advertising?.conversionTracking || false}
                onChange={(e) => updateData('advertising.conversionTracking', (e.target as HTMLInputElement).checked)}
              />
            </div>
          </div>

          {/* Gestion des campagnes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <Settings className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Gestion des campagnes</h3>
            </div>
            <FormField
              label="Qui gère vos campagnes publicitaires ?"
              name="management"
              type="select"
              options={[
                { value: 'internal', label: 'Équipe interne' },
                { value: 'agency', label: 'Agence spécialisée' },
                { value: 'freelance', label: 'Freelance' },
                { value: 'self', label: 'Moi-même' },
                { value: 'mixed', label: 'Mixte' },
              ]}
              value={data.advertising?.management || ''}
              onChange={(e) => updateData('advertising.management', e.target.value)}
            />
          </div>

          {/* Principaux défis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Principaux défis rencontrés
            </h3>
            <FormField
              label=""
              name="challenges"
              multiline
              rows={3}
              placeholder="Ex: Coûts d'acquisition élevés, concurrence forte, difficulté à mesurer le ROI, budget limité..."
              value={data.advertising?.challenges || ''}
              onChange={(e) => updateData('advertising.challenges', e.target.value)}
              helper="Décrivez vos principaux défis en publicité digitale"
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
