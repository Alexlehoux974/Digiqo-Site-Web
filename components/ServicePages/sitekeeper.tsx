import Head from 'next/head'
import { motion } from 'framer-motion'
import { ANIMATION, getStaggerDelay } from '@/lib/animation-constants'
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  ChevronRight,
  Zap,
  ArrowUpRight,
  Rocket,
  Server,
  RefreshCw,
  Headphones,
  Star,
  Gem
} from 'lucide-react'
import { servicesSEO } from '../../lib/seo-data'
import { ServiceLayout } from '../../components/ServiceLayout'
import { generateContactUrl } from '../../lib/contact-utils'
import { ServiceHero } from './ServiceHero'
import { getProductsForService } from '../../lib/airtable-products'

interface Formula {
  id: string
  name: string
  summary: string
  price: string
  highlights: string[]
  gradient: string
  accentColor: string
  icon: any
  features: string[]
  paymentLink?: string
  bestValue?: boolean
}

export default function SiteKeeperPage() {
  const seoData = servicesSEO['maintenance-site-web-reunion']
  
  // Get real products from Airtable - ARR only (6 formulas)
  const maintenanceProducts = getProductsForService('sitekeeper')
  
  // Separate ShopKeeper (e-commerce) and SiteKeeper (showcase) products
  const shopKeeperEssential = maintenanceProducts.find(p => p.name === 'ShopKeeper Essential')
  const shopKeeperPro = maintenanceProducts.find(p => p.name === 'ShopKeeper Pro')
  const shopKeeperUltimate = maintenanceProducts.find(p => p.name === 'ShopKeeper Ultimate')
  
  const siteKeeperEssential = maintenanceProducts.find(p => p.name === 'SiteKeeper Essential')
  const siteKeeperPro = maintenanceProducts.find(p => p.name === 'SiteKeeper Pro')
  const siteKeeperUltimate = maintenanceProducts.find(p => p.name === 'SiteKeeper Ultimate')
  
  // Create formulas array with ShopKeeper first (e-commerce), then SiteKeeper (showcase)
  const shopKeeperFormulas: Formula[] = [
    {
      id: 'shopkeeper-essential',
      name: 'ShopKeeper Essential',
      summary: shopKeeperEssential?.description || 'Maintenance essentielle pour votre boutique en ligne',
      price: shopKeeperEssential?.priceFormatted || '890€',
      highlights: [
        'Surveillance 24/7',
        'Sauvegardes quotidiennes',
        'Monitoring transactions'
      ],
      gradient: 'from-purple-500 to-indigo-600',
      accentColor: 'purple',
      icon: Shield,
      features: shopKeeperEssential?.features || [],
      paymentLink: 'https://app-eu1.hubspot.com/payments/XjCpfQmChryHKxS?referrer=PAYMENT_LINK'
    },
    {
      id: 'shopkeeper-pro',
      name: 'ShopKeeper Pro',
      summary: shopKeeperPro?.description || 'Protection avancée pour votre e-commerce',
      price: shopKeeperPro?.priceFormatted || '1 490€',
      highlights: [
        'Sauvegardes temps réel',
        'WAF inclus',
        'Support 24h'
      ],
      gradient: 'from-orange-500 to-red-600',
      accentColor: 'orange',
      icon: Rocket,
      features: shopKeeperPro?.features || [],
      paymentLink: 'https://app-eu1.hubspot.com/payments/YDW7hsDG?referrer=PAYMENT_LINK',
      bestValue: true
    },
    {
      id: 'shopkeeper-ultimate',
      name: 'ShopKeeper Ultimate',
      summary: shopKeeperUltimate?.description || 'Solution complète pour boutiques exigeantes',
      price: shopKeeperUltimate?.priceFormatted || '2 490€',
      highlights: [
        'Infrastructure dédiée',
        'CDN premium mondial',
        'Support VIP 4h'
      ],
      gradient: 'from-indigo-600 to-purple-700',
      accentColor: 'indigo',
      icon: Gem,
      features: shopKeeperUltimate?.features || [],
      paymentLink: 'https://app-eu1.hubspot.com/payments/ztmdZqmRM?referrer=PAYMENT_LINK'
    }
  ]

  const siteKeeperFormulas: Formula[] = [
    {
      id: 'sitekeeper-essential',
      name: 'SiteKeeper Essential',
      summary: siteKeeperEssential?.description || 'Maintenance essentielle pour votre site vitrine',
      price: siteKeeperEssential?.priceFormatted || '690€',
      highlights: [
        'Surveillance 24/7',
        'Sauvegardes hebdomadaires',
        'Support email 72h'
      ],
      gradient: 'from-gray-500 to-gray-600',
      accentColor: 'gray',
      icon: Shield,
      features: siteKeeperEssential?.features || [],
      paymentLink: 'https://app-eu1.hubspot.com/payments/qx9vNKwmy?referrer=PAYMENT_LINK'
    },
    {
      id: 'sitekeeper-pro',
      name: 'SiteKeeper Pro',
      summary: siteKeeperPro?.description || 'Protection renforcée pour sites professionnels',
      price: siteKeeperPro?.priceFormatted || '1 190€',
      highlights: [
        'Sauvegardes quotidiennes',
        'CDN basique inclus',
        'Support prioritaire 48h'
      ],
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: 'emerald',
      icon: Zap,
      features: siteKeeperPro?.features || [],
      paymentLink: 'https://app-eu1.hubspot.com/payments/Mdj2bcwPx7bKY4?referrer=PAYMENT_LINK'
    },
    {
      id: 'sitekeeper-ultimate',
      name: 'SiteKeeper Ultimate',
      summary: siteKeeperUltimate?.description || 'Solution premium pour sites exigeants',
      price: siteKeeperUltimate?.priceFormatted || '1 990€',
      highlights: [
        'Sauvegardes temps réel',
        'WAF entreprise',
        'Support prioritaire 12h'
      ],
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: 'blue',
      icon: Star,
      features: siteKeeperUltimate?.features || [],
      paymentLink: 'https://app-eu1.hubspot.com/payments/QmxMmYXDdrqTZ?referrer=PAYMENT_LINK'
    }
  ]

  return (
    <ServiceLayout>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
      </Head>

      {/* Hero Section */}
      <ServiceHero
        icon={Shield}
        title={{
          line1: "Maintenance",
          line2: "Premium Web"
        }}
        subtitle="Protection complète pour votre site - Sauvegardes, sécurité, mises à jour… On s'occupe de tout !"
        ctaButtons={{
          primary: {
            text: "Découvrir nos formules",
            href: "#formules"
          },
          secondary: {
            text: "Audit gratuit",
            href: generateContactUrl({ service: 'sitekeeper' })
          }
        }}
        gradientFrom="from-digiqo-secondary"
        gradientTo="to-digiqo-secondary-dark"
        iconColor="text-digiqo-secondary"
      />

      {/* Formules Section */}
      <section id="formules" className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Nos <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark bg-clip-text text-transparent">Formules</span>
            </h2>
            <p className="text-xl text-digiqo-primary/70 max-w-3xl mx-auto mb-8">
              ShopKeeper pour e-commerce, SiteKeeper pour sites vitrines
            </p>
          </motion.div>

          {/* ShopKeeper Section - Pour E-commerce */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">ShopKeeper</span>
              <span className="text-gray-700"> - Pour sites e-commerce</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {shopKeeperFormulas.map((formula, index) => (
                <motion.div
                  key={formula.id}
                  {...ANIMATION.entry.fadeInUp}
                  whileInView={ANIMATION.entry.fadeInUp.animate}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(index) }}
                  className="relative"
                >
                  {formula.bestValue && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-digiqo-accent to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        Meilleur rapport qualité/prix
                      </span>
                    </div>
                  )}
                  
                  <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full ${
                    formula.bestValue ? 'ring-2 ring-digiqo-accent' : ''
                  }`}>
                    {/* Header */}
                    <div className={`p-8 bg-gradient-to-br ${formula.gradient}`}>
                      <formula.icon className="w-12 h-12 text-white mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">{formula.name}</h3>
                      <p className="text-white/90 text-sm">{formula.summary}</p>
                    </div>

                    {/* Price */}
                    <div className="p-6 bg-gray-50 border-b border-gray-100">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-digiqo-primary">
                          {formula.price}
                        </p>
                        <p className="text-gray-600 mt-2">/an</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Points clés :</h4>
                      <ul className="space-y-2">
                        {formula.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-5 h-5 text-${formula.accentColor}-500 shrink-0 mt-0.5`} />
                            <span className="text-gray-700 text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features */}
                    {formula.features.length > 0 && (
                      <div className="px-6 pb-6">
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
                            Voir tous les détails
                          </summary>
                          <ul className="mt-4 space-y-2">
                            {formula.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                <span className="text-gray-600 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="p-6 bg-gray-50">
                      <a
                        href={formula.paymentLink || generateContactUrl({ service: 'sitekeeper', formula: formula.name })}
                        className={`block w-full py-4 px-6 text-center font-semibold rounded-full transition-all
                          ${formula.bestValue 
                            ? 'bg-gradient-to-r from-digiqo-accent to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-digiqo-secondary hover:text-digiqo-secondary'
                          }`}
                      >
                        Choisir cette formule
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SiteKeeper Section - Pour Sites Vitrines */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-digiqo-secondary to-digiqo-secondary-dark bg-clip-text text-transparent">SiteKeeper</span>
              <span className="text-gray-700"> - Pour sites vitrines</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {siteKeeperFormulas.map((formula, index) => (
                <motion.div
                  key={formula.id}
                  {...ANIMATION.entry.fadeInUp}
                  whileInView={ANIMATION.entry.fadeInUp.animate}
                  viewport={{ once: true }}
                  transition={{ delay: getStaggerDelay(index + 3) }}
                  className="relative"
                >
                  <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full`}>
                    {/* Header */}
                    <div className={`p-8 bg-gradient-to-br ${formula.gradient}`}>
                      <formula.icon className="w-12 h-12 text-white mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">{formula.name}</h3>
                      <p className="text-white/90 text-sm">{formula.summary}</p>
                    </div>

                    {/* Price */}
                    <div className="p-6 bg-gray-50 border-b border-gray-100">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-digiqo-primary">
                          {formula.price}
                        </p>
                        <p className="text-gray-600 mt-2">/an</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Points clés :</h4>
                      <ul className="space-y-2">
                        {formula.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-5 h-5 text-${formula.accentColor}-500 shrink-0 mt-0.5`} />
                            <span className="text-gray-700 text-sm">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features */}
                    {formula.features.length > 0 && (
                      <div className="px-6 pb-6">
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
                            Voir tous les détails
                          </summary>
                          <ul className="mt-4 space-y-2">
                            {formula.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                <span className="text-gray-600 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="p-6 bg-gray-50">
                      <a
                        href={formula.paymentLink || generateContactUrl({ service: 'sitekeeper', formula: formula.name })}
                        className="block w-full py-4 px-6 text-center font-semibold rounded-full transition-all bg-white border-2 border-gray-300 text-gray-700 hover:border-digiqo-secondary hover:text-digiqo-secondary"
                      >
                        Choisir cette formule
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pourquoi choisir <span className="text-digiqo-secondary">Digiqo</span> ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Protection maximale",
                description: "Sécurité renforcée contre les menaces"
              },
              {
                icon: RefreshCw,
                title: "Mises à jour régulières",
                description: "Votre site toujours à jour et performant"
              },
              {
                icon: Server,
                title: "Sauvegardes automatiques",
                description: "Vos données en sécurité, récupérables à tout moment"
              },
              {
                icon: Headphones,
                title: "Support dédié",
                description: "Une équipe d'experts à votre service"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                {...ANIMATION.entry.fadeInUp}
                whileInView={ANIMATION.entry.fadeInUp.animate}
                viewport={{ once: true }}
                transition={{ delay: getStaggerDelay(index) }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-digiqo-secondary/10 to-digiqo-secondary-dark/10 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-digiqo-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-digiqo-secondary to-digiqo-secondary-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            {...ANIMATION.entry.fadeInUp}
            whileInView={ANIMATION.entry.fadeInUp.animate}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Protégez votre investissement
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Ne laissez pas votre site web sans protection. Choisissez la formule adaptée à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#formules"
                className="inline-flex items-center px-8 py-4 bg-white text-digiqo-secondary font-semibold rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Voir les formules
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href={generateContactUrl({ service: 'sitekeeper' })}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-digiqo-secondary transition-all"
              >
                Demander un audit gratuit
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </ServiceLayout>
  )
}