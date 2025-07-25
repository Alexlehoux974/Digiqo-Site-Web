import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Bookmark, Send } from 'lucide-react'

interface Testimonial {
  id: string
  username: string
  content: string
  videoUrl?: string
  thumbnail?: string
  likes: number
  comments: number
  isVideo: boolean
  publishedAt: string
}

// Les témoignages basés sur le contenu du fichier
const testimonialData: Testimonial[] = [
  {
    id: '1',
    username: '@romy.malbroukou',
    content: 'Un grand merci à @romy.malbroukou pour son incroyable retour sur notre collaboration! 🚀',
    videoUrl: 'https://www.instagram.com/reel/DFeyxS4NYLH/',
    thumbnail: '/partenaires/TITTY-CLUB-1024x1024.webp',
    likes: 234,
    comments: 18,
    isVideo: true,
    publishedAt: 'Il y a 3 jours'
  },
  {
    id: '2',
    username: '@lcda_reunion',
    content: 'Un grand merci à @lcda_reunion pour leur incroyable témoignage! Votre succès est notre réussite! 💪',
    videoUrl: 'https://www.instagram.com/reel/DFxEB8Mt6fi/',
    thumbnail: '/partenaires/LCDA_LOGO_FD-BLANC_14CM-1024x877.webp',
    likes: 156,
    comments: 12,
    isVideo: true,
    publishedAt: 'Il y a 5 jours'
  },
  {
    id: '3',
    username: '@restaurantcoteseine974',
    content: 'Un grand merci à Pascal du @restaurantcoteseine974 pour ce magnifique retour d\'expérience! 🌟',
    videoUrl: 'https://www.instagram.com/reel/DG7de1nAOdS/',
    thumbnail: '/partenaires/COTE-SEINE-1024x1024.webp',
    likes: 198,
    comments: 23,
    isVideo: true,
    publishedAt: 'Il y a 1 semaine'
  },
  {
    id: '4',
    username: '@bastien_levy',
    content: 'Un grand merci à @bastien_levy pour son incroyable témoignage sur notre collaboration! 🎯',
    videoUrl: 'https://www.instagram.com/reel/DGU2cC0NZQQ/',
    thumbnail: '/partenaires/PIZZA-STELLA-1024x1024.webp',
    likes: 245,
    comments: 31,
    isVideo: true,
    publishedAt: 'Il y a 1 semaine'
  },
  {
    id: '5',
    username: '@velocit.ai',
    content: 'Un grand merci à @velocit.ai pour son super témoignage! L\'innovation au service de votre croissance! 🚀',
    videoUrl: 'https://www.instagram.com/reel/DHdC0b-NVVB/',
    thumbnail: '/partenaires/BEAUVALLON-1024x1024.webp',
    likes: 167,
    comments: 14,
    isVideo: true,
    publishedAt: 'Il y a 2 semaines'
  },
  {
    id: '6',
    username: '@twinsdesign.974',
    content: 'Un grand merci à @twinsdesign.974 pour leur incroyable retour! La créativité au rendez-vous! 🎨',
    videoUrl: 'https://www.instagram.com/reel/DHvBvqttjXu/',
    thumbnail: '/partenaires/TWINS-DESIGN2-1024x1024.webp',
    likes: 189,
    comments: 19,
    isVideo: true,
    publishedAt: 'Il y a 2 semaines'
  },
  {
    id: '7',
    username: '@pizzeriafano',
    content: 'Un grand merci à @pizzeriafano pour leur incroyable témoignage! Votre succès nous inspire! 🍕',
    videoUrl: 'https://www.instagram.com/reel/DIlNm8wNiqn/',
    thumbnail: '/partenaires/NENETTES-1024x1024.webp',
    likes: 212,
    comments: 28,
    isVideo: true,
    publishedAt: 'Il y a 3 semaines'
  }
]

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [animatedLikes, setAnimatedLikes] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Initialiser les likes animés
    const initialLikes: { [key: string]: number } = {}
    testimonialData.forEach(testimonial => {
      initialLikes[testimonial.id] = testimonial.likes
    })
    setAnimatedLikes(initialLikes)
  }, [])

  const handleLike = (id: string) => {
    const newLikedPosts = new Set(likedPosts)
    if (likedPosts.has(id)) {
      newLikedPosts.delete(id)
      setAnimatedLikes(prev => ({
        ...prev,
        [id]: prev[id] - 1
      }))
    } else {
      newLikedPosts.add(id)
      setAnimatedLikes(prev => ({
        ...prev,
        [id]: prev[id] + 1
      }))
    }
    setLikedPosts(newLikedPosts)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialData.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length)
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialData.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-digiqo-gray/30 overflow-hidden">
      {/* Effet de fond animé */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-digiqo-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-digiqo-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-digiqo-secondary/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-digiqo-primary">Rejoignez des dizaines d'entrepreneurs </span>
            <span className="bg-gradient-to-r from-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent">Réunionnais</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez leurs témoignages sur 
            <span className="bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#F77737] bg-clip-text text-transparent font-semibold ml-1">
              Instagram
            </span>
          </p>
        </motion.div>

        {/* Carousel de témoignages */}
        <div className="relative">
          <div className="flex justify-center items-center gap-8">
            {/* Bouton précédent */}
            <motion.button
              onClick={handlePrev}
              className="hidden md:flex w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:shadow-xl hover:shadow-digiqo-primary/20 border border-digiqo-primary/10 hover:border-digiqo-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Cartes de témoignages */}
            <div className="flex gap-6 overflow-hidden">
              <AnimatePresence>
                {testimonialData.slice(activeIndex, activeIndex + 3).concat(testimonialData.slice(0, Math.max(0, (activeIndex + 3) - testimonialData.length))).map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${activeIndex}-${index}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: index === 1 ? 1 : 0.7,
                      scale: index === 1 ? 1 : 0.9,
                      x: 0
                    }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className={`relative ${index === 1 ? 'z-20' : 'z-10'} ${index !== 1 ? 'hidden lg:block' : ''}`}
                  >
                    {/* Carte Instagram */}
                    <div className="w-80 bg-white rounded-2xl shadow-xl overflow-hidden border border-digiqo-primary/10 hover:border-digiqo-primary/20 transition-all duration-300">
                      {/* Header Instagram */}
                      <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-digiqo-primary to-digiqo-accent rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.username[1].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{testimonial.username}</p>
                            <p className="text-xs text-gray-500">La Réunion</p>
                          </div>
                        </div>
                        <button className="text-gray-700">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>

                      {/* Contenu vidéo/image */}
                      <div className="relative aspect-square bg-gradient-to-br from-digiqo-gray to-gray-200 overflow-hidden">
                        {/* Image de fond avec thumbnail */}
                        {testimonial.thumbnail && (
                          <img 
                            src={testimonial.thumbnail} 
                            alt={testimonial.username}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-br from-digiqo-primary/20 to-digiqo-accent/20" />
                        
                        {testimonial.isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="text-center">
                              <motion.div
                                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <svg className="w-10 h-10 text-digiqo-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </motion.div>
                              <p className="text-sm text-white font-medium drop-shadow-lg">Voir le témoignage vidéo</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions Instagram */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <motion.button
                              onClick={() => handleLike(testimonial.id)}
                              whileTap={{ scale: 0.8 }}
                              className="transition-colors"
                            >
                              <Heart 
                                className={`w-6 h-6 ${likedPosts.has(testimonial.id) ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                              />
                            </motion.button>
                            <button>
                              <MessageCircle className="w-6 h-6 text-gray-700" />
                            </button>
                            <button>
                              <Send className="w-6 h-6 text-gray-700" />
                            </button>
                          </div>
                          <button>
                            <Bookmark className="w-6 h-6 text-gray-700" />
                          </button>
                        </div>

                        {/* Likes et description */}
                        <div className="space-y-2">
                          <motion.p 
                            className="font-semibold text-sm"
                            key={animatedLikes[testimonial.id]}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.3 }}
                          >
                            {animatedLikes[testimonial.id]?.toLocaleString()} J'aime
                          </motion.p>
                          <p className="text-sm">
                            <span className="font-semibold">digiqo</span> {testimonial.content}
                          </p>
                          <p className="text-xs text-gray-500">Voir les {testimonial.comments} commentaires</p>
                          <p className="text-xs text-gray-400 uppercase">{testimonial.publishedAt}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bouton suivant */}
            <motion.button
              onClick={handleNext}
              className="hidden md:flex w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:shadow-xl hover:shadow-digiqo-primary/20 border border-digiqo-primary/10 hover:border-digiqo-primary/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-gradient-to-r from-digiqo-primary to-digiqo-accent' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://www.instagram.com/digiqo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-digiqo-primary via-[#C13584] to-digiqo-accent text-white font-semibold rounded-full hover:shadow-xl hover:shadow-digiqo-primary/20 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
            </svg>
            Suivre sur Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}