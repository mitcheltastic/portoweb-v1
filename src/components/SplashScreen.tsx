"use client";

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const TIMINGS = {
  START_DELAY: 300,
  MOTTO_REVEAL: 3000,
  COLOR_FLIP: 500,
  EXIT_DELAY: 1500,
  SLIDE_UP: 800,
};

type AnimationStatus =
  | 'INITIAL' | 'START_DELAY' | 'MOTTO_REVEAL' | 'COLOR_FLIP' | 'EXIT_DELAY' | 'SLIDE_UP' | 'DONE';

interface SplashScreenProps {
  isLoading: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  const [status, setStatus] = useState<AnimationStatus>('INITIAL');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isLoading && !hasStarted) {
      setHasStarted(true);
      setStatus('START_DELAY');
    }
  }, [isLoading, hasStarted]);

  useEffect(() => {
    if (!hasStarted || status === 'DONE') return;
    let timer: NodeJS.Timeout;
    const advance = (next: AnimationStatus, ms: number) => {
      timer = setTimeout(() => setStatus(next), ms);
    };

    switch (status) {
      case 'START_DELAY': advance('MOTTO_REVEAL', TIMINGS.START_DELAY); break;
      case 'MOTTO_REVEAL': advance('COLOR_FLIP', TIMINGS.MOTTO_REVEAL); break;
      case 'COLOR_FLIP': advance('EXIT_DELAY', TIMINGS.COLOR_FLIP); break;
      case 'EXIT_DELAY': advance('SLIDE_UP', TIMINGS.EXIT_DELAY); break;
      case 'SLIDE_UP': advance('DONE', TIMINGS.SLIDE_UP); break;
      default: break;
    }
    return () => clearTimeout(timer);
  }, [status, hasStarted]);

  if (status === 'DONE' || !hasStarted) return null;

  const isMottoOpen = ['MOTTO_REVEAL', 'COLOR_FLIP', 'EXIT_DELAY', 'SLIDE_UP'].includes(status);
  const isColorPhase = ['COLOR_FLIP', 'EXIT_DELAY', 'SLIDE_UP'].includes(status);
  const isSlidingUp = status === 'SLIDE_UP';

  const textColor = isColorPhase ? '#ffffff' : '#000000';
  const bgColor = isColorPhase ? 'bg-black' : 'bg-white';

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[100] flex items-center justify-center transition-all ease-in-out",
        bgColor,
        `duration-[${TIMINGS.SLIDE_UP}ms]`,
        isSlidingUp ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      {/* CENTERING CONTAINER */}
      <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full max-w-6xl mx-auto px-6">
        
        {/* LOGO IMAGE */}
        <img
          src="/MitchLogo.png"
          alt="Logo"
          className={clsx(
            "z-20 rounded-full filter invert transition-all duration-1000 ease-out absolute",
            // Dimensions
            "w-32 h-32 md:w-48 md:h-48",
            
            // ⬇️ FINAL POSITION FIX:
            // Mobile: Moves UP 120px (Safe distance)
            // Desktop: Moves LEFT 300px (Guaranteed clearance)
            isMottoOpen 
              ? "-translate-y-[120px] md:translate-y-0 md:-translate-x-[300px] scale-100" 
              : "translate-y-0 translate-x-0 scale-110"
          )}
        />

        {/* MOTTO TEXT */}
        <div
          className={clsx(
            "absolute flex flex-col items-center md:items-start justify-center text-center md:text-left transition-all duration-1000 ease-out",
            "md:translate-y-0",
            
            // ⬇️ FINAL POSITION FIX:
            // Mobile: Moves DOWN 40px
            // Desktop: Moves RIGHT 180px (Matches the logo's aggressive slide)
            isMottoOpen 
              ? "opacity-100 translate-y-[40px] md:translate-x-[180px]" 
              : "opacity-0 translate-y-[20px] md:translate-x-[20px]"
          )}
          style={{ color: textColor }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold whitespace-nowrap leading-tight">
            If you can imagine it,<br />
            you can realise it.
          </h1>
          <p className="text-sm md:text-base font-normal mt-3 opacity-80">
            Mitch Affandi | INTJ-A (The Mastermind)
          </p>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;