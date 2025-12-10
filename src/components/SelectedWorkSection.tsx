"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/project"; // Assuming this is where your data lives

export default function SelectedWorkSection() {
  // Filter for your "Top" or "Current" projects. 
  // For now, I'm taking the first 2 as an example. 
  // You can change this logic to filter by a 'featured' boolean if you add one.
  const selectedProjects = PROJECTS.slice(0, 2); 

  return (
    <section id="projects" className="mt-32 max-w-4xl mx-auto px-6 md:px-0">
      
      {/* 1. ANIMATED TITLE */}
      <div className="mb-12">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={2} // Slightly less rotation for a cleaner feel
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          What I'm currently dealing with
        </ScrollReveal>
        
        <ScrollFade delay={0.2}>
          <div className="h-1 w-20 bg-neutral-800 rounded-full" />
        </ScrollFade>
      </div>

      {/* 2. PROJECT GRID WITH SCROLL FADE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {selectedProjects.map((project, index) => (
          <ScrollFade 
            key={project.id || index} 
            fromY={40}             // Projects slide up from 40px down
            blur={10}              // Start blurred
            delay={index * 0.1}    // Stagger effect (2nd card waits slightly)
          >
            <ProjectCard project={project} />
          </ScrollFade>
        ))}
      </div>

      {/* 3. "VIEW ALL" BUTTON (Optional, keeps flow going) */}
      <ScrollFade fromY={20} delay={0.3} className="mt-12 text-center">
        <a 
          href="https://github.com/mitcheltastic" 
          target="_blank" 
          rel="noreferrer"
          className="inline-block px-8 py-3 text-sm font-mono border border-neutral-700 text-neutral-400 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          View Full Project Archive
        </a>
      </ScrollFade>
    </section>
  );
}