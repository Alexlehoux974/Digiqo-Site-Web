import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { SEO } from '@/components/SEO'
import { seoConfig, businessStructuredData } from '@/lib/seo-config'
import Image from 'next/image'
import { PartnerImage } from '@/components/ui/PartnerImage'
import { partnersData } from '@/lib/partners-data'
import { HeaderLuxury } from '../components/Header'
import { Footer } from '../components/Footer'
import { useInstantScroll } from '@/hooks/useInstantScroll'
import { ArrowRight, Play, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { clientVideos } from '@/lib/client-videos'

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

const ResultsSection = dynamic(
  () => import('../components/ResultsSection').then((mod) => mod.ResultsSection),
  { loading: () => <div className="min-h-[200px]" /> }
)

const TestimonialsSection = dynamic(
  () => import('../components/TestimonialsSection').then((mod) => mod.TestimonialsSection),
  { loading: () => <div className="min-h-[400px]" /> }
)

const FAQSection = dynamic(
  () => import('../components/FAQSection').then((mod) => mod.FAQSection),
  { loading: () => <div className="min-h-[400px]" /> }
)

const ContactSection = dynamic(
  () => import('../components/ContactSection').then((mod) => mod.ContactSection),
  { loading: () => <div className="min-h-[400px]" /> }
)

const BlogCarousel = dynamic(
  () => import('@/components/BlogCarousel').then((mod) => mod.BlogCarousel),
  { loading: () => <div className="min-h-[300px]" /> }
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
      priority={index < 8}
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    />
  ),
}))

// Video thumbnails mapping
const videoThumbs: Record<string, string> = {
  "CÔTE SEINE": "/references/video-thumbs/cote-seine.webp",
  "NOMAD": "/references/video-thumbs/nomad.webp",
  "TWINS DESIGN": "/references/video-thumbs/twins-design.webp",
  "VEILLE À NÔU": "/references/video-thumbs/veille-a-nou.webp",
  "C BIEN GLACÉ": "/references/video-thumbs/c-bien-glace.webp",
  "DERMA JOLIE": "/references/video-thumbs/derma-jolie.webp",
  "CULINARION": "/references/video-thumbs/culinarion.webp",
  "AGENCE CENTRALE DE L'OR": "/references/video-thumbs/agence-centrale-or.webp",
  "ASI TECHNOLOGIE": "/references/video-thumbs/asi-technologie.webp",
  "BURO": "/references/video-thumbs/buro.webp",
  "EDEN DU RANDONNEUR": "/references/video-thumbs/eden-randonneur.webp",
  "GARAGE FCSA": "/references/video-thumbs/garage-fcsa.webp",
  "GLOBAL SERVICE": "/references/video-thumbs/global-service.webp",
  "INTÉRIEURS PRIVÉS": "/references/video-thumbs/interieurs-prives.webp",
  "LA PART DES ANGES": "/references/video-thumbs/la-part-des-anges.webp",
  "LADRESS": "/references/video-thumbs/ladress.webp",
  "LE GOÛT DU VIN": "/references/video-thumbs/le-gout-du-vin.webp",
  "LELINGE.RE": "/references/video-thumbs/lelinge.webp",
  "LES CAFÉS D'ITALIE": "/references/video-thumbs/les-cafes-ditalie.webp",
  "LITTLE LIBELULLE": "/references/video-thumbs/little-libellule.webp",
  "ONE-MARKET": "/references/video-thumbs/one-market.webp",
  "PASS-XP": "/references/video-thumbs/pass-xp.webp",
  "PÊCHE PASSION": "/references/video-thumbs/peche-passion.webp",
  "POKAWA": "/references/video-thumbs/pokawa.webp",
  "SAM CONCEPT HABITAT": "/references/video-thumbs/sam-concept-habitat.webp",
  "CAVAVIN": "/references/video-thumbs/cavavin.webp",
  "COPEAUX D'ABORD": "/references/video-thumbs/copeaux-dabord.webp",
  "DORCEL": "/references/video-thumbs/dorcel.webp",
  "ÉMULSION 2": "/references/video-thumbs/emulsion.webp",
  "EN L'AIR PIED BOIS": "/references/video-thumbs/en-lair-pied-bois.webp",
  "HÉRACLES COACHING": "/references/video-thumbs/heracles-coaching.webp",
  "INSTITUT DESBEANCE": "/references/video-thumbs/institut-desbeance.webp",
  "LILOO BEAUTY": "/references/video-thumbs/liloo-beauty.webp",
  "PAPANG": "/references/video-thumbs/papang.webp",
  "ULM": "/references/video-thumbs/ulm.webp",
  "VANILLE JEU-CONCOURS": "/references/video-thumbs/vanille-jeu-concours.webp",
}

function VideoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const getPreviewUrl = (src: string) => {
    const match = src.match(/id=([^&]+)/) || src.match(/\/d\/([^/]+)/)
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : src
  }

  return (
    <>
      <div className="relative group">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {clientVideos.map((video, i) => {
            const thumb = videoThumbs[video.clientName]
            if (!thumb) return null
            return (
              <button
                key={i}
                onClick={() => setActiveVideo(video.src)}
                className="flex-shrink-0 snap-start group/card cursor-pointer text-center"
              >
                {/* iPhone mockup */}
                <div className="relative w-[180px] md:w-[220px] mx-auto">
                  {/* Phone frame */}
                  <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-[3px] shadow-2xl shadow-black/50 group-hover/card:-translate-y-2 group-hover/card:shadow-digiqo-accent/20 transition-all duration-500">
                    {/* Inner bezel */}
                    <div className="relative bg-black rounded-[2.3rem] overflow-hidden">
                      {/* Notch / Dynamic Island */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[28px] bg-black rounded-b-2xl" />

                      {/* Screen content */}
                      <div className="relative aspect-[9/19.5]">
                        <Image
                          src={thumb}
                          alt={video.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          loading="lazy"
                          sizes="220px"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover/card:bg-white/30 group-hover/card:scale-110 transition-all duration-300 ring-2 ring-white/30">
                            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                          </div>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/30 rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Client name below phone */}
                <p className="text-white/90 font-semibold text-sm mt-4 drop-shadow-lg">{video.clientName}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-[90vw] h-[85vh] md:w-[70vw] md:h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getPreviewUrl(activeVideo)}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function Home() {
  useInstantScroll()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const shouldOpenServices = urlParams.get('openServices') === 'true'

    if (shouldOpenServices) {
      setTimeout(() => {
        const servicesSection = document.getElementById('services')
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    } else if (!window.location.hash) {
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
      <main className="bg-[#8B1431]">
        <h1 className="sr-only">
          L'Agence Marketing Digital Qui Booste Vos Ventes - Digiqo La Réunion
        </h1>

        {/* 1. Hero + Logos */}
        <HeroParallax products={products} />
        <ResultsSection />

        {/* 2. Réalisations vidéo — Carrousel */}
        <section id="realisations" className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-digiqo-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-digiqo-secondary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-bold rounded-full mb-6 ring-1 ring-white/20">
              + DE 40 VIDÉOS PRODUITES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-white">Nos réalisations</span>{' '}
              <span className="bg-gradient-to-r from-digiqo-accent to-yellow-400 bg-clip-text text-transparent">
                vidéo
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Des publicités vidéo qui captent l'attention et convertissent
            </p>
          </div>

          <VideoCarousel />
        </section>

        {/* 4. Témoignages */}
        <TestimonialsSection />

        {/* 5. Services */}
        <ServicesSection />

        {/* 6. Kap Numérik */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-digiqo-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-digiqo-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-accent to-orange-400 text-white text-sm font-bold rounded-full mb-6">
                KAP NUMÉRIK — RÉGION RÉUNION
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Jusqu'à <span className="bg-gradient-to-r from-digiqo-accent to-yellow-400 bg-clip-text text-transparent">3 200€</span> d'aide pour votre digital
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                La Région Réunion finance jusqu'à 80% de votre transformation digitale. Digiqo est agence agréée Kap Numérik.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Création de site web', desc: 'Site vitrine, e-commerce ou landing page professionnelle' },
                { title: 'Publicité en ligne', desc: 'Campagnes Meta Ads, Google Ads, TikTok Ads' },
                { title: 'Communication digitale', desc: 'Community management, stratégie réseaux sociaux' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-digiqo-accent/50 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/kap-numerik-la-reunion"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-orange-400 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Vérifier mon éligibilité
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-white/60 text-sm mt-4">
                Gratuit • Réponse immédiate • Agence agréée
              </p>
            </div>
          </div>
        </section>

        {/* 7. Contact */}
        <ContactSection />

        {/* 8. FAQ */}
        <FAQSection />

        {/* 9. Blog */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Blog & Actualités
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Découvrez nos conseils d'experts et les dernières tendances du marketing digital à La Réunion
              </p>
            </div>

            <BlogCarousel />

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#8B1431] font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Voir tous les articles
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Transition bordeaux → noir vers le footer */}
        <div className="h-24 bg-gradient-to-b from-transparent to-black/80" />
      </main>
      <Footer />
    </>
  )
}
