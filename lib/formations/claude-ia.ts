import type { Formation } from './types'

export const formationClaudeIA: Formation = {
  id: 'claude-ia',
  slug: 'maitriser-claude-ia',
  title: 'Maîtriser Claude IA',
  category: 'ia',
  description: "L'Assistant IA qui Transforme votre Business — Du prompt engineering aux automatisations avec Cowork, en passant par les artifacts et les intégrations MCP.",
  duration: '8 heures',
  level: 'Débutant',
  instructor: 'Digiqo Academy',
  certification: true,
  keywords: [
    'Claude IA', 'Anthropic', 'intelligence artificielle', 'prompt engineering',
    'Claude Opus', 'Claude Sonnet', 'IA pour entreprise', 'productivité IA',
    'automatisation IA', 'Cowork Claude', 'artifacts', 'MCP', 'skills Claude',
    'IA La Réunion', 'formation IA', 'ChatGPT alternative', 'IA générative',
    'LLM', 'recherche approfondie', 'Claude Code', 'IA business', 'Digicademy'
  ],
  introduction: {
    title: "L'IA a changé — et Claude mène la danse",
    content: [
      "En 2025, Claude d'Anthropic est devenu l'application la plus téléchargée aux États-Unis sur l'App Store. Des millions d'utilisateurs quittent ChatGPT pour passer sur Claude. Ce n'est pas un hasard : Claude n'est pas un simple chatbot, c'est un véritable partenaire de réflexion conçu pour collaborer avec vous sur des tâches complexes.",
      "La plupart des gens n'utilisent que 20 % des capacités de Claude. Ils posent une question, obtiennent une réponse, et s'arrêtent là. Cette formation vous apprend à exploiter tout l'écosystème Claude pour gagner des heures chaque semaine dans votre activité professionnelle.",
      "Cette formation est faite pour vous si vous êtes entrepreneur, dirigeant d'agence, responsable marketing, commercial ou freelance, que vous avez déjà utilisé une IA conversationnelle (ChatGPT, Gemini, etc.) mais que vous voulez passer au niveau supérieur avec Claude.",
      "Pas de théorie abstraite. Chaque module contient des cas d'usage concrets orientés business et agence digitale, avec des exemples directement applicables à votre quotidien professionnel."
    ],
    objectives: [
      "Comprendre ce qu'est Claude, ses modèles et ce qui le différencie des autres IA",
      "Maîtriser les capacités et connaître les limites de Claude",
      "Structurer des prompts efficaces avec le framework en 3 étapes d'Anthropic",
      "Appliquer les 6 techniques avancées de prompt engineering",
      "Utiliser le mode Cowork pour automatiser la gestion de fichiers et la recherche web",
      "Créer des artifacts interactifs (dashboards, landing pages, outils)",
      "Configurer des Projets Claude avec une base de connaissance dédiée",
      "Exploiter la recherche approfondie pour des rapports sourcés",
      "Connecter Claude à vos outils grâce au protocole MCP et aux Skills",
      "Appliquer Claude à des cas d'usage concrets : propositions commerciales, analyses, briefs"
    ]
  },
  modules: [
    {
      id: 'module-1',
      title: 'Module 1 — Comprendre l\'IA derrière Claude',
      description: 'Avant d\'utiliser Claude efficacement, il faut comprendre ce qui se passe sous le capot.',
      content: [
        "### L'IA, le Machine Learning et l'IA Générative",
        "L'intelligence artificielle est un domaine gigantesque. À l'intérieur, on trouve le machine learning : des programmes qui apprennent à partir de données pour faire des prédictions. Par exemple, un programme qui analyse des milliers de photos de pommes pour prédire si une nouvelle pomme est mûre.",
        "À l'intérieur du machine learning se trouve l'IA générative. Contrairement au ML classique qui analyse, l'IA générative **crée du nouveau contenu** : texte, images, code, audio — du contenu qui n'existait pas avant.",
        "",
        "### Les LLM : le moteur de Claude",
        "Les LLM (Large Language Models) sont les stars de l'IA générative. Un LLM est un modèle entraîné sur une quantité astronomique de textes — quasiment tout internet — et qui a appris les patterns du langage humain. C'est ce qui lui permet de comprendre vos questions et de générer des réponses pertinentes.",
        "Claude est le LLM créé par **Anthropic**, l'entreprise américaine aujourd'hui considérée comme le concurrent numéro 1 d'OpenAI.",
        "",
        "### Ce qui rend Claude unique : la Constitution IA",
        "Claude n'est pas juste un chatbot. Anthropic le positionne comme un \"partenaire de réflexion\" — quelqu'un avec qui vous allez réfléchir, brainstormer et résoudre des problèmes complexes.",
        "Ce qui différencie Claude des autres IA, c'est sa Constitution IA, construite sur trois principes fondamentaux :",
        "- **Être serviable (Helpful)** : Claude cherche à vous aider de la manière la plus pertinente possible",
        "- **Être inoffensif (Harmless)** : Claude évite les réponses toxiques et refuse d'aider dans des activités illégales",
        "- **Être honnête (Honest)** : Claude est transparent sur ses limites et ne cherche pas à vous tromper",
        "Ce sont les fameux \"3H\" d'Anthropic : Helpful, Harmless, Honest."
      ],
      keyPoints: [
        "L'IA générative crée du contenu, contrairement au ML classique qui analyse",
        "Les LLM sont entraînés sur des milliards de textes pour comprendre et produire du langage",
        "Claude est le LLM d'Anthropic, concurrent direct d'OpenAI",
        "La Constitution IA (les \"3H\") est ce qui différencie Claude",
        "Comprendre ces bases permet d'utiliser l'outil intelligemment"
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2 — Les modèles Claude et comment y accéder',
      description: 'Claude n\'est pas un seul modèle mais une famille. Savoir lequel utiliser et quand.',
      content: [
        "### Claude Opus : la puissance brute",
        "Claude Opus est le modèle le plus puissant de la famille Anthropic. La version actuelle, Claude Opus 4.6, se classe parmi les meilleurs modèles du marché sur les tâches exigeantes : raisonnement complexe, analyse scientifique, programmation avancée et analyse financière.",
        "**Quand l'utiliser :** analyses stratégiques poussées, audit financier, code complexe, documents juridiques.",
        "",
        "### Claude Sonnet : votre outil du quotidien",
        "Claude Sonnet est le modèle recommandé par défaut. Plus rapide qu'Opus, il est largement suffisant pour la majorité de vos besoins professionnels quotidiens.",
        "**Quand l'utiliser :** emails, propositions commerciales, briefs, résumés de réunion, analyse de campagnes.",
        "",
        "### La réflexion approfondie (Extended Thinking)",
        "Les deux modèles supportent la réflexion approfondie. Claude peut littéralement réfléchir étape par étape avant de vous répondre. C'est ultra puissant pour les problèmes complexes.",
        "",
        "### Accéder à Claude : web, desktop et mobile",
        "- **claude.ai** : directement dans votre navigateur",
        "- **Application desktop** : sur Mac ou Windows, avec des fonctionnalités exclusives (Cowork, saisie rapide)",
        "- **Application mobile** : iOS et Android, synchronisée avec vos autres appareils",
        "Pour un usage professionnel sérieux, le plan payant (Pro à 20$/mois) est indispensable."
      ],
      keyPoints: [
        "Opus = puissance maximale pour les tâches complexes et exigeantes",
        "Sonnet = rapidité et efficacité pour le quotidien professionnel",
        "La réflexion approfondie permet un raisonnement étape par étape",
        "L'application desktop offre des fonctionnalités exclusives essentielles",
        "Un plan payant est nécessaire pour un usage professionnel complet"
      ]
    },
    {
      id: 'module-3',
      title: 'Module 3 — Capacités et limites : utiliser Claude intelligemment',
      description: 'Comprendre ce que Claude sait faire et surtout ce qu\'il ne sait pas faire.',
      content: [
        "### Ce que Claude sait faire",
        "**Écriture et création de contenu** : Claude excelle dans la collaboration rédactionnelle — posts, emails professionnels, rapports, propositions commerciales. Il respecte réellement vos instructions de ton et de style tout au long de la conversation.",
        "**Recherche et analyse** : Claude peut analyser des documents, explorer des angles de recherche et synthétiser des données complexes en quelques minutes.",
        "**Code** : Claude Opus est considéré comme le meilleur modèle de code au monde. Il écrit, débugge et explique du code dans pratiquement tous les langages.",
        "**Raisonnement** : Avec la réflexion approfondie, Claude travaille étape par étape sur des problèmes mathématiques, des analyses stratégiques ou des recherches complexes.",
        "",
        "### Les 4 limites à connaître absolument",
        "**1. Les hallucinations** : Claude peut parfois affirmer quelque chose avec une confiance totale alors que c'est faux. Vérifiez toujours les informations factuelles critiques.",
        "**2. La coupure de connaissance** : Claude a été entraîné à un moment précis. Tout ce qui s'est passé après cette date, il ne le connaît pas nativement.",
        "**3. La fenêtre de contexte** : La capacité de Claude à ingérer et mémoriser les informations a une limite. Avantage : il compresse automatiquement le contexte ancien.",
        "**4. Le non-déterminisme** : Posez deux fois la même question, vous pourriez obtenir deux réponses légèrement différentes.",
        "",
        "### Application agence : comment gérer ces limites",
        "- **Hallucinations** : ne jamais envoyer un rapport client sans relecture humaine",
        "- **Coupure de connaissance** : toujours activer la recherche web pour les données récentes",
        "- **Fenêtre de contexte** : utiliser les Projets Claude pour stocker les informations persistantes",
        "- **Non-déterminisme** : utile pour tester plusieurs angles créatifs"
      ],
      keyPoints: [
        "Claude excelle en écriture, recherche, code et raisonnement complexe",
        "4 limites : hallucinations, coupure de connaissance, fenêtre de contexte, non-déterminisme",
        "Claude compresse automatiquement le contexte — un avantage majeur",
        "En contexte agence, chaque limite a une parade concrète",
        "La règle d'or : vérifier les infos critiques, toujours"
      ]
    },
    {
      id: 'module-4',
      title: 'Module 4 — Les 3 niveaux d\'interaction avec Claude',
      description: 'La majorité des utilisateurs restent bloqués au premier niveau. Passez aux niveaux 2 et 3.',
      content: [
        "### Niveau 1 : l'Automation",
        "C'est le mode que tout le monde utilise. Vous donnez une instruction précise, Claude exécute.",
        "- \"Résume ce document\"",
        "- \"Traduis cet email en anglais\"",
        "- \"Corrige les fautes dans ce texte\"",
        "C'est utile mais basique. La plupart des gens s'arrêtent là.",
        "",
        "### Niveau 2 : l'Augmentation",
        "C'est ici que Claude devient vraiment puissant. Vous réfléchissez ensemble. Vous brainstormez, vous itérez, vous construisez une idée à deux.",
        "**Exemples concrets pour une agence :**",
        "- Construire une stratégie de campagne Meta Ads en discutant des objectifs, du budget, des audiences",
        "- Analyser un brief client et co-construire une recommandation",
        "- Itérer sur un pitch commercial en challengeant chaque argument",
        "Le principe : la première réponse de Claude est un point de départ, pas un résultat final.",
        "",
        "### Niveau 3 : l'Agency (l'Agentique)",
        "C'est le niveau le plus avancé. Vous configurez Claude pour qu'il travaille de façon autonome.",
        "- Trier automatiquement vos emails une fois par semaine",
        "- Générer un brief compétitif hebdomadaire sur votre marché",
        "- Planifier des tâches récurrentes via le mode Cowork",
        "C'est la combinaison de l'augmentation et de l'agency qui fait de Claude un outil transformateur."
      ],
      keyPoints: [
        "Automation = instruction → exécution (le niveau basique)",
        "Augmentation = réflexion collaborative — la vraie puissance de Claude",
        "Agency = travail autonome — Claude comme employé virtuel",
        "La plupart des gens restent au niveau 1, la valeur est aux niveaux 2 et 3",
        "Passer du niveau 1 au niveau 2 ne demande qu'un changement de mentalité"
      ]
    },
    {
      id: 'module-5',
      title: 'Module 5 — Prompt Engineering : le framework en 3 étapes',
      description: 'La qualité de ce que Claude produit dépend directement de la qualité de ce que vous lui demandez.',
      content: [
        "### Étape 1 : Poser le contexte",
        "Dites à Claude qui vous êtes, quel est votre objectif et quel est le contexte de votre projet. Sans contexte, Claude donne des réponses génériques.",
        "**Mauvais :** \"Écris-moi un email pour un client\"",
        "**Bon :** \"Je suis le directeur d'une agence de publicité en ligne à La Réunion. Mon client est un restaurant qui veut lancer sa première campagne Instagram. Il a un budget de 500€/mois et n'a jamais fait de pub en ligne.\"",
        "",
        "### Étape 2 : Définir la tâche",
        "Qu'est-ce que vous voulez que Claude fasse concrètement ? Soyez précis sur le livrable attendu.",
        "**Mauvais :** \"Aide-moi avec ma campagne\"",
        "**Bon :** \"Crée-moi une recommandation stratégique avec : objectifs de campagne, ciblage recommandé, budget réparti par semaine, 3 idées de visuels avec leurs accroches, et les KPIs à suivre.\"",
        "",
        "### Étape 3 : Spécifier les règles",
        "Définissez la tonalité, le style, le format de sortie. Posez-vous la question : est-ce que j'ai des exemples à fournir ?",
        "",
        "### Tableau des erreurs courantes",
        "- Réponse trop générique → Ajoutez qui vous êtes, votre secteur, votre objectif",
        "- Réponse trop longue ou courte → Spécifiez \"en 200 mots\" ou \"en 2 pages maximum\"",
        "- Mauvais format → Montrez un exemple du format attendu",
        "- Informations fausses → Demandez des sources, activez la recherche web",
        "- Ton inadapté → Décrivez explicitement le ton souhaité"
      ],
      keyPoints: [
        "Contexte + Tâche + Règles = le framework en 3 étapes d'Anthropic",
        "Sans contexte, Claude donne des réponses génériques",
        "Plus vous êtes précis sur le format, plus le résultat correspond",
        "Le tableau des erreurs courantes est votre guide de dépannage rapide",
        "Un bon prompt transforme une réponse moyenne en réponse excellente"
      ]
    },
    {
      id: 'module-6',
      title: 'Module 6 — Techniques avancées de prompting',
      description: '6 techniques combinables pour des résultats de niveau expert.',
      content: [
        "### Technique 1 : Donner du contexte (toujours)",
        "Soyez précis sur le pourquoi : pourquoi vous avez besoin de ce livrable, pour qui il est destiné, dans quel contexte il sera utilisé. Le \"pourquoi\" change radicalement la réponse.",
        "",
        "### Technique 2 : Montrer des exemples (Few-Shot Prompting)",
        "Parfois, montrer c'est bien mieux qu'expliquer. Donnez 2-3 exemples de ce que vous attendez et Claude reproduira le pattern. Vous pouvez fournir des images, des captures d'écran, des sites web, des tableaux.",
        "",
        "### Technique 3 : Spécifier les contraintes",
        "- \"En 200 mots maximum\"",
        "- \"Sous forme de tableau avec 4 colonnes\"",
        "- \"Format email professionnel avec objet, salutation et signature\"",
        "",
        "### Technique 4 : Décomposer en étapes (Chain of Thought)",
        "Pour les tâches complexes, guidez Claude étape par étape. C'est le Chain of Thought Prompting — une chaîne de raisonnement qui guide Claude vers la meilleure solution.",
        "",
        "### Technique 5 : Demander de réfléchir avant de répondre",
        "Ajoutez simplement : \"Réfléchis d'abord au problème, considère les différents facteurs, puis donne-moi ta meilleure recommandation.\"",
        "",
        "### Technique 6 : Définir un rôle ou un ton",
        "- \"Parle-moi comme un expert en Meta Ads certifié\"",
        "- \"Adopte le ton d'un consultant en stratégie digitale\"",
        "- \"Explique-moi comme si je n'avais jamais fait de pub en ligne\"",
        "",
        "### Technique bonus : faire améliorer votre prompt par Claude",
        "Demandez à Claude de vous écrire un meilleur prompt. \"Je veux obtenir tel résultat. Peux-tu m'écrire un meilleur prompt pour y arriver ?\" C'est une technique recommandée par Anthropic.",
        "",
        "### Technique bonus : exiger l'objectivité",
        "Demandez toujours à Claude d'être 100 % objectif. Les IA ont tendance à aller dans le sens de l'utilisateur. Ajoutez : \"Sois critique et objectif, dis-moi ce qui ne va pas autant que ce qui va.\""
      ],
      keyPoints: [
        "6 techniques combinables : contexte, exemples, contraintes, étapes, réflexion, rôle",
        "Le Few-Shot Prompting (exemples) est la technique la plus sous-utilisée",
        "Le Chain of Thought est idéal pour les analyses complexes",
        "Faire améliorer son prompt par Claude est une technique officielle d'Anthropic",
        "Toujours exiger l'objectivité pour éviter le biais de complaisance"
      ]
    },
    {
      id: 'module-7',
      title: 'Module 7 — L\'application desktop : Chat, Cowork et Claude Code',
      description: 'L\'application desktop cache trois modes d\'utilisation distincts.',
      content: [
        "### Le mode Chat : votre assistant classique amélioré",
        "Le mode Chat sur desktop, c'est le Claude classique mais avec un super-pouvoir exclusif : la **saisie rapide**.",
        "Double-cliquez sur la touche Option (Mac) et Claude apparaît par-dessus votre travail en cours. Posez votre question, obtenez la réponse, sans jamais quitter ce que vous faites.",
        "**Cas d'usage :** Vous êtes dans Meta Business Manager. Vous double-cliquez Option, envoyez un screenshot de vos métriques et demandez \"Qu'est-ce que tu penses de ces résultats ?\"",
        "",
        "### Le mode Cowork : Claude accède à vos fichiers et au web",
        "C'est la révolution. Cowork permet à Claude de travailler directement avec les fichiers de votre ordinateur, de faire des recherches autonomes sur le web et d'exécuter des tâches planifiées.",
        "**Ce que Cowork peut faire :**",
        "- Trier et ranger vos fichiers par catégorie",
        "- Lire des rapports, croiser des données et produire des synthèses",
        "- Ouvrir des applications et créer des documents structurés",
        "- Programmer des tâches récurrentes (brief hebdomadaire, reporting automatique)",
        "",
        "### Le mode Claude Code : l'environnement de développement",
        "Claude Code est un environnement de développement complet intégré dans l'application desktop, votre terminal ou votre IDE.",
        "**Ce que Claude Code peut faire :**",
        "- Lire et modifier votre code",
        "- Exécuter des commandes",
        "- Gérer les versions avec Git",
        "- Construire des applications complètes",
        "Même si vous n'êtes pas développeur, Claude Code permet de créer des sites web, des applications et des automatisations en décrivant simplement ce que vous voulez."
      ],
      keyPoints: [
        "L'application desktop offre 3 modes : Chat, Cowork et Claude Code",
        "La saisie rapide (Option+Option) est un gain de productivité immédiat",
        "Cowork donne à Claude l'accès à vos fichiers et au web",
        "Les tâches récurrentes dans Cowork automatisent votre routine",
        "Claude Code permet de créer des applications même sans être développeur"
      ]
    },
    {
      id: 'module-8',
      title: 'Module 8 — Projets, Artifacts et Recherche approfondie',
      description: 'Trois fonctionnalités avancées qui transforment Claude en plateforme de travail.',
      content: [
        "### Les Projets : votre base de connaissance dédiée",
        "Un Projet Claude, c'est un espace de travail dédié avec sa propre base de connaissance. Vous uploadez vos documents et Claude les a en mémoire dans toutes les conversations de ce projet.",
        "**Application agence — un Projet par client :**",
        "- Projet \"Client Restaurant X\" : brief, charte graphique, historique campagnes",
        "- Projet \"Client Immobilier Y\" : guidelines, catalogue produits, personas",
        "- Projet \"Interne Digiqo\" : process internes, templates, formation équipe",
        "",
        "### Les Artifacts : des résultats interactifs et visuels",
        "Les Artifacts, ce sont des résultats interactifs que Claude crée en direct : pages web fonctionnelles, dashboards interactifs, diagrammes, composants React, calculateurs.",
        "**Ce que vous pouvez faire avec un artifact :**",
        "- Le tester directement dans la conversation",
        "- Le modifier en temps réel par simple demande",
        "- Le télécharger, le partager via un lien, le publier en ligne",
        "",
        "### La recherche approfondie : votre assistant de recherche pro",
        "Claude lance automatiquement des dizaines de recherches, explore différents angles, croise les sources et livre un rapport complet avec des citations vérifiables.",
        "**Durée :** 5 à 45 minutes selon la complexité.",
        "**Avantage clé :** Chaque affirmation est liée à sa source. Vous pouvez tout vérifier.",
        "**Comment l'activer :** Cliquez sur le bouton \"Research\" en bas à gauche de votre chat."
      ],
      keyPoints: [
        "Les Projets = une base de connaissance par client ou par sujet",
        "Les Artifacts = des livrables interactifs et visuels, pas juste du texte",
        "La recherche approfondie = un rapport sourcé en quelques minutes",
        "Créez un Projet par client pour ne jamais réexpliquer le contexte",
        "Activez la recherche approfondie pour tout travail nécessitant des données fiables"
      ]
    },
    {
      id: 'module-9',
      title: 'Module 9 — L\'écosystème Claude : MCP, intégrations et Skills',
      description: 'Comment connecter Claude à tous vos outils et lui créer des compétences réutilisables.',
      content: [
        "### Le protocole MCP : connecter Claude à vos outils",
        "MCP (Model Context Protocol) est le protocole créé par Anthropic pour connecter Claude à vos outils du quotidien.",
        "**Intégrations disponibles :**",
        "- **Slack** : résumer vos conversations, rédiger des réponses",
        "- **Excel** : lire, analyser, modifier et créer des tableaux",
        "- **Google Chrome** : assistant de navigation",
        "- **Google Workspace** : accès à vos Docs, Sheets, Gmail, Calendar",
        "- **Notion, Airtable, HubSpot** : et bien d'autres connecteurs",
        "",
        "### Les Skills : vos employés virtuels spécialisés",
        "Les Skills, c'est la possibilité de créer des workflows réutilisables. Un Skill = un template + des règles, applicable d'un simple mot.",
        "**Exemple — Skill \"Constructeur de Brief\" :**",
        "1. Vous définissez votre template de brief",
        "2. Vous définissez vos règles (ton, longueur, structure)",
        "3. Vous dites : \"Utilise mon constructeur de brief pour transformer ces notes en brief propre\"",
        "4. Claude applique le Skill : bon template, bons headers, bon format, à chaque fois",
        "",
        "**Autres idées de Skills :**",
        "- Générateur de propositions commerciales",
        "- Créateur de présentations PowerPoint",
        "- Rédacteur de rapports de campagne",
        "- Rédacteur de posts réseaux sociaux par plateforme",
        "",
        "### La tonalité personnalisée",
        "Claude permet de l'entraîner sur votre propre tonalité. Créez une tonalité par client et changez en un clic."
      ],
      keyPoints: [
        "MCP connecte Claude à Slack, Excel, Chrome, Google Workspace et bien plus",
        "Les Skills sont des workflows réutilisables = vos employés virtuels",
        "Un Skill = un template + des règles, applicable d'un simple mot",
        "Claude détecte souvent automatiquement quel Skill activer",
        "La tonalité personnalisée permet un style d'écriture cohérent par client"
      ]
    },
    {
      id: 'module-10',
      title: 'Module 10 — Cas d\'usage concrets pour votre business',
      description: 'Tout ce que vous avez appris, appliqué à des situations réelles.',
      content: [
        "### Transformer des notes en proposition commerciale",
        "Vous venez de finir un appel avec un prospect. En un seul prompt bien structuré, Claude transforme vos notes en vrac en document professionnel prêt à envoyer. 30 secondes au lieu de 45 minutes.",
        "",
        "### Préparer un rendez-vous commercial",
        "Demandez à Claude de faire une recherche sur l'entreprise : présence en ligne, campagnes visibles, forces et faiblesses digitales. Il crée un document de préparation avec arguments et questions pertinentes.",
        "",
        "### Analyser les performances de campagne",
        "Collez les métriques de votre campagne Meta Ads. Claude analyse par rapport aux benchmarks du secteur, identifie ce qui fonctionne et propose 5 recommandations concrètes d'optimisation.",
        "",
        "### Adapter du contenu d'une plateforme à l'autre",
        "Un post LinkedIn qui a bien marché ? Claude le décline en carousel Instagram (10 slides), script de Reel de 30 secondes, et story Facebook en 3 frames.",
        "",
        "### Construire un modèle financier ou analyser un tableur",
        "Uploadez un Google Sheet complexe. Claude explique les formules, la logique de calcul, détecte les erreurs et propose une version simplifiée.",
        "",
        "### Prototyper une landing page avec les Artifacts",
        "Décrivez la page souhaitée. Claude la construit en direct devant vos yeux. Vous la montrez à votre client, récupérez ses retours, et itérez en temps réel.",
        "",
        "**La clé : toujours traiter la première réponse comme un point de départ et itérer.**"
      ],
      keyPoints: [
        "Claude transforme des notes en vrac en documents professionnels en 30 secondes",
        "La préparation de RDV avec recherche automatique est un avantage compétitif majeur",
        "L'analyse de performance avec recommandations remplace des heures de travail manuel",
        "Les Artifacts permettent de prototyper des landing pages en direct avec le client",
        "La clé : toujours traiter la première réponse comme un point de départ et itérer"
      ]
    }
  ],
  conclusion: {
    title: 'Prochaines étapes',
    content: [
      "Vous avez maintenant toutes les clés pour exploiter Claude à son plein potentiel dans votre activité professionnelle.",
      "Commencez par installer l'application desktop, créer votre premier Projet avec vos documents, et appliquer le framework en 3 étapes sur votre prochaine tâche. Puis testez la recherche approfondie, créez votre premier Skill, et explorez les intégrations MCP.",
      "Cette formation est basée sur la formation officielle d'Anthropic, synthétisée et adaptée au contexte business et agence digitale francophone par Digiqo Academy."
    ]
  },
  nextSteps: [
    "Installer l'application desktop Claude et activer le plan Pro",
    "Créer votre premier Projet avec les documents de votre entreprise",
    "Appliquer le framework en 3 étapes sur votre prochaine tâche",
    "Tester la recherche approfondie sur un sujet lié à votre secteur",
    "Créer votre premier Skill : un constructeur de brief ou template de reporting",
    "Configurer une tâche récurrente Cowork",
    "Explorer les intégrations MCP (Slack, Google Workspace, etc.)"
  ]
}
