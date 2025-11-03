# Guide de Formatage des Formations Digicademy

Ce guide explique comment structurer le contenu des formations pour garantir un affichage cohérent et professionnel.

## 📋 Table des Matières

1. [Patterns de Contenu Supportés](#patterns-de-contenu-supportés)
2. [Règles de Formatage](#règles-de-formatage)
3. [Exemples par Type](#exemples-par-type)
4. [Erreurs Courantes](#erreurs-courantes)
5. [Checklist de Validation](#checklist-de-validation)

---

## Patterns de Contenu Supportés

### 1. Titres de Section avec Deux-Points
```
Métriques Essentielles :
Portée et Visibilité :
Configuration du Pixel Meta :
```

**Rendu** : Titre en gras bordeaux (#8B1431) avec barre de gradient verticale

**Règles** :
- ✅ Commence par une majuscule
- ✅ Se termine par ` :`
- ✅ Supporte les accents : `À-ÿ`
- ✅ Supporte les apostrophes : `'` et `'`
- ✅ Supporte les parenthèses dans le titre

---

### 2. Titres avec Numéro au Début
```
3 Types de Ciblage :
5 Erreurs à Éviter :
```

**Rendu** : Titre en gras bordeaux avec barre de gradient

**Format** : `[CHIFFRE] [ESPACE] [TITRE] :`

---

### 3. Titres de Section Numérotés avec Qualificatif
```
1. Ciblage Démographique (Base) :
2. Ciblage par Centres d'Intérêt (Avancé) :
3. Ciblage Comportemental (Expert) :
```

**Rendu** : Titre en gras avec numéro orange, qualificatif en gris

**Format** : `[CHIFFRE]. [ESPACE] [TITRE] [ESPACE](QUALIFICATIF) :`

---

### 4. Titres avec Qualificatif (sans numéro)
```
Audiences Personnalisées (Custom) :
Audiences Similaires (Lookalike) :
```

**Rendu** : Titre en gras avec qualificatif en gris

**Format** : `[TITRE] [ESPACE](QUALIFICATIF) :`

---

### 5. Éléments Numérotés avec Description
```
1. Ciblage Démographique (Base) : Localisation, âge, genre et langues
```

**Rendu** : Numéro orange + titre en gras + description en paragraphe

**Format** : `[CHIFFRE]. [ESPACE] [TITRE] (QUALIFICATIF) : [DESCRIPTION]`

**Note** : La description doit être présente après les deux-points

---

### 6. Listes à Puces
```
- Localisation : Pays, ville, rayon précis (1-80km)
- Âge : 13 à 65+ ans
- Genre : Homme, Femme, Tous
```

**Rendu** : Puce standard avec texte normal

**Format** : `- [ESPACE] [CONTENU]`

---

### 7. Listes Numérotées Simples
```
1. Objectif inadapté : Choisir "Trafic" quand on veut vendre
2. Budget insuffisant : Minimum 20€/jour pour tests
```

**Rendu** : Numéro + texte normal

**Format** : `[CHIFFRE]. [ESPACE] [CONTENU]`

---

### 8. Listes Alphabétiques avec Descriptions
```
A - Attention : Question directe ou affirmation choc
B - Bénéfice : Promesse de résultat tangible
C - Curiosité : Créer du suspense ou de l'intrigue
```

**Rendu** : Lettre orange + concept en gras + description

**Format** : `[LETTRE] - [ESPACE] [CONCEPT] : [DESCRIPTION]`

---

### 9. Descriptions de Phases
```
Phase Lancement (J1-7) : Ne rien changer, surveiller
Phase Optimisation (J8-30) : Améliorer CTR, CPC, conversions
```

**Rendu** : Encadré bleu avec phase en gras

**Format** : `Phase [NOM] (PÉRIODE) : [DESCRIPTION]`

---

### 10. Titres de Formats (spécifique aux formats publicitaires)
```
Image Simple : Format de base, rapide à créer
Vidéo : Format privilégié par l'algorithme
Carrousel : 2 à 10 images ou vidéos
Stories et Reels : Format vertical immersif
```

**Rendu** : Titre de format en gras + description en texte medium

**Format** : `[FORMAT_NAME] : [DESCRIPTION]`

**Formats reconnus** : `Image Simple`, `Carrousel`, `Vidéo`, `Stories et Reels`

---

### 11. Titre + Description Courte (< 50 caractères)
```
Objectifs principaux : Notoriété, trafic, conversions
```

**Rendu** : Titre en gras + description en texte normal

**Format** : `[TITRE] : [DESCRIPTION_COURTE]`

**Note** : La description après `:` doit faire moins de 50 caractères

---

### 12. Formules et Calculs
```
CTR = Clics ÷ Impressions × 100
ROAS = Chiffre d'affaires ÷ Coût publicitaire
```

**Rendu** : Encadré orange avec police monospace

**Détection** : Contient `=` ou `×` et moins de 100 caractères

---

### 13. Points Importants
```
Attentes réalistes : Les résultats prennent du temps
La réussite nécessite : De la patience et des tests
Règle des 3 premiers jours : Ne rien modifier
```

**Rendu** : Encadré doré avec icône d'information

**Mots-clés** : `Attentes réalistes`, `La réussite`, `Règle des`

---

## Règles de Formatage

### Caractères Supportés

#### ✅ Majuscules avec Accents
```
A-Z É È Ê Ë À Â Ä Ô Ö Ï Î Ù Û Ü Ç
```

#### ✅ Minuscules avec Accents
```
a-z é è ê ë à â ä ô ö ï î ù û ü ç
```
**Range Unicode** : `À-ÿ`

#### ✅ Apostrophes
- Apostrophe droite : `'`
- Apostrophe courbe : `'`

#### ✅ Caractères Spéciaux
- Parenthèses : `( )`
- Tirets : `-`
- Virgules : `,`
- Deux-points : `:`

---

### Structure des Modules

```typescript
{
  id: 'module-1',
  title: 'Titre du Module',
  duration: '15 min',
  content: [
    'Titre Principal :',
    '',  // Ligne vide pour espacement
    'Sous-section :',
    '- Premier élément de liste',
    '- Deuxième élément',
    '',
    '1. Premier élément numéroté',
    '2. Deuxième élément numéroté'
  ]
}
```

---

## Exemples par Type

### Exemple Complet - Module de Ciblage

```typescript
content: [
  '3 Types de Ciblage :',
  '',
  '1. Ciblage Démographique (Base) :',
  '- Localisation : Pays, ville, rayon précis (1-80km)',
  '- Âge : 13 à 65+ ans (minimum 18 pour certains secteurs)',
  '- Genre : Homme, Femme, Tous',
  '',
  '2. Ciblage par Centres d\'Intérêt (Avancé) :',
  '- Pages likées, interactions, sites visités',
  '- Catégories : Mode, Food, Sport, Loisirs',
  '',
  'Audiences Personnalisées (Custom) :',
  '- Site web (Pixel) : Visiteurs, abandons panier',
  '- Liste clients (CRM) : Emails/téléphones'
]
```

---

### Exemple - Module avec Formules

```typescript
content: [
  'Métriques de Performance :',
  '',
  'Formules Essentielles :',
  'CTR = Clics ÷ Impressions × 100',
  'CPC = Coût total ÷ Nombre de clics',
  'ROAS = Chiffre d\'affaires ÷ Coût publicitaire',
  '',
  'Objectifs par Secteur :',
  '- E-commerce : ROAS 3-4x minimum',
  '- Services : CTR 2-4%'
]
```

---

### Exemple - Module avec Phases

```typescript
content: [
  'Stratégies d\'optimisation :',
  '',
  'Phase Lancement (J1-7) : Ne rien changer, surveiller',
  'Phase Optimisation (J8-30) : Améliorer CTR, CPC, conversions',
  'Phase Scaling (J30+) : Augmenter volumes, nouveaux segments'
]
```

---

## Erreurs Courantes

### ❌ Erreur 1 : Titre sans Deux-Points Final
```
INCORRECT : Métriques Essentielles
CORRECT   : Métriques Essentielles :
```

### ❌ Erreur 2 : Apostrophe Non Supportée
```
INCORRECT : Strategies d`optimisation :
CORRECT   : Stratégies d'optimisation :
         ou Stratégies d'optimisation :
```

### ❌ Erreur 3 : Accent Manquant
```
INCORRECT : Strategies d'optimisation :
CORRECT   : Stratégies d'optimisation :
```

### ❌ Erreur 4 : Format de Liste Incohérent
```
INCORRECT : -Élément sans espace
CORRECT   : - Élément avec espace
```

### ❌ Erreur 5 : Numérotation Incorrecte
```
INCORRECT : 1- Élément (tiret au lieu de point)
CORRECT   : 1. Élément
```

### ❌ Erreur 6 : Description Manquante pour Élément Numéroté avec Qualificatif
```
INCORRECT : 1. Ciblage Démographique (Base) :
           (pas de description après les deux-points)

CORRECT   : 1. Ciblage Démographique (Base) : Description ici
         OU
CORRECT   : 1. Ciblage Démographique (Base) :
           - Élément de liste
```

### ❌ Erreur 7 : Ligne Vide Manquante
```
INCORRECT : Titre 1 :
           Titre 2 :

CORRECT   : Titre 1 :

           Titre 2 :
```

---

## Checklist de Validation

### Avant d'Ajouter du Contenu

- [ ] Tous les titres de section se terminent par ` :`
- [ ] Les accents français sont corrects (é, è, ê, à, etc.)
- [ ] Les apostrophes utilisent `'` ou `'`
- [ ] Les listes à puces commencent par `- `
- [ ] Les listes numérotées utilisent `1. `, `2. `, etc.
- [ ] Les lignes vides séparent les sections
- [ ] Les formules contiennent `=` ou `×`
- [ ] Les phases suivent le format `Phase [NOM] (PÉRIODE) :`
- [ ] Les qualificatifs entre parenthèses sont correctement placés
- [ ] Les titres avec numéro suivent `[CHIFFRE] [TITRE] :`

### Après Ajout du Contenu

- [ ] Tester l'affichage dans le navigateur
- [ ] Vérifier que les titres ont la barre de gradient
- [ ] Vérifier que les listes sont correctement indentées
- [ ] Vérifier que les formules sont dans un encadré orange
- [ ] Vérifier que les phases sont dans un encadré bleu
- [ ] Vérifier que les points importants sont dans un encadré doré

---

## Patterns Regex de Référence

Pour les développeurs qui souhaitent ajouter de nouveaux patterns :

```typescript
// Titre de section se terminant par ":"
/^[A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+\s?:$/

// Titre avec numéro au début "3 Types de Ciblage :"
/^(\d+)\s([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?:$/

// Titre numéroté avec qualificatif (sans description)
/^(\d+)\.\s([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?\(([^)]+)\)\s?:$/

// Titre avec qualificatif (sans numéro)
/^([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?\(([^)]+)\)\s?:$/

// Élément numéroté avec description
/^(\d+)\.\s([A-ZÉÈÊËÀÂÄÔÖÏÎÙÛÜÇ][\wÀ-ÿ\s\',()''À-ÿ-]+)\s?\(([^)]+)\)\s?:\s(.+)$/

// Liste alphabétique "A - Concept : Description"
/^([A-Z])\s-\s([^:]+)\s?:\s(.+)$/

// Phase "Phase Lancement (J1-7) : Description"
/^(Phase\s[\wÀ-ÿ\s()J\-0-9]+)\s?:\s(.+)$/

// Format publicitaire
/^(Image Simple|Carrousel|Vidéo|Stories et Reels)\s?:\s(.+)$/
```

---

## Contact & Support

Pour toute question sur le formatage des formations :
1. Consulter ce guide en premier
2. Vérifier les exemples de la formation Meta Ads
3. Tester dans l'environnement de développement

**Fichier de référence** : `/lib/digicademy-formations.ts`
**Page de rendu** : `/pages/digicademy/formations/[slug].tsx`

---

*Dernière mise à jour : 2025-01-03*
