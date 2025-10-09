// Server Component – no "use client"

import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/data/project";
import type { Project } from "@/types/project";

function pickSelectedWork(projects: Project[], max = 6): Project[] {
  const featured = projects.filter((p) => p.featured);
  if (featured.length > 0) {
    // Keep stable order as defined in your data file
    return featured.slice(0, max);
  }
  // Fallback: take the first few items
  return projects.slice(0, Math.min(max, projects.length));
}

export default function SelectedWorkSection() {
  const selected = pickSelectedWork(PROJECTS, 6);

  return (
    <section id="projects" className="mt-24">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-lightest-slate">Selected Work</h2>
        <a
          href="#experience"
          className="text-sm text-accent hover:underline"
          aria-label="View all projects and experience"
        >
          View all →
        </a>
      </div>

      {selected.length === 0 ? (
        <p className="text-slate">
          Coming soon — more handpicked projects with deeper insights and demos.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selected.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
