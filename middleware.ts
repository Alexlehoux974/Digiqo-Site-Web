import { NextRequest, NextResponse } from 'next/server'

// Basic Auth pour la formation apporteur (non listée + noindex).
// Protège la page ET sa route de données Next (_next/data/.../kit-apporteur.json),
// sinon le contenu serait servi via le JSON sans authentification.
const AUTH_USER = 'apporteur'
const AUTH_PASSWORD = 'apporteur2026'

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')
    if (scheme === 'Basic' && encoded) {
      // atob est disponible dans l'edge runtime
      const decoded = atob(encoded)
      const sep = decoded.indexOf(':')
      const user = decoded.slice(0, sep)
      const password = decoded.slice(sep + 1)
      if (user === AUTH_USER && password === AUTH_PASSWORD) {
        return NextResponse.next()
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
