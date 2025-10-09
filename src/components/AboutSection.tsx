export default function AboutSection() {
  return (
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
            I’ve had the opportunity to work on{" "}
            <span className="text-accent">client projects, startups, and freelance gigs</span>.
            My current focus is building accessible and delightful experiences using modern tools like
            <span className="text-accent"> React</span> and <span className="text-accent">Next.js</span>.
          </p>
          <p>Here are a few technologies I’ve been working with recently:</p>

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
          {/* White outline border effect */}
          <div
            className="absolute top-5 left-5 w-full h-full border-2 border-accent rounded-md z-[-1]
                       transition-transform duration-300 ease-in-out
                       group-hover:translate-x-2 group-hover:translate-y-2"
          />

          {/* Image wrapper */}
          <div
            className="relative w-full rounded-md overflow-hidden border-2 border-slate-700 shadow-lg
                       transition-transform duration-300 ease-in-out
                       group-hover:-translate-x-2 group-hover:-translate-y-2"
          >
            <img
              src="/MitchAboutMe.jpg"
              alt="Mitch Affandi"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
