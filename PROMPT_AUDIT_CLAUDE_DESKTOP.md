# Prompt pour Audit Automatisé avec Claude Desktop + MCP Playwright

## Mission
Tu vas réaliser un audit complet d'un site web en utilisant MCP Playwright pour l'analyse technique et visuelle, puis remplir TOUS les champs de la table Airtable "Audits PDF" et me donner l'URL de l'audit publié.

## Informations Airtable
- **Base ID**: appH46IBnNdYNrwZ9
- **Table**: Audits PDF (ID: tblMceHOda6CpUrwx)
- **Token**: Utilise le AIRTABLE_PAT configuré

## Les 36 champs OBLIGATOIRES à remplir

### Informations de base (5 champs)
1. **Nom entreprise**: Le nom de l'entreprise auditée
2. **Site web**: L'URL complète du site audité
3. **Date audit**: Date au format YYYY-MM-DD
4. **Auditeur**: "Claude AI Assistant"
5. **Verdict global**: Synthèse en une phrase (ex: "Site performant mais nécessite optimisation SEO")

### Scores (6 champs) - Notes sur 100
6. **Score global**: Moyenne pondérée des autres scores
7. **Score contenu**: Qualité et pertinence du contenu (0-100)
8. **Score SEO**: Optimisation pour les moteurs de recherche (0-100)
9. **Score technique**: Performance et qualité technique (0-100)
10. **Score UX**: Expérience utilisateur (0-100)
11. **Score légal**: Conformité légale (0-100)

### Analyse contenu (2 champs)
12. **Points positifs contenu**: Liste les points forts du contenu (3-5 points)
13. **Points amélioration contenu**: Liste les améliorations nécessaires (3-5 points)

### Analyse SEO (2 champs)
14. **Points critiques SEO**: Problèmes SEO majeurs identifiés
15. **Recommandations SEO prioritaires**: Actions SEO à mettre en œuvre en priorité

### RGPD (4 champs)
16. **Statut conformité RGPD**: "Conforme" / "Partiellement conforme" / "Non conforme"
17. **Violations RGPD identifiées**: Liste des violations (cookies sans consentement, etc.)
18. **Risques encourus**: Amendes et sanctions possibles
19. **Actions obligatoires immédiates**: Actions RGPD urgentes à effectuer

### Accessibilité RGAA (3 champs)
20. **Conformité RGAA**: Niveau de conformité (A, AA, AAA ou Non conforme)
21. **Tests recommandés accessibilité**: Tests à effectuer pour validation complète
22. **Actions suggérées accessibilité**: Améliorations pour l'accessibilité

### Performance (2 champs)
23. **Éléments à tester performance**: Points spécifiques à analyser plus en détail
24. **Recommandations techniques**: Optimisations techniques recommandées

### UX (2 champs)
25. **Points positifs UX**: Éléments UX bien conçus
26. **Améliorations UX**: Suggestions d'amélioration UX

### Présence en ligne (1 champ)
27. **Présence en ligne recommandée**: Stratégie de présence digitale suggérée

### Plan d'action (3 champs)
28. **Actions URGENT 0-15 jours**: Actions critiques à faire immédiatement
29. **Actions COURT TERME 1-3 mois**: Actions importantes à planifier
30. **Actions MOYEN TERME 3-6 mois**: Actions d'amélioration continue

### Budget (2 champs)
31. **Budget mise en conformité**: Estimation en euros (ex: "5 000€ - 8 000€")
32. **Budget refonte complète**: Estimation en euros (ex: "15 000€ - 25 000€")

### Conclusions (2 champs)
33. **Conclusion**: Synthèse générale de l'audit (3-5 phrases)
34. **Recommandation principale**: LA recommandation prioritaire

### URL (2 champs)
35. **URL Audit**: Laisser vide (sera rempli automatiquement)
36. **URL PDF**: Laisser vide (pas de PDF à générer)

## Instructions étape par étape

### Étape 1: Analyse avec Playwright
```javascript
// Utilise MCP Playwright pour:
1. Naviguer vers le site web cible
2. Prendre des screenshots (mobile + desktop)
3. Tester les Core Web Vitals (LCP, FID, CLS)
4. Vérifier la présence des mentions légales
5. Analyser les cookies et trackers
6. Tester l'accessibilité (contraste, navigation clavier)
7. Vérifier les balises SEO (title, meta, h1)
8. Tester les formulaires
9. Analyser la vitesse de chargement
10. Vérifier le responsive design
```

### Étape 2: Calcul des scores
Pour chaque catégorie, évalue sur 100 points:

**Score contenu (100 pts)**:
- Qualité rédactionnelle: 30 pts
- Pertinence pour la cible: 25 pts
- Structure et hiérarchie: 25 pts
- Fraîcheur/actualisation: 20 pts

**Score SEO (100 pts)**:
- Balises meta: 25 pts
- Structure Hn: 20 pts
- URLs et sitemap: 15 pts
- Vitesse de chargement: 20 pts
- Mobile-friendly: 20 pts

**Score technique (100 pts)**:
- Performance (Core Web Vitals): 40 pts
- Sécurité HTTPS: 20 pts
- Code propre: 20 pts
- Compatibilité navigateurs: 20 pts

**Score UX (100 pts)**:
- Navigation intuitive: 30 pts
- Design cohérent: 25 pts
- Temps de chargement: 25 pts
- Mobile UX: 20 pts

**Score légal (100 pts)**:
- RGPD compliance: 40 pts
- Mentions légales: 20 pts
- CGV/CGU: 20 pts
- Cookies consent: 20 pts

### Étape 3: Créer l'enregistrement Airtable
```javascript
// Utilise l'API Airtable pour créer un nouvel enregistrement
const record = await fetch('https://api.airtable.com/v0/appH46IBnNdYNrwZ9/tblMceHOda6CpUrwx', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fields: {
      // Remplir TOUS les 36 champs ici
    }
  })
});
```

### Étape 4: Retourner l'URL
Une fois l'enregistrement créé, construire et retourner l'URL:
```
https://www.digiqo.fr/audit-gratuit/[RECORD_ID]
```

## Exemple de réponse attendue

```
✅ Audit complété pour [Nom de l'entreprise]

📊 Scores obtenus:
- Score global: 72/100
- Contenu: 78/100
- SEO: 65/100
- Technique: 82/100
- UX: 75/100
- Légal: 60/100

🎯 Verdict: Site performant mais nécessite optimisation SEO et mise en conformité RGPD

📝 Enregistrement créé dans Airtable avec l'ID: recXXXXXXXXXXXXXX

🔗 URL de l'audit complet:
https://www.digiqo.fr/audit-gratuit/recXXXXXXXXXXXXXX

L'audit détaillé est maintenant accessible en ligne avec toutes les recommandations.
```

## Points d'attention
- TOUS les 36 champs doivent être remplis, aucune exception
- Les scores doivent être des nombres entre 0 et 100
- Les textes doivent être concis mais informatifs
- Les budgets doivent être réalistes pour le marché français
- La date doit être au format YYYY-MM-DD
- L'URL finale doit utiliser l'ID de l'enregistrement Airtable créé

## Commande pour lancer l'audit
```
Lance un audit complet du site [URL_DU_SITE] en utilisant MCP Playwright, remplis tous les champs dans Airtable et donne-moi l'URL de consultation de l'audit.
```