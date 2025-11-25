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
        // 5000ms (3s CSS duration + 2s pause)
        timer = setTimeout(() => setStatus('COLOR_FLIP'), 5000);
        break;

      case 'COLOR_FLIP':
        // Phase 3: background flash + start fading motto (0.5s)
        timer = setTimeout(() => setStatus('EXIT_DELAY'), 500);
        break;

      case 'EXIT_DELAY':
        // Phase 4: hold dark screen briefly (1.5s)
        timer = setTimeout(() => setStatus('SLIDE_UP'), 1500);
        break;

      case 'SLIDE_UP':
        // Phase 5: slide overlay up (match 800ms CSS transition)
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

  // 4. Derived flags for cleaner JSX
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

  // We will control text colour manually so globals can't fight us
  const textColor = isColorPhase ? '#ffffff' : '#000000';

  // Wrapper: background flip + slide-up
  const wrapperClasses = `
    fixed inset-0 z-[100] flex flex-col items-center justify-center
    transition-all duration-[800ms] ease-in-out
    ${isColorPhase ? 'bg-black' : 'bg-white'}
    ${isSlidingUp ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
  `;

  // Container for Logo/Motto/Tag - Horizontal shift
  const logoContainerClasses =
    'flex flex-col items-center relative -translate-x-28';

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
              // After the first transform animation, drop the extra scale
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
              absolute font-extrabold tracking-tight
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
            {/* Motto line */}
            <h1
              className={`
                text-4xl sm:text-5xl md:text-6xl
                animate-text-pulse
                [transform-origin:left]
                ml-3 whitespace-nowrap
              `}
              style={{ color: textColor }}
            >
              <span
                className={`
                  inline-block transition-all duration-[3000ms] ease-out
                  [clip-path:polygon(0%_0%,_0%_0%,_0%_100%,_0%_100%)]
                  ${
                    isMottoOpen
                      ? '[clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_0%_100%)]'
                      : ''
                  }
                `}
              >
                If you can imagine it,<br />
                you can realise it.
              </span>
            </h1>

            {/* INTJ-A (The Mastermind) - slide up from below, fully controlled colour */}
            <p
              className={`
                text-base font-normal mt-3
                transition-all duration-700 ease-out delay-[3200ms]
                transform-gpu
                ${
                  isMottoOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3'
                }
              `}
              style={{
                color: textColor,
                WebkitTextFillColor: textColor,
              }}
            >
              INTJ-A (The Mastermind)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
