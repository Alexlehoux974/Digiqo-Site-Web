import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface ContentStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function ContentStep({ data, updateData }: ContentStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Contenu du site</h2>
        <p className="text-gray-600">Parlons du contenu de votre futur site</p>
      </div>

      <FormField
        label="Avez-vous déjà le contenu (textes, images) ?"
        name="hasContent"
        type="radio"
        required
        value={data.content?.hasContent || ''}
        onChange={(e) => updateData('content.hasContent', e.target.value)}
        options={[
          { value: 'tout', label: 'Oui, j\'ai tout le contenu prêt' },
          { value: 'partiel', label: 'J\'ai une partie du contenu' },
          { value: 'rien', label: 'Non, j\'ai besoin d\'aide pour créer le contenu' }
        ]}
      />

      <FormField
        label="Avez-vous besoin de rédaction de contenu ?"
        name="needCopywriting"
        type="radio"
        required
        value={data.content?.needCopywriting}
        onChange={(e) => updateData('content.needCopywriting', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai besoin de rédaction' },
          { value: 'no', label: 'Non, je fournirai les textes' }
        ]}
      />

      <FormField
        label="Avez-vous besoin de photos professionnelles ?"
        name="needPhotos"
        type="radio"
        required
        value={data.content?.needPhotos}
        onChange={(e) => updateData('content.needPhotos', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai besoin de photos' },
          { value: 'no', label: 'Non, j\'ai déjà des photos' }
        ]}
      />

      <FormField
        label="Avez-vous besoin de vidéos ?"
        name="needVideos"
        type="radio"
        required
        value={data.content?.needVideos}
        onChange={(e) => updateData('content.needVideos', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai besoin de vidéos' },
          { value: 'no', label: 'Non, pas de vidéos' }
        ]}
      />

      <FormField
        label="Nombre de pages à créer"
        name="pagesCount"
        type="select"
        required
        value={data.content?.pagesCount || ''}
        onChange={(e) => updateData('content.pagesCount', e.target.value)}
        options={[
          { value: '1', label: '1 page' },
          { value: '2-5', label: '2 à 5 pages' },
          { value: '6-10', label: '6 à 10 pages' },
          { value: '11-20', label: '11 à 20 pages' },
          { value: '20+', label: 'Plus de 20 pages' }
        ]}
      />
    </motion.div>
  );
}