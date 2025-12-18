import { ModuleContent } from '../types'

export const module6: ModuleContent = {
  id: 'module-6',
  title: 'Stratégies d\'Enchères et Budgets',
  description: 'Maîtrisez le système d\'enchères Google Ads : enchères manuelles, automatiques, CPA cible, ROAS cible et gestion optimale des budgets.',
  content: [
    '### Le système d\'enchères Google Ads\n\nChaque recherche déclenche une enchère instantanée entre tous les annonceurs éligibles. Cette enchère se déroule en millisecondes et détermine quelles annonces sont affichées, dans quel ordre, et le prix payé par chaque annonceur.',
    '**Facteurs de classement (Ad Rank) :**\n\n- **Enchère maximum (Max CPC)** : Prix maximum que vous acceptez de payer pour un clic\n- **Quality Score** : Note de 1 à 10 basée sur le CTR attendu (45%), pertinence annonce (30%), expérience landing page (25%)\n- **Extensions** : Liens annexes, accroches, lieu, appel - impact +10 à 30% sur le classement\n- **Contexte** : Appareil, localisation, moment de la journée, historique de recherche',
    '**Impact du Quality Score :**\n\n- **QS 8 vs QS 4** : CPC divisé par 2 à position égale\n- **QS élevé** : Meilleures positions à moindre coût\n- **QS faible** : Coûts élevés, diffusion limitée',
    '### Les stratégies d\'enchères manuelles\n\nLes enchères manuelles vous donnent un contrôle total sur vos coûts mais demandent une gestion quotidienne.',
    '**Manual CPC :**\n\n- **Avantages** : Contrôle total, transparence, apprentissage de la valeur des mots-clés\n- **Inconvénients** : Chronophage, sous-optimal vs IA, pas d\'ajustement temps réel\n- **Quand l\'utiliser** : Début d\'activité, budget serré, secteur de niche, phase test',
    '**Enhanced CPC (eCPC) :**\n\n- **Principe** : Google ajuste vos enchères manuelles +30% max pour maximiser les conversions\n- **Avantage** : Équilibre contrôle/performance, transition vers l\'automatisation\n- **Quand l\'utiliser** : 30-100 conversions/mois, passage du manuel à l\'auto',
    '### Les stratégies d\'enchères automatiques\n\nGoogle utilise le machine learning pour optimiser vos enchères en temps réel selon 100+ signaux par requête.',
    '**Maximiser les clics :**\n\n- **Principe** : Maximum de clics possible avec votre budget\n- **Avantages** : Simplicité, volume maximum, idéal débutant\n- **Inconvénients** : Pas de contrôle qualité, risque de gaspillage\n- **Quand l\'utiliser** : Phase découverte, objectif notoriété',
    '**Maximiser les conversions :**\n\n- **Principe** : Maximum de conversions avec votre budget via IA\n- **Prérequis** : 30+ conversions sur 30 jours, suivi configuré, budget 10x CPA cible\n- **Phase d\'apprentissage** : 2-4 semaines avec performances instables\n- **Quand l\'utiliser** : 50+ conversions/mois, objectif performance',
    '**CPA cible (Target CPA) :**\n\n- **Principe** : Vous définissez le coût par acquisition souhaité\n- **Calcul CPA** : Marge unitaire × 30% (méthode simple) ou basé sur LTV\n- **Avantages** : Prévisibilité budgétaire, focus rentabilité, scalable\n- **Bonnes pratiques** : CPA basé sur historique +20%, budget 20x CPA cible',
    '**ROAS cible (Target ROAS) :**\n\n- **Principe** : Vous définissez le retour sur investissement souhaité (ex: 400% = 4€ générés par 1€ dépensé)\n- **Calcul** : ROAS = CA ÷ Coût pub (ex: 1000€ CA / 200€ pub = 500%)\n- **Prérequis** : E-commerce avec valeurs de conversion, 50+ conversions/mois, 6 semaines d\'historique\n- **Avantages** : Vision business directe, optimisation sur valeur',
    '### Gestion des budgets\n\nLa gestion budgétaire est cruciale pour maximiser votre ROI sur Google Ads.',
    '**Types de budgets :**\n\n- **Budget quotidien** : Montant max/jour (peut dépasser de 2x certains jours, max 30,4x/mois)\n- **Budget partagé** : Répartition automatique entre campagnes selon performances\n- **Répartition 80/20** : 80% sur campagnes principales, 10-20% en test',
    '**Répartition par funnel :**\n\n- **Bottom funnel (50%)** : Mots-clés transactionnels, marque, remarketing\n- **Middle funnel (30%)** : Mots-clés informationnels commerciaux, audiences d\'intention\n- **Top funnel (20%)** : Mots-clés informationnels, affinités, tests',
    '### Ajustements d\'enchères\n\nOptimisez vos enchères selon différents critères pour maximiser les performances.',
    '**Par appareil :**\n\n- **Mobile** : -20% e-commerce (conversion plus faible), +20% services locaux\n- **Desktop** : Référence pour B2B\n- **Tablette** : Généralement neutre (0%)',
    '**Par localisation :**\n\n- **Zones premium** : +30% (ex: Paris centre pour plombier)\n- **Zones standard** : +10%\n- **Zones étendues** : -20% (coûts déplacement)',
    '**Par horaire :**\n\n- **Heures de pointe B2B** : 9h-18h semaine (+20%)\n- **Heures de pointe B2C** : 19h-22h et week-end (+15%)\n- **Heures creuses** : Nuit -50% sauf urgences',
    '**Par audience :**\n\n- **Visiteurs récents** : +50%\n- **Abandons panier** : +100%\n- **Clients existants** : -100% (exclusion) ou ciblage spécifique',
    '### Optimisation continue\n\nL\'optimisation des enchères et budgets est un processus continu.',
    '**Cycle hebdomadaire :**\n\n- Analyser performances par mot-clé\n- Ajuster enchères top/flop performers\n- Identifier nouveaux mots-clés négatifs\n- Vérifier budgets épuisés',
    '**Cycle mensuel :**\n\n- Revoir stratégies d\'enchères automatiques\n- Analyser ajustements audience/géo/temporels\n- Tester nouvelles stratégies sur 10% du budget',
    '**Cycle trimestriel :**\n\n- Évaluer efficacité des stratégies automatiques\n- Revoir CPA/ROAS cibles selon évolution business\n- Analyser tendances saisonnières\n- Planifier budgets pour le trimestre suivant'
  ],
  keyPoints: [
    'Ad Rank = Enchère × Quality Score × Extensions - formule de classement',
    'Quality Score 8 vs 4 = CPC divisé par 2 à position égale',
    'Manual CPC : contrôle total mais chronophage, idéal pour débuter',
    'Enhanced CPC : +30% max d\'ajustement auto, transition vers l\'automatisation',
    'Maximiser conversions : minimum 30 conversions/30 jours requis',
    'CPA cible : Marge × 30% comme point de départ, budget 20x CPA cible',
    'ROAS cible : pour e-commerce avec valeurs trackées, 50+ conversions/mois',
    'Répartition funnel : 50% bottom, 30% middle, 20% top',
    'Ajustements : +/- par appareil, zone géo, horaire et audience',
    'Optimisation : hebdo (enchères), mensuel (stratégies), trimestriel (objectifs)'
  ]
}
