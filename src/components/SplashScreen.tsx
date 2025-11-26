import React, { useState, useEffect } from 'react';

// Define the stages of the internal animation sequence
type AnimationStatus =
  | 'INITIAL'
  | 'START_DELAY'
  | 'MOTTO_REVEAL'
  | 'COLOR_FLIP'
  | 'EXIT_DELAY'
  | 'SLIDE_UP'
  | 'DONE';

interface SplashScreenProps {
  isLoading: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  const [status, setStatus] = useState<AnimationStatus>('INITIAL');
  const [removed, setRemoved] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [logoSettled, setLogoSettled] = useState(false);

  // 1. Start the sequence once external loading flips to true (one-time trigger)
  useEffect(() => {
    if (isLoading && !hasStarted) {
      setHasStarted(true);
      setRemoved(false);
      setLogoSettled(false);
      setStatus('START_DELAY');
    }
  }, [isLoading, hasStarted]);

  // 2. Internal state machine driving each phase with precise timings
  useEffect(() => {
    if (!hasStarted || removed) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    switch (status) {
      case 'START_DELAY':
        // Phase 1: brief wait for mount (0.3s)
        timer = setTimeout(() => setStatus('MOTTO_REVEAL'), 300);
        break;

      case 'MOTTO_REVEAL':
        // ~3s total: ~2.1s for reveal animations + short pause
        timer = setTimeout(() => setStatus('COLOR_FLIP'), 3000);
        break;

      case 'COLOR_FLIP':
        // Phase 3: background flip (0.5s)
        timer = setTimeout(() => setStatus('EXIT_DELAY'), 500);
        break;

      case 'EXIT_DELAY':
        // Phase 4: hold dark screen briefly (1.5s)
        timer = setTimeout(() => setStatus('SLIDE_UP'), 1500);
        break;

      case 'SLIDE_UP':
        // Phase 5: slide overlay up (match ~800ms CSS transition)
        timer = setTimeout(() => {
          setStatus('DONE');
          setRemoved(true);
        }, 800);
        break;

      default:
        break;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status, hasStarted, removed]);

  // 3. Once sequence has finished and been removed, render nothing
  if (!hasStarted || removed) {
    return null;
  }

  // 4. Derived flags
  const isMottoOpen =
    status === 'MOTTO_REVEAL' ||
    status === 'COLOR_FLIP' ||
    status === 'EXIT_DELAY' ||
    status === 'SLIDE_UP';

  const isColorPhase =
    status === 'COLOR_FLIP' ||
    status === 'EXIT_DELAY' ||
    status === 'SLIDE_UP';

  const isSlidingUp = status === 'SLIDE_UP';
  const isMottoVisible = isMottoOpen;

  // Text colour is controlled separately so it flips instantly, not via transition
  const textColor = isColorPhase ? '#ffffff' : '#000000';

  // Wrapper: animate transform + opacity + background only
  const wrapperClasses = `
    fixed inset-0 z-[100] flex flex-col items-center justify-center
    transition-all duration-[800ms] ease-in-out
    ${isColorPhase ? 'bg-black' : 'bg-white'}
    ${isSlidingUp ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
  `;

  // Container for Logo/Motto/Tag
  const logoContainerClasses =
    'flex flex-col items-start justify-center relative -translate-x-28';

  return (
    <div className={wrapperClasses}>
      {/* Main Content Area */}
      <div className={logoContainerClasses}>
        <div className="relative flex items-center justify-center">
          {/* Logo with horizontal slide + subtle settle */}
          <img
            src="/MitchLogo.png"
            alt="Mitch's Logo"
            width={150}
            height={150}
            className={`
              z-20 rounded-full w-[150px] h-[150px]
              filter invert
              transition-transform duration-1000 ease-out
              ${isMottoOpen ? 'translate-x-[400px]' : 'translate-x-0'}
              ${isMottoOpen && !logoSettled ? 'scale-[1.05]' : 'scale-100'}
            `}
            onTransitionEnd={(e) => {
              if (
                e.propertyName === 'transform' &&
                isMottoOpen &&
                !logoSettled
              ) {
                setLogoSettled(true);
              }
            }}
          />

          {/* Motto + INTJ block */}
          <div
            className={`
              absolute font-extrabold tracking-tight text-left
              transition-opacity duration-700 ease-out
              ${
                isSlidingUp
                  ? 'opacity-0'
                  : isMottoVisible
                  ? 'opacity-100 delay-300'
                  : 'opacity-0'
              }
            `}
            style={{ color: textColor }}
          >
            {/* Motto line (simple fade + slide-in) */}
            <h1
              className={`
                text-4xl sm:text-5xl md:text-6xl
                [transform-origin:left]
                whitespace-nowrap
                ml-3
              `}
            >
              <span
                className={`
                  inline-block transition-[opacity,transform] duration-[1200ms] ease-out
                  ${
                    isMottoOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-5'
                  }
                `}
              >
                If you can imagine it,
                <br />
                you can realise it.
              </span>
            </h1>

            {/* INTJ-A (The Mastermind) - aligned with motto, stays visible through colour flip */}
            <p
              className={`
                text-base font-normal mt-3 ml-3
                transition-[opacity,transform] duration-700 ease-out delay-[1400ms]
                transform-gpu
                ${
                  isMottoOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3'
                }
              `}
              style={{ color: textColor }}
            >
              Mitch Affandi | INTJ-A (The Mastermind)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
