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
  StatHero,
  BarChart,
  PullQuote,
  NumberedSteps,
  ComparisonTable,
  FAQ,
  SourcesBlock,
  AuthorCardExtended,
  RelatedArticles,
  BlogCTA,
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

              <StatHero
                value="8-15 €"
                sourceLabel="analyse Digiqo · 50 comptes clients · janv-mars 2026 · benchmark TikTok Ads Manager"
                sourceUrl="https://www.tiktok.com/business/fr"
              >
                C'est la fourchette du <strong>CPM TikTok Ads à La Réunion en 2026</strong>, contre
                18-32 € en France métropolitaine. Un avantage de 40-50 % qui ne durera pas.
              </StatHero>

              <h3 className="font-display font-bold text-[22px] text-digiqo-black mt-9 mb-2 leading-[1.3] tracking-[-0.015em]">
                Variations par secteur d'activité
              </h3>
              <p className="text-[17.5px] leading-[1.78] text-slate-700">
                La fourchette 8-15 € masque de fortes variations. Certaines verticales locales sont
                encore quasi-vierges (artisanat, services pros B2B), d'autres saturées (e-commerce
                mode, restauration Saint-Gilles).
              </p>

              <BarChart
                title="CPM TikTok Ads par secteur · La Réunion 2026 (€)"
                rows={[
                  { label: 'Artisanat / déco', widthPct: 38, valueLabel: '7,80 €' },
                  { label: 'B2B services', widthPct: 42, valueLabel: '8,40 €' },
                  { label: 'Beauté / bien-être', widthPct: 55, valueLabel: '11,20 €' },
                  { label: 'E-commerce mode', widthPct: 68, valueLabel: '13,80 €' },
                  { label: 'Restauration St-Gilles', widthPct: 74, valueLabel: '14,90 €' },
                  { label: 'Immobilier', widthPct: 82, valueLabel: '16,50 €' },
                ]}
              />

              <InlineQA question="Pourquoi le CPM artisanat est si bas à La Réunion ?">
                Parce que personne ou presque n'enchérit sur ces audiences. Sur les 30 dernières
                campagnes Digiqo en artisanat 974, l'enchère est gagnée 78 % du temps au prix
                plancher. Cette fenêtre se refermera quand{' '}
                <a href="/services/community-management">notre offre community management</a>{' '}
                aura convaincu plus d'artisans de se lancer.
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

            {/* ─── Section 2 ─── */}
            <section className="mt-16">
              <h2
                id="section-2"
                className="font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] scroll-mt-[96px]"
              >
                <span className="inline-block text-[13px] font-bold text-digiqo-primary bg-digiqo-primary/[0.08] px-2.5 py-1 rounded-md mr-2.5 align-middle -translate-y-[3px] tracking-[0.04em] font-display">
                  02
                </span>
                Budget minimum pour un test sérieux
              </h2>

              <p className="mt-4 text-[17.5px] leading-[1.78] text-slate-700">
                En dessous d'un certain seuil, l'algorithme TikTok n'a pas assez de signaux pour
                optimiser. Tu brûles ton budget en phase d'apprentissage perpétuelle. Le seuil
                critique observé sur le marché local : <strong>1 500 €</strong>.
              </p>

              <CallOut variant="warning" label="Erreur classique">
                <p>
                  Tester avec 300 €/mois pendant 1 mois. L'algorithme n'a pas le temps de sortir de
                  la phase d'apprentissage (~50 conversions requises). Conclusion fausse :
                  « TikTok Ads ne marche pas pour mon business. » Réalité : tu n'as pas testé, tu
                  as donné de l'argent à TikTok.
                </p>
              </CallOut>

              <ComparisonTable
                title="Budget test 1 500 € sur 90 jours · répartition recommandée"
                subtitle="Méthodologie Digiqo · validée sur 50+ campagnes locales"
                headers={['Phase', 'Durée', 'Budget', 'Objectif']}
                rows={[
                  [
                    { kind: 'text', value: 'Exploration' },
                    { kind: 'text', value: '30 jours' },
                    { kind: 'text', value: '500 €' },
                    { kind: 'text', value: 'Tester 5-7 créatives, identifier le hook gagnant' },
                  ],
                  [
                    { kind: 'text', value: 'Optimisation' },
                    { kind: 'text', value: '30 jours' },
                    { kind: 'text', value: '500 €' },
                    { kind: 'text', value: 'Concentrer le budget sur les top 2 ad sets, optimiser CPA' },
                  ],
                  [
                    { kind: 'text', value: 'Scaling + retargeting' },
                    { kind: 'text', value: '30 jours' },
                    { kind: 'text', value: '500 €' },
                    { kind: 'text', value: 'Monter le budget journalier, activer audiences chaudes' },
                  ],
                ]}
              />
            </section>

            {/* ─── Section 3 ─── */}
            <section className="mt-16">
              <h2
                id="section-3"
                className="font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] scroll-mt-[96px]"
              >
                <span className="inline-block text-[13px] font-bold text-digiqo-primary bg-digiqo-primary/[0.08] px-2.5 py-1 rounded-md mr-2.5 align-middle -translate-y-[3px] tracking-[0.04em] font-display">
                  03
                </span>
                TikTok Ads vs Meta Ads : qui gagne en 2026 ?
              </h2>

              <p className="mt-4 text-[17.5px] leading-[1.78] text-slate-700">
                Comparaison frontale sur les indicateurs qui comptent réellement pour un annonceur
                réunionnais en 2026, sur la base de campagnes appariées (même budget, même audience
                cible, même offre).
              </p>

              <ComparisonTable
                title="TikTok Ads vs Meta Ads · benchmark Réunion 2026"
                subtitle="Sur 24 comptes appariés Digiqo · janv-mars 2026 · panier moyen 85 €"
                headers={['Indicateur', 'TikTok Ads', 'Meta Ads', 'Avantage']}
                rows={[
                  [
                    { kind: 'text', value: 'CPM moyen' },
                    { kind: 'text', value: '11,20 €' },
                    { kind: 'text', value: '22,40 €' },
                    { kind: 'verdict', value: 'TikTok ÷2', winner: 'left' },
                  ],
                  [
                    { kind: 'text', value: 'CTR moyen' },
                    { kind: 'text', value: '2,8 %' },
                    { kind: 'text', value: '1,1 %' },
                    { kind: 'verdict', value: 'TikTok ×2,5', winner: 'left' },
                  ],
                  [
                    { kind: 'text', value: 'CPA moyen' },
                    { kind: 'text', value: '9,40 €' },
                    { kind: 'text', value: '28,10 €' },
                    { kind: 'verdict', value: 'TikTok ÷3', winner: 'left' },
                  ],
                  [
                    { kind: 'text', value: 'Taux de conversion' },
                    { kind: 'text', value: '1,9 %' },
                    { kind: 'text', value: '2,4 %' },
                    { kind: 'verdict', value: 'Meta +25 %', winner: 'right' },
                  ],
                  [
                    { kind: 'text', value: 'Audience B2B' },
                    { kind: 'text', value: 'Limitée 974' },
                    { kind: 'text', value: 'Forte' },
                    { kind: 'verdict', value: 'Meta net', winner: 'right' },
                  ],
                  [
                    { kind: 'text', value: 'ROAS 30 jours' },
                    { kind: 'text', value: '4,2×' },
                    { kind: 'text', value: '2,8×' },
                    { kind: 'verdict', value: 'TikTok +50 %', winner: 'left' },
                  ],
                ]}
              />

              <PullQuote attribution="retour d'expérience Digiqo · 50 comptes 2026">
                {`TikTok gagne sur l'acquisition. Meta gagne sur la fidélisation.\nLes deux ensemble battent l'un ou l'autre.`}
              </PullQuote>
            </section>

            {/* ─── Section 4 ─── */}
            <section className="mt-16">
              <h2
                id="section-4"
                className="font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] scroll-mt-[96px]"
              >
                <span className="inline-block text-[13px] font-bold text-digiqo-primary bg-digiqo-primary/[0.08] px-2.5 py-1 rounded-md mr-2.5 align-middle -translate-y-[3px] tracking-[0.04em] font-display">
                  04
                </span>
                5 étapes pour ne pas brûler son budget
              </h2>

              <p className="mt-4 text-[17.5px] leading-[1.78] text-slate-700">
                La méthode Digiqo en 5 étapes, validée sur 50+ comptes, pour qu'une campagne TikTok
                Ads à 1 500 € sur 90 jours sorte rentable plutôt que ruinée.
              </p>

              <NumberedSteps
                steps={[
                  {
                    title: 'Installer pixel TikTok + API Conversions',
                    body: (
                      <>
                        Sans tracking serveur en 2026, tu tires à l'aveugle. iOS 17+ a tué le pixel
                        client-side. On installe systématiquement les deux. Voir notre{' '}
                        <a href="/services/publicite-en-ligne">offre tracking publicitaire</a>.
                      </>
                    ),
                  },
                  {
                    title: 'Tourner 5-7 créatives en interne',
                    body: 'Smartphone + lumière naturelle. Les vidéos studio polies sous-performent les vidéos UGC de 60 % en moyenne.',
                  },
                  {
                    title: 'Lancer en CBO avec audiences larges',
                    body: 'Campaign Budget Optimization > Ad Set BO sur petit budget local. Audiences ouvertes > 500k personnes — l\'algorithme trouve seul ton acheteur.',
                  },
                  {
                    title: 'Tuer impitoyablement à J+7',
                    body: 'Toute créative sous 1 % CTR ou CPA > 2× cible est coupée. Pas de débat, pas d\'attendrissement. La discipline = la rentabilité.',
                  },
                  {
                    title: 'Activer retargeting J+30',
                    body: (
                      <>
                        Audiences custom : visiteurs site 30 jours, viewers vidéo 75 %, ATC abandonnés.
                        C'est là que le ROAS double. Voir notre{' '}
                        <a href="/services/community-management">guide complet du retargeting TikTok</a>.
                      </>
                    ),
                  },
                ]}
              />

              <CallOut variant="opinion" label="Mon avis (Alexandre)">
                <p>
                  Je vois encore beaucoup d'agences locales qui externalisent la création vidéo et
                  facturent 800 € la créative. Sur TikTok, c'est suicidaire.{' '}
                  <strong>La vidéo doit venir de toi ou de ton équipe.</strong> Une agence comme la
                  nôtre intervient sur la stratégie, le ciblage et l'analyse — pas sur la production.
                </p>
              </CallOut>
            </section>

            {/* ─── Section 5 ─── */}
            <section className="mt-16">
              <h2
                id="section-5"
                className="font-display font-bold text-[30px] text-digiqo-black tracking-[-0.025em] leading-[1.18] scroll-mt-[96px]"
              >
                <span className="inline-block text-[13px] font-bold text-digiqo-primary bg-digiqo-primary/[0.08] px-2.5 py-1 rounded-md mr-2.5 align-middle -translate-y-[3px] tracking-[0.04em] font-display">
                  05
                </span>
                Quand <em>ne pas</em> faire de TikTok Ads
              </h2>

              <p className="mt-4 text-[17.5px] leading-[1.78] text-slate-700">
                Tout le monde te vendra TikTok comme la solution miracle. Voici les 4 cas où on
                déconseille TikTok Ads à un client réunionnais en 2026.
              </p>

              <ul className="mt-4 space-y-2.5 text-[17.5px] leading-[1.7] text-slate-700">
                {[
                  <>
                    <strong>Cible &gt; 55 ans exclusive</strong> — l'audience reste dominée par
                    16-44 ans malgré l'élargissement. Privilégier{' '}
                    <a href="/services/publicite-en-ligne" className="text-digiqo-primary underline decoration-digiqo-primary underline-offset-2 hover:text-digiqo-accent">
                      Facebook Ads
                    </a>{' '}
                    ou Google Search Ads.
                  </>,
                  <>
                    <strong>Vente B2B grands comptes</strong> — TikTok n'est pas un canal lead gen
                    B2B sur 974. LinkedIn Ads reste la référence.
                  </>,
                  <>
                    <strong>Budget &lt; 1 500 € sur 90 jours</strong> — comme expliqué section 02,
                    l'algo a besoin de signaux. Mieux vaut{' '}
                    <a href="/services/community-management" className="text-digiqo-primary underline decoration-digiqo-primary underline-offset-2 hover:text-digiqo-accent">
                      démarrer en organique
                    </a>
                    .
                  </>,
                  <>
                    <strong>Aucune ressource vidéo interne</strong> — si personne dans ton équipe
                    ne peut filmer 5 vidéos par semaine, TikTok Ads ne tiendra pas. Construis
                    l'organique d'abord.
                  </>,
                ].map((node, idx) => (
                  <li key={idx} className="relative pl-7 before:content-[''] before:absolute before:left-1 before:top-[0.7em] before:w-2 before:h-2 before:bg-digiqo-primary before:rounded-full">
                    {node}
                  </li>
                ))}
              </ul>
            </section>

            <FAQ
              title="Questions fréquentes sur les TikTok Ads à La Réunion"
              subtitle="Les questions qu'on nous pose le plus en consultation."
              items={[
                {
                  question:
                    'Combien coûte une campagne TikTok Ads pour démarrer à La Réunion en 2026 ?',
                  answer: (
                    <p>
                      Le budget minimum recommandé pour un test sérieux est de{' '}
                      <strong>1 500 € sur 90 jours</strong> (≈ 500 € par mois). En dessous,
                      l'algorithme TikTok n'a pas assez de signaux pour optimiser. Voir notre{' '}
                      <a href="/services/publicite-en-ligne">offre publicité TikTok Ads</a>.
                    </p>
                  ),
                },
                {
                  question: 'TikTok Ads est-il moins cher que Meta Ads à La Réunion ?',
                  answer: (
                    <p>
                      Oui, le CPM TikTok à La Réunion est en moyenne 50 % moins cher (11 € vs 22 €)
                      et le CPA 3× plus bas (9,40 € vs 28 €). Le taux de conversion final reste
                      légèrement supérieur sur Meta (+25 %), donc la stratégie optimale combine les
                      deux.
                    </p>
                  ),
                },
                {
                  question: 'Faut-il un compte business TikTok pour faire de la publicité ?',
                  answer: (
                    <p>
                      Oui, il faut basculer en compte TikTok Business (gratuit) puis créer un
                      compte TikTok Ads Manager. La bascule se fait en 2 minutes.
                    </p>
                  ),
                },
                {
                  question: 'Combien de temps avant de voir des résultats sur TikTok Ads ?',
                  answer: (
                    <p>
                      Premiers signaux dès J+7. Phase d'apprentissage stabilisée à J+14 (après ~50
                      conversions). Performance optimale à partir de J+30 si vous tournez
                      régulièrement vos créatives.
                    </p>
                  ),
                },
                {
                  question: 'Peut-on faire de la publicité TikTok sans compte TikTok actif ?',
                  answer: (
                    <p>
                      Techniquement oui, mais on déconseille fortement : sans compte actif, les
                      publicités n'ont pas de crédibilité algorithmique, et vous perdez la
                      possibilité de faire du Spark Ads. On recommande{' '}
                      <a href="/services/community-management">notre offre community management</a>{' '}
                      pour bâtir la base organique en parallèle.
                    </p>
                  ),
                },
              ]}
            />

            <SourcesBlock
              sources={[
                {
                  label: 'TikTok For Business — Documentation officielle',
                  url: 'https://www.tiktok.com/business/fr',
                  description:
                    'Plateforme officielle annonceurs · données plateforme et formats publicitaires 2026',
                },
                {
                  label: 'Statista — TikTok Statistics 2026',
                  url: 'https://www.statista.com/topics/6077/tiktok/',
                  description: "Données chiffrées globales d'usage et audience démographique",
                },
                {
                  label: 'Think with Google — Video Marketing',
                  url: 'https://www.thinkwithgoogle.com/marketing-strategies/video/',
                  description: 'Insights audience vidéo et benchmarks publicitaires',
                },
                {
                  label: 'Hootsuite Blog — Social Trends 2026',
                  url: 'https://blog.hootsuite.com/',
                  description: 'Analyses comparatives plateformes et benchmarks engagement',
                },
                {
                  label: 'Données primaires Digiqo',
                  primary: true,
                  description:
                    'Analyse interne de 50 comptes clients réunionnais · janvier-mars 2026 · panier moyen 85 €',
                },
              ]}
            />

            <AuthorCardExtended author={DIGIQO_AUTHOR} />
          </article>

          <aside>
            <TableOfContents items={TOC} />
          </aside>
        </div>

        <RelatedArticles
          clusterLink={{ label: 'Voir tout le cluster Social Media →', href: '/blog?cat=social-media' }}
          articles={[
            {
              slug: 'tiktok-strategie-organique-reunion',
              title: 'TikTok à La Réunion : la stratégie organique en 2026',
              excerpt: 'Avant de payer, sache scaler ton organique. Le guide complet.',
              pillLabel: 'TikTok organique',
              readTime: '12 min de lecture',
            },
            {
              slug: 'pixel-tiktok-installation-974',
              title: 'Pixel TikTok + API Conversions : guide d\'installation 974',
              excerpt: 'Le tracking étape par étape pour ne pas rater de conversion en 2026.',
              pillLabel: 'Tracking',
              readTime: '8 min de lecture',
            },
            {
              slug: 'tiktok-vs-meta-vs-google-ads-reunion',
              title: 'TikTok vs Meta vs Google Ads : quel canal en 2026 à La Réunion ?',
              excerpt: 'Comparatif data-driven sur 100 campagnes. Le guide définitif.',
              pillLabel: 'Stratégie',
              readTime: '11 min de lecture',
            },
          ]}
        />

        <BlogCTA
          eyebrow="Audit gratuit · 30 minutes"
          heading="Prêt à lancer ton premier test TikTok Ads à La Réunion ?"
          body="On audite ton compte, on dimensionne ton budget, on te remet un plan d'action écrit. Sans engagement."
          primary={{ label: 'Demander mon audit gratuit', href: '/audit' }}
          secondary={{ label: "Voir l'offre TikTok Ads", href: '/services/publicite-en-ligne' }}
        />
      </main>

      <Footer />
    </>
  )
}
