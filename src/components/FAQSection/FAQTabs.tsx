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
  const glowRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const glow = glowRef.current;
    const activeTab = tabRefs.current[activeIndex];
    const container = containerRef.current;
    
    if (glow && activeTab && container) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      const newLeft = tabRect.left - containerRect.left + (tabRect.width / 2) - (glow.offsetWidth / 2);
      
      glow.style.left = `${newLeft}px`;
      glow.style.setProperty('--glow-color', sections[activeIndex].color);
      glow.style.setProperty('--glow-shadow', sections[activeIndex].shadowColor);
    }
  }, [activeIndex, sections]);

  return (
    <div className="relative w-full overflow-x-auto scrollbar-hide">
      <div 
        ref={containerRef}
        className="relative flex items-center justify-start md:justify-center gap-3 p-6 min-w-max mx-auto"
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
                relative z-20 flex flex-col items-center gap-2 px-4 py-3 rounded-xl
                transition-all duration-300 group min-w-[80px]
                ${isActive 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                className={`
                  w-8 h-8 transition-all duration-300
                  ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}
                `}
                isActive={isActive}
                color={isActive ? section.color : '#9CA3AF'}
              />
              <span className={`
                font-medium text-xs transition-all duration-300 text-center
                ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'}
              `}>
                {section.title}
              </span>
            </motion.button>
          );
        })}

        {/* Neon Glow Effect - Ultrathink Design */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 -translate-y-1/2 w-32 h-20 pointer-events-none transition-all duration-700 ease-out"
          style={{ 
            left: '-999px',
            filter: 'blur(0px)'
          }}
        >
          {/* Outer soft glow */}
          <div 
            className="absolute -inset-4 rounded-2xl opacity-20"
            style={{
              background: 'var(--glow-color)',
              boxShadow: `
                0 0 40px var(--glow-color),
                0 0 80px var(--glow-color),
                0 0 120px var(--glow-color)
              `,
              filter: 'blur(8px)'
            }}
          />
          
          {/* Main glow */}
          <div 
            className="absolute inset-0 rounded-xl opacity-40"
            style={{
              background: 'var(--glow-color)',
              boxShadow: 'var(--glow-shadow)',
            }}
          />
          
          {/* Intense center glow */}
          <div 
            className="absolute inset-2 rounded-xl opacity-30"
            style={{
              background: 'var(--glow-color)',
              boxShadow: `
                0 0 30px var(--glow-color),
                0 0 50px var(--glow-color),
                0 0 70px var(--glow-color)
              `,
            }}
          />
          
          {/* Top highlight - Premium effect */}
          <div 
            className="absolute top-0 left-6 right-6 h-1 rounded-full opacity-80"
            style={{
              background: `linear-gradient(90deg, transparent, var(--glow-color), transparent)`,
              boxShadow: `0 0 15px var(--glow-color)`,
            }}
          />
          
          {/* Pulsing animation - More sophisticated */}
          <motion.div 
            className="absolute inset-0 rounded-xl opacity-25"
            style={{
              background: 'radial-gradient(ellipse at center, var(--glow-color) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.25, 0.45, 0.25],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Bottom reflection - Ultrathink touch */}
          <div 
            className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-50"
            style={{
              background: `linear-gradient(90deg, transparent, var(--glow-color), transparent)`,
              boxShadow: `0 0 8px var(--glow-color)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};