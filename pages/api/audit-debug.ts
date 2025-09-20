import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérification des variables d'environnement
  const config = {
    hasHubspotToken: !!process.env.HUBSPOT_ACCESS_TOKEN,
    hasAirtablePat: !!process.env.AIRTABLE_PAT,
    airtableBaseId: process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9',
    airtableTableId: process.env.AIRTABLE_AUDITS_TABLE_ID || 'tblhL360zjgTecSID',
    nodeEnv: process.env.NODE_ENV,
  };

  // Test de connexion à Airtable
  let airtableTest = { success: false, error: '' };

  if (config.hasAirtablePat) {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${config.airtableBaseId}/tblhL360zjgTecSID?maxRecords=1`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_PAT}`,
          }
        }
      );

      if (response.ok) {
        airtableTest.success = true;
      } else {
        const errorText = await response.text();
        airtableTest.error = `Status: ${response.status}, Error: ${errorText}`;
      }
    } catch (error) {
      airtableTest.error = error instanceof Error ? error.message : 'Unknown error';
    }
  } else {
    airtableTest.error = 'AIRTABLE_PAT not configured';
  }

  // Test de connexion à HubSpot
  let hubspotTest = { success: false, error: '' };

  if (config.hasHubspotToken) {
    try {
      const response = await fetch(
        'https://api.hubapi.com/crm/v3/objects/companies?limit=1',
        {
          headers: {
            'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
          }
        }
      );

      if (response.ok) {
        hubspotTest.success = true;
      } else {
        hubspotTest.error = `Status: ${response.status}`;
      }
    } catch (error) {
      hubspotTest.error = error instanceof Error ? error.message : 'Unknown error';
    }
  } else {
    hubspotTest.error = 'HUBSPOT_ACCESS_TOKEN not configured';
  }

  return res.status(200).json({
    config,
    airtableTest,
    hubspotTest,
    timestamp: new Date().toISOString()
  });
}