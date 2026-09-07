import { Heart } from 'lucide-react'
import { hasEngagement } from '@/lib/createurs/helpers'

// Une ligne compacte par plateforme : icône + abonnés + engagement.
// La partie engagement disparaît si la valeur n'est pas chiffrée (« À définir »).
// Partagée entre la fiche de grille et la carte de la pile swipe.
export const PlatformRow = ({
  icon,
  label,
  followers,
  engagement,
}: {
  icon: React.ReactNode
  label: string
  followers: string
  engagement: string
}) => (
  <div className="flex items-center gap-2 text-[13px]">
    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-gray-700" aria-hidden="true">
      {icon}
    </span>
    <span className="sr-only">{label}</span>
    <span className="font-bold text-gray-900">{followers}</span>
    <span className="text-[11px] text-gray-400">abonnés</span>
    {hasEngagement(engagement) && (
      <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600">
        <Heart className="h-3 w-3 flex-shrink-0 text-gray-400" aria-hidden="true" />
        {engagement}
      </span>
    )}
  </div>
)
