export interface JobDescription {
  id: string
  title: string
  shortDescription: string
  missions: string[]
  profile: string[]
  remuneration: string
  location: string
  status: string
  highlights?: string[]
}

export const jobDescriptions: JobDescription[] = [
  {
    id: 'developpeur-web',
    title: 'Développeur Web Full-Stack',
    shortDescription: 'Rejoignez notre équipe pour créer des sites web innovants et des applications sur mesure pour nos clients.',
    missions: [
      'Développer des sites web responsives avec React/Next.js',
      'Créer des APIs robustes avec Node.js',
      'Intégrer des solutions e-commerce (WooCommerce, Shopify)',
      'Optimiser les performances et le SEO technique',
      'Collaborer avec les équipes design et marketing'
    ],
    profile: [
      '2-5 ans d\'expérience en développement web',
      'Maîtrise de React, Next.js, TypeScript',
      'Connaissance de Node.js et des bases de données',
      'Sens du design et de l\'UX',
      'Autonomie et rigueur dans le code'
    ],
    remuneration: 'Rémunération sur devis',
    location: 'Remote ou La Réunion',
    status: 'Freelance',
    highlights: ['Projets variés', 'Technologies modernes', 'Formation continue']
  },
  {
    id: 'designer-ui-ux',
    title: 'Designer UI/UX',
    shortDescription: 'Créez des expériences utilisateur exceptionnelles et des interfaces modernes pour nos clients.',
    missions: [
      'Concevoir des maquettes et prototypes sur Figma',
      'Créer des visuels publicitaires Meta Ads impactants',
      'Développer des identités visuelles complètes',
      'Optimiser l\'UX des sites et applications',
      'Décliner des créations sur différents formats'
    ],
    profile: [
      '2-4 ans d\'expérience en design digital',
      'Maîtrise de Figma, Photoshop, Illustrator',
      'Culture publicitaire et marketing',
      'Créativité et sens du détail',
      'Connaissance des contraintes mobile'
    ],
    remuneration: '1500€/mois pour 30h/semaine',
    location: '100% Remote',
    status: 'Freelance',
    highlights: ['Projets créatifs', 'Clients variés', 'Flexibilité']
  },
  {
    id: 'community-manager',
    title: 'Community Manager',
    shortDescription: 'Animez et développez les communautés de nos clients sur les réseaux sociaux.',
    missions: [
      'Créer et publier du contenu engageant (posts, stories, Reels)',
      'Animer les communautés et répondre aux interactions',
      'Modérer et assurer un environnement positif',
      'Suivre les performances et proposer des optimisations',
      'Participer aux shootings photo/vidéo'
    ],
    profile: [
      '1-3 ans d\'expérience en community management',
      'Maîtrise des réseaux sociaux (Instagram, Facebook, TikTok)',
      'Excellente expression écrite et créativité',
      'Organisation et réactivité',
      'Bases en photo/vidéo (bonus)'
    ],
    remuneration: '331-1339€/mois selon les formules clients',
    location: 'La Réunion',
    status: 'Freelance',
    highlights: ['50% du CA client', 'Projets variés', 'Pas de plafond']
  },
  {
    id: 'expert-seo',
    title: 'Expert SEO',
    shortDescription: 'Optimisez le référencement naturel de nos clients et boostez leur visibilité sur Google.',
    missions: [
      'Réaliser des audits SEO complets',
      'Élaborer des stratégies de référencement',
      'Optimiser le contenu et la structure des sites',
      'Suivre et analyser les performances SEO',
      'Former les équipes aux bonnes pratiques'
    ],
    profile: [
      '3+ ans d\'expérience en SEO',
      'Maîtrise des outils SEO (Semrush, Ahrefs, GSC)',
      'Compétences en rédaction web optimisée',
      'Veille constante sur les algorithmes Google',
      'Esprit analytique et orienté résultats'
    ],
    remuneration: 'Rémunération sur devis',
    location: 'Remote',
    status: 'Freelance',
    highlights: ['Missions stratégiques', 'Impact direct', 'Formation continue']
  },
  {
    id: 'monteur-video',
    title: 'Monteur Vidéo / Motion Designer',
    shortDescription: 'Créez des contenus vidéo captivants et des animations pour les campagnes digitales.',
    missions: [
      'Monter des vidéos publicitaires courtes et impactantes',
      'Créer des animations et motion design',
      'Adapter les contenus aux formats sociaux (Reels, Stories)',
      'Intégrer des effets visuels et sonores',
      'Respecter les chartes graphiques clients'
    ],
    profile: [
      '2+ ans d\'expérience en montage vidéo',
      'Maîtrise d\'Adobe Premiere Pro et After Effects',
      'Créativité et sens du rythme',
      'Compréhension des codes publicitaires',
      'Réactivité et respect des délais'
    ],
    remuneration: 'Rémunération sur devis',
    location: 'Remote ou La Réunion',
    status: 'Freelance',
    highlights: ['Projets créatifs', 'Contenus variés', 'Liberté créative']
  },
  {
    id: 'specialiste-ads',
    title: 'Spécialiste Google Ads & Meta Ads',
    shortDescription: 'Gérez et optimisez les campagnes publicitaires de nos clients pour maximiser leur ROI.',
    missions: [
      'Créer et gérer des campagnes Google Ads et Meta Ads',
      'Optimiser les performances et le ROI',
      'Analyser les données et créer des reportings',
      'Proposer des stratégies d\'acquisition',
      'Effectuer des tests A/B et optimisations'
    ],
    profile: [
      '2+ ans d\'expérience en publicité digitale',
      'Certifications Google Ads et/ou Meta Blueprint',
      'Maîtrise des outils analytics',
      'Esprit analytique et data-driven',
      'Orienté performance et résultats'
    ],
    remuneration: 'Rémunération sur devis',
    location: 'Remote',
    status: 'Freelance',
    highlights: ['Budgets importants', 'Formation continue', 'Impact direct']
  },
  {
    id: 'photographe',
    title: 'Photographe / Créateur de Contenu',
    shortDescription: 'Capturez l\'essence des marques à travers des visuels professionnels.',
    missions: [
      'Réaliser des shootings photo produits et lifestyle',
      'Créer du contenu visuel pour les réseaux sociaux',
      'Retoucher et optimiser les images',
      'Gérer les sessions de prise de vue',
      'Collaborer avec les équipes créatives'
    ],
    profile: [
      'Portfolio démontrant votre expertise',
      'Maîtrise de la photographie commerciale',
      'Compétences en retouche (Lightroom, Photoshop)',
      'Créativité et sens de la mise en scène',
      'Équipement professionnel'
    ],
    remuneration: 'Rémunération sur devis',
    location: 'La Réunion',
    status: 'Freelance',
    highlights: ['Clients variés', 'Projets créatifs', 'Flexibilité']
  },
  {
    id: 'influenceur-manager',
    title: 'Influenceur Marketing Manager',
    shortDescription: 'Développez et gérez les stratégies d\'influence marketing de nos clients.',
    missions: [
      'Identifier et contacter les influenceurs pertinents',
      'Négocier les partenariats et collaborations',
      'Gérer les campagnes d\'influence',
      'Suivre les performances et ROI',
      'Créer des briefs créatifs pour les influenceurs'
    ],
    profile: [
      'Expérience en marketing d\'influence',
      'Réseau d\'influenceurs locaux (bonus)',
      'Excellentes capacités de négociation',
      'Connaissance des KPIs d\'influence',
      'Créativité et sens relationnel'
    ],
    remuneration: 'Rémunération sur devis',
    location: 'La Réunion',
    status: 'Freelance',
    highlights: ['Secteur en croissance', 'Relations variées', 'Impact direct']
  },
  {
    id: 'commercial-outbound',
    title: 'Commercial Outbound',
    shortDescription: 'Développez notre portefeuille client par la prospection active sur le terrain.',
    missions: [
      'Prospecter activement sur le terrain à La Réunion',
      'Présenter nos services de marketing digital',
      'Qualifier les prospects et poser des rendez-vous',
      'Remonter les besoins du marché',
      'Collaborer avec l\'équipe pour maximiser la satisfaction'
    ],
    profile: [
      'Profil chasseur ambitieux et motivé',
      'Aisance en prospection B2B',
      'Excellente communication orale',
      'Connaissance du marché réunionnais (bonus)',
      'Permis B et véhicule indispensable'
    ],
    remuneration: '500€ fixe + 50€/RDV réalisé',
    location: 'La Réunion (Nord, Sud, Est ou Ouest)',
    status: 'Indépendant',
    highlights: ['Marque reconnue', 'Formation', 'Frais kilométriques remboursés']
  },
  {
    id: 'business-developer',
    title: 'Business Developer',
    shortDescription: 'Gérez les leads entrants et développez notre portefeuille client.',
    missions: [
      'Traiter les leads entrants du CRM',
      'Qualifier et présenter nos solutions',
      'Assurer les RDV en visio ou physique',
      'Closer les ventes et suivre les encaissements',
      'Collaborer avec les équipes pour la satisfaction client'
    ],
    profile: [
      'Orienté closing et persuasif',
      'Aisance en rendez-vous B2B',
      'Méthodique dans le suivi du pipeline',
      'Expérience en vente digitale appréciée',
      'Fin négociateur avec sens du service'
    ],
    remuneration: '800€ fixe + 5% du CA encaissé',
    location: 'La Réunion',
    status: 'Indépendant',
    highlights: ['Leads qualifiés fournis', 'CRM optimisé', 'Formation continue']
  }
]

export function getJobById(id: string): JobDescription | undefined {
  return jobDescriptions.find(job => job.id === id)
}

export function getJobTitles(): string[] {
  return jobDescriptions.map(job => job.title)
}