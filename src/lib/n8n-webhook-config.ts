/**
 * Configuration et helpers pour l'intégration N8N
 * Webhook pour recevoir et traiter les soumissions d'audit
 */

// Configuration du webhook N8N
export const N8N_CONFIG = {
  // URL du webhook N8N (à configurer dans les variables d'environnement)
  webhookUrl: process.env.N8N_WEBHOOK_URL || 'https://n8n.digiqo.fr/webhook/audit-submission',
  
  // Clé API pour sécuriser le webhook
  apiKey: process.env.N8N_API_KEY || '',
  
  // Timeout pour les requêtes (en ms)
  timeout: 30000,
  
  // Nombre de tentatives en cas d'échec
  maxRetries: 3,
  
  // Délai entre les tentatives (en ms)
  retryDelay: 2000,
  
  // Headers personnalisés
  headers: {
    'X-Source': 'digiqo-website',
    'X-Version': '1.0.0',
  },
};

// Mapping des tables Airtable
export const AIRTABLE_TABLES = {
  audits: 'tblEbenlxn5FCfbND',
  entreprises: 'tblszAkQnXjEusk0t',
  actifsDigitaux: 'tblNCcAAJAmxLLttP',
  performanceWeb: 'tblushJsUtZhOwK4N',
  marketingDigital: 'tblEe6gqjHebgEoOg',
  conversionCRM: 'tblUdAkqPBSipTPbI',
  contacts: 'tblQmymIKJTjDwIy7',
  scoresRecommandations: 'tbl4RxoMqAXitmFAk',
  reputationObjectifs: 'tblTp964ujGGudNCJ',
};

// Mapping des champs du formulaire vers Airtable
export const FIELD_MAPPINGS = {
  // Table Entreprises
  general: {
    companyName: 'Nom Entreprise',
    sector: 'Secteur d\'Activité',
    companySize: 'Taille Entreprise',
    yearsFounded: 'Année de Fondation',
    location: 'Localisation',
    businessModel: 'Modèle Économique',
    companyAge: 'Âge Entreprise',
    teamSize: 'Taille Équipe Marketing',
  },
  
  // Table Actifs Digitaux
  digitalAssets: {
    hasWebsite: 'A un Site Web',
    website: 'URL Site Web',
    hasSocialMedia: 'A des Réseaux Sociaux',
    'socialMedia.facebook': 'Facebook',
    'socialMedia.instagram': 'Instagram',
    'socialMedia.linkedin': 'LinkedIn',
    'socialMedia.twitter': 'Twitter',
    'socialMedia.tiktok': 'TikTok',
    'socialMedia.youtube': 'YouTube',
    hasGoogleMyBusiness: 'A Google My Business',
    'businessListings.googleBusiness': 'URL Google Business',
    hasEcommerce: 'A du E-commerce',
    salesPlatforms: 'Plateformes de Vente',
    'businessListings.tripadvisor': 'TripAdvisor',
  },
  
  // Table Performance Web
  website: {
    type: 'Type de Site',
    objectives: 'Objectifs du Site',
    'perceivedQuality.ux': 'Score UX',
    'perceivedQuality.mobile': 'Score Mobile',
    'perceivedQuality.speed': 'Score Vitesse',
    'perceivedQuality.design': 'Score Design',
    'seo.optimized': 'SEO Optimisé',
    'seo.keywords': 'Mots-clés SEO',
    'seo.ranking': 'Ranking SEO',
    'tools.analytics': 'Google Analytics',
    'tools.pixel': 'Facebook Pixel',
    'tools.tagManager': 'Tag Manager',
    mobileOptimized: 'Mobile Optimisé',
    performance: 'Performance Générale',
  },
  
  // Table Marketing Digital
  socialMediaStrategy: {
    activePlatforms: 'Plateformes Actives',
    publicationFrequency: 'Fréquence Publication',
    managedBy: 'Géré Par',
    engagement: 'Engagement',
  },
  
  advertising: {
    types: 'Types de Publicité',
    budget: 'Budget Publicitaire',
    perceivedResults: 'ROI Perçu',
    campaignObjectives: 'Objectifs Campagnes',
  },
  
  content: {
    hasPhotos: 'A des Photos Pro',
    hasVideos: 'A des Vidéos',
    hasGraphics: 'A des Graphiques',
    contentTypes: 'Types de Contenu',
    productionMeans: 'Production Contenu',
    brandConsistency: 'Cohérence Marque',
  },
  
  // Table Conversion & CRM
  conversion: {
    leadGeneration: 'Méthodes Génération Leads',
    estimatedConversionRate: 'Taux de Conversion',
    hasLandingPages: 'A des Landing Pages',
    hasForms: 'A des Formulaires',
    hasCtaButtons: 'Qualité CTA',
    leadTracking: 'Tracking Leads',
    leadNurturing: 'Lead Nurturing',
    salesProcess: 'Processus de Vente',
    dataAnalysis: 'Analyse Données',
    abTesting: 'A/B Testing',
  },
  
  crm: {
    hasCRM: 'A un CRM',
    crmType: 'Type CRM',
    features: 'Fonctionnalités CRM',
    emailMarketing: 'Email Marketing',
    automation: 'Marketing Automation',
    segmentation: 'Segmentation',
    toolsUsed: 'Outils Utilisés',
    automations: 'Automatisations',
    integration: 'Intégration Systèmes',
    dataQuality: 'Qualité Données',
  },
  
  // Table Contacts
  contact: {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    preferredContact: 'Moyen de contact préféré',
    preferredTimeSlot: 'Créneau horaire préféré',
    bestTime: 'Meilleur moment',
  },
  
  // Table Réputation & Objectifs
  reputation: {
    monitoring: 'Surveillance e-réputation',
    reviewsResponse: 'Réponse aux avis',
    averageRating: 'Note moyenne',
    reviewPlatforms: 'Plateformes d\'avis',
  },
  
  objectives: {
    goals: 'Objectifs principaux',
    challenges: 'Défis principaux',
    timeline: 'Timeline projet',
    budget: 'Budget estimé',
  },
};

// Règles d'assignation commerciale
export const ASSIGNMENT_RULES = {
  high: {
    assignTo: 'senior-sales',
    notification: 'urgent',
    responseTime: '24h',
    followUpStrategy: 'call-first',
  },
  medium: {
    assignTo: 'sales-team',
    notification: 'normal',
    responseTime: '48h',
    followUpStrategy: 'email-first',
  },
  low: {
    assignTo: 'junior-sales',
    notification: 'batch',
    responseTime: '72h',
    followUpStrategy: 'email-nurturing',
  },
};

// Templates d'email
export const EMAIL_TEMPLATES = {
  prospect: {
    subject: 'Votre audit digital Digiqo - Référence {{reference}}',
    template: 'audit-confirmation-prospect',
  },
  commercial: {
    high: {
      subject: '🔥 URGENT - Nouveau lead chaud - Score {{score}}%',
      template: 'audit-notification-high-priority',
    },
    medium: {
      subject: 'Nouvel audit à traiter - Score {{score}}%',
      template: 'audit-notification-medium-priority',
    },
    low: {
      subject: 'Audit reçu - Score {{score}}%',
      template: 'audit-notification-low-priority',
    },
  },
};

// Configuration des scores et seuils
export const SCORING_CONFIG = {
  // Pondération des catégories pour le score global
  weights: {
    website: 0.20,
    socialMedia: 0.15,
    advertising: 0.15,
    content: 0.10,
    conversion: 0.15,
    crm: 0.15,
    reputation: 0.10,
  },
  
  // Seuils de maturité digitale
  maturityLevels: {
    expert: 80,
    advanced: 60,
    intermediate: 40,
    beginner: 0,
  },
  
  // Seuils pour les recommandations
  recommendationThresholds: {
    critical: 30,  // Score < 30% = recommandation critique
    important: 50, // Score < 50% = recommandation importante
    optional: 70,  // Score < 70% = recommandation optionnelle
  },
};

// Helpers pour la transformation des données
export function transformFormDataForAirtable(formData: any) {
  const transformed: any = {};
  
  // Transformer chaque section selon le mapping
  Object.entries(FIELD_MAPPINGS).forEach(([section, mappings]) => {
    if (formData[section]) {
      transformed[section] = {};
      Object.entries(mappings).forEach(([formField, airtableField]) => {
        // Gérer les champs imbriqués (ex: socialMedia.facebook)
        if (formField.includes('.')) {
          const [parent, child] = formField.split('.');
          if (formData[section][parent] && formData[section][parent][child]) {
            transformed[section][airtableField] = formData[section][parent][child];
          }
        } else {
          if (formData[section][formField] !== undefined) {
            transformed[section][airtableField] = formData[section][formField];
          }
        }
      });
    }
  });
  
  return transformed;
}

// Helper pour déterminer les recommandations prioritaires
export function generatePriorityRecommendations(scores: any) {
  const recommendations = {
    high: [] as string[],
    medium: [] as string[],
    low: [] as string[],
  };
  
  Object.entries(scores.categories).forEach(([category, score]) => {
    const categoryScore = score as number;
    
    if (categoryScore < SCORING_CONFIG.recommendationThresholds.critical) {
      recommendations.high.push(`Amélioration urgente nécessaire pour ${category}`);
    } else if (categoryScore < SCORING_CONFIG.recommendationThresholds.important) {
      recommendations.medium.push(`Optimisation recommandée pour ${category}`);
    } else if (categoryScore < SCORING_CONFIG.recommendationThresholds.optional) {
      recommendations.low.push(`Perfectionnement possible pour ${category}`);
    }
  });
  
  return recommendations;
}

// Helper pour calculer le lead score
export function calculateLeadScore(formData: any, auditScore: number): number {
  let leadScore = auditScore;
  
  // Bonus selon le budget
  const budgetScores: Record<string, number> = {
    '> 10000€/mois': 25,
    '5000-10000€/mois': 20,
    '2500-5000€/mois': 15,
    '1000-2500€/mois': 10,
    '500-1000€/mois': 5,
  };
  
  if (formData.objectives?.budget && budgetScores[formData.objectives.budget]) {
    leadScore += budgetScores[formData.objectives.budget];
  }
  
  // Bonus selon la timeline
  const timelineScores: Record<string, number> = {
    'immediate': 20,
    '< 1 month': 15,
    '1-3 months': 10,
    '3-6 months': 5,
  };
  
  if (formData.objectives?.timeline && timelineScores[formData.objectives.timeline]) {
    leadScore += timelineScores[formData.objectives.timeline];
  }
  
  // Bonus selon la taille de l'entreprise
  const sizeScores: Record<string, number> = {
    '50+': 15,
    '20-50': 10,
    '10-20': 5,
  };
  
  if (formData.general?.companySize && sizeScores[formData.general.companySize]) {
    leadScore += sizeScores[formData.general.companySize];
  }
  
  return Math.min(100, leadScore);
}

// Export des types pour TypeScript
export interface N8NWebhookPayload {
  formData: any;
  scores: any;
  metadata: {
    timestamp: string;
    source: string;
    ip: string;
    userAgent: string;
    completionPercentage: number;
    formVersion: string;
  };
  businessContext: {
    estimatedBudget: string;
    priority: 'high' | 'medium' | 'low';
    leadScore: number;
    assignTo: string;
  };
}

export interface AirtableRecord {
  fields: Record<string, any>;
  typecast?: boolean;
}