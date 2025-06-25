// frontend/src/app/page.tsx
"use client"; 

// 1. Import useState and useEffect from React
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// The Project type remains the same
type Project = {
  id: number; name: string; description: string | null;
  repo_url: string | null; live_url: string | null;
};

export default function HomePage() {
  // 2. Create a state variable to hold our projects. It starts as an empty array.
  const [projects, setProjects] = useState<Project[]>([]);

  // 3. Use the useEffect hook to fetch data when the component loads.
  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/projects');
        if (!res.ok) {
          throw new Error('Failed to fetch projects from the API');
        }
        const data = await res.json();
        // 4. Once data is fetched, update our state with it.
        setProjects(data);
      } catch (error) {
        console.error('[FETCH_PROJECTS_ERROR]:', error);
        // In case of an error, the 'projects' state remains an empty array.
      }
    };

    getProjects();
  }, []); // The empty array [] means this effect runs only once when the page first loads.

  return (
    // Use our new background color from the custom palette
    <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 bg-navy">
      
      {/* --- Hero Section --- */}
      <section id="hero" className="min-h-[75vh] flex flex-col justify-center mb-24">
        
        {/* Use the accent color and a smaller text size */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-accent mb-6 ml-1 font-mono text-base"
        >
          Hi, my name is
        </motion.p>
        
        {/* Use the new slate color, larger font size, and tighter letter spacing */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate tracking-tight"
        >
          Mitch Affandi.
        </motion.h1>

        {/* Use the darker slate color for the secondary heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate mt-2 tracking-tight"
        >
          I build things for the web.
        </motion.h2>

        {/* Use the standard slate color for the body text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-xl mt-6 text-slate"
        >
          I'm a software engineer specializing in backend engineering (sometimes I do fullstack), also interested in AI/ML. Currently pursuing my degree in Telecommunication Engineering at Telkom University.
        </motion.p>
      </section>

      {/* The rest of your projects section can remain the same for now */}
      {/* ... your <motion.section id="projects"> ... */}

    </main>
  );
}
