"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  fromY?: number;   // px
  blur?: number;    // px
  start?: string;
  end?: string;
  delay?: number;   // 👈 NEW: Add delay prop type
  scrubAmount?: number | boolean; // Added optional scrub support just in case
};

export default function ScrollFade({
  children,
  className = "",
  scrollContainerRef,
  fromY = 24,
  blur = 8,
  start = "top 85%",
  end = "bottom 20%",
  delay = 0,        // 👈 NEW: Default to 0
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current; 

    const ctx = gsap.context(() => {
      gsap.set(el, {
        autoAlpha: 0,
        y: fromY,
        filter: `blur(${blur}px)`,
        willChange: "transform, filter, opacity",
        force3D: true,
      });

      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y: fromY,
          filter: `blur(${blur}px)`,
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          delay: delay, // 👈 NEW: Pass the delay to GSAP
          scrollTrigger: {
            trigger: el,
            scroller,
            start,
            end,
            toggleActions: "play reverse play reverse",
            fastScrollEnd: true,
            preventOverlaps: true,
            anticipatePin: 0.5,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [scrollContainerRef, fromY, blur, start, end, delay]); // 👈 Add delay to dependency array

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}