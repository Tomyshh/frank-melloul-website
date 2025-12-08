"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".word");

      gsap.set(words, { opacity: 0, y: 50 });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 2.3,
      });
    }
  }, [t]);

  const words = t.hero.title.split(" ");
  const highlightWords = t.hero.highlightWords;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl">
          {/* Company name with special styling */}
          <motion.div
            className="mb-8 flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            <span className="text-gold-400 font-sans text-base md:text-lg tracking-[0.3em] uppercase">
              {t.hero.companyName}
            </span>
            <span className="w-12 h-[1px] bg-gold-400" />
          </motion.div>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light leading-[1.2] tracking-tight text-primary-100/90"
          >
            {words.map((word, index) => {
              const isHighlight = highlightWords.some(
                (hw) => word.toLowerCase().startsWith(hw.toLowerCase().replace(",", ""))
              );
              return (
                <span
                  key={index}
                  className="word inline-block mr-[0.25em]"
                  style={{
                    color: isHighlight ? "#d4af37" : undefined,
                    fontWeight: isHighlight ? 400 : 300,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </h1>
        </div>
      </motion.div>

      {/* Scroll indicator - positioned at bottom of section */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-primary-400 text-xs tracking-widest uppercase">
            {t.hero.discover}
          </span>
          <svg
            className="w-6 h-6 text-gold-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-72 h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 162, 19, 0.05) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 162, 19, 0.03) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
