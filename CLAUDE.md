# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Guide du Projet Digiqo Site Premium

## 🎯 Vision du Projet

Créer un site web ultra-moderne et premium pour Digiqo, une agence de marketing digital basée à La Réunion. Le site doit refléter l'excellence et l'innovation avec des animations sophistiquées et une expérience utilisateur exceptionnelle.

## 🏗️ Architecture Technique

### Stack Technologique
- **Framework**: React 18 avec TypeScript
- **Build Tool**: Vite (pour des performances optimales)
- **Styling**: Tailwind CSS avec design system custom
- **Animations**: 
  - Framer Motion (animations fluides et interactions)
  - Three.js (@react-three/fiber) pour les effets 3D
  - GSAP pour animations complexes (si nécessaire)
- **Icônes**: SVG custom uniquement (pas d'émojis)

### Structure des Dossiers
```
digiqo-site/
├── src/
│   ├── components/
│   │   ├── HeroParallax/    # Section hero avec parallax
│   │   ├── Header/          # Navigation premium
│   │   ├── icons/           # Icônes SVG uniquement
│   │   └── [sections]/      # Autres sections
│   ├── assets/
│   ├── styles/
│   └── utils/
```

## 📋 Méthodologie de Développement

### 1. Approche Page par Page
- Utiliser Airtable comme source de vérité pour l'avancement
- Récupérer le contenu textuel depuis `/var/www/Digiqo/digiqo-contenu/`
- Développer section par section pour chaque page

### 2. Standards de Qualité
- **Design**: Ultra-premium, moderne, sophistiqué
- **Animations**: Subtiles mais impactantes
- **Performance**: Optimisation maximale (Lighthouse 95+)
- **Accessibilité**: WCAG 2.1 AA minimum

### 3. Principes de Design
- **Pas de cheap**: Éviter les solutions faciles ou génériques
- **SVG > Emojis**: Toujours préférer les SVG aux émojis
- **3D quand pertinent**: Utiliser Three.js pour ajouter de la profondeur
- **Micro-interactions**: Chaque élément interactif doit réagir
- **Glassmorphism**: Effets de verre pour la modernité
- **Gradients dynamiques**: Couleurs vibrantes et transitions fluides

## 🎨 Design System (Charte Graphique Officielle)

### Logo
- Symbolise la croissance et la dynamique digitale
- Utiliser sur fond blanc ou bleu clair (#199CB7)
- Zone de protection : hauteur du Q
- Taille minimale : 20mm (print) / 60px (web)

### Couleurs Officielles (Site Web Réel)
```css
--digiqo-primary: #8B1431     /* Bordeaux - Couleur principale du site */
--digiqo-secondary: #199CB7   /* Bleu clair - Couleur secondaire */
--digiqo-accent: #DA6530      /* Orange vif - Couleur d'accent */
--digiqo-blue-dark: #127387   /* Bleu foncé - Variante */
--digiqo-gray: #E9E9E9        /* Gris clair - Neutre */
```

**Note importante**: Le site web actuel de Digiqo utilise principalement le bordeaux (#8B1431) comme couleur de fond principale, contrairement au PDF qui met l'accent sur l'orange. Cette approche crée une identité visuelle plus sophistiquée et premium.

### Typographie
- **Principale**: Nunito Bold (titres)
- **Secondaire**: Nunito Regular/Light (paragraphes)
- Style : Moderne, lisible, adaptée au digital

### Iconographie & Univers Graphique
- **Style d'icônes**: Linéaire, moderne, cohérent
- **Univers visuel**: Dynamique, digital, formes arrondies
- **Illustrations**: Tons froids, contraste modéré
- **Pas d'émojis dans le design** (sauf communication texte avec parcimonie)

### Ton & Communication
- **Voix**: Impertinente mais professionnelle
- **Ton**: Clair, direct, humain, humour subtil

### Effets
- `glass-effect`: Glassmorphism avec backdrop-blur
- `hover-glow`: Lueur au survol
- `gradient-text`: Texte en dégradé

## 📄 Pages à Développer

### Ordre de Priorité (basé sur Airtable)
1. **Accueil** (En cours)
   - [x] Hero avec parallax
   - [ ] Section services
   - [ ] Témoignages Instagram
   - [ ] Section tarifs
   - [ ] Vidéo publicitaire
   - [ ] Footer

2. **Services** (À venir)
   - Publicité en ligne
   - Développement web
   - Community management
   - Etc.

3. **Pages institutionnelles**
   - L'Agence
   - Contact
   - Blog
   - FAQ

## 🚀 Workflow de Développement

### Pour chaque section:
1. **Analyse du contenu** dans `/digiqo-contenu/`
2. **Conception** de l'animation/interaction
3. **Implémentation** avec React/Three.js
4. **Optimisation** des performances
5. **Test** responsive et accessibilité
6. **Validation** dans Airtable

### Commandes
```bash
npm run dev      # Développement (Vite server: http://localhost:5173)
npm run build    # Production (TypeScript check + Vite build)
npm run lint     # ESLint avec TypeScript
npm run preview  # Prévisualisation du build de production
```

## 🎭 Animations Planifiées

### Implémentées
- Hero Parallax avec logos partenaires

### À Implémenter
- Particules 3D en arrière-plan
- Transitions de page fluides
- Révélation de texte au scroll
- Cartes de services en 3D
- Graphiques animés pour les stats
- Cursor custom avec effets

## 📝 Notes Importantes

1. **Performance First**: Toujours optimiser les assets
2. **Mobile First**: Concevoir d'abord pour mobile
3. **SEO Ready**: Structure sémantique et meta tags
4. **Analytics**: Prévoir l'intégration GA4/GTM
5. **A/B Testing**: Structure permettant les tests

## 🔄 État Actuel

- **Page Accueil**: Hero section complétée avec parallax
- **Prochaine étape**: Header avec navigation premium
- **Contenu disponible**: Tout le texte dans `/digiqo-contenu/`

## 🛠️ Architecture du Code

### Configuration du Projet
- **TypeScript**: Configuration stricte avec path alias `@/*` vers `src/*`
- **Vite**: Build tool moderne avec HMR et optimisations de production
- **Tailwind CSS**: Classes utilitaires avec design tokens personnalisés définis dans `tailwind.config.js`
- **PostCSS**: Configuration pour Tailwind et autoprefixer

### Structure des Composants
- Les composants sont organisés en dossiers avec `index.ts` pour les exports
- Chaque composant majeur a son propre dossier (ex: `HeroParallax/`, `Header/`)
- Les icônes SVG sont des composants React dans `src/components/icons/`
- Images partenaires stockées dans `/partenaires/` à la racine (format WebP optimisé)

### Ressources Externes
- **Contenu textuel**: `/var/www/Digiqo/digiqo-contenu/` contient tous les textes des pages et services
- **Charte graphique**: PDF complet disponible dans `/digiqo-contenu/Graphique/`
- **Assets partenaires**: Plus de 70 logos de partenaires en format WebP

### Points d'Attention
- Toujours utiliser les couleurs du design system (ex: `text-digiqo-orange`)
- Les animations sont définies dans `tailwind.config.js` (float, glow, slide-up, fade-in)
- Font Nunito à importer et configurer dans l'index.html ou via CSS
- Respecter l'approche Mobile First dans tous les développements

---

*Ce document est la référence pour maintenir la cohérence et la qualité premium du projet Digiqo.*