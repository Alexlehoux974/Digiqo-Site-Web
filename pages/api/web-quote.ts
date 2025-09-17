import type { NextApiRequest, NextApiResponse } from 'next';
import { AIRTABLE_CONFIG, transformFormDataToAirtable } from '../../lib/airtable-config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Transformer les données pour Airtable
    const airtableData = transformFormDataToAirtable(formData);

    // Envoyer à Airtable
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

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error('Erreur Airtable:', errorData);
      throw new Error('Erreur lors de l\'enregistrement dans Airtable');
    }

    const record = await airtableResponse.json();
    console.log('Demande de devis enregistrée avec succès:', record.id);

    res.status(200).json({ success: true, recordId: record.id });
  } catch (error) {
    console.error('Erreur lors du traitement du formulaire:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}