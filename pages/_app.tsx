import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CookieConsent } from '@/components/CookieConsent'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ChatWidget } from '@/components/ChatWidget'
import '../styles/globals.css'
import '../styles/enhanced-colors.css'
import '@n8n/chat/style.css'

// Déclaration globale pour gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Tracking des changements de page pour GA4
    const handleRouteChange = (url: string) => {
      // Scroll to top
      window.scrollTo(0, 0)

      // Track page view dans GA4
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', 'G-NFN3PN0GLY', {
          page_path: url,
        })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Component {...pageProps} />
      <CookieConsent />
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}