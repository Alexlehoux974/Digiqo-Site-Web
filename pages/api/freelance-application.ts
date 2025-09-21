import type { NextApiRequest, NextApiResponse } from 'next';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'; // Base "Site Web Digiqo"
const AIRTABLE_TABLE_ID = 'tblhesc2ozbch8t1o'; // Table "Candidatures Freelances"
const N8N_WEBHOOK_URL = 'https://n8n.srv763918.hstgr.cloud/webhook/85917acc-fcad-4d69-b9cd-3efb3f469056';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fields = req.body;
    const errors = [];
    let airtableRecordId = null;

    console.log('Received fields:', JSON.stringify(fields, null, 2));
    console.log('Using PAT:', AIRTABLE_PAT ? 'Present' : 'Missing');
    console.log('Using Base ID:', AIRTABLE_BASE_ID);
    console.log('Using Table ID:', AIRTABLE_TABLE_ID);

    // 1. Créer l'enregistrement dans Airtable
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_PAT}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: fields
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Airtable error:', errorData);
        errors.push(`Airtable: ${response.status} - ${errorData}`);
      } else {
        const result = await response.json();
        airtableRecordId = result.id;
        console.log('Candidature enregistrée dans Airtable:', airtableRecordId);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi à Airtable:', error);
      errors.push('Airtable: ' + (error as Error).message);
    }

    // 2. Envoyer au webhook N8N
    try {
      console.log('Envoi vers webhook N8N:', N8N_WEBHOOK_URL);
      const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source: 'freelance-application',
          airtable_record_id: airtableRecordId,
          form_data: fields,
          timestamp: new Date().toISOString()
        })
      });

      if (!webhookResponse.ok) {
        console.error('Erreur webhook N8N:', webhookResponse.status);
        errors.push(`N8N Webhook: ${webhookResponse.status}`);
      } else {
        console.log('Webhook N8N déclenché avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi au webhook N8N:', error);
      errors.push('N8N Webhook: ' + (error as Error).message);
    }

    // Retourner le succès si au moins un service a fonctionné
    if (airtableRecordId) {
      return res.status(200).json({
        success: true,
        recordId: airtableRecordId,
        warnings: errors.length > 0 ? errors : undefined
      });
    } else {
      return res.status(500).json({
        error: 'Failed to submit application',
        details: errors
      });
    }
  } catch (error) {
    console.error('Error submitting freelance application:', error);
    return res.status(500).json({
      error: 'Failed to submit application',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}