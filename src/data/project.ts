import { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    id: 100,
    name: "SingularityX – Environmental Monitoring Backend",
    description:
      "Next-gen modular backend powering real-time sensor ingestion, caching, and live dashboards.",
    repo_url: null,
    live_url: null,
    role: "Backend Developer/Architect",
    org: "PT. Ekshalasi Langit Biru",
    period: "May–Jun 2025",
    tech: ["Go", "PostgreSQL", "Redis", "WebSocket", "Google Cloud", "GitHub Actions"],
    highlights: [
      "Handled 10K+ sensor entries/day with improved fault tolerance",
      "Redis caching → ~55% faster data retrieval",
      "CI/CD with GitHub Actions → ~60% faster deployments",
    ],
    featured: true,
  },
  {
    id: 110,
    name: "Boostify – Face Recognition Attendance",
    description:
      "Attendance monitoring for 40+ lab members with face recognition and clean admin flows.",
    repo_url: null,
    live_url: null,
    role: "Full-stack Developer",
    org: "Cyber Physical System Laboratory",
    period: "Sep–Oct 2024",
    tech: ["Express.js", "PostgreSQL", "Prisma", "Supabase", "Vercel", "ImageKit"],
    highlights: [
      "Check-in efficiency improved by ~80%",
      "Implemented CRUD, profile image, and attendance history",
    ],
  },
  {
    id: 120,
    name: "Cyber Academy Website – LMS & Mentoring",
    description:
      "Mentoring registration and lightweight LMS with task posting and submissions.",
    repo_url: null,
    live_url: null,
    role: "Backend Developer",
    org: "Cyber Physical System Laboratory",
    period: "Oct–Nov 2024",
    tech: ["Express.js", "PostgreSQL", "Prisma", "Vercel", "Git"],
    highlights: [
      "Structured ERD and backend architecture",
      "Improved user task flow and submission UX",
    ],
  },
  {
    id: 130,
    name: "SiJaga – Smart IoT Locker Monitoring",
    description:
      "Real-time device monitoring with WebSocket and 15+ production APIs.",
    repo_url: null,
    live_url: null,
    role: "Backend Developer & Head of Documentation",
    org: "CPS Lab (Pengabdian Masyarakat)",
    period: "Nov 2024–Jan 2025",
    tech: ["Express.js", "PostgreSQL", "Supabase", "WebSocket", "Railway"],
    highlights: [
      "Reduced backend processing time by ~40%",
      "Delivered real-time update pipeline",
    ],
  },
  // Keep one personal item for portfolio context
  {
    id: 1,
    name: "Personal Portfolio (Next.js + Tailwind)",
    description:
      "Minimalist, fast portfolio with App Router, custom sections, and responsive layout.",
    repo_url: "https://github.com/your-user/your-portfolio",
    live_url: "https://your-domain.xyz",
    role: "Frontend Engineer",
    org: "Personal",
    period: "2025",
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    highlights: ["Static rendering, clean sections, easy content model"],
  },
];
