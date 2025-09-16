import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Star, TrendingUp, Shield, Globe, Users, Zap, Target } from 'lucide-react';
import { HeaderLuxury } from '../../components/Header/HeaderLuxury';
import { Footer } from '../../components/Footer/Footer';

interface AuditData {
  id: string;
  entreprise: string;
  siteWeb: string;
  dateAudit: string;
  auditeur: string;
  verdictGlobal: string;
  statutAudit: string;
  resumeVerdict: string;
  pointsCles: string;
  pointsPositifsContenu: string;
  pointsAmeliorationContenu: string;
  noteContenu: number;
  pointsCritiquesSEO: string;
  recommandationsSEO: string;
  noteSEO: number;
  conformiteRGPD: string;
  violationsIdentifiees: string;
  risquesEncourus: string;
  actionsObligatoires: string;
  vitesseDesktop: number;
  vitesseMobile: number;
  pointsAmeliorationPerformance: string;
  notePerformance: number;
  pointsPositifsUX: string;
  pointsNegatifsUX: string;
  recommandationsUX: string;
  noteUX: number;
  facebookPresent: boolean;
  instagramPresent: boolean;
  linkedinPresent: boolean;
  googleMyBusiness: boolean;
  analyseReseauxSociaux: string;
  noteReseauxSociaux: number;
  concurrentsAnalyses: string;
  positionMarche: string;
  avantagesConcurrentiels: string;
  top3ActionsImmediates: string;
  actionsCourtTerme: string;
  actionsMoyenTerme: string;
  actionsLongTerme: string;
  servicesRecommandes: string[];
  budgetEstime: number;
  roiAttendu: string;
  scoreGlobal: number;
  scoreContenu: number;
  scoreSEO: number;
  scoreTechnique: number;
  scoreUX: number;
  scoreLegal: number;
  scoreReseauxSociaux: number;
}

interface AuditPageProps {
  audit: AuditData | null;
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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatText = (text: string | string[]) => {
    if (!text) return [];
    // Si c'est déjà un array, on le retourne
    if (Array.isArray(text)) return text.filter(line => line && line.trim());
    // Si c'est une string, on la split
    return text.split('\n').filter(line => line.trim());
  };

  return (
    <>
      <Head>
        <title>Audit Digital - {audit.entreprise} | Digiqo</title>
        <meta name="description" content={`Audit digital complet de ${audit.entreprise} réalisé par Digiqo`} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <HeaderLuxury />

      <div className="min-h-screen bg-white">
        {/* Hero Section - Style aligné avec le homepage */}
        <div className="bg-[#8B1431] text-white py-20 pt-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B1431] via-[#9A1835] to-[#7A0F2A]" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-2xl">Audit Digital Complet</h1>
              <p className="text-4xl text-white font-light mb-4">{audit.entreprise}</p>
              <p className="text-xl text-white/90 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Réalisé le {formatDate(audit.dateAudit)}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Verdict Global */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-xl p-6 border-2 ${getVerdictColor()}`}
          >
            <div className="flex items-center gap-4 mb-4">
              {getVerdictIcon()}
              <h2 className="text-2xl font-bold">Verdict Global</h2>
            </div>
            <p className="text-lg font-semibold mb-2">{audit.verdictGlobal}</p>
            {audit.resumeVerdict && <p className="whitespace-pre-line">{audit.resumeVerdict}</p>}
          </motion.div>

          {/* Score Global */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-[#8B1431]">Score Global de Votre Présence Digitale</h2>
            <div className="text-center">
              <div className={`text-7xl font-bold ${getScoreColor(audit.scoreGlobal || 0)}`}>
                {audit.scoreGlobal || 0}/100
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                {[
                  { label: 'Contenu', score: audit.scoreContenu, icon: <Globe className="w-6 h-6" /> },
                  { label: 'SEO', score: audit.scoreSEO, icon: <TrendingUp className="w-6 h-6" /> },
                  { label: 'Technique', score: audit.scoreTechnique, icon: <Zap className="w-6 h-6" /> },
                  { label: 'UX', score: audit.scoreUX, icon: <Users className="w-6 h-6" /> },
                  { label: 'Légal', score: audit.scoreLegal, icon: <Shield className="w-6 h-6" /> },
                  { label: 'Réseaux', score: audit.scoreReseauxSociaux, icon: <Target className="w-6 h-6" /> },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2 text-[#8B1431]">{item.icon}</div>
                    <div className={`text-2xl font-bold ${getScoreColor(item.score || 0)}`}>
                      {item.score || 0}
                    </div>
                    <div className="text-sm text-gray-700 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sections détaillées */}
          <div className="mt-8 space-y-8">
            {/* Analyse du Contenu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                <Globe className="w-7 h-7 text-[#8B1431]" />
                Analyse du Contenu et Positionnement
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-[#8B1431]">Note :</span>
                <div className="flex">{renderStars(audit.noteContenu || 0)}</div>
              </div>
              
              {audit.pointsPositifsContenu && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#199CB7] mb-3">✅ Points Positifs</h3>
                  <ul className="space-y-2">
                    {formatText(audit.pointsPositifsContenu).map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#199CB7] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {audit.pointsAmeliorationContenu && (
                <div>
                  <h3 className="text-lg font-semibold text-[#8B1431] mb-3">⚠️ Points d'Amélioration</h3>
                  <ul className="space-y-2">
                    {formatText(audit.pointsAmeliorationContenu).map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-[#8B1431] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Audit SEO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                <TrendingUp className="w-7 h-7 text-[#8B1431]" />
                Audit SEO et Référencement
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-[#8B1431]">Note :</span>
                <div className="flex">{renderStars(audit.noteSEO || 0)}</div>
              </div>
              
              {audit.pointsCritiquesSEO && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#8B1431] mb-3">🔴 Points Critiques</h3>
                  <div className="bg-[#8B1431]/5 border border-[#8B1431]/20 rounded-xl p-4">
                    <p className="whitespace-pre-line text-gray-700">{audit.pointsCritiquesSEO}</p>
                  </div>
                </div>
              )}
              
              {audit.recommandationsSEO && (
                <div>
                  <h3 className="text-lg font-semibold text-[#199CB7] mb-3">📊 Recommandations SEO</h3>
                  <div className="bg-[#199CB7]/5 border border-[#199CB7]/20 rounded-xl p-4">
                    <p className="whitespace-pre-line text-gray-700">{audit.recommandationsSEO}</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Conformité RGPD */}
            {audit.conformiteRGPD && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#8B1431]">
                  <Shield className="w-7 h-7 text-[#8B1431]" />
                  Conformité RGPD et Aspects Légaux
                </h2>
                
                <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
                  audit.conformiteRGPD === 'Conforme' ? 'bg-[#199CB7]/10 text-[#199CB7] border border-[#199CB7]/30' :
                  audit.conformiteRGPD === 'Partielle' ? 'bg-[#199CB7]/10 text-[#199CB7] border border-[#199CB7]/30' :
                  'bg-[#8B1431]/10 text-[#8B1431] border border-[#8B1431]/30'
                }`}>
                  Statut : {audit.conformiteRGPD}
                </div>
                
                {audit.violationsIdentifiees && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">❌ Violations Identifiées</h3>
                    <div className="bg-[#8B1431]/5 border border-[#8B1431]/20 rounded-xl p-4">
                      <p className="whitespace-pre-line text-gray-700">{audit.violationsIdentifiees}</p>
                    </div>
                  </div>
                )}
                
                {audit.risquesEncourus && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#8B1431] mb-3">🚨 Risques Encourus</h3>
                    <div className="bg-[#8B1431]/5 border border-[#8B1431]/20 rounded-xl p-4">
                      <p className="whitespace-pre-line text-gray-700">{audit.risquesEncourus}</p>
                    </div>
                  </div>
                )}
                
                {audit.actionsObligatoires && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#199CB7] mb-3">📋 Actions Obligatoires</h3>
                    <div className="bg-[#199CB7]/5 border border-[#199CB7]/20 rounded-xl p-4">
                      <p className="whitespace-pre-line text-gray-700">{audit.actionsObligatoires}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Plan d'Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#8B1431] text-white rounded-xl shadow-2xl p-10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B1431] via-[#9A1835] to-[#7A0F2A]" />
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-white drop-shadow-2xl flex items-center gap-3">
                <Target className="w-8 h-8" />
                Plan d'Action Prioritaire
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {audit.top3ActionsImmediates && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <h3 className="font-bold mb-3 text-xl text-[#8B1431] flex items-center gap-2">
                      <span className="text-2xl">🚨</span> Actions Immédiates (0-7 jours)
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.top3ActionsImmediates}</p>
                  </motion.div>
                )}
                
                {audit.actionsCourtTerme && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <h3 className="font-bold mb-3 text-xl text-[#8B1431] flex items-center gap-2">
                      <span className="text-2xl">📅</span> Court Terme (1-3 mois)
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.actionsCourtTerme}</p>
                  </motion.div>
                )}
                
                {audit.actionsMoyenTerme && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <h3 className="font-bold mb-3 text-xl text-[#8B1431] flex items-center gap-2">
                      <span className="text-2xl">🎯</span> Moyen Terme (3-6 mois)
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.actionsMoyenTerme}</p>
                  </motion.div>
                )}
                
                {audit.actionsLongTerme && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <h3 className="font-bold mb-3 text-xl text-[#8B1431] flex items-center gap-2">
                      <span className="text-2xl">🔮</span> Long Terme (6-12 mois)
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">{audit.actionsLongTerme}</p>
                  </motion.div>
                )}
              </div>
              </div>
            </motion.div>

            {/* Services Recommandés */}
            {audit.servicesRecommandes && audit.servicesRecommandes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#8B1431]/10 hover:shadow-2xl transition-all duration-300"
              >
                <h2 className="text-2xl font-bold mb-6 text-[#8B1431]">🚀 Services Digiqo Recommandés</h2>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {audit.servicesRecommandes.map((service, index) => (
                    <span key={index} className="px-4 py-2 bg-[#8B1431] text-white rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
                
                {audit.budgetEstime && (
                  <div className="mb-4">
                    <span className="font-semibold">Budget estimé : </span>
                    <span className="text-2xl font-bold text-[#8B1431]">{audit.budgetEstime} €</span>
                  </div>
                )}
                
                {audit.roiAttendu && (
                  <div className="bg-[#199CB7]/5 border border-[#199CB7]/20 rounded-xl p-4">
                    <h3 className="font-semibold text-[#199CB7] mb-2">ROI Attendu</h3>
                    <p className="text-gray-700">{audit.roiAttendu}</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-[#8B1431] rounded-xl shadow-2xl p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B1431] via-[#9A1835] to-[#7A0F2A]" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-2xl">Prêt à Améliorer Votre Présence Digitale ?</h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">Nos experts sont à votre disposition pour discuter de votre audit et vous accompagner</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="https://calendly.com/digiqo"
                  className="inline-block bg-white text-[#8B1431] px-12 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Prendre Rendez-vous
                </a>
                <a
                  href="tel:+262262025102"
                  className="inline-block bg-white/95 backdrop-blur-sm text-[#8B1431] px-12 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Appeler : +262 262 02 51 02
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  // Configuration Airtable
  const AIRTABLE_PAT = process.env.AIRTABLE_PAT || '';
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9';
  const AIRTABLE_TABLE_ID = 'tblUeG59DpymKc9Tx'; // Table "Audits Clients"

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
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();

    // Mapping des données Airtable avec gestion des valeurs undefined
    const auditData = {
      id: data.id,
      entreprise: data.fields['Nom Entreprise'] || null,
      siteWeb: data.fields['Site Web'] || null,
      dateAudit: data.fields['Date Audit'] || null,
      auditeur: data.fields['Auditeur'] || null,
      verdictGlobal: data.fields['Verdict Global'] || null,
      statutAudit: data.fields['Statut Audit'] || null,

      // Résumé exécutif
      resumeVerdict: data.fields['Résumé Verdict'] || null,
      pointsCles: data.fields['Points Clés'] || [],

      // Contenu
      pointsPositifsContenu: data.fields['Points Positifs Contenu'] || [],
      pointsAmeliorationContenu: data.fields['Points Amélioration Contenu'] || [],
      noteContenu: data.fields['Note Contenu'] || null,

      // SEO
      pointsCritiquesSEO: data.fields['Points Critiques SEO'] || [],
      recommandationsSEO: data.fields['Recommandations SEO'] || [],
      noteSEO: data.fields['Note SEO'] || null,

      // RGPD
      conformiteRGPD: data.fields['Conformité RGPD'] || null,
      violationsIdentifiees: data.fields['Violations Identifiées'] || [],
      risquesEncourus: data.fields['Risques Encourus'] || null,
      actionsObligatoires: data.fields['Actions Obligatoires'] || [],

      // Performance
      vitesseDesktop: data.fields['Vitesse Desktop'] || null,
      vitesseMobile: data.fields['Vitesse Mobile'] || null,
      pointsAmeliorationPerformance: data.fields['Points Amélioration Performance'] || [],
      notePerformance: data.fields['Note Performance'] || null,

      // UX
      pointsPositifsUX: data.fields['Points Positifs UX'] || [],
      pointsNegatifsUX: data.fields['Points Négatifs UX'] || [],
      recommandationsUX: data.fields['Recommandations UX'] || [],
      noteUX: data.fields['Note UX'] || null,

      // Réseaux sociaux
      facebookPresent: data.fields['Facebook Présent'] || false,
      instagramPresent: data.fields['Instagram Présent'] || false,
      linkedinPresent: data.fields['LinkedIn Présent'] || false,
      googleMyBusiness: data.fields['Google My Business'] || false,
      analyseReseauxSociaux: data.fields['Analyse Réseaux Sociaux'] || null,
      noteReseauxSociaux: data.fields['Note Réseaux Sociaux'] || null,

      // Concurrence
      concurrentsAnalyses: data.fields['Concurrents Analysés'] || [],
      positionMarche: data.fields['Position Marché'] || null,
      avantagesConcurrentiels: data.fields['Avantages Concurrentiels'] || [],

      // Plan d'action
      top3ActionsImmediates: data.fields['Top 3 Actions Immédiates'] || [],
      actionsCourtTerme: data.fields['Actions Court Terme'] || [],
      actionsMoyenTerme: data.fields['Actions Moyen Terme'] || [],
      actionsLongTerme: data.fields['Actions Long Terme'] || [],

      // Recommandations Digiqo
      servicesRecommandes: data.fields['Services Recommandés'] || [],
      budgetEstime: data.fields['Budget Estimé'] || null,
      roiAttendu: data.fields['ROI Attendu'] || null,

      // Scores
      scoreGlobal: data.fields['Score Global'] || null,
      scoreContenu: data.fields['Score Contenu'] || null,
      scoreSEO: data.fields['Score SEO'] || null,
      scoreTechnique: data.fields['Score Technique'] || null,
      scoreUX: data.fields['Score UX'] || null,
      scoreLegal: data.fields['Score Légal'] || null,
      scoreReseauxSociaux: data.fields['Score Réseaux Sociaux'] || null,
    };

    return {
      props: {
        audit: auditData,
      },
    };
  } catch (error) {
    console.error('Error fetching audit from Airtable:', error);
    return {
      props: {
        audit: null,
        error: 'Error loading audit',
      },
    };
  }
};

export default AuditPage;