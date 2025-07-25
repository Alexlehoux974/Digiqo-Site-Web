import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GeneralIcon,
  ServicesIcon,
  ClosingIcon,
  ProcessIcon,
  PaymentIcon,
  ResultsIcon,
  SupportIcon,
  OthersIcon
} from './FAQIcons';
import { FAQSection } from './faqData';

interface FAQTabsProps {
  sections: FAQSection[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

const tabIcons = [
  GeneralIcon,    // Généralités
  ServicesIcon,   // Nos Services
  ClosingIcon,    // Closing
  ProcessIcon,    // Process
  PaymentIcon,    // Paiement
  ResultsIcon,    // Résultats
  SupportIcon,    // Assistance
  OthersIcon      // Autres
];

export const FAQTabs: React.FC<FAQTabsProps> = ({ sections, activeIndex, onTabChange }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const spotlight = spotlightRef.current;
    const activeTab = tabRefs.current[activeIndex];
    const container = containerRef.current;
    
    if (spotlight && activeTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      const newLeft = tabRect.left - containerRect.left + (tabRect.width / 2);
      
      spotlight.style.left = `${newLeft}px`;
      spotlight.style.setProperty('--glow-color', sections[activeIndex].color);
      spotlight.style.setProperty('--glow-shadow', sections[activeIndex].shadowColor);
    }
  }, [activeIndex, sections]);

  return (
    <div className="relative">
      {/* Tab Bar Container */}
      <div className="relative w-full overflow-x-auto scrollbar-hide bg-gray-900/50 backdrop-blur-sm rounded-2xl">
        <div 
          ref={containerRef}
          className="relative flex items-center justify-start md:justify-center gap-6 p-4 min-w-max mx-auto"
        >
          {sections.map((section, index) => {
            const Icon = tabIcons[index];
            const isActive = activeIndex === index;
            
            return (
              <motion.button
                key={section.id}
                ref={el => (tabRefs.current[index] = el)}
                onClick={() => onTabChange(index)}
                className={`
                  relative z-20 flex items-center justify-center p-3 rounded-xl
                  transition-all duration-300 group
                  ${isActive 
                    ? 'text-white bg-white/10' 
                    : 'text-gray-500 hover:text-gray-300'
                  }
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon 
                  className={`
                    w-8 h-8 transition-all duration-300
                    ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}
                  `}
                  isActive={isActive}
                  color={isActive ? section.color : '#6B7280'}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Spotlight Effect Below Tab Bar */}
      <div className="relative h-32 overflow-hidden pointer-events-none">
        <div 
          ref={spotlightRef}
          className="absolute top-0 -translate-x-1/2 w-64 transition-all duration-700 ease-out"
          style={{ 
            left: '-999px',
          }}
        >
          {/* Main spotlight beam */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-32 h-96"
            style={{
              background: `linear-gradient(to bottom, var(--glow-color) 0%, transparent 100%)`,
              opacity: 0.8,
              filter: 'blur(30px)',
              transform: 'perspective(800px) rotateX(45deg)',
              transformOrigin: 'top center'
            }}
          />
          
          {/* Wider ambient glow */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-64 h-64"
            style={{
              background: `radial-gradient(ellipse at center top, var(--glow-color) 0%, transparent 70%)`,
              opacity: 0.5,
              filter: 'blur(40px)',
            }}
          />
          
          {/* Intense core beam */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-16 h-64"
            style={{
              background: `linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, var(--glow-color) 20%, transparent 100%)`,
              opacity: 0.6,
              filter: 'blur(10px)',
            }}
          />
          
          {/* Ground reflection */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 top-20 w-96 h-32"
            style={{
              background: `radial-gradient(ellipse at center, var(--glow-color) 0%, transparent 60%)`,
              opacity: 0.3,
              filter: 'blur(50px)',
              transform: 'scaleY(0.5)',
            }}
          />
          
          {/* Pulsing animation */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-48 h-48"
            style={{
              background: `radial-gradient(circle at center, var(--glow-color) 0%, transparent 50%)`,
              filter: 'blur(20px)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
};