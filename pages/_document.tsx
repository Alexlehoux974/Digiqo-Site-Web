import { Html, Head, Main, NextScript } from 'next/document'
import { inter, montserrat } from '@/lib/fonts'

export default function Document() {
  return (
    <Html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <Head>
        {/* Google Ads AW-18002905491 — Consent Mode v2 (advanced).
            Rendu côté serveur dans le <head> de CHAQUE page, donc visible au
            curl et présent sur toutes les pages d'atterrissage. Les cookies
            publicitaires restent 'denied' par défaut tant que le visiteur n'a
            pas accepté le marketing (CookieConsent met à jour le consentement
            via gtag('consent','update') dans _app.tsx). Google reçoit des
            pings anonymes et peut modéliser les conversions sans cookie. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              gtag('config', 'AW-18002905491');
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18002905491" />

        {/* Google Tag Manager — chargé conditionnellement via _app.tsx après consentement */}

        {/* Viewport avec support des safe areas pour appareils avec encoche */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        
        {/* Favicon principal */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Pour iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate manifest" href="/site.webmanifest" />
        
        {/* Couleurs du thème */}
        <meta name="theme-color" content="#8B1431" />
        <meta name="msapplication-TileColor" content="#8B1431" />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="-mBAAsZ3X_8gyG-3MAN7Ww86tsF452BbvWmgz3SLiBY" />

        {/* Fonts — self-hosted via next/font/google in pages/_app.tsx
            (Inter 400/600/700 + Montserrat 600/700/800). The previous
            render-blocking <link> to fonts.googleapis.com is gone; no
            preconnect needed either since the woff2 files are served
            from the same origin. */}

        {/* Métadonnées géographiques pour le SEO local */}
        <meta name="geo.region" content="RE" />
        <meta name="geo.placename" content="Saint-Denis, La Réunion" />
        <meta name="geo.position" content="-20.8789;55.4481" />
        <meta name="ICBM" content="-20.8789, 55.4481" />

      </Head>
      <body>
        {/* GTM noscript supprimé — chargé conditionnellement via _app.tsx après consentement */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}