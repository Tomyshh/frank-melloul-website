"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
}

export default function ParallaxText({
  children,
  baseVelocity = 5,
}: ParallaxTextProps) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  
  const scrollVelocity = useTransform(scrollY, [0, 1000], [0, baseVelocity * 100]);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  
  const x = useTransform(smoothVelocity, (v) => {
    return `${-v % 100}%`;
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        style={{ x }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl font-serif text-gold-500/10 uppercase tracking-wider"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

