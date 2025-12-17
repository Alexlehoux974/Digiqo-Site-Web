
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface ContactStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function ContactStep({ data, updateData }: ContactStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Vos coordonnées</h2>
        <p className="text-gray-600">Comment pouvons-nous vous contacter ?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Prénom"
          name="firstName"
          placeholder="Jean"
          required
          value={data.contact?.firstName || ''}
          onChange={(e) => updateData('contact.firstName', e.target.value)}
        />

        <FormField
          label="Nom"
          name="lastName"
          placeholder="Dupont"
          required
          value={data.contact?.lastName || ''}
          onChange={(e) => updateData('contact.lastName', e.target.value)}
        />
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="jean.dupont@entreprise.com"
        required
        value={data.contact?.email || ''}
        onChange={(e) => updateData('contact.email', e.target.value)}
      />

      <FormField
        label="Téléphone"
        name="phone"
        type="tel"
        placeholder="0692 12 34 56"
        required
        value={data.contact?.phone || ''}
        onChange={(e) => updateData('contact.phone', e.target.value)}
      />

      <FormField
        label="Fonction dans l'entreprise"
        name="position"
        placeholder="Directeur, Responsable marketing..."
        value={data.contact?.position || ''}
        onChange={(e) => updateData('contact.position', e.target.value)}
      />

      <FormField
        label="Meilleur moment pour vous contacter"
        name="bestTimeToCall"
        type="select"
        value={data.contact?.bestTimeToCall || ''}
        onChange={(e) => updateData('contact.bestTimeToCall', e.target.value)}
        options={[
          { value: 'morning', label: 'Matin (8h-12h)' },
          { value: 'afternoon', label: 'Après-midi (12h-17h)' },
          { value: 'evening', label: 'Fin de journée (17h-19h)' },
          { value: 'anytime', label: 'Peu importe' }
        ]}
      />

      <FormField
        label="Comment avez-vous entendu parler de nous ?"
        name="source"
        type="select"
        value={data.contact?.source || ''}
        onChange={(e) => updateData('contact.source', e.target.value)}
        options={[
          { value: 'google', label: 'Recherche Google' },
          { value: 'social', label: 'Réseaux sociaux' },
          { value: 'recommendation', label: 'Recommandation' },
          { value: 'advertising', label: 'Publicité' },
          { value: 'other', label: 'Autre' }
        ]}
      />

      <FormField
        label="Message complémentaire"
        name="message"
        type="textarea"
        placeholder="Des informations supplémentaires que vous souhaitez partager..."
        value={data.contact?.message || ''}
        onChange={(e) => updateData('contact.message', e.target.value)}
      />
    </motion.div>
  );
}