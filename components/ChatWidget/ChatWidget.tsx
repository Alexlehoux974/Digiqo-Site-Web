'use client'

import { useEffect } from 'react'
import { createChat } from '@n8n/chat'

export const ChatWidget = () => {
  useEffect(() => {
    // Créer un style personnalisé pour le branding Digiqo
    const style = document.createElement('style')
    style.textContent = `
      /* Personnalisation du chatbot Digiqo */
      #n8n-chat {
        --chat--color-primary: #8B1431 !important;
        --chat--color-primary-shade-50: #8B143120 !important;
        --chat--color-primary-shade-100: #8B143140 !important;
        --chat--color-secondary: #DA6530 !important;
        --chat--color-secondary-shade-50: #DA653020 !important;
        --chat--color-white: #ffffff !important;
        --chat--color-light: #f8f9fa !important;
        --chat--color-medium: #6c757d !important;
        --chat--color-dark: #212529 !important;
        --chat--color-disabled: #ced4da !important;
        --chat--color-typing: #199CB7 !important;
        
        /* Fonts */
        --chat--font-family: 'Montserrat', 'Inter', sans-serif !important;
        --chat--font-size: 14px !important;
        
        /* Spacing */
        --chat--spacing: 1rem !important;
        --chat--border-radius: 12px !important;
        
        /* Shadows */
        --chat--box-shadow: 0 10px 40px rgba(139, 20, 49, 0.15) !important;
        
        /* Z-index pour être au-dessus de tout */
        z-index: 99999 !important;
      }
      
      /* Style du bouton du chat */
      .n8n-chat-button {
        background: linear-gradient(135deg, #8B1431 0%, #DA6530 100%) !important;
        border: none !important;
        box-shadow: 0 4px 20px rgba(139, 20, 49, 0.3) !important;
        transition: all 0.3s ease !important;
      }
      
      .n8n-chat-button:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 6px 30px rgba(139, 20, 49, 0.4) !important;
      }
      
      /* Style de la fenêtre de chat */
      .n8n-chat-window {
        border-radius: 16px !important;
        overflow: hidden !important;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
      }
      
      /* En-tête du chat */
      .n8n-chat-header {
        background: linear-gradient(135deg, #8B1431 0%, #DA6530 100%) !important;
        padding: 1.25rem !important;
      }
      
      /* Messages du chat */
      .n8n-chat-message-user {
        background: linear-gradient(135deg, #8B1431 0%, #DA6530 100%) !important;
        color: white !important;
      }
      
      .n8n-chat-message-bot {
        background: #f8f9fa !important;
        color: #212529 !important;
        border: 1px solid #e9ecef !important;
      }
      
      /* Input du chat */
      .n8n-chat-input {
        border: 2px solid #e9ecef !important;
        border-radius: 12px !important;
        padding: 0.75rem 1rem !important;
        font-family: 'Inter', sans-serif !important;
        transition: all 0.3s ease !important;
      }
      
      .n8n-chat-input:focus {
        border-color: #8B1431 !important;
        box-shadow: 0 0 0 3px rgba(139, 20, 49, 0.1) !important;
        outline: none !important;
      }
      
      /* Bouton d'envoi */
      .n8n-chat-send-button {
        background: linear-gradient(135deg, #8B1431 0%, #DA6530 100%) !important;
        border: none !important;
        border-radius: 8px !important;
        color: white !important;
        transition: all 0.3s ease !important;
      }
      
      .n8n-chat-send-button:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 4px 12px rgba(139, 20, 49, 0.3) !important;
      }
      
      /* Animation de frappe */
      .n8n-chat-typing-indicator {
        background: #199CB7 !important;
      }
      
      /* Scrollbar personnalisée */
      .n8n-chat-messages::-webkit-scrollbar {
        width: 6px !important;
      }
      
      .n8n-chat-messages::-webkit-scrollbar-track {
        background: #f1f1f1 !important;
      }
      
      .n8n-chat-messages::-webkit-scrollbar-thumb {
        background: #8B1431 !important;
        border-radius: 3px !important;
      }
      
      .n8n-chat-messages::-webkit-scrollbar-thumb:hover {
        background: #DA6530 !important;
      }
    `
    document.head.appendChild(style)

    // Initialiser le chat avec la configuration
    const chatInstance = createChat({
      webhookUrl: 'https://n8n.srv763918.hstgr.cloud/webhook/9cc113e7-d987-45a2-8e91-a4a664624d05/chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'chatSessionId',
      metadata: {
        source: 'website',
        brand: 'Digiqo'
      },
      initialMessages: [
        'Bonjour ! 👋',
        'Je suis l\'assistant virtuel de Digiqo.',
        'Comment puis-je vous aider aujourd\'hui ?'
      ],
      i18n: {
        fr: {
          title: 'Assistant Digiqo',
          subtitle: 'Nous sommes là pour vous aider',
          footer: '',
          getStarted: 'Commencer',
          inputPlaceholder: 'Tapez votre message...',
          sendButtonText: 'Envoyer',
          closeButtonText: 'Fermer',
          greeting: 'Bonjour ! 👋',
          greetingSubtitle: 'Commencez une conversation. Nous sommes là pour vous aider 24h/24 et 7j/7.',
          welcomeScreen: {
            title: 'Bonjour ! 👋',
            subtitle: 'Commencez une conversation. Nous sommes là pour vous aider 24h/24 et 7j/7.'
          }
        },
        en: {
          greeting: 'Bonjour ! 👋',
          greetingSubtitle: 'Commencez une conversation. Nous sommes là pour vous aider 24h/24 et 7j/7.',
          welcomeScreen: {
            title: 'Bonjour ! 👋',
            subtitle: 'Commencez une conversation. Nous sommes là pour vous aider 24h/24 et 7j/7.'
          }
        }
      },
      defaultLanguage: 'fr',
      theme: {
        button: {
          backgroundColor: '#8B1431',
          iconColor: '#ffffff',
          size: 'medium'
        },
        chat: {
          backgroundColor: '#ffffff',
          foregroundColor: '#212529'
        }
      }
    })

    // Cleanup function
    return () => {
      // Nettoyer le style ajouté
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
      // Note: n8n chat ne fournit pas de méthode destroy, 
      // mais le composant sera nettoyé automatiquement
    }
  }, [])

  return null // Le chat s'injecte lui-même dans le DOM
}