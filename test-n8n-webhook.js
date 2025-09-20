#!/usr/bin/env node

/**
 * Script de test pour le webhook n8n
 * Simule l'envoi de données d'un contact existant depuis le formulaire d'audit
 */

const N8N_WEBHOOK_URL = 'https://n8n.srv763918.hstgr.cloud/webhook/be081ee9-cb98-4f3b-b014-6cf893b4fc28';

// Données d'exemple simulant un contact existant
const testData = {
  event: 'existing_contact_audit_submission',
  contact: {
    id: '12345678',  // ID HubSpot du contact
    properties: {
      firstname: 'Jean',
      lastname: 'Dupont',
      email: 'jean.dupont@example.com',
      phone: '0692123456',
      company: 'Digital Solutions Réunion',
      website: 'https://www.digital-solutions.re',
      city: 'Saint-Denis',
      hubspot_owner_id: '554004217'  // Rodolphe Le Houx
    },
    formData: {
      // Données du formulaire d'audit
      general: {
        companyName: 'Digital Solutions Réunion',
        sector: 'Services informatiques',
        location: 'Saint-Denis, La Réunion',
        companyAge: '1-3 ans',
        teamSize: '10-50',
        businessModel: 'B2B'
      },
      digitalAssets: {
        website: 'https://www.digital-solutions.re',
        socialMedia: {
          facebook: 'https://facebook.com/digitalsolutions974',
          instagram: 'https://instagram.com/digitalsolutions974',
          linkedin: 'https://linkedin.com/company/digital-solutions-reunion'
        },
        businessListings: {
          googleBusiness: 'https://g.page/digital-solutions-reunion'
        },
        salesPlatforms: ['Site web', 'LinkedIn']
      },
      objectives: {
        goals: ['Augmenter la visibilité', 'Générer des leads', 'Améliorer la conversion'],
        budget: '5000-10000€',
        timeline: '3-6 mois'
      },
      contact: {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        phone: '0692123456',
        message: 'Nous souhaitons améliorer notre présence digitale et augmenter nos conversions.'
      }
    },
    companyName: 'Digital Solutions Réunion'
  },
  timestamp: new Date().toISOString(),
  source: 'digiqo-audit-form'
};

// Fonction pour envoyer les données au webhook
async function triggerWebhook() {
  console.log('🚀 Envoi des données au webhook n8n...');
  console.log('URL:', N8N_WEBHOOK_URL);
  console.log('\n📦 Données envoyées:');
  console.log(JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('\n✅ Réponse du webhook:');
    console.log('Status:', response.status, response.statusText);

    const responseText = await response.text();
    if (responseText) {
      try {
        const responseData = JSON.parse(responseText);
        console.log('Body:', JSON.stringify(responseData, null, 2));
      } catch {
        console.log('Body (text):', responseText);
      }
    }

    if (response.ok) {
      console.log('\n🎉 Webhook déclenché avec succès !');
    } else {
      console.log('\n⚠️ Le webhook a répondu avec un status non-200');
    }

  } catch (error) {
    console.error('\n❌ Erreur lors de l\'envoi au webhook:');
    console.error(error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
  }
}

// Exécuter le test
console.log('='.repeat(60));
console.log('TEST WEBHOOK N8N - CONTACT EXISTANT');
console.log('='.repeat(60));
console.log('Date:', new Date().toLocaleString('fr-FR'));
console.log('='.repeat(60));

triggerWebhook();