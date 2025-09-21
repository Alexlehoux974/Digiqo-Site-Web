import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CookieConsent } from '@/components/CookieConsent'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ChatWidget } from '@/components/ChatWidget'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import '../styles/globals.css'
import '../styles/enhanced-colors.css'
import '@n8n/chat/style.css'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Scroll to top on route change
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
      <CookieConsent />
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}