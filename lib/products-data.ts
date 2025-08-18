// Product data from Airtable - Site web digiqo / Tarifs produits
// Last updated from Airtable

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  notes?: string;
  paymentLink?: string;
  category: string;
}

export const products: Product[] = [
  // PUBLICITÉ EN LIGNE
  {
    id: 'pub-1',
    name: 'Initiation - 1 Campagne publicitaire',
    description: 'Un forfait tout-en-un idéal pour une première approche professionnelle de la publicité digitale',
    price: '439,20',
    duration: 'Mensuel',
    notes: 'Comprend :\n• Gestion de 1 campagne sur Google Ads (Search) ou Facebook/Instagram Ads\n• Budget publicitaire : 50€ - 250€\n• Configuration de base + pixels de tracking\n• 1 rapport mensuel détaillé\n• Support client par email',
    paymentLink: 'https://buy.stripe.com/28obMPfwP9NW9mo6oC',
    category: 'PUBLICITÉ EN LIGNE'
  },
  {
    id: 'pub-2',
    name: 'Propulsion - 2 Campagnes publicitaires',
    description: 'Le choix parfait pour développer votre présence digitale avec une approche multi-canaux professionnelle',
    price: '877,20',
    duration: 'Mensuel',
    notes: 'Comprend :\n• Gestion de 2 campagnes (Google Ads + Facebook/Instagram ou TikTok)\n• Budget publicitaire : 250€ - 500€\n• Ciblage avancé + audiences personnalisées\n• Optimisation bi-hebdomadaire\n• 2 rapports mensuels + appel stratégique\n• Support prioritaire',
    paymentLink: 'https://buy.stripe.com/6oE0495WfeMUbuwcN1',
    category: 'PUBLICITÉ EN LIGNE'
  },
  {
    id: 'pub-3',
    name: 'Excellence - 3 Campagnes publicitaires',
    description: 'La solution complète pour une stratégie publicitaire omnicanale et des résultats optimaux',
    price: '1315,20',
    duration: 'Mensuel',
    notes: 'Comprend :\n• Gestion de 3 campagnes sur tous les canaux\n• Budget publicitaire : 500€ - 1000€+\n• Stratégie de remarketing complète\n• Tests A/B continus\n• Optimisation hebdomadaire\n• Rapports hebdomadaires + réunions mensuelles\n• Account manager dédié\n• Support 7j/7',
    paymentLink: 'https://buy.stripe.com/5kA8ADbgzeMU9modQW',
    category: 'PUBLICITÉ EN LIGNE'
  },

  // COMMUNITY MANAGEMENT
  {
    id: 'cm-1',
    name: 'Essentiel',
    description: 'La base solide pour maintenir une présence active et professionnelle sur les réseaux sociaux',
    price: '360',
    duration: 'Mensuel',
    notes: 'Comprend :\n• Animation de 2 réseaux sociaux\n• 3 publications par semaine\n• Création visuelle simple\n• Réponses aux messages (J+2)\n• Rapport mensuel basique',
    paymentLink: 'https://buy.stripe.com/9AQ18b2K3bW44208wD',
    category: 'COMMUNITY MANAGEMENT'
  },
  {
    id: 'cm-2',
    name: 'Croissance',
    description: 'Le forfait idéal pour développer activement votre communauté et renforcer votre engagement',
    price: '636',
    duration: 'Mensuel',
    notes: 'Comprend :\n• Animation de 3 réseaux sociaux\n• 5 publications par semaine\n• Création visuelle avancée\n• Stories et formats engageants\n• Réponses sous 24h\n• Veille concurrentielle\n• Rapport détaillé + recommandations',
    paymentLink: 'https://buy.stripe.com/14keYZ0BVgVa5a8cMU',
    category: 'COMMUNITY MANAGEMENT'
  },
  {
    id: 'cm-3',
    name: 'Influence',
    description: 'La stratégie premium pour devenir une référence incontournable dans votre secteur',
    price: '996',
    duration: 'Mensuel',
    notes: 'Comprend :\n• Animation de 4+ réseaux sociaux\n• Publications quotidiennes\n• Création de contenu premium\n• Vidéos et animations\n• Gestion de communauté active\n• Modération et SAV social\n• Stratégie d\'influence\n• Réponses en temps réel\n• Reporting hebdomadaire\n• Réunion stratégique mensuelle',
    paymentLink: 'https://buy.stripe.com/dR64klaoH4486ec28h',
    category: 'COMMUNITY MANAGEMENT'
  },

  // DÉVELOPPEMENT
  {
    id: 'dev-1',
    name: 'Site Vitrine Starter',
    description: 'Site vitrine professionnel pour présenter votre activité',
    price: '1200',
    duration: 'Unique',
    notes: '• 1 à 5 pages\n• Design responsive\n• SEO de base\n• Formulaire de contact\n• Hébergement 1 an offert\n• Formation de prise en main',
    paymentLink: 'https://buy.stripe.com/bIYg336062XYaosbIM',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-2',
    name: 'Site Vitrine Premium',
    description: 'Site vitrine avancé avec fonctionnalités sur mesure',
    price: '2400',
    duration: 'Unique',
    notes: '• 5 à 10 pages\n• Design personnalisé\n• Animations avancées\n• SEO optimisé\n• Blog intégré\n• Multilingue\n• Analytics\n• Hébergement 1 an offert',
    paymentLink: 'https://buy.stripe.com/fZe8ADbgzeMU2ZYdQV',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-3',
    name: 'E-commerce Starter',
    description: 'Boutique en ligne clé en main pour démarrer vos ventes',
    price: '3600',
    duration: 'Unique',
    notes: '• Jusqu\'à 50 produits\n• Paiement sécurisé\n• Gestion des stocks\n• Espace client\n• Livraisons configurées\n• Formation complète\n• Hébergement 1 an offert',
    paymentLink: 'https://buy.stripe.com/00g7wz6029jiaosgg2',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-4',
    name: 'E-commerce Premium',
    description: 'Solution e-commerce complète pour votre croissance',
    price: '6000',
    duration: 'Unique',
    notes: '• Produits illimités\n• Multi-devises\n• Marketplace\n• Gestion avancée\n• Automatisations\n• ERP intégré\n• Formation équipe\n• Support prioritaire',
    paymentLink: 'https://buy.stripe.com/aEU6stfwP8JO3226og',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-5',
    name: 'Application Web Sur Mesure',
    description: 'Développement d\'application web complexe selon vos besoins',
    price: 'Sur devis',
    duration: 'Projet',
    notes: '• Analyse des besoins\n• Architecture sur mesure\n• Technologies modernes\n• API & intégrations\n• Tests complets\n• Déploiement\n• Maintenance\n• Documentation',
    paymentLink: 'https://calendly.com/digiqo-rdv/30min',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-6',
    name: 'Application Mobile',
    description: 'Application native iOS/Android ou hybride',
    price: 'Sur devis',
    duration: 'Projet',
    notes: '• Design UX/UI mobile\n• Développement natif ou React Native\n• Publication stores\n• Push notifications\n• Géolocalisation\n• Mode offline\n• Analytics\n• Maintenance',
    paymentLink: 'https://calendly.com/digiqo-rdv/30min',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-7',
    name: 'Refonte Site Web',
    description: 'Modernisation complète de votre site existant',
    price: '1800',
    duration: 'Unique',
    notes: '• Audit de l\'existant\n• Nouveau design moderne\n• Migration des contenus\n• Optimisation performances\n• SEO amélioré\n• Formation\n• Redirections 301',
    paymentLink: 'https://buy.stripe.com/9AQ4kl602bW41VU4gi',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-8',
    name: 'Landing Page',
    description: 'Page d\'atterrissage optimisée pour la conversion',
    price: '600',
    duration: 'Unique',
    notes: '• Design haute conversion\n• A/B testing ready\n• Intégrations marketing\n• Analytics avancés\n• Optimisation mobile\n• Temps de chargement < 2s',
    paymentLink: 'https://buy.stripe.com/00gg330BV9jidAE6op',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-9',
    name: 'Progressive Web App (PWA)',
    description: 'Application web installable comme une app native',
    price: '4800',
    duration: 'Unique',
    notes: '• Mode offline\n• Notifications push\n• Installation sur mobile\n• Performances natives\n• Mise à jour automatique\n• Cache intelligent\n• SEO optimisé',
    paymentLink: 'https://buy.stripe.com/dR6cQRguD1VM3226oo',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-10',
    name: 'Intégration API',
    description: 'Connexion de votre site avec des services externes',
    price: '1200',
    duration: 'Par API',
    notes: '• Analyse technique\n• Développement\n• Tests complets\n• Documentation\n• Formation\n• Support 3 mois',
    paymentLink: 'https://buy.stripe.com/bIY9EFfwPc026eccMS',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-11',
    name: 'Développement WordPress',
    description: 'Site WordPress personnalisé et optimisé',
    price: '1800',
    duration: 'Unique',
    notes: '• Thème sur mesure\n• Plugins essentiels\n• Sécurité renforcée\n• Optimisation vitesse\n• SEO Yoast configuré\n• Formation admin\n• Sauvegardes automatiques',
    paymentLink: 'https://buy.stripe.com/14k18b1FZ8JOeyAaEH',
    category: 'DÉVELOPPEMENT'
  },
  {
    id: 'dev-12',
    name: 'Formation WordPress',
    description: 'Formation complète à l\'utilisation de WordPress',
    price: '400',
    duration: 'Session (4h)',
    notes: '• Interface d\'administration\n• Gestion des contenus\n• Médias et SEO\n• Plugins essentiels\n• Sécurité\n• Sauvegardes\n• Support 1 mois',
    paymentLink: 'https://buy.stripe.com/28o9EF8cheMU0RQ9AB',
    category: 'DÉVELOPPEMENT'
  },

  // ENTRETIEN & SÉCURITÉ
  {
    id: 'maint-1',
    name: 'SiteKeeper Essential',
    description: 'Maintenance préventive pour la tranquillité d\'esprit',
    price: '120',
    duration: 'Mensuel',
    notes: '• Sauvegardes hebdomadaires\n• Mises à jour CMS mensuelles\n• Monitoring uptime 24/7\n• Rapport mensuel\n• Support email\n• Temps d\'intervention : 48h',
    paymentLink: 'https://buy.stripe.com/9AQ4kl0BVc046ec7st',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-2',
    name: 'SiteKeeper Pro',
    description: 'Protection avancée et optimisation continue',
    price: '240',
    duration: 'Mensuel',
    notes: '• Sauvegardes quotidiennes\n• Mises à jour hebdomadaires\n• Scan sécurité quotidien\n• Optimisation performances\n• Certificat SSL géré\n• CDN inclus\n• Support prioritaire\n• Temps d\'intervention : 24h',
    paymentLink: 'https://buy.stripe.com/28o7wzewL5622ZY8wx',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-3',
    name: 'SiteKeeper Enterprise',
    description: 'Solution complète pour sites critiques',
    price: '480',
    duration: 'Mensuel',
    notes: '• Sauvegardes temps réel\n• Mises à jour immédiates\n• WAF (pare-feu applicatif)\n• DDoS protection\n• Monitoring avancé\n• Tests de charge\n• Audit sécurité mensuel\n• Support 24/7\n• SLA 99.9%\n• Temps d\'intervention : 2h',
    paymentLink: 'https://buy.stripe.com/fZe2cf8ch9jicwA5kq',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-4',
    name: 'Audit de Sécurité',
    description: 'Analyse complète des vulnérabilités',
    price: '800',
    duration: 'Unique',
    notes: '• Scan des vulnérabilités\n• Test d\'intrusion basique\n• Analyse du code\n• Audit des permissions\n• Rapport détaillé\n• Plan de remédiation\n• Accompagnement correctifs',
    paymentLink: 'https://buy.stripe.com/9AQaIJfwP9jiaoscMP',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-5',
    name: 'Migration Site Web',
    description: 'Transfert sécurisé vers nouvel hébergeur',
    price: '600',
    duration: 'Unique',
    notes: '• Sauvegarde complète\n• Migration base de données\n• Transfert fichiers\n• Configuration DNS\n• Tests complets\n• Redirections 301\n• Zéro downtime\n• Support post-migration',
    paymentLink: 'https://buy.stripe.com/3cs9EF1FZ0RI5a8289',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-6',
    name: 'Optimisation Performances',
    description: 'Accélération et optimisation complète',
    price: '1200',
    duration: 'Unique',
    notes: '• Audit performances\n• Optimisation images\n• Minification code\n• Cache avancé\n• CDN configuration\n• Lazy loading\n• Critical CSS\n• Rapport avant/après',
    paymentLink: 'https://buy.stripe.com/4gw9EF0BV0RI9mo4gh',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-7',
    name: 'Récupération Après Hack',
    description: 'Nettoyage et sécurisation d\'urgence',
    price: '1600',
    duration: 'Intervention',
    notes: '• Analyse des dégâts\n• Suppression malware\n• Restauration données\n• Fermeture des failles\n• Renforcement sécurité\n• Monitoring renforcé 3 mois\n• Rapport d\'incident\n• Assistance juridique basique',
    paymentLink: 'https://buy.stripe.com/8wM2cf3O7bW4cAa00e',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-8',
    name: 'Monitoring Avancé',
    description: 'Surveillance proactive de votre infrastructure',
    price: '180',
    duration: 'Mensuel',
    notes: '• Uptime monitoring\n• Performance metrics\n• Alertes personnalisées\n• Logs centralisés\n• Dashboard temps réel\n• Rapports hebdomadaires\n• Analyse des tendances',
    paymentLink: 'https://buy.stripe.com/9AQ6st3O75666egeUS',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-9',
    name: 'Backup & Restore Service',
    description: 'Solution de sauvegarde professionnelle',
    price: '96',
    duration: 'Mensuel',
    notes: '• Sauvegardes automatiques\n• Stockage sécurisé externe\n• Rétention 30 jours\n• Restauration en 1 clic\n• Test de restauration mensuel\n• Chiffrement AES-256',
    paymentLink: 'https://buy.stripe.com/cN2cQR0BV1VMbsw3ce',
    category: 'ENTRETIEN & SÉCURITÉ'
  },
  {
    id: 'maint-10',
    name: 'Support Technique Horaire',
    description: 'Assistance technique à la demande',
    price: '84',
    duration: 'Par heure',
    notes: '• Résolution de bugs\n• Modifications mineures\n• Assistance technique\n• Conseils et guidance\n• Remote assistance\n• Documentation des interventions',
    paymentLink: 'https://buy.stripe.com/aEUdUV3O73ZY9mo3cc',
    category: 'ENTRETIEN & SÉCURITÉ'
  },

  // CRÉATIFS PUBLICITAIRES
  {
    id: 'creat-1',
    name: 'Pack Visuels Réseaux Sociaux',
    description: 'Création de visuels optimisés pour vos réseaux',
    price: '300',
    duration: '10 visuels',
    notes: '• 10 visuels adaptés (posts, stories)\n• Déclinaisons multi-formats\n• Retouches incluses\n• Fichiers sources\n• Guide d\'utilisation',
    paymentLink: 'https://buy.stripe.com/4gweYZ1FZgVa9mo7su',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-2',
    name: 'Bannières Publicitaires Display',
    description: 'Set complet de bannières pour campagnes display',
    price: '480',
    duration: 'Pack',
    notes: '• 6 formats standard Google Ads\n• Animation HTML5\n• A/B testing variants\n• Responsive design\n• Optimisation poids\n• 2 révisions incluses',
    paymentLink: 'https://buy.stripe.com/8wMeYZ9gl1VMaosggj',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-3',
    name: 'Vidéo Publicitaire Courte',
    description: 'Vidéo promotionnelle format court (15-30 sec)',
    price: '1200',
    duration: 'Projet',
    notes: '• Script et storyboard\n• Tournage ou animation\n• Montage professionnel\n• Musique libre de droits\n• Sous-titres\n• Formats optimisés plateformes\n• 3 révisions',
    paymentLink: 'https://buy.stripe.com/fZe4kl9gl0RI5a87sw',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-4',
    name: 'Spot Publicitaire Premium',
    description: 'Production publicitaire haut de gamme',
    price: '3600',
    duration: 'Projet',
    notes: '• Concept créatif original\n• Production professionnelle\n• Post-production avancée\n• Motion design\n• Sound design\n• Voix off pro\n• Multi-versions\n• Droits d\'utilisation complets',
    paymentLink: 'https://buy.stripe.com/28o8ADbgz3ZYeyA00h',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-5',
    name: 'Infographie Animée',
    description: 'Vidéo explicative en motion design',
    price: '1800',
    duration: '60-90 sec',
    notes: '• Script et scénarisation\n• Design graphique\n• Animation 2D\n• Voix off\n• Musique\n• Exports multi-formats\n• Révisions illimitées 30j',
    paymentLink: 'https://buy.stripe.com/5kA2cf602566cAa00i',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-6',
    name: 'Shooting Photo Produits',
    description: 'Séance photo professionnelle pour vos produits',
    price: '800',
    duration: 'Demi-journée',
    notes: '• 20 produits max\n• Fond blanc + lifestyle\n• Retouches professionnelles\n• 50 photos HD livrées\n• Droits d\'utilisation\n• Formats e-commerce',
    paymentLink: 'https://buy.stripe.com/aEU9EF0BV9jiaos5kp',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-7',
    name: 'Création Publicité Radio',
    description: 'Spot radio professionnel',
    price: '600',
    duration: '20-30 sec',
    notes: '• Écriture du script\n• Voix off professionnelle\n• Sound design\n• Mixage et mastering\n• Versions multiples\n• Format broadcast ready',
    paymentLink: 'https://buy.stripe.com/8wM8ADbgz566546aEK',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-8',
    name: 'Kit Email Marketing',
    description: 'Templates email responsive et attractifs',
    price: '400',
    duration: '5 templates',
    notes: '• 5 templates responsifs\n• Compatible tous clients mail\n• Personnalisables\n• Tests A/B ready\n• Guide bonnes pratiques\n• Intégration plateforme',
    paymentLink: 'https://buy.stripe.com/dR6184aoH9jicwA00g',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-9',
    name: 'Création GIF Animé',
    description: 'GIF publicitaire captivant',
    price: '200',
    duration: 'Unité',
    notes: '• Concept créatif\n• Animation fluide\n• Optimisation poids\n• Boucle parfaite\n• Déclinaisons formats\n• 2 révisions',
    paymentLink: 'https://buy.stripe.com/3cs6st8ch8JObsw6ov',
    category: 'CRÉATIFS PUBLICITAIRES'
  },
  {
    id: 'creat-10',
    name: 'Montage Vidéo',
    description: 'Montage professionnel de vos rushes',
    price: '96',
    duration: 'Par heure',
    notes: '• Montage cut\n• Transitions\n• Titrage\n• Colorimétrie\n• Audio mixing\n• Export HD/4K',
    paymentLink: 'https://buy.stripe.com/9AQ0491FZ2XU1VU5kn',
    category: 'CRÉATIFS PUBLICITAIRES'
  },

  // IDENTITÉ DE MARQUE
  {
    id: 'brand-1',
    name: 'Création Logo Professionnel',
    description: 'Logo unique et mémorable pour votre marque',
    price: '800',
    duration: 'Projet',
    notes: '• 3 concepts initiaux\n• Révisions illimitées 30j\n• Fichiers tous formats\n• Guide d\'utilisation\n• Déclinaisons (noir/blanc, favicon)\n• Cession des droits',
    paymentLink: 'https://buy.stripe.com/8wM4kl4S9c04dssdQU',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-2',
    name: 'Refonte Logo',
    description: 'Modernisation de votre logo existant',
    price: '600',
    duration: 'Projet',
    notes: '• Analyse de l\'existant\n• 2 propositions d\'évolution\n• Conservation ADN marque\n• Transition en douceur\n• Tous formats livrés\n• Guide de transition',
    paymentLink: 'https://buy.stripe.com/bIY9EF8chc04aosaEJ',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-3',
    name: 'Charte Graphique Complète',
    description: 'Guide complet de votre identité visuelle',
    price: '2400',
    duration: 'Projet',
    notes: '• Logo et déclinaisons\n• Palette de couleurs\n• Typographies\n• Règles d\'utilisation\n• Templates de base\n• Iconographie\n• Motifs et textures\n• Document PDF 30+ pages',
    paymentLink: 'https://buy.stripe.com/3cs4kl2K3eMU9mo5kA',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-4',
    name: 'Branding Complet Startup',
    description: 'Pack identité complète pour nouvelle entreprise',
    price: '4800',
    duration: 'Projet',
    notes: '• Stratégie de marque\n• Naming (si besoin)\n• Logo et système visuel\n• Charte graphique\n• Cartes de visite\n• Papeterie complète\n• Templates réseaux sociaux\n• Site web one-page\n• Pitch deck',
    paymentLink: 'https://buy.stripe.com/4gw4klewL2XU4669AD',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-5',
    name: 'Design Packaging Produit',
    description: 'Conception d\'emballage attractif et fonctionnel',
    price: '1600',
    duration: 'Projet',
    notes: '• Recherche et concept\n• Design 3D\n• Adaptation contraintes techniques\n• Fichiers impression\n• Mockups réalistes\n• Suivi fabrication\n• 3 révisions',
    paymentLink: 'https://buy.stripe.com/14k184dsK0RI2ZY00d',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-6',
    name: 'Cartes de Visite Premium',
    description: 'Design et impression cartes de visite haut de gamme',
    price: '240',
    duration: '500 unités',
    notes: '• Design personnalisé\n• Papier premium 350g\n• Finitions au choix (vernis, dorure)\n• Recto-verso\n• BAT avant impression\n• Livraison incluse',
    paymentLink: 'https://buy.stripe.com/aEU2cf7898JOdAE8wI',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-7',
    name: 'Flyer / Brochure',
    description: 'Création de supports print impactants',
    price: '400',
    duration: 'Design',
    notes: '• Concept créatif\n• Mise en page pro\n• Rédaction incluse\n• Photos libres de droits\n• Fichiers print ready\n• 3 révisions\n• Devis impression',
    paymentLink: 'https://buy.stripe.com/28o2cf1FZ0RIbswdR3',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-8',
    name: 'Présentation PowerPoint Premium',
    description: 'Template de présentation professionnel',
    price: '600',
    duration: 'Template',
    notes: '• Design sur mesure\n• 20+ slides types\n• Animations fluides\n• Infographies\n• Charts et graphs\n• Guide d\'utilisation\n• Versions PPT + Keynote',
    paymentLink: 'https://buy.stripe.com/4gw6st606eMU0RQ9AP',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-9',
    name: 'Signalétique Entreprise',
    description: 'Conception signalétique intérieure/extérieure',
    price: '1200',
    duration: 'Projet',
    notes: '• Audit des besoins\n• Design cohérent\n• Plans techniques\n• Fichiers fabrication\n• Suivi production\n• Aide à l\'installation',
    paymentLink: 'https://buy.stripe.com/14k7wz738gVa5a814i',
    category: 'IDENTITÉ DE MARQUE'
  },
  {
    id: 'brand-10',
    name: 'Consultation Branding',
    description: 'Conseil stratégique en identité de marque',
    price: '150',
    duration: 'Par heure',
    notes: '• Audit de marque\n• Positionnement\n• Stratégie visuelle\n• Recommandations\n• Plan d\'action\n• Support décisionnel',
    paymentLink: 'https://buy.stripe.com/cN2184ckDbW42ZY3cz',
    category: 'IDENTITÉ DE MARQUE'
  }
];

// Helper functions to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Category mappings for service pages
export const categoryMappings: Record<string, string> = {
  'publicite': 'PUBLICITÉ EN LIGNE',
  'community': 'COMMUNITY MANAGEMENT',
  'dev-web': 'DÉVELOPPEMENT',
  'sitekeeper': 'ENTRETIEN & SÉCURITÉ',
  'video': 'CRÉATIFS PUBLICITAIRES',
  'identite': 'IDENTITÉ DE MARQUE'
};

// Get products for a specific service page
export function getProductsForService(serviceSlug: string): Product[] {
  const category = categoryMappings[serviceSlug];
  if (!category) return [];
  return getProductsByCategory(category);
}