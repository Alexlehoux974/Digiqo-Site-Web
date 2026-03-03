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
// import { CaseStudiesSection } from '../components/CaseStudiesSection'
import { FAQSection } from '../components/FAQSection'
import { ContactSection } from '../components/ContactSection'
import { Footer } from '../components/Footer'
import { useInstantScroll } from '@/hooks/useInstantScroll'
import { BlogCarousel } from '@/components/BlogCarousel'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import DomeGallery from '@/components/ui/dome-gallery'
import { getAllClientVideos } from '@/lib/client-videos'

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
      <main className="pt-28 md:pt-32">
        {/* SEO H1 - Server-side rendered for search engines */}
        <h1 className="sr-only">
          L'Agence Marketing Digital Qui Booste Vos Ventes - Digiqo La Réunion
        </h1>

        <HeroParallax products={products} />
        <ResultsSection />
        <div className="py-8" />

        {/* Dome Gallery - Publicités clients */}
        <section id="realisations" className="py-8 md:py-20 bg-digiqo-primary relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-digiqo-accent/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mb-6 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="text-white">Nos productions</span>{' '}
              <span className="bg-gradient-to-r from-digiqo-accent to-yellow-400 bg-clip-text text-transparent">
                vidéos publicitaires
              </span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Découvrez nos réalisations créatives pour nos clients
            </p>
          </div>
          <div className="h-[600px] md:h-[900px] w-full">
            <DomeGallery
              images={getAllClientVideos()}
              fit={0.8}
              minRadius={400}
              maxRadius={800}
              padFactor={0.2}
              overlayBlurColor="#060010"
              maxVerticalRotationDeg={15}
              dragSensitivity={15}
              enlargeTransitionMs={400}
              segments={30}
              dragDampening={3}
              openedImageWidth="600px"
              openedImageHeight="600px"
              imageBorderRadius="20px"
              openedImageBorderRadius="20px"
              grayscale={false}
            />
          </div>
        </section>
        <div className="py-4 md:py-8" />

        {/* <CaseStudiesSection /> */}
        {/* <div className="py-8" /> */}

        {/* Blog Carousel Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-digiqo-primary mb-4">
                Blog & Actualités
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez nos conseils d'experts et les dernières tendances du marketing digital à La Réunion
              </p>
            </div>

            <BlogCarousel />

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-primary text-white font-semibold rounded-xl hover:bg-digiqo-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Voir tous les articles
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <div className="py-8" />
        <div className="relative py-20">
          <VideoSection />
        </div>
        <div className="py-8" />
        <TestimonialsSection />
        <div className="py-8" />
        <ServicesSection />
        <div className="py-8" />

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