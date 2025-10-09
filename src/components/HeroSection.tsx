"use client"; // client for animations

import { motion } from "framer-motion";
import BlurText from "./BlurText";

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-[75vh] flex flex-col justify-center mb-24">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-accent mb-6 ml-1 font-mono text-base"
      >
        Hi, my name is
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate tracking-tight"
      >
        Mitch Affandi.
      </motion.h1>

      {/* Animated tagline */}
      <BlurText
        text="I build fast, thoughtful web apps—with just enough flair."
        delay={120}
        animateBy="words"
        direction="top"
        className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate mt-2 tracking-tight"
        onAnimationComplete={() => console.log("Hero tagline animation complete")}
      />

      {/* Animated bio paragraph (word-by-word) */}
      <BlurText
        text="I'm a software engineer specialising in backend engineering (sometimes full-stack), also interested in AI/ML. Currently pursuing my degree in Telecommunication Engineering at Telkom University."
        delay={60}                 // a touch quicker than the headline
        animateBy="words"          // or "chars" if you want finer granularity
        direction="top"
        className="max-w-xl mt-6 text-slate"
        // Optional fine-tuning:
        // stepDuration={0.28}
        // easing={(t) => t}
      />
    </section>
  );
};

export default HeroSection;
