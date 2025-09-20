import { AuditFormData, AuditScore } from './audit-types';

export function calculateAuditScore(data: Partial<AuditFormData>): AuditScore {
  const scores = {
    website: calculateWebsiteScore(data),
    socialMedia: calculateSocialMediaScore(data),
    advertising: calculateAdvertisingScore(data),
    content: calculateContentScore(data),
    conversion: calculateConversionScore(data),
    crm: calculateCRMScore(data),
    reputation: calculateReputationScore(data),
  };

  const overall = Math.round(
    Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length
  );

  const strengths = identifyStrengths(scores);
  const improvements = identifyImprovements(scores);
  const recommendations = generateRecommendations(data, scores);

  return {
    overall,
    categories: scores,
    strengths,
    improvements,
    recommendations,
  };
}

function calculateWebsiteScore(data: Partial<AuditFormData>): number {
  if (!data.website) return 0;
  
  let score = 0;
  const w = data.website;
  
  if (w.url) score += 20;
  if (w.mobileOptimized) score += 20;
  if (w.seoOptimized) score += 20;
  if (w.performance === 'excellent' || w.performance === 'good') score += 20;
  if (w.analytics) score += 20;
  
  return score;
}

function calculateSocialMediaScore(data: Partial<AuditFormData>): number {
  if (!data.socialMedia) return 0;
  
  let score = 0;
  const sm = data.socialMedia;
  
  if (sm.platforms && sm.platforms.length > 0) score += 20;
  if (sm.platforms && sm.platforms.length > 2) score += 10;
  if (sm.frequency === 'daily' || sm.frequency === 'weekly') score += 20;
  if (sm.communityManaged) score += 20;
  if (sm.engagement === 'high' || sm.engagement === 'medium') score += 15;
  if (sm.strategy) score += 15;
  
  return Math.min(score, 100);
}

function calculateAdvertisingScore(data: Partial<AuditFormData>): number {
  if (!data.advertising) return 0;
  
  let score = 0;
  const ad = data.advertising;
  
  if (ad.types && ad.types.length > 0) score += 15;
  if (ad.testedPlatforms && ad.testedPlatforms.length > 0) score += 15;
  if (ad.budget && ad.budget !== 'none') score += 20;
  if (ad.roi === 'positive') score += 25;
  if (ad.tracking) score += 25;
  
  return score;
}

function calculateContentScore(data: Partial<AuditFormData>): number {
  if (!data.content) return 0;
  
  let score = 0;
  const c = data.content;
  
  if (c.hasPhotos) score += 25;
  if (c.hasVideos) score += 25;
  if (c.hasGraphics) score += 25;
  if (c.contentManaged) score += 25;
  
  return score;
}

function calculateConversionScore(data: Partial<AuditFormData>): number {
  if (!data.conversion) return 0;
  
  let score = 0;
  const c = data.conversion;
  
  if (c.leadGeneration && c.leadGeneration.length > 0) score += 20;
  if (c.conversionRate && c.conversionRate !== 'unknown') score += 20;
  if (c.salesProcess === 'automated' || c.salesProcess === 'semi-automated') score += 20;
  if (c.crm) score += 15;
  if (c.dataAnalysis) score += 15;
  if (c.abTesting) score += 10;
  
  return score;
}

function calculateCRMScore(data: Partial<AuditFormData>): number {
  if (!data.crm) return 0;
  
  let score = 0;
  const c = data.crm;
  
  if (c.hasCRM) score += 30;
  if (c.emailMarketing) score += 15;
  if (c.automation) score += 20;
  if (c.segmentation) score += 15;
  if (c.integration === 'full' || c.integration === 'partial') score += 10;
  if (c.dataQuality >= 7) score += 10;
  
  return score;
}

function calculateReputationScore(data: Partial<AuditFormData>): number {
  if (!data.reputation) return 0;
  
  let score = 0;
  const r = data.reputation;
  
  if (r.monitoring) score += 25;
  if (r.reviewsResponse) score += 25;
  if (r.averageRating === '4.5+' || r.averageRating === '4.0-4.5') score += 30;
  if (r.reviewPlatforms && r.reviewPlatforms.length > 2) score += 20;
  
  return score;
}

function identifyStrengths(scores: AuditScore['categories']): string[] {
  const strengths: string[] = [];
  
  Object.entries(scores).forEach(([category, score]) => {
    if (score >= 70) {
      strengths.push(getCategoryLabel(category));
    }
  });
  
  return strengths;
}

function identifyImprovements(scores: AuditScore['categories']): string[] {
  const improvements: string[] = [];
  
  Object.entries(scores).forEach(([category, score]) => {
    if (score < 50) {
      improvements.push(getCategoryLabel(category));
    }
  });
  
  return improvements;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    website: 'Site Web',
    socialMedia: 'Réseaux Sociaux',
    advertising: 'Publicité',
    content: 'Contenu',
    conversion: 'Conversion',
    crm: 'CRM',
    reputation: 'Réputation',
  };
  
  return labels[category] || category;
}

function generateRecommendations(
  data: Partial<AuditFormData>,
  scores: AuditScore['categories']
): AuditScore['recommendations'] {
  const recommendations: AuditScore['recommendations'] = [];
  
  // Website recommendations
  if (scores.website < 60) {
    if (!data.website?.mobileOptimized) {
      recommendations.push({
        priority: 'high',
        title: 'Optimisation mobile',
        description: 'Votre site doit être optimisé pour les appareils mobiles',
        impact: 'Amélioration de l\'expérience utilisateur et du référencement',
      });
    }
    
    if (!data.website?.seoOptimized) {
      recommendations.push({
        priority: 'high',
        title: 'Optimisation SEO',
        description: 'Améliorez le référencement naturel de votre site',
        impact: 'Augmentation de la visibilité et du trafic organique',
      });
    }
  }
  
  // Social media recommendations
  if (scores.socialMedia < 50) {
    if (!data.socialMedia?.strategy) {
      recommendations.push({
        priority: 'medium',
        title: 'Stratégie réseaux sociaux',
        description: 'Développez une stratégie cohérente pour vos réseaux sociaux',
        impact: 'Meilleure engagement et conversion des followers',
      });
    }
  }
  
  // CRM recommendations
  if (!data.crm?.hasCRM) {
    recommendations.push({
      priority: 'medium',
      title: 'Mise en place d\'un CRM',
      description: 'Implémentez un système de gestion de la relation client',
      impact: 'Amélioration du suivi client et des ventes',
    });
  }
  
  // Content recommendations
  if (scores.content < 50) {
    if (!data.content?.hasVideos) {
      recommendations.push({
        priority: 'low',
        title: 'Création de contenu vidéo',
        description: 'Intégrez des vidéos pour enrichir votre contenu',
        impact: 'Augmentation de l\'engagement et du temps passé sur le site',
      });
    }
  }
  
  return recommendations.slice(0, 5); // Return top 5 recommendations
}

export function validateFormData(data: Partial<AuditFormData>): boolean {
  // Check if minimum required fields are filled
  if (!data.general?.companyName || !data.contact?.email) {
    return false;
  }
  
  return true;
}

export function getCompletionPercentage(data: Partial<AuditFormData>): number {
  const totalFields = 50; // Approximate total number of fields
  let filledFields = 0;
  
  // Count filled fields in each category
  Object.values(data).forEach((category) => {
    if (category && typeof category === 'object') {
      Object.values(category).forEach((value) => {
        if (value !== undefined && value !== null && value !== '') {
          filledFields++;
        }
      });
    }
  });
  
  return Math.round((filledFields / totalFields) * 100);
}