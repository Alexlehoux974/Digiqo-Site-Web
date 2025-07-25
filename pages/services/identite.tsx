import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Palette, PenTool, FileText, Package, Briefcase, Phone, Star, Zap } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { servicesSEO } from '../../lib/seo-data'

interface IdentityPackage {
  name: string
  price: string
  duration?: string
  description: string
  features: string[]
  highlighted?: boolean
}

export default function IdentitePage() {
  const [activePackage, setActivePackage] = useState(0)
  const seoData = servicesSEO['identite-marque-reunion']

  const packages: IdentityPackage[] = [
    {
      name: 'Pack Starter',
      price: '990€',
      description: 'L\'essentiel pour démarrer votre identité visuelle',
      features: [
        'Création de logo professionnel',
        '3 propositions de concepts',
        '2 tours de modifications',
        'Fichiers haute résolution (PNG, JPG, SVG)',
        'Guide d\'utilisation du logo',
        'Déclinaison noir et blanc',
        'Favicon pour site web'
      ]
    },
    {
      name: 'Pack Business',
      price: '1 990€',
      description: 'Une identité complète pour votre entreprise',
      highlighted: true,
      features: [
        'Tout le Pack Starter inclus',
        '5 propositions de concepts',
        '3 tours de modifications',
        'Charte graphique complète (20 pages)',
        'Palette de couleurs et typographies',
        'Cartes de visite design',
        'Signature email professionnelle',
        'Templates réseaux sociaux (5 modèles)',
        'Papeterie de base (entête, enveloppe)'
      ]
    },
    {
      name: 'Pack Premium',
      price: '3 490€',
      description: 'Solution complète pour une marque forte et cohérente',
      features: [
        'Tout le Pack Business inclus',
        'Recherche et stratégie de marque',
        'Positionnement et valeurs de marque',
        'Guide de ton et voix de marque',
        'Brandbook complet (40+ pages)',
        'Déclinaisons publicitaires',
        'Templates de présentation',
        'Kit marketing complet',
        'Motion design du logo',
        'Accompagnement stratégique 3 mois'
      ]
    }
  ]

  const processSteps = [
    {
      title: 'Brief & Découverte',
      description: 'Compréhension de votre vision, vos valeurs et vos objectifs'
    },
    {
      title: 'Recherche & Stratégie',
      description: 'Analyse du marché, de la concurrence et positionnement unique'
    },
    {
      title: 'Création & Design',
      description: 'Développement des concepts visuels et de l\'identité'
    },
    {
      title: 'Révisions & Finalisation',
      description: 'Affinage selon vos retours jusqu\'à validation complète'
    },
    {
      title: 'Livraison & Formation',
      description: 'Remise des fichiers et guide d\'utilisation de votre identité'
    }
  ]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Identité de Marque - Digiqo",
    "provider": {
      "@type": "Organization",
      "name": "Digiqo",
      "url": "https://digiqo.fr"
    },
    "description": seoData.description,
    "areaServed": {
      "@type": "Place",
      "name": "La Réunion"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services d'Identité de Marque",
      "itemListElement": packages.map(pkg => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": pkg.name,
          "description": pkg.description
        },
        "price": pkg.price.replace('€', ''),
        "priceCurrency": "EUR"
      }))
    }
  }

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <meta property="og:image" content="https://digiqo.fr/og-identite.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <link rel="canonical" href={`https://digiqo.fr/services/${seoData.urlSlug}`} />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <ServiceLayout>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          <div className="container mx-auto px-4 py-20">
            <Link href="/#services">
              <Button
                variant="ghost"
                className="mb-8 text-gray-400 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux services
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8B1431] to-[#A91845] bg-clip-text text-transparent">
                Identité de Marque
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Créez une identité visuelle unique et mémorable qui reflète vos valeurs et vous démarque de la concurrence à La Réunion.
              </p>
            </motion.div>

            {/* Packages Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Nos Packs Identité de Marque
              </h2>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className={`relative ${pkg.highlighted ? 'scale-105' : ''}`}
                  >
                    {pkg.highlighted && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#8B1431] to-[#A91845] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Recommandé
                      </div>
                    )}
                    <div className={`h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border ${
                      pkg.highlighted ? 'border-[#8B1431]' : 'border-gray-700'
                    } hover:border-[#8B1431]/50 transition-colors`}>
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                        <p className="text-gray-400 mb-4">{pkg.description}</p>
                        <p className="text-4xl font-bold text-[#8B1431]">{pkg.price}</p>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="h-5 w-5 text-[#8B1431] mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        className={`w-full ${
                          pkg.highlighted 
                            ? 'bg-gradient-to-r from-[#8B1431] to-[#A91845] hover:from-[#7A0F28] hover:to-[#981636]' 
                            : 'bg-gray-700 hover:bg-gray-600'
                        } text-white font-semibold py-3`}
                        onClick={() => setActivePackage(index)}
                      >
                        Choisir ce pack
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Process Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Notre Processus Créatif
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#8B1431] to-[#A91845] flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Why Choose Us Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-20"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  Pourquoi Choisir Digiqo pour votre Identité de Marque ?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#8B1431]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Palette className="w-8 h-8 text-[#8B1431]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Créativité Unique</h3>
                    <p className="text-gray-300">Des designs originaux qui captent l'essence de votre marque</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#8B1431]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-[#8B1431]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Process Efficace</h3>
                    <p className="text-gray-300">De la conception à la livraison en 2-4 semaines</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#8B1431]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-[#8B1431]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Expertise Locale</h3>
                    <p className="text-gray-300">Compréhension du marché réunionnais et de ses spécificités</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Prêt à créer votre identité de marque ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
              </p>
              <Button 
                className="bg-gradient-to-r from-[#8B1431] to-[#A91845] hover:from-[#7A0F28] hover:to-[#981636] text-white font-semibold py-6 px-8 text-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Être rappelé(e)
              </Button>
            </motion.section>
          </div>
        </div>
      </ServiceLayout>
    </>
  )
}