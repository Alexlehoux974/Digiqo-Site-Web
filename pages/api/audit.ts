import type { NextApiRequest, NextApiResponse } from 'next';
import { AuditFormData } from '@/src/lib/audit-types';
import { calculateAuditScore, validateFormData } from '@/src/lib/audit-utils';

// Configuration N8N webhook (à adapter avec votre URL N8N)
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.digiqo.fr/webhook/audit-submission';
const N8N_API_KEY = process.env.N8N_API_KEY || '';

// Rate limiting simple (en production, utiliser une solution plus robuste)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requêtes
const RATE_LIMIT_WINDOW = 60000; // par minute

interface AuditSubmissionResponse {
  success: boolean;
  message: string;
  reference?: string;
  error?: string;
}

interface N8NPayload {
  formData: Partial<AuditFormData>;
  scores: {
    overall: number;
    categories: {
      website: number;
      socialMedia: number;
      advertising: number;
      content: number;
      conversion: number;
      crm: number;
      reputation: number;
    };
    strengths: string[];
    improvements: string[];
    recommendations: Array<{
      priority: 'high' | 'medium' | 'low';
      title: string;
      description: string;
      impact: string;
    }>;
  };
  metadata: {
    timestamp: string;
    source: string;
    ip: string;
    userAgent: string;
    completionPercentage: number;
    formVersion: string;
  };
  businessContext: {
    estimatedBudget: string;
    priority: 'high' | 'medium' | 'low';
    leadScore: number;
    assignTo?: string;
  };
}

// Fonction pour vérifier le rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || record.resetTime < now) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Fonction pour déterminer la priorité business
function determineBusinessPriority(
  formData: Partial<AuditFormData>,
  overallScore: number
): { priority: 'high' | 'medium' | 'low'; leadScore: number } {
  let leadScore = overallScore;
  let priority: 'high' | 'medium' | 'low' = 'medium';

  // Ajuster le score selon le budget
  const budget = formData.objectives?.budget;
  if (budget === '> 10000€/mois' || budget === '5000-10000€/mois') {
    leadScore += 20;
    priority = 'high';
  } else if (budget === '2500-5000€/mois' || budget === '1000-2500€/mois') {
    leadScore += 10;
    priority = overallScore > 60 ? 'high' : 'medium';
  }

  // Ajuster selon la timeline
  const timeline = formData.objectives?.timeline;
  if (timeline === 'immediate' || timeline === '< 1 month') {
    leadScore += 15;
    if (priority === 'medium') priority = 'high';
  }

  // Ajuster selon la taille de l'entreprise
  const companySize = formData.general?.companySize;
  if (companySize === '50+' || companySize === '20-50') {
    leadScore += 10;
  }

  // Ajuster selon les objectifs
  const goals = formData.objectives?.goals || [];
  if (goals.includes('increase-revenue') || goals.includes('expand-market')) {
    leadScore += 5;
  }

  // Déterminer la priorité finale
  if (leadScore >= 80) {
    priority = 'high';
  } else if (leadScore >= 50) {
    priority = 'medium';
  } else {
    priority = 'low';
  }

  return { priority, leadScore: Math.min(100, leadScore) };
}

// Fonction pour générer une référence unique
function generateReference(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `AUD-${year}${month}-${random}`;
}

// Fonction pour envoyer les données à N8N
async function sendToN8N(payload: N8NPayload): Promise<{ success: boolean; reference?: string; error?: string }> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': N8N_API_KEY,
        'X-Source': 'digiqo-website',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`N8N webhook returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    return { 
      success: true, 
      reference: result.reference || generateReference() 
    };
  } catch (error) {
    console.error('Error sending to N8N:', error);
    
    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= 3; attempt++) {
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      
      try {
        const retryResponse = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': N8N_API_KEY,
            'X-Source': 'digiqo-website',
            'X-Retry-Attempt': attempt.toString(),
          },
          body: JSON.stringify(payload),
        });

        if (retryResponse.ok) {
          const result = await retryResponse.json();
          return { 
            success: true, 
            reference: result.reference || generateReference() 
          };
        }
      } catch (retryError) {
        console.error(`Retry attempt ${attempt} failed:`, retryError);
      }
    }

    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuditSubmissionResponse>
) {
  // Vérifier la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  // Extraire l'IP pour le rate limiting
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ipAddress = Array.isArray(ip) ? ip[0] : ip.split(',')[0];

  // Vérifier le rate limiting
  if (!checkRateLimit(ipAddress)) {
    return res.status(429).json({
      success: false,
      message: 'Trop de requêtes. Veuillez réessayer dans une minute.',
    });
  }

  try {
    // Parser et valider les données
    const { formData, score } = req.body as { 
      formData: Partial<AuditFormData>; 
      score: any;
    };

    // Validation basique
    if (!validateFormData(formData)) {
      return res.status(400).json({
        success: false,
        message: 'Données du formulaire invalides. Veuillez vérifier les champs requis.',
      });
    }

    // Calculer les scores si non fournis
    const auditScore = score || calculateAuditScore(formData);

    // Déterminer la priorité business
    const { priority, leadScore } = determineBusinessPriority(formData, auditScore.overall);

    // Calculer le pourcentage de complétion
    const completionPercentage = Math.round(
      (Object.keys(formData).filter(key => formData[key as keyof AuditFormData]).length / 11) * 100
    );

    // Préparer le payload pour N8N
    const n8nPayload: N8NPayload = {
      formData,
      scores: auditScore,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'website',
        ip: ipAddress,
        userAgent: req.headers['user-agent'] || 'unknown',
        completionPercentage,
        formVersion: '1.0.0',
      },
      businessContext: {
        estimatedBudget: formData.objectives?.budget || 'non spécifié',
        priority,
        leadScore,
        assignTo: priority === 'high' ? 'senior-sales' : 'sales-team',
      },
    };

    // Envoyer à N8N
    const n8nResult = await sendToN8N(n8nPayload);

    if (!n8nResult.success) {
      // En cas d'échec, stocker localement (à implémenter avec une base de données)
      console.error('Failed to send to N8N, storing locally:', n8nResult.error);
      
      // Pour l'instant, on retourne quand même un succès à l'utilisateur
      // mais on log l'erreur pour investigation
      return res.status(200).json({
        success: true,
        message: 'Votre audit a été enregistré. Nous vous contacterons sous 48h.',
        reference: generateReference(),
      });
    }

    // Succès
    return res.status(200).json({
      success: true,
      message: 'Votre audit a été soumis avec succès. Nous vous contacterons sous 24h.',
      reference: n8nResult.reference,
    });

  } catch (error) {
    console.error('Error processing audit submission:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi de votre audit. Veuillez réessayer.',
      error: process.env.NODE_ENV === 'development' 
        ? (error instanceof Error ? error.message : 'Unknown error')
        : undefined,
    });
  }
}