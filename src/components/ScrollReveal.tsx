"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import type { JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string; // plain string
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;    // initial opacity for words (via autoAlpha)
  baseRotation?: number;   // initial skew/tilt for container
  blurStrength?: number;   // initial blur px
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;     // e.g. 'bottom bottom'
  wordAnimationEnd?: string;
  as?: keyof JSX.IntrinsicElements;
  scrubAmount?: number;     // smoother than true; default 0.7s catch-up
  staggerEach?: number;     // seconds per word
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
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  as: Tag = "h2",
  scrubAmount = 0.7,
  staggerEach = 0.03,
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, i) => {
      if (/^\s+$/.test(word)) return word;
      return (
        <span className="sr-word" key={i}>
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

    // Set initial state (no flash)
    gsap.set(el, {
      rotate: baseRotation,
      transformOrigin: "0% 50%",
      force3D: true,
    });
    gsap.set(words, {
      autoAlpha: baseOpacity, // opacity + visibility
      ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
      willChange: "transform, filter, opacity",
    });

    // One timeline to rule them all — smoother than separate tweens
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top bottom",
        end: rotationEnd, // container motion length
        scrub: scrubAmount, // <- smooth catch-up
        fastScrollEnd: true,
        preventOverlaps: true,
        anticipatePin: 0.5,
        // snap the progress a tiny bit to reduce micro-stutter on slow wheels
        snap: { snapTo: [0, 0.25, 0.5, 0.75, 1], duration: 0.1, ease: "power1.out" },
      },
    });

    // Rotate container to 0 across the whole section
    tl.to(el, { rotate: 0 }, 0);

    // Word animation runs over the same scroll span (can be shorter via end markers)
    const trig2 = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: "top bottom-=20%",
      end: wordAnimationEnd,
      scrub: scrubAmount,
      fastScrollEnd: true,
    });

    // Tie word animation progress to trig2
    gsap.to(words, {
      autoAlpha: 1,
      filter: enableBlur ? "blur(0px)" : undefined,
      stagger: staggerEach,
      ease: "none",
      scrollTrigger: trig2,
    });

    return () => {
      tl.scrollTrigger?.kill();
      trig2.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, [
    scrollContainerRef,
    baseRotation,
    baseOpacity,
    blurStrength,
    enableBlur,
    rotationEnd,
    wordAnimationEnd,
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
