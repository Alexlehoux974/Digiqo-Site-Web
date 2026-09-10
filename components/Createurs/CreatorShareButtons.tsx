import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

// ──────────────────────────────────────────────
// PARTAGE DE LA FICHE — pensé pour la créatrice elle-même : elle vient chercher
// ici le lien à coller dans sa bio ou sa story.
//
// `navigator.share` n'existe que sur mobile et en contexte sécurisé ; détecté
// après l'hydratation pour que le rendu serveur et le premier rendu client
// soient identiques. Sans lui, « Partager » se comporte comme « Copier ».
// ──────────────────────────────────────────────

const FEEDBACK_MS = 2000

/** `navigator.clipboard` est absent en HTTP et sur quelques navigateurs in-app : repli sur execCommand. */
const writeToClipboard = async (value: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // On tente le repli plutôt que d'échouer tout de suite.
  }
  try {
    const field = document.createElement('textarea')
    field.value = value
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(field)
    return ok
  } catch {
    return false
  }
}

export const CreatorShareButtons = ({ url, name }: { url: string; name: string }) => {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const [canShare, setCanShare] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
    return () => window.clearTimeout(timer.current)
  }, [])

  const copy = useCallback(async () => {
    const ok = await writeToClipboard(url)
    setCopied(ok)
    setFailed(!ok)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setCopied(false)
      setFailed(false)
    }, FEEDBACK_MS)
  }, [url])

  const share = useCallback(async () => {
    if (!canShare) {
      await copy()
      return
    }
    try {
      await navigator.share({ title: `${name} — Réseau Créateurs Digiqo`, url })
    } catch {
      // Partage annulé par la personne : rien à signaler, surtout pas une erreur.
    }
  }, [canShare, copy, name, url])

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <h2 className="text-sm font-bold text-gray-900">Partager ma fiche</h2>
      <p className="mt-1 text-xs text-gray-500">Ajoute ce lien dans ta bio ou ta story.</p>

      <p className="mt-3 truncate rounded-lg border border-gray-200 bg-white px-3 py-2 font-mono text-xs text-gray-600">
        {url}
      </p>

      {/* Empilés : le bloc vit dans une colonne de 320 px sur desktop, où deux
          boutons côte à côte coupent « Copier le lien de ma fiche » en trois lignes. */}
      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:border-[#111111] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
          {copied ? 'Lien copié' : 'Copier le lien de ma fiche'}
        </button>
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:border-[#111111] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Partager
        </button>
      </div>

      {/* Le retour visuel passe aussi par la zone live : au lecteur d'écran, le
          changement de libellé du bouton seul n'est pas annoncé de façon fiable. */}
      <p aria-live="polite" className="mt-2 min-h-[1rem] text-xs font-medium text-gray-600">
        {copied && 'Lien copié dans le presse-papiers.'}
        {failed && 'Copie impossible — sélectionne le lien ci-dessus.'}
      </p>
    </div>
  )
}
