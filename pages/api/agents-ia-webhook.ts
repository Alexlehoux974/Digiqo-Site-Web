import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { nom, email, entreprise, telephone, message } = req.body;

    // Validation basique
    if (!nom || !email || !entreprise || !telephone) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    // Envoi vers le webhook N8N
    const webhookResponse = await fetch(
      'https://n8n.srv763918.hstgr.cloud/webhook/8666dba8-9485-4c71-8a4c-b9293cf073ab',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          email,
          entreprise,
          telephone,
          message,
          source: 'Offre Agents IA',
          date: new Date().toISOString(),
        }),
      }
    );

    if (!webhookResponse.ok) {
      console.error('Webhook error:', await webhookResponse.text());
      return res.status(500).json({ message: 'Erreur lors de l\'envoi au webhook' });
    }

    return res.status(200).json({ message: 'Formulaire envoyé avec succès' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
