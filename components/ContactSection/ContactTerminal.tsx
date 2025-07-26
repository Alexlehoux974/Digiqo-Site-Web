import { useEffect, useState } from 'react'
import { Terminal, TypingAnimation, AnimatedSpan } from '../magicui/terminal'
import { motion } from 'framer-motion'

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  services: string[]
  description: string
  consent: boolean
}

interface ContactTerminalProps {
  formData: FormData
  isFormSubmitted?: boolean
  className?: string
}

interface TerminalMessage {
  id: string
  text: string | ((data: FormData) => string)
  delay: number
  condition: (data: FormData) => boolean
}

export function ContactTerminal({ formData, isFormSubmitted = false, className }: ContactTerminalProps) {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([])
  const [messageHistory, setMessageHistory] = useState<Set<string>>(new Set())

  // Define the progression messages based on form completion
  const messages: TerminalMessage[] = [
    {
      id: 'init',
      text: '$ digiqo init --mode=boost',
      delay: 0,
      condition: () => true
    },
    {
      id: 'welcome',
      text: '> Début de propulsion de votre business',
      delay: 800,
      condition: () => true
    },
    {
      id: 'waiting',
      text: '> En attente des données du pilote...',
      delay: 1600,
      condition: (data) => !data.firstName && !data.lastName && !data.phone && !data.email && data.services.length === 0
    },
    {
      id: 'name_progress',
      text: '> Identification du pilote en cours...',
      delay: 100,
      condition: (data) => !!(data.firstName || data.lastName) && !(data.firstName && data.lastName)
    },
    {
      id: 'name',
      text: (data) => `✓ Pilote identifié: ${data.firstName} ${data.lastName}`,
      delay: 100,
      condition: (data) => !!(data.firstName && data.lastName)
    },
    {
      id: 'contact_progress',
      text: '> Établissement de la connexion...',
      delay: 100,
      condition: (data) => !!(data.phone || data.email) && !(data.phone && data.email)
    },
    {
      id: 'contact',
      text: '✓ Connexion établie',
      delay: 100,
      condition: (data) => !!(data.phone && data.email)
    },
    {
      id: 'service',
      text: (data) => `✓ Objectif de mission: ${data.services.length} service(s) sélectionné(s)`,
      delay: 100,
      condition: (data) => data.services.length > 0
    },
    {
      id: 'description_progress',
      text: '> Analyse du plan de vol...',
      delay: 100,
      condition: (data) => !!data.description && data.description.length <= 10
    },
    {
      id: 'description',
      text: '✓ Plan de vol validé',
      delay: 100,
      condition: (data) => !!data.description && data.description.length > 10
    },
    {
      id: 'ready',
      text: '> Tous les systèmes sont GO!',
      delay: 500,
      condition: (data) => 
        !!(data.firstName && data.lastName && data.phone && data.email && 
           data.services.length > 0 && data.description && data.description.length > 10 && !isFormSubmitted)
    },
    {
      id: 'form_submitted',
      text: '> Formulaire validé ! Préparation au décollage...',
      delay: 100,
      condition: () => isFormSubmitted
    },
    {
      id: 'countdown3',
      text: '> 3...',
      delay: 1000,
      condition: () => isFormSubmitted
    },
    {
      id: 'countdown2',
      text: '> 2...',
      delay: 1500,
      condition: () => isFormSubmitted
    },
    {
      id: 'countdown1',
      text: '> 1...',
      delay: 2000,
      condition: () => isFormSubmitted
    },
    {
      id: 'countdown',
      text: '> DÉCOLLAGE! 🚀🚀🚀',
      delay: 2500,
      condition: () => isFormSubmitted
    }
  ]

  useEffect(() => {
    // Get messages that should be displayed based on current form data
    const activeMessages = messages.filter(msg => msg.condition(formData))
    const activeMessageIds = activeMessages.map(msg => msg.id)
    
    // Only show messages that haven't been shown before or are still valid
    const messagesToShow = activeMessageIds.filter(id => {
      // Always show if condition is true and it's not a "progress" message that was already completed
      if (id.includes('progress')) {
        // Don't show progress messages if the complete version exists
        const completeId = id.replace('_progress', '')
        return !messageHistory.has(completeId) && !activeMessageIds.includes(completeId)
      }
      return true
    })
    
    // Update displayed messages
    setDisplayedMessages(messagesToShow)
    
    // Add new messages to history
    const newHistory = new Set(messageHistory)
    messagesToShow.forEach(id => newHistory.add(id))
    setMessageHistory(newHistory)
  }, [formData, isFormSubmitted])

  // Calculate cumulative delays for proper animation timing
  const getMessageDelay = (messageId: string): number => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    if (messageIndex === -1) return 0
    
    const message = messages[messageIndex]
    const baseDelay = message.delay
    
    // Add extra delay for messages that appear after others
    const precedingMessages = displayedMessages.slice(0, displayedMessages.indexOf(messageId))
    const extraDelay = precedingMessages.length * 50
    
    return baseDelay + extraDelay
  }

  const getMessageText = (message: TerminalMessage): string => {
    if (typeof message.text === 'function') {
      return message.text(formData)
    }
    return message.text
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={className}
    >
      <Terminal className="bg-gradient-to-br from-black via-gray-900 to-black text-digiqo-accent font-mono text-sm h-[450px] border-digiqo-gray-dark/50 shadow-2xl overflow-hidden">
        <div className="space-y-2 text-xs sm:text-sm">
          {messages.map((message) => {
            if (!displayedMessages.includes(message.id)) return null
            
            return (
              <AnimatedSpan
                key={message.id}
                delay={getMessageDelay(message.id)}
                className="block"
              >
                <TypingAnimation
                  duration={30}
                  delay={getMessageDelay(message.id)}
                  className="text-digiqo-accent"
                  style={{
                    textShadow: '0 0 10px rgba(218, 101, 48, 0.5)'
                  }}
                >
                  {getMessageText(message)}
                </TypingAnimation>
              </AnimatedSpan>
            )
          })}
          
          {/* Blinking cursor */}
          {displayedMessages.length > 0 && (
            <motion.span 
              className="inline-block w-2 h-4 bg-digiqo-accent ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                boxShadow: '0 0 10px rgba(218, 101, 48, 0.8)'
              }}
            />
          )}
        </div>
      </Terminal>
    </motion.div>
  )
}