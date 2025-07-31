// Mapping entre les pages de services et les IDs du formulaire
export const servicePageToFormMapping: Record<string, {
  formServiceId: string
  defaultDescription: string
}> = {
  'publicite': {
    formServiceId: 'sma', // Social Media Advertising
    defaultDescription: 'Je souhaite booster ma visibilité avec des campagnes publicitaires sur Google Ads et Meta.'
  },
  'dev-web': {
    formServiceId: 'website',
    defaultDescription: 'J\'ai besoin d\'un site web moderne et performant pour mon entreprise.'
  },
  'community': {
    formServiceId: 'cm', // Community Management
    defaultDescription: 'Je recherche un community manager pour gérer mes réseaux sociaux.'
  },
  'seo': {
    formServiceId: 'seo',
    defaultDescription: 'Je veux améliorer mon référencement naturel sur Google.'
  },
  'video': {
    formServiceId: 'visuals',
    defaultDescription: 'J\'ai besoin de contenus visuels et vidéos pour ma communication.'
  },
  'identite': {
    formServiceId: 'branding',
    defaultDescription: 'Je souhaite créer ou refondre mon identité visuelle (logo, charte graphique).'
  },
  'audit': {
    formServiceId: 'audit',
    defaultDescription: 'Je souhaite réaliser un audit gratuit de ma présence digitale.'
  },
  'sitekeeper': {
    formServiceId: 'shop', // Shop/Sitekeeper
    defaultDescription: 'J\'ai besoin d\'un service de maintenance et sécurité pour mon site web.'
  },
  'kap-numerik': {
    formServiceId: 'website', // Using website service since it's about digital presence
    defaultDescription: 'Je souhaite bénéficier du Kap Numérik pour développer ma présence digitale.'
  },
  'formations': {
    formServiceId: 'other',
    defaultDescription: 'Je souhaite me former avec DigiCademy.'
  }
}

// Mapping des formules spécifiques pour la publicité
export const advertFormulasMapping: Record<string, {
  formServiceId: string
  defaultDescription: string
}> = {
  'initiation': {
    formServiceId: 'sma',
    defaultDescription: 'Je suis intéressé par la formule Initiation - Gestion publicitaire jusqu\'à 1000€/mois avec 3 campagnes simultanées.'
  },
  'propulsion': {
    formServiceId: 'sma',
    defaultDescription: 'Je suis intéressé par la formule Propulsion - Gestion publicitaire jusqu\'à 2500€/mois avec 4 campagnes simultanées.'
  },
  'expansion': {
    formServiceId: 'sma',
    defaultDescription: 'Je suis intéressé par la formule Expansion pour des besoins publicitaires importants.'
  },
  'domination': {
    formServiceId: 'sma',
    defaultDescription: 'Je suis intéressé par la formule Domination pour une stratégie publicitaire complète.'
  }
}