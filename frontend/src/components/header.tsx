// frontend/src/components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    // Changed background to black
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-black/80 backdrop-blur-sm shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo: Changed colors to white and black on hover */}
        <Link href="/" className="text-white border-2 border-white w-10 h-10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
          M
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <ol className="hidden md:flex items-center space-x-6 text-sm font-mono list-none">
            <li>
              {/* Nav Item: Changed colors to gray and white on hover */}
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
          
          {/* Resume Button: Changed colors to white and black on hover */}
          <a
            href="/resume.pdf" // This should point to your resume file in the `public` folder
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