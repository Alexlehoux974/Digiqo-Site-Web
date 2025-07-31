# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digiqo Site Premium - A modern, high-performance marketing agency website built with Next.js 15, React 18, TypeScript, and Tailwind CSS. The site emphasizes premium design, sophisticated animations, and exceptional user experience for a digital marketing agency in La Réunion.

## Development Commands

```bash
npm run dev         # Start Next.js dev server on http://localhost:3000
npm run build       # Generate sitemap + Next.js production build
npm run start       # Start Next.js production server
npm run lint        # ESLint with TypeScript (max-warnings 0)
npm run type-check  # TypeScript type checking without emit
npm run generate-sitemap  # Generate sitemap.xml manually
```

## Architecture & Technical Stack

### Core Technologies
- **Next.js 15.4** with App Router for modern React applications
- **React 18** with TypeScript for type safety
- **Tailwind CSS** with custom design system
- **Framer Motion** for sophisticated animations
- **Three.js** (@react-three/fiber) for 3D effects
- **React Router DOM v7** for additional routing capabilities

### Key Dependencies
- **UI Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority` (cva)
- **Icons**: `lucide-react`, `react-icons`, custom SVG components
- **SEO**: `react-helmet-async` for meta tag management
- **Type Definitions**: @types/react, @types/react-dom, @types/three

### Project Structure
```
src/
├── components/          # All UI components
│   ├── [Section]/      # Section-specific components with index.ts exports
│   ├── icons/          # SVG icon components (no emojis)
│   ├── magicui/        # Special UI effects components
│   └── ui/             # Shared UI primitives
├── pages/              # Next.js pages (App Router)
│   ├── services/       # Dynamic service pages
│   └── *.tsx          # Static pages
├── lib/                # Utilities and configurations
│   ├── utils.ts       # cn() function for class merging
│   ├── services.ts    # Service definitions
│   ├── seo-config.ts  # SEO configuration
│   └── ...           # Other utilities
├── public/            # Static assets
│   ├── partenaires/   # 70+ partner logos in WebP format
│   └── services-content/  # Service page content
└── scripts/           # Build scripts
```

### Key Architectural Patterns

1. **Component Organization**: Each major component has its own folder with an `index.ts` for clean exports
2. **Icon System**: All icons are React components, strictly SVG-based (no emojis in design)
3. **Type Safety**: Strict TypeScript with path alias `@/*` → project root
4. **Partner Images**: 70+ WebP optimized logos in `/public/partenaires/`
5. **Routing**: Next.js App Router with dynamic service pages
6. **State Management**: React hooks for local state
7. **Content Management**: External content source at `/var/www/Digiqo/digiqo-contenu/`

## Design System

### Color Palette (from tailwind.config.js)
```css
Primary (Bordeaux): #8B1431    /* Main brand color */
Accent (Orange): #DA6530       /* CTAs and highlights */
Secondary (Blue): #199CB7      /* Supporting elements */
```

Additional design tokens:
- Gradients: `gradient-digiqo`, `gradient-accent`, `gradient-secondary`
- Shadows: `shadow-digiqo`, `shadow-accent`
- Fonts: Montserrat (display), Inter (body), Lora (serif)
- Animations: `float`, `glow`, `slide-up`, `fade-in`, `pulse-subtle`, `ripple`

## Content & SEO

### External Content
Service descriptions and page content stored in:
- `/var/www/Digiqo/digiqo-contenu/pages/`
- `/var/www/Digiqo/digiqo-contenu/services/`
- Public content: `/public/services-content/`

### SEO Configuration
- Centralized in `lib/seo-config.ts`
- Structured data for LocalBusiness
- Dynamic sitemap generation on build
- Service-specific meta tags

### Service Pages
Available services (dynamic routing):
- `/services/publicite` - Publicité en ligne
- `/services/dev-web` - Développement web
- `/services/community` - Community management
- `/services/seo` - SEO
- `/services/video` - Production vidéo
- `/services/identite` - Identité visuelle
- `/services/audit` - Audit digital
- `/services/sitekeeper` - Maintenance web

## Deployment

**Platform**: Netlify with Next.js plugin
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18
- Auto-deployment from main branch
- Security headers configured in `netlify.toml`

## Development Guidelines

### Code Quality Standards
- **TypeScript**: Strict mode enabled, no unused locals/parameters
- **Linting**: ESLint with max-warnings 0
- **Imports**: Use `@/` path alias for clean imports
- **Components**: Always export through index.ts files
- **Icons**: Use SVG components only, no emoji usage
- **Utilities**: Use `cn()` from `lib/utils.ts` for className merging

### Performance Targets
- Lighthouse score: 95+ (currently targeting improvements)
- Mobile-first responsive design
- WebP images for optimal loading
- Code splitting for heavy components (Three.js)

### Current Development Focus
Based on AMELIORATIONS-RECOMMANDEES.md:
1. **Performance**: Image optimization, bundle size reduction
2. **Accessibility**: WCAG 2.1 AA compliance, ARIA labels
3. **Security**: CSP headers, rate limiting
4. **SEO**: Content enrichment, structured data

## Testing Approach

Currently no test framework implemented. Recommended setup:
- Unit tests: @testing-library/react
- E2E tests: Playwright or Cypress
- Performance monitoring: Lighthouse CI

## Important Notes

1. **No README.md**: All documentation is in CLAUDE.md and other .md files
2. **Premium Quality**: No cheap solutions, sophisticated animations only
3. **Glass Effects**: Use Tailwind's backdrop-blur utilities
4. **3D Integration**: Three.js available but use judiciously for performance
5. **Partner Logos**: Large collection requiring optimization strategy
6. **Content Updates**: Check `/var/www/Digiqo/digiqo-contenu/` for latest content
7. **Sitemap**: Auto-generated on build via `scripts/generate-sitemap.js`