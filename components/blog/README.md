# Blog — système de rédaction Digiqo

Cette doc décrit comment **rédiger un article**, **modifier le contenu existant** et **étendre le système** de rendu blog. Elle est versionnée avec le code et fait référence — elle est aussi conçue pour être lue par un agent IA qui édite automatiquement le contenu.

> **TL;DR** : tout le contenu vit dans `lib/blog-articles.ts` sous forme de **JSON pur** (zéro JSX). Pour modifier un texte ou un chiffre : éditer une string. Pour ajouter un article : ajouter un objet à `ARTICLES_DATA` + `ARTICLES_CONTENT`. Pour ajouter un nouveau type de bloc : suivre la section « Étendre le shape » plus bas.

---

## Architecture

```
┌────────────────────────────────────────────────────┐
│ lib/blog-articles.ts                               │
│                                                     │
│ ARTICLES_DATA      → BlogArticleData (sérialisable) │
│ ARTICLES_CONTENT   → BlogArticleContent (sérial.)  │
└──────────────┬─────────────────────────────────────┘
               │
               ▼
   pages/blog/[slug].tsx (template article)
               │
               ▼
   components/blog/BlockRenderer  ←  switch sur block.type
               │
               ▼
   StatHero · BarChart · CallOut · ComparisonTable …
```

- **Data layer** (`lib/blog-articles.ts`) : 100 % JSON, future-compatible avec Airtable / Supabase.
- **Render layer** (`components/blog/`) : 13 composants React + `BlockRenderer` (dispatcher) + `RichText` (parser markdown léger).
- **Schemas JSON-LD** : `buildArticleSchemas()` émet `BlogPosting`, `BreadcrumbList`, `FAQPage` à chaque article.

---

## Modifier un article existant

Édite `lib/blog-articles.ts`. Tout est string. Quelques exemples :

| Tu veux... | Édite... |
|---|---|
| Changer le titre | `TIKTOK_ADS_DATA.title` |
| Changer la date de mise à jour | `dateModified` (ISO) + `dateModifiedLabel` (humain) |
| Changer un chiffre | la string concernée dans `sections[i].blocks[j].body` ou `value` |
| Ajouter une question FAQ | un objet `{ question, answer }` dans `faq[]` |
| Ajouter une source | un objet `SourceRef` dans `sources[]` |
| Changer le CTA en bas | `cta.heading`, `cta.body`, `cta.primary.label`, etc. |

Pas besoin de toucher à `pages/blog/[slug].tsx` ni aux composants — ils consomment les strings.

---

## Ajouter un nouvel article

Trois étapes dans `lib/blog-articles.ts` :

**1.** Définir un objet `BlogArticleData` :

```ts
const NEW_ARTICLE_DATA: BlogArticleData = {
  id: 'mon-nouveau-slug',
  slug: 'mon-nouveau-slug',
  title: '...',
  titleAccent: 'en 2026 ?',           // suffix de title pour gradient bordeaux→orange
  excerpt: '...',                     // hero lede + listing card
  metaDescription: '...',
  category: 'Social Media',           // top-level cluster
  cluster: 'Social Media · TikTok Ads', // sub-cluster pill
  clusterHref: '/blog?cat=social-media',
  date: '12 mars 2026',
  dateModified: '2026-05-06T08:00:00+04:00',
  dateModifiedLabel: '06 mai 2026',
  readTime: '9 min de lecture',
  featuredImage: '/blog-images/...jpeg',
  tags: [...],
  authorKey: 'alexandre-lehoux',
  relatedSlugs: [...],
}
```

**2.** Définir un `BlogArticleContent` (voir « Types de blocs » ci-dessous pour les variants disponibles) :

```ts
const NEW_ARTICLE_CONTENT: BlogArticleContent = {
  tldr: { forWhom: [...], whatYouLearn: [...] },
  quickAnswer: { question, answer, wordCount, targetQuery },
  sections: [{ id, number, title, blocks: [...] }, ...],
  faq: [{ question, answer }, ...],
  sources: [...],
  cta: {...},
}
```

**3.** Ajouter aux deux registres :

```ts
const ARTICLES_DATA: Record<string, BlogArticleData> = {
  [TIKTOK_ADS_DATA.slug]: TIKTOK_ADS_DATA,
  [NEW_ARTICLE_DATA.slug]: NEW_ARTICLE_DATA,
}

const ARTICLES_CONTENT: Record<string, BlogArticleContent> = {
  [TIKTOK_ADS_DATA.slug]: TIKTOK_ADS_CONTENT,
  [NEW_ARTICLE_DATA.slug]: NEW_ARTICLE_CONTENT,
}
```

C'est tout. `getStaticPaths` génère le slug automatiquement, `pages/blog.tsx` (liste) le reprend dans `getAllArticles()`, le sitemap se régénère au build.

---

## Syntaxe markdown léger (parsée par `RichText`)

Les champs « string » du contenu (paragraphes, FAQ answers, items TLDR, definition.body, callout.body, statHero.body, inlineQA.answer, list items, numberedSteps.body) acceptent **4 syntaxes** :

| Syntaxe | Rendu |
|---|---|
| `**gras**` | `<strong>` (texte digiqo-black, font-semibold) |
| `*italique*` | `<em>` |
| `[texte](url)` | `<a href="url">` — `rel="nofollow noopener"` + `target="_blank"` auto si URL absolue (`http(s)://`), sinon lien interne plain |
| `^sup^` | `<sup>` (utile pour `1ᵉʳ`, `2ᵉ`, exponents) |
| `\n\n` | nouveau `<p>` (uniquement si rendu via `<RichText as="p">`) |
| `<em>X</em>` | `<em>X</em>` (HTML littéral toléré uniquement pour ce tag, dans les titres de section pour `Quand <em>ne pas</em>`) |

Toute autre syntaxe est rendue en plain text. Pas d'injection HTML brute, donc pas de risque XSS.

---

## Types de blocs (`ArticleBlock`)

Chaque section a `blocks: ArticleBlock[]`. Les blocs disponibles :

| `type` | Champs | Composant rendu | Usage |
|---|---|---|---|
| `paragraph` | `text` | `<RichText as="p">` | Paragraphe de prose standard |
| `h3` | `text`, `id?` | `<h3>` | Sous-titre dans une section |
| `list` | `items: string[]` | `<ul>` à puces bordeaux | Liste à puces (markdown léger par item) |
| `definition` | `term`, `body` | `<DefinitionBox>` (cyan) | Glossaire intégré (CPM, ROAS, etc.) |
| `statHero` | `value`, `body`, `sourceLabel`, `sourceUrl?` | `<StatHero>` | Gros chiffre data-driven avec source nofollow |
| `barChart` | `title`, `rows: BarChartRow[]` | `<BarChart>` | Barres horizontales animées |
| `inlineQA` | `question`, `answer` | `<InlineQA>` | Mini Q&A bordeaux par section (extractible LLM) |
| `callout` | `variant`, `label`, `body`, `statValue?` | `<CallOut>` | Encadré : `anecdote` (orange), `opinion` (cyan), `stat` (bordeaux + chiffre XXL), `warning` (jaune) |
| `comparisonTable` | `title`, `subtitle?`, `headers`, `rows: ComparisonCellData[][]` | `<ComparisonTable>` | Tableau comparatif avec verdict colorisé |
| `numberedSteps` | `steps: { title, body }[]` | `<NumberedSteps>` | Étapes 01/02/03 (compatible HowTo schema à terme) |
| `pullQuote` | `text`, `attribution?` | `<PullQuote>` | Citation typographique large centrée |

Voir `lib/blog-articles.ts` pour des exemples complets de chaque type.

---

## Étendre le shape — ajouter un nouveau type de bloc

Cette section est **autoportante** : elle suffit à ajouter un nouveau type de bloc en respectant l'architecture du système. Un agent Claude qui lit cette section doit pouvoir produire un commit fonctionnel sans contexte additionnel.

### Étape 1 — Étendre l'union `ArticleBlock` dans `components/blog/types.ts`

Ajouter le nouveau variant à la fin de `export type ArticleBlock = …`. Le `type` doit être unique (kebab-case ou camelCase, on utilise camelCase). Tous les champs string-side, sérialisables JSON.

Exemple — ajout d'un type `newsletterSignup` :

```ts
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  // ... existing variants
  | { type: 'newsletterSignup'; placeholder: string; ctaLabel: string }
```

### Étape 2 — Ajouter le `case` dans `BlockRenderer.tsx`

Ouvrir `components/blog/BlockRenderer.tsx`, importer le composant React qui rend le nouveau type, ajouter un `case` au switch. Il faut **toujours** ajouter le case (TypeScript marquera le switch comme exhaustif et refusera de compiler s'il manque un variant).

```tsx
case 'newsletterSignup':
  return (
    <NewsletterSignup placeholder={block.placeholder} ctaLabel={block.ctaLabel} />
  )
```

Si le composant n'existe pas, le créer dans `components/blog/<Name>.tsx` en suivant les conventions des autres composants : props strictement typées, animation `whileInView` subtile (`duration: 0.45-0.5s`, `margin: '-60px'`), classes Tailwind respectant les tokens design (`digiqo-primary`, `digiqo-accent`, `digiqo-secondary`, `slate-*`, fonts `font-display` Montserrat / défaut Inter).

Pour les contenus rich (texte avec **bold**, [liens](url)), envelopper dans `<RichText source={…} />` plutôt que d'afficher la string brute.

### Étape 3 — Documenter le nouveau type dans la table « Types de blocs » de ce README

Ajouter une ligne à la table « Types de blocs » plus haut :

| `newsletterSignup` | `placeholder`, `ctaLabel` | `<NewsletterSignup>` | Encadré inscription newsletter dans le corps de l'article |

---

### Vérifier l'ajout

Trois tests :

1. `npx tsc --noEmit` doit passer (le switch est exhaustif).
2. Ajouter un bloc test dans `lib/blog-articles.ts` (par exemple dans une section temporaire), build, ouvrir l'article : le bloc se rend.
3. Si le bloc contient du texte rich, vérifier sur la page que `**gras**` est bien rendu en `<strong>`, pas en littéral `**`.

### Composant runtime ↔ data-side

Si le nouveau type doit gérer une distinction entre data sérialisable et props runtime (comme `ComparisonCellData` → `ComparisonCell`), suivre le pattern existant :

- Type sérialisable défini dans `types.ts` (suffixe `Data`).
- Type runtime défini dans le fichier composant.
- Un mapper dans `BlockRenderer.tsx` convertit l'un vers l'autre.

Pour 95 % des nouveaux blocs, ce mapping n'est pas nécessaire — passer les props directement.

---

## Migration future Airtable / Supabase

Le shape étant 100 % sérialisable, brancher une source externe ne touche **pas** les composants. Trois chemins possibles :

1. **Build-time pull (Airtable)** : un script `scripts/sync-blog-from-airtable.js` lit la base Airtable et écrit `lib/blog-articles.json`. `lib/blog-articles.ts` lit ce JSON et expose les helpers identiques.
2. **Build-time pull (Supabase)** : idem mais via `supabase-js`. Cron rebuild Netlify.
3. **Runtime SSR/ISR (Supabase)** : `getStaticProps` avec `revalidate: 60`.

Dans tous les cas, **les composants, le template, le `BlockRenderer` et `RichText` ne changent pas**. Seul `lib/blog-articles.ts` est remplacé / régénéré.

---

## Schemas JSON-LD émis

`pages/blog/[slug].tsx` injecte 3 schemas :

- **BlogPosting** (via `<SEO structuredData>`) — méta article + auteur Person + publisher Organization.
- **BreadcrumbList** (via `<Script id="schema-breadcrumb">`) — fil d'Ariane.
- **FAQPage** (via `<Script id="schema-faqpage">`) — émis seulement si `faq.length > 0`. Les answers sont **strippées du markdown** par `stripMarkdown()` avant injection (sinon Google lit `**gras**` au lieu de `gras`).

Pour ajouter un schema (par exemple `HowTo` à partir de `numberedSteps`), éditer `components/blog/buildArticleSchemas.ts`. Le pattern à suivre : générer l'objet JSON-LD dans `buildArticleSchemas`, le retourner, l'injecter dans `[slug].tsx` via `<Script type="application/ld+json">`.

---

## Mémoire Claude associée

- `reference_blog_template_sprint2.md` — résumé pour les sessions Claude futures (« ajoute un article sur X »). Pointe vers ce README.
- `feedback_no_invented_data.md` — règle stricte : ne jamais inventer chiffres ou cas concrets dans les articles publiés. Toute donnée chiffrée doit être prouvable.

---

## Fichiers de référence

| Fichier | Rôle |
|---|---|
| `components/blog/types.ts` | Tous les types (`BlogArticleData`, `BlogArticleContent`, `ArticleBlock`, …) |
| `components/blog/RichText.tsx` | Parser markdown léger → JSX |
| `components/blog/BlockRenderer.tsx` | Switch `block.type` → composant |
| `components/blog/buildArticleSchemas.ts` | Émission JSON-LD multi-schema |
| `components/blog/index.ts` | Barrel export |
| `lib/blog-articles.ts` | Source de vérité du contenu (1 article actuellement) |
| `pages/blog/[slug].tsx` | Template article qui orchestre tout |
| `pages/blog.tsx` | Page liste blog (consomme `getAllArticles()`) |
| `next.config.js` | Redirections 301 des 7 anciens slugs |
| `SPRINT3-BACKLOG.md` (racine) | Backlog reporté Sprint 3 (perf, a11y, SEO transversal) |
