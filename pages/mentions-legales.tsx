import { SEO } from '@/components/SEO'
import { LegalLayout } from '@/components/LegalLayout'

export default function MentionsLegales() {
  return (
    <>
      <SEO
        title="Mentions légales"
        description="Mentions légales du site Digiqo - Agence de marketing digital à La Réunion. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation."
        keywords="mentions légales, digiqo, conditions utilisation, rgpd"
        url="https://digiqo.com/mentions-legales"
      />

      <LegalLayout title="Mentions légales" lastUpdated="23 janvier 2026">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">1. Éditeur du site</h2>
          <p className="mb-4">
            Le site <strong>https://digiqo.fr/</strong> est édité par <strong>SAS DIGIQO</strong>, Société par Actions Simplifiée
            au capital de 1000,00€, dont le siège social est situé à 8 ruelle Boulot, 97400 Saint Denis - La Réunion,
            immatriculée au greffe de SAINT-DENIS-DE-LA-REUNION sous le numéro 941181232, représentée par
            Monsieur Rodolphe Le Houx, en sa qualité de Président.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>📍 <strong>Siège social :</strong> 8 ruelle Boulot, 97400 Saint Denis - La Réunion</li>
            <li>📧 <strong>E-mail :</strong> <a href="mailto:contact@digiqo.fr" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">contact@digiqo.fr</a></li>
            <li>📞 <strong>Téléphone :</strong> <a href="tel:+262262025102" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">02 62 02 51 02</a></li>
            <li>📜 <strong>Numéro SIREN :</strong> 941181232</li>
            <li>📜 <strong>Numéro de TVA intracommunautaire :</strong> FR02941181232</li>
          </ul>
          <p className="mt-4">
            <strong>Directeur de la publication :</strong> Monsieur Rodolphe Le Houx, Président de la SAS DIGIQO.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">2. Hébergeur du site</h2>
          <p className="mb-4">Le site <strong>https://digiqo.fr/</strong> est hébergé par :</p>
          <ul className="space-y-2 text-gray-700">
            <li>📍 <strong>Hostinger International Ltd.</strong></li>
            <li>📍 <strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
            <li>📞 <strong>Téléphone :</strong> +370 645 03378</li>
            <li>🌐 <strong>Site Web :</strong> <a href="https://www.hostinger.fr/" target="_blank" rel="noopener noreferrer" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">https://www.hostinger.fr/</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">3. Propriété intellectuelle</h2>
          <p>
            Tous les éléments présents sur le site https://digiqo.fr/, y compris les textes, images, logos et vidéos, 
            sont la propriété exclusive de la SAS DIGIQO, sauf mention contraire. Toute reproduction, 
            distribution ou modification sans autorisation est interdite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">4. Responsabilité</h2>
          <p>
            La SAS DIGIQO décline toute responsabilité en cas d'erreurs, d'interruptions ou de dommages directs
            ou indirects causés par l'utilisation du site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">5. Protection des données personnelles</h2>
          <p className="mb-4">
            Le site collecte et traite des données personnelles conformément au RGPD.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ <strong>Finalité :</strong> Gestion des clients, suivi des commandes, envoi de newsletters.</li>
            <li>✔ <strong>Durée de conservation :</strong> 3 ans après la dernière interaction.</li>
            <li>✔ <strong>Droits :</strong> Accès, rectification, suppression des données sur demande.</li>
            <li>📩 <strong>Contact RGPD :</strong> <a href="mailto:contact@digiqo.fr" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">contact@digiqo.fr</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">6. Conditions générales de vente (CGV)</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📌 <strong>Facturation :</strong> Toutes les prestations sont facturées par la SAS DIGIQO.</li>
            <li>📌 <strong>Paiement :</strong> Accepté par virement, CB, Stripe, PayPal.</li>
            <li>📌 <strong>Pénalités :</strong> Retard de paiement = 10% par an + 40 € de frais de recouvrement.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">7. Politique de remboursement</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>Avant le début de la prestation :</strong> Remboursement possible à 80%.</li>
            <li>❌ <strong>Après début de la prestation :</strong> Aucun remboursement.</li>
            <li>❌ <strong>Produits digitaux (formations, templates) :</strong> Aucun remboursement après accès.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">8. Cookies</h2>
          <p className="mb-4">Ce site utilise des cookies pour :</p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Assurer le bon fonctionnement du site.</li>
            <li>✔ Analyser les performances avec Google Analytics.</li>
            <li>✔ Personnaliser les annonces et offres marketing.</li>
          </ul>
          <p className="mt-4">
            📌 Vous pouvez gérer vos préférences dans le bandeau de consentement affiché sur le site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">9. Droit applicable</h2>
          <p className="mb-2">
            Les présentes mentions légales sont soumises au droit français.
          </p>
          <p>
            📌 En cas de litige, compétence exclusive du Tribunal de Commerce de Saint-Denis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">10. Contact</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📍 <strong>Adresse postale :</strong> SAS DIGIQO – 8 ruelle Boulot, 97400 Saint Denis - La Réunion</li>
            <li>📧 <strong>E-mail :</strong> <a href="mailto:contact@digiqo.fr" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">contact@digiqo.fr</a></li>
            <li>📞 <strong>Téléphone :</strong> <a href="tel:+262262025102" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">02 62 02 51 02</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">11. Conception et développement du site</h2>
          <p className="mb-4">
            Ce site a été conçu et développé par <strong>VelocitAI</strong>, société spécialisée dans le développement de solutions numériques innovantes.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>💻 <strong>Développeur :</strong> VelocitAI</li>
            <li>📧 <strong>Contact :</strong> <a href="mailto:contact@velocit-ai.fr" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">contact@velocit-ai.fr</a></li>
          </ul>
        </section>
      </LegalLayout>
    </>
  )
}