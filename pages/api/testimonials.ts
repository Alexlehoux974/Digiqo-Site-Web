import { NextApiRequest, NextApiResponse } from 'next'

// Types pour les données Airtable
export interface AirtableTestimonial {
  id: string
  fields: {
    "Nom d'entreprise"?: string
    "Vidéos"?: string
    "Témoignage écrit"?: string
    "Url Image"?: string
    "Date de création"?: string
  }
}

export interface FormattedTestimonial {
  id: string
  username: string
  content: string
  videoUrl?: string
  thumbnail?: string
  likes: number
  comments: number
  isVideo: boolean
  publishedAt: string
}

// Cette API renvoie uniquement les témoignages présents dans Airtable
// Pas de fallback - si Airtable n'a pas de données, on renvoie un tableau vide

// Fonction pour formater le nom d'entreprise en username Instagram
function formatUsername(companyName: string): string {
  // Nettoyer et formater le nom d'entreprise en username Instagram
  const cleaned = companyName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
  
  return `@${cleaned || 'client'}`
}

// Fonction pour calculer le temps relatif
function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return "Aujourd'hui"
  if (diffInDays === 1) return "Hier"
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`
  if (diffInDays < 14) return "Il y a 1 semaine"
  if (diffInDays < 21) return "Il y a 2 semaines"
  if (diffInDays < 28) return "Il y a 3 semaines"
  if (diffInDays < 60) return "Il y a 1 mois"
  return `Il y a ${Math.floor(diffInDays / 30)} mois`
}

// Fonction pour formater les témoignages Airtable
function formatTestimonial(record: AirtableTestimonial, index: number): FormattedTestimonial {
  const fields = record.fields
  
  // Générer des valeurs aléatoires mais cohérentes pour likes et comments
  const baseLikes = 150 + (index * 23) % 100
  const baseComments = 10 + (index * 7) % 30
  
  return {
    id: record.id,
    username: fields["Nom d'entreprise"] ? formatUsername(fields["Nom d'entreprise"]) : `@client_${index + 1}`,
    content: fields["Témoignage écrit"] || "Merci pour cette excellente collaboration avec Digiqo!",
    videoUrl: fields["Vidéos"] || undefined,
    thumbnail: fields["Url Image"] || undefined, // Utilise uniquement l'URL d'Airtable
    likes: baseLikes,
    comments: baseComments,
    isVideo: !!fields["Vidéos"],
    publishedAt: fields["Date de création"] ? getRelativeTime(fields["Date de création"]) : "Récemment"
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormattedTestimonial[] | { error: string }>
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Vérifier les variables d'environnement
  const AIRTABLE_PAT = process.env.AIRTABLE_PAT
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || 'tbloGgkShulfnYDCw'

  // Si pas de token, renvoyer un tableau vide
  if (!AIRTABLE_PAT) {
    console.warn('AIRTABLE_PAT not configured, returning empty array')
    return res.status(200).json([])
  }

  try {
    // Construire l'URL de l'API Airtable
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`
    
    // Faire la requête à Airtable
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json',
      },
      // Cache pour 1 heure
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Filtrer et formater les enregistrements
    const testimonials = data.records
      .filter((record: AirtableTestimonial) => {
        // Filtrer uniquement les enregistrements avec au moins un nom d'entreprise
        return record.fields["Nom d'entreprise"]
      })
      .map((record: AirtableTestimonial, index: number) => formatTestimonial(record, index))
      // Pas de limite - on renvoie tous les témoignages d'Airtable

    // Si aucun témoignage, renvoyer un tableau vide
    if (testimonials.length === 0) {
      console.warn('No testimonials found in Airtable')
      return res.status(200).json([])
    }

    // Configurer les headers de cache
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    
    return res.status(200).json(testimonials)
    
  } catch (error) {
    console.error('Error fetching testimonials from Airtable:', error)
    
    // En cas d'erreur, renvoyer un tableau vide
    return res.status(200).json([])
  }
}