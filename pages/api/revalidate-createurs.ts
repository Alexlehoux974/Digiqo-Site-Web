import type { NextApiRequest, NextApiResponse } from 'next'

// ──────────────────────────────────────────────
// RÉGÉNÉRATION À LA DEMANDE de /createurs.
//
// L'ISR rafraîchit la page toutes les 30 min. Cette route permet de ne pas
// attendre : un webhook Airtable ou n8n l'appelle au changement de statut et la
// fiche apparaît tout de suite.
//
// Protégée par REVALIDATE_SECRET. Si la variable n'est pas définie, la route
// répond 404 : mieux vaut une régénération indisponible qu'ouverte à tous.
// ──────────────────────────────────────────────

const CREATEURS_PATH = '/createurs'

/** Comparaison à durée constante : un secret ne se devine pas caractère par caractère. */
const safeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const expected = process.env.REVALIDATE_SECRET || ''
  if (!expected) {
    console.warn('[revalidate-createurs] REVALIDATE_SECRET absente — route désactivée')
    return res.status(404).json({ error: 'Not found' })
  }

  // En-tête de préférence ; le paramètre d'URL dépanne un webhook qui ne sait pas
  // en poser un, au prix d'un secret visible dans les logs d'accès.
  const headerSecret = req.headers['x-revalidate-secret']
  const raw = (Array.isArray(headerSecret) ? headerSecret[0] : headerSecret) || req.query.secret
  const provided = Array.isArray(raw) ? raw[0] : raw || ''

  if (!provided || !safeEqual(String(provided), expected)) {
    return res.status(401).json({ error: 'Secret invalide' })
  }

  try {
    await res.revalidate(CREATEURS_PATH)
    console.log('[revalidate-createurs] page régénérée')
    return res.status(200).json({ revalidated: true, path: CREATEURS_PATH })
  } catch (error) {
    // Une régénération ratée ne casse rien : l'ISR reprendra la main dans 30 min.
    console.error('[revalidate-createurs] échec:', (error as Error).message)
    return res.status(500).json({ error: 'Régénération impossible' })
  }
}
