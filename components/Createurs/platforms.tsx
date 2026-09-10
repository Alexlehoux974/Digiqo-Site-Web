import { Instagram, Youtube } from 'lucide-react'
import type { ReactNode } from 'react'
import { TikTokIcon } from './TikTokIcon'
import type { Influencer, PlatformStats } from '@/lib/createurs/types'

// Les plateformes réellement renseignées d'une créatrice, dans un ordre stable.
// Partagé par le panneau détail et la fiche publique : ajouter une plateforme
// (YouTube hier, autre chose demain) se fait ici, une seule fois.
export interface PlatformView {
  key: 'instagram' | 'tiktok' | 'youtube'
  label: string
  icon: ReactNode
  stats: PlatformStats
}

export const platformsOf = (creator: Influencer): PlatformView[] => {
  const views: PlatformView[] = []
  if (creator.instagram.url) {
    views.push({
      key: 'instagram',
      label: 'Instagram',
      icon: <Instagram className="h-4 w-4" aria-hidden="true" />,
      stats: creator.instagram,
    })
  }
  if (creator.tiktok.url) {
    views.push({ key: 'tiktok', label: 'TikTok', icon: <TikTokIcon className="h-4 w-4" />, stats: creator.tiktok })
  }
  if (creator.youtube?.url) {
    views.push({
      key: 'youtube',
      label: 'YouTube',
      icon: <Youtube className="h-4 w-4" aria-hidden="true" />,
      stats: creator.youtube,
    })
  }
  return views
}
