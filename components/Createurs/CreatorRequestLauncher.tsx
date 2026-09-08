import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { CreatorRequestPanel } from './CreatorRequestPanel'
import { useIsDesktop } from '@/lib/createurs/use-is-desktop'
import { DEMANDE_PATHNAME, demandeHref, parseHandlesParam } from '@/lib/createurs/demande'

// ──────────────────────────────────────────────
// Ouverture de la demande de créateur depuis la page /createurs.
// Composant sans rendu propre : il suffit de le monter une fois sur la page.
//
// Les CTA restent de vrais liens `<a href="/createurs/demande?createurs=…">` :
// partageables, ouvrables dans un nouvel onglet, et fonctionnels sans JS.
// Ce provider les intercepte au clic pour choisir le rendu :
//   • desktop → panneau latéral par-dessus la page, URL masquée par `as`
//   • mobile  → page pleine (router.push)
// L'interception se fait au niveau du document plutôt que par des props :
// elle couvre ainsi aussi le CTA du hero, rendu par ServiceHero, qu'on ne
// doit pas modifier.
// ──────────────────────────────────────────────

const isPlainLeftClick = (e: MouseEvent): boolean =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.defaultPrevented

export const CreatorRequestLauncher = () => {
  const router = useRouter()
  const isDesktop = useIsDesktop()
  // null = panneau fermé.
  const [handles, setHandles] = useState<string[] | null>(null)

  // Lus dans le gestionnaire de clic sans le ré-abonner à chaque rendu.
  const isDesktopRef = useRef(isDesktop)
  isDesktopRef.current = isDesktop
  const routerRef = useRef(router)
  routerRef.current = router

  const openPanel = useCallback((next: string[]) => {
    setHandles(next)
    // Masquage d'URL : la page /createurs reste montée (shallow), l'adresse
    // affichée devient /createurs/demande?createurs=… — partageable, et un
    // rechargement charge la vraie page pleine.
    routerRef.current.push(
      { pathname: routerRef.current.pathname, query: routerRef.current.query },
      demandeHref(next),
      { shallow: true, scroll: false },
    )
  }, [])

  const closePanel = useCallback(() => {
    setHandles(null)
    if (routerRef.current.asPath.split('?')[0] === DEMANDE_PATHNAME) routerRef.current.back()
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!isPlainLeftClick(e)) return
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank') return

      const raw = anchor.getAttribute('href') || ''
      if (!raw.startsWith(DEMANDE_PATHNAME)) return
      const url = new URL(raw, window.location.origin)
      if (url.pathname !== DEMANDE_PATHNAME) return

      const next = parseHandlesParam(url.searchParams.get('createurs'))
      e.preventDefault()
      if (isDesktopRef.current === true) {
        openPanel(next)
      } else {
        // Mobile (ou largeur pas encore mesurée) : page pleine, en navigation client.
        routerRef.current.push(demandeHref(next))
      }
    }

    // Phase de capture : le CTA de la fiche appelle stopPropagation() pour ne pas
    // déclencher l'ouverture du panneau de détail — en bulle, le clic ne
    // remonterait jamais jusqu'ici.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [openPanel])

  // Retour / avance navigateur : l'URL fait foi.
  useEffect(() => {
    const [path, query = ''] = router.asPath.split('?')
    if (path !== DEMANDE_PATHNAME) {
      setHandles((prev) => (prev === null ? prev : null))
      return
    }
    const fromUrl = parseHandlesParam(new URLSearchParams(query).get('createurs'))
    setHandles((prev) => (prev !== null ? prev : fromUrl))
  }, [router.asPath])

  return <CreatorRequestPanel open={handles !== null} handles={handles ?? []} onClose={closePanel} />
}
