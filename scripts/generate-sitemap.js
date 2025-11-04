import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://www.digiqo.fr';
const today = new Date().toISOString().split('T')[0];

// Define all routes with priority and changefreq
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },  // home page
  { path: '/agence', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/audit', priority: '0.8', changefreq: 'weekly' },
  { path: '/devis-web', priority: '0.8', changefreq: 'weekly' },
  { path: '/devis-site-web', priority: '0.8', changefreq: 'weekly' },
  { path: '/recrutement', priority: '0.7', changefreq: 'weekly' },
  { path: '/digiqo-recrute', priority: '0.7', changefreq: 'weekly' },
  { path: '/digicademy', priority: '0.8', changefreq: 'weekly' },
  { path: '/kap-numerik-la-reunion', priority: '0.7', changefreq: 'monthly' },
  { path: '/referencement', priority: '0.7', changefreq: 'monthly' },
  { path: '/mentions-legales', priority: '0.3', changefreq: 'yearly' },
  { path: '/politique-confidentialite', priority: '0.3', changefreq: 'yearly' },
  { path: '/conditions-generales-vente', priority: '0.3', changefreq: 'yearly' },
  { path: '/conditions-generales-utilisation', priority: '0.3', changefreq: 'yearly' },
  { path: '/politique-cookies', priority: '0.3', changefreq: 'yearly' }
];

// Service pages avec les slugs corrects depuis services.ts
const servicePages = [
  { path: '/services/publicite-meta', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/publicite-google', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/sites-web', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/community-management', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/seo', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/creatifs', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/identite-de-marque', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/audit', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/sitekeeper', priority: '0.8', changefreq: 'weekly' }
];

function generateMainSitemap() {
  const allPages = [...staticPages, ...servicePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(page => {
  const url = `${siteUrl}${page.path}`;

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  // Write main sitemap
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✅ Main sitemap generated successfully!');
}

function generateSitemapIndex() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap_index.xml'), sitemapIndex);
  console.log('✅ Sitemap index generated successfully!');
}

function generateBlogSitemap() {
  // Placeholder for blog articles - will be populated from blog-articles.ts
  const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog articles will be dynamically added here -->
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap-blog.xml'), blogSitemap);
  console.log('✅ Blog sitemap generated!');
}

function generateServicesSitemap() {
  const servicesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${servicePages.map(page => `  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap-services.xml'), servicesSitemap);
  console.log('✅ Services sitemap generated!');
}

function generateSitemap() {
  generateMainSitemap();
  generateBlogSitemap();
  generateServicesSitemap();
  generateSitemapIndex();
  console.log('✨ All sitemaps generated successfully!');
}

generateSitemap();