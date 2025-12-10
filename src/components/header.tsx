"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 1. Define the Smooth Scroll function
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); 
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShow(false); 
      } else {
        setShow(true); 
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 
                  bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 shadow-lg
                  transition-transform duration-300 ease-in-out ${
                    show ? "translate-y-0" : "-translate-y-full"
                  }`}
    >
      {/* DECORATIVE: Subtle Grid Noise (Matches Footer) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <nav className="relative flex justify-between items-center max-w-7xl mx-auto z-10">
        
        {/* --- LOGO + NAME (System Core) --- */}
        <Link 
          href="/" 
          onClick={handleScrollToTop} 
          className="group flex items-center gap-3"
        >
          {/* Logo Wrapper */}
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border border-neutral-700 bg-neutral-900 z-[-1]" />
            <div
              className="relative z-10 flex items-center justify-center w-full h-full 
                         border border-neutral-500 rounded-full bg-black 
                         transition-transform duration-300 ease-in-out 
                         group-hover:-translate-x-1 group-hover:-translate-y-1 
                         group-hover:bg-neutral-200 group-hover:border-white"
            >
              <Image
                src="/MitchLogo.png"
                alt="Mitch Affandi's Logo"
                width={38}
                height={38}
                className="rounded-full group-hover:invert transition-all duration-200 scale-90"
              />
            </div>
          </div>

          {/* Name & Status Label */}
          <div className="flex flex-col justify-center">
            <span className="font-bold text-base text-white tracking-wide leading-none group-hover:text-neutral-300 transition-colors">
              MitchAffandi<span className="text-accent">.</span>
            </span>
            <span className="text-[9px] text-neutral-500 font-mono tracking-widest uppercase mt-0.5 group-hover:text-accent transition-colors">
              [ DEV_PROFILE ]
            </span>
          </div>
        </Link>

        {/* --- NAVIGATION --- */}
        <div className="flex items-center space-x-8">
          <ol className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-mono list-none">
            
            {/* ⬇️ UPDATED: Added Tech (04) and moved Contact to (05) */}
            {[
              { num: "01", name: "About", href: "#about" },
              { num: "02", name: "Exp.", href: "#experience" }, 
              { num: "03", name: "Work", href: "#projects" },
              { num: "04", name: "Tech", href: "#tech" }, // Ensure your TechStackSection has id="tech"
              { num: "05", name: "Contact", href: "#contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-1 text-neutral-500 hover:text-white transition-colors duration-300"
                >
                  <span className="text-accent group-hover:text-white transition-colors">//</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.num}. {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          {/* Resume Button */}
          <div className="relative group w-fit h-fit">
            <div
              className="absolute inset-0 rounded border border-neutral-600 bg-neutral-800 z-[-1]
                         transition duration-300 ease-in-out"
            />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 font-mono text-accent border border-accent rounded px-4 py-2 text-xs
                         bg-black transition-transform duration-300 ease-in-out
                         group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:bg-neutral-900"
            >
              <span>RESUME.pdf</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;