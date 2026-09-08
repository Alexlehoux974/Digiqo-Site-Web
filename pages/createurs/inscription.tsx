import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, BadgeCheck, Handshake, Megaphone } from 'lucide-react'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { CreatorApplicationForm } from '../../components/Createurs/CreatorApplicationForm'

// Tutoiement sur toute la page : on s'adresse aux créateurs, pas aux clients.
const reassurance = [
  { icon: Megaphone, text: 'Des marques réunionnaises qui cherchent des créateurs' },
  { icon: BadgeCheck, text: 'Chaque fiche est vérifiée avant publication' },
  { icon: Handshake, text: 'Aucun engagement, tu restes libre de refuser une mission' },
]

export default function InscriptionCreateurPage() {
  return (
    <>
      <Head>
        <title>Rejoindre le réseau de créateurs | Digiqo</title>
        <meta
          name="description"
          content="Créateur de contenu à La Réunion ? Ajoute ton profil au réseau Digiqo et collabore avec des marques réunionnaises. Chaque fiche est vérifiée avant publication."
        />
        <link rel="canonical" href="https://digiqo.fr/createurs/inscription" />
        <meta property="og:title" content="Rejoindre le réseau de créateurs | Digiqo" />
        <meta
          property="og:description"
          content="Ajoute ton profil au réseau de créateurs Digiqo et collabore avec des marques réunionnaises."
        />
        <meta property="og:url" content="https://digiqo.fr/createurs/inscription" />
        <meta property="og:type" content="website" />
      </Head>

      <ServiceLayout>
        <section className="bg-gradient-to-b from-gray-50 to-white pb-20 pt-28 sm:pb-28 sm:pt-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Link
              href="/createurs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour aux créateurs
            </Link>

            <h1 className="mt-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Rejoins le réseau de créateurs
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Présente-toi en 3 minutes. Ton profil rejoint le réseau Digiqo, et on te contacte dès
              qu&apos;une marque cherche exactement ce que tu sais faire.
            </p>

            <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {reassurance.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <Icon className="h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <CreatorApplicationForm />
            </div>
          </div>
        </section>
      </ServiceLayout>
    </>
  )
}
