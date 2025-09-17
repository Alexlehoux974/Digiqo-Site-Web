import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SEO } from '@/components/SEO'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, getCategories } from '@/lib/blog-articles'

// Récupération des vrais articles
const blogArticles = getAllArticles()
const allCategories = ["Tous", ...getCategories()]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <SEO
        title="Blog Marketing Digital La Réunion | Digiqo"
        description="Conseils, actualités et stratégies de marketing digital pour développer votre entreprise à La Réunion."
        keywords="blog marketing, digital la réunion, stratégies marketing, google ads, seo, community management"
        url="https://digiqo.fr/blog"
      />

      <HeaderLuxury />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-digiqo-primary via-digiqo-primary/90 to-digiqo-secondary py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-digiqo-accent/20 rounded-full blur-3xl top-0 right-0" />
            <div className="absolute w-96 h-96 bg-digiqo-secondary/20 rounded-full blur-3xl bottom-0 left-0" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Blog
                <span className="block text-3xl md:text-5xl text-digiqo-accent mt-2">
                  Marketing Digital
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Conseils pratiques, actualités et stratégies pour développer votre présence digitale à La Réunion
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-digiqo-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-digiqo-primary text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Articles Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 bg-digiqo-accent text-white text-xs font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-digiqo-primary mb-3 group-hover:text-digiqo-accent transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-digiqo-primary font-semibold hover:text-digiqo-accent transition-colors">
                      Lire l'article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Aucun article trouvé pour cette recherche.</p>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}