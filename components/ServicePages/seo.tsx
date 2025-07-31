import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Activity,
  CheckCircle2,
  Brain,
  Sparkles,
  Award,
  Rocket,
  Eye,
  MousePointer,
  Clock,
  Zap,
  LineChart
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { ParticleSystem, SEOParticleSystem } from '@/components/ui/floating-particles'
import { HeroGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { ServiceHero } from './ServiceHero'


// Composant de métrique animée
interface AnimatedMetricProps {
  value: number
  suffix?: string
  delay?: number
}

const AnimatedMetric = ({ value, suffix = '', delay = 0 }: AnimatedMetricProps) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount(prev => {
          const next = prev + Math.ceil(value / 50)
          if (next >= value) {
            clearInterval(interval)
            return value
          }
          return next
        })
      }, 30)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return <span>{count}{suffix}</span>
}

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState('technique')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const seoData = servicesSEO['referencement-seo-reunion']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Référencement SEO La Réunion',
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
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'EUR',
      name: 'Audit SEO Gratuit',
      description: 'Analyse complète de votre référencement naturel actuel'
    },
    serviceType: 'SEO / Search Engine Optimization',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services SEO',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audit SEO Complet',
            description: 'Analyse technique, sémantique et concurrentielle'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stratégie de Mots-Clés',
            description: 'Recherche et optimisation des mots-clés stratégiques'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Optimisation On-Page',
            description: 'Amélioration du contenu et de la structure des pages'
          }
        }
      ]
    }
  }

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <meta property="og:image" content="https://digiqo.fr/og-seo.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={Search}
        title={{
          line1: "Dominez Google",
          line2: "avec le SEO Premium"
        }}
        subtitle="Propulsez votre entreprise en première page avec notre expertise SEO locale. +312% de trafic organique moyen • Top 3 Google en 6 mois • ROI garanti"
        ctaButtons={{
          primary: {
            text: "Audit SEO Gratuit",
            href: generateContactUrl({ 
              service: 'seo',
              description: 'Je veux dominer Google avec le SEO premium' 
            })
          },
          secondary: {
            text: "Voir nos résultats",
            href: "#resultats"
          }
        }}
        gradientFrom="from-digiqo-secondary"
        gradientTo="to-blue-400"
        iconColor="text-digiqo-secondary"
      />

      {/* Section Résultats Premium avec animations 3D */}
      <section id="resultats" className="py-24 bg-gradient-to-b from-digiqo-secondary/5 to-white relative overflow-hidden">
        {/* Pattern de fond animé */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B1431' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-digiqo-primary/10 rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5 text-digiqo-primary" />
              <span className="text-digiqo-primary font-semibold">Nos Résultats Parlent</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Des <span className="bg-gradient-to-r from-digiqo-primary to-digiqo-accent bg-clip-text text-transparent">Résultats Exceptionnels</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Chaque jour, nous propulsons des entreprises réunionnaises vers les sommets de Google
            </p>
          </motion.div>
          
          {/* Cartes de résultats interactives */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Carte 1: Evolution du trafic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredCard('traffic')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-digiqo-primary/10 overflow-hidden h-full">
                {/* Gradient de fond animé */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary/5 to-digiqo-secondary/10"
                  animate={{
                    opacity: hoveredCard === 'traffic' ? 1 : 0
                  }}
                  transition={{ duration: ANIMATION.duration.fast }}
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">Evolution Trafic</h3>
                  
                  {/* Graphique animé */}
                  <div className="h-32 flex items-end justify-between gap-2 mb-6">
                    {[20, 35, 45, 60, 75, 85, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-digiqo-secondary to-digiqo-secondary/80 rounded-t-lg"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-digiqo-primary/70">Croissance moyenne</span>
                    <span className="text-3xl font-bold text-digiqo-secondary">+312%</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Carte 2: Positions Google */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
              onMouseEnter={() => setHoveredCard('ranking')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-digiqo-primary/10 overflow-hidden h-full">
                {/* Gradient de fond animé */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/5 to-digiqo-accent/10"
                  animate={{
                    opacity: hoveredCard === 'ranking' ? 1 : 0
                  }}
                  transition={{ duration: ANIMATION.duration.fast }}
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">Positions Top 3</h3>
                  
                  {/* Animation de classement */}
                  <div className="space-y-3 mb-6">
                    {[
                      { pos: 1, count: 47, color: 'from-yellow-400 to-yellow-600' },
                      { pos: 2, count: 31, color: 'from-digiqo-primary/40 to-digiqo-primary/60' },
                      { pos: 3, count: 22, color: 'from-orange-400 to-orange-600' }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + getStaggerDelay(i, ANIMATION.delay.stagger) }}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                          {item.pos}
                        </div>
                        <div className="flex-1 bg-digiqo-primary/10 rounded-full h-4 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.count}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 1 + getStaggerDelay(i, ANIMATION.delay.stagger), duration: ANIMATION.duration.slow }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{item.count}%</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-digiqo-primary/70">Mots-clés en Top 3</span>
                    <span className="text-3xl font-bold text-digiqo-primary">89%</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Carte 3: ROI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
              onMouseEnter={() => setHoveredCard('roi')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-digiqo-primary/10 overflow-hidden h-full">
                {/* Gradient de fond animé */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-digiqo-accent/5 to-amber-400/5"
                  animate={{
                    opacity: hoveredCard === 'roi' ? 1 : 0
                  }}
                  transition={{ duration: ANIMATION.duration.fast }}
                />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-digiqo-accent to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">ROI Moyen</h3>
                  
                  {/* Animation circulaire */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#f3f4f6"
                        strokeWidth="12"
                        fill="none"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient-roi)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: '0 352' }}
                        whileInView={{ strokeDasharray: '281 352' }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="gradient-roi" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#DA6530" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-digiqo-accent">+420%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-digiqo-primary/70">Retour sur investissement</span>
                    <span className="text-lg font-bold text-digiqo-secondary">Garanti</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Témoignage client premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark rounded-3xl p-10 text-white relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity
              }}
            />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-digiqo-accent" />
              <p className="text-2xl font-light mb-6 italic">
                "En 6 mois, DIGIQO nous a propulsés de la page 5 au Top 3 Google. 
                Notre trafic a explosé et nos ventes en ligne ont triplé. 
                Un investissement ultra-rentable !"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img 
                  src="/partenaires/LA-BOUCHERIE-1024x1024.webp" 
                  alt="La Boucherie"
                  className="w-16 h-16 rounded-full bg-white p-2"
                />
                <div className="text-left">
                  <p className="font-bold">Jean-Marc Payet</p>
                  <p className="text-white/80">Directeur Marketing - La Boucherie</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notre Méthode Premium avec Timeline Interactive */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Effet Matrix en arrière-plan */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(25, 156, 183, 0.1) 2px,
                rgba(25, 156, 183, 0.1) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(25, 156, 183, 0.1) 2px,
                rgba(25, 156, 183, 0.1) 4px
              )`
            }}
            animate={{
              backgroundPosition: ['0px 0px', '4px 4px']
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Particules de code flottantes */}
        <SEOParticleSystem count={20} />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-digiqo-secondary/20 backdrop-blur-sm rounded-full mb-6 border border-digiqo-secondary/30"
            >
              <Brain className="w-5 h-5 text-digiqo-secondary" />
              <span className="text-digiqo-secondary font-semibold">Méthode Exclusive</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              La <span className="bg-gradient-to-r from-digiqo-secondary via-digiqo-secondary/80 to-digiqo-accent bg-clip-text text-transparent">Formule DIGIQO</span>
            </h2>
            <p className="text-xl text-digiqo-primary/50 max-w-3xl mx-auto">
              4 phases stratégiques pour dominer Google en 6 mois
            </p>
          </motion.div>

          {/* Timeline interactive avec onglets */}
          <div className="relative">
            {/* Ligne centrale animée */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-digiqo-secondary to-transparent">
              <motion.div
                className="absolute inset-x-0 h-full bg-gradient-to-b from-digiqo-secondary via-digiqo-secondary/80 to-digiqo-accent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ transformOrigin: 'top' }}
              />
            </div>
            
            {/* Phases */}
            {[
              {
                id: 'audit',
                phase: 1,
                title: 'Audit & Analyse',
                duration: 'Semaine 1-2',
                gradient: 'from-digiqo-secondary to-digiqo-secondary/80',
                icon: Search,
                details: [
                  {
                    title: 'Analyse Technique Complète',
                    items: [
                      'Core Web Vitals & Performance',
                      'Indexation & Crawlabilité',
                      'Architecture & Structure',
                      'Sécurité & HTTPS'
                    ]
                  },
                  {
                    title: 'Audit Sémantique',
                    items: [
                      'Analyse des contenus existants',
                      'Pertinence des mots-clés',
                      'Cannibalisation SEO',
                      'Opportunités de contenu'
                    ]
                  },
                  {
                    title: 'Analyse Concurrentielle',
                    items: [
                      'Top 10 concurrents locaux',
                      'Gaps de mots-clés',
                      'Profil de backlinks',
                      'Stratégies gagnantes'
                    ]
                  }
                ]
              },
              {
                id: 'strategy',
                phase: 2,
                title: 'Stratégie & Planning',
                duration: 'Semaine 3-4',
                gradient: 'from-digiqo-primary to-digiqo-accent',
                icon: Target,
                details: [
                  {
                    title: 'Recherche de Mots-Clés',
                    items: [
                      'Mots-clés à fort potentiel',
                      'Longue traîne locale',
                      'Intentions de recherche',
                      'Saisonnalité à La Réunion'
                    ]
                  },
                  {
                    title: 'Architecture SEO',
                    items: [
                      'Silos thématiques',
                      'Cocons sémantiques',
                      'Maillage interne optimal',
                      'Plan de redirection'
                    ]
                  },
                  {
                    title: 'Roadmap Personnalisée',
                    items: [
                      'Quick wins prioritaires',
                      'Planning sur 6 mois',
                      'KPIs et objectifs',
                      'Budget prévisionnel'
                    ]
                  }
                ]
              },
              {
                id: 'optimization',
                phase: 3,
                title: 'Optimisation & Exécution',
                duration: 'Mois 2-5',
                gradient: 'from-digiqo-accent to-amber-500',
                icon: Zap,
                details: [
                  {
                    title: 'Optimisations Techniques',
                    items: [
                      'Amélioration des Core Web Vitals',
                      'Schema markup avancé',
                      'Optimisation mobile-first',
                      'JavaScript SEO'
                    ]
                  },
                  {
                    title: 'Content Marketing',
                    items: [
                      'Création de contenus piliers',
                      'Articles optimisés SEO',
                      'Landing pages ciblées',
                      'FAQ et guides locaux'
                    ]
                  },
                  {
                    title: 'Link Building Local',
                    items: [
                      'Partenariats locaux',
                      'Citations locales',
                      'PR digitale réunionnaise',
                      'Guest posting ciblé'
                    ]
                  }
                ]
              },
              {
                id: 'monitoring',
                phase: 4,
                title: 'Monitoring & Growth',
                duration: 'Mois 6+',
                gradient: 'from-digiqo-secondary to-digiqo-secondary/80',
                icon: LineChart,
                details: [
                  {
                    title: 'Suivi en Temps Réel',
                    items: [
                      'Dashboard personnalisé',
                      'Alertes de positions',
                      'Monitoring 24/7',
                      'Analyse des SERPs'
                    ]
                  },
                  {
                    title: 'Optimisation Continue',
                    items: [
                      'Tests A/B SEO',
                      'Ajustements stratégiques',
                      'Nouvelles opportunités',
                      'Veille algorithmique'
                    ]
                  },
                  {
                    title: 'Reporting & ROI',
                    items: [
                      'Rapports mensuels détaillés',
                      'Analyse des conversions',
                      'ROI et performances',
                      'Recommandations'
                    ]
                  }
                ]
              }
            ].map((phase, index) => {
              const isLeft = index % 2 === 0
              const Icon = phase.icon
              const isActive = activeTab === phase.id
              
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * ANIMATION.delay.staggerSlow }}
                  className={`relative flex items-center mb-24 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Contenu principal */}
                  <div className={`w-full lg:w-1/2 ${isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <motion.div
                      className={`bg-digiqo-primary/90 rounded-3xl p-8 cursor-pointer transition-all duration-300 border-2 ${
                        isActive ? 'border-digiqo-secondary shadow-2xl shadow-digiqo-secondary/20' : 'border-digiqo-primary/30 hover:border-digiqo-primary/40'
                      }`}
                      onClick={() => setActiveTab(phase.id)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.gradient} flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className={isLeft ? 'lg:text-right' : ''}>
                          <h3 className="text-2xl font-bold text-white mb-1">Phase {phase.phase}: {phase.title}</h3>
                          <p className="text-digiqo-secondary font-semibold">{phase.duration}</p>
                        </div>
                      </div>
                      
                      <p className="text-digiqo-primary/50 mb-4">
                        {isActive ? 'Cliquez pour réduire' : 'Cliquez pour découvrir les détails'}
                      </p>
                      
                      {/* Détails expandables */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: ANIMATION.duration.fast }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 space-y-6">
                              {phase.details.map((section, i) => (
                                <div key={i} className={isLeft ? 'lg:text-right' : ''}>
                                  <h4 className="text-lg font-bold text-white mb-3">{section.title}</h4>
                                  <ul className="space-y-2">
                                    {section.items.map((item, j) => (
                                      <motion.li
                                        key={j}
                                        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 + j * 0.05 }}
                                        className={`flex items-center gap-2 text-white/70 ${isLeft ? 'lg:flex-row-reverse' : ''}`}
                                      >
                                        <CheckCircle2 className="w-4 h-4 text-digiqo-secondary flex-shrink-0" />
                                        <span>{item}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  
                  {/* Point central animé */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.2 }}
                    >
                      <motion.div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${phase.gradient} shadow-lg`}
                        animate={{
                          boxShadow: isActive ? [
                            '0 0 20px rgba(25, 156, 183, 0.5)',
                            '0 0 40px rgba(25, 156, 183, 0.5)',
                            '0 0 20px rgba(25, 156, 183, 0.5)'
                          ] : '0 0 20px rgba(0, 0, 0, 0.5)'
                        }}
                        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/50"
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Espace vide pour l'autre côté */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              )
            })}
          </div>
          
          {/* CTA Premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-xl text-digiqo-primary/50 mb-8">
              Prêt à transformer votre visibilité en ligne ?
            </p>
            <motion.a
              href={generateContactUrl({ 
                service: 'seo',
                description: 'Je veux découvrir la méthode DIGIQO SEO' 
              })}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 text-white font-bold rounded-full shadow-2xl relative overflow-hidden"
              whileHover={ANIMATION.hover.scale}
              whileTap={ANIMATION.tap.scale}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-digiqo-accent to-digiqo-primary"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: ANIMATION.duration.fast }}
              />
              <span className="relative z-10">Découvrir la Méthode</span>
              <Rocket className="relative z-10 w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Questions <span className="text-digiqo-secondary">Fréquentes</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-digiqo-secondary/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Combien de temps faut-il pour voir des résultats SEO ?</h3>
              <p className="text-digiqo-primary/70">
                Les premiers résultats apparaissent généralement entre 3 et 6 mois. 
                Cependant, certaines optimisations techniques peuvent avoir un impact immédiat sur votre visibilité.
              </p>
            </div>

            <div className="bg-digiqo-secondary/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Le SEO est-il vraiment nécessaire à La Réunion ?</h3>
              <p className="text-digiqo-primary/70">
                Absolument ! La concurrence digitale est forte sur l'île. Sans SEO, 
                vous passez à côté de 70% des opportunités de business en ligne.
              </p>
            </div>

            <div className="bg-digiqo-secondary/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Quelle est la différence entre SEO et publicité Google Ads ?</h3>
              <p className="text-digiqo-primary/70">
                Le SEO génère du trafic gratuit et durable, tandis que Google Ads nécessite un budget publicitaire constant. 
                L'idéal ? Combiner les deux pour maximiser votre visibilité.
              </p>
            </div>

            <div className="bg-digiqo-secondary/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">Proposez-vous un suivi après l'optimisation ?</h3>
              <p className="text-digiqo-primary/70">
                Oui, nous proposons des forfaits de suivi mensuel pour maintenir et améliorer vos positions. 
                Le SEO nécessite un travail continu pour rester compétitif.
              </p>
            </div>
          </motion.div>
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
              Prêt à dominer Google ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Commencez par un audit SEO gratuit et découvrez votre potentiel de croissance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={generateContactUrl({ 
                  service: 'seo',
                  description: 'Je souhaite un audit SEO gratuit' 
                })}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-bold rounded-full hover:bg-digiqo-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Audit SEO Gratuit
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:0692731111"
                className="inline-flex items-center gap-2 px-8 py-4 bg-digiqo-primary text-white font-bold rounded-full hover:bg-digiqo-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Appeler maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}