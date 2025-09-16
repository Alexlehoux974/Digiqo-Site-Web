import { NextApiRequest, NextApiResponse } from 'next'

// Types pour les données Airtable
export interface AirtableAttachment {
  id: string
  url: string
  filename: string
  size: number
  type: string
  width?: number
  height?: number
  thumbnails?: {
    small?: { url: string; width: number; height: number }
    large?: { url: string; width: number; height: number }
    full?: { url: string; width: number; height: number }
  }
}

export interface AirtableAuditPDF {
  id: string
  fields: {
    // Informations de base
    "Nom entreprise"?: string
    "Site web"?: string
    "Date audit"?: string
    "Auditeur"?: string
    "Verdict global"?: string

    // Scores (6 scores)
    "Score global"?: number
    "Score contenu"?: number
    "Score SEO"?: number
    "Score technique"?: number
    "Score UX"?: number
    "Score légal"?: number

    // Analyse contenu
    "Points positifs contenu"?: string
    "Points amélioration contenu"?: string

    // Analyse SEO
    "Points critiques SEO"?: string
    "Recommandations SEO prioritaires"?: string

    // RGPD (4 champs)
    "Statut conformité RGPD"?: string
    "Violations RGPD identifiées"?: string
    "Risques encourus"?: string
    "Actions obligatoires immédiates"?: string

    // Accessibilité RGAA (3 champs)
    "Conformité RGAA"?: string
    "Tests recommandés accessibilité"?: string
    "Actions suggérées accessibilité"?: string

    // Performance
    "Éléments à tester performance"?: string
    "Recommandations techniques"?: string

    // UX
    "Points positifs UX"?: string
    "Améliorations UX"?: string

    // Présence en ligne
    "Présence en ligne recommandée"?: string

    // Plan d'action (3 champs)
    "Actions URGENT 0-15 jours"?: string
    "Actions COURT TERME 1-3 mois"?: string
    "Actions MOYEN TERME 3-6 mois"?: string

    // Budget (2 champs)
    "Budget mise en conformité"?: string
    "Budget refonte complète"?: string

    // Conclusions (2 champs)
    "Conclusion"?: string
    "Recommandation principale"?: string

    // URL de l'audit
    "URL Audit"?: string
    "URL PDF"?: AirtableAttachment[] // Champ legacy pour compatibilité
  }
  createdTime?: string
}

export interface FormattedAuditPDF {
  id: string
  // Informations de base
  entreprise: string
  siteWeb?: string
  dateAudit: string
  auditeur?: string
  verdictGlobal?: string

  // Scores
  scoreGlobal?: number
  scoreContenu?: number
  scoreSEO?: number
  scoreTechnique?: number
  scoreUX?: number
  scoreLegal?: number

  // Analyse contenu
  pointsPositifsContenu?: string
  pointsAmeliorationContenu?: string

  // Analyse SEO
  pointsCritiquesSEO?: string
  recommandationsSEOPrioritaires?: string

  // RGPD
  statutConformiteRGPD?: string
  violationsRGPDIdentifiees?: string
  risquesEncourus?: string
  actionsObligatoiresImmediates?: string

  // Accessibilité RGAA
  conformiteRGAA?: string
  testsRecommandesAccessibilite?: string
  actionsSuggereesAccessibilite?: string

  // Performance
  elementsATesterPerformance?: string
  recommandationsTechniques?: string

  // UX
  pointsPositifsUX?: string
  ameliorationsUX?: string

  // Présence en ligne
  presenceEnLigneRecommandee?: string

  // Plan d'action
  actionsURGENT0_15jours?: string
  actionsCOURTTERME1_3mois?: string
  actionsMOYENTERME3_6mois?: string

  // Budget
  budgetMiseEnConformite?: string
  budgetRefonteComplete?: string

  // Conclusions
  conclusion?: string
  recommandationPrincipale?: string

  // URLs
  urlAudit?: string
  pdfUrl?: string // Legacy pour compatibilité
  pdfFilename?: string // Legacy pour compatibilité
  dateCreation: string
}

// Fonction pour formater les audits PDF
function formatAuditPDF(record: AirtableAuditPDF): FormattedAuditPDF {
  const fields = record.fields

  // Extraire l'URL du PDF depuis le tableau d'attachments (legacy)
  let pdfUrl: string | undefined = undefined
  let pdfFilename: string | undefined = undefined
  if (fields["URL PDF"] && Array.isArray(fields["URL PDF"]) && fields["URL PDF"].length > 0) {
    pdfUrl = fields["URL PDF"][0].url
    pdfFilename = fields["URL PDF"][0].filename
  }

  return {
    id: record.id,
    // Informations de base
    entreprise: fields["Nom entreprise"] || "Entreprise inconnue",
    siteWeb: fields["Site web"],
    dateAudit: fields["Date audit"] || record.createdTime || new Date().toISOString(),
    auditeur: fields["Auditeur"],
    verdictGlobal: fields["Verdict global"],

    // Scores
    scoreGlobal: fields["Score global"],
    scoreContenu: fields["Score contenu"],
    scoreSEO: fields["Score SEO"],
    scoreTechnique: fields["Score technique"],
    scoreUX: fields["Score UX"],
    scoreLegal: fields["Score légal"],

    // Analyse contenu
    pointsPositifsContenu: fields["Points positifs contenu"],
    pointsAmeliorationContenu: fields["Points amélioration contenu"],

    // Analyse SEO
    pointsCritiquesSEO: fields["Points critiques SEO"],
    recommandationsSEOPrioritaires: fields["Recommandations SEO prioritaires"],

    // RGPD
    statutConformiteRGPD: fields["Statut conformité RGPD"],
    violationsRGPDIdentifiees: fields["Violations RGPD identifiées"],
    risquesEncourus: fields["Risques encourus"],
    actionsObligatoiresImmediates: fields["Actions obligatoires immédiates"],

    // Accessibilité RGAA
    conformiteRGAA: fields["Conformité RGAA"],
    testsRecommandesAccessibilite: fields["Tests recommandés accessibilité"],
    actionsSuggereesAccessibilite: fields["Actions suggérées accessibilité"],

    // Performance
    elementsATesterPerformance: fields["Éléments à tester performance"],
    recommandationsTechniques: fields["Recommandations techniques"],

    // UX
    pointsPositifsUX: fields["Points positifs UX"],
    ameliorationsUX: fields["Améliorations UX"],

    // Présence en ligne
    presenceEnLigneRecommandee: fields["Présence en ligne recommandée"],

    // Plan d'action
    actionsURGENT0_15jours: fields["Actions URGENT 0-15 jours"],
    actionsCOURTTERME1_3mois: fields["Actions COURT TERME 1-3 mois"],
    actionsMOYENTERME3_6mois: fields["Actions MOYEN TERME 3-6 mois"],

    // Budget
    budgetMiseEnConformite: fields["Budget mise en conformité"],
    budgetRefonteComplete: fields["Budget refonte complète"],

    // Conclusions
    conclusion: fields["Conclusion"],
    recommandationPrincipale: fields["Recommandation principale"],

    // URLs
    urlAudit: fields["URL Audit"],
    pdfUrl, // Legacy pour compatibilité
    pdfFilename, // Legacy pour compatibilité
    dateCreation: record.createdTime || new Date().toISOString()
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormattedAuditPDF[] | FormattedAuditPDF | { error: string }>
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Vérifier les variables d'environnement
  const AIRTABLE_PAT = process.env.AIRTABLE_PAT
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'
  const AIRTABLE_TABLE_ID = 'tblMceHOda6CpUrwx' // ID de la table "Audits PDF"

  // Si pas de token, renvoyer une erreur
  if (!AIRTABLE_PAT) {
    console.error('AIRTABLE_PAT not configured')
    return res.status(500).json({ error: 'Configuration error' })
  }

  try {
    // Si un ID est fourni en query, récupérer un audit spécifique
    const { id } = req.query

    if (id && typeof id === 'string') {
      // Récupérer un audit spécifique par ID
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${id}`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          return res.status(404).json({ error: 'Audit not found' })
        }
        throw new Error(`Airtable API error: ${response.status}`)
      }

      const record = await response.json() as AirtableAuditPDF
      const formattedAudit = formatAuditPDF(record)

      // Configurer les headers de cache
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')

      return res.status(200).json(formattedAudit)
    } else {
      // Récupérer tous les audits
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.status}`)
      }

      const data = await response.json()

      // Formater tous les enregistrements
      const audits = data.records
        .map((record: AirtableAuditPDF) => formatAuditPDF(record))

      // Configurer les headers de cache (5 minutes pour la liste)
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')

      return res.status(200).json(audits)
    }

  } catch (error) {
    console.error('Error fetching audits from Airtable:', error)

    // En cas d'erreur, renvoyer un message d'erreur
    return res.status(500).json({ error: 'Failed to fetch audits' })
  }
}