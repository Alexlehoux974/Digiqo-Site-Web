'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import StepIndicator from './StepIndicator';
import GeneralInfoStep from './steps/GeneralInfoStep';
import DigitalAssetsStep from './steps/DigitalAssetsStep';
import WebsiteStep from './steps/WebsiteStep';
import SocialMediaStep from './steps/SocialMediaStep';
import AdvertisingStep from './steps/AdvertisingStep';
import ContentStep from './steps/ContentStep';
import ConversionStep from './steps/ConversionStep';
import CrmStep from './steps/CrmStep';
import ReputationStep from './steps/ReputationStep';
import ObjectivesStep from './steps/ObjectivesStep';
import ContactStep from './steps/ContactStep';
import AuditSummary from './AuditSummary';
import { AuditFormData, AuditStep } from '@/src/lib/audit-types';
import { calculateAuditScore } from '@/src/lib/audit-utils';

const steps: AuditStep[] = [
  {
    id: 0,
    title: 'Général',
    subtitle: 'Informations de base',
    icon: 'Building2',
    fields: ['general'],
    progress: 9
  },
  {
    id: 1,
    title: 'Actifs',
    subtitle: 'Présence digitale',
    icon: 'Globe',
    fields: ['digitalAssets'],
    progress: 18
  },
  {
    id: 2,
    title: 'Site Web',
    subtitle: 'Analyse du site',
    icon: 'Monitor',
    fields: ['website'],
    progress: 27
  },
  {
    id: 3,
    title: 'Réseaux',
    subtitle: 'Social media',
    icon: 'Share2',
    fields: ['socialMediaStrategy'],
    progress: 36
  },
  {
    id: 4,
    title: 'Publicité',
    subtitle: 'Acquisition payante',
    icon: 'TrendingUp',
    fields: ['advertising'],
    progress: 45
  },
  {
    id: 5,
    title: 'Contenu',
    subtitle: 'Création visuelle',
    icon: 'Camera',
    fields: ['content'],
    progress: 54
  },
  {
    id: 6,
    title: 'Conversion',
    subtitle: 'Tunnel & données',
    icon: 'Target',
    fields: ['conversion'],
    progress: 63
  },
  {
    id: 7,
    title: 'CRM',
    subtitle: 'Automatisation',
    icon: 'Database',
    fields: ['crm'],
    progress: 72
  },
  {
    id: 8,
    title: 'Réputation',
    subtitle: 'E-réputation',
    icon: 'Star',
    fields: ['reputation'],
    progress: 81
  },
  {
    id: 9,
    title: 'Objectifs',
    subtitle: 'Besoins & freins',
    icon: 'Target',
    fields: ['objectives'],
    progress: 90
  },
  {
    id: 10,
    title: 'Contact',
    subtitle: 'Coordonnées',
    icon: 'User',
    fields: ['contact'],
    progress: 100
  }
];

export default function AuditForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<Partial<AuditFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [auditScore, setAuditScore] = useState<any>(null);
  const [savedProgress, setSavedProgress] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('auditFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed.data);
      setCurrentStep(parsed.step || 0);
      setCompletedSteps(parsed.completedSteps || []);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('auditFormData', JSON.stringify({
        data: formData,
        step: currentStep,
        completedSteps,
        timestamp: new Date().toISOString()
      }));
      setSavedProgress(true);
      setTimeout(() => setSavedProgress(false), 2000);
    }
  }, [formData, currentStep, completedSteps]);

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
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validation logic based on step
    switch (stepIndex) {
      case 0: // General Info
        if (!formData.general?.companyName) newErrors['general.companyName'] = 'Ce champ est requis';
        if (!formData.general?.sector) newErrors['general.sector'] = 'Ce champ est requis';
        if (!formData.general?.location) newErrors['general.location'] = 'Ce champ est requis';
        break;
      case 10: // Contact
        if (!formData.contact?.firstName) newErrors['contact.firstName'] = 'Ce champ est requis';
        if (!formData.contact?.lastName) newErrors['contact.lastName'] = 'Ce champ est requis';
        if (!formData.contact?.email) newErrors['contact.email'] = 'Ce champ est requis';
        if (!formData.contact?.phone) newErrors['contact.phone'] = 'Ce champ est requis';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      if (currentStep === steps.length - 1) {
        handleSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate audit score
    const score = calculateAuditScore(formData as AuditFormData);
    setAuditScore(score);
    
    try {
      // Send data to API
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, score })
      });
      
      if (response.ok) {
        setShowSummary(true);
        localStorage.removeItem('auditFormData');
      }
    } catch (error) {
      console.error('Error submitting audit:', error);
    }
    
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GeneralInfoStep data={formData} updateData={updateData} />;
      case 1:
        return <DigitalAssetsStep data={formData} updateData={updateData} />;
      case 2:
        return <WebsiteStep data={formData} updateData={updateData} />;
      case 3:
        return <SocialMediaStep data={formData} updateData={updateData} />;
      case 4:
        return <AdvertisingStep data={formData} updateData={updateData} />;
      case 5:
        return <ContentStep data={formData} updateData={updateData} />;
      case 6:
        return <ConversionStep data={formData} updateData={updateData} />;
      case 7:
        return <CrmStep data={formData} updateData={updateData} />;
      case 8:
        return <ReputationStep data={formData} updateData={updateData} />;
      case 9:
        return <ObjectivesStep data={formData} updateData={updateData} />;
      case 10:
        return <ContactStep data={formData} updateData={updateData} />;
      default:
        return null;
    }
  };

  if (showSummary && auditScore) {
    return <AuditSummary data={formData as AuditFormData} score={auditScore} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-digiqo-gray-light via-white to-digiqo-accent/5 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-secondary bg-clip-text text-transparent mb-4">
            Audit Digital Complet
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Évaluez votre maturité digitale en quelques minutes
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-digiqo-primary">
              Progression
            </span>
            <span className="text-sm font-bold text-digiqo-accent">
              {steps[currentStep].progress}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-secondary shadow-lg"
              initial={{ width: '0%' }}
              animate={{ width: `${steps[currentStep].progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 overflow-x-auto">
          <StepIndicator 
            steps={steps} 
            currentStep={currentStep} 
            completedSteps={completedSteps} 
          />
        </div>

        {/* Form Content */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-digiqo-gray/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t-2 border-digiqo-gray/30">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
                ${currentStep === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' 
                  : 'bg-digiqo-secondary/10 text-digiqo-secondary border-2 border-digiqo-secondary/20 hover:bg-digiqo-secondary hover:text-white hover:border-digiqo-secondary hover:shadow-lg hover:shadow-digiqo-secondary/30 hover:-translate-x-1'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Précédent</span>
            </button>

            {/* Save Progress Indicator */}
            <AnimatePresence>
              {savedProgress && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center space-x-2 text-digiqo-secondary font-medium"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Progression sauvegardée</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="
                flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold
                bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-accent-light text-white
                hover:shadow-xl hover:shadow-digiqo-accent/40 hover:translate-x-1 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                border-2 border-transparent hover:border-digiqo-accent/30
              "
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Envoi...</span>
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  <span>Terminer</span>
                  <Send className="w-5 h-5" />
                </>
              ) : (
                <>
                  <span>Suivant</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}