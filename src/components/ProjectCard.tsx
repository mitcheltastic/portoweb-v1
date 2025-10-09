import { Project } from "@/types/project";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <article className="p-6 border border-slate/20 rounded-lg bg-slate/5 hover:border-slate/40 transition-colors">
      <header className="mb-3">
        <h3 className="text-xl font-bold text-lightest-slate">{project.name}</h3>
        {(project.role || project.org || project.period) && (
          <p className="text-sm text-slate mt-1">
            {project.role && <span>{project.role}</span>}
            {project.role && project.org && <span> • </span>}
            {project.org && <span>{project.org}</span>}
            {(project.role || project.org) && project.period && <span> • </span>}
            {project.period && <span>{project.period}</span>}
          </p>
        )}
      </header>

      {project.description && <p className="text-slate">{project.description}</p>}

      {/* Tech chips */}
      {project.tech && project.tech.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t) => (
            <li
              key={t}
              className="text-xs px-2 py-1 rounded border border-slate/30 text-slate/90"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="list-disc ml-5 mt-4 text-slate text-sm space-y-1">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      {/* Actions */}
      {(project.repo_url || project.live_url) && (
        <div className="flex gap-4 mt-4">
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}
