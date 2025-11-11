// src/components/SplashScreen.tsx
import Image from 'next/image';

const SplashScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center 
        bg-white 
        transition-opacity duration-500 ease-in-out
        ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      // 1. Changed bg-gray-900 to bg-white
    >
      <div className="grid place-items-center">
        
        {/* Your Logo */}
        <Image 
          src="/MitchLogo.png" 
          alt="Mitch's Logo" 
          width={100} 
          height={100} 
          className="z-10 rounded-full [grid-area:1/1] filter invert"
          // 2. Added "filter invert" to turn your white logo black
        />
        
        {/* Circular loading animation */}
        <div 
          className="h-[120px] w-[120px] rounded-full [grid-area:1/1] animate-spin
          border-4 border-t-4
          border-gray-200 
          border-t-black
          "
          // 3. Changed border-gray-700 to border-gray-200 (the track)
          // 4. Changed border-t-blue-500 to border-t-black (the spinner line)
        ></div>
      </div>
    </div>
  );
};

export default SplashScreen;