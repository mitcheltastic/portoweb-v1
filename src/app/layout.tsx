// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import LeftSidebar from "@/components/leftsidebar";
import RightSidebar from "@/components/rightsidebar";
import PageWrapper from "@/components/PageWrapper"; // <-- 1. Import the new wrapper

// --- We remove useState and useEffect imports ---

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: "Mitch's Portfolio",
  description: "Backend, Full-Stack, and AI/ML Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.variable} ${spaceMono.variable} bg-black font-sans`} 
        // Changed from bg-gray-900 to bg-black
        suppressHydrationWarning={true}
      >
        <PageWrapper>
          <Header />
          <LeftSidebar />
          <RightSidebar />
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}