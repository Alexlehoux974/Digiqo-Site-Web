import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQTabs } from './FAQTabs';
import { FAQContent } from './FAQContent';
import { faqSections } from './faqData';
import { SectionDivider } from '../SectionDivider';

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = faqSections[activeIndex];

  return (
    <section className="relative bg-gradient-to-b from-gray-950 via-black to-gray-950 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${activeSection.color}, transparent)`,
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${activeSection.color}, transparent)`,
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-digiqo-primary to-digiqo-accent">
              Questions Fréquentes
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos services et notre fonctionnement
          </p>
        </motion.div>

        {/* FAQ Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-0"
        >
          <FAQTabs 
            sections={faqSections}
            activeIndex={activeIndex}
            onTabChange={setActiveIndex}
          />
        </motion.div>

        {/* FAQ Content with negative margin to overlap with spotlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="min-h-[400px] -mt-20 relative z-10"
        >
          {faqSections.map((section, index) => (
            <FAQContent
              key={section.id}
              section={section}
              isActive={activeIndex === index}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-digiqo-accent/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contactez-nous
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      <SectionDivider variant="wave" className="mt-20" />
    </section>
  );
};