import { Heart } from 'lucide-react'
import { SMALL_AUDIENCE_TITLE, displayedEngagement } from '@/lib/createurs/helpers'
import type { PlatformStats } from '@/lib/createurs/types'

// Une ligne compacte par plateforme : icône + abonnés + engagement.
// Le taux n'est chiffré que s'il est renseigné ET adossé à au moins 500 abonnés ;
// en dessous on affiche « — », qui dit « pas de chiffre fiable » sans faire croire
// à un taux nul. Partagée entre la fiche de grille et la carte de la pile swipe.
export const PlatformRow = ({
  icon,
  label,
  stats,
}: {
  icon: React.ReactNode
  label: string
  stats: PlatformStats
}) => {
  const engagement = displayedEngagement(stats)

  return (
    <div className="flex items-center gap-2 text-[13px]">
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-gray-700" aria-hidden="true">
        {icon}
      </span>
      <span className="sr-only">{label}</span>
      <span className="font-bold text-gray-900">{stats.followers}</span>
      <span className="text-[11px] text-gray-400">abonnés</span>
      {engagement ? (
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-gray-600">
          <Heart className="h-3 w-3 flex-shrink-0 text-gray-400" aria-hidden="true" />
          {engagement}
        </span>
      ) : (
        <span
          title={SMALL_AUDIENCE_TITLE}
          className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400"
        >
          <Heart className="h-3 w-3 flex-shrink-0 text-gray-300" aria-hidden="true" />
          —
        </span>
      )}
    </div>
  )
}
