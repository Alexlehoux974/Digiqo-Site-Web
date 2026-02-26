// Structured Data Schema.org pour Digiqo

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://digiqo.fr/#business",
  "name": "Digiqo",
  "alternateName": "Digiqo Agency",
  "description": "Agence de marketing digital à La Réunion spécialisée en publicité en ligne, développement web, SEO et community management",
  "url": "https://digiqo.fr",
  "telephone": "+262262025102",
  "email": "contact@digiqo.fr",
  "image": [
    "https://digiqo.fr/assets/logo2-digiqo.png",
    "https://digiqo.fr/assets/digiqo-og-image.png"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue de l'Innovation",
    "addressLocality": "Saint-Denis",
    "addressRegion": "La Réunion",
    "postalCode": "97400",
    "addressCountry": "RE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -20.8823,
    "longitude": 55.4504
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "priceRange": "€€",
  "areaServed": [
    {
      "@type": "Place",
      "name": "La Réunion",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -21.115141,
        "longitude": 55.536384
      }
    },
    {
      "@type": "Place",
      "name": "Mayotte"
    },
    {
      "@type": "Place",
      "name": "Maurice"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Jean Dupont"
      },
      "reviewBody": "Excellente agence, très professionnelle et à l'écoute. Résultats au rendez-vous!"
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Marie Martin"
      },
      "reviewBody": "Digiqo a transformé notre présence digitale. Je recommande vivement!"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services de Marketing Digital",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Publicité en ligne",
        "description": "Campagnes Google Ads et Meta optimisées",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Digiqo"
        },
        "areaServed": "La Réunion",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://digiqo.fr/services/publicite-google"
        }
      },
      {
        "@type": "Service",
        "name": "Développement Web",
        "description": "Sites web sur-mesure et applications",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Digiqo"
        },
        "areaServed": "La Réunion",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://digiqo.fr/services/sites-web"
        }
      },
      {
        "@type": "Service",
        "name": "SEO",
        "description": "Référencement naturel local et national",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Digiqo"
        },
        "areaServed": "La Réunion",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://digiqo.fr/services/seo"
        }
      },
      {
        "@type": "Service",
        "name": "Community Management",
        "description": "Gestion professionnelle des réseaux sociaux",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Digiqo"
        },
        "areaServed": "La Réunion",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://digiqo.fr/services/community-management"
        }
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
  ],
  "knowsAbout": [
    "Marketing Digital",
    "SEO",
    "Google Ads",
    "Facebook Ads",
    "Développement Web",
    "Community Management",
    "Identité Visuelle",
    "Production Vidéo"
  ],
  "founder": {
    "@type": "Person",
    "name": "Fondateur Digiqo"
  }
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const faqSchema = (questions: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer
    }
  }))
});

export const serviceSchema = (service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
  priceRange?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.name,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Digiqo",
    "@id": "https://digiqo.fr/#business"
  },
  "name": service.name,
  "description": service.description,
  "url": service.url,
  "image": service.image || "https://digiqo.fr/assets/digiqo-og-image.png",
  "areaServed": {
    "@type": "Place",
    "name": "La Réunion"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": service.name,
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.price,
          "priceCurrency": "EUR",
          "priceRange": service.priceRange || "€€"
        }
      }
    ]
  }
});

export const articleSchema = (article: {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "author": {
    "@type": "Organization",
    "name": article.author || "Digiqo",
    "@id": "https://digiqo.fr/#business"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Digiqo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digiqo.fr/assets/logo2-digiqo.png"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  },
  "keywords": article.keywords?.join(", ")
});

export const productSchema = (product: {
  name: string;
  description: string;
  price: string;
  currency?: string;
  availability?: string;
  image?: string;
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image || "https://digiqo.fr/assets/digiqo-og-image.png",
  "category": product.category,
  "brand": {
    "@type": "Organization",
    "name": "Digiqo"
  },
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.currency || "EUR",
    "availability": product.availability || "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Digiqo",
      "@id": "https://digiqo.fr/#business"
    }
  }
});

export const eventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.name,
  "description": event.description,
  "startDate": event.startDate,
  "endDate": event.endDate || event.startDate,
  "location": {
    "@type": "Place",
    "name": event.location,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Saint-Denis",
      "addressRegion": "La Réunion",
      "addressCountry": "RE"
    }
  },
  "image": event.image || "https://digiqo.fr/assets/digiqo-og-image.png",
  "url": event.url,
  "organizer": {
    "@type": "Organization",
    "name": "Digiqo",
    "@id": "https://digiqo.fr/#business"
  },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
});

export const videoSchema = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.name,
  "description": video.description,
  "thumbnailUrl": video.thumbnailUrl,
  "uploadDate": video.uploadDate,
  "duration": video.duration,
  "contentUrl": video.contentUrl,
  "embedUrl": video.embedUrl,
  "publisher": {
    "@type": "Organization",
    "name": "Digiqo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digiqo.fr/assets/logo2-digiqo.png"
    }
  }
});

export const personSchema = (person: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  email?: string;
  telephone?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.jobTitle,
  "description": person.description,
  "image": person.image,
  "email": person.email,
  "telephone": person.telephone,
  "worksFor": {
    "@type": "Organization",
    "name": "Digiqo",
    "@id": "https://digiqo.fr/#business"
  }
});

export const howToSchema = (steps: { name: string; text: string; image?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Guide Digiqo",
  "description": "Guide étape par étape par Digiqo",
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image
  }))
});