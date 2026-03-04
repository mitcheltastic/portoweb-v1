import { Project } from "@/types/project";

export const PROJECTS: Project[] = [
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
    // ⬇️ ADDED IMAGE HERE
    image: "/projects/boostify.png", 
  },
  {
    id: 120,
    name: "Cyber Academy Website – LMS & Mentoring",
    description:
      "Mentoring registration and lightweight LMS with task posting and submissions.",
    repo_url: "https://github.com/mitcheltastic/be-cyberrecruitment2024",
    live_url: null,
    role: "Backend Developer",
    org: "Cyber Physical System Laboratory",
    period: "Oct–Nov 2024",
    tech: ["Express.js", "PostgreSQL", "Prisma", "Vercel", "Git"],
    highlights: [
      "Structured ERD and backend architecture",
      "Improved user task flow and submission UX",
    ],
    // ⬇️ ADDED IMAGE HERE
    image: "/projects/cyber-academy.png", 
  },
  {
    id: 130,
    name: "SiJaga – Smart IoT Locker Monitoring",
    description:
      "Real-time device monitoring with WebSocket and 15+ production APIs.",
    repo_url: "https://github.com/mitcheltastic/sijaga-railway",
    live_url: "https://sijaga-web.vercel.app/",
    role: "Backend Developer & Head of Documentation",
    org: "CPS Lab (Pengabdian Masyarakat)",
    period: "Nov 2024–Jan 2025",
    tech: ["Express.js", "PostgreSQL", "Supabase", "WebSocket", "Railway"],
    highlights: [
      "Reduced backend processing time by ~40%",
      "Delivered real-time update pipeline",
    ],
    // ⬇️ ADDED IMAGE HERE
    image: "/projects/sijaga.png", 
  },
  {
    id: 1,
    name: "Personal Portfolio (Next.js + Tailwind)",
    description:
      "Minimalist, fast portfolio with App Router, custom sections, and responsive layout.",
    repo_url: "https://github.com/mitcheltastic/portoweb-v1",
    live_url: "https://mitchaff.vercel.app/",
    role: "Frontend Engineer",
    org: "Personal",
    period: "2025",
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    highlights: ["Static rendering, clean sections, easy content model"],
    // ⬇️ ADDED IMAGE HERE
    image: "/projects/portfolio.png", 
  },
  {
    id: 140,
    name: "MIRA – Information Retention App",
    description:
      "A comprehensive Flutter mobile app designed to enhance learning through AI-powered study tools and personalized techniques.",
    repo_url: "https://github.com/mitcheltastic/mira-mobapp",
    live_url: null, // Add if you have it on the Play Store/App Store!
    role: "Mobile Developer",
    org: "Personal Project", // Feel free to change this if it was for a specific org/hackathon
    period: "2024", // Adjust this to the actual date you worked on it
    tech: ["Flutter", "Dart", "Supabase", "Google Gen AI"],
    highlights: [
      "Engineered AI-enhanced study tools including Feynman technique, Blurting method, and AI Chat",
      "Architected a 'Second Brain' for intelligent note storage, retrieval, and advanced search",
      "Integrated real-time community chat and secure biometric/Google authentication",
    ],
    // ⬇️ Make sure to add a screenshot of the app to your public/projects/ folder!
    image: "/projects/mira.png", 
  },
  {
    id: 150,
    name: "GLOW Website",
    description:
      "A clean, responsive static website developed to showcase team projects, member profiles, and contact information.",
    repo_url: "https://github.com/mitcheltastic/Group2WebsiteGLOW",
    live_url: "https://glow-mba.vercel.app/", // Update this if you ever host it on GitHub Pages/Netlify!
    role: "Frontend Developer",
    org: "Academic / Group Project", 
    period: "2024", // Adjust if it was from an earlier semester
    tech: ["HTML5", "CSS3", "JavaScript"],
    highlights: [
      "Built a fully responsive UI from scratch without heavy frameworks",
      "Implemented smooth scrolling and custom image animations using vanilla JavaScript",
      "Designed an organized team directory and functional contact form layout",
    ],
    // ⬇️ Remember to grab a screenshot of the homepage and save it here!
    image: "/projects/glow.png", 
  },
  {
    id: 160,
    name: "AQUA System – IoT Environmental Monitoring",
    description:
      "Advanced IoT system utilizing an ESP32 microcontroller to track water levels, soil moisture, and rainfall intensity to prevent water-related disasters.",
    repo_url: "https://github.com/mitcheltastic/aqua-system",
    live_url: "https://aqua-monitoring-rosy.vercel.app/", 
    role: "IoT Developer",
    org: "Academic Project", 
    period: "Early 2026", 
    tech: ["C++", "ESP32", "Firebase", "Arduino", "Hardware/IoT"],
    highlights: [
      "Integrated ultrasonic, capacitive soil, and analog rain sensors for real-time environmental data collection",
      "Engineered a 3-tier smart alert system (Safe, Warning, Danger) with local LCD and dual-buzzer outputs",
      "Implemented real-time synchronization and persistent historical logging via Firebase Realtime Database",
    ],
    // ⬇️ Grab a photo of your hardware setup or the LCD screen and save it here!
    image: "/projects/aqua.png", 
  },
  {
    id: 170,
    name: "Agricultural Data Analyzer",
    description:
      "A C-based console application designed to parse, analyze, and report on Indonesian corn agricultural statistics across 34 provinces.",
    repo_url: "https://github.com/mitcheltastic/Final-Algorithm-Programming-Project",
    live_url: "https://www.youtube.com/watch?v=xYsSJlVgTZU", // Console app, so no live link
    role: "C Developer",
    org: "Academic / Group Project", 
    period: "Algorithm Programming Course", 
    tech: ["C", "Algorithms", "Data Processing", "CLI"],
    highlights: [
      "Engineered a robust console-based tool to parse custom CSV-like text files using standard C libraries",
      "Implemented custom sorting and searching algorithms to process multi-year agricultural data",
      "Built an interactive CLI menu to compute statistical aggregates, including averages, totals, and min/max values",
    ],
    // ⬇️ Take a screenshot of your terminal running the menu or displaying data!
    image: "/projects/alpro-pertanian.png", 
  },
];