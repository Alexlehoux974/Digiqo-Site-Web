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

// Données de fallback (les témoignages actuels)
const fallbackTestimonials: FormattedTestimonial[] = [
  {
    id: '1',
    username: '@romy.malbroukou',
    content: 'Un grand merci à @romy.malbroukou pour son incroyable retour sur notre collaboration! 🚀',
    videoUrl: 'https://www.instagram.com/reel/DFeyxS4NYLH/',
    thumbnail: '/partenaires/TITTY-CLUB-1024x1024.webp',
    likes: 234,
    comments: 18,
    isVideo: true,
    publishedAt: 'Il y a 3 jours'
  },
  {
    id: '2',
    username: '@lcda_reunion',
    content: 'Un grand merci à @lcda_reunion pour leur incroyable témoignage! Votre succès est notre réussite! 💪',
    videoUrl: 'https://www.instagram.com/reel/DFxEB8Mt6fi/',
    thumbnail: '/partenaires/LCDA_LOGO_FD-BLANC_14CM-1024x877.webp',
    likes: 156,
    comments: 12,
    isVideo: true,
    publishedAt: 'Il y a 5 jours'
  },
  {
    id: '3',
    username: '@restaurantcoteseine974',
    content: 'Un grand merci à Pascal du @restaurantcoteseine974 pour ce magnifique retour d\'expérience! 🌟',
    videoUrl: 'https://www.instagram.com/reel/DG7de1nAOdS/',
    thumbnail: '/partenaires/COTE-SEINE-1024x1024.webp',
    likes: 198,
    comments: 23,
    isVideo: true,
    publishedAt: 'Il y a 1 semaine'
  },
  {
    id: '4',
    username: '@bastien_levy',
    content: 'Un grand merci à @bastien_levy pour son incroyable témoignage sur notre collaboration! 🎯',
    videoUrl: 'https://www.instagram.com/reel/DGU2cC0NZQQ/',
    thumbnail: '/partenaires/PIZZA-STELLA-1024x1024.webp',
    likes: 245,
    comments: 31,
    isVideo: true,
    publishedAt: 'Il y a 1 semaine'
  },
  {
    id: '5',
    username: '@velocit.ai',
    content: 'Un grand merci à @velocit.ai pour son super témoignage! L\'innovation au service de votre croissance! 🚀',
    videoUrl: 'https://www.instagram.com/reel/DHdC0b-NVVB/',
    thumbnail: '/partenaires/BEAUVALLON-1024x1024.webp',
    likes: 167,
    comments: 14,
    isVideo: true,
    publishedAt: 'Il y a 2 semaines'
  },
  {
    id: '6',
    username: '@twinsdesign.974',
    content: 'Un grand merci à @twinsdesign.974 pour leur incroyable retour! La créativité au rendez-vous! 🎨',
    videoUrl: 'https://www.instagram.com/reel/DHvBvqttjXu/',
    thumbnail: '/partenaires/TWINS-DESIGN2-1024x1024.webp',
    likes: 189,
    comments: 19,
    isVideo: true,
    publishedAt: 'Il y a 2 semaines'
  },
  {
    id: '7',
    username: '@pizzeriafano',
    content: 'Un grand merci à @pizzeriafano pour leur incroyable témoignage! Votre succès nous inspire! 🍕',
    videoUrl: 'https://www.instagram.com/reel/DIlNm8wNiqn/',
    thumbnail: '/partenaires/NENETTES-1024x1024.webp',
    likes: 212,
    comments: 28,
    isVideo: true,
    publishedAt: 'Il y a 3 semaines'
  }
]

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
    thumbnail: fields["Url Image"] || `/partenaires/default-${(index % 7) + 1}.webp`,
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

  // Si pas de token, renvoyer les données de fallback
  if (!AIRTABLE_PAT) {
    console.warn('AIRTABLE_PAT not configured, using fallback testimonials')
    return res.status(200).json(fallbackTestimonials)
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
      .slice(0, 10) // Limiter à 10 témoignages maximum

    // Si aucun témoignage valide, renvoyer le fallback
    if (testimonials.length === 0) {
      console.warn('No valid testimonials found in Airtable, using fallback')
      return res.status(200).json(fallbackTestimonials)
    }

    // Configurer les headers de cache
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    
    return res.status(200).json(testimonials)
    
  } catch (error) {
    console.error('Error fetching testimonials from Airtable:', error)
    
    // En cas d'erreur, renvoyer les données de fallback
    return res.status(200).json(fallbackTestimonials)
  }
}