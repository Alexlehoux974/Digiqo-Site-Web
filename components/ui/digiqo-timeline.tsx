"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  year: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const DigiqoTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gradient-to-b from-white via-digiqo-gray-light to-white font-sans relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-digiqo-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-digiqo-primary via-digiqo-accent to-digiqo-primary bg-clip-text text-transparent">
            Notre Histoire
          </h3>
          <p className="text-digiqo-gray-dark text-lg md:text-xl max-w-3xl mx-auto">
            De la vision à la révolution digitale, découvrez comment Digiqo est devenue 
            la référence du marketing digital dans l'océan Indien.
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex justify-start pt-10 md:pt-32 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="relative">
                <motion.div 
                  className="h-16 md:h-20 w-16 md:w-20 absolute left-0 md:left-3 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 animate-pulse-subtle"
                    style={{ 
                      background: `radial-gradient(circle, ${item.accentColor || '#DA6530'}40 0%, transparent 70%)`
                    }} 
                  />
                  
                  {/* Icon */}
                  <div className="relative z-10 text-digiqo-primary">
                    {item.icon || (
                      <div className="h-6 w-6 rounded-full bg-digiqo-accent animate-glow-orange" />
                    )}
                  </div>
                </motion.div>
                
                {/* Year badge */}
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-digiqo-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.year}
                </motion.div>
              </div>
              
            </div>

            <div className="relative pl-24 pr-4 md:pl-4 w-full">
              <h3 className="text-2xl mb-4 text-left md:text-4xl md:mb-0 md:absolute md:-left-72 md:top-0 md:w-64 md:text-right font-bold text-digiqo-primary">
                {item.title}
              </h3>
              <motion.div
                className="bg-white rounded-2xl shadow-digiqo p-6 md:p-8 border border-digiqo-gray/20 hover:shadow-digiqo-lg transition-shadow duration-300"
                whileHover={{ y: -2 }}
              >
                {item.content}
              </motion.div>
            </div>
          </motion.div>
        ))}
        
        {/* Animated timeline line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-11 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-digiqo-gray to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-digiqo-accent via-digiqo-primary to-digiqo-accent rounded-full shadow-[0_0_10px_rgba(218,101,48,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};