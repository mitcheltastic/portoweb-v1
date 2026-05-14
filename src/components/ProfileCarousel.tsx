"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ⬇️ UPDATE THIS ARRAY WITH YOUR NEW PICTURES
const CAROUSEL_DATA = [
  {
    id: "MITCH-001",
    tag: "SYS_ADMIN",
    src: "/MitchAboutMe.jpg", // Original Professional Headshot
  },
  {
    id: "MITCH-002",
    tag: "OVERCLOCKING",
    src: "/MitchConcert.JPEG", // TODO: Replace with activity pic 1
  },
  {
    id: "MITCH-003",
    tag: "OFFLINE_MODE",
    src: "/MitchCPS.JPG", // TODO: Replace with activity pic 2
  },
  {
    id: "MITCH-004",
    tag: "GAMING_MODE",
    src: "/MitchIndia.JPG", // TODO: Replace with activity pic 3
  }
];

export default function ProfileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle the images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
  };

  return (
    <div 
      className="relative w-full aspect-[4/5] md:aspect-auto md:h-[350px] cursor-pointer group"
      onClick={handleNext}
      title="Click to advance system visual"
    >
      {/* BACKGROUND CARD (The Dimmer Version) */}
      {/* 💡 COOL DETAIL: It automatically shows the NEXT image in the array as a preview! */}
      <div
        className="absolute inset-0 w-full h-full rounded-md z-0 overflow-hidden
                   origin-bottom transform transition-all duration-500 ease-out
                   group-hover:rotate-6 group-hover:translate-x-4 
                   border border-neutral-200 dark:border-neutral-800/50"
      >
        <Image
          src={CAROUSEL_DATA[(currentIndex + 1) % CAROUSEL_DATA.length].src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover filter grayscale opacity-20 dark:opacity-40 brightness-110 dark:brightness-50 transition-all duration-500"
        />
      </div>

      {/* FOREGROUND CARD (The Main Version) */}
      <div
        className="relative z-10 w-full h-full rounded-md overflow-hidden 
                   border border-neutral-200 dark:border-neutral-700 
                   bg-white dark:bg-neutral-900 shadow-2xl
                   origin-bottom transform transition-all duration-500 ease-out
                   group-hover:-rotate-3 group-hover:-translate-x-2"
      >
        <div className="absolute inset-0 bg-neutral-900/0 z-20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
        
        {/* The Animated Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={CAROUSEL_DATA[currentIndex].src}
              alt={`Profile Image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Tech Overlay on Image */}
        <div className="absolute top-2 left-2 z-30 pointer-events-none">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
        
        {/* Top Right Dot Indicators */}
        <div className="absolute top-2 right-2 z-30 flex gap-1 pointer-events-none">
          {CAROUSEL_DATA.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} 
            />
          ))}
        </div>

        {/* Dynamic Bottom Right HUD Text */}
        <div className="absolute bottom-4 right-4 z-30 font-mono text-[10px] text-white/90 tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm rounded pointer-events-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="block"
            >
              ID: {CAROUSEL_DATA[currentIndex].id} | {CAROUSEL_DATA[currentIndex].tag}
            </motion.span>
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}
