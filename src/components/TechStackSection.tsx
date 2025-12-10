"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
// ⬇️ FIXED: Changed SiFramermotion to SiFramer
import { 
  SiGo, SiRedis, SiGooglecloud, SiDocker, SiPostgresql, SiNodedotjs, 
  SiLinux, SiNginx, SiMysql, SiGit, SiTypescript, SiNextdotjs, 
  SiReact, SiTailwindcss, SiFramer, SiGithub, SiPostman, SiFigma, SiNotion 
} from "react-icons/si";
import { FiCpu } from "react-icons/fi";

// DATA: Tech Stack Groups
const ROW_1 = [
  { name: "Golang", icon: SiGo },
  { name: "Redis", icon: SiRedis },
  { name: "Google Cloud", icon: SiGooglecloud },
  { name: "Docker", icon: SiDocker },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Linux", icon: SiLinux },
  { name: "Nginx", icon: SiNginx },
  { name: "MySQL", icon: SiMysql },
];

const ROW_2 = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer }, // ⬇️ FIXED
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Postman", icon: SiPostman },
  { name: "Figma", icon: SiFigma },
  { name: "Notion", icon: SiNotion },
];

export default function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Moves Left
      const row1 = containerRef.current?.querySelector(".row-1");
      if (row1) {
        const width = row1.scrollWidth / 2; // Half because we duplicate items
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
        gsap.set(row2, { x: -width }); // Start offset
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
      {/* Triple the items to ensure seamless loop on wide screens */}
      {[...items, ...items, ...items].map((tech, i) => (
        <div 
          key={i}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 
                     transition-all duration-300 hover:border-white hover:text-white hover:bg-neutral-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                     group cursor-default"
        >
          <tech.icon className="text-lg group-hover:scale-110 transition-transform duration-300" />
          <span className="font-mono text-sm tracking-wide">{tech.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="tech" className="mt-32 w-full overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6 md:px-0 mb-12">
        
        {/* HEADER */}
        <div className="flex items-end gap-4 border-b border-neutral-800 pb-4">
          <ScrollReveal
            as="h2"
            baseOpacity={0}
            enableBlur
            baseRotation={0}
            blurStrength={10}
            containerClassName="text-3xl md:text-4xl font-bold text-white tracking-tight"
          >
            // 04. Technical Arsenal
          </ScrollReveal>
          <ScrollFade delay={0.2}>
            <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
              [ 技術スタック • SKILLS ]
            </span>
          </ScrollFade>
        </div>
        
        {/* CONTEXT */}
        <ScrollFade delay={0.1}>
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-600 tracking-widest uppercase mb-8">
            <FiCpu /> SYSTEM_CAPABILITIES: <span className="text-white">OPTIMIZED</span>
          </div>
        </ScrollFade>
      </div>

      {/* MARQUEE ROWS */}
      <div ref={containerRef} className="flex flex-col gap-6 relative z-10">
        
        {/* Faded Edges */}
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