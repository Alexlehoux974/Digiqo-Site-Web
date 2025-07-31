export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  id: string;
  title: string;
  color: string;
  glowColor: string;
  shadowColor: string;
  items: FAQItem[];
}

export const faqSections: FAQSection[] = [
  {
    id: 'generalites',
    title: 'Généralités',
    color: '#FF6B6B', // Rouge corail
    glowColor: 'rgba(255, 107, 107, 0.5)',
    shadowColor: '0 0 30px rgba(139, 20, 49, 0.8)',
    items: [
      {
        question: "Qui sommes-nous et que fait Digiqo ?",
        answer: "Digiqo est une agence de marketing digital Française. Nous aidons les entreprises à développer leur présence en ligne grâce à la gestion de campagnes publicitaires performantes, la création de sites web, et des services de maintenance adaptés. Notre mission : vous accompagner avec des solutions sur-mesure pour maximiser vos résultats digitaux."
      },
      {
        question: "Quels services proposez-vous ?",
        answer: "Digiqo propose :\n\n• Campagnes publicitaires en ligne : Création, gestion et optimisation sur Meta (Facebook, Instagram), Google Ads, et plus.\n\n• Création de sites web : Sites vitrines et boutiques en ligne performants (WordPress, Shopify, WooCommerce).\n\n• Maintenance et sécurité : Forfaits \"Site Keeper\" et \"Shop Keeper\" pour garder vos sites à jour et sécurisés.\n\n• Stratégies digitales sur mesure : Solutions adaptées à vos objectifs pour maximiser vos résultats.\n\nBesoin d'un service spécifique ? Contactez-nous !"
      },
      {
        question: "Pourquoi choisir Digiqo pour vos campagnes publicitaires ?",
        answer: "• Expertise locale et internationale : Nous comprenons les spécificités du marché tout en maîtrisant les plateformes globales comme Meta et Google.\n\n• Résultats concrets : Nous optimisons chaque euro dépensé pour maximiser votre retour sur investissement (ROI).\n\n• Suivi personnalisé : Un expert marketing dédié vous accompagne à chaque étape.\n\n• Process structuré : De la stratégie au reporting, tout est transparent et orienté performance.\n\nAvec Digiqo, vous investissez dans des campagnes qui fonctionnent vraiment."
      },
      {
        question: "Comment fonctionne votre process de collaboration avec un client ?",
        answer: "1. Analyse des besoins : Nous identifions vos objectifs et cibles lors d'un premier rendez-vous (R1).\n\n2. Proposition sur mesure : Présentation de nos offres adaptées et envoi d'un devis clair.\n\n3. Validation et préparation : Après votre accord, nous collectons les contenus nécessaires et configurons vos campagnes.\n\n4. Lancement des campagnes : Création, validation avec une pige publicitaire, puis mise en ligne.\n\n5. Suivi et optimisation : Rapports réguliers, ajustements stratégiques et accompagnement continu.\n\nChez Digiqo, chaque étape est transparente et orientée vers votre succès."
      }
    ]
  },
  {
    id: 'services',
    title: 'Nos Services',
    color: '#FF4500', // Orange néon
    glowColor: 'rgba(255, 69, 0, 0.5)',
    shadowColor: '0 0 30px rgba(218, 101, 48, 0.8)',
    items: [
      {
        question: "Quelles plateformes publicitaires gérez-vous ?",
        answer: "Nous gérons vos campagnes sur les plateformes suivantes :\n\n• **Meta (Facebook & Instagram)** : Publicités ciblées pour engager vos audiences.\n\n• **Google Ads** : Annonces sur le réseau de recherche, display, et Google Shopping.\n\n• **YouTube Ads** : Vidéos publicitaires pour maximiser la visibilité et l'impact.\n\n• **TikTok Ads** : Pour captiver les jeunes générations avec des contenus percutants.\n\n• **LinkedIn Ads** : Idéal pour des stratégies B2B et professionnelles."
      },
      {
        question: "Proposez-vous des services de création de contenu ?",
        answer: "Oui, Digiqo propose des services de création de contenu pour accompagner vos campagnes publicitaires :\n\n• **Visuels publicitaires** : Création d'images percutantes pour vos annonces.\n\n• **Vidéos professionnelles** : Idéal pour les formats Reels, TikTok, et YouTube Ads.\n\n• **Textes publicitaires** : Rédaction d'accroches optimisées pour convertir.\n\nNous pouvons aussi travailler à partir de vos contenus existants pour les optimiser. 💡"
      },
      {
        question: "Que comprend votre forfait \"Site Keeper\" pour les sites vitrines ?",
        answer: "Le forfait **\"Site Keeper\"** inclut :\n\n• **Maintenance technique** : Mises à jour régulières de WordPress et des plugins.\n\n• **Sécurité** : Surveillance et protection contre les cyberattaques.\n\n• **Optimisation des performances** : Analyse et amélioration de la vitesse de chargement.\n\n• **Support technique** : Assistance en cas de problème avec votre site.\n\nC'est la solution idéale pour garder votre site **à jour, sécurisé et performant**. 🚀"
      },
      {
        question: "Qu'est-ce que le forfait \"Shop Keeper\" pour les boutiques en ligne ?",
        answer: "Le forfait **\"Shop Keeper\"** est conçu pour les boutiques en ligne et comprend :\n\n• **Maintenance technique** : Mises à jour régulières de Shopify ou WooCommerce et des extensions.\n\n• **Sécurité renforcée** : Protection des données clients et prévention des cyberattaques.\n\n• **Optimisation e-commerce** : Amélioration des performances pour une navigation fluide.\n\n• **Support dédié** : Assistance en cas de problème avec votre boutique.\n\n• **Ajouts ou modifications de produits** : Mise à jour rapide de votre catalogue.\n\nAvec \"Shop Keeper\", vous assurez une boutique en ligne **toujours fonctionnelle et prête à vendre**. 💼🛒"
      },
      {
        question: "Puis-je combiner plusieurs services (publicité, maintenance, etc.) ?",
        answer: "Absolument ! Chez Digiqo, nous proposons des **solutions flexibles** qui vous permettent de combiner plusieurs services, comme :\n\n• **Publicité en ligne + maintenance de site** : Pour attirer des clients tout en garantissant un site performant.\n\n• **Création de site + campagnes publicitaires** : Idéal pour un lancement impactant.\n\n• **Maintenance + optimisation SEO** : Pour un site à jour et bien référencé.\n\nParlez-nous de vos besoins, et nous créerons une **offre sur-mesure** adaptée à vos objectifs. 🎯"
      },
      {
        question: "Proposez-vous des outils pour simplifier le marketing digital ?",
        answer: "Oui, nous avons créé **Marketing-Facile.fr**, une plateforme dédiée aux solutions marketing **simples et accessibles**. Vous y trouverez :\n\n• **Templates de campagnes publicitaires** prêts à l'emploi.\n\n• **Ressources gratuites** pour améliorer votre présence en ligne.\n\n• **Outils pratiques** pour automatiser et optimiser vos actions digitales.\n\nExplorez nos solutions sur **Marketing-Facile.fr** et simplifiez votre marketing dès aujourd'hui !"
      },
      {
        question: "Proposez-vous des ressources pour apprendre le closing ?",
        answer: "Oui, nous avons créé **Marketing-Facile.fr**, une plateforme dédiée aux solutions marketing **simples et accessibles**. Vous y trouverez :\n\n• **Templates de campagnes publicitaires** prêts à l'emploi.\n\n• **Ressources gratuites** pour améliorer votre présence en ligne.\n\n• **Outils pratiques** pour automatiser et optimiser vos actions digitales.\n\nExplorez nos solutions sur **Marketing-Facile.fr** et simplifiez votre marketing dès aujourd'hui !"
      }
    ]
  },
  {
    id: 'closing',
    title: 'Tout savoir sur le Closing',
    color: '#FF1493', // Magenta
    glowColor: 'rgba(255, 20, 147, 0.5)',
    shadowColor: '0 0 30px rgba(25, 156, 183, 0.8)',
    items: [
      {
        question: "C'est quoi un lead ?",
        answer: "Un **lead** est une personne ou une entreprise ayant manifesté un intérêt pour vos produits ou services, généralement via un formulaire, une inscription, ou une interaction publicitaire.\n\nLes leads sont la **base de votre pipeline commercial** et doivent être **qualifiés** avant toute démarche de vente."
      },
      {
        question: "C'est quoi un prospect ?",
        answer: "Un **prospect** est un lead qualifié avec lequel vous avez établi un premier contact. Il est **potentiellement intéressé** par vos services mais n'a pas encore pris de décision.\n\nEn d'autres termes, c'est un **lead en cours de conversion**."
      },
      {
        question: "C'est quoi le setting et le closing ?",
        answer: "C'est **l'art de conclure une vente** en transformant un prospect qualifié en client. Cela repose sur des techniques comme l'écoute active, la gestion des objections, et la persuasion. Un closer accompagne le prospect jusqu'à la **prise de décision finale**.\n\n• **Setting** : L'étape où un \"setter\" prend contact avec un lead pour qualifier ses besoins et fixer un rendez-vous (souvent appelé **R1**) avec un closer.\n\n• **Closing** : La phase où le closer entre en jeu pour **finaliser la vente**.\n\nCes deux étapes sont **complémentaires** pour assurer une conversion efficace.\n\nDécouvrez toutes les étapes clés dans notre **Guide du Closer 2025**."
      },
      {
        question: "C'est quoi un lead qualifié/mature ?",
        answer: "• **Lead qualifié** : Une personne ou une entreprise ayant démontré un **intérêt clair et précis** pour vos services (ex. : budget validé, besoin confirmé).\n\n• **Lead mature** : Un lead déjà avancé dans son processus d'achat, **prêt à discuter des détails finaux**.\n\nTravailler avec des leads qualifiés et matures **améliore votre taux de conversion**."
      },
      {
        question: "Comment apprendre les techniques de closing ?",
        answer: "Pour maîtriser le closing, rien de mieux que des ressources pratiques comme notre **Guide du Closer 2025**. Il contient :\n\n• Des **stratégies concrètes**.\n\n• Des exemples d'**objections courantes** et comment les gérer.\n\n• Des conseils pour **améliorer vos performances** rapidement."
      }
    ]
  },
  {
    id: 'process',
    title: 'Process et Gestion de Projets',
    color: '#FF8C42', // Orange doré
    glowColor: 'rgba(255, 140, 66, 0.5)',
    shadowColor: '0 0 30px rgba(16, 185, 129, 0.8)',
    items: [
      {
        question: "Comment se déroule la gestion de mes campagnes publicitaires ?",
        answer: "1. **Analyse initiale** : Nous définissons vos objectifs, cibles et budgets publicitaires.\n\n2. **Création des annonces** : Rédaction, design, et paramétrage selon vos besoins (visuels, vidéos, textes).\n\n3. **Paramétrage des campagnes** : Choix des audiences, optimisation des placements, et répartition du budget.\n\n4. **Lancement** : Après validation avec une **pige publicitaire**, vos annonces sont mises en ligne.\n\n5. **Suivi et optimisation** : Analyse régulière des performances, ajustements stratégiques et **reporting clair**.\n\nAvec Digiqo, chaque étape est **transparente et orientée vers la performance**. 🚀"
      },
      {
        question: "Comment puis-je valider mes campagnes avant leur lancement ?",
        answer: "Avant de lancer vos campagnes, vous recevrez une **pige publicitaire**, qui inclut :\n\n• Un aperçu des **visuels et textes publicitaires**.\n\n• Les **audiences ciblées** et objectifs définis.\n\n• Les **placements publicitaires** prévus (fil d'actualité, stories, YouTube, etc.).\n\nVous pouvez valider ou demander des ajustements directement via votre **expert marketing**. **Rien n'est lancé sans votre accord** ! ✅"
      },
      {
        question: "Quelles informations ou contenus dois-je fournir avant le début d'un projet ?",
        answer: "Pour lancer efficacement votre projet, voici ce dont nous avons besoin :\n\n• **Contenus publicitaires** : Photos, vidéos et textes (ou brief si création par Digiqo).\n\n• **Objectifs** : Vos priorités (augmenter les ventes, générer des leads, etc.).\n\n• **Accès techniques** : Compte publicitaire, site web ou CRM (si applicable).\n\n• **Budget** : Montant alloué aux campagnes.\n\n• **Délai souhaité** : Dates clés ou urgences à prendre en compte.\n\nPlus vous partagez d'informations, mieux nous **optimisons vos résultats** ! 🎯"
      }
    ]
  },
  {
    id: 'paiement',
    title: 'Paiement et Contrat',
    color: '#FFD700', // Or
    glowColor: 'rgba(255, 215, 0, 0.5)',
    shadowColor: '0 0 30px rgba(139, 92, 246, 0.8)',
    items: [
      {
        question: "Quels sont vos tarifs et modalités de paiement ?",
        answer: "Nos tarifs dépendent des services choisis :\n\n• **Campagnes publicitaires** : À partir de **1 287 € HT / 3 mois**, hors budget publicitaire.\n\n• **Forfaits Site Keeper et Shop Keeper** : Entre **490 €** et **1 990 €** selon la taille et les besoins de votre site.\n\n• **Création de site web** : Sur devis, selon la complexité et les fonctionnalités.\n\n**Modalités de paiement** :\n\n• Paiement par **virement bancaire** ou via notre plateforme **Shine**.\n\n• **Facturation mensuelle** pour les services récurrents.\n\n• **50 % d'acompte** pour les prestations ponctuelles (création de site, maintenance initiale).\n\nUn **devis détaillé** est toujours fourni avant tout engagement. 💳"
      },
      {
        question: "Est-il possible de modifier ou d'annuler une campagne après son lancement ?",
        answer: "Oui, mais avec certaines conditions :\n\n• **Modifications** : Nous pouvons ajuster vos campagnes (audiences, visuels, budget) si nécessaire. Cependant, des changements fréquents peuvent perturber l'optimisation des algorithmes publicitaires.\n\n• **Annulation** : Une campagne déjà lancée peut être suspendue, mais **le mois en cours reste dû**. Le budget restant peut être réutilisé pour une autre période.\n\nNous vous conseillons toujours de discuter des ajustements avec votre **expert marketing** pour maximiser vos résultats ! 🚀"
      },
      {
        question: "Qu'inclut le contrat que je signe avec Digiqo ?",
        answer: "Le contrat Digiqo est **clair et détaillé**, il inclut :\n\n• **Description des services** : Ce qui est compris (campagnes, maintenance, création de site, etc.).\n\n• **Conditions financières** : Tarifs, modalités de paiement et échéances.\n\n• **Obligations réciproques** : Ce que nous fournissons et ce que vous devez transmettre (contenus, accès, etc.).\n\n• **Clauses de modification ou résiliation** : Options pour ajuster ou mettre fin au contrat.\n\nTout est conçu pour être **transparent et adapté** à vos besoins spécifiques. 📜"
      }
    ]
  },
  {
    id: 'resultats',
    title: 'Résultats et Optimisation',
    color: '#FFB700', // Jaune doré
    glowColor: 'rgba(255, 183, 0, 0.5)',
    shadowColor: '0 0 30px rgba(245, 158, 11, 0.8)',
    items: [
      {
        question: "Quand puis-je m'attendre à voir les résultats de ma campagne ?",
        answer: "Les premiers résultats dépendent de votre objectif :\n\n• **Conversions (ventes, leads)** : Généralement visibles dans les **2 à 4 semaines**, le temps que les algorithmes publicitaires s'optimisent.\n\n• **Notoriété** : Effet immédiat, mais impact mesurable sur quelques mois.\n\n• **Trafic** : Augmentation perceptible dès les premiers jours.\n\nDigiqo suit vos performances **en continu** et ajuste les campagnes pour **maximiser les résultats** sur la durée. 🚀"
      },
      {
        question: "Comment mesurez-vous les performances des campagnes ?",
        answer: "Nous utilisons des **indicateurs clés de performance (KPI)** adaptés à vos objectifs, tels que :\n\n• **Conversions** : Nombre de ventes, leads ou actions spécifiques générées.\n\n• **Retour sur investissement publicitaire (ROAS)** : Mesure du chiffre d'affaires généré par rapport au budget dépensé.\n\n• **Engagement** : Clics, partages, réactions et commentaires sur les annonces.\n\n• **Trafic** : Volume et qualité des visiteurs redirigés vers votre site.\n\nUn **rapport régulier** vous est envoyé avec une analyse claire et des recommandations pour **optimiser vos résultats**. 📊"
      },
      {
        question: "Que se passe-t-il si mes campagnes ne fonctionnent pas comme prévu ?",
        answer: "Chez Digiqo, nous analysons les performances **en continu** pour identifier les points à améliorer. Si une campagne ne donne pas les résultats attendus, nous :\n\n• **Réalisons un audit** : Analyse approfondie des visuels, audiences, et placements.\n\n• **Ajustons la stratégie** : Optimisation des textes, budgets ou cibles.\n\n• **Testons de nouvelles approches** : A/B testing pour trouver ce qui fonctionne le mieux.\n\nNotre priorité est de **maximiser votre retour sur investissement** et de réagir rapidement pour corriger la trajectoire. 🚀"
      }
    ]
  },
  {
    id: 'assistance',
    title: 'Assistance et Suivi',
    color: '#FF69B4', // Rose chaud
    glowColor: 'rgba(255, 105, 180, 0.5)',
    shadowColor: '0 0 30px rgba(236, 72, 153, 0.8)',
    items: [
      {
        question: "Comment contacter mon expert marketing dédié ?",
        answer: "Vous pouvez joindre votre expert marketing à tout moment via :\n\n• **Google Chat** : Dans le canal dédié intégré lors de l'onboarding avec votre expert marketing Digiqo.\n\n• **Appel téléphonique** : En cas d'urgence ou pour une discussion approfondie.\n\nLes coordonnées complètes de votre expert vous sont communiquées dès le début de notre collaboration. 📞"
      },
      {
        question: "Proposez-vous un service de support après la campagne ?",
        answer: "Oui, Digiqo vous accompagne même après la fin de vos campagnes :\n\n• **Analyse des résultats** : Bilan détaillé des performances et recommandations pour l'avenir.\n\n• **Optimisation continue** : Possibilité de relancer ou ajuster les campagnes selon vos objectifs.\n\n• **Support technique** : Assistance pour tout problème lié à vos publicités ou outils digitaux.\n\nNotre objectif est de **maximiser votre succès à long terme**. 💡"
      },
      {
        question: "Que faire si je rencontre un problème avec mes publicités ?",
        answer: "Si vous rencontrez un problème avec vos publicités, voici la marche à suivre :\n\n1. **Contactez immédiatement** votre expert marketing dédié via **Google Chat** ou **téléphone**.\n\n2. **Décrivez le problème** en détail (captures d'écran si possible).\n\n3. Notre équipe **interviendra rapidement** pour diagnostiquer et résoudre le problème.\n\n4. Nous vous tiendrons **informé de chaque étape** de la résolution.\n\nNotre **support réactif** est là pour garantir le bon fonctionnement de vos campagnes en permanence."
      }
    ]
  },
  {
    id: 'autres',
    title: 'Autres',
    color: '#FFFAF0', // Blanc chaud
    glowColor: 'rgba(255, 250, 240, 0.5)',
    shadowColor: '0 0 30px rgba(6, 182, 212, 0.8)',
    items: [
      {
        question: "Travaillez-vous uniquement avec des clients de Métropole ?",
        answer: "Non, nous collaborons avec des clients de la **France métropolitaine**, **DOM, TOM** et **l'international**. Grâce à nos outils digitaux et nos process, nous pouvons accompagner efficacement les entreprises, **où qu'elles soient**. 🌍"
      },
      {
        question: "Comment puis-je devenir partenaire ou collaborateur de Digiqo ?",
        answer: "Pour rejoindre notre réseau ou collaborer avec nous :\n\n1. **Contactez-nous** via notre page de contact ou par email à **contact@digiqo.fr**.\n\n2. **Expliquez votre proposition** : Services complémentaires, partenariat stratégique ou collaboration en freelance.\n\n3. Nous **étudierons votre demande** et reviendrons vers vous rapidement.\n\nNous sommes toujours ouverts à des collaborations qui apportent de la **valeur à nos clients** et à notre équipe. 🤝"
      },
    ]
  }
];