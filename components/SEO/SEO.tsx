import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  locale?: string;
  siteName?: string;
  structuredData?: object | object[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  image = 'https://www.digiqo.fr/assets/digiqo-og-image.png',
  url,
  type = 'website',
  locale = 'fr_FR',
  siteName = 'Digiqo - Agence Marketing Digital La Réunion',
  structuredData,
  author = 'Digiqo',
  publishedTime,
  modifiedTime,
  section,
  tags,
  canonical,
  noindex = false,
  nofollow = false
}: SEOProps) {
  const router = useRouter();
  const currentUrl = url || `https://www.digiqo.fr${router.asPath}`;
  const canonicalUrl = canonical || currentUrl;

  // Title optimization
  const optimizedTitle = title.length > 60 ? title : `${title} | ${siteName}`;

  // Description optimization
  const optimizedDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  // Robots meta
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1'
  ].join(', ');

  // Default structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digiqo",
    "alternateName": "Digiqo Agency",
    "url": "https://www.digiqo.fr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.digiqo.fr/assets/logo2-digiqo.png",
      "width": 200,
      "height": 60
    },
    "sameAs": [
      "https://www.facebook.com/digiqo",
      "https://www.instagram.com/digiqo_",
      "https://www.linkedin.com/company/digiqo",
      "https://www.youtube.com/@digiqo_",
      "https://twitter.com/digiqo",
      "https://www.tiktok.com/@digiqo"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+262262025102",
      "contactType": "sales",
      "areaServed": "RE",
      "availableLanguage": ["French", "English"],
      "contactOption": "TollFree"
    }
  };

  // WebSite schema with search
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": "https://www.digiqo.fr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.digiqo.fr/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Combine all structured data
  const allStructuredData = structuredData
    ? Array.isArray(structuredData)
      ? [organizationSchema, websiteSchema, ...structuredData]
      : [organizationSchema, websiteSchema, structuredData]
    : [organizationSchema, websiteSchema];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      {/* Author and Publisher */}
      <meta name="author" content={author} />
      <meta name="publisher" content={siteName} />

      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      {/* Language and Geo */}
      <meta name="language" content="French" />
      <meta name="geo.region" content="RE" />
      <meta name="geo.placename" content="La Réunion" />
      <meta name="geo.position" content="-20.8823;55.4504" />
      <meta name="ICBM" content="-20.8823, 55.4504" />

      {/* Open Graph */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content={siteName} />

      {/* Article specific Open Graph */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@digiqo" />
      <meta name="twitter:creator" content="@digiqo" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate languages */}
      <link rel="alternate" hrefLang="fr" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8B1431" />
      <meta name="msapplication-TileColor" content="#8B1431" />
      <meta name="theme-color" content="#8B1431" />

      {/* Webmaster Tools */}
      <meta name="google-site-verification" content="-mBAAsZ3X_8gyG-3MAN7Ww86tsF452BbvWmgz3SLiBY" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(allStructuredData)
        }}
      />

      {/* Preconnect to optimize loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Head>
  );
}