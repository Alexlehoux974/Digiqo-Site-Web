import { NextRequest, NextResponse } from 'next/server'

// Basic Auth pour la formation apporteur (non listée + noindex).
// Protège la page ET sa route de données Next (_next/data/.../kit-apporteur.json),
// sinon le contenu serait servi via le JSON sans authentification.
//
// Les identifiants viennent des variables d'environnement Netlify
// (KIT_APPORTEUR_USER / KIT_APPORTEUR_PASSWORD) — jamais en clair dans le code.
const AUTH_USER = process.env.KIT_APPORTEUR_USER
const AUTH_PASSWORD = process.env.KIT_APPORTEUR_PASSWORD

// Comparaison à temps constant (l'edge runtime n'expose pas crypto.timingSafeEqual).
function safeEqual(a: string, b: string): boolean {
  const aBytes = new TextEncoder().encode(a)
  const bBytes = new TextEncoder().encode(b)
  // Longueurs différentes : on compare quand même une longueur fixe pour ne pas
  // court-circuiter, puis on renvoie false.
  let diff = aBytes.length ^ bBytes.length
  const len = Math.max(aBytes.length, bBytes.length)
  for (let i = 0; i < len; i++) {
    diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0)
  }
  return diff === 0
}

export function middleware(req: NextRequest) {
  // Fail-closed : si les identifiants ne sont pas configurés, on refuse l'accès.
  if (AUTH_USER && AUTH_PASSWORD) {
    const authHeader = req.headers.get('authorization')
    if (authHeader) {
      const [scheme, encoded] = authHeader.split(' ')
      if (scheme === 'Basic' && encoded) {
        // atob est disponible dans l'edge runtime
        const decoded = atob(encoded)
        const sep = decoded.indexOf(':')
        const user = decoded.slice(0, sep)
        const password = decoded.slice(sep + 1)
        if (safeEqual(user, AUTH_USER) && safeEqual(password, AUTH_PASSWORD)) {
          return NextResponse.next()
        }
      }
    }
  }

  return new NextResponse('Authentification requise', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Kit Apporteur Digiqo", charset="UTF-8"',
    },
  })
}

export const config = {
  matcher: [
    '/digicademy/formations/kit-apporteur',
    '/_next/data/:buildId/digicademy/formations/kit-apporteur.json',
  ],
}
