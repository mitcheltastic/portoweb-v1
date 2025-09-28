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
    // IMPORTANT: In production, use an environment variable for your API URL
    const res = await fetch('http://127.0.0.1:8000/api/projects', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch projects from the API');
    }

    return res.json();
  } catch (error) {
    console.error('[FETCH_PROJECTS_ERROR]:', error);
    return [];
  }
}

// The page component itself is now async, allowing us to use 'await'
export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
      <HeroSection />

      {/* ✅ About Section */}
      <section id="about" className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-accent mb-10 flex items-center gap-4">
          About Me
          <div className="flex-1 h-px bg-slate-700" />
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* 🧠 Text Content */}
          <div className="md:w-3/5 text-slate text-base leading-relaxed space-y-4">
            <p>
              Hello! My name is Mitch and I enjoy building things that live on the internet.
              My journey into web development started with curiosity and has turned into a passion
              for crafting intuitive digital products.
            </p>
            <p>
              I’ve had the opportunity to work on <span className="text-accent">client projects, startups, and freelance gigs</span>.
              My current focus is building accessible and delightful experiences using modern tools like
              <span className="text-accent"> React</span> and <span className="text-accent">Next.js</span>.
            </p>
            <p>
              Here are a few technologies I’ve been working with recently:
            </p>

            {/* 🛠️ Tech Grid */}
            <ul className="grid grid-cols-2 gap-x-10 text-sm font-mono mt-4">
              <li className="before:content-['▸'] before:mr-2 before:text-accent">JavaScript (ES6+)</li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">TypeScript</li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">React</li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">Next.js</li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">TailwindCSS</li>
              <li className="before:content-['▸'] before:mr-2 before:text-accent">Node.js</li>
            </ul>
          </div>

          {/* 👤 Profile Picture */}
          <div className="md:w-2/5 relative group">
            {/* 👁️ White Outline Border Effect - moves bottom-right */}
            <div className="absolute top-5 left-5 w-full h-full border-2 border-accent rounded-md z-[-1] 
                            transition-transform duration-300 ease-in-out 
                            group-hover:translate-x-2 group-hover:translate-y-2" />

            {/* 🖼️ Image Wrapper - moves top-left */}
            <div className="relative w-full rounded-md overflow-hidden border-2 border-slate-700 shadow-lg 
                            transition-transform duration-300 ease-in-out 
                            group-hover:-translate-x-2 group-hover:-translate-y-2">
              <img
                src="/MitchAboutMe.jpg"
                alt="Mitch Affandi"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* ✅ Experience Section */}
      <section id="experience" className="mt-24">
        <h2 className="text-2xl font-bold text-lightest-slate mb-6">Experience</h2>
        <div className="flex flex-col gap-8">
          {projects.length > 0 ? (
            projects.map(project => (
              <div
                key={project.id}
                className="p-6 border border-slate/20 rounded-lg bg-slate/5 hover:border-slate/40 transition-colors"
              >
                <h3 className="text-xl font-bold text-lightest-slate">{project.name}</h3>
                <p className="text-slate mt-2">{project.description}</p>
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
              </div>
            ))
          ) : (
            <p className="text-slate">No experience/project data available.</p>
          )}
        </div>
      </section>

      {/* ✅ Work Section (Optional – can merge with Experience) */}
      <section id="projects" className="mt-24">
        <h2 className="text-2xl font-bold text-lightest-slate mb-6">Selected Work</h2>
        <p className="text-slate">Coming soon — more handpicked projects with deeper insights and demos.</p>
      </section>

      {/* ✅ Contact Section */}
      <section id="contact" className="mt-24">
        <h2 className="text-2xl font-bold text-lightest-slate mb-6">Get In Touch</h2>
        <p className="text-slate mb-4">
          Have a question, a project in mind, or just want to say hi? I’m always open to new opportunities and conversations.
        </p>
        <a
          href="mailto:mitch.affandi22@gmail.com"
          className="inline-block border border-accent text-accent px-6 py-2 rounded hover:bg-accent hover:text-white transition-colors"
        >
          Say Hello
        </a>
      </section>
    </main>
  );
}
