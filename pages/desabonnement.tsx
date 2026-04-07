import { SEO } from '@/components/SEO'
import { LegalLayout } from '@/components/LegalLayout'
import Script from 'next/script'

export default function Desabonnement() {
  return (
    <>
      <SEO
        title="Désabonnement"
        description="Désabonnez-vous des services Digiqo. Formulaire de résiliation d'abonnement pour les prestations et services digitaux."
        keywords="désabonnement, résiliation, services, abonnement, digiqo"
        url="https://digiqo.fr/desabonnement"
      />

      <LegalLayout title="Gestion de votre abonnement aux services SMA" lastUpdated="23 janvier 2026">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">Résilier ou mettre en pause votre abonnement</h2>
          <p className="mb-6 text-gray-700">
            Vous souhaitez résilier ou mettre en pause temporairement votre abonnement aux services Digiqo ?
            Remplissez le formulaire ci-dessous pour nous transmettre votre demande.
          </p>
          <p className="mb-8 text-gray-600 text-sm">
            Conformément à nos Conditions Générales de Vente, votre demande sera traitée
            dans les plus brefs délais. Un membre de notre équipe vous contactera afin de confirmer
            la prise en compte de votre demande et, le cas échéant, préciser la date d'effet.
          </p>
        </section>

        <div className="bg-red-50 border-l-4 border-red-500 rounded p-4 mb-8">
          <p className="text-red-700 font-medium">
            Attention, se désabonner des services de publicité de Digiqo nuit gravement à votre visibilité !
          </p>
        </div>

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
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">Informations importantes</h2>
          <div className="bg-orange-50 border-l-4 border-digiqo-accent rounded p-4 mb-6">
            <p className="text-gray-700">
              <strong>Note :</strong> Conformément à nos CGV, les abonnements mensuels ne sont pas remboursables
              après le début du mois en cours. La résiliation prendra effet à la fin de votre période d'abonnement.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">Besoin d'aide ?</h2>
          <p className="text-gray-700 mb-4">
            Si vous avez des questions concernant votre résiliation ou souhaitez discuter de vos options,
            notre équipe est à votre disposition :
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
