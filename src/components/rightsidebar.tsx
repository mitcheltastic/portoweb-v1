"use client";

import { motion } from "framer-motion";

const RightSidebar = () => {
  return (
    // 1. Change to motion.div for entrance animation
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }} // Matches LeftSidebar delay
      className="hidden md:flex flex-col items-center fixed bottom-0 right-8 z-50"
    >
      <a 
        href="mailto:mitch.affandi22@gmail.com" 
        // 2. Updated colors to neutral-500 -> white to match the rest of the site
        className="text-neutral-500 hover:text-white text-sm tracking-widest transition-all duration-300 ease-in-out hover:-translate-y-2"
        style={{ writingMode: 'vertical-rl' }}
      >
        mitch.affandi22@gmail.com
      </a>
      
      {/* 3. Updated line color to neutral-700 */}
      <div className="w-px h-24 bg-neutral-700 mt-6"></div>
    </motion.div>
  );
};

export default RightSidebar;