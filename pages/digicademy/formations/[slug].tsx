import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronDown, ChevronUp, Clock, Award, BookOpen, Target, CheckCircle2, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DigicademyYouTubePlayer from '@/components/DigicademyYouTubePlayer'
import { getFormationBySlug, formations, type Formation } from '@/lib/formations'
import { QuizModal } from '@/components/QuizModal'
import { getRandomQuestions, type QuizQuestion } from '@/lib/quiz-questions'

interface FormationPageProps {
  formation: Formation
}

export default function FormationPage({ formation }: FormationPageProps) {
  const [openModules, setOpenModules] = useState<string[]>([])
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])

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
                    {openModules.includes(module.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
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
                        <div className="px-8 pb-10 border-t border-gray-100">
                          <div className={`pt-10 ${module.video ? 'grid lg:grid-cols-2 gap-12' : 'max-w-5xl mx-auto'}`}>
                            {/* Text content */}
                            <div>
                              <div className="space-y-6">
                                {module.content.map((paragraph, pIndex) => {
                                  // Empty paragraphs for spacing
                                  if (paragraph === '') {
                                    return <div key={pIndex} className="h-4" />
                                  }

                                  // Check for H3 markdown titles (### Title)
                                  if (paragraph.startsWith('###')) {
                                    // Split on actual newlines (not literal \n strings)
                                    const lines = paragraph.split(/\n\n|\n/);
                                    const h3Title = lines[0].replace(/^###\s+/, '');
                                    const restContent = lines.slice(1).filter(l => l.trim()).join(' ');

                                    return (
                                      <div key={pIndex} className="mt-8 mb-4 first:mt-0">
                                        <h3 className="text-2xl font-bold text-[#8B1431] mb-6 flex items-start gap-3">
                                          <div className="w-2 h-8 bg-gradient-to-b from-[#DA6530] to-[#199CB7] rounded-full mt-1 flex-shrink-0"></div>
                                          <span>{h3Title}</span>
                                        </h3>
                                        {restContent && (
                                          <p className="text-gray-700 leading-relaxed text-[15px] ml-8">
                                            {restContent.split('**').map((part, i) =>
                                              i % 2 === 0 ? part : <strong key={i} className="font-semibold text-gray-900">{part}</strong>
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  }

                                  // Check for bold markdown headers with bullet lists (**Header:** followed by list items)
                                  // Render as compact list (small bullets, tight spacing) to balance content
                                  if (paragraph.startsWith('**') && paragraph.includes(':') && paragraph.includes('- ')) {
                                    // Match **Header :** - the space and colon are INSIDE the ** markers
                                    const headerMatch = paragraph.match(/^\*\*(.+?)\s*:\s*\*\*/);
                                    if (headerMatch) {
                                      const header = headerMatch[1].trim();
                                      // Split on actual newlines
                                      const listItems = paragraph.split(/\n\n|\n/).filter(line => line.trim().startsWith('-'));

                                      return (
                                        <div key={pIndex} className="my-3">
                                          <p className="text-gray-900 font-semibold text-[15px] mb-1.5">{header} :</p>
                                          <ul className="space-y-1 ml-4">
                                            {listItems.map((item, i) => (
                                              <li key={i} className="flex items-start gap-2 text-[14px]">
                                                <span className="text-[#DA6530] mt-0.5 text-xs flex-shrink-0">▪</span>
                                                <span className="text-gray-700 leading-snug">
                                                  {item.substring(2).split('**').map((part, j) =>
                                                    j % 2 === 0 ? part : <strong key={j} className="font-semibold text-gray-900">{part}</strong>
                                                  )}
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      );
                                    }
                                  }

                                  // Check different content patterns
                                  const isSectionTitleEnd = paragraph.match(/^[A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+\s?:$/); // Titre se terminant par ":"
                                  const isListItem = paragraph.match(/^-\s/); // Liste avec tiret
                                  const isNumberedItem = paragraph.match(/^\d+\.\s/); // Liste numérotée "1. "
                                  const isFormula = (paragraph.includes('=') || paragraph.includes('×')) && paragraph.length < 100;
                                  const isHighlight = paragraph.match(/^(Attentes réalistes|La réussite|Règle des)/);

                                  // Nouveaux patterns pour modules 4-10
                                  const isTitleWithNumber = paragraph.match(/^(\d+)\s([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?:$/); // "3 Types de Ciblage :"
                                  const isLetterList = paragraph.match(/^([A-Z])\s-\s([^:]+)\s?:\s(.+)$/); // "A - Attention : Question directe..."

                                  // Numbered section titles WITH parenthetical qualifier but NO description: "1. Ciblage Démographique (Base) :"
                                  const isNumberedSectionTitle = paragraph.match(/^(\d+)\.\s([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?\(([^)]+)\)\s?:$/);

                                  // Numbered items with descriptions "1. Ciblage Démographique (Base) : ..."
                                  const isNumberedItemWithDesc = paragraph.match(/^(\d+)\.\s([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?\(([^)]+)\)\s?:\s(.+)$/); // "1. Ciblage Démographique (Base) : ..."

                                  // Section titles WITH parenthetical qualifier but NO number: "Audiences Personnalisées (Custom) :"
                                  const isTitleWithParens = paragraph.match(/^([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?\(([^)]+)\)\s?:$/);

                                  const isPhaseDesc = paragraph.match(/^(Phase\s[\wÀ-ÿ\s()J\-0-9]+)\s?:\s(.+)$/); // "Phase Lancement (J1-7) : Ne rien changer"

                                  // Format titles (Image Simple, Vidéo, Carrousel, Stories et Reels)
                                  const isFormatTitle = paragraph.match(/^(Image Simple|Carrousel|Vidéo|Stories et Reels)\s?:\s(.+)$/);

                                  // Section title with short description (< 50 chars after ":")
                                  // Examples: "Portée et Visibilité : ...", other short descriptions
                                  const titleWithShortDesc = paragraph.match(/^([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?:\s(.+)$/);
                                  const isSectionTitleWithDesc = titleWithShortDesc && !isListItem && !isFormatTitle && titleWithShortDesc[2].length < 50;

                                  // Phase descriptions "Phase Lancement (J1-7) : Ne rien changer"
                                  if (isPhaseDesc) {
                                    const [, phase, description] = isPhaseDesc;
                                    return (
                                      <div key={pIndex} className="mt-6 mb-4 bg-gradient-to-r from-[#199CB7]/10 to-transparent border-l-4 border-[#199CB7] px-6 py-3 rounded-r-lg">
                                        <div className="flex items-start gap-3">
                                          <span className="text-[#199CB7] font-bold text-base">{phase} :</span>
                                          <p className="text-gray-800 leading-relaxed text-[15px]">{description}</p>
                                        </div>
                                      </div>
                                    );
                                  }

                                  // Letter-based lists "A - Attention : Question directe..."
                                  if (isLetterList) {
                                    const [, letter, concept, description] = isLetterList;
                                    return (
                                      <div key={pIndex} className="flex items-start gap-3 ml-2 my-3">
                                        <span className="text-[#DA6530] font-bold text-base flex-shrink-0 w-8">{letter} -</span>
                                        <div>
                                          <span className="text-gray-900 font-semibold">{concept} :</span>
                                          <span className="text-gray-700 ml-1">{description}</span>
                                        </div>
                                      </div>
                                    );
                                  }

                                  // Numbered section titles with parenthetical qualifier "1. Ciblage Démographique (Base) :"
                                  if (isNumberedSectionTitle) {
                                    const [, number, title, category] = isNumberedSectionTitle;
                                    return (
                                      <h4 key={pIndex} className="text-lg font-bold text-[#8B1431] mt-8 mb-4 first:mt-0 flex items-start gap-3">
                                        <div className="w-1.5 h-6 bg-gradient-to-b from-[#DA6530] to-[#199CB7] rounded-full mt-0.5 flex-shrink-0"></div>
                                        <span>{number}. {title} <span className="text-gray-600 font-normal">({category})</span> :</span>
                                      </h4>
                                    );
                                  }

                                  // Section titles with parenthetical qualifier "Audiences Personnalisées (Custom) :"
                                  if (isTitleWithParens) {
                                    const [, title, category] = isTitleWithParens;
                                    return (
                                      <h4 key={pIndex} className="text-lg font-bold text-[#8B1431] mt-8 mb-4 first:mt-0 flex items-start gap-3">
                                        <div className="w-1.5 h-6 bg-gradient-to-b from-[#DA6530] to-[#199CB7] rounded-full mt-0.5 flex-shrink-0"></div>
                                        <span>{title} <span className="text-gray-600 font-normal">({category})</span> :</span>
                                      </h4>
                                    );
                                  }

                                  // Numbered items with descriptions "1. Ciblage Démographique (Base) : ..."
                                  if (isNumberedItemWithDesc) {
                                    const [, number, title, category, description] = isNumberedItemWithDesc;
                                    return (
                                      <div key={pIndex} className="mt-6 mb-4 first:mt-0">
                                        <div className="flex items-start gap-3 ml-2">
                                          <span className="text-[#DA6530] font-bold text-base flex-shrink-0 w-6">{number}.</span>
                                          <div>
                                            <h5 className="text-gray-900 font-bold text-base">
                                              {title} <span className="text-gray-600 font-normal">({category})</span> :
                                            </h5>
                                            <p className="text-gray-700 leading-relaxed text-[15px] mt-1">{description}</p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }

                                  // Title with number "3 Types de Ciblage :"
                                  if (isTitleWithNumber) {
                                    const [, number, title] = isTitleWithNumber;
                                    return (
                                      <h4 key={pIndex} className="text-lg font-bold text-[#8B1431] mt-8 mb-4 first:mt-0 flex items-start gap-3">
                                        <div className="w-1.5 h-6 bg-gradient-to-b from-[#DA6530] to-[#199CB7] rounded-full mt-0.5 flex-shrink-0"></div>
                                        <span>{number} {title} :</span>
                                      </h4>
                                    );
                                  }

                                  // Format titles "Image Simple : ...", "Vidéo : ...", etc.
                                  if (isFormatTitle) {
                                    const [, formatName, description] = isFormatTitle;
                                    return (
                                      <div key={pIndex} className="mt-8 mb-4 first:mt-0">
                                        <h4 className="text-lg font-bold text-[#8B1431] mb-2 flex items-start gap-3">
                                          <div className="w-1.5 h-6 bg-gradient-to-b from-[#DA6530] to-[#199CB7] rounded-full mt-0.5 flex-shrink-0"></div>
                                          <span>{formatName} :</span>
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed text-[15px] ml-6 font-medium">{description}</p>
                                      </div>
                                    );
                                  }

                                  // Section titles with description "Titre : Description"
                                  if (isSectionTitleWithDesc) {
                                    const [, title, description] = titleWithShortDesc!;
                                    return (
                                      <div key={pIndex} className="mt-8 mb-4 first:mt-0">
                                        <h4 className="text-lg font-bold text-[#8B1431] mb-2 flex items-start gap-3">
                                          <div className="w-1.5 h-6 bg-gradient-to-b from-[#DA6530] to-[#199CB7] rounded-full mt-0.5 flex-shrink-0"></div>
                                          <span>{title} :</span>
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed text-[15px] ml-6">{description}</p>
                                      </div>
                                    );
                                  }

                                  // Section titles ending with ":" only
                                  if (isSectionTitleEnd) {
                                    return (
                                      <h4 key={pIndex} className="text-lg font-bold text-[#8B1431] mt-8 mb-4 first:mt-0 flex items-start gap-3">
                                        <div className="w-1.5 h-6 bg-gradient-to-b from-[#DA6530] to-[#199CB7] rounded-full mt-0.5 flex-shrink-0"></div>
                                        <span>{paragraph}</span>
                                      </h4>
                                    );
                                  }

                                  // Numbered items "1. ", "2. ", etc.
                                  if (isNumberedItem) {
                                    const parts = paragraph.match(/^(\d+)\.\s(.+)$/);
                                    if (parts) {
                                      return (
                                        <div key={pIndex} className="flex items-start gap-3 ml-2">
                                          <span className="text-[#DA6530] font-bold text-base flex-shrink-0 w-6">{parts[1]}.</span>
                                          <p className="text-gray-700 leading-relaxed text-[15px]">{parts[2]}</p>
                                        </div>
                                      );
                                    }
                                  }

                                  // List items with dashes "- "
                                  if (isListItem) {
                                    return (
                                      <div key={pIndex} className="flex items-start gap-3 ml-6">
                                        <span className="text-[#DA6530] mt-1 font-bold flex-shrink-0">•</span>
                                        <p className="text-gray-700 leading-relaxed text-[15px]">{paragraph.substring(2)}</p>
                                      </div>
                                    );
                                  }

                                  // Formulas and calculations
                                  if (isFormula) {
                                    return (
                                      <div key={pIndex} className="bg-gradient-to-r from-[#199CB7]/10 to-[#DA6530]/10 border-l-4 border-[#199CB7] px-6 py-4 rounded-r-lg my-4">
                                        <p className="text-gray-900 font-semibold text-base font-mono">{paragraph}</p>
                                      </div>
                                    );
                                  }

                                  // Highlighted important paragraphs
                                  if (isHighlight) {
                                    return (
                                      <div key={pIndex} className="bg-gradient-to-r from-[#8B1431]/5 to-[#DA6530]/5 border-l-4 border-[#8B1431] px-6 py-4 rounded-r-lg my-4">
                                        <p className="text-gray-900 font-medium text-base leading-relaxed">{paragraph}</p>
                                      </div>
                                    );
                                  }

                                  // Regular paragraphs - parse inline bold markdown
                                  return (
                                    <p key={pIndex} className="text-gray-700 leading-relaxed text-[15px]">
                                      {paragraph.split('**').map((part, i) =>
                                        i % 2 === 0 ? part : <strong key={i} className="font-semibold text-gray-900">{part}</strong>
                                      )}
                                    </p>
                                  );
                                })}
                              </div>

                              {module.keyPoints && module.keyPoints.length > 0 && (
                                <div className="mt-10 bg-gradient-to-br from-[#8B1431]/8 via-[#DA6530]/8 to-[#199CB7]/8 rounded-2xl p-8 border-2 border-[#DA6530]/20 shadow-lg">
                                  <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B1431] to-[#DA6530] flex items-center justify-center">
                                      <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900">
                                      Points clés à retenir
                                    </h4>
                                  </div>
                                  <ul className="space-y-4">
                                    {module.keyPoints.map((point, kIndex) => (
                                      <li key={kIndex} className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#DA6530] to-[#199CB7] flex items-center justify-center flex-shrink-0 mt-0.5">
                                          <span className="text-white text-xs font-bold">{kIndex + 1}</span>
                                        </div>
                                        <span className="text-gray-900 font-medium text-base leading-relaxed group-hover:text-[#8B1431] transition-colors">
                                          {point}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {/* Video player - only if video exists */}
                            {module.video && (
                              <div>
                                <DigicademyYouTubePlayer
                                  videoId={module.video?.youtubeId}
                                  googleDriveId={module.video?.googleDriveId}
                                  placeholder={module.video?.placeholder}
                                  className="sticky top-24"
                                />
                              </div>
                            )}
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

          {/* Quiz Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => {
                const questions = getRandomQuestions(formation.slug)
                setQuizQuestions(questions)
                setIsQuizModalOpen(true)
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Trophy className="w-6 h-6" />
              Tester mes connaissances
            </button>
          </motion.div>
        </div>
      </main>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        questions={quizQuestions}
        formationTitle={formation.title}
      />
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