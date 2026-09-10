import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { ArrowLeft, Camera, Heart, MapPin, MessageCircle, Star, Zap } from 'lucide-react'
import ServiceLayout from '../../components/ServiceLayout/ServiceLayout'
import { CategoryPill, LevelBadge } from '../../components/Createurs/CreatorBadges'
import { CreatorShareButtons } from '../../components/Createurs/CreatorShareButtons'
import { contentTypeIcons } from '../../components/Createurs/contentTypeIcons'
import { platformsOf } from '../../components/Createurs/platforms'
import type { Influencer } from '@/lib/createurs/types'
import { CATEGORY_LABELS, CREATOR_NOUNS } from '@/lib/createurs/types'
import { getCreatorBySlug, getCreatorsForPage } from '@/lib/createurs/airtable'
import {
  SMALL_AUDIENCE_TITLE,
  displayedEngagement,
  getAvgEngagement,
  getAvgEngagementValue,
  getNicheColor,
} from '@/lib/createurs/helpers'
import { demandeHref } from '@/lib/createurs/demande'
import { SITE_URL, ficheUrl, normalizeSlug, truncateForMeta } from '@/lib/createurs/fiche'

// ──────────────────────────────────────────────
// FICHE PUBLIQUE D'UN CRÉATEUR — /createurs/{handle}
//
// Une URL par créatrice : elle la colle dans sa bio ou sa story, un client la
// partage en interne. Même information que le panneau détail de la liste, mais
// indexable, partageable et dotée de ses propres métadonnées sociales.
// ──────────────────────────────────────────────

interface Props {
  creator: Influencer
}

export default function CreatorProfilePage({ creator }: Props) {
  const platforms = platformsOf(creator)
  const canonical = ficheUrl(creator.slug)
  const photoUrl = `${SITE_URL}${creator.photo}`
  const category = CATEGORY_LABELS[creator.categorie]
  // Le nom suit le champ « Genre » d'Airtable, jamais le prénom : sans genre
  // renseigné, la forme inclusive plutôt qu'un pari.
  const noun = CREATOR_NOUNS[creator.genre]
  const title = creator.city
    ? `${creator.firstName} — ${noun} ${category} à ${creator.city} | Réseau Créateurs Digiqo`
    : `${creator.firstName} — ${noun} ${category} | Réseau Créateurs Digiqo`
  const description = truncateForMeta(creator.bio)
  const avg = getAvgEngagementValue(creator)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: creator.name,
    image: photoUrl,
    url: canonical,
    sameAs: platforms.map((platform) => platform.stats.url),
    ...(creator.city ? { address: { '@type': 'PostalAddress', addressLocality: creator.city } } : {}),
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={photoUrl} />
        <meta property="og:image:alt" content={`Photo de ${creator.name}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={photoUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <ServiceLayout>
        <section className="bg-gradient-to-b from-gray-50 to-white pb-20 pt-28 sm:pb-28 sm:pt-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Link
              href="/createurs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour aux créateurs
            </Link>

            {/* ── EN-TÊTE ── */}
            <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
              <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-3xl bg-gray-100 sm:h-40 sm:w-40">
                <Image
                  src={creator.photo}
                  alt={creator.name}
                  fill
                  sizes="(min-width: 640px) 160px, 128px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{creator.name}</h1>
                {creator.handle && <p className="mt-1 text-sm text-gray-500">{creator.handle}</p>}
                {creator.location && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {creator.location}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <LevelBadge niveau={creator.niveau} />
                  <CategoryPill categorie={creator.categorie} />
                  {creator.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-700">
                      <Star className="h-3 w-3" aria-hidden="true" />
                      Mise en avant
                    </span>
                  )}
                </div>

                {avg !== null && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2">
                    <Zap className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    <span className="text-xs font-medium text-gray-500">Engagement moyen</span>
                    <span className="text-lg font-extrabold text-gray-900">{getAvgEngagement(creator)}</span>
                  </div>
                )}
              </div>
            </header>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
              {/* ── COLONNE PRINCIPALE ── */}
              <div className="flex flex-col gap-8">
                {platforms.length > 0 && (
                  <section>
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Plateformes</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {platforms.map((platform) => (
                        <a
                          key={platform.key}
                          href={platform.stats.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                        >
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                            {platform.icon}
                            {platform.label}
                          </span>
                          <div className="mt-1.5 text-2xl font-extrabold leading-none text-gray-900">
                            {platform.stats.followers}
                          </div>
                          <div className="mt-1 text-[10px] text-gray-400">abonnés</div>
                          {/* Sous 500 abonnés, « — » plutôt qu'un taux qui ne veut rien dire. */}
                          <div
                            title={displayedEngagement(platform.stats) ? undefined : SMALL_AUDIENCE_TITLE}
                            className={`mt-2 inline-flex items-center gap-1 text-[11px] font-semibold ${
                              displayedEngagement(platform.stats) ? 'text-gray-600' : 'text-gray-400'
                            }`}
                          >
                            <Heart
                              className={`h-3 w-3 ${displayedEngagement(platform.stats) ? 'text-gray-400' : 'text-gray-300'}`}
                              aria-hidden="true"
                            />
                            {displayedEngagement(platform.stats) ?? '—'}
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {creator.bio && (
                  <section>
                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">À propos</h2>
                    <p className="text-[15px] leading-relaxed text-gray-600">{creator.bio}</p>
                  </section>
                )}

                {creator.niches.length > 0 && (
                  <section>
                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Niches</h2>
                    <div className="flex flex-wrap gap-2">
                      {creator.niches.map((niche) => (
                        <span
                          key={niche}
                          className={`inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white ${getNicheColor(niche)}`}
                        >
                          {niche}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {creator.contentTypes.length > 0 && (
                  <section>
                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Formats</h2>
                    <div className="flex flex-wrap gap-2">
                      {creator.contentTypes.map((type) => {
                        const Icon = contentTypeIcons[type] || Camera
                        return (
                          <span key={type} className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1">
                            <Icon className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />
                            <span className="text-xs font-medium text-gray-600">{type}</span>
                          </span>
                        )
                      })}
                    </div>
                  </section>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  <span className="text-gray-500">Tarifs</span>
                  <span className="font-semibold text-gray-800">Sur demande</span>
                </div>
              </div>

              {/* ── COLONNE ACTIONS ── */}
              <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
                <a
                  href={demandeHref([creator.handle])}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Engager ce créateur
                </a>

                <CreatorShareButtons url={canonical} name={creator.name} />
              </aside>
            </div>
          </div>
        </section>
      </ServiceLayout>
    </>
  )
}

// Les fiches publiées sont pré-rendues ; `blocking` couvre celles publiées après
// le dernier build — la première visite la génère, sans page vide entre-temps.
export const getStaticPaths: GetStaticPaths = async () => {
  const { creators } = await getCreatorsForPage()
  return {
    paths: creators.map((creator) => ({ params: { handle: creator.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = normalizeSlug(params?.handle)
  // Fiche inconnue, retirée du site ou slug hors alphabet : 404, jamais de page vide.
  // Le `revalidate` fait réessayer plus tard, le temps qu'une fiche soit publiée.
  if (!slug) return { notFound: true, revalidate: 1800 }

  const creator = await getCreatorBySlug(slug)
  if (!creator) return { notFound: true, revalidate: 1800 }

  return { props: { creator }, revalidate: 1800 }
}
