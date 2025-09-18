import type { NextApiRequest, NextApiResponse } from 'next';

const AIRTABLE_PAT = process.env.AIRTABLE_PAT || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9'; // Base "Site Web Digiqo"
const AIRTABLE_TABLE_ID = 'tblhesc2ozbch8t1o'; // Table "Candidatures Freelances"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fields = req.body;

    console.log('Received fields:', JSON.stringify(fields, null, 2));
    console.log('Using PAT:', AIRTABLE_PAT ? 'Present' : 'Missing');
    console.log('Using Base ID:', AIRTABLE_BASE_ID);
    console.log('Using Table ID:', AIRTABLE_TABLE_ID);

    // Créer l'enregistrement dans Airtable
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
      console.error('Status:', response.status);
      console.error('Headers:', response.headers);
      throw new Error(`Failed to submit to Airtable: ${response.status} - ${errorData}`);
    }

    const result = await response.json();

    return res.status(200).json({
      success: true,
      recordId: result.id
    });
  } catch (error) {
    console.error('Error submitting freelance application:', error);
    return res.status(500).json({
      error: 'Failed to submit application',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}