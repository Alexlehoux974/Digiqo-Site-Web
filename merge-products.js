// Script to merge product data from Airtable and HubSpot into vector database format

import { airtableProducts } from './lib/airtable-products.ts';
import fs from 'fs';

// HubSpot products retrieved from API (39 products)
const hubspotProducts = [
  {"id":"16874266062","properties":{"hs_sku":"AUDIT-DIGITAL","description":"Audit complet de votre présence digitale avec rapport détaillé et recommandations personnalisées","name":"Audit Digital Complet","hs_price_eur":"990"}},
  {"id":"16874266063","properties":{"hs_sku":"CAMPAGNE-META-STARTER","description":"Gestion complète de vos campagnes publicitaires sur Facebook et Instagram - Formule Starter","name":"Campagne Meta Ads - Starter","hs_price_eur":"499"}},
  {"id":"16874266064","properties":{"hs_sku":"CAMPAGNE-META-PRO","description":"Gestion avancée de vos campagnes publicitaires sur Facebook et Instagram avec optimisation continue","name":"Campagne Meta Ads - Pro","hs_price_eur":"899"}},
  {"id":"16874266065","properties":{"hs_sku":"CAMPAGNE-META-PREMIUM","description":"Solution complète de publicité Meta avec stratégie multicanal et reporting avancé","name":"Campagne Meta Ads - Premium","hs_price_eur":"1699"}},
  {"id":"16874266066","properties":{"hs_sku":"CM-STARTER","description":"Community Management - Pack Starter avec 3 posts par semaine","name":"Community Management Starter","hs_price_eur":"390"}},
  {"id":"16874266067","properties":{"hs_sku":"CM-ESSENTIEL","description":"Community Management - Pack Essentiel avec 5 posts par semaine et stories","name":"Community Management Essentiel","hs_price_eur":"690"}},
  {"id":"16874266068","properties":{"hs_sku":"CM-PREMIUM","description":"Community Management Premium avec contenu quotidien et gestion complète","name":"Community Management Premium","hs_price_eur":"1290"}},
  {"id":"16874266069","properties":{"hs_sku":"SITE-VITRINE-STARTER","description":"Site vitrine professionnel jusqu'à 5 pages avec design moderne","name":"Site Vitrine Starter","hs_price_eur":"990"}},
  {"id":"16874266070","properties":{"hs_sku":"SITE-VITRINE-PRO","description":"Site vitrine avancé jusqu'à 10 pages avec fonctionnalités personnalisées","name":"Site Vitrine Pro","hs_price_eur":"1990"}},
  {"id":"16874266071","properties":{"hs_sku":"SITE-ECOMMERCE-STARTER","description":"Boutique en ligne complète jusqu'à 50 produits","name":"Site E-commerce Starter","hs_price_eur":"2490"}},
  {"id":"16874266072","properties":{"hs_sku":"SITE-ECOMMERCE-PRO","description":"Boutique en ligne professionnelle jusqu'à 500 produits avec fonctionnalités avancées","name":"Site E-commerce Pro","hs_price_eur":"4990"}},
  {"id":"16874266073","properties":{"hs_sku":"LOGO-CREATION","description":"Création de logo professionnel avec 3 propositions et déclinaisons","name":"Création Logo","hs_price_eur":"490"}},
  {"id":"16874266074","properties":{"hs_sku":"LOGO-REFONTE","description":"Refonte complète de votre identité visuelle avec modernisation du logo","name":"Refonte Logo","hs_price_eur":"690"}},
  {"id":"16874266075","properties":{"hs_sku":"CHARTE-GRAPHIQUE","description":"Charte graphique complète avec guide d'utilisation","name":"Charte Graphique Complète","hs_price_eur":"1290"}},
  {"id":"16874266076","properties":{"hs_sku":"BRANDING-STARTUP","description":"Pack complet d'identité de marque pour startup","name":"Branding Complet Startup","hs_price_eur":"2490"}},
  {"id":"16874266077","properties":{"hs_sku":"SEO-AUDIT","description":"Audit SEO complet avec analyse de la concurrence","name":"Audit SEO","hs_price_eur":"790"}},
  {"id":"16874266078","properties":{"hs_sku":"SEO-OPTIMISATION","description":"Optimisation SEO complète de votre site web","name":"Optimisation SEO On-Page","hs_price_eur":"1490"}},
  {"id":"16874266079","properties":{"hs_sku":"SEO-SUIVI-MENSUEL","description":"Suivi et optimisation SEO mensuelle","name":"SEO - Suivi Mensuel","hs_price_eur":"590"}},
  {"id":"16874266080","properties":{"hs_sku":"VIDEO-CORPORATE","description":"Vidéo corporate professionnelle pour votre entreprise","name":"Vidéo Corporate","hs_price_eur":"2490"}},
  {"id":"16874266081","properties":{"hs_sku":"VIDEO-PRODUIT","description":"Vidéo de présentation produit avec motion design","name":"Vidéo Produit","hs_price_eur":"1290"}},
  {"id":"16874266082","properties":{"hs_sku":"VIDEO-RESEAUX-PACK","description":"Pack de 10 vidéos courtes pour réseaux sociaux","name":"Pack Vidéos Réseaux Sociaux","hs_price_eur":"990"}},
  {"id":"16874266083","properties":{"hs_sku":"FORMATION-META-ADS","description":"Formation complète Facebook & Instagram Ads (2 jours)","name":"Formation Meta Ads","hs_price_eur":"1490"}},
  {"id":"16874266084","properties":{"hs_sku":"FORMATION-CM","description":"Formation Community Management (1 jour)","name":"Formation Community Management","hs_price_eur":"790"}},
  {"id":"16874266085","properties":{"hs_sku":"FORMATION-SEO","description":"Formation SEO & Référencement naturel (2 jours)","name":"Formation SEO","hs_price_eur":"1290"}},
  {"id":"16874266086","properties":{"hs_sku":"MAINTENANCE-BASIC","description":"Maintenance mensuelle site web - Pack Basic","name":"Maintenance Web Basic","hs_price_eur":"99"}},
  {"id":"16874266087","properties":{"hs_sku":"MAINTENANCE-PRO","description":"Maintenance mensuelle site web - Pack Pro avec optimisations","name":"Maintenance Web Pro","hs_price_eur":"199"}},
  {"id":"16874266088","properties":{"hs_sku":"MAINTENANCE-PREMIUM","description":"Maintenance Premium avec support prioritaire 24/7","name":"Maintenance Web Premium","hs_price_eur":"399"}},
  {"id":"16874266089","properties":{"hs_sku":"GOOGLE-ADS-STARTER","description":"Gestion campagnes Google Ads - Pack Starter","name":"Google Ads Starter","hs_price_eur":"599"}},
  {"id":"16874266090","properties":{"hs_sku":"GOOGLE-ADS-PRO","description":"Gestion avancée Google Ads avec Shopping et Display","name":"Google Ads Pro","hs_price_eur":"999"}},
  {"id":"16874266091","properties":{"hs_sku":"EMAIL-CAMPAIGN","description":"Création et envoi de campagne email professionnelle","name":"Campagne Email Marketing","hs_price_eur":"390"}},
  {"id":"16874266092","properties":{"hs_sku":"EMAIL-AUTOMATION","description":"Mise en place d'automatisation email marketing","name":"Automation Email","hs_price_eur":"790"}},
  {"id":"16874266093","properties":{"hs_sku":"PHOTO-SHOOTING","description":"Séance photo professionnelle pour votre entreprise","name":"Shooting Photo Pro","hs_price_eur":"890"}},
  {"id":"16874266094","properties":{"hs_sku":"FLYER-DESIGN","description":"Création de flyer professionnel recto-verso","name":"Design Flyer","hs_price_eur":"290"}},
  {"id":"16874266095","properties":{"hs_sku":"BROCHURE-DESIGN","description":"Création de brochure commerciale 8 pages","name":"Design Brochure","hs_price_eur":"690"}},
  {"id":"16874266096","properties":{"hs_sku":"CONSEIL-STRATEGIE","description":"Conseil en stratégie digitale (demi-journée)","name":"Conseil Stratégie Digitale","hs_price_eur":"590"}},
  {"id":"16874266097","properties":{"hs_sku":"ACCOMPAGNEMENT-MENSUEL","description":"Accompagnement stratégique mensuel personnalisé","name":"Accompagnement Mensuel","hs_price_eur":"990"}},
  {"id":"16874266098","properties":{"hs_sku":"TIKTOK-ADS-STARTER","description":"Gestion campagnes TikTok Ads - Pack découverte","name":"TikTok Ads Starter","hs_price_eur":"699"}},
  {"id":"16874266099","properties":{"hs_sku":"SNAPCHAT-ADS-STARTER","description":"Gestion campagnes Snapchat Ads - Pack découverte","name":"Snapchat Ads Starter","hs_price_eur":"699"}}
];

// Function to normalize product name for matching
function normalizeProductName(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/pack|formule|starter|pro|premium|basic/gi, '');
}

// Function to determine payment type from name/description
function determinePaymentType(name, description, price) {
  const nameLower = (name || '').toLowerCase();
  const descLower = (description || '').toLowerCase();

  if (nameLower.includes('mensuel') || descLower.includes('mensuel') ||
      nameLower.includes('/mois') || descLower.includes('par mois')) {
    return 'MMR';
  }
  if (nameLower.includes('annuel') || descLower.includes('annuel') ||
      nameLower.includes('/an') || descLower.includes('par an')) {
    return 'ARR';
  }
  if (nameLower.includes('audit') || nameLower.includes('formation') ||
      nameLower.includes('création') || nameLower.includes('shooting')) {
    return 'ONE_SHOT';
  }

  // Default based on service type
  if (nameLower.includes('maintenance') || nameLower.includes('suivi') ||
      nameLower.includes('community') || nameLower.includes('campagne')) {
    return 'MMR';
  }

  return 'ONE_SHOT';
}

// Merge products from both sources
function mergeProducts() {
  const mergedProducts = new Map();

  // Add all Airtable products first
  airtableProducts.forEach(product => {
    const key = normalizeProductName(product.name);
    mergedProducts.set(key, {
      // Core identifiers
      id: product.id,
      sku: product.id,
      source: ['airtable'],

      // Basic info
      name: product.name,
      description: product.description,
      category: product.category,

      // Pricing
      price: product.price,
      priceFormatted: product.priceFormatted,
      currency: 'EUR',
      paymentType: product.paymentType,
      duration: product.duration,

      // Features and details
      features: product.features || [],
      paymentLink: product.paymentLink,
      displayOrder: product.displayOrder,

      // Metadata for vector search
      searchTerms: [
        product.name.toLowerCase(),
        product.category.toLowerCase(),
        ...(product.features || []).map(f => f.toLowerCase())
      ].join(' '),

      // Timestamps
      lastUpdated: new Date().toISOString()
    });
  });

  // Merge or add HubSpot products
  hubspotProducts.forEach(hsProduct => {
    const props = hsProduct.properties;
    const name = props.name || '';
    const key = normalizeProductName(name);
    const existingProduct = mergedProducts.get(key);

    const hsData = {
      hubspotId: hsProduct.id,
      sku: props.hs_sku,
      name: props.name,
      description: props.description,
      price: parseFloat(props.hs_price_eur) || 0,
      priceFormatted: props.hs_price_eur ? `${props.hs_price_eur}€` : '',
      currency: 'EUR',
      paymentType: determinePaymentType(props.name, props.description, props.hs_price_eur)
    };

    if (existingProduct) {
      // Merge data - HubSpot data enriches Airtable
      existingProduct.source.push('hubspot');
      existingProduct.hubspotId = hsData.hubspotId;
      existingProduct.sku = hsData.sku || existingProduct.sku;
      // Keep Airtable description if longer, otherwise use HubSpot
      if (hsData.description && hsData.description.length > existingProduct.description.length) {
        existingProduct.description = hsData.description;
      }
      // Update price if different
      if (hsData.price && hsData.price !== existingProduct.price) {
        existingProduct.priceHubspot = hsData.price;
        existingProduct.priceFormattedHubspot = hsData.priceFormatted;
      }
    } else {
      // Add new product from HubSpot only
      mergedProducts.set(key, {
        id: hsData.sku,
        hubspotId: hsData.hubspotId,
        sku: hsData.sku,
        source: ['hubspot'],

        name: hsData.name,
        description: hsData.description,
        category: determineCategoryFromName(hsData.name, hsData.description),

        price: hsData.price,
        priceFormatted: hsData.priceFormatted,
        currency: hsData.currency,
        paymentType: hsData.paymentType,

        features: extractFeaturesFromDescription(hsData.description),

        searchTerms: [
          hsData.name.toLowerCase(),
          hsData.description.toLowerCase()
        ].join(' '),

        lastUpdated: new Date().toISOString()
      });
    }
  });

  return Array.from(mergedProducts.values());
}

// Helper function to determine category from name/description
function determineCategoryFromName(name, description) {
  const text = (name + ' ' + description).toLowerCase();

  if (text.includes('meta') || text.includes('facebook') || text.includes('google ads') || text.includes('tiktok') || text.includes('snapchat')) {
    return 'PUBLICITÉ EN LIGNE';
  }
  if (text.includes('community') || text.includes('cm ')) {
    return 'COMMUNITY MANAGEMENT';
  }
  if (text.includes('site') || text.includes('web') || text.includes('e-commerce') || text.includes('vitrine')) {
    return 'DÉVELOPPEMENT WEB';
  }
  if (text.includes('maintenance')) {
    return 'MAINTENANCE WEB';
  }
  if (text.includes('logo') || text.includes('charte') || text.includes('branding') || text.includes('identité')) {
    return 'IDENTITÉ VISUELLE';
  }
  if (text.includes('seo') || text.includes('référencement')) {
    return 'SEO & RÉFÉRENCEMENT';
  }
  if (text.includes('vidéo') || text.includes('video') || text.includes('shooting') || text.includes('photo')) {
    return 'CRÉATIFS PUBLICITAIRES';
  }
  if (text.includes('formation')) {
    return 'FORMATION & COACHING';
  }
  if (text.includes('audit') || text.includes('conseil') || text.includes('stratégie') || text.includes('accompagnement')) {
    return 'AUDIT & CONSEIL';
  }
  if (text.includes('email') || text.includes('newsletter')) {
    return 'EMAIL MARKETING';
  }
  if (text.includes('flyer') || text.includes('brochure')) {
    return 'CRÉATIFS PUBLICITAIRES';
  }

  return 'AUTRES SERVICES';
}

// Extract features from description
function extractFeaturesFromDescription(description) {
  if (!description) return [];

  const features = [];
  const desc = description.toLowerCase();

  // Extract numbers and quantities
  const matches = desc.match(/\d+\s*(pages?|produits?|posts?|jours?|vidéos?|propositions?)/gi);
  if (matches) {
    features.push(...matches.map(m => m.charAt(0).toUpperCase() + m.slice(1)));
  }

  // Extract key features
  if (desc.includes('personnalis')) features.push('Personnalisé');
  if (desc.includes('support') || desc.includes('assistance')) features.push('Support inclus');
  if (desc.includes('24/7')) features.push('Support 24/7');
  if (desc.includes('prioritaire')) features.push('Support prioritaire');
  if (desc.includes('rapport') || desc.includes('reporting')) features.push('Reporting inclus');
  if (desc.includes('formation')) features.push('Formation incluse');
  if (desc.includes('optimis')) features.push('Optimisation continue');
  if (desc.includes('analys')) features.push('Analyse incluse');
  if (desc.includes('stratég')) features.push('Stratégie personnalisée');

  return features;
}

// Generate JSONL format for vector database
function generateVectorDatabaseFormat(products) {
  return products.map(product => {
    // Create rich text for embedding
    const embeddingText = `
      Produit: ${product.name}
      Catégorie: ${product.category}
      Description: ${product.description}
      Prix: ${product.priceFormatted} ${product.paymentType === 'MMR' ? 'par mois' : product.paymentType === 'ARR' ? 'par an' : ''}
      ${product.features?.length ? 'Caractéristiques: ' + product.features.join(', ') : ''}
      Type de paiement: ${product.paymentType}
      ${product.duration ? 'Durée: ' + product.duration : ''}
    `.trim();

    return JSON.stringify({
      id: product.id,
      sku: product.sku,
      hubspot_id: product.hubspotId,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      price_formatted: product.priceFormatted,
      price_hubspot: product.priceHubspot,
      currency: product.currency,
      payment_type: product.paymentType,
      duration: product.duration,
      features: product.features,
      payment_link: product.paymentLink,
      display_order: product.displayOrder,
      source: product.source,
      search_terms: product.searchTerms,
      embedding_text: embeddingText,
      metadata: {
        last_updated: product.lastUpdated,
        sources: product.source,
        has_payment_link: !!product.paymentLink,
        has_features: !!(product.features && product.features.length > 0),
        price_range: product.price < 500 ? 'budget' : product.price < 1500 ? 'standard' : 'premium'
      }
    });
  }).join('\n');
}

// Main execution
const mergedProducts = mergeProducts();
const jsonlOutput = generateVectorDatabaseFormat(mergedProducts);

// Save to file
fs.writeFileSync('/root/Site-web-digiqo/PRODUCTS-SERVICES-VECTORDB-OPTIMIZED.jsonl', jsonlOutput, 'utf-8');

console.log(`✅ Successfully merged and exported ${mergedProducts.length} products`);
console.log(`📊 Product distribution:`);
const categories = {};
mergedProducts.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
});
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`  - ${cat}: ${count} products`);
});

export { mergedProducts };