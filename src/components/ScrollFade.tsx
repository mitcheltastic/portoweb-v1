"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  fromY?: number;
  blur?: number;
  start?: string;
  end?: string;
  delay?: number;
  // ⬇️ NEW PROP: Allows us to override the animation behavior
  toggleActions?: string; 
};

export default function ScrollFade({
  children,
  className = "",
  scrollContainerRef,
  fromY = 24,
  blur = 8,
  start = "top 85%",
  end = "bottom 20%",
  delay = 0,
  // ⬇️ DEFAULT: "play reverse play reverse" (Fade in -> Fade out -> Fade in -> Fade out)
  toggleActions = "play reverse play reverse", 
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
          delay: delay,
          scrollTrigger: {
            trigger: el,
            scroller,
            start,
            end,
            // ⬇️ Use the prop here instead of hardcoding
            toggleActions: toggleActions, 
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
  }, [scrollContainerRef, fromY, blur, start, end, delay, toggleActions]); // Added toggleActions to dependency

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}