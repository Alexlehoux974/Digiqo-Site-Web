import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Briefcase, 
  Target, 
  Cog, 
  CreditCard, 
  TrendingUp, 
  HeadphonesIcon, 
  MoreHorizontal 
} from 'lucide-react';
import { FAQSection } from './faqData';

interface FAQTabsProps {
  sections: FAQSection[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

const tabIcons = [
  HelpCircle,     // Généralités
  Briefcase,      // Nos Services
  Target,         // Closing
  Cog,           // Process
  CreditCard,     // Paiement
  TrendingUp,     // Résultats
  HeadphonesIcon, // Assistance
  MoreHorizontal  // Autres
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
        className="relative flex items-center justify-start md:justify-center gap-1 p-4 min-w-max mx-auto"
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
                relative z-20 flex items-center gap-1 px-3 py-2 rounded-lg
                transition-all duration-300 group
                ${isActive 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`
                w-4 h-4 transition-all duration-300
                ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}
              `} />
              <span className={`
                font-medium text-xs lg:text-sm transition-all duration-300
                ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'}
              `}>
                {section.title}
              </span>
            </motion.button>
          );
        })}

        {/* Neon Glow Effect */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 -translate-y-1/2 w-24 h-10 pointer-events-none transition-all duration-500 ease-out"
          style={{ 
            left: '-999px',
            filter: 'blur(0px)'
          }}
        >
          {/* Main glow */}
          <div 
            className="absolute inset-0 rounded-lg opacity-30"
            style={{
              background: 'var(--glow-color)',
              boxShadow: 'var(--glow-shadow)',
            }}
          />
          
          {/* Intense center glow */}
          <div 
            className="absolute inset-2 rounded-lg opacity-20"
            style={{
              background: 'var(--glow-color)',
              boxShadow: `
                0 0 20px var(--glow-color),
                0 0 40px var(--glow-color),
                0 0 60px var(--glow-color)
              `,
            }}
          />
          
          {/* Top highlight */}
          <div 
            className="absolute top-0 left-4 right-4 h-1 rounded-full opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, var(--glow-color), transparent)`,
              boxShadow: `0 0 10px var(--glow-color)`,
            }}
          />
          
          {/* Pulsing animation */}
          <motion.div 
            className="absolute inset-0 rounded-lg opacity-20"
            style={{
              background: 'var(--glow-color)',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
};