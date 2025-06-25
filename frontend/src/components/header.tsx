// frontend/src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-black/80 backdrop-blur-sm shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* --- MODIFIED LOGO START --- */}
        <Link
          href="/"
          className="
            group 
            relative 
            w-10 h-10 
            transition-transform duration-200 ease-out
            hover:-translate-x-1 hover:-translate-y-1

            before:content-['']
            before:absolute before:inset-0
            before:border-2 before:border-white
            before:rounded-full
            before:bg-black
            before:z-[-1]
          "
        >
          {/* This inner div now holds the visible border and handles the hover BG color */}
          <div className="
            relative z-10 
            flex items-center justify-center 
            w-full h-full 
            border-2 border-white 
            rounded-full 
            bg-black 
            group-hover:bg-white 
            transition-colors duration-200
          ">
            <Image
              src="/MitchLogo.png" // Using your correct logo file name
              alt="Mitch Affandi's Logo"
              width={38}
              height={38}
              className="rounded-full group-hover:invert transition-all duration-200"
            />
          </div>
        </Link>
        {/* --- MODIFIED LOGO END --- */}
        
        {/* Navigation Links (No changes here) */}
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
          
          {/* Resume Button (No changes here) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-white border border-white rounded px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;