"use client";

import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";

export default function AboutSection() {
  return (
    <section id="about" className="mt-24 max-w-4xl mx-auto">
      {/* Word-by-word headline animation */}
      <ScrollReveal
        as="h2"
        baseOpacity={0}
        enableBlur
        baseRotation={4}
        blurStrength={10}
        containerClassName="text-2xl font-bold text-accent mb-10 flex items-center gap-4"
        textClassName=""
      >
        About Me
      </ScrollReveal>

      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* 🧠 Text Content */}
        <div className="md:w-3/5 text-slate text-base leading-relaxed space-y-4">
          <ScrollFade>
            <p>
              I don’t just write code—I engineer ecosystems. As a Telecommunications student, 
              I am obsessed with the invisible threads that connect the world. My passion lies in bridging the gap between 
              <span className="text-accent"> raw hardware signals</span> and <span className="text-accent">scalable software architectures</span>.
            </p>
          </ScrollFade>

          <ScrollFade>
            <p>
              While others focus on the surface, I thrive in the depths of <span className="text-accent">Backend Engineering</span> and <span className="text-accent">IoT</span>. 
              Whether it's orchestrating real-time sensor networks or optimizing high-performance databases, 
              I build the robust infrastructure that allows digital products to survive in the real world.
            </p>
          </ScrollFade>

          <ScrollFade>
            <p>Here are the technologies I use to build the future:</p>
          </ScrollFade>

          {/* 🛠️ Tech Grid */}
          <ScrollFade>
            <ul className="grid grid-cols-2 gap-x-10 text-sm font-mono mt-4">
              <li className="before:content-['▸'] before:mr-2 before:text-accent">
                Golang
              </li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">
                Redis & WebSocket
              </li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">
                PostgreSQL
              </li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">
                Google Cloud Platform
              </li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">
                Node.js
              </li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">
                Docker & CI/CD
              </li>
            </ul>
          </ScrollFade>
        </div>

        {/* 👤 Profile Picture Area (Poker Fan Effect) */}
        <ScrollFade className="md:w-2/5 relative group perspective-1000" fromY={32}>
          
          {/* BACKGROUND CARD (The Dimmer Version) */}
          <div
            className="absolute inset-0 w-full h-full rounded-md z-0 overflow-hidden
                       origin-bottom transform transition-all duration-500 ease-out
                       group-hover:rotate-6 group-hover:translate-x-2"
          >
            <img
              src="/MitchAboutMe.jpg"
              alt=""
              className="w-full h-full object-cover filter grayscale opacity-60 brightness-50"
            />
          </div>

          {/* FOREGROUND CARD (The Main Version) */}
          <div
            className="relative z-10 w-full rounded-md overflow-hidden border-2 border-slate-700 shadow-xl
                       origin-bottom transform transition-all duration-500 ease-out
                       group-hover:-rotate-6 group-hover:-translate-x-2"
          >
            <img
              src="/MitchAboutMe.jpg"
              alt="Mitch Affandi"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}