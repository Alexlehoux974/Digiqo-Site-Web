import type { NextApiRequest, NextApiResponse } from 'next';
import { AIRTABLE_CONFIG, transformFormDataToAirtable } from '../../lib/airtable-config';
import { checkRateLimit } from '../../lib/rate-limit';
import { submitDigiqoForm } from '../../lib/hubspot-forms-api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  if (!checkRateLimit(req, res)) return;

  try {
    const formData = req.body;

    // Input validation
    const contactEmail = formData.contact?.email;
    if (!contactEmail || !EMAIL_REGEX.test(contactEmail)) {
      return res.status(400).json({ error: 'Un email de contact valide est requis.' });
    }

    const errors = [];
    let airtableRecordId = null;
    let hubspotSuccess = false;

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

    // 2. Soumettre à HubSpot Forms API
    try {
      hubspotSuccess = await submitDigiqoForm({
        source: 'devis-web',
        email: contactEmail,
        firstName: formData.contact?.firstName,
        lastName: formData.contact?.lastName,
        phone: formData.contact?.phone,
        company: formData.project?.companyName,
        companyType: formData.companyType || formData.project?.companyType,
        services: formData.project?.services,
        description: formData.project?.description,
        consent: formData.consent === true,
        pageUri: 'https://digiqo.fr/devis-site-web',
        pageName: 'Digiqo - Devis Web',
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi à HubSpot:', error);
      errors.push('HubSpot: ' + (error as Error).message);
    }

    // 3. Conserver le POST webhook n8n (fail-safe silencieux si URL vide)
    if (process.env.N8N_WEBQUOTE_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_WEBQUOTE_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET || '',
          },
          body: JSON.stringify({
            source: 'web-quote-form',
            email: { to: 'devis@digiqo.fr' },
            form_data: formData,
            timestamp: new Date().toISOString(),
          })
        });
      } catch (e) {
        // silent fail
      }
    }

    // Retourner le succès si au moins un service a fonctionné
    if (airtableRecordId || hubspotSuccess) {
      res.status(200).json({
        success: true,
        airtableRecordId,
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
