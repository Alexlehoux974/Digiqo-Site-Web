export interface AuditFormData {
  // General info
  general: {
    companyName: string;
    sector: string;
    companySize: string;
    yearsFounded: string;
    location: string;
    businessModel: string;
    companyAge: string;
    teamSize: string;
  };
  
  // Digital assets
  digitalAssets: {
    hasWebsite: boolean;
    hasSocialMedia: boolean;
    hasGoogleMyBusiness: boolean;
    hasEcommerce: boolean;
    website: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      linkedin: string;
      twitter: string;
      tiktok: string;
      youtube: string;
    };
    salesPlatforms: string[];
    businessListings: {
      googleBusiness: string;
      tripadvisor: string;
    };
  };
  
  // Website
  website: {
    hasWebsite: boolean;
    url: string;
    type: string;
    objectives: string[];
    perceivedQuality: {
      ux: number;
      mobile: number;
      speed: number;
      design: number;
    };
    seo: {
      optimized: boolean;
      keywords: string;
      ranking: string;
    };
    tools: {
      analytics: boolean;
      pixel: boolean;
      tagManager: boolean;
    };
    mobileOptimized: boolean;
    seoOptimized: boolean;
    performance: string;
    analytics: boolean;
  };
  
  // Social media
  socialMedia: {
    platforms: string[];
    frequency: string;
    communityManaged: boolean;
    engagement: string;
    strategy: boolean;
  };
  
  // Social media strategy
  socialMediaStrategy: {
    activePlatforms: string[];
    publicationFrequency: string;
    managedBy: string;
    engagement: string;
  };
  
  // Advertising
  advertising: {
    types: string[];
    testedPlatforms: string[];
    budget: string;
    averageBudget: string;
    perceivedResults: string;
    campaignObjectives: string[];
    conversionTunnel: boolean;
    expectations: string;
    roi: string;
    tracking: boolean;
  };
  
  // Content
  content: {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasGraphics: boolean;
    contentManaged: boolean;
    contentTypes: string[];
    productionMeans: string;
    acquisitionFormats: string[];
    brandConsistency: string;
  };
  
  // Conversion
  conversion: {
    leadGeneration: string[];
    conversionRate: string;
    estimatedConversionRate: string;
    hasLandingPages: boolean;
    hasForms: boolean;
    hasCtaButtons: string;
    leadTracking: string;
    leadNurturing: string;
    salesProcess: string;
    crm: boolean;
    dataAnalysis: string;
    abTesting: boolean;
  };
  
  // CRM
  crm: {
    hasCRM: boolean;
    crmType: string;
    features: string[];
    emailMarketing: boolean;
    automation: boolean;
    segmentation: boolean;
    hasDatabase: boolean;
    hasSegmentation: boolean;
    toolsUsed: string[];
    automations: string[];
    integration: string;
    dataQuality: string;
  };
  
  // Reputation
  reputation: {
    monitoring: boolean;
    reviewsResponse: boolean;
    averageRating: string;
    reviewPlatforms: string[];
  };
  
  // Objectives
  objectives: {
    goals: string[];
    challenges: string;
    timeline: string;
    budget: string;
  };
  
  // Contact
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: string;
    preferredTimeSlot: string;
    bestTime: string;
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
    website: number;
    socialMedia: number;
    advertising: number;
    content: number;
    conversion: number;
    crm: number;
    reputation: number;
  };
  strengths: string[];
  improvements: string[];
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: string;
  }[];
}