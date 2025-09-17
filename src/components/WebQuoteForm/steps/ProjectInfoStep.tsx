import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface ProjectInfoStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function ProjectInfoStep({ data, updateData }: ProjectInfoStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Informations sur votre projet</h2>
        <p className="text-gray-600">Parlez-nous de votre entreprise et de votre projet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nom de l'entreprise"
          name="companyName"
          placeholder="Votre entreprise"
          required
          value={data.project?.companyName || ''}
          onChange={(e) => updateData('project.companyName', e.target.value)}
        />

        <FormField
          label="Secteur d'activité"
          name="sector"
          placeholder="Ex: Restauration, Immobilier..."
          required
          value={data.project?.sector || ''}
          onChange={(e) => updateData('project.sector', e.target.value)}
        />
      </div>

      <FormField
        label="Description du projet"
        name="projectDescription"
        type="textarea"
        placeholder="Décrivez votre projet en quelques lignes..."
        required
        value={data.project?.projectDescription || ''}
        onChange={(e) => updateData('project.projectDescription', e.target.value)}
      />

      <FormField
        label="Avez-vous déjà un site web ?"
        name="existingSite"
        type="radio"
        required
        value={data.project?.existingSite}
        onChange={(e) => updateData('project.existingSite', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai un site existant' },
          { value: 'no', label: 'Non, c\'est un nouveau projet' }
        ]}
      />

      {data.project?.existingSite === 'yes' && (
        <FormField
          label="URL du site actuel"
          name="currentSiteUrl"
          placeholder="https://www.monsite.com"
          value={data.project?.currentSiteUrl || ''}
          onChange={(e) => updateData('project.currentSiteUrl', e.target.value)}
        />
      )}
    </motion.div>
  );
}