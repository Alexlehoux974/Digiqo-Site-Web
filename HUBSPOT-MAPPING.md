# Mapping Formulaire Audit → HubSpot

## Propriétés HubSpot Existantes

### Objet COMPANIES

#### Informations de base
- `name` - Nom de l'entreprise
- `industry` - Secteur d'activité (liste prédéfinie avec 150+ options)
- `city` - Ville
- `numberofemployees` - Nombre d'employés
- `website` - Site web

#### Réseaux sociaux (groupe "socialmediainformation")
- `facebook_company_page` - URL page Facebook
- `linkedin_company_page` - URL page LinkedIn
- `twitterhandle` - Handle Twitter (@username)
- `googleplus_page` - URL Google Plus (obsolète)
- `page_instagram_de_votre_entreprise` - URL Instagram (propriété custom créée le 31/05/2023)

### Objet CONTACTS

#### Informations personnelles
- `firstname` - Prénom
- `lastname` - Nom
- `email` - Email
- `phone` - Téléphone
- `message` - Champ texte libre pour messages

#### Informations entreprise (sur contact)
- `company` - Nom de l'entreprise du contact
- `industry` - Secteur d'activité
- `website` - Site web
- `city` - Ville

#### Propriétés personnalisées créées
- `audit_company_age` - Ancienneté de l'entreprise (créée par erreur dans contacts au lieu de companies)

## Mapping avec le formulaire d'audit

### Étape 1 : Informations Générales
| Champ Formulaire | Propriété HubSpot Companies | Status |
|-----------------|----------------------------|---------|
| companyName | `name` | ✅ Existe |
| sector | `industry` | ✅ Existe (avec liste) |
| location | `city` | ✅ Existe |
| companyAge | - | ❌ À créer |
| teamSize | `numberofemployees` | ⚠️ Existe (numérique, pas tranches) |
| businessModel | - | ❌ À créer |

### Étape 2 : Actifs Digitaux
| Champ Formulaire | Propriété HubSpot Companies | Status |
|-----------------|----------------------------|---------|
| website | `website` | ✅ Existe |
| facebook | `facebook_company_page` | ✅ Existe |
| instagram | `page_instagram_de_votre_entreprise` | ✅ Existe (custom) |
| linkedin | `linkedin_company_page` | ✅ Existe |
| twitter | `twitterhandle` | ⚠️ Existe (format @handle) |
| tiktok | - | ❌ N'existe pas |
| youtube | - | ❌ N'existe pas |
| googleBusiness | - | ❌ N'existe pas |
| tripadvisor | - | ❌ N'existe pas |
| salesPlatforms | - | ❌ N'existe pas |

### Étape 10 : Contact
| Champ Formulaire | Propriété HubSpot Contacts | Status |
|-----------------|----------------------------|---------|
| firstName | `firstname` | ✅ Existe |
| lastName | `lastname` | ✅ Existe |
| email | `email` | ✅ Existe |
| phone | `phone` | ✅ Existe |

## Propriétés créées dans HubSpot (20/09/2025)

### Pour Companies - TOUTES CRÉÉES ✅
- `youtube_channel_url` - URL de la chaîne YouTube
- `tiktok_account` - URL du compte TikTok
- `google_business_listing` - URL Google My Business
- `tripadvisor_listing` - URL TripAdvisor
- `audit_company_age` - Ancienneté de l'entreprise (liste avec options)
- `audit_business_model` - Modèle économique (B2B, B2C, etc.)
- `audit_team_size` - Taille de l'équipe (tranches)
- `sales_platforms` - Plateformes de vente (texte multiligne)

## Validation CSV

Après vérification des exports `/root/company.csv` et `/root/contact.csv`:
- ✅ Toutes les propriétés existantes ont été correctement identifiées
- ✅ Aucune propriété pertinente n'a été manquée
- ✅ Les propriétés créées n'existaient pas déjà (pas de doublons)
- ℹ️ Note: `audit_company_age` existe dans contacts.csv (erreur initiale) mais a été correctement créée dans Companies

### Étapes 3-9 (non mappées)
Les données des étapes 3 à 9 du formulaire d'audit n'ont pas d'équivalent direct dans HubSpot et nécessiteraient soit :
1. Création de nombreuses propriétés personnalisées
2. Stockage dans un champ texte consolidé
3. Envoi vers n8n pour traitement séparé

## Configuration Netlify requise

Variable d'environnement à ajouter :
```
HUBSPOT_ACCESS_TOKEN = "pat-eu1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Le token doit avoir les permissions :
- `crm.objects.contacts.write`
- `crm.objects.companies.write`
- `crm.schemas.contacts.write`
- `crm.schemas.companies.write`