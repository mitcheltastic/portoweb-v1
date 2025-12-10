"use client";

import { FaYoutube } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { motion } from "framer-motion"; // 1. Import Framer Motion

const LeftSidebar = () => {
  const iconClass = "inline-block text-neutral-500 hover:text-white text-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-110 cursor-pointer p-2";

  return (
    // 2. Change to motion.div for entrance animation
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }} // High delay so it enters AFTER the hero text
      className="hidden md:flex flex-col items-center fixed bottom-0 left-8 z-50" // z-50 to ensure it stays on top
    >
      <ul className="flex flex-col items-center space-y-2">
        {/* GitHub */}
        <li>
          <a 
            href="https://github.com/mitcheltastic" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={iconClass}
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
        </li>

        {/* LinkedIn */}
        <li>
          <a 
            href="https://linkedin.com/in/mitchaff" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={iconClass}
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
        </li>

        {/* Instagram */}
        <li>
          <a 
            href="https://www.instagram.com/mtchffnd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={iconClass}
            aria-label="Instagram"
          >
            <FiInstagram />
          </a>
        </li>

        {/* YouTube */}
        <li>
          <a 
            href="https://www.youtube.com/@MitchelAffandi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={iconClass}
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </li>
      </ul>
      
      {/* Vertical Line - Updated color to match theme */}
      <div className="w-px h-24 bg-neutral-700 mt-4"></div>
    </motion.div>
  );
};

export default LeftSidebar;