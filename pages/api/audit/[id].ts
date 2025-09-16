import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

// Utiliser AIRTABLE_PAT comme les autres API du projet
const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT!
}).base(process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid audit ID' });
  }

  try {
    const record = await base('Audits Clients').find(id);
    
    const auditData = {
      id: record.id,
      entreprise: record.get('Nom Entreprise'),
      siteWeb: record.get('Site Web'),
      dateAudit: record.get('Date Audit'),
      auditeur: record.get('Auditeur'),
      verdictGlobal: record.get('Verdict Global'),
      statutAudit: record.get('Statut Audit'),
      
      // Résumé exécutif
      resumeVerdict: record.get('Résumé Verdict'),
      pointsCles: record.get('Points Clés'),
      
      // Contenu
      pointsPositifsContenu: record.get('Points Positifs Contenu'),
      pointsAmeliorationContenu: record.get('Points Amélioration Contenu'),
      noteContenu: record.get('Note Contenu'),
      
      // SEO
      pointsCritiquesSEO: record.get('Points Critiques SEO'),
      recommandationsSEO: record.get('Recommandations SEO'),
      noteSEO: record.get('Note SEO'),
      
      // RGPD
      conformiteRGPD: record.get('Conformité RGPD'),
      violationsIdentifiees: record.get('Violations Identifiées'),
      risquesEncourus: record.get('Risques Encourus'),
      actionsObligatoires: record.get('Actions Obligatoires'),
      
      // Performance
      vitesseDesktop: record.get('Vitesse Desktop'),
      vitesseMobile: record.get('Vitesse Mobile'),
      pointsAmeliorationPerformance: record.get('Points Amélioration Performance'),
      notePerformance: record.get('Note Performance'),
      
      // UX
      pointsPositifsUX: record.get('Points Positifs UX'),
      pointsNegatifsUX: record.get('Points Négatifs UX'),
      recommandationsUX: record.get('Recommandations UX'),
      noteUX: record.get('Note UX'),
      
      // Réseaux sociaux
      facebookPresent: record.get('Facebook Présent'),
      instagramPresent: record.get('Instagram Présent'),
      linkedinPresent: record.get('LinkedIn Présent'),
      googleMyBusiness: record.get('Google My Business'),
      analyseReseauxSociaux: record.get('Analyse Réseaux Sociaux'),
      noteReseauxSociaux: record.get('Note Réseaux Sociaux'),
      
      // Concurrence
      concurrentsAnalyses: record.get('Concurrents Analysés'),
      positionMarche: record.get('Position Marché'),
      avantagesConcurrentiels: record.get('Avantages Concurrentiels'),
      
      // Plan d'action
      top3ActionsImmediates: record.get('Top 3 Actions Immédiates'),
      actionsCourtTerme: record.get('Actions Court Terme'),
      actionsMoyenTerme: record.get('Actions Moyen Terme'),
      actionsLongTerme: record.get('Actions Long Terme'),
      
      // Recommandations Digiqo
      servicesRecommandes: record.get('Services Recommandés'),
      budgetEstime: record.get('Budget Estimé'),
      roiAttendu: record.get('ROI Attendu'),
      
      // Scores
      scoreGlobal: record.get('Score Global'),
      scoreContenu: record.get('Score Contenu'),
      scoreSEO: record.get('Score SEO'),
      scoreTechnique: record.get('Score Technique'),
      scoreUX: record.get('Score UX'),
      scoreLegal: record.get('Score Légal'),
      scoreReseauxSociaux: record.get('Score Réseaux Sociaux'),
    };
    
    res.status(200).json(auditData);
  } catch (error) {
    console.error('Error fetching audit:', error);
    res.status(404).json({ error: 'Audit not found' });
  }
}