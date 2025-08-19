import { motion, AnimatePresence } from 'framer-motion'
import { SEO } from '@/components/SEO'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Shield, Users, Globe, CheckCircle, ArrowRight, Award, Euro, Heart, FileSignature, FolderOpen, Send, CheckCircle2, Rocket, Receipt, Banknote, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import { generateContactUrl } from '@/lib/contact-utils'
import { useState, useEffect } from 'react'

const processSteps = [
  {
    number: 1,
    title: 'Devis Kap Numérik',
    description: 'Devis conforme au dispositif fourni par Digiqo',
    icon: FileSignature,
    color: 'from-blue-400 to-cyan-400'
  },
  {
    number: 2,
    title: 'Espace Région',
    description: 'Créez votre espace sur la plateforme Kap Numérik',
    icon: Globe,
    color: 'from-indigo-400 to-purple-400'
  },
  {
    number: 3,
    title: 'Facturation & Paiement',
    description: 'Facture et paiement avant exécution',
    icon: Receipt,
    color: 'from-purple-400 to-pink-400'
  },
  {
    number: 4,
    title: 'Pièces justificatives',
    description: 'Rassemblez tous les documents nécessaires',
    icon: FolderOpen,
    color: 'from-pink-400 to-rose-400'
  },
  {
    number: 5,
    title: 'Dépôt du dossier',
    description: 'Déposez le dossier complet sur la plateforme',
    icon: Send,
    color: 'from-orange-400 to-amber-400'
  },
  {
    number: 6,
    title: 'Validation & Preuves',
    description: 'Transmettez les preuves après validation',
    icon: CheckCircle2,
    color: 'from-emerald-400 to-teal-400'
  },
  {
    number: 7,
    title: 'Remboursement',
    description: 'Remboursement jusqu\'à 80% (max 3200€)',
    icon: Banknote,
    color: 'from-green-400 to-lime-400'
  }
]

const eligibleServices = [
  'Création ou refonte de site web',
  'Publicité en ligne',
  'Stratégie de communication digitale',
  'Développement de votre présence en ligne'
]

const benefits = [
  {
    title: '100% Local',
    description: 'Digiqo est née ici et travaille uniquement avec des entreprises locales ou engagées dans les DOM.',
    icon: Globe,
    highlight: false
  },
  {
    title: '167+ clients',
    description: 'TPE, PME, commerçants ou indépendants : on a boosté la visibilité de nombreuses marques locales grâce au digital.',
    icon: Users,
    highlight: false
  },
  {
    title: 'Humains, efficaces',
    description: 'On vous explique ce qu\'on fait, comment on le fait, et surtout, pourquoi.',
    icon: Heart,
    highlight: false
  },
  {
    title: 'Agence référencée',
    description: 'Digiqo est officiellement référencée pour vous accompagner dans le cadre du Kap Numérik.',
    icon: Award,
    highlight: true
  }
]

const eligibilityCriteria = [
  'Entreprise basée à La Réunion',
  'Moins de 20 salariés',
  'Chiffre d\'affaires inférieur à 1 000 000€',
  'Projet digital concret (création de site, visibilité en ligne, publicité)'
]

export default function KapNumerik() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(new Array(eligibilityCriteria.length).fill(false))
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    const timer = setTimeout(() => {
      eligibilityCriteria.forEach((_, index) => {
        setTimeout(() => {
          setCheckedCriteria(prev => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        }, index * 300)
      })
    }, 1000)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])
  
  return (
    <>
      <SEO
        title="Kap Numérik La Réunion - Jusqu'à 3200€ pour votre présence digitale | Digiqo"
        description="Le Kap Numérik est une aide régionale pouvant aller jusqu'à 3200€ pour développer votre présence en ligne. Digiqo vous accompagne de A à Z pour bénéficier de cette opportunité."
        keywords="kap numerik reunion, aide digitale reunion, subvention site web, financement digital, 3200 euros aide"
        url="https://digiqo.com/kap-numerik-la-reunion"
      />

      <HeaderLuxury />

      <main>
        {/* Hero Section - Ultra Premium */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-36">
          {/* Custom cursor glow effect */}
          <motion.div
            className="pointer-events-none fixed w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(25, 156, 183, 0.15) 0%, transparent 70%)',
              left: mousePosition.x - 128,
              top: mousePosition.y - 128,
              zIndex: 50,
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/50 to-white opacity-60" />
          </div>
          
          {/* Animated orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-digiqo-secondary/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-digiqo-primary/20 to-transparent rounded-full blur-3xl"
          />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeOut"
                }}
              >
                {i % 3 === 0 ? (
                  <Sparkles className="w-3 h-3 text-digiqo-secondary" />
                ) : i % 3 === 1 ? (
                  <Star className="w-2 h-2 text-digiqo-accent" />
                ) : (
                  <div className="w-2 h-2 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-full" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8,
                ease: [0.21, 1.11, 0.81, 0.99]
              }}
              className="text-center max-w-5xl mx-auto"
            >
              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-xl opacity-50 animate-pulse" />
                  <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200 shadow-lg">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Euro className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-700">JUSQU'À 3 200€ D'AIDE</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Main title with stagger animation */}
              <div className="mb-8 space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-bold"
                >
                  <span className="text-gray-900">Kap Numérik</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-digiqo-secondary via-digiqo-primary to-digiqo-accent animate-gradient-x">La Réunion</span>
                </motion.div>
              </div>
              
              {/* Description with fade-in words */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto"
              >
                Jusqu'à <span className="font-bold text-gray-900">3 200€</span> pour développer votre présence digitale à La Réunion<br/>
                <span className="text-lg md:text-xl">Le Kap Numérik est une aide régionale destinée aux entreprises réunionnaises 
                qui souhaitent booster leur présence en ligne.</span>
              </motion.p>

              {/* CTA buttons with hover effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="flex flex-wrap gap-6 justify-center"
              >
                <Link
                  href="#eligibilite"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden rounded-2xl font-semibold text-white transition-all duration-300 hover:gap-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark transition-all duration-300 group-hover:scale-105" />
                  <span className="relative">Vérifier mon éligibilité</span>
                  <ArrowRight className="relative w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-digiqo-secondary/50 to-digiqo-secondary-dark/50 blur-2xl transition-all duration-300 group-hover:blur-3xl" />
                </Link>
                
                <Link
                  href={generateContactUrl({
                    service: 'kap-numerik',
                    description: 'Je souhaite bénéficier du Kap Numérik'
                  })}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white/80 backdrop-blur-sm text-digiqo-secondary font-semibold rounded-2xl border-2 border-digiqo-secondary/20 hover:border-digiqo-secondary transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative group-hover:text-white transition-colors duration-300">En savoir plus</span>
                </Link>
              </motion.div>
            </motion.div>
            
          </div>
        </section>

        {/* About Kap Numérik - Modern Split Design with Parallax */}
        <motion.section 
          className="py-32 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-digiqo-secondary/5 to-transparent" />
          </div>
          
          {/* Animated lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.line
              x1="20%" y1="0" x2="30%" y2="100%"
              stroke="url(#lineGradient)" strokeWidth="1" opacity="0.1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            <motion.line
              x1="70%" y1="0" x2="80%" y2="100%"
              stroke="url(#lineGradient)" strokeWidth="1" opacity="0.1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#199CB7" />
                <stop offset="100%" stopColor="#8B1431" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-4xl font-bold text-digiqo-black mb-6">
                  C'est quoi le Kap Numérik ?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Le Kap Numérik est une aide régionale pouvant aller jusqu'à <strong>3200€</strong>, 
                  destinée aux entreprises réunionnaises qui souhaitent booster leur présence en ligne.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Elle permet de financer des prestations comme :
                </p>
                <ul className="space-y-3 mb-6">
                  {eligibleServices.map((service, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-digiqo-secondary flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-gray-600 font-semibold">
                  Digiqo vous accompagne de A à Z pour bénéficier de cette opportunité 
                  et faire décoller votre visibilité.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Video container with premium effects */}
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-digiqo-secondary/20 via-digiqo-primary/20 to-digiqo-accent/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  
                  {/* Video wrapper */}
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/v0844OktzIE"
                      title="Kap Numérik - Explication"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                    
                    {/* Play button overlay effect */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[15px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-digiqo-accent to-transparent rounded-full opacity-20" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-digiqo-secondary to-transparent rounded-full opacity-20" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Process Steps - Premium Luxe Design */}
        <section className="py-32 relative overflow-hidden">
          {/* Fond premium avec gradient lumineux */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-orange-50/40" />
          
          {/* Effets de lumière sophistiqués */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-digiqo-secondary/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-digiqo-accent/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-gradient-to-r from-transparent via-digiqo-primary/5 to-transparent blur-3xl rotate-45" />
          
          {/* Pattern de luxe */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-md px-8 py-4 rounded-full mb-8 shadow-lg border border-white/50"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-digiqo-secondary to-digiqo-accent rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-digiqo-secondary to-digiqo-primary">PARCOURS D'EXCELLENCE</span>
                <div className="w-2 h-2 bg-gradient-to-r from-digiqo-primary to-digiqo-secondary rounded-full animate-pulse" />
              </motion.div>
              
              <motion.h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <motion.span 
                  className="text-gray-900 block"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  7 étapes vers votre
                </motion.span>
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-digiqo-secondary via-digiqo-primary to-digiqo-accent animate-gradient-x block"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  transformation digitale
                </motion.span>
              </motion.h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Un accompagnement premium pour débloquer jusqu'à 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> 3 200€</span> de financement
              </p>
            </motion.div>

            {/* Timeline Premium 3D */}
            <div className="relative max-w-7xl mx-auto perspective-1000">
              {/* Première rangée - 3 étapes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 relative z-10 mb-8 lg:mb-12">
                {processSteps.slice(0, 3).map((step, index) => {
                  const Icon = step.icon
                  const colors = [
                    'from-blue-400 to-cyan-400',
                    'from-indigo-400 to-purple-400', 
                    'from-purple-400 to-pink-400',
                    'from-pink-400 to-rose-400',
                    'from-orange-400 to-amber-400',
                    'from-emerald-400 to-teal-400',
                    'from-green-400 to-lime-400'
                  ]
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 100, rotateX: -60 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.15,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        y: -20,
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="group relative transform-gpu"
                    >
                      {/* Carte Premium Glass avec AnimatePresence */}
                      <motion.div 
                        className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/50 hover:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 h-full overflow-visible"
                        animate={{
                          scale: hoveredStep === index ? 1.02 : 1,
                          boxShadow: hoveredStep === index 
                            ? "0 25px 80px -20px rgba(0,0,0,0.4)" 
                            : "0 10px 40px -10px rgba(0,0,0,0.2)"
                        }}
                      >
                        {/* Effet de reflet lumineux */}
                        <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl blur-sm" />
                        
                        {/* Particules flottantes */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-digiqo-secondary/10 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: `${index * 0.5}s` }} />
                          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-tr from-digiqo-accent/10 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: `${index * 0.3}s`, animationDuration: '4s' }} />
                        </div>
                        
                        {/* Numéro d'étape en 3D */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                          <div className={`relative w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br ${colors[index]} rounded-2xl shadow-xl transform rotate-45 group-hover:rotate-[55deg] transition-all duration-500`}>
                            <div className="absolute inset-0 bg-white/30 rounded-2xl" />
                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl -rotate-45">
                              {step.number}
                            </span>
                          </div>
                        </div>
                        
                        {/* Icône avec effet premium */}
                        <div className="mb-3 sm:mb-4 lg:mb-6 mt-2 sm:mt-3 lg:mt-4">
                          <motion.div 
                            className="relative mx-auto w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                          >
                            {/* Cercles concentriques animés */}
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors[index]} opacity-20 animate-pulse`} />
                            <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${colors[index]} opacity-30 animate-pulse`} style={{ animationDelay: '0.2s' }} />
                            <div className={`absolute inset-4 rounded-full bg-gradient-to-br ${colors[index]} opacity-40`} />
                            
                            {/* Icône centrale avec fond blanc */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                <div className={`w-full h-full rounded-xl bg-gradient-to-br ${colors[index]} p-2 sm:p-3 flex items-center justify-center`}>
                                  <Icon className="w-full h-full text-white drop-shadow-sm" strokeWidth={1.5} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Contenu élégant et responsive */}
                        <div className="text-center relative z-10">
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-digiqo-secondary group-hover:to-digiqo-primary transition-all duration-300 break-words">
                            {step.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300 break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
                            {step.description}
                          </p>
                        </div>
                        
                        {/* Effet de brillance au hover */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/0 via-white/30 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                      </motion.div>
                      
                      {/* Ombre colorée dynamique */}
                      <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r ${colors[index]} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Deuxième rangée - 4 étapes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 relative z-10">
                {processSteps.slice(3, 7).map((step, originalIndex) => {
                  const index = originalIndex + 3
                  const Icon = step.icon
                  const colors = [
                    'from-blue-400 to-cyan-400',
                    'from-indigo-400 to-purple-400', 
                    'from-purple-400 to-pink-400',
                    'from-pink-400 to-rose-400',
                    'from-orange-400 to-amber-400',
                    'from-emerald-400 to-teal-400',
                    'from-green-400 to-lime-400'
                  ]
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 100, rotateX: -60 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.15,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        y: -20,
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="group relative transform-gpu"
                    >
                      {/* Carte Premium Glass avec AnimatePresence */}
                      <motion.div 
                        className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/50 hover:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 h-full overflow-visible"
                        animate={{
                          scale: hoveredStep === index ? 1.02 : 1,
                          boxShadow: hoveredStep === index 
                            ? "0 25px 80px -20px rgba(0,0,0,0.4)" 
                            : "0 10px 40px -10px rgba(0,0,0,0.2)"
                        }}
                      >
                        {/* Effet de reflet lumineux */}
                        <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl blur-sm" />
                        
                        {/* Particules flottantes */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-digiqo-secondary/10 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: `${index * 0.5}s` }} />
                          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-tr from-digiqo-accent/10 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: `${index * 0.3}s`, animationDuration: '4s' }} />
                        </div>
                        
                        {/* Numéro d'étape en 3D */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                          <div className={`relative w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br ${colors[index]} rounded-2xl shadow-xl transform rotate-45 group-hover:rotate-[55deg] transition-all duration-500`}>
                            <div className="absolute inset-0 bg-white/30 rounded-2xl" />
                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl -rotate-45">
                              {step.number}
                            </span>
                          </div>
                        </div>
                        
                        {/* Icône avec effet premium */}
                        <div className="mb-3 sm:mb-4 lg:mb-6 mt-2 sm:mt-3 lg:mt-4">
                          <motion.div 
                            className="relative mx-auto w-14 sm:w-16 lg:w-20 h-14 sm:h-16 lg:h-20"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8 }}
                          >
                            {/* Cercles concentriques animés */}
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors[index]} opacity-20 animate-pulse`} />
                            <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${colors[index]} opacity-30 animate-pulse`} style={{ animationDelay: '0.2s' }} />
                            <div className={`absolute inset-4 rounded-full bg-gradient-to-br ${colors[index]} opacity-40`} />
                            
                            {/* Icône centrale avec fond blanc */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                <div className={`w-full h-full rounded-xl bg-gradient-to-br ${colors[index]} p-2 sm:p-3 flex items-center justify-center`}>
                                  <Icon className="w-full h-full text-white drop-shadow-sm" strokeWidth={1.5} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Contenu élégant et responsive */}
                        <div className="text-center relative z-10">
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-digiqo-secondary group-hover:to-digiqo-primary transition-all duration-300 break-words">
                            {step.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300 break-words hyphens-auto" style={{ wordBreak: 'break-word' }}>
                            {step.description}
                          </p>
                        </div>
                        
                        {/* Effet de brillance au hover */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/0 via-white/30 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                      </motion.div>
                      
                      {/* Ombre colorée dynamique */}
                      <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r ${colors[index]} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Source avec design premium */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-24"
            >
              <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-lg px-12 py-8 rounded-3xl shadow-xl border border-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-medium text-gray-700">Information certifiée et vérifiée</p>
                </div>
                <a 
                  href="https://demarches.cr-reunion.fr/economie/kap-numerik-2023/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-digiqo-secondary to-digiqo-primary font-bold text-lg hover:from-digiqo-primary hover:to-digiqo-accent transition-all duration-300"
                >
                  <span>Consulter la source officielle</span>
                  <div className="w-10 h-10 bg-gradient-to-br from-digiqo-secondary/20 to-digiqo-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-digiqo-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Funding Amount - Interactive Cards with Animations */}
        <motion.section 
          className="py-32 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 opacity-70" />
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #10b981 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-digiqo-secondary to-digiqo-accent mx-auto mb-8"
              />
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Montant de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">subvention</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                La subvention ne peut pas dépasser <strong className="text-green-600">3 200€</strong> et est calculée à partir du prix HT de votre devis.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* 80% Card */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -30 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/50 shadow-2xl overflow-hidden">
                  {/* Animated background circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-digiqo-secondary/10 to-transparent rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                  
                  {/* Content */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-digiqo-secondary to-blue-600 mb-6"
                  >
                    80%
                  </motion.div>
                  <p className="text-2xl font-bold text-gray-900 mb-3">DU DEVIS HT</p>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-3" />
                  <p className="text-lg text-gray-600">Pour les structures de</p>
                  <p className="text-xl font-semibold text-gray-900">0 à 9 salariés</p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-digiqo-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
              </motion.div>

              {/* 50% Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 30 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-rose-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/50 shadow-2xl overflow-hidden">
                  {/* Animated background circles */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-digiqo-primary/10 to-transparent rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-rose-400/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                  
                  {/* Content */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-digiqo-primary to-rose-600 mb-6"
                  >
                    50%
                  </motion.div>
                  <p className="text-2xl font-bold text-gray-900 mb-3">DU DEVIS HT</p>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-3" />
                  <p className="text-lg text-gray-600">Pour les structures de</p>
                  <p className="text-xl font-semibold text-gray-900">10 à 19 salariés</p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-digiqo-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
              </motion.div>
            </div>
            
            {/* Max amount highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mt-16"
            >
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-4 rounded-full border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-lg font-medium text-gray-700">
                  Montant maximum : <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">3 200€</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Digiqo - Modern Grid */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                Pourquoi choisir Digiqo ?
              </h2>
              <p className="text-xl text-gray-600">
                Digiqo vous accompagne de A à Z
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.15,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -20, 
                      scale: 1.05,
                      transition: { duration: 0.3 } 
                    }}
                    className="group relative"
                  >
                    {/* Card with glassmorphism */}
                    <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        benefit.highlight 
                          ? 'bg-gradient-to-br from-digiqo-secondary/5 to-digiqo-accent/5'
                          : 'bg-gradient-to-br from-digiqo-primary/5 to-transparent'
                      }`} />
                      
                      {/* Icon with animation */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                        className="relative mb-6"
                      >
                        <div className={`mx-auto w-24 h-24 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                          benefit.highlight
                            ? 'bg-gradient-to-br from-digiqo-secondary to-digiqo-accent'
                            : 'bg-gradient-to-br from-gray-100 to-gray-200'
                        }`}>
                          {/* Inner glow */}
                          <div className="absolute inset-0 bg-white/20 blur-xl" />
                          <Icon className={`relative w-12 h-12 ${
                            benefit.highlight ? 'text-white' : 'text-gray-700'
                          }`} />
                          
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                            initial={{ x: '-100%', y: '-100%' }}
                            whileHover={{ x: '100%', y: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        
                        {/* Highlight badge */}
                        {benefit.highlight && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Content */}
                      <div className="relative text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-digiqo-secondary group-hover:to-digiqo-primary transition-all duration-300">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12 p-8 bg-digiqo-secondary/5 rounded-lg"
            >
              <p className="text-lg text-gray-700">
                De l'audit à la réalisation, Digiqo vous accompagne dans votre projet digital.<br/>
                <span className="text-base">Nous vous fournissons tous les éléments nécessaires (devis, documents techniques, etc.) 
                pour votre dossier Kap Numérik. La démarche administrative reste à votre charge.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Eligibility - Interactive Checklist */}
        <section id="eligibilite" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-digiqo-black mb-4">
                  Êtes-vous éligible ?
                </h2>
                <p className="text-xl text-gray-600">
                  Le Kap Numérik s'adresse aux entreprises basées à La Réunion
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-xl p-8"
              >
                <h3 className="text-2xl font-bold text-digiqo-black mb-6">
                  Critères d'éligibilité
                </h3>
                <ul className="space-y-6 mb-10">
                  {eligibilityCriteria.map((criteria, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group relative flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      {/* Animated checkbox */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                        className="relative"
                      >
                        <AnimatePresence>
                          {checkedCriteria[index] && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      
                      {/* Criteria text with hover effect */}
                      <span className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors duration-300 flex-1">
                        {criteria}
                      </span>
                      
                      {/* Progress line */}
                      {index < eligibilityCriteria.length - 1 && (
                        <motion.div
                          className="absolute left-7 top-12 w-0.5 h-12 bg-gradient-to-b from-green-300 to-transparent"
                          initial={{ height: 0 }}
                          whileInView={{ height: '48px' }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        />
                      )}
                    </motion.li>
                  ))}
                </ul>

                <div className="bg-digiqo-secondary/5 rounded-lg p-6 mb-8">
                  <p className="text-center text-gray-700 mb-4">
                    <strong>Vous remplissez tous les critères ?</strong>
                  </p>
                  <p className="text-center text-gray-600">
                    Et bonne nouvelle : Digiqo vous aide à vérifier ça en 2 minutes.
                  </p>
                </div>

                <Link
                  href={generateContactUrl({
                    service: 'kap-numerik',
                    description: 'Je veux vérifier mon éligibilité au Kap Numérik'
                  })}
                  className="block w-full text-center px-8 py-4 bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Je démarre mon accompagnement
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section - Ultra Premium with Interactive Effects */}
        <motion.section 
          className="relative py-32 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary via-digiqo-accent to-digiqo-secondary" />
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                backgroundSize: '100px 100px',
              }}
            />
          </div>
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-lg"
            />
            <motion.div
              animate={{
                y: [20, -20],
                x: [10, -10],
                rotate: [360, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 right-10 w-32 h-32 border-2 border-white/10 rounded-full"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Main heading with animation */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                className="text-5xl md:text-7xl font-bold text-white mb-8"
              >
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Alors ?
                </motion.span>{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  On y va ?
                </motion.span>
              </motion.h2>
              
              {/* Animated text lines */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-2 mb-12"
              >
                <p className="text-2xl md:text-3xl text-white/90 font-light">
                  Ne passez pas à côté de cette opportunité unique
                </p>
                <p className="text-xl md:text-2xl text-white/80">
                  Jusqu'à <span className="text-3xl font-bold text-yellow-300">3 200€</span> pour transformer votre présence digitale
                </p>
              </motion.div>
              
              {/* CTA Buttons with premium effects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                {/* Primary CTA */}
                <Link
                  href={generateContactUrl({
                    service: 'kap-numerik',
                    description: 'Je souhaite démarrer mon projet Kap Numérik'
                  })}
                  className="group relative inline-flex items-center gap-3 px-12 py-6 overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-white transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative text-lg font-bold text-digiqo-primary group-hover:text-digiqo-accent transition-colors duration-300">
                    Monter mon dossier
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative"
                  >
                    <ArrowRight className="w-6 h-6 text-digiqo-primary group-hover:text-digiqo-accent transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10 bg-white/50 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                </Link>
                
                {/* Secondary CTA */}
                <motion.a
                  href="tel:+262693737297"
                  className="group relative inline-flex items-center gap-3 px-12 py-6 bg-transparent text-white font-bold text-lg rounded-2xl border-2 border-white/50 backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📞
                  </motion.span>
                  <span>0262 02 51 02</span>
                </motion.a>
              </motion.div>
              
              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-16 flex items-center justify-center gap-8 text-white/60 text-sm"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Agence agréée</span>
                </div>
                <div className="w-px h-5 bg-white/30" />
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>+100 entreprises accompagnées</span>
                </div>
                <div className="w-px h-5 bg-white/30" />
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>100% sécurisé</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  )
}