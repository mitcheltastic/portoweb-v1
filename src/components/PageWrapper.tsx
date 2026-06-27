// src/components/PageWrapper.tsx
"use client"; 

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SplashScreen from "@/components/SplashScreen";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRoot = pathname === '/';
  const [isLoading, setIsLoading] = useState(isRoot);

  useEffect(() => {
    if (!isRoot) {
      setIsLoading(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [isRoot]);

  return (
    <>
      {/* SplashScreen is only rendered on the root page */}
      {isRoot && <SplashScreen isLoading={isLoading} />}
      
      {/* This div wraps your main content (Header, Sidebars, children)
        and fades it in when isLoading becomes false.
      */}
      <div className={`
        transition-opacity duration-500 
        ${isLoading ? 'opacity-0' : 'opacity-100'}
      `}>
        {children}
      </div>
    </>
  );
}