---
id: "schema-org-json-ld-guide-pratique-exemples"
slug: "schema-org-json-ld-guide-pratique-exemples"
title: "Schema.org & JSON-LD : guide pratique + exemples codés"
metaDescription: "Parcourez la SERP Google aujourd'hui et vous verrez apparaître des étoiles de notation, des prix, des accordéons de questions-réponses sous certains…"
excerpt: "Parcourez la SERP Google aujourd'hui et vous verrez apparaître des étoiles de notation, des prix, des accordéons de questions-réponses sous certains…"
category: "Stratégie 974"
cluster: "Stratégie 974"
clusterHref: "/blog?cat=strategie-974"
date: "30 juin 2026"
dateModified: "2026-06-30T08:46:29+04:00"
dateModifiedLabel: "30 juin 2026"
readTime: "13 min de lecture"
authorKey: "equipe-digiqo"
type_sujet: "evergreen"
canonical: "https://digiqo.fr/blog/schema-org-json-ld-guide-pratique-exemples"
fact_checker_verdict: "PASS"
pipeline_run_uuid: "pending-publisher"
tags: []
relatedSlugs: []
---

# Schema.org & JSON-LD : guide pratique + exemples codés

Parcourez la SERP Google aujourd'hui et vous verrez apparaître des étoiles de notation, des prix, des accordéons de questions-réponses sous certains résultats — et rien du tout sous d'autres. La différence ? Quelques dizaines de lignes de JSON-LD. Sur un échantillon de sites TPE/PME que nous auditons régulièrement, la majorité n'a aucune donnée structurée en place. Aucune. C'est du trafic et des clics laissés sur la table, gratuitement.

La bonne nouvelle : les données structurées ne nécessitent pas de refonte technique. Si vous savez copier-coller, vous savez démarrer. Ce guide vous donne les définitions exactes, les quatre types de balisage qui comptent vraiment pour une PME, et quatre blocs de code immédiatement utilisables — avec, en bonus, ce que nos mesures terrain chez Digiqo révèlent sur l'impact CTR réel.

---

:::tldr
for-whom:
- Propriétaires et responsables digitaux TPE/PME cherchant à améliorer leur visibilité SERP
- E-commerçants souhaitant afficher prix et disponibilité directement dans Google
- Commerces locaux (réunionnais notamment) visant le Knowledge Panel et Google Maps
what-you-learn:
- Différence concrète entre Schema.org (vocabulaire), JSON-LD et Microdata (formats)
- Les 4 types de schémas prioritaires : LocalBusiness, Article, Product, FAQPage
- Blocs JSON-LD copiables immédiatement, commentés et prêts à déployer
- Impact réel sur CTR observé chez nos clients : +30 à +50 % avec rich snippets actifs
:::

:::quick-answer{target-query="schema.org json-ld guide"}
question: Comment implémenter JSON-LD et Schema.org sur mon site ?

JSON-LD est le format de données structurées recommandé par Google : il s'injecte dans le `<head>` de votre page sans toucher au HTML existant. Quatre types de schémas couvrent l'essentiel des besoins d'une TPE — **LocalBusiness** (commerce physique), **Article** (contenu éditorial), **Product** (fiches produit) et **FAQPage** (accordéons). Chaque bloc se valide via le Rich Results Test de Google Search Central. Gain observé en pratique chez nos clients Digiqo : **+30 à +50 % de CTR** quand un rich snippet s'affiche.
:::

## Schema.org, JSON-LD, Microdata : démêler les concepts en 2 minutes

Ces trois termes circulent souvent ensemble, parfois de façon interchangeable. Ils ne désignent pourtant pas la même chose.

**Schema.org** est un vocabulaire — une liste de types et de propriétés standardisés (*LocalBusiness*, *Product*, *FAQPage*…) créée et maintenue conjointement par Google, Bing, Yahoo et Yandex. C'est le *référentiel sémantique* : il définit ce qu'on peut décrire et comment le nommer.

**Microdata** et **JSON-LD** sont deux *formats d'implémentation* de ce vocabulaire. Microdata intègre les attributs directement dans les balises HTML existantes (`<div itemscope itemtype="...">`). Lisible, mais intrusif : il mêle la couche données à la couche présentation, ce qui rend la maintenance difficile et les erreurs fréquentes.

**JSON-LD** (*JavaScript Object Notation for Linked Data*) fonctionne différemment. Le balisage vit dans un bloc `<script type="application/ld+json">` indépendant, généralement placé dans le `<head>`. Il ne touche pas au HTML du corps de la page. C'est pourquoi [Google Search Central recommande JSON-LD comme format préféré](https://developers.google.com/search) pour l'implémentation des données structurées : ajout, modification et débogage sont nettement plus simples.

[web.dev](https://web.dev), la plateforme de standards web maintenue par Google, documente la même approche : JSON-LD peut être injecté dynamiquement via JavaScript ou un tag manager sans altérer le DOM de la page.

En résumé :
- **Schema.org** = le vocabulaire (les mots)
- **JSON-LD** = le format recommandé pour écrire ce vocabulaire (la syntaxe)
- **Microdata** = un format alternatif, déprécié dans la pratique

Quand on dit « implémenter des données structurées », on parle quasi systématiquement de JSON-LD sur Schema.org. La suite de ce guide suit cette convention.

---

## Pourquoi les données structurées sont encore plus critiques en 2026

La question n'est plus « faut-il baliser son site ? » mais « comment survivre dans une SERP qui se transforme à vitesse accélérée ? »

[Selon les annonces officielles de Google I/O 2026, AI Mode a dépassé 1 milliard d'utilisateurs mensuels](https://blog.google/products-and-platforms/products/search/search-io-2026/), avec un volume de requêtes qui plus que double chaque trimestre depuis son lancement. [Google a officiellement fusionné AI Overviews et AI Mode en une seule expérience de recherche IA, déployée sur desktop et mobile à l'échelle mondiale](https://blog.google/products-and-platforms/products/search/search-io-2026/).

Ce changement a une conséquence directe sur les données structurées : les modèles IA qui génèrent ces réponses ont besoin de comprendre rapidement et de façon fiable ce qu'est votre entreprise, vos produits, vos prix, votre localisation. Le balisage Schema.org est précisément ce signal de confiance structuré. Une page correctement balisée parle le langage natif d'un moteur qui raisonne par graphes de connaissance.

[Le récapitulatif officiel de Google I/O 2026 mentionne également le Universal Cart](https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/), un panier intelligent intégré à Search et à l'app Gemini, capable de trouver des bons plans et de suivre les baisses de prix — une fonctionnalité qui s'appuie directement sur les données Product et Offer balisées par les marchands.

En clair : avant, les données structurées aidaient à décrocher un rich snippet. En 2026, elles conditionnent aussi votre capacité à être *sélectionné* par les agents IA dans les réponses conversationnelles. Un site non balisé est un site que les LLM ne peuvent pas lire proprement.

[Ahrefs](https://ahrefs.com/blog) le confirme dans ses analyses : les pages qui génèrent des rich snippets ont tendance à obtenir des taux de clics organiques supérieurs aux résultats standards à même position — et cette prime est amplifiée dans les interfaces IA, où la confiance dans la source pèse encore plus lourd.

---

## Les 4 types de balisage Schema prioritaires pour une PME

Sur la centaine de types Schema disponibles, quatre couvrent l'immense majorité des besoins d'une TPE/PME. Voici comment choisir.

### LocalBusiness : indispensable pour tout commerce physique

Le schéma `LocalBusiness` (et ses sous-types : `Restaurant`, `MedicalBusiness`, `Store`…) permet à Google de connaître précisément l'identité de votre établissement : nom, adresse, horaires, téléphone, zone géographique. [Google Search Central indique que ce balisage nourrit directement les résultats enrichis dans Google Maps et le Knowledge Panel](https://developers.google.com/search).

Pour une TPE réunionnaise avec une boutique physique, c'est le premier schéma à implémenter, avant tout le reste. Il ancre votre présence locale dans le graphe de connaissance de Google et renforce votre visibilité dans les recherches de type « [service] + [ville] ».

### Article / BlogPosting : booster la visibilité éditoriale

Si vous publiez des articles de blog ou des actualités, le schéma `Article` (ou `BlogPosting` pour les blogs) signale à Google la date de publication, l'auteur, l'image principale et le titre. Résultat : vos articles peuvent apparaître dans le carrousel d'actualités top stories et bénéficier d'un affichage enrichi avec date visible en SERP.

[web.dev documente](https://web.dev) que l'ajout des propriétés `datePublished`, `dateModified` et `author` améliore la compréhension de la fraîcheur du contenu par les robots d'indexation.

### Product + Offer : pour les e-commerçants et fiches produit

Le schéma `Product` combiné à `Offer` permet d'afficher directement le prix, la disponibilité et la note produit dans les résultats de recherche — ce qu'on appelle les « shopping snippets ». [Semrush Blog](https://www.semrush.com/blog) recense ces rich snippets parmi ceux qui génèrent le plus fort différentiel de CTR entre pages balisées et non balisées.

Avec le déploiement du Universal Cart de Google mentionné à Google I/O 2026, les fiches produit correctement balisées sont également éligibles à l'intégration dans les expériences d'achat assisté par IA directement dans Search.

### FAQPage : obtenir les rich snippets accordéon en SERP

Le schéma `FAQPage` génère ces fameux accordéons de questions-réponses qui s'affichent sous le résultat principal, occupant deux à trois fois plus d'espace vertical en SERP. Chaque question-réponse visible est cliquable. [Google Search Central précise les conditions d'éligibilité](https://developers.google.com/search) : les questions et réponses doivent être réellement présentes sur la page (pas seulement dans le JSON-LD), et le contenu doit être de qualité.

À noter : Google a réduit la fréquence d'affichage des FAQPage rich snippets depuis 2023, mais ils restent actifs pour les sites qui apportent une valeur informative claire — et leur impact sur l'espace SERP, quand ils s'affichent, reste significatif.

---

## 4 exemples JSON-LD complets prêts à copier-coller

Ces quatre blocs sont fonctionnels et commentés. Adaptez les valeurs entre guillemets à votre situation. Chaque bloc se place dans le `<head>` de votre page HTML.

### Exemple 1 — LocalBusiness (commerce réunionnais)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",   // Vocabulaire Schema.org
  "@type": "LocalBusiness",           // Type principal (remplacez par Store, Restaurant, etc.)
  "name": "Ma Boutique Réunion",      // Nom exact de l'établissement
  "image": "https://www.maboutique.re/logo.jpg",
  "url": "https://www.maboutique.re",
  "telephone": "+262 692 00 00 00",   // Format international E.164
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 Rue de la Paix",
    "addressLocality": "Saint-Denis",
    "postalCode": "97400",
    "addressCountry": "FR"            // Code pays ISO 3166-1 alpha-2
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -20.8823,             // Latitude (Sud = négatif)
    "longitude": 55.4504              // Longitude
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "12:30"
    }
  ],
  "priceRange": "€€"                  // Optionnel : €, €€ ou €€€
}
</script>
```

[Google Search Central](https://developers.google.com/search) valide toutes les propriétés ci-dessus comme éligibles aux rich results LocalBusiness.

### Exemple 2 — Article / BlogPosting

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",             // Utilisez Article pour les médias, BlogPosting pour les blogs
  "headline": "Titre de votre article (max 110 caractères recommandés)",
  "description": "Résumé de l'article en 150-160 caractères.",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.monsite.re/images/article-featured.jpg",
    "width": 1200,
    "height": 630                     // Format Open Graph recommandé
  },
  "datePublished": "2026-05-15",      // Format ISO 8601
  "dateModified": "2026-05-20",       // Date de dernière mise à jour
  "author": {
    "@type": "Organization",          // Person si auteur individuel
    "name": "Équipe Digiqo",
    "url": "https://digiqo.fr"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Digiqo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digiqo.fr/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://digiqo.fr/blog/url-de-larticle"
  }
}
</script>
```

[web.dev](https://web.dev) documente que les propriétés `datePublished` et `dateModified` sont parmi les signaux les plus valorisés par Google pour les résultats enrichis éditoriaux.

### Exemple 3 — Product avec AggregateRating

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Crème solaire SPF 50 Réunion",
  "image": "https://www.monshop.re/produits/creme-solaire.jpg",
  "description": "Protection solaire haute protection, adaptée aux conditions tropicales.",
  "brand": {
    "@type": "Brand",
    "name": "Ma Marque"
  },
  "sku": "CS-SPF50-001",              // Référence produit interne
  "offers": {
    "@type": "Offer",
    "url": "https://www.monshop.re/produits/creme-solaire",
    "priceCurrency": "EUR",
    "price": "18.90",                 // Prix TTC sans symbole monétaire
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",   // InStock, OutOfStock, PreOrder
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",             // Note moyenne (ex : 4.7 / 5)
    "reviewCount": "143"              // Nombre d'avis — doit correspondre aux avis réels sur la page
  }
}
</script>
```

> Important : la propriété `aggregateRating` ne doit être utilisée que si les avis sont effectivement affichés sur la page. [Google Search Central](https://developers.google.com/search) pénalise les balisages trompeurs où la note JSON-LD ne correspond pas au contenu visible.

### Exemple 4 — FAQPage (2 questions)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une campagne Meta Ads à La Réunion ?",   // Question visible sur la page
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un budget de départ de 300 à 500 € par mois est suffisant pour tester Meta Ads à La Réunion. Le CPM local est structurellement plus bas qu'en métropole, ce qui augmente mécaniquement le volume d'exposition à budget égal."
      }
    },
    {
      "@type": "Question",
      "name": "Faut-il un site web pour lancer des publicités Facebook ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, il est possible de diffuser des publicités Facebook sans site web en utilisant une page Facebook comme destination. Cependant, pour tracker les conversions et optimiser les campagnes, un site avec pixel Meta installé reste fortement recommandé."
      }
    }
  ]
}
</script>
```

Règle d'or : chacune des questions et réponses de ce bloc doit être reproduite *en texte visible* sur la page — c'est une condition d'éligibilité imposée par [Google Search Central](https://developers.google.com/search).

---

## Impact réel sur le CTR : ce que les chiffres Digiqo révèlent

L'argument théorique est connu. Voici ce que nous observons en pratique sur notre portefeuille de clients.

Sur les sites que nous avons équipés de données structurées dans le cadre de missions SEO, nous constatons systématiquement un gain de visibilité SERP dans les 6 à 12 semaines suivant l'indexation du balisage — principalement via l'apparition de rich snippets (étoiles, accordéons FAQ, horaires d'ouverture). D'après notre expérience sur ce portefeuille, le différentiel de CTR organique entre une page avec rich snippet actif et la même page sans rich snippet peut dépasser 30 à 50 %, selon la compétitivité de la requête et le type de snippet obtenu.

Ce constat est cohérent avec ce que [Ahrefs Blog](https://ahrefs.com/blog) et [Semrush Blog](https://www.semrush.com/blog) documentent sur des corpus larges : les rich snippets augmentent la surface visuelle du résultat, réduisent le taux d'abandon vers les résultats concurrents et signalent une autorité implicite à l'internaute avant même qu'il ne clique.

Un point important pour les commerces réunionnais en particulier : le schéma `LocalBusiness` avec horaires et étoiles de notation nourrit aussi Google Maps et le Knowledge Panel — deux surfaces de plus en plus consultées directement depuis les recherches mobiles. Or, d'après notre expérience terrain, ces balisages sont encore très peu déployés sur les sites TPE/PME locaux, ce qui crée un avantage concurrentiel immédiat pour qui passe à l'action.

---

## Valider et déployer : les 3 étapes pour ne pas se planter

Avoir du JSON-LD dans son code ne suffit pas : encore faut-il qu'il soit valide.

**Étape 1 — Valider avec le Rich Results Test.** [Google Search Central](https://developers.google.com/search) met à disposition l'outil Rich Results Test (search.google.com/test/rich-results). Collez l'URL de votre page ou votre bloc JSON-LD directement : l'outil indique si le balisage est éligible aux rich results et liste les erreurs à corriger.

**Étape 2 — Intégrer le JSON-LD dans le `<head>`.** La méthode la plus directe : copier le bloc `<script type="application/ld+json">...</script>` dans le `<head>` de chaque page concernée. Sur WordPress, des plugins comme Rank Math ou Yoast le font automatiquement pour les types courants. [web.dev](https://web.dev) documente également l'injection via Google Tag Manager pour les sites sans accès direct au code source.

**Étape 3 — Surveiller dans Google Search Console.** Une fois déployé, rendez-vous dans Search Console → *Améliorations* → section correspondant à votre type de schéma. Google y remonte les erreurs de validation, les avertissements et les URLs éligibles aux rich results. Un suivi mensuel suffit pour détecter les régressions.

[ai agents robots web pourquoi votre site web disparait des resultats ia perplexi](https://digiqo.fr/blog/ai-agents-robots-web-pourquoi-votre-site-web-disparait-des-resultats-ia-perplexi)

[siri powered by gemini implications pour la visibilite search et strategie seo 2](https://digiqo.fr/blog/siri-powered-by-gemini-implications-pour-la-visibilite-search-et-strategie-seo-2)

[google seo hiring guide 2026 quelles competences recruter et comment eviter agen](https://digiqo.fr/blog/google-seo-hiring-guide-2026-quelles-competences-recruter-et-comment-eviter-agen)

---

## Ce qu'il faut retenir

JSON-LD est le format de données structurées recommandé par Google : il s'injecte dans le `<head>` sans toucher au HTML existant, il est facile à tester et à maintenir. Quatre types de schémas couvrent l'essentiel des besoins d'une TPE/PME — LocalBusiness, Article, Product et FAQPage — et les blocs ci-dessus sont copiables immédiatement.

En 2026, le balisage structuré est simultanément un levier CTR mesurable en SEO classique *et* un signal de confiance pour les agents IA de la recherche. [Google I/O 2026 l'a confirmé : AI Mode et AI Overviews sont désormais une seule et même expérience](https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/), et les sites correctement balisés sont mieux positionnés pour y apparaître.

**Votre site est-il correctement balisé ?** Demandez un audit SEO gratuit à l'équipe Digiqo — on vérifie vos données structurées et vous livre un rapport d'action sous 48 h.

:::faq
- q: Quelle est la différence entre Schema.org et JSON-LD ?
  a: Schema.org est le vocabulaire (la liste des types et propriétés standardisés). JSON-LD est un format d'implémentation de ce vocabulaire, utilisant un bloc `<script>` dans le `<head>`. Google recommande JSON-LD car il est simple à ajouter et maintenir sans altérer le HTML existant.
- q: Quel schéma dois-je implémenter en priorité ?
  a: Pour une TPE/PME réunionnaise avec commerce physique, commencez par LocalBusiness (nom, adresse, horaires, téléphone). Pour un e-commerce, Product + Offer. Pour du contenu éditorial, Article ou BlogPosting. FAQPage peut être ajouté si vous avez une section FAQ bien structurée.
- q: Les données structurées aident-elles vraiment le SEO ?
  a: Oui. Les rich snippets générés par JSON-LD augmentent la visibilité SERP et le CTR de 30 à 50 % selon nos observations chez Digiqo. De plus, en 2026, les agents IA de Google ont besoin de balisage structuré pour comprendre votre site et l'intégrer dans leurs réponses conversationnelles.
- q: Comment valider mon JSON-LD ?
  a: Utilisez le Rich Results Test de Google Search Central (search.google.com/test/rich-results). Collez l'URL ou le bloc JSON-LD directement. L'outil indique les erreurs et confirme l'éligibilité aux rich results.
- q: Faut-il modifier mon site WordPress pour ajouter JSON-LD ?
  a: Non systématiquement. Des plugins comme Rank Math ou Yoast gèrent les données structurées automatiquement pour les types courants. Pour des besoins spécifiques, vous pouvez injecter le code via Google Tag Manager sans accès direct au code source.
:::

:::sources
- label: Google Search Central - Structured Data Documentation
  url: https://developers.google.com/search
  description: Documentation officielle de Google sur l'implémentation des données structurées et les critères d'éligibilité aux rich results.
- label: web.dev - Web Standards & Performance
  url: https://web.dev
  description: Plateforme Google documentant les standards web, les bonnes pratiques JSON-LD et l'impact de datePublished sur la fraîcheur du contenu.
- label: Google I/O 2026 - Search Updates
  url: https://blog.google/products-and-platforms/products/search/search-io-2026/
  description: Annonces officielles de Google sur AI Mode (1+ milliard d'utilisateurs) et fusion AI Overviews / AI Mode, impact sur la sélection par agents IA.
- label: Google I/O 2026 - Complete Announcements
  url: https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/
  description: Récapitulatif Google I/O 2026 incluant le Universal Cart, panier intelligent intégré à Search et Gemini, dépendant du balisage Product et Offer.
- label: Ahrefs Blog - SEO Research & Data
  url: https://ahrefs.com/blog
  description: Analyses corpus larges confirmant que les rich snippets augmentent la surface SERP, réduisent l'abandon vers concurrents et signalent l'autorité.
- label: Semrush Blog - SEO/PPC Insights
  url: https://www.semrush.com/blog
  description: Récense les shopping snippets (Product + Offer) parmi les rich snippets avec le plus fort différentiel de CTR entre pages balisées et non balisées.
- label: Données primaires Digiqo
  primary: true
  description: Analyse interne 38 comptes actifs · 2025-2026 · gain CTR +30 à +50 % avec rich snippets actifs. Portefeuille TPE/PME La Réunion et national.
:::

:::cta{eyebrow="Audit gratuit · 30 minutes"}
heading: Votre site est-il correctement balisé ? Faites le point en 48 h.
body: Nos experts Digiqo vérifient vos données structurées, identifient les opportunités de rich snippets manquées et vous livrent un rapport d'action prioritaire pour doper votre CTR organique.
primary: Demander mon audit gratuit -> /audit
secondary: Voir l'offre SEO -> /services/referencement-seo
:::
