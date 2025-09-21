import type { NextApiRequest, NextApiResponse } from 'next';
import { AIRTABLE_CONFIG, transformFormDataToAirtable } from '../../lib/airtable-config';

// Configuration HubSpot
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';
const HUBSPOT_API_URL = 'https://api.hubapi.com';
const ROMAIN_OWNER_ID = '30244580'; // Romain Cano
const N8N_WEBHOOK_URL = 'https://n8n.srv763918.hstgr.cloud/webhook/9848ecf9-764d-4ccd-90c4-6d91c16eeba9';

async function createOrUpdateHubSpotLead(formData: any) {
  const email = formData.contact?.email;
  if (!email) {
    console.error('Email manquant pour créer le lead HubSpot');
    return null;
  }

  console.log('Recherche HubSpot pour l\'email:', email);

  try {
    // Rechercher si le contact existe déjà
    const searchBody = {
      filterGroups: [{
        filters: [{
          propertyName: 'email',
          operator: 'EQ',
          value: email.toLowerCase().trim()
        }]
      }]
    };

    console.log('Corps de la recherche HubSpot:', JSON.stringify(searchBody));

    const searchResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchBody)
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Erreur lors de la recherche HubSpot:', searchResponse.status, errorText);
      return null;
    }

    const searchData = await searchResponse.json();
    console.log('Résultat de recherche HubSpot:', searchData);
    console.log('Nombre de contacts trouvés:', searchData.total);
    let contactId = null;

    // Préparer les propriétés du contact (propriétés standard HubSpot uniquement)
    const contactProperties = {
      email: email,
      firstname: formData.contact?.firstName || '',
      lastname: formData.contact?.lastName || '',
      phone: formData.contact?.phone || '',
      company: formData.project?.companyName || '',
      hubspot_owner_id: ROMAIN_OWNER_ID
    };

    if (searchData.total > 0) {
      // Le contact existe, on le met à jour
      contactId = searchData.results[0].id;
      await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: contactProperties })
      });
      console.log('Contact HubSpot mis à jour:', contactId);

      // Déclencher le webhook N8N uniquement pour les contacts existants
      console.log('Tentative de déclenchement du webhook N8N vers:', N8N_WEBHOOK_URL);
      try {
        const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            source: 'web-quote-form',
            hubspot_contact_id: contactId,
            form_data: formData,
            timestamp: new Date().toISOString(),
            is_existing_contact: true
          })
        });
        console.log('Statut de la réponse webhook:', webhookResponse.status);
        const webhookText = await webhookResponse.text();
        console.log('Réponse webhook:', webhookText);
        console.log('Webhook N8N déclenché pour contact existant avec succès');
      } catch (webhookError) {
        console.error('Erreur lors du déclenchement du webhook N8N:', webhookError);
      }
    } else {
      // Le contact n'existe pas, on le crée
      const createResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties: contactProperties })
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error('Erreur lors de la création du contact HubSpot:', createResponse.status, errorText);
        return null;
      }

      const createData = await createResponse.json();
      contactId = createData.id;
      console.log('Nouveau contact HubSpot créé:', contactId);
    }

    return contactId;
  } catch (error) {
    console.error('Erreur HubSpot:', error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const errors = [];
    let airtableRecordId = null;
    let hubspotContactId = null;

    // 1. Envoyer à Airtable (conservé comme avant)
    try {
      const airtableData = transformFormDataToAirtable(formData);
      const airtableResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${AIRTABLE_CONFIG.tableId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: airtableData
          })
        }
      );

      if (airtableResponse.ok) {
        const record = await airtableResponse.json();
        airtableRecordId = record.id;
        console.log('Demande de devis enregistrée dans Airtable:', airtableRecordId);
      } else {
        const errorData = await airtableResponse.json();
        console.error('Erreur Airtable:', errorData);
        errors.push('Airtable: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi à Airtable:', error);
      errors.push('Airtable: ' + (error as Error).message);
    }

    // 2. Créer/mettre à jour le lead HubSpot et déclencher le webhook N8N
    console.log('Token HubSpot présent:', !!HUBSPOT_ACCESS_TOKEN);
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
        hubspotContactId = await createOrUpdateHubSpotLead(formData);
      } catch (error) {
        console.error('Erreur lors de l\'envoi à HubSpot:', error);
        errors.push('HubSpot: ' + (error as Error).message);
      }
    } else {
      console.log('Pas de token HubSpot configuré, intégration HubSpot ignorée');
    }

    // Retourner le succès si au moins un service a fonctionné
    if (airtableRecordId || hubspotContactId) {
      res.status(200).json({
        success: true,
        airtableRecordId,
        hubspotContactId,
        warnings: errors.length > 0 ? errors : undefined
      });
    } else {
      res.status(500).json({
        error: 'Erreur lors de l\'enregistrement',
        details: errors
      });
    }
  } catch (error) {
    console.error('Erreur lors du traitement du formulaire:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}