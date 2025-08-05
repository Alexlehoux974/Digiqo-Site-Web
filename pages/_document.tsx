import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.ico" />
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