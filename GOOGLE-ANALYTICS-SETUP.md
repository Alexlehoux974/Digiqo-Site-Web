# 📊 Configuration Google Analytics 4 - Guide Complet

## 🚀 Étape 1: Créer votre propriété Google Analytics 4

### 1.1 Accéder à Google Analytics
1. Aller sur https://analytics.google.com
2. Se connecter avec le compte Google professionnel (le même que pour Search Console)
3. Cliquer sur "Commencer à mesurer"

### 1.2 Créer la propriété
1. **Nom de la propriété**: Digiqo - Site Web
2. **Fuseau horaire**: (UTC+04:00) La Réunion
3. **Devise**: EUR (€)
4. Cliquer sur "Suivant"

### 1.3 Configurer les informations sur l'entreprise
- **Secteur**: Marketing et publicité
- **Taille de l'entreprise**: Sélectionner selon votre effectif
- **Objectifs d'utilisation**: Cocher :
  - ✅ Générer des prospects
  - ✅ Analyser le comportement des utilisateurs
  - ✅ Mesurer les conversions
  - ✅ Améliorer les performances du site

### 1.4 Créer le flux de données
1. Choisir **Web**
2. **URL du site web**: https://www.digiqo.fr
3. **Nom du flux**: Site principal Digiqo
4. Cliquer sur "Créer un flux"

### 1.5 Récupérer votre ID de mesure
- Format: `G-XXXXXXXXXX`
- Le copier pour l'étape suivante

---

## 🔧 Étape 2: Configuration dans le code

### 2.1 Ajouter l'ID de mesure
1. Ouvrir le fichier `.env.local`
2. Décommenter et remplacer la ligne :
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-VOTRE_ID_ICI
```

### 2.2 Déployer sur Netlify
1. Dans Netlify, aller dans Site Settings > Environment variables
2. Ajouter :
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-VOTRE_ID_ICI`
3. Redéployer le site

---

## 📈 Étape 3: Configuration des événements de conversion

### 3.1 Événements automatiquement trackés
Le code GA4 intégré tracke automatiquement :
- **Pages vues** (toutes les navigations)
- **Scroll depth** (profondeur de défilement)
- **Clics sur CTAs**
- **Soumissions de formulaires**
- **Temps passé sur les pages**

### 3.2 Configurer les conversions dans GA4
1. Dans GA4, aller dans **Admin** > **Événements**
2. Marquer comme conversion :
   - `form_submit` (Formulaires de contact)
   - `quote_request` (Demandes de devis)
   - `audit_request` (Demandes d'audit)
   - `contact` (Contacts généraux)

### 3.3 Événements personnalisés disponibles

#### Formulaires et conversions
```javascript
// Automatiquement déclenché lors des soumissions
trackConversion('form_submit', value, 'EUR')
trackConversion('quote_request', value, 'EUR')
trackConversion('audit_request', value, 'EUR')
```

#### Engagement utilisateur
```javascript
// CTAs et boutons
trackCTA('Demander un devis', 'Hero Section')

// Services consultés
trackServiceView('Publicité Google', 'Marketing Digital', 1500)

// Téléchargements
trackDownload('guide-seo-reunion', 'pdf')

// Partages sociaux
trackSocialShare('facebook', 'article', 'Guide SEO 2025')
```

---

## 🎯 Étape 4: Configuration des objectifs

### 4.1 Objectifs recommandés pour Digiqo

#### Objectif 1: Génération de leads
- **Événement**: `form_submit`
- **Valeur**: 50€ (valeur moyenne d'un lead)
- **Entonnoir**:
  1. Page d'accueil
  2. Page service
  3. Formulaire de contact
  4. Confirmation

#### Objectif 2: Demandes de devis
- **Événement**: `quote_request`
- **Valeur**: 150€ (valeur moyenne)
- **Pages importantes**: /devis-web

#### Objectif 3: Audits gratuits
- **Événement**: `audit_request`
- **Valeur**: 100€
- **Page**: /audit

### 4.2 Configuration des audiences

#### Audience 1: Prospects chauds
- Ont visité ≥3 pages
- Temps sur site >2 minutes
- Ont consulté une page service

#### Audience 2: Visiteurs La Réunion
- Géolocalisation: La Réunion
- Pour campagnes locales

#### Audience 3: Intérêt spécifique
- Par service consulté (SEO, Pub, Dev Web, etc.)
- Pour remarketing ciblé

---

## 🔗 Étape 5: Intégrations essentielles

### 5.1 Lier Google Ads
1. Dans GA4: **Admin** > **Liens de produits** > **Liens Google Ads**
2. Choisir votre compte Google Ads
3. Activer le marquage automatique

### 5.2 Lier Search Console
1. **Admin** > **Liens de produits** > **Search Console**
2. Sélectionner votre propriété Search Console
3. Choisir le flux Web

### 5.3 Configuration Enhanced E-commerce
Pour tracker les services comme des produits :
1. **Admin** > **Paramètres de la propriété**
2. Activer "Enhanced measurement"
3. Activer tous les événements automatiques

---

## 📊 Étape 6: Rapports personnalisés recommandés

### 6.1 Rapport de performance des services
- **Dimensions**: Page service, Source/Medium
- **Métriques**: Sessions, Taux de conversion, Valeur
- **Filtre**: Pages /services/*

### 6.2 Rapport géographique La Réunion
- **Dimension principale**: Ville
- **Dimension secondaire**: Source de trafic
- **Métriques**: Utilisateurs, Conversions
- **Filtre**: Région = La Réunion

### 6.3 Rapport ROI campagnes
- **Dimensions**: Campagne, Source/Medium
- **Métriques**: Coût, Conversions, ROAS
- **Période**: 30 derniers jours

---

## 🔍 Étape 7: Vérification et tests

### 7.1 Vérifier l'installation
1. Installer l'extension Chrome "Google Analytics Debugger"
2. Visiter votre site avec l'extension activée
3. Ouvrir la console (F12)
4. Vérifier les événements envoyés

### 7.2 Mode Debug GA4
1. Dans GA4: **Admin** > **DebugView**
2. Naviguer sur votre site
3. Vérifier en temps réel les événements

### 7.3 Test des conversions
1. Remplir un formulaire test
2. Vérifier dans **Temps réel** > **Événements**
3. Confirmer la réception de `form_submit`

---

## 📈 KPIs à surveiller (Digiqo)

### Métriques d'acquisition
- **Taux de nouveaux visiteurs**: Objectif >60%
- **Sources de trafic**: Organique >40%, Direct >20%
- **CTR moyen**: >3% depuis Google

### Métriques d'engagement
- **Durée moyenne session**: >2 minutes
- **Pages/session**: >2.5
- **Taux de rebond**: <50%
- **Scroll depth**: >70%

### Métriques de conversion
- **Taux de conversion global**: >2%
- **Taux par service**:
  - Publicité: >3%
  - Dev Web: >2%
  - SEO: >2.5%
- **Valeur moyenne par conversion**: >100€

### Métriques géographiques
- **% trafic La Réunion**: >80%
- **Top 3 villes**: Saint-Denis, Saint-Pierre, Saint-Paul
- **Conversion rate local**: >3%

---

## 🚨 Checklist de configuration

- [ ] Propriété GA4 créée
- [ ] ID de mesure ajouté dans .env.local
- [ ] Variable d'environnement configurée dans Netlify
- [ ] Site déployé avec GA4
- [ ] Installation vérifiée dans DebugView
- [ ] Événements de conversion configurés
- [ ] Google Ads lié
- [ ] Search Console lié
- [ ] Audiences créées
- [ ] Rapports personnalisés configurés
- [ ] Alertes configurées pour anomalies

---

## 📞 Support

### Documentation officielle
- [Guide GA4](https://support.google.com/analytics/answer/9306384)
- [Migration Universal Analytics → GA4](https://support.google.com/analytics/answer/10759417)
- [Enhanced Measurement](https://support.google.com/analytics/answer/9216061)

### Ressources Digiqo
- Code GA4: `/components/GoogleAnalytics/`
- Helpers de tracking: Fonctions exportées du composant
- Événements personnalisés: Voir section 3.3

---

**⚡ Action immédiate**: Créer votre propriété GA4 et récupérer l'ID de mesure !