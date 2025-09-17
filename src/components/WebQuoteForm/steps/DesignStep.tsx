import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface DesignStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function DesignStep({ data, updateData }: DesignStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Design & Identité visuelle</h2>
        <p className="text-gray-600">Comment imaginez-vous le design de votre site ?</p>
      </div>

      <FormField
        label="Avez-vous une charte graphique existante ?"
        name="hasCharter"
        type="radio"
        required
        value={data.design?.hasCharter}
        onChange={(e) => updateData('design.hasCharter', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai une charte graphique' },
          { value: 'no', label: 'Non, pas de charte graphique' }
        ]}
      />

      <FormField
        label="Avez-vous besoin d'un logo ?"
        name="needLogo"
        type="radio"
        required
        value={data.design?.needLogo}
        onChange={(e) => updateData('design.needLogo', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai besoin d\'un logo' },
          { value: 'no', label: 'Non, j\'ai déjà un logo' }
        ]}
      />

      <FormField
        label="Style souhaité"
        name="style"
        type="select"
        required
        value={data.design?.style || ''}
        onChange={(e) => updateData('design.style', e.target.value)}
        options={[
          { value: 'moderne', label: 'Moderne et épuré' },
          { value: 'classique', label: 'Classique et professionnel' },
          { value: 'minimaliste', label: 'Minimaliste' },
          { value: 'creatif', label: 'Créatif et original' },
          { value: 'corporate', label: 'Corporate' }
        ]}
      />

      <FormField
        label="Sites références / Inspirations"
        name="references"
        type="textarea"
        placeholder="Indiquez des sites web que vous appréciez ou des liens vers vos inspirations..."
        value={data.design?.references || ''}
        onChange={(e) => updateData('design.references', e.target.value)}
      />

      <FormField
        label="Niveau d'animations souhaité"
        name="animations"
        type="radio"
        required
        value={data.design?.animations || ''}
        onChange={(e) => updateData('design.animations', e.target.value)}
        options={[
          { value: 'aucune', label: 'Aucune animation' },
          { value: 'legeres', label: 'Animations légères (transitions douces)' },
          { value: 'avancees', label: 'Animations avancées (effets visuels marqués)' }
        ]}
      />

      <FormField
        label="Couleurs préférées"
        name="colors"
        type="text"
        placeholder="Ex: Bleu et blanc, Tons chauds, Noir et or..."
        value={data.design?.colors || ''}
        onChange={(e) => updateData('design.colors', e.target.value)}
      />
    </motion.div>
  );
}