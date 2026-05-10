# Sprint 3 — Backlog

> **⚠️ Règle permanente du projet (toutes branches, tous sprints)**
>
> **Ne JAMAIS retirer du contenu** : sections, liens de menu, formulaires, éléments, blocs visibles. Cela inclut les conditional gates (`{cond && <section>}`) qui font disparaître du contenu sans le supprimer en code.
>
> Si un travail technique demande de retirer ou cacher quelque chose (perf, refactor, A/B test, end-of-life feature), **demander validation Alexandre AVANT** action.
>
> Cette règle a été ajoutée après l'incident *2bf7739f [P0-SEO][6] home: hide expired Dashboard countdown block* qui a fait disparaître la section "Votre Dashboard est arrivé" de la home post-1er-mai 2026 sans intention de la retirer définitivement.

---

Reporté depuis Sprint 2 (refonte design blog, branche `seo-geo-rattrapage-s2` → mergée dans `main` le YYYY-MM-DD à compléter au merge).

Document conçu pour être ouvert au démarrage d'une nouvelle session VSCode Sprint 3. Au lancement : lire ce fichier, créer la branche, exécuter le périmètre principal en priorité.

---

## Périmètre principal — Performance & Accessibilité

L'audit Sprint 2 (gate Lighthouse post-refactor) sert de baseline. Reporter les chiffres mesurés ici en début Sprint 3.

| Chantier | Cible | Baseline (post-Sprint 2 — à reporter) |
|---|---|---|
| CWV Performance mobile (Lighthouse) | 90+ | À mesurer |
| CWV Performance desktop (Lighthouse) | 80+ | À mesurer |
| Lighthouse Accessibility (mobile + desktop) | 95+ | À mesurer |
| TBT desktop | < 600 ms (vs 3 250 ms baseline pré-Sprint 2) | À mesurer |
| CLS toutes pages | < 0,1 | À mesurer |
| LCP mobile | < 2,5 s | À mesurer |

### Optimisations à instrumenter (par priorité)

1. **`next/dynamic` + `ssr: false`** sur les composants below-the-fold lourds : `BarChart`, `ComparisonTable`, `NumberedSteps`, `FAQ`, `RelatedArticles`. Réduit le bundle JS initial.
2. **Code-splitting Next.js par route** : analyser `next build --profile`, identifier les routes les plus lourdes.
3. **Lazy-load framer-motion** : importer dynamiquement les motions au-dessous de la fold pour réduire le JS bundle initial. Ou remplacer `whileInView` par CSS `@keyframes` quand l'animation est simple.
4. **Conversion images en AVIF/WebP** : `next/image` est déjà configuré (`formats: ['image/avif', 'image/webp']` dans `next.config.js`). À appliquer partout où on utilise encore `<img>` brut.
5. **Différer JS analytics tiers** : n8n chat, GA, GTM, etc. À charger au premier scroll ou à l'idle.
6. **Audit a11y axe-core** sur tout le site :
   - Boutons sans nom accessible (`aria-label`)
   - Éléments interactifs sans label
   - Liens sans nom visible (icon-only sans `aria-label`)
   - Contraste insuffisant (Tailwind `slate-*` à valider)
   - Hiérarchie heading correcte (un seul `<h1>` par page)

### Workflow recommandé

- Branche dédiée : `seo-cwv-a11y-s3`
- Mesure baseline **avant** toute modif (Lighthouse mobile + desktop + a11y sur les 3 URLs principales : `/`, `/blog`, `/blog/[slug]`)
- Optimisations par hot-spot ciblé (1 commit = 1 hot-spot mesurable)
- Mesure after **après chaque commit** — gain ou rollback si pas de gain
- Livraison : tableau before/after chiffré dans la PR

---

## Périmètre secondaire — SEO transversal

Reporté du brief Sprint 2 :

- **BreadcrumbList JSON-LD** sur `/services/[slug]`, `/agence`, home, `/glossaire`. Déjà en place pour `/blog/[slug]`. Pattern : utiliser `buildBreadcrumbSchema()` de `components/blog/Breadcrumb.tsx` (réutilisable au-delà du blog).
- **Maillage interne cross-pages** : ajouter 5-8 liens contextuels services ↔ agence ↔ home. Aujourd'hui le maillage est concentré sur le blog → services. À étendre dans l'autre sens.
- **ItemList ou HowTo schema** sur le bloc `numberedSteps` du template article. Aujourd'hui non émis. À ajouter dans `components/blog/buildArticleSchemas.ts` : si `content.sections` contient au moins un block `numberedSteps`, émettre un schema `HowTo` pointant vers les steps.

---

## Périmètre rédactionnel — contenu blog

- **Remplacer les chiffres placeholder** de l'article TikTok 974 (`tiktok-ads-prix-reunion-2026`) par des données réelles, ou les retirer (voir `feedback_no_invented_data.md` en mémoire Claude). Concerne : 8-15 € CPM, 9,40 € CPA, 50 comptes Digiqo, ROAS 4,2×, anecdote « Grand Raid 2025 », données par secteur du `barChart`, benchmark TikTok vs Meta, méthode 5 étapes.
- **Rédiger 3-5 nouveaux articles** sur le nouveau template. Process : copier-coller le shape de `TIKTOK_ADS_DATA` + `TIKTOK_ADS_CONTENT`, adapter, ajouter aux registres. Voir `components/blog/README.md` pour la doc complète.
- **Brancher Airtable** comme source de contenu : créer un script `scripts/sync-blog-from-airtable.js` qui pull la base Airtable et écrit `lib/blog-articles.json`. Adapter `lib/blog-articles.ts` pour lire le JSON. Le shape étant déjà sérialisable, aucun composant à modifier.

---

## Périmètre redirections / SEO technique

- **Vérifier après merge Sprint 2** que les 7 redirects 301 des anciens articles fonctionnent (`curl -I` sur chaque URL).
- **Mettre à jour `public/sitemap-blog.xml`** : actuellement placeholder vide. Faire que `scripts/generate-sitemap.js` lise `getAllArticles()` et émette les `<url>` correspondants.
- **Audit Search Console** un mois après merge : vérifier que les anciens slugs disparaissent de l'index et que les nouveaux apparaissent.

---

## Hors périmètre Sprint 3

- Refonte design home / agence / services (= Sprint 4 si nécessaire).
- Implémentation Stripe / paiement (séparé).
- Intégration HubSpot avancée (déjà en cours via `HUBSPOT-INTEGRATION-INSTRUCTIONS.md`).
