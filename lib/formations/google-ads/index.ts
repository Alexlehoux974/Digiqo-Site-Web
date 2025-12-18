import { Formation } from '../types'
import { module1 } from './module-1'
import { module2 } from './module-2'
import { module3 } from './module-3'
import { module4 } from './module-4'
import { module5 } from './module-5'
import { module6 } from './module-6'
import { module7 } from './module-7'
import { module8 } from './module-8'
import { module9 } from './module-9'
import { module10 } from './module-10'

// Re-export individual modules for granular imports
export { module1 } from './module-1'
export { module2 } from './module-2'
export { module3 } from './module-3'
export { module4 } from './module-4'
export { module5 } from './module-5'
export { module6 } from './module-6'
export { module7 } from './module-7'
export { module8 } from './module-8'
export { module9 } from './module-9'
export { module10 } from './module-10'

// Formation: La Publicité Google (SEA) - Formation Complète
export const formationGoogleAds: Formation = {
  id: 'formation-google-sea-complete',
  slug: 'la-publicite-google-sea',
  title: 'La Publicité Google (SEA) - Formation Complète',
  category: 'publicite',
  description: 'Formation complète sur la publicité Google Ads (SEA). Maîtrisez Google Search, Display, Shopping et YouTube Ads pour maximiser votre ROI publicitaire.',
  duration: '14 heures',
  level: 'Intermédiaire',
  instructor: 'Experts Certifiés Google Ads',
  price: 'Gratuit',
  keywords: ['Google Ads', 'SEA', 'Google Shopping', 'YouTube Ads', 'mots-clés', 'enchères', 'Quality Score', 'Display', 'remarketing'],
  introduction: {
    title: 'Introduction à Google Ads',
    content: [
      'Google Ads (anciennement AdWords) est la plateforme publicitaire de Google qui permet de diffuser des annonces sur l\'ensemble de l\'écosystème Google et ses partenaires.',
      'Avec 91% de part de marché en France et 8,5 milliards de recherches mensuelles, Google Ads représente une opportunité unique pour capter une audience qualifiée au moment précis où elle exprime son besoin.'
    ],
    objectives: [
      'Comprendre l\'écosystème Google Ads et ses différentes plateformes',
      'Maîtriser la création et l\'optimisation de campagnes Search, Display et Shopping',
      'Développer une stratégie de mots-clés performante',
      'Optimiser les enchères et le Quality Score pour réduire les coûts',
      'Exploiter YouTube Ads pour la vidéo publicitaire',
      'Mesurer et analyser les performances avec Google Analytics',
      'Éviter les erreurs courantes et maximiser le ROI'
    ]
  },
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8,
    module9,
    module10
  ],
  conclusion: {
    title: 'Conclusion',
    content: [
      'Google Ads est un levier publicitaire puissant qui permet de capter une audience qualifiée au moment précis où elle exprime son besoin.',
      'La maîtrise de cette plateforme requiert une compréhension approfondie des mécanismes d\'enchères, du Quality Score, et des différents formats publicitaires disponibles.',
      'En appliquant les stratégies et bonnes pratiques présentées dans cette formation, vous serez capable de créer et optimiser des campagnes performantes qui génèrent un ROI mesurable.'
    ]
  },
  certification: true,
  nextSteps: [
    'Créer votre premier compte Google Ads',
    'Configurer le suivi des conversions',
    'Lancer une campagne test avec un budget limité',
    'Analyser les performances après 2 semaines',
    'Passer la certification Google Ads',
    'Explorer les fonctionnalités avancées (scripts, API)'
  ]
}
