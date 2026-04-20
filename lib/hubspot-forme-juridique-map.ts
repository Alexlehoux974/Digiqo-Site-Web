const FORME_JURIDIQUE_MAP: Record<string, string> = {
  'EI': 'EI / Micro-entreprise',
  'Micro-entreprise': 'EI / Micro-entreprise',
  'EURL': 'EURL / SARL',
  'SARL': 'EURL / SARL',
  'SAS': 'SASU / SAS',
  'SASU': 'SASU / SAS',
  'SA': 'SA',
  'SCI': 'SCI',
  'Association': 'Association loi 1901',
}

export function formeJuridiqueToHubSpot(value: string | undefined | null): string {
  if (!value) return ''
  return FORME_JURIDIQUE_MAP[value] || ''
}
