// Propagation du gclid Google Ads vers la page de conversion /merci.
//
// Problème résolu : le hit conversion (AW-18002905491) fire bien sur /merci
// mais sans gclid, car router.push('/merci') ne propage pas le paramètre de
// l'URL d'atterrissage et le Consent Mode (denied par défaut) empêche
// l'écriture du cookie _gcl_aw. On stocke donc le gclid en sessionStorage à
// l'arrivée, puis on le ré-injecte dans l'URL de /merci pour que le tag Google
// Ads puisse l'attacher à l'event de conversion (attribution).

const GCLID_KEY = '_jc_gclid'

/**
 * Capture le gclid présent dans l'URL courante et le persiste en
 * sessionStorage. À appeler à chaque changement de route (cf. pages/_app.tsx).
 */
export function captureGclid(): void {
  if (typeof window === 'undefined') return
  const gclid = new URLSearchParams(window.location.search).get('gclid')
  if (gclid) {
    sessionStorage.setItem(GCLID_KEY, gclid)
  }
}

/**
 * Retourne l'URL de la page de remerciement, avec le gclid stocké si présent.
 * Utilisé par tous les formulaires en remplacement de router.push('/merci').
 */
export function getMerciHref(): string {
  if (typeof window === 'undefined') return '/merci'
  const gclid = sessionStorage.getItem(GCLID_KEY)
  return gclid ? `/merci?gclid=${encodeURIComponent(gclid)}` : '/merci'
}
