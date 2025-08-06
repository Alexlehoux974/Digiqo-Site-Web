'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Camera, Video, FileText, Palette, Image, Users } from 'lucide-react';

interface ContentStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ContentStep({ data, updateData, errors }: ContentStepProps) {
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

  const needs = [
    { value: 'product-photos', label: 'Photos produits' },
    { value: 'corporate-videos', label: 'Vidéos institutionnelles' },
    { value: 'testimonials', label: 'Témoignages clients' },
    { value: 'tutorials', label: 'Tutoriels/Démos' },
    { value: 'social-content', label: 'Contenu réseaux sociaux' },
    { value: 'event-coverage', label: 'Couverture événements' },
    { value: 'branding', label: 'Identité visuelle' },
    { value: 'advertising', label: 'Créations publicitaires' },
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
                checked={data.content?.producedTypes?.includes(type.value) || false}
                onChange={(e) => {
                  const current = data.content?.producedTypes || [];
                  if (e.target.checked) {
                    updateData('content.producedTypes', [...current, type.value]);
                  } else {
                    updateData('content.producedTypes', current.filter(v => v !== type.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fréquence de production */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <FileText className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Fréquence de production</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Contenu visuel (photos/vidéos)"
            name="visualFrequency"
            type="select"
            options={[
              { value: 'daily', label: 'Quotidien' },
              { value: 'weekly', label: 'Hebdomadaire' },
              { value: 'biweekly', label: 'Bi-mensuel' },
              { value: 'monthly', label: 'Mensuel' },
              { value: 'quarterly', label: 'Trimestriel' },
              { value: 'occasional', label: 'Occasionnel' },
              { value: 'none', label: 'Aucune production' },
            ]}
            value={data.content?.visualFrequency || ''}
            onChange={(e) => updateData('content.visualFrequency', e.target.value)}
          />
          <FormField
            label="Contenu éditorial (articles/posts)"
            name="editorialFrequency"
            type="select"
            options={[
              { value: 'daily', label: 'Quotidien' },
              { value: 'weekly', label: 'Hebdomadaire' },
              { value: 'biweekly', label: 'Bi-mensuel' },
              { value: 'monthly', label: 'Mensuel' },
              { value: 'quarterly', label: 'Trimestriel' },
              { value: 'occasional', label: 'Occasionnel' },
              { value: 'none', label: 'Aucune production' },
            ]}
            value={data.content?.editorialFrequency || ''}
            onChange={(e) => updateData('content.editorialFrequency', e.target.value)}
          />
        </div>
      </div>

      {/* Qualité du contenu */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Palette className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Qualité et cohérence</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="hasStyleGuide"
            type="checkbox"
            placeholder="Nous avons une charte graphique/guide de style"
            value={data.content?.hasStyleGuide || false}
            onChange={(e) => updateData('content.hasStyleGuide', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="consistentBranding"
            type="checkbox"
            placeholder="Notre contenu est cohérent visuellement"
            value={data.content?.consistentBranding || false}
            onChange={(e) => updateData('content.consistentBranding', (e.target as HTMLInputElement).checked)}
          />
          <FormField
            label=""
            name="professionalQuality"
            type="checkbox"
            placeholder="Notre contenu est de qualité professionnelle"
            value={data.content?.professionalQuality || false}
            onChange={(e) => updateData('content.professionalQuality', (e.target as HTMLInputElement).checked)}
          />
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Satisfaction qualité actuelle (0-10)</span>
          <FormField
            label=""
            name="qualitySatisfaction"
            type="range"
            value={data.content?.qualitySatisfaction || 5}
            onChange={(e) => updateData('content.qualitySatisfaction', parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Production de contenu */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Users className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Production du contenu</h3>
        </div>
        <FormField
          label="Qui produit votre contenu ?"
          name="production"
          type="select"
          options={[
            { value: 'internal', label: 'Équipe interne' },
            { value: 'agency', label: 'Agence créative' },
            { value: 'freelancers', label: 'Freelances' },
            { value: 'mixed', label: 'Mixte' },
            { value: 'none', label: 'Personne (pas de production)' },
          ]}
          value={data.content?.production || ''}
          onChange={(e) => updateData('content.production', e.target.value)}
        />
        <FormField
          label="Budget mensuel contenu"
          name="monthlyBudget"
          type="select"
          options={[
            { value: '<500', label: 'Moins de 500€' },
            { value: '500-1000', label: '500€ à 1 000€' },
            { value: '1000-2500', label: '1 000€ à 2 500€' },
            { value: '2500-5000', label: '2 500€ à 5 000€' },
            { value: '5000+', label: 'Plus de 5 000€' },
          ]}
          value={data.content?.monthlyBudget || ''}
          onChange={(e) => updateData('content.monthlyBudget', e.target.value)}
        />
      </div>

      {/* Besoins en contenu */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Image className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Vos besoins en contenu</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {needs.map(need => (
            <label
              key={need.value}
              className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={need.value}
                checked={data.content?.needs?.includes(need.value) || false}
                onChange={(e) => {
                  const current = data.content?.needs || [];
                  if (e.target.checked) {
                    updateData('content.needs', [...current, need.value]);
                  } else {
                    updateData('content.needs', current.filter(v => v !== need.value));
                  }
                }}
                className="w-4 h-4 text-accent"
              />
              <span className="text-sm">{need.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Plateformes de stockage */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Gestion et stockage
        </h3>
        <FormField
          label="Où stockez-vous vos contenus ?"
          name="storage"
          placeholder="Ex: Google Drive, Dropbox, serveur interne, DAM (Digital Asset Management)..."
          value={data.content?.storage || ''}
          onChange={(e) => updateData('content.storage', e.target.value)}
          helper="Indiquez vos solutions de stockage et organisation"
        />
      </div>

      {/* Vidéo spécifique */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Video className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Focus vidéo</h3>
        </div>
        <div className="space-y-3">
          <FormField
            label=""
            name="hasVideo"
            type="checkbox"
            placeholder="Nous produisons de la vidéo"
            value={data.content?.hasVideo || false}
            onChange={(e) => updateData('content.hasVideo', (e.target as HTMLInputElement).checked)}
          />
          {data.content?.hasVideo && (
            <FormField
              label="Types de vidéos produites"
              name="videoTypes"
              placeholder="Ex: Spots publicitaires, interviews, formations, livestreams, motion design..."
              value={data.content?.videoTypes || ''}
              onChange={(e) => updateData('content.videoTypes', e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Conseil:</strong> Un contenu de qualité, régulier et cohérent est essentiel 
          pour engager votre audience et renforcer votre image de marque.
        </p>
      </div>
    </motion.div>
  );
}
