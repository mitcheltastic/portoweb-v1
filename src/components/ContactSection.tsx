"use client";

import React from "react";
import { FiSend, FiMail, FiCpu } from "react-icons/fi";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";

export default function ContactSection() {
  // 🛠️ CONFIG: Keeps the section visible when hitting the footer
  const keepVisible = "play none none reverse"; 

  return (
    <section id="contact" className="mt-32 mb-24 max-w-4xl mx-auto px-6 md:px-0">
      
      {/* 1. SECTION HEADER */}
      <div className="mb-12 text-center">
        <ScrollReveal
          as="h2"
          baseOpacity={0}
          enableBlur
          baseRotation={0}
          blurStrength={10}
          // ⬇️ UPDATED: Text color
          containerClassName="text-4xl font-bold text-neutral-900 dark:text-white mb-2"
        >
          Initialize Connection
        </ScrollReveal>
        
        <ScrollFade delay={0.1} toggleActions={keepVisible}>
          <p className="font-mono text-neutral-500 text-sm tracking-widest uppercase">
            [ 接続開始 ] • Transmission Open
          </p>
        </ScrollFade>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* 2. LEFT SIDE */}
        <div className="flex flex-col justify-between">
          <div>
            <ScrollFade delay={0.2} toggleActions={keepVisible}>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <FiCpu className="animate-pulse text-neutral-500 dark:text-neutral-400" /> 
                System Status: <span className="text-neutral-900 dark:text-white">ONLINE</span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Whether you have a question about my backend architecture, want to collaborate on an IoT project, or just want to discuss the latest anime season—my inbox is always open.
              </p>
            </ScrollFade>

            {/* AUDIO VISUALIZER */}
            <ScrollFade delay={0.3} toggleActions={keepVisible}>
              {/* ⬇️ UPDATED: Container Background & Border */}
              <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-lg mb-6">
                <div className="flex justify-between items-end h-12 gap-1">
                  {[40, 70, 30, 80, 50, 90, 20, 60, 40, 75, 35, 85].map((height, i) => (
                    <div 
                      key={i}
                      // ⬇️ UPDATED: Bar Color
                      className="w-full bg-neutral-400 dark:bg-neutral-600 rounded-t-sm animate-pulse"
                      style={{ 
                        height: `${height}%`,
                        animationDelay: `${i * 0.1}s` 
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-2">
                  <span>L</span>
                  <span>AUDIO SIGNAL INPUT</span>
                  <span>R</span>
                </div>
              </div>
            </ScrollFade>
          </div>

          <ScrollFade delay={0.4} toggleActions={keepVisible}>
             <a 
               href="mailto:mitch.affandi22@gmail.com"
               // ⬇️ UPDATED: Link Text Colors
               className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 group"
             >
               {/* ⬇️ UPDATED: Icon Circle Colors */}
               <div className="w-10 h-10 border border-neutral-300 dark:border-neutral-700 rounded-full flex items-center justify-center group-hover:border-neutral-900 dark:group-hover:border-white transition-colors">
                 <FiMail />
               </div>
               <span className="font-mono text-sm">mitch.affandi22@gmail.com</span>
             </a>
          </ScrollFade>
        </div>

        {/* 3. RIGHT SIDE: FORM */}
        <form className="space-y-4">
          <ScrollFade delay={0.2} fromY={20} toggleActions={keepVisible}>
            <div className="group relative">
              <input 
                type="text" 
                placeholder="Name / Alias" 
                // ⬇️ UPDATED: Input Field Colors
                className="w-full bg-neutral-100 dark:bg-neutral-900/50 
                           border border-neutral-200 dark:border-neutral-800 
                           rounded px-4 py-3 text-neutral-900 dark:text-neutral-200 
                           focus:outline-none focus:border-neutral-400 dark:focus:border-white 
                           focus:bg-white dark:focus:bg-neutral-900 
                           transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
            </div>
          </ScrollFade>

          <ScrollFade delay={0.3} fromY={20} toggleActions={keepVisible}>
            <div className="group relative">
              <input 
                type="email" 
                placeholder="Email Frequency" 
                className="w-full bg-neutral-100 dark:bg-neutral-900/50 
                           border border-neutral-200 dark:border-neutral-800 
                           rounded px-4 py-3 text-neutral-900 dark:text-neutral-200 
                           focus:outline-none focus:border-neutral-400 dark:focus:border-white 
                           focus:bg-white dark:focus:bg-neutral-900 
                           transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
            </div>
          </ScrollFade>

          <ScrollFade delay={0.4} fromY={20} toggleActions={keepVisible}>
            <div className="group relative">
              <textarea 
                rows={5}
                placeholder="Input Message Data..." 
                className="w-full bg-neutral-100 dark:bg-neutral-900/50 
                           border border-neutral-200 dark:border-neutral-800 
                           rounded px-4 py-3 text-neutral-900 dark:text-neutral-200 
                           focus:outline-none focus:border-neutral-400 dark:focus:border-white 
                           focus:bg-white dark:focus:bg-neutral-900 
                           transition-all duration-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-none"
              />
            </div>
          </ScrollFade>

          <ScrollFade delay={0.5} fromY={20} toggleActions={keepVisible}>
            <button 
              type="button" 
              // ⬇️ UPDATED: Button Colors (Inverted for contrast)
              className="w-full group relative overflow-hidden 
                         bg-neutral-900 dark:bg-neutral-200 
                         text-white dark:text-neutral-900 
                         font-bold py-3 rounded 
                         hover:bg-neutral-700 dark:hover:bg-white 
                         transition-all duration-300 ease-in-out hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>Transmit Message</span>
              <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </ScrollFade>
        </form>

      </div>
    </section>
  );
}