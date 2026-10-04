import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  className?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  tag?: string;
}

export function ScrollFloat({
  children,
  className = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  tag: Tag = 'h2',
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="inline-block" key={index} style={{ lineHeight: 1.2 }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll('span');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    // @ts-ignore
    <Tag ref={containerRef} className={`overflow-hidden ${className}`}>
      <span className="inline-block">{splitText}</span>
    </Tag>
  );
}
