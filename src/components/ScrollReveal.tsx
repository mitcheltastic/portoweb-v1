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
  rotationEnd?: string;     // e.g. "bottom bottom"
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

    // Initial state: tilted + faint + blurred
    gsap.set(el, {
      rotate: baseRotation,
      transformOrigin: "0% 50%",
      force3D: true,
    });

    gsap.set(words, {
      autoAlpha: baseOpacity,
      ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
      willChange: "transform, filter, opacity",
    });

    // ===== 1) Container rotation (scrubbed both ways) =====
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top bottom",
        end: rotationEnd,
        scrub: scrubAmount,      // ← reveal + reverse
        fastScrollEnd: true,
        preventOverlaps: true,
        anticipatePin: 0.5,
      },
    });

    tl.to(el, { rotate: 0 }, 0);

    // ===== 2) Words fade/blur in (also scrubbed both ways) =====
    const trig2 = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: "top bottom-=20%",
      end: wordAnimationEnd,
      scrub: scrubAmount,        // ← reveal + reverse
      fastScrollEnd: true,
    });

    const wordsTween = gsap.to(words, {
      autoAlpha: 1,
      filter: enableBlur ? "blur(0px)" : undefined,
      stagger: staggerEach,
      ease: "none",
      scrollTrigger: trig2,
    });

    // Cleanup only what we created
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();

      trig2.kill();
      wordsTween.scrollTrigger?.kill();
      wordsTween.kill();
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
