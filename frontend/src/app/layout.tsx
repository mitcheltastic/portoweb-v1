// frontend/src/app/layout.tsx
import type { Metadata } from "next";
// 1. Import the fonts we want from next/font/google
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import LeftSidebar from "@/components/leftsidebar";
import RightSidebar from "@/components/rightsidebar";

// 2. Configure the fonts
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // We assign it to a CSS variable
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-space-mono', // We assign it to another CSS variable
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
      {/* 3. Apply the font variables to the body tag */}
      <body className={`${inter.variable} ${spaceMono.variable} bg-gray-900 font-sans`}>
        <Header />
        <LeftSidebar />
        <RightSidebar />
        {children}
      </body>
    </html>
  );
}