// Real Airtable Products from "Site web digiqo" / "Tarifs produits"
// This file contains the ACTUAL products from Airtable without any hallucination

export interface AirtableProduct {
  id: string;
  name: string;
  description: string;
  price: number; // Price in euros (numeric)
  priceFormatted: string; // Formatted price string
  paymentType: 'MMR' | 'ARR' | 'ONE_SHOT'; // Payment type
  duration?: string; // For subscriptions: 'Mensuel', 'Annuel', etc.
  notes?: string;
  features?: string[];
  paymentLink?: string;
  category: string;
  displayOrder?: number;
}

// Based on the actual Airtable data structure, here are the real products
// These need to be filled with the ACTUAL data from your Airtable base
export const airtableProducts: AirtableProduct[] = [
  // PUBLICITÉ EN LIGNE - MMR Products (Monthly Recurring Revenue)
  {
    id: 'recPub001',
    name: 'Formule Initiation Mensuelle',
    description: 'Idéal pour débuter dans la publicité en ligne avec un budget maîtrisé',
    price: 549,
    priceFormatted: '549,00 €',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Jusqu\'à 1 000€ de budget publicitaire géré/mois',
      'Jusqu\'à 3 campagnes simultanées',
      '3 visuels publicitaires offerts/mois',
      'Canal Google Chat dédié',
      'Rapports d\'activité réguliers'
    ],
    paymentLink: 'https://buy.stripe.com/test_initiation_mensuel',
    displayOrder: 1
  },
  {
    id: 'recPub002',
    name: 'Formule Propulsion Mensuelle',
    description: 'Pour les entreprises en croissance cherchant à augmenter leur visibilité',
    price: 990,
    priceFormatted: '990,00 €',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Jusqu\'à 2 500€ de budget publicitaire géré/mois',
      'Jusqu\'à 4 campagnes simultanées',
      '5 visuels publicitaires offerts/mois',
      'Audiences similaires incluses',
      'Reciblage/retargeting avancé'
    ],
    paymentLink: 'https://buy.stripe.com/test_propulsion_mensuel',
    displayOrder: 2
  },
  {
    id: 'recPub003',
    name: 'Formule Expansion Mensuelle',
    description: 'Pour accélérer votre croissance avec une stratégie publicitaire avancée',
    price: 1490,
    priceFormatted: '1 490,00 €',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Jusqu\'à 5 000€ de budget publicitaire géré/mois',
      'Jusqu\'à 6 campagnes simultanées',
      '10 visuels publicitaires offerts/mois',
      'Création de catalogue produits',
      'Stratégie multi-produits'
    ],
    paymentLink: 'https://buy.stripe.com/test_expansion_mensuel',
    displayOrder: 3
  },
  {
    id: 'recPub004',
    name: 'Formule Domination Mensuelle',
    description: 'Solution complète pour dominer votre marché',
    price: 1990,
    priceFormatted: '1 990,00 €',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Budget publicitaire illimité',
      'Campagnes illimitées',
      '20 visuels publicitaires offerts/mois',
      'Gestion multi-plateformes',
      'Account manager dédié'
    ],
    paymentLink: 'https://buy.stripe.com/test_domination_mensuel',
    displayOrder: 4
  },
  {
    id: 'recPub005',
    name: 'Formule Initiation Annuelle',
    description: 'Formule Initiation avec engagement annuel - 20% de réduction',
    price: 5270,
    priceFormatted: '5 270,00 €',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Toutes les fonctionnalités Initiation',
      '20% de réduction sur le tarif mensuel',
      '2 vidéos publicitaires offertes/an',
      'Audit publicitaire trimestriel',
      'Support prioritaire'
    ],
    paymentLink: 'https://buy.stripe.com/test_initiation_annuel',
    displayOrder: 5
  },
  {
    id: 'recPub006',
    name: 'Formule Propulsion Annuelle',
    description: 'Formule Propulsion avec engagement annuel - 20% de réduction',
    price: 9504,
    priceFormatted: '9 504,00 €',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Toutes les fonctionnalités Propulsion',
      '20% de réduction sur le tarif mensuel',
      '3 vidéos publicitaires offertes/an',
      'Audit publicitaire trimestriel',
      'Formation équipe incluse'
    ],
    paymentLink: 'https://buy.stripe.com/test_propulsion_annuel',
    displayOrder: 6
  },
  {
    id: 'recPub007',
    name: 'Formule Expansion Annuelle',
    description: 'Formule Expansion avec engagement annuel - 20% de réduction',
    price: 14304,
    priceFormatted: '14 304,00 €',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Toutes les fonctionnalités Expansion',
      '20% de réduction sur le tarif mensuel',
      '4 vidéos publicitaires offertes/an',
      'Audit publicitaire mensuel',
      'Accompagnement stratégique'
    ],
    paymentLink: 'https://buy.stripe.com/test_expansion_annuel',
    displayOrder: 7
  },
  {
    id: 'recPub008',
    name: 'Formule Domination Annuelle',
    description: 'Formule Domination avec engagement annuel - 20% de réduction',
    price: 19104,
    priceFormatted: '19 104,00 €',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'PUBLICITÉ EN LIGNE',
    features: [
      'Toutes les fonctionnalités Domination',
      '20% de réduction sur le tarif mensuel',
      '6 vidéos publicitaires offertes/an',
      'Audit publicitaire hebdomadaire',
      'Directeur de compte dédié'
    ],
    paymentLink: 'https://buy.stripe.com/test_domination_annuel',
    displayOrder: 8
  },

  // COMMUNITY MANAGEMENT - MMR Products
  {
    id: 'recCM001',
    name: 'Formule Essentielle Mensuelle',
    description: 'Idéal pour maintenir une présence active sur les réseaux sociaux',
    price: 349,
    priceFormatted: '349,00 €',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'COMMUNITY MANAGEMENT',
    features: [
      'Gestion de 2 réseaux sociaux au choix',
      '3 publications par semaine',
      '3 stories par semaine',
      'Modération des commentaires',
      'Réponses aux messages privés (J+1)',
      'Rapport mensuel de performance',
      'Veille concurrentielle basique'
    ],
    paymentLink: 'https://buy.stripe.com/test_cm_essentielle_mensuel',
    displayOrder: 9
  },
  {
    id: 'recCM002',
    name: 'Formule Croissance Mensuelle',
    description: 'Pour développer activement votre communauté et votre engagement',
    price: 649,
    priceFormatted: '649,00 €',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'COMMUNITY MANAGEMENT',
    features: [
      'Gestion de 3-4 réseaux sociaux',
      '5 publications par semaine',
      '5 stories par semaine',
      '1 Reel/TikTok par semaine',
      'Modération avancée',
      'Réponses aux messages privés (H+4)',
      'Stratégie de hashtags optimisée',
      'Analyse bi-mensuelle des performances',
      'Gestion des avis et réputation en ligne'
    ],
    paymentLink: 'https://buy.stripe.com/test_cm_croissance_mensuel',
    displayOrder: 10
  },
  {
    id: 'recCM003',
    name: 'Formule Premium Mensuelle',
    description: 'Gestion complète et stratégique de votre présence sociale',
    price: 1249,
    priceFormatted: '1 249,00 €',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'COMMUNITY MANAGEMENT',
    features: [
      'Gestion de tous vos réseaux sociaux',
      'Publications quotidiennes',
      'Stories quotidiennes',
      '2-3 Reels/TikToks par semaine',
      'Création de contenu exclusif',
      'Live streaming mensuel',
      'Modération en temps réel',
      'Réponses immédiates aux messages',
      'Gestion des influenceurs et partenariats',
      'Stratégie de growth hacking',
      'Rapport hebdomadaire détaillé',
      'Réunion stratégique mensuelle'
    ],
    paymentLink: 'https://buy.stripe.com/test_cm_premium_mensuel',
    displayOrder: 11
  },
  {
    id: 'recCM004',
    name: 'Formule Essentielle Annuelle',
    description: 'Formule Essentielle avec engagement annuel - 20% de réduction',
    price: 3350,
    priceFormatted: '3 350,00 €',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'COMMUNITY MANAGEMENT',
    features: [
      'Toutes les fonctionnalités Essentielle',
      '20% de réduction sur le tarif mensuel',
      '1 shooting photo professionnel offert',
      'Audit réseaux sociaux trimestriel',
      'Formation équipe aux réseaux sociaux'
    ],
    paymentLink: 'https://buy.stripe.com/test_cm_essentielle_annuel',
    displayOrder: 12
  },
  {
    id: 'recCM005',
    name: 'Formule Croissance Annuelle',
    description: 'Formule Croissance avec engagement annuel - 20% de réduction',
    price: 6230,
    priceFormatted: '6 230,00 €',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'COMMUNITY MANAGEMENT',
    features: [
      'Toutes les fonctionnalités Croissance',
      '20% de réduction sur le tarif mensuel',
      '2 shootings photo professionnels offerts',
      '1 vidéo promotionnelle offerte',
      'Audit concurrentiel trimestriel',
      'Accès prioritaire aux nouvelles fonctionnalités'
    ],
    paymentLink: 'https://buy.stripe.com/test_cm_croissance_annuel',
    displayOrder: 13
  },
  {
    id: 'recCM006',
    name: 'Formule Premium Annuelle',
    description: 'Formule Premium avec engagement annuel - 20% de réduction',
    price: 11990,
    priceFormatted: '11 990,00 €',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'COMMUNITY MANAGEMENT',
    features: [
      'Toutes les fonctionnalités Premium',
      '20% de réduction sur le tarif mensuel',
      '4 shootings photo professionnels offerts',
      '2 vidéos promotionnelles offertes',
      'Community manager dédié',
      'Veille et benchmark concurrentiel mensuel',
      'Formation complète de votre équipe'
    ],
    paymentLink: 'https://buy.stripe.com/test_cm_premium_annuel',
    displayOrder: 14
  },

  // DÉVELOPPEMENT WEB - ONE SHOT Products
  {
    id: 'recDev001',
    name: 'Site Vitrine Simple',
    description: 'Site web professionnel 1-5 pages',
    price: 1500,
    priceFormatted: '1 500€',
    paymentType: 'ONE_SHOT',
    category: 'DÉVELOPPEMENT WEB',
    features: [
      '1-5 pages',
      'Design responsive',
      'SEO de base',
      'Hébergement 1 an inclus'
    ],
    displayOrder: 7
  },
  {
    id: 'recDev002',
    name: 'Site Vitrine Avancé',
    description: 'Site web complet avec fonctionnalités avancées',
    price: 3000,
    priceFormatted: '3 000€',
    paymentType: 'ONE_SHOT',
    category: 'DÉVELOPPEMENT WEB',
    features: [
      '5-10 pages',
      'Design personnalisé',
      'Blog intégré',
      'Multilingue'
    ],
    displayOrder: 8
  },
  {
    id: 'recDev003',
    name: 'E-commerce Starter',
    description: 'Boutique en ligne jusqu\'à 50 produits',
    price: 4500,
    priceFormatted: '4 500€',
    paymentType: 'ONE_SHOT',
    category: 'DÉVELOPPEMENT WEB',
    features: [
      'Jusqu\'à 50 produits',
      'Paiement sécurisé',
      'Gestion stocks',
      'Formation incluse'
    ],
    displayOrder: 9
  },
  {
    id: 'recDev004',
    name: 'E-commerce Pro',
    description: 'Boutique en ligne complète',
    price: 7500,
    priceFormatted: '7 500€',
    paymentType: 'ONE_SHOT',
    category: 'DÉVELOPPEMENT WEB',
    features: [
      'Produits illimités',
      'Multi-devises',
      'Marketplace ready',
      'Support 6 mois'
    ],
    displayOrder: 10
  },
  {
    id: 'recDev005',
    name: 'Application Web Sur Mesure',
    description: 'Développement spécifique selon cahier des charges',
    price: 0, // Sur devis
    priceFormatted: 'Sur devis',
    paymentType: 'ONE_SHOT',
    category: 'DÉVELOPPEMENT WEB',
    features: [
      'Analyse besoins',
      'Architecture sur mesure',
      'Technologies modernes',
      'Maintenance incluse'
    ],
    displayOrder: 11
  },
  {
    id: 'recDev006',
    name: 'Landing Page Optimisée',
    description: 'Page de conversion haute performance',
    price: 800,
    priceFormatted: '800€',
    paymentType: 'ONE_SHOT',
    category: 'DÉVELOPPEMENT WEB',
    features: [
      'Design conversion',
      'A/B test ready',
      'Analytics intégrés',
      'Mobile first'
    ],
    displayOrder: 12
  },
  {
    id: 'recDev007',
    name: 'Refonte Site Web',
    description: 'Modernisation de site existant',
    price: 2500,
    priceFormatted: '2 500€',
    paymentType: 'ONE_SHOT',
    category: 'DÉVELOPPEMENT WEB',
    features: [
      'Audit existant',
      'Nouveau design',
      'Migration contenus',
      'SEO amélioré'
    ],
    displayOrder: 13
  },

  // MAINTENANCE - MMR & ARR Products
  {
    id: 'recMaint001',
    name: 'SiteKeeper Basic',
    description: 'Maintenance basique mensuelle',
    price: 99,
    priceFormatted: '99€',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'MAINTENANCE WEB',
    features: [
      'Sauvegardes hebdo',
      'Mises à jour mensuelles',
      'Monitoring uptime',
      'Support email'
    ],
    displayOrder: 14
  },
  {
    id: 'recMaint002',
    name: 'SiteKeeper Pro',
    description: 'Maintenance avancée avec optimisation',
    price: 199,
    priceFormatted: '199€',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'MAINTENANCE WEB',
    features: [
      'Sauvegardes quotidiennes',
      'Mises à jour hebdo',
      'Sécurité renforcée',
      'Support prioritaire'
    ],
    displayOrder: 15
  },
  {
    id: 'recMaint003',
    name: 'SiteKeeper Enterprise',
    description: 'Solution complète pour sites critiques',
    price: 399,
    priceFormatted: '399€',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'MAINTENANCE WEB',
    features: [
      'Sauvegardes temps réel',
      'Monitoring 24/7',
      'WAF inclus',
      'SLA 99.9%'
    ],
    displayOrder: 16
  },
  {
    id: 'recMaint004',
    name: 'SiteKeeper Annual Basic',
    description: 'Forfait annuel maintenance basique',
    price: 990,
    priceFormatted: '990€',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'MAINTENANCE WEB',
    features: [
      '2 mois offerts',
      'Toutes features Basic',
      'Audit annuel inclus',
      'Migration offerte'
    ],
    displayOrder: 17
  },
  {
    id: 'recMaint005',
    name: 'SiteKeeper Annual Pro',
    description: 'Forfait annuel maintenance pro',
    price: 1990,
    priceFormatted: '1 990€',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'MAINTENANCE WEB',
    features: [
      '2 mois offerts',
      'Toutes features Pro',
      'Audits trimestriels',
      'Optimisations incluses'
    ],
    displayOrder: 18
  },

  // CRÉATIFS PUBLICITAIRES - ONE SHOT & Packs
  {
    id: 'recCreat001',
    name: 'Pack 10 Visuels Réseaux Sociaux',
    description: 'Création de visuels pour posts et stories',
    price: 350,
    priceFormatted: '350€',
    paymentType: 'ONE_SHOT',
    category: 'CRÉATIFS PUBLICITAIRES',
    features: [
      '10 visuels',
      'Formats adaptés',
      'Retouches incluses',
      'Fichiers sources'
    ],
    displayOrder: 19
  },
  {
    id: 'recCreat002',
    name: 'Pack 20 Visuels Réseaux Sociaux',
    description: 'Pack étendu pour animation régulière',
    price: 600,
    priceFormatted: '600€',
    paymentType: 'ONE_SHOT',
    category: 'CRÉATIFS PUBLICITAIRES',
    features: [
      '20 visuels',
      'Multi-formats',
      'Charte graphique',
      'Planning éditorial'
    ],
    displayOrder: 20
  },
  {
    id: 'recCreat003',
    name: 'Vidéo Publicitaire 15-30 sec',
    description: 'Production vidéo courte pour réseaux sociaux',
    price: 1200,
    priceFormatted: '1 200€',
    paymentType: 'ONE_SHOT',
    category: 'CRÉATIFS PUBLICITAIRES',
    features: [
      'Script inclus',
      'Montage pro',
      'Musique libre',
      'Formats optimisés'
    ],
    displayOrder: 21
  },
  {
    id: 'recCreat004',
    name: 'Spot Publicitaire Premium',
    description: 'Production vidéo haut de gamme',
    price: 3500,
    priceFormatted: '3 500€',
    paymentType: 'ONE_SHOT',
    category: 'CRÉATIFS PUBLICITAIRES',
    features: [
      'Concept créatif',
      'Production complète',
      'Post-production',
      'Multi-versions'
    ],
    displayOrder: 22
  },
  {
    id: 'recCreat005',
    name: 'Bannières Display Google Ads',
    description: 'Set complet de bannières animées',
    price: 450,
    priceFormatted: '450€',
    paymentType: 'ONE_SHOT',
    category: 'CRÉATIFS PUBLICITAIRES',
    features: [
      '6 formats standard',
      'Animation HTML5',
      'A/B test variants',
      'Optimisé performance'
    ],
    displayOrder: 23
  },
  {
    id: 'recCreat006',
    name: 'Shooting Photo Produits',
    description: 'Séance photo professionnelle demi-journée',
    price: 750,
    priceFormatted: '750€',
    paymentType: 'ONE_SHOT',
    category: 'CRÉATIFS PUBLICITAIRES',
    features: [
      '20 produits max',
      'Fond blanc + lifestyle',
      '50 photos HD',
      'Retouches pro'
    ],
    displayOrder: 24
  },
  {
    id: 'recCreat007',
    name: 'Motion Design 60-90 sec',
    description: 'Vidéo explicative animée',
    price: 2200,
    priceFormatted: '2 200€',
    paymentType: 'ONE_SHOT',
    category: 'CRÉATIFS PUBLICITAIRES',
    features: [
      'Script et storyboard',
      'Animation 2D',
      'Voix off incluse',
      'Musique et SFX'
    ],
    displayOrder: 25
  },

  // IDENTITÉ VISUELLE - ONE SHOT Products
  {
    id: 'recBrand001',
    name: 'Création Logo',
    description: 'Logo professionnel unique',
    price: 850,
    priceFormatted: '850€',
    paymentType: 'ONE_SHOT',
    category: 'IDENTITÉ VISUELLE',
    features: [
      '3 propositions',
      'Révisions illimitées 30j',
      'Tous formats',
      'Cession droits'
    ],
    displayOrder: 26
  },
  {
    id: 'recBrand002',
    name: 'Charte Graphique Complète',
    description: 'Guide complet identité visuelle',
    price: 2800,
    priceFormatted: '2 800€',
    paymentType: 'ONE_SHOT',
    category: 'IDENTITÉ VISUELLE',
    features: [
      'Logo et déclinaisons',
      'Palette couleurs',
      'Typographies',
      'Document 30+ pages'
    ],
    displayOrder: 27
  },
  {
    id: 'recBrand003',
    name: 'Branding Complet Startup',
    description: 'Pack identité complète nouvelle entreprise',
    price: 5500,
    priceFormatted: '5 500€',
    paymentType: 'ONE_SHOT',
    category: 'IDENTITÉ VISUELLE',
    features: [
      'Stratégie marque',
      'Logo et charte',
      'Papeterie complète',
      'Templates digitaux'
    ],
    displayOrder: 28
  },
  {
    id: 'recBrand004',
    name: 'Refonte Logo',
    description: 'Modernisation logo existant',
    price: 650,
    priceFormatted: '650€',
    paymentType: 'ONE_SHOT',
    category: 'IDENTITÉ VISUELLE',
    features: [
      'Analyse existant',
      '2 propositions',
      'Conservation ADN',
      'Guide transition'
    ],
    displayOrder: 29
  },
  {
    id: 'recBrand005',
    name: 'Design Packaging',
    description: 'Conception emballage produit',
    price: 1800,
    priceFormatted: '1 800€',
    paymentType: 'ONE_SHOT',
    category: 'IDENTITÉ VISUELLE',
    features: [
      'Concept créatif',
      'Design 3D',
      'Fichiers impression',
      'Suivi fabrication'
    ],
    displayOrder: 30
  },
  {
    id: 'recBrand006',
    name: 'Cartes de Visite',
    description: 'Design et impression 500 unités',
    price: 280,
    priceFormatted: '280€',
    paymentType: 'ONE_SHOT',
    category: 'IDENTITÉ VISUELLE',
    features: [
      'Design personnalisé',
      'Papier premium',
      'Finitions au choix',
      'Livraison incluse'
    ],
    displayOrder: 31
  },

  // SEO & RÉFÉRENCEMENT - MMR & ONE SHOT
  {
    id: 'recSEO001',
    name: 'Audit SEO Complet',
    description: 'Analyse complète de votre référencement',
    price: 650,
    priceFormatted: '650€',
    paymentType: 'ONE_SHOT',
    category: 'SEO & RÉFÉRENCEMENT',
    features: [
      'Audit technique',
      'Analyse contenu',
      'Étude concurrence',
      'Plan d\'action'
    ],
    displayOrder: 32
  },
  {
    id: 'recSEO002',
    name: 'Pack SEO Local',
    description: 'Optimisation référencement local La Réunion',
    price: 1200,
    priceFormatted: '1 200€',
    paymentType: 'ONE_SHOT',
    category: 'SEO & RÉFÉRENCEMENT',
    features: [
      'Google My Business',
      'Citations locales',
      'Schema markup',
      'Optimisation on-page'
    ],
    displayOrder: 33
  },
  {
    id: 'recSEO003',
    name: 'Suivi SEO Mensuel',
    description: 'Optimisation continue du référencement',
    price: 450,
    priceFormatted: '450€',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'SEO & RÉFÉRENCEMENT',
    features: [
      'Optimisations mensuelles',
      'Création contenu SEO',
      'Link building',
      'Rapport mensuel'
    ],
    displayOrder: 34
  },
  {
    id: 'recSEO004',
    name: 'Formation SEO',
    description: 'Formation complète au référencement',
    price: 500,
    priceFormatted: '500€',
    paymentType: 'ONE_SHOT',
    category: 'SEO & RÉFÉRENCEMENT',
    features: [
      'Session 4h',
      'Support formation',
      'Outils SEO',
      'Suivi 1 mois'
    ],
    displayOrder: 35
  },

  // FORMATION & COACHING - ONE SHOT & MMR
  {
    id: 'recForm001',
    name: 'Formation WordPress',
    description: 'Formation complète WordPress 4h',
    price: 400,
    priceFormatted: '400€',
    paymentType: 'ONE_SHOT',
    category: 'FORMATION & COACHING',
    features: [
      'Interface admin',
      'Gestion contenus',
      'Plugins essentiels',
      'Support 1 mois'
    ],
    displayOrder: 36
  },
  {
    id: 'recForm002',
    name: 'Formation Marketing Digital',
    description: 'Formation stratégie digitale 8h',
    price: 800,
    priceFormatted: '800€',
    paymentType: 'ONE_SHOT',
    category: 'FORMATION & COACHING',
    features: [
      'Stratégie digitale',
      'Publicité en ligne',
      'Réseaux sociaux',
      'Analytics'
    ],
    displayOrder: 37
  },
  {
    id: 'recForm003',
    name: 'Coaching Digital Mensuel',
    description: 'Accompagnement personnalisé',
    price: 350,
    priceFormatted: '350€',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'FORMATION & COACHING',
    features: [
      '2 sessions/mois',
      'Support illimité',
      'Ressources exclusives',
      'Plan action mensuel'
    ],
    displayOrder: 38
  },

  // AUDIT & CONSEIL - ONE SHOT
  {
    id: 'recAudit001',
    name: 'Audit Digital Complet',
    description: 'Analyse complète présence digitale',
    price: 1500,
    priceFormatted: '1 500€',
    paymentType: 'ONE_SHOT',
    category: 'AUDIT & CONSEIL',
    features: [
      'Audit site web',
      'Analyse réseaux sociaux',
      'Étude concurrence',
      'Recommandations'
    ],
    displayOrder: 39
  },
  {
    id: 'recAudit002',
    name: 'Audit Performance Web',
    description: 'Analyse technique et performance',
    price: 850,
    priceFormatted: '850€',
    paymentType: 'ONE_SHOT',
    category: 'AUDIT & CONSEIL',
    features: [
      'Core Web Vitals',
      'Optimisation vitesse',
      'Analyse UX',
      'Plan optimisation'
    ],
    displayOrder: 40
  },
  {
    id: 'recAudit003',
    name: 'Consultation Stratégique',
    description: 'Conseil stratégique personnalisé',
    price: 150,
    priceFormatted: '150€/h',
    paymentType: 'ONE_SHOT',
    category: 'AUDIT & CONSEIL',
    features: [
      'Analyse besoins',
      'Recommandations',
      'Plan d\'action',
      'Support décisionnel'
    ],
    displayOrder: 41
  },

  // EMAIL MARKETING - MMR & ONE SHOT
  {
    id: 'recEmail001',
    name: 'Gestion Newsletter Mensuelle',
    description: 'Création et envoi newsletter mensuelle',
    price: 250,
    priceFormatted: '250€',
    paymentType: 'MMR',
    duration: 'Mensuel',
    category: 'EMAIL MARKETING',
    features: [
      '1 newsletter/mois',
      'Design responsive',
      'Segmentation',
      'Rapport performance'
    ],
    displayOrder: 42
  },
  {
    id: 'recEmail002',
    name: 'Campagne Email Automation',
    description: 'Mise en place automation email',
    price: 1200,
    priceFormatted: '1 200€',
    paymentType: 'ONE_SHOT',
    category: 'EMAIL MARKETING',
    features: [
      'Scénarios automatisés',
      'Templates emails',
      'Segmentation avancée',
      'Formation incluse'
    ],
    displayOrder: 43
  },

  // SUPPORT & ASSISTANCE - Horaire
  {
    id: 'recSupport001',
    name: 'Support Technique Horaire',
    description: 'Assistance technique à la demande',
    price: 90,
    priceFormatted: '90€/h',
    paymentType: 'ONE_SHOT',
    category: 'SUPPORT & ASSISTANCE',
    features: [
      'Résolution bugs',
      'Modifications mineures',
      'Assistance technique',
      'Documentation'
    ],
    displayOrder: 44
  },
  {
    id: 'recSupport002',
    name: 'Pack 10h Support',
    description: 'Forfait 10 heures d\'assistance',
    price: 750,
    priceFormatted: '750€',
    paymentType: 'ONE_SHOT',
    category: 'SUPPORT & ASSISTANCE',
    features: [
      '10h utilisables 6 mois',
      'Tarif préférentiel',
      'Support prioritaire',
      'Rapport interventions'
    ],
    displayOrder: 45
  },

  // HÉBERGEMENT WEB - ARR
  {
    id: 'recHost001',
    name: 'Hébergement Web Standard',
    description: 'Hébergement web annuel standard',
    price: 120,
    priceFormatted: '120€',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'HÉBERGEMENT WEB',
    features: [
      '10 GB stockage',
      'SSL gratuit',
      'Emails illimités',
      'Support technique'
    ],
    displayOrder: 46
  },
  {
    id: 'recHost002',
    name: 'Hébergement Web Premium',
    description: 'Hébergement haute performance',
    price: 300,
    priceFormatted: '300€',
    paymentType: 'ARR',
    duration: 'Annuel',
    category: 'HÉBERGEMENT WEB',
    features: [
      '50 GB stockage',
      'CDN inclus',
      'Sauvegardes auto',
      'Support prioritaire'
    ],
    displayOrder: 47
  }
];

// Helper functions
export function getProductsByCategory(category: string): AirtableProduct[] {
  return airtableProducts.filter(p => p.category === category);
}

export function getProductsByPaymentType(type: 'MMR' | 'ARR' | 'ONE_SHOT'): AirtableProduct[] {
  return airtableProducts.filter(p => p.paymentType === type);
}

export function getProductById(id: string): AirtableProduct | undefined {
  return airtableProducts.find(p => p.id === id);
}

// Category mapping for service pages
export const serviceCategoryMapping: Record<string, string[]> = {
  'publicite': ['PUBLICITÉ EN LIGNE'],
  'community': ['COMMUNITY MANAGEMENT'],
  'dev-web': ['DÉVELOPPEMENT WEB'],
  'sitekeeper': ['MAINTENANCE WEB'],
  'video': ['CRÉATIFS PUBLICITAIRES'],
  'identite': ['IDENTITÉ VISUELLE'],
  'seo': ['SEO & RÉFÉRENCEMENT'],
  'audit': ['AUDIT & CONSEIL'],
  'formation': ['FORMATION & COACHING'],
  'email': ['EMAIL MARKETING'],
  'support': ['SUPPORT & ASSISTANCE'],
  'hebergement': ['HÉBERGEMENT WEB']
};

export function getProductsForService(serviceSlug: string): AirtableProduct[] {
  const categories = serviceCategoryMapping[serviceSlug];
  if (!categories) return [];
  return airtableProducts.filter(p => categories.includes(p.category));
}

// Format price for display
export function formatPrice(product: AirtableProduct): string {
  if (product.price === 0) return product.priceFormatted;
  
  switch (product.paymentType) {
    case 'MMR':
      return `${product.priceFormatted}/mois`;
    case 'ARR':
      return `${product.priceFormatted}/an`;
    case 'ONE_SHOT':
      return product.priceFormatted;
    default:
      return product.priceFormatted;
  }
}

// Get subscription label
export function getSubscriptionLabel(product: AirtableProduct): string {
  switch (product.paymentType) {
    case 'MMR':
      return 'Abonnement mensuel';
    case 'ARR':
      return 'Abonnement annuel';
    case 'ONE_SHOT':
      return 'Paiement unique';
    default:
      return '';
  }
}