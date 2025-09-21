import React from 'react';
import { motion } from 'framer-motion';
import { AuditFormData, AuditScore } from '@/src/lib/audit-types';
import { 
  CheckCircle, TrendingUp, Mail, Phone, 
  Calendar, Download, ArrowRight, Star, Target
} from 'lucide-react';

interface AuditSummaryProps {
  data: AuditFormData;
  score: AuditScore;
}

export default function AuditSummary({ data, score }: AuditSummaryProps) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Audit Complété avec Succès !
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Merci {data.contact.firstName}, voici votre résumé personnalisé
          </p>
        </motion.div>

        {/* Analysis Complete */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >

          {/* Top Recommendations */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 flex items-center">
              <TrendingUp className="w-7 h-7 mr-3 text-accent" />
              Points d'Amélioration Prioritaires pour votre Transformation Digitale
            </h3>
            <div className="space-y-3">
              {score.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-base font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-gray-100 font-semibold text-lg">{rec.title}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-base mt-1 leading-relaxed">{rec.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="bg-gradient-to-r from-primary via-primary/90 to-accent rounded-2xl shadow-xl p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-6">Prochaines Étapes</h2>
          
            <div className="space-y-5 mb-8">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <p className="text-lg">Vous recevrez votre audit complet personnalisé par email dans les 24h</p>
              </div>

              {data.contact.preferredContact === 'phone' && (
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <p className="text-lg">Un conseiller expert vous contactera sous 48h au {data.contact.phone}</p>
                </div>
              )}

              {data.contact.preferredContact === 'visio' && (
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <p className="text-lg">Nous vous proposerons un créneau pour une visioconférence personnalisée</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 font-medium border border-white/30"
              >
                <Download className="w-5 h-5" />
                <span>Télécharger le résumé</span>
              </button>

              <a
                href="/"
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg"
              >
                <span>Retour au site</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Analyse complète</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm">Recommandations personnalisées</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-accent" />
              <span className="text-sm">Plan d'action inclus</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}