import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Star, TrendingUp, Shield, Globe, Users, Zap, Target, FileText, AlertCircle } from 'lucide-react';
import { HeaderLuxury } from '../../components/Header/HeaderLuxury';
import { Footer } from '../../components/Footer/Footer';

// Interface correspondant EXACTEMENT aux champs de la table Audits PDF
interface AuditPDF {
  id: string;
  // Informations de base
  nomEntreprise: string;
  siteWeb: string;
  dateAudit: string;
  auditeur: string;
  verdictGlobal: string;

  // Scores
  scoreGlobal: number;
  scoreContenu: number;
  scoreSEO: number;
  scoreTechnique: number;
  scoreUX: number;
  scoreLegal: number;

  // Analyse contenu
  pointsPositifsContenu: string;
  pointsAmeliorationContenu: string;

  // Analyse SEO
  pointsCritiquesSEO: string;
  recommandationsSEOPrioritaires: string;

  // RGPD
  statutConformiteRGPD: string;
  violationsRGPDIdentifiees: string;
  risquesEncourus: string;
  actionsObligatoiresImmediates: string;

  // Accessibilité RGAA
  conformiteRGAA: string;
  testsRecommandesAccessibilite: string;
  actionsSuggereesAccessibilite: string;

  // Performance
  elementsATesterPerformance: string;
  recommandationsTechniques: string;

  // UX
  pointsPositifsUX: string;
  ameliorationsUX: string;

  // Présence en ligne
  presenceEnLigneRecommandee: string;

  // Plan d'action
  actionsURGENT0_15jours: string;
  actionsCOURTTERME1_3mois: string;
  actionsMOYENTERME3_6mois: string;

  // Budget
  budgetMiseEnConformite: string;
  budgetRefonteComplete: string;

  // Conclusions
  conclusion: string;
  recommandationPrincipale: string;

  // URL de l'audit PDF
  urlAudit: string;
}

interface AuditPageProps {
  audit: AuditPDF | null;
  error?: string;
}

const AuditPage = ({ audit, error }: AuditPageProps) => {
  if (error || !audit) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#8B1431] mb-4">Audit non trouvé</h1>
          <p className="text-gray-600">L'audit demandé n'existe pas ou n'est plus disponible.</p>
        </div>
      </div>
    );
  }

  const getVerdictIcon = () => {
    if (audit.verdictGlobal?.includes('Excellent')) return <CheckCircle className="w-8 h-8 text-[#199CB7]" />;
    if (audit.verdictGlobal?.includes('améliorations')) return <AlertTriangle className="w-8 h-8 text-[#199CB7]" />;
    return <XCircle className="w-8 h-8 text-[#8B1431]" />;
  };

  const getVerdictColor = () => {
    if (audit.verdictGlobal?.includes('Excellent')) return 'bg-[#199CB7]/10 border-[#199CB7]/30 text-[#199CB7]';
    if (audit.verdictGlobal?.includes('améliorations')) return 'bg-[#199CB7]/10 border-[#199CB7]/30 text-[#199CB7]';
    return 'bg-[#8B1431]/10 border-[#8B1431]/30 text-[#8B1431]';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#199CB7]';
    if (score >= 50) return 'text-[#199CB7]';
    return 'text-[#8B1431]';
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-[#199CB7] fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <>
      <Head>
        <title>Audit Digital - {audit.nomEntreprise} | Digiqo</title>
        <meta name="description" content={`Audit digital complet de ${audit.nomEntreprise} réalisé par Digiqo`} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <HeaderLuxury />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-[#8B1431] text-white py-20 pt-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B1431] via-[#9A1835] to-[#7A0F2A]" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-2xl">Audit Digital Complet</h1>
              <p className="text-4xl text-white font-light mb-4">{audit.nomEntreprise}</p>
              {audit.siteWeb && (
                <p className="text-xl text-white/90 mb-4">{audit.siteWeb}</p>
              )}
              <p className="text-xl text-white/90 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Réalisé le {audit.dateAudit}
              </p>
              {audit.auditeur && (
                <p className="text-lg text-white/80 mt-2">Par : {audit.auditeur}</p>
              )}
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Verdict Global */}
          {audit.verdictGlobal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`rounded-xl p-6 border-2 ${getVerdictColor()}`}
            >
              <div className="flex items-center gap-4 mb-4">
                {getVerdictIcon()}
                <h2 className="text-2xl font-bold">Verdict Global</h2>
              </div>
              <p className="whitespace-pre-line">{audit.verdictGlobal}</p>
            </motion.div>
          )}

          {/* Score Global */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-[#8B1431]">Score Global de Votre Présence Digitale</h2>
            <div className="text-center">
              <div className="text-7xl font-bold text-[#8B1431]">{audit.scoreGlobal}/100</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                <div className="text-center">
                  <div className="flex justify-center mb-2 text-[#8B1431]">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(audit.scoreContenu)}`}>{audit.scoreContenu}</div>
                  <div className="text-sm text-gray-700 font-medium">Contenu</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2 text-[#8B1431]">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(audit.scoreSEO)}`}>{audit.scoreSEO}</div>
                  <div className="text-sm text-gray-700 font-medium">SEO</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2 text-[#8B1431]">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(audit.scoreTechnique)}`}>{audit.scoreTechnique}</div>
                  <div className="text-sm text-gray-700 font-medium">Technique</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2 text-[#8B1431]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(audit.scoreUX)}`}>{audit.scoreUX}</div>
                  <div className="text-sm text-gray-700 font-medium">UX</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2 text-[#8B1431]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(audit.scoreLegal)}`}>{audit.scoreLegal}</div>
                  <div className="text-sm text-gray-700 font-medium">Légal</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2 text-[#8B1431]">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-400">N/A</div>
                  <div className="text-sm text-gray-700 font-medium">Réseaux</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 space-y-8">
            {/* Analyse du Contenu */}
            {(audit.pointsPositifsContenu || audit.pointsAmeliorationContenu) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <Globe className="w-7 h-7 text-[#8B1431]" />
                  Analyse du Contenu et Positionnement
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-[#8B1431]">Score :</span>
                  <span className="text-2xl font-bold">{audit.scoreContenu}/100</span>
                </div>
                {audit.pointsPositifsContenu && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">✅ Points Positifs</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.pointsPositifsContenu}</p>
                  </div>
                )}
                {audit.pointsAmeliorationContenu && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">⚠️ Points d'Amélioration</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.pointsAmeliorationContenu}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Audit SEO */}
            {(audit.pointsCritiquesSEO || audit.recommandationsSEOPrioritaires) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <TrendingUp className="w-7 h-7 text-[#8B1431]" />
                  Audit SEO et Référencement
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-[#8B1431]">Score :</span>
                  <span className="text-2xl font-bold">{audit.scoreSEO}/100</span>
                </div>
                {audit.pointsCritiquesSEO && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">🔴 Points Critiques</h3>
                    <div className="bg-[#8B1431]/5 border border-[#8B1431]/20 rounded-xl p-4">
                      <p className="whitespace-pre-line text-gray-700">{audit.pointsCritiquesSEO}</p>
                    </div>
                  </div>
                )}
                {audit.recommandationsSEOPrioritaires && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">📊 Recommandations SEO Prioritaires</h3>
                    <div className="bg-[#199CB7]/5 border border-[#199CB7]/20 rounded-xl p-4">
                      <p className="whitespace-pre-line text-gray-700">{audit.recommandationsSEOPrioritaires}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Conformité RGPD */}
            {(audit.statutConformiteRGPD || audit.violationsRGPDIdentifiees || audit.risquesEncourus || audit.actionsObligatoiresImmediates) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <Shield className="w-7 h-7 text-[#8B1431]" />
                  Conformité RGPD
                </h2>
                {audit.statutConformiteRGPD && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">📋 Statut de Conformité</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.statutConformiteRGPD}</p>
                  </div>
                )}
                {audit.violationsRGPDIdentifiees && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">⚠️ Violations Identifiées</h3>
                    <div className="bg-[#8B1431]/5 border border-[#8B1431]/20 rounded-xl p-4">
                      <p className="whitespace-pre-line text-gray-700">{audit.violationsRGPDIdentifiees}</p>
                    </div>
                  </div>
                )}
                {audit.risquesEncourus && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">🚨 Risques Encourus</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.risquesEncourus}</p>
                  </div>
                )}
                {audit.actionsObligatoiresImmediates && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">🔴 Actions Obligatoires Immédiates</h3>
                    <div className="bg-[#8B1431]/10 border-2 border-[#8B1431]/30 rounded-xl p-4">
                      <p className="whitespace-pre-line text-gray-700 font-semibold">{audit.actionsObligatoiresImmediates}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Accessibilité RGAA */}
            {(audit.conformiteRGAA || audit.testsRecommandesAccessibilite || audit.actionsSuggereesAccessibilite) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <Users className="w-7 h-7 text-[#8B1431]" />
                  Accessibilité RGAA
                </h2>
                {audit.conformiteRGAA && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">♿ Conformité RGAA</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.conformiteRGAA}</p>
                  </div>
                )}
                {audit.testsRecommandesAccessibilite && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">🔍 Tests Recommandés</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.testsRecommandesAccessibilite}</p>
                  </div>
                )}
                {audit.actionsSuggereesAccessibilite && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">💡 Actions Suggérées</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.actionsSuggereesAccessibilite}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Performance Technique */}
            {(audit.elementsATesterPerformance || audit.recommandationsTechniques) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <Zap className="w-7 h-7 text-[#8B1431]" />
                  Performance Technique
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-[#8B1431]">Score :</span>
                  <span className="text-2xl font-bold">{audit.scoreTechnique}/100</span>
                </div>
                {audit.elementsATesterPerformance && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">⚡ Éléments à Tester</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.elementsATesterPerformance}</p>
                  </div>
                )}
                {audit.recommandationsTechniques && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">🔧 Recommandations Techniques</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.recommandationsTechniques}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Expérience Utilisateur (UX) */}
            {(audit.pointsPositifsUX || audit.ameliorationsUX) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <Users className="w-7 h-7 text-[#8B1431]" />
                  Expérience Utilisateur (UX)
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-[#8B1431]">Score :</span>
                  <span className="text-2xl font-bold">{audit.scoreUX}/100</span>
                </div>
                {audit.pointsPositifsUX && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">✨ Points Positifs</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.pointsPositifsUX}</p>
                  </div>
                )}
                {audit.ameliorationsUX && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">🎨 Améliorations UX</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.ameliorationsUX}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Présence en Ligne */}
            {audit.presenceEnLigneRecommandee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <Target className="w-7 h-7 text-[#8B1431]" />
                  Présence en Ligne Recommandée
                </h2>
                <p className="text-gray-700 whitespace-pre-line">{audit.presenceEnLigneRecommandee}</p>
              </motion.div>
            )}

            {/* Plan d'Action */}
            {(audit.actionsURGENT0_15jours || audit.actionsCOURTTERME1_3mois || audit.actionsMOYENTERME3_6mois) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-[#8B1431] text-white rounded-xl shadow-2xl p-10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B1431] via-[#9A1835] to-[#7A0F2A] opacity-50" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-8 text-center">Plan d'Action Prioritaire</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {audit.actionsURGENT0_15jours && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4">🚨 Actions URGENTES</h3>
                        <p className="text-sm mb-2 opacity-80">0-15 jours</p>
                        <p className="text-white/90 whitespace-pre-line">{audit.actionsURGENT0_15jours}</p>
                      </div>
                    )}
                    {audit.actionsCOURTTERME1_3mois && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4">📅 Court Terme</h3>
                        <p className="text-sm mb-2 opacity-80">1-3 mois</p>
                        <p className="text-white/90 whitespace-pre-line">{audit.actionsCOURTTERME1_3mois}</p>
                      </div>
                    )}
                    {audit.actionsMOYENTERME3_6mois && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4">🎯 Moyen Terme</h3>
                        <p className="text-sm mb-2 opacity-80">3-6 mois</p>
                        <p className="text-white/90 whitespace-pre-line">{audit.actionsMOYENTERME3_6mois}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Budget */}
            {(audit.budgetMiseEnConformite || audit.budgetRefonteComplete) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <FileText className="w-7 h-7 text-[#8B1431]" />
                  Estimation Budgétaire
                </h2>
                {audit.budgetMiseEnConformite && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">💰 Budget Mise en Conformité</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.budgetMiseEnConformite}</p>
                  </div>
                )}
                {audit.budgetRefonteComplete && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">🚀 Budget Refonte Complète</h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.budgetRefonteComplete}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Conclusion */}
            {(audit.conclusion || audit.recommandationPrincipale) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-gradient-to-br from-[#8B1431] to-[#DA6530] text-white rounded-xl shadow-2xl p-10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-6 text-center">Conclusion de l'Audit</h2>
                  {audit.conclusion && (
                    <div className="mb-6">
                      <p className="text-lg text-white/90 whitespace-pre-line">{audit.conclusion}</p>
                    </div>
                  )}
                  {audit.recommandationPrincipale && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mt-6">
                      <h3 className="text-xl font-bold mb-3">🎯 Recommandation Principale</h3>
                      <p className="text-white whitespace-pre-line">{audit.recommandationPrincipale}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Lien vers PDF si disponible */}
            {audit.urlAudit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="text-center"
              >
                <a
                  href={audit.urlAudit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B1431] text-white font-semibold rounded-full hover:bg-[#9A1835] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  Télécharger l'Audit Complet (PDF)
                </a>
              </motion.div>
            )}

            {/* CTA Final */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-gradient-to-br from-[#199CB7] to-[#16808F] text-white rounded-xl shadow-2xl p-10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">Prêt à Améliorer Votre Présence Digitale ?</h2>
                <p className="text-lg mb-8 text-white/90">Nos experts sont à votre disposition pour discuter de votre audit et vous accompagner</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="px-8 py-4 bg-white text-[#199CB7] font-bold rounded-full hover:shadow-xl transition-all duration-300"
                  >
                    Prendre Rendez-vous
                  </a>
                  <a
                    href="tel:+262262025102"
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    Appeler : +262 262 02 51 02
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!id || typeof id !== 'string') {
    return { props: { audit: null, error: 'Invalid ID' } };
  }

  const AIRTABLE_PAT = process.env.AIRTABLE_PAT || '';
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9';
  const AIRTABLE_TABLE_ID = 'tblMceHOda6CpUrwx'; // Table "Audits PDF"

  try {
    // Appel direct à l'API Airtable pour compatibilité Netlify Edge Functions
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${id}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { props: { audit: null, error: 'Audit not found' } };
      }
      throw new Error(`Failed to fetch audit: ${response.status}`);
    }

    const data = await response.json();

    // Mapping EXACT des champs de la table Audits PDF
    const audit: AuditPDF = {
      id: data.id,
      // Informations de base
      nomEntreprise: data.fields['Nom entreprise'] || null,
      siteWeb: data.fields['Site web'] || null,
      dateAudit: data.fields['Date audit'] || null,
      auditeur: data.fields['Auditeur'] || null,
      verdictGlobal: data.fields['Verdict global'] || null,

      // Scores
      scoreGlobal: data.fields['Score global'] || 0,
      scoreContenu: data.fields['Score contenu'] || 0,
      scoreSEO: data.fields['Score SEO'] || 0,
      scoreTechnique: data.fields['Score technique'] || 0,
      scoreUX: data.fields['Score UX'] || 0,
      scoreLegal: data.fields['Score légal'] || 0,

      // Analyse contenu
      pointsPositifsContenu: data.fields['Points positifs contenu'] || null,
      pointsAmeliorationContenu: data.fields['Points amélioration contenu'] || null,

      // Analyse SEO
      pointsCritiquesSEO: data.fields['Points critiques SEO'] || null,
      recommandationsSEOPrioritaires: data.fields['Recommandations SEO prioritaires'] || null,

      // RGPD
      statutConformiteRGPD: data.fields['Statut conformité RGPD'] || null,
      violationsRGPDIdentifiees: data.fields['Violations RGPD identifiées'] || null,
      risquesEncourus: data.fields['Risques encourus'] || null,
      actionsObligatoiresImmediates: data.fields['Actions obligatoires immédiates'] || null,

      // Accessibilité RGAA
      conformiteRGAA: data.fields['Conformité RGAA'] || null,
      testsRecommandesAccessibilite: data.fields['Tests recommandés accessibilité'] || null,
      actionsSuggereesAccessibilite: data.fields['Actions suggérées accessibilité'] || null,

      // Performance
      elementsATesterPerformance: data.fields['Éléments à tester performance'] || null,
      recommandationsTechniques: data.fields['Recommandations techniques'] || null,

      // UX
      pointsPositifsUX: data.fields['Points positifs UX'] || null,
      ameliorationsUX: data.fields['Améliorations UX'] || null,

      // Présence en ligne
      presenceEnLigneRecommandee: data.fields['Présence en ligne recommandée'] || null,

      // Plan d'action
      actionsURGENT0_15jours: data.fields['Actions URGENT 0-15 jours'] || null,
      actionsCOURTTERME1_3mois: data.fields['Actions COURT TERME 1-3 mois'] || null,
      actionsMOYENTERME3_6mois: data.fields['Actions MOYEN TERME 3-6 mois'] || null,

      // Budget
      budgetMiseEnConformite: data.fields['Budget mise en conformité'] || null,
      budgetRefonteComplete: data.fields['Budget refonte complète'] || null,

      // Conclusions
      conclusion: data.fields['Conclusion'] || null,
      recommandationPrincipale: data.fields['Recommandation principale'] || null,

      // URL de l'audit PDF
      urlAudit: data.fields['URL Audit'] || null,
    };

    return {
      props: {
        audit,
        error: null
      }
    };
  } catch (error) {
    console.error('Error fetching audit:', error);
    return {
      props: {
        audit: null,
        error: 'Failed to load audit'
      }
    };
  }
};

export default AuditPage;