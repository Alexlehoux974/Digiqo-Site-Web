import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedBeam } from '../magicui/animated-beam'
import { Modal } from '../ui/Modal'
import { TrendingUp, Users, Target } from 'lucide-react'
import { OptimizedImage } from '../ui/OptimizedImage'

const clientLogos = [
  { name: 'CCI Réunion', logo: '/partenaires/CCI-REUNION-1024x1024.webp' },
  { name: '3M', logo: '/partenaires/3M-1024x1024.webp' },
  { name: 'Beauvallon', logo: '/partenaires/BEAUVALLON-1024x1024.webp' }
]

const caseStudies = [
  {
    id: 'campagne-digitale',
    title: 'Campagne Digitale',
    result: '+250% de leads',
    description: 'Stratégie multi-canal optimisée',
    client: 'CCI Réunion',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // À remplacer par la vraie vidéo
    mission: {
      contexte: 'La CCI Réunion souhaitait augmenter sa visibilité digitale et générer plus de leads qualifiés pour ses formations professionnelles.',
      objectifs: [
        'Augmenter le trafic qualifié sur le site web',
        'Générer des leads pour les formations',
        'Améliorer la notoriété digitale de l\'institution'
      ],
      solutions: [
        'Campagnes Google Ads ciblées par secteur d\'activité',
        'Stratégie Facebook/Instagram avec audiences personnalisées',
        'Landing pages optimisées pour la conversion',
        'Remarketing dynamique sur l\'ensemble du parcours'
      ],
      resultats: [
        '+250% de leads générés en 3 mois',
        'Coût par acquisition divisé par 3',
        'Taux de conversion des landing pages : 18%',
        'ROI de la campagne : 420%'
      ]
    }
  },
  {
    id: 'refonte-ecommerce',
    title: 'Refonte E-commerce',
    result: '+180% de conversion',
    description: 'UX/UI repensée pour la performance',
    client: '3M Réunion',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // À remplacer par la vraie vidéo
    mission: {
      contexte: '3M Réunion avait besoin de moderniser sa plateforme e-commerce pour mieux servir ses clients professionnels.',
      objectifs: [
        'Refondre l\'expérience utilisateur du site e-commerce',
        'Optimiser le tunnel de conversion',
        'Intégrer un système de gestion des devis'
      ],
      solutions: [
        'Nouveau design responsive et moderne',
        'Optimisation du temps de chargement (Core Web Vitals)',
        'Simplification du processus de commande',
        'Intégration d\'un chat en ligne pour l\'assistance'
      ],
      resultats: [
        '+180% de taux de conversion',
        'Temps moyen de session augmenté de 65%',
        'Taux d\'abandon de panier réduit de 40%',
        'Note de satisfaction client : 4.8/5'
      ]
    }
  },
  {
    id: 'social-media-360',
    title: 'Social Media 360°',
    result: '+500% d\'engagement',
    description: 'Community management expert',
    client: 'Le Beauvallon',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // À remplacer par la vraie vidéo
    mission: {
      contexte: 'L\'hôtel Le Beauvallon souhaitait développer sa présence sur les réseaux sociaux pour attirer une clientèle internationale.',
      objectifs: [
        'Créer une communauté engagée sur les réseaux sociaux',
        'Augmenter les réservations directes',
        'Développer la notoriété internationale'
      ],
      solutions: [
        'Stratégie de contenu premium (photos/vidéos professionnelles)',
        'Campagnes d\'influence avec des travel bloggers',
        'Gestion active de la communauté en 4 langues',
        'Stories et Reels quotidiens showcasing l\'expérience'
      ],
      resultats: [
        '+500% d\'engagement sur Instagram',
        '+15K followers en 6 mois',
        '35% de réservations directes via les réseaux',
        'Reach international multiplié par 8'
      ]
    }
  }
]

export function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const clientRefs = useRef<(HTMLDivElement | null)[]>([])
  const digiqoRef = useRef<HTMLDivElement>(null)
  const resultRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isReady, setIsReady] = useState(false)
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null)

  useEffect(() => {
    // Force re-render when refs are ready
    const checkRefs = () => {
      if (containerRef.current && digiqoRef.current && clientRefs.current.some(ref => ref !== null)) {
        setIsReady(true)
      }
    }
    // Check after animations complete
    const timer = setTimeout(checkRefs, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="case-studies" className="relative py-20 bg-gradient-to-b from-digiqo-secondary/5 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-digiqo-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-digiqo-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-digiqo-primary">Études de Cas</span>{' '}
          <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">
            Récentes
          </span>
        </h3>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          De l'idée à la réussite, Digiqo est le pont entre vos ambitions et vos résultats.
        </p>
      </motion.div>

      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto w-full flex flex-col md:flex-row md:justify-between items-center gap-8 p-4 md:px-0 md:py-8 min-h-[400px] md:min-h-[600px]"
      >
        {/* Mobile Version - Case Studies Grid */}
        <div className="block md:hidden w-full">
          <div className="grid grid-cols-1 gap-4">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border border-digiqo-secondary/20 hover:border-digiqo-secondary/40 hover:shadow-digiqo-secondary/20 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCase(study)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-digiqo-primary">
                    {study.title}
                  </h4>
                  {/* Indicateur de clic mobile */}
                  <div className="bg-digiqo-accent/10 rounded-full p-1.5 group-hover:bg-digiqo-accent/20 transition-colors">
                    <svg className="w-4 h-4 text-digiqo-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent mb-2">
                  {study.result}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  {study.description}
                </p>
                {/* Call to action mobile */}
                <div className="flex items-center gap-1 text-xs text-digiqo-accent">
                  <span>Voir le témoignage</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Version - Client Logos Column */}
        <div className="hidden md:flex flex-col gap-6 justify-evenly items-center h-full">
          {clientLogos.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              ref={el => {
                if (el) clientRefs.current[index] = el;
              }}
              className="relative z-30 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-digiqo-secondary/20 transition-all duration-300 p-2 md:p-3 flex items-center justify-center border border-digiqo-secondary/20 hover:border-digiqo-secondary/40 hover:scale-105"
            >
              <OptimizedImage 
                src={client.logo} 
                alt={client.name}
                width={1024}
                height={1024}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
                objectFit="contain"
              />
            </motion.div>
          ))}
        </div>

        {/* Digiqo Logo Center - Desktop Only */}
        <div className="hidden md:flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            ref={digiqoRef}
            className="relative z-20"
          >
          <div className="bg-gradient-to-br from-digiqo-secondary to-digiqo-accent p-[2px] rounded-2xl md:rounded-3xl shadow-2xl">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-xl">
              <OptimizedImage 
                src="/assets/logo2-digiqo.png" 
                alt="Digiqo"
                width={128}
                height={128}
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-digiqo-secondary to-digiqo-accent rounded-3xl blur-2xl opacity-40 -z-10 animate-pulse"></div>
          </motion.div>
        </div>

        {/* Result Cards Column - Desktop Only */}
        <div className="hidden md:flex flex-col gap-6 justify-evenly items-stretch h-full">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              viewport={{ once: true }}
              ref={el => {
                if (el) resultRefs.current[index] = el;
              }}
              className="relative z-30 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-digiqo-accent/20 transition-all duration-300 p-4 md:p-6 border border-digiqo-accent/20 hover:border-digiqo-accent/40 hover:scale-105 group cursor-pointer"
              onClick={() => setSelectedCase(study)}
            >
              {/* Indicateur de clic */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-digiqo-accent/10 rounded-full p-1.5">
                  <svg className="w-4 h-4 text-digiqo-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-digiqo-primary mb-2">
                {study.title}
              </h4>
              <p className="text-2xl font-bold bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {study.result}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                {study.description}
              </p>
              
              {/* Call to action subtil */}
              <div className="flex items-center gap-1 text-xs text-digiqo-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Voir le témoignage</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Beams - Only show on desktop */}
        {isReady && (
          <div className="hidden md:block absolute inset-0 z-10">
            {clientRefs.current.map((clientRef, index) => (
            clientRef && digiqoRef.current && (
              <AnimatedBeam
              key={`client-${index}`}
              containerRef={containerRef}
              fromRef={{ current: clientRef }}
              toRef={digiqoRef}
              curvature={-20}
              duration={4}
              delay={index * 0.3}
              pathColor="#8B1431"
              pathOpacity={0.4}
              gradientStartColor="#8B1431"
              gradientStopColor="#DA6530"
              startXOffset={45}
              startYOffset={0}
              endXOffset={-65}
              endYOffset={0}
              reverse={false}
            />
          )
        ))}

        {resultRefs.current.map((resultRef, index) => (
          digiqoRef.current && resultRef && (
            <AnimatedBeam
              key={`result-${index}`}
              containerRef={containerRef}
              fromRef={digiqoRef}
              toRef={{ current: resultRef }}
              curvature={20}
              duration={4}
              delay={1.2 + index * 0.3}
              pathColor="#199CB7"
              pathOpacity={0.3}
              gradientStartColor="#199CB7"
              gradientStopColor="#199CB7"
              startXOffset={65}
              startYOffset={0}
              endXOffset={-95}
              endYOffset={0}
              reverse={false}
            />
          )
        ))}
          </div>
        )}
      </div>
      </div>

      {/* Modal pour les détails des études de cas */}
      <Modal isOpen={!!selectedCase} onClose={() => setSelectedCase(null)}>
        {selectedCase && (
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-start">
              {/* Colonne gauche - Mockup téléphone avec vidéo */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Mockup iPhone */}
                  <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[400px] md:h-[600px] w-[200px] md:w-[300px] shadow-xl">
                    {/* Notch */}
                    <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-[172px] md:w-[272px] h-[372px] md:h-[572px] bg-white dark:bg-gray-800">
                      {/* Vidéo */}
                      <iframe
                        title={`Témoignage ${selectedCase.client}`}
                        width="100%"
                        height="100%"
                        src={selectedCase.videoUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  {/* Ombre sous le téléphone */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Colonne droite - Contenu de la mission */}
              <div className="overflow-y-auto max-h-[600px] pr-2">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-digiqo-primary mb-2">
                    {selectedCase.title}
                  </h3>
                  <span className="inline-block text-xl font-bold bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent mb-3">
                    {selectedCase.result}
                  </span>
                  <p className="text-gray-700">{selectedCase.description}</p>
                </div>

                {/* Contexte */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-digiqo-primary mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Contexte & Défis
                  </h4>
                  <p className="text-sm text-gray-700 mb-4">{selectedCase.mission.contexte}</p>
                  
                  <h5 className="font-semibold text-digiqo-primary mb-2 text-sm">Objectifs :</h5>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {selectedCase.mission.objectifs.map((objectif, idx) => (
                      <li key={idx}>{objectif}</li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-digiqo-primary mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Solutions Déployées
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {selectedCase.mission.solutions.map((solution, idx) => (
                      <li key={idx}>{solution}</li>
                    ))}
                  </ul>
                </div>

                {/* Résultats */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-digiqo-primary mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Résultats Obtenus
                  </h4>
                  <ul className="space-y-1">
                    {selectedCase.mission.resultats.map((resultat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-digiqo-accent font-bold mt-0.5">✓</span>
                        <span className="text-gray-700">{resultat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Client : <span className="font-semibold text-gray-700">{selectedCase.client}</span> • 
                    Secteur : <span className="font-semibold text-gray-700">
                      {selectedCase.id === 'campagne-digitale' ? 'Formation Professionnelle' : 
                       selectedCase.id === 'refonte-ecommerce' ? 'Industrie' : 'Hôtellerie'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}