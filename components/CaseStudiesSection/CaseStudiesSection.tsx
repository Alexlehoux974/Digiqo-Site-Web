import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Modal } from '../ui/Modal'
import { OptimizedImage } from '../ui/OptimizedImage'

const clientLogos = [
  { name: 'Lodges Paradise', logo: '/partenaires/lodges-paradise.png', videoUrl: 'https://raw.githubusercontent.com/Alexlehoux974/Vid-os-Site-web-Digiqo/main/VEILLE-ANOU.mp4' },
  { name: 'CbienGlacé', logo: '/partenaires/cbienglace.webp', videoUrl: 'https://raw.githubusercontent.com/Alexlehoux974/Vid-os-Site-web-Digiqo/main/C_BIEN_GLACE%CC%81_.mp4' },
  { name: 'Culinarion', logo: '/partenaires/culinarion.webp', videoUrl: 'https://raw.githubusercontent.com/Alexlehoux974/Vid-os-Site-web-Digiqo/main/CULINARION.mp4' },
  { name: 'Parapente Réunion', logo: '/partenaires/parapente-reunion.png', videoUrl: 'https://raw.githubusercontent.com/Alexlehoux974/Vid-os-Site-web-Digiqo/main/VEILLE-ANOU.mp4' },
  { name: 'Alpha Coaching', logo: '/partenaires/ALPHA-COACHING-1024x1024.webp', videoUrl: 'https://raw.githubusercontent.com/Alexlehoux974/Vid-os-Site-web-Digiqo/main/C_BIEN_GLACE%CC%81_.mp4' },
  { name: 'Chokaae', logo: '/partenaires/CHOKAAE-1024x1024.webp', videoUrl: 'https://raw.githubusercontent.com/Alexlehoux974/Vid-os-Site-web-Digiqo/main/CULINARION.mp4' }
]

// Removed unused caseStudies array - data is now integrated in clientLogos if needed

export function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

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
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-digiqo-primary">Nos réalisations</span>{' '}
          <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-accent bg-clip-text text-transparent">
            récentes
          </span>
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Cliquez sur un logo pour afficher la vidéo publicitaire d'un de nos clients
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto w-full flex flex-col items-center gap-8 p-4 md:px-0 md:py-8 min-h-[400px] md:min-h-[700px]"
      >
        {/* Mobile Version - Case Studies Grid */}
        <div className="block md:hidden w-full">
          <div className="grid grid-cols-1 gap-4">
            {clientLogos.slice(0, 3).map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border border-digiqo-secondary/20 hover:border-digiqo-secondary/40 hover:shadow-digiqo-secondary/20 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedVideo(client.videoUrl)}
              >
                <div className="flex items-center justify-between mb-4">
                  <OptimizedImage
                    src={client.logo}
                    alt={client.name}
                    width={1024}
                    height={1024}
                    className="w-20 h-20 object-contain"
                    objectFit="contain"
                  />
                  {/* Indicateur de clic mobile */}
                  <div className="bg-digiqo-accent/10 rounded-full p-1.5 group-hover:bg-digiqo-accent/20 transition-colors">
                    <svg className="w-4 h-4 text-digiqo-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-digiqo-primary mb-2">
                  {client.name}
                </h3>
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

        {/* Desktop Version - Orbiting Logos with SVG connections */}
        <div className="hidden md:block relative w-full h-[700px]">
          <div className="absolute inset-0 flex items-center justify-center">

            {/* Container for ALL elements */}
            <div className="relative w-[700px] h-[700px]">

              {/* Digiqo Logo Center - z-20 pour être au-dessus des lignes */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-digiqo-secondary to-digiqo-accent p-[2px] rounded-3xl shadow-2xl">
                    <div className="bg-white rounded-3xl p-8 backdrop-blur-xl">
                      <OptimizedImage
                        src="/assets/logo2-digiqo.png"
                        alt="Digiqo"
                        width={128}
                        height={128}
                        className="w-28 h-28 md:w-32 md:h-32 object-contain"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-digiqo-primary to-digiqo-primary/60 rounded-3xl blur-2xl opacity-50 -z-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* SVG pour les lignes de connexion - z-10 pour être derrière le logo central */}
              <motion.svg
                className="absolute top-0 left-0 w-[700px] h-[700px] z-10"
                viewBox="0 0 700 700"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  // Commencer à -90° (12 heures) pour avoir le premier logo en haut
                  const angle = (index * 60) - 90;
                  const radians = (angle * Math.PI) / 180;
                  const radius = 250; // Rayon pour un cercle parfait

                  // Position exacte sur le cercle
                  const endX = 350 + Math.cos(radians) * radius;
                  const endY = 350 + Math.sin(radians) * radius;

                  return (
                    <g key={`line-${index}`}>
                      <motion.line
                        x1="350"
                        y1="350"
                        x2={endX}
                        y2={endY}
                        stroke="#8B1431"
                        strokeWidth="3"
                        animate={{
                          opacity: [0.4, 0.8, 0.4],
                          strokeWidth: [2, 3, 2]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Boule au bout du trait */}
                      <motion.circle
                        cx={endX}
                        cy={endY}
                        r="8"
                        fill="#8B1431"
                        animate={{
                          r: [6, 10, 6],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.3,
                          ease: "easeInOut"
                        }}
                      />
                    </g>
                  );
                })}
              </motion.svg>

              {/* Logos STATIQUES exactement sur les boules - PAS DE ROTATION */}
              <motion.div
                className="absolute top-0 left-0 w-[700px] h-[700px] z-30"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  // EXACTEMENT LE MÊME CALCUL QUE POUR LES BOULES
                  const angle = (index * 60) - 90;
                  const radians = (angle * Math.PI) / 180;
                  const radius = 250;

                  // Position exacte - IDENTIQUE aux boules
                  const x = 350 + Math.cos(radians) * radius;
                  const y = 350 + Math.sin(radians) * radius;

                  const client = clientLogos[index];

                  return (
                    <div
                      key={client.name}
                      className="absolute"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <motion.div
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-digiqo-secondary/20 transition-all duration-300 p-4 flex items-center justify-center border border-digiqo-secondary/20 hover:border-digiqo-secondary/40 hover:scale-110 cursor-pointer group"
                        onClick={() => setSelectedVideo(client.videoUrl)}
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear"
                        }}
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
                    </div>
                  );
                })}
              </motion.div>

            </div>
          </div>
        </div>



      </div>
      </div>

      {/* Modal pour la vidéo */}
      <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)}>
        {selectedVideo && (
          <div className="p-6 md:p-8">
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
                    <video
                      title="Témoignage client"
                      width="100%"
                      height="100%"
                      src={selectedVideo}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>
                {/* Ombre sous le téléphone */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}