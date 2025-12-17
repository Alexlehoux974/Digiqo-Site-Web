
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Camera, Palette, Image, Users } from 'lucide-react';

interface ContentStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function ContentStep({ data, updateData }: ContentStepProps) {
  const contentTypes = [
    { value: 'photos', label: 'Photos professionnelles' },
    { value: 'videos', label: 'Vidéos' },
    { value: 'graphics', label: 'Infographies' },
    { value: 'animations', label: 'Animations' },
    { value: 'podcasts', label: 'Podcasts' },
    { value: 'articles', label: 'Articles de blog' },
    { value: '3d', label: 'Rendus 3D' },
    { value: 'reels', label: 'Reels/Shorts' },
  ];

  // Liste des besoins commentée car le champ n'existe pas dans le type
  // const needs = [...];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Contenu & Création Visuelle
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analysons votre production de contenu et besoins créatifs
        </p>
      </div>

      {/* Types de contenu produits */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Camera className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Types de contenu que vous produisez</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {contentTypes.map(type => (
            <label
              key={type.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={type.value}
                checked={data.content?.contentTypes?.includes(type.value) || false}
                onChange={(e) => {
                  const current = data.content?.contentTypes || [];
                  if (e.target.checked) {
                    updateData('content.contentTypes', [...current, type.value]);
                  } else {
                    updateData('content.contentTypes', current.filter((v: string) => v !== type.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cohérence de marque */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Palette className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Cohérence de marque</h3>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Niveau de cohérence visuelle (0-10)</span>
          <FormField
            label=""
            name="brandConsistency"
            type="range"
            value={data.content?.brandConsistency || 5}
            onChange={(e) => updateData('content.brandConsistency', parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Moyens de production */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Users className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Moyens de production</h3>
        </div>
        <FormField
          label="Qui produit votre contenu ?"
          name="productionMeans"
          type="select"
          options={[
            { value: 'internal', label: 'Équipe interne' },
            { value: 'agency', label: 'Agence créative' },
            { value: 'freelancers', label: 'Freelances' },
            { value: 'mixed', label: 'Mixte' },
            { value: 'none', label: 'Personne (pas de production)' },
          ]}
          value={data.content?.productionMeans || ''}
          onChange={(e) => updateData('content.productionMeans', e.target.value)}
        />
      </div>

      {/* Formats d'acquisition */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Image className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Formats d'acquisition de contenu</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'ugc', label: 'Contenu utilisateur (UGC)' },
            { value: 'stock', label: 'Banques d\'images' },
            { value: 'photoshoot', label: 'Séances photo' },
            { value: 'freelance', label: 'Freelances créatifs' },
            { value: 'agency', label: 'Agence créative' },
            { value: 'internal', label: 'Production interne' },
            { value: 'influencers', label: 'Partenariats influenceurs' },
            { value: 'events', label: 'Couverture d\'événements' },
          ].map(format => (
            <label
              key={format.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={format.value}
                checked={data.content?.acquisitionFormats?.includes(format.value) || false}
                onChange={(e) => {
                  const current = data.content?.acquisitionFormats || [];
                  if (e.target.checked) {
                    updateData('content.acquisitionFormats', [...current, format.value]);
                  } else {
                    updateData('content.acquisitionFormats', current.filter((v: string) => v !== format.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{format.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Section commentée - Ces champs ne sont pas dans le type content */}
      {/*
      Les champs suivants ont été commentés car ils ne correspondent pas 
      au type 'content' défini dans audit-types.ts :
      - needs (besoins en contenu)
      - storage (stockage)
      - hasVideo et videoTypes (focus vidéo)
      - visualFrequency et editorialFrequency (fréquences)
      - hasStyleGuide, consistentBranding, professionalQuality, qualitySatisfaction (qualité)
      - production, monthlyBudget (production)
      */}

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Conseil:</strong> Un contenu de qualité, régulier et cohérent est essentiel 
          pour engager votre audience et renforcer votre image de marque.
        </p>
      </div>
    </motion.div>
  );
}
