// frontend/src/components/LeftSidebar.tsx
import { FaYoutube } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

const LeftSidebar = () => {
  return (
    <div className="hidden md:flex flex-col items-center fixed bottom-0 left-8 z-10">
      <ul className="flex flex-col items-center space-y-6">
        <li><a href="https://github.com/mitcheltastic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 text-2xl transition-all hover:-translate-y-1"><FiGithub /></a></li>
        <li><a href="https://linkedin.com/in/mitchaff" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 text-2xl transition-all hover:-translate-y-1"><FiLinkedin /></a></li>
        <li><a href="https://www.instagram.com/mtchffnd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 text-2xl transition-all hover:-translate-y-1"><FiInstagram /></a></li>
        <li><a href="https://www.youtube.com/@MitchelAffandi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 text-2xl transition-all hover:-translate-y-1"><FaYoutube /></a></li>
      </ul>
      <div className="w-px h-24 bg-gray-600 mt-6"></div>
    </div>
  );
};

export default LeftSidebar;