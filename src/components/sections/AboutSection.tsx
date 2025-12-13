"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />

      {/* Decorative element */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[400px] opacity-10"
        style={{ y }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(201, 162, 19, 0.3) 50%, transparent 100%)",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section title */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="w-6 h-[1px] bg-gold-400" />
          <h2 className="text-lg md:text-xl font-sans font-medium text-primary-200 tracking-wide">
            {t.about.title}
          </h2>
        </motion.div>

        {/* Content sections with titles */}
        <div className="space-y-16">
          {t.about.sections.map((section, index) => (
            <motion.div
              key={index}
              className="max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
            >
              {/* Section subtitle */}
              <h3 className="text-gold-400 text-sm md:text-base font-medium tracking-wide uppercase mb-4">
                {section.title}
              </h3>
              {/* Section content */}
              <p className="text-primary-300 leading-relaxed text-base md:text-lg">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Values section */}
        <motion.div
          className="mt-24 pt-16 border-t border-gold-500/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Values title */}
          <motion.h3
            className="text-gold-400 text-sm md:text-base font-medium tracking-wide uppercase mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {t.about.valuesTitle}
          </motion.h3>

          {/* Values grid - Professional layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {t.about.values.map((value, index) => (
              <motion.div
                key={value.number}
                className="group relative p-6 bg-navy-900/30 border border-gold-500/10 rounded-sm hover:border-gold-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                {/* Number badge */}
                <span className="absolute -top-3 left-6 bg-navy-950 px-2 text-gold-400 text-xs tracking-widest font-medium">
                  {value.number}
                </span>
                
                {/* Value title */}
                <h4 className="text-lg font-medium text-primary-100 mb-3 group-hover:text-gold-400 transition-colors duration-300">
                  {value.title}
                </h4>
                
                {/* Value description */}
                <p className="text-primary-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
