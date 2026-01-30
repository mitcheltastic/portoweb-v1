"use client";

import React from "react";
import Image from "next/image"; // 👈 Ensure this is imported
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import { FiClock } from "react-icons/fi";

// ⬇️ REAL DATA: Mapped with Logo Paths
const CAREER_DATA = [
  {
    id: 1,
    role: "Backend Developer",
    company: "PT. Ekshalasi Langit Biru",
    type: "Contract",
    date: "Apr 2025 - Present",
    duration: "Present",
    description: "Built high-performance backend services using Golang, processing 10K+ sensor data points/day. Integrated Redis caching to speed up retrieval by 55% and designed automated CI/CD pipelines with GitHub Actions, cutting deployment time by 60%.",
    logo: "/logos/birulangit.png" // 👈 File path in public folder
  },
  {
    id: 2,
    role: "Backend Developer",
    company: "PBI Evermos x Rakamin Academy",
    type: "Project Based Intern",
    date: "Jan 2025 - Feb 2025",
    duration: "2 mos",
    description: "Developed backend algorithms using Golang, optimizing query execution time by 35%. Optimized server performance before deployment, reducing downtime by 20%, and managed database operations using MySQL.",
    logo: "/logos/evermos.png"
  },
  {
    id: 3,
    role: "Research Assistant & HR Head",
    company: "Cyber Physical System Laboratory",
    type: "Laboratory",
    date: "Sep 2024 - Present",
    duration: "2 yrs",
    description: "Engineered backend algorithms with Express.js, improving API response time by 30%. Built and deployed 10+ RESTful APIs with Node.js. As Head of HR, streamlined team structure and onboarding to enhance member engagement.",
    logo: "/logos/cps.jpg"
  },
  {
    id: 4,
    role: "President",
    company: "International Class Student Volunteer",
    type: "Organization",
    date: "Feb 2025 - Jan 2026",
    duration: "1 yr",
    description: "Managed 50+ members, fostering a productive and inclusive work environment. Spearheaded initiatives to enhance communication and established mentorship platforms for international students.",
    logo: "/logos/SV.png"
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="mt-32 max-w-4xl mx-auto px-6 md:px-0 relative">
      
      {/* 1. HEADER */}
      <div className="mb-12 flex items-end gap-4 border-b border-[#E5E5E5] dark:border-[#262626] pb-4">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={0}
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight"
        >
          {'//'} 02. Career Timeline
        </ScrollReveal>
        <ScrollFade delay={0.2}>
           <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
            [ キャリア • HISTORY ]
          </span>
        </ScrollFade>
      </div>

      {/* 2. TIMELINE LIST */}
      <div className="flex flex-col gap-12 relative">
        {/* Continuous vertical line for timeline effect */}
        <div className="absolute left-[26px] top-4 bottom-4 w-px bg-neutral-200 dark:bg-neutral-800 z-0 hidden md:block" />

        {CAREER_DATA.map((item, index) => (
          <ScrollFade key={item.id} delay={index * 0.1} fromY={20}>
            <div className="relative z-10 flex flex-col md:flex-row gap-6 group">
              
              {/* LOGO COLUMN */}
                <div className="flex-shrink-0">
                  {/* 1. Added 'relative': Required for Next.js Image 'fill' to work.
                      2. Removed 'flex items-center justify-center': Not needed since image fills the space.
                      3. Kept 'overflow-hidden': Ensures the square image gets clipped to the rounded-full circle.
                  */}
                  <div className="relative w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm group-hover:scale-110 transition-transform duration-300 z-10 overflow-hidden">
                    
                    <Image 
                      src={item.logo} 
                      alt={item.company} 
                      fill // 👈 This makes the image expand to the full 56px (w-14) size
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      // ⬇️ CHANGED: 'object-cover' zooms/crops the image to fill the circle completely
                      className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    
                  </div>
                </div>
              {/* CONTENT COLUMN */}
              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.company} <span className="text-neutral-400 mx-1">•</span> {item.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                     <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {item.type}
                     </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono mb-3">
                  <span className="flex items-center gap-1">
                    <FiClock /> {item.date}
                  </span>
                  <span>•</span>
                  <span>{item.duration}</span>
                </div>

                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-2xl text-justify">
                  {item.description}
                </p>
              </div>

            </div>
          </ScrollFade>
        ))}
      </div>

    </section>
  );
}