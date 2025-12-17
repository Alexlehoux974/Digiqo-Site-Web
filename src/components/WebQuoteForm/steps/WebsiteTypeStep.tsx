
import { motion } from 'framer-motion';
import FormField from '../FormField';

interface WebsiteTypeStepProps {
  data: any;
  updateData: (field: string, value: any) => void;
}

export default function WebsiteTypeStep({ data, updateData }: WebsiteTypeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Type de site web</h2>
        <p className="text-gray-600">Quel type de site souhaitez-vous ?</p>
      </div>

      <FormField
        label="Type de site"
        name="websiteType"
        type="radio"
        required
        value={data.websiteType?.type || ''}
        onChange={(e) => updateData('websiteType.type', e.target.value)}
        options={[
          { value: 'vitrine', label: 'Site vitrine - Présentation de votre entreprise' },
          { value: 'ecommerce', label: 'E-commerce - Vente en ligne' },
          { value: 'landing', label: 'Landing page - Page unique de conversion' },
          { value: 'blog', label: 'Blog / Magazine' },
          { value: 'webapp', label: 'Application web' },
          { value: 'custom', label: 'Site sur mesure' }
        ]}
      />

      <FormField
        label="Nombre de pages estimé"
        name="pages"
        type="select"
        required
        value={data.websiteType?.pages || ''}
        onChange={(e) => updateData('websiteType.pages', e.target.value)}
        options={[
          { value: '1', label: '1 page (Landing page)' },
          { value: '2-5', label: '2 à 5 pages' },
          { value: '6-10', label: '6 à 10 pages' },
          { value: '11-20', label: '11 à 20 pages' },
          { value: '20+', label: 'Plus de 20 pages' }
        ]}
      />

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Langues du site
        </label>
        <div className="space-y-2">
          <FormField
            label="Français"
            name="lang_fr"
            type="checkbox"
            value={data.websiteType?.languages?.includes('fr')}
            onChange={(e) => {
              const langs = data.websiteType?.languages || [];
              if (e.target.checked) {
                updateData('websiteType.languages', [...langs, 'fr']);
              } else {
                updateData('websiteType.languages', langs.filter((l: string) => l !== 'fr'));
              }
            }}
          />
          <FormField
            label="Anglais"
            name="lang_en"
            type="checkbox"
            value={data.websiteType?.languages?.includes('en')}
            onChange={(e) => {
              const langs = data.websiteType?.languages || [];
              if (e.target.checked) {
                updateData('websiteType.languages', [...langs, 'en']);
              } else {
                updateData('websiteType.languages', langs.filter((l: string) => l !== 'en'));
              }
            }}
          />
          <FormField
            label="Créole"
            name="lang_cr"
            type="checkbox"
            value={data.websiteType?.languages?.includes('cr')}
            onChange={(e) => {
              const langs = data.websiteType?.languages || [];
              if (e.target.checked) {
                updateData('websiteType.languages', [...langs, 'cr']);
              } else {
                updateData('websiteType.languages', langs.filter((l: string) => l !== 'cr'));
              }
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}