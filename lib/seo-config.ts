export const seoConfig = {
  default: {
    siteName: 'Digiqo',
    siteUrl: 'https://www.digiqo.fr',
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
      publicite: {
        title: 'Publicité en ligne & SEA à La Réunion',
        description: 'Boostez votre visibilité avec nos campagnes publicitaires sur Google Ads, Facebook Ads et Instagram. ROI garanti et suivi personnalisé.',
        keywords: 'publicité en ligne réunion, google ads réunion, facebook ads réunion, SEA réunion, campagne publicitaire 974',
      },
      'dev-web': {
        title: 'Développement Web & Applications à La Réunion',
        description: 'Création de sites web modernes, applications mobiles et solutions e-commerce sur mesure. Technologies de pointe et design responsive.',
        keywords: 'développement web réunion, création site internet 974, application mobile réunion, e-commerce réunion, développeur web 974',
      },
      community: {
        title: 'Community Management à La Réunion',
        description: 'Gestion professionnelle de vos réseaux sociaux. Stratégie de contenu, animation de communauté et croissance de votre audience.',
        keywords: 'community management réunion, gestion réseaux sociaux 974, social media manager réunion, animation communauté réunion',
      },
      seo: {
        title: 'Référencement Naturel SEO à La Réunion',
        description: 'Optimisez votre visibilité sur Google. Audit SEO, stratégie de contenu et amélioration du positionnement de votre site web.',
        keywords: 'SEO réunion, référencement naturel 974, consultant SEO réunion, optimisation site web réunion, audit SEO 974',
      },
      video: {
        title: 'Production Vidéo & Motion Design à La Réunion',
        description: 'Création de contenus vidéo professionnels : spots publicitaires, vidéos corporate, motion design et montage créatif.',
        keywords: 'production vidéo réunion, motion design 974, vidéo corporate réunion, montage vidéo réunion, agence vidéo 974',
      },
      identite: {
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

// Structured data for LocalBusiness
export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Digiqo",
  "description": "Agence de marketing digital à La Réunion",
  "url": "https://www.digiqo.fr",
  "telephone": "+262 262 02 51 02",
  "email": "contact@digiqo.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue de l'Innovation",
    "addressLocality": "Saint-Denis",
    "postalCode": "97400",
    "addressCountry": "RE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -20.8823,
    "longitude": 55.4504
  },
  "openingHours": "Mo-Fr 08:00-17:00",
  "priceRange": "€€",
  "image": "https://www.digiqo.fr/assets/logo2-digiqo.png",
  "areaServed": {
    "@type": "Place",
    "name": "La Réunion",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -21.115141,
      "longitude": 55.536384
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124",
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
        "description": "Campagnes Google Ads et Meta optimisées pour La Réunion"
      },
      {
        "@type": "Service",
        "name": "Développement Web",
        "description": "Sites web sur-mesure et applications mobiles"
      },
      {
        "@type": "Service",
        "name": "SEO",
        "description": "Référencement naturel local et national"
      },
      {
        "@type": "Service",
        "name": "Community Management",
        "description": "Gestion professionnelle de vos réseaux sociaux"
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/digiqo",
    "https://www.instagram.com/digiqo_",
    "https://www.linkedin.com/company/digiqo",
    "https://www.youtube.com/@digiqo_",
    "https://twitter.com/digiqo",
    "https://www.tiktok.com/@digiqo"
  ]
};