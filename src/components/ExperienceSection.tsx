// src/components/ExperienceSection.tsx
// Server Component (no "use client")

import type { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFade from "@/components/ScrollFade";

type Props = { projects: Project[] };

export default function ExperienceSection({ projects }: Props) {
  const items = projects ?? [];

  return (
    <section id="experience" className="mt-24">
      {/* Word-by-word reveal on the section title */}
      <ScrollReveal
        as="h2"
        baseOpacity={0}
        enableBlur
        baseRotation={4}
        blurStrength={10}
        containerClassName="text-2xl font-bold text-lightest-slate mb-6"
      >
        Experience
      </ScrollReveal>

      {items.length === 0 ? (
        <p className="text-slate">No experience/project data available.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {items.map((p, i) => (
            <ScrollFade
              key={p.id}
              fromY={24 + Math.min(i, 3) * 4}  // subtle depth
              blur={8}
              scrubAmount={0.6}
            >
              <ProjectCard project={p} />
            </ScrollFade>
          ))}
        </div>
      )}
    </section>
  );
}
