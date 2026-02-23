export type ProfileType = 'athlete' | 'speaker'
export type PartnershipType = 'sponsoring' | 'visibilite' | 'mixte'

export interface FileAttachment {
  name: string
  type: string
  size: number
  base64: string
}

// ATH2 - A10: Événements à venir (Athlète)
export interface AthleteEventEntry {
  id: string
  nom: string
  dates: string
  lieu: string
  niveau: 'local' | 'national' | 'international' | ''
  statut: 'confirme' | 'en_attente' | 'objectif' | ''
  lienOfficiel: string
  audienceEstimee: string
}

// SPK2 - S7: Top références (Speaker)
export interface SpeakerReferenceEntry {
  id: string
  nomEvenement: string
  date: string
  lieu: string
  role: string
  audienceEstimee: string
  lienPreuve: string
}

// SPK2 - S8: Événements à venir (Speaker)
export interface SpeakerEventEntry {
  id: string
  nom: string
  dates: string
  lieu: string
  statut: 'confirme' | 'en_attente' | 'objectif' | ''
  audienceEstimee: string
  lienOfficiel: string
}

export interface PartnershipFormData {
  // Étape 1 : Profil & Type
  profileType: ProfileType | ''
  partnershipType: PartnershipType | ''

  // Étape 2 : Identité & Contact (Section A)
  prenom: string
  nom: string
  telephone: string
  email: string
  villeZone: string
  statut: 'particulier' | 'auto-entrepreneur' | 'association' | 'societe' | ''
  siret: string
  sitePortfolio: string
  contactManager: string

  // Étape 3 : Réseaux sociaux & audience (Section B)
  instagramUrl: string
  instagramAbonnes: string
  tiktokUrl: string
  tiktokAbonnes: string
  youtubeUrl: string
  youtubeAbonnes: string
  facebookUrl: string
  facebookAbonnes: string
  linkedinUrl: string
  linkedinAbonnes: string
  autreReseauUrl: string
  autreReseauAbonnes: string
  statsReach: string
  statsImpressions: string
  statsVuesVideo: string
  statsEngagement: string
  statsLocalisationAudience: string
  capturesInsights: FileAttachment[]

  // Étape 4a : Profil sportif (ATH1)
  athDiscipline: string
  athCategorie: 'homme' | 'femme' | 'mixte' | 'junior' | ''
  athNiveau: 'departemental' | 'regional' | 'national' | 'international' | ''
  athClassementRanking: string
  athLienPreuveClassement: string
  athClubStructure: string
  athPalmares: string
  athObjectifs12Mois: string
  athVolumeEntrainement: string

  // Étape 4b : Profil speaker (SPK1)
  spkType: 'animateur' | 'maitre_ceremonie' | 'speaker_sportif' | 'interviews' | 'village' | 'autre' | ''
  spkThematiques: string
  spkLangues: string
  spkMateriel: 'autonome' | 'besoin_regie' | 'ca_depend' | ''
  spkZoneDeplacement: string[]

  // Étape 5a : Calendrier athlète (ATH2)
  athNbCompetitions12Mois: string
  athEvenements: AthleteEventEntry[]
  athMedias: 'oui' | 'non' | ''
  athMediasDetails: string
  athOrganiseStages: 'oui' | 'non' | ''
  athStagesDetails: string
  athStagesFrequentation: string

  // Étape 5b : Références speaker (SPK2)
  spkNbEvenements12Mois: string
  spkReferences: SpeakerReferenceEntry[]
  spkEvenements: SpeakerEventEntry[]
  spkContratsConfirmes: 'oui' | 'non' | ''
  spkContratsDetails: string

  // Étape 6a : Visibilité + Contreparties athlète (ATH3 + ATH4)
  athSupportsLogo: string[]
  athEmplacementsTailles: string
  athFournitTenue: 'athlete' | 'digiqo' | 'organisateur' | ''
  athOkLogoMinEvents: 'oui' | 'non' | ''
  athNbEventsMinLogo: string
  athEngagementsPosts: string
  athEngagementsReels: string
  athEngagementsStories: string
  athEngagementsMentions: string
  athEngagementsLienBio: 'oui' | 'non' | ''
  athEngagementsPresenceEvent: string
  athIdeesContenus: string
  athIntrosOpportunites: 'oui' | 'non' | ''
  athIntrosEstimation: string

  // Étape 6b : Visibilité + Contreparties speaker (SPK3 + SPK4)
  spkEmplacementsPossibles: string[]
  spkMentionOraleDigiqo: 'oui' | 'non' | 'a_valider_orga' | ''
  spkFrequenceMentions: string
  spkNegocierEmplacements: 'oui' | 'non' | ''
  spkEngagementsPosts: string
  spkEngagementsReels: string
  spkEngagementsStories: string
  spkEngagementsMentions: string
  spkEngagementsLienBio: 'oui' | 'non' | ''
  spkEngagementsCoulissesEvent: string
  spkIdeesContenus: string
  spkIntrosOpportunites: 'oui' | 'non' | ''
  spkIntrosEstimation: string

  // Étape 7 : Budget (C) + Reporting (D) + Droits (E)
  budgetParMois: string
  budgetParEvenement: string
  budgetParSaison: string
  dureeSouhaitee: '3' | '6' | '12' | ''
  autresSponsors: string
  autresSponsorsSecteurs: string
  exclusiviteDemandee: 'oui' | 'non' | ''
  exclusiviteDetails: string
  reportingMensuel: 'oui' | 'non' | ''
  liensTrackes: 'oui' | 'non' | ''
  reutilisationContenus: 'organique' | 'organique_ads' | 'non' | ''
  dureeAutorisation: '3' | '6' | '12' | '24' | ''
  restrictionsIncompatibilites: string
  comportementCompatible: boolean

  // Étape 8 : Question filtre (F) + Uploads
  questionFiltre: 'oui' | 'non' | 'ca_depend' | ''
  questionFiltreDetails: string

  // Uploads ATH5
  athMediaKit: FileAttachment[]
  athPhotosHD: FileAttachment[]

  // Uploads SPK5
  spkShowreelUrl: string
  spkShowreelFile: FileAttachment[]
  spkPhotosEvenement: FileAttachment[]
  spkPlaquetteDossier: FileAttachment[]

  // Anti-spam
  honeypot: string
}

export const initialFormData: PartnershipFormData = {
  profileType: '',
  partnershipType: '',
  prenom: '',
  nom: '',
  telephone: '',
  email: '',
  villeZone: '',
  statut: '',
  siret: '',
  sitePortfolio: '',
  contactManager: '',
  instagramUrl: '',
  instagramAbonnes: '',
  tiktokUrl: '',
  tiktokAbonnes: '',
  youtubeUrl: '',
  youtubeAbonnes: '',
  facebookUrl: '',
  facebookAbonnes: '',
  linkedinUrl: '',
  linkedinAbonnes: '',
  autreReseauUrl: '',
  autreReseauAbonnes: '',
  statsReach: '',
  statsImpressions: '',
  statsVuesVideo: '',
  statsEngagement: '',
  statsLocalisationAudience: '',
  capturesInsights: [],
  athDiscipline: 'Beach Tennis',
  athCategorie: '',
  athNiveau: '',
  athClassementRanking: '',
  athLienPreuveClassement: '',
  athClubStructure: '',
  athPalmares: '',
  athObjectifs12Mois: '',
  athVolumeEntrainement: '',
  spkType: '',
  spkThematiques: '',
  spkLangues: '',
  spkMateriel: '',
  spkZoneDeplacement: [],
  athNbCompetitions12Mois: '',
  athEvenements: [{ id: '1', nom: '', dates: '', lieu: '', niveau: '', statut: '', lienOfficiel: '', audienceEstimee: '' }],
  athMedias: '',
  athMediasDetails: '',
  athOrganiseStages: '',
  athStagesDetails: '',
  athStagesFrequentation: '',
  spkNbEvenements12Mois: '',
  spkReferences: [{ id: '1', nomEvenement: '', date: '', lieu: '', role: '', audienceEstimee: '', lienPreuve: '' }],
  spkEvenements: [{ id: '1', nom: '', dates: '', lieu: '', statut: '', audienceEstimee: '', lienOfficiel: '' }],
  spkContratsConfirmes: '',
  spkContratsDetails: '',
  athSupportsLogo: [],
  athEmplacementsTailles: '',
  athFournitTenue: '',
  athOkLogoMinEvents: '',
  athNbEventsMinLogo: '',
  athEngagementsPosts: '',
  athEngagementsReels: '',
  athEngagementsStories: '',
  athEngagementsMentions: '',
  athEngagementsLienBio: '',
  athEngagementsPresenceEvent: '',
  athIdeesContenus: '',
  athIntrosOpportunites: '',
  athIntrosEstimation: '',
  spkEmplacementsPossibles: [],
  spkMentionOraleDigiqo: '',
  spkFrequenceMentions: '',
  spkNegocierEmplacements: '',
  spkEngagementsPosts: '',
  spkEngagementsReels: '',
  spkEngagementsStories: '',
  spkEngagementsMentions: '',
  spkEngagementsLienBio: '',
  spkEngagementsCoulissesEvent: '',
  spkIdeesContenus: '',
  spkIntrosOpportunites: '',
  spkIntrosEstimation: '',
  budgetParMois: '',
  budgetParEvenement: '',
  budgetParSaison: '',
  dureeSouhaitee: '',
  autresSponsors: '',
  autresSponsorsSecteurs: '',
  exclusiviteDemandee: '',
  exclusiviteDetails: '',
  reportingMensuel: '',
  liensTrackes: '',
  reutilisationContenus: '',
  dureeAutorisation: '',
  restrictionsIncompatibilites: '',
  comportementCompatible: false,
  questionFiltre: '',
  questionFiltreDetails: '',
  athMediaKit: [],
  athPhotosHD: [],
  spkShowreelUrl: '',
  spkShowreelFile: [],
  spkPhotosEvenement: [],
  spkPlaquetteDossier: [],
  honeypot: '',
}

export interface StepProps {
  formData: PartnershipFormData
  updateFormData: (partial: Partial<PartnershipFormData>) => void
  errors: Record<string, string>
}
