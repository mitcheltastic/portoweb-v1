// frontend/src/components/LeftSidebar.tsx
import { FaYoutube } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

const LeftSidebar = () => {
  // Added "inline-block" so transforms (translate/scale) actually work
  // Added "p-2" to give it a slightly larger hit area
  const iconClass = "inline-block text-gray-400 hover:text-white text-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-110 cursor-pointer p-2";

  return (
    <div className="hidden md:flex flex-col items-center fixed bottom-0 left-8 z-10">
      <ul className="flex flex-col items-center space-y-2"> {/* reduced space-y because p-2 adds spacing */}
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
      
      {/* Vertical Line */}
      <div className="w-px h-24 bg-gray-600 mt-4"></div>
    </div>
  );
};

export default LeftSidebar;