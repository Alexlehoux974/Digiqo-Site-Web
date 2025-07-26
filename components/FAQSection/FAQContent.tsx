import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQSection } from './faqData';
import { FAQAccordion } from './FAQAccordion';

interface FAQContentProps {
  section: FAQSection;
  isActive: boolean;
}

export const FAQContent: React.FC<FAQContentProps> = ({ section, isActive }) => {
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={section.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-4xl mx-auto px-4 py-4"
        >
          {/* FAQ Items */}
          <div className="space-y-4">
            {section.items.map((item, index) => (
              <motion.div
                key={`${section.id}-${index}`}
                variants={itemVariants}
                custom={index}
              >
                <FAQAccordion
                  question={item.question}
                  answer={item.answer}
                  color={section.color}
                  glowColor={section.glowColor}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};