import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { motion, useInView } from 'framer-motion'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { SectionGradientOrbs } from '@/components/ui/animated-gradient-orb'
import { ServiceHero } from './ServiceHero'
import {
  Code,
  Rocket,
  CheckCircle2,
  Sparkles,
  Star,
  MessageCircle,
  Calendar,
  ExternalLink
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

const CALENDAR_LINK = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0zEg3G6P0cJY2oe7Tyi3KrmTAXRyYCu5chnHfDzECSr45IxTuiVQX9MYpfMUZT9MbL3VgQl9JW'

const references = [
  { name: 'Sogitec Énergie', url: 'https://sogitec-energie.fr', screenshot: '/references/fullpage/sogitec-energie-fr.webp' },
  { name: 'La Boussole du Manager', url: 'https://laboussoledumanager.re', screenshot: '/references/fullpage/laboussoledumanager-re.webp' },
  { name: 'Pascal Destercke', url: 'https://pascal-destercke.com', screenshot: '/references/fullpage/pascal-destercke-com.webp' },
  { name: 'Velocit AI', url: 'https://velocit-ai.fr', screenshot: '/references/fullpage/velocit-ai-fr.webp' },
  { name: 'Monsterphone', url: 'https://monster-phone.re', screenshot: '/references/fullpage/monster-phone-re.webp' },
  { name: 'Parapente Réunion', url: 'https://parapente-reunion.fr', screenshot: '/references/fullpage/parapente-reunion-fr.webp' },
  { name: "Click'n Van", url: 'https://clicknvan.com', screenshot: '/references/fullpage/clicknvan-com.webp' },
  { name: 'Zen Eat Yoga', url: 'https://zeneatyoga.com', screenshot: '/references/fullpage/zeneatyoga-com.webp' },
  { name: 'Investis DOM', url: 'https://investis-dom.com', screenshot: '/references/fullpage/investis-dom-com.webp' },
  { name: 'CMX Factory', url: 'https://cmxfactory.com', screenshot: '/references/fullpage/cmxfactory-com.webp' },
  { name: 'Sattwika', url: 'https://sattwika.com', screenshot: '/references/fullpage/sattwika-com.webp' },
]

// iMac Mockup component with auto-scrolling screenshot
const IMacMockup = ({ name, url, screenshot, index }: { name: string; url: string; screenshot: string; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!isHovered || !containerRef.current) return
    const container = containerRef.current
    const scrollHeight = container.scrollHeight - container.clientHeight
    if (scrollHeight <= 0) return

    let animationId: number
    let start: number | null = null
    const duration = Math.max(scrollHeight * 8, 4000) // speed relative to content length

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      container.scrollTop = eased * scrollHeight
      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isHovered])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          if (containerRef.current) containerRef.current.scrollTop = 0
        }}
      >
        {/* iMac Frame */}
        <div className="relative">
          {/* Top bar (macOS style) */}
          <div className="bg-[#2a2a2e] rounded-t-2xl px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-[#1a1a1e] rounded-md px-4 py-1 flex items-center gap-2 max-w-[70%]">
                <svg className="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[10px] text-gray-400 truncate">{url.replace('https://', '')}</span>
              </div>
            </div>
          </div>

          {/* Screen - scrollable area */}
          <div
            ref={containerRef}
            className="relative overflow-hidden bg-white aspect-[16/10] rounded-b-lg transition-all duration-300"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={screenshot}
              alt={`Site web ${name}`}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

          {/* iMac Stand */}
          <div className="flex justify-center">
            <div className="w-[30%] h-4 bg-gradient-to-b from-[#c0c0c4] to-[#a8a8ac] rounded-b-lg" />
          </div>
          <div className="flex justify-center -mt-[1px]">
            <div className="w-[40%] h-1.5 bg-gradient-to-b from-[#a8a8ac] to-[#909094] rounded-b-lg" />
          </div>
        </div>

        {/* Info below */}
        <div className="mt-5 text-center">
          <h3 className="text-lg font-bold text-digiqo-primary group-hover:text-digiqo-secondary transition-colors duration-300">{name}</h3>
          <div className="flex items-center justify-center gap-1.5 mt-1 text-digiqo-primary/50 text-sm group-hover:text-digiqo-secondary/70 transition-colors duration-300">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{url.replace('https://', '')}</span>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function DevWebPage() {
  const seoData = servicesSEO['developpement-web-reunion']

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Développement Web Sur Mesure La Réunion',
    provider: {
      '@type': 'Organization',
      name: 'Digiqo',
      url: 'https://digiqo.fr'
    },
    areaServed: {
      '@type': 'Place',
      name: 'La Réunion'
    },
    description: seoData.description
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
          line1: "Votre site web",
          line2: "à la carte"
        }}
        subtitle="Développement web 100% sur mesure, sur devis. Technologie de pointe, design premium, résultats garantis."
        ctaButtons={{
          primary: {
            text: "Prendre rendez-vous",
            href: CALENDAR_LINK
          },
          secondary: {
            text: "Voir nos références",
            href: "#references"
          }
        }}
        gradientFrom="from-digiqo-secondary"
        gradientTo="to-digiqo-secondary/80"
        iconColor="text-digiqo-secondary"
      />

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

      {/* Sur Mesure Section */}
      <section id="formules" className="py-24 bg-gradient-to-br from-white to-digiqo-secondary/5">
        <div className="max-w-5xl mx-auto px-4">
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
              DÉVELOPPEMENT SUR MESURE
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Chaque projet est <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 bg-clip-text text-transparent">unique</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-4">
              Chez Digiqo, nous concevons des sites web 100% sur mesure, adaptés à vos objectifs.
            </p>
            <p className="text-lg text-digiqo-accent font-semibold max-w-2xl mx-auto mb-12">
              Un expert analyse vos besoins et vous envoie un devis sur mesure sous 24h.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-3xl p-8 shadow-xl text-left">
                <h3 className="text-2xl font-bold mb-6">Pourquoi du sur-mesure ?</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Solution adaptée', desc: 'Votre site web répond exactement à vos objectifs business' },
                    { title: 'Évolutivité garantie', desc: 'Votre site grandit avec votre entreprise' },
                    { title: 'Performance optimale', desc: 'Code optimisé sans compromis' },
                    { title: 'Design unique', desc: 'Votre identité visuelle respectée à 100%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-digiqo-primary/80">
                        <span className="font-semibold">{item.title}</span> : {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl text-left">
                <h3 className="text-2xl font-bold mb-6">Comment ça marche ?</h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Prise de rendez-vous', desc: 'Réservez un créneau avec un expert Digiqo' },
                    { step: '2', title: 'Analyse de vos besoins', desc: 'Nous étudions votre projet en détail lors du RDV' },
                    { step: '3', title: 'Devis sur mesure', desc: 'Vous recevez un devis personnalisé sous 24h' },
                    { step: '4', title: 'Développement', desc: 'Votre site est conçu et livré selon le cahier des charges' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary/80 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{item.step}</span>
                      </div>
                      <p className="text-digiqo-primary/80">
                        <span className="font-semibold">{item.title}</span> : {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.a
              href={CALENDAR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:from-digiqo-secondary/90 hover:to-digiqo-secondary/70 transition-all duration-300"
            >
              <Calendar className="w-6 h-6" />
              Prendre rendez-vous avec un expert
            </motion.a>

            <p className="text-sm text-digiqo-primary/60 mt-4">
              Consultation gratuite • Devis personnalisé sous 24h
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nos Références Section */}
      <section id="references" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
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
              NOS RÉFÉRENCES
              <Star className="w-4 h-4" />
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ils nous font <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary/80 bg-clip-text text-transparent">confiance</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto">
              Survolez pour explorer les sites que nous avons conçus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {references.map((ref, index) => (
              <IMacMockup key={index} name={ref.name} url={ref.url} screenshot={ref.screenshot} index={index} />
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
            <p className="text-xl text-white/90 mb-4">
              Réservez un rendez-vous avec un expert Digiqo.
            </p>
            <p className="text-lg text-white/70 mb-8">
              Un expert analyse vos besoins et vous envoie un devis sur mesure sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiqo-secondary font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Prendre rendez-vous
              </motion.a>
              <motion.a
                href={generateWhatsAppLink({ service: 'dev-web' })}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}

