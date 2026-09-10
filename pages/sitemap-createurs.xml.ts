import type { GetServerSideProps } from 'next'
import { getCreatorsForPage } from '@/lib/createurs/airtable'
import { ficheUrl } from '@/lib/createurs/fiche'

// ──────────────────────────────────────────────
// SITEMAP DES FICHES CRÉATEURS
//
// Servi par Next plutôt qu'écrit par `scripts/generate-sitemap.js` : publier une
// créatrice, c'est changer un statut dans Airtable, pas déclencher un build.
// Un sitemap figé au dernier build raterait toutes les fiches publiées depuis.
// ──────────────────────────────────────────────

const CACHE_CONTROL = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
const CDN_CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { creators } = await getCreatorsForPage()
  const lastmod = new Date().toISOString().slice(0, 10)

  // Les slugs sont restreints à [a-z0-9._-] en amont : rien à échapper ici.
  const urls = creators
    .map(
      (creator) => `  <url>
    <loc>${ficheUrl(creator.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', CACHE_CONTROL)
  res.setHeader('Netlify-CDN-Cache-Control', CDN_CACHE_CONTROL)
  res.write(xml)
  res.end()

  return { props: {} }
}

// Jamais rendu : `getServerSideProps` a déjà écrit la réponse.
export default function SitemapCreateurs() {
  return null
}
