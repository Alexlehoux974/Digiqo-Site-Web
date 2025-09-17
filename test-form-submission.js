// Test d'envoi de formulaire vers Airtable
const testData = {
  project: {
    companyName: "Test Company",
    sector: "E-commerce",
    projectDescription: "Création d'un site e-commerce pour vendre des produits artisanaux",
    existingSite: "no"
  },
  websiteType: {
    type: "ecommerce",
    pages: "11-20",
    languages: ["fr", "en"]
  },
  features: {
    contactForm: true,
    onlineBooking: false,
    onlinePayment: true,
    memberArea: true,
    multiLanguage: true,
    liveChat: false,
    newsletter: true,
    socialMediaIntegration: true,
    blog: true,
    search: true,
    other: "Système de wishlist et comparaison de produits"
  },
  design: {
    hasCharter: "no",
    needLogo: "yes",
    style: "moderne",
    references: "https://example.com, https://autre-site.com",
    animations: "legeres",
    colors: "Bleu et blanc, touches de vert"
  },
  content: {
    hasContent: "partiel",
    needCopywriting: "yes",
    needPhotos: "yes",
    needVideos: "no",
    pagesCount: "11-20"
  },
  technical: {
    hasDomain: "yes",
    domainName: "www.test-company.com",
    hasHosting: "no",
    seoNeeds: "advanced",
    integrations: "Google Analytics, Mailchimp, Stripe",
    maintenanceLevel: "full"
  },
  timeline: {
    startDate: "2024-02-01",
    deadline: "3months",
    priority: "normal",
    paymentMode: "monthly",
    comments: "Lancement prévu pour le printemps"
  },
  contact: {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@test.com",
    phone: "0692123456",
    position: "Directeur",
    bestTimeToCall: "morning",
    source: "google",
    message: "Nous sommes très motivés pour ce projet"
  }
};

// Envoyer le test
fetch('http://localhost:3000/api/web-quote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => {
  console.log('✅ Test réussi !', data);
  if (data.recordId) {
    console.log('Record ID Airtable:', data.recordId);
  }
})
.catch(error => {
  console.error('❌ Erreur lors du test:', error);
});

console.log('📤 Envoi du formulaire de test...');