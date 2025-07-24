import React from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useAnimationFrame,
} from "framer-motion"

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
    useTransform(scrollYProgress, [0, 0.2], [-700, -100]),
    springConfig
  )
  return (
    <div
      ref={ref}
      className="h-[100vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] z-50 bg-white"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative"
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
      {/* Espace blanc sous les partenaires qui sera recouvert par le gradient rouge */}
      <div className="h-64 bg-white" />
    </div>
  )
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-12 md:py-24 px-4 w-full  left-0 top-0">
      <h1 className="text-4xl md:text-7xl font-bold text-gray-900">
        <span className="bg-gradient-to-r from-digiqo-orange to-digiqo-blue-light bg-clip-text text-transparent">
          Votre Publicité en Ligne
        </span>
        <br />
        <span className="text-digiqo-blue-dark">AGENCE MARKETING</span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-gray-700">
        Vos Campagnes de Publicité en Ligne Créées, Gérées & Optimisées. 
        Fondée en 2020, Digiqo est une agence dynamique spécialisée dans les stratégies digitales innovantes.
      </p>
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
        <div className="h-full w-full bg-gradient-to-br from-digiqo-blue-light/20 to-digiqo-orange/20 rounded-xl flex items-center justify-center p-6">
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