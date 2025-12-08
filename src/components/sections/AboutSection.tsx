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
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="w-6 h-[1px] bg-gold-400" />
          <h2 className="text-lg md:text-xl font-sans font-medium text-primary-200 tracking-wide">
            {t.about.title}
          </h2>
        </motion.div>

        {/* Main statement - Full width */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-serif text-primary-100/90 leading-relaxed max-w-4xl">
            {t.about.mainText}
          </p>
        </motion.div>

        {/* Details - Two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {t.about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              className="text-primary-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Key values */}
        <motion.div
          className="mt-20 pt-20 border-t border-gold-500/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-12">
            {t.about.values.map((value, index) => (
              <motion.div
                key={value.number}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <span className="text-gold-400 text-xs tracking-widest mb-3 block font-medium">
                  {value.number}
                </span>
                <h4 className="text-base font-medium text-primary-100 mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {value.title}
                </h4>
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
