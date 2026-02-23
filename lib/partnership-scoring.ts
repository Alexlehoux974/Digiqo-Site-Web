import type { PartnershipFormData } from './partnership-types'

export interface ScoreBreakdown {
  audiencePreuves: number    // 0-30
  calendrierConfirme: number // 0-25
  contrepartiesQuantifiees: number // 0-25
  brandFitRisques: number    // 0-20
  total: number              // 0-100
}

export function computePartnershipScore(data: PartnershipFormData): ScoreBreakdown {
  const breakdown: ScoreBreakdown = {
    audiencePreuves: 0,
    calendrierConfirme: 0,
    contrepartiesQuantifiees: 0,
    brandFitRisques: 0,
    total: 0,
  }

  // --- Audience + preuves (0-30) ---
  const totalFollowers = sumFollowers(data)
  if (totalFollowers >= 100000) breakdown.audiencePreuves += 15
  else if (totalFollowers >= 50000) breakdown.audiencePreuves += 12
  else if (totalFollowers >= 10000) breakdown.audiencePreuves += 9
  else if (totalFollowers >= 5000) breakdown.audiencePreuves += 6
  else if (totalFollowers >= 1000) breakdown.audiencePreuves += 3

  const platformCount = countActivePlatforms(data)
  if (platformCount >= 4) breakdown.audiencePreuves += 5
  else if (platformCount >= 2) breakdown.audiencePreuves += 3

  if (data.capturesInsights.length >= 3) breakdown.audiencePreuves += 10
  else if (data.capturesInsights.length >= 1) breakdown.audiencePreuves += 5

  breakdown.audiencePreuves = Math.min(30, breakdown.audiencePreuves)

  // --- Calendrier confirmé (0-25) ---
  if (data.profileType === 'athlete') {
    const confirmedEvents = data.athEvenements.filter(e => e.statut === 'confirme' && e.nom.trim()).length
    const totalEvents = data.athEvenements.filter(e => e.nom.trim()).length
    if (totalEvents >= 5) breakdown.calendrierConfirme += 10
    else if (totalEvents >= 3) breakdown.calendrierConfirme += 7
    else if (totalEvents >= 1) breakdown.calendrierConfirme += 3

    if (confirmedEvents >= 3) breakdown.calendrierConfirme += 8
    else if (confirmedEvents >= 1) breakdown.calendrierConfirme += 4

    const internationalEvents = data.athEvenements.filter(e => e.niveau === 'international').length
    if (internationalEvents >= 1) breakdown.calendrierConfirme += 7
    else if (data.athEvenements.some(e => e.niveau === 'national')) breakdown.calendrierConfirme += 4
  } else if (data.profileType === 'speaker') {
    const refCount = data.spkReferences.filter(r => r.nomEvenement.trim()).length
    const eventCount = data.spkEvenements.filter(e => e.nom.trim()).length
    if (refCount >= 5) breakdown.calendrierConfirme += 12
    else if (refCount >= 3) breakdown.calendrierConfirme += 8
    else if (refCount >= 1) breakdown.calendrierConfirme += 4

    const confirmedEvents = data.spkEvenements.filter(e => e.statut === 'confirme' && e.nom.trim()).length
    if (confirmedEvents >= 3) breakdown.calendrierConfirme += 8
    else if (confirmedEvents >= 1) breakdown.calendrierConfirme += 4
    if (eventCount >= 3) breakdown.calendrierConfirme += 5
  }
  breakdown.calendrierConfirme = Math.min(25, breakdown.calendrierConfirme)

  // --- Contreparties quantifiées (0-25) ---
  let contrepartiesScore = 0
  if (data.profileType === 'athlete') {
    if (data.athEngagementsPosts) contrepartiesScore += 3
    if (data.athEngagementsReels) contrepartiesScore += 3
    if (data.athEngagementsStories) contrepartiesScore += 2
    if (data.athEngagementsMentions) contrepartiesScore += 2
    if (data.athIdeesContenus.trim().length > 20) contrepartiesScore += 8
    if (data.athIntrosOpportunites === 'oui') contrepartiesScore += 4
    if (data.athSupportsLogo.length >= 3) contrepartiesScore += 3
  } else if (data.profileType === 'speaker') {
    if (data.spkEngagementsPosts) contrepartiesScore += 3
    if (data.spkEngagementsReels) contrepartiesScore += 3
    if (data.spkEngagementsStories) contrepartiesScore += 2
    if (data.spkEngagementsMentions) contrepartiesScore += 2
    if (data.spkIdeesContenus.trim().length > 20) contrepartiesScore += 8
    if (data.spkIntrosOpportunites === 'oui') contrepartiesScore += 4
    if (data.spkEmplacementsPossibles.length >= 3) contrepartiesScore += 3
  }
  breakdown.contrepartiesQuantifiees = Math.min(25, contrepartiesScore)

  // --- Brand fit / risques (0-20) ---
  let brandFit = 0
  if (data.comportementCompatible) brandFit += 5

  const optionalFieldsFilled = [
    data.sitePortfolio,
    data.contactManager,
    data.statsReach,
    data.statsEngagement,
    data.restrictionsIncompatibilites,
  ].filter(f => f && f.trim()).length
  brandFit += Math.min(5, optionalFieldsFilled)

  if (data.exclusiviteDemandee === 'non') brandFit += 5
  else if (data.exclusiviteDemandee === 'oui') brandFit += 1

  if (data.questionFiltre === 'oui') brandFit += 5
  else if (data.questionFiltre === 'ca_depend') brandFit += 3

  breakdown.brandFitRisques = Math.min(20, brandFit)

  // Total
  breakdown.total =
    breakdown.audiencePreuves +
    breakdown.calendrierConfirme +
    breakdown.contrepartiesQuantifiees +
    breakdown.brandFitRisques

  return breakdown
}

function sumFollowers(data: PartnershipFormData): number {
  return [
    data.instagramAbonnes,
    data.tiktokAbonnes,
    data.youtubeAbonnes,
    data.facebookAbonnes,
    data.linkedinAbonnes,
    data.autreReseauAbonnes,
  ].reduce((sum, val) => sum + (parseInt(val) || 0), 0)
}

function countActivePlatforms(data: PartnershipFormData): number {
  return [
    data.instagramUrl,
    data.tiktokUrl,
    data.youtubeUrl,
    data.facebookUrl,
    data.linkedinUrl,
    data.autreReseauUrl,
  ].filter(url => url && url.trim()).length
}
