import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertCircle, Calculator, Euro, Users, MapPin, Briefcase, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { generateContactUrl } from '@/lib/contact-utils'
import { generateWhatsAppLink } from '@/lib/whatsapp-utils'

export default function EligibilityCalculator() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    basedInReunion: null as boolean | null,
    employees: null as number | null,
    revenue: null as number | null,
    projectBudget: null as number | null,
    projectType: null as string | null,
  })
  const [showResult, setShowResult] = useState(false)

  const calculateEligibility = () => {
    const { basedInReunion, employees, revenue } = formData
    
    if (!basedInReunion) return { eligible: false, reason: "Votre entreprise doit être basée à La Réunion" }
    if (employees !== null && employees >= 20) return { eligible: false, reason: "Le dispositif est réservé aux entreprises de moins de 20 salariés" }
    if (revenue !== null && revenue >= 1000000) return { eligible: false, reason: "Le chiffre d'affaires doit être inférieur à 1 000 000€" }
    
    return { eligible: true, reason: null }
  }

  const calculateSubsidy = () => {
    const { employees, projectBudget } = formData
    if (!projectBudget) return 0
    
    const percentage = employees !== null && employees < 10 ? 0.8 : 0.5
    const subsidy = Math.min(projectBudget * percentage, 3200)
    
    return Math.round(subsidy)
  }

  const eligibility = calculateEligibility()
  const subsidyAmount = calculateSubsidy()

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const resetCalculator = () => {
    setStep(1)
    setFormData({
      basedInReunion: null,
      employees: null,
      revenue: null,
      projectBudget: null,
      projectType: null,
    })
    setShowResult(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            {showResult ? 'Résultat' : `Étape ${step} sur 5`}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round((showResult ? 100 : (step / 5) * 100))}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-digiqo-secondary to-digiqo-primary h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: showResult ? '100%' : `${(step / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8"
          >
            {/* Step 1: Location */}
            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-secondary to-digiqo-primary rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Localisation</h3>
                    <p className="text-gray-600">Votre entreprise est-elle basée à La Réunion ?</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setFormData({ ...formData, basedInReunion: true })}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      formData.basedInReunion === true
                        ? 'border-digiqo-secondary bg-digiqo-secondary/5'
                        : 'border-gray-200 hover:border-digiqo-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Oui, nous sommes basés à La Réunion</span>
                      {formData.basedInReunion === true && (
                        <Check className="w-5 h-5 text-digiqo-secondary" />
                      )}
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setFormData({ ...formData, basedInReunion: false })}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      formData.basedInReunion === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Non, nous ne sommes pas à La Réunion</span>
                      {formData.basedInReunion === false && (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Employees */}
            {step === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-secondary to-digiqo-primary rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Effectif</h3>
                    <p className="text-gray-600">Combien de salariés compte votre entreprise ?</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: '0 à 9 salariés', value: 5 },
                    { label: '10 à 19 salariés', value: 15 },
                    { label: '20 à 49 salariés', value: 30 },
                    { label: '50+ salariés', value: 50 },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, employees: option.value })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.employees === option.value
                          ? option.value < 20
                            ? 'border-digiqo-secondary bg-digiqo-secondary/5'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-digiqo-secondary/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{option.label}</div>
                        {formData.employees === option.value && (
                          <div className="mt-2">
                            {option.value < 20 ? (
                              <Check className="w-5 h-5 text-digiqo-secondary mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {formData.employees !== null && formData.employees < 20 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      Éligible : Taux de subvention {formData.employees < 10 ? '80%' : '50%'}
                    </span>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Revenue */}
            {step === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-secondary to-digiqo-primary rounded-xl flex items-center justify-center">
                    <Euro className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Chiffre d'affaires</h3>
                    <p className="text-gray-600">Quel est votre chiffre d'affaires annuel ?</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: 'Moins de 250 000€', value: 250000 },
                    { label: '250 000€ à 500 000€', value: 500000 },
                    { label: '500 000€ à 1 000 000€', value: 750000 },
                    { label: 'Plus de 1 000 000€', value: 1500000 },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, revenue: option.value })}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        formData.revenue === option.value
                          ? option.value < 1000000
                            ? 'border-digiqo-secondary bg-digiqo-secondary/5'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-digiqo-secondary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {formData.revenue === option.value && (
                          option.value < 1000000 ? (
                            <Check className="w-5 h-5 text-digiqo-secondary" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Project Type */}
            {step === 4 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-secondary to-digiqo-primary rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Type de projet</h3>
                    <p className="text-gray-600">Quel est votre projet digital ?</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    'Création de site web',
                    'Refonte de site web',
                    'Publicité en ligne',
                    'Stratégie digitale complète',
                    'E-commerce',
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.projectType === type
                          ? 'border-digiqo-secondary bg-digiqo-secondary/5'
                          : 'border-gray-200 hover:border-digiqo-secondary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{type}</span>
                        {formData.projectType === type && (
                          <Check className="w-5 h-5 text-digiqo-secondary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Budget */}
            {step === 5 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-digiqo-secondary to-digiqo-primary rounded-xl flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Budget estimé</h3>
                    <p className="text-gray-600">Quel est le budget estimé de votre projet (HT) ?</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: '1 000€ à 2 000€', value: 1500 },
                    { label: '2 000€ à 4 000€', value: 3000 },
                    { label: '4 000€ à 6 000€', value: 5000 },
                    { label: '6 000€ à 10 000€', value: 8000 },
                    { label: 'Plus de 10 000€', value: 12000 },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, projectBudget: option.value })}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        formData.projectBudget === option.value
                          ? 'border-digiqo-secondary bg-digiqo-secondary/5'
                          : 'border-gray-200 hover:border-digiqo-secondary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {formData.projectBudget === option.value && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-digiqo-secondary font-semibold">
                              ≈ {Math.round(option.value * (formData.employees !== null && formData.employees < 10 ? 0.8 : 0.5))}€ d'aide
                            </span>
                            <Check className="w-5 h-5 text-digiqo-secondary" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  step === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={step === 1}
              >
                Précédent
              </button>
              
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && formData.basedInReunion === null) ||
                  (step === 2 && formData.employees === null) ||
                  (step === 3 && formData.revenue === null) ||
                  (step === 4 && formData.projectType === null) ||
                  (step === 5 && formData.projectBudget === null)
                }
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  ((step === 1 && formData.basedInReunion === null) ||
                   (step === 2 && formData.employees === null) ||
                   (step === 3 && formData.revenue === null) ||
                   (step === 4 && formData.projectType === null) ||
                   (step === 5 && formData.projectBudget === null))
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-digiqo-secondary to-digiqo-primary text-white hover:shadow-lg'
                }`}
              >
                {step === 5 ? 'Voir le résultat' : 'Suivant'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Result Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="p-8"
          >
            {eligibility.eligible ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-12 h-12 text-white" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Félicitations, vous êtes éligible !
                </h3>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="text-lg font-medium text-gray-700">Montant estimé de votre subvention</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                    className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    {subsidyAmount.toLocaleString('fr-FR')}€
                  </motion.div>
                  <p className="text-sm text-gray-600 mt-2">
                    Soit {formData.employees !== null && formData.employees < 10 ? '80%' : '50%'} de votre budget projet
                    {subsidyAmount === 3200 && ' (plafond atteint)'}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm text-blue-900 font-medium mb-1">Récapitulatif de votre projet</p>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Type de projet : {formData.projectType}</li>
                        <li>• Budget estimé : {formData.projectBudget?.toLocaleString('fr-FR')}€ HT</li>
                        <li>• Taux de subvention : {formData.employees !== null && formData.employees < 10 ? '80%' : '50%'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a
                    href={generateWhatsAppLink({ context: 'eligibilite' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-4 bg-gradient-to-r from-digiqo-secondary to-digiqo-primary text-white font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    Je démarre mon projet avec Digiqo
                  </a>
                  
                  <button
                    onClick={resetCalculator}
                    className="block w-full px-6 py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Refaire le calcul
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <X className="w-12 h-12 text-white" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Désolé, vous n'êtes pas éligible
                </h3>
                
                <div className="bg-red-50 rounded-xl p-6 mb-6">
                  <p className="text-red-800">{eligibility.reason}</p>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Même si vous n'êtes pas éligible au Kap Numérik, Digiqo peut vous accompagner dans votre transformation digitale avec des solutions adaptées à votre budget.
                </p>
                
                <div className="space-y-3">
                  <Link
                    href={generateContactUrl({
                      service: 'consultation',
                      description: 'Je souhaite discuter d\'autres solutions de financement'
                    })}
                    className="block w-full px-6 py-4 bg-gradient-to-r from-digiqo-secondary to-digiqo-primary text-white font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    Découvrir nos autres solutions
                  </Link>
                  
                  <button
                    onClick={resetCalculator}
                    className="block w-full px-6 py-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Refaire le calcul
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}