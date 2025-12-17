
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface TechnicalStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function TechnicalStep({ data, updateData }: TechnicalStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Aspects techniques</h2>
        <p className="text-gray-600">Vos besoins techniques spécifiques</p>
      </div>

      <FormField
        label="Avez-vous un nom de domaine ?"
        name="hasDomain"
        type="radio"
        required
        value={data.technical?.hasDomain || ''}
        onChange={(e) => updateData('technical.hasDomain', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai déjà un nom de domaine' },
          { value: 'no', label: 'Non, j\'ai besoin d\'aide pour en choisir un' }
        ]}
      />

      {data.technical?.hasDomain === 'yes' && (
        <FormField
          label="Nom de domaine"
          name="domainName"
          placeholder="www.monsite.com"
          value={data.technical?.domainName || ''}
          onChange={(e) => updateData('technical.domainName', e.target.value)}
        />
      )}

      <FormField
        label="Avez-vous un hébergement ?"
        name="hasHosting"
        type="radio"
        required
        value={data.technical?.hasHosting || ''}
        onChange={(e) => updateData('technical.hasHosting', e.target.value)}
        options={[
          { value: 'yes', label: 'Oui, j\'ai déjà un hébergement' },
          { value: 'no', label: 'Non, j\'ai besoin d\'une solution d\'hébergement' }
        ]}
      />

      <FormField
        label="Besoins SEO (référencement naturel)"
        name="seoNeeds"
        type="radio"
        required
        value={data.technical?.seoNeeds || ''}
        onChange={(e) => updateData('technical.seoNeeds', e.target.value)}
        options={[
          { value: 'basic', label: 'SEO de base (balises, sitemap)' },
          { value: 'advanced', label: 'SEO avancé (stratégie complète)' },
          { value: 'none', label: 'Pas besoin pour le moment' }
        ]}
      />

      <FormField
        label="Connexion avec des outils externes"
        name="integrations"
        type="textarea"
        placeholder="Ex: CRM, email marketing, Google Analytics, réseaux sociaux..."
        value={data.technical?.integrations || ''}
        onChange={(e) => updateData('technical.integrations', e.target.value)}
      />

      <FormField
        label="Niveau de maintenance souhaité"
        name="maintenanceLevel"
        type="radio"
        required
        value={data.technical?.maintenanceLevel || ''}
        onChange={(e) => updateData('technical.maintenanceLevel', e.target.value)}
        options={[
          { value: 'full', label: 'Maintenance complète (mises à jour, sauvegardes, sécurité)' },
          { value: 'minimal', label: 'Maintenance minimale (sécurité uniquement)' },
          { value: 'none', label: 'Je gère moi-même' }
        ]}
      />
    </motion.div>
  );
}