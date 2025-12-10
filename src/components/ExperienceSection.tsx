"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";

type Props = { projects: Project[] };

export default function ExperienceSection({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<GSAPAnimation | null>(null);

  // 🛡️ Safe filtering: Ensure we don't map over undefined items
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
    <section id="experience" className="mt-24 w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-0">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={4}
          blurStrength={10}
          containerClassName="text-2xl font-bold text-accent mb-10"
        >
          Experience
        </ScrollReveal>
      </div>

      {items.length === 0 ? (
        <p className="text-slate max-w-4xl mx-auto px-6">No data available.</p>
      ) : (
        <div 
          ref={containerRef}
          className="relative w-full py-8 cursor-grab active:cursor-grabbing"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Faded Edges */}
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
      )}
    </section>
  );
}