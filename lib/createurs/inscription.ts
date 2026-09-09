// ──────────────────────────────────────────────
// INSCRIPTION CRÉATEUR — contrat partagé entre le formulaire (client),
// la page /createurs/inscription et l'API route.
//
// Les valeurs ci-dessous sont EXACTEMENT les noms d'options de la table
// Airtable « Créateurs de contenu » (tblBGZ8bj26D4hd02), relevés via
// GET /v0/meta/bases/{baseId}/tables. L'écriture se fait sans `typecast` :
// une valeur inconnue doit échouer en 400 plutôt que créer une option.
// ──────────────────────────────────────────────

export const NICHES = [
  'Lifestyle',
  'Famille',
  'Mode',
  'Beauté',
  'Food / Restauration',
  'Voyage / Tourisme',
  'Bien-être',
  'Sport',
  'Tech',
  'Business / Entrepreneuriat',
  'Événementiel',
  'Autre',
] as const

export const TYPES_CONTENU = [
  'UGC',
  'Reels / TikTok',
  'Vidéo longue',
  'Photo',
  'Face cam',
  'Micro-trottoir',
  'Vlog',
  'Montage vidéo',
  'Rédaction',
  'Visuels / Graphisme',
] as const

export const COLLABORATIONS = ['Ponctuelle', 'Régulière', 'Les deux'] as const

export const BIO_MAX_LENGTH = 300
export const PHOTO_MAX_BYTES = 5 * 1024 * 1024
export const PHOTO_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
/** `accept` de l'input fichier — image/jpg est toléré par certains navigateurs. */
export const PHOTO_ACCEPT = '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp'

export const INSCRIPTION_PATHNAME = '/createurs/inscription'

export type Niche = (typeof NICHES)[number]
export type TypeContenu = (typeof TYPES_CONTENU)[number]
export type Collaboration = (typeof COLLABORATIONS)[number]

/** Photo transportée en base64 (sans préfixe `data:`), telle que l'attend Airtable. */
export interface PhotoPayload {
  filename: string
  contentType: string
  /** Base64 brut du fichier. */
  data: string
}

export interface CreatorApplicationPayload {
  prenom: string
  nom: string
  email: string
  telephone: string
  ville: string
  zone: string
  instagram: string
  abonnesInstagram: string
  tauxInstagram: string
  tiktok: string
  abonnesTiktok: string
  tauxTiktok: string
  youtube: string
  facebook: string
  autresReseaux: string
  niches: string[]
  typesContenu: string[]
  bio: string
  portfolio: string
  tarifs: string
  disponibilites: string
  collaboration: string
  photo: PhotoPayload | null
  consentement: boolean
  /** Honeypot : rempli uniquement par un robot. */
  website?: string
}

export const EMPTY_APPLICATION: CreatorApplicationPayload = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  ville: '',
  zone: '',
  instagram: '',
  abonnesInstagram: '',
  tauxInstagram: '',
  tiktok: '',
  abonnesTiktok: '',
  tauxTiktok: '',
  youtube: '',
  facebook: '',
  autresReseaux: '',
  niches: [],
  typesContenu: [],
  bio: '',
  portfolio: '',
  tarifs: '',
  disponibilites: '',
  collaboration: '',
  photo: null,
  consentement: false,
  website: '',
}

// ──────────────────────────────────────────────
// NORMALISATION DES SAISIES NUMÉRIQUES
// « 12 400 », « 12.4k », « 3,25 % » : on accepte ce que les créateurs recopient
// depuis leurs statistiques plutôt que d'imposer un format.
// ──────────────────────────────────────────────

/** « 12 400 » → 12400 · « 12,4k » → 12400 · saisie vide ou illisible → null */
export const parseFollowers = (raw: string): number | null => {
  const cleaned = raw.trim().toLowerCase().replace(/\s| /g, '').replace(',', '.')
  if (!cleaned) return null
  const match = cleaned.match(/^(\d+(?:\.\d+)?)([km])?$/)
  if (!match) return null
  const value = Number(match[1]) * (match[2] === 'k' ? 1e3 : match[2] === 'm' ? 1e6 : 1)
  return Number.isFinite(value) && value >= 0 && value <= 1e9 ? Math.round(value) : null
}

/**
 * « 3,25 » ou « 3,25 % » → 0.0325 (Airtable stocke les pourcents en fraction).
 * Saisie vide → null ; hors [0, 100] → null.
 */
export const parseRate = (raw: string): number | null => {
  const cleaned = raw.trim().replace('%', '').replace(',', '.').trim()
  if (!cleaned) return null
  const value = Number(cleaned)
  if (!Number.isFinite(value) || value < 0 || value > 100) return null
  // 4 décimales : 3,25 % → 0.0325 sans traîne de flottant.
  return Math.round((value / 100) * 1e6) / 1e6
}

// ──────────────────────────────────────────────
// VALIDATION — partagée client / serveur.
// Renvoie la liste des messages d'erreur ; vide = payload valide.
// ──────────────────────────────────────────────

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_DIGITS = /\d/g

const isIn = (value: string, allowed: readonly string[]): boolean => allowed.includes(value)

const allIn = (values: unknown, allowed: readonly string[]): values is string[] =>
  Array.isArray(values) && values.every((v) => typeof v === 'string' && allowed.includes(v))

/** URL http(s) seulement : `javascript:` et consorts n'ont rien à faire dans Airtable. */
export const isHttpUrl = (raw: string): boolean => {
  try {
    const url = new URL(raw.trim())
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.')
  } catch {
    return false
  }
}

/**
 * URL http(s) dont l'hôte est l'un des domaines attendus (ou un sous-domaine).
 * Sert à refuser une URL Instagram collée dans le champ YouTube.
 */
export const isUrlOnDomain = (raw: string, domains: readonly string[]): boolean => {
  if (!isHttpUrl(raw)) return false
  try {
    const host = new URL(raw.trim()).hostname.toLowerCase().replace(/^www\./, '')
    return domains.some((d) => host === d || host.endsWith(`.${d}`))
  } catch {
    return false
  }
}

export const YOUTUBE_DOMAINS = ['youtube.com', 'youtu.be'] as const
export const FACEBOOK_DOMAINS = ['facebook.com', 'fb.com'] as const

/** Longueur maximale des URLs de réseau, alignée sur la troncature côté API. */
export const SOCIAL_URL_MAX_LENGTH = 300

export const validateStep1 = (d: CreatorApplicationPayload): string[] => {
  const errors: string[] = []
  if (!d.prenom.trim()) errors.push('Ton prénom est requis.')
  if (d.prenom.trim().length > 80) errors.push('Ton prénom est trop long.')
  if (!d.nom.trim()) errors.push('Ton nom complet est requis.')
  if (d.nom.trim().length > 120) errors.push('Ton nom complet est trop long.')
  if (!EMAIL_REGEX.test(d.email.trim())) errors.push('Un email valide est requis.')
  if (d.email.trim().length > 200) errors.push('Ton email est trop long.')
  // Téléphone facultatif, mais s'il est renseigné il doit ressembler à un numéro.
  if (d.telephone.trim() && (d.telephone.match(PHONE_DIGITS) || []).length < 8)
    errors.push('Le numéro de téléphone semble incomplet.')
  if (!d.ville.trim()) errors.push('Ta ville est requise.')
  if (d.ville.trim().length > 80) errors.push('Ta ville est trop longue.')
  if (!d.zone.trim()) errors.push("Ta zone d'intervention est requise.")
  if (d.zone.trim().length > 120) errors.push("Ta zone d'intervention est trop longue.")
  return errors
}

export const validateStep2 = (d: CreatorApplicationPayload): string[] => {
  const errors: string[] = []
  const hasInstagram = d.instagram.trim().length > 0
  const hasTiktok = d.tiktok.trim().length > 0

  if (!hasInstagram && !hasTiktok) errors.push('Renseigne au moins un compte, Instagram ou TikTok.')
  if (hasInstagram && !isHttpUrl(d.instagram)) errors.push("L'URL Instagram n'est pas valide (https://…).")
  if (hasTiktok && !isHttpUrl(d.tiktok)) errors.push("L'URL TikTok n'est pas valide (https://…).")
  if (hasInstagram && parseFollowers(d.abonnesInstagram) === null)
    errors.push('Indique ton nombre d’abonnés Instagram.')
  if (hasTiktok && parseFollowers(d.abonnesTiktok) === null) errors.push('Indique ton nombre d’abonnés TikTok.')
  // Taux facultatifs : seule une saisie présente mais illisible est signalée.
  if (d.tauxInstagram.trim() && parseRate(d.tauxInstagram) === null)
    errors.push("Le taux d'engagement Instagram doit être un pourcentage entre 0 et 100.")
  if (d.tauxTiktok.trim() && parseRate(d.tauxTiktok) === null)
    errors.push("Le taux d'engagement TikTok doit être un pourcentage entre 0 et 100.")
  // YouTube et Facebook sont facultatifs et ne comptent pas comme compte
  // principal : seule une saisie présente mais invalide est signalée.
  if (d.youtube.trim()) {
    if (d.youtube.trim().length > SOCIAL_URL_MAX_LENGTH) errors.push("L'URL YouTube est trop longue.")
    else if (!isUrlOnDomain(d.youtube, YOUTUBE_DOMAINS))
      errors.push("L'URL YouTube n'est pas valide (https://www.youtube.com/…).")
  }
  if (d.facebook.trim()) {
    if (d.facebook.trim().length > SOCIAL_URL_MAX_LENGTH) errors.push("L'URL Facebook est trop longue.")
    else if (!isUrlOnDomain(d.facebook, FACEBOOK_DOMAINS))
      errors.push("L'URL Facebook n'est pas valide (https://www.facebook.com/…).")
  }
  if (d.autresReseaux.trim().length > 200) errors.push('« Autres réseaux » est trop long.')
  return errors
}

export const validateStep3 = (d: CreatorApplicationPayload): string[] => {
  const errors: string[] = []
  if (d.niches.length === 0) errors.push('Choisis au moins une niche.')
  if (!allIn(d.niches, NICHES)) errors.push('Niche invalide.')
  if (d.typesContenu.length === 0) errors.push('Choisis au moins un type de contenu.')
  if (!allIn(d.typesContenu, TYPES_CONTENU)) errors.push('Type de contenu invalide.')
  if (!d.bio.trim()) errors.push('Une bio courte est requise.')
  if (d.bio.length > BIO_MAX_LENGTH) errors.push(`Ta bio est limitée à ${BIO_MAX_LENGTH} caractères.`)
  if (d.portfolio.trim() && !isHttpUrl(d.portfolio)) errors.push("L'URL du portfolio n'est pas valide (https://…).")
  if (d.tarifs.trim().length > 200) errors.push('Tes tarifs indicatifs sont trop longs.')
  if (d.disponibilites.trim().length > 500) errors.push('Tes disponibilités sont trop longues.')
  if (d.collaboration.trim() && !isIn(d.collaboration, COLLABORATIONS))
    errors.push('Type de collaboration invalide.')
  return errors
}

export const validateStep4 = (d: CreatorApplicationPayload): string[] => {
  const errors: string[] = []
  if (!d.photo) errors.push('Une photo de profil est requise.')
  else {
    if (!isIn(d.photo.contentType, PHOTO_MIME_TYPES)) errors.push('La photo doit être un JPG, un PNG ou un WEBP.')
    // Le base64 pèse ~4/3 du binaire : on borne la taille réelle décodée.
    if (Math.floor((d.photo.data.length * 3) / 4) > PHOTO_MAX_BYTES)
      errors.push('La photo ne doit pas dépasser 5 Mo.')
  }
  if (!d.consentement) errors.push('Ton accord est nécessaire pour publier ton profil.')
  return errors
}

export const validateApplication = (d: CreatorApplicationPayload): string[] => [
  ...validateStep1(d),
  ...validateStep2(d),
  ...validateStep3(d),
  ...validateStep4(d),
]

export const STEP_VALIDATORS = [validateStep1, validateStep2, validateStep3, validateStep4] as const

export const STEP_TITLES = ['Toi', 'Tes réseaux', 'Ton profil', 'Photo & accord'] as const
