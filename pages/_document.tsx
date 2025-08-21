import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Viewport avec support des safe areas pour appareils avec encoche */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        
        {/* Favicon principal */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Pour iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Pour Android */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Couleurs du thème */}
        <meta name="theme-color" content="#8B1431" />
        <meta name="msapplication-TileColor" content="#8B1431" />
        
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}