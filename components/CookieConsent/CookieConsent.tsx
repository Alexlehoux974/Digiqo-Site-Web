import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Cookie } from 'lucide-react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
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
  }

  if (!showBanner) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm" onClick={() => {}} />
      
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-slide-up">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl border border-gray-200">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Cookie className="w-8 h-8 text-digiqo-primary" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Nous utilisons des cookies
                </h2>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site, analyser notre trafic et personnaliser nos offres marketing. 
              En cliquant sur "Accepter tout", vous consentez à l'utilisation de tous les cookies. 
              Vous pouvez également personnaliser vos préférences.
            </p>

            {!showDetails ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={acceptAll}
                  className="bg-digiqo-primary hover:bg-digiqo-primary-dark text-white"
                >
                  Accepter tout
                </Button>
                <Button
                  onClick={acceptNecessary}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Refuser tout sauf nécessaires
                </Button>
                <Button
                  onClick={() => setShowDetails(true)}
                  variant="ghost"
                  className="text-digiqo-secondary hover:text-digiqo-secondary-dark"
                >
                  Personnaliser
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
                      defaultChecked
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
                      defaultChecked
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

            <p className="text-xs text-gray-500 mt-4">
              Pour plus d'informations, consultez notre{' '}
              <a href="/politique-cookies" className="text-digiqo-secondary hover:underline">
                politique de cookies
              </a>{' '}
              et notre{' '}
              <a href="/politique-confidentialite" className="text-digiqo-secondary hover:underline">
                politique de confidentialité
              </a>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}