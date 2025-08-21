import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { SEO } from '@/components/SEO'
import { seoConfig, businessStructuredData } from '@/lib/seo-config'
import { PartnerImage } from '@/components/ui/PartnerImage'
import { partnersData } from '@/lib/partners-data'
import { HeaderLuxury } from '../components/Header'
import { ResultsSection } from '../components/ResultsSection'
import { VideoSection } from '../components/VideoSection'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { CaseStudiesSection } from '../components/CaseStudiesSection'
import { FAQSection } from '../components/FAQSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { useInstantScroll } from '@/hooks/useInstantScroll'

// Code splitting pour les composants lourds
const HeroParallax = dynamic(
  () => import('../components/HeroParallax/HeroParallax').then((mod) => mod.HeroParallax),
  { 
    ssr: false,
    loading: () => <div className="min-h-[600px] bg-gradient-to-b from-white to-gray-50" />
  }
)

const ServicesSection = dynamic(
  () => import('../components/ServicesSection').then((mod) => mod.ServicesSection),
  { 
    loading: () => <div className="min-h-[400px]" />
  }
)

const AboutSection = dynamic(
  () => import('../components/AboutSection').then((mod) => mod.AboutSection),
  { 
    loading: () => <div className="min-h-[400px]" />
  }
)

// Générer les products à partir des données centralisées
const products = partnersData.map((partner, index) => ({
  title: partner.name,
  link: "#",
  thumbnail: (
    <PartnerImage
      src={`/partenaires/${partner.filename}`}
      alt={partner.alt}
      className="w-full h-full object-contain"
      priority={index < 8} // Les 8 premiers avec priority pour performance initiale
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    />
  ),
}))

export default function Home() {
  // Handle instant scroll to sections
  useInstantScroll()
  
  useEffect(() => {
    // Vérifier si on doit ouvrir la section services
    const urlParams = new URLSearchParams(window.location.search)
    const shouldOpenServices = urlParams.get('openServices') === 'true'
    
    if (shouldOpenServices) {
      // Attendre que le DOM soit prêt puis scroller vers services
      setTimeout(() => {
        const servicesSection = document.getElementById('services')
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    } else if (!window.location.hash) {
      // Forcer le scroll au top après le montage complet du DOM, sauf s'il y a un hash
      const timer = setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
      
      return () => clearTimeout(timer)
    }
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