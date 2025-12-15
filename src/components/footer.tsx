"use client";

import { FiGithub, FiLinkedin, FiInstagram, FiGitCommit, FiMusic, FiArrowUp } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  
  // 1. Scroll to Top Function
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // ⬇️ UPDATED: Background & Border
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-950 py-12 relative overflow-hidden">
      
      {/* DECORATIVE: Background "Noise" */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* ⬇️ UPDATED: Text Color */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-mono text-neutral-600 dark:text-neutral-500 relative z-10">
        
        {/* 1. LEFT: SYSTEM STATUS & COPYRIGHT */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            <span className="tracking-widest text-[10px] uppercase text-neutral-500 dark:text-neutral-400">
              System Status: THINKING
            </span>
          </div>
          
          <span className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors">
            © 2025 Mitchel Mohamad Affandi.
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-700 tracking-widest uppercase">
            [ 終了 ] • End of Transmission
          </span>
        </div>

        {/* 2. CENTER: MOBILE SOCIALS (Visible on mobile) OR SCROLL TOP (Visible on Desktop) */}
        
        {/* Mobile Socials */}
        <div className="flex gap-6 md:hidden">
          <a href="https://github.com/mitcheltastic" target="_blank" rel="noreferrer" className="text-xl hover:text-black dark:hover:text-white transition-colors"><FiGithub /></a>
          <a href="https://linkedin.com/in/mitchaff" target="_blank" rel="noreferrer" className="text-xl hover:text-blue-600 dark:hover:text-white transition-colors"><FiLinkedin /></a>
          <a href="https://www.instagram.com/mtchffnd" target="_blank" rel="noreferrer" className="text-xl hover:text-pink-600 dark:hover:text-white transition-colors"><FiInstagram /></a>
          <a href="https://www.youtube.com/@MitchelAffandi" target="_blank" rel="noreferrer" className="text-xl hover:text-red-600 dark:hover:text-white transition-colors"><FaYoutube /></a>
        </div>

        {/* ⬇️ NEW: "RECALL" BUTTON (Scroll to Top) - Visible on Desktop */}
        <button 
          onClick={handleScrollToTop}
          className="hidden md:flex flex-col items-center gap-2 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* ⬇️ UPDATED: Button Colors */}
          <div className="w-10 h-10 border border-neutral-300 dark:border-neutral-800 rounded-full flex items-center justify-center 
                          bg-white dark:bg-neutral-900 
                          group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800 
                          group-hover:border-neutral-400 dark:group-hover:border-neutral-600 
                          group-hover:-translate-y-1 transition-all duration-300">
            <FiArrowUp className="text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white text-lg" />
          </div>
          <span className="text-[10px] tracking-widest uppercase text-neutral-500 dark:text-neutral-600 group-hover:text-neutral-800 dark:group-hover:text-neutral-400 transition-colors">
            Recall
          </span>
        </button>

        {/* 3. RIGHT: CREDITS & TECH STACK */}
        <div className="flex flex-col gap-2 items-center md:items-end text-center md:text-right">
          <a 
            href="https://github.com/mitcheltastic/portoweb-v1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors duration-300"
          >
            <span>Designed & Built by Mitch Affandi</span>
            <FiGitCommit />
          </a>
          
          <div className="flex items-center gap-3 text-[10px] text-neutral-500 dark:text-neutral-600">
            <span>Next.js</span>
            <span>•</span>
            <span>Tailwind</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>

          {/* ⬇️ UPDATED: Music Badge */}
          <div className="flex items-center gap-2 mt-1 px-2 py-1 
                          bg-white dark:bg-neutral-900 
                          rounded border border-neutral-300 dark:border-neutral-800 
                          text-[10px] text-neutral-500 dark:text-neutral-400">
            <FiMusic className="animate-pulse" />
            <span>Vibing to: Plastic Love - Mariya Takeuchi ‧ 1984</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;