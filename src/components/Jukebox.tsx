"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMusic, FiPlay, FiPause, FiSkipForward, FiSkipBack, FiVolume2, FiVolumeX } from "react-icons/fi";

const PLAYLIST = [
  {
    id: 1,
    title: "Plastic Love",
    artist: "Mariya Takeuchi",
    src: "/music/PlasticLove.mp3",
  },
  {
    id: 2,
    title: "Human Nature",
    artist: "Michael Jackson",
    src: "/music/HumanNature.mp3",
  },
  {
    id: 3,
    title: "Spain (I Can Recall)",
    artist: "Al Jarreau",
    src: "/music/Spain.mp3",
  }
];

export default function Jukebox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5); // Default 50%
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Custom states and refs for responsiveness & behavior
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const jukeboxRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync mobile menu open state from Header component
  useEffect(() => {
    const handleMenuToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsMobileMenuOpen(customEvent.detail);
      if (customEvent.detail) {
        setIsOpen(false); // Close jukebox panel if mobile menu is opened
      }
    };
    
    if (typeof window !== "undefined") {
      window.addEventListener("mobileMenuOpen", handleMenuToggle);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mobileMenuOpen", handleMenuToggle);
      }
    };
  }, []);

  // Detect device hover capability to avoid hover issues on touch screens
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  // Click / touch outside to close the music player panel (crucial for mobile UX)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      // If the target element has been unmounted from the DOM (e.g., swapping icons),
      // it will no longer be a descendant of jukeboxRef. We should ignore it to prevent
      // closing the panel accidentally.
      if (target && !document.body.contains(target)) {
        return;
      }
      if (jukeboxRef.current && !jukeboxRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Reset inactivity fade-out timer on user interactions
  const resetTimer = () => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Only auto-fade when closed. If open, keep it visible.
    if (!isOpen) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }
  };

  // Listen to user scroll, swipe (touchmove), click, keydown, and mousemove events to reset inactivity timer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const events = ["scroll", "touchmove", "mousemove", "keydown", "click"];
    const handleActivity = () => {
      resetTimer();
    };

    resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isOpen]);

  // Sync playback state with audio element
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log("Audio play failed (browser policy):", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Sync volume state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    if (isMuted) setIsMuted(false);
  };

  const onEnded = () => {
    handleNext(); // Auto-play next song
  };

  return (
    <div 
      ref={jukeboxRef}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end"
      onMouseEnter={() => hasHover && setIsOpen(true)}
      onMouseLeave={() => hasHover && setIsOpen(false)}
    >
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={PLAYLIST[currentTrack].src} 
        onEnded={onEnded}
      />

      {/* Jukebox Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-72 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden origin-bottom-right"
          >
            {/* Player Header */}
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
              {/* Spinning CD/Record Effect */}
              <div className={`w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                <FiMusic className="text-neutral-500" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-bold text-[var(--foreground)] truncate">
                  {PLAYLIST[currentTrack].title}
                </h4>
                <p className="text-xs text-neutral-500 truncate">
                  {PLAYLIST[currentTrack].artist}
                </p>
              </div>
            </div>

            {/* Player Controls (Now with Volume Slider!) */}
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                
                {/* Volume Slider Block */}
                <div className="flex items-center gap-2 group/vol relative">
                  <button 
                    onClick={toggleMute}
                    className="text-neutral-400 hover:text-[var(--foreground)] transition-colors"
                    aria-label="Toggle Mute"
                  >
                    {isMuted || volume === 0 ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[var(--foreground)] opacity-60 group-hover/vol:opacity-100 transition-opacity"
                    aria-label="Volume Control"
                  />
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePrev}
                    className="text-neutral-400 hover:text-[var(--foreground)] transition-colors"
                    aria-label="Previous Track"
                  >
                    <FiSkipBack size={18} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                    aria-label="Play/Pause"
                  >
                    {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} className="ml-1" />}
                  </button>
                  <button 
                    onClick={handleNext}
                    className="text-neutral-400 hover:text-[var(--foreground)] transition-colors"
                    aria-label="Next Track"
                  >
                    <FiSkipForward size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* System Status Line */}
            <div className="bg-neutral-50 dark:bg-black/50 px-4 py-1.5 text-[9px] font-mono text-neutral-400 tracking-widest flex justify-between border-t border-neutral-100 dark:border-neutral-800">
              <span>SYS.AUDIO</span>
              <span className={isPlaying ? "text-green-500 animate-pulse" : ""}>{isPlaying ? "PLAYING" : "STANDBY"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button (The Trigger) */}
      <motion.button 
        animate={{ 
          y: [0, -6, 0],
          opacity: isVisible && !isMobileMenuOpen ? 1 : 0,
          scale: isVisible && !isMobileMenuOpen ? 1 : 0.8,
          pointerEvents: isVisible && !isMobileMenuOpen ? "auto" : "none"
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeOut" }
        }}
        className="w-16 h-16 rounded-[1.25rem] bg-white dark:bg-neutral-900 border-[3px] border-[var(--foreground)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-[var(--foreground)] hover:scale-105 hover:-rotate-3 transition-all duration-300 z-50 group relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Jukebox"
      >
        <FiMusic size={26} strokeWidth={2.5} className={isPlaying ? "text-accent animate-pulse" : "transition-colors"} />
        
        {/* Green Active Dot Indicator */}
        {isPlaying && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-500 border-[3px] border-white dark:border-neutral-900 rounded-full"></span>
        )}
      </motion.button>
    </div>
  );
}
