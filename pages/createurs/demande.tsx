import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeft, Clock, ShieldCheck, Users } from 'lucide-react'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { CreatorRequestForm } from '../../components/Createurs/CreatorRequestForm'
import { parseHandlesParam } from '@/lib/createurs/demande'

const reassurance = [
  { icon: Users, text: 'Des créateurs vérifiés, sélectionnés par Digiqo' },
  { icon: Clock, text: 'Réponse sous 48 h ouvrées' },
  { icon: ShieldCheck, text: 'Aucun engagement, aucune mise en relation automatique' },
]

export default function DemandeCreateurPage() {
  const router = useRouter()
  // La query n'est disponible qu'après l'hydratation sur une page statique :
  // on part d'une présélection vide, puis on la remplit dès que le router est prêt.
  const [handlesParam, setHandlesParam] = useState<string | null>(null)

  useEffect(() => {
    if (!router.isReady) return
    const value = router.query.createurs
    setHandlesParam(Array.isArray(value) ? value[0] ?? '' : value ?? '')
  }, [router.isReady, router.query.createurs])

  const handles = useMemo(() => parseHandlesParam(handlesParam), [handlesParam])

  return (
    <>
      <Head>
        <title>Demander un créateur de contenu | Digiqo</title>
        <meta
          name="description"
          content="Décrivez votre besoin en 2 minutes : Digiqo sélectionne le créateur de contenu adapté à votre marque parmi son réseau à La Réunion et revient vers vous sous 48 h ouvrées."
        />
        {/* Canonique sans paramètre : ?createurs= ne crée pas d'URL indexable distincte. */}
        <link rel="canonical" href="https://digiqo.fr/createurs/demande" />
        <meta property="og:title" content="Demander un créateur de contenu | Digiqo" />
        <meta
          property="og:description"
          content="Décrivez votre besoin, Digiqo fait le matchmaking avec les créateurs de son réseau."
        />
        <meta property="og:url" content="https://digiqo.fr/createurs/demande" />
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
              Demande de créateur
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Décrivez votre besoin en 2 minutes. Digiqo fait le matchmaking avec les créateurs de
              son réseau et revient vers vous avec une proposition.
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
              <CreatorRequestForm initialHandles={handles} variant="page" />
            </div>
          </div>
        </section>
      </ServiceLayout>
    </>
  )
}
