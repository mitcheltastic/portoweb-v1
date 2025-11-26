"use client"; // client for animations

import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // Added imports for state/timing control
import BlurText from "./BlurText";

const HeroSection = () => {
  // State to track if the required delay (matching the splash screen) has passed
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    // Total duration of SplashScreen phases (300 + 3000 + 500 + 1500 + 800 = 6100ms)
    const SPLASH_DURATION_MS = 5600;

    // Start a timer to set the component state to 'ready' after the splash screen finishes
    const timer = setTimeout(() => {
      setIsReady(true);
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, []); // Run only on mount

  return (
    <section id="hero" className="min-h-[75vh] flex flex-col justify-center mb-24">
      {/* Conditionally render all animated content only after the splash screen delay */}
      {isReady && (
        <>
          {/* 1. "Hi, my name is" - Reverted to original fast delay (0.1s) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-accent mb-6 ml-1 font-mono text-base"
          >
            Hi, my name is
          </motion.p>

          {/* 2. "Mitch Affandi." - Reverted to original fast delay (0.2s) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate tracking-tight"
          >
            Mitchel Affandi.
          </motion.h1>

          {/* 3. Animated tagline (BlurText) - Reverted to original fast delay (120ms) */}
          <BlurText
            text="I build fast, thoughtful softwares - with just enough flair."
            delay={120} // Original stagger delay
            animateBy="words"
            direction="top"
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate mt-2 tracking-tight"
            onAnimationComplete={() => console.log("Hero tagline animation complete")}
          />

          {/* 4. Animated bio paragraph (BlurText) - Reverted to original fast delay (60ms) */}
          <BlurText
            text="I'm a software engineer specialising in backend & cloud engineering (sometimes full-stack), also interested in AI/ML. Currently pursuing my degree in Telecommunication Engineering at Telkom University."
            delay={60} // Original stagger delay
            animateBy="words"
            direction="top"
            className="max-w-xl mt-6 text-slate"
            // Optional fine-tuning:
            // stepDuration={0.28}
            // easing={(t) => t}
          />
        </>
      )}
    </section>
  );
};

export default HeroSection;