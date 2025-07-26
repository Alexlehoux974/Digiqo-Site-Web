// Service definitions for static generation
export const services = [
  { slug: 'publicite', name: 'Publicité en ligne' },
  { slug: 'dev-web', name: 'Développement web' },
  { slug: 'community', name: 'Community management' },
  { slug: 'seo', name: 'SEO' },
  { slug: 'video', name: 'Production vidéo' },
  { slug: 'identite', name: 'Identité visuelle' },
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