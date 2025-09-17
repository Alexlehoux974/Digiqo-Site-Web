import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Test direct Airtable
  const testData = {
    "Company Name": "Test API Direct",
    "Sector": "Test Secteur",
    "Project Description": "Test depuis API Next.js",
    "Existing Site": "no",
    "Website Type": "vitrine",
    "Pages Count": "2-5",
    "Contact Form": true,
    "First Name": "API",
    "Last Name": "Test",
    "Email": "api@test.com",
    "Phone": "0692111111"
  };

  try {
    const apiKey = process.env.AIRTABLE_PAT || process.env.AIRTABLE_API_KEY;
    console.log('Using API Key:', apiKey ? 'Found' : 'Not found');

    const response = await fetch(
      'https://api.airtable.com/v0/appH46IBnNdYNrwZ9/tbl0UR3X7TPAe7IDW',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: testData
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Airtable error:', data);
      return res.status(response.status).json({ error: data });
    }

    console.log('Success:', data.id);
    res.status(200).json({ success: true, id: data.id, data });
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}