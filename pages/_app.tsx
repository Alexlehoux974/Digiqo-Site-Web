import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { CookieConsent } from '@/components/CookieConsent'
import { ScrollToTop } from '@/components/ScrollToTop'
import dynamic from 'next/dynamic'
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(m => m.ChatWidget), { ssr: false })
import '../styles/globals.css'
import '../styles/enhanced-colors.css'
import '@n8n/chat/style.css'

const GA_MEASUREMENT_ID = 'G-NFN3PN0GLY'

// Déclaration globale pour gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [analyticsConsent, setAnalyticsConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  // Check consent from localStorage on mount and listen for changes
  useEffect(() => {
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('cookieConsent')
        if (consent) {
          const parsed = JSON.parse(consent)
          setAnalyticsConsent(parsed.analytics === true)
          setMarketingConsent(parsed.marketing === true)

          // Update gtag consent state if gtag is loaded
          if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
              analytics_storage: parsed.analytics ? 'granted' : 'denied',
              ad_storage: parsed.marketing ? 'granted' : 'denied',
              ad_user_data: parsed.marketing ? 'granted' : 'denied',
              ad_personalization: parsed.marketing ? 'granted' : 'denied',
            })
          }
        }
      } catch (e) {
        // Invalid JSON in localStorage, ignore
      }
    }

    checkConsent()

    // Listen for storage changes (when CookieConsent component saves preferences)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cookieConsent') {
        checkConsent()
      }
    }
    window.addEventListener('storage', handleStorage)

    // Also listen for custom event dispatched by CookieConsent component
    const handleConsentUpdate = () => checkConsent()
    window.addEventListener('cookieConsentUpdate', handleConsentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cookieConsentUpdate', handleConsentUpdate)
    }
  }, [])

  // Track route changes for GA4 (only if consent given)
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.scrollTo(0, 0)

      if (analyticsConsent && typeof window.gtag === 'function') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, analyticsConsent])

  // Build the gtag consent default script content
  const consentDefaultScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
  `

  const gtagInitScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
    gtag('config', '${GA_MEASUREMENT_ID}');
  `

  const metricoolScript = `
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
  `

  return (
    <>
      {/* Google Fonts — loaded async to avoid render-blocking */}
      <Script
        id="google-fonts"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@600;700;800&display=swap';
          document.head.appendChild(link);
        `}}
      />

      {/* Initialize dataLayer and gtag with consent defaults (always, before any script loads) */}
      <Script
        id="gtag-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: consentDefaultScript }}
      />

      {/* Load GA4 scripts only after analytics consent */}
      {analyticsConsent && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: gtagInitScript }}
          />
        </>
      )}

      {/* Load GTM only after marketing consent */}
      {marketingConsent && (
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M2T4L6XH');`
          }}
        />
      )}

      {/* Load Metricool only after marketing consent */}
      {marketingConsent && (
        <Script
          id="metricool-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: metricoolScript }}
        />
      )}

      <Component {...pageProps} />
      <CookieConsent />
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}
