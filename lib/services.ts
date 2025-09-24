// Service definitions for static generation
export const services = [
  { slug: 'publicite-meta', name: 'Publicité META' },
  { slug: 'publicite-google', name: 'Publicité Google' },
  { slug: 'publicite-snapchat', name: 'Publicité Snapchat' },
  { slug: 'publicite-tiktok', name: 'Publicité TikTok' },
  { slug: 'sites-web', name: 'Site-web, Ecommerce, Plateforme' },
  { slug: 'community-management', name: 'Community management' },
  { slug: 'seo', name: 'SEO' },
  { slug: 'creatifs', name: 'Production vidéo' },
  { slug: 'identite-de-marque', name: 'Identité visuelle' },
  { slug: 'audit', name: 'Audit digital' },
  { slug: 'sitekeeper', name: 'Sitekeeper' }
] as const;

export type ServiceSlug = typeof services[number]['slug'];

export function getServiceBySlug(slug: string) {
  return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs() {
  return services.map(service => service.slug);
}