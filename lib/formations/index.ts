// Types exports
export type { VideoContent, ModuleContent, Formation } from './types'

// Google Ads formation - split into 10 separate module files for easier editing
export { formationGoogleAds } from './google-ads'
export {
  module1 as googleAdsModule1,
  module2 as googleAdsModule2,
  module3 as googleAdsModule3,
  module4 as googleAdsModule4,
  module5 as googleAdsModule5,
  module6 as googleAdsModule6,
  module7 as googleAdsModule7,
  module8 as googleAdsModule8,
  module9 as googleAdsModule9,
  module10 as googleAdsModule10
} from './google-ads'

// Facebook 2025 formation - the active formation with quiz
export { formationFacebook2025 } from './facebook-2025'

// Combined formations array - all active formations
import { formationGoogleAds } from './google-ads'
import { formationFacebook2025 } from './facebook-2025'
import type { Formation } from './types'

export const formations: Formation[] = [formationFacebook2025, formationGoogleAds]

// Helper function to get a formation by its slug
export function getFormationBySlug(slug: string): Formation | undefined {
  return formations.find(f => f.slug === slug)
}

// Helper function to get formations by category
export function getFormationsByCategory(category: string): Formation[] {
  if (category === 'all') return formations
  return formations.filter(f => f.category === category)
}

// Helper function to search formations
export function searchFormations(query: string): Formation[] {
  const searchLower = query.toLowerCase()
  return formations.filter(f =>
    f.title.toLowerCase().includes(searchLower) ||
    f.description.toLowerCase().includes(searchLower) ||
    f.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
    f.modules.some(m =>
      m.title.toLowerCase().includes(searchLower) ||
      m.content.some(c => c.toLowerCase().includes(searchLower))
    )
  )
}
