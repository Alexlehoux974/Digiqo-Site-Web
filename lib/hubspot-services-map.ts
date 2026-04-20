export const HUBSPOT_SERVICES_MAP: Record<string, string> = {
  website: 'Site web',
  shop: 'Shop/Sitekeeper',
  sma: 'SMA',
  sea: 'SEA',
  seo: 'SEO',
  cm: 'Community Management',
  audit: 'Audit',
  visuals: 'Visuels publicitaires',
  branding: 'Branding / Logo / Charte',
  other: 'Autre',
}

export function servicesToHubSpot(services: string[] | undefined | null): string {
  if (!Array.isArray(services) || services.length === 0) return ''
  return services
    .map((s) => HUBSPOT_SERVICES_MAP[s] || s)
    .filter(Boolean)
    .join(';')
}
