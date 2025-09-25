// Formation data structure for Digicademy
export interface VideoContent {
  placeholder: string // Placeholder text for video
  youtubeId?: string // YouTube video ID (will be added later)
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

// Formation: Publicité MÉTA (Facebook & Instagram Ads)
export const formationPubliciteMeta: Formation = {
  id: 'formation-publicite-meta',
  slug: 'publicite-meta-facebook-instagram-ads',
  title: 'Publicité MÉTA (Facebook & Instagram Ads)',
  category: 'publicite',
  description: 'Maîtrisez la publicité sur Facebook et Instagram pour booster votre business',
  duration: '8 heures',
  level: 'Débutant',
  keywords: [
    'facebook',
    'instagram',
    'meta',
    'publicité',
    'ads',
    'pixel',
    'remarketing',
    'business manager',
    'campagne',
    'ciblage'
  ],
  introduction: {
    title: 'Bienvenue dans la formation Publicité MÉTA',
    content: [
      'Cette formation complète vous permettra de maîtriser la publicité sur Facebook et Instagram, deux plateformes incontournables du marketing digital.',
      'Vous apprendrez à créer, optimiser et analyser vos campagnes publicitaires pour maximiser votre retour sur investissement.',
      'De la configuration du pixel à l\'optimisation avancée, nous couvrirons tous les aspects essentiels pour faire de vous un expert de la publicité MÉTA.'
    ],
    objectives: [
      'Comprendre l\'écosystème publicitaire de META',
      'Configurer correctement le Business Manager et le pixel',
      'Créer des campagnes publicitaires performantes',
      'Maîtriser les différents formats publicitaires',
      'Analyser et optimiser vos résultats',
      'Mettre en place des stratégies de remarketing efficaces'
    ]
  },
  modules: [
    {
      id: 'module-1',
      title: 'Module 1 : Écosystème publicitaire de META',
      description: 'Découvrez l\'environnement publicitaire de Facebook et Instagram',
      content: [
        'META (anciennement Facebook) représente l\'un des plus grands écosystèmes publicitaires au monde avec plus de 3 milliards d\'utilisateurs actifs mensuels.',
        'Les plateformes Facebook et Instagram offrent des possibilités de ciblage uniques basées sur les données démographiques, les intérêts, les comportements et les connexions des utilisateurs.',
        'Le Business Manager est l\'outil central pour gérer toutes vos activités publicitaires. Il permet de centraliser la gestion des pages, des comptes publicitaires, des pixels et des catalogues produits.',
        'Les différents placements disponibles incluent le fil d\'actualité Facebook, les stories Instagram, Messenger, l\'Audience Network et bien plus encore.',
        'Comprendre cet écosystème est essentiel pour exploiter pleinement le potentiel publicitaire de ces plateformes.'
      ],
      video: {
        placeholder: 'Vidéo : Introduction à l\'écosystème META (15 min)',
        youtubeId: 'CPi867s13WA',
        duration: '15:00'
      },
      keyPoints: [
        '3 milliards d\'utilisateurs actifs mensuels',
        'Placements multiples : Facebook, Instagram, Messenger, Audience Network',
        'Business Manager comme hub central',
        'Ciblage avancé basé sur les données utilisateurs'
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2 : Configuration du Business Manager',
      description: 'Apprenez à configurer correctement votre Business Manager',
      content: [
        'La configuration du Business Manager est une étape cruciale pour démarrer vos campagnes publicitaires.',
        'Créez votre compte Business Manager sur business.facebook.com. Utilisez une adresse email professionnelle et complétez toutes les informations de votre entreprise.',
        'Ajoutez votre page Facebook et votre compte Instagram professionnel. Assurez-vous d\'avoir les droits d\'administrateur sur ces comptes.',
        'Configurez votre compte publicitaire en définissant la devise, le fuseau horaire et les moyens de paiement. Ces paramètres ne pourront pas être modifiés par la suite.',
        'Attribuez les rôles appropriés aux membres de votre équipe : administrateur, annonceur ou analyste selon leurs besoins.',
        'Vérifiez votre domaine pour améliorer la délivrabilité de vos publicités et accéder à des fonctionnalités avancées.'
      ],
      video: {
        placeholder: 'Vidéo : Configuration pas à pas du Business Manager (20 min)',
        duration: '20:00'
      },
      keyPoints: [
        'Création du compte avec email professionnel',
        'Ajout des pages et comptes Instagram',
        'Configuration du compte publicitaire',
        'Attribution des rôles d\'équipe',
        'Vérification du domaine'
      ]
    },
    {
      id: 'module-3',
      title: 'Module 3 : Installation et configuration du Pixel',
      description: 'Maîtrisez l\'installation et la configuration du pixel META',
      content: [
        'Le pixel META est un morceau de code JavaScript qui permet de suivre les actions des visiteurs sur votre site web.',
        'Pour créer votre pixel, accédez à l\'onglet "Sources de données" dans le Business Manager, puis "Pixels". Donnez-lui un nom explicite.',
        'Installez le code de base du pixel sur toutes les pages de votre site, juste avant la balise </head>. Utilisez Google Tag Manager pour simplifier l\'installation.',
        'Configurez les événements standards : PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead, CompleteRegistration.',
        'Testez votre pixel avec l\'extension Chrome "Facebook Pixel Helper" pour vérifier que tous les événements se déclenchent correctement.',
        'Activez les correspondances avancées pour améliorer le matching des conversions en hashant automatiquement les données clients.',
        'Configurez l\'API Conversions pour un tracking server-side plus fiable, notamment pour contourner les blocages iOS 14.5+.'
      ],
      video: {
        placeholder: 'Vidéo : Installation complète du pixel (25 min)',
        duration: '25:00'
      },
      keyPoints: [
        'Code de base sur toutes les pages',
        'Événements standards configurés',
        'Test avec Pixel Helper',
        'Correspondances avancées activées',
        'API Conversions pour iOS 14.5+'
      ]
    },
    {
      id: 'module-4',
      title: 'Module 4 : Structure des campagnes',
      description: 'Comprenez la structure hiérarchique des campagnes META',
      content: [
        'Les campagnes META suivent une structure hiérarchique en trois niveaux : Campagne, Ensemble de publicités et Publicité.',
        'Au niveau Campagne, vous définissez l\'objectif marketing : Sensibilisation, Considération ou Conversion. Choisissez l\'objectif qui correspond à votre but commercial.',
        'Le budget peut être défini au niveau campagne (CBO - Campaign Budget Optimization) ou au niveau ensemble de publicités. Le CBO permet à l\'algorithme de distribuer automatiquement le budget.',
        'Au niveau Ensemble de publicités, définissez votre audience, vos placements, votre budget (si pas de CBO) et votre calendrier de diffusion.',
        'Les options d\'optimisation déterminent pour quel événement META optimise la diffusion : impressions, portée, clics, conversions, etc.',
        'Au niveau Publicité, créez vos visuels et vos textes. Testez plusieurs variantes pour identifier les meilleures combinaisons.',
        'Utilisez la fonction "Test A/B" pour comparer différentes stratégies et identifier les plus performantes.'
      ],
      video: {
        placeholder: 'Vidéo : Création d\'une campagne complète (30 min)',
        duration: '30:00'
      },
      keyPoints: [
        '3 niveaux : Campagne > Ensemble > Publicité',
        'Objectifs alignés sur les buts commerciaux',
        'CBO pour optimisation automatique',
        'Tests A/B pour amélioration continue'
      ]
    },
    {
      id: 'module-5',
      title: 'Module 5 : Ciblage et audiences',
      description: 'Découvrez toutes les options de ciblage disponibles',
      content: [
        'Le ciblage est l\'un des points forts de META. Commencez par définir votre audience de base : âge, sexe, localisation et langue.',
        'Le ciblage détaillé permet de raffiner selon les données démographiques (éducation, situation familiale, travail), les intérêts et les comportements.',
        'Les audiences personnalisées permettent de cibler vos clients existants. Uploadez votre liste de contacts, utilisez le pixel pour le remarketing ou ciblez les interactions avec votre page.',
        'Les audiences similaires (Lookalike) permettent de trouver de nouveaux prospects similaires à vos meilleurs clients. Commencez avec 1% de similarité pour la meilleure qualité.',
        'L\'exclusion d\'audiences est cruciale pour éviter la cannibalisation entre campagnes. Excluez les acheteurs récents des campagnes de prospection.',
        'La taille d\'audience recommandée varie selon l\'objectif : 1-5 millions pour la conversion, 5-20 millions pour le trafic, plus large pour la notoriété.',
        'Utilisez l\'Audience Insights pour mieux comprendre votre audience et affiner votre ciblage.'
      ],
      video: {
        placeholder: 'Vidéo : Stratégies de ciblage avancées (35 min)',
        duration: '35:00'
      },
      keyPoints: [
        'Ciblage démographique de base',
        'Intérêts et comportements détaillés',
        'Audiences personnalisées pour remarketing',
        'Lookalike pour acquisition',
        'Exclusions pour éviter les doublons'
      ]
    },
    {
      id: 'module-6',
      title: 'Module 6 : Formats publicitaires',
      description: 'Explorez tous les formats publicitaires disponibles',
      content: [
        'META propose une variété de formats publicitaires adaptés à différents objectifs et types de contenu.',
        'Image unique : Le format le plus simple et souvent le plus efficace. Utilisez des images de haute qualité (1200x628 pixels minimum) avec peu de texte.',
        'Vidéo : Captez l\'attention avec des vidéos courtes (15-30 secondes). Optimisez pour le visionnage sans son avec des sous-titres.',
        'Carrousel : Présentez jusqu\'à 10 images ou vidéos dans une seule publicité. Idéal pour présenter plusieurs produits ou raconter une histoire.',
        'Collection : Format immersif qui s\'ouvre en plein écran. Parfait pour l\'e-commerce avec une vidéo de couverture et 4 produits.',
        'Stories : Format vertical plein écran (9:16) pour Facebook et Instagram Stories. Créez du contenu natif et engageant.',
        'Reels : Le nouveau format star d\'Instagram. Vidéos verticales courtes et divertissantes qui peuvent devenir virales.',
        'Instant Experience : Expériences mobiles plein écran ultra-rapides qui se chargent instantanément.'
      ],
      video: {
        placeholder: 'Vidéo : Exemples de formats publicitaires performants (25 min)',
        duration: '25:00'
      },
      keyPoints: [
        'Images : 1200x628px minimum',
        'Vidéos : 15-30 secondes avec sous-titres',
        'Stories : Format 9:16 vertical',
        'Carrousel : Jusqu\'à 10 médias',
        'Reels : Format tendance Instagram'
      ]
    },
    {
      id: 'module-7',
      title: 'Module 7 : Rédaction publicitaire',
      description: 'Apprenez à rédiger des textes publicitaires qui convertissent',
      content: [
        'La rédaction publicitaire sur META doit capter l\'attention rapidement et inciter à l\'action.',
        'Structure AIDA : Attention (accroche forte), Intérêt (bénéfice principal), Désir (avantages détaillés), Action (CTA clair).',
        'Titre principal : Maximum 40 caractères pour éviter la troncature. Incluez le bénéfice principal ou une question engageante.',
        'Texte principal : Les 125 premiers caractères sont cruciaux car visibles sans clic "Voir plus". Commencez par le plus important.',
        'Description : Complément d\'information de 30 caractères. Renforcez votre proposition de valeur ou ajoutez de l\'urgence.',
        'Call-to-action : Choisissez le bon bouton parmi les options disponibles (Acheter, En savoir plus, S\'inscrire, etc.).',
        'Personnalisation : Utilisez les insertions dynamiques pour personnaliser avec le prénom, la ville ou d\'autres données.',
        'Tests de copy : Créez minimum 3 variantes de textes pour identifier les messages les plus performants.'
      ],
      video: {
        placeholder: 'Vidéo : Techniques de copywriting pour META Ads (20 min)',
        duration: '20:00'
      },
      keyPoints: [
        'Structure AIDA pour engagement',
        '125 premiers caractères cruciaux',
        'Titre de 40 caractères max',
        'CTA adapté à l\'objectif',
        'Tests A/B sur les textes'
      ]
    },
    {
      id: 'module-8',
      title: 'Module 8 : Remarketing et audiences dynamiques',
      description: 'Mettez en place des stratégies de remarketing efficaces',
      content: [
        'Le remarketing permet de recibler les personnes qui ont déjà interagi avec votre marque.',
        'Segmentez vos audiences de remarketing par niveau d\'engagement : visiteurs du site, abandonnistes de panier, acheteurs existants.',
        'Créez un entonnoir de remarketing : Top (tous les visiteurs), Middle (pages produits vues), Bottom (paniers abandonnés).',
        'Durées de rétention recommandées : 7 jours pour les paniers abandonnés, 14-30 jours pour les visiteurs, 180 jours pour les clients.',
        'Remarketing dynamique : Affichez automatiquement les produits consultés grâce au catalogue produits et au pixel.',
        'Cross-sell et upsell : Proposez des produits complémentaires aux acheteurs récents avec des audiences basées sur les achats.',
        'Réactivation : Ciblez les clients inactifs depuis 60-90 jours avec des offres spéciales ou du nouveau contenu.',
        'Exclusions importantes : Excluez les acheteurs récents des campagnes de panier abandonné pour éviter la frustration.'
      ],
      video: {
        placeholder: 'Vidéo : Configuration du remarketing dynamique (30 min)',
        duration: '30:00'
      },
      keyPoints: [
        'Segmentation par engagement',
        'Entonnoir de remarketing',
        'Remarketing dynamique produits',
        'Cross-sell aux clients',
        'Exclusions pour éviter la sur-sollicitation'
      ]
    },
    {
      id: 'module-9',
      title: 'Module 9 : Analyse et optimisation',
      description: 'Analysez vos performances et optimisez vos campagnes',
      content: [
        'L\'analyse régulière de vos campagnes est essentielle pour améliorer continuellement vos performances.',
        'Métriques clés à surveiller : CTR (taux de clic), CPC (coût par clic), CPM (coût pour mille), taux de conversion, ROAS (retour sur investissement publicitaire).',
        'Utilisez les colonnes personnalisées pour afficher les métriques pertinentes selon vos objectifs. Sauvegardez vos vues pour gagner du temps.',
        'Analysez les performances par placement pour identifier où vos publicités performent le mieux et ajustez les budgets en conséquence.',
        'La règle des 50 conversions : Attendez au moins 50 conversions par semaine avant de juger les performances d\'un ensemble de publicités.',
        'Optimisation du budget : Réallouez le budget des ensembles peu performants vers ceux qui génèrent le meilleur ROAS.',
        'Tests continus : Testez constamment de nouvelles audiences, créatives et copies. Gardez 20% du budget pour les tests.',
        'Analyse de la fréquence : Si la fréquence dépasse 3-4 sur 7 jours, rafraîchissez vos créatives pour éviter la fatigue publicitaire.'
      ],
      video: {
        placeholder: 'Vidéo : Dashboard d\'analyse et techniques d\'optimisation (35 min)',
        duration: '35:00'
      },
      keyPoints: [
        'KPIs selon objectifs',
        'Colonnes personnalisées',
        'Règle des 50 conversions',
        'Budget vers meilleurs ROAS',
        'Fréquence < 4 sur 7 jours'
      ]
    },
    {
      id: 'module-10',
      title: 'Module 10 : Scaling et croissance',
      description: 'Scalez vos campagnes pour maximiser vos résultats',
      content: [
        'Le scaling consiste à augmenter progressivement vos dépenses publicitaires tout en maintenant ou améliorant votre rentabilité.',
        'Scaling vertical : Augmentez progressivement le budget d\'un ensemble performant de 20-30% tous les 3-4 jours. Évitez les augmentations brutales.',
        'Scaling horizontal : Dupliquez les ensembles performants avec de nouvelles audiences similaires ou de nouveaux placements.',
        'Campagnes CBO : Utilisez l\'optimisation du budget de campagne pour laisser l\'algorithme distribuer automatiquement vers les meilleurs ensembles.',
        'Audiences larges : À grande échelle, les audiences larges avec un bon historique de pixel peuvent surperformer le ciblage détaillé.',
        'Advantage+ Shopping : Utilisez les campagnes automatisées de META pour le e-commerce, elles apprennent et s\'optimisent rapidement.',
        'Budget journalier vs à vie : Préférez le budget journalier pour plus de flexibilité dans le scaling.',
        'Surveillez le CPA : Si le coût d\'acquisition augmente de plus de 30%, ralentissez le scaling et optimisez avant de continuer.'
      ],
      video: {
        placeholder: 'Vidéo : Stratégies de scaling avancées (30 min)',
        duration: '30:00'
      },
      keyPoints: [
        'Augmentation progressive 20-30%',
        'Duplication des gagnants',
        'CBO pour distribution auto',
        'Audiences larges à grande échelle',
        'Surveillance du CPA'
      ]
    },
    {
      id: 'module-11',
      title: 'Module 11 : Bonnes pratiques et erreurs à éviter',
      description: 'Les meilleures pratiques et les pièges courants',
      content: [
        'Respectez ces bonnes pratiques pour maximiser vos chances de succès avec META Ads.',
        'Phase d\'apprentissage : Ne modifiez pas vos ensembles pendant 3-5 jours pour laisser l\'algorithme apprendre. Chaque modification redémarre l\'apprentissage.',
        'Budget minimum : Allouez au moins 5-10 fois votre CPA cible par jour pour avoir assez de données pour optimiser.',
        'Creative fatigue : Rafraîchissez vos créatives tous les 14-21 jours pour maintenir l\'engagement.',
        'Respect des politiques : Vérifiez toujours les politiques publicitaires de META pour éviter les rejets et suspensions de compte.',
        'Attribution : Utilisez une fenêtre d\'attribution de 7 jours clic + 1 jour vue pour une vision équilibrée.',
        'Saisonnalité : Anticipez les périodes de forte demande (Black Friday, Noël) en augmentant les budgets progressivement 2-3 semaines avant.',
        'Documentation : Documentez vos tests, résultats et apprentissages dans un journal de bord pour capitaliser sur vos expériences.'
      ],
      video: {
        placeholder: 'Vidéo : Checklist des bonnes pratiques (25 min)',
        duration: '25:00'
      },
      keyPoints: [
        'Respecter phase d\'apprentissage',
        'Budget 5-10x CPA cible',
        'Refresh créatives régulier',
        'Conformité aux politiques',
        'Documentation des tests'
      ]
    }
  ],
  conclusion: {
    title: 'Félicitations, vous êtes maintenant prêt à lancer vos campagnes META !',
    content: [
      'Vous avez maintenant toutes les clés en main pour créer et optimiser des campagnes publicitaires performantes sur Facebook et Instagram.',
      'N\'oubliez pas que la réussite en publicité digitale demande de la pratique, des tests constants et une analyse régulière de vos résultats.',
      'Continuez à vous former sur les nouvelles fonctionnalités que META lance régulièrement pour rester à la pointe.'
    ]
  },
  certification: true,
  nextSteps: [
    'Configurez votre Business Manager et votre pixel',
    'Lancez votre première campagne avec un petit budget test',
    'Analysez vos résultats après 1 semaine',
    'Optimisez et scalez progressivement',
    'Rejoignez notre communauté pour échanger avec d\'autres annonceurs'
  ]
}

// Export all formations as an array
export const formations: Formation[] = [
  formationPubliciteMeta
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