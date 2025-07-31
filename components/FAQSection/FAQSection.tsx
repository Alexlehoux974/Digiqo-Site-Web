import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FAQTabs } from './FAQTabs';
import { FAQContent } from './FAQContent';
import { faqSections } from './faqData';
import { SectionDivider } from '../SectionDivider';

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = faqSections[activeIndex];

  return (
    <section id="faq" className="relative bg-gradient-to-b from-digiqo-primary via-red-950 to-black py-12 overflow-hidden">
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
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">
              Questions Fréquentes
            </span>
          </h2>
          <div className="w-24 h-1 bg-digiqo-secondary mx-auto mb-3 rounded-full" />
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos services et notre fonctionnement
          </p>
        </motion.div>

        {/* Active Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-4"
        >
          <h3 
            className="text-3xl font-bold relative inline-block"
            style={{ 
              color: '#FFFFFF',
              filter: 'brightness(1.2)',
              textShadow: `
                0 0 20px ${activeSection.color},
                0 0 40px ${activeSection.color},
                0 0 60px ${activeSection.glowColor},
                0 2px 4px rgba(0,0,0,0.5)
              `,
            }}
          >
            {activeSection.title}
          </h3>
        </motion.div>
      </div>

      {/* FAQ Navigation - Outside container for full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-0 relative z-10"
      >
        <FAQTabs 
          sections={faqSections}
          activeIndex={activeIndex}
          onTabChange={setActiveIndex}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* FAQ Content with negative margin to overlap with spotlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="min-h-[300px] -mt-24 relative z-10"
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
          className="text-center mt-8"
        >
          <p className="text-gray-400 mb-6">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <Link href="/contact">
            <motion.span
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-digiqo-primary to-digiqo-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-digiqo-accent/25 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactez-nous
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <SectionDivider variant="wave" className="mt-20" />
    </section>
  );
};