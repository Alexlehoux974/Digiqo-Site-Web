import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Import dynamique des deux versions
const PubliciteOriginal = dynamic(() => import('./publicite'), { ssr: false })
const Publicite3Formules = dynamic(() => import('./publicite-3formules'), { ssr: false })

export default function PubliciteWrapper() {
  const [shouldShow3Formules, setShouldShow3Formules] = useState(false)

  useEffect(() => {
    // Fonction pour vérifier si nous devons afficher la version 3 formules
    const checkDate = () => {
      const now = new Date()

      // Date de transition : 1er octobre 2025 à 00:00:00
      const transitionDate = new Date('2025-10-01T00:00:00')

      // Si la date actuelle est après ou égale au 1er octobre 2025
      setShouldShow3Formules(now >= transitionDate)
    }

    // Vérifier immédiatement
    checkDate()

    // Vérifier toutes les heures au cas où la page reste ouverte longtemps
    const interval = setInterval(checkDate, 3600000) // 1 heure

    return () => clearInterval(interval)
  }, [])

  // Mode développement : possibilité de forcer l'affichage via query string
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const forceVersion = urlParams.get('version')

      if (forceVersion === '3formules') {
        setShouldShow3Formules(true)
      } else if (forceVersion === '4formules') {
        setShouldShow3Formules(false)
      }
    }
  }, [])

  // Afficher la version appropriée
  return shouldShow3Formules ? <Publicite3Formules /> : <PubliciteOriginal />
}