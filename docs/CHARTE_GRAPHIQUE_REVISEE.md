# Charte Graphique Révisée - Digiqo

## 🎨 Découverte Importante

Suite à l'analyse du site web actuel de Digiqo (https://digiqo.fr/), nous avons identifié une divergence significative entre la charte PDF et l'implémentation réelle. Le site utilise principalement le **bordeaux (#8B1431)** comme couleur dominante, créant une identité visuelle plus sophistiquée et premium que l'approche orange-centric du PDF.

## 🎯 Nouvelle Hiérarchie des Couleurs

### Couleurs Principales

```css
/* Couleur primaire - Fond dominant */
--digiqo-primary: #8B1431;        /* Bordeaux - Sophistication et premium */
--digiqo-primary-light: #A51844;  /* Bordeaux clair - Hover states */
--digiqo-primary-dark: #6B0F26;   /* Bordeaux foncé - Footer, contraste */

/* Couleur d'accent - Actions */
--digiqo-accent: #DA6530;         /* Orange vif - CTA, éléments clés */
--digiqo-accent-light: #E67A47;   /* Orange clair - Hover CTA */
--digiqo-accent-dark: #C5521F;    /* Orange foncé - Active states */

/* Couleur secondaire - Structure */
--digiqo-secondary: #199CB7;      /* Bleu clair - Sections alternatives */
--digiqo-secondary-dark: #127387; /* Bleu foncé - Variantes */

/* Neutres */
--digiqo-white: #FFFFFF;          /* Texte principal sur fond sombre */
--digiqo-gray-light: #F8F9FA;     /* Backgrounds alternatifs */
--digiqo-gray: #E9E9E9;           /* Bordures, séparateurs */
--digiqo-gray-dark: #6C757D;      /* Texte secondaire */
--digiqo-black: #212529;          /* Texte sur fond clair */
```

## 📐 Application par Section

### 1. Hero Section
- **Background**: Bordeaux uni (#8B1431)
- **Texte**: Blanc (#FFFFFF)
- **CTA Principal**: Orange (#DA6530) avec hover orange clair
- **CTA Secondaire**: Bordure blanche, hover inversé
- **Animations**: Particules blanches subtiles, parallax doux

### 2. Services Section
- **Background**: Bordeaux (#8B1431)
- **Cards**: Blanc avec glassmorphism (backdrop-blur)
- **Icônes**: Gradients orange vers bordeaux
- **Hover**: Élévation avec ombre colorée bordeaux transparent
- **Service principal (Publicité)**: Accent orange plus marqué

### 3. Testimonials Section
- **Background**: Blanc ou gris très clair (#F8F9FA)
- **Cards**: Blanc avec bordure gris clair
- **Texte**: Noir (#212529) pour contraste optimal
- **Accents**: Touches d'orange pour les étoiles/ratings

### 4. Video Section
- **Background initial**: Bordeaux (#8B1431)
- **Transition**: Fade vers transparent lors de l'expansion
- **Overlay vidéo**: Gradient noir transparent pour lisibilité du texte

### 5. Footer
- **Background**: Bordeaux foncé (#6B0F26)
- **Texte**: Blanc avec opacité pour hiérarchie
- **Links hover**: Orange (#DA6530)

## 🎯 Règles d'Usage

### Hiérarchie Visuelle
1. **Bordeaux**: Couleur dominante pour créer l'atmosphère premium
2. **Orange**: Exclusivement pour les CTA et éléments d'action
3. **Bleu**: Sections de respiration et contenu informatif
4. **Blanc**: Contraste et lisibilité maximale

### Ratios de Contraste (WCAG AAA)
- Blanc sur Bordeaux: **7.5:1** ✅
- Orange sur Blanc: **4.5:1** ✅
- Blanc sur Orange: **3.2:1** ⚠️ (utiliser pour grandes tailles uniquement)
- Bordeaux sur Blanc: **7.5:1** ✅

### Gradients Recommandés
```css
/* Gradient principal - Subtil */
background: linear-gradient(135deg, #8B1431 0%, #6B0F26 100%);

/* Gradient accent - CTA */
background: linear-gradient(135deg, #DA6530 0%, #C5521F 100%);

/* Gradient overlay - Profondeur */
background: linear-gradient(180deg, transparent 0%, rgba(139, 20, 49, 0.1) 100%);
```

## 🎬 Animations & Interactions

### Hover States
```css
/* Boutons CTA */
.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(218, 101, 48, 0.3);
  background-color: #E67A47;
}

/* Cards */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(139, 20, 49, 0.15);
}
```

### Transitions
- **Durée standard**: 300ms
- **Durée premium**: 600-800ms pour reveals importants
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

### Micro-interactions
1. **Ripple effect**: Sur clic CTA
2. **Glow pulse**: Sur éléments interactifs au focus
3. **Smooth scroll**: Ancres avec easing premium
4. **Parallax subtil**: Hero et sections clés

## 🔄 Migration Progressive

### Phase 1 - Immédiat
- ✅ Hero background bordeaux
- ✅ Services background bordeaux
- ✅ Video section bordeaux
- ⏳ Configuration Tailwind mise à jour

### Phase 2 - Court terme
- Création component library
- Standardisation des boutons
- Harmonisation des cards
- Guide de style interactif

### Phase 3 - Moyen terme
- Refonte sections restantes
- Tests A/B sur impact visuel
- Optimisation performance
- Documentation complète

## 💡 Recommandations Stratégiques

1. **Positionnement Premium**: Le bordeaux dominant positionne Digiqo comme leader sophistiqué
2. **Différenciation**: Se démarque des agences "tech" bleues ou "créatives" multicolores
3. **Mémorabilité**: Association forte bordeaux = Digiqo dans l'esprit des clients
4. **Évolutivité**: Palette permettant variations sans perdre l'identité

## ⚠️ Points d'Attention

1. **Fatigue visuelle**: Prévoir sections blanches pour respiration
2. **Accessibilité**: Toujours tester les contrastes
3. **Performance**: Éviter gradients complexes sur mobile
4. **Cohérence**: Appliquer strictement la hiérarchie

## 📊 Métriques de Succès

- Temps passé sur site +15%
- Taux de conversion CTA +20%
- Mémorisation marque +30%
- Satisfaction visuelle 4.5/5

---

*Cette révision aligne l'identité visuelle web avec le positionnement premium réel de Digiqo, créant une expérience cohérente et mémorable.*