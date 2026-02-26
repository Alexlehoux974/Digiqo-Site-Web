# 🚨 Configuration Google Search Console - Actions Immédiates

## 📍 Étape 1: Vérification du Site

### 1.1 Accéder à Google Search Console
1. Aller sur https://search.google.com/search-console
2. Se connecter avec le compte Google professionnel
3. Cliquer sur "Ajouter une propriété"

### 1.2 Choisir le Type de Propriété
**Recommandé:** Propriété de domaine
- Entrer: `digiqo.fr` (sans https://, sans www)
- Avantage: Couvre tous les sous-domaines et protocoles

### 1.3 Méthode de Vérification
**Option 1: Balise HTML (Recommandé)**
```tsx
// À ajouter dans components/SEO/SEO.tsx ligne 194
<meta name="google-site-verification" content="[VOTRE_CODE_ICI]" />
```

**Option 2: Enregistrement DNS**
- Ajouter un enregistrement TXT chez votre registrar
- Valeur: `google-site-verification=[CODE]`

---

## 📤 Étape 2: Soumission des Sitemaps

### 2.1 Soumettre le Sitemap Index Principal
1. Dans GSC, aller dans "Sitemaps"
2. Entrer: `sitemap_index.xml`
3. Cliquer sur "Envoyer"

### 2.2 Vérifier la Lecture
Attendre 24-48h puis vérifier:
- Nombre d'URLs soumises
- Nombre d'URLs indexées
- Erreurs éventuelles

---

## 🔧 Étape 3: Corrections Immédiates dans le Code

### 3.1 Mettre à jour components/SEO/SEO.tsx
```tsx
// Ligne 194 - Remplacer
<meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
// Par votre vrai code, exemple:
<meta name="google-site-verification" content="ABC123xyz789..." />
```

### 3.2 Corriger robots.txt
```txt
# Ajouter après la ligne 63
Sitemap: https://digiqo.fr/sitemap_index.xml
```

### 3.3 Optimiser next.config.js
```js
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ['digiqo.fr'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Ajouter compression
  compress: true,
  // Ajouter headers sécurité et cache
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/services/publicite-en-ligne',
        destination: '/services/publicite-meta',
        permanent: true,
      },
      // AJOUTER pour éviter duplication
      {
        source: '/devis-site-web',
        destination: '/devis-web',
        permanent: true,
      },
    ]
  },
  // Reste du config...
}
```

---

## 🏃 Actions Rapides (< 1 heure)

### 1. Test Mobile-Friendly
```bash
# Tester toutes les pages principales
https://search.google.com/test/mobile-friendly
```
URLs à tester:
- https://digiqo.fr
- https://digiqo.fr/services/publicite-google
- https://digiqo.fr/services/sites-web
- https://digiqo.fr/contact

### 2. Test Rich Results
```bash
# Vérifier les données structurées
https://search.google.com/test/rich-results
```

### 3. PageSpeed Insights
```bash
# Analyser les Core Web Vitals
https://pagespeed.web.dev/
```

---

## 📊 Monitoring Post-Configuration

### Semaine 1
- [ ] Vérifier statut de vérification
- [ ] Confirmer lecture des sitemaps
- [ ] Identifier premières erreurs de crawl

### Semaine 2
- [ ] Analyser couverture d'indexation
- [ ] Vérifier Core Web Vitals
- [ ] Corriger erreurs détectées

### Mois 1
- [ ] Analyser performances de recherche
- [ ] Optimiser pages avec faible CTR
- [ ] Soumettre nouvelles pages importantes

---

## 🔍 URLs Prioritaires à Indexer

### Pages Critiques (Soumettre manuellement si besoin)
1. https://digiqo.fr
2. https://digiqo.fr/services/publicite-google
3. https://digiqo.fr/services/publicite-meta
4. https://digiqo.fr/services/sites-web
5. https://digiqo.fr/services/community-management
6. https://digiqo.fr/services/seo
7. https://digiqo.fr/contact
8. https://digiqo.fr/devis-web
9. https://digiqo.fr/audit

### Utiliser l'Outil d'Inspection d'URL
Pour chaque URL prioritaire:
1. Coller l'URL dans l'outil d'inspection
2. Cliquer sur "Demander une indexation"
3. Attendre la confirmation

---

## 📈 Objectifs Semaine 1

| Métrique | Objectif | Action |
|----------|----------|--------|
| Vérification | ✅ Complète | Ajouter balise meta |
| Sitemaps | 3 soumis | Envoyer sitemap_index.xml |
| Pages indexées | >10 | Soumettre pages prioritaires |
| Erreurs crawl | 0 | Corriger si détectées |
| Core Web Vitals | Baseline établie | Mesurer performances |

---

## 🆘 Support & Ressources

### Documentation Officielle
- [Guide GSC](https://support.google.com/webmasters/answer/9008080)
- [Bonnes pratiques SEO](https://developers.google.com/search/docs)
- [Core Web Vitals](https://web.dev/vitals/)

### Outils Complémentaires
- [Schema Markup Validator](https://validator.schema.org/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [AMP Test](https://search.google.com/test/amp) (si applicable)

---

**⚡ Action Immédiate:** Commencer par ajouter le code de vérification GSC et déployer le site mis à jour!