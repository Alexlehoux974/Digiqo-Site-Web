import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronDown, ChevronUp, Clock, Award, BookOpen, Target, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DigicademyYouTubePlayer from '@/components/DigicademyYouTubePlayer'
import { getFormationBySlug, formations, type Formation } from '@/lib/digicademy-formations'

interface FormationPageProps {
  formation: Formation
}

export default function FormationPage({ formation }: FormationPageProps) {
  const [openModules, setOpenModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  // Get category color based on formation category
  const getCategoryColor = () => {
    switch (formation.category) {
      case 'publicite':
        return 'from-[#DA6530] to-[#8B1431]'
      case 'sites-web':
        return 'from-[#199CB7] to-[#DA6530]'
      case 'community':
        return 'from-[#8B1431] to-[#199CB7]'
      case 'identite':
        return 'from-[#DA6530] to-[#199CB7]'
      default:
        return 'from-[#8B1431] to-[#DA6530]'
    }
  }

  return (
    <>
      <Head>
        <title>{formation.title} - Digicademy | Digiqo</title>
        <meta name="description" content={formation.description} />
        <meta property="og:title" content={`${formation.title} - Digicademy | Digiqo`} />
        <meta property="og:description" content={formation.description} />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${getCategoryColor()} py-16 lg:py-24`}>
          <div className="absolute inset-0 bg-black/20" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Back button */}
            <Link
              href="/digicademy"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
            >
              <ChevronLeft className="w-5 h-5" />
              Retour aux formations
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                {formation.title}
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl">
                {formation.description}
              </p>

              {/* Formation meta */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="flex items-center gap-2 text-white/90">
                  <Clock className="w-5 h-5" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Award className="w-5 h-5" />
                  <span>Niveau {formation.level}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <BookOpen className="w-5 h-5" />
                  <span>{formation.modules.length} modules</span>
                </div>
                {formation.certification && (
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Certification incluse</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Introduction Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              {formation.introduction.title}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 mb-8">
              {formation.introduction.content.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {formation.introduction.objectives && (
              <div className="bg-gradient-to-r from-[#8B1431]/5 to-[#DA6530]/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-[#DA6530]" />
                  <h3 className="text-xl font-semibold text-gray-900">Objectifs de la formation</h3>
                </div>
                <ul className="space-y-2">
                  {formation.introduction.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#199CB7] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.section>

          {/* Modules Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Contenu de la formation
            </h2>

            <div className="space-y-4">
              {formation.modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B1431] to-[#DA6530] flex items-center justify-center text-white font-semibold">
                        {index + 1}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                        {module.description && (
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {module.video && (
                        <span className="text-sm text-gray-500 hidden sm:inline">
                          {module.video.duration || 'Vidéo'}
                        </span>
                      )}
                      {openModules.includes(module.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Module content */}
                  <AnimatePresence>
                    {openModules.includes(module.id) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="grid lg:grid-cols-2 gap-8 pt-6">
                            {/* Text content */}
                            <div>
                              <div className="prose prose-gray max-w-none">
                                {module.content.map((paragraph, pIndex) => (
                                  <p key={pIndex} className="mb-4 text-gray-600 leading-relaxed">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>

                              {module.keyPoints && module.keyPoints.length > 0 && (
                                <div className="mt-6 bg-gray-50 rounded-lg p-5">
                                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-[#199CB7]" />
                                    Points clés à retenir
                                  </h4>
                                  <ul className="space-y-2">
                                    {module.keyPoints.map((point, kIndex) => (
                                      <li key={kIndex} className="flex items-start gap-2">
                                        <span className="text-[#DA6530] mt-1">•</span>
                                        <span className="text-gray-700 text-sm">{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {/* Video player */}
                            <div>
                              <DigicademyYouTubePlayer
                                videoId={module.video?.youtubeId}
                                placeholder={module.video?.placeholder}
                                className="sticky top-24"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Conclusion Section */}
          {formation.conclusion && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-[#8B1431] to-[#DA6530] rounded-2xl p-8 mt-12 text-white"
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                {formation.conclusion.title}
              </h2>
              <div className="space-y-4">
                {formation.conclusion.content.map((paragraph, index) => (
                  <p key={index} className="text-white/90 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {formation.nextSteps && formation.nextSteps.length > 0 && (
                <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Prochaines étapes</h3>
                  <ul className="space-y-2">
                    {formation.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.section>
          )}
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = formations.map(formation => ({
    params: { slug: formation.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<FormationPageProps> = async ({ params }) => {
  const formation = getFormationBySlug(params?.slug as string)

  if (!formation) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      formation
    }
  }
}