
import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Star, MessageSquare, Shield, TrendingUp } from 'lucide-react';

interface ReputationStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function ReputationStep({ data, updateData }: ReputationStepProps) {
  const reviewPlatforms = [
    { value: 'google', label: 'Google My Business' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tripadvisor', label: 'TripAdvisor' },
    { value: 'trustpilot', label: 'Trustpilot' },
    { value: 'yelp', label: 'Yelp' },
    { value: 'booking', label: 'Booking.com' },
    { value: 'airbnb', label: 'Airbnb' },
    { value: 'secteur', label: 'Site spécialisé du secteur' },
    { value: 'autre', label: 'Autre plateforme' },
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
          Gestion de la Réputation en Ligne
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Comment gérez-vous votre e-réputation et les avis clients ?
        </p>
      </div>

      {/* Monitoring de la réputation */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Shield className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Surveillance de la réputation</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="monitoring"
            type="checkbox"
            placeholder="Nous surveillons activement notre réputation en ligne"
            value={data.reputation?.monitoring || false}
            onChange={(e) => updateData('reputation.monitoring', (e.target as HTMLInputElement).checked)}
            helper=""
          />
          <FormField
            label=""
            name="reviewsResponse"
            type="checkbox"
            placeholder="Nous répondons systématiquement aux avis clients (positifs et négatifs)"
            value={data.reputation?.reviewsResponse || false}
            onChange={(e) => updateData('reputation.reviewsResponse', (e.target as HTMLInputElement).checked)}
            helper=""
          />
        </div>
      </div>

      {/* Note moyenne */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Star className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Performance des avis</h3>
        </div>
        <FormField
          label="Note moyenne globale sur l'ensemble des plateformes"
          name="averageRating"
          type="select"
          options={[
            { value: '4.5+', label: '4.5 étoiles et plus (Excellent)' },
            { value: '4.0-4.5', label: '4.0 à 4.5 étoiles (Très bon)' },
            { value: '3.5-4.0', label: '3.5 à 4.0 étoiles (Bon)' },
            { value: '3.0-3.5', label: '3.0 à 3.5 étoiles (Moyen)' },
            { value: '<3.0', label: 'Moins de 3.0 étoiles (À améliorer)' },
            { value: 'no-reviews', label: 'Pas encore d\'avis' },
            { value: 'unknown', label: 'Je ne sais pas' },
          ]}
          value={data.reputation?.averageRating || ''}
          onChange={(e) => updateData('reputation.averageRating', e.target.value)}
        />
      </div>

      {/* Plateformes d'avis */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <MessageSquare className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Plateformes d'avis utilisées</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sur quelles plateformes recevez-vous des avis ?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {reviewPlatforms.map(platform => (
            <label
              key={platform.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={platform.value}
                checked={data.reputation?.reviewPlatforms?.includes(platform.value) || false}
                onChange={(e) => {
                  const current = data.reputation?.reviewPlatforms || [];
                  if (e.target.checked) {
                    updateData('reputation.reviewPlatforms', [...current, platform.value]);
                  } else {
                    updateData('reputation.reviewPlatforms', current.filter(v => v !== platform.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{platform.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stratégie de réputation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold">Stratégie d'amélioration</h3>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>Une bonne réputation en ligne est cruciale pour :</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Attirer de nouveaux clients (92% consultent les avis)</li>
            <li>Améliorer votre référencement local</li>
            <li>Augmenter votre taux de conversion</li>
            <li>Construire la confiance avec votre audience</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Conseil:</strong> Répondre aux avis (positifs et négatifs) dans les 24-48h
          montre votre professionnalisme et améliore votre image de marque.
        </p>
      </div>
    </motion.div>
  );
}
