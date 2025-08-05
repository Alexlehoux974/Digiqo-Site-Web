import { useEffect } from 'react'
import { SEO } from '@/components/SEO'
import { seoConfig, businessStructuredData } from '@/lib/seo-config'
import { PartnerImage } from '@/components/ui/PartnerImage'
import { partnersData } from '@/lib/partners-data'
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
    // Forcer le scroll au top après le montage complet du DOM, sauf s'il y a un hash
    if (!window.location.hash) {
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