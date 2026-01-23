import { SEO } from '@/components/SEO'
import { LegalLayout } from '@/components/LegalLayout'

export default function PolitiqueCookies() {
  return (
    <>
      <SEO
        title="Politique de cookies"
        description="Politique de cookies de Digiqo - Découvrez comment nous utilisons les cookies pour améliorer votre expérience sur notre site."
        keywords="politique cookies, cookies, digiqo, rgpd, consentement"
        url="https://digiqo.com/politique-cookies"
      />

      <LegalLayout title="Politique de cookies" lastUpdated="23 janvier 2026">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">1. Préambule</h2>
          <p>
            Le site <strong>https://digiqo.fr/</strong> utilise des cookies pour améliorer l'expérience utilisateur 
            et optimiser ses services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">2. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur, tablette, smartphone) 
            lorsque vous visitez un site web. Il permet de collecter des informations sur votre navigation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">3. Types de cookies utilisés</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-digiqo-primary mb-2">✔ Cookies essentiels</h3>
              <p className="text-gray-700">
                Indispensables au bon fonctionnement du site (ex. connexion utilisateur, sécurisation des paiements).
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-digiqo-primary mb-2">✔ Cookies analytiques</h3>
              <p className="text-gray-700">
                Permettent de mesurer l'audience et les performances du site (ex. Google Analytics).
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-digiqo-primary mb-2">✔ Cookies marketing</h3>
              <p className="text-gray-700">
                Utilisés pour personnaliser les publicités et suivre l'efficacité des campagnes.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-digiqo-primary mb-2">✔ Cookies de réseaux sociaux</h3>
              <p className="text-gray-700">
                Facilite le partage de contenu sur des plateformes comme Facebook, Instagram, LinkedIn.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">4. Gestion des cookies</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Vous pouvez accepter ou refuser l'utilisation des cookies via le bandeau de consentement affiché lors de votre première visite.</li>
            <li>✔ Vous pouvez également modifier vos préférences à tout moment via les paramètres de votre navigateur.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">5. Désactiver les cookies</h2>
          <p className="mb-4">
            Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies :
          </p>
          <ul className="space-y-2">
            <li>
              🔗 <a 
                href="https://support.google.com/chrome/answer/95647" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-digiqo-secondary hover:text-digiqo-secondary-dark"
              >
                Google Chrome
              </a>
            </li>
            <li>
              🔗 <a 
                href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-digiqo-secondary hover:text-digiqo-secondary-dark"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              🔗 <a 
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-digiqo-secondary hover:text-digiqo-secondary-dark"
              >
                Safari
              </a>
            </li>
            <li>
              🔗 <a 
                href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-digiqo-secondary hover:text-digiqo-secondary-dark"
              >
                Internet Explorer
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">6. Durée de conservation des cookies</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Les cookies sont conservés pour une durée maximale de 13 mois après leur enregistrement.</li>
            <li>✔ À l'expiration de cette période, un nouveau consentement vous sera demandé.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">7. Modifications de la politique de cookies</h2>
          <p>
            La SAS DIGIQO se réserve le droit de modifier cette politique à tout moment.
            Toute modification sera publiée sur cette page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">8. Contact</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📍 <strong>Adresse :</strong> SAS DIGIQO – 8 ruelle Boulot, 97400 Saint Denis - La Réunion</li>
            <li>📧 <strong>E-mail :</strong> <a href="mailto:contact@digiqo.fr" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">contact@digiqo.fr</a></li>
            <li>📞 <strong>Téléphone :</strong> <a href="tel:+262262025102" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">02 62 02 51 02</a></li>
          </ul>
        </section>
      </LegalLayout>
    </>
  )
}