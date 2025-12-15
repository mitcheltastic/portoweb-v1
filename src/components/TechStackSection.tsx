"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import { 
  SiGo, SiRedis, SiGooglecloud, SiDocker, SiPostgresql, SiNodedotjs, 
  SiLinux, SiNginx, SiMysql, SiGit, SiTypescript, SiNextdotjs, 
  SiReact, SiTailwindcss, SiFramer, SiGithub, SiPostman, SiFigma, SiNotion 
} from "react-icons/si";
import { FiCpu } from "react-icons/fi";

// DATA: Tech Stack Groups with Official Brand Colors
const ROW_1 = [
  { name: "Golang", icon: SiGo, color: "#00ADD8" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Linux", icon: SiLinux, color: "#000000" }, // Black in Light Mode
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
];

const ROW_2 = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" }, // Black in Light Mode
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Notion", icon: SiNotion, color: "#000000" },
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Moves Left
      const row1 = containerRef.current?.querySelector(".row-1");
      if (row1) {
        const width = row1.scrollWidth / 2; 
        gsap.to(row1, {
          x: -width,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      // Row 2: Moves Right
      const row2 = containerRef.current?.querySelector(".row-2");
      if (row2) {
        const width = row2.scrollWidth / 2;
        gsap.set(row2, { x: -width }); 
        gsap.to(row2, {
          x: 0,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to render a row
  const TechRow = ({ items, className }: { items: typeof ROW_1, className: string }) => (
    <div className={`flex gap-4 w-max ${className}`}>
      {[...items, ...items, ...items].map((tech, i) => (
        <div 
          key={i}
          className="flex items-center gap-2 px-6 py-3 rounded-full 
                     transition-all duration-300 group cursor-default
                     border
                     
                     /* LIGHT MODE: White Bg, Dark Border */
                     bg-white/50 border-neutral-300 
                     text-neutral-700
                     hover:border-neutral-400 hover:bg-white hover:shadow-md

                     /* DARK MODE: Dark Bg, Dark Border */
                     dark:bg-neutral-900/50 dark:border-neutral-800 
                     dark:text-neutral-400
                     dark:hover:border-white dark:hover:text-white dark:hover:bg-neutral-800 
                     dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          {/* ICON: 
              - Light Mode: Uses inline style 'color' (Brand Color)
              - Dark Mode: Uses 'currentColor' (Grey -> White on hover)
          */}
          <div 
            className="text-lg transition-transform duration-300 group-hover:scale-110"
            // This applies the brand color ONLY in Light Mode (via CSS variable check or simply default)
            // But since Tailwind dark mode is class-based, we can use a CSS variable trick or simple inline style override
            style={{ color: "var(--tech-color)" } as React.CSSProperties}
          >
             {/* TRICK: We set a local CSS variable '--tech-color' to the brand color.
                In CSS (below), we can decide when to use it.
             */}
             <tech.icon 
                style={{ color: tech.color }} // 👈 Force Brand Color by default (Light Mode)
                className="dark:!text-current" // 👈 Override with 'currentColor' in Dark Mode
             />
          </div>

          <span className="font-mono text-sm tracking-wide">{tech.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="tech" className="mt-32 w-full overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6 md:px-0 mb-12">
        
        {/* HEADER */}
        <div className="flex items-end gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <ScrollReveal
            as="h2"
            baseOpacity={0}
            enableBlur
            baseRotation={0}
            blurStrength={10}
            // ⬇️ FIXED: Uses [var(--foreground)] for perfect contrast
            containerClassName="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight"
          >
            {/* Escape slash */}
            {'//'} 04. Technical Arsenal
          </ScrollReveal>
          <ScrollFade delay={0.2}>
            <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
              [ 技術スタック • SKILLS ]
            </span>
          </ScrollFade>
        </div>
        
        {/* CONTEXT */}
        <ScrollFade delay={0.1}>
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-500 dark:text-neutral-600 tracking-widest uppercase mb-8">
            {/* ⬇️ FIXED: Status text uses foreground */}
            <FiCpu /> SYSTEM_CAPABILITIES: <span className="text-[var(--foreground)]">OPTIMIZED</span>
          </div>
        </ScrollFade>
      </div>

      {/* MARQUEE ROWS */}
      <div ref={containerRef} className="flex flex-col gap-6 relative z-10">
        
        {/* Faded Edges (Relies on var(--background) to switch correctly) */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-20 pointer-events-none" />

        {/* Row 1 (Left) */}
        <div className="w-full transform -rotate-1">
          <TechRow items={ROW_1} className="row-1" />
        </div>

        {/* Row 2 (Right) */}
        <div className="w-full transform rotate-1">
          <TechRow items={ROW_2} className="row-2" />
        </div>

      </div>
    </section>
  );
}