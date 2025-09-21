import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Mail, Phone, User, FileText, MessageSquare, Send, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  { id: 'website', label: 'Site web' },
  { id: 'shop', label: 'Shop/Sitekeeper' },
  { id: 'sma', label: 'SMA (Social Media Advertising)' },
  { id: 'sea', label: 'SEA (Search Engine Advertising)' },
  { id: 'seo', label: 'SEO (Search Engine Optimisation)' },
  { id: 'cm', label: 'CM (Community Management)' },
  { id: 'audit', label: 'Audit' },
  { id: 'visuals', label: 'Visuels publicitaires' },
  { id: 'branding', label: 'Logos et Charte graphique' },
  { id: 'other', label: 'Autre' }
]

export interface FormData {
  firstName: string
  lastName: string
  companyName: string
  companyType: string
  phone: string
  email: string
  services: string[]
  description: string
  consent: boolean
}

interface ContactFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  onSubmit?: () => void
}

export function ContactForm({ formData, setFormData, onSubmit }: ContactFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<{
    email?: string
    phone?: string
  }>({})

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  // Phone validation regex (accepts various formats for La Réunion)
  const phoneRegex = /^(?:\+262|0262|262|0)[\s.-]?[6-7][\s.-]?[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}$/

  const validateEmail = (email: string): boolean => {
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Remove spaces and dashes for validation
    const cleanPhone = phone.replace(/[\s-]/g, '')
    return phoneRegex.test(cleanPhone)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setFormData(prev => ({ ...prev, email }))
    
    if (email && !validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Email invalide' }))
    } else {
      setErrors(prev => ({ ...prev, email: undefined }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value
    setFormData(prev => ({ ...prev, phone }))
    
    if (phone && !validatePhone(phone)) {
      setErrors(prev => ({ ...prev, phone: 'Téléphone invalide' }))
    } else {
      setErrors(prev => ({ ...prev, phone: undefined }))
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Envoyer les données à notre API qui transmettra au webhook n8n
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      await response.json()

      // Tracker l'événement GA4 de conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'contact_form',
          value: 1,
          currency: 'EUR',
          // Données du formulaire pour le remarketing
          form_name: 'Contact Principal',
          services: formData.services.join(', '),
          company_type: formData.companyType
        })
      }

      // Attendre un peu pour l'animation
      await new Promise(resolve => setTimeout(resolve, 500))

    } catch (error) {
      console.error('Error submitting form:', error)
      // On continue même en cas d'erreur
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Trigger countdown animation
    if (onSubmit) {
      onSubmit()
    }
  }

  const canProceedToStep2 = formData.firstName && formData.lastName && formData.companyName && formData.companyType &&
    formData.phone && formData.email && !errors.email && !errors.phone && validateEmail(formData.email) && validatePhone(formData.phone)
  const canSubmit = formData.services.length > 0 && formData.description

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-digiqo-accent to-digiqo-accent-dark mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-digiqo-black mb-4">
          Merci pour votre demande !
        </h3>
        <p className="text-digiqo-gray-dark max-w-md mx-auto">
          Nous avons bien reçu votre projet. Notre équipe vous contactera dans les plus brefs délais avec une proposition sur mesure.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
            currentStep === 1 
              ? "bg-digiqo-accent text-white" 
              : "bg-digiqo-accent/20 text-digiqo-accent"
          )}>
            1
          </div>
          <div className={cn(
            "w-20 h-1 transition-all",
            currentStep === 2 
              ? "bg-digiqo-accent" 
              : "bg-digiqo-gray"
          )} />
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
            currentStep === 2 
              ? "bg-digiqo-accent text-white" 
              : "bg-digiqo-gray text-digiqo-gray-dark"
          )}>
            2
          </div>
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <h3 className="text-lg font-semibold text-digiqo-black">Vos informations</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-digiqo-gray-dark mb-2">
                Prénom *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-digiqo-gray-dark/50" />
                <motion.input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-digiqo-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:border-transparent transition-all hover:border-digiqo-gray-dark"
                  placeholder="Prénom"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-digiqo-gray-dark mb-2">
                Nom *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-digiqo-gray-dark/50" />
                <motion.input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-digiqo-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:border-transparent transition-all hover:border-digiqo-gray-dark"
                  placeholder="Nom"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-digiqo-gray-dark mb-2">
                Nom de l'entreprise *
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-digiqo-gray-dark/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 4h1m4-4h1M9 15h1m-1 4h1m4-4h1m-1 4h1" />
                </svg>
                <motion.input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-digiqo-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:border-transparent transition-all hover:border-digiqo-gray-dark"
                  placeholder="Nom de votre entreprise"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-digiqo-gray-dark mb-2">
                Raison sociale *
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-digiqo-gray-dark/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <motion.select
                  required
                  value={formData.companyType}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyType: e.target.value }))}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-digiqo-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:border-transparent transition-all hover:border-digiqo-gray-dark appearance-none cursor-pointer"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="EI">EI - Entreprise Individuelle</option>
                  <option value="EURL">EURL - Entreprise Unipersonnelle</option>
                  <option value="SARL">SARL - Société à Responsabilité Limitée</option>
                  <option value="SAS">SAS - Société par Actions Simplifiée</option>
                  <option value="SASU">SASU - SAS Unipersonnelle</option>
                  <option value="SA">SA - Société Anonyme</option>
                  <option value="SNC">SNC - Société en Nom Collectif</option>
                  <option value="Association">Association</option>
                  <option value="Micro-entreprise">Micro-entreprise</option>
                  <option value="Autre">Autre</option>
                </motion.select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-digiqo-gray-dark mb-2">
                Téléphone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-digiqo-gray-dark/50" />
                <motion.input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  whileFocus={{ scale: 1.01 }}
                  className={cn(
                    "w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:border-transparent transition-all hover:border-digiqo-gray-dark",
                    errors.phone ? "border-red-500" : "border-digiqo-gray"
                  )}
                  placeholder="0692 92 92 92"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-digiqo-gray-dark mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-digiqo-gray-dark/50" />
                <motion.input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleEmailChange}
                  whileFocus={{ scale: 1.01 }}
                  className={cn(
                    "w-full pl-11 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:border-transparent transition-all hover:border-digiqo-gray-dark",
                    errors.email ? "border-red-500" : "border-digiqo-gray"
                  )}
                  placeholder="nom.prenom@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <motion.button
            type="button"
            onClick={() => setCurrentStep(2)}
            disabled={!canProceedToStep2}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all",
              canProceedToStep2
                ? "bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark text-white hover:shadow-accent-lg"
                : "bg-digiqo-gray text-digiqo-gray-dark cursor-not-allowed"
            )}
          >
            Continuer
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* Step 2: Project Details */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <h3 className="text-lg font-semibold text-digiqo-black">Votre projet</h3>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-digiqo-gray-dark mb-3">
              <FileText className="inline-block w-5 h-5 mr-2 mb-1" />
              Services souhaités *
            </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-digiqo-gray scrollbar-track-transparent">
              {services.map((service) => (
                <motion.button
                  key={service.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceToggle(service.id)}
                  className={cn(
                    "relative px-2.5 py-1.5 rounded-md border text-xs font-medium transition-all overflow-hidden",
                    formData.services.includes(service.id)
                      ? "border-digiqo-accent bg-digiqo-accent/10 text-digiqo-accent shadow-sm"
                      : "border-digiqo-gray hover:border-digiqo-gray-dark text-digiqo-gray-dark hover:bg-digiqo-gray-light"
                  )}
                >
                  {service.label}
                  {formData.services.includes(service.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-digiqo-accent rounded-full flex items-center justify-center"
                    >
                      <Check className="w-2.5 h-2.5 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-digiqo-gray-dark mb-2">
              <MessageSquare className="inline-block w-5 h-5 mr-2 mb-1" />
              Description *
            </label>
            <motion.textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              whileFocus={{ scale: 1.01 }}
              className="w-full px-4 py-2.5 bg-white border border-digiqo-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-digiqo-accent focus:border-transparent transition-all resize-none hover:border-digiqo-gray-dark text-sm"
              placeholder="Décrivez brièvement votre projet..."
            />
          </div>

          {/* Consent */}
          <div className="bg-digiqo-gray-light rounded-lg p-3">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                className="mt-0.5 w-4 h-4 text-digiqo-accent rounded border-digiqo-gray focus:ring-2 focus:ring-digiqo-accent"
              />
              <span className="ml-2.5 text-xs text-digiqo-gray-dark leading-relaxed">
                J'accepte de recevoir des communications de Digiqo (optionnel).
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              type="button"
              onClick={() => setCurrentStep(1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg font-semibold border-2 border-digiqo-gray text-digiqo-gray-dark hover:border-digiqo-gray-dark transition-all"
            >
              Retour
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex-1 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all",
                isSubmitting || !canSubmit
                  ? "bg-digiqo-gray text-digiqo-gray-dark cursor-not-allowed"
                  : "bg-gradient-to-r from-digiqo-accent to-digiqo-accent-dark text-white hover:shadow-accent-lg"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </form>
  )
}