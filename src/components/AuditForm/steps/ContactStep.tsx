'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import { AuditFormData } from '@/src/lib/audit-types';
import { User, Mail, Phone, Video, Calendar } from 'lucide-react';

interface ContactStepProps {
  data: Partial<AuditFormData>;
  updateData: (field: string, value: any) => void;
}

export default function ContactStep({ data, updateData }: ContactStepProps) {
  const contactOptions = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Téléphone', icon: Phone },
    { value: 'visio', label: 'Visioconférence', icon: Video },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Vos Coordonnées
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Pour recevoir votre audit personnalisé et être recontacté
        </p>
      </div>

      {/* Informations personnelles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
            <User className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Prénom</span>
          </div>
          <FormField
            label="Prénom"
            name="firstName"
            placeholder="Votre prénom"
            required
            value={data.contact?.firstName || ''}
            onChange={(e) => updateData('contact.firstName', e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
            <User className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Nom</span>
          </div>
          <FormField
            label="Nom"
            name="lastName"
            placeholder="Votre nom"
            required
            value={data.contact?.lastName || ''}
            onChange={(e) => updateData('contact.lastName', e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Email</span>
          </div>
          <FormField
            label="Email professionnel"
            name="email"
            type="email"
            placeholder="votre@email.com"
            required
            value={data.contact?.email || ''}
            onChange={(e) => updateData('contact.email', e.target.value)}
            helper="Nous utiliserons cet email pour vous envoyer votre audit"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
            <Phone className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Téléphone</span>
          </div>
          <FormField
            label="Téléphone"
            name="phone"
            type="tel"
            placeholder="0692 00 00 00"
            required
            value={data.contact?.phone || ''}
            onChange={(e) => updateData('contact.phone', e.target.value)}
            helper="Pour vous contacter rapidement"
          />
        </div>
      </div>

      {/* Mode de restitution */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Comment souhaitez-vous recevoir votre audit complet ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactOptions.map(option => {
            const Icon = option.icon;
            return (
              <motion.label
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex flex-col items-center p-6 rounded-xl cursor-pointer
                  border-2 transition-all
                  ${data.contact?.preferredContact === option.value
                    ? 'border-accent bg-gradient-to-br from-accent/10 to-primary/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-accent/50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={option.value}
                  checked={data.contact?.preferredContact === option.value}
                  onChange={(e) => updateData('contact.preferredContact', e.target.value)}
                  className="sr-only"
                />
                <Icon className={`w-8 h-8 mb-2 ${
                  data.contact?.preferredContact === option.value
                    ? 'text-accent'
                    : 'text-gray-500'
                }`} />
                <span className={`font-medium ${
                  data.contact?.preferredContact === option.value
                    ? 'text-accent'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {option.label}
                </span>
                {data.contact?.preferredContact === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.label>
            );
          })}
        </div>
      </div>

      {/* Créneau préféré */}
      {data.contact?.preferredContact === 'visio' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
            <Calendar className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Disponibilités</h3>
          </div>
          <FormField
            label="Créneaux préférés"
            name="preferredTimeSlot"
            multiline
            rows={3}
            placeholder="Ex: Mardi et jeudi après-midi, ou mercredi matin..."
            value={data.contact?.preferredTimeSlot || ''}
            onChange={(e) => updateData('contact.preferredTimeSlot', e.target.value)}
            helper="Indiquez vos disponibilités pour un appel visio"
          />
        </motion.div>
      )}

      {/* RGPD */}
      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 space-y-3">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            required
            className="w-5 h-5 mt-0.5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            J'accepte que mes données soient utilisées pour me recontacter dans le cadre de cet audit digital.
            Vos données sont traitées conformément à notre politique de confidentialité.
          </span>
        </label>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 mt-0.5 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            J'accepte de recevoir des conseils et actualités digitales de Digiqo (optionnel)
          </span>
        </label>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-accent/20">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          🔒 <strong>Confidentialité:</strong> Vos informations restent strictement confidentielles 
          et ne seront utilisées que pour vous fournir votre audit personnalisé.
        </p>
      </div>
    </motion.div>
  );
}