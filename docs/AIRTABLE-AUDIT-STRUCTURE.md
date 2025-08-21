# Structure Airtable - Base Audit Digital

## Configuration complète de la base Airtable pour le formulaire d'audit digital

### Vue d'ensemble
La base Airtable "Audit" (ID: `appjm4K9z1Px7ygXO`) a été configurée avec 9 tables interconnectées pour collecter et gérer les données du formulaire d'audit digital en 11 étapes.

### Architecture des tables

#### 1. Table principale : **Audits** (`tblEbenlxn5FCfbND`)
Table centrale qui orchestre toutes les données d'audit.

**Champs principaux :**
- Référence Audit (texte)
- Date Création (date/heure)
- Statut (sélection unique)
- Score Global (pourcentage)
- Priorité (sélection unique)
- Commercial Assigné (texte)
- Notes Internes (texte long)
- Date Dernier Contact (date/heure)
- URL Rapport (URL)
- Montant Estimé (devise)
- Source (sélection unique)

**Relations :**
- → Entreprises
- → Actifs Digitaux
- → Performance Web
- → Marketing Digital
- → Conversion & CRM
- → Contacts
- → Scores & Recommandations
- → Réputation & Objectifs

---

#### 2. **Entreprises** (`tblszAkQnXjEusk0t`)
Informations générales sur l'entreprise auditée.

**Champs :**
- Nom Entreprise
- Secteur d'Activité
- Taille Entreprise
- Année de Fondation
- Localisation
- Modèle Économique
- Âge Entreprise
- Taille Équipe Marketing
- Lien Audit → Audits

---

#### 3. **Actifs Digitaux** (`tblNCcAAJAmxLLttP`)
Présence digitale et réseaux sociaux.

**Champs :**
- ID Actif
- A un Site Web (checkbox)
- URL Site Web
- A des Réseaux Sociaux (checkbox)
- Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube (URLs)
- A Google My Business (checkbox)
- URL Google Business
- A du E-commerce (checkbox)
- Plateformes de Vente
- TripAdvisor
- Autres Plateformes
- Lien Audit → Audits

---

#### 4. **Performance Web** (`tblushJsUtZhOwK4N`)
Analyse détaillée du site web.

**Champs :**
- ID Performance
- Type de Site
- Objectifs du Site
- Scores : UX, Mobile, Vitesse, Design (1-5)
- SEO Optimisé (checkbox)
- Mots-clés SEO
- Ranking SEO
- Google Analytics (checkbox)
- Facebook Pixel (checkbox)
- Tag Manager (checkbox)
- Mobile Optimisé (checkbox)
- Performance Générale
- Lien Audit → Audits

---

#### 5. **Marketing Digital** (`tblEe6gqjHebgEoOg`)
Stratégie social media et publicité.

**Champs :**
- ID Marketing
- Plateformes Actives (multi-sélection)
- Fréquence Publication
- Géré Par
- Engagement
- A une Stratégie (checkbox)
- Types de Publicité (multi-sélection)
- Budget Publicitaire
- ROI Perçu
- Objectifs Campagnes (multi-sélection)
- Contenu : Photos Pro, Vidéos, Graphiques (checkboxes)
- Types de Contenu (multi-sélection)
- Production Contenu
- Cohérence Marque
- Lien Audit → Audits

---

#### 6. **Conversion & CRM** (`tblUdAkqPBSipTPbI`)
Tunnel de conversion et automatisation.

**Champs :**
- ID Conversion
- Méthodes Génération Leads (multi-sélection)
- Taux de Conversion
- A des Landing Pages (checkbox)
- A des Formulaires (checkbox)
- Qualité CTA
- Tracking Leads
- Lead Nurturing
- Processus de Vente
- A un CRM (checkbox)
- Type CRM
- Fonctionnalités CRM (multi-sélection)
- Email Marketing (checkbox)
- Marketing Automation (checkbox)
- Segmentation (checkbox)
- Outils Utilisés (multi-sélection)
- Automatisations (multi-sélection)
- Intégration Systèmes
- Qualité Données
- Analyse Données
- A/B Testing (checkbox)
- Lien Audit → Audits

---

#### 7. **Contacts** (`tblQmymIKJTjDwIy7`)
Informations de contact du prospect.

**Champs :**
- Prénom
- Nom
- Email
- Téléphone
- Moyen de contact préféré (Email/Téléphone/WhatsApp/SMS)
- Créneau horaire préféré
- Meilleur moment
- Date de contact
- RGPD Consentement (checkbox)
- Audit lié → Audits

---

#### 8. **Scores & Recommandations** (`tbl4RxoMqAXitmFAk`)
Résultats et recommandations de l'audit.

**Champs :**
- Scores (pourcentages) : Global, Site web, Réseaux sociaux, Publicité, Contenu, Conversion, CRM, Réputation
- Points forts (texte long)
- Points d'amélioration (texte long)
- Recommandations par priorité : Haute, Moyenne, Basse (textes longs)
- Niveau de maturité digitale (Débutant/Intermédiaire/Avancé/Expert)
- Date de calcul
- Audit lié → Audits

---

#### 9. **Réputation & Objectifs** (`tblTp964ujGGudNCJ`)
E-réputation et objectifs business.

**Champs :**
- Référence
- Surveillance e-réputation (checkbox)
- Réponse aux avis (checkbox)
- Note moyenne (1-5 étoiles)
- Plateformes d'avis (multi-sélection)
- Objectifs principaux (multi-sélection)
- Défis principaux
- Timeline projet
- Budget estimé
- Priorités stratégiques
- Concurrents identifiés
- Avantages compétitifs
- Attentes spécifiques
- Date de mise à jour
- Audit lié → Audits

---

## Intégration avec le formulaire

### Mapping des étapes du formulaire vers les tables Airtable

| Étape formulaire | Table Airtable correspondante |
|-----------------|-------------------------------|
| 0. Général | Entreprises |
| 1. Actifs digitaux | Actifs Digitaux |
| 2. Site Web | Performance Web |
| 3. Réseaux sociaux | Marketing Digital (partie 1) |
| 4. Publicité | Marketing Digital (partie 2) |
| 5. Contenu | Marketing Digital (partie 3) |
| 6. Conversion | Conversion & CRM (partie 1) |
| 7. CRM | Conversion & CRM (partie 2) |
| 8. Réputation | Réputation & Objectifs (partie 1) |
| 9. Objectifs | Réputation & Objectifs (partie 2) |
| 10. Contact | Contacts |
| Résultats | Scores & Recommandations |

### Flux de données

1. **Création d'un nouvel audit** : Un enregistrement est créé dans la table "Audits" avec un ID unique
2. **Collecte progressive** : Les données de chaque étape sont enregistrées dans leur table respective
3. **Liaison automatique** : Chaque enregistrement est lié à l'audit principal via les champs de relation
4. **Calcul des scores** : Les scores sont calculés et stockés dans "Scores & Recommandations"
5. **Suivi commercial** : L'équipe peut suivre et gérer les audits depuis la table principale

### Avantages de cette architecture

✅ **Modularité** : Chaque aspect de l'audit est isolé dans sa propre table
✅ **Évolutivité** : Facile d'ajouter de nouveaux champs sans toucher aux autres tables
✅ **Performance** : Évite la limite de 500 champs par table d'Airtable
✅ **Analyse** : Permet des vues et rapports spécialisés par domaine
✅ **Intégrité** : Les relations garantissent la cohérence des données
✅ **Maintenance** : Structure claire et facile à maintenir

### Prochaines étapes

1. **Créer les vues personnalisées** :
   - Vue "Nouveaux audits" (non traités)
   - Vue "En cours de traitement"
   - Vue "Audits qualifiés" (score > 70%)
   - Vue "Suivi commercial"

2. **Configurer les automatisations** :
   - Notification email lors d'un nouvel audit
   - Calcul automatique des scores
   - Génération du rapport PDF
   - Assignation au commercial

3. **Intégrer avec le site web** :
   - API Airtable pour soumettre les données
   - Webhook pour les notifications
   - Dashboard de suivi

4. **Templates de rapport** :
   - Créer des templates pour les rapports d'audit
   - Personnalisation selon le niveau de maturité
   - Recommandations automatiques basées sur les scores

---

## Notes techniques

- **Base ID** : `appjm4K9z1Px7ygXO`
- **Timezone** : Indian/Reunion (GMT+4)
- **Format dates** : European (JJ/MM/AAAA)
- **Total de champs** : ~165 champs répartis sur 9 tables
- **Relations** : Toutes les tables sont liées à la table principale "Audits"

Cette structure garantit une collecte complète et organisée des données du formulaire d'audit digital, tout en permettant une exploitation efficace pour le suivi commercial et la génération de rapports personnalisés.