import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";

type Props = { projects: Project[] };

export default function ExperienceSection({ projects }: Props) {
  return (
    <section id="experience" className="mt-24">
      <h2 className="text-2xl font-bold text-lightest-slate mb-6">Experience</h2>

      <div className="flex flex-col gap-8">
        {projects.length > 0 ? (
          projects.map((p) => <ProjectCard key={p.id} project={p} />)
        ) : (
          <p className="text-slate">No experience/project data available.</p>
        )}
      </div>
    </section>
  );
}
