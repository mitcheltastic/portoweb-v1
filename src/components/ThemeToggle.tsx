"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; 
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border 
                 transition-all duration-300 ease-in-out
                 /* IDLE: Minimalist Outline */
                 border-neutral-300 text-neutral-500 bg-transparent
                 dark:border-neutral-700 dark:text-neutral-400
                 /* HOVER: Fills with 'Ink' (Black in Light Mode, White in Dark Mode) */
                 hover:bg-black hover:border-black hover:text-white
                 dark:hover:bg-white dark:hover:border-white dark:hover:text-black"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {theme === "dark" ? (
            <FiMoon className="text-lg" />
          ) : (
            <FiSun className="text-lg" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;