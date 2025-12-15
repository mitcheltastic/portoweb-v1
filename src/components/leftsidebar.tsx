"use client";

import { FaYoutube } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { motion } from "framer-motion";

const LeftSidebar = () => {
  // ⬇️ FIXED: 
  // - Base: Neutral Grey (Safe for both modes)
  // - Hover: Uses [var(--foreground)] to guarantee Black in Light / White in Dark
  const iconClass = "inline-block text-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-110 cursor-pointer p-2 " +
                    "text-neutral-500 " + 
                    "hover:text-[var(--foreground)]";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }} 
      className="hidden md:flex flex-col items-center fixed bottom-0 left-8 z-50"
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
      
      {/* Vertical Line - ⬇️ FIXED: Hardcoded hex/rgba for safety */}
      <div className="w-px h-24 mt-4" style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}></div>
    </motion.div>
  );
};

export default LeftSidebar;