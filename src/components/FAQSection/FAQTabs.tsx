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

        {/* Neon Glow Effect - Intense Premium Design */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 -translate-y-1/2 w-32 h-24 pointer-events-none transition-all duration-700 ease-out"
          style={{ 
            left: '-999px',
            filter: 'blur(0px)'
          }}
        >
          {/* Ultra intense outer glow */}
          <div 
            className="absolute -inset-12 rounded-3xl opacity-60"
            style={{
              background: 'var(--glow-color)',
              boxShadow: `
                0 0 60px var(--glow-color),
                0 0 120px var(--glow-color),
                0 0 180px var(--glow-color),
                0 0 240px var(--glow-color)
              `,
              filter: 'blur(20px)'
            }}
          />
          
          {/* Secondary intense glow */}
          <div 
            className="absolute -inset-8 rounded-2xl opacity-70"
            style={{
              background: 'var(--glow-color)',
              boxShadow: `
                0 0 40px var(--glow-color),
                0 0 80px var(--glow-color),
                0 0 120px var(--glow-color)
              `,
              filter: 'blur(10px)'
            }}
          />
          
          {/* Main tab background glow */}
          <div 
            className="absolute inset-0 rounded-xl opacity-90"
            style={{
              background: 'var(--glow-color)',
              boxShadow: `
                0 0 20px var(--glow-color),
                0 0 40px var(--glow-color),
                0 0 60px var(--glow-color),
                inset 0 0 20px rgba(255,255,255,0.5)
              `,
            }}
          />
          
          {/* Center bright core */}
          <div 
            className="absolute inset-4 rounded-lg opacity-100"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              boxShadow: `
                0 0 15px var(--glow-color),
                0 0 30px var(--glow-color),
                inset 0 0 15px rgba(255,255,255,0.3)
              `,
              backdropFilter: 'blur(5px)'
            }}
          />
          
          {/* Top edge bright line */}
          <div 
            className="absolute top-0 left-4 right-4 h-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              boxShadow: `
                0 0 10px rgba(255,255,255,0.8),
                0 0 20px var(--glow-color)
              `,
            }}
          />
          
          {/* Intense pulsing animation */}
          <motion.div 
            className="absolute -inset-4 rounded-xl opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, var(--glow-color) 0%, transparent 60%)',
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Bottom edge reflection */}
          <div 
            className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-70"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              boxShadow: `0 0 6px var(--glow-color)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};