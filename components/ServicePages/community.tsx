import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { HeroGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { IconParticleSystem } from '@/components/ui/floating-particles'
import { 
  MessageCircle, 
  ArrowRight, 
  Calendar, 
  Users, 
  Zap, 
  TrendingUp,
  FileText,
  Shield,
  BarChart3,
  Gift,
  CheckCircle2,
  X,
  ChevronRight,
  Heart,
  Share2,
  MessageSquare,
  Hash,
  AtSign,
  Sparkles,
  Eye,
  ThumbsUp,
  Send,
  Activity,
  Target
} from 'lucide-react'
import { 
  InstagramIcon,
  FacebookIcon as FacebookSocialIcon,
  TwitterIcon,
  LinkedInIcon as LinkedInSocialIcon,
  TikTokIcon,
  ThreadsIcon
} from '@/components/icons'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { ServiceHero } from './ServiceHero'

interface Formula {
  id: string
  name: string
  price: {
    threeMonths: string
    sixMonths: string
    twelveMonths: string
  }
  savings: {
    sixMonths: string
    twelveMonths: string
  }
  highlights: string[]
  gradient: string
  accentColor: string
  popular?: boolean
  sections: {
    content: {
      title: string
      posts: number
      stories: number
      reels: number
      visits: string
    }
    moderation: {
      title: string
      features: string[]
    }
    included: {
      title: string
      items: string[]
    }
    bonus?: {
      title: string
      items: string[]
    }
  }
}

const formulas: Formula[] = [
  {
    id: 'essentielle',
    name: 'Essentielle',
    price: {
      threeMonths: '690€',
      sixMonths: '621€',
      twelveMonths: '552€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    highlights: [
      '5 posts + 5 stories/mois',
      'Modération 48h',
      '1 déplacement bimensuel'
    ],
    gradient: 'from-digiqo-secondary to-digiqo-secondary/80',
    accentColor: 'secondary',
    sections: {
      content: {
        title: 'Contenu mensuel',
        posts: 5,
        stories: 5,
        reels: 0,
        visits: '1 déplacement bimensuel (1h)'
      },
      moderation: {
        title: 'Modération Basique',
        features: [
          'Réponses aux commentaires et messages en 48h ouvrées',
          'Gestion des interactions pendant les heures de bureau (lundi-vendredi, 9h-18h)',
          'Suppression des commentaires inappropriés si nécessaire'
        ]
      },
      included: {
        title: 'Services inclus',
        items: [
          'Stratégie de contenu mensuelle',
          'Calendrier éditorial',
          'Création de visuels standards',
          'Hashtags optimisés',
          'Rapport mensuel basique'
        ]
      }
    }
  },
  {
    id: 'dynamique',
    name: 'Dynamique',
    price: {
      threeMonths: '1 190€',
      sixMonths: '1 071€',
      twelveMonths: '952€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    highlights: [
      '10 posts + 10 stories + 2 reels',
      'Modération 24h',
      '1 déplacement mensuel'
    ],
    gradient: 'from-digiqo-primary to-digiqo-accent',
    accentColor: 'digiqo-accent',
    popular: true,
    sections: {
      content: {
        title: 'Contenu mensuel',
        posts: 10,
        stories: 10,
        reels: 2,
        visits: '1 déplacement mensuel (2h)'
      },
      moderation: {
        title: 'Modération Active (Hors Week-end)',
        features: [
          'Réponses aux commentaires et messages en 24h ouvrées',
          'Surveillance des interactions du lundi au vendredi, 9h-18h',
          'Gestion des avis clients avec des réponses personnalisées',
          'Suppression immédiate des commentaires négatifs ou inappropriés'
        ]
      },
      included: {
        title: 'Services inclus',
        items: [
          'Stratégie de contenu avancée',
          'Calendrier éditorial détaillé',
          'Création de visuels premium',
          'Hashtags et SEO optimisés',
          'Rapport bi-mensuel détaillé',
          'Analyse de la concurrence',
          'Suggestions d\'amélioration'
        ]
      },
      bonus: {
        title: 'Bonus annuel',
        items: [
          'Shooting photo professionnel (2h)',
          'Création de 20 visuels premium',
          'Audit complet de présence digitale'
        ]
      }
    }
  },
  {
    id: 'strategique',
    name: 'Stratégique',
    price: {
      threeMonths: '1 790€',
      sixMonths: '1 611€',
      twelveMonths: '1 432€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    highlights: [
      '20 posts + 20 stories + 4 reels',
      'Modération 7j/7',
      '2 déplacements mensuels'
    ],
    gradient: 'from-digiqo-accent to-orange-500',
    accentColor: 'orange',
    sections: {
      content: {
        title: 'Contenu mensuel',
        posts: 20,
        stories: 20,
        reels: 4,
        visits: '2 déplacements mensuels (3h)'
      },
      moderation: {
        title: 'Modération Active (Week-end Inclus)',
        features: [
          'Réponses aux commentaires et messages en 12h maximum',
          'Surveillance des interactions 7j/7 de 9h à 20h',
          'Modération proactive pour stimuler l\'engagement (likes, réponses, conversations)',
          'Signalement des avis et commentaires critiques pour gestion rapide'
        ]
      },
      included: {
        title: 'Services inclus',
        items: [
          'Stratégie de contenu personnalisée',
          'Calendrier éditorial multi-plateformes',
          'Création de visuels et vidéos premium',
          'Campagnes de croissance organique',
          'Rapport hebdomadaire détaillé',
          'Analyse approfondie des performances',
          'Réunion stratégique mensuelle',
          'Veille concurrentielle active'
        ]
      },
      bonus: {
        title: 'Bonus annuel',
        items: [
          'Shooting photo/vidéo professionnel (4h)',
          'Création de 40 visuels premium',
          'Formation équipe sur les réseaux sociaux',
          'Campagne publicitaire offerte (500€)'
        ]
      }
    }
  },
  {
    id: 'elite',
    name: 'Élite',
    price: {
      threeMonths: '2 790€',
      sixMonths: '2 511€',
      twelveMonths: '2 232€'
    },
    savings: {
      sixMonths: '10%',
      twelveMonths: '20%'
    },
    highlights: [
      '30 posts + 30 stories + 6 reels',
      'Modération Premium <6h',
      '3 déplacements mensuels'
    ],
    gradient: 'from-digiqo-primary to-digiqo-accent',
    accentColor: 'digiqo-accent',
    sections: {
      content: {
        title: 'Contenu mensuel',
        posts: 30,
        stories: 30,
        reels: 6,
        visits: '3 déplacements mensuels (6h)'
      },
      moderation: {
        title: 'Modération Premium (7J/7)',
        features: [
          'Réponses aux commentaires et messages en moins de 6h, 7j/7',
          'Gestion et animation en continu de 8h à 22h',
          'Analyse des tendances et recommandations stratégiques pour l\'engagement',
          'Gestion avancée des avis et crises : signalement, modération et intervention rapide',
          'Community management actif : relance des discussions, interactions stratégiques avec les abonnés'
        ]
      },
      included: {
        title: 'Services inclus',
        items: [
          'Stratégie de contenu sur-mesure',
          'Gestion multi-plateformes complète',
          'Production de contenu haut de gamme',
          'Campagnes de croissance avancées',
          'Reporting temps réel personnalisé',
          'Analyse prédictive des tendances',
          'Réunions stratégiques bi-mensuelles',
          'Veille et benchmark constant',
          'Gestion d\'influenceurs locaux'
        ]
      },
      bonus: {
        title: 'Bonus annuel',
        items: [
          'Production vidéo mensuelle professionnelle',
          'Shooting photo/vidéo illimité',
          'Formation équipe complète (2 jours)',
          'Campagnes publicitaires offertes (1000€)',
          'Accès prioritaire aux nouveautés'
        ]
      }
    }
  }
]

// Social media icons for particle system
const socialIcons = [Heart, MessageSquare, Share2, Hash, AtSign, ThumbsUp, Eye, Send]

// Animated engagement metric component
interface AnimatedEngagementProps {
  value: number
  label: string
  suffix?: string
  icon: React.ComponentType<{ className?: string }>
  delay?: number
}

const AnimatedEngagement = ({ value, label, suffix = '', icon: Icon, delay = 0 }: AnimatedEngagementProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let current = 0
        const increment = value / 50
        const counter = setInterval(() => {
          current += increment
          if (current >= value) {
            setCount(value)
            clearInterval(counter)
          } else {
            setCount(Math.floor(current))
          }
        }, 30)
        return () => clearInterval(counter)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, value, delay])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: ANIMATION.duration.normal, delay: delay / 1000 }}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-6 border border-digiqo-accent/20 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <Icon className="w-6 h-6 text-digiqo-accent" />
          <span className="text-xs text-digiqo-primary/60 uppercase tracking-wider font-semibold">{label}</span>
        </div>
        <div className="text-3xl font-bold text-digiqo-primary">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="mt-2 h-1 bg-digiqo-accent/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: ANIMATION.duration.verySlow, delay: delay / 1000, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-digiqo-accent to-orange-400"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function CommunityPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'threeMonths' | 'sixMonths' | 'twelveMonths'>('twelveMonths')
  const seoData = servicesSEO['community-management-974']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Community Management La Réunion',
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
    offers: formulas.map(formula => ({
      '@type': 'Offer',
      name: `Formule ${formula.name}`,
      price: formula.price.threeMonths.replace('€', '').replace(' ', ''),
      priceCurrency: 'EUR',
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          price: formula.price.threeMonths.replace('€', '').replace(' ', ''),
          priceCurrency: 'EUR',
          unitText: '3 MONTHS'
        },
        {
          '@type': 'PriceSpecification',
          price: formula.price.sixMonths.replace('€', '').replace(' ', ''),
          priceCurrency: 'EUR',
          unitText: '6 MONTHS'
        },
        {
          '@type': 'PriceSpecification',
          price: formula.price.twelveMonths.replace('€', '').replace(' ', ''),
          priceCurrency: 'EUR',
          unitText: '12 MONTHS'
        }
      ]
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
        icon={MessageCircle}
        title={{
          line1: "Animez votre",
          line2: "Communauté Digitale"
        }}
        subtitle="Community Management haute performance. Engagement authentique, croissance organique, résultats mesurables."
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Demander un devis",
            href: generateContactUrl({ service: 'community' })
          }
        }}
        gradientFrom="from-digiqo-accent"
        gradientTo="to-purple-500"
        iconColor="text-digiqo-accent"
      />

      {/* Metrics Section - Résultats chiffrés */}
      <section className="py-24 bg-gradient-to-br from-white to-digiqo-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Des Résultats <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent">Mesurables</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Nos clients constatent des améliorations significatives dès les premiers mois
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedEngagement
              value={1200}
              label="Publications/An"
              suffix="+"
              icon={TrendingUp}
              delay={100}
            />
            <AnimatedEngagement
              value={98}
              label="Satisfaction Client"
              suffix="%"
              icon={Heart}
              delay={200}
            />
            <AnimatedEngagement
              value={6000}
              label="Followers Gagnés"
              suffix="+"
              icon={Users}
              delay={300}
            />
            <AnimatedEngagement
              value={67}
              label="Taux d'Engagement"
              suffix="%"
              icon={Activity}
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Process Section avec timeline interactive */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Notre <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Une approche méthodique pour maximiser votre impact social
            </p>
          </motion.div>
          
          {/* Interactive process timeline */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-digiqo-secondary/30 to-transparent -translate-y-1/2 hidden lg:block" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: '01',
                  title: 'Audit Social',
                  description: 'Analyse approfondie de votre présence actuelle et identification des opportunités',
                  icon: BarChart3,
                  color: 'from-digiqo-accent to-digiqo-accent/80'
                },
                {
                  number: '02',
                  title: 'Stratégie',
                  description: 'Développement d\'un plan de contenu aligné avec vos objectifs business',
                  icon: Target,
                  color: 'from-digiqo-secondary to-digiqo-secondary/80'
                },
                {
                  number: '03',
                  title: 'Création',
                  description: 'Production de contenus engageants et visuellement impactants',
                  icon: Sparkles,
                  color: 'from-blue-500 to-cyan-600'
                },
                {
                  number: '04',
                  title: 'Engagement',
                  description: 'Animation active de votre communauté et modération proactive',
                  icon: MessageCircle,
                  color: 'from-digiqo-secondary to-digiqo-secondary/80'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(index) }}
                  className="relative pt-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full relative group"
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Step number */}
                    <div className="absolute -top-4 left-8 bg-gradient-to-r from-digiqo-primary to-digiqo-primary/80 text-white text-sm font-bold px-4 py-2 rounded-full">
                      ÉTAPE {step.number}
                    </div>
                    
                    {/* Icon with gradient background */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: ANIMATION.duration.normal }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 mt-4`}
                    >
                      <step.icon className="w-8 h-8" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-digiqo-primary/70">{step.description}</p>
                    
                    {/* Connection dot for timeline */}
                    <div className="absolute -bottom-10 left-1/2 w-4 h-4 bg-gradient-to-br from-digiqo-secondary/40 to-digiqo-secondary rounded-full -translate-x-1/2 hidden lg:block" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Platforms Section avec animations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Multi-Plateformes <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Nous maîtrisons toutes les plateformes pour une présence digitale complète
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { 
                name: 'Instagram', 
                icon: InstagramIcon, 
                gradient: true,
                gradientColors: 'from-purple-600 via-pink-600 to-orange-500',
                iconColor: 'text-white',
                showLogo: false,
                stats: '2B+ utilisateurs' 
              },
              { 
                name: 'Facebook', 
                icon: FacebookSocialIcon, 
                gradient: false,
                bgColor: 'bg-gray-100',
                iconColor: '',
                showLogo: true,
                stats: '3B+ utilisateurs' 
              },
              { 
                name: 'Threads', 
                icon: ThreadsIcon, 
                gradient: false,
                bgColor: 'bg-white',
                iconColor: 'text-black',
                showLogo: true,
                stats: '200M+ utilisateurs' 
              },
              { 
                name: 'LinkedIn', 
                icon: LinkedInSocialIcon, 
                gradient: false,
                bgColor: 'bg-gray-100',
                iconColor: '',
                showLogo: true,
                stats: '1B+ utilisateurs' 
              },
              { 
                name: 'TikTok', 
                icon: TikTokIcon, 
                gradient: false,
                bgColor: 'bg-black',
                iconColor: '',
                showLogo: true,
                stats: '1.5B+ utilisateurs' 
              }
            ].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 ${
                    platform.gradient 
                      ? `bg-gradient-to-br ${platform.gradientColors}` 
                      : platform.bgColor
                  } ${platform.name === 'Threads' ? 'border-2 border-black' : ''}`}>
                    <platform.icon className={`${platform.showLogo ? 'w-12 h-12' : 'w-10 h-10'} ${platform.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-digiqo-primary">{platform.name}</h3>
                  <p className="text-sm text-digiqo-primary/60 font-medium">{platform.stats}</p>
                  
                  {/* Hover effect adapté selon la plateforme */}
                  {platform.name === 'Instagram' && (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 blur-xl" />
                  )}
                  {platform.name === 'Facebook' && (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[#1877F2] blur-xl" />
                  )}
                  {platform.name === 'Threads' && (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-black blur-xl" />
                  )}
                  {platform.name === 'LinkedIn' && (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[#0A66C2] blur-xl" />
                  )}
                  {platform.name === 'TikTok' && (
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-[#FF004F] to-[#00F2EA] blur-xl" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section avec glassmorphism */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-secondary/20 to-digiqo-primary relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-digiqo-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Pourquoi choisir notre <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent">Community Management</span> ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-digiqo-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-digiqo-primary/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <Users className="w-12 h-12 text-digiqo-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Analyse Stratégique</h3>
                <p className="text-white/70 flex-grow">Analyse approfondie de votre marché et secteur avant établissement d'une stratégie sur-mesure</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-digiqo-primary/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <Zap className="w-12 h-12 text-digiqo-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Contenu Viral</h3>
                <p className="text-white/70 flex-grow">Création de contenus qui captivent et génèrent un engagement organique</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary/80 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-digiqo-primary/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <TrendingUp className="w-12 h-12 text-digiqo-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">ROI Optimisé</h3>
                <p className="text-white/70 flex-grow">Croissance mesurable avec des KPIs précis et un reporting transparent</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-digiqo-primary/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">Agilité</h3>
                <p className="text-white/70 flex-grow">Adaptation rapide aux tendances et opportunités du marché digital</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulas Section */}
      <section id="formules" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Nos <span className="text-digiqo-secondary">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              Choisissez la formule adaptée à vos besoins et votre budget
            </p>

            {/* Duration selector */}
            <div className="inline-flex items-center gap-2 p-2 bg-digiqo-accent/10 rounded-full">
              <button
                onClick={() => setSelectedPeriod('twelveMonths')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedPeriod === 'twelveMonths'
                    ? 'bg-white text-digiqo-primary shadow'
                    : 'text-digiqo-primary/60 font-medium hover:text-digiqo-primary'
                }`}
              >
                12 mois
              </button>
              <button
                onClick={() => setSelectedPeriod('sixMonths')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedPeriod === 'sixMonths'
                    ? 'bg-white text-digiqo-primary shadow'
                    : 'text-digiqo-primary/60 font-medium hover:text-digiqo-primary'
                }`}
              >
                6 mois
              </button>
              <button
                onClick={() => setSelectedPeriod('threeMonths')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${
                  selectedPeriod === 'threeMonths'
                    ? 'bg-white text-digiqo-primary shadow'
                    : 'text-digiqo-primary/60 font-medium hover:text-digiqo-primary'
                }`}
              >
                3 mois
              </button>
            </div>
          </motion.div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {formulas.map((formula, index) => {
              const [isFlipped, setIsFlipped] = useState(false)
              const [activeSection, setActiveSection] = useState<string | null>(null)
              const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(null)
              
              return (
                <motion.div
                  key={formula.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * ANIMATION.delay.staggerSlow }}
                  className="relative"
                >
                  {/* Desktop: Dynamic Flip Card */}
                  <div className="hidden md:block relative h-[400px]" style={{ perspective: '1000px' }}>
                    <motion.div
                      className="absolute inset-0 w-full h-full"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: ANIMATION.duration.normal }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front of card */}
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="h-full bg-white rounded-3xl shadow-xl border border-digiqo-accent/10 overflow-hidden">
                          {/* Gradient accent */}
                          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${formula.gradient}`} />
                          
                          {formula.popular && (
                            <div className="absolute top-4 right-4">
                              <span className="bg-digiqo-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                                POPULAIRE
                              </span>
                            </div>
                          )}
                          
                          <div className="p-8">
                            {/* Header */}
                            <div className="mb-8">
                              <h3 className={`text-3xl font-bold bg-gradient-to-r ${formula.gradient} bg-clip-text text-transparent mb-4`}>
                                FORMULE {formula.name.toUpperCase()}
                              </h3>
                              
                              {/* Price */}
                              <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-4xl font-bold">
                                  {selectedPeriod === 'twelveMonths' ? formula.price.twelveMonths :
                                   selectedPeriod === 'sixMonths' ? formula.price.sixMonths :
                                   formula.price.threeMonths}
                                </span>
                                <span className="text-digiqo-primary/60">HT/mois</span>
                                {selectedPeriod !== 'threeMonths' && (
                                  <span className="text-sm text-digiqo-primary/50">
                                    <span className="px-2 py-1 bg-digiqo-secondary/10 text-digiqo-secondary rounded-full text-xs font-bold">
                                      -{selectedPeriod === 'twelveMonths' ? formula.savings.twelveMonths : formula.savings.sixMonths}
                                    </span>
                                  </span>
                                )}
                              </div>
                              
                              {/* Highlights */}
                              <div className="flex flex-wrap gap-2 mb-6">
                                {formula.highlights.map((highlight, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-digiqo-accent/10 text-digiqo-primary/70 rounded-full text-sm">
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Interactive sections grid - Show all 4 */}
                            <div className="grid grid-cols-4 gap-3">
                              {Object.entries(formula.sections).map(([key, section]) => {
                                if (!section) return null
                                const Icon = key === 'content' ? FileText : 
                                           key === 'moderation' ? Shield : 
                                           key === 'included' ? BarChart3 : 
                                           Gift
                                
                                return (
                                  <motion.button
                                    key={key}
                                    onClick={() => {
                                      setActiveSection(key)
                                      setIsFlipped(true)
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative bg-digiqo-accent/5 hover:bg-digiqo-accent/10 rounded-xl p-3 text-left transition-all group"
                                  >
                                    {/* Hover glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${formula.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`} />
                                    
                                    <div className="relative">
                                      <div className="flex flex-col items-center text-center">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${formula.gradient} text-white mb-2`}>
                                          <Icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-digiqo-primary text-xs mb-1">
                                          {key === 'content' ? 'Contenu' : 
                                           key === 'moderation' ? 'Modération' : 
                                           key === 'included' ? 'Inclus' : 
                                           'Bonus'}
                                        </h4>
                                        <p className="text-xs text-digiqo-primary/60 mb-1">
                                          {key === 'content' && 'posts' in section ? `${section.posts} posts` :
                                           key === 'moderation' && 'features' in section ? `${section.features.length} services` :
                                           key === 'included' && 'items' in section ? `${section.items.length} services` :
                                           key === 'bonus' && 'items' in section ? `${section.items.length} bonus` : ''}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-digiqo-accent">
                                          <span>Voir</span>
                                          <ArrowRight className="w-3 h-3" />
                                        </div>
                                      </div>
                                    </div>
                                  </motion.button>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Back of card - Dynamic content */}
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{ 
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="h-full bg-white rounded-3xl shadow-xl border border-digiqo-accent/10 overflow-hidden">
                          {/* Gradient accent */}
                          <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${formula.gradient}`} />
                          
                          {activeSection && formula.sections[activeSection as keyof typeof formula.sections] && (() => {
                            const section = formula.sections[activeSection as keyof typeof formula.sections]
                            return (
                              <div className="p-8 h-full flex flex-col">
                                {/* Header with back button */}
                                <div className="flex items-center justify-between mb-6">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${formula.gradient} text-white`}>
                                      {activeSection === 'content' ? <FileText className="w-6 h-6" /> : 
                                       activeSection === 'moderation' ? <Shield className="w-6 h-6" /> : 
                                       activeSection === 'included' ? <BarChart3 className="w-6 h-6" /> : 
                                       <Gift className="w-6 h-6" />}
                                    </div>
                                    <div>
                                      <h3 className="text-2xl font-bold text-digiqo-primary">
                                        {section && 'title' in section ? section.title : ''}
                                      </h3>
                                      <p className="text-sm text-digiqo-primary/60">{formula.name}</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setIsFlipped(false)
                                      setTimeout(() => setActiveSection(null), 600)
                                    }}
                                    className="p-2 hover:bg-digiqo-accent/10 rounded-lg transition-colors"
                                  >
                                    <X className="w-5 h-5 text-digiqo-primary/50" />
                                  </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 overflow-y-auto">
                                  {activeSection === 'content' && section && 'posts' in section && (
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="bg-digiqo-accent/5 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-bold text-digiqo-secondary">{section.posts}</div>
                                        <div className="text-sm text-digiqo-primary/60">posts/mois</div>
                                      </div>
                                      <div className="bg-digiqo-accent/5 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-bold text-digiqo-secondary">{section.stories}</div>
                                        <div className="text-sm text-digiqo-primary/60">stories/mois</div>
                                      </div>
                                      <div className="bg-digiqo-accent/5 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-bold text-digiqo-secondary">{section.reels}</div>
                                        <div className="text-sm text-digiqo-primary/60">reels/mois</div>
                                      </div>
                                      <div className="bg-digiqo-accent/5 rounded-xl p-4 text-center">
                                        <div className="text-sm text-digiqo-primary/70 font-medium">{section.visits}</div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {activeSection === 'moderation' && section && 'features' in section && (
                                    <ul className="space-y-2">
                                      {section.features.map((item, idx) => (
                                        <motion.li 
                                          key={idx} 
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * ANIMATION.delay.staggerFast }}
                                          className="flex items-start gap-2"
                                        >
                                          <div className={`p-0.5 rounded-full bg-gradient-to-r ${formula.gradient} flex-shrink-0 mt-1`}>
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                          </div>
                                          <span className="text-sm text-digiqo-primary/70">{item}</span>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  )}
                                  
                                  {(activeSection === 'included' || activeSection === 'bonus') && section && 'items' in section && (
                                    <ul className="space-y-2">
                                      {section.items.map((item, idx) => (
                                        <motion.li 
                                          key={idx} 
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * ANIMATION.delay.staggerFast }}
                                          className="flex items-start gap-2"
                                        >
                                          <div className={`p-0.5 rounded-full bg-gradient-to-r ${formula.gradient} flex-shrink-0 mt-1`}>
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                          </div>
                                          <span className="text-sm text-digiqo-primary/70">{item}</span>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  )}
                                </div>

                                {/* CTA */}
                                <motion.a
                                  href={generateContactUrl({ 
                                    service: 'community',
                                    formula: formula.name.toLowerCase(), 
                                    description: `Je suis intéressé par la formule ${formula.name} (${selectedPeriod === 'twelveMonths' ? '12 mois' : selectedPeriod === 'sixMonths' ? '6 mois' : '3 mois'}) - ${formula.sections.content.posts} posts, ${formula.sections.content.stories} stories${formula.sections.content.reels ? `, ${formula.sections.content.reels} reels` : ''} par mois`
                                  })}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                                >
                                  Choisir cette formule
                                  <ArrowRight className="w-5 h-5" />
                                </motion.a>
                              </div>
                            )
                          })()}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile: Accordion */}
                  <div className="md:hidden bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Header always visible */}
                    <div className="p-6 border-b border-digiqo-accent/10">
                      {formula.popular && (
                        <span className="inline-block bg-digiqo-accent text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                          POPULAIRE
                        </span>
                      )}
                      
                      <h3 className={`text-2xl font-bold bg-gradient-to-r ${formula.gradient} bg-clip-text text-transparent mb-2`}>
                        FORMULE {formula.name.toUpperCase()}
                      </h3>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-3xl font-bold">
                          {selectedPeriod === 'twelveMonths' ? formula.price.twelveMonths :
                           selectedPeriod === 'sixMonths' ? formula.price.sixMonths :
                           formula.price.threeMonths}
                        </span>
                        <span className="text-digiqo-primary/60">HT/mois</span>
                        {selectedPeriod !== 'threeMonths' && (
                          <span className="px-2 py-1 bg-digiqo-secondary/10 text-digiqo-secondary rounded-full text-xs font-bold">
                            -{selectedPeriod === 'twelveMonths' ? formula.savings.twelveMonths : formula.savings.sixMonths}
                          </span>
                        )}
                      </div>
                      
                      {/* Highlights */}
                      <div className="space-y-2">
                        {formula.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-digiqo-secondary flex-shrink-0" />
                            <span className="text-sm font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable sections */}
                    <div className="border-t border-digiqo-accent/10">
                      {Object.entries(formula.sections).map(([key, section]) => {
                        if (!section) return null
                        const Icon = key === 'content' ? FileText : 
                                   key === 'moderation' ? Shield : 
                                   key === 'included' ? BarChart3 : 
                                   Gift
                        const isOpen = mobileActiveSection === `${formula.id}-${key}`
                        
                        return (
                          <div key={key} className="border-b border-digiqo-accent/10 last:border-0">
                            <button
                              onClick={() => setMobileActiveSection(
                                isOpen ? null : `${formula.id}-${key}`
                              )}
                              className="w-full p-4 flex items-center justify-between hover:bg-digiqo-accent/5 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${formula.gradient} text-white`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-digiqo-primary">
                                  {key === 'content' ? section.title :
                                   key === 'moderation' ? section.title :
                                   key === 'included' ? section.title :
                                   'bonus' in formula.sections && formula.sections.bonus ? formula.sections.bonus.title : ''}
                                </span>
                              </div>
                              <ChevronRight className={`w-5 h-5 text-digiqo-primary/40 transition-transform ${
                                isOpen ? 'rotate-90' : ''
                              }`} />
                            </button>
                            
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  transition={{ duration: ANIMATION.duration.fast }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4">
                                    {key === 'content' && 'posts' in section && (
                                      <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div className="bg-digiqo-accent/5 rounded-lg p-3 text-center">
                                          <div className="text-xl font-bold text-digiqo-secondary">{section.posts}</div>
                                          <div className="text-xs text-digiqo-primary/60">posts</div>
                                        </div>
                                        <div className="bg-digiqo-accent/5 rounded-lg p-3 text-center">
                                          <div className="text-xl font-bold text-digiqo-secondary">{section.stories}</div>
                                          <div className="text-xs text-digiqo-primary/60">stories</div>
                                        </div>
                                        <div className="bg-digiqo-accent/5 rounded-lg p-3 text-center">
                                          <div className="text-xl font-bold text-digiqo-secondary">{section.reels}</div>
                                          <div className="text-xs text-digiqo-primary/60">reels</div>
                                        </div>
                                        <div className="bg-digiqo-accent/5 rounded-lg p-3 text-center">
                                          <div className="text-xs text-digiqo-primary/70">{section.visits}</div>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {key === 'moderation' && 'features' in section && (
                                      <ul className="space-y-2">
                                        {section.features.map((item, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-sm">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${formula.gradient} mt-1.5 flex-shrink-0`} />
                                            <span className="text-digiqo-primary/60">{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                    
                                    {(key === 'included' || key === 'bonus') && 'items' in section && (
                                      <ul className="space-y-2">
                                        {section.items.map((item, idx) => (
                                          <li key={idx} className="flex items-start gap-2 text-sm">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${formula.gradient} mt-1.5 flex-shrink-0`} />
                                            <span className="text-digiqo-primary/60">{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>

                    {/* CTA */}
                    <div className="p-6 bg-digiqo-accent/5">
                      <motion.a
                        href={generateContactUrl({ 
                          service: 'community',
                          formula: formula.name.toLowerCase(),
                          description: `Je suis intéressé par la formule ${formula.name} (${selectedPeriod === 'twelveMonths' ? '12 mois' : selectedPeriod === 'sixMonths' ? '6 mois' : '3 mois'}) - ${formula.sections.content.posts} posts, ${formula.sections.content.stories} stories${formula.sections.content.reels ? `, ${formula.sections.content.reels} reels` : ''} par mois`
                        })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${formula.gradient} text-white font-bold rounded-2xl shadow-lg`}
                      >
                        Choisir cette formule
                        <ArrowRight className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section avec design premium */}
      <section className="py-24 bg-gradient-to-br from-digiqo-primary via-digiqo-secondary/30 to-digiqo-primary relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-digiqo-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-digiqo-secondary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...ANIMATION.ease.spring, duration: ANIMATION.duration.slow }}
              className="inline-flex"
            >
              <div className="p-4 bg-gradient-to-br from-digiqo-accent/20 to-digiqo-secondary/20 rounded-2xl backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-digiqo-accent" />
              </div>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Prêt à <span className="bg-gradient-to-r from-digiqo-accent via-digiqo-secondary to-digiqo-secondary bg-clip-text text-transparent">animer</span> votre communauté ?
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Transformez vos réseaux sociaux en véritables leviers de croissance avec notre expertise community management premium
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href={generateContactUrl({
                  service: 'community',
                  description: 'Je souhaite une stratégie community management sur mesure pour développer ma communauté'
                })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-accent to-digiqo-secondary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Démarrer maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href={generateContactUrl({
                  service: 'audit-community',
                  description: 'Je souhaite un audit gratuit de ma présence sur les réseaux sociaux'
                })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-digiqo-primary/50 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BarChart3 className="w-5 h-5" />
                Audit gratuit
                <Sparkles className="w-5 h-5 text-digiqo-accent" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}

