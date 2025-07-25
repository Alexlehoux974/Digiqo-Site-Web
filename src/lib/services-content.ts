// Service content parser and types

export interface ServiceFormula {
  name: string
  price: string
  yearlyPrice?: string
  description?: string
  services: string[]
  bonus?: string[]
}

export interface ServiceContent {
  id: string
  title: string
  subtitle: string
  description: string
  formulas: ServiceFormula[]
  portfolio?: {
    title: string
    description: string
    url?: string
  }[]
}

export const serviceFiles: Record<string, string> = {
  'publicite': 'publicite-en-ligne.txt',
  'dev-web': 'developpement-web.txt',
  'community': 'community-management.txt',
  'seo': 'referencement-seo.txt',
  'video': 'visuels-et-videos-publicitaires.txt',
  'identite': 'identite-de-marque.txt',
  'audit': 'audit-gratuit.txt',
  'sitekeeper': 'site-keeper.txt'
}

export function parseServiceContent(content: string, serviceId: string): ServiceContent {
  const lines = content.split('\n')
  let currentSection = ''
  let currentFormula: ServiceFormula | null = null
  const formulas: ServiceFormula[] = []
  const portfolio: ServiceContent['portfolio'] = []
  
  let title = ''
  let subtitle = ''
  let description = ''
  let inServices = false
  let inBonus = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (!line) continue
    
    // Skip separator lines
    if (line.match(/^[=\-]+$/)) continue
    
    // Main title (first non-empty line)
    if (!title && !line.includes('TITRE') && !line.includes('SOUS-TITRE')) {
      title = line
      continue
    }
    
    // Section headers
    if (line === 'TITRE PRINCIPAL') {
      currentSection = 'titre'
      continue
    }
    
    if (line === 'SOUS-TITRE') {
      currentSection = 'sous-titre'
      continue
    }
    
    if (line === 'FORMULES DISPONIBLES') {
      currentSection = 'formules-list'
      continue
    }
    
    if (line === 'PORTFOLIO') {
      currentSection = 'portfolio'
      continue
    }
    
    // Formula sections - check if this is a FORMULE header or a formula section with separator
    const nextLine = lines[i + 1]?.trim()
    const isFormulaWithSeparator = nextLine && nextLine.match(/^[=]+$/)
    
    if (line.startsWith('FORMULE ') && isFormulaWithSeparator) {
      // Format 1: "FORMULE INITIATION" followed by "========="
      if (currentFormula) {
        formulas.push(currentFormula)
      }
      const formulaName = line.replace('FORMULE ', '').trim()
      currentFormula = {
        name: formulaName,
        price: '',
        services: [],
        bonus: []
      }
      currentSection = 'formula'
      inServices = false
      inBonus = false
      i++ // Skip the separator line
      continue
    } else if (isFormulaWithSeparator && line.match(/^[A-Z\s]+$/) && !line.includes('TITRE') && !line.includes('SECTION')) {
      // Format 2: "LANDING PAGE" followed by "========="
      // Check if this looks like a formula name (all caps with spaces)
      if (currentFormula) {
        formulas.push(currentFormula)
      }
      currentFormula = {
        name: line.trim(),
        price: '',
        services: [],
        bonus: []
      }
      currentSection = 'formula'
      inServices = false
      inBonus = false
      i++ // Skip the separator line
      continue
    }
    
    // Parse based on current section
    if (currentSection === 'titre' && !subtitle) {
      subtitle = line
      continue
    }
    
    if (currentSection === 'sous-titre' && !description) {
      // Collect the subtitle description (can be multiple lines)
      if (!line.startsWith('=') && !line.match(/^[A-Z\s]+:$/)) {
        description += (description ? ' ' : '') + line
      }
      continue
    }
    
    if (currentSection === 'formula' && currentFormula) {
      // Price
      if (line.startsWith('PRIX:')) {
        inServices = false
        inBonus = false
        // Check if price is on the same line (Format 2: "PRIX: €899.95 HT")
        const priceOnSameLine = line.substring(5).trim()
        if (priceOnSameLine && priceOnSameLine.includes('€')) {
          currentFormula.price = priceOnSameLine
        }
        continue
      }
      
      // Handle price lines that come after PRIX: (Format 1: bullet points)
      if (line.startsWith('-') && line.includes('€') && lines[i - 1]?.startsWith('PRIX:')) {
        const priceText = line.substring(1).trim()
        if (priceText.includes('mois')) {
          currentFormula.price = priceText.split(':')[1]?.trim() || priceText
        } else if (priceText.includes('an')) {
          currentFormula.yearlyPrice = priceText.split(':')[1]?.trim() || priceText
        }
        continue
      }
      
      // Description
      if (line.startsWith('DESCRIPTION:')) {
        inServices = false
        inBonus = false
        continue
      }
      
      if (lines[i - 1]?.startsWith('DESCRIPTION:')) {
        currentFormula.description = line
        continue
      }
      
      // Services
      if (line.startsWith('SERVICES INCLUS:') || line.startsWith('FONCTIONNALITÉS:')) {
        inServices = true
        inBonus = false
        continue
      }
      
      // Bonus
      if (line.startsWith('BONUS')) {
        inServices = false
        inBonus = true
        continue
      }
      
      // Add service or bonus items
      if ((inServices || inBonus) && line.startsWith('-')) {
        const item = line.substring(1).trim()
        if (inBonus) {
          currentFormula.bonus = currentFormula.bonus || []
          currentFormula.bonus.push(item)
        } else {
          currentFormula.services.push(item)
        }
      } else if ((inServices || inBonus) && line.match(/^[🎯💰📊🧠⚙️🎨✨🔧📁💬📈🛠️📂🎥✂️🔤🎵📐🔁]/)) {
        // Handle emoji-prefixed items
        if (inBonus) {
          currentFormula.bonus = currentFormula.bonus || []
          currentFormula.bonus.push(line)
        } else {
          currentFormula.services.push(line)
        }
      }
      
      // End current section if we hit another section marker
      if (line.startsWith('DÉLAI DE LIVRAISON:') || line.startsWith('===')) {
        inServices = false
        inBonus = false
      }
    }
    
    // Portfolio section
    if (currentSection === 'portfolio' && !line.startsWith('===')) {
      // Look for pattern: NAME \n Description \n Voir le site
      if (line && !line.startsWith('Exemples') && !line.startsWith('Voir le site')) {
        const nextLine = lines[i + 1]?.trim()
        const nextNextLine = lines[i + 2]?.trim()
        
        if (nextLine && !nextLine.startsWith('Voir le site')) {
          portfolio.push({
            title: line,
            description: nextLine,
            url: nextNextLine === 'Voir le site' ? '#' : undefined
          })
          i += nextNextLine === 'Voir le site' ? 2 : 1
        }
      }
    }
  }
  
  // Add the last formula
  if (currentFormula) {
    formulas.push(currentFormula)
  }
  
  return {
    id: serviceId,
    title,
    subtitle,
    description,
    formulas,
    portfolio: portfolio.length > 0 ? portfolio : undefined
  }
}

// Since we can't directly read files from the browser, we'll need to fetch them
export async function getServiceContent(serviceId: string): Promise<ServiceContent | null> {
  const fileName = serviceFiles[serviceId]
  if (!fileName) return null
  
  try {
    // For development, we'll use the public directory
    const response = await fetch(`/services-content/${fileName}`)
    if (!response.ok) {
      console.error(`Failed to fetch service content for ${serviceId}`)
      return getStaticContent(serviceId)
    }
    
    const content = await response.text()
    return parseServiceContent(content, serviceId)
  } catch (error) {
    console.error(`Error loading service content for ${serviceId}:`, error)
    return getStaticContent(serviceId)
  }
}

// Static content fallback for when files aren't available
function getStaticContent(serviceId: string): ServiceContent {
  const staticContent: Record<string, ServiceContent> = {
    'publicite': {
      id: 'publicite',
      title: 'Publicité en Ligne (SMA/SEA)',
      subtitle: 'Boostez votre Visibilité en Ligne',
      description: 'Nous créons, pilotons et optimisons vos campagnes publicitaires sur les réseaux sociaux et Google Ads pour des résultats mesurables.',
      formulas: [
        {
          name: 'Initiation',
          price: '549,00€',
          yearlyPrice: '5 270,40€',
          services: [
            '🎯 Gestion & diffusion sur META',
            '💰 Jusqu\'à 1 000 € de budget publicitaire géré',
            '📊 Jusqu\'à 3 campagnes simultanées',
            '🧠 Création, ciblage & testing stratégique',
            '⚙️ Optimisation hebdomadaire',
            '🎯 Retargeting des audiences'
          ],
          bonus: [
            '✨ 3 créatifs publicitaires inclus/mois',
            '📐 Déclinés dans tous les formats',
            '🎥 Captation vidéo 1h (forfait annuel)'
          ]
        },
        {
          name: 'Propulsion',
          price: '949,00€',
          yearlyPrice: '9 110,40€',
          services: [
            '🎯 Gestion & diffusion sur META',
            '💰 Jusqu\'à 2 500 € de budget publicitaire géré',
            '📊 Jusqu\'à 4 campagnes simultanées',
            '👥 Création d\'audiences similaires',
            '⚙️ Optimisation hebdomadaire avancée'
          ],
          bonus: [
            '✨ 3 créatifs publicitaires inclus/mois',
            '🎥 2 captations vidéo (forfait annuel)'
          ]
        }
      ]
    },
    'dev-web': {
      id: 'dev-web',
      title: 'DÉVELOPPEMENT WEB',
      subtitle: 'Des Sites taillés pour l\'Action',
      description: 'Sites web sur-mesure, responsive et optimisés. De la landing page au site e-commerce.',
      formulas: [
        {
          name: 'Landing Page',
          price: '899,95€ HT',
          description: '1 page unique sur-mesure, optimisé et parfaitement adapté à tous les appareils',
          services: [
            'Titre percutant, visuel fort, bouton d\'action',
            'Témoignages clients et logos partenaires',
            'Formulaire de contact/conversion',
            'Intégration charte graphique',
            'Liens réseaux sociaux',
            'Google Analytics',
            'Certificat SSL'
          ],
          bonus: [
            'Hébergement & Domaine inclus (1 an)',
            'Maintenance 1 mois offert',
            '1 retouche comprise'
          ]
        },
        {
          name: 'Web Start',
          price: '1 599,95€ HT',
          description: 'Site de 1 à 3 pages sur-mesure responsive',
          services: [
            'Formulaire de contact optimisé',
            'Liens réseaux sociaux',
            'Bouton WhatsApp/Messenger',
            'Avis clients en page d\'accueil',
            'Tunnel de conversion simplifié',
            'Certificat SSL',
            'Référencement optimisé',
            'Score PageSpeed > 85/100'
          ],
          bonus: [
            'Hébergement & Domaine inclus (1 an)',
            'Maintenance 1 mois offert',
            '2 retouches comprises'
          ]
        }
      ],
      portfolio: [
        { title: 'CMX FACTORY', description: 'Vos pièces Cross & Supermot.', url: '#' },
        { title: 'CBD RUN', description: 'CBD Bio à la Réunion !', url: '#' },
        { title: 'SNOWKITE SENSATION', description: 'Passez du Kitesurf au Snowkite', url: '#' },
        { title: 'CLICKNVAN', description: 'L\'aventure commence !', url: '#' }
      ]
    },
    'community': {
      id: 'community',
      title: 'COMMUNITY MANAGEMENT',
      subtitle: 'Votre Voix sur les Réseaux Sociaux',
      description: 'Gestion professionnelle de vos réseaux sociaux pour créer une communauté engagée.',
      formulas: [
        {
          name: 'Starter',
          price: '399,00€/mois',
          services: [
            '2 réseaux sociaux gérés',
            '12 publications par mois',
            'Création de visuels',
            'Modération des commentaires',
            'Rapport mensuel'
          ]
        },
        {
          name: 'Pro',
          price: '699,00€/mois',
          services: [
            '4 réseaux sociaux gérés',
            '20 publications par mois',
            'Stories et Reels inclus',
            'Gestion complète de la communauté',
            'Analyse concurrentielle',
            'Rapport bi-mensuel'
          ]
        }
      ]
    },
    'seo': {
      id: 'seo',
      title: 'RÉFÉRENCEMENT SEO',
      subtitle: 'Dominez Google à La Réunion',
      description: 'Optimisez votre visibilité sur Google avec une stratégie SEO locale.',
      formulas: [
        {
          name: 'Local',
          price: '299,00€/mois',
          services: [
            'Audit SEO complet',
            'Optimisation on-page',
            '5 mots-clés ciblés',
            'Google My Business',
            'Rapport mensuel'
          ]
        },
        {
          name: 'Business',
          price: '599,00€/mois',
          services: [
            'Audit SEO approfondi',
            'Optimisation technique',
            '15 mots-clés ciblés',
            'Création de contenu SEO',
            'Netlinking local',
            'Suivi des positions'
          ]
        }
      ]
    },
    'video': {
      id: 'video',
      title: 'VISUELS & VIDÉOS',
      subtitle: 'L\'Image qui Marque les Esprits',
      description: 'Production de contenus visuels impactants pour votre communication.',
      formulas: [
        {
          name: 'Pack Photo',
          price: '450,00€',
          services: [
            'Shooting photo professionnel',
            '20 photos retouchées',
            'Différents formats',
            'Droits d\'utilisation illimités'
          ]
        },
        {
          name: 'Pack Vidéo',
          price: '1 200,00€',
          services: [
            'Captation vidéo HD',
            'Montage professionnel',
            'Motion design',
            'Musique libre de droits',
            'Formats réseaux sociaux'
          ]
        }
      ]
    },
    'identite': {
      id: 'identite',
      title: 'IDENTITÉ DE MARQUE',
      subtitle: 'Votre Marque, Votre Signature',
      description: 'Création d\'identité visuelle unique avec logo et branding complet.',
      formulas: [
        {
          name: 'Logo',
          price: '599,00€',
          services: [
            'Création de logo unique',
            '3 propositions',
            'Déclinaisons couleurs',
            'Fichiers haute définition',
            'Guide d\'utilisation'
          ]
        },
        {
          name: 'Identité Complète',
          price: '1 999,00€',
          services: [
            'Logo et déclinaisons',
            'Charte graphique complète',
            'Papeterie (carte, entête)',
            'Templates réseaux sociaux',
            'Guide de marque'
          ]
        }
      ]
    },
    'audit': {
      id: 'audit',
      title: 'AUDIT GRATUIT',
      subtitle: 'Analysez votre Présence Digitale',
      description: 'Découvrez les opportunités d\'amélioration de votre stratégie digitale.',
      formulas: [
        {
          name: 'Audit Digital Gratuit',
          price: 'GRATUIT',
          services: [
            'Analyse de votre site web',
            'Audit de présence sociale',
            'Analyse SEO de base',
            'Rapport personnalisé',
            'Recommandations prioritaires',
            'Session de conseil 30min'
          ]
        }
      ]
    },
    'sitekeeper': {
      id: 'sitekeeper',
      title: 'SITEKEEPER',
      subtitle: 'Votre Site Entre de Bonnes Mains',
      description: 'Maintenance et sécurité de votre site web pour une tranquillité d\'esprit totale.',
      formulas: [
        {
          name: 'Essential',
          price: '79,00€/mois',
          services: [
            'Sauvegardes hebdomadaires',
            'Mises à jour de sécurité',
            'Monitoring 24/7',
            'Support par email'
          ]
        },
        {
          name: 'Premium',
          price: '149,00€/mois',
          services: [
            'Sauvegardes quotidiennes',
            'Mises à jour complètes',
            'Monitoring temps réel',
            'Support prioritaire',
            'Optimisation mensuelle',
            '2h de modifications/mois'
          ]
        }
      ]
    }
  }
  
  return staticContent[serviceId] || staticContent['publicite']
}