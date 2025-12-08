"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleHoverStart = useCallback(() => setIsHovering(true), []);
  const handleHoverEnd = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    // Check for touch device on client side only
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Use event delegation instead of attaching to each element
    const handleDocumentMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, .magnetic-button')) {
        handleHoverStart();
      }
    };

    const handleDocumentMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, .magnetic-button') &&
        !relatedTarget?.closest('a, button, [role="button"], input, textarea, select, .magnetic-button')
      ) {
        handleHoverEnd();
      }
    };

    document.addEventListener("mouseover", handleDocumentMouseOver, { passive: true });
    document.addEventListener("mouseout", handleDocumentMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleDocumentMouseOver);
      document.removeEventListener("mouseout", handleDocumentMouseOut);
    };
  }, [cursorX, cursorY, isVisible, handleHoverStart, handleHoverEnd]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outline */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-gold-500 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.6 : 0,
          backgroundColor: isHovering
            ? "rgba(201, 162, 19, 0.1)"
            : "transparent",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

export default memo(CustomCursor);

