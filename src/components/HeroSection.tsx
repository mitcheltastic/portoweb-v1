"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMapPin, FiCpu, FiTerminal } from "react-icons/fi";

const HeroSection = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Total duration matching your Splash Screen
    const SPLASH_DURATION_MS = 5600;
    const timer = setTimeout(() => {
      setIsReady(true);
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col pt-32 pb-20 px-6 md:px-0 mb-24 overflow-hidden"
    >
      
      {/* 1. BACKGROUND GRID */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,var(--background))]" />
      </div>

      {isReady && (
        <div className="max-w-4xl mx-auto w-full z-10">
          
          {/* 2. TERMINAL HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm mb-8 flex items-center gap-2
                       /* Safe Mid-Grey for both modes */
                       text-neutral-500"
          >
            <span className="text-accent">root@mitch-system:~$</span>
            {/* ⬇️ FIXED: Uses variable to guarantee Black in Light Mode */}
            <span className="typing-cursor text-[var(--foreground)]">./init_portfolio.sh</span>
          </motion.div>

          {/* 3. THE INTRO */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono mb-4 text-base tracking-wide
                       /* Light: Dark Grey | Dark: Light Grey */
                       text-neutral-600 dark:text-neutral-400"
          >
            // Hi, my name is
          </motion.p>

          {/* 4. THE NAME */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-4
                       /* ⬇️ FIXED: Forces correct contrast based on background */
                       text-[var(--foreground)]"
          >
            Mitchel Affandi<span className="text-accent">.</span>
            
            {/* SUBTLETIES (Japanese Name) */}
            <span className="block text-lg sm:text-xl font-normal font-mono mt-2 tracking-widest opacity-70
                             /* Light: Mid Grey (Visible) | Dark: Mid Grey (Subtle) */
                             text-neutral-500 dark:text-neutral-600"
            >
              ( ミッチェル・アファンディ )
            </span>
          </motion.h1>

          {/* 5. THE TAGLINE */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl sm:text-5xl font-bold mb-8
                       /* Light: Dark Grey | Dark: Light Grey */
                       text-neutral-600 dark:text-neutral-400"
          >
            Architecting <span className="text-[var(--foreground)]">Scalable Solutions</span>.
          </motion.h2>

          {/* 6. THE BIO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="max-w-xl leading-relaxed text-lg mb-10
                       /* Light: Dark Grey | Dark: Light Grey */
                       text-neutral-600 dark:text-neutral-400"
          >
            <p>
              I am a <span className="text-[var(--foreground)] font-medium">Backend & Cloud Engineer</span> focused on high-performance infrastructure. 
              Currently decoding the gap between hardware and software at <span className="text-[var(--foreground)] font-medium">Telkom University</span>.
            </p>
          </motion.div>

          {/* 7. SYSTEM METADATA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-6 font-mono text-xs sm:text-sm border-t pt-6 mt-12
                       /* Light: Mid-Grey Text, Light Border */
                       text-neutral-500 border-neutral-200 
                       /* Dark: Mid-Grey Text, Dark Border */
                       dark:text-neutral-500 dark:border-neutral-800"
          >
            <div className="flex items-center gap-2">
              <FiCpu className="text-accent" />
              <span>GPA: 4.00 / 4.00</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTerminal className="text-accent" />
              <span>STACK: GOLANG • REDIS • GCP</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="text-accent" />
              <span>LOC: BANDUNG, ID</span>
            </div>
          </motion.div>

        </div>
      )}
    </section>
  );
};

export default HeroSection;