import { useEffect, useState } from 'react'

// `null` tant que le client n'a pas mesuré : le premier rendu (SSR et hydratation)
// affiche les deux vues comme avant, puis on ne garde que celle qui sert.
// Objectif perf : la grille desktop ne doit pas rester montée derrière la pile
// swipe sur mobile, sinon elle se re-rend à chaque sélection.
export const useIsDesktop = (query = '(min-width: 768px)'): boolean | null => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setIsDesktop(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return isDesktop
}
