

import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Target, TrendingUp, Calendar, Euro } from 'lucide-react';

interface ObjectivesStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function ObjectivesStep({ data, updateData }: ObjectivesStepProps) {
  const goals = [
    { value: 'visibility', label: 'Augmenter ma visibilité en ligne' },
    { value: 'leads', label: 'Générer plus de leads qualifiés' },
    { value: 'sales', label: 'Augmenter mes ventes' },
    { value: 'branding', label: 'Développer ma marque' },
    { value: 'engagement', label: 'Améliorer l\'engagement client' },
    { value: 'optimization', label: 'Optimiser mes coûts marketing' },
    { value: 'automation', label: 'Automatiser mes processus' },
    { value: 'data', label: 'Mieux exploiter mes données' },
    { value: 'competition', label: 'Me différencier de la concurrence' },
    { value: 'retention', label: 'Fidéliser mes clients' },
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
          Vos Objectifs et Besoins
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Aidez-nous à comprendre vos priorités et vos attentes
        </p>
      </div>

      {/* Objectifs principaux */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Target className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Objectifs principaux</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sélectionnez jusqu'à 3 objectifs prioritaires
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {goals.map(goal => (
            <label
              key={goal.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={goal.value}
                checked={data.objectives?.goals?.includes(goal.value) || false}
                onChange={(e) => {
                  const current = data.objectives?.goals || [];
                  if (e.target.checked && current.length < 3) {
                    updateData('objectives.goals', [...current, goal.value]);
                  } else if (!e.target.checked) {
                    updateData('objectives.goals', current.filter(v => v !== goal.value));
                  }
                }}
                disabled={!data.objectives?.goals?.includes(goal.value) && (data.objectives?.goals?.length || 0) >= 3}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{goal.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Défis actuels */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Défis actuels</h3>
        </div>
        <FormField
          label="Quels sont vos principaux défis en matière de marketing digital ?"
          name="challenges"
          multiline
          rows={4}
          placeholder="Ex: Manque de visibilité en ligne, difficulté à générer des leads, budget limité, manque de temps, concurrence forte..."
          value={data.objectives?.challenges || ''}
          onChange={(e) => updateData('objectives.challenges', e.target.value)}
          helper="Décrivez les obstacles que vous rencontrez actuellement"
        />
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Timeline</h3>
        </div>
        <FormField
          label="Dans quel délai souhaitez-vous atteindre vos objectifs ?"
          name="timeline"
          type="select"
          options={[
            { value: 'urgent', label: 'Urgent (< 1 mois)' },
            { value: 'short', label: 'Court terme (1-3 mois)' },
            { value: 'medium', label: 'Moyen terme (3-6 mois)' },
            { value: 'long', label: 'Long terme (6-12 mois)' },
            { value: 'flexible', label: 'Flexible / Pas de deadline précise' },
          ]}
          value={data.objectives?.timeline || ''}
          onChange={(e) => updateData('objectives.timeline', e.target.value)}
        />
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Euro className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Budget marketing digital</h3>
        </div>
        <FormField
          label="Quel est votre budget mensuel approximatif pour le marketing digital ?"
          name="budget"
          type="select"
          options={[
            { value: '<500', label: 'Moins de 500€/mois' },
            { value: '500-1000', label: '500€ - 1 000€/mois' },
            { value: '1000-2500', label: '1 000€ - 2 500€/mois' },
            { value: '2500-5000', label: '2 500€ - 5 000€/mois' },
            { value: '5000-10000', label: '5 000€ - 10 000€/mois' },
            { value: '10000+', label: 'Plus de 10 000€/mois' },
            { value: 'undefined', label: 'Non défini pour le moment' },
          ]}
          value={data.objectives?.budget || ''}
          onChange={(e) => updateData('objectives.budget', e.target.value)}
          helper="Cette information nous aide à adapter nos recommandations"
        />
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Conseil:</strong> Plus vous êtes précis sur vos objectifs et contraintes,
          plus notre audit sera personnalisé et pertinent pour votre entreprise.
        </p>
      </div>
    </motion.div>
  );
}
