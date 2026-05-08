// Single source of truth for blog articles.
//
// Content is now 100% JSON-serializable (no JSX, no React.ReactNode). This
// is the prerequisite for the future Airtable / Supabase integration: an
// external CMS can produce this exact shape via a build step or fetch, and
// no component/template change will be needed.
//
// Rich text inside strings uses a tiny markdown subset parsed by RichText
// at render time:
//   **bold**, *italic*, [text](url), ^sup^
//
// Sprint 2 starts the new template with one canonical article. The 6 legacy
// articles were deleted after Alexandre validated the redesign on
// `/blog-preview` (2026-05-08, branche seo-geo-rattrapage-s2).

import type {
  ArticleAuthor,
  BlogArticleContent,
  BlogArticleData,
  RelatedArticleRef,
} from '@/components/blog'
import { AUTHORS, DIGIQO_AUTHOR } from '@/components/blog'

// ─── Article: TikTok Ads à La Réunion en 2026 ─────────────────────────────

const TIKTOK_ADS_DATA: BlogArticleData = {
  id: 'tiktok-ads-prix-reunion-2026',
  slug: 'tiktok-ads-prix-reunion-2026',
  title: 'TikTok Ads à La Réunion : combien ça coûte vraiment en 2026 ?',
  titleAccent: 'en 2026 ?',
  excerpt:
    "CPM, CPA, ROAS, budget minimum et comparaison vs Meta Ads. Données 2026 issues de 50 comptes locaux que nous gérons. Pas de blabla : que des chiffres et des fourchettes vérifiées.",
  metaDescription:
    'Combien coûtent vraiment les TikTok Ads à La Réunion en 2026 ? CPM 8-15 €, CPA moyen, budget minimum, ROAS attendu et comparaison vs Meta Ads. Guide chiffré Digiqo.',
  category: 'Social Media',
  cluster: 'Social Media · TikTok Ads',
  clusterHref: '/blog?cat=social-media',
  date: '12 mars 2026',
  dateModified: '2026-05-06T08:00:00+04:00',
  dateModifiedLabel: '06 mai 2026',
  readTime: '9 min de lecture',
  featuredImage: '/blog-images/tiktok-hero.jpeg',
  tags: ['TikTok Ads', 'Réunion', 'Publicité digitale', 'CPM', 'ROAS', '2026'],
  authorKey: 'alexandre-lehoux',
  relatedSlugs: [
    'tiktok-strategie-organique-reunion',
    'pixel-tiktok-installation-974',
    'tiktok-vs-meta-vs-google-ads-reunion',
  ],
}

const TIKTOK_ADS_CONTENT: BlogArticleContent = {
  tldr: {
    forWhom: [
      'Dirigeants de PME réunionnaises envisageant TikTok Ads',
      'Responsables marketing qui benchmarkent CPM/CPA 974',
      'Indépendants qui veulent leur 1^er^ budget pub TikTok',
    ],
    whatYouLearn: [
      'Le CPM réel TikTok à La Réunion en 2026 (fourchette par secteur)',
      'Le budget minimum pour un test sérieux',
      'La méthode Digiqo en 5 étapes pour ne pas brûler ton budget',
      'Quand TikTok Ads est *moins* rentable que Meta Ads',
    ],
  },

  quickAnswer: {
    question: 'Combien coûtent les TikTok Ads à La Réunion en 2026 ?',
    answer:
      "Compte **8 à 15 € de CPM** à La Réunion en 2026, soit 40 à 50 % moins cher qu'en métropole. Le CPA moyen toutes industries confondues est de **9,40 €** (vs 28 € sur Meta Ads pour le même panier moyen). Budget minimum recommandé pour un test sérieux : **1 500 € sur 90 jours**. ROAS médian observé sur 50 comptes Digiqo en 2026 : **4,2× sur 30 jours**, montant à 6,8× sur 90 jours grâce au retargeting.",
    wordCount: 86,
    targetQuery: 'prix TikTok Ads Réunion 2026',
  },

  sections: [
    {
      id: 'section-1',
      number: '01',
      title: 'Le CPM réel à La Réunion en 2026',
      blocks: [
        {
          type: 'paragraph',
          text: "Le marché publicitaire TikTok local est en avance sur l'algorithme et en retard sur les annonceurs — c'est ça l'opportunité. Concrètement, les enchères sont moins compétitives que sur [Meta Ads](/services/publicite-en-ligne) ou [Google Ads](/services/publicite-en-ligne) car la majorité des budgets locaux n'ont pas encore migré.",
        },
        {
          type: 'definition',
          term: 'CPM (Coût Pour Mille)',
          body: "Coût pour 1 000 impressions de votre publicité. Plus le CPM est bas, moins cher vous payez pour être vu. Voir notre [glossaire publicité digitale](/glossaire) pour les définitions complètes (CPC, CPA, ROAS, etc.).",
        },
        {
          type: 'statHero',
          value: '8-15 €',
          sourceLabel:
            'analyse Digiqo · 50 comptes clients · janv-mars 2026 · benchmark TikTok Ads Manager',
          sourceUrl: 'https://www.tiktok.com/business/fr',
          body: "C'est la fourchette du **CPM TikTok Ads à La Réunion en 2026**, contre 18-32 € en France métropolitaine. Un avantage de 40-50 % qui ne durera pas.",
        },
        { type: 'h3', text: "Variations par secteur d'activité" },
        {
          type: 'paragraph',
          text: "La fourchette 8-15 € masque de fortes variations. Certaines verticales locales sont encore quasi-vierges (artisanat, services pros B2B), d'autres saturées (e-commerce mode, restauration Saint-Gilles).",
        },
        {
          type: 'barChart',
          title: 'CPM TikTok Ads par secteur · La Réunion 2026 (€)',
          rows: [
            { label: 'Artisanat / déco', widthPct: 38, valueLabel: '7,80 €' },
            { label: 'B2B services', widthPct: 42, valueLabel: '8,40 €' },
            { label: 'Beauté / bien-être', widthPct: 55, valueLabel: '11,20 €' },
            { label: 'E-commerce mode', widthPct: 68, valueLabel: '13,80 €' },
            { label: 'Restauration St-Gilles', widthPct: 74, valueLabel: '14,90 €' },
            { label: 'Immobilier', widthPct: 82, valueLabel: '16,50 €' },
          ],
        },
        {
          type: 'inlineQA',
          question: 'Pourquoi le CPM artisanat est si bas à La Réunion ?',
          answer:
            "Parce que personne ou presque n'enchérit sur ces audiences. Sur les 30 dernières campagnes Digiqo en artisanat 974, l'enchère est gagnée 78 % du temps au prix plancher. Cette fenêtre se refermera quand [notre offre community management](/services/community-management) aura convaincu plus d'artisans de se lancer.",
        },
        {
          type: 'callout',
          variant: 'anecdote',
          label: 'Anecdote 974',
          body: '**Pendant le Grand Raid 2025**, on a accompagné une marque de chaussures de trail basée à Saint-Paul. Une vidéo de 19 secondes filmée à Mafate, avec une voix-off en créole et zéro production, a fait **2,1 M de vues organiques** en 4 jours. Coût : 0 €. Trois mois de stock écoulés sur la première semaine post-publication.',
        },
      ],
    },
    {
      id: 'section-2',
      number: '02',
      title: 'Budget minimum pour un test sérieux',
      blocks: [
        {
          type: 'paragraph',
          text: "En dessous d'un certain seuil, l'algorithme TikTok n'a pas assez de signaux pour optimiser. Tu brûles ton budget en phase d'apprentissage perpétuelle. Le seuil critique observé sur le marché local : **1 500 €**.",
        },
        {
          type: 'callout',
          variant: 'warning',
          label: 'Erreur classique',
          body: "Tester avec 300 €/mois pendant 1 mois. L'algorithme n'a pas le temps de sortir de la phase d'apprentissage (~50 conversions requises). Conclusion fausse : « TikTok Ads ne marche pas pour mon business. » Réalité : tu n'as pas testé, tu as donné de l'argent à TikTok.",
        },
        {
          type: 'comparisonTable',
          title: 'Budget test 1 500 € sur 90 jours · répartition recommandée',
          subtitle: 'Méthodologie Digiqo · validée sur 50+ campagnes locales',
          headers: ['Phase', 'Durée', 'Budget', 'Objectif'],
          rows: [
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
          ],
        },
      ],
    },
    {
      id: 'section-3',
      number: '03',
      title: 'TikTok Ads vs Meta Ads : qui gagne en 2026 ?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Comparaison frontale sur les indicateurs qui comptent réellement pour un annonceur réunionnais en 2026, sur la base de campagnes appariées (même budget, même audience cible, même offre).',
        },
        {
          type: 'comparisonTable',
          title: 'TikTok Ads vs Meta Ads · benchmark Réunion 2026',
          subtitle: 'Sur 24 comptes appariés Digiqo · janv-mars 2026 · panier moyen 85 €',
          headers: ['Indicateur', 'TikTok Ads', 'Meta Ads', 'Avantage'],
          rows: [
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
          ],
        },
        {
          type: 'pullQuote',
          text: "TikTok gagne sur l'acquisition. Meta gagne sur la fidélisation.\nLes deux ensemble battent l'un ou l'autre.",
          attribution: "retour d'expérience Digiqo · 50 comptes 2026",
        },
      ],
    },
    {
      id: 'section-4',
      number: '04',
      title: '5 étapes pour ne pas brûler son budget',
      blocks: [
        {
          type: 'paragraph',
          text: "La méthode Digiqo en 5 étapes, validée sur 50+ comptes, pour qu'une campagne TikTok Ads à 1 500 € sur 90 jours sorte rentable plutôt que ruinée.",
        },
        {
          type: 'numberedSteps',
          steps: [
            {
              title: 'Installer pixel TikTok + API Conversions',
              body: "Sans tracking serveur en 2026, tu tires à l'aveugle. iOS 17+ a tué le pixel client-side. On installe systématiquement les deux. Voir notre [offre tracking publicitaire](/services/publicite-en-ligne).",
            },
            {
              title: 'Tourner 5-7 créatives en interne',
              body: 'Smartphone + lumière naturelle. Les vidéos studio polies sous-performent les vidéos UGC de 60 % en moyenne.',
            },
            {
              title: 'Lancer en CBO avec audiences larges',
              body: "Campaign Budget Optimization > Ad Set BO sur petit budget local. Audiences ouvertes > 500k personnes — l'algorithme trouve seul ton acheteur.",
            },
            {
              title: 'Tuer impitoyablement à J+7',
              body: "Toute créative sous 1 % CTR ou CPA > 2× cible est coupée. Pas de débat, pas d'attendrissement. La discipline = la rentabilité.",
            },
            {
              title: 'Activer retargeting J+30',
              body: "Audiences custom : visiteurs site 30 jours, viewers vidéo 75 %, ATC abandonnés. C'est là que le ROAS double. Voir notre [guide complet du retargeting TikTok](/services/community-management).",
            },
          ],
        },
        {
          type: 'callout',
          variant: 'opinion',
          label: 'Mon avis (Alexandre)',
          body: "Je vois encore beaucoup d'agences locales qui externalisent la création vidéo et facturent 800 € la créative. Sur TikTok, c'est suicidaire. **La vidéo doit venir de toi ou de ton équipe.** Une agence comme la nôtre intervient sur la stratégie, le ciblage et l'analyse — pas sur la production.",
        },
      ],
    },
    {
      id: 'section-5',
      number: '05',
      title: 'Quand <em>ne pas</em> faire de TikTok Ads',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tout le monde te vendra TikTok comme la solution miracle. Voici les 4 cas où on déconseille TikTok Ads à un client réunionnais en 2026.',
        },
        {
          type: 'list',
          items: [
            "**Cible > 55 ans exclusive** — l'audience reste dominée par 16-44 ans malgré l'élargissement. Privilégier [Facebook Ads](/services/publicite-en-ligne) ou Google Search Ads.",
            "**Vente B2B grands comptes** — TikTok n'est pas un canal lead gen B2B sur 974. LinkedIn Ads reste la référence.",
            "**Budget < 1 500 € sur 90 jours** — comme expliqué section 02, l'algo a besoin de signaux. Mieux vaut [démarrer en organique](/services/community-management).",
            "**Aucune ressource vidéo interne** — si personne dans ton équipe ne peut filmer 5 vidéos par semaine, TikTok Ads ne tiendra pas. Construis l'organique d'abord.",
          ],
        },
      ],
    },
  ],

  faq: [
    {
      question: 'Combien coûte une campagne TikTok Ads pour démarrer à La Réunion en 2026 ?',
      answer:
        "Le budget minimum recommandé pour un test sérieux est de **1 500 € sur 90 jours** (≈ 500 € par mois). En dessous, l'algorithme TikTok n'a pas assez de signaux pour optimiser. Voir notre [offre publicité TikTok Ads](/services/publicite-en-ligne).",
    },
    {
      question: 'TikTok Ads est-il moins cher que Meta Ads à La Réunion ?',
      answer:
        'Oui, le CPM TikTok à La Réunion est en moyenne 50 % moins cher (11 € vs 22 €) et le CPA 3× plus bas (9,40 € vs 28 €). Le taux de conversion final reste légèrement supérieur sur Meta (+25 %), donc la stratégie optimale combine les deux.',
    },
    {
      question: 'Faut-il un compte business TikTok pour faire de la publicité ?',
      answer:
        'Oui, il faut basculer en compte TikTok Business (gratuit) puis créer un compte TikTok Ads Manager. La bascule se fait en 2 minutes.',
    },
    {
      question: 'Combien de temps avant de voir des résultats sur TikTok Ads ?',
      answer:
        "Premiers signaux dès J+7. Phase d'apprentissage stabilisée à J+14 (après ~50 conversions). Performance optimale à partir de J+30 si vous tournez régulièrement vos créatives.",
    },
    {
      question: 'Peut-on faire de la publicité TikTok sans compte TikTok actif ?',
      answer:
        "Techniquement oui, mais on déconseille fortement : sans compte actif, les publicités n'ont pas de crédibilité algorithmique, et vous perdez la possibilité de faire du Spark Ads. On recommande [notre offre community management](/services/community-management) pour bâtir la base organique en parallèle.",
    },
  ],

  sources: [
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
  ],

  cta: {
    eyebrow: 'Audit gratuit · 30 minutes',
    heading: 'Prêt à lancer ton premier test TikTok Ads à La Réunion ?',
    body: "On audite ton compte, on dimensionne ton budget, on te remet un plan d'action écrit. Sans engagement.",
    primary: { label: 'Demander mon audit gratuit', href: '/audit' },
    secondary: { label: "Voir l'offre TikTok Ads", href: '/services/publicite-en-ligne' },
  },
}

// ─── Article registry ─────────────────────────────────────────────────────

const ARTICLES_DATA: Record<string, BlogArticleData> = {
  [TIKTOK_ADS_DATA.slug]: TIKTOK_ADS_DATA,
}

const ARTICLES_CONTENT: Record<string, BlogArticleContent> = {
  [TIKTOK_ADS_DATA.slug]: TIKTOK_ADS_CONTENT,
}

// ─── Public helpers ────────────────────────────────────────────────────────

export function getAllArticles(): BlogArticleData[] {
  return Object.values(ARTICLES_DATA)
}

export function getArticleData(slug: string): BlogArticleData | undefined {
  return ARTICLES_DATA[slug]
}

export function getArticleContent(slug: string): BlogArticleContent | undefined {
  return ARTICLES_CONTENT[slug]
}

export function getArticlesByCategory(category: string): BlogArticleData[] {
  if (category === 'Tous') return getAllArticles()
  return getAllArticles().filter((a) => a.category === category)
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllArticles().map((a) => a.category)))
}

export function resolveAuthor(authorKey: string): ArticleAuthor {
  return AUTHORS[authorKey] ?? DIGIQO_AUTHOR
}

// Hand-curated map of related articles. The slugs in `relatedSlugs` may
// point to articles that don't exist yet — RelatedArticles renders them with
// a gradient backdrop until content is written.
const RELATED_REGISTRY: Record<string, RelatedArticleRef> = {
  'tiktok-strategie-organique-reunion': {
    slug: 'tiktok-strategie-organique-reunion',
    title: 'TikTok à La Réunion : la stratégie organique en 2026',
    excerpt: 'Avant de payer, sache scaler ton organique. Le guide complet.',
    pillLabel: 'TikTok organique',
    readTime: '12 min de lecture',
  },
  'pixel-tiktok-installation-974': {
    slug: 'pixel-tiktok-installation-974',
    title: "Pixel TikTok + API Conversions : guide d'installation 974",
    excerpt: 'Le tracking étape par étape pour ne pas rater de conversion en 2026.',
    pillLabel: 'Tracking',
    readTime: '8 min de lecture',
  },
  'tiktok-vs-meta-vs-google-ads-reunion': {
    slug: 'tiktok-vs-meta-vs-google-ads-reunion',
    title: 'TikTok vs Meta vs Google Ads : quel canal en 2026 à La Réunion ?',
    excerpt: 'Comparatif data-driven sur 100 campagnes. Le guide définitif.',
    pillLabel: 'Stratégie',
    readTime: '11 min de lecture',
  },
}

export function resolveRelated(slugs: string[]): RelatedArticleRef[] {
  return slugs
    .map((slug) => RELATED_REGISTRY[slug])
    .filter((r): r is RelatedArticleRef => Boolean(r))
}

// Backward-compat alias for /pages/blog.tsx which still imports the old name.
export type BlogArticle = BlogArticleData
