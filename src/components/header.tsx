"use client";

import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "./ui/magnetic";

// ─── Optimized Glass Noise Overlay ──────────────────────────────────────────────────
const GlassNoise = () => (
  <svg
    className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.08] mix-blend-overlay rounded-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["home", "services", "portfolio", "pricing", "about", "contact"] as const;

// ─── Header ──────────────────────────────────────────────────────────────────
export const Header = ({
  onNavigate,
  currentView,
  onHome,
}: {
  onNavigate: (section: string) => void;
  currentView: string;
  onHome: () => void;
}) => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();

  const headerY = useTransform(scrollY, [0, 150], [20, 12]);

  return (
    <>

      {/* ── Outer positioning shell ─────────────────────────────────────── */}
      <motion.div 
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pointer-events-none"
        style={{ y: headerY }}
      >

        {/* ── Pill container ──────────────────────────────────────────────── */}
        <motion.header
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.25, delay: 0.1 }}
          className="
            pointer-events-auto
            relative flex items-center justify-between
            w-full max-w-[1180px]
            h-[60px]
            px-2 pr-2
            rounded-full
            shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06),0_0_60px_rgba(255,199,0,0.08)]
            dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_4px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.35),0_0_60px_rgba(255,199,0,0.04)]
          "
        >

          {/* ── Glass background layers ────────────────────────────────────── */}

          {/* 1. Deep blur base + Noise Overlay */}
          <div
            className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(15,15,18,0.72)] overflow-hidden"
            style={{
              backdropFilter: "blur(20px) saturate(1.4) brightness(1.05)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4) brightness(1.05)",
              transform: "translateZ(0)",
            }}
          >
            <GlassNoise />
          </div>

          {/* 2. Subtle dark overlay for contrast */}
          <div
            className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(0,0,0,0.02)_0%,rgba(255,255,255,0.5)_60%,rgba(255,199,0,0.1)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0)_60%,rgba(255,199,0,0.015)_100%)]"
          />

          {/* 3. Top specular highlight — thin bright rim */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_30%,rgba(255,199,0,0.4)_55%,rgba(255,255,255,0.6)_80%,transparent_100%)] dark:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.25)_30%,rgba(255,199,0,0.3)_55%,rgba(255,255,255,0.18)_80%,transparent_100%)]"
          />

          {/* 4. Bottom subtle shadow line */}
          <div
            className="absolute inset-x-0 bottom-0 h-px rounded-full bg-[linear-gradient(90deg,transparent_5%,rgba(0,0,0,0.08)_40%,rgba(0,0,0,0.08)_60%,transparent_95%)] dark:bg-[linear-gradient(90deg,transparent_5%,rgba(0,0,0,0.4)_40%,rgba(0,0,0,0.4)_60%,transparent_95%)]"
          />

          {/* ── Content ────────────────────────────────────────────────────── */}
          <div className="relative z-10 flex items-center justify-between w-full h-full px-1 gap-2">

            {/* LEFT — Logo */}
            <button
              onClick={onHome}
              className="flex-shrink-0 flex items-center bg-transparent border-none p-0 cursor-pointer pl-1 pr-2"
              aria-label="Go to homepage"
            >
              <Logo
                className="text-xl md:text-2xl drop-shadow-lg"
                imgClassName="h-10 md:h-11 drop-shadow-md"
              />
            </button>

            {/* CENTER — Nav pill (hidden on mobile) */}
            <div className="hidden lg:flex flex-1 items-center justify-center min-w-0 overflow-hidden">
              <nav
                className="
                  flex items-center gap-0.5 xl:gap-1 px-2 py-1.5 rounded-full
                  bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.04)]
                  border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.07)]
                  shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]
                "
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = currentView === item;
                  return (
                    <button
                      key={item}
                      onClick={() => item === "home" ? onHome() : onNavigate(t(`nav.${item}`))}
                      className={`
                        relative group
                        px-3 xl:px-4 py-2
                        rounded-full
                        font-sans text-[10px] xl:text-[11px] font-bold tracking-widest uppercase
                        bg-transparent border-none cursor-pointer
                        whitespace-nowrap
                        transition-colors duration-300
                        ${isActive ? "text-black dark:text-white" : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"}
                      `}
                    >
                      {/* Active/Hover pill */}
                      <span
                        className={`
                          absolute inset-0 rounded-full transition-all duration-300
                          bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(255,255,255,0.12)]
                          border border-[rgba(0,0,0,0.05)] dark:border-[rgba(255,255,255,0.15)]
                          shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
                          ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}
                        `}
                      />
                      <span className="relative z-10">{t(`nav.${item}`)}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* RIGHT — Actions */}
            <div className="flex-shrink-0 flex items-center gap-1 xl:gap-1.5 pr-1">

              {/* Theme toggle */}
              <div className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 text-foreground/80 hover:text-foreground dark:text-white/80 dark:hover:text-white">
                <ThemeToggle />
              </div>

              {/* Language switcher */}
              <div className="flex items-center justify-center h-9 px-0.5 rounded-full transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5 text-foreground/80 hover:text-foreground dark:text-white/80 dark:hover:text-white">
                <LanguageSwitcher />
              </div>

              {/* Divider */}
              <div className="hidden xl:block w-px h-5 bg-black/10 dark:bg-white/10 mx-1 transition-colors duration-500" />

              {/* Call Now CTA — hidden on mobile */}
              <Magnetic strength={0.3} className="hidden lg:inline-block">
              <a
                href="tel:+998950051545"
                className="
                  flex items-center gap-1.5
                  relative overflow-hidden group
                  px-4 xl:px-6 h-9
                  rounded-full
                  font-sans text-[10px] xl:text-[11px] font-bold tracking-wider uppercase
                  text-black whitespace-nowrap
                  transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(255,199,0,0.5),0_0_40px_rgba(255,199,0,0.2)]
                  active:scale-95
                  bg-[linear-gradient(170deg,#ffe566_0%,#f5c400_45%,#cc9f00_100%)]
                  shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_1px_rgba(0,0,0,0.15)]
                "
              >
                {/* Shimmer sweep on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 0.6s ease forwards",
                  }}
                />
                <Phone size={11} className="fill-black flex-shrink-0" />
                <span className="relative z-10">{t("nav.call")}</span>
              </a>
              </Magnetic>

              {/* Mobile hamburger */}
              <MobileMenu
                className="lg:hidden"
                onNavigate={onNavigate}
                onHome={onHome}
              />
            </div>
          </div>
        </motion.header>
      </motion.div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
      `}</style>
    </>
  );
};
