
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { Globe, Share2, MapPin, ShoppingBag } from 'lucide-react';

interface DigitalAssetsStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function DigitalAssetsStep({ data, updateData }: DigitalAssetsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Actifs Digitaux
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Identifions votre présence digitale actuelle
        </p>
      </div>

      {/* Site Web */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Globe className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Site Web</h3>
        </div>
        <FormField
          label="URL de votre site web"
          name="website"
          type="url"
          placeholder="https://www.votresite.com"
          value={data.digitalAssets?.website || ''}
          onChange={(e) => updateData('digitalAssets.website', e.target.value)}
          helper="Laissez vide si vous n'avez pas de site"
        />
      </div>

      {/* Réseaux Sociaux */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <Share2 className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Réseaux Sociaux</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Facebook"
            name="facebook"
            type="url"
            placeholder="https://facebook.com/votrepage"
            value={data.digitalAssets?.socialMedia?.facebook || ''}
            onChange={(e) => updateData('digitalAssets.socialMedia.facebook', e.target.value)}
          />
          <FormField
            label="Instagram"
            name="instagram"
            type="url"
            placeholder="https://instagram.com/votrecompte"
            value={data.digitalAssets?.socialMedia?.instagram || ''}
            onChange={(e) => updateData('digitalAssets.socialMedia.instagram', e.target.value)}
          />
          <FormField
            label="LinkedIn"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/company/..."
            value={data.digitalAssets?.socialMedia?.linkedin || ''}
            onChange={(e) => updateData('digitalAssets.socialMedia.linkedin', e.target.value)}
          />
          <FormField
            label="Twitter/X"
            name="twitter"
            type="url"
            placeholder="https://twitter.com/votrecompte"
            value={data.digitalAssets?.socialMedia?.twitter || ''}
            onChange={(e) => updateData('digitalAssets.socialMedia.twitter', e.target.value)}
          />
          <FormField
            label="TikTok"
            name="tiktok"
            type="url"
            placeholder="https://tiktok.com/@votrecompte"
            value={data.digitalAssets?.socialMedia?.tiktok || ''}
            onChange={(e) => updateData('digitalAssets.socialMedia.tiktok', e.target.value)}
          />
          <FormField
            label="YouTube"
            name="youtube"
            type="url"
            placeholder="https://youtube.com/c/votrechaine"
            value={data.digitalAssets?.socialMedia?.youtube || ''}
            onChange={(e) => updateData('digitalAssets.socialMedia.youtube', e.target.value)}
          />
        </div>
      </div>

      {/* Fiches Établissements */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <MapPin className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Fiches Établissements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Google My Business"
            name="googleBusiness"
            type="url"
            placeholder="Lien vers votre fiche Google"
            value={data.digitalAssets?.businessListings?.googleBusiness || ''}
            onChange={(e) => updateData('digitalAssets.businessListings.googleBusiness', e.target.value)}
          />
          <FormField
            label="TripAdvisor"
            name="tripadvisor"
            type="url"
            placeholder="Lien vers votre page TripAdvisor"
            value={data.digitalAssets?.businessListings?.tripadvisor || ''}
            onChange={(e) => updateData('digitalAssets.businessListings.tripadvisor', e.target.value)}
          />
        </div>
      </div>

      {/* Plateformes de vente */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <ShoppingBag className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold">Plateformes de vente/réservation</h3>
        </div>
        <FormField
          label="Autres plateformes"
          name="salesPlatforms"
          multiline
          rows={3}
          placeholder="Listez vos plateformes de vente ou réservation (Booking, Amazon, Shopify...)"
          value={data.digitalAssets?.salesPlatforms?.join('\n') || ''}
          onChange={(e) => updateData('digitalAssets.salesPlatforms', e.target.value.split('\n').filter(Boolean))}
          helper="Une plateforme par ligne"
        />
      </div>

      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg p-4 border border-secondary/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 <strong>Astuce:</strong> Plus nous avons d'informations sur votre présence digitale, 
          plus notre audit sera précis et personnalisé.
        </p>
      </div>
    </motion.div>
  );
}