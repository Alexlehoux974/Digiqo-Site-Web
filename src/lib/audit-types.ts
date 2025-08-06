export interface AuditFormData {
  // 1. Informations Générales
  general: {
    companyName: string;
    sector: string;
    location: string;
    companyAge: string;
    teamSize: string;
    businessModel: string;
  };

  // 2. Coordonnées des actifs digitaux
  digitalAssets: {
    website: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
      tiktok?: string;
      youtube?: string;
      other?: string;
    };
    businessListings: {
      googleBusiness?: string;
      tripadvisor?: string;
      other?: string[];
    };
    salesPlatforms?: string[];
  };

  // 3. Site Internet
  website: {
    hasWebsite: boolean;
    objectives?: string[];
    structure?: string;
    perceivedQuality: {
      ux?: number;
      mobile?: number;
      speed?: number;
      design?: number;
    };
    seo: {
      optimized?: boolean;
      keywords?: string;
      ranking?: string;
    };
    tools: {
      analytics?: boolean;
      pixel?: boolean;
      tagManager?: boolean;
      other?: string[];
    };
  };

  // 4. Réseaux Sociaux
  socialMediaStrategy: {
    activePlatforms: string[];
    publicationFrequency: string;
    managedBy: string;
    engagement: string;
    perceivedResults: string;
  };

  // 5. Publicité & Acquisition
  advertising: {
    testedPlatforms: string[];
    averageBudget: string;
    campaignObjectives: string[];
    tracking: boolean;
    conversionTunnel: boolean;
    perceivedResults: string;
    expectations: string;
  };

  // 6. Contenu & Création Visuelle
  content: {
    contentTypes: string[];
    brandConsistency: number;
    productionMeans: string;
    acquisitionFormats: string[];
  };

  // 7. Tunnel de Conversion & Données
  conversion: {
    hasLandingPages: boolean;
    hasForms: boolean;
    hasCtaButtons: boolean;
    estimatedConversionRate?: string;
    leadTracking: boolean;
    leadNurturing: boolean;
  };

  // 8. CRM / Automatisation
  crm: {
    toolsUsed: string[];
    prospectTracking: boolean;
    customerTracking: boolean;
    automations: string[];
    hasDatabase: boolean;
    hasSegmentation: boolean;
  };

  // 9. E-réputation & Preuves Sociales
  reputation: {
    reviewCount: string;
    reviewManagement: boolean;
    reviewResponse: boolean;
    testimonials: boolean;
    caseStudies: boolean;
    ugcContent: boolean;
    platformPositioning: string;
    notorietyStrategy: string;
  };

  // 10. Objectifs & Freins
  objectives: {
    shortTermGoals: string;
    mediumTermGoals: string;
    growthObstacles: string;
    consideredSolutions: string;
    urgencyLevel: number;
  };

  // 11. Coordonnées & Rendez-vous
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: 'email' | 'phone' | 'visio';
    preferredTimeSlot?: string;
  };
}

export interface AuditStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  fields: string[];
  progress: number;
}

export interface AuditScore {
  overall: number;
  categories: {
    digital: number;
    marketing: number;
    conversion: number;
    automation: number;
    reputation: number;
  };
  recommendations: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}