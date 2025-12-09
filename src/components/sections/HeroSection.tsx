"use client";

import { useEffect, useRef, useMemo, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

// Pre-computed particle positions for performance (reduced from 20 to 8)
const PARTICLES = [
  { left: 15, top: 20, duration: 6, delay: 0 },
  { left: 45, top: 35, duration: 7, delay: 1 },
  { left: 75, top: 15, duration: 8, delay: 2 },
  { left: 25, top: 70, duration: 6.5, delay: 1.5 },
  { left: 85, top: 55, duration: 7.5, delay: 0.5 },
  { left: 55, top: 80, duration: 6, delay: 2.5 },
  { left: 10, top: 50, duration: 8, delay: 3 },
  { left: 65, top: 45, duration: 7, delay: 1.8 },
];

function HeroSection() {
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
      const ctx = gsap.context(() => {
        gsap.set(words, { opacity: 0, y: 50 });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 2.3,
        });
      });
      return () => ctx.revert();
    }
  }, [t]);

  const words = useMemo(() => t.hero.title.split(" "), [t.hero.title]);
  const highlightWords = t.hero.highlightWords;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />

      {/* Animated background particles - optimized with fixed positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-500/20 rounded-full will-change-transform"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
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
            className="mb-8 flex items-center gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            <span className="text-gold-400 font-sans text-2xl md:text-3xl lg:text-4xl tracking-[0.2em] uppercase font-medium">
              {t.hero.companyName}
            </span>
            <span className="text-primary-200 font-sans text-xl md:text-2xl lg:text-3xl tracking-[0.15em] uppercase">
              Global Advisory
            </span>
          </motion.div>

          {/* Main title - reduced size */}
          <h1
            ref={titleRef}
            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-light leading-[1.3] tracking-tight text-primary-100/90"
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

      {/* Decorative elements - CSS animations for better performance */}
      <div
        className="absolute top-1/4 right-10 w-72 h-72 rounded-full animate-pulse-slow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 162, 19, 0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full animate-pulse-slower pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 162, 19, 0.03) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}

export default memo(HeroSection);
