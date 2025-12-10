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
    // ⬇️ CHANGED: Removed 'justify-center', added 'pt-32' (moves content up) and 'pb-20'
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
            className="font-mono text-sm text-neutral-500 mb-8 flex items-center gap-2"
          >
            <span className="text-accent">root@mitch-system:~$</span>
            <span className="typing-cursor">./init_portfolio.sh</span>
          </motion.div>

          {/* 3. THE INTRO */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 font-mono mb-4 text-base tracking-wide"
          >
            // Hi, my name is
          </motion.p>

          {/* 4. THE NAME */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tighter mb-4"
          >
            Mitchel Affandi<span className="text-accent">.</span>
            <span className="block text-lg sm:text-xl font-normal font-mono text-neutral-600 mt-2 tracking-widest opacity-70">
              ( ミッチェル・アファンディ )
            </span>
          </motion.h1>

          {/* 5. THE TAGLINE */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl sm:text-5xl font-bold text-neutral-400 mb-8"
          >
            {/* ⬇️ CHANGED: More general wording */}
            Architecting <span className="text-white">Scalable Solutions</span>.
          </motion.h2>

          {/* 6. THE BIO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="max-w-xl text-neutral-400 leading-relaxed text-lg mb-10"
          >
            <p>
              I am a <span className="text-white">Backend & Cloud Engineer</span> focused on high-performance infrastructure. 
              Currently decoding the gap between hardware and software at <span className="text-white">Telkom University</span>.
            </p>
          </motion.div>

          {/* 7. SYSTEM METADATA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-6 font-mono text-xs sm:text-sm text-neutral-500 border-t border-neutral-800 pt-6 mt-12"
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