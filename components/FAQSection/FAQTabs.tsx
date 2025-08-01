import React from 'react';
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
  const activeColor = sections[activeIndex].color;

  return (
    <div className="relative">
      {/* Tab Bar Container */}
      <div className="relative w-full">
        <div className="relative w-full overflow-x-auto scrollbar-hide">
          <div className="relative flex items-center justify-start md:justify-center gap-4 p-4 min-w-max mx-auto">
          {sections.map((section, index) => {
            const Icon = tabIcons[index];
            const isActive = activeIndex === index;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => onTabChange(index)}
                className={`
                  relative z-20 flex items-center justify-center p-3 rounded-xl
                  transition-all duration-300 group
                  text-white
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
                  color="#FFFFFF"
                />
              </motion.button>
            );
          })}
          </div>
        </div>
      </div>

      {/* Fixed Central Lamp Effect */}
      <div className="relative h-60 -mt-8">
        {/* Light source - horizontal bar */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-20 w-64 h-3 rounded-full z-30"
          style={{
            background: activeColor,
            boxShadow: `
              0 0 40px ${activeColor},
              0 0 80px ${activeColor},
              0 0 120px ${activeColor}
            `,
            filter: 'brightness(2)',
          }}
        />
        
        {/* Light container with trapezoid mask for beam effect */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-20 overflow-hidden"
          style={{
            width: '1200px',
            height: '300px',
            clipPath: 'polygon(calc(50% - 128px) 0%, calc(50% + 128px) 0%, 100% 100%, 0% 100%)',
            WebkitClipPath: 'polygon(calc(50% - 128px) 0%, calc(50% + 128px) 0%, 100% 100%, 0% 100%)',
          }}
        >
          {/* Primary light emission */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 -top-40 w-[600px] h-[600px]"
            style={{
              background: `radial-gradient(circle at center top, 
                ${activeColor}FF 0%, 
                ${activeColor}BB 10%, 
                ${activeColor}88 20%, 
                ${activeColor}44 35%, 
                ${activeColor}22 50%, 
                transparent 70%)`,
              filter: 'blur(80px)',
            }}
            animate={{
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Secondary diffusion layer */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 -top-30 w-[500px] h-[500px]"
            style={{
              background: `radial-gradient(circle at center top, 
                ${activeColor}CC 0%, 
                ${activeColor}88 20%, 
                ${activeColor}44 40%, 
                transparent 65%)`,
              filter: 'blur(60px)',
              opacity: 0.8,
            }}
          />
          
          {/* Core bright spot */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 -top-20 w-[300px] h-[300px]"
            style={{
              background: `radial-gradient(circle at center, 
                rgba(255,255,255,0.9) 0%, 
                ${activeColor} 10%, 
                ${activeColor}BB 30%, 
                ${activeColor}66 50%, 
                transparent 70%)`,
              filter: 'blur(40px)',
              opacity: 0.9,
            }}
          />
          
          {/* Ambient scatter */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 -top-10 w-[700px] h-[600px]"
            style={{
              background: `radial-gradient(circle at center, 
                ${activeColor}33 0%, 
                ${activeColor}11 30%, 
                transparent 60%)`,
              filter: 'blur(100px)',
              opacity: 0.6,
            }}
          />
        </div>
        
        {/* Light reflection on surface */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[400px] h-[150px]"
          style={{
            background: `radial-gradient(ellipse at center, 
              ${activeColor}66 0%, 
              ${activeColor}44 25%, 
              ${activeColor}22 50%, 
              transparent 75%)`,
            filter: 'blur(30px)',
            transform: 'translateY(50%) scaleY(0.5)',
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scaleX: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};