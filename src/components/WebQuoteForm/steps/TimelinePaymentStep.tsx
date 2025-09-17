import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface TimelinePaymentStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function TimelinePaymentStep({ data, updateData }: TimelinePaymentStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Délais et mode de paiement</h2>
        <p className="text-gray-600">Vos préférences de planning et de paiement</p>
      </div>

      <FormField
        label="Date de lancement souhaitée"
        name="startDate"
        type="date"
        required
        value={data.timeline?.startDate || ''}
        onChange={(e) => updateData('timeline.startDate', e.target.value)}
      />

      <FormField
        label="Délai souhaité"
        name="deadline"
        type="select"
        required
        value={data.timeline?.deadline || ''}
        onChange={(e) => updateData('timeline.deadline', e.target.value)}
        options={[
          { value: '1month', label: 'Moins d\'1 mois' },
          { value: '2months', label: '1 à 2 mois' },
          { value: '3months', label: '2 à 3 mois' },
          { value: '3plus', label: 'Plus de 3 mois' }
        ]}
      />

      <FormField
        label="Niveau de priorité"
        name="priority"
        type="radio"
        required
        value={data.timeline?.priority || ''}
        onChange={(e) => updateData('timeline.priority', e.target.value)}
        options={[
          { value: 'urgent', label: 'Urgent (besoin rapide)' },
          { value: 'normal', label: 'Normal (délais standards)' },
          { value: 'flexible', label: 'Flexible (pas de rush)' }
        ]}
      />

      <div>
        <FormField
          label="Formule de paiement préférée"
          name="paymentMode"
          type="radio"
          required
          value={data.timeline?.paymentMode || ''}
          onChange={(e) => updateData('timeline.paymentMode', e.target.value)}
          options={[
            {
              value: 'monthly',
              label: 'Abonnement mensuel (maintenance et hébergement inclus)'
            },
            {
              value: 'onetime',
              label: 'Paiement unique (sans maintenance ni hébergement)'
            }
          ]}
        />

        {data.timeline?.paymentMode === 'monthly' && (
          <p className="mt-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            ℹ️ L'abonnement mensuel inclut l'hébergement, la maintenance, les mises à jour de sécurité et le support technique.
          </p>
        )}

        {data.timeline?.paymentMode === 'onetime' && (
          <p className="mt-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
            ⚠️ Le paiement unique ne comprend pas l'hébergement ni la maintenance. Vous devrez gérer ces aspects vous-même.
          </p>
        )}
      </div>

      <FormField
        label="Commentaires sur les délais"
        name="comments"
        type="textarea"
        placeholder="Précisions sur vos contraintes de temps ou événements importants..."
        value={data.timeline?.comments || ''}
        onChange={(e) => updateData('timeline.comments', e.target.value)}
      />
    </motion.div>
  );
}