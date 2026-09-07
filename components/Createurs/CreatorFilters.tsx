import { useState } from 'react'
import { ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react'
import type { CreatorFilters as Filters, FollowerBucket, PlatformFilter, SortKey, Zone } from '@/lib/createurs/types'
import { ENGAGEMENT_LABELS, FOLLOWER_LABELS, SORT_LABELS, countActiveFilters } from '@/lib/createurs/filters'

// Pastille unique — noir quand active, gris sinon. Pas de dégradé : une seule couleur d'accent.
const Pill = ({
  active,
  onClick,
  children,
  pressed,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  pressed?: boolean
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={pressed ?? active}
    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] ${
      active
        ? 'bg-[#111111] text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
    }`}
  >
    {children}
  </button>
)

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
    <span className="w-[92px] flex-shrink-0 text-[11px] font-bold uppercase tracking-wider text-gray-400">
      {label}
    </span>
    <div className="flex flex-wrap gap-1.5">{children}</div>
  </div>
)

interface Props {
  filters: Filters
  onChange: (next: Filters) => void
  onReset: () => void
  niches: string[]
  zones: Zone[]
  resultCount: number
}

export const CreatorFilters = ({ filters, onChange, onReset, niches, zones, resultCount }: Props) => {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value })

  const toggleInArray = <T extends string>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const activeCount = countActiveFilters(filters)
  // Sur mobile le bloc de filtres masquait toute la pile swipe : replié par défaut.
  // Toujours déployé à partir de md.
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className={`flex items-center justify-between gap-3 ${mobileOpen ? 'mb-4' : ''} md:mb-4`}>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="createurs-filtres"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 md:pointer-events-none"
        >
          <SlidersHorizontal className="h-4 w-4 text-gray-400" aria-hidden="true" />
          Filtrer
          {activeCount > 0 && (
            <span className="rounded-full bg-[#111111] px-2 py-0.5 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 md:hidden ${mobileOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        <div className="flex items-center gap-3">
          <span aria-live="polite" className="text-sm font-semibold text-gray-600">
            {resultCount} créateur{resultCount > 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Réinitialiser
          </button>
        </div>
      </div>

      <div id="createurs-filtres" className={`${mobileOpen ? 'flex' : 'hidden'} flex-col gap-3 md:flex`}>
        <Row label="Plateforme">
          {(['tous', 'instagram', 'tiktok'] as PlatformFilter[]).map((p) => (
            <Pill key={p} active={filters.platform === p} onClick={() => set('platform', p)}>
              {p === 'tous' ? 'Tous' : p === 'instagram' ? 'Instagram' : 'TikTok'}
            </Pill>
          ))}
        </Row>

        <Row label="Abonnés">
          {(['tous', 'lt1k', '1k10k', '10k50k', 'gt50k'] as FollowerBucket[]).map((b) => (
            <Pill key={b} active={filters.followers === b} onClick={() => set('followers', b)}>
              {FOLLOWER_LABELS[b]}
            </Pill>
          ))}
        </Row>

        <Row label="Engagement">
          {(['tous', '3', '5', '10'] as Filters['engagement'][]).map((e) => (
            <Pill key={e} active={filters.engagement === e} onClick={() => set('engagement', e)}>
              {ENGAGEMENT_LABELS[e]}
            </Pill>
          ))}
        </Row>

        {niches.length > 0 && (
          <Row label="Niche">
            {niches.map((n) => (
              <Pill
                key={n}
                active={filters.niches.includes(n)}
                onClick={() => set('niches', toggleInArray(filters.niches, n))}
              >
                {n}
              </Pill>
            ))}
          </Row>
        )}

        {zones.length > 0 && (
          <Row label="Zone">
            {zones.map((z) => (
              <Pill
                key={z}
                active={filters.zones.includes(z)}
                onClick={() => set('zones', toggleInArray(filters.zones, z))}
              >
                {z}
              </Pill>
            ))}
          </Row>
        )}

        <Row label="Trier par">
          {(['engagement', 'abonnes', 'az'] as SortKey[]).map((s) => (
            <Pill key={s} active={filters.sort === s} onClick={() => set('sort', s)}>
              {SORT_LABELS[s]}
            </Pill>
          ))}
        </Row>
      </div>
    </div>
  )
}
