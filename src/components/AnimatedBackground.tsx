"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  // Mouse position for interactive spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for cursor follower
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 3);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none bg-white dark:bg-black transition-colors duration-500"
    >
      {/* =========================================================================
          1. Uniform Seamless Full-Bleed Grid (No box borders or cut-offs)
         ========================================================================= */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60 dark:opacity-40 transition-opacity duration-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="seamless-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-300/70 dark:text-neutral-800/80 transition-colors duration-500"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#seamless-grid)" />
      </svg>

      {/* =========================================================================
          2. Interactive Mouse Glow (Full-Bleed Soft Halo)
         ========================================================================= */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 dark:opacity-60 transition-opacity duration-500"
        style={{
          left: springX,
          top: springY,
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 70%)",
        }}
      />

      {/* =========================================================================
          3. Floating Aurora Waves (Smooth Full-Screen Ambient Depth)
         ========================================================================= */}
      {/* Wave 1: Soft Cyan/Blue Aura */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-30, 30, -30],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-400/15 dark:bg-indigo-600/20 blur-[130px] transition-colors duration-500"
      />

      {/* Wave 2: Soft Purple/Violet Aura */}
      <motion.div
        animate={{
          x: [40, -40, 40],
          y: [30, -30, 30],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 h-[45rem] w-[45rem] translate-x-1/2 rounded-full bg-purple-400/15 dark:bg-purple-600/20 blur-[140px] transition-colors duration-500"
      />
    </div>
  );
}
