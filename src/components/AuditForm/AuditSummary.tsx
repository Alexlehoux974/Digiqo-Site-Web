'use client';

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
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPriorityBadge = (priority: AuditScore['priority']) => {
    const badges = {
      low: { bg: 'bg-green-100', text: 'text-green-800', label: 'Faible' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Moyen' },
      high: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Élevé' },
      critical: { bg: 'bg-red-100', text: 'text-red-800', label: 'Critique' }
    };
    return badges[priority];
  };

  const categories = [
    { name: 'Digital', score: score.categories.digital, icon: '🌐' },
    { name: 'Marketing', score: score.categories.marketing, icon: '📱' },
    { name: 'Conversion', score: score.categories.conversion, icon: '🎯' },
    { name: 'Automatisation', score: score.categories.automation, icon: '⚙️' },
    { name: 'Réputation', score: score.categories.reputation, icon: '⭐' }
  ];

  const priorityBadge = getPriorityBadge(score.priority);

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

        {/* Score Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: score.overall / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  style={{
                    strokeDasharray: 553,
                    strokeDashoffset: 0,
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%'
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B1431" />
                    <stop offset="100%" stopColor="#DA6530" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className={`text-5xl font-bold ${getScoreColor(score.overall)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {score.overall}%
                </motion.span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Score Global</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${priorityBadge.bg} ${priorityBadge.text}`}>
                Niveau d'urgence: {priorityBadge.label}
              </span>
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                  {category.score}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {category.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top Recommendations */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-accent" />
              Recommandations Prioritaires
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
                  <div className="flex-shrink-0 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-accent">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{rec}</p>
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
          className="bg-gradient-to-r from-primary to-accent rounded-2xl shadow-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Prochaines Étapes</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <p>Vous recevrez votre audit complet par email dans les 24h</p>
            </div>
            
            {data.contact.preferredContact === 'phone' && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <p>Un conseiller vous contactera sous 48h au {data.contact.phone}</p>
              </div>
            )}
            
            {data.contact.preferredContact === 'visio' && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <p>Nous vous proposerons un créneau pour une visioconférence</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Télécharger le résumé</span>
            </button>
            
            <a
              href="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              <span>Retour au site</span>
              <ArrowRight className="w-5 h-5" />
            </a>
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