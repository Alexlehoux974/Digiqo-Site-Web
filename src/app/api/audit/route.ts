import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validation basique
    if (!data.contact?.email || !data.contact?.firstName || !data.contact?.lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format email content
    const emailContent = formatAuditEmail(data);
    
    // TODO: Intégrer avec un service d'email (SendGrid, Mailgun, etc.)
    // Pour l'instant, on simule l'envoi
    console.log('Audit submission:', data);
    console.log('Email content:', emailContent);

    // TODO: Sauvegarder dans une base de données
    // await saveAuditToDatabase(data);

    // TODO: Envoyer un email au client
    // await sendEmail({
    //   to: data.contact.email,
    //   subject: 'Votre audit digital Digiqo',
    //   html: emailContent.client
    // });

    // TODO: Envoyer une notification à l'équipe Digiqo
    // await sendEmail({
    //   to: 'contact@digiqo.fr',
    //   subject: `Nouvel audit: ${data.general?.companyName}`,
    //   html: emailContent.admin
    // });

    return NextResponse.json({
      success: true,
      message: 'Audit submitted successfully',
      score: data.score
    });

  } catch (error) {
    console.error('Error processing audit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function formatAuditEmail(data: any) {
  const { contact, general, score } = data;
  
  const clientEmail = `
    <h2>Bonjour ${contact.firstName},</h2>
    <p>Merci d'avoir complété votre audit digital avec Digiqo.</p>
    <h3>Votre score global: ${score?.overall || 0}%</h3>
    <p>Nous analysons vos réponses et vous recontacterons sous 24-48h avec un rapport détaillé.</p>
    <hr>
    <h4>Résumé de vos scores:</h4>
    <ul>
      <li>Digital: ${score?.categories?.digital || 0}%</li>
      <li>Marketing: ${score?.categories?.marketing || 0}%</li>
      <li>Conversion: ${score?.categories?.conversion || 0}%</li>
      <li>Automatisation: ${score?.categories?.automation || 0}%</li>
      <li>Réputation: ${score?.categories?.reputation || 0}%</li>
    </ul>
    <p>À très bientôt,<br>L'équipe Digiqo</p>
  `;

  const adminEmail = `
    <h2>Nouvel audit digital reçu</h2>
    <h3>Entreprise: ${general?.companyName}</h3>
    <p><strong>Contact:</strong> ${contact.firstName} ${contact.lastName}</p>
    <p><strong>Email:</strong> ${contact.email}</p>
    <p><strong>Téléphone:</strong> ${contact.phone}</p>
    <p><strong>Secteur:</strong> ${general?.sector}</p>
    <p><strong>Score global:</strong> ${score?.overall || 0}%</p>
    <p><strong>Priorité:</strong> ${score?.priority}</p>
    <p><strong>Mode de contact préféré:</strong> ${contact.preferredContact}</p>
    <hr>
    <h4>Scores détaillés:</h4>
    <ul>
      <li>Digital: ${score?.categories?.digital || 0}%</li>
      <li>Marketing: ${score?.categories?.marketing || 0}%</li>
      <li>Conversion: ${score?.categories?.conversion || 0}%</li>
      <li>Automatisation: ${score?.categories?.automation || 0}%</li>
      <li>Réputation: ${score?.categories?.reputation || 0}%</li>
    </ul>
    <h4>Recommandations identifiées:</h4>
    <ol>
      ${score?.recommendations?.map((r: string) => `<li>${r}</li>`).join('') || '<li>Aucune</li>'}
    </ol>
  `;

  return {
    client: clientEmail,
    admin: adminEmail
  };
}