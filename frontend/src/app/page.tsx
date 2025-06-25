// NO "use client" here. This is now a Server Component.

import HeroSection from '../components/HeroSection';

// The Project type definition
type Project = {
  id: number;
  name: string;
  description: string | null;
  repo_url: string | null;
  live_url: string | null;
};

/**
 * Fetches project data from the backend API.
 * This function runs on the server.
 */
async function getProjects(): Promise<Project[]> {
  try {
    // IMPORTANT: In production, you should use an environment variable for your API URL
    // e.g., process.env.NEXT_PUBLIC_API_URL
    const res = await fetch('http://127.0.0.1:8000/api/projects', {
      cache: 'no-store' // Use 'no-store' for fresh data on every request. Good for development.
    });

    if (!res.ok) {
      // This will be caught by the catch block below
      throw new Error('Failed to fetch projects from the API');
    }

    return res.json();
  } catch (error) {
    console.error('[FETCH_PROJECTS_ERROR]:', error);
    // In case of an error, return an empty array to prevent the page from crashing.
    return []; 
  }
}

// The page component itself is now async, allowing us to use 'await'
export default async function HomePage() {
  // We fetch the data directly here. No useState, no useEffect needed for fetching.
  const projects = await getProjects();

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
      
      {/* The Hero section is now its own clean, animated Client Component */}
      <HeroSection />

      {/* This is where you render the projects fetched from your API */}
      <section id="projects" className="mt-16">
        <h2 className="text-2xl font-bold text-lightest-slate mb-8">
          Some Things I’ve Built
        </h2>
        
        <div className="flex flex-col gap-8">
          {projects.length > 0 ? (
            projects.map(project => (
              // You can turn this into its own <ProjectCard /> component later
              <div key={project.id} className="p-6 border border-slate/20 rounded-lg bg-slate/5 hover:border-slate/40 transition-colors">
                <h3 className="text-xl font-bold text-lightest-slate">{project.name}</h3>
                <p className="text-slate mt-2">{project.description}</p>
                <div className="flex gap-4 mt-4">
                  {project.repo_url && <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>}
                  {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Live Demo</a>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate">Could not load projects or no projects are available at the moment.</p>
          )}
        </div>
      </section>

    </main>
  );
}