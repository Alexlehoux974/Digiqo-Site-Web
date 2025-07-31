import Link from 'next/link'

const VideoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#8B1431] to-[#6B0F25]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Texte à gauche */}
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/>
                </svg>
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wide">YouTube</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Digiqo est aussi sur YouTube
              </h3>
              <p className="text-white/80 mb-6">
                Apprenez-en plus sur notre expertise à travers nos vidéos. 
                Découvrez nos conseils, nos études de cas et les coulisses 
                de nos stratégies digitales qui font la différence.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://youtu.be/I2itB7yvNk0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/>
                  </svg>
                  Regarder sur YouTube
                </a>
                <Link 
                  href="#services" 
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
                >
                  Découvrir nos services
                </Link>
              </div>
            </div>
            
            {/* Vidéo à droite */}
            <div className="order-1 md:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/I2itB7yvNk0"
                    title="Digiqo - Votre Partenaire Digital à La Réunion"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Texte sous la vidéo */}
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Votre Partenaire Digital à La Réunion
          </h3>
          <p className="text-white/90 text-lg leading-relaxed mb-6">
            Digiqo est une agence de marketing digital qui vous accompagne dans votre transformation digitale. 
            Nous proposons des solutions innovantes et sur-mesure pour booster votre présence en ligne et 
            atteindre vos objectifs business.
          </p>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            De la publicité en ligne au développement web, en passant par le community management, nous 
            mettons notre expertise au service de votre croissance. Notre équipe est composée d'<span className="text-digiqo-accent font-semibold">experts 
            certifiés META et GOOGLE</span>, ce qui nous permet de vous garantir les meilleures pratiques et les résultats 
            les plus performants du marché. Découvrez dans cette vidéo comment nous pouvons transformer votre vision 
            en réalité digitale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/services"
              className="inline-flex items-center gap-2 bg-digiqo-accent hover:bg-digiqo-accent/90 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Découvrir nos services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection