import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FAQAccordionProps {
  question: string;
  answer: string;
  color: string;
  glowColor: string;
  index: number;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  question, 
  answer, 
  color, 
  glowColor,
  index 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatAnswer = (text: string) => {
    // Function to parse markdown bold syntax
    const parseBold = (str: string) => {
      const parts = str.split(/\*\*(.+?)\*\*/g);
      return parts.map((part, i) => {
        // Odd indices are the bold parts
        if (i % 2 === 1) {
          return <strong key={i} className="font-bold text-white">{part}</strong>;
        }
        return part;
      });
    };

    return text.split('\n').map((line, idx) => {
      if (line.trim() === '') return <br key={idx} />;
      if (line.startsWith('•')) {
        return (
          <li key={idx} className="ml-4 mb-2 list-none">
            <span style={{ color }} className="mr-2">▸</span>
            {parseBold(line.substring(1).trim())}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        const [number, ...rest] = line.split('.');
        const content = rest.join('.');
        return (
          <li key={idx} className="ml-4 mb-2 list-none">
            <span style={{ color }} className="font-semibold">{number}.</span>
            {parseBold(content)}
          </li>
        );
      }
      return <p key={idx} className="mb-2">{parseBold(line)}</p>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        border border-white/10 rounded-lg overflow-hidden
        transition-all duration-300
        ${isOpen ? 'bg-black/40 backdrop-blur-sm' : 'bg-black/20'}
      `}
      style={{
        borderColor: isOpen ? color : 'transparent',
        boxShadow: isOpen ? `0 0 20px ${glowColor}` : 'none',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h4 className="text-lg font-semibold text-white pr-4">
          {question}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <Plus 
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isOpen ? color : '#9CA3AF' }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: "easeOut" },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <div 
                className="h-0.5 w-16 mb-4 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                  boxShadow: `0 0 10px ${glowColor}`,
                }}
              />
              <div className="text-white/90 leading-relaxed">
                {formatAnswer(answer)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};