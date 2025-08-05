import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://www.digiqo.fr';

// Define all routes
const staticPages = [
  '',  // home page
  '/contact',
  '/mentions-legales',
  '/politique-confidentialite',
  '/conditions-generales-vente',
  '/conditions-generales-utilisation',
  '/politique-cookies',
  '/agence',
  '/recrutement',
  '/formations-digicademy',
  '/kap-numerik-la-reunion',
  '/referencement'
];

const servicePages = [
  '/services/publicite',
  '/services/dev-web',
  '/services/community',
  '/services/seo',
  '/services/video',
  '/services/identite',
  '/services/audit',
  '/services/sitekeeper'
];

function generateSitemap() {
  const allPages = [...staticPages, ...servicePages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
  const url = `${siteUrl}${page}`;
  const priority = page === '' ? '1.0' : page.startsWith('/services') ? '0.8' : '0.5';
  const changefreq = page === '' ? 'daily' : page.startsWith('/services') ? 'weekly' : 'monthly';
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  // Write sitemap to public directory
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();