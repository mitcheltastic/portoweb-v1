"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import type { JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: keyof JSX.IntrinsicElements;
  scrubAmount?: number;
  staggerEach?: number;
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  as: Tag = "h2",
  scrubAmount = 0.5, // Lowered slightly for snappier response on up/down
  staggerEach = 0.05,
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, i) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="sr-word inline-block" key={i}>
          {word}
        </span>
      );
    });
  }, [children]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;
    const words = el.querySelectorAll<HTMLElement>(".sr-word");

    // 1. Set Initial State
    // Container is tilted
    gsap.set(el, {
      rotate: baseRotation,
      transformOrigin: "0% 50%",
      force3D: true, // Optimizes for GPU
    });

    // Words are faint and blurred
    gsap.set(words, {
      autoAlpha: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : undefined,
      y: 10, // Slight Y offset for better entrance feel
      willChange: "transform, filter, opacity",
    });

    // 2. Create ONE Master Timeline
    // This ensures rotation and text reveal are perfectly locked together
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" }, // Smoother easing
      scrollTrigger: {
        trigger: el,
        scroller: scroller,
        // Start when the top of element is at 90% of viewport height (near bottom)
        start: "top 90%", 
        // Finish when the bottom of element is at 60% of viewport height (center-ish)
        end: "bottom 60%", 
        scrub: scrubAmount, // This enables the Up/Down scroll effect
        toggleActions: "play none none reverse",
      },
    });

    // 3. Add Animations to Timeline
    // Animate Rotation
    tl.to(el, { 
      rotate: 0, 
      duration: 1 
    }, 0);

    // Animate Words (running in parallel with rotation)
    tl.to(words, {
      autoAlpha: 1,
      filter: "blur(0px)",
      y: 0,
      stagger: staggerEach,
      duration: 1,
    }, 0); // The '0' here forces it to start at the beginning of the timeline

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [
    scrollContainerRef,
    baseRotation,
    baseOpacity,
    blurStrength,
    enableBlur,
    scrubAmount,
    staggerEach,
  ]);

  return React.createElement(
    Tag,
    {
      ref: containerRef as any,
      className: clsx("sr-container", "backface-hidden", containerClassName),
    },
    <span className={clsx("sr-text", textClassName)}>{splitText}</span>
  );
}