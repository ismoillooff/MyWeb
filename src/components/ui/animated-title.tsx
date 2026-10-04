import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTitleProps {
  text: string;
  effect?: "blur" | "slide-up" | "wave" | "expand" | "flip" | "stagger-fade";
  className?: string;
  delay?: number;
}

export function AnimatedTitle({ text, effect = "slide-up", className = "", delay = 0 }: AnimatedTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Split text into words for word-based animations
  const words = text.split(" ");
  
  // Split text into characters for letter-based animations
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: effect === "wave" ? 0.05 : 0.08, delayChildren: delay * i },
    }),
  };

  if (effect === "stagger-fade") {
    return (
      <motion.div ref={ref} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className={`flex flex-wrap justify-center gap-x-2 sm:gap-x-3 ${className}`}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (effect === "slide-up") {
    return (
      <div ref={ref} className={`flex flex-wrap justify-center gap-x-2 sm:gap-x-3 overflow-hidden ${className}`}>
         {words.map((word, i) => (
           <div key={i} className="overflow-hidden">
             <motion.span
               initial={{ y: "100%", opacity: 0 }}
               animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.1 }}
               className="inline-block whitespace-nowrap"
             >
               {word}
             </motion.span>
           </div>
         ))}
      </div>
    );
  }

  if (effect === "blur") {
    return (
      <motion.div ref={ref} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className={`flex flex-wrap justify-center ${className}`}>
        {letters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { filter: "blur(10px)", opacity: 0 },
              visible: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.5 } }
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (effect === "wave") {
    return (
      <motion.div ref={ref} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className={`flex flex-wrap justify-center ${className}`}>
        {letters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (effect === "expand") {
    return (
      <div ref={ref} className={className}>
        <motion.div
           initial={{ letterSpacing: "-0.1em", opacity: 0, filter: "blur(8px)" }}
           animate={isInView ? { letterSpacing: "normal", opacity: 1, filter: "blur(0px)" } : { letterSpacing: "-0.1em", opacity: 0, filter: "blur(8px)" }}
           transition={{ duration: 1, ease: "easeOut", delay }}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  if (effect === "flip") {
    return (
      <div ref={ref} className={`flex flex-wrap justify-center gap-x-2 sm:gap-x-3 ${className}`}>
         {words.map((word, i) => (
           <motion.span
             key={i}
             initial={{ rotateX: -90, opacity: 0 }}
             animate={isInView ? { rotateX: 0, opacity: 1 } : { rotateX: -90, opacity: 0 }}
             transition={{ duration: 0.8, ease: "backOut", delay: delay + i * 0.15 }}
             className="inline-block origin-bottom whitespace-nowrap"
           >
             {word}
           </motion.span>
         ))}
      </div>
    );
  }

  return <div className={className}>{text}</div>;
}
