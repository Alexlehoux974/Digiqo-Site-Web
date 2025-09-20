import type { NextApiRequest, NextApiResponse } from 'next';
import { AuditFormData } from '@/src/lib/audit-types';
import { validateFormData } from '@/src/lib/audit-utils';

// Configuration HubSpot
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';
const HUBSPOT_API_URL = 'https://api.hubapi.com';
const RODOLPHE_OWNER_ID = '554004217'; // Owner ID de Rodolphe Le Houx

// Configuration Airtable
const AIRTABLE_API_KEY = process.env.AIRTABLE_PAT || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'; // Site Web Digiqo
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_AUDITS_TABLE_ID || 'tblhL360zjgTecSID'; // Formulaires Audit Digital

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


// Fonction pour générer une référence unique
function generateReference(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `AUD-${year}${month}-${random}`;
}

// Fonction pour mapper les données du formulaire vers HubSpot
function mapFormDataToHubSpot(formData: Partial<AuditFormData>) {
  const companyProperties: any = {
    name: formData.general?.companyName || 'Entreprise inconnue',
    industry: formData.general?.sector,
    city: formData.general?.location,
    website: formData.digitalAssets?.website,
    hubspot_owner_id: RODOLPHE_OWNER_ID, // Attribuer à Rodolphe
    // Propriétés sociales
    facebook_company_page: formData.digitalAssets?.socialMedia?.facebook,
    page_instagram_de_votre_entreprise: formData.digitalAssets?.socialMedia?.instagram,
    linkedin_company_page: formData.digitalAssets?.socialMedia?.linkedin,
    twitterhandle: formData.digitalAssets?.socialMedia?.twitter,
    // Propriétés personnalisées créées
    youtube_channel_url: formData.digitalAssets?.socialMedia?.youtube,
    tiktok_account: formData.digitalAssets?.socialMedia?.tiktok,
    google_business_listing: formData.digitalAssets?.businessListings?.googleBusiness,
    tripadvisor_listing: formData.digitalAssets?.businessListings?.tripadvisor,
    audit_company_age: formData.general?.companyAge,
    audit_business_model: formData.general?.businessModel,
    audit_team_size: formData.general?.teamSize,
    sales_platforms: formData.digitalAssets?.salesPlatforms?.join(', '),
  };

  // Nettoyer les propriétés undefined
  Object.keys(companyProperties).forEach(key => {
    if (companyProperties[key] === undefined || companyProperties[key] === '') {
      delete companyProperties[key];
    }
  });

  const contactProperties: any = {
    firstname: formData.contact?.firstName || '',
    lastname: formData.contact?.lastName || '',
    email: formData.contact?.email || '',
    phone: formData.contact?.phone || '',
    company: formData.general?.companyName,
    website: formData.digitalAssets?.website,
    city: formData.general?.location,
    hubspot_owner_id: RODOLPHE_OWNER_ID, // Attribuer à Rodolphe
  };

  // Nettoyer les propriétés undefined
  Object.keys(contactProperties).forEach(key => {
    if (contactProperties[key] === undefined || contactProperties[key] === '') {
      delete contactProperties[key];
    }
  });

  return { companyProperties, contactProperties };
}

// Fonction pour mapper les données du formulaire vers Airtable
function mapFormDataToAirtable(formData: Partial<AuditFormData>, reference: string) {
  const record: any = {
    fields: {
      // Informations générales
      'Nom Entreprise': formData.general?.companyName || '',
      'Secteur': formData.general?.sector || '',
      'Localisation': formData.general?.location || '',
      'Taille Équipe': formData.general?.teamSize || '',
      'Ancienneté': formData.general?.companyAge || '',
      'Modèle Business': formData.general?.businessModel || '',
      'Référence': reference,
      'Date Audit': new Date().toISOString(),

      // Contact
      'Prénom Contact': formData.contact?.firstName || '',
      'Nom Contact': formData.contact?.lastName || '',
      'Email': formData.contact?.email || '',
      'Téléphone': formData.contact?.phone || '',
      'Canal Préféré': formData.contact?.preferredContact || '',

      // Assets digitaux
      'Site Web': formData.digitalAssets?.website || '',
      'Facebook': formData.digitalAssets?.socialMedia?.facebook || '',
      'Instagram': formData.digitalAssets?.socialMedia?.instagram || '',
      'LinkedIn': formData.digitalAssets?.socialMedia?.linkedin || '',
      'Twitter': formData.digitalAssets?.socialMedia?.twitter || '',
      'TikTok': formData.digitalAssets?.socialMedia?.tiktok || '',
      'YouTube': formData.digitalAssets?.socialMedia?.youtube || '',
      'Google Business': formData.digitalAssets?.businessListings?.googleBusiness || '',
      'Plateformes Vente': formData.digitalAssets?.salesPlatforms?.join(', ') || '',

      // Site web
      'Site Optimisé Mobile': formData.website?.mobileOptimized || false,
      'SEO Optimisé': formData.website?.seoOptimized || false,
      'Performance Site': formData.website?.performance || '',
      'Analytics Installé': formData.website?.analytics || false,

      // Réseaux sociaux - stratégie
      'Plateformes Actives': formData.socialMediaStrategy?.activePlatforms?.join(', ') || '',
      'Fréquence Publication': formData.socialMediaStrategy?.publicationFrequency || '',
      'Heure Publication': formData.socialMediaStrategy?.publicationTime || '',
      'Géré Par': formData.socialMediaStrategy?.managedBy || '',
      'Taille Communauté': formData.socialMediaStrategy?.communitySize || '',
      'Taux Engagement': formData.socialMediaStrategy?.engagement || '',
      'Community Management': formData.socialMediaStrategy?.communityManagement || false,
      'Objectifs Sociaux': formData.socialMediaStrategy?.objectives?.join(', ') || '',
      'Types Contenu': formData.socialMediaStrategy?.contentTypes || '',
      'Outils Sociaux': formData.socialMediaStrategy?.tools || '',

      // Publicité
      'Types Pub': formData.advertising?.types?.join(', ') || '',
      'Plateformes Testées': formData.advertising?.testedPlatforms?.join(', ') || '',
      'Budget Pub': formData.advertising?.budget || '',
      'Budget Moyen': formData.advertising?.averageBudget || '',
      'ROI': formData.advertising?.perceivedResults || '',
      'Objectifs Campagne': formData.advertising?.campaignObjectives?.join(', ') || '',
      'Tracking Pub': formData.advertising?.tracking || false,

      // Contenu
      'A Photos': formData.content?.hasPhotos || false,
      'A Vidéos': formData.content?.hasVideos || false,
      'A Graphiques': formData.content?.hasGraphics || false,
      'Contenu Géré': formData.content?.contentManaged || false,
      'Types Contenu Créés': formData.content?.contentTypes?.join(', ') || '',
      'Moyens Production': formData.content?.productionMeans || '',
      'Consistance Marque': formData.content?.brandConsistency || '',

      // Conversion et données
      'Landing Pages': formData.conversion?.hasLandingPages || false,
      'Formulaires': formData.conversion?.hasForms || false,
      'CTA Optimisés': formData.conversion?.hasCtaButtons || false,
      'Étapes Tunnel': formData.conversion?.funnelStages?.join(', ') || '',
      'Taux Conversion': formData.conversion?.estimatedConversionRate || '',
      'Valeur Moyenne Client': formData.conversion?.averageOrderValue || '',
      'Points Friction': formData.conversion?.frictionPoints || '',
      'E-commerce': formData.conversion?.hasEcommerce || false,
      'Taux Abandon Panier': formData.conversion?.cartAbandonmentRate || '',
      'Ventes Mensuelles': formData.conversion?.monthlySales || '',
      'Outils Tracking': formData.conversion?.trackingTools?.join(', ') || '',
      'Analyse Données': formData.conversion?.dataAnalysis || false,
      'Décisions Data': formData.conversion?.dataDecisions || false,
      'RGPD Conforme': formData.conversion?.gdprCompliant || false,
      'Fréquence Analyse': formData.conversion?.analysisFrequency || '',
      'Tests AB': formData.conversion?.abTesting || false,
      'Heatmaps': formData.conversion?.heatmaps || false,
      'Feedback Utilisateur': formData.conversion?.userFeedback || false,
      'Tracking Lead': formData.conversion?.leadTracking || false,
      'Lead Nurturing': formData.conversion?.leadNurturing || false,

      // CRM
      'A CRM': formData.crm?.hasCRM || false,
      'Type CRM': formData.crm?.crmType || '',
      'Features CRM': formData.crm?.features?.join(', ') || '',
      'Email Marketing': formData.crm?.emailMarketing || false,
      'Automation': formData.crm?.automation || false,
      'Segmentation': formData.crm?.segmentation || false,
      'Intégration CRM': formData.crm?.integration || '',
      'Qualité Data': formData.crm?.dataQuality || 0,
      'Durée CRM': formData.crm?.crmDuration || '',
      'Nombre Contacts': formData.crm?.contactsCount || '',
      'Taille Liste Email': formData.crm?.emailListSize || '',
      'Taux Ouverture': formData.crm?.openRate || '',
      'Taux Clic': formData.crm?.clickRate || '',

      // Réputation
      'Monitoring Réputation': formData.reputation?.monitoring || false,
      'Répond Avis': formData.reputation?.reviewsResponse || false,
      'Note Moyenne': formData.reputation?.averageRating || '',
      'Plateformes Avis': formData.reputation?.reviewPlatforms?.join(', ') || '',

      // Objectifs
      'Objectifs': formData.objectives?.goals?.join(', ') || '',
      'Défis': formData.objectives?.challenges || '',
      'Timeline': formData.objectives?.timeline || '',
      'Budget Global': formData.objectives?.budget || '',

      // Status
      'Status': 'Nouveau'
    }
  };

  return record;
}

// Fonction pour envoyer les données à Airtable
async function sendToAirtable(formData: Partial<AuditFormData>, reference: string): Promise<{ success: boolean; recordId?: string; error?: string }> {
  console.log('sendToAirtable called with reference:', reference);

  if (!AIRTABLE_API_KEY || AIRTABLE_API_KEY === '') {
    console.warn('Airtable API key not configured, skipping Airtable integration');
    return { success: false, error: 'Airtable not configured' };
  }

  try {
    let record;

    try {
      record = mapFormDataToAirtable(formData, reference);
    } catch (mappingError) {
      console.error('Error mapping form data to Airtable format:', mappingError);
      if (mappingError instanceof Error) {
        console.error('Mapping error stack:', mappingError.stack);
      }
      return {
        success: false,
        error: `Mapping error: ${mappingError instanceof Error ? mappingError.message : 'Unknown error'}`
      };
    }

    // Log pour debugging
    console.log('Sending to Airtable:', {
      baseId: AIRTABLE_BASE_ID,
      tableId: AIRTABLE_TABLE_ID,
      hasApiKey: !!AIRTABLE_API_KEY,
      apiKeyLength: AIRTABLE_API_KEY.length,
      recordFieldsCount: Object.keys(record.fields).length,
      url: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`
    });

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record)
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log('Successfully sent to Airtable:', result.id);
      return {
        success: true,
        recordId: result.id
      };
    } else {
      const errorText = await response.text();
      console.error('Airtable API error:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText,
        headers: response.headers,
        url: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`
      });
      return {
        success: false,
        error: `Airtable API error (${response.status}): ${errorText}`
      };
    }
  } catch (error) {
    console.error('Error sending to Airtable:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fonction pour envoyer au webhook n8n quand le contact existe déjà
async function sendContactToN8N(contactData: any): Promise<void> {
  const N8N_WEBHOOK_URL = 'https://n8n.srv763918.hstgr.cloud/webhook/be081ee9-cb98-4f3b-b014-6cf893b4fc28';

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'existing_contact_audit_submission',
        contact: contactData,
        timestamp: new Date().toISOString(),
        source: 'digiqo-audit-form'
      }),
    });
    console.log('Contact existant envoyé au webhook n8n:', contactData);
  } catch (error) {
    console.error('Erreur lors de l\'envoi au webhook n8n:', error);
  }
}

// Fonction pour envoyer les données à HubSpot
async function sendToHubSpot(formData: Partial<AuditFormData>): Promise<{ success: boolean; companyId?: string; contactId?: string; error?: string }> {
  if (!HUBSPOT_ACCESS_TOKEN) {
    console.warn('HubSpot token not configured, skipping HubSpot integration');
    return { success: false, error: 'HubSpot not configured' };
  }

  try {
    const { companyProperties, contactProperties } = mapFormDataToHubSpot(formData);

    // 1. Créer ou mettre à jour l'entreprise
    let companyId: string | undefined;

    try {
      // Rechercher si l'entreprise existe déjà
      if (companyProperties.name) {
        const searchResponse = await fetch(
          `${HUBSPOT_API_URL}/crm/v3/objects/companies/search`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filterGroups: [{
                filters: [{
                  propertyName: 'name',
                  operator: 'EQ',
                  value: companyProperties.name
                }]
              }]
            })
          }
        );

        if (searchResponse.ok) {
          const searchResult = await searchResponse.json();
          if (searchResult.results && searchResult.results.length > 0) {
            // L'entreprise existe, la mettre à jour
            companyId = searchResult.results[0].id;

            await fetch(
              `${HUBSPOT_API_URL}/crm/v3/objects/companies/${companyId}`,
              {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ properties: companyProperties })
              }
            );
          }
        }
      }

      // Si l'entreprise n'existe pas, la créer
      if (!companyId) {
        const createCompanyResponse = await fetch(
          `${HUBSPOT_API_URL}/crm/v3/objects/companies`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ properties: companyProperties })
          }
        );

        if (createCompanyResponse.ok) {
          const company = await createCompanyResponse.json();
          companyId = company.id;
        }
      }
    } catch (companyError) {
      console.error('Error creating/updating company:', companyError);
    }

    // 2. Créer ou mettre à jour le contact
    let contactId: string | undefined;

    if (contactProperties.email) {
      try {
        // Rechercher si le contact existe déjà
        const searchContactResponse = await fetch(
          `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filterGroups: [{
                filters: [{
                  propertyName: 'email',
                  operator: 'EQ',
                  value: contactProperties.email
                }]
              }]
            })
          }
        );

        if (searchContactResponse.ok) {
          const searchResult = await searchContactResponse.json();
          if (searchResult.results && searchResult.results.length > 0) {
            // Le contact existe déjà
            const existingContact = searchResult.results[0];
            contactId = existingContact.id;

            // Envoyer les infos du contact existant au webhook n8n
            await sendContactToN8N({
              id: contactId,
              properties: existingContact.properties,
              formData: formData,
              companyName: formData.general?.companyName
            });

            // Mettre à jour le contact avec les nouvelles propriétés
            await fetch(
              `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`,
              {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ properties: contactProperties })
              }
            );
          } else {
            // Le contact n'existe pas, le créer
            const createContactResponse = await fetch(
              `${HUBSPOT_API_URL}/crm/v3/objects/contacts`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ properties: contactProperties })
              }
            );

            if (createContactResponse.ok) {
              const contact = await createContactResponse.json();
              contactId = contact.id;
            }
          }
        }
      } catch (contactError) {
        console.error('Error creating/updating contact:', contactError);
      }
    }

    // 3. Associer le contact à l'entreprise
    if (companyId && contactId) {
      try {
        await fetch(
          `${HUBSPOT_API_URL}/crm/v4/objects/contacts/${contactId}/associations/companies/${companyId}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([{
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 279 // Contact to Company association
            }])
          }
        );
      } catch (associationError) {
        console.error('Error associating contact to company:', associationError);
      }
    }

    // 4. Créer une note avec les détails de l'audit
    if (companyId || contactId) {
      try {
        const auditDetails = `
Audit Digital - ${new Date().toLocaleDateString('fr-FR')}

🏢 Entreprise: ${formData.general?.companyName || 'Non renseigné'}
📍 Localisation: ${formData.general?.location || 'Non renseigné'}
👥 Taille équipe: ${formData.general?.teamSize || 'Non renseigné'}
📅 Ancienneté: ${formData.general?.companyAge || 'Non renseigné'}
💼 Modèle: ${formData.general?.businessModel || 'Non renseigné'}

📊 Objectifs:
${formData.objectives?.goals?.join(', ') || 'Non renseignés'}

💰 Budget: ${formData.objectives?.budget || 'Non renseigné'}
⏱️ Timeline: ${formData.objectives?.timeline || 'Non renseigné'}

🌐 Site web: ${formData.digitalAssets?.website || 'Non renseigné'}
📱 Réseaux sociaux:
${Object.entries(formData.digitalAssets?.socialMedia || {}).map(([platform, url]) => url ? `- ${platform}: ${url}` : '').filter(Boolean).join('\n') || 'Aucun'}
`;

        const notePayload: any = {
          properties: {
            hs_timestamp: new Date().toISOString(),
            hs_note_body: auditDetails,
          },
          associations: []
        };

        if (companyId) {
          notePayload.associations.push({
            to: { id: companyId },
            types: [{
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 190 // Note to Company
            }]
          });
        }

        if (contactId) {
          notePayload.associations.push({
            to: { id: contactId },
            types: [{
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 194 // Note to Contact
            }]
          });
        }

        await fetch(
          `${HUBSPOT_API_URL}/crm/v3/objects/notes`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(notePayload)
          }
        );
      } catch (noteError) {
        console.error('Error creating note:', noteError);
      }
    }

    return {
      success: true,
      companyId: companyId,
      contactId: contactId
    };
  } catch (error) {
    console.error('Error sending to HubSpot:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
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
    // Log de la requête pour debugging
    console.log('Audit API called:', {
      method: req.method,
      hasBody: !!req.body,
      bodyKeys: req.body ? Object.keys(req.body) : [],
      ip: ipAddress,
      nodeEnv: process.env.NODE_ENV,
      hasHubspotToken: !!HUBSPOT_ACCESS_TOKEN,
      hasAirtableKey: !!AIRTABLE_API_KEY,
      airtableConfig: {
        baseId: AIRTABLE_BASE_ID,
        tableId: AIRTABLE_TABLE_ID
      }
    });

    // Parser et valider les données
    let formData: Partial<AuditFormData>;

    try {
      const requestBody = req.body;
      if (!requestBody || typeof requestBody !== 'object') {
        throw new Error('Invalid request body');
      }

      formData = requestBody.formData;
      if (!formData || typeof formData !== 'object') {
        throw new Error('formData is missing or invalid');
      }
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return res.status(400).json({
        success: false,
        message: 'Format de données invalide. Veuillez réessayer.',
      });
    }

    // Validation basique
    if (!validateFormData(formData)) {
      console.error('Form validation failed:', {
        companyName: !!formData?.general?.companyName,
        email: !!formData?.contact?.email,
        general: !!formData?.general,
        contact: !!formData?.contact
      });
      return res.status(400).json({
        success: false,
        message: 'Données du formulaire invalides. Veuillez vérifier les champs requis.',
      });
    }

    // Générer la référence une fois pour l'utiliser partout
    const reference = generateReference();

    // Envoyer à HubSpot
    const hubspotResult = await sendToHubSpot(formData);

    if (hubspotResult.success) {
      console.log('Successfully sent to HubSpot:', {
        companyId: hubspotResult.companyId,
        contactId: hubspotResult.contactId
      });
    } else {
      console.error('Failed to send to HubSpot:', hubspotResult.error);
    }

    // Envoyer à Airtable (toutes les données du formulaire)
    let airtableResult: { success: boolean; recordId?: string; error?: string } = {
      success: false,
      error: 'Not attempted'
    };

    try {
      airtableResult = await sendToAirtable(formData, reference);

      if (airtableResult.success) {
        console.log('Successfully sent to Airtable:', {
          recordId: airtableResult.recordId,
          reference: reference
        });
      } else {
        console.error('Failed to send to Airtable:', airtableResult.error);
      }
    } catch (airtableError) {
      console.error('Exception while sending to Airtable:', airtableError);
      airtableResult = {
        success: false,
        error: airtableError instanceof Error ? airtableError.message : 'Unknown error'
      };
    }

    // Si au moins un envoi a réussi, considérer comme succès
    if (hubspotResult.success || airtableResult.success) {
      return res.status(200).json({
        success: true,
        message: 'Votre audit a été soumis avec succès. Nous vous contacterons sous 24h.',
        reference: reference,
      });
    } else {
      // Si les deux ont échoué, retourner quand même un succès à l'utilisateur mais logger l'erreur
      console.error('Both HubSpot and Airtable submissions failed');
      return res.status(200).json({
        success: true,
        message: 'Votre audit a été enregistré. Nous vous contacterons sous 48h.',
        reference: reference,
      });
    }

  } catch (error) {
    console.error('Error processing audit submission:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      body: req.body ? 'Body present' : 'No body',
      method: req.method,
      hasHubSpotToken: !!HUBSPOT_ACCESS_TOKEN,
      hasAirtableToken: !!AIRTABLE_API_KEY,
      airtableBaseId: AIRTABLE_BASE_ID,
      airtableTableId: AIRTABLE_TABLE_ID,
    });

    // En production, on retourne quand même un succès pour ne pas bloquer l'utilisateur
    if (process.env.NODE_ENV === 'production') {
      // Sauvegarder au moins les données dans les logs
      console.log('Audit data for manual recovery:', JSON.stringify({
        formData: req.body.formData,
        timestamp: new Date().toISOString()
      }));

      return res.status(200).json({
        success: true,
        message: 'Votre audit a été enregistré. Nous vous contacterons sous 48h.',
        reference: generateReference(),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi de votre audit. Veuillez réessayer.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}