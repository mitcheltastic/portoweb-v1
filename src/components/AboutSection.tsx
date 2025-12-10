"use client";

import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";
import { FiCpu, FiZap, FiServer } from "react-icons/fi";

export default function AboutSection() {
  return (
    <section id="about" className="mt-32 max-w-4xl mx-auto px-6 md:px-0 relative">
      
      {/* DECORATIVE: Background line trace */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-900 md:hidden" />

      {/* 1. HEADER: TECHNICAL & MONOCHROME */}
      <div className="mb-12 flex items-end gap-4 border-b border-neutral-800 pb-4">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={0}
          blurStrength={10}
          containerClassName="text-3xl md:text-4xl font-bold text-white tracking-tight"
        >
          // 01. About Me
        </ScrollReveal>
        <ScrollFade delay={0.2}>
          <span className="font-mono text-xs text-neutral-500 mb-1 tracking-widest hidden sm:inline-block">
            [ オペレーター • PROFILE ]
          </span>
        </ScrollFade>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-12">
        
        {/* 🧠 LEFT: TEXT CONTENT (LOG ENTRIES) */}
        <div className="md:w-3/5 text-neutral-400 text-base leading-relaxed space-y-6">
          <ScrollFade>
            <div className="border-l-2 border-neutral-800 pl-4 relative">
              <span className="absolute -left-[5px] -top-1 text-neutral-800 text-[10px]">■</span>
              <p>
                I don’t just write code—I engineer <span className="text-white font-medium">ecosystems</span>. 
                As a Telecommunications student, I am obsessed with the invisible threads that connect the world. 
                My passion lies in bridging the gap between <span className="text-white">raw hardware signals</span> and <span className="text-white">scalable software architectures</span>.
              </p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="border-l-2 border-neutral-800 pl-4 relative">
               <span className="absolute -left-[5px] -top-1 text-neutral-800 text-[10px]">■</span>
              <p>
                While others focus on the surface, I thrive in the depths of <span className="text-white">Backend Engineering</span> and <span className="text-white">IoT</span>. 
                Whether it's orchestrating real-time sensor networks or optimizing high-performance databases, 
                I build the robust infrastructure that allows digital products to survive in the real world.
              </p>
            </div>
          </ScrollFade>

          <ScrollFade>
            <div className="pt-4">
              <h3 className="text-sm font-mono text-white mb-4 flex items-center gap-2">
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
                    className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300 group cursor-default"
                  >
                    <span className="text-neutral-700 group-hover:text-white">▸</span> 
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
          <div className="absolute -top-6 -right-6 text-neutral-800 pointer-events-none hidden md:block">
            <FiCpu size={48} className="opacity-20" />
          </div>
          
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[350px]">
            
             {/* BACKGROUND CARD (The Dimmer Version) */}
            <div
              className="absolute inset-0 w-full h-full rounded-md z-0 overflow-hidden
                         origin-bottom transform transition-all duration-500 ease-out
                         group-hover:rotate-6 group-hover:translate-x-4 border border-neutral-800/50"
            >
              <img
                src="/MitchAboutMe.jpg"
                alt=""
                className="w-full h-full object-cover filter grayscale opacity-40 brightness-50"
              />
            </div>

            {/* FOREGROUND CARD (The Main Version) */}
            <div
              className="relative z-10 w-full h-full rounded-md overflow-hidden border border-neutral-700 bg-neutral-900 shadow-2xl
                         origin-bottom transform transition-all duration-500 ease-out
                         group-hover:-rotate-3 group-hover:-translate-x-2"
            >
              <div className="absolute inset-0 bg-neutral-900/10 z-10 group-hover:bg-transparent transition-colors duration-300" />
              <img
                src="/MitchAboutMe.jpg"
                alt="Mitch Affandi"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Tech Overlay on Image (Like a camera viewfinder) */}
              <div className="absolute top-2 left-2 z-20">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-white/70 tracking-widest bg-black/50 px-2 py-1 backdrop-blur-sm rounded">
                ID: MITCH-001
              </div>
            </div>
          </div>

          {/* Vertical Japanese Text Decoration */}
          <div className="absolute -left-8 bottom-0 font-mono text-[10px] text-neutral-700 writing-vertical-rl hidden md:block tracking-widest">
            システム稼働中
          </div>

        </ScrollFade>
      </div>
    </section>
  );
}