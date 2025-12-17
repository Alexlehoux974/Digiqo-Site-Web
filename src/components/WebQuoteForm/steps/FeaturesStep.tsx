
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface FeaturesStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function FeaturesStep({ data, updateData }: FeaturesStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Fonctionnalités souhaitées</h2>
        <p className="text-gray-600">Sélectionnez les fonctionnalités dont vous avez besoin</p>
      </div>

      <div className="space-y-3">
        <FormField
          label="Formulaire de contact"
          name="contactForm"
          type="checkbox"
          value={data.features?.contactForm || false}
          onChange={(e) => updateData('features.contactForm', e.target.checked)}
        />

        <FormField
          label="Système de réservation en ligne"
          name="onlineBooking"
          type="checkbox"
          value={data.features?.onlineBooking || false}
          onChange={(e) => updateData('features.onlineBooking', e.target.checked)}
        />

        <FormField
          label="Paiement en ligne"
          name="onlinePayment"
          type="checkbox"
          value={data.features?.onlinePayment || false}
          onChange={(e) => updateData('features.onlinePayment', e.target.checked)}
        />

        <FormField
          label="Espace membre / connexion"
          name="memberArea"
          type="checkbox"
          value={data.features?.memberArea || false}
          onChange={(e) => updateData('features.memberArea', e.target.checked)}
        />

        <FormField
          label="Site multilingue"
          name="multiLanguage"
          type="checkbox"
          value={data.features?.multiLanguage || false}
          onChange={(e) => updateData('features.multiLanguage', e.target.checked)}
        />

        <FormField
          label="Chat en direct"
          name="liveChat"
          type="checkbox"
          value={data.features?.liveChat || false}
          onChange={(e) => updateData('features.liveChat', e.target.checked)}
        />

        <FormField
          label="Newsletter / Inscription email"
          name="newsletter"
          type="checkbox"
          value={data.features?.newsletter || false}
          onChange={(e) => updateData('features.newsletter', e.target.checked)}
        />

        <FormField
          label="Intégration réseaux sociaux"
          name="socialMediaIntegration"
          type="checkbox"
          value={data.features?.socialMediaIntegration || false}
          onChange={(e) => updateData('features.socialMediaIntegration', e.target.checked)}
        />

        <FormField
          label="Blog / Actualités"
          name="blog"
          type="checkbox"
          value={data.features?.blog || false}
          onChange={(e) => updateData('features.blog', e.target.checked)}
        />

        <FormField
          label="Moteur de recherche interne"
          name="search"
          type="checkbox"
          value={data.features?.search || false}
          onChange={(e) => updateData('features.search', e.target.checked)}
        />
      </div>

      <FormField
        label="Autres fonctionnalités souhaitées"
        name="other"
        type="textarea"
        placeholder="Décrivez d'autres fonctionnalités spécifiques..."
        value={data.features?.other || ''}
        onChange={(e) => updateData('features.other', e.target.value)}
      />
    </motion.div>
  );
}