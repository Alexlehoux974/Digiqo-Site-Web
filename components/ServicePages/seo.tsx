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
        subtitle="Propulsez votre entreprise en première page avec notre expertise SEO. Score SEO 85+ garanti"
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
                  
                  <h3 className="text-2xl font-bold mb-4">Score SEO Garanti</h3>
                  
                  {/* Score SEO animé */}
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
                        stroke="url(#gradient-score)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: '0 352' }}
                        whileInView={{ strokeDasharray: '300 352' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                      />
                      <defs>
                        <linearGradient id="gradient-score" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#199CB7" />
                          <stop offset="100%" stopColor="#00b4d8" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-digiqo-secondary">85+</span>
                      <span className="text-sm text-digiqo-primary/70">Score SEO</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-digiqo-primary/70">Résultat garanti</span>
                    <span className="text-lg font-bold text-digiqo-secondary">100%</span>
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
                        whileInView={{ strokeDasharray: '229 352' }}
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
                      <span className="text-3xl font-bold text-digiqo-accent">+275%</span>
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
                  src="/partenaires/SVAREA-1024x1024.webp" 
                  alt="Svarea"
                  className="w-16 h-16 rounded-full bg-white p-2"
                />
                <div className="text-left">
                  <p className="font-bold">Directeur Commercial</p>
                  <p className="text-white/80">Svarea</p>
                </div>
              </div>
            </div>
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
              <h3 className="text-xl font-bold mb-3">Le SEO est-il vraiment nécessaire ?</h3>
              <p className="text-digiqo-primary/70">
                Absolument ! La concurrence digitale est forte. Sans SEO, 
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