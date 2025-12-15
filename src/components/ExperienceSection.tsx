"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";
import { FiActivity, FiDatabase } from "react-icons/fi";

type Props = { projects: Project[] };

export default function ExperienceSection({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<GSAPAnimation | null>(null);

  // 🛡️ Safe filtering
  const validProjects = projects?.filter(p => p !== undefined && p !== null) || [];
  
  // Clone data for infinite loop
  const items = validProjects.length 
    ? [...validProjects, ...validProjects, ...validProjects, ...validProjects] 
    : [];

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const track = containerRef.current?.querySelector(".marquee-track");
      if (!track) return;

      const totalWidth = track.scrollWidth;
      const oneSetWidth = totalWidth / 4; 

      gsap.set(track, { x: 0 });

      loopRef.current = gsap.to(track, {
        x: -oneSetWidth, 
        ease: "none",
        duration: 25, 
        repeat: -1,
        onRepeat: () => {
           gsap.set(track, { x: 0 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  // Interactive Hover Logic
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!loopRef.current || !containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const center = width / 2;
    const rawPos = (mouseX - center) / center;

    gsap.to(loopRef.current, {
      timeScale: rawPos * 2.5,
      duration: 0.8,
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    if (!loopRef.current) return;
    gsap.to(loopRef.current, {
      timeScale: 1, 
      duration: 0.5
    });
  };

  return (
    <section id="experience" className="mt-32 w-full overflow-hidden relative">
      
      {/* 1. HEADER: TECHNICAL & MONOCHROME */}
      {/* ⬇️ UPDATED: Border Color */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 mb-12 flex items-end gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={0}
          blurStrength={10}
          // ⬇️ UPDATED: Text Color
          containerClassName="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight"
        >
          {/* Escape the slash */}
          {'//'} 02. Experience
        </ScrollReveal>
        <ScrollFade delay={0.2}>
           <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
            [ キャリア • LOGS ]
          </span>
        </ScrollFade>
      </div>

      {items.length === 0 ? (
        <p className="text-neutral-500 font-mono max-w-4xl mx-auto px-6 border-l-2 border-neutral-200 dark:border-neutral-800 pl-4">
          [!] ERR_NO_DATA_FOUND
        </p>
      ) : (
        /* Marquee Container */
        <div className="relative">
          
          {/* DECORATIVE: Stream Status Indicators */}
          <div className="max-w-4xl mx-auto px-6 md:px-0 flex justify-between items-center text-[10px] font-mono text-neutral-500 dark:text-neutral-600 mb-2">
            <div className="flex items-center gap-2">
              <FiDatabase /> DATA_STREAM: <span className="text-green-600 dark:text-green-500 animate-pulse">ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <FiActivity /> SYNC_RATE: AUTO
            </div>
          </div>

          <div 
            ref={containerRef}
            // ⬇️ UPDATED: Background & Borders
            className="relative w-full py-8 cursor-grab active:cursor-grabbing border-y border-neutral-200 dark:border-neutral-900 bg-neutral-100/50 dark:bg-neutral-950/30"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Faded Edges (Uses var(--background) to auto-switch white/black) */}
            <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div className="marquee-track flex gap-6 md:gap-10 w-max px-4">
              {items.map((project, i) => (
                <div 
                  key={`${project.id}-${i}`} 
                  className="w-[300px] md:w-[400px] flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
          
          {/* DECORATIVE: Bottom Ruler */}
          {/* ⬇️ UPDATED: Ruler Colors */}
          <div className="max-w-4xl mx-auto mt-2 h-px bg-neutral-200 dark:bg-neutral-900 flex justify-between">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-px h-1 bg-neutral-300 dark:bg-neutral-800" />
            ))}
          </div>

        </div>
      )}
    </section>
  );
}