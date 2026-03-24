export type BrandingService = 'creation-logo' | 'refonte-logo' | 'charte-graphique' | 'branding-complet'

export interface BrandingQuoteFormData {
  service: {
    type: BrandingService
    additionalServices: string[]
  }
  company: {
    name: string
    sector: string
    description: string
    hasExistingBrand: string
    existingBrandDetails: string
  }
  style: {
    direction: string
    colors: string
    references: string
    keywords: string[]
    targetAudience: string
  }
  project: {
    timeline: string
    budget: string
    additionalInfo: string
  }
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
    preferredContact: string
  }
}
