import { SEO } from '@/components/SEO'
import { LegalLayout } from '@/components/LegalLayout'
import Script from 'next/script'

export default function Desabonnement() {
  return (
    <>
      <SEO
        title="Désabonnement"
        description="Désabonnez-vous de nos communications marketing. Gérez vos préférences d'emails et newsletters Digiqo."
        keywords="désabonnement, unsubscribe, newsletter, emails, digiqo"
        url="https://digiqo.com/desabonnement"
      />

      <LegalLayout title="Désabonnement" lastUpdated="23 janvier 2026">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">Gérer vos préférences de communication</h2>
          <p className="mb-6 text-gray-700">
            Vous souhaitez vous désabonner de nos communications marketing ? Remplissez le formulaire ci-dessous
            pour gérer vos préférences d'emails et de newsletters.
          </p>
          <p className="mb-8 text-gray-600 text-sm">
            Conformément au RGPD, vous avez le droit de vous désinscrire à tout moment de nos communications.
            Votre demande sera traitée dans les plus brefs délais.
          </p>
        </section>

        <section className="mb-8">
          <div className="bg-gray-50 rounded-lg p-6 md:p-8">
            <Script
              src="https://js-eu1.hsforms.net/forms/embed/26596184.js"
              strategy="lazyOnload"
            />
            <div
              className="hs-form-frame"
              data-region="eu1"
              data-form-id="5842e674-6b05-4bc3-9cfc-76b765946202"
              data-portal-id="26596184"
            />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">Besoin d'aide ?</h2>
          <p className="text-gray-700 mb-4">
            Si vous rencontrez des difficultés pour vous désabonner, vous pouvez également nous contacter directement :
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>📧 <strong>E-mail :</strong> <a href="mailto:contact@digiqo.fr" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">contact@digiqo.fr</a></li>
            <li>📞 <strong>Téléphone :</strong> <a href="tel:+262262025102" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">02 62 02 51 02</a></li>
          </ul>
        </section>
      </LegalLayout>
    </>
  )
}
