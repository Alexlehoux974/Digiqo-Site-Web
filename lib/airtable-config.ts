// Configuration Airtable pour les demandes de devis web
export const AIRTABLE_CONFIG = {
  baseId: 'appH46IBnNdYNrwZ9', // Site Web Digiqo
  tableId: 'tbl0UR3X7TPAe7IDW', // Demandes Devis Web
  apiKey: process.env.AIRTABLE_PAT || process.env.AIRTABLE_API_KEY || ''
};

// Mapping des champs du formulaire vers Airtable
export const FIELD_MAPPING = {
  // Project Info
  'project.companyName': 'Company Name',
  'project.sector': 'Sector',
  'project.projectDescription': 'Project Description',
  'project.existingSite': 'Existing Site',
  'project.currentSiteUrl': 'Current Site URL',

  // Website Type
  'websiteType.type': 'Website Type',
  'websiteType.pages': 'Pages Count',
  'websiteType.languages': 'Languages',

  // Features
  'features.contactForm': 'Contact Form',
  'features.onlineBooking': 'Online Booking',
  'features.onlinePayment': 'Online Payment',
  'features.memberArea': 'Member Area',
  'features.multiLanguage': 'Multi Language',
  'features.liveChat': 'Live Chat',
  'features.newsletter': 'Newsletter',
  'features.socialMediaIntegration': 'Social Media',
  'features.blog': 'Blog',
  'features.search': 'Search Engine',
  'features.other': 'Other Features',

  // Design
  'design.hasCharter': 'Has Charter',
  'design.needLogo': 'Need Logo',
  'design.style': 'Design Style',
  'design.references': 'Design References',
  'design.animations': 'Animations',
  'design.colors': 'Preferred Colors',

  // Content
  'content.hasContent': 'Has Content',
  'content.needCopywriting': 'Need Copywriting',
  'content.needPhotos': 'Need Photos',
  'content.needVideos': 'Need Videos',
  'content.pagesCount': 'Content Pages Count',

  // Technical
  'technical.hasDomain': 'Has Domain',
  'technical.domainName': 'Domain Name',
  'technical.hasHosting': 'Has Hosting',
  'technical.seoNeeds': 'SEO Needs',
  'technical.integrations': 'Integrations',
  'technical.maintenanceLevel': 'Maintenance Level',

  // Timeline
  'timeline.startDate': 'Start Date',
  'timeline.deadline': 'Deadline',
  'timeline.priority': 'Priority',
  'timeline.paymentMode': 'Payment Mode',
  'timeline.comments': 'Timeline Comments',

  // Contact
  'contact.firstName': 'First Name',
  'contact.lastName': 'Last Name',
  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.position': 'Position',
  'contact.bestTimeToCall': 'Best Time To Call',
  'contact.source': 'Source',
  'contact.message': 'Message'
};

// Fonction pour transformer les données du formulaire vers Airtable
export function transformFormDataToAirtable(formData: any) {
  const airtableData: any = {};

  // Parcourir toutes les clés du mapping
  for (const [formPath, airtableField] of Object.entries(FIELD_MAPPING)) {
    const keys = formPath.split('.');
    let value = formData;

    // Naviguer dans l'objet formData
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }

    // Ajouter la valeur si elle existe
    if (value !== undefined && value !== null && value !== '') {
      airtableData[airtableField] = value;
    }
  }

  return airtableData;
}