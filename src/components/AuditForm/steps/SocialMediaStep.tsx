
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Users, MessageCircle, Target, Calendar, Gauge } from 'lucide-react';

interface SocialMediaStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function SocialMediaStep({ data, updateData }: SocialMediaStepProps) {
  const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'pinterest', label: 'Pinterest' },
    { value: 'snapchat', label: 'Snapchat' },
  ];

  const objectives = [
    { value: 'visibility', label: 'Visibilité de marque' },
    { value: 'engagement', label: 'Engagement communautaire' },
    { value: 'leads', label: 'Génération de leads' },
    { value: 'sales', label: 'Ventes directes' },
    { value: 'support', label: 'Support client' },
    { value: 'recruitment', label: 'Recrutement' },
    { value: 'influence', label: 'Influence et thought leadership' },
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
          Stratégie Réseaux Sociaux
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analysons votre présence et stratégie sur les réseaux sociaux
        </p>
      </div>

      {/* Plateformes actives */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Users className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Plateformes actives</h3>
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
                checked={data.socialMediaStrategy?.activePlatforms?.includes(platform.value) || false}
                onChange={(e) => {
                  const current = data.socialMediaStrategy?.activePlatforms || [];
                  if (e.target.checked) {
                    updateData('socialMediaStrategy.activePlatforms', [...current, platform.value]);
                  } else {
                    updateData('socialMediaStrategy.activePlatforms', current.filter(v => v !== platform.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{platform.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fréquence de publication */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Fréquence de publication</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Fréquence globale"
            name="frequency"
            type="select"
            options={[
              { value: 'multiple-daily', label: 'Plusieurs fois par jour' },
              { value: 'daily', label: 'Quotidienne' },
              { value: '3-5-week', label: '3 à 5 fois par semaine' },
              { value: 'weekly', label: 'Hebdomadaire' },
              { value: 'monthly', label: 'Mensuelle' },
              { value: 'irregular', label: 'Irrégulière' },
              { value: 'none', label: 'Aucune publication' },
            ]}
            value={data.socialMediaStrategy?.publicationFrequency || ''}
            onChange={(e) => updateData('socialMediaStrategy.publicationFrequency', e.target.value)}
          />
          <FormField
            label="Heures de publication"
            name="publicationTime"
            type="select"
            options={[
              { value: 'optimized', label: 'Heures optimisées' },
              { value: 'business', label: 'Heures de bureau' },
              { value: 'evening', label: 'Soirée' },
              { value: 'random', label: 'Aléatoire' },
              { value: 'scheduled', label: 'Planifiées' },
            ]}
            value={data.socialMediaStrategy?.publicationTime || ''}
            onChange={(e) => updateData('socialMediaStrategy.publicationTime', e.target.value)}
            helper=""
          />
        </div>
      </div>

      {/* Engagement communautaire */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <MessageCircle className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Engagement communautaire</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Taille de communauté (total abonnés)</span>
            <FormField
              label=""
              name="communitySize"
              type="select"
              options={[
                { value: '<100', label: 'Moins de 100' },
                { value: '100-500', label: '100 à 500' },
                { value: '500-1000', label: '500 à 1 000' },
                { value: '1000-5000', label: '1 000 à 5 000' },
                { value: '5000-10000', label: '5 000 à 10 000' },
                { value: '10000+', label: 'Plus de 10 000' },
              ]}
              value={data.socialMediaStrategy?.communitySize || ''}
              onChange={(e) => updateData('socialMediaStrategy.communitySize', e.target.value)}
              helper=""
            />
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Taux d'engagement moyen</span>
            <FormField
              label=""
              name="engagementRate"
              type="select"
              options={[
                { value: '<1', label: 'Moins de 1%' },
                { value: '1-3', label: '1% à 3%' },
                { value: '3-5', label: '3% à 5%' },
                { value: '5-10', label: '5% à 10%' },
                { value: '10+', label: 'Plus de 10%' },
                { value: 'unknown', label: 'Je ne sais pas' },
              ]}
              value={data.socialMediaStrategy?.engagement || ''}
              onChange={(e) => updateData('socialMediaStrategy.engagement', e.target.value)}
            />
          </div>
        </div>
        <FormField
          label=""
          name="communityManagement"
          type="checkbox"
          placeholder="Nous répondons activement aux commentaires et messages"
          value={data.socialMediaStrategy?.communityManagement || false}
          onChange={(e) => updateData('socialMediaStrategy.communityManagement', (e.target as HTMLInputElement).checked)}
          helper=""
        />
      </div>

      {/* Objectifs */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Target className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Objectifs sur les réseaux sociaux</h3>
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
                checked={data.socialMediaStrategy?.objectives?.includes(objective.value) || false}
                onChange={(e) => {
                  const current = data.socialMediaStrategy?.objectives || [];
                  if (e.target.checked) {
                    updateData('socialMediaStrategy.objectives', [...current, objective.value]);
                  } else {
                    updateData('socialMediaStrategy.objectives', current.filter(v => v !== objective.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{objective.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type de contenu */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Gauge className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Type de contenu publié</h3>
        </div>
        <FormField
          label="Types de contenu (séparez par des virgules)"
          name="contentTypes"
          placeholder="Ex: Photos produits, vidéos tutoriels, stories, articles de blog, témoignages clients..."
          value={data.socialMediaStrategy?.contentTypes || ''}
          onChange={(e) => updateData('socialMediaStrategy.contentTypes', e.target.value)}
          helper=""
        />
      </div>

      {/* Budget et ressources */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Ressources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Gestion des réseaux sociaux"
            name="management"
            type="select"
            options={[
              { value: 'internal', label: 'En interne' },
              { value: 'agency', label: 'Agence externe' },
              { value: 'freelance', label: 'Freelance' },
              { value: 'mixed', label: 'Mixte' },
              { value: 'none', label: 'Personne' },
            ]}
            value={data.socialMediaStrategy?.managedBy || ''}
            onChange={(e) => updateData('socialMediaStrategy.managedBy', e.target.value)}
          />
          <FormField
            label="Outils utilisés"
            name="tools"
            placeholder="Ex: Hootsuite, Buffer, Later, Meta Business Suite..."
            value={data.socialMediaStrategy?.tools || ''}
            onChange={(e) => updateData('socialMediaStrategy.tools', e.target.value)}
            helper=""
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Conseil:</strong> Une stratégie social media efficace nécessite régularité, 
          engagement authentique et contenu de qualité adapté à chaque plateforme.
        </p>
      </div>
    </motion.div>
  );
}