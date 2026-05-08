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
  TableOfContents,
  CallOut,
  InlineQA,
  DefinitionBox,
  DIGIQO_AUTHOR,
} from '@/components/blog'
import type { BreadcrumbItem, TocItem } from '@/components/blog'

const BREADCRUMB: BreadcrumbItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Social Media', href: '/blog?cat=social-media' },
  { label: 'TikTok Ads La Réunion : prix 2026' },
]

const TOC: TocItem[] = [
  { id: 'section-1', label: 'Le CPM réel à La Réunion en 2026' },
  { id: 'section-2', label: 'Budget minimum pour un test' },
  { id: 'section-3', label: 'TikTok Ads vs Meta Ads' },
  { id: 'section-4', label: '5 étapes anti-budget brûlé' },
  {
    id: 'section-5',
    label: (
      <>
        Quand <em>ne pas</em> faire de TikTok Ads
      </>
    ),
  },
]

// Temporary placeholder sections so the scrollspy has something to track
// while commits 5-7 build the real prose blocks.
const PLACEHOLDER_SECTIONS = [
  { id: 'section-1', num: '01', title: 'Le CPM réel à La Réunion en 2026' },
  { id: 'section-2', num: '02', title: 'Budget minimum pour un test sérieux' },
  { id: 'section-3', num: '03', title: 'TikTok Ads vs Meta Ads : qui gagne en 2026 ?' },
  { id: 'section-4', num: '04', title: '5 étapes pour ne pas brûler son budget' },
  { id: 'section-5', num: '05', title: 'Quand ne pas faire de TikTok Ads' },
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

        {/* Two-column shell: prose on the left, sticky TOC on the right.
            Mobile collapses to single column with the TOC inlined above the
            prose. */}
        <div className="max-w-[1200px] mx-auto px-6 mt-3 grid lg:grid-cols-[1fr_240px] lg:gap-16 gap-6 pb-16">
          <article className="max-w-[760px] min-w-0">
            <div className="mt-9">
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

            <div className="mt-8">
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

            {/* ─── Section 1 ─── */}
            <section className="mt-16">
              <h2
                id="section-1"
                className="font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] scroll-mt-[96px]"
              >
                <span className="inline-block text-[13px] font-bold text-digiqo-primary bg-digiqo-primary/[0.08] px-2.5 py-1 rounded-md mr-2.5 align-middle -translate-y-[3px] tracking-[0.04em] font-display">
                  01
                </span>
                Le CPM réel à La Réunion en 2026
              </h2>

              <p className="mt-4 text-[17.5px] leading-[1.78] text-slate-700">
                Le marché publicitaire TikTok local est en avance sur l'algorithme et en retard sur
                les annonceurs — c'est ça l'opportunité. Concrètement, les enchères sont moins
                compétitives que sur{' '}
                <a href="#" className="text-digiqo-primary font-medium underline decoration-digiqo-primary underline-offset-2 hover:text-digiqo-accent hover:decoration-digiqo-accent">
                  Meta Ads
                </a>{' '}
                ou{' '}
                <a href="#" className="text-digiqo-primary font-medium underline decoration-digiqo-primary underline-offset-2 hover:text-digiqo-accent hover:decoration-digiqo-accent">
                  Google Ads
                </a>{' '}
                car la majorité des budgets locaux n'ont pas encore migré.
              </p>

              <DefinitionBox term="CPM (Coût Pour Mille)">
                Coût pour 1 000 impressions de votre publicité. Plus le CPM est bas, moins cher vous
                payez pour être vu. Voir notre <a href="/glossaire">glossaire publicité digitale</a>{' '}
                pour les définitions complètes (CPC, CPA, ROAS, etc.).
              </DefinitionBox>

              <CallOut variant="stat" label="Le chiffre qui compte" statValue="+60 %">
                <p>
                  de portée organique supplémentaire pour une vidéo qui combine hashtag local
                  (#974, #LaReunion) <em>et</em> hashtag tendance global, comparé à une vidéo
                  sans hashtag local.
                </p>
                <p style={{ fontSize: '12.5px', color: '#64748B', marginTop: '8px' }}>
                  Source : analyse Digiqo · 2 400 vidéos clients · Q1 2026
                </p>
              </CallOut>

              <InlineQA question="Pourquoi le CPM artisanat est si bas à La Réunion ?">
                Parce que personne ou presque n'enchérit sur ces audiences. Sur les 30 dernières
                campagnes Digiqo en artisanat 974, l'enchère est gagnée 78 % du temps au prix
                plancher.
              </InlineQA>

              <CallOut variant="anecdote" label="Anecdote 974">
                <p>
                  <strong>Pendant le Grand Raid 2025</strong>, on a accompagné une marque de
                  chaussures de trail basée à Saint-Paul. Une vidéo de 19 secondes filmée à Mafate,
                  avec une voix-off en créole et zéro production, a fait{' '}
                  <strong>2,1 M de vues organiques</strong> en 4 jours. Coût : 0 €. Trois mois de
                  stock écoulés sur la première semaine post-publication.
                </p>
              </CallOut>
            </section>

            {/* ─── Sections 2-5 placeholders (replaced in commits 6-7) ─── */}
            {PLACEHOLDER_SECTIONS.slice(1).map((s) => (
              <section key={s.id} className="mt-16">
                <h2
                  id={s.id}
                  className="font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] scroll-mt-[96px]"
                >
                  <span className="inline-block text-[13px] font-bold text-digiqo-primary bg-digiqo-primary/[0.08] px-2.5 py-1 rounded-md mr-2.5 align-middle -translate-y-[3px] tracking-[0.04em] font-display">
                    {s.num}
                  </span>
                  {s.title}
                </h2>
                <p className="mt-3 text-slate-500 italic text-[15px]">
                  🚧 Bloc de contenu à venir au commit suivant.
                </p>
              </section>
            ))}

            <div className="my-16 py-8 text-center border-t border-dashed border-slate-300 text-slate-500 text-sm">
              🚧 Composants suivants : StatHero · BarChart · ComparisonTable · NumberedSteps ·
              PullQuote · FAQ · Sources · Author bio · Related · BlogCTA
            </div>
          </article>

          <aside>
            <TableOfContents items={TOC} />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  )
}
