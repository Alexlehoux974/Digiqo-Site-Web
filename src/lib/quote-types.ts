export interface WebQuoteFormData {
  // Informations du projet
  project: {
    companyName: string;
    sector: string;
    projectDescription: string;
    existingSite: boolean;
    currentSiteUrl?: string;
  };

  // Type de site web
  websiteType: {
    type: 'vitrine' | 'ecommerce' | 'landing' | 'blog' | 'webapp' | 'custom';
    pages: number;
    languages: string[];
  };

  // Fonctionnalités
  features: {
    contactForm: boolean;
    onlineBooking: boolean;
    onlinePayment: boolean;
    memberArea: boolean;
    multiLanguage: boolean;
    liveChat: boolean;
    newsletter: boolean;
    socialMediaIntegration: boolean;
    blog: boolean;
    search: boolean;
    other: string;
  };

  // Design & Identité
  design: {
    hasCharter: boolean;
    needLogo: boolean;
    style: 'moderne' | 'classique' | 'minimaliste' | 'creatif' | 'corporate';
    references: string;
    animations: 'aucune' | 'legeres' | 'avancees';
    colors: string;
  };

  // Contenu
  content: {
    contentReady: boolean;
    needCopywriting: boolean;
    needPhotos: boolean;
    needVideos: boolean;
    pagesCount: number;
    hasContent: 'tout' | 'partiel' | 'rien';
  };

  // Aspects techniques
  technical: {
    needHosting: boolean;
    needDomain: boolean;
    needSSL: boolean;
    needSEO: boolean;
    needAnalytics: boolean;
    needMaintenance: boolean;
    integrations: string[];
  };

  // Délais et mode de paiement
  timeline: {
    deadline: string;
    priority: 'urgent' | 'normal' | 'flexible';
    paymentMode: 'monthly' | 'onetime';
    startDate: string;
  };

  // Contact
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    preferredContact: 'email' | 'phone' | 'whatsapp';
    bestTime: string;
  };
}

export interface QuoteStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  fields: string[];
  progress: number;
}

export interface QuoteEstimation {
  basePrice: number;
  additionalCosts: {
    features: number;
    design: number;
    content: number;
    technical: number;
  };
  totalMin: number;
  totalMax: number;
  monthlyPrice?: number;
  timeline: string;
  recommendations: string[];
}