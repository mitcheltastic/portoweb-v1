"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShow(false); // scrolling down ➜ hide
      } else {
        setShow(true); // scrolling up ➜ show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-black/80 backdrop-blur-sm shadow-md
                  transition-transform duration-300 ease-in-out ${
                    show ? 'translate-y-0' : '-translate-y-full'
                  }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* --- LOGO --- */}
        <Link href="/" className="group relative w-10 h-10 block">
          {/* Static white background ring */}
          <div className="absolute inset-0 rounded-full bg-white border-2 border-white z-[-1]" />

          {/* Inner moving circle */}
          <div className="relative z-10 flex items-center justify-center w-full h-full 
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
            <li>
              <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-white">01.</span> About
              </Link>
            </li>
            <li>
              <Link href="#experience" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-white">02.</span> Experience
              </Link>
            </li>
            <li>
              <Link href="#projects" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-white">03.</span> Work
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-white">04.</span> Contact
              </Link>
            </li>
          </ol>

          {/* Resume Button */}
          <div className="relative group w-fit h-fit">
            {/* 🟨 Static white background, does NOT move */}
            <div
              className="absolute inset-0 rounded border-2 border-accent bg-white z-[-1]
                        transition duration-300 ease-in-out"
            />

            {/* 🟦 Floating button – moves only */}
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
