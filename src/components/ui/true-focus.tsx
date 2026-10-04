import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  words: string[];
  className?: string;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetween?: number;
}

export function TrueFocus({
  words,
  className = '',
  blurAmount = 4,
  borderColor = 'rgba(255, 199, 0, 0.6)',
  glowColor = 'rgba(255, 199, 0, 0.3)',
  animationDuration = 0.5,
  pauseBetween = 1.5,
}: TrueFocusProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetween) * 1000);

    return () => clearInterval(interval);
  }, [animationDuration, pauseBetween, words.length]);

  useEffect(() => {
    if (currentIndex === null || !wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  return (
    <div ref={containerRef} className={`relative flex gap-[0.4em] justify-center items-center flex-wrap select-none ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => { wordRefs.current[index] = el; }}
          className="relative font-sentient font-extrabold transition-[filter] cursor-default"
          style={{
            filter: index === currentIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}
        </span>
      ))}

      {/* Focus frame corners */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: 1,
        }}
        transition={{ duration: animationDuration, ease: 'easeInOut' }}
        style={{ boxSizing: 'content-box' }}
      >
        {/* Top-left corner */}
        <span
          className="absolute -top-2 -left-2 w-3 h-3 rounded-[2px]"
          style={{
            borderTop: `2px solid ${borderColor}`,
            borderLeft: `2px solid ${borderColor}`,
            filter: `drop-shadow(0 0 4px ${glowColor})`,
          }}
        />
        {/* Top-right corner */}
        <span
          className="absolute -top-2 -right-2 w-3 h-3 rounded-[2px]"
          style={{
            borderTop: `2px solid ${borderColor}`,
            borderRight: `2px solid ${borderColor}`,
            filter: `drop-shadow(0 0 4px ${glowColor})`,
          }}
        />
        {/* Bottom-left corner */}
        <span
          className="absolute -bottom-2 -left-2 w-3 h-3 rounded-[2px]"
          style={{
            borderBottom: `2px solid ${borderColor}`,
            borderLeft: `2px solid ${borderColor}`,
            filter: `drop-shadow(0 0 4px ${glowColor})`,
          }}
        />
        {/* Bottom-right corner */}
        <span
          className="absolute -bottom-2 -right-2 w-3 h-3 rounded-[2px]"
          style={{
            borderBottom: `2px solid ${borderColor}`,
            borderRight: `2px solid ${borderColor}`,
            filter: `drop-shadow(0 0 4px ${glowColor})`,
          }}
        />
      </motion.div>
    </div>
  );
}
