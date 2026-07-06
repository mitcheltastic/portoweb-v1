import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

import NavigationWrapper from "@/components/NavigationWrapper";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/footer";
// ⬇️ 1. Import the ThemeProvider
import { ThemeProvider } from "@/components/ThemeProvider";
import Jukebox from "@/components/Jukebox";

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
  title: "Mitchel Mohamad Affandi | Portfolio",
  description: "Explore my portfolio, backend engineering projects, and cloud infrastructure solutions.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://mitchaff.me/",
    title: "Mitchel Mohamad Affandi | Portfolio",
    description: "Explore my backend engineering projects and cloud infrastructure solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitchel Mohamad Affandi | Portfolio",
    description: "Explore my backend engineering projects and cloud infrastructure solutions.",
  },
  icons: {
    icon: "/favicon-v1.png",
    shortcut: "/favicon-v1.png",
    apple: "/favicon-v1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ⬇️ 2. Add suppressHydrationWarning to html (Crucial for next-themes)
    <html lang="en" suppressHydrationWarning>
      <body
        // ⬇️ 3. REMOVED "bg-black" here. Let ThemeProvider handle the background via globals.css
        className={`${inter.variable} ${spaceMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        {/* ⬇️ 4. Wrap everything in ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PageWrapper>
            <NavigationWrapper />
            {children}
            <Footer />
            <Jukebox />
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}