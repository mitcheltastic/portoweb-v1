"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 1. Define the Smooth Scroll function
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Stop Next.js from "navigating"
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Force smooth scrolling
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
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
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-black/80 backdrop-blur-sm shadow-md
                  transition-transform duration-300 ease-in-out ${
                    show ? "translate-y-0" : "-translate-y-full"
                  }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* --- LOGO --- */}
        {/* 2. Attach the onClick handler here */}
        <Link 
          href="/" 
          onClick={handleScrollToTop} 
          className="group relative w-10 h-10 block"
        >
          {/* Static white background ring */}
          <div className="absolute inset-0 rounded-full bg-white border-2 border-white z-[-1]" />

          {/* Inner moving circle */}
          <div
            className="relative z-10 flex items-center justify-center w-full h-full 
                       border-2 border-white rounded-full bg-black 
                       transition-transform duration-300 ease-in-out 
                       group-hover:-translate-x-1 group-hover:-translate-y-1 
                       group-hover:bg-white"
          >
            <Image
              src="/MitchLogo.png"
              alt="Mitch Affandi's Logo"
              width={38}
              height={38}
              className="rounded-full group-hover:invert transition-all duration-200"
            />
          </div>
        </Link>

        {/* --- NAVIGATION --- */}
        <div className="flex items-center space-x-6">
          <ol className="hidden md:flex items-center space-x-6 text-sm font-mono list-none">
            {/* ... (Rest of your links remain exactly the same) ... */}
            
            {/* ABOUT */}
            <li>
              <Link
                href="#about"
                className="nav-link text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-white">01.</span>
                <span>About</span>
              </Link>
            </li>

            {/* EXPERIENCE */}
            <li>
              <Link
                href="#experience"
                className="nav-link text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-white">02.</span>
                <span>Experience</span>
              </Link>
            </li>

            {/* WORK */}
            <li>
              <Link
                href="#projects"
                className="nav-link text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-white">03.</span>
                <span>Work</span>
              </Link>
            </li>

            {/* CONTACT */}
            <li>
              <Link
                href="#contact"
                className="nav-link text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-white">04.</span>
                <span>Contact</span>
              </Link>
            </li>
          </ol>

          {/* Resume Button */}
          <div className="relative group w-fit h-fit">
            <div
              className="absolute inset-0 rounded border-2 border-accent bg-white z-[-1]
                         transition duration-300 ease-in-out"
            />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block font-mono text-accent border-2 border-accent rounded px-4 py-2 text-sm
                         bg-black transition-transform duration-300 ease-in-out
                         group-hover:-translate-x-1 group-hover:-translate-y-1"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;