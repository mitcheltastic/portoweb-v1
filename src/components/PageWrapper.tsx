// src/components/PageWrapper.tsx
"use client"; 

import { useState, useEffect } from 'react';
import SplashScreen from "@/components/SplashScreen";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SplashScreen is always rendered, but it will hide itself based on the prop */}
      <SplashScreen isLoading={isLoading} />
      
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