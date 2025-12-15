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
        // ⬇️ UPDATED: 
        // - Base: Neutral-600 (Light) / Neutral-500 (Dark)
        // - Hover: Black (Light) / White (Dark)
        className="text-sm tracking-widest transition-all duration-300 ease-in-out hover:-translate-y-2 
                   text-neutral-600 dark:text-neutral-500 
                   hover:text-black dark:hover:text-white"
        style={{ writingMode: 'vertical-rl' }}
      >
        mitch.affandi22@gmail.com
      </a>
      
      {/* ⬇️ UPDATED: Line Color */}
      <div className="w-px h-24 mt-6 bg-neutral-400 dark:bg-neutral-700"></div>
    </motion.div>
  );
};

export default RightSidebar;