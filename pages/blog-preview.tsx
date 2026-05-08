// Live preview page for the Sprint 2 blog redesign.
// Assembles the new components inside the real site shell (HeaderLuxury +
// Footer) so Alexandre can validate the rendering in actual context. As we
// build more components (commits 4-7), they're appended to this page.
// Will be removed at commit 9 when the real /blog/[slug] template is ready.

import Head from 'next/head'
import { HeaderLuxury } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  ArticleHero,
  TldrBox,
  QuickAnswer,
  DIGIQO_AUTHOR,
} from '@/components/blog'
import type { BreadcrumbItem } from '@/components/blog'

const BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Social Media', href: '/blog?cat=social-media' },
  { label: 'TikTok Ads La Réunion : prix 2026' },
]

export default function BlogPreviewPage() {
  return (
    <>
      <Head>
        <title>Preview Sprint 2 — TikTok Ads La Réunion en 2026 | Digiqo</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="description"
          content="Page de preview interne pour la refonte blog Sprint 2 — non indexable."
        />
      </Head>

      <HeaderLuxury />

      {/* pt-32 matches the offset used by every other site page to clear the
          sticky HeaderLuxury (topbar + main nav). */}
      <main className="pt-32">
        <ArticleHero
          breadcrumb={BREADCRUMB}
          cluster="Social Media · TikTok Ads"
          clusterHref="/blog?cat=social-media"
          readTime="9 min de lecture"
          date="12 mars 2026"
          dateModified="06 mai 2026"
          dateModifiedIso="2026-05-06T08:00:00+04:00"
          title="TikTok Ads à La Réunion : combien ça coûte vraiment en 2026 ?"
          titleAccent="en 2026 ?"
          lede="CPM, CPA, ROAS, budget minimum et comparaison vs Meta Ads. Données 2026 issues de 50 comptes locaux que nous gérons. Pas de blabla : que des chiffres et des fourchettes vérifiées."
          author={DIGIQO_AUTHOR}
        />

        <div className="max-w-[760px] mx-auto px-6 mt-9">
          <TldrBox
            forWhom={[
              'Dirigeants de PME réunionnaises envisageant TikTok Ads',
              'Responsables marketing qui benchmarkent CPM/CPA 974',
              <>
                Indépendants qui veulent leur 1<sup>er</sup> budget pub TikTok
              </>,
            ]}
            whatYouLearn={[
              'Le CPM réel TikTok à La Réunion en 2026 (fourchette par secteur)',
              'Le budget minimum pour un test sérieux',
              'La méthode Digiqo en 5 étapes pour ne pas brûler ton budget',
              <>
                Quand TikTok Ads est <em>moins</em> rentable que Meta Ads
              </>,
            ]}
          />
        </div>

        <div className="max-w-[760px] mx-auto px-6 mt-8">
          <QuickAnswer
            question="Combien coûtent les TikTok Ads à La Réunion en 2026 ?"
            answer={
              <>
                Compte <strong>8 à 15 € de CPM</strong> à La Réunion en 2026, soit 40 à 50 % moins
                cher qu'en métropole. Le CPA moyen toutes industries confondues est de{' '}
                <strong>9,40 €</strong> (vs 28 € sur Meta Ads pour le même panier moyen). Budget
                minimum recommandé pour un test sérieux : <strong>1 500 € sur 90 jours</strong>.
                ROAS médian observé sur 50 comptes Digiqo en 2026 :{' '}
                <strong>4,2× sur 30 jours</strong>, montant à 6,8× sur 90 jours grâce au retargeting.
              </>
            }
            wordCount={86}
            targetQuery="prix TikTok Ads Réunion 2026"
          />
        </div>

        {/* Placeholder marker — next commits will append: TOC, prose, callouts,
            data blocks, FAQ, sources, author bio, related, blog CTA. */}
        <div className="max-w-[760px] mx-auto px-6 my-16 py-8 text-center border-t border-dashed border-slate-300 text-slate-500 text-sm">
          🚧 Composants suivants à venir aux commits 4-7 du Sprint 2
        </div>
      </main>

      <Footer />
    </>
  )
}
