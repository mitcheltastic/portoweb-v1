"use client"; // This component needs to be a client component for animations

import { motion } from 'framer-motion';

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

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        // Change text-lightest-slate to text-slate for the dimmer effect
        className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate mt-2 tracking-tight"
        >
        I build things for the web.
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-xl mt-6 text-slate"
      >
        I'm a software engineer specializing in backend engineering (sometimes I do fullstack), also interested in AI/ML. Currently pursuing my degree in Telecommunication Engineering at Telkom University.
      </motion.p>
    </section>
  );
};

export default HeroSection;