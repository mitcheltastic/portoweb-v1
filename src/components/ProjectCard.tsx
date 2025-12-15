"use client";

import React from "react";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";
import { Project } from "@/types/project";

type ExtendedProject = Project & {
  image?: string;
};

type Props = {
  project: ExtendedProject;
};

export default function ProjectCard({ project }: Props) {
  // 🛡️ SAFETY CHECK
  if (!project) return null;

  return (
    <article className="group relative flex flex-col h-[420px] overflow-hidden rounded-xl transition-all duration-300 
      /* ⬇️ UPDATED: Base Colors */
      bg-white dark:bg-neutral-900/50 
      border border-neutral-200 dark:border-neutral-800 
      /* ⬇️ UPDATED: Hover Effects */
      hover:shadow-xl hover:border-neutral-300 dark:hover:border-white/40 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
    >
      
      {/* 1. TOP IMAGE / PLACEHOLDER AREA */}
      <div className="h-48 w-full overflow-hidden relative bg-neutral-100 dark:bg-neutral-950 flex-shrink-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name || "Project Image"}
            className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
          />
        ) : (
          /* Placeholder: Pure monochrome gradient */
          /* ⬇️ UPDATED: Gradient for both modes */
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-950 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <FiFolder className="text-4xl text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300" />
          </div>
        )}
        
        {/* Overlay for text contrast (Only needed in dark mode really, or subtle in light) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-neutral-900 dark:to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="p-6 flex flex-col flex-grow relative">
        
        {/* Header: Title + Links */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 group-hover:text-accent dark:group-hover:text-white transition-colors duration-300 line-clamp-1">
              {project.name}
            </h3>
            
            {(project.role || project.org) && (
              <span className="text-xs text-neutral-500 mt-1 group-hover:text-neutral-700 dark:group-hover:text-neutral-400 transition-colors">
                {project.role} {project.role && project.org && "•"} {project.org}
              </span>
            )}
          </div>
          
          {/* Action Icons */}
          <div className="flex gap-4 text-neutral-400 dark:text-neutral-500">
            {project.repo_url && (
              <a 
                href={project.repo_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-neutral-900 dark:hover:text-white transition-colors z-20"
                aria-label="GitHub Repo"
              >
                <FiGithub size={20} />
              </a>
            )}
            {project.live_url && (
              <a 
                href={project.live_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-neutral-900 dark:hover:text-white transition-colors z-20"
                aria-label="Live Demo"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors">
          {project.description}
        </p>

        {/* Footer: Tech Stack Pills (Monochrome) */}
        <div className="mt-auto">
          {project.tech && project.tech.length > 0 && (
            <ul className="flex flex-wrap gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {project.tech.slice(0, 3).map((t, i) => (
                <li 
                  key={i} 
                  className="bg-neutral-100 dark:bg-neutral-800/50 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 whitespace-nowrap group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors"
                >
                  {t}
                </li>
              ))}
              {project.tech.length > 3 && (
                <li className="bg-neutral-100 dark:bg-neutral-800/50 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 group-hover:border-neutral-400 dark:group-hover:border-neutral-500 transition-colors">
                  +{project.tech.length - 3}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}