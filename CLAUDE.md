# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digiqo Site Premium - A modern, high-performance marketing agency website built with Next.js 15, React 18, TypeScript, and Tailwind CSS. The site serves as the main digital presence for Digiqo, a digital marketing agency in La Réunion, featuring sophisticated animations, premium design, and integration with external data sources.

## Development Commands

```bash
# Development
npm run dev         # Start Next.js dev server on http://localhost:3000

# Build & Production
npm run build       # Generate sitemap + Next.js production build
npm run start       # Start Next.js production server

# Code Quality
npm run lint        # ESLint with TypeScript (max-warnings 0)
npm run type-check  # TypeScript type checking without emit

# Utilities
npm run generate-sitemap  # Generate sitemap.xml manually
```

## Architecture & Technical Stack

### Core Technologies
- **Next.js 15.4** with Pages Router (not App Router)
- **React 18** with TypeScript for type safety
- **Tailwind CSS** with custom design system and extensive color palette
- **Framer Motion** for sophisticated animations
- **Three.js** (@react-three/fiber) for 3D effects
- **N8N Chat** widget for customer support

### Project Structure
```
/
├── components/          # Reusable UI components with index.ts exports
│   ├── ServicePages/   # Service-specific page components
│   ├── icons/         # SVG icon components (no emojis)
│   ├── magicui/       # Special UI effects components
│   └── ui/            # Shared UI primitives
├── pages/             # Next.js Pages Router
│   ├── api/          # API routes (contact, testimonials, audit)
│   ├── services/     # Dynamic service pages via [slug].tsx
│   └── *.tsx         # Static pages
├── lib/              # Utilities and configurations
│   ├── airtable-products.ts  # Product data from Airtable
│   ├── services.ts           # Service definitions
│   ├── seo-config.ts         # SEO configuration
│   └── utils.ts             # cn() function for class merging
├── public/
│   ├── partenaires/  # 70+ partner logos in WebP format
│   └── services-content/  # Service page content
├── scripts/          # Build scripts
│   └── generate-sitemap.js  # Sitemap generation
└── src/              # Additional source components (AuditForm)
```

### Data Architecture

**Product Data Integration**:
- Products sourced from Airtable base "Site web digiqo" / "Tarifs produits"
- Three payment types: MMR (Monthly Recurring), ARR (Annual Recurring), ONE_SHOT
- Categories: PUBLICITÉ EN LIGNE, COMMUNITY MANAGEMENT, DÉVELOPPEMENT WEB, IDENTITÉ DE MARQUE, and more
- Helper functions in `lib/airtable-products.ts` for filtering by category/payment type

**Service Pages**:
Dynamic routing with 8 service pages defined in `lib/services.ts`:
- `/services/publicite` - Publicité en ligne
- `/services/dev-web` - Développement web
- `/services/community` - Community management
- `/services/seo` - SEO
- `/services/video` - Production vidéo
- `/services/identite` - Identité visuelle
- `/services/audit` - Audit digital
- `/services/sitekeeper` - Maintenance web

## Design System

### Color Palette
```css
Primary (Bordeaux): #8B1431    /* Main brand color */
Accent (Orange): #DA6530       /* CTAs and highlights */
Secondary (Blue): #199CB7      /* Supporting elements */
```

Additional design tokens configured in `tailwind.config.js`:
- Gradients: `gradient-digiqo`, `gradient-accent`, `gradient-secondary`
- Shadows: `shadow-digiqo`, `shadow-accent`
- Fonts: Montserrat (display/sans), Inter (body), Lora (serif)
- Animations: `float`, `glow`, `slide-up`, `fade-in`, `pulse-subtle`, `ripple`

## Deployment

**Platform**: Netlify with Next.js plugin
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18
- Auto-deployment from main branch
- Security headers configured in `netlify.toml`
- Image optimization via netlify-plugin-image-optim

## Development Guidelines

### Code Quality Standards
- **TypeScript**: Strict mode enabled, no unused locals/parameters
- **Linting**: ESLint with max-warnings 0 policy
- **Imports**: Use `@/*` path alias for clean imports (maps to project root)
- **Components**: Always export through index.ts files for clean imports
- **Icons**: Use SVG components only, no emoji usage in design
- **Utilities**: Use `cn()` from `lib/utils.ts` for className merging

### Component Organization
1. Each major component has its own folder with an `index.ts` for exports
2. Service pages are centralized in `components/ServicePages/`
3. Icons are React components in `components/icons/`
4. Shared UI primitives in `components/ui/`
5. Special effects in `components/magicui/`

### API Routes
- `/api/contact` - Contact form submission
- `/api/testimonials` - Testimonial data
- `/api/audit` - Audit form submission

## Important Notes

1. **Pages Router**: Using Next.js Pages Router, NOT App Router - important for routing patterns
2. **Premium Quality**: Focus on sophisticated animations and glass effects
3. **Partner Logos**: Large collection (70+) in `/public/partenaires/` requiring optimization
4. **Sitemap Generation**: Auto-generated on build via `scripts/generate-sitemap.js`
5. **External Content**: Service content stored in `/public/services-content/` as .txt files
6. **Webpack Config**: External modules for utf-8-validate and bufferutil (WebSocket dependencies)
7. **Security Headers**: Configured in netlify.toml with HSTS, CSP, X-Frame-Options, etc.
8. **Chat Widget**: N8N chat integration for customer support (@n8n/chat package)
9. **Audit Form**: Complex multi-step form in `src/components/AuditForm/` with 11 steps
10. **Path Alias**: `@/*` maps to project root - use for all imports
11. **TypeScript**: Strict mode with noUnusedLocals and noUnusedParameters enabled

## Critical Architecture Patterns

### Service Page System
The site uses a dynamic routing system for service pages:
1. Service definitions in `lib/services.ts` define available slugs
2. `pages/services/[slug].tsx` maps slugs to components in `components/ServicePages/`
3. Each service has its own SEO configuration in `lib/seo-config.ts`
4. Service content is loaded from `/public/services-content/*.txt` files

### State Management Pattern
- No global state management library (Redux/Zustand)
- Local state with React hooks
- Form state managed within components
- Animation states controlled by Framer Motion

### Animation Architecture
- Framer Motion for component animations
- Three.js (@react-three/fiber) for 3D effects
- Custom animation utilities in `lib/animation-utils.ts`
- Animation constants in `lib/animation-constants.ts`

## Data Flow & Integration Points

### Airtable Integration
- Product data stored in `lib/airtable-products.ts`
- Base: "Site web digiqo" / Table: "Tarifs produits"
- Payment types: MMR (Monthly), ARR (Annual), ONE_SHOT
- Product categories align with service offerings
- Service-to-category mapping in `serviceCategoryMapping` object

### Build Process
1. `generate-sitemap.js` runs before Next.js build
2. Next.js builds static pages with getStaticProps/getStaticPaths
3. Service pages generated from `lib/services.ts` definitions
4. Netlify plugin handles deployment optimizations