import type { PartnershipFormData } from './partnership-types'

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[\d\s\-+().]{8,20}$/

export function validateStep(stepId: string, data: PartnershipFormData): ValidationResult {
  switch (stepId) {
    case 'profile': return validateProfile(data)
    case 'identity': return validateIdentity(data)
    case 'social': return validateSocial(data)
    case 'athlete-profile': return validateAthleteProfile(data)
    case 'speaker-profile': return validateSpeakerProfile(data)
    case 'athlete-calendar': return validateAthleteCalendar(data)
    case 'speaker-calendar': return validateSpeakerCalendar(data)
    case 'athlete-visibility': return validateAthleteVisibility(data)
    case 'speaker-visibility': return validateSpeakerVisibility(data)
    case 'budget': return validateBudget(data)
    case 'final': return validateFinal(data)
    default: return { isValid: true, errors: {} }
  }
}

function validateProfile(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (!data.profileType) errors.profileType = 'Veuillez choisir un profil'
  if (!data.partnershipType) errors.partnershipType = 'Veuillez choisir un type de partenariat'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateIdentity(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (!data.prenom.trim()) errors.prenom = 'Prénom requis'
  if (!data.nom.trim()) errors.nom = 'Nom requis'
  if (!data.telephone.trim()) errors.telephone = 'Téléphone requis'
  else if (!phoneRegex.test(data.telephone)) errors.telephone = 'Numéro de téléphone invalide'
  if (!data.email.trim()) errors.email = 'Email requis'
  else if (!emailRegex.test(data.email)) errors.email = 'Adresse email invalide'
  if (!data.villeZone.trim()) errors.villeZone = 'Ville / zone requise'
  if (!data.statut) errors.statut = 'Statut requis'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateSocial(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  const hasAtLeastOneNetwork =
    data.instagramUrl.trim() ||
    data.tiktokUrl.trim() ||
    data.youtubeUrl.trim() ||
    data.facebookUrl.trim() ||
    data.linkedinUrl.trim() ||
    data.autreReseauUrl.trim()
  if (!hasAtLeastOneNetwork) {
    errors.reseaux = 'Au moins un réseau social est requis'
  }
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateAthleteProfile(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (!data.athDiscipline.trim()) errors.athDiscipline = 'Discipline requise'
  if (!data.athNiveau) errors.athNiveau = 'Niveau requis'
  if (!data.athPalmares.trim()) errors.athPalmares = 'Palmarès requis (Top 5 résultats)'
  if (!data.athObjectifs12Mois.trim()) errors.athObjectifs12Mois = 'Objectifs 12 mois requis'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateSpeakerProfile(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (!data.spkType) errors.spkType = 'Type requis'
  if (!data.spkThematiques.trim()) errors.spkThematiques = 'Thématiques requises (3 max)'
  if (!data.spkLangues.trim()) errors.spkLangues = 'Langues parlées requises'
  if (data.spkZoneDeplacement.length === 0) errors.spkZoneDeplacement = 'Zone de déplacement requise'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateAthleteCalendar(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (!data.athNbCompetitions12Mois.trim()) errors.athNbCompetitions12Mois = 'Nombre de compétitions requis'
  const hasValidEvent = data.athEvenements.some(e => e.nom.trim() !== '')
  if (!hasValidEvent) errors.athEvenements = 'Au moins un événement requis'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateSpeakerCalendar(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (!data.spkNbEvenements12Mois.trim()) errors.spkNbEvenements12Mois = "Nombre d'événements requis"
  const hasValidRef = data.spkReferences.some(r => r.nomEvenement.trim() !== '')
  if (!hasValidRef) errors.spkReferences = 'Au moins une référence requise'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateAthleteVisibility(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (data.athSupportsLogo.length === 0) errors.athSupportsLogo = 'Au moins un support requis'
  if (!data.athFournitTenue) errors.athFournitTenue = 'Veuillez indiquer qui fournit la tenue'
  if (!data.athOkLogoMinEvents) errors.athOkLogoMinEvents = 'Réponse requise'
  if (!data.athIdeesContenus.trim()) errors.athIdeesContenus = '3 idées de contenus requises'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateSpeakerVisibility(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (data.spkEmplacementsPossibles.length === 0) errors.spkEmplacementsPossibles = 'Au moins un emplacement requis'
  if (!data.spkMentionOraleDigiqo) errors.spkMentionOraleDigiqo = 'Réponse requise'
  if (!data.spkNegocierEmplacements) errors.spkNegocierEmplacements = 'Réponse requise'
  if (!data.spkIdeesContenus.trim()) errors.spkIdeesContenus = '3 idées de contenus requises'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateBudget(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  const hasBudget = data.budgetParMois.trim() || data.budgetParEvenement.trim() || data.budgetParSaison.trim()
  if (!hasBudget) errors.budget = 'Au moins un budget requis (mois, événement ou saison)'
  if (!data.dureeSouhaitee) errors.dureeSouhaitee = 'Durée souhaitée requise'
  if (!data.autresSponsors.trim()) errors.autresSponsors = 'Information sur les autres sponsors requise'
  if (!data.exclusiviteDemandee) errors.exclusiviteDemandee = 'Réponse requise'
  if (!data.reutilisationContenus) errors.reutilisationContenus = 'Réponse requise'
  if (!data.dureeAutorisation) errors.dureeAutorisation = "Durée d'autorisation requise"
  if (!data.comportementCompatible) errors.comportementCompatible = 'Cette case doit être cochée'
  return { isValid: Object.keys(errors).length === 0, errors }
}

function validateFinal(data: PartnershipFormData): ValidationResult {
  const errors: Record<string, string> = {}
  if (!data.questionFiltre) errors.questionFiltre = 'Réponse requise'
  return { isValid: Object.keys(errors).length === 0, errors }
}
