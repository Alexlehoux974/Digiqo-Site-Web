import Head from 'next/head'
import { Header } from '@/components/Header'
import { HeroParallax } from '@/components/HeroParallax/HeroParallax'
import { ResultsSection } from '@/components/ResultsSection'
import { VideoSection } from '@/components/VideoSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { CaseStudiesSection } from '@/components/CaseStudiesSection'
import { AboutSection } from '@/components/AboutSection'
import { FAQSection } from '@/components/FAQSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

const products = [
  {
    title: "Titty Club",
    link: "#",
    thumbnail: <img src="/partenaires/TITTY-CLUB-1024x1024.webp" alt="Titty Club" className="w-full h-full object-contain" />,
  },
  {
    title: "Choka'e",
    link: "#",
    thumbnail: <img src="/partenaires/CHOKAAE-1024x1024.webp" alt="Choka'e" className="w-full h-full object-contain" />,
  },
  {
    title: "Foot Korner",
    link: "#",
    thumbnail: <img src="/partenaires/FOOT-KORNER-1024x1024.webp" alt="Foot Korner" className="w-full h-full object-contain" />,
  },
  {
    title: "La Boucherie",
    link: "#",
    thumbnail: <img src="/partenaires/LA-BOUCHERIE-1024x1024.webp" alt="La Boucherie" className="w-full h-full object-contain" />,
  },
  {
    title: "CCI Réunion",
    link: "#",
    thumbnail: <img src="/partenaires/CCI-REUNION-1024x1024.webp" alt="CCI Réunion" className="w-full h-full object-contain" />,
  },
  {
    title: "HEC",
    link: "#",
    thumbnail: <img src="/partenaires/HEC-1024x1024.webp" alt="HEC" className="w-full h-full object-contain" />,
  },
  {
    title: "Parapente Réunion",
    link: "#",
    thumbnail: <img src="/partenaires/PARAPENTE-REUNION-1024x1024.webp" alt="Parapente Réunion" className="w-full h-full object-contain" />,
  },
  {
    title: "Enler Pied Bois",
    link: "#",
    thumbnail: <img src="/partenaires/ENLER-PIED-BOIS-1024x1024.webp" alt="Enler Pied Bois" className="w-full h-full object-contain" />,
  },
  {
    title: "Sogitec",
    link: "#",
    thumbnail: <img src="/partenaires/SOGITEC-1024x1024.webp" alt="Sogitec" className="w-full h-full object-contain" />,
  },
  {
    title: "Dabstart",
    link: "#",
    thumbnail: <img src="/partenaires/DABSTART-1024x1024.webp" alt="Dabstart" className="w-full h-full object-contain" />,
  },
  {
    title: "Sabaguina",
    link: "#",
    thumbnail: <img src="/partenaires/SABAGUINA-1024x1024.webp" alt="Sabaguina" className="w-full h-full object-contain" />,
  },
  {
    title: "Nenettes",
    link: "#",
    thumbnail: <img src="/partenaires/NENETTES-1024x1024.webp" alt="Nenettes" className="w-full h-full object-contain" />,
  },
  {
    title: "Sergio",
    link: "#",
    thumbnail: <img src="/partenaires/SERGIO-1024x1024.webp" alt="Sergio" className="w-full h-full object-contain" />,
  },
  {
    title: "Investis Dom",
    link: "#",
    thumbnail: <img src="/partenaires/INVESTIS-DOM-1024x1024.webp" alt="Investis Dom" className="w-full h-full object-contain" />,
  },
  {
    title: "Emixem",
    link: "#",
    thumbnail: <img src="/partenaires/EMIXEM-2-1024x1024.webp" alt="Emixem" className="w-full h-full object-contain" />,
  },
  {
    title: "Sultania",
    link: "#",
    thumbnail: <img src="/partenaires/SULTANIA-1024x1024.webp" alt="Sultania" className="w-full h-full object-contain" />,
  },
  {
    title: "Sarah Beach",
    link: "#",
    thumbnail: <img src="/partenaires/SARAH-BEACH2-1024x1024.webp" alt="Sarah Beach" className="w-full h-full object-contain" />,
  },
  {
    title: "Académie OI",
    link: "#",
    thumbnail: <img src="/partenaires/ACADEMIE-OI-1024x1024.webp" alt="Académie OI" className="w-full h-full object-contain" />,
  },
  {
    title: "Pitaya",
    link: "#",
    thumbnail: <img src="/partenaires/PITAYA-1024x1024.webp" alt="Pitaya" className="w-full h-full object-contain" />,
  },
  {
    title: "Case Domotik",
    link: "#",
    thumbnail: <img src="/partenaires/CASE-DOMOTIK-1024x1024.webp" alt="Case Domotik" className="w-full h-full object-contain" />,
  },
  {
    title: "AB Food",
    link: "#",
    thumbnail: <img src="/partenaires/AB-FOOD-1024x1024.webp" alt="AB Food" className="w-full h-full object-contain" />,
  },
  {
    title: "ACF",
    link: "#",
    thumbnail: <img src="/partenaires/ACF-1024x1024.webp" alt="ACF" className="w-full h-full object-contain" />,
  },
  {
    title: "Cara Haircut",
    link: "#",
    thumbnail: <img src="/partenaires/CARA-HAIRCUT-1024x1024.webp" alt="Cara Haircut" className="w-full h-full object-contain" />,
  },
  {
    title: "Minimelts",
    link: "#",
    thumbnail: <img src="/partenaires/MINIMELTS-1024x1024.webp" alt="Minimelts" className="w-full h-full object-contain" />,
  },
  {
    title: "ADESSL",
    link: "#",
    thumbnail: <img src="/partenaires/ADESSL-1024x1024.webp" alt="ADESSL" className="w-full h-full object-contain" />,
  },
  {
    title: "Afezio",
    link: "#",
    thumbnail: <img src="/partenaires/AFEZIO-1024x1024.webp" alt="Afezio" className="w-full h-full object-contain" />,
  },
  {
    title: "Bernard Contrain",
    link: "#",
    thumbnail: <img src="/partenaires/BERNARD-CONTRAIN-1024x1024.webp" alt="Bernard Contrain" className="w-full h-full object-contain" />,
  },
  {
    title: "Boussole",
    link: "#",
    thumbnail: <img src="/partenaires/BOUSSOLE-1024x1024.webp" alt="Boussole" className="w-full h-full object-contain" />,
  },
  {
    title: "CBD Run",
    link: "#",
    thumbnail: <img src="/partenaires/CBD-RUN-1024x1024.webp" alt="CBD Run" className="w-full h-full object-contain" />,
  },
  {
    title: "Easy Run Simulation",
    link: "#",
    thumbnail: <img src="/partenaires/EASYRUNSIMULATION-1024x1024.webp" alt="Easy Run Simulation" className="w-full h-full object-contain" />,
  },
  {
    title: "Alpha Coaching",
    link: "#",
    thumbnail: <img src="/partenaires/ALPHA-COACHING-1024x1024.webp" alt="Alpha Coaching" className="w-full h-full object-contain" />,
  },
  {
    title: "Beauvallon",
    link: "#",
    thumbnail: <img src="/partenaires/BEAUVALLON-1024x1024.webp" alt="Beauvallon" className="w-full h-full object-contain" />,
  },
  {
    title: "Citadelle",
    link: "#",
    thumbnail: <img src="/partenaires/CITADELLE-1-1024x1024.webp" alt="Citadelle" className="w-full h-full object-contain" />,
  },
  {
    title: "Click n Van",
    link: "#",
    thumbnail: <img src="/partenaires/CLICKNVAN-1024x1024.webp" alt="Click n Van" className="w-full h-full object-contain" />,
  },
  {
    title: "CMX",
    link: "#",
    thumbnail: <img src="/partenaires/CMX-1024x1024.webp" alt="CMX" className="w-full h-full object-contain" />,
  },
  {
    title: "Coloctionneurs",
    link: "#",
    thumbnail: <img src="/partenaires/COLOCTIONNEURS-1024x1024.webp" alt="Coloctionneurs" className="w-full h-full object-contain" />,
  },
  {
    title: "Comptoir",
    link: "#",
    thumbnail: <img src="/partenaires/COMPTOIR-1024x1024.webp" alt="Comptoir" className="w-full h-full object-contain" />,
  },
  {
    title: "Côté Seine",
    link: "#",
    thumbnail: <img src="/partenaires/COTE-SEINE-1024x1024.webp" alt="Côté Seine" className="w-full h-full object-contain" />,
  },
  {
    title: "Dermajolie",
    link: "#",
    thumbnail: <img src="/partenaires/DERMAJOLIE-1024x1024.webp" alt="Dermajolie" className="w-full h-full object-contain" />,
  },
  {
    title: "Digicademy",
    link: "#",
    thumbnail: <img src="/partenaires/DIGICADEMY-1024x1024.webp" alt="Digicademy" className="w-full h-full object-contain" />,
  },
  {
    title: "EMPC",
    link: "#",
    thumbnail: <img src="/partenaires/EMPC-1024x1024.webp" alt="EMPC" className="w-full h-full object-contain" />,
  },
  {
    title: "Equinox",
    link: "#",
    thumbnail: <img src="/partenaires/EQUINOX-1024x1024.webp" alt="Equinox" className="w-full h-full object-contain" />,
  },
  {
    title: "Folies",
    link: "#",
    thumbnail: <img src="/partenaires/FOLIES-1024x1024.webp" alt="Folies" className="w-full h-full object-contain" />,
  },
  {
    title: "Groupe IN",
    link: "#",
    thumbnail: <img src="/partenaires/GROUPE-IN-1024x1024.webp" alt="Groupe IN" className="w-full h-full object-contain" />,
  },
  {
    title: "IAD",
    link: "#",
    thumbnail: <img src="/partenaires/IAD-1024x1024.webp" alt="IAD" className="w-full h-full object-contain" />,
  },
  {
    title: "Ishyati Beauty",
    link: "#",
    thumbnail: <img src="/partenaires/ISHYATIBEAUTY-1024x1024.webp" alt="Ishyati Beauty" className="w-full h-full object-contain" />,
  },
  {
    title: "Lakaz Immo",
    link: "#",
    thumbnail: <img src="/partenaires/LAKAZ-IMMO-1024x1024.webp" alt="Lakaz Immo" className="w-full h-full object-contain" />,
  },
  {
    title: "LBA",
    link: "#",
    thumbnail: <img src="/partenaires/LBA-1024x1024.webp" alt="LBA" className="w-full h-full object-contain" />,
  },
  {
    title: "LCDA",
    link: "#",
    thumbnail: <img src="/partenaires/LCDA_LOGO_FD-BLANC_14CM-1024x877.webp" alt="LCDA" className="w-full h-full object-contain" />,
  },
  {
    title: "Lilo Beauty",
    link: "#",
    thumbnail: <img src="/partenaires/LILO-BEAUTY-1024x1024.webp" alt="Lilo Beauty" className="w-full h-full object-contain" />,
  },
  {
    title: "Mahaveli",
    link: "#",
    thumbnail: <img src="/partenaires/MAHAVELI-1024x1024.webp" alt="Mahaveli" className="w-full h-full object-contain" />,
  },
  {
    title: "Maison Nomade",
    link: "#",
    thumbnail: <img src="/partenaires/MAISON-NOMADE-1024x1024.webp" alt="Maison Nomade" className="w-full h-full object-contain" />,
  },
  {
    title: "Meta",
    link: "#",
    thumbnail: <img src="/partenaires/META-1024x1024.webp" alt="Meta" className="w-full h-full object-contain" />,
  },
  {
    title: "Métissage",
    link: "#",
    thumbnail: <img src="/partenaires/METISSAGE-1024x1024.webp" alt="Métissage" className="w-full h-full object-contain" />,
  },
  {
    title: "My Bloom Story",
    link: "#",
    thumbnail: <img src="/partenaires/MY-BLOOM-STORY-1024x1024.webp" alt="My Bloom Story" className="w-full h-full object-contain" />,
  },
  {
    title: "Mystik",
    link: "#",
    thumbnail: <img src="/partenaires/MYSTIK-1024x1024.webp" alt="Mystik" className="w-full h-full object-contain" />,
  },
  {
    title: "NSMT",
    link: "#",
    thumbnail: <img src="/partenaires/NSMT-1024x1024.webp" alt="NSMT" className="w-full h-full object-contain" />,
  },
  {
    title: "O2",
    link: "#",
    thumbnail: <img src="/partenaires/o2-1024x1024.webp" alt="O2" className="w-full h-full object-contain" />,
  },
  {
    title: "Pascal Des",
    link: "#",
    thumbnail: <img src="/partenaires/PASCAL-DES-1024x1024.webp" alt="Pascal Des" className="w-full h-full object-contain" />,
  },
  {
    title: "Pizza Stella",
    link: "#",
    thumbnail: <img src="/partenaires/PIZZA-STELLA-1024x1024.webp" alt="Pizza Stella" className="w-full h-full object-contain" />,
  }
]

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digiqo",
    "description": "Agence digitale premium à La Réunion. Spécialistes en publicité en ligne, développement web, SEO, community management et marketing digital.",
    "url": "https://digiqo.re",
    "telephone": "+262692123456",
    "priceRange": "€€€",
    "address": {
      "@type": "PostalAddress",
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
    "areaServed": {
      "@type": "Place",
      "name": "La Réunion"
    },
    "sameAs": [
      "https://www.facebook.com/digiqo",
      "https://www.instagram.com/digiqo",
      "https://www.linkedin.com/company/digiqo"
    ]
  }

  return (
    <>
      <Head>
        <title>Digiqo - Agence Digitale Premium à La Réunion | Marketing Digital 974</title>
        <meta name="description" content="Digiqo, votre agence digitale à La Réunion. Experts en publicité Google Ads & Meta, développement web, SEO local, community management. Boostez votre visibilité à La Réunion." />
        <meta name="keywords" content="agence digitale La Réunion, marketing digital 974, publicité en ligne Réunion, Google Ads Réunion, Facebook Ads 974, développement web La Réunion, SEO Réunion, community management 974" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.re/" />
        <meta property="og:title" content="Digiqo - Agence Digitale Premium à La Réunion" />
        <meta property="og:description" content="Experts en marketing digital à La Réunion. Publicité en ligne, développement web, SEO local et community management pour booster votre business." />
        <meta property="og:image" content="https://digiqo.re/og-image.jpg" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://digiqo.re/" />
        <meta property="twitter:title" content="Digiqo - Agence Digitale Premium à La Réunion" />
        <meta property="twitter:description" content="Experts en marketing digital à La Réunion. Publicité en ligne, développement web, SEO local et community management." />
        <meta property="twitter:image" content="https://digiqo.re/og-image.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://digiqo.re/" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Header />
      <main className="pt-20">
        <HeroParallax products={products} />
        <ResultsSection />
        <div className="py-8" />
        <CaseStudiesSection />
        <div className="py-8" />
        <div className="relative py-20">
          <VideoSection />
        </div>
        <div className="py-8" />
        <TestimonialsSection />
        <div className="py-8" />
        <ServicesSection />
        <div className="py-8" />
        <AboutSection />
        <div className="py-8" />
        <FAQSection />
        <div className="py-8" />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}