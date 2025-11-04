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
