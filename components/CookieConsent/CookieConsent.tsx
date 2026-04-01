import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Cookie } from 'lucide-react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const dispatchConsentEvent = () => {
    window.dispatchEvent(new Event('cookieConsentUpdate'))
  }

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
    dispatchConsentEvent()
  }

  const refuseAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
    dispatchConsentEvent()
  }

  const savePreferences = () => {
    const necessary = (document.getElementById('necessary') as HTMLInputElement).checked
    const analytics = (document.getElementById('analytics') as HTMLInputElement).checked
    const marketing = (document.getElementById('marketing') as HTMLInputElement).checked

    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary,
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
    setShowDetails(false)
    dispatchConsentEvent()
  }

  if (!showBanner) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up">
        <div className="bg-white shadow-2xl border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <Cookie className="w-5 h-5 text-digiqo-primary flex-shrink-0" />
                <p className="text-sm text-gray-600 truncate md:whitespace-normal">
                  Ce site utilise des cookies pour améliorer votre expérience.
                </p>
              </div>

            {!showDetails ? (
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  onClick={acceptAll}
                  className="bg-digiqo-primary hover:bg-digiqo-primary-dark text-white px-4 py-2 text-sm"
                >
                  Accepter
                </Button>
                <Button
                  onClick={refuseAll}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 text-sm"
                >
                  Refuser
                </Button>
                <Button
                  onClick={() => setShowDetails(true)}
                  variant="ghost"
                  className="text-digiqo-secondary hover:text-digiqo-secondary-dark text-sm px-2"
                >
                  Options
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">Cookies nécessaires</h3>
                      <p className="text-sm text-gray-600">
                        Ces cookies sont essentiels au fonctionnement du site
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="necessary"
                      defaultChecked
                      disabled
                      className="w-5 h-5 text-digiqo-primary rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">Cookies analytiques</h3>
                      <p className="text-sm text-gray-600">
                        Nous aident à comprendre comment vous utilisez notre site
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="analytics"
                      className="w-5 h-5 text-digiqo-primary rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">Cookies marketing</h3>
                      <p className="text-sm text-gray-600">
                        Utilisés pour personnaliser les publicités et offres
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="marketing"
                      className="w-5 h-5 text-digiqo-primary rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={savePreferences}
                    className="bg-digiqo-primary hover:bg-digiqo-primary-dark text-white"
                  >
                    Enregistrer mes préférences
                  </Button>
                  <Button
                    onClick={() => setShowDetails(false)}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Retour
                  </Button>
                </div>
              </div>
            )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
