import { CREATORS } from './data'
import { collectNiches } from './helpers'

// ──────────────────────────────────────────────
// DEMANDE DE CRÉATEUR — contrat partagé entre le formulaire (client),
// la page /createurs/demande et l'API route.
//
// Les valeurs ci-dessous sont EXACTEMENT les noms d'options de la table
// Airtable « Demandes créateurs » (tbldTuyAdjtaxN8l9) : aucune table de
// correspondance à maintenir, et `typecast` n'a jamais à créer d'option.
// ──────────────────────────────────────────────

export const SECTEURS = [
  'Restauration',
  'Commerce',
  'Beauté / bien-être',
  'Tourisme / hébergement',
  'Immobilier',
  'Services',
  'E-commerce',
  'Autre',
] as const

export const OBJECTIFS = [
  'Notoriété',
  'Ventes / promo',
  'Lancement produit ou lieu',
  'Contenus UGC pour mes publicités',
  'Événement',
] as const

export const TYPES_CONTENU = [
  'UGC vidéo',
  'Reels / TikTok',
  'Photos',
  'Stories',
  'Live',
  'Je ne sais pas encore',
] as const

export const DIFFUSIONS = [
  'Compte du créateur',
  'Mes comptes',
  'Publicités Meta / TikTok',
  'Site web',
] as const

export const FORMATS_COLLABORATION = ['Ponctuelle', 'Régulière', 'Je ne sais pas encore'] as const

export const VOLUMES = ['1-2 contenus', '3-5', '6-10', 'Plus de 10'] as const

export const BUDGETS = ['< 300 €', '300-800 €', '800-2 000 €', '> 2 000 €', 'À définir ensemble'] as const

export const ECHEANCES = ['Cette semaine', 'Sous 1 mois', 'Sous 3 mois', 'Pas de date'] as const

export const CRITERE_ZONES = ['Nord', 'Sud', 'Est', 'Ouest', "Toute l'île"] as const

export const TAILLES_AUDIENCE = ['< 1K', '1K-10K', '10K-50K', '> 50K', 'Peu importe'] as const

// Synonymes de niche : la page en porte plusieurs pour une même réalité.
// On ne propose et ne stocke qu'une valeur, celle qui existe dans Airtable.
const NICHE_ALIASES: Record<string, string> = {
  'Curly hair': 'Cheveux bouclés',
}

/** « Curly hair » → « Cheveux bouclés ». Toute autre valeur est rendue telle quelle. */
export const canonicalNiche = (niche: string): string => NICHE_ALIASES[niche] ?? niche

/** Canonicalise puis dédoublonne, en conservant l'ordre alphabétique français. */
export const canonicalNiches = (niches: string[]): string[] =>
  Array.from(new Set(niches.map(canonicalNiche))).sort((a, b) => a.localeCompare(b, 'fr'))

// Niches proposées comme critère : celles réellement portées par les créateurs
// affichés sur la page, pour rester aligné avec les chips de filtre.
// En PR 4 la source deviendra Airtable : la liste suivra automatiquement.
export const CRITERE_NICHES = canonicalNiches(collectNiches(CREATORS.filter((c) => !c.pending)))

export const BRIEF_MAX_LENGTH = 800
export const MAX_PRESELECTED = 20

export type Secteur = (typeof SECTEURS)[number]
export type Objectif = (typeof OBJECTIFS)[number]
export type FormatCollaboration = (typeof FORMATS_COLLABORATION)[number]
export type Budget = (typeof BUDGETS)[number]
export type Echeance = (typeof ECHEANCES)[number]

export interface CreatorRequestPayload {
  entreprise: string
  secteur: string
  contact: string
  email: string
  telephone: string
  siteEntreprise: string
  handles: string[]
  objectif: string
  typesContenu: string[]
  diffusion: string[]
  formatCollaboration: string
  volume: string
  budget: string
  echeance: string
  criteresNiches: string[]
  criteresZones: string[]
  tailleAudience: string
  brief: string
  consentement: boolean
  /** Honeypot : rempli uniquement par un robot. */
  website?: string
}

export const EMPTY_REQUEST: CreatorRequestPayload = {
  entreprise: '',
  secteur: '',
  contact: '',
  email: '',
  telephone: '',
  siteEntreprise: '',
  handles: [],
  objectif: '',
  typesContenu: [],
  diffusion: [],
  formatCollaboration: '',
  volume: '',
  budget: '',
  echeance: '',
  criteresNiches: [],
  criteresZones: [],
  tailleAudience: '',
  brief: '',
  consentement: false,
  website: '',
}

// ──────────────────────────────────────────────
// HANDLES — `?createurs=@a,@b`
// Normalisés en minuscules, sans « @ », restreints à [a-z0-9._-] : une valeur
// exotique est ignorée plutôt que propagée jusqu'à Airtable.
// ──────────────────────────────────────────────

const HANDLE_RE = /^[a-z0-9._-]{1,60}$/

export const normalizeHandle = (raw: string): string | null => {
  const cleaned = raw.trim().replace(/^@+/, '').toLowerCase()
  return HANDLE_RE.test(cleaned) ? cleaned : null
}

/** "@a, @b, @a" → ["@a", "@b"] · valeur absente ou invalide → [] */
export const parseHandlesParam = (value: string | string[] | undefined | null): string[] => {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw) return []
  const seen = new Set<string>()
  for (const part of raw.split(',')) {
    const handle = normalizeHandle(part)
    if (handle) seen.add(handle)
    if (seen.size >= MAX_PRESELECTED) break
  }
  return Array.from(seen, (h) => `@${h}`)
}

/** URL canonique du formulaire. Les handles validés n'ont pas besoin d'encodage. */
export const demandeHref = (handles: string[] = []): string => {
  const clean = handles.map((h) => normalizeHandle(h)).filter((h): h is string => h !== null)
  return clean.length ? `/createurs/demande?createurs=${clean.map((h) => `@${h}`).join(',')}` : '/createurs/demande'
}

export const DEMANDE_PATHNAME = '/createurs/demande'

// ──────────────────────────────────────────────
// VALIDATION — partagée client / serveur.
// Renvoie la liste des messages d'erreur ; vide = payload valide.
// ──────────────────────────────────────────────

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_DIGITS = /\d/g

const isIn = (value: string, allowed: readonly string[]): boolean => allowed.includes(value)

const allIn = (values: unknown, allowed: readonly string[]): values is string[] =>
  Array.isArray(values) && values.every((v) => typeof v === 'string' && allowed.includes(v))

export const validateStep1 = (d: CreatorRequestPayload): string[] => {
  const errors: string[] = []
  if (!d.entreprise.trim()) errors.push("Le nom de l'entreprise est requis.")
  if (d.entreprise.trim().length > 120) errors.push("Le nom de l'entreprise est trop long.")
  if (!isIn(d.secteur, SECTEURS)) errors.push("Le secteur d'activité est requis.")
  if (!d.contact.trim()) errors.push('Le nom du contact est requis.')
  if (d.contact.trim().length > 120) errors.push('Le nom du contact est trop long.')
  if (!EMAIL_REGEX.test(d.email.trim())) errors.push('Un email professionnel valide est requis.')
  if ((d.telephone.match(PHONE_DIGITS) || []).length < 8) errors.push('Un numéro de téléphone valide est requis.')
  if (d.siteEntreprise.trim().length > 200) errors.push('Le site / Instagram est trop long.')
  return errors
}

export const validateStep2 = (d: CreatorRequestPayload): string[] => {
  const errors: string[] = []
  if (!isIn(d.objectif, OBJECTIFS)) errors.push("L'objectif principal est requis.")
  if (!allIn(d.typesContenu, TYPES_CONTENU) || d.typesContenu.length === 0)
    errors.push('Sélectionnez au moins un type de contenu.')
  if (!allIn(d.diffusion, DIFFUSIONS) || d.diffusion.length === 0)
    errors.push('Sélectionnez au moins un canal de diffusion.')
  if (!isIn(d.formatCollaboration, FORMATS_COLLABORATION)) errors.push('Le format de collaboration est requis.')
  if (!isIn(d.budget, BUDGETS)) errors.push('Le budget indicatif est requis.')
  if (!isIn(d.echeance, ECHEANCES)) errors.push("L'échéance est requise.")
  if (d.volume && !isIn(d.volume, VOLUMES)) errors.push('Volume estimé invalide.')
  if (d.tailleAudience && !isIn(d.tailleAudience, TAILLES_AUDIENCE)) errors.push("Taille d'audience invalide.")
  if (!allIn(d.criteresNiches, CRITERE_NICHES)) errors.push('Critère de niche invalide.')
  if (!allIn(d.criteresZones, CRITERE_ZONES)) errors.push('Critère de zone invalide.')
  if (d.brief.length > BRIEF_MAX_LENGTH) errors.push(`Le brief est limité à ${BRIEF_MAX_LENGTH} caractères.`)
  return errors
}

export const validateStep3 = (d: CreatorRequestPayload): string[] =>
  d.consentement === true ? [] : ['Votre accord est nécessaire pour que Digiqo vous recontacte.']

export const validateRequest = (d: CreatorRequestPayload): string[] => [
  ...validateStep1(d),
  ...validateStep2(d),
  ...validateStep3(d),
]

export const STEP_VALIDATORS = [validateStep1, validateStep2, validateStep3] as const

export const STEP_TITLES = ['Votre entreprise', 'Votre besoin', 'Envoi'] as const
