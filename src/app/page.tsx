// src/app/page.tsx

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import TechStackSection from "@/components/TechStackSection"; // 👈 IMPORT THIS
import ContactSection from "@/components/ContactSection";
import { PROJECTS } from "@/data/project";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 md:px-12 pt-0 pb-24 md:pb-32">
      <HeroSection />
      <AboutSection />
      <ExperienceSection projects={PROJECTS} />
      <SelectedWorkSection />
      <TechStackSection /> {/* 👈 ADD THIS HERE */}
      <ContactSection />
    </main>
  );
}