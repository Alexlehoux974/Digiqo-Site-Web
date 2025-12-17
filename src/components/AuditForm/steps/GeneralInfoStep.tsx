
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Building2, MapPin, Users, Calendar, Briefcase } from 'lucide-react';

interface GeneralInfoStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function GeneralInfoStep({ data, updateData }: GeneralInfoStepProps) {
  const teamSizeOptions = [
    { value: '1', label: 'Solo' },
    { value: '2-5', label: '2-5 personnes' },
    { value: '6-10', label: '6-10 personnes' },
    { value: '11-20', label: '11-20 personnes' },
    { value: '21-50', label: '21-50 personnes' },
    { value: '50+', label: 'Plus de 50 personnes' },
  ];

  const businessModelOptions = [
    { value: 'b2b', label: 'B2B' },
    { value: 'b2c', label: 'B2C' },
    { value: 'b2b2c', label: 'B2B2C' },
    { value: 'marketplace', label: 'Marketplace' },
    { value: 'saas', label: 'SaaS' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'service', label: 'Service' },
    { value: 'other', label: 'Autre' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent mb-2">
          Informations Générales
        </h2>
        <p className="text-digiqo-gray-dark font-medium">
          Commençons par mieux connaître votre entreprise
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Building2 className="w-5 h-5 text-digiqo-accent" />
            <span className="text-sm font-semibold text-digiqo-primary">Entreprise</span>
          </div>
          <FormField
            label="Raison sociale"
            name="companyName"
            placeholder="Nom de votre entreprise"
            required
            value={data.general?.companyName || ''}
            onChange={(e) => updateData('general.companyName', e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="w-5 h-5 text-digiqo-accent" />
            <span className="text-sm font-semibold text-digiqo-primary">Secteur</span>
          </div>
          <FormField
            label="Secteur d'activité"
            name="sector"
            placeholder="Ex: Tourisme, Immobilier, Santé..."
            required
            value={data.general?.sector || ''}
            onChange={(e) => updateData('general.sector', e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-digiqo-accent" />
            <span className="text-sm font-semibold text-digiqo-primary">Localisation</span>
          </div>
          <FormField
            label="Localisation"
            name="location"
            placeholder="Ville ou région"
            required
            value={data.general?.location || ''}
            onChange={(e) => updateData('general.location', e.target.value)}
            helper="Votre zone d'activité principale"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-digiqo-primary">Ancienneté</span>
          </div>
          <FormField
            label="Ancienneté de l'entreprise"
            name="companyAge"
            placeholder="Ex: 2 ans, 6 mois..."
            required
            value={data.general?.companyAge || ''}
            onChange={(e) => updateData('general.companyAge', e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-digiqo-primary">Équipe</span>
          </div>
          <FormField
            label="Taille de l'équipe"
            name="teamSize"
            type="select"
            required
            options={teamSizeOptions}
            value={data.general?.teamSize || ''}
            onChange={(e) => updateData('general.teamSize', e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="w-5 h-5 text-digiqo-accent" />
            <span className="text-sm font-semibold text-digiqo-primary">Modèle</span>
          </div>
          <FormField
            label="Modèle économique"
            name="businessModel"
            type="select"
            required
            options={businessModelOptions}
            value={data.general?.businessModel || ''}
            onChange={(e) => updateData('general.businessModel', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Conseil:</strong> Ces informations nous permettent de personnaliser notre audit 
          en fonction de votre secteur et de votre taille d'entreprise.
        </p>
      </div>
    </motion.div>
  );
}