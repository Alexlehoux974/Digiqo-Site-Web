// Quiz questions for Digicademy formations
// Each formation has a pool of 20 questions, 10 are randomly selected per quiz attempt

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number // Index of the correct option (0-3)
  explanation?: string
}

export interface QuizData {
  [formationSlug: string]: QuizQuestion[]
}

export const quizQuestions: QuizData = {
  'publicite-facebook-2025': [
    {
      id: 1,
      question: "Quelle est la principale innovation de Meta Ads depuis iOS 14.5 ?",
      options: [
        "L'ajout de nouveaux placements publicitaires",
        "L'API de Conversions (CAPI) obligatoire",
        "La réduction des coûts publicitaires",
        "L'intégration avec TikTok"
      ],
      correctAnswer: 1,
      explanation: "L'API de Conversions (CAPI) est devenue obligatoire pour contourner les limitations d'iOS 14.5 et améliorer le tracking de +30%."
    },
    {
      id: 2,
      question: "Combien d'utilisateurs actifs Facebook compte-t-il en 2025 ?",
      options: [
        "1,5 milliard",
        "2,9 milliards",
        "3,5 milliards",
        "4 milliards"
      ],
      correctAnswer: 1,
      explanation: "Facebook compte 2,9 milliards d'utilisateurs actifs, dominant chez les 25-55 ans."
    },
    {
      id: 3,
      question: "Quel format publicitaire offre +22% d'engagement vs Stories en 2025 ?",
      options: [
        "Carousel Ads",
        "Collection Ads",
        "Reels Ads",
        "Video Ads classiques"
      ],
      correctAnswer: 2,
      explanation: "Les Reels Ads (vidéos courtes verticales) génèrent +22% d'engagement par rapport aux Stories."
    },
    {
      id: 4,
      question: "Que signifie MER dans les nouvelles métriques Meta 2025 ?",
      options: [
        "Meta Efficiency Rate",
        "Marketing Efficiency Ratio",
        "Meta Engagement Rate",
        "Maximum Expected Return"
      ],
      correctAnswer: 1,
      explanation: "MER = Marketing Efficiency Ratio : revenus totaux / dépenses publicitaires totales."
    },
    {
      id: 5,
      question: "Quel est le taux de conversion des AR Ads (réalité augmentée) ?",
      options: [
        "×2 vs publicités classiques",
        "×3 vs publicités classiques",
        "×5 vs publicités classiques",
        "Identique aux publicités classiques"
      ],
      correctAnswer: 1,
      explanation: "Les AR Ads permettent d'essayer virtuellement les produits et offrent un taux de conversion ×3."
    },
    {
      id: 6,
      question: "Quelle plateforme Meta est la plus populaire chez les 18-34 ans ?",
      options: [
        "Facebook",
        "Instagram",
        "Messenger",
        "Audience Network"
      ],
      correctAnswer: 1,
      explanation: "Instagram domine chez les 18-34 ans avec 2 milliards d'utilisateurs, roi de l'e-commerce visuel."
    },
    {
      id: 7,
      question: "Combien de temps maximum dure la phase d'apprentissage d'une campagne Meta ?",
      options: [
        "24 heures",
        "3 jours",
        "7 jours",
        "14 jours"
      ],
      correctAnswer: 2,
      explanation: "La learning phase dure jusqu'à 7 jours et nécessite ~50 conversions pour se stabiliser."
    },
    {
      id: 8,
      question: "Quel outil Meta permet le tracking serveur obligatoire ?",
      options: [
        "Pixel Meta uniquement",
        "Google Tag Manager",
        "API de Conversions (CAPI)",
        "Events Manager"
      ],
      correctAnswer: 2,
      explanation: "L'API de Conversions (CAPI) envoie les événements depuis votre serveur, contournant les bloqueurs."
    },
    {
      id: 9,
      question: "Quel est le pourcentage d'événements supplémentaires capturés avec CAPI ?",
      options: [
        "+10%",
        "+20%",
        "+30%",
        "+50%"
      ],
      correctAnswer: 2,
      explanation: "L'API de Conversions permet de capturer +30% d'événements par rapport au pixel seul."
    },
    {
      id: 10,
      question: "Qu'est-ce que l'Advantage+ Audience ?",
      options: [
        "Un type de ciblage manuel avancé",
        "Une fonctionnalité payante premium",
        "L'IA qui optimise le ciblage automatiquement",
        "Un outil de création d'audiences similaires"
      ],
      correctAnswer: 2,
      explanation: "Advantage+ Audience utilise l'IA pour optimiser automatiquement le ciblage des campagnes."
    },
    {
      id: 11,
      question: "Quelle est la couverture de la tranche d'âge dominante sur Facebook ?",
      options: [
        "18-24 ans",
        "25-55 ans",
        "35-65 ans",
        "45-75 ans"
      ],
      correctAnswer: 1,
      explanation: "Facebook domine chez les 25-55 ans avec 2,9 milliards d'utilisateurs."
    },
    {
      id: 12,
      question: "Combien d'utilisateurs compte Messenger en 2025 ?",
      options: [
        "800 millions",
        "1,3 milliard",
        "2 milliards",
        "2,5 milliards"
      ],
      correctAnswer: 1,
      explanation: "Messenger compte 1,3 milliard d'utilisateurs, idéal pour les conversations commerciales directes."
    },
    {
      id: 13,
      question: "Quel est le principal avantage des Collection Ads ?",
      options: [
        "Coût publicitaire réduit",
        "Expérience shopping immersive mobile-first",
        "Meilleur référencement Google",
        "Partage viral automatique"
      ],
      correctAnswer: 1,
      explanation: "Les Collection Ads offrent une expérience shopping immersive optimisée pour mobile."
    },
    {
      id: 14,
      question: "Que permet l'IA générative dans Meta Ads 2025 ?",
      options: [
        "Ciblage automatique uniquement",
        "Analyse des concurrents",
        "Création automatique de variations créatives",
        "Gestion du budget automatique"
      ],
      correctAnswer: 2,
      explanation: "L'IA générative crée automatiquement des variations de visuels et textes performants."
    },
    {
      id: 15,
      question: "Quel est le rôle de GTM dans le tracking Meta ?",
      options: [
        "Remplacer le pixel Meta",
        "Gestion centralisée des tags",
        "Bloquer les événements inutiles",
        "Créer des audiences automatiquement"
      ],
      correctAnswer: 1,
      explanation: "Google Tag Manager permet une gestion centralisée et optimisée du pixel Meta et des tags."
    },
    {
      id: 16,
      question: "Qu'est-ce que l'incrementality dans les métriques Meta ?",
      options: [
        "Le nombre total de conversions",
        "La mesure de l'impact réel vs groupe de contrôle",
        "Le coût par acquisition",
        "Le taux de clics"
      ],
      correctAnswer: 1,
      explanation: "L'incrementality mesure l'impact réel de vos publicités comparé à un groupe de contrôle."
    },
    {
      id: 17,
      question: "Quel est l'avantage principal d'Audience Network ?",
      options: [
        "Coûts plus bas",
        "Extension sur sites partenaires hors Meta",
        "Meilleur ciblage",
        "Plus de conversions garanties"
      ],
      correctAnswer: 1,
      explanation: "Audience Network étend vos campagnes sur des sites partenaires au-delà de l'écosystème Meta."
    },
    {
      id: 18,
      question: "Combien d'événements minimum sont nécessaires pour sortir de la learning phase ?",
      options: [
        "~20 conversions",
        "~50 conversions",
        "~100 conversions",
        "~200 conversions"
      ],
      correctAnswer: 1,
      explanation: "Il faut environ 50 conversions en 7 jours pour que l'algorithme sorte de la phase d'apprentissage."
    },
    {
      id: 19,
      question: "Que signifie ROAS modélisé ?",
      options: [
        "Le retour sur dépenses publicitaires réel",
        "L'IA estime les conversions non trackées",
        "Le coût par acquisition moyen",
        "Le taux de conversion prévu"
      ],
      correctAnswer: 1,
      explanation: "Le ROAS modélisé utilise l'IA pour estimer les conversions qui n'ont pas pu être trackées."
    },
    {
      id: 20,
      question: "Quel est le principal défi résolu par l'attribution multi-touch ?",
      options: [
        "Réduire les coûts publicitaires",
        "Créditer chaque point de contact du parcours client",
        "Augmenter le nombre de clics",
        "Améliorer la qualité des visuels"
      ],
      correctAnswer: 1,
      explanation: "L'attribution multi-touch permet de créditer équitablement chaque interaction du parcours d'achat."
    }
  ],
  'la-publicite-google-sea': [
    {
      id: 1,
      question: "Quelle est la part de marché de Google en France pour les recherches ?",
      options: [
        "75%",
        "85%",
        "91%",
        "95%"
      ],
      correctAnswer: 2,
      explanation: "Google détient 91% de part de marché en France avec 8,5 milliards de recherches mensuelles."
    },
    {
      id: 2,
      question: "Quelle est la formule du Ad Rank (classement des annonces) ?",
      options: [
        "Enchère × Budget",
        "Enchère × Quality Score × Impact Extensions",
        "CTR × CPC",
        "Impressions × Clics"
      ],
      correctAnswer: 1,
      explanation: "Ad Rank = Enchère × Quality Score × Impact des Extensions. Un meilleur Quality Score permet de payer moins cher."
    },
    {
      id: 3,
      question: "Quel score évalue la qualité d'une annonce Google Ads ?",
      options: [
        "Ad Score",
        "Relevance Score",
        "Quality Score",
        "Performance Score"
      ],
      correctAnswer: 2,
      explanation: "Le Quality Score (1-10) évalue la pertinence de l'annonce, la qualité de la page de destination et le CTR historique."
    },
    {
      id: 4,
      question: "Quel type de correspondance de mot-clé offre le contrôle le plus précis ?",
      options: [
        "Correspondance large (broad)",
        "Correspondance d'expression (phrase)",
        "Correspondance exacte (exact)",
        "Correspondance modifiée"
      ],
      correctAnswer: 2,
      explanation: "La correspondance exacte [mot-clé] ne déclenche l'annonce que pour les requêtes très proches du mot-clé."
    },
    {
      id: 5,
      question: "Combien de titres maximum peut contenir une Responsive Search Ad (RSA) ?",
      options: [
        "5 titres",
        "10 titres",
        "15 titres",
        "20 titres"
      ],
      correctAnswer: 2,
      explanation: "Les RSA acceptent jusqu'à 15 titres et 4 descriptions. Google teste automatiquement les combinaisons."
    },
    {
      id: 6,
      question: "Quel format YouTube Ads est non-skippable et dure 6 secondes ?",
      options: [
        "In-stream skippable",
        "In-stream non-skippable",
        "Bumper Ads",
        "Discovery Ads"
      ],
      correctAnswer: 2,
      explanation: "Les Bumper Ads sont des vidéos de 6 secondes non-skippables, idéales pour la notoriété."
    },
    {
      id: 7,
      question: "Quelle plateforme Google permet de gérer le catalogue produits pour Shopping ?",
      options: [
        "Google Analytics",
        "Google Tag Manager",
        "Google Merchant Center",
        "Google Search Console"
      ],
      correctAnswer: 2,
      explanation: "Google Merchant Center gère le flux produits (feed) nécessaire aux campagnes Shopping et Performance Max."
    },
    {
      id: 8,
      question: "Que signifie Performance Max (PMax) ?",
      options: [
        "Campagne uniquement Search avec enchères max",
        "Campagne IA multi-canaux sur tout l'inventaire Google",
        "Campagne Display avec performance garantie",
        "Extension de campagne Shopping"
      ],
      correctAnswer: 1,
      explanation: "Performance Max est une campagne pilotée par l'IA qui diffuse sur Search, Display, YouTube, Gmail, Maps et Discover."
    },
    {
      id: 9,
      question: "Quel est le CTR benchmark moyen pour le e-commerce en Search ?",
      options: [
        "0,5-1%",
        "1,5-3%",
        "4-6%",
        "8-10%"
      ],
      correctAnswer: 1,
      explanation: "Le CTR moyen en e-commerce est de 1,5-3%. Un CTR >3% est considéré excellent tous secteurs confondus."
    },
    {
      id: 10,
      question: "Quelle stratégie d'enchères cible un coût par acquisition spécifique ?",
      options: [
        "Maximiser les clics",
        "CPC manuel",
        "Target CPA (tCPA)",
        "CPM cible"
      ],
      correctAnswer: 2,
      explanation: "Target CPA permet de définir un coût d'acquisition cible, l'IA ajuste les enchères pour l'atteindre."
    },
    {
      id: 11,
      question: "Qu'est-ce que le ROAS (Return On Ad Spend) ?",
      options: [
        "Nombre de conversions / Budget",
        "Chiffre d'affaires / Coût publicitaire",
        "Clics / Impressions",
        "Budget / Nombre de jours"
      ],
      correctAnswer: 1,
      explanation: "ROAS = Chiffre d'affaires ÷ Coût publicitaire. Un ROAS de 4:1 signifie 4€ de revenus pour 1€ dépensé."
    },
    {
      id: 12,
      question: "Quelle extension d'annonce affiche des liens vers des pages spécifiques du site ?",
      options: [
        "Extensions d'accroche",
        "Extensions de lieu",
        "Extensions de liens annexes (sitelinks)",
        "Extensions d'appel"
      ],
      correctAnswer: 2,
      explanation: "Les sitelinks ajoutent des liens vers des pages spécifiques sous l'annonce (ex: Contact, Produits, À propos)."
    },
    {
      id: 13,
      question: "Quel pourcentage des recherches Google ont une intention locale ?",
      options: [
        "20%",
        "35%",
        "46%",
        "60%"
      ],
      correctAnswer: 2,
      explanation: "46% des recherches Google ont une intention locale (\"près de moi\", ville, quartier)."
    },
    {
      id: 14,
      question: "Quelle est la durée recommandée pour une vidéo YouTube In-stream skippable ?",
      options: [
        "6 secondes",
        "15-30 secondes",
        "1-2 minutes",
        "5+ minutes"
      ],
      correctAnswer: 1,
      explanation: "Les vidéos In-stream skippables de 15-30 secondes offrent le meilleur équilibre message/engagement."
    },
    {
      id: 15,
      question: "Qu'est-ce que le Google Display Network (GDN) ?",
      options: [
        "Le réseau de recherche Google",
        "Le réseau de sites partenaires affichant des bannières",
        "YouTube uniquement",
        "Google Maps"
      ],
      correctAnswer: 1,
      explanation: "Le GDN regroupe des millions de sites partenaires où vous pouvez afficher des annonces display et vidéo."
    },
    {
      id: 16,
      question: "Quel outil Google permet de configurer le suivi des conversions avancé ?",
      options: [
        "Google Ads Editor",
        "Google Tag Manager",
        "Google Optimize",
        "Google Data Studio"
      ],
      correctAnswer: 1,
      explanation: "Google Tag Manager permet de gérer les balises de tracking sans modifier le code du site."
    },
    {
      id: 17,
      question: "Qu'est-ce que le remarketing dynamique ?",
      options: [
        "Cibler les visiteurs précédents avec des annonces génériques",
        "Montrer automatiquement les produits consultés aux visiteurs",
        "Augmenter les enchères sur certains mots-clés",
        "Créer des audiences similaires"
      ],
      correctAnswer: 1,
      explanation: "Le remarketing dynamique affiche automatiquement les produits que l'utilisateur a consultés sur votre site."
    },
    {
      id: 18,
      question: "Quel ROAS minimum est considéré viable pour la plupart des business ?",
      options: [
        "1:1",
        "2:1",
        "5:1",
        "10:1"
      ],
      correctAnswer: 1,
      explanation: "Un ROAS de 2:1 est le minimum viable (2€ de CA pour 1€ de pub). 3-4:1 est bon, 5:1+ est excellent."
    },
    {
      id: 19,
      question: "Quel nouveau format Google Ads combine Search, Display et YouTube ?",
      options: [
        "Smart Shopping",
        "Demand Gen",
        "App Campaigns",
        "Local Campaigns"
      ],
      correctAnswer: 1,
      explanation: "Demand Gen (2023) permet de créer des campagnes visuelles sur YouTube, Discover et Gmail avec un seul flux."
    },
    {
      id: 20,
      question: "Qu'est-ce que le Consent Mode v2 pour Google Ads ?",
      options: [
        "Une nouvelle stratégie d'enchères",
        "Un système de consentement RGPD pour le tracking",
        "Un format d'annonce interactif",
        "Une extension de ciblage"
      ],
      correctAnswer: 1,
      explanation: "Consent Mode v2 permet de respecter les choix de consentement RGPD tout en maintenant une mesure modélisée."
    },
    {
      id: 21,
      question: "Combien de clics en position 1 capte en moyenne une annonce Search ?",
      options: [
        "20%",
        "30%",
        "40%",
        "50%"
      ],
      correctAnswer: 2,
      explanation: "La position 1 capte environ 40% des clics, les positions 2-3 environ 25%, et 4+ environ 10%."
    },
    {
      id: 22,
      question: "Quel est l'objectif principal des campagnes Discovery ?",
      options: [
        "Générer des appels téléphoniques",
        "Toucher les utilisateurs dans leurs flux personnalisés",
        "Améliorer le référencement naturel",
        "Réduire le CPC"
      ],
      correctAnswer: 1,
      explanation: "Les campagnes Discovery touchent les utilisateurs sur YouTube Home, Discover et Gmail dans des formats visuels natifs."
    }
  ]
}

// Function to get random 10 questions from pool of 20
export function getRandomQuestions(formationSlug: string, count: number = 10): QuizQuestion[] {
  const allQuestions = quizQuestions[formationSlug] || []

  if (allQuestions.length === 0) {
    return []
  }

  // Shuffle array and take first 'count' items
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, allQuestions.length))
}
