"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/project"; 
import { FiCode, FiCpu, FiDatabase } from "react-icons/fi";

export default function SelectedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<GSAPAnimation | null>(null);

  // Clone projects for infinite loop (x4 for smoothness)
  const items = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS];

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const track = containerRef.current?.querySelector(".marquee-track");
      if (!track) return;

      const totalWidth = track.scrollWidth;
      const oneSetWidth = totalWidth / 4; 

      gsap.set(track, { x: 0 });

      // Start the infinite loop
      loopRef.current = gsap.to(track, {
        x: -oneSetWidth, 
        ease: "none",
        duration: 35, 
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
      timeScale: rawPos * 1.5,
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
    <section id="projects" className="mt-32 w-full overflow-hidden relative">
      
      {/* 1. HEADER */}
      <div 
        className="max-w-4xl mx-auto px-6 md:px-0 mb-12 flex items-end gap-4 border-b pb-4"
        // ⬇️ FIXED: Using CSS Variable for border
        style={{ borderColor: "var(--marquee-border)" }}
      >
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={0}
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight"
        >
          {'//'} 03. Selected Works
        </ScrollReveal>
        
        <ScrollFade delay={0.2}>
          <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
            [ プロジェクト • ARCHIVE ]
          </span>
        </ScrollFade>
      </div>

      {/* 2. SYSTEM STATUS BAR */}
      <ScrollFade delay={0.1}>
        <div className="max-w-4xl mx-auto px-6 md:px-0 flex justify-between items-center mb-8 font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <FiCpu /> KERNEL_TASKS: <span className="text-[var(--foreground)]">RUNNING</span>
          </div>
          <div className="flex items-center gap-2">
             <FiDatabase /> STREAMING: <span className="text-green-600 dark:text-green-500 animate-pulse">ACTIVE</span>
          </div>
        </div>
      </ScrollFade>

      {/* 3. MARQUEE CONTAINER */}
      <div 
        ref={containerRef}
        // ⬇️ FIXED: Replaced hardcoded classes with CSS Variables via style prop for 100% safety
        className="relative w-full py-8 cursor-grab active:cursor-grabbing border-y"
        style={{ 
            backgroundColor: "var(--marquee-bg)",
            borderColor: "var(--marquee-border)"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Faded Edges - Matches Page Background */}
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
      
      {/* 4. "VIEW ALL" BUTTON */}
      <ScrollFade fromY={20} delay={0.3} className="mt-12 text-center">
        <div className="relative inline-block group">
           <a 
            href="https://github.com/mitcheltastic" 
            target="_blank" 
            rel="noreferrer"
            // ⬇️ FIXED: Using Secondary Button Variables
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-mono rounded-full 
                       transition-all duration-300 ease-in-out border
                       
                       bg-[var(--sec-btn-bg)] 
                       text-[var(--sec-btn-text)] 
                       border-[var(--sec-btn-border)]
                       
                       hover:bg-[var(--sec-btn-hover-bg)] 
                       hover:text-[var(--sec-btn-hover-text)] 
                       hover:border-[var(--sec-btn-hover-text)]"
          >
            <FiCode className="text-xs" />
            <span>View GitHub Archive</span>
          </a>
        </div>
      </ScrollFade>

    </section>
  );
}