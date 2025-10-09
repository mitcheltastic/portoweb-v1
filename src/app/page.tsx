// NO "use client" here. This stays a Server Component and is statically rendered.

import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import ContactSection from "@/components/ContactSection";

import { PROJECTS } from "@/data/project";

// Force static generation in the App Router
export const dynamic = "force-static";

// If you ever add ISR, you can tweak this. For pure static, keep it false.
export const revalidate = false;

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32">
      <HeroSection />
      <AboutSection />
      <ExperienceSection projects={PROJECTS} />
      <SelectedWorkSection />
      <ContactSection />
    </main>
  );
}
