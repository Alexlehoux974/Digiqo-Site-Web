import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Search, BookOpen, Code, Palette, Megaphone, Users, Clock, Award, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formations, getFormationsByCategory, searchFormations } from '@/lib/digicademy-formations'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'

// Catégories disponibles
const categories = [
  { id: 'all', name: 'Toutes', icon: BookOpen, color: 'bg-gradient-to-r from-[#8B1431] to-[#DA6530]' },
  { id: 'publicite', name: 'Publicité en ligne', icon: Megaphone, color: 'bg-gradient-to-r from-[#DA6530] to-[#8B1431]', count: 1 },
  { id: 'sites-web', name: 'Sites Web', icon: Code, color: 'bg-gradient-to-r from-[#199CB7] to-[#DA6530]', count: 0 },
  { id: 'community', name: 'Community Management', icon: Users, color: 'bg-gradient-to-r from-[#8B1431] to-[#199CB7]', count: 0 },
  { id: 'identite', name: 'Identité de Marque', icon: Palette, color: 'bg-gradient-to-r from-[#DA6530] to-[#199CB7]', count: 0 },
]

export default function Digicademy() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Filtrage intelligent des formations
  const filteredFormations = useMemo(() => {
    let results = selectedCategory === 'all'
      ? formations
      : getFormationsByCategory(selectedCategory)

    if (searchQuery) {
      results = searchFormations(searchQuery).filter(f =>
        selectedCategory === 'all' || f.category === selectedCategory
      )
    }

    return results
  }, [searchQuery, selectedCategory])

  return (
    <>
      <Head>
        <title>Digicademy - Centre de Formation Digital | Digiqo</title>
        <meta name="description" content="Développez vos compétences digitales avec Digicademy. Formations en développement web, marketing digital, design et plus encore à La Réunion." />
        <meta property="og:title" content="Digicademy - Centre de Formation Digital | Digiqo" />
        <meta property="og:description" content="Développez vos compétences digitales avec Digicademy. Formations professionnelles à La Réunion." />
      </Head>

      <HeaderLuxury />

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section avec effet premium */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#8B1431] via-[#DA6530] to-[#199CB7] pt-32 pb-20 lg:pt-40 lg:pb-32">
          {/* Effet de particules en arrière-plan */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20" />
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Digicademy
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                Centre de Formation Digital de La Réunion
              </p>
            </motion.div>

            {/* Barre de recherche premium */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl" />
                <div className="relative flex items-center">
                  <Search className={`absolute left-6 w-6 h-6 transition-colors duration-300 ${isSearchFocused ? 'text-[#8B1431]' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Que voulez-vous apprendre aujourd'hui ?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-16 pr-6 py-6 bg-white/90 backdrop-blur-sm rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                  />
                </div>

                {/* Effet de glow quand focus */}
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: '0 0 60px rgba(218, 101, 48, 0.4)',
                    }}
                  />
                )}
              </div>

              {/* Suggestions de recherche */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-2">Suggestions populaires</p>
                      <div className="space-y-2">
                        {['React', 'SEO Local', 'Instagram Ads', 'WordPress'].map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => setSearchQuery(suggestion)}
                            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Section des catégories */}
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => {
                const Icon = category.icon
                const isSelected = selectedCategory === category.id

                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
                      relative px-5 py-3 rounded-xl font-medium transition-all duration-300
                      ${isSelected
                        ? 'text-white shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className={`absolute inset-0 rounded-xl ${category.color}`} />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      {category.name}
                      {category.count !== undefined && category.id !== 'all' && (
                        <span className="text-xs opacity-80">({category.count})</span>
                      )}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Section des formations */}
        <div className="container mx-auto px-4 py-16">
          {filteredFormations.length === 0 && searchQuery === '' && selectedCategory === 'all' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <BookOpen className="w-20 h-20 mx-auto mb-6 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Plus de formations arrivent bientôt !
                </h2>
                <p className="text-gray-600 mb-8">
                  Nous avons déjà une formation disponible et préparons activement de nouveaux programmes.
                  Restez connecté pour découvrir nos prochaines formations digitales.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B1431] to-[#DA6530] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Me tenir informé
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ) : filteredFormations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Aucune formation trouvée
                </h2>
                <p className="text-gray-600">
                  Essayez de modifier votre recherche ou de changer de catégorie.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormations.map((formation, index) => {
                const categoryColor = formation.category === 'publicite'
                  ? 'from-[#DA6530] to-[#8B1431]'
                  : formation.category === 'sites-web'
                  ? 'from-[#199CB7] to-[#DA6530]'
                  : formation.category === 'community'
                  ? 'from-[#8B1431] to-[#199CB7]'
                  : 'from-[#DA6530] to-[#199CB7]'

                return (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.5) }}
                    className="group"
                  >
                    <Link href={`/digicademy/formations/${formation.slug}`}>
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer">
                        {/* Category bar */}
                        <div className={`h-2 bg-gradient-to-r ${categoryColor}`} />

                        <div className="p-6 flex-1 flex flex-col">
                          {/* Level badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                              {formation.level}
                            </span>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{formation.duration}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8B1431] transition-colors">
                            {formation.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                            {formation.description}
                          </p>

                          {/* Modules count */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500">
                              <BookOpen className="w-4 h-4" />
                              <span className="text-sm">{formation.modules.length} modules</span>
                            </div>

                            {/* CTA */}
                            <div className="flex items-center gap-1 text-[#DA6530] font-medium group-hover:gap-2 transition-all">
                              <span className="text-sm">Découvrir</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Certification badge */}
                          {formation.certification && (
                            <div className="mt-3 flex items-center gap-1">
                              <Award className="w-4 h-4 text-[#199CB7]" />
                              <span className="text-xs text-gray-600">Certification incluse</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}