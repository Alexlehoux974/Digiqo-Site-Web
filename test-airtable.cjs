const Airtable = require('airtable');
require('dotenv').config({ path: '.env.local' });

const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT
}).base(process.env.AIRTABLE_BASE_ID || 'appH46IBnNdYNrwZ9');

async function getAudits() {
  try {
    console.log('Récupération des audits depuis la table "Audits Clients"...\n');

    const records = await base('Audits Clients').select({
      maxRecords: 10,
      view: "Grid view"
    }).all();

    console.log(`Nombre d'audits trouvés: ${records.length}\n`);

    if (records.length > 0) {
      console.log('IDs disponibles pour tester:');
      console.log('==============================');
      records.forEach(record => {
        const entreprise = record.get('Nom Entreprise') || 'Sans nom';
        const site = record.get('Site Web') || 'Pas de site';
        console.log(`ID: ${record.id}`);
        console.log(`   Entreprise: ${entreprise}`);
        console.log(`   Site: ${site}`);
        console.log(`   URL de test: https://digiqo.fr/audit-gratuit/${record.id}`);
        console.log('---');
      });
    } else {
      console.log('Aucun audit trouvé dans la table "Audits Clients"');
    }
  } catch (error) {
    console.error('Erreur:', error.message);
    if (error.statusCode === 404) {
      console.log('\n⚠️  La table "Audits Clients" n\'existe pas ou n\'est pas accessible');
    }
  }
}

getAudits();