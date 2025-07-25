import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Sparkles, Calendar, ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/Button'
import { ServiceContent, getServiceContent } from '@/lib/services-content'

export const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()
  const [service, setService] = useState<ServiceContent | null>(null)
  const [selectedFormula, setSelectedFormula] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadService = async () => {
      if (!serviceId) return
      
      const content = await getServiceContent(serviceId)
      if (content) {
        setService(content)
      } else {
        // Redirect to 404 if service not found
        navigate('/404')
      }
      setLoading(false)
    }

    loadService()
  }, [serviceId, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-digiqo-primary"></div>
      </div>
    )
  }

  if (!service) return null

  // Ensure we have formulas before accessing
  if (!service.formulas || service.formulas.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-digiqo-primary mb-4">Service en construction</h1>
            <p className="text-gray-600">Le contenu de ce service est en cours de préparation.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-8 inline-flex items-center gap-2 text-digiqo-primary hover:text-digiqo-primary-dark"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const currentFormula = service.formulas[selectedFormula]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-digiqo-primary to-digiqo-primary/90 text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 -left-32 w-96 h-96 bg-digiqo-accent/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-32 w-96 h-96 bg-digiqo-secondary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {service.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-digiqo-accent">
                {service.subtitle}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl">
                {service.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Formulas Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-digiqo-primary mb-4">
                Nos Formules
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez la formule adaptée à vos besoins
              </p>
            </motion.div>

            {/* Formula Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {service.formulas.map((formula, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedFormula(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedFormula === index
                      ? 'bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formula.name}
                </motion.button>
              ))}
            </div>

            {/* Formula Details */}
            <motion.div
              key={selectedFormula}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Details */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-digiqo-primary mb-4">
                    {currentFormula.name}
                  </h3>
                  
                  {currentFormula.description && (
                    <p className="text-gray-600 mb-6">{currentFormula.description}</p>
                  )}

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-digiqo-accent" />
                      Services inclus
                    </h4>
                    <ul className="space-y-3">
                      {currentFormula.services.map((service, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{service}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {currentFormula.bonus && currentFormula.bonus.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-digiqo-accent" />
                        Bonus
                      </h4>
                      <ul className="space-y-3">
                        {currentFormula.bonus.map((bonus, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <Sparkles className="w-5 h-5 text-digiqo-accent flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{bonus}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column - Pricing */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="bg-gradient-to-br from-digiqo-primary to-digiqo-accent p-8 rounded-2xl text-white mb-6">
                      <p className="text-lg mb-2">À partir de</p>
                      <p className="text-4xl md:text-5xl font-bold mb-4">
                        {currentFormula.price}
                      </p>
                      {currentFormula.yearlyPrice && (
                        <p className="text-lg opacity-90">
                          ou {currentFormula.yearlyPrice}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="w-full"
                        onClick={() => navigate('/contact')}
                      >
                        Demander un devis
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full border border-gray-300"
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Planifier un appel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section (if available) */}
        {service.portfolio && service.portfolio.length > 0 && (
          <section className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-digiqo-primary mb-4">
                  Nos Réalisations
                </h2>
                <p className="text-xl text-gray-600">
                  Découvrez quelques-uns de nos projets
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.portfolio.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-digiqo-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.url && (
                      <a
                        href={project.url}
                        className="inline-flex items-center gap-2 text-digiqo-accent hover:text-digiqo-accent-dark transition-colors"
                      >
                        Voir le site
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à passer à l'action ?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Obtenir un devis gratuit
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-digiqo-primary"
                >
                  Voir nos autres services
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}