export const seoConfig = {
  default: {
    siteName: 'Digiqo',
    siteUrl: 'https://digiqo.fr',
    defaultImage: 'https://digiqo.fr/assets/digiqo-og-image.png',
    locale: 'fr_FR',
    twitterHandle: '@digiqo',
  },
  pages: {
    home: {
      title: 'Agence Marketing Digital à La Réunion',
      description: 'Digiqo est votre partenaire digital à La Réunion. Experts en marketing digital, développement web, SEO, publicité en ligne et community management.',
      keywords: 'agence marketing digital réunion, agence web réunion, marketing digital 974, développement web réunion, SEO réunion, publicité en ligne réunion',
    },
    services: {
      'publicite-en-ligne': {
        title: 'Publicité en Ligne La Réunion | Google Ads, Facebook, Instagram, TikTok 974 | Digiqo',
        description: 'Agence publicité en ligne à La Réunion (974). Campagnes Google Ads, Facebook Ads, Instagram Ads, TikTok Ads. Ciblage local, optimisation continue, reporting mensuel.',
        keywords: 'publicité en ligne réunion, google ads 974, facebook ads réunion, instagram ads 974, tiktok ads réunion, SMA réunion, SEA réunion, agence publicité digitale 974',
      },
      'sites-web': {
        title: 'Développement Web & Applications à La Réunion',
        description: 'Création de sites web modernes, applications mobiles et solutions e-commerce sur mesure. Technologies de pointe et design responsive.',
        keywords: 'développement web réunion, création site internet 974, application mobile réunion, e-commerce réunion, développeur web 974',
      },
      'community-management': {
        title: 'Community Management à La Réunion',
        description: 'Gestion professionnelle de vos réseaux sociaux. Stratégie de contenu, animation de communauté et croissance de votre audience.',
        keywords: 'community management réunion, gestion réseaux sociaux 974, social media manager réunion, animation communauté réunion',
      },
      seo: {
        title: 'Référencement Naturel SEO à La Réunion',
        description: 'Optimisez votre visibilité sur Google. Audit SEO, stratégie de contenu et amélioration du positionnement de votre site web.',
        keywords: 'SEO réunion, référencement naturel 974, consultant SEO réunion, optimisation site web réunion, audit SEO 974',
      },
      creatifs: {
        title: 'Créatifs Publicitaires & Motion Design à La Réunion',
        description: 'Création de contenus visuels professionnels : spots publicitaires, vidéos corporate, motion design et montage créatif.',
        keywords: 'créatifs publicitaires réunion, production vidéo 974, motion design réunion, vidéo corporate 974, agence créative réunion',
      },
      'identite-de-marque': {
        title: 'Identité Visuelle & Branding à La Réunion',
        description: 'Création de logos, chartes graphiques et identités visuelles complètes. Donnez une image professionnelle à votre entreprise.',
        keywords: 'identité visuelle réunion, création logo 974, charte graphique réunion, branding réunion, graphiste 974',
      },
      audit: {
        title: 'Audit Digital & Stratégie Marketing à La Réunion',
        description: 'Analyse complète de votre présence digitale. Recommandations stratégiques pour optimiser votre performance en ligne.',
        keywords: 'audit digital réunion, stratégie marketing 974, consultant digital réunion, analyse web réunion, conseil marketing 974',
      },
      sitekeeper: {
        title: 'Maintenance & Sécurité Web à La Réunion',
        description: 'Service de maintenance, sécurité et optimisation continue de votre site web. Gardez votre site performant et sécurisé.',
        keywords: 'maintenance site web réunion, sécurité web 974, sitekeeper réunion, support technique web réunion, hébergement web 974',
      },
    },
  },
};

// Stacked schema for the home page. Exposes one graph with four cross-linked
// entities so Google and LLMs can resolve "Digiqo" as a single brand:
//   - Organization (#organization) — the legal/brand entity
//   - LocalBusiness (#localbusiness) — the physical/local fiche, parented by
//     the Organization above
//   - WebSite (#website) — the digital property, published by Organization
//   - BreadcrumbList (#breadcrumb) — minimal Home entry for the root URL
//
// Coordinates -20.8789, 55.4481 are approximate for the 8 ruelle Boulot
// block; refine with an exact Google Maps lookup if needed.
// aggregateRating mirrors the public Trustpilot profile (digiqo.tech) — keep
// this number in sync with components/Trustpilot/TrustpilotWidget.tsx.
const SAME_AS = [
  "https://www.facebook.com/digiqo/",
  "https://www.instagram.com/digiqo_",
  "https://www.tiktok.com/@digiqo",
  "https://fr.linkedin.com/company/digiqo",
  "https://fr.trustpilot.com/review/digiqo.tech"
];

export const homeStructuredDataGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://digiqo.fr/#organization",
      "name": "Digiqo",
      "alternateName": "Digiqo - Agence Marketing Digital La Réunion",
      "url": "https://digiqo.fr",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://digiqo.fr/#logo",
        "url": "https://digiqo.fr/assets/logo2-digiqo.png",
        "contentUrl": "https://digiqo.fr/assets/logo2-digiqo.png",
        "caption": "Digiqo"
      },
      "image": { "@id": "https://digiqo.fr/#logo" },
      "telephone": "+262 262 02 51 02",
      "email": "contact@digiqo.fr",
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Rodolphe Le Houx"
      },
      "sameAs": SAME_AS
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://digiqo.fr/#localbusiness",
      "name": "Digiqo",
      "alternateName": "Digiqo - Agence Marketing Digital La Réunion",
      "description": "Première agence de l'océan Indien certifiée Meta Business Partner. Experts en marketing digital, publicité Meta Ads et Google Ads, développement web, SEO et community management à La Réunion.",
      "url": "https://digiqo.fr",
      "telephone": "+262 262 02 51 02",
      "email": "contact@digiqo.fr",
      "image": { "@id": "https://digiqo.fr/#logo" },
      "logo": { "@id": "https://digiqo.fr/#logo" },
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "8 ruelle Boulot",
        "addressLocality": "Saint-Denis",
        "postalCode": "97400",
        "addressRegion": "La Réunion",
        "addressCountry": "RE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -20.8789,
        "longitude": 55.4481
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "areaServed": {
        "@type": "Place",
        "name": "La Réunion",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -21.115141,
          "longitude": 55.536384
        }
      },
      "sameAs": SAME_AS,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "30",
        "bestRating": "5",
        "worstRating": "1"
      },
      "parentOrganization": { "@id": "https://digiqo.fr/#organization" },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services de Marketing Digital",
        "itemListElement": [
          {
            "@type": "Service",
            "name": "Publicité en ligne",
            "description": "Campagnes Google Ads et Meta optimisées pour le marché réunionnais"
          },
          {
            "@type": "Service",
            "name": "Développement Web",
            "description": "Sites web sur-mesure, responsive, optimisés"
          },
          {
            "@type": "Service",
            "name": "Community Management",
            "description": "Gestion professionnelle des réseaux sociaux"
          },
          {
            "@type": "Service",
            "name": "Référencement SEO",
            "description": "Stratégie SEO locale pour le marché réunionnais"
          },
          {
            "@type": "Service",
            "name": "Identité de marque",
            "description": "Logo, branding et identité visuelle"
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://digiqo.fr/#website",
      "url": "https://digiqo.fr",
      "name": "Digiqo",
      "description": "Agence Marketing Digital La Réunion",
      "publisher": { "@id": "https://digiqo.fr/#organization" },
      "inLanguage": "fr-FR"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://digiqo.fr/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://digiqo.fr/"
        }
      ]
    }
  ]
};

// Backward-compatible alias retained for any non-home page that may import
// the old name. Prefer homeStructuredDataGraph for new code.
export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://digiqo.fr/#organization",
  "name": "Digiqo",
  "alternateName": "Digiqo - Agence Marketing Digital La Réunion",
  "description": "Première agence de l'océan Indien certifiée Meta Business Partner. Experts en marketing digital, publicité Meta Ads et Google Ads, développement web, SEO et community management à La Réunion.",
  "url": "https://digiqo.fr",
  "telephone": "+262 262 02 51 02",
  "email": "contact@digiqo.fr",
  "logo": "https://digiqo.fr/assets/logo2-digiqo.png",
  "image": "https://digiqo.fr/assets/logo2-digiqo.png",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "8 ruelle Boulot",
    "addressLocality": "Saint-Denis",
    "postalCode": "97400",
    "addressRegion": "La Réunion",
    "addressCountry": "RE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -20.8789,
    "longitude": 55.4481
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "areaServed": {
    "@type": "Place",
    "name": "La Réunion",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -21.115141,
      "longitude": 55.536384
    }
  },
  "sameAs": [
    "https://www.facebook.com/digiqo/",
    "https://www.instagram.com/digiqo_",
    "https://www.tiktok.com/@digiqo",
    "https://fr.linkedin.com/company/digiqo"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "30",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services de Marketing Digital",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Publicité en ligne",
        "description": "Campagnes Google Ads et Meta optimisées pour le marché réunionnais"
      },
      {
        "@type": "Service",
        "name": "Développement Web",
        "description": "Sites web sur-mesure, responsive, optimisés"
      },
      {
        "@type": "Service",
        "name": "Community Management",
        "description": "Gestion professionnelle des réseaux sociaux"
      },
      {
        "@type": "Service",
        "name": "Référencement SEO",
        "description": "Stratégie SEO locale pour le marché réunionnais"
      },
      {
        "@type": "Service",
        "name": "Identité de marque",
        "description": "Logo, branding et identité visuelle"
      }
    ]
  }
};