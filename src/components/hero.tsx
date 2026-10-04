"use client";

import { GL } from "./gl";
import { Pill } from "./pill";
import { Magnetic } from "./ui/magnetic";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { PhoneCall } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion, type Variants } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export function Hero({ onStartProject }: { onStartProject?: () => void }) {
  const { t } = useLanguage();
  const [hovering, setHovering] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const phrases = [
    t("hero.p1"),
    t("hero.p2"),
    t("hero.p3"),
    t("hero.p4"),
    t("hero.p5"),
  ];

  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 600], [0, -200]);
  const opacityOffset = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleOffset = useTransform(scrollY, [0, 400], [1, 0.95]);

  // Cursor-aware depth tilt on the title block (±~1.5°, spring-smoothed)
  const reducedMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 55, damping: 18, mass: 0.8 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 55, damping: 18, mass: 0.8 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    tiltY.set(nx * 1.6);
    tiltX.set(-ny * 1.2);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      setTextIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [phrases.length]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.8, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const descVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const btnVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] }, // bouncy spring
    },
  };

  return (
    <div
      className="dark flex flex-col h-[100dvh] justify-between relative overflow-hidden"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background untouched */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GL hovering={hovering} />
      </div>

      <div className="absolute inset-0 z-[5] bg-transparent pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        className="pb-28 sm:pb-16 mt-auto text-center relative z-10 px-4 max-w-full flex flex-col items-center justify-center h-full pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: yOffset, opacity: opacityOffset, scale: scaleOffset }}
      >
        {/* Badge */}
        <motion.div variants={badgeVariants} className="mb-8 sm:mb-10">
          <Pill className="border-white/15 bg-white/5 backdrop-blur-2xl text-white shadow-[0_0_20px_rgba(255,255,255,0.07)] hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] px-6 py-2 text-xs sm:text-sm font-medium tracking-wide uppercase">
            {t("hero.badge")}
          </Pill>
        </motion.div>

        {/* Title — cursor-aware depth tilt, spring-smoothed */}
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto"
          style={{ rotateX: tiltXSpring, rotateY: tiltYSpring, transformPerspective: 900 }}
        >
          <motion.h1 
            className={`text-[clamp(3.5rem,10vw,7rem)] sm:text-[clamp(4.5rem,12vw,9rem)] ${playfair.className} tracking-tight leading-[1] text-white drop-shadow-2xl flex flex-col items-center w-full m-0 p-0`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.span variants={textVariants} className="block pb-2 font-medium">
              MyWeb
            </motion.span>
            
            <motion.div variants={textVariants} className="grid grid-cols-1 grid-rows-1 place-items-center h-[1.3em] overflow-hidden w-full my-1 sm:my-3" style={{ perspective: "1200px" }}>
              <AnimatePresence>
                <motion.i
                  key={textIndex}
                  initial={{ opacity: 0, y: "120%", rotateX: -60, filter: "blur(12px)", scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: "0%", 
                    rotateX: 0, 
                    filter: "blur(0px)", 
                    scale: 1,
                    backgroundPosition: ["0% center", "200% center"] 
                  }}
                  exit={{ opacity: 0, y: "-120%", rotateX: 60, filter: "blur(12px)", scale: 0.9 }}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.16, 1, 0.3, 1],
                    backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                  className="col-start-1 row-start-1 font-semibold italic text-[0.85em] sm:text-[0.9em] px-4 leading-[1.1] pb-2 whitespace-nowrap drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  style={{ 
                    transformOrigin: "center center -50px",
                    backgroundImage: "linear-gradient(to right, #926F34 0%, #DFBD69 22%, #FBEF9A 45%, #FFFFC5 50%, #FBEF9A 55%, #DFBD69 78%, #926F34 100%)",
                    backgroundSize: "200% auto",
                    color: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  {phrases[textIndex]}
                </motion.i>
              </AnimatePresence>
            </motion.div>

            <motion.span variants={textVariants} className="block pt-2 font-medium">
              {t("hero.agency")}
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={descVariants}
          className="font-mono text-[15px] sm:text-[17px] text-white/70 text-pretty mt-12 max-w-[600px] mx-auto leading-relaxed drop-shadow-md font-medium"
        >
          {t("hero.desc")}
        </motion.p>

        {/* Call to Action */}
        <motion.div 
          variants={btnVariants}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative z-30"
        >
          <Magnetic strength={0.22}>
          <a
            href="tel:+998950051545"
            className="group relative block px-12 py-5 rounded-full font-sans font-bold text-[15px] uppercase tracking-widest text-[#1a1a1a] transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] shadow-[0_15px_35px_rgba(255,199,0,0.35)] hover:shadow-[0_20px_50px_rgba(255,199,0,0.6)] overflow-hidden isolate"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#ffdf40] to-primary bg-[length:200%_100%] animate-gradient-x z-[-1]" />
            <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-1]" />

            {/* Glass Shine Effect */}
            <div className="absolute top-[-100%] left-[-100%] w-[150%] h-[150%] bg-gradient-to-br from-white/40 via-transparent to-transparent rotate-45 group-hover:top-[100%] group-hover:left-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-3">
              <PhoneCall size={20} className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              {t("hero.btn")}
            </span>

            {/* Bottom Glow — slow breathing */}
            <motion.div
              className="absolute -bottom-2 left-1/2 w-3/4 h-4 bg-primary/60 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              style={{ x: "-50%" }}
              animate={{ scaleX: [1, 1.18, 1], scaleY: [1, 1.3, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </div>
  );
}
