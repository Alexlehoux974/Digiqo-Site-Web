// Formation data structure for Digicademy
export interface VideoContent {
  placeholder: string // Placeholder text for video
  youtubeId?: string // YouTube video ID
  googleDriveId?: string // Google Drive video ID
  duration?: string // Video duration
}

export interface ModuleContent {
  id: string
  title: string
  description?: string
  content: string[] // Array of paragraphs
  video?: VideoContent
  keyPoints?: string[] // Key takeaways or important points
}

export interface Formation {
  id: string
  slug: string
  title: string
  category: 'publicite' | 'sites-web' | 'community' | 'identite'
  description: string
  duration: string
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  instructor?: string
  price?: string
  keywords?: string[] // Mots-clés pour améliorer la recherche
  introduction: {
    title: string
    content: string[]
    objectives?: string[]
  }
  modules: ModuleContent[]
  conclusion?: {
    title: string
    content: string[]
  }
  certification?: boolean
  nextSteps?: string[]
}

// Formation: La Publicité Meta (SMA) - Version complète du MD
export const formationMetaComplete: Formation = {
  id: 'formation-meta-sma-complete',
  slug: 'la-publicite-meta-sma',
  title: 'La Publicité Meta (SMA) - Formation Complète',
  category: 'publicite',
  description: 'Formation complète sur la publicité Meta (Facebook & Instagram). De la compréhension de l\'écosystème à l\'optimisation avancée, maîtrisez tous les aspects de Meta Ads.',
  duration: '12 heures',
  level: 'Débutant',
  instructor: 'Équipe Digiqo',
  keywords: [
    'meta',
    'facebook',
    'instagram',
    'publicité',
    'ads',
    'SMA',
    'social media advertising',
    'pixel',
    'ciblage',
    'budget',
    'optimisation',
    'ROAS',
    'remarketing'
  ],
  introduction: {
    title: 'La Publicité Meta (SMA) c\'est quoi ?',
    content: [
      'Meta Ads est la plateforme publicitaire qui permet de diffuser des annonces sur Facebook et Instagram. Avec plus de 3 milliards d\'utilisateurs dans le monde, c\'est le plus grand réseau publicitaire au monde après Google.',
      'En France, nous comptons 39 millions d\'utilisateurs Facebook actifs et 28 millions d\'utilisateurs Instagram actifs. 75% de la population française est présente sur au moins une des deux plateformes.',
      'Les Français passent en moyenne 2h12 par jour sur les réseaux Meta, et 3,7 milliards d\'euros ont été investis en publicité sociale en France.',
      'Cette formation complète vous permettra de maîtriser tous les aspects de la publicité Meta, de la stratégie à l\'optimisation avancée.'
    ],
    objectives: [
      'Comprendre l\'écosystème publicitaire Meta et ses opportunités',
      'Maîtriser le ciblage précis et la création d\'audiences',
      'Créer des publicités efficaces et engageantes',
      'Optimiser vos budgets et enchères',
      'Mesurer et analyser vos performances',
      'Éviter les erreurs courantes et appliquer les bonnes pratiques'
    ]
  },
  modules: [
    {
      id: 'module-1',
      title: 'Introduction à Meta Ads',
      description: 'Découvrez les fondamentaux de Meta Ads et pourquoi cette plateforme est incontournable',
      content: [
        'Meta Ads combine trois éléments essentiels qui expliquent son efficacité :',
        '1. Des données utilisateur riches : Meta connaît les goûts, habitudes et comportements de ses utilisateurs',
        '2. Un algorithme d\'apprentissage : Le système apprend automatiquement qui est le plus susceptible d\'agir',
        '3. Un environnement natif : Les publicités s\'intègrent naturellement dans le fil d\'actualité',
        'Facebook cible principalement les 25-55 ans pour l\'information, actualités et groupes. C\'est meilleur pour le B2B, services locaux et audiences matures.',
        'Instagram cible les 18-44 ans pour l\'inspiration, découverte et divertissement. C\'est idéal pour l\'e-commerce, mode, lifestyle et audiences jeunes.'
      ],
      keyPoints: [
        '3 milliards d\'utilisateurs dans le monde',
        '39M utilisateurs Facebook France, 28M Instagram France',
        'Ciblage basé sur données comportementales précises',
        'Budget flexible à partir de 5€/jour',
        'Mesure précise en temps réel'
      ]
    },
    {
      id: 'module-2',
      title: 'Comprendre l\'Audience Meta',
      description: 'Portrait détaillé des utilisateurs Facebook et Instagram',
      content: [
        'Portrait de l\'utilisateur Facebook :',
        '- Âge : Toutes tranches, concentration 25-54 ans',
        '- Usage : 1h30 par jour en moyenne, pics matin et soirée',
        '- Comportements : Découverte passive, interactions sociales, information, shopping',
        '',
        'Portrait de l\'utilisateur Instagram :',
        '- Âge : Majorité 18-44 ans, très actif chez les 18-34 ans',
        '- Genre : 54% féminin, 46% masculin',
        '- Comportements : Inspiration, divertissement, discovery, achat impulsif',
        '',
        'Moments de connexion optimaux :',
        'Facebook : 7h-9h (matin), 12h-14h (déjeuner), 19h-22h (soirée)',
        'Instagram : 8h-10h, 15h-17h, 20h-23h (pics mercredi-jeudi)'
      ],
      keyPoints: [
        'Facebook : audiences matures, messages détaillés',
        'Instagram : audiences jeunes, contenu visuel impactant',
        'Adapter le message selon la plateforme',
        'Timing crucial pour maximiser l\'engagement'
      ]
    },
    {
      id: 'module-3',
      title: 'Les Formats Publicitaires',
      description: 'Maîtrisez tous les formats disponibles et leurs usages',
      content: [
        'Image Simple : Format le plus facile et polyvalent',
        '- Ratio : 1:1 (carré) pour Instagram, 1.91:1 pour Facebook',
        '- Texte sur image : Maximum 20% de la surface',
        '- Qualité : Minimum 1080x1080 pixels',
        '- Idéal pour : Tests, message simple, promotion unique',
        '',
        'Carrousel : 2 à 10 images ou vidéos défilantes',
        '- Engagement 30% supérieur aux images simples',
        '- Idéal pour : Plusieurs produits, storytelling, avant/après',
        '- Cohérence visuelle entre les cartes essentielle',
        '',
        'Vidéo : Format privilégié par l\'algorithme',
        '- Durée optimale : 15-60 secondes',
        '- 85% des vidéos regardées sans son : sous-titres obligatoires',
        '- Première seconde cruciale pour capter l\'attention',
        '',
        'Stories et Reels : Format vertical immersif',
        '- Stories : 15 secondes max, format 9:16',
        '- Reels : 15-60 secondes, contenu divertissant',
        '- Portée organique potentielle bonus'
      ],
      keyPoints: [
        'Choisir le format selon l\'objectif',
        'Image simple pour les tests rapides',
        'Carrousel pour présenter plusieurs options',
        'Vidéo pour engagement maximal',
        'Stories/Reels pour audiences jeunes'
      ]
    },
    {
      id: 'module-4',
      title: 'Le Ciblage : Toucher la Bonne Personne',
      description: 'L\'art du ciblage précis sur Meta Ads',
      content: [
        '3 Types de Ciblage :',
        '',
        '1. Ciblage Démographique (Base) :',
        '- Localisation : Pays, ville, rayon précis (1-80km)',
        '- Âge : 13 à 65+ ans (minimum 18 pour certains secteurs)',
        '- Genre : Homme, Femme, Tous',
        '- Langues : Pour populations multilingues',
        '',
        '2. Ciblage par Centres d\'Intérêt (Avancé) :',
        '- Pages likées, interactions, sites visités',
        '- Catégories : Mode, Food, Sport, Loisirs',
        '- Stratégies : Broad (large), Detailed (précis), Stacking (restrictif), Expansion (large)',
        '',
        '3. Ciblage Comportemental (Expert) :',
        '- Comportements d\'achat (acheteurs en ligne fréquents)',
        '- Comportements technologiques (iOS vs Android)',
        '- Comportements de voyage',
        '',
        'Audiences Personnalisées (Custom) :',
        '- Site web (Pixel) : Visiteurs, abandons panier',
        '- Liste clients (CRM) : Emails/téléphones',
        '- Engagement : Vidéos, page Facebook, Instagram',
        '',
        'Audiences Similaires (Lookalike) :',
        '- 1% : Le plus similaire, très qualifié',
        '- 2-5% : Équilibre qualité/volume',
        '- Source minimum : 100 personnes (idéal 1000+)'
      ],
      keyPoints: [
        'Audience entre 100K et 2M personnes',
        'Combiner démographie + intérêts + comportements',
        'Utiliser Lookalike pour acquisition',
        'Exclure clients existants en prospection',
        'Tester 3-4 audiences différentes'
      ]
    },
    {
      id: 'module-5',
      title: 'Créer des Publicités Efficaces',
      description: 'Techniques de création publicitaire qui convertissent',
      content: [
        'Formule d\'une publicité performante :',
        '1. CAPTIVER (Visual + Première ligne)',
        '2. CONVAINCRE (Bénéfice + Preuve)',
        '3. CONVERTIR (Call-to-action clair)',
        '4. CONFIANCE (Éléments de réassurance)',
        '',
        'Règle des 3 Secondes :',
        'L\'utilisateur décide en 3 secondes s\'il s\'arrête ou continue son scroll.',
        '',
        'Structure AIDA Adaptée :',
        'A - Attention : Question directe, statistique choc, bénéfice immédiat',
        'I - Intérêt : Problème → Solution → Bénéfice',
        'D - Désir : Témoignages, chiffres précis, garanties',
        'A - Action : CTA spécifique, urgent, avec bénéfice',
        '',
        'Visuels qui fonctionnent :',
        '- Photos de produits : fond neutre, haute résolution, mise en situation',
        '- Photos de personnes : regard caméra, émotions positives, authenticité',
        '- Avant/Après : split screen, transformation visible',
        '',
        'À éviter :',
        '- Images pixellisées',
        '- Trop de texte (>20%)',
        '- Stock photos évidentes',
        '- Visuels trop chargés'
      ],
      keyPoints: [
        'Capter l\'attention en 3 secondes',
        'Structure AIDA pour persuasion',
        'Visuels de haute qualité essentiels',
        'CTA clair et spécifique',
        'Tester 2-3 variantes minimum'
      ]
    },
    {
      id: 'module-6',
      title: 'Budgets et Enchères',
      description: 'Comprendre et optimiser vos budgets publicitaires',
      content: [
        'Comment fonctionne l\'enchère Meta :',
        'Score Total = Enchère × Taux d\'Action Estimé × Pertinence',
        'Une pub pertinente peut battre une enchère plus élevée !',
        '',
        'Types d\'enchères :',
        '- Automatique : Meta optimise automatiquement (recommandé débutants)',
        '- Manuelle : Vous fixez le prix maximum (budgets serrés)',
        '- Coût Cible (Bid Cap) : Équilibre contrôle/performance',
        '',
        'Budgets recommandés :',
        '- Tests d\'audience : 20€/jour minimum par ensemble',
        '- Campagnes conversion : 10x votre CPA cible',
        '- Notoriété : 10-50€/jour',
        '',
        'Phase d\'Apprentissage :',
        '- Durée : 7-14 jours ou jusqu\'à 50 conversions',
        '- Coûts souvent plus élevés pendant cette phase',
        '- NE PAS modifier les paramètres',
        '',
        'Techniques d\'optimisation :',
        '- Start Low, Scale Fast : 20€/jour → +20-50% tous les 3-5 jours',
        '- Règle du 20% : Ne jamais augmenter de plus de 20% d\'un coup',
        '- Test de saturation : Identifier le point où le CPA augmente'
      ],
      keyPoints: [
        'Budget minimum 20€/jour pour tests',
        'Respecter la phase d\'apprentissage',
        'Augmenter progressivement (+20% max)',
        'Surveiller le CPA et le ROAS',
        'CBO pour répartition automatique'
      ]
    },
    {
      id: 'module-7',
      title: 'Mesurer et Optimiser',
      description: 'Analytics et optimisation de campagnes',
      content: [
        'Métriques Essentielles :',
        '',
        'Portée et Visibilité :',
        '- Impressions : Nombre d\'affichages',
        '- Portée : Personnes uniques touchées',
        '- Fréquence : Moyenne de vues par personne (optimal : 3-4)',
        '',
        'Engagement :',
        '- CTR : 1,5-2,5% e-commerce, 2-4% services',
        '- CPC : 0,80-2€ Meta Ads France',
        '- CPM : 5-15€ pour mille impressions',
        '',
        'Conversion :',
        '- Taux conversion : 2-5% e-commerce, 5-15% lead gen',
        '- CPA : Coût par acquisition',
        '- ROAS : 2x minimum, 3-4x bon, 5x+ excellent',
        '',
        'Configuration du Pixel Meta :',
        '- Installation code base avant </head>',
        '- Événements standards : PageView, AddToCart, Purchase, Lead',
        '- Test avec Facebook Pixel Helper',
        '- API Conversions pour iOS 14.5+',
        '',
        'Stratégies d\'optimisation :',
        'Phase Lancement (J1-7) : Ne rien changer, surveiller',
        'Phase Optimisation (J8-30) : Améliorer CTR, CPC, conversions',
        'Phase Scaling (J30+) : Augmenter volumes, nouveaux segments'
      ],
      keyPoints: [
        'Pixel correctement installé et testé',
        'ROAS comme métrique principale',
        'Règle des 50 conversions avant optimisation',
        'Fréquence < 4 pour éviter fatigue',
        'Tests continus : 20% budget pour innovation'
      ]
    },
    {
      id: 'module-8',
      title: 'Erreurs Courantes à Éviter',
      description: 'Les pièges à éviter pour réussir vos campagnes',
      content: [
        'Erreurs de Stratégie :',
        '1. Objectif inadapté : Choisir "Trafic" quand on veut vendre',
        '2. Budget insuffisant : Minimum 20€/jour pour tests',
        '3. Trop de variables : Tester 1 élément à la fois',
        '',
        'Erreurs de Ciblage :',
        '4. Audience trop petite : < 100K personnes',
        '5. Audience trop large : Pas assez qualifiée',
        '6. Mauvais Lookalike : Source < 100 personnes ou mauvaise qualité',
        '',
        'Erreurs de Création :',
        '7. Texte trop long ou trop court : 50-125 mots optimal',
        '8. Visuels de mauvaise qualité : Images pixellisées, trop de texte',
        '9. Pas de test A/B : Une seule version qui fatigue',
        '',
        'Erreurs de Mesure :',
        '10. Mauvaise attribution : Ignorer les autres canaux',
        '11. Mauvaises métriques : Focus sur likes au lieu de ROAS',
        '12. Vision court terme : Juger sur 2-3 jours seulement',
        '',
        'Erreurs Techniques :',
        '13. Pixel mal configuré : Événements qui ne se déclenchent pas',
        '14. Ignorer les recommandations Meta : Alertes sur chevauchement, budget',
        '',
        'Checklist Pré-Lancement :',
        '- Objectif cohérent avec but business',
        '- Budget suffisant (20€/jour minimum)',
        '- Audience 100K-2M personnes',
        '- 2-3 créations pour tests A/B',
        '- Pixel installé et testé',
        '- Page de destination optimisée'
      ],
      keyPoints: [
        'Respecter phase d\'apprentissage (7-14 jours)',
        'Budget minimum viable selon objectif',
        'Tester une variable à la fois',
        'Pixel correctement configuré',
        'Vision long terme (2+ semaines)'
      ]
    },
    {
      id: 'module-9',
      title: 'Cas Pratiques par Secteur',
      description: 'Exemples concrets de campagnes réussies',
      content: [
        'Cas 1 : E-commerce - Boutique Mode Féminine',
        '- Budget : 1,800€/mois',
        '- ROAS : 3.2x',
        '- CA généré : 5,760€/mois',
        '- Audience gagnante : Lookalike clients 1%',
        '- Format gagnant : Carrousel produits',
        '- Apprentissage : Lookalikes surperforment les intérêts',
        '',
        'Cas 2 : Services Locaux - Garage Automobile',
        '- Budget : 800€/mois',
        '- Rendez-vous : 25-30/mois',
        '- Taux conversion : 40% (12 clients/mois)',
        '- CA moyen : 180€/client',
        '- ROAS : 2.7x',
        '- Zone : 15km rayon principal',
        '- Format gagnant : Avant/Après réparations',
        '',
        'Cas 3 : B2B - Cabinet Conseil RH',
        '- Budget : 1,200€/mois',
        '- Leads qualifiés : 8-12/mois',
        '- Clients signés : 2-3/mois (25% conversion)',
        '- CA moyen : 8,000€/client',
        '- ROAS : 4.5x sur 6 mois',
        '- Ciblage : Dirigeants PME 10-100 salariés',
        '- Stratégie : Lead nurturing 3 étapes',
        '',
        'Points communs des réussites :',
        '- Tests initiaux d\'audiences structurés',
        '- Budgets adaptés aux objectifs',
        '- Créations de qualité professionnelle',
        '- Optimisation continue basée sur données',
        '- Patience pendant phase d\'apprentissage'
      ],
      keyPoints: [
        'Adapter stratégie au secteur',
        'E-commerce : Focus ROAS et panier moyen',
        'Local : Géolocalisation précise',
        'B2B : Cycle long, lead nurturing',
        'Tests structurés avant scaling'
      ]
    },
    {
      id: 'module-10',
      title: 'Glossaire et Ressources',
      description: 'Terminologie et ressources pour aller plus loin',
      content: [
        'Termes Essentiels :',
        '- CPA : Cost Per Acquisition (coût par acquisition)',
        '- CPM : Cost Per Mille (coût pour 1000 impressions)',
        '- CPC : Cost Per Click (coût par clic)',
        '- CTR : Click-Through Rate (taux de clic)',
        '- ROAS : Return on Ad Spend (retour sur investissement pub)',
        '- CBO : Campaign Budget Optimization',
        '- Lookalike : Audience similaire',
        '- Pixel : Code de tracking sur votre site',
        '- Retargeting : Reciblage publicitaire',
        '',
        'Ressources Recommandées :',
        '',
        'Formation Officielle :',
        '- Meta Blueprint : Cours gratuits et certification',
        '- facebook.com/business/learn',
        '',
        'Outils :',
        '- Facebook Ads Library : Voir pubs concurrents',
        '- Canva : Création visuels',
        '- Google Analytics 4 : Tracking complémentaire',
        '- Facebook Pixel Helper : Tester le pixel',
        '',
        'Communautés :',
        '- Groupes Facebook spécialisés Meta Ads',
        '- Blogs : Hootsuite, HubSpot, Social Media News',
        '',
        'Support Meta :',
        '- Centre d\'aide : business.facebook.com/help',
        '- Chat support pour comptes actifs'
      ],
      keyPoints: [
        'Maîtriser la terminologie Meta Ads',
        'Meta Blueprint pour formation continue',
        'Facebook Ads Library pour inspiration',
        'Google Analytics en complément',
        'Rejoindre communautés pour échanger'
      ]
    }
  ],
  conclusion: {
    title: 'Conclusion',
    content: [
      'Meta Ads représente aujourd\'hui l\'un des leviers marketing les plus puissants pour développer une entreprise, mais sa maîtrise demande de la rigueur, de la patience et une approche méthodique.',
      'La réussite repose sur 4 piliers : Stratégie claire, Créations performantes, Optimisation continue, Vision long terme.',
      'Attentes réalistes : Phase d\'apprentissage 2-4 semaines, Optimisation 2-3 mois, ROI 2,5-4x en moyenne.',
      'N\'oubliez pas que le domaine de la publicité digitale évolue rapidement. Pratiquez régulièrement, testez constamment et analysez vos résultats.',
      'Continuez votre formation avec Meta Blueprint et restez à jour sur les nouvelles fonctionnalités.'
    ]
  },
  certification: true,
  nextSteps: [
    'Créer votre Business Manager et configurer votre pixel',
    'Lancer votre première campagne avec budget test de 20€/jour',
    'Tester 3 audiences différentes pendant 7 jours',
    'Analyser les résultats et identifier l\'audience gagnante',
    'Optimiser et scaler progressivement selon règle du 20%',
    'Rejoindre la communauté Digiqo pour partager vos expériences'
  ]
}

// Export all formations as an array
export const formations: Formation[] = [
  formationMetaComplete
]

// Helper function to get formation by slug
export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find(f => f.slug === slug)
}

// Helper function to get formations by category
export function getFormationsByCategory(category: string): Formation[] {
  if (category === 'all') return formations
  return formations.filter(f => f.category === category)
}

// Helper function to search formations
export function searchFormations(query: string): Formation[] {
  const searchLower = query.toLowerCase()
  return formations.filter(f =>
    f.title.toLowerCase().includes(searchLower) ||
    f.description.toLowerCase().includes(searchLower) ||
    f.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
    f.modules.some(m =>
      m.title.toLowerCase().includes(searchLower) ||
      m.content.some(c => c.toLowerCase().includes(searchLower))
    )
  )
}