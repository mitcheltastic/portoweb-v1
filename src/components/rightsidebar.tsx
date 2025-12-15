"use client";

import { motion } from "framer-motion";

const RightSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="hidden md:flex flex-col items-center fixed bottom-0 right-8 z-50"
    >
      <a 
        href="mailto:mitch.affandi22@gmail.com" 
        // ⬇️ FIXED: 
        // - Base: Neutral Grey (Safe for both)
        // - Hover: Uses [var(--foreground)] to guarantee Black in Light / White in Dark
        className="text-sm tracking-widest transition-all duration-300 ease-in-out hover:-translate-y-2 
                   text-neutral-500 
                   hover:text-[var(--foreground)]"
        style={{ writingMode: 'vertical-rl' }}
      >
        mitch.affandi22@gmail.com
      </a>
      
      {/* ⬇️ FIXED: Hardcoded rgba for the line to ensure visibility on both backgrounds */}
      <div className="w-px h-24 mt-6" style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}></div>
    </motion.div>
  );
};

export default RightSidebar;