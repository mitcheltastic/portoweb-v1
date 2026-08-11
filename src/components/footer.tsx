"use client";

import { FiGithub, FiLinkedin, FiInstagram, FiGitCommit, FiMusic, FiArrowUp } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { SiMyanimelist } from "react-icons/si";

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
    // ⬇️ FIXED: Using [var(--background)] ensures it follows the Toggle, ignoring System Preference
    <footer 
      className="mt-auto py-12 relative overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-black/40 backdrop-blur-md transition-colors duration-300"
    >

      {/* ⬇️ FIXED: Text color relies on foreground variable */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-mono relative z-10 text-[var(--foreground)] opacity-80">
        
        {/* 1. LEFT: SYSTEM STATUS & COPYRIGHT */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            <span className="tracking-widest text-[10px] uppercase opacity-60">
              System Status: THINKING
            </span>
          </div>
          
          <span className="hover:opacity-100 transition-opacity">
            © 2025 Mitchel Mohamad Affandi.
          </span>
          <span className="text-[10px] opacity-60 tracking-widest uppercase">
            [ 終了 ] • End of Transmission
          </span>
        </div>

        {/* 2. CENTER: MOBILE SOCIALS (Visible on mobile) */}
        <div className="flex gap-6 md:hidden">
          <a href="https://github.com/mitcheltastic" target="_blank" rel="noreferrer" className="text-xl hover:text-[var(--foreground)] transition-colors"><FiGithub /></a>
          <a href="https://linkedin.com/in/mitchaff" target="_blank" rel="noreferrer" className="text-xl hover:text-blue-600 transition-colors"><FiLinkedin /></a>
          <a href="https://www.instagram.com/mtchffnd" target="_blank" rel="noreferrer" className="text-xl hover:text-pink-600 transition-colors"><FiInstagram /></a>
          <a href="https://www.youtube.com/@MitchelAffandi" target="_blank" rel="noreferrer" className="text-xl hover:text-red-600 transition-colors"><FaYoutube /></a>
          <a href="https://myanimelist.net/profile/MitchSenpai22" target="_blank" rel="noreferrer" className="text-xl hover:text-[#2e51a2] transition-colors" aria-label="MyAnimeList"><SiMyanimelist /></a>
        </div>

        {/* RECALL BUTTON (Scroll to Top) - Desktop */}
        <button 
          onClick={handleScrollToTop}
          className="hidden md:flex flex-col items-center gap-2 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* ⬇️ FIXED: Using CSS Variables for Borders/Bg to guarantee sync */}
          <div 
            className="w-10 h-10 border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-full flex items-center justify-center 
                       transition-all duration-300 group-hover:-translate-y-1 shadow-sm"
          >
            <FiArrowUp className="text-[var(--foreground)] text-lg" />
          </div>
          <span className="text-[10px] tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            Recall
          </span>
        </button>

        {/* 3. RIGHT: CREDITS & TECH STACK */}
        <div className="flex flex-col gap-2 items-center md:items-end text-center md:text-right">
          <a 
            href="https://github.com/mitcheltastic/portoweb-v1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-100 transition-opacity duration-300"
          >
            <span>Designed & Built by Mitch Affandi</span>
            <FiGitCommit />
          </a>
          
          <div className="flex items-center gap-3 text-[10px] opacity-60">
            <span>Next.js</span>
            <span>•</span>
            <span>Tailwind</span>
            <span>•</span>
            <span>Framer Motion</span>
          </div>

          {/* Music Badge */}
          <div 
            className="flex items-center gap-2 mt-1 px-2.5 py-1 rounded-full border border-neutral-300/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-neutral-600 dark:text-neutral-400"
          >
            <FiMusic className="animate-pulse text-blue-500" />
            <span className="text-[10px]">Vibing to: Plastic Love - Mariya Takeuchi ‧ 1984</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;