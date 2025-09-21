import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Remplacer par votre ID de mesure GA4 (format: G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export function GoogleAnalytics() {
  const router = useRouter()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const handleRouteChange = (url: string) => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `,
        }}
      />
    </>
  )
}

// Fonction helper pour tracker les événements personnalisés
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Fonction helper pour tracker les conversions
export const trackConversion = (
  conversionType: 'form_submit' | 'quote_request' | 'contact' | 'audit_request',
  value?: number,
  currency: string = 'EUR'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      value: value,
      currency: currency,
      conversion_type: conversionType,
    })
  }
}

// Fonction helper pour tracker les vues de produits/services
export const trackServiceView = (
  serviceName: string,
  serviceCategory: string,
  price?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'EUR',
      value: price,
      items: [{
        item_name: serviceName,
        item_category: serviceCategory,
        price: price,
        quantity: 1
      }]
    })
  }
}

// Fonction pour tracker les clics sur les CTAs
export const trackCTA = (
  ctaName: string,
  location: string
) => {
  trackEvent('cta_click', 'engagement', `${ctaName} - ${location}`)
}

// Fonction pour tracker les téléchargements
export const trackDownload = (
  fileName: string,
  fileType: string
) => {
  trackEvent('file_download', 'downloads', `${fileName}.${fileType}`)
}

// Fonction pour tracker les partages sociaux
export const trackSocialShare = (
  platform: string,
  contentType: string,
  contentName: string
) => {
  trackEvent('share', 'social', `${platform} - ${contentType}: ${contentName}`)
}

// Fonction pour tracker le scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', 'engagement', `${percentage}%`, percentage)
}

// Fonction pour tracker le temps passé sur la page
export const trackTimeOnPage = (seconds: number, pageName: string) => {
  trackEvent('time_on_page', 'engagement', pageName, seconds)
}