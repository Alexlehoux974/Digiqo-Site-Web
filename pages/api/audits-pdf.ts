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
    "Nom entreprise"?: string
    "Site web"?: string
    "Date audit"?: string
    "Auditeur"?: string
    "Verdict global"?: string
    "Score global"?: number
    "Score contenu"?: number
    "Score SEO"?: number
    "Score technique"?: number
    "Score UX"?: number
    "Score légal"?: number
    "Points positifs contenu"?: string
    "Points amélioration contenu"?: string
    "Points critiques SEO"?: string
    "URL PDF"?: AirtableAttachment[]
  }
  createdTime?: string
}

export interface FormattedAuditPDF {
  id: string
  entreprise: string
  siteWeb?: string
  dateAudit: string
  auditeur?: string
  verdictGlobal?: string
  scoreGlobal?: number
  scoreContenu?: number
  scoreSEO?: number
  scoreTechnique?: number
  scoreUX?: number
  scoreLegal?: number
  pointsPositifsContenu?: string
  pointsAmeliorationContenu?: string
  pointsCritiquesSEO?: string
  pdfUrl?: string
  pdfFilename?: string
  dateCreation: string
}

// Fonction pour formater les audits PDF
function formatAuditPDF(record: AirtableAuditPDF): FormattedAuditPDF {
  const fields = record.fields

  // Extraire l'URL du PDF depuis le tableau d'attachments
  let pdfUrl: string | undefined = undefined
  let pdfFilename: string | undefined = undefined
  if (fields["URL PDF"] && Array.isArray(fields["URL PDF"]) && fields["URL PDF"].length > 0) {
    pdfUrl = fields["URL PDF"][0].url
    pdfFilename = fields["URL PDF"][0].filename
  }

  return {
    id: record.id,
    entreprise: fields["Nom entreprise"] || "Entreprise inconnue",
    siteWeb: fields["Site web"],
    dateAudit: fields["Date audit"] || record.createdTime || new Date().toISOString(),
    auditeur: fields["Auditeur"],
    verdictGlobal: fields["Verdict global"],
    scoreGlobal: fields["Score global"],
    scoreContenu: fields["Score contenu"],
    scoreSEO: fields["Score SEO"],
    scoreTechnique: fields["Score technique"],
    scoreUX: fields["Score UX"],
    scoreLegal: fields["Score légal"],
    pointsPositifsContenu: fields["Points positifs contenu"],
    pointsAmeliorationContenu: fields["Points amélioration contenu"],
    pointsCritiquesSEO: fields["Points critiques SEO"],
    pdfUrl,
    pdfFilename,
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