/**
 * Utilitaire pour générer des liens WhatsApp avec messages préconçus
 */

const WHATSAPP_NUMBER = '262693538342'

interface WhatsAppLinkParams {
  service?: string
  formula?: string
  context?: string
}

/**
 * Génère un lien WhatsApp avec un message préconçu selon le service
 */
export function generateWhatsAppLink(params: WhatsAppLinkParams = {}): string {
  const { service, formula, context } = params
  
  let message = ''
  
  // Messages personnalisés par service
  if (service === 'dev-web' || service === 'sites-web') {
    if (context === 'devis') {
      message = "Bonjour, je souhaite obtenir un devis pour la création d'un site web professionnel."
    } else if (context === 'projet') {
      message = "Bonjour, j'ai un projet de site web et j'aimerais en discuter avec vous."
    } else {
      message = "Bonjour, je suis intéressé(e) par vos services de développement web."
    }
  } else if (service === 'publicite' || service === 'publicite-en-ligne') {
    if (formula) {
      message = `Bonjour, je suis intéressé(e) par la formule ${formula} pour la publicité en ligne.`
    } else {
      message = "Bonjour, je souhaite en savoir plus sur vos services de publicité en ligne."
    }
  } else if (service === 'community' || service === 'community-management') {
    if (formula) {
      message = `Bonjour, je suis intéressé(e) par la formule ${formula} pour le community management.`
    } else {
      message = "Bonjour, je souhaite développer ma présence sur les réseaux sociaux avec votre aide."
    }
  } else if (service === 'seo' || service === 'referencement') {
    if (context === 'audit') {
      message = "Bonjour, je souhaite obtenir un audit SEO gratuit pour mon site web."
    } else {
      message = "Bonjour, je veux améliorer le référencement de mon site sur Google."
    }
  } else if (service === 'video') {
    message = "Bonjour, j'ai un projet de production vidéo pour mon entreprise."
  } else if (service === 'identite' || service === 'identite-de-marque') {
    message = "Bonjour, je souhaite créer ou refondre l'identité visuelle de mon entreprise."
  } else if (service === 'audit' || service === 'audit-digital') {
    message = "Bonjour, je souhaite réaliser un audit digital complet de ma présence en ligne."
  } else if (service === 'sitekeeper' || service === 'maintenance') {
    message = "Bonjour, je recherche un service de maintenance pour mon site web."
  } else if (context === 'eligibilite') {
    message = "Bonjour, j'ai utilisé votre calculateur d'éligibilité et je souhaite en savoir plus sur les aides disponibles."
  } else {
    // Message par défaut
    message = "Bonjour, je souhaite en savoir plus sur vos services."
  }
  
  // Encoder le message pour l'URL
  const encodedMessage = encodeURIComponent(message)
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

/**
 * Génère un lien WhatsApp pour une formule spécifique de publicité
 */
export function generateWhatsAppLinkForFormula(formulaName: string, engagement: '3mois' | 'annuel'): string {
  const engagementText = engagement === '3mois' ? '3 mois' : 'annuel'
  
  // Messages personnalisés selon la formule
  let message = ''
  
  switch(formulaName.toLowerCase()) {
    case 'initiation':
      message = `Bonjour, je débute en publicité digitale et je suis intéressé(e) par la formule Initiation avec un engagement ${engagementText}. Cette formule semble parfaite pour commencer. Pouvez-vous me donner plus d'informations ?`
      break
    case 'propulsion':
      message = `Bonjour, je souhaite développer ma visibilité en ligne et la formule Propulsion avec un engagement ${engagementText} m'intéresse. J'aimerais en savoir plus sur l'accompagnement inclus.`
      break
    case 'expansion':
      message = `Bonjour, je cherche à accélérer ma croissance digitale. La formule Expansion avec un engagement ${engagementText} correspond à mes besoins. Pouvez-vous me détailler les services inclus ?`
      break
    case 'domination':
      message = `Bonjour, je veux dominer mon marché en ligne. La formule Domination avec un engagement ${engagementText} m'intéresse fortement. J'aimerais discuter de la stratégie complète.`
      break
    default:
      message = `Bonjour, je suis intéressé(e) par la formule ${formulaName} pour la publicité en ligne avec un engagement ${engagementText}. Pouvez-vous me donner plus d'informations ?`
  }
  
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}