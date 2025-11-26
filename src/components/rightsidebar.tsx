// frontend/src/components/RightSidebar.tsx
const RightSidebar = () => {
  return (
    <div className="hidden md:flex flex-col items-center fixed bottom-0 right-8 z-10">
      <a 
        href="mailto:mitch.affandi22@gmail.com" 
        className="text-gray-400 hover:text-cyan-400 text-sm tracking-widest transition-all hover:-translate-y-1"
        style={{ writingMode: 'vertical-rl' }}
      >
        mitch.affandi22@gmail.com
      </a>
      <div className="w-px h-24 bg-gray-600 mt-6"></div>
    </div>
  );
};

export default RightSidebar;