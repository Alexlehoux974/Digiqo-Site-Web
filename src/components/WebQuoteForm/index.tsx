import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectInfoStep from './steps/ProjectInfoStep';
import WebsiteTypeStep from './steps/WebsiteTypeStep';
import FeaturesStep from './steps/FeaturesStep';
import DesignStep from './steps/DesignStep';
import ContentStep from './steps/ContentStep';
import TechnicalStep from './steps/TechnicalStep';
import TimelinePaymentStep from './steps/TimelinePaymentStep';
import ContactStep from './steps/ContactStep';
import { WebQuoteFormData } from '../../lib/quote-types';

const STEPS = [
  { id: 1, name: 'Votre projet', component: ProjectInfoStep },
  { id: 2, name: 'Type de site', component: WebsiteTypeStep },
  { id: 3, name: 'Fonctionnalités', component: FeaturesStep },
  { id: 4, name: 'Design', component: DesignStep },
  { id: 5, name: 'Contenu', component: ContentStep },
  { id: 6, name: 'Technique', component: TechnicalStep },
  { id: 7, name: 'Délais & Paiement', component: TimelinePaymentStep },
  { id: 8, name: 'Contact', component: ContactStep }
];

export default function WebQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<WebQuoteFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Charger les données depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('webQuoteFormData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder les données dans localStorage
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('webQuoteFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const updateData = (field: string, value: any) => {
    const keys = field.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/web-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsComplete(true);
        localStorage.removeItem('webQuoteFormData');
      } else {
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-green-50 rounded-2xl p-12">
          <div className="text-6xl mb-6">✓</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Merci pour votre demande !
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Nous avons bien reçu votre demande de devis. Notre équipe va l'étudier
            et vous recontactera dans les plus brefs délais.
          </p>
          <button
            onClick={() => {
              setFormData({});
              setCurrentStep(1);
              setIsComplete(false);
            }}
            className="bg-[#8B1431] text-white px-8 py-3 rounded-full hover:bg-[#6B0F25] transition-colors"
          >
            Faire une nouvelle demande
          </button>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step.id === currentStep
                      ? 'bg-[#8B1431] text-white'
                      : step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <span className="absolute top-12 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                  {step.name}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <AnimatePresence mode="wait">
          <CurrentStepComponent
            key={currentStep}
            data={formData}
            updateData={updateData}
          />
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-full transition-colors ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Précédent
        </button>

        {currentStep < STEPS.length ? (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-[#8B1431] text-white rounded-full hover:bg-[#6B0F25] transition-colors"
          >
            Suivant
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-full transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-[#DA6530] text-white hover:bg-[#C5582A]'
            }`}
          >
            {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
          </button>
        )}
      </div>
    </div>
  );
}