import { motion } from 'framer-motion'
import FormField from '../../../components/WebQuoteForm/FormField'

const CONTACT_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'telephone', label: 'Téléphone' },
  { value: 'whatsapp', label: 'WhatsApp' },
]

interface ContactStepProps {
  data: any
  updateData: (field: string, value: any) => void
}

export default function ContactStep({ data, updateData }: ContactStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Vos coordonnées</h2>
      <p className="text-gray-500 mb-6">Pour que nous puissions vous recontacter avec votre devis</p>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Prénom"
            name="contact-firstname"
            value={data?.contact?.firstName || ''}
            onChange={(e: any) => updateData('contact.firstName', e.target.value)}
            placeholder="Votre prénom"
            required
          />
          <FormField
            label="Nom"
            name="contact-lastname"
            value={data?.contact?.lastName || ''}
            onChange={(e: any) => updateData('contact.lastName', e.target.value)}
            placeholder="Votre nom"
            required
          />
        </div>

        <FormField
          label="Email"
          name="contact-email"
          type="email"
          value={data?.contact?.email || ''}
          onChange={(e: any) => updateData('contact.email', e.target.value)}
          placeholder="votre@email.com"
          required
        />

        <FormField
          label="Téléphone"
          name="contact-phone"
          type="tel"
          value={data?.contact?.phone || ''}
          onChange={(e: any) => updateData('contact.phone', e.target.value)}
          placeholder="0692 XX XX XX"
        />

        <FormField
          label="Moyen de contact préféré"
          name="contact-preferred"
          type="radio"
          value={data?.contact?.preferredContact || ''}
          onChange={(e: any) => updateData('contact.preferredContact', e.target.value)}
          options={CONTACT_METHODS}
        />
      </div>
    </motion.div>
  )
}
