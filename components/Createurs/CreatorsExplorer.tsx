import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, LazyMotion, domMax } from 'framer-motion'
import { LayoutGrid, Layers } from 'lucide-react'
import { CreatorCard } from './CreatorCard'
import { CreatorDetailPanel } from './CreatorDetailPanel'
import { CreatorFilters } from './CreatorFilters'
import { JoinCard } from './JoinCard'
import { SelectionBar } from './SelectionBar'
import { SwipeDeck } from './SwipeDeck'
import type { CreatorFilters as Filters, Influencer } from '@/lib/createurs/types'
import { DEFAULT_FILTERS, ZONES } from '@/lib/createurs/types'
import { collectNiches, collectZones } from '@/lib/createurs/helpers'
import { applyFilters, filtersFromQuery, filtersToQuery } from '@/lib/createurs/filters'
import { useIsDesktop } from '@/lib/createurs/use-is-desktop'

type MobileView = 'swipe' | 'liste'

const MemoFilters = memo(CreatorFilters)
const MemoDeck = memo(SwipeDeck)

export const CreatorsExplorer = ({ creators, joinHref }: { creators: Influencer[]; joinHref: string }) => {
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [selection, setSelection] = useState<Influencer[]>([])
  const [openInfluencer, setOpenInfluencer] = useState<Influencer | null>(null)
  const [mobileView, setMobileView] = useState<MobileView>('swipe')
  const isDesktop = useIsDesktop()

  const niches = useMemo(() => collectNiches(creators), [creators])
  const zones = useMemo(() => collectZones(creators, ZONES), [creators])

  // L'état initial reste le défaut au premier rendu (SSR) puis se synchronise
  // depuis l'URL une fois le router prêt : évite tout écart d'hydratation.
  useEffect(() => {
    if (!router.isReady) return
    setFilters(filtersFromQuery(router.query, niches))
    // Volontairement limité au montage : les changements suivants viennent de l'UI.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const updateFilters = useCallback(
    (next: Filters) => {
      setFilters(next)
      const query = filtersToQuery(next)
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true, scroll: false })
    },
    [router],
  )

  const reset = useCallback(() => updateFilters(DEFAULT_FILTERS), [updateFilters])

  const filtered = useMemo(() => applyFilters(creators, filters), [creators, filters])

  const addToSelection = useCallback((influencer: Influencer) => {
    setSelection((prev) => (prev.some((c) => c.handle === influencer.handle) ? prev : [...prev, influencer]))
  }, [])

  const removeFromSelection = useCallback((handle: string) => {
    setSelection((prev) => prev.filter((c) => c.handle !== handle))
  }, [])

  const joinCard = useMemo(
    () => <JoinCard index={filtered.length} href={joinHref} />,
    [filtered.length, joinHref],
  )

  return (
    // domMax (et non le domAnimation global de _app) : nécessaire aux animations
    // `layout` de la grille. Chargé uniquement sur cette page.
    <LazyMotion features={domMax} strict={false}>
      <div className="flex flex-col gap-6">
        <MemoFilters
          filters={filters}
          onChange={updateFilters}
          onReset={reset}
          niches={niches}
          zones={zones}
          resultCount={filtered.length}
        />

        {/* ── MOBILE : pile swipe ou liste ── */}
        {isDesktop !== true && (
        <div className="md:hidden">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex rounded-full bg-gray-100 p-1" role="group" aria-label="Mode d'affichage">
              {(['swipe', 'liste'] as MobileView[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMobileView(v)}
                  aria-pressed={mobileView === v}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    mobileView === v ? 'bg-[#111111] text-white' : 'text-gray-600'
                  }`}
                >
                  {v === 'swipe' ? <Layers className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
                  {v === 'swipe' ? 'Swipe' : 'Vue liste'}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
              Aucun créateur ne correspond à ces filtres.
            </p>
          ) : mobileView === 'swipe' ? (
            <MemoDeck
              key={filtered.map((c) => c.handle).join('|')}
              creators={filtered}
              onSelect={addToSelection}
              onOpen={setOpenInfluencer}
              onExhausted={joinCard}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((c, i) => (
                  <CreatorCard key={c.handle} influencer={c} index={i} onOpen={setOpenInfluencer} />
                ))}
              </AnimatePresence>
              {joinCard}
            </div>
          )}

          <SelectionBar
            selection={selection}
            onRemove={removeFromSelection}
            onClear={() => setSelection([])}
          />
        </div>
        )}

        {/* ── DESKTOP : grille compacte ── */}
        {isDesktop !== false && (
        <div className="hidden md:block">
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-500">
              Aucun créateur ne correspond à ces filtres.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((c, i) => (
                  <CreatorCard key={c.handle} influencer={c} index={i} onOpen={setOpenInfluencer} />
                ))}
              </AnimatePresence>
              {joinCard}
            </div>
          )}
        </div>
        )}

        <CreatorDetailPanel influencer={openInfluencer} onClose={() => setOpenInfluencer(null)} />
      </div>
    </LazyMotion>
  )
}
