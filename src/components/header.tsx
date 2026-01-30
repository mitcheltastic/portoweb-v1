"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Smooth Scroll
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false); 
  };

  // 2. Handle Navbar Hide/Show on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobileMenuOpen) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // 3. Navigation Items Data
  const NAV_ITEMS = [
    { num: "01", name: "About", href: "#about" },
    { num: "02", name: "Experience", href: "#experience" },
    { num: "03", name: "Work", href: "#projects" },
    { num: "04", name: "Tech", href: "#tech" },
    { num: "05", name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 
                    bg-header-bg backdrop-blur-md 
                    border-b border-neutral-200 dark:border-neutral-800 shadow-lg
                    transition-transform duration-300 ease-in-out ${
                      show ? "translate-y-0" : "-translate-y-full"
                    }`}
      >
        {/* DECORATIVE: Subtle Grid Noise */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <nav className="relative flex justify-between items-center max-w-7xl mx-auto z-10">
          
          {/* --- LOGO + NAME --- */}
          <Link 
            href="/" 
            onClick={handleScrollToTop} 
            className="group flex items-center gap-3 z-50"
          >
            {/* Logo Wrapper */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-header-border bg-background z-[-1]" />
              <div
                className="relative z-10 flex items-center justify-center w-full h-full 
                           border border-neutral-400 dark:border-neutral-500 rounded-full bg-black 
                           transition-transform duration-300 ease-in-out 
                           group-hover:-translate-x-1 group-hover:-translate-y-1 
                           group-hover:bg-neutral-200 group-hover:border-white"
              >
                <Image
                  src="/MitchLogo.png"
                  alt="Logo"
                  width={38}
                  height={38}
                  className="rounded-full group-hover:invert transition-all duration-200 scale-90"
                />
              </div>
            </div>

            {/* Name & Status Label */}
            <div className="flex flex-col justify-center">
              <span className="font-bold text-base text-[var(--foreground)] tracking-wide leading-none group-hover:text-neutral-500 transition-colors">
                MitchAffandi<span className="text-accent">.</span>
              </span>
              <span className="text-[9px] text-neutral-500 font-mono tracking-widest uppercase mt-0.5 group-hover:text-accent transition-colors">
                [ DEV_PROFILE ]
              </span>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center space-x-8">
            <ol className="flex items-center space-x-6 lg:space-x-8 text-xs font-mono list-none">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1 transition-colors duration-300
                               text-neutral-500 
                               hover:text-[var(--foreground)]"
                  >
                    <span className="text-accent transition-colors 
                                   group-hover:text-[var(--foreground)]">
                      //
                    </span>
                    <span className="relative group-hover:translate-x-1 transition-transform duration-300">
                      {item.num}. {item.name}
                      
                      <span className="absolute left-0 -bottom-1 w-0 h-[1px] 
                                     bg-[var(--foreground)]
                                     transition-all duration-300 ease-in-out
                                     group-hover:w-full" 
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* OFFSET BOX BUTTON STYLING (LOCKED) */}
            <div className="relative group w-fit h-fit">
              {/* Shadow Layer */}
              <div className="absolute inset-0 rounded border 
                              border-neutral-300 bg-neutral-200 
                              dark:border-neutral-600 dark:bg-neutral-800 
                              z-[-1] transition duration-300 ease-in-out" 
              />
              
              {/* Main Button Layer */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                // ⬇️ FIXED: Using CSS Variables for guaranteed theme switching
                className="relative inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded border transition-all duration-300 ease-in-out
                           
                           bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-border)]
                           
                           hover:bg-[var(--btn-hover-bg)] 
                           hover:text-[var(--btn-hover-text)] 
                           hover:border-[var(--btn-hover-border)]

                           group-hover:-translate-x-1 group-hover:-translate-y-1"
              >
                <span>RESUME.pdf</span>
                <FiDownload />
              </a>
            </div>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <button 
            className="md:hidden text-[var(--foreground)] text-2xl z-50 p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>
      </header>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <nav className="relative z-10 flex flex-col items-center gap-8 w-full px-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-mono text-2xl py-2 border-b border-neutral-200 dark:border-neutral-800 w-full transition-colors
                               text-neutral-500 
                               hover:text-[var(--foreground)]"
                  >
                    <span className="text-accent text-sm mr-4 block mb-1">// {item.num}</span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <ThemeToggle />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                {/* Mobile Button - Matching Variables */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 
                             font-bold font-mono rounded-full border
                             transition-all duration-300
                             
                             bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-border)]
                             
                             hover:bg-[var(--btn-hover-bg)] 
                             hover:text-[var(--btn-hover-text)] 
                             hover:border-[var(--btn-hover-border)]"
                >
                  <FiDownload />
                  DOWNLOAD RESUME
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;