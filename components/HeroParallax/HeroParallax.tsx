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
import { generateContactUrl } from '@/lib/contact-utils'

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
        className="relative pb-16 mt-16 z-0"
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
    <div className="max-w-7xl relative mx-auto py-12 md:py-24 px-4 w-full left-0 top-0 z-20">
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
      <div className="flex flex-wrap gap-4 mt-8 items-center relative z-30">
        <Link href={generateContactUrl({
          description: 'Je veux booster mes ventes avec des campagnes publicitaires'
        })}>
          <span className="px-8 py-4 bg-white text-digiqo-orange font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg shadow-lg inline-block cursor-pointer">
            Je veux booster mes ventes →
          </span>
        </Link>
        <a href="#case-studies" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-digiqo-orange transition-all duration-300 inline-block">
          Voir nos réussites clients
        </a>
      </div>
      <div className="flex flex-wrap gap-6 mt-12 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/80">🔵 Experts Certifiés <span className="font-bold text-white">Meta</span></span>
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
      {/* Logo Meta */}
      <div className="mt-8 flex items-center gap-4 group">
        <span className="text-white/80 text-sm font-medium">Experts certifiés</span>
        <div className="bg-white rounded-xl px-5 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
          <svg className="h-10 w-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Meta</title>
            <path d="M6.897 4h-.024l-.031 2.615h.022c1.715 0 3.046 1.357 5.94 6.246l.175.297.012.02 1.62-2.438-.012-.019a48.763 48.763 0 00-1.098-1.716 28.01 28.01 0 00-1.175-1.629C10.413 4.932 8.812 4 6.896 4z" fill="url(#lobe-icons-meta-fill-0)"/>
            <path d="M6.873 4C4.95 4.01 3.247 5.258 2.02 7.17a4.352 4.352 0 00-.01.017l2.254 1.231.011-.017c.718-1.083 1.61-1.774 2.568-1.785h.021L6.896 4h-.023z" fill="url(#lobe-icons-meta-fill-1)"/>
            <path d="M2.019 7.17l-.011.017C1.2 8.447.598 9.995.274 11.664l-.005.022 2.534.6.004-.022c.27-1.467.786-2.828 1.456-3.845l.011-.017L2.02 7.17z" fill="url(#lobe-icons-meta-fill-2)"/>
            <path d="M2.807 12.264l-2.533-.6-.005.022c-.177.918-.267 1.851-.269 2.786v.023l2.598.233v-.023a12.591 12.591 0 01.21-2.44z" fill="url(#lobe-icons-meta-fill-3)"/>
            <path d="M2.677 15.537a5.462 5.462 0 01-.079-.813v-.022L0 14.468v.024a8.89 8.89 0 00.146 1.652l2.535-.585a4.106 4.106 0 01-.004-.022z" fill="url(#lobe-icons-meta-fill-4)"/>
            <path d="M3.27 16.89c-.284-.31-.484-.756-.589-1.328l-.004-.021-2.535.585.004.021c.192 1.01.568 1.85 1.106 2.487l.014.017 2.018-1.745a2.106 2.106 0 01-.015-.016z" fill="url(#lobe-icons-meta-fill-5)"/>
            <path d="M10.78 9.654c-1.528 2.35-2.454 3.825-2.454 3.825-2.035 3.2-2.739 3.917-3.871 3.917a1.545 1.545 0 01-1.186-.508l-2.017 1.744.014.017C2.01 19.518 3.058 20 4.356 20c1.963 0 3.374-.928 5.884-5.33l1.766-3.13a41.283 41.283 0 00-1.227-1.886z" fill="#0082FB"/>
            <path d="M13.502 5.946l-.016.016c-.4.43-.786.908-1.16 1.416.378.483.768 1.024 1.175 1.63.48-.743.928-1.345 1.367-1.807l.016-.016-1.382-1.24z" fill="url(#lobe-icons-meta-fill-6)"/>
            <path d="M20.918 5.713C19.853 4.633 18.583 4 17.225 4c-1.432 0-2.637.787-3.723 1.944l-.016.016 1.382 1.24.016-.017c.715-.747 1.408-1.12 2.176-1.12.826 0 1.6.39 2.27 1.075l.015.016 1.589-1.425-.016-.016z" fill="#0082FB"/>
            <path d="M23.998 14.125c-.06-3.467-1.27-6.566-3.064-8.396l-.016-.016-1.588 1.424.015.016c1.35 1.392 2.277 3.98 2.361 6.971v.023h2.292v-.022z" fill="url(#lobe-icons-meta-fill-7)"/>
            <path d="M23.998 14.15v-.023h-2.292v.022c.004.14.006.282.006.424 0 .815-.121 1.474-.368 1.95l-.011.022 1.708 1.782.013-.02c.62-.96.946-2.293.946-3.91 0-.083 0-.165-.002-.247z" fill="url(#lobe-icons-meta-fill-8)"/>
            <path d="M21.344 16.52l-.011.02c-.214.402-.519.67-.917.787l.778 2.462a3.493 3.493 0 00.438-.182 3.558 3.558 0 001.366-1.218l.044-.065.012-.02-1.71-1.784z" fill="url(#lobe-icons-meta-fill-9)"/>
            <path d="M19.92 17.393c-.262 0-.492-.039-.718-.14l-.798 2.522c.449.153.927.222 1.46.222.492 0 .943-.073 1.352-.215l-.78-2.462c-.167.05-.341.075-.517.073z" fill="url(#lobe-icons-meta-fill-10)"/>
            <path d="M18.323 16.534l-.014-.017-1.836 1.914.016.017c.637.682 1.246 1.105 1.937 1.337l.797-2.52c-.291-.125-.573-.353-.9-.731z" fill="url(#lobe-icons-meta-fill-11)"/>
            <path d="M18.309 16.515c-.55-.642-1.232-1.712-2.303-3.44l-1.396-2.336-.011-.02-1.62 2.438.012.02.989 1.668c.959 1.61 1.74 2.774 2.493 3.585l.016.016 1.834-1.914a2.353 2.353 0 01-.014-.017z" fill="url(#lobe-icons-meta-fill-12)"/>
            <defs>
              <linearGradient id="lobe-icons-meta-fill-0" x1="75.897%" x2="26.312%" y1="89.199%" y2="12.194%">
                <stop offset=".06%" stopColor="#0867DF"/>
                <stop offset="45.39%" stopColor="#0668E1"/>
                <stop offset="85.91%" stopColor="#0064E0"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-1" x1="21.67%" x2="97.068%" y1="75.874%" y2="23.985%">
                <stop offset="13.23%" stopColor="#0064DF"/>
                <stop offset="99.88%" stopColor="#0064E0"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-2" x1="38.263%" x2="60.895%" y1="89.127%" y2="16.131%">
                <stop offset="1.47%" stopColor="#0072EC"/>
                <stop offset="68.81%" stopColor="#0064DF"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-3" x1="47.032%" x2="52.15%" y1="90.19%" y2="15.745%">
                <stop offset="7.31%" stopColor="#007CF6"/>
                <stop offset="99.43%" stopColor="#0072EC"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-4" x1="52.155%" x2="47.591%" y1="58.301%" y2="37.004%">
                <stop offset="7.31%" stopColor="#007FF9"/>
                <stop offset="100%" stopColor="#007CF6"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-5" x1="37.689%" x2="61.961%" y1="12.502%" y2="63.624%">
                <stop offset="7.31%" stopColor="#007FF9"/>
                <stop offset="100%" stopColor="#0082FB"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-6" x1="34.808%" x2="62.313%" y1="68.859%" y2="23.174%">
                <stop offset="27.99%" stopColor="#007FF8"/>
                <stop offset="91.41%" stopColor="#0082FB"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-7" x1="43.762%" x2="57.602%" y1="6.235%" y2="98.514%">
                <stop offset="0%" stopColor="#0082FB"/>
                <stop offset="99.95%" stopColor="#0081FA"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-8" x1="60.055%" x2="39.88%" y1="4.661%" y2="69.077%">
                <stop offset="6.19%" stopColor="#0081FA"/>
                <stop offset="100%" stopColor="#0080F9"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-9" x1="30.282%" x2="61.081%" y1="59.32%" y2="33.244%">
                <stop offset="0%" stopColor="#027AF3"/>
                <stop offset="100%" stopColor="#0080F9"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-10" x1="20.433%" x2="82.112%" y1="50.001%" y2="50.001%">
                <stop offset="0%" stopColor="#0377EF"/>
                <stop offset="99.94%" stopColor="#0279F1"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-11" x1="40.303%" x2="72.394%" y1="35.298%" y2="57.811%">
                <stop offset=".19%" stopColor="#0471E9"/>
                <stop offset="100%" stopColor="#0377EF"/>
              </linearGradient>
              <linearGradient id="lobe-icons-meta-fill-12" x1="32.254%" x2="68.003%" y1="19.719%" y2="84.908%">
                <stop offset="27.65%" stopColor="#0867DF"/>
                <stop offset="100%" stopColor="#0471E9"/>
              </linearGradient>
            </defs>
          </svg>
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
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-semibold text-lg">
        {product.title}
      </div>
    </motion.div>
  )
}