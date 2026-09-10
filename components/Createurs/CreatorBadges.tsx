import { Crown, Sparkles, Star } from 'lucide-react'
import { CATEGORY_LABELS, LEVEL_LABELS } from '@/lib/createurs/types'
import type { CreatorCategory, CreatorLevel } from '@/lib/createurs/types'

// ──────────────────────────────────────────────
// PASTILLES NIVEAU / CATÉGORIE
// Niveau et catégorie viennent d'Airtable (calculés par n8n). Les styles vivent
// ici et nulle part ailleurs : la carte de grille, la pile swipe, le panneau
// détail et la fiche doivent afficher exactement la même chose.
// ──────────────────────────────────────────────

const LEVEL_STYLES: Record<CreatorLevel, string> = {
  top: 'border-[#C9A227] bg-[#FCF8EC] text-[#8A6D12]',
  confirme: 'border-[#111111] bg-[#111111] text-white',
  nouveau: 'border-gray-200 bg-gray-50 text-gray-600',
}

const LEVEL_ICONS: Record<CreatorLevel, typeof Crown> = {
  top: Crown,
  confirme: Sparkles,
  nouveau: Star,
}

/** Le niveau « Nouveau » n'est pas une distinction : on ne l'affiche pas en badge. */
export const LevelBadge = ({ niveau, className = '' }: { niveau: CreatorLevel; className?: string }) => {
  if (niveau === 'nouveau') return null
  const Icon = LEVEL_ICONS[niveau]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${LEVEL_STYLES[niveau]} ${className}`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {LEVEL_LABELS[niveau]}
    </span>
  )
}

/** `compact` aligne la pastille sur la taille des chips de niche de la carte de grille. */
export const CategoryPill = ({
  categorie,
  compact = false,
  className = '',
}: {
  categorie: CreatorCategory
  compact?: boolean
  className?: string
}) => (
  <span
    className={`inline-flex items-center rounded-full border border-gray-200 bg-white font-semibold text-gray-700 ${
      compact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-[11px]'
    } ${className}`}
  >
    {CATEGORY_LABELS[categorie]}
  </span>
)

// ──────────────────────────────────────────────
// BORDURE DE CARTE
// La hiérarchie se lit d'abord au bord de la carte : doré pour les profils Top,
// noir pour les Confirmés, gris clair — l'état actuel — pour les Nouveaux.
// Rien d'autre ne change : ni animation, ni géométrie, ni swipe.
// ──────────────────────────────────────────────

const LEVEL_BORDERS: Record<CreatorLevel, string> = {
  top: 'border-2 border-[#C9A227]',
  confirme: 'border-2 border-[#111111]',
  nouveau: 'border border-gray-200',
}

export const levelBorder = (niveau: CreatorLevel): string => LEVEL_BORDERS[niveau]
