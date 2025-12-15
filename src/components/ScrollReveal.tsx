"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import type { JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  // ⬇️ FIXED: Allow strings OR complex JSX (icons, spans, etc.)
  children: React.ReactNode; 
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
  scrubAmount = 0.5,
  staggerEach = 0.05,
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);

  // ⬇️ UPDATED: Logic to handle Strings vs Elements
  const renderContent = useMemo(() => {
    // Case 1: If it's a simple string, split it into words for the stagger effect
    if (typeof children === "string") {
      return children.split(/(\s+)/).map((word, i) => {
        if (/^\s+$/.test(word)) return word; // Keep spaces
        return (
          <span className="sr-word inline-block" key={i}>
            {word}
          </span>
        );
      });
    }
    
    // Case 2: If it's React Elements (like Icon + Text), wrap the whole thing
    // This allows <ScrollReveal><Icon /> Title</ScrollReveal> to work
    return (
      <span className="sr-word inline-block">
        {children}
      </span>
    );
  }, [children]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;
    // Select all elements we marked with 'sr-word'
    const words = el.querySelectorAll<HTMLElement>(".sr-word");

    // 1. Set Initial State
    gsap.set(el, {
      rotate: baseRotation,
      transformOrigin: "0% 50%",
      force3D: true,
    });

    gsap.set(words, {
      autoAlpha: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : undefined,
      y: 10,
      willChange: "transform, filter, opacity",
    });

    // 2. Create Master Timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: el,
        scroller: scroller,
        start: "top 90%",
        end: "bottom 60%",
        scrub: scrubAmount,
        toggleActions: "play none none reverse",
      },
    });

    // 3. Animations
    tl.to(el, { 
      rotate: 0, 
      duration: 1 
    }, 0);

    tl.to(words, {
      autoAlpha: 1,
      filter: "blur(0px)",
      y: 0,
      stagger: staggerEach,
      duration: 1,
    }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [
    // Dependencies
    scrollContainerRef,
    baseRotation,
    baseOpacity,
    blurStrength,
    enableBlur,
    scrubAmount,
    staggerEach,
    children // Re-run if content changes
  ]);

  return React.createElement(
    Tag,
    {
      ref: containerRef as any,
      className: clsx("sr-container", "backface-hidden", containerClassName),
    },
    // Render the processed content
    <span className={clsx("sr-text", textClassName)}>{renderContent}</span>
  );
}