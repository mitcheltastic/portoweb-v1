"use client";

import { useState, useRef, useEffect } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { SiMyanimelist } from 'react-icons/si';
import { motion, AnimatePresence } from "framer-motion";
import SocialPreviewCard from './SocialPreviewCard';

const LeftSidebar = () => {
  const [activeSocial, setActiveSocial] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (social: string) => {
    console.log(`[Sidebar] Mouse enter: ${social}`);
    setHoveredSocial(social);
    
    if (hideTimeoutRef.current) {
      console.log(`[Sidebar] Cancelling pending hide timeout`);
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    if (activeSocial === social) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    console.log(`[Sidebar] Starting 1s hover timer for: ${social}`);
    hoverTimeoutRef.current = setTimeout(() => {
      console.log(`[Sidebar] 1s hover timer fired, setting active social to: ${social}`);
      setActiveSocial(social);
    }, 500);
  };

  const handleMouseLeave = () => {
    console.log(`[Sidebar] Mouse leave`);
    setHoveredSocial(null);
    
    if (hoverTimeoutRef.current) {
      console.log(`[Sidebar] Cancelling pending show timer`);
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      console.log(`[Sidebar] Hide timer fired, clearing active social`);
      setActiveSocial(null);
    }, 300); // 300ms buffer to allow moving cursor to the card
  };

  const handleCardMouseEnter = () => {
    console.log(`[Sidebar] Card mouse enter`);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  // Base icon styles (modified to use group-hover and prevent pointer events)
  const childIconClass = "inline-block text-2xl transition-all duration-300 ease-in-out " +
                         "group-hover:-translate-y-2 group-hover:scale-110 pointer-events-none " +
                         "text-neutral-500 " + 
                         "group-hover:text-[var(--foreground)]";

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }} 
      className="hidden md:flex flex-col items-center fixed bottom-0 left-8 z-50"
    >
      <ul className="flex flex-col items-center space-y-2 relative">
        {/* GitHub */}
        <li 
          className="group w-12 h-12 flex items-center justify-center relative cursor-pointer"
          onMouseEnter={() => handleMouseEnter("github")} 
          onMouseLeave={handleMouseLeave}
          onClick={() => handleSocialClick("https://github.com/mitcheltastic")}
        >
          {/* Progress Circular Fill Behind Icon */}
          <div className="absolute w-10 h-10 rounded-full border border-neutral-500/10 dark:border-neutral-400/5 bg-neutral-500/5 overflow-hidden z-0 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110">
            <motion.div
              initial={{ height: "0%" }}
              animate={hoveredSocial === "github" ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.0, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 bg-neutral-950/20 dark:bg-white/20"
            />
          </div>

          <a 
            href="https://github.com/mitcheltastic" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${childIconClass} relative z-10`}
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
        </li>

        {/* LinkedIn */}
        <li 
          className="group w-12 h-12 flex items-center justify-center relative cursor-pointer"
          onMouseEnter={() => handleMouseEnter("linkedin")} 
          onMouseLeave={handleMouseLeave}
          onClick={() => handleSocialClick("https://linkedin.com/in/mitchaff")}
        >
          {/* Progress Circular Fill Behind Icon */}
          <div className="absolute w-10 h-10 rounded-full border border-neutral-500/10 dark:border-neutral-400/5 bg-neutral-500/5 overflow-hidden z-0 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110">
            <motion.div
              initial={{ height: "0%" }}
              animate={hoveredSocial === "linkedin" ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.0, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 bg-neutral-950/20 dark:bg-white/20"
            />
          </div>

          <a 
            href="https://linkedin.com/in/mitchaff" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${childIconClass} relative z-10`}
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
        </li>

        {/* Instagram */}
        <li 
          className="group w-12 h-12 flex items-center justify-center relative cursor-pointer"
          onMouseEnter={() => handleMouseEnter("instagram")} 
          onMouseLeave={handleMouseLeave}
          onClick={() => handleSocialClick("https://www.instagram.com/mtchffnd")}
        >
          {/* Progress Circular Fill Behind Icon */}
          <div className="absolute w-10 h-10 rounded-full border border-neutral-500/10 dark:border-neutral-400/5 bg-neutral-500/5 overflow-hidden z-0 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110">
            <motion.div
              initial={{ height: "0%" }}
              animate={hoveredSocial === "instagram" ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.0, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 bg-neutral-950/20 dark:bg-white/20"
            />
          </div>

          <a 
            href="https://www.instagram.com/mtchffnd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${childIconClass} relative z-10`}
            aria-label="Instagram"
          >
            <FiInstagram />
          </a>
        </li>

        {/* YouTube */}
        <li 
          className="group w-12 h-12 flex items-center justify-center relative cursor-pointer"
          onMouseEnter={() => handleMouseEnter("youtube")} 
          onMouseLeave={handleMouseLeave}
          onClick={() => handleSocialClick("https://www.youtube.com/@MitchelAffandi")}
        >
          {/* Progress Circular Fill Behind Icon */}
          <div className="absolute w-10 h-10 rounded-full border border-neutral-500/10 dark:border-neutral-400/5 bg-neutral-500/5 overflow-hidden z-0 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110">
            <motion.div
              initial={{ height: "0%" }}
              animate={hoveredSocial === "youtube" ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.0, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 bg-neutral-950/20 dark:bg-white/20"
            />
          </div>

          <a 
            href="https://www.youtube.com/@MitchelAffandi" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${childIconClass} relative z-10`}
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </li>

        {/* MyAnimeList */}
        <li 
          className="group w-12 h-12 flex items-center justify-center relative cursor-pointer"
          onMouseEnter={() => handleMouseEnter("myanimelist")} 
          onMouseLeave={handleMouseLeave}
          onClick={() => handleSocialClick("https://myanimelist.net/profile/MitchSenpai22")}
        >
          {/* Progress Circular Fill Behind Icon */}
          <div className="absolute w-10 h-10 rounded-full border border-neutral-500/10 dark:border-neutral-400/5 bg-neutral-500/5 overflow-hidden z-0 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-110">
            <motion.div
              initial={{ height: "0%" }}
              animate={hoveredSocial === "myanimelist" ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.0, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 bg-neutral-950/20 dark:bg-white/20"
            />
          </div>

          <a 
            href="https://myanimelist.net/profile/MitchSenpai22" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${childIconClass} relative z-10`}
            aria-label="MyAnimeList"
          >
            <SiMyanimelist />
          </a>
        </li>
      </ul>
      
      {/* Vertical Line */}
      <div className="w-px h-24 mt-4" style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}></div>

      {/* Floating Preview Card Overlay */}
      <AnimatePresence>
        {activeSocial && (
          <SocialPreviewCard 
            key={activeSocial}
            social={activeSocial} 
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LeftSidebar;