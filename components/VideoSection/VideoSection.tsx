import Link from 'next/link'
import { ScrollExpandMedia } from '../ScrollExpandMedia'

const VideoSection = () => {
  return (
    <ScrollExpandMedia
        mediaType='video'
        mediaSrc='https://youtu.be/I2itB7yvNk0'
        title='Soyez Visible'
        date='en Ligne 🚀'
        scrollToExpand='↓ Scrollez pour découvrir'
        textBlend={false}
      >
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-display font-bold mb-6 text-gray-900'>
            Votre Partenaire Digital à La Réunion
          </h2>
          <p className='text-lg mb-8 text-gray-700 leading-relaxed'>
            Digiqo est une agence de marketing digital qui vous accompagne dans votre transformation digitale. 
            Nous proposons des solutions innovantes et sur-mesure pour booster votre présence en ligne et 
            atteindre vos objectifs business.
          </p>
          <p className='text-lg mb-8 text-gray-700 leading-relaxed'>
            De la publicité en ligne au développement web, en passant par le community management, 
            nous mettons notre expertise au service de votre croissance. Découvrez dans cette vidéo 
            comment nous pouvons transformer votre vision en réalité digitale.
          </p>
          <div className='flex flex-wrap gap-4 justify-center mt-12'>
            <Link href='/#contact' className='px-8 py-3 bg-digiqo-orange text-white font-bold rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 inline-block'>
              Découvrir nos services
            </Link>
            <Link href='/#contact' className='px-8 py-3 bg-digiqo-blue-light text-white font-bold rounded-lg hover:bg-digiqo-blue-dark transition-all duration-300 transform hover:scale-105 inline-block'>
              Nous contacter
            </Link>
          </div>
        </div>
    </ScrollExpandMedia>
  )
}

export default VideoSection