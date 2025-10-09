"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  fromY?: number;          // px
  blur?: number;           // px
  start?: string;
  end?: string;
  scrub?: boolean | number;
  scrubAmount?: number;    // preferred numeric scrub for smoothness
};

export default function ScrollFade({
  children,
  className = "",
  scrollContainerRef,
  fromY = 24,
  blur = 8,
  start = "top bottom-=10%",
  end = "bottom bottom",
  scrub,              // legacy prop (if provided, overrides scrubAmount)
  scrubAmount = 0.6,  // buttery
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;

    // Pre-set to avoid flicker
    gsap.set(el, {
      autoAlpha: 0,
      y: fromY,
      filter: `blur(${blur}px)`,
      willChange: "transform, filter, opacity",
      force3D: true,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller,
      start,
      end,
      scrub: scrub ?? scrubAmount,
      fastScrollEnd: true,
      preventOverlaps: true,
      anticipatePin: 0.5,
    });

    const tween = gsap.to(el, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      ease: "none",
      scrollTrigger: st,
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, [scrollContainerRef, fromY, blur, start, end, scrub, scrubAmount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
