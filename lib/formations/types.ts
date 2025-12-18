// Formation data structure for Digicademy
export interface VideoContent {
  placeholder: string // Placeholder text for video
  youtubeId?: string // YouTube video ID
  googleDriveId?: string // Google Drive video ID
  duration?: string // Video duration
}

export interface ModuleContent {
  id: string
  title: string
  description?: string
  content: string[] // Array of paragraphs
  video?: VideoContent
  keyPoints?: string[] // Key takeaways or important points
}

export interface Formation {
  id: string
  slug: string
  title: string
  category: 'publicite' | 'sites-web' | 'community' | 'identite'
  description: string
  duration: string
  level: 'Débutant' | 'Intermédiaire' | 'Avancé'
  instructor?: string
  price?: string
  keywords?: string[] // Mots-clés pour améliorer la recherche
  introduction: {
    title: string
    content: string[]
    objectives?: string[]
  }
  modules: ModuleContent[]
  conclusion?: {
    title: string
    content: string[]
  }
  certification?: boolean
  nextSteps?: string[]
}
