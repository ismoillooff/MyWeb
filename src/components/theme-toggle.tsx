import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark" || theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return;
    
    // Capture the exact click position for the origin of the circle reveal
    const x = e.clientX;
    const y = e.clientY;
    setClickPos({ x, y });
    
    // 1. Show the overlay and start the animation
    setIsTransitioning(true);
    
    // 2. Wait for overlay to fully cover the screen (matches the duration)
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    // 3. Switch the theme while hidden by the overlay
    setTheme(isDark ? "light" : "dark");
    
    // 4. Give the browser a moment to repaint all CSS variables
    await new Promise((resolve) => setTimeout(resolve, 50));
    
    // 5. Hide the overlay smoothly
    setIsTransitioning(false);
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ 
              clipPath: `circle(0px at ${clickPos.x}px ${clickPos.y}px)`,
            }}
            animate={{ 
              clipPath: `circle(150vmax at ${clickPos.x}px ${clickPos.y}px)`,
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.76, 0, 0.24, 1] // Apple-like smooth easeInOut
            }}
            className={`fixed inset-0 z-[99999] pointer-events-none ${isDark ? "bg-[#ffffff]" : "bg-[#0f0f12]"}`}
          />
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`relative flex items-center justify-center size-9 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all duration-500 group cursor-pointer overflow-hidden ${className || ""}`}
        aria-label="Toggle theme"
      >
        <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-md" />
        <Sun
          size={16}
          className={`absolute transition-all duration-700 ease-[0.76,0,0.24,1] text-foreground/70 group-hover:text-foreground ${
            isDark
              ? "opacity-0 rotate-[90deg] scale-50"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          size={16}
          className={`absolute transition-all duration-700 ease-[0.76,0,0.24,1] text-foreground/70 group-hover:text-foreground ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-[90deg] scale-50"
          }`}
        />
      </button>
    </>
  );
};
