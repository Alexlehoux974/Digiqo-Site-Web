import { AuditFormData, AuditScore } from './audit-types';

export function calculateAuditScore(data: AuditFormData): AuditScore {
  let digitalScore = 0;
  let marketingScore = 0;
  let conversionScore = 0;
  let automationScore = 0;
  let reputationScore = 0;

  // Digital Score (Website + Digital Assets)
  if (data.website?.hasWebsite) {
    digitalScore += 20;
    if (data.website.perceivedQuality) {
      const avgQuality = (
        (data.website.perceivedQuality.ux || 0) +
        (data.website.perceivedQuality.mobile || 0) +
        (data.website.perceivedQuality.speed || 0) +
        (data.website.perceivedQuality.design || 0)
      ) / 4;
      digitalScore += avgQuality * 5;
    }
    if (data.website.seo?.optimized) digitalScore += 15;
    if (data.website.tools?.analytics) digitalScore += 10;
    if (data.website.tools?.tagManager) digitalScore += 5;
  }

  // Marketing Score (Social Media + Advertising + Content)
  if (data.socialMediaStrategy?.activePlatforms?.length) {
    marketingScore += data.socialMediaStrategy.activePlatforms.length * 5;
  }
  if (data.advertising?.testedPlatforms?.length) {
    marketingScore += data.advertising.testedPlatforms.length * 8;
  }
  if (data.advertising?.tracking) marketingScore += 15;
  if (data.content?.contentTypes?.length) {
    marketingScore += data.content.contentTypes.length * 4;
  }
  marketingScore += (data.content?.brandConsistency || 0) * 3;

  // Conversion Score
  if (data.conversion?.hasLandingPages) conversionScore += 20;
  if (data.conversion?.hasForms) conversionScore += 20;
  if (data.conversion?.hasCtaButtons) conversionScore += 15;
  if (data.conversion?.leadTracking) conversionScore += 25;
  if (data.conversion?.leadNurturing) conversionScore += 20;

  // Automation Score (CRM)
  if (data.crm?.toolsUsed?.length) {
    automationScore += data.crm.toolsUsed.length * 15;
  }
  if (data.crm?.prospectTracking) automationScore += 20;
  if (data.crm?.customerTracking) automationScore += 20;
  if (data.crm?.automations?.length) {
    automationScore += data.crm.automations.length * 10;
  }

  // Reputation Score
  const reviewCount = parseInt(data.reputation?.reviewCount || '0');
  if (reviewCount > 0) {
    reputationScore += Math.min(reviewCount / 10, 30);
  }
  if (data.reputation?.reviewManagement) reputationScore += 20;
  if (data.reputation?.reviewResponse) reputationScore += 20;
  if (data.reputation?.testimonials) reputationScore += 15;
  if (data.reputation?.caseStudies) reputationScore += 15;

  // Normalize scores to 0-100
  digitalScore = Math.min(100, digitalScore);
  marketingScore = Math.min(100, marketingScore);
  conversionScore = Math.min(100, conversionScore);
  automationScore = Math.min(100, automationScore);
  reputationScore = Math.min(100, reputationScore);

  // Calculate overall score
  const overallScore = Math.round(
    (digitalScore * 0.25) +
    (marketingScore * 0.25) +
    (conversionScore * 0.2) +
    (automationScore * 0.15) +
    (reputationScore * 0.15)
  );

  // Generate recommendations
  const recommendations = generateRecommendations(data, {
    digital: digitalScore,
    marketing: marketingScore,
    conversion: conversionScore,
    automation: automationScore,
    reputation: reputationScore
  });

  // Determine priority
  let priority: AuditScore['priority'] = 'low';
  if (overallScore < 30) priority = 'critical';
  else if (overallScore < 50) priority = 'high';
  else if (overallScore < 70) priority = 'medium';

  // Add urgency based on user input
  if (data.objectives?.urgencyLevel && data.objectives.urgencyLevel >= 8) {
    if (priority === 'low') priority = 'medium';
    if (priority === 'medium') priority = 'high';
  }

  return {
    overall: overallScore,
    categories: {
      digital: Math.round(digitalScore),
      marketing: Math.round(marketingScore),
      conversion: Math.round(conversionScore),
      automation: Math.round(automationScore),
      reputation: Math.round(reputationScore)
    },
    recommendations,
    priority
  };
}

function generateRecommendations(
  data: AuditFormData,
  scores: Record<string, number>
): string[] {
  const recommendations: string[] = [];

  // Digital recommendations
  if (!data.website?.hasWebsite) {
    recommendations.push("Créer un site web professionnel pour établir votre présence digitale");
  } else if (scores.digital < 50) {
    recommendations.push("Améliorer l'expérience utilisateur et la performance de votre site web");
  }

  if (!data.website?.seo?.optimized) {
    recommendations.push("Optimiser votre site pour le référencement naturel (SEO)");
  }

  if (!data.website?.tools?.analytics) {
    recommendations.push("Installer Google Analytics pour suivre vos performances");
  }

  // Marketing recommendations
  if (scores.marketing < 40) {
    recommendations.push("Développer une stratégie de contenu et de réseaux sociaux");
  }

  if (!data.advertising?.tracking) {
    recommendations.push("Mettre en place un système de tracking pour vos campagnes publicitaires");
  }

  // Conversion recommendations
  if (!data.conversion?.hasLandingPages) {
    recommendations.push("Créer des landing pages optimisées pour la conversion");
  }

  if (!data.conversion?.leadTracking) {
    recommendations.push("Implémenter un système de suivi des leads");
  }

  // Automation recommendations
  if (!data.crm?.toolsUsed?.length) {
    recommendations.push("Adopter un CRM pour gérer vos prospects et clients");
  }

  if (!data.crm?.automations?.length) {
    recommendations.push("Automatiser vos processus marketing et commerciaux");
  }

  // Reputation recommendations
  if (scores.reputation < 30) {
    recommendations.push("Développer une stratégie de gestion de la e-réputation");
  }

  if (!data.reputation?.reviewResponse) {
    recommendations.push("Répondre systématiquement aux avis clients");
  }

  return recommendations.slice(0, 5); // Return top 5 recommendations
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}