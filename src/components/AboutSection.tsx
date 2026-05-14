"use client";

import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import { FiCpu, FiZap } from "react-icons/fi";
import Image from "next/image";
import ProfileCarousel from "@/components/ProfileCarousel";

export default function AboutSection() {
  return (
    <section id="about" className="mt-32 max-w-4xl mx-auto px-6 md:px-0 relative">
      
      {/* DECORATIVE: Background line trace */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-900 md:hidden" />

      {/* 1. HEADER: TECHNICAL & MONOCHROME */}
      <div className="mb-12 flex items-end gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={0}
          blurStrength={10}
          // ⬇️ FIXED: Uses [var(--foreground)] to force Black in Light Mode / White in Dark Mode
          containerClassName="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight"
        >
          {'//'} 01. About Me
        </ScrollReveal>
        <ScrollFade delay={0.2}>
          <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
            [ オペレーター • PROFILE ]
          </span>
        </ScrollFade>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-12">
        
        {/* 🧠 LEFT: TEXT CONTENT (LOG ENTRIES) */}
        <div className="md:w-3/5 text-neutral-600 dark:text-neutral-400 text-base leading-relaxed space-y-6">
          <ScrollFade>
            <div className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-4 relative">
              <span className="absolute -left-[5px] -top-1 text-neutral-400 dark:text-neutral-800 text-[10px]">■</span>
              <p>
                {/* ⬇️ FIXED: Highlight uses foreground variable */}
                I don&apos;t just write code—I engineer <span className="text-[var(--foreground)] font-medium">ecosystems</span>. 
                As a Telecommunications student, I am obsessed with the invisible threads that connect the world. 
                My passion lies in bridging the gap between <span className="text-[var(--foreground)] font-medium">raw hardware signals</span> and <span className="text-[var(--foreground)] font-medium">scalable software architectures</span>.
              </p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-4 relative">
               <span className="absolute -left-[5px] -top-1 text-neutral-400 dark:text-neutral-800 text-[10px]">■</span>
              <p>
                {/* ⬇️ FIXED: Highlight uses foreground variable */}
                While others focus on the surface, I thrive in the depths of <span className="text-[var(--foreground)] font-medium">Backend Engineering</span> and <span className="text-[var(--foreground)] font-medium">IoT</span>. 
                Whether it&apos;s orchestrating real-time sensor networks or optimizing high-performance databases, 
                I build the robust infrastructure that allows digital products to survive in the real world.
              </p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="pt-4">
              {/* ⬇️ FIXED: Heading uses foreground variable */}
              <h3 className="text-sm font-mono text-[var(--foreground)] mb-4 flex items-center gap-2">
                <FiZap /> INSTALLED_MODULES.json
              </h3>
              
              {/* 🛠️ TECH GRID: Styled as System Chips */}
              <ul className="grid grid-cols-2 sm:grid-cols-2 gap-3 text-sm font-mono">
                {[
                  "Golang",
                  "Redis & WebSocket",
                  "PostgreSQL",
                  "Google Cloud",
                  "Node.js",
                  "Docker & CI/CD"
                ].map((tech, i) => (
                  <li 
                    key={i} 
                    // ⬇️ FIXED: Hover state uses foreground variable
                    className="flex items-center gap-2 text-neutral-500 hover:text-[var(--foreground)] transition-colors duration-300 group cursor-default"
                  >
                    <span className="text-neutral-400 dark:text-neutral-700 group-hover:text-[var(--foreground)]">▸</span> 
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollFade>
        </div>

        {/* 👤 RIGHT: PROFILE PICTURE (POKER FAN + HUD) */}
        <ScrollFade className="md:w-2/5 relative group perspective-1000 w-full" fromY={32}>
          
          {/* DECORATIVE HUD FRAME */}
          <div className="absolute -top-6 -right-6 text-neutral-300 dark:text-neutral-800 pointer-events-none hidden md:block">
            <FiCpu size={48} className="opacity-20" />
          </div>
          
          <ProfileCarousel />

          {/* Vertical Japanese Text Decoration */}
          <div className="absolute -left-8 bottom-0 font-mono text-[10px] text-neutral-400 dark:text-neutral-700 writing-vertical-rl hidden md:block tracking-widest">
            システム稼働中
          </div>

        </ScrollFade>
      </div>
    </section>
  );
}