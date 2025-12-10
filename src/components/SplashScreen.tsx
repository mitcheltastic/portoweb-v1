"use client";

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

const TIMINGS = {
  START_DELAY: 1800,
  MOTTO_REVEAL: 2500,
  COLOR_FLIP: 600,
  EXIT_DELAY: 1200,
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
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // 1. Initial Trigger
  useEffect(() => {
    if (isLoading && !hasStarted) {
      setHasStarted(true);
      // Short timeout to ensure React renders the "INITIAL" state (hidden) first
      setTimeout(() => {
        setStatus('START_DELAY');
      }, 50);
    }
  }, [isLoading, hasStarted]);

  // 2. Cursor Blinking Logic
  useEffect(() => {
    if (status === 'START_DELAY') {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [status]);

  // 3. Counter Logic
  useEffect(() => {
    if (status === 'START_DELAY') {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 12) + 1; 
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [status]);

  // 4. State Machine
  useEffect(() => {
    if (!hasStarted || status === 'DONE' || status === 'INITIAL') return;
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

  // --- DERIVED STATE FLAGS ---
  
  // 1. HIDDEN STATE: Include 'INITIAL' here to prevent the flash!
  const isHiddenPhase = ['INITIAL', 'START_DELAY'].includes(status);
  
  // 2. ANIMATION PHASES
  const isMottoOpen = ['MOTTO_REVEAL', 'COLOR_FLIP', 'EXIT_DELAY', 'SLIDE_UP'].includes(status);
  const isColorPhase = ['COLOR_FLIP', 'EXIT_DELAY', 'SLIDE_UP'].includes(status);
  const isSlidingUp = status === 'SLIDE_UP';

  // 3. STYLES
  const textColor = isColorPhase ? '#ffffff' : '#000000';
  const bgColor = isColorPhase ? 'bg-black' : 'bg-white';
  const lineColor = isColorPhase ? 'bg-white' : 'bg-black';

  return (
    <div
      className={clsx(
        // ⬇️ FIX: Restored 'transition-all' so the slide up works
        "fixed inset-0 z-[100] flex items-center justify-center transition-all ease-in-out cursor-none",
        bgColor,
        // Match transition duration to the SLIDE_UP timing
        `duration-[${TIMINGS.SLIDE_UP}ms]`,
        isSlidingUp ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* 1. BOOT SEQUENCE COUNTER */}
      <div 
        className={clsx(
          "absolute inset-0 flex flex-col items-center justify-center z-50 transition-all duration-700 ease-out",
          // Show only during start delay, otherwise hide
          status === 'START_DELAY' ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs tracking-[0.25em] text-neutral-500 font-medium">
            SYSTEM_BOOT_SEQUENCE
          </span>
          <span 
            className={clsx(
              "inline-block w-2 h-4 bg-black transition-opacity duration-100", 
              showCursor ? "opacity-100" : "opacity-0"
            )} 
          />
        </div>

        <span className="font-mono text-5xl font-black text-neutral-800 tracking-tighter">
          {Math.min(count, 100)}%
        </span>
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div 
        className={clsx(
          "relative flex flex-col md:flex-row items-center justify-center w-full h-full max-w-6xl mx-auto px-6 transition-opacity duration-500",
          // ⬇️ FIX: Use isHiddenPhase so it stays hidden during INITIAL state too
          isHiddenPhase ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        
        {/* LOGO IMAGE */}
        <img
          src="/MitchLogo.png"
          alt="Logo"
          className={clsx(
            "z-30 rounded-full filter invert absolute transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1)",
            "w-32 h-32 md:w-48 md:h-48 shadow-2xl",
            isMottoOpen 
              ? "-translate-y-[120px] md:translate-y-0 md:-translate-x-[300px] scale-100 rotate-0" 
              : "translate-y-0 translate-x-0 scale-125 rotate-180"
          )}
        />

        {/* CONNECTING LINE */}
        <div 
          className={clsx(
            "absolute z-20 w-px transition-all duration-[1000ms] delay-200 ease-out",
            lineColor,
            isMottoOpen 
              ? "h-24 md:h-40 opacity-20 translate-y-[-10px] md:translate-y-0 md:-translate-x-[160px]" 
              : "h-0 opacity-0"
          )}
        />

        {/* MOTTO TEXT BLOCK */}
        <div
          className={clsx(
            "absolute flex flex-col items-center md:items-start justify-center text-center md:text-left transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1)",
            "md:translate-y-0",
            
            // Motion Blur Effect
            isMottoOpen 
              ? "opacity-100 blur-0 translate-y-[40px] md:translate-x-[180px]" 
              : "opacity-0 blur-xl translate-y-[20px] md:translate-x-0"
          )}
          style={{ color: textColor }}
        >
          <div className="overflow-hidden">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold whitespace-nowrap leading-tight tracking-tight">
              If you can imagine it,<br />
              you can realise it.
            </h1>
          </div>
          
          <div className="flex items-center gap-3 mt-4 overflow-hidden">
            <span className={clsx("h-px w-8 transition-all duration-700 delay-500", lineColor)} />
            <p className="text-sm md:text-base font-mono font-normal opacity-80">
              Mitch Affandi | INTJ-A 
              <span className="hidden sm:inline"> (The Mastermind)</span>
            </p>
          </div>
          
          {/* Japanese Subtitle */}
          <p className="text-[10px] font-mono mt-1 opacity-40 tracking-[0.2em] transition-opacity duration-1000 delay-700">
            システム起動 // SYSTEM_READY
          </p>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;