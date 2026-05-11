/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  turbopack: {},
  experimental: {
    // Inlines critical above-the-fold CSS in <head> via Beasties, defers the
    // rest. Eliminates the render-blocking CSS waterfall on first paint —
    // measurable LCP/FCP win on mobile 3G. Beasties is the maintained fork
    // of Critters; Next picks it up automatically when this flag is on.
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digiqo.fr',
      },
      {
        protocol: 'https',
        hostname: '*.airtableusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: process.env.NODE_ENV === 'development',
  },
  async redirects() {
    return [
      {
        source: '/services/publicite-reseaux-sociaux',
        destination: '/services/publicite-en-ligne',
        permanent: true,
      },
      {
        source: '/services/publicite-google',
        destination: '/services/publicite-en-ligne',
        permanent: true,
      },
      {
        source: '/services/publicite-meta',
        destination: '/services/publicite-en-ligne',
        permanent: true,
      },
      {
        source: '/services/publicite-tiktok',
        destination: '/services/publicite-en-ligne',
        permanent: true,
      },
      {
        source: '/devis-site-web',
        destination: '/devis-web',
        permanent: true,
      },
      {
        // Stale legacy URL still indexed by Google as a 404. Redirect to the
        // service it used to live under; the #faq fragment is cosmetic and
        // is preserved to the browser by Next.js.
        source: '/accueil-digiqo/faq',
        destination: '/services/publicite-en-ligne#faq',
        permanent: true,
      },
      // ─── Sprint 2 (mai 2026) — 6 anciens articles blog supprimés ─────────
      // Le contenu blog a été refait sur le nouveau template (branche
      // seo-geo-rattrapage-s2). Ces 6 slugs n'existent plus dans
      // lib/blog-articles.ts. Le 301 vers /blog signale à Google « article
      // supprimé, voir la liste blog » plutôt que de servir un 404 brut.
      {
        source: '/blog/tiktok-marketing-reunion-strategie-entreprise-2025',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/seo-referencement-naturel-reunion-guide-complet',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/community-management-reunion-strategies-2025',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/optimiser-google-ads-reunion-2025',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/developpement-web-reunion-guide-2025',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/identite-visuelle-reunion-guide-complet-2025',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/production-video-reunion-impact-2025',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

export default nextConfig