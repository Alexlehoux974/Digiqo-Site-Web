# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digiqo Site Premium - A modern, high-performance marketing agency website built with React, TypeScript, and Vite. The site emphasizes premium design, sophisticated animations, and exceptional user experience.

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:5173
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint with TypeScript (max-warnings 0)
npm run preview  # Preview production build locally
```

## Architecture & Technical Stack

### Core Technologies
- **React 18** with TypeScript for type safety
- **Vite** as build tool for optimal DX and performance
- **React Router v7** for client-side routing
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Three.js** (@react-three/fiber) for 3D effects

### Project Structure
```
src/
├── components/          # All UI components
│   ├── [Section]/      # Section-specific components with index.ts exports
│   ├── icons/          # SVG icon components (no emojis)
│   ├── magicui/        # Special UI effects components
│   └── ui/             # Shared UI primitives
├── pages/              # Route components
├── lib/                # Utilities (class variance, tailwind merge)
└── main.tsx           # App entry point with routing
```

### Key Architectural Patterns

1. **Component Organization**: Each major component has its own folder with an `index.ts` for exports
2. **Icon System**: All icons are React components, strictly SVG-based (no emojis in design)
3. **Type Safety**: Strict TypeScript configuration with path alias `@/*` → `src/*`
4. **Partner Images**: 70+ WebP optimized logos stored in `/partenaires/` (duplicated in public for direct access)

## Design System

### Color Palette (from tailwind.config.js)
```css
Primary (Bordeaux): #8B1431    /* Main brand color for sophistication */
Accent (Orange): #DA6530       /* CTAs and highlights */
Secondary (Blue): #199CB7      /* Supporting elements */
```

### Typography
- **Primary Font**: Montserrat (display & sans)
- **Body Font**: Inter
- **Serif**: Lora (for special content)

### Animations
Custom Tailwind animations defined:
- `float`, `glow`, `glow-orange`
- `slide-up`, `fade-in`
- `pulse-subtle`, `ripple`

## Content Management

### External Content Source
All page content and service descriptions are stored in:
`/var/www/Digiqo/digiqo-contenu/`

Structure:
- `/pages/` - Page content (accueil.txt, services.txt, etc.)
- `/services/` - Service descriptions
- `/Graphique/` - Brand assets and style guide PDF

## Deployment

**Platform**: Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18
- SPA redirects configured in `netlify.toml`

## Development Guidelines

### Performance Standards
- Lighthouse score target: 95+
- Mobile-first responsive design
- WebP images for optimal loading

### Code Quality
- No cheap/generic solutions
- Sophisticated animations (subtle but impactful)
- Always use SVG icons over emojis
- Follow existing component patterns

### Current Development State
- **Completed**: Hero section with parallax, partner logos integration
- **Active Focus**: Homepage sections (Results, Case Studies, Video, Testimonials, Services)
- **Routing**: Currently homepage (`/`) and 404 page implemented

## Important Notes

1. **TypeScript Path Alias**: Use `@/` for imports from `src/`
2. **Partner Assets**: Large collection of partner logos in WebP format
3. **No README.md**: Project documentation is in this CLAUDE.md
4. **Glass Effects**: Use Tailwind's backdrop-blur for modern glassmorphism
5. **3D When Relevant**: Three.js is available for depth and modern effects