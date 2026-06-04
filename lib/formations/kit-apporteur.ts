import type { Formation } from './types'

// Formation réservée aux apporteurs d'affaires Digiqo.
// - VISIBLE sur la page /digicademy (présente dans le tableau `formations`).
// - Mais la page de la formation est protégée par Basic Auth (voir middleware.ts) :
//   tout le monde voit la carte, seul le mot de passe permet d'entrer dans le contenu.
// - noindex conservé : la page étant derrière Basic Auth, elle renvoie 401 aux crawlers.
export const formationKitApporteur: Formation = {
  id: 'kit-apporteur',
  slug: 'kit-apporteur',
  title: 'Kit Commercial Apporteur d\'Affaires',
  category: 'publicite',
  description:
    "Tout ce qu'un apporteur d'affaires Digiqo doit savoir pour repérer une opportunité, en parler simplement et passer le relais à notre équipe commerciale — en moins de 30 minutes.",
  duration: '30 minutes',
  level: 'Débutant',
  instructor: 'Digiqo',
  certification: false,
  noindex: true,
  keywords: [
    'apporteur d\'affaires', 'kit commercial', 'recommandation', 'commission',
    'Digiqo', 'La Réunion', 'audit digital gratuit', 'mise en relation'
  ],
  introduction: {
    title: 'Bienvenue dans votre Kit Apporteur',
    content: [
      "Vous connaissez des chefs d'entreprise à La Réunion. Certains d'entre eux ont besoin de trouver plus de clients en ligne, sans forcément le savoir. Votre rôle d'apporteur d'affaires est simple : repérer ces opportunités et nous les présenter. C'est notre équipe qui se charge de tout le reste.",
      "Ce kit est volontairement court et direct. Il vous donne l'essentiel : qui est Digiqo, ce qu'on vend, comment reconnaître un bon prospect, le pitch exact à utiliser, à qui transmettre le contact et comment vous êtes rémunéré.",
      "Pas besoin d'être un expert du digital. Vous n'avez ni à vendre, ni à négocier, ni à faire de rendez-vous commercial. Vous ouvrez la porte, on s'occupe de la suite."
    ],
    objectives: [
      "Présenter Digiqo en 30 secondes",
      "Connaître les services et savoir à qui ils s'adressent",
      "Repérer une opportunité grâce à quelques questions simples",
      "Utiliser le pitch et passer le relais à l'équipe commerciale",
      "Comprendre votre système de commissions"
    ]
  },
  modules: [
    {
      id: 'module-1',
      title: 'Module 1 — Digiqo en 30 secondes',
      description: "L'essentiel pour parler de Digiqo avec assurance.",
      content: [
        "### Leçon 1 : Qui on est",
        "Digiqo est une agence digitale basée à La Réunion, spécialisée dans la publicité en ligne et la création de sites web. On accompagne les entreprises réunionnaises à trouver des clients sur internet via des solutions concrètes et mesurables.",
        "",
        "### Leçon 2 : Pourquoi les clients choisissent Digiqo",
        "Résultats mesurables chaque mois (ROAS, leads, CA généré). Équipe locale, réactive, disponible. Pas de jargon : reporting clair. Expertise Meta Ads + Google Ads + création web.",
        "",
        "### Leçon 3 : Notre client type",
        "Une PME réunionnaise de 5 à 50 salariés qui veut trouver des clients en ligne. On n'est pas la moins chère du marché, on est celle qui fait du résultat."
      ],
      keyPoints: [
        "Agence digitale réunionnaise : publicité en ligne + sites web",
        "On vend du résultat mesurable, pas du jargon",
        "Cible : PME locale de 5 à 50 salariés"
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2 — Les services à connaître',
      description: "Ce qu'on vend, pour qui, et comment le repérer dans une conversation.",
      content: [
        "### Leçon 1 : Publicité Facebook / Instagram (Meta Ads)",
        "Pour qui : toute entreprise qui veut toucher des Réunionnais (BtoC principalement).",
        "L'argument : 554 000 utilisateurs Facebook à La Réunion. Votre audience locale entière accessible en quelques clics.",
        "Prix : à partir de 2 250 € HT/mois (budget pub inclus selon le package).",
        "Signal à écouter : \"on fait pas de pub\", \"j'ai essayé mais ça marchait pas\", \"on tourne avec le bouche-à-oreille uniquement\".",
        "",
        "### Leçon 2 : Publicité Google (SEA)",
        "Pour qui : entreprises avec une intention d'achat forte (services, urgences, devis sur mesure).",
        "L'argument : vous apparaissez exactement quand quelqu'un cherche ce que vous vendez. Pas de gaspi.",
        "Prix : à partir de 2 250 € HT/mois.",
        "Signal : \"on n'est pas bien placé sur Google\", \"la concurrence nous passe devant\", \"on perd des devis qu'on ne voit jamais\".",
        "",
        "### Leçon 3 : Création de site web",
        "Deux types : site vitrine (présenter l'activité) ou e-commerce (vendre en ligne).",
        "L'argument : un site Digiqo est conçu pour convertir, pas juste être beau. Il est couplé à la pub pour que les deux se renforcent.",
        "Signal : \"notre site date de 10 ans\", \"on n'a pas de site\", \"le site génère aucun contact\".",
        "",
        "### Leçon 4 : L'audit digital gratuit — votre meilleure arme",
        "C'est gratuit, sans engagement. Digiqo analyse la présence en ligne du prospect et livre un rapport complet.",
        "Ce que vous dites : \"je peux faire analyser votre présence en ligne gratuitement par mon agence, sans aucune obligation.\"",
        "Aucun risque pour le prospect. C'est la porte d'entrée idéale.",
        "",
        "### Leçon 5 : Les autres services",
        "Community management (gestion des réseaux sociaux au quotidien), SEO (référencement naturel Google long terme), créatifs publicitaires (visuels et vidéos), identité de marque (logo, charte graphique), maintenance web."
      ],
      keyPoints: [
        "Meta Ads & Google Ads : à partir de 2 250 € HT/mois",
        "Site web : vitrine ou e-commerce, conçu pour convertir",
        "L'audit digital gratuit est la meilleure porte d'entrée",
        "Retenir les \"signaux\" qui trahissent un besoin"
      ]
    },
    {
      id: 'module-3',
      title: 'Module 3 — Identifier une opportunité',
      description: "Reconnaître un bon prospect (et savoir quand passer son chemin).",
      content: [
        "### Leçon 1 : Les 5 questions qui révèlent un prospect",
        "1. \"Vous faites de la pub en ligne ?\"",
        "2. \"D'où viennent vos nouveaux clients en ce moment ?\"",
        "3. \"Vous avez un site web ?\"",
        "4. \"Vous cherchez à développer votre clientèle ?\"",
        "5. \"Vous avez déjà bossé avec une agence digitale ?\"",
        "",
        "### Leçon 2 : Les profils les plus réceptifs",
        "Commerçant qui stagne. Artisan dépendant du bouche-à-oreille. Entrepreneur qui ouvre un commerce. Gérant qui voit la concurrence faire de la pub. Professionnel libéral sans visibilité en ligne.",
        "",
        "### Leçon 3 : Ce qui disqualifie un prospect",
        "Budget pub inférieur à 2 000 €/mois. Secteur incompatible (alcool, politique, etc.). Déjà sous contrat satisfait avec une autre agence."
      ],
      keyPoints: [
        "5 questions simples suffisent à révéler un besoin",
        "Cibler en priorité ceux qui stagnent ou subissent la concurrence",
        "Disqualifier : budget < 2 000 €/mois, secteur incompatible, déjà engagé et satisfait"
      ]
    },
    {
      id: 'module-4',
      title: 'Module 4 — Passer le relais parfaitement',
      description: "Le pitch exact, le processus, et ce qu'on attend de vous.",
      content: [
        "### Leçon 1 : Le pitch à utiliser mot pour mot",
        "\"Je travaille avec une agence digitale réunionnaise qui s'appelle Digiqo. Ils font de la pub Facebook, Google et des sites web pour des entreprises d'ici. Leurs clients voient du résultat assez vite. Je peux leur demander de vous faire un audit gratuit de votre présence en ligne, sans engagement de votre part.\"",
        "",
        "### Leçon 2 : Le processus en 3 étapes",
        "1. Vous identifiez le prospect et obtenez son accord pour un contact.",
        "2. Vous transmettez ses infos à notre équipe commerciale.",
        "3. L'équipe commerciale prend en charge la présentation et la signature. Vous n'avez rien d'autre à faire.",
        "",
        "### Leçon 3 : Ce qu'il faut transmettre à l'équipe commerciale",
        "Nom, prénom, société. Secteur d'activité. Besoin identifié (pub, site, les deux). Niveau de maturité (\"il est partant pour un RDV\" ou \"il est déjà chaud\"). Votre lien avec lui (comment vous vous connaissez)."
      ],
      keyPoints: [
        "Un pitch court, à dire presque mot pour mot",
        "3 étapes : accord du prospect → transmettre à l'équipe commerciale → l'équipe conclut",
        "Transmettre : identité, secteur, besoin, maturité, votre lien"
      ]
    },
    {
      id: 'module-5',
      title: 'Module 5 — Vos commissions',
      description: "Comment vous êtes rémunéré, avec des exemples chiffrés.",
      content: [
        "### Leçon 1 : Le principe",
        "5 % HT sur toutes les factures payées par votre prospect pendant les 12 mois suivant la signature du contrat.",
        "",
        "### Leçon 2 : Exemples concrets",
        "Client Meta Ads 2 250 €/mois → 112,50 €/mois → 1 350 € sur 12 mois.",
        "Client Meta Ads 4 500 €/mois → 225 €/mois → 2 700 € sur 12 mois.",
        "Client site web 5 000 € → 250 € versés au paiement.",
        "Client site + pub 3 500 €/mois → 175 €/mois → 2 100 € sur 12 mois.",
        "",
        "### Leçon 3 : Les conditions",
        "Commission versée après chaque facture effectivement payée par le client. Pas de plafond. Un contrat apporteur d'affaires est à signer avec Digiqo avant le premier apport."
      ],
      keyPoints: [
        "5 % HT sur les factures payées pendant 12 mois après signature",
        "Pas de plafond de commission",
        "Versée après paiement effectif de chaque facture",
        "Contrat apporteur à signer avant le premier apport"
      ]
    }
  ],
  conclusion: {
    title: 'À vous de jouer',
    content: [
      "Vous avez maintenant tout en main : le discours, les services, les signaux à repérer, le pitch et le processus. Gardez ce kit sous la main et appuyez-vous dessus à chaque opportunité.",
      "Dès que vous identifiez un prospect, transmettez-le à notre équipe commerciale. On s'occupe du reste, et vous touchez votre commission."
    ]
  },
  nextSteps: [
    "Signer votre contrat apporteur d'affaires avec Digiqo",
    "Repérer un premier prospect dans votre réseau",
    "Transmettre le contact à l'équipe commerciale"
  ]
}
