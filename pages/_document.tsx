import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const GA_MEASUREMENT_ID = 'G-NFN3PN0GLY'

  return (
    <Html lang="fr">
      <Head>
        {/* Google Analytics 4 - Doit être placé en premier après l'ouverture de <head> */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />

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

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700;800;900&family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Métadonnées géographiques pour le SEO local */}
        <meta name="geo.region" content="RE" />
        <meta name="geo.placename" content="Saint-Denis, La Réunion" />
        <meta name="geo.position" content="-20.8823;55.4504" />
        <meta name="ICBM" content="-20.8823, 55.4504" />

        {/* Metricool Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function loadScript(a){
                var b=document.getElementsByTagName("head")[0],
                c=document.createElement("script");
                c.type="text/javascript",
                c.src="https://tracker.metricool.com/resources/be.js",
                c.onreadystatechange=a,
                c.onload=a,
                b.appendChild(c)
              }
              loadScript(function(){
                beTracker.t({hash:"1a6eeac69b58a63cb160a61c39160d25"})
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}