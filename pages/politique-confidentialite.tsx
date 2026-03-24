import { SEO } from '@/components/SEO'
import { LegalLayout } from '@/components/LegalLayout'

export default function PolitiqueConfidentialite() {
  return (
    <>
      <SEO
        title="Politique de confidentialité"
        description="Politique de confidentialité de Digiqo - Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD."
        keywords="politique confidentialité, rgpd, protection données, digiqo"
        url="https://digiqo.com/politique-confidentialite"
      />

      <LegalLayout title="Politique de confidentialité" lastUpdated="24 mars 2026">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">1. Introduction</h2>
          <p>
            La présente politique de confidentialité explique comment la <strong>SAS DIGIQO</strong>,
            Société par Actions Simplifiée au capital de 1000,00€, dont le siège social est situé à
            8 ruelle Boulot, 97400 Saint Denis - La Réunion, immatriculée au greffe de SAINT-DENIS-DE-LA-REUNION
            sous le numéro 941181232, collecte, utilise et protège vos données personnelles lorsque vous visitez
            le site https://digiqo.fr/. Nous nous engageons à respecter la confidentialité et la protection de
            vos informations conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">2. Données personnelles collectées</h2>
          <p className="mb-4">Nous collectons différentes données personnelles lorsque vous utilisez nos services :</p>
          <ul className="space-y-2 text-gray-700">
            <li>📌 <strong>Informations fournies directement :</strong> Nom, prénom, adresse e-mail, numéro de téléphone, entreprise, etc.</li>
            <li>📌 <strong>Informations collectées automatiquement :</strong> Adresse IP, type d'appareil, navigateur, pages visitées, durée de session (via Google Analytics).</li>
            <li>📌 <strong>Données issues des cookies :</strong> Préférences de navigation, historique de session.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">3. Finalité de la collecte</h2>
          <p className="mb-4">Les données personnelles collectées sont utilisées pour :</p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Gérer vos demandes et commandes.</li>
            <li>✔ Améliorer votre expérience utilisateur.</li>
            <li>✔ Communiquer avec vous sur nos services et offres.</li>
            <li>✔ Assurer la sécurité et prévenir la fraude.</li>
            <li>✔ Respecter nos obligations légales et comptables.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">4. Bases légales du traitement</h2>
          <p className="mb-4">Nous traitons vos données personnelles sur les bases légales suivantes :</p>
          <ul className="space-y-2 text-gray-700">
            <li>📌 <strong>Exécution d'un contrat :</strong> Fourniture des services demandés.</li>
            <li>📌 <strong>Consentement :</strong> Lors de l'inscription à une newsletter ou l'acceptation des cookies.</li>
            <li>📌 <strong>Obligations légales :</strong> Respect des exigences comptables et fiscales.</li>
            <li>📌 <strong>Intérêt légitime :</strong> Sécurité du site, analyse des performances.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">5. Durée de conservation des données</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📌 <strong>Clients actifs :</strong> Données conservées durant la relation contractuelle + 3 ans après le dernier contact.</li>
            <li>📌 <strong>Prospects :</strong> Données supprimées après 3 ans sans interaction.</li>
            <li>📌 <strong>Cookies :</strong> Conservation entre 6 et 13 mois selon le type.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">6. Partage et transfert des données</h2>
          <p className="mb-4">Vos données personnelles peuvent être partagées uniquement dans les cas suivants :</p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Avec nos partenaires et filiales (SAS DIGIQO, RunCall, etc.) pour optimiser nos services.</li>
            <li>✔ Avec des prestataires techniques (hébergement, emailing, paiement sécurisé).</li>
            <li>✔ En cas d'obligation légale (demande des autorités).</li>
          </ul>
          <div className="mt-4 p-4 bg-orange-50 border-l-4 border-digiqo-accent rounded">
            <p className="font-semibold text-digiqo-accent">
              ⚠️ Aucune donnée n'est vendue à des tiers.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">7. Sous-traitants et outils tiers</h2>
          <p className="mb-4">Dans le cadre de nos activités, nous faisons appel aux sous-traitants et outils tiers suivants, qui peuvent être amenés à traiter vos données personnelles :</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Sous-traitant</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Finalité</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Localisation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Google (Google Analytics)</td>
                  <td className="border border-gray-200 px-4 py-2">Analyse du trafic et des performances du site</td>
                  <td className="border border-gray-200 px-4 py-2">USA</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">HubSpot</td>
                  <td className="border border-gray-200 px-4 py-2">CRM, gestion des contacts et emailing</td>
                  <td className="border border-gray-200 px-4 py-2">USA</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Airtable</td>
                  <td className="border border-gray-200 px-4 py-2">Gestion de bases de données et formulaires</td>
                  <td className="border border-gray-200 px-4 py-2">USA</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Metricool</td>
                  <td className="border border-gray-200 px-4 py-2">Gestion et analyse des réseaux sociaux</td>
                  <td className="border border-gray-200 px-4 py-2">Espagne / USA</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Hostinger</td>
                  <td className="border border-gray-200 px-4 py-2">Hébergement web</td>
                  <td className="border border-gray-200 px-4 py-2">Chypre / Lituanie</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">Vercel</td>
                  <td className="border border-gray-200 px-4 py-2">Hébergement CDN et déploiement</td>
                  <td className="border border-gray-200 px-4 py-2">USA</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-2">n8n</td>
                  <td className="border border-gray-200 px-4 py-2">Automatisation de workflows internes</td>
                  <td className="border border-gray-200 px-4 py-2">Allemagne / Auto-hébergé</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">8. Transferts internationaux</h2>
          <p className="mb-4">
            Certains de nos sous-traitants sont situés en dehors de l'Union européenne. Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place conformément au RGPD :
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>📌 <strong>Google Analytics (USA) :</strong> Transfert encadré par le Data Privacy Framework (DPF) UE-USA.</li>
            <li>📌 <strong>HubSpot (USA) :</strong> Transfert encadré par des Clauses Contractuelles Types (CCT) approuvées par la Commission européenne.</li>
            <li>📌 <strong>Airtable (USA) :</strong> Transfert encadré par des Clauses Contractuelles Types (CCT) approuvées par la Commission européenne.</li>
            <li>📌 <strong>Metricool (Espagne / USA) :</strong> Société espagnole soumise au RGPD, avec transferts vers les USA encadrés par des garanties appropriées.</li>
            <li>📌 <strong>Hostinger (Chypre / Lituanie) :</strong> Hébergement au sein de l'Union européenne, soumis au RGPD.</li>
            <li>📌 <strong>Vercel (USA) :</strong> Transfert encadré par le Data Privacy Framework (DPF) UE-USA et des Clauses Contractuelles Types.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">9. Vos droits sur vos données</h2>
          <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ <strong>Droit d'accès :</strong> Obtenir une copie des données personnelles détenues.</li>
            <li>✔ <strong>Droit de rectification :</strong> Modifier ou corriger vos informations.</li>
            <li>✔ <strong>Droit à l'effacement :</strong> Suppression de vos données personnelles.</li>
            <li>✔ <strong>Droit d'opposition :</strong> Refuser le traitement de certaines données.</li>
            <li>✔ <strong>Droit à la portabilité :</strong> Récupération de vos données dans un format structuré.</li>
            <li>✔ <strong>Droit à la limitation du traitement :</strong> Demander la suspension temporaire du traitement de vos données dans certains cas prévus par le RGPD.</li>
            <li>✔ <strong>Droit de retirer votre consentement :</strong> Lorsque le traitement est fondé sur votre consentement, vous pouvez le retirer à tout moment, sans que cela ne compromette la licéité du traitement effectué avant ce retrait.</li>
          </ul>
          <p className="mt-4">
            📩 <strong>Exercer vos droits :</strong> <a href="mailto:contact@digiqo.fr" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">contact@digiqo.fr</a>
          </p>
          <p className="mt-4 text-gray-700">
            Vous disposez également du droit d'introduire une réclamation auprès de la <strong>CNIL</strong> (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-digiqo-secondary hover:text-digiqo-secondary-dark">www.cnil.fr</a>) si vous estimez que le traitement de vos données ne respecte pas la réglementation en vigueur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">10. Sécurité des données</h2>
          <p className="mb-4">Nous mettons en place des mesures de sécurité avancées pour protéger vos données :</p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Chiffrement des données sensibles.</li>
            <li>✔ Hébergement sécurisé via Hostinger.</li>
            <li>✔ Accès restreint aux seules personnes autorisées.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">11. Cookies et traceurs</h2>
          <p className="mb-4">Nous utilisons des cookies pour :</p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Améliorer la navigation et la performance du site.</li>
            <li>✔ Personnaliser les contenus et publicités.</li>
            <li>✔ Analyser le trafic via Google Analytics.</li>
          </ul>
          <p className="mt-4">
            📌 <strong>Gérer les cookies :</strong> Vous pouvez modifier vos préférences via le bandeau de consentement affiché sur le site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">12. Modifications de la politique</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique à tout moment. 
            Toute modification sera affichée sur cette page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-digiqo-primary mb-4">13. Contact</h2>
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