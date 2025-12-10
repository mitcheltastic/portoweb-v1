// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import LeftSidebar from "@/components/leftsidebar";
import RightSidebar from "@/components/rightsidebar";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Mitch's Porto",
  description: "Backend, Full-Stack, and AI/ML Developer Portfolio",
  // 👇 Add this section
  icons: {
    icon: "/MitchLogo.png", 
  },
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
        suppressHydrationWarning={true}
      >
        <PageWrapper>
          <Header />
          <LeftSidebar />
          <RightSidebar />
          {children}
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}