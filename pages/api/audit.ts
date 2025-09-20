import type { NextApiRequest, NextApiResponse } from 'next';
import { AuditFormData } from '@/src/lib/audit-types';
import { validateFormData } from '@/src/lib/audit-utils';

// Configuration HubSpot
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';
const HUBSPOT_API_URL = 'https://api.hubapi.com';
const RODOLPHE_OWNER_ID = '554004217'; // Owner ID de Rodolphe Le Houx

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
    // Parser et valider les données
    const { formData } = req.body as {
      formData: Partial<AuditFormData>;
    };

    // Validation basique
    if (!validateFormData(formData)) {
      return res.status(400).json({
        success: false,
        message: 'Données du formulaire invalides. Veuillez vérifier les champs requis.',
      });
    }

    // Envoyer à HubSpot
    const hubspotResult = await sendToHubSpot(formData);

    if (hubspotResult.success) {
      console.log('Successfully sent to HubSpot:', {
        companyId: hubspotResult.companyId,
        contactId: hubspotResult.contactId
      });

      // Succès
      return res.status(200).json({
        success: true,
        message: 'Votre audit a été soumis avec succès. Nous vous contacterons sous 24h.',
        reference: generateReference(),
      });
    } else {
      console.error('Failed to send to HubSpot:', hubspotResult.error);

      // Retourner quand même un succès à l'utilisateur mais logger l'erreur
      return res.status(200).json({
        success: true,
        message: 'Votre audit a été enregistré. Nous vous contacterons sous 48h.',
        reference: generateReference(),
      });
    }

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