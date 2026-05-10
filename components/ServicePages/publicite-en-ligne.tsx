import Head from 'next/head'
import dynamic from 'next/dynamic'
import { TrendingUp } from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { ServiceHero } from '@/components/ServicePages/ServiceHero'
import { quickWins } from '@/components/ServicePages/publicite-en-ligne/sections/FormulesSection'
import { faqs } from '@/components/ServicePages/publicite-en-ligne/sections/FaqSection'

// All 7 below-the-fold sections are dynamic({ ssr: true }) — content stays
// in the SSR HTML (mandatory: no content removal per project rule), but the
// JS chunk for each section ships separately and is no longer in the
// initial page bundle. ServiceHero + Quick Wins stay synchronous (above
// the fold).
const WhySection = dynamic(() => import('@/components/ServicePages/publicite-en-ligne/sections/WhySection'))
const PlatformsSection = dynamic(() => import('@/components/ServicePages/publicite-en-ligne/sections/PlatformsSection'))
const ProcessStepsSection = dynamic(() => import('@/components/ServicePages/publicite-en-ligne/sections/ProcessStepsSection'))
const ClientResultsSection = dynamic(() => import('@/components/ServicePages/publicite-en-ligne/sections/ClientResultsSection'))
const FormulesSection = dynamic(() => import('@/components/ServicePages/publicite-en-ligne/sections/FormulesSection'))
const FaqSection = dynamic(() => import('@/components/ServicePages/publicite-en-ligne/sections/FaqSection'))
const CtaFinalSection = dynamic(() => import('@/components/ServicePages/publicite-en-ligne/sections/CtaFinalSection'))

export default function PubliciteEnLignePage() {
  const seoData = servicesSEO['publicite-en-ligne']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Publicité en Ligne à La Réunion - SMA & SEA',
    provider: {
      '@type': 'Organization',
      name: 'Digiqo',
      url: 'https://digiqo.fr'
    },
    areaServed: {
      '@type': 'Place',
      name: 'La Réunion'
    },
    description: 'Gestion professionnelle de campagnes publicitaires en ligne à La Réunion : Facebook Ads, Instagram Ads, TikTok Ads et Google Ads. Ciblage local, optimisation continue.'
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData?.title || 'Publicité en Ligne La Réunion | Google Ads, Facebook, Instagram, TikTok 974 | Digiqo'}</title>
        <meta name="description" content={seoData?.description || 'Agence publicité en ligne à La Réunion (974). Campagnes Google Ads, Facebook Ads, Instagram Ads, TikTok Ads. Ciblage local, optimisation continue, reporting mensuel.'} />

        {/* Open Graph */}
        <meta property="og:title" content="Publicité en Ligne La Réunion | Google Ads, Facebook, Instagram, TikTok 974 | Digiqo" />
        <meta property="og:description" content="Campagnes publicitaires sur-mesure à La Réunion : réseaux sociaux et Google Ads. Ciblage local, optimisation continue." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digiqo.fr/services/publicite-en-ligne" />
        <meta property="og:image" content="https://digiqo.fr/assets/digiqo-og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Publicité en Ligne La Réunion | Digiqo" />
        <meta name="twitter:description" content="Campagnes Google Ads, Facebook Ads, Instagram Ads, TikTok Ads à La Réunion (974)" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://digiqo.fr/services/publicite-en-ligne" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={TrendingUp}
        title={{
          line1: "Publicité en Ligne",
          line2: "à La Réunion"
        }}
        subtitle="Campagnes ultra-performantes sur Facebook, Instagram, TikTok et Google Ads qui transforment vos prospects en clients fidèles"
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Parler à un expert",
            href: "tel:+262262025102"
          }
        }}
        gradientFrom="from-digiqo-accent"
        gradientTo="to-amber-400"
      />

      {/* Quick Wins Section — above-the-fold static (was motion.div whileInView, stripped for TBT) */}
      <section className="relative py-16 -mt-20">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickWins.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-digiqo-accent to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col flex-grow text-center">
                  <h2 className="text-lg font-bold text-digiqo-primary mb-3 min-h-[28px]">
                    {item.title}
                  </h2>
                  <p className="text-sm text-digiqo-primary/70 mb-4 flex-grow min-h-[60px]">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block text-xs font-semibold text-digiqo-primary bg-digiqo-accent/10 px-3 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All below-the-fold sections — dynamic({ ssr: true }) split chunks.
          Content remains in SSR HTML (mandatory: no content removal); only
          the per-section JS chunk loads asynchronously. */}
      <WhySection />
      <PlatformsSection />
      <ProcessStepsSection />
      <ClientResultsSection />
      <FormulesSection />
      <FaqSection />
      <CtaFinalSection />
    </ServiceLayout>
  )
}
