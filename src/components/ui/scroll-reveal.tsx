import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  stagger?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 40,
  once = true,
  stagger = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.children.length > 1 ? el.children : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, duration, y, once, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
