import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { SectionGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { ServiceHero } from './ServiceHero'
import { 
  Code, 
  Shield, 
  Rocket,
  CheckCircle2,
  Globe,
  Sparkles,
  Star,
  Coffee,
  FileText,
  CreditCard,
  Headphones,
  RefreshCw,
  MessageCircle
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateWhatsAppLink } from '../../lib/whatsapp-utils'
import { 
  ReactIcon, 
  NodejsIcon, 
  NextjsIcon, 
  MongoDBIcon, 
  TailwindCSSIcon 
} from '@/components/icons'
import { getProductsForService } from '../../lib/airtable-products'

// Code particles are now handled by CodeParticleSystem component

// Composant de métrique animée
interface AnimatedMetricProps {
  value: string
  label: string
  suffix?: string
  delay?: number
}

const AnimatedMetric = ({ value, label, suffix = '', delay = 0 }: AnimatedMetricProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let start = 0
        const end = parseInt(value)
        const duration = 2000
        const increment = end / (duration / 16)
        
        const counter = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(counter)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
        
        return () => clearInterval(counter)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, value, delay])
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/80">{label}</div>
    </div>
  )
}

interface WebPackage {
  id: string
  name: string
  price: string
  description: string
  deliveryTime: string
  note?: string
  gradient: string
  popular?: boolean
  highlights: string[]
  sections: {
    bonus: {
      title: string
      items: string[]
    }
    features: {
      title: string
      items: string[]
    }
    technical: {
      title: string
      items: string[]
    }
    included?: {
      title: string
      items: string[]
    }
  }
  paymentLink?: string
}

// Get real products from Airtable data
const devProducts = getProductsForService('dev-web')

// Transform products to match the WebPackage interface  
const packages: WebPackage[] = devProducts.filter(p => 
  p.name.includes('Site Vitrine') || 
  p.name.includes('E-commerce') || 
  p.name.includes('Landing Page')
).slice(0, 4).map((product, index) => {
  const gradients = [
    'from-digiqo-secondary to-digiqo-secondary/80',
    'from-digiqo-primary to-digiqo-accent',
    'from-digiqo-accent to-orange-500',
    'from-digiqo-primary to-digiqo-primary/80'
  ]
  
  // Parse notes into sections
  const noteLines = product.notes?.split('\n').filter(line => line.trim()) || []
  const includedItems = noteLines.filter(line => line.startsWith('•')).map(line => line.substring(1).trim())
  
  // Separate items by category
  const bonusItems = includedItems.filter(item => 
    item.includes('Hébergement') || item.includes('Formation') || item.includes('offert')
  )
  const featureItems = includedItems.filter(item => 
    !bonusItems.includes(item) && !item.includes('SEO') && !item.includes('SSL')
  )
  const technicalItems = includedItems.filter(item => 
    item.includes('SEO') || item.includes('SSL') || item.includes('Analytics') || item.includes('Performance')
  )
  
  return {
    id: product.id,
    name: product.name,
    price: product.priceFormatted === 'Sur devis' ? product.priceFormatted : `${product.priceFormatted} HT`,
    description: product.description,
    deliveryTime: product.duration || '2-4 semaines',
    gradient: gradients[index % gradients.length],
    popular: product.name.includes('Premium'),
    highlights: includedItems.slice(0, 3),
    paymentLink: product.paymentLink,
    sections: {
      bonus: {
        title: 'Bonus inclus',
        items: bonusItems.length > 0 ? bonusItems : [
          'Hébergement 1 an offert',
          'Maintenance incluse',
          'Support technique'
        ]
      },
      features: {
        title: 'Fonctionnalités',
        items: featureItems.length > 0 ? featureItems.slice(0, 5) : [
          'Design responsive',
          'Formulaire de contact',
          'Intégration réseaux sociaux',
          'Optimisation mobile'
        ]
      },
      technical: {
        title: 'Technique',
        items: technicalItems.length > 0 ? technicalItems : [
          'Certificat SSL',
          'SEO optimisé',
          'Analytics intégré'
        ]
      }
    }
  }
})

// Portfolio data is now handled differently in the portfolio section
// const portfolio = [
//   { name: 'CMX FACTORY', description: 'Vos pièces Cross & Supermot.', image: '/portfolio/cmx-factory.jpg' },
//   { name: 'CBD RUN', description: 'CBD Bio à la Réunion !', image: '/portfolio/cbd-run.jpg' },
//   { name: 'SNOWKITE SENTATION', description: 'Passez du Kitesurf au Snowkite', image: '/portfolio/snowkite.jpg' },
//   { name: 'CLICKNVAN', description: 'L\'aventure commence !', image: '/portfolio/clicknvan.jpg' },
//   { name: 'SOGITE', description: 'Solutions informatiques professionnelles', image: '/portfolio/sogite.jpg' }
// ]

export default function DevWebPage() {
  const seoData = servicesSEO['developpement-web-reunion']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Développement Web La Réunion',
    provider: {
      '@type': 'Organization',
      name: 'Digiqo',
      url: 'https://digiqo.fr'
    },
    areaServed: {
      '@type': 'Place',
      name: 'La Réunion'
    },
    description: seoData.description,
    offers: packages.map(pkg => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price.replace(' HT', '').replace('€', '').replace(/\s/g, ''),
      priceCurrency: 'EUR',
      deliveryLeadTime: pkg.deliveryTime
    }))
  }

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        
        <link rel="canonical" href={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={Code}
        title={{
          line1: "Code qui",
          line2: "Performe"
        }}
        subtitle="Sites web haute performance, sur-mesure et optimisés SEO. Technologie de pointe, design premium, résultats garantis."
        ctaButtons={{
          primary: {
            text: "Demander un devis",
            href: generateWhatsAppLink({ service: 'dev-web', context: 'devis' })
          },
          secondary: {
            text: "Voir nos réalisations",
            href: "#portfolio"
          }
        }}
        gradientFrom="from-digiqo-secondary"
        gradientTo="to-digiqo-secondary/80"
        iconColor="text-digiqo-secondary"
      />

      {/* Features Section Premium */}
      <section className="py-24 bg-gradient-to-br from-white to-digiqo-accent/5 relative overflow-hidden">
        {/* Background decoration */}
        <SectionGradientOrbs />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              {...ANIMATION.entry.scaleIn}
              whileInView={ANIMATION.entry.scaleIn.animate}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-accent to-orange-500 text-white text-sm font-bold rounded-full mb-6"
            >
              NOUVEAU - SITES WEB EN ABONNEMENT
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Sites Web <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 bg-clip-text text-transparent">sur mesure ou en abonnement</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-4">
              Votre présence en ligne professionnelle dès 99€/mois
            </p>
            <p className="text-lg text-digiqo-primary/60 max-w-2xl mx-auto">
              Sans frais de création • Hébergement inclus • Support technique inclus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Site One Page Essentiel */}
            <motion.div
              {...ANIMATION.entry.fadeInUpLarge}
              whileInView={ANIMATION.entry.fadeInUpLarge.animate}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger }}
              whileHover={ANIMATION.hover.liftLarge}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-8 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Site One Page</h3>
                  <p className="text-white/90 text-sm text-center">Landing page professionnelle – tout inclus</p>
                </div>
                
                {/* Prix */}
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-digiqo-primary">
                      99€
                    </p>
                    <p className="text-gray-600 mt-2">/mois</p>
                    <p className="text-xs text-digiqo-primary/60 mt-2">Engagement minimum 3 mois</p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="p-6 flex-grow">
                  <h4 className="font-semibold text-gray-800 mb-4">Inclus :</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Sections : Accueil, Services, Galerie, À propos, Témoignages, FAQ, Contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Mode jour/nuit – attirez l'attention de vos visiteurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Formulaire intelligent – recevez vos demandes directement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Galerie responsive – valorisez vos réalisations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">SEO + Analytics – soyez visible et mesurez vos résultats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Design mobile-first – parfait sur tous les écrans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Personnalisation complète – votre image, vos couleurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Hébergement sécurisé + support technique – nous gérons tout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-secondary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Témoignages intégrés – rassurez vos prospects</span>
                    </li>
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <a
                    href="https://app-eu1.hubspot.com/payments/tNtmnNDDGMvXRXR?referrer=PAYMENT_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 px-6 text-center font-semibold rounded-full transition-all bg-white border-2 border-digiqo-secondary text-digiqo-secondary hover:bg-digiqo-secondary hover:text-white"
                  >
                    Choisir cette formule
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Site One Page + Devis */}
            <motion.div
              {...ANIMATION.entry.fadeInUpLarge}
              whileInView={ANIMATION.entry.fadeInUpLarge.animate}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 2 }}
              whileHover={ANIMATION.hover.liftLarge}
              className="group relative"
            >
              {/* Badge Populaire */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-digiqo-accent via-orange-500 to-amber-500 rounded-full blur-sm opacity-75 group-hover:blur-md transition-all duration-300 animate-pulse"></div>
                  <span className="relative flex items-center gap-2 bg-gradient-to-r from-digiqo-accent to-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-xl border-2 border-white/20 backdrop-blur-sm">
                    <svg className="w-4 h-4 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Le plus populaire
                    <svg className="w-4 h-4 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
              </div>
              
              <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden ring-2 ring-digiqo-accent">
                {/* Header */}
                <div className="p-8 bg-gradient-to-br from-digiqo-accent to-orange-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Site One Page + Devis</h3>
                  <p className="text-white/90 text-sm text-center">Landing page interactive – tout inclus</p>
                </div>
                
                {/* Prix */}
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-digiqo-accent">
                      199€
                    </p>
                    <p className="text-gray-600 mt-2">/mois</p>
                    <p className="text-xs text-digiqo-primary/60 mt-2">Engagement minimum 3 mois</p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="p-6 flex-grow">
                  <h4 className="font-semibold text-gray-800 mb-4">Inclus :</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold">Sections : Accueil, Services, Estimation automatique, Galerie, À propos, Témoignages, FAQ, Contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold">Devis instantané – vos visiteurs obtiennent une estimation en direct</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">Formulaire intelligent – centralisez toutes les demandes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">Galerie responsive – valorisez vos réalisations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">SEO optimisé + Analytics – soyez visible et mesurez vos résultats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">Design mobile-first – parfait sur tous les écrans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">Personnalisation complète – couleurs, logo, textes adaptés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">Hébergement sécurisé + support technique inclus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-accent shrink-0 mt-0.5" />
                      <span className="text-gray-700">Témoignages intégrés – rassurez vos prospects</span>
                    </li>
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <a
                    href="https://app-eu1.hubspot.com/payments/sg9GhNqGRxhm?referrer=PAYMENT_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 px-6 text-center font-semibold rounded-full transition-all bg-gradient-to-r from-digiqo-accent to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Choisir cette formule
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Site One Page Restaurant */}
            <motion.div
              {...ANIMATION.entry.fadeInUpLarge}
              whileInView={ANIMATION.entry.fadeInUpLarge.animate}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION.delay.stagger * 3 }}
              whileHover={ANIMATION.hover.liftLarge}
              className="group relative"
            >
              <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-8 bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Coffee className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">Site Restaurant</h3>
                  <p className="text-white/90 text-sm text-center">Landing page interactive – tout inclus</p>
                </div>
                
                {/* Prix */}
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-digiqo-primary">
                      299€
                    </p>
                    <p className="text-gray-600 mt-2">/mois</p>
                    <p className="text-xs text-digiqo-primary/60 mt-2">Engagement minimum 3 mois</p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="p-6 flex-grow">
                  <h4 className="font-semibold text-gray-800 mb-4">Inclus :</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold">Sections : Accueil, Services, Estimation automatique, Galerie, À propos, Témoignages, FAQ, Contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-semibold">Devis instantané – vos visiteurs obtiennent une estimation en direct</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Formulaire intelligent – centralisez toutes les demandes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Galerie responsive – valorisez vos réalisations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">SEO optimisé + Analytics – soyez visible et mesurez vos résultats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Design mobile-first – parfait sur tous les écrans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Personnalisation complète – couleurs, logo, textes adaptés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Hébergement sécurisé + support technique inclus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-digiqo-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">Témoignages intégrés – rassurez vos prospects</span>
                    </li>
                  </ul>
                </div>
                
                {/* CTA */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <a
                    href="https://app-eu1.hubspot.com/payments/9z9ymxfC?referrer=PAYMENT_LINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 px-6 text-center font-semibold rounded-full transition-all bg-white border-2 border-digiqo-primary text-digiqo-primary hover:bg-digiqo-primary hover:text-white"
                  >
                    Choisir cette formule
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Avantages Section */}
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-4 gap-6"
          >
            {[
              { icon: CreditCard, title: "Sans frais de création", desc: "0€ d'investissement initial" },
              { icon: Shield, title: "Sans engagement", desc: "Résiliable après 3 mois" },
              { icon: Headphones, title: "Support inclus", desc: "Assistance technique comprise" },
              { icon: RefreshCw, title: "Mises à jour incluses", desc: "Site toujours à jour" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-digiqo-accent/10 to-orange-500/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-digiqo-accent" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process & Technologies Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-primary/80 to-digiqo-primary relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: ANIMATION.duration.verySlow * 13,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 20% 80%, rgba(25, 156, 183, 0.1) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              {...ANIMATION.entry.scaleIn}
              whileInView={ANIMATION.entry.scaleIn.animate}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 text-white text-sm font-bold rounded-full mb-6"
            >
              PROCESSUS & TECHNOLOGIES
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Notre <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 bg-clip-text text-transparent">Méthode</span> Premium
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Une approche structurée et des technologies de pointe pour des résultats exceptionnels
            </p>
          </motion.div>

          {/* Interactive Process Timeline */}
          <div className="mb-24">
            <h3 className="text-2xl font-bold text-white text-center mb-12">Processus de Développement</h3>
            
            <div className="relative">
              {/* Connection line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-digiqo-secondary to-transparent -translate-y-1/2 hidden lg:block" />
              
              <div className="grid lg:grid-cols-4 gap-8">
                {[
                  {
                    phase: "Découverte",
                    icon: Code,
                    description: "Analyse des besoins, audit technique, définition du cahier des charges",
                    color: "from-digiqo-secondary to-digiqo-secondary/80",
                    delay: 0
                  },
                  {
                    phase: "Design",
                    icon: Sparkles,
                    description: "Maquettes UI/UX, prototypage interactif, validation client",
                    color: "from-digiqo-accent to-orange-400",
                    delay: 0.1
                  },
                  {
                    phase: "Développement",
                    icon: Code,
                    description: "Codage sur-mesure, intégrations API, tests unitaires",
                    color: "from-digiqo-primary to-digiqo-accent",
                    delay: 0.2
                  },
                  {
                    phase: "Déploiement",
                    icon: Rocket,
                    description: "Mise en production, monitoring, maintenance évolutive",
                    color: "from-digiqo-secondary to-digiqo-secondary/80",
                    delay: 0.3
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: getStaggerDelay(step.delay) }}
                    className="relative"
                  >
                    {/* Phase card */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="relative bg-digiqo-primary/50 backdrop-blur-md rounded-2xl p-6 border border-digiqo-primary/30 hover:border-digiqo-secondary transition-all duration-300"
                    >
                      {/* Phase number */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-digiqo-primary/70 to-digiqo-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-digiqo-primary">
                        {index + 1}
                      </div>
                      
                      {/* Icon */}
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: ANIMATION.duration.verySlow * 13, repeat: Infinity, ease: ANIMATION.ease.linear }}
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h4 className="text-xl font-bold text-white mb-2">{step.phase}</h4>
                      <p className="text-white/70 text-sm">{step.description}</p>
                      
                      {/* Connection dot */}
                      <div className="absolute -bottom-6 left-1/2 w-3 h-3 bg-digiqo-secondary rounded-full -translate-x-1/2 hidden lg:block" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-2xl font-bold text-white text-center mb-12">Technologies Maîtrisées</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: "React", IconComponent: ReactIcon, color: "from-blue-400 to-blue-600" },
                { name: "Next.js", IconComponent: NextjsIcon, color: "from-digiqo-primary/70 to-digiqo-primary" },
                { name: "Node.js", IconComponent: NodejsIcon, color: "from-digiqo-secondary to-digiqo-secondary/70" },
                { name: "TypeScript", icon: "TS", isText: true, color: "from-blue-500 to-blue-700" },
                { name: "Tailwind", IconComponent: TailwindCSSIcon, color: "from-cyan-400 to-cyan-600" },
                { name: "MongoDB", IconComponent: MongoDBIcon, color: "from-digiqo-secondary/80 to-digiqo-secondary" },
                { name: "PostgreSQL", IconComponent: null, icon: "PG", isText: true, color: "from-blue-600 to-blue-800" },
                { name: "AWS", IconComponent: null, icon: "AWS", isText: true, color: "from-orange-500 to-orange-700" },
                { name: "Docker", IconComponent: null, icon: "D", isText: true, color: "from-blue-400 to-blue-600" },
                { name: "GraphQL", icon: "◈", isText: true, color: "from-digiqo-accent to-digiqo-accent/80" },
                { name: "Redis", IconComponent: null, icon: "R", isText: true, color: "from-red-500 to-red-700" },
                { name: "Stripe", IconComponent: null, icon: "S", isText: true, color: "from-digiqo-primary to-digiqo-primary/80" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  {...ANIMATION.entry.springIn}
                  whileInView={ANIMATION.entry.springIn.animate}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: ANIMATION.hover.scaleLarge.scale, rotate: 5 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300`} />
                  
                  <div className="relative bg-digiqo-secondary/20 backdrop-blur-md rounded-2xl p-4 border border-digiqo-secondary/30 hover:border-white/20 transition-all duration-300">
                    <div className="flex justify-center items-center h-10 mb-2">
                      {tech.IconComponent ? (
                        <tech.IconComponent className="w-10 h-10 text-white" />
                      ) : (
                        <span className="text-3xl text-center text-white font-bold">{tech.icon}</span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 text-center font-medium">{tech.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <AnimatedMetric value="50" suffix="+" label="Sites livrés" delay={0} />
            </div>
            <div className="text-center">
              <AnimatedMetric value="98" suffix="%" label="Clients satisfaits" delay={200} />
            </div>
            <div className="text-center">
              <AnimatedMetric value="5" suffix=" ans" label="D'expérience" delay={400} />
            </div>
            <div className="text-center">
              <AnimatedMetric value="5" suffix="/7" label="Support rapide" delay={600} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Remplace les formules */}
      <section id="formules" className="py-24 bg-gradient-to-br from-white to-digiqo-secondary/5">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.span
              {...ANIMATION.entry.scaleIn}
              whileInView={ANIMATION.entry.scaleIn.animate}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 text-white text-sm font-bold rounded-full mb-6"
            >
              SITE WEB SUR MESURE
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Chaque projet est <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 bg-clip-text text-transparent">unique</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-10">
              Nous créons des sites web entièrement personnalisés selon vos besoins spécifiques. 
              Du design à la fonctionnalité, chaque détail est pensé pour votre succès.
            </p>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6">Pourquoi du sur-mesure ?</h3>
              <div className="space-y-4 text-left mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-digiqo-primary/80">
                    <span className="font-semibold">Solution adaptée</span> : Votre site web répond exactement à vos objectifs business
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-digiqo-primary/80">
                    <span className="font-semibold">Évolutivité garantie</span> : Votre site grandit avec votre entreprise
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-digiqo-primary/80">
                    <span className="font-semibold">Performance optimale</span> : Code optimisé sans compromis
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-digiqo-primary/80">
                    <span className="font-semibold">Design unique</span> : Votre identité visuelle respectée à 100%
                  </p>
                </div>
              </div>
              
              <motion.a
                href={generateWhatsAppLink({ service: 'dev-web', context: 'projet' })}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-300"
              >
                Contactez-nous sur WhatsApp
                <MessageCircle className="w-5 h-5" />
              </motion.a>
              
              <p className="text-sm text-digiqo-primary/60 mt-4">
                Consultation gratuite • Devis personnalisé
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section Premium */}
      <section id="portfolio" className="py-24 bg-gradient-to-br from-white via-digiqo-accent/5 to-white relative overflow-hidden">
        {/* Background decoration */}
        <SectionGradientOrbs />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              {...ANIMATION.entry.scaleIn}
              whileInView={ANIMATION.entry.scaleIn.animate}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 text-white text-sm font-bold rounded-full mb-6"
            >
              <Star className="w-4 h-4" />
              PORTFOLIO PREMIUM
              <Star className="w-4 h-4" />
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 bg-clip-text text-transparent">Réalisations</span> d'Exception
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Des projets qui combinent innovation technique et design premium pour des résultats remarquables
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                name: 'CMX FACTORY',
                description: 'E-commerce haute performance pour pièces Cross & Supermot',
                url: 'cmxfactory.com',
                link: 'https://cmxfactory.com/',
                tags: ['E-commerce', 'React', 'Node.js', 'Stripe'],
                stats: { performance: 98, conversions: '+45%', loading: '1.2s' },
                gradient: 'from-orange-500 to-red-600',
                image: '/portfolio/cmx-factory.png'
              },
              {
                name: 'CBD RUN',
                description: 'Plateforme de vente en ligne de CBD bio à La Réunion',
                url: 'cbd-run.com',
                link: 'https://cbd-run.com/',
                tags: ['E-commerce', 'Next.js', 'Shopify', 'SEO'],
                stats: { performance: 96, conversions: '+62%', loading: '0.9s' },
                gradient: 'from-digiqo-secondary to-digiqo-secondary/80',
                image: '/portfolio/cbd-run.png'
              },
              {
                name: 'SNOWKITE SENSATION',
                description: 'Site vitrine immersif pour école de snowkite',
                url: 'snowkitesensation.com',
                link: 'https://www.snowkitesensation.com/fr/',
                tags: ['Vitrine', 'Animation 3D', 'Booking', 'PWA'],
                stats: { performance: 97, conversions: '+38%', loading: '1.1s' },
                gradient: 'from-blue-500 to-cyan-600',
                image: '/portfolio/snowkite.png'
              },
              {
                name: 'CLICKNVAN',
                description: 'Application de location de vans entre particuliers',
                url: 'clicknvan.re',
                link: 'https://clicknvan.re/presentation-du-projet/',
                tags: ['Web App', 'React Native', 'Firebase', 'Maps API'],
                stats: { performance: 95, conversions: '+52%', loading: '1.3s' },
                gradient: 'from-digiqo-primary to-digiqo-accent',
                image: '/portfolio/clicknvan.png'
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="group relative"
              >
                <motion.div
                  whileHover={ANIMATION.hover.liftLarge}
                  className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* Project preview with actual image */}
                  <div className="relative aspect-video overflow-hidden">
                    {/* Project image */}
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-digiqo-primary/50 to-transparent" />
                    
                    {/* Mock browser window */}
                    <div className="absolute inset-4 bg-digiqo-primary/10 backdrop-blur-sm rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Browser bar */}
                      <div className="bg-digiqo-primary/50 backdrop-blur-sm px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <div className="w-3 h-3 bg-digiqo-secondary rounded-full" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="bg-digiqo-primary/50 rounded px-3 py-1 text-xs text-white/70 font-mono">
                            {project.url}
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="relative h-full flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={ANIMATION.ease.spring}
                          className="text-center"
                        >
                          <Globe className="w-12 h-12 text-white mb-2 mx-auto" />
                          <span className="text-white font-bold">Voir le projet</span>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Live indicator */}
                    <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 bg-digiqo-secondary text-white text-xs font-bold rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </div>
                  
                  {/* Project info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                    <p className="text-digiqo-primary/70 mb-6">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-digiqo-secondary/10 text-digiqo-secondary text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Performance metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-digiqo-accent/5 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-digiqo-secondary">{project.stats.performance}</div>
                        <div className="text-xs text-digiqo-primary/70">Performance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-digiqo-accent">{project.stats.conversions}</div>
                        <div className="text-xs text-digiqo-primary/70">Conversions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-digiqo-primary">{project.stats.loading}</div>
                        <div className="text-xs text-digiqo-primary/70">Chargement</div>
                      </div>
                    </div>
                    
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à créer votre site web ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Discutons de votre projet et trouvons ensemble la solution parfaite pour votre entreprise.
            </p>
            <motion.a
              href={generateWhatsAppLink({ service: 'dev-web' })}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contactez-nous sur WhatsApp
              <MessageCircle className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}

