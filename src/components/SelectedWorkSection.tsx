"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/project"; 
import { FiCode, FiCpu, FiTerminal } from "react-icons/fi";

export default function SelectedWorkSection() {
  const selectedProjects = PROJECTS.slice(0, 2); 

  return (
    <section id="projects" className="mt-32 max-w-4xl mx-auto px-6 md:px-0 relative">
      
      {/* DECORATIVE: Left Trace Line */}
      <div className="absolute -left-12 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-900 hidden lg:block">
         <div className="sticky top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-full" />
      </div>

      {/* 1. HEADER: TECHNICAL & MONOCHROME */}
      <div className="mb-8 flex items-end gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={0}
          blurStrength={10}
          // ⬇️ FIXED: Uses [var(--foreground)] to force Black in Light / White in Dark
          containerClassName="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight"
        >
          {'//'} 03. Ongoing Crafts
        </ScrollReveal>
        
        <ScrollFade delay={0.2}>
          <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
            [ プロジェクト • MODULES ]
          </span>
        </ScrollFade>
      </div>

      {/* 2. SYSTEM STATUS BAR */}
      <ScrollFade delay={0.1}>
        <div className="flex justify-between items-center mb-8 font-mono text-[10px] text-neutral-500 dark:text-neutral-600 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            {/* ⬇️ FIXED: Uses foreground for high contrast status */}
            <FiCpu /> KERNEL_TASKS: <span className="text-[var(--foreground)]">RUNNING</span>
          </div>
          <div className="flex items-center gap-2">
            <FiTerminal /> EXECUTION_MODE: <span className="text-[var(--foreground)]">DEPLOYED</span>
          </div>
        </div>
      </ScrollFade>

      {/* 3. PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Decorative corner markers */}
        <div className="absolute -top-4 -left-4 w-2 h-2 border-t border-l border-neutral-300 dark:border-neutral-700 hidden md:block" />
        <div className="absolute -bottom-4 -right-4 w-2 h-2 border-b border-r border-neutral-300 dark:border-neutral-700 hidden md:block" />

        {selectedProjects.map((project, index) => (
          <ScrollFade 
            key={project.id || index} 
            fromY={40} 
            blur={10} 
            delay={index * 0.1} 
          >
            <ProjectCard project={project} />
          </ScrollFade>
        ))}
      </div>

      {/* 4. "VIEW ALL" TERMINAL COMMAND BUTTON */}
      <ScrollFade fromY={20} delay={0.3} className="mt-16 text-center">
        <div className="relative inline-block group">
          {/* Decor: Blinking prompt cursor */}
          <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-mono text-accent text-sm animate-pulse mr-2">
            &gt;_
          </span>

          <a 
            href="https://github.com/mitcheltastic" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-mono rounded-full 
                       transition-all duration-300 ease-in-out 
                       border border-neutral-300 dark:border-neutral-800 
                       
                       /* Light Mode: White Button -> Black Hover */
                       bg-white/50 text-neutral-600 
                       hover:bg-black hover:text-white hover:border-transparent

                       /* Dark Mode: Dark Button -> White Hover */
                       dark:bg-neutral-950/50 dark:text-neutral-400 
                       dark:hover:bg-white dark:hover:text-black
                       
                       hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <FiCode className="text-xs" />
            <span>View Full Project Archive</span>
          </a>
        </div>
      </ScrollFade>
    </section>
  );
}