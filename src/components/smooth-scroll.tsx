"use client";

import { ReactNode, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global motion layer:
 * - Lenis smooth (momentum/velocity-aware) scrolling, driven by GSAP's ticker
 *   so ScrollTrigger animations stay perfectly in sync with the lerped scroll.
 * - MotionConfig makes every framer-motion animation respect
 *   prefers-reduced-motion automatically.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
