import Image from 'next/image'
import Link from 'next/link'
import { generateContactUrl } from '@/lib/contact-utils'

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string
    link: string
    thumbnail: any
  }[]
}) => {
  const firstRow = products.slice(0, 20)
  const secondRow = products.slice(20, 40)

  return (
    <div className="relative overflow-hidden bg-[#8B1431]">
      {/* Logo rows behind — subtle watermark */}
      <div className="absolute inset-0 z-0 flex flex-col justify-end pb-4 md:pb-8 gap-4 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="logo-scroll-container">
          <div className="logo-scroll-track logo-scroll-right">
            {[...firstRow, ...firstRow].map((product, idx) => (
              <LogoCard key={`bg-first-${idx}`} product={product} />
            ))}
          </div>
        </div>
        <div className="logo-scroll-container">
          <div className="logo-scroll-track logo-scroll-left">
            {[...secondRow, ...secondRow].map((product, idx) => (
              <LogoCard key={`bg-second-${idx}`} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 md:pt-36 pb-16 md:pb-24">
        {/* Centered layout */}
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Publicité en ligne.
            <br />
            <span className="bg-gradient-to-r from-digiqo-accent to-yellow-400 bg-clip-text text-transparent">
              Résultats concrets.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Facebook, Instagram, Google & TikTok Ads — gérés par des experts certifiés Meta. Plus de 230 entreprises nous font déjà confiance.
          </p>

          {/* Single CTA */}
          <div className="mt-8 md:mt-10">
            <Link href={generateContactUrl({
              description: 'Je veux booster mes ventes avec des campagnes publicitaires'
            })}>
              <span className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#8B1431] font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                Demander un audit gratuit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-white/80"><span className="text-white font-semibold">4.8/5</span> sur Google</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80"><span className="text-white font-semibold">230+</span> clients actifs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80"><span className="text-white font-semibold">Certifiés</span> Meta Business Partner</span>
            </div>
          </div>

          {/* Platform logos */}
          <div className="mt-10 flex items-center justify-center gap-3 md:gap-4">
            {/* Meta */}
            <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <svg className="h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>Meta</title>
                <path d="M6.897 4h-.024l-.031 2.615h.022c1.715 0 3.046 1.357 5.94 6.246l.175.297.012.02 1.62-2.438-.012-.019a48.763 48.763 0 00-1.098-1.716 28.01 28.01 0 00-1.175-1.629C10.413 4.932 8.812 4 6.896 4z" fill="#0082FB"/>
                <path d="M6.873 4C4.95 4.01 3.247 5.258 2.02 7.17l2.254 1.231c.718-1.083 1.61-1.774 2.568-1.785h.021L6.896 4h-.023z" fill="#0082FB"/>
                <path d="M10.78 9.654c-1.528 2.35-2.454 3.825-2.454 3.825-2.035 3.2-2.739 3.917-3.871 3.917a1.545 1.545 0 01-1.186-.508l-2.017 1.744C2.01 19.518 3.058 20 4.356 20c1.963 0 3.374-.928 5.884-5.33l1.766-3.13a41.283 41.283 0 00-1.227-1.886z" fill="#0082FB"/>
                <path d="M20.918 5.713C19.853 4.633 18.583 4 17.225 4c-1.432 0-2.637.787-3.723 1.944l1.382 1.24c.715-.747 1.408-1.12 2.176-1.12.826 0 1.6.39 2.27 1.075l1.589-1.425z" fill="#0082FB"/>
                <path d="M23.998 14.125c-.06-3.467-1.27-6.566-3.064-8.396l-1.588 1.424c1.35 1.392 2.277 3.98 2.361 6.971h2.292z" fill="#0082FB"/>
                <path d="M18.309 16.515c-.55-.642-1.232-1.712-2.303-3.44l-1.396-2.336-1.62 2.438.989 1.668c.959 1.61 1.74 2.774 2.493 3.585l1.834-1.914z" fill="#0082FB"/>
              </svg>
            </div>
            {/* Google Ads */}
            <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Image src="/Google_Ads_logo.svg.png" alt="Google Ads" width={80} height={32} className="h-8 md:h-10 w-auto" />
            </div>
            {/* TikTok */}
            <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <svg className="h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>TikTok</title>
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.4a8.16 8.16 0 004.76 1.52V7.48a4.83 4.83 0 01-1-.79z" fill="#000"/>
              </svg>
            </div>
            {/* YouTube */}
            <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <svg className="h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>YouTube</title>
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFF"/>
              </svg>
            </div>
            {/* LinkedIn */}
            <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <svg className="h-8 w-8 md:h-10 md:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
              </svg>
            </div>
          </div>

          {/* Mascotte */}
          <div className="mt-8 flex justify-center">
            <div className="hero-logo-float">
              <Image
                src="/digiqo-hero-mascot.webp"
                alt="Digiqo mascotte"
                width={200}
                height={200}
                className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .logo-scroll-container {
          overflow: hidden;
          width: 100%;
        }
        .logo-scroll-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          will-change: transform;
        }
        .logo-scroll-right {
          animation: scrollRight 120s linear infinite;
        }
        .logo-scroll-left {
          animation: scrollLeft 120s linear infinite;
        }
        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .hero-logo-float {
          animation: heroFloat 6s ease-in-out infinite;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-scroll-right,
          .logo-scroll-left,
          .hero-logo-float {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

const LogoCard = ({ product }: { product: { title: string; thumbnail: any } }) => {
  return (
    <div className="h-20 w-[7rem] flex-shrink-0">
      <div className="h-full w-full bg-white/95 rounded-lg flex items-center justify-center p-3 shadow-sm">
        <div className="w-full h-full max-w-[60px] max-h-[60px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
          {product.thumbnail}
        </div>
      </div>
    </div>
  )
}

// Header export kept for backward compatibility but no longer used as separate component
export const Header = () => null
