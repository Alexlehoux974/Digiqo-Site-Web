import React from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useAnimationFrame,
} from "framer-motion"
import Link from 'next/link'

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string
    link: string
    thumbnail: any
  }[]
}) => {
  const firstRow = products.slice(0, 20)
  const secondRow = products.slice(20, 40)
  const thirdRow = products.slice(40, 60)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  // Auto-scroll values
  const [autoScrollX, setAutoScrollX] = React.useState(0)
  const [autoScrollXReverse, setAutoScrollXReverse] = React.useState(0)

  // Auto-scroll animation with infinite loop
  useAnimationFrame(() => {
    const speed = 0.5
    const rowWidth = 12 * 20 + 8 * 19 // card width * items + gap * (items-1) in rem converted to px
    
    setAutoScrollX((prev) => {
      const newVal = prev + speed
      // Reset when scrolled one full set
      if (newVal > rowWidth * 5) return 0
      return newVal
    })
    
    setAutoScrollXReverse((prev) => {
      const newVal = prev - speed
      // Reset when scrolled one full set
      if (newVal < -rowWidth * 5) return 0
      return newVal
    })
  })

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 50]),
    springConfig
  )
  return (
    <div
      ref={ref}
      className="h-auto py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] z-10"
      style={{ position: 'relative' }}
    >
      {/* Background gradient avec les vraies couleurs Digiqo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#8B1431]" />
      </div>
      
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative pb-16 mt-16"
      >
        <motion.div 
          className="flex flex-row-reverse space-x-reverse space-x-8 mb-8"
          style={{ x: autoScrollX }}
        >
          {[...firstRow, ...firstRow, ...firstRow].map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`first-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div 
          className="flex flex-row mb-8 space-x-8"
          style={{ x: autoScrollXReverse }}
        >
          {[...secondRow, ...secondRow, ...secondRow].map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`second-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div 
          className="flex flex-row-reverse space-x-reverse space-x-8"
          style={{ x: autoScrollX }}
        >
          {[...thirdRow, ...thirdRow, ...thirdRow].map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`third-${idx}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-12 md:py-24 px-4 w-full  left-0 top-0">
      <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
        <span className="text-white font-semibold">🏝️ N°1 à La Réunion</span>
        <span className="text-white/60">•</span>
        <span className="text-white/90">+127 entreprises accompagnées</span>
      </div>
      <h1 className="text-4xl md:text-7xl font-bold">
        <span className="text-white drop-shadow-lg">
          L'Agence Marketing Digital
        </span>
        <br />
        <span className="text-white/95 drop-shadow-lg">Qui Booste Vos Ventes</span>
      </h1>
      <p className="max-w-2xl text-lg md:text-2xl mt-6 text-white/90 font-medium drop-shadow">
        Transformez vos visiteurs en clients avec des campagnes publicitaires 
        <span className="text-white font-bold"> Facebook, Instagram et Google Ads</span> qui cartonnent.
      </p>
      <div className="flex flex-wrap gap-4 mt-8 items-center">
        <Link href="/devis-gratuit">
          <span className="px-8 py-4 bg-white text-digiqo-orange font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg shadow-lg inline-block cursor-pointer">
            Je veux booster mes ventes →
          </span>
        </Link>
        <a href="#resultats" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-digiqo-orange transition-all duration-300">
          Voir nos réussites clients
        </a>
      </div>
      <div className="flex flex-wrap gap-6 mt-12 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/80">ROI moyen <span className="font-bold text-white">+300%</span></span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span className="text-white/80">4.8/5 sur Google</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/80">🎁 <span className="font-bold text-white">Audit gratuit</span> (valeur 500€)</span>
        </div>
      </div>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string
    link: string
    thumbnail: any
  }
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-36 w-[12rem] relative flex-shrink-0"
    >
      <div
        className="block group-hover/product:shadow-2xl h-full"
      >
        <div className="h-full w-full bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center p-6 shadow-lg">
          <div className="w-full h-full max-w-[100px] max-h-[100px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain">
            {product.thumbnail}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-xl"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-lg">
        {product.title}
      </h2>
    </motion.div>
  )
}