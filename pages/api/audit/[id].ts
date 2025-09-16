import { NextApiRequest, NextApiResponse } from 'next';

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

  // Variables d'environnement
  const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9';
  const AIRTABLE_TABLE_ID = 'tblUeG59DpymKc9Tx'; // ID de la table "Audits Clients"

  if (!AIRTABLE_PAT) {
    console.error('AIRTABLE_PAT not configured');
    return res.status(500).json({ error: 'Configuration error' });
  }

  try {
    // Appel direct à l'API Airtable
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${id}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Audit not found' });
      }
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const record = await response.json();
    const fields = record.fields || {};

    const auditData = {
      id: record.id,
      entreprise: fields['Nom Entreprise'],
      siteWeb: fields['Site Web'],
      dateAudit: fields['Date Audit'],
      auditeur: fields['Auditeur'],
      verdictGlobal: fields['Verdict Global'],
      statutAudit: fields['Statut Audit'],

      // Résumé exécutif
      resumeVerdict: fields['Résumé Verdict'],
      pointsCles: fields['Points Clés'],

      // Contenu
      pointsPositifsContenu: fields['Points Positifs Contenu'],
      pointsAmeliorationContenu: fields['Points Amélioration Contenu'],
      noteContenu: fields['Note Contenu'],

      // SEO
      pointsCritiquesSEO: fields['Points Critiques SEO'],
      recommandationsSEO: fields['Recommandations SEO'],
      noteSEO: fields['Note SEO'],

      // RGPD
      conformiteRGPD: fields['Conformité RGPD'],
      violationsIdentifiees: fields['Violations Identifiées'],
      risquesEncourus: fields['Risques Encourus'],
      actionsObligatoires: fields['Actions Obligatoires'],

      // Performance
      vitesseDesktop: fields['Vitesse Desktop'],
      vitesseMobile: fields['Vitesse Mobile'],
      pointsAmeliorationPerformance: fields['Points Amélioration Performance'],
      notePerformance: fields['Note Performance'],

      // UX
      pointsPositifsUX: fields['Points Positifs UX'],
      pointsNegatifsUX: fields['Points Négatifs UX'],
      recommandationsUX: fields['Recommandations UX'],
      noteUX: fields['Note UX'],

      // Réseaux sociaux
      facebookPresent: fields['Facebook Présent'],
      instagramPresent: fields['Instagram Présent'],
      linkedinPresent: fields['LinkedIn Présent'],
      googleMyBusiness: fields['Google My Business'],
      analyseReseauxSociaux: fields['Analyse Réseaux Sociaux'],
      noteReseauxSociaux: fields['Note Réseaux Sociaux'],

      // Concurrence
      concurrentsAnalyses: fields['Concurrents Analysés'],
      positionMarche: fields['Position Marché'],
      avantagesConcurrentiels: fields['Avantages Concurrentiels'],

      // Plan d'action
      top3ActionsImmediates: fields['Top 3 Actions Immédiates'],
      actionsCourtTerme: fields['Actions Court Terme'],
      actionsMoyenTerme: fields['Actions Moyen Terme'],
      actionsLongTerme: fields['Actions Long Terme'],

      // Recommandations Digiqo
      servicesRecommandes: fields['Services Recommandés'],
      budgetEstime: fields['Budget Estimé'],
      roiAttendu: fields['ROI Attendu'],

      // Scores
      scoreGlobal: fields['Score Global'],
      scoreContenu: fields['Score Contenu'],
      scoreSEO: fields['Score SEO'],
      scoreTechnique: fields['Score Technique'],
      scoreUX: fields['Score UX'],
      scoreLegal: fields['Score Légal'],
      scoreReseauxSociaux: fields['Score Réseaux Sociaux'],
    };

    // Cache la réponse pendant 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json(auditData);
  } catch (error) {
    console.error('Error fetching audit:', error);
    res.status(500).json({ error: 'Failed to fetch audit' });
  }
}