import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = 'https://digiqo.fr';
const today = new Date().toISOString().split('T')[0];

// Define all routes with priority and changefreq
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },  // home page
  { path: '/agence', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/createurs', priority: '0.7', changefreq: 'weekly' },
  { path: '/glossaire', priority: '0.6', changefreq: 'monthly' },
  { path: '/partenariats', priority: '0.6', changefreq: 'monthly' },
  { path: '/apporteur', priority: '0.7', changefreq: 'monthly' },
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
  { path: '/services/publicite-en-ligne', priority: '0.9', changefreq: 'weekly' },
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

// Legacy TS-registered articles (Sprint 2). When a new TS article ships in
// lib/blog-articles.ts, add its slug + lastmod date here. Pipeline-generated
// articles in content/blog/*.md are auto-discovered below.
const TS_LEGACY_BLOG_ARTICLES = [];

function readMdBlogArticles() {
  const contentDir = path.join(__dirname, '../content/blog');
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const fmMatch = raw.match(/^---\n([\s\S]+?)\n---/);
      if (!fmMatch) {
        console.warn(`[sitemap] skipping ${file}: no frontmatter`);
        return null;
      }
      const fm = fmMatch[1];
      const slugLine = fm.match(/^slug:\s*"([^"]+)"/m);
      const dateLine = fm.match(/^dateModified:\s*"([^"]+)"/m);
      if (!slugLine) {
        console.warn(`[sitemap] skipping ${file}: no slug in frontmatter`);
        return null;
      }
      const slug = slugLine[1];
      // ISO timestamp → YYYY-MM-DD
      const lastmod = dateLine ? dateLine[1].slice(0, 10) : today;
      return { slug, lastmod, priority: '0.8' };
    })
    .filter(Boolean);
}

function generateBlogSitemap() {
  const mdArticles = readMdBlogArticles();
  const allArticles = [...TS_LEGACY_BLOG_ARTICLES, ...mdArticles];

  const urlEntries = allArticles.map(article => `  <url>
    <loc>${siteUrl}/blog/${article.slug}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${article.priority}</priority>
  </url>`).join('\n');

  const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap-blog.xml'), blogSitemap);
  console.log(`✅ Blog sitemap generated! (${TS_LEGACY_BLOG_ARTICLES.length} TS legacy + ${mdArticles.length} MD pipeline = ${allArticles.length} articles)`);
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