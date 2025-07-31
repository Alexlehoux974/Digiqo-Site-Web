import { useEffect } from 'react'
import { SEO } from '@/components/SEO'
import { seoConfig, businessStructuredData } from '@/lib/seo-config'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { HeaderLuxury } from '../components/Header'
import { HeroParallax } from '../components/HeroParallax/HeroParallax'
import { ResultsSection } from '../components/ResultsSection'
import { VideoSection } from '../components/VideoSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { ServicesSection } from '../components/ServicesSection'
import { CaseStudiesSection } from '../components/CaseStudiesSection'
import { AboutSection } from '../components/AboutSection'
import { FAQSection } from '../components/FAQSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { useInstantScroll } from '@/hooks/useInstantScroll'

const products = [
  {
    title: "Titty Club",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/TITTY-CLUB-1024x1024.webp" alt="Titty Club" width={1024} height={1024} className="w-full h-full" objectFit="contain" />,
  },
  {
    title: "Choka'e",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CHOKAAE-1024x1024.webp" alt="Choka'e" width={1024} height={1024} className="w-full h-full" objectFit="contain" />,
  },
  {
    title: "Foot Korner",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/FOOT-KORNER-1024x1024.webp" alt="Foot Korner" width={1024} height={1024} className="w-full h-full" objectFit="contain" />,
  },
  {
    title: "La Boucherie",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/LA-BOUCHERIE-1024x1024.webp" alt="La Boucherie" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "CCI Réunion",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CCI-REUNION-1024x1024.webp" alt="CCI Réunion" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "HEC",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/HEC-1024x1024.webp" alt="HEC" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Parapente Réunion",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/PARAPENTE-REUNION-1024x1024.webp" alt="Parapente Réunion" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Enler Pied Bois",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/ENLER-PIED-BOIS-1024x1024.webp" alt="Enler Pied Bois" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Sogitec",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/SOGITEC-1024x1024.webp" alt="Sogitec" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Dabstart",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/DABSTART-1024x1024.webp" alt="Dabstart" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Sabaguina",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/SABAGUINA-1024x1024.webp" alt="Sabaguina" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Nenettes",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/NENETTES-1024x1024.webp" alt="Nenettes" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Sergio",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/SERGIO-1024x1024.webp" alt="Sergio" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Investis Dom",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/INVESTIS-DOM-1024x1024.webp" alt="Investis Dom" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Emixem",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/EMIXEM-2-1024x1024.webp" alt="Emixem" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Sultania",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/SULTANIA-1024x1024.webp" alt="Sultania" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Sarah Beach",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/SARAH-BEACH2-1024x1024.webp" alt="Sarah Beach" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Académie OI",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/ACADEMIE-OI-1024x1024.webp" alt="Académie OI" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Pitaya",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/PITAYA-1024x1024.webp" alt="Pitaya" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Case Domotik",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CASE-DOMOTIK-1024x1024.webp" alt="Case Domotik" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "AB Food",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/AB-FOOD-1024x1024.webp" alt="AB Food" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "ACF",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/ACF-1024x1024.webp" alt="ACF" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Cara Haircut",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CARA-HAIRCUT-1024x1024.webp" alt="Cara Haircut" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Minimelts",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/MINIMELTS-1024x1024.webp" alt="Minimelts" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "ADESSL",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/ADESSL-1024x1024.webp" alt="ADESSL" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Afezio",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/AFEZIO-1024x1024.webp" alt="Afezio" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Bernard Contrain",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/BERNARD-CONTRAIN-1024x1024.webp" alt="Bernard Contrain" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Boussole",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/BOUSSOLE-1024x1024.webp" alt="Boussole" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "CBD Run",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CBD-RUN-1024x1024.webp" alt="CBD Run" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Easy Run Simulation",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/EASYRUNSIMULATION-1024x1024.webp" alt="Easy Run Simulation" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Alpha Coaching",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/ALPHA-COACHING-1024x1024.webp" alt="Alpha Coaching" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Beauvallon",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/BEAUVALLON-1024x1024.webp" alt="Beauvallon" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Citadelle",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CITADELLE-1-1024x1024.webp" alt="Citadelle" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Click n Van",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CLICKNVAN-1024x1024.webp" alt="Click n Van" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "CMX",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/CMX-1024x1024.webp" alt="CMX" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Coloctionneurs",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/COLOCTIONNEURS-1024x1024.webp" alt="Coloctionneurs" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Comptoir",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/COMPTOIR-1024x1024.webp" alt="Comptoir" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Côté Seine",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/COTE-SEINE-1024x1024.webp" alt="Côté Seine" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Dermajolie",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/DERMAJOLIE-1024x1024.webp" alt="Dermajolie" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Digicademy",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/DIGICADEMY-1024x1024.webp" alt="Digicademy" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "EMPC",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/EMPC-1024x1024.webp" alt="EMPC" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Equinox",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/EQUINOX-1024x1024.webp" alt="Equinox" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Folies",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/FOLIES-1024x1024.webp" alt="Folies" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Groupe IN",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/GROUPE-IN-1024x1024.webp" alt="Groupe IN" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "IAD",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/IAD-1024x1024.webp" alt="IAD" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Ishyati Beauty",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/ISHYATIBEAUTY-1024x1024.webp" alt="Ishyati Beauty" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Lakaz Immo",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/LAKAZ-IMMO-1024x1024.webp" alt="Lakaz Immo" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "LBA",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/LBA-1024x1024.webp" alt="LBA" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "LCDA",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/LCDA_LOGO_FD-BLANC_14CM-1024x877.webp" alt="LCDA" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Lilo Beauty",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/LILO-BEAUTY-1024x1024.webp" alt="Lilo Beauty" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Mahaveli",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/MAHAVELI-1024x1024.webp" alt="Mahaveli" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Maison Nomade",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/MAISON-NOMADE-1024x1024.webp" alt="Maison Nomade" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Meta",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/META-1024x1024.webp" alt="Meta" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Métissage",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/METISSAGE-1024x1024.webp" alt="Métissage" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "My Bloom Story",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/MY-BLOOM-STORY-1024x1024.webp" alt="My Bloom Story" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Mystik",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/MYSTIK-1024x1024.webp" alt="Mystik" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "NSMT",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/NSMT-1024x1024.webp" alt="NSMT" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "O2",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/o2-1024x1024.webp" alt="O2" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Pascal Des",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/PASCAL-DES-1024x1024.webp" alt="Pascal Des" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  },
  {
    title: "Pizza Stella",
    link: "#",
    thumbnail: <OptimizedImage src="/partenaires/PIZZA-STELLA-1024x1024.webp" alt="Pizza Stella" width={1024} height={1024} className="w-full h-full object-contain" objectFit="contain" />,
  }
]

export default function Home() {
  // Handle instant scroll to sections
  useInstantScroll()
  
  useEffect(() => {
    // Forcer le scroll au top après le montage complet du DOM
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SEO
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        keywords={seoConfig.pages.home.keywords}
        url={seoConfig.default.siteUrl}
        structuredData={businessStructuredData}
      />

      <HeaderLuxury />
      <main className="pt-32">
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