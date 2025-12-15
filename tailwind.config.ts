import type { Config } from "tailwindcss";

const config: Config = {
  // ✅ CRITICAL: Force class strategy
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-space-mono)'],
      },
      colors: {
        // Links to globals.css
        background: "var(--background)",
        foreground: "var(--foreground)",

        // ⬇️ ADD THESE TWO LINES SO THE HEADER FIX WORKS
        "header-bg": "var(--header-bg)",
        "header-border": "var(--header-border)",
        
        // Define your accent
        accent: "#737373", 
      },
    },
  },
  plugins: [],
};
export default config;