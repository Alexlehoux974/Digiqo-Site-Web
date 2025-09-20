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
    publicationTime: string;
    managedBy: string;
    engagement: string;
    objectives: string[];
    communityManagement: boolean;
    communitySize: string;
    contentTypes: string;
    tools: string;
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
    useAdvertising: boolean;
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
    hasCtaButtons: boolean;
    leadTracking: boolean;
    leadNurturing: boolean;
    salesProcess: string;
    crm: boolean;
    dataAnalysis: boolean;
    abTesting: boolean;
    funnelStages: string[];
    averageOrderValue: string;
    frictionPoints: string;
    hasEcommerce: boolean;
    cartAbandonmentRate: string;
    monthlySales: string;
    trackingTools: string[];
    dataDecisions: boolean;
    gdprCompliant: boolean;
    analysisFrequency: string;
    heatmaps: boolean;
    userFeedback: boolean;
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
    dataQuality: number;
    crmDuration: string;
    contactsCount: string;
    hasDataEnrichment: boolean;
    hasEmailMarketing: boolean;
    emailFrequency: string;
    emailListSize: string;
    openRate: string;
    clickRate: string;
    dataUsage: string[];
    integrations: string;
    hasSalesPipeline: boolean;
    hasLeadScoring: boolean;
    hasAutomatedFollowUp: boolean;
    salesCycleDuration: string;
    customerLTV: string;
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