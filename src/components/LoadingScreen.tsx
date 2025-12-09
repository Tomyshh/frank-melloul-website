"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    // Preload the logo image
    const img = new window.Image();
    img.src = "/only_gold_logo.png";
    img.onload = () => setIsLogoLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-navy-950 z-[10000] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLogoLoaded ? 1 : 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.98, 1, 0.98],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Using native img to avoid Next.js image optimization placeholder */}
              <img
                src="/only_gold_logo.png"
                alt="Melloul & Partners"
                width={360}
                height={360}
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-[1px] bg-gold-500/30 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gold-500"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

