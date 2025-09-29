import { motion, useScroll, useTransform } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Linkedin, Mail, Users, Rocket, Heart, Target, Calendar, Award, Sparkles, Clock } from 'lucide-react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import Link from 'next/link'
import { useRef } from 'react'

const team = [
  {
    name: 'Angelo Rapazzini',
    role: 'Directeur Général & Fondateur',
    description: "Angelo est notre expert incontournable en publicité en ligne. Ancien marketer chez Meta (anciennement Facebook), il maîtrise parfaitement les codes du digital et les dynamiques de vente. Chez Digiqo, il joue un rôle clé en traduisant les besoins de nos clients en stratégies performantes, tout en entretenant des relations solides et durables avec nos partenaires.",
    image: '/partenaires/Angelo.webp',
    linkedin: 'https://www.linkedin.com/in/angelo-rapazzini/',
    email: 'angelo@digiqo.fr'
  },
  {
    name: 'Rodolphe Le Houx',
    role: 'CEO & Fondateur',
    description: "Rodolphe est le cœur battant de Digiqo. En tant que CEO, il fait preuve d'une vision stratégique claire et d'une passion inébranlable pour le numérique. Il guide l'entreprise avec dynamisme, cherchant constamment à innover et à anticiper les tendances du marché. Son objectif : offrir à nos clients des solutions digitales sur-mesure, en forgeant des partenariats durables.",
    image: '/partenaires/Rodolphe.webp',
    linkedin: 'https://www.linkedin.com/in/rodolphe-le-houx/',
    email: 'rodolphe@digiqo.fr'
  },
  {
    name: 'Alexandre Le Houx',
    role: 'Directeur de la Communication & Fondateur',
    description: "Alexandre est la voix de Digiqo. Il donne le ton de notre communication, crée des contenus percutants et tisse chaque jour des liens authentiques avec notre communauté en ligne. Son énergie contagieuse, sa créativité débordante et son sens de l'écoute font de lui un pilier dans la construction de l'image positive de Digiqo.",
    image: '/partenaires/Alexandre.webp',
    linkedin: 'https://www.linkedin.com/in/alexandre-le-houx/',
    email: 'alexandre@digiqo.fr'
  },
  {
    name: 'Raymond Romero',
    role: 'Responsable des revenus',
    description: "Fort de 20 ans de management commercial, Raymond transforme les défis en opportunités mesurables. Ancien directeur d'une régie publicitaire multi-supports (journal, radio, magazines, web), il a piloté des équipes jusqu'à 10 personnes et bâti des stratégies gagnantes dans des secteurs en constante mutation. Chez Digiqo, il orchestre l'ensemble des sources de revenus — ventes, marketing, partenariats — avec un seul objectif : croissance et alignement stratégique. Ses forces : Leadership, vision business, adaptabilité hors norme, et une obsession pour la performance concrète.",
    image: '/partenaires/raymondfinal.webp',
    linkedin: 'https://www.linkedin.com/in/raymond-romero/',
    email: 'raymond@digiqo.fr'
  },
  {
    name: 'Adrien Trudel',
    role: 'Expert Marketing certifié Meta',
    description: "Adrien est notre sniper des campagnes publicitaires. Certifié et formé par Meta, il maîtrise toutes les subtilités de l'écosystème Facebook & Instagram Ads. Sa spécialité ? Créer des campagnes puissantes, rentables et ultra ciblées, avec un suivi pointu des performances.",
    image: '/partenaires/Adrien.webp',
    linkedin: 'https://www.linkedin.com/in/adrien-trudel/',
    email: 'adrien@digiqo.fr'
  },
  {
    name: 'Romain Cano',
    role: 'Expert IA et Automatisation',
    description: "Romain est notre spécialiste en intelligence artificielle et automatisation. Il conçoit et implémente des solutions innovantes pour optimiser les processus métiers de nos clients. Son expertise en IA permet de transformer les données en insights actionnables et d'automatiser les tâches répétitives pour maximiser l'efficacité.",
    image: '/partenaires/Romain.webp',
    linkedin: 'https://www.linkedin.com/in/romain-cano/',
    email: 'romain@digiqo.fr'
  },
  {
    name: 'Jaemeson Dieu',
    role: 'Expert Google Ads & Publicité en ligne',
    description: "Jaemeson est notre maître d'orchestre de la publicité sur Google. Grâce à sa parfaite maîtrise des outils et langages de l'écosystème Google (Ads, Analytics, Tag Manager, etc.), il conçoit des campagnes précises et redoutablement efficaces. Sa force ? Transformer chaque clic en opportunité, en alliant stratégie, optimisation et analyse poussée des résultats pour générer un maximum de valeur pour nos clients. Toujours en veille sur les dernières tendances et nouveautés de Google, il sait adapter les stratégies pour garder une longueur d'avance sur la concurrence.",
    image: '/partenaires/jaemeson.webp',
    linkedin: 'https://www.linkedin.com/in/jaemeson-dieu/',
    email: 'jaemeson@digiqo.fr'
  },
  {
    name: 'Lilian Apithy',
    role: 'Expert Meta Ads & Relation Clients',
    description: "Lilian est notre véritable couteau suisse : il veille à ce que chaque client Digiqo soit écouté, accompagné et satisfait. Toujours réactif, il s'assure que les demandes trouvent une réponse rapide et efficace, tout en récoltant témoignages et fichiers essentiels pour enrichir nos projets. En parallèle, il met sa créativité au service des visuels et contenus photo, apportant une touche soignée et percutante à nos campagnes. Spécialiste des publicités Meta (Facebook & Instagram Ads), Lilian combine expertise technique et sens du relationnel pour offrir des résultats concrets et une expérience client irréprochable.",
    image: '/partenaires/lilian.webp',
    linkedin: 'https://www.linkedin.com/in/lilian-apithy/',
    email: 'lilian@digiqo.fr'
  }
]

const values = [
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Toujours à la pointe des dernières tendances digitales'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Une équipe passionnée qui vit et respire le digital'
  },
  {
    icon: Target,
    title: 'Performance',
    description: 'Des résultats mesurables et un ROI optimisé'
  },
  {
    icon: Users,
    title: 'Partenariat',
    description: 'Une relation de confiance avec nos clients'
  }
]

export default function Agence() {
  const valuesRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll()
  
  // Parallax effects for smooth transitions
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const valuesParallax = useTransform(scrollYProgress, [0.2, 0.5], [50, 0])
  const teamParallax = useTransform(scrollYProgress, [0.4, 0.7], [50, 0])
  const ctaParallax = useTransform(scrollYProgress, [0.7, 1], [50, 0])
  
  // Fade effects for sections
  const ctaFade = useTransform(scrollYProgress, [0.65, 0.8], [0, 1])

  return (
    <>
      <SEO
        title="L'Agence - Digiqo"
        description="Découvrez Digiqo, votre agence digitale à La Réunion. Une équipe d'experts passionnés pour booster votre présence en ligne depuis 2020."
        keywords="agence digitale la réunion, digiqo team, marketing digital, publicité en ligne"
        url="https://digiqo.com/agence"
      />

      <HeaderLuxury />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <motion.section 
          id="histoire" 
          className="relative pt-40 pb-32 overflow-hidden bg-gradient-to-br from-digiqo-primary/5 via-white to-digiqo-accent/5"
          style={{ y: heroParallax }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-20 right-0 w-96 h-96 bg-digiqo-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-96 h-96 bg-digiqo-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            {/* Floating particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 3 === 0 
                    ? 'w-6 h-6 bg-gradient-to-br from-digiqo-primary to-digiqo-accent opacity-30' 
                    : i % 3 === 1
                    ? 'w-4 h-4 bg-digiqo-accent opacity-20'
                    : 'w-3 h-3 bg-digiqo-primary opacity-25'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-30, 30],
                  x: [-30, 30],
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 20 + i * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Additional animated elements */}
            <motion.div
              className="absolute bottom-20 left-10 w-32 h-32 border-2 border-digiqo-primary/20 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute top-40 right-20 w-24 h-24 border-2 border-digiqo-accent/20 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-5xl mx-auto mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-digiqo-primary/10 to-digiqo-accent/10 backdrop-blur-sm text-digiqo-primary px-6 py-3 rounded-full text-sm font-semibold mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                Depuis 2020
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-digiqo-black mb-8 leading-tight relative">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  L'agence qui fait
                </motion.span>
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-primary block md:inline relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.4 },
                    scale: { duration: 0.6, delay: 0.4 },
                    backgroundPosition: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  style={{ backgroundSize: '200% 100%' }}
                >
                  {' vibrer '}
                  {/* Glow effect behind the word */}
                  <motion.div
                    className="absolute inset-0 blur-3xl bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-primary opacity-50 -z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  votre digital
                </motion.span>
              </h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Fondée en 2020, Digiqo est une agence dynamique spécialisée dans les stratégies digitales innovantes. 
                Notre équipe d'experts passionnés s'engage à offrir des solutions sur mesure pour renforcer la présence 
                en ligne de nos clients et accélérer leur croissance.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: '2020', label: 'Année de création', icon: Calendar },
                { number: '167', label: 'Clients satisfaits', icon: Award },
                { number: '100%', label: 'Passion', icon: Heart }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="relative inline-block"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/10 to-digiqo-accent/10 rounded-2xl blur-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-shadow">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-digiqo-primary/10 to-digiqo-accent/10 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-digiqo-primary" />
                      </motion.div>
                      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-digiqo-primary to-digiqo-accent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                </motion.div>
              )})}
            </motion.div>
          </div>
        </motion.section>

        {/* Animated section divider */}
        <motion.div 
          className="relative h-8 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-digiqo-primary/5 to-transparent"
            animate={{
              y: [-50, 50],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        {/* Values Section */}
        <motion.section 
          ref={valuesRef}
          id="valeurs" 
          className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
          style={{ 
            y: valuesParallax
          }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(139, 20, 49, 0.1) 10px,
                rgba(139, 20, 49, 0.1) 20px
              )`
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-digiqo-black mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Nos valeurs
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Ce qui nous anime au quotidien
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="group"
                  >
                    <motion.div 
                      className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full"
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/5 to-digiqo-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ filter: 'blur(8px)' }}
                      />
                      
                      <div className="relative">
                        <motion.div 
                          className="w-24 h-24 mx-auto mb-6 relative"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {/* Animated gradient background */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-2xl shadow-lg"
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          {/* White inner circle */}
                          <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center">
                            {/* Icon container with animation */}
                            <motion.div
                              className="relative"
                              animate={{
                                y: [0, -5, 0],
                                rotate: index % 2 === 0 ? [0, 5, -5, 0] : [0, -5, 5, 0],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: index * 0.5,
                              }}
                            >
                              <Icon className="w-12 h-12 text-digiqo-primary" strokeWidth={1.5} />
                              {/* Pulsing glow effect */}
                              <motion.div
                                className="absolute inset-0 blur-md"
                                animate={{
                                  opacity: [0.2, 0.4, 0.2],
                                  scale: [1, 1.1, 1],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: index * 0.2,
                                }}
                              >
                                <Icon className="w-12 h-12 text-digiqo-accent opacity-30" strokeWidth={1.5} />
                              </motion.div>
                            </motion.div>
                          </div>
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-digiqo-black mb-3">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                      
                      {/* Corner decoration */}
                      <motion.div
                        className="absolute top-4 right-4 w-8 h-8 opacity-10"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        <Sparkles className="w-full h-full text-digiqo-primary" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Animated section divider */}
        <motion.div 
          className="relative h-8 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(139, 20, 49, 0.1) 50%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(218, 101, 48, 0.1) 50%, transparent 100%)',
                'linear-gradient(90deg, transparent 0%, rgba(139, 20, 49, 0.1) 50%, transparent 100%)'
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        {/* Team Section */}
        <motion.section 
          ref={teamRef}
          id="equipe" 
          className="py-16 relative overflow-hidden"
          style={{ 
            y: teamParallax
          }}
        >
          {/* Enhanced Background decoration */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-digiqo-primary/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-digiqo-accent/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            {/* Additional animated background elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-96 h-96 bg-digiqo-secondary/5 rounded-full blur-3xl"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            {/* Floating particles across the section */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 3 === 0 
                    ? 'w-2 h-2 bg-digiqo-primary/20' 
                    : i % 3 === 1
                    ? 'w-1 h-1 bg-digiqo-accent/20'
                    : 'w-1.5 h-1.5 bg-digiqo-secondary/20'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-50, 50],
                  x: [-20, 20],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-digiqo-black mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Notre équipe
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Les talents qui font la différence
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.15,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  className="group relative"
                >
                  {/* Animated border gradient */}
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-primary rounded-2xl opacity-0 group-hover:opacity-100 blur"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      backgroundPosition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      opacity: { duration: 0.3 }
                    }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                  
                  <motion.div
                    whileHover={{ 
                      y: -15,
                      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
                    }}
                    className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Card glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/5 via-transparent to-digiqo-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <div className="aspect-square relative overflow-hidden">
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/20 via-transparent to-digiqo-accent/20"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Rotating border effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <div className="absolute inset-4 border-2 border-digiqo-primary/30 rounded-full" />
                      </motion.div>
                      
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                      />
                      
                      {/* Premium gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-digiqo-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Sparkle effects on hover */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${30 + i * 10}%`
                            }}
                            animate={{
                              scale: [0, 1.5, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                    
                    <div className="p-6 relative">
                      {/* Content glow background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-digiqo-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      
                      <div className="relative">
                        <motion.h3 
                          className="text-xl font-bold text-digiqo-black mb-1"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          {member.name}
                        </motion.h3>
                        <motion.p 
                          className="text-digiqo-primary font-medium mb-4"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {member.role}
                        </motion.p>
                        <motion.p 
                          className="text-gray-600 text-sm mb-4"
                          initial={{ opacity: 0.7 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {member.description}
                        </motion.p>
                        
                        {/* Social buttons with enhanced animations */}
                        <div className="flex gap-3">
                          <motion.a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden group/social"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            {/* Animated background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-primary-dark opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                            />
                            <motion.div
                              className="absolute inset-0 bg-digiqo-primary/10"
                              whileHover={{ scale: 2, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            />
                            <Linkedin className="relative w-5 h-5 text-digiqo-primary group-hover/social:text-white transition-colors duration-300 z-10" />
                          </motion.a>
                          
                          <motion.a
                            href={`mailto:${member.email}`}
                            className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden group/social"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            {/* Animated background */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-digiqo-accent to-digiqo-accent-dark opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
                            />
                            <motion.div
                              className="absolute inset-0 bg-digiqo-accent/10"
                              whileHover={{ scale: 2, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            />
                            <Mail className="relative w-5 h-5 text-digiqo-accent group-hover/social:text-white transition-colors duration-300 z-10" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Animated section divider */}
        <motion.div 
          className="relative h-16 overflow-hidden"
          style={{ opacity: ctaFade }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 mx-2 rounded-full bg-gradient-to-r from-digiqo-primary to-digiqo-accent"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.section 
          ref={ctaRef}
          className="relative py-24 overflow-hidden"
          style={{ 
            y: ctaParallax,
            opacity: ctaFade
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-digiqo-primary via-digiqo-accent to-digiqo-primary"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200% 200%' }}
          />
          
          {/* Animated pattern overlay */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{ 
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 30px,
                rgba(255,255,255,0.1) 30px,
                rgba(255,255,255,0.1) 60px
              )`
            }}
          />
          
          {/* Floating orbs */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: `${i * 25}%`,
                  top: `${i % 2 === 0 ? -50 : 50}%`,
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [-50, 50, -50],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20 + i * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              {/* Animated badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-semibold mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                167 clients satisfaits
              </motion.div>
              
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Prêt à{' '}
                <motion.span
                  className="inline-block"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  propulser
                </motion.span>{' '}
                votre présence digitale ?
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Rejoignez les entreprises qui nous font confiance pour leur croissance digitale
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute -inset-1 bg-white/50 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  
                  <Link
                    href="/?openServices=true#services"
                    className="relative inline-flex items-center gap-3 px-10 py-5 bg-white text-digiqo-primary font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    <span className="text-lg">Découvrir nos services</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Rocket className="w-6 h-6" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Animated trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-8 mt-12"
              >
                {[
                  { icon: Award, text: 'Excellence garantie' },
                  { icon: Clock, text: 'Support réactif' },
                  { icon: Users, text: 'Équipe passionnée' }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-white/80"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity, 
                          ease: "linear",
                          delay: index * 5
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  )
}