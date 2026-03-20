import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
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
  { name: 'Mystik Sauna', url: 'https://mystiksauna.re', gradient: 'from-amber-500 to-red-600', screenshot: '/references/mystiksauna-re.webp' },
  { name: 'Sogitec Énergie', url: 'https://sogitec-energie.fr', gradient: 'from-blue-500 to-cyan-600', screenshot: '/references/sogitec-energie-fr.webp' },
  // { name: 'EMPC', url: 'https://empc.re', gradient: 'from-emerald-500 to-teal-600', screenshot: '/references/empc-re.webp' },
  // { name: 'Sabaguina', url: 'https://sabaguina.com', gradient: 'from-yellow-500 to-orange-600', screenshot: '/references/sabaguina-com.webp' },
  { name: 'La Boussole du Manager', url: 'https://laboussoledumanager.re', gradient: 'from-indigo-500 to-purple-600', screenshot: '/references/laboussoledumanager-re.webp' },
  // { name: 'Bernard Contrain', url: 'https://bernardcontrain.com', gradient: 'from-slate-500 to-gray-700', screenshot: '/references/bernardcontrain-com.webp' },
  { name: 'Pascal Destercke', url: 'https://pascal-destercke.com', gradient: 'from-digiqo-secondary to-cyan-600', screenshot: '/references/pascal-destercke-com.webp' },
  { name: 'Velocit AI', url: 'https://velocit-ai.fr', gradient: 'from-blue-500 to-purple-600', screenshot: '/references/velocit-ai-fr.webp' },
  // { name: 'CBD Run', url: 'https://cbd-run.com', gradient: 'from-green-500 to-emerald-600', screenshot: '/references/cbd-run-com.webp' },
  { name: 'Monsterphone', url: 'https://monster-phone.re', gradient: 'from-red-500 to-pink-600', screenshot: '/references/monster-phone-re.webp' },
  { name: 'Parapente Réunion', url: 'https://parapente-reunion.fr', gradient: 'from-sky-500 to-blue-600', screenshot: '/references/parapente-reunion-fr.webp' },
  { name: "Click'n Van", url: 'https://clicknvan.com', gradient: 'from-orange-500 to-amber-600', screenshot: '/references/clicknvan-com.webp' },
  { name: 'Zen Eat Yoga', url: 'https://zeneatyoga.com', gradient: 'from-teal-500 to-green-600', screenshot: '/references/zeneatyoga-com.webp' },
  { name: 'Investis DOM', url: 'https://investis-dom.com', gradient: 'from-digiqo-primary to-digiqo-primary-dark', screenshot: '/references/investis-dom-com.webp' },
  { name: 'CMX Factory', url: 'https://cmxfactory.com', gradient: 'from-digiqo-accent to-orange-500', screenshot: '/references/cmxfactory-com.webp' },
  { name: 'Sattwika', url: 'https://sattwika.com', gradient: 'from-amber-500 to-yellow-600', screenshot: '/references/sattwika-com.webp' },
]

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
      <section id="references" className="py-24 bg-gradient-to-br from-white via-digiqo-accent/5 to-white relative overflow-hidden">
        <SectionGradientOrbs />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
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
              Découvrez les sites web que nous avons conçus pour nos clients
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {references.map((ref, index) => (
              <motion.a
                key={index}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-[4/3]">
                  {/* Screenshot always visible */}
                  <Image
                    src={ref.screenshot}
                    alt={`Aperçu ${ref.name}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />

                  {/* Overlay gradient on bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    {/* Live badge */}
                    <div className="flex justify-end">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        EN LIGNE
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{ref.name}</h3>
                      <div className="flex items-center gap-1.5 text-white/80 text-xs">
                        <ExternalLink className="w-3 h-3" />
                        <span>{ref.url.replace('https://', '')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-hover:ring-digiqo-secondary/50 transition-all duration-300" />
                </div>
              </motion.a>
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

