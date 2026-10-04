"use client";

import { useLanguage } from "@/lib/i18n";
import { ScrollFloat } from "./ui/scroll-float";
import { ScrollReveal } from "./ui/scroll-reveal";
import { TrueFocus } from "./ui/true-focus";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   LOGO DATA — split into two rows for dual-marquee
   ═══════════════════════════════════════════════════════════ */
const row1Partners = [
  { name: "Google", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg" },
  { name: "Amazon", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg" },
  { name: "Apple", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apple.svg" },
  { name: "Meta", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/meta.svg" },
  { name: "Spotify", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/spotify.svg" },
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg" },
];

const row2Partners = [
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg" },
  { name: "Stripe", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg" },
  { name: "Netflix", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/netflix.svg" },
  { name: "Discord", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/discord.svg" },
  { name: "Shopify", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg" },
];

/* ═══════════════════════════════════════════════════════════
   STATS DATA — Lower Tier
   ═══════════════════════════════════════════════════════════ */
const statsData: Record<string, { value: string; label: string }[]> = {
  EN: [
    { value: "50+", label: "Projects" },
    { value: "30+", label: "Clients" },
    { value: "8mo+", label: "Experience" },
    { value: "99%", label: "Uptime" },
  ],
  UZ: [
    { value: "50+", label: "Loyihalar" },
    { value: "30+", label: "Mijozlar" },
    { value: "8oy+", label: "Tajriba" },
    { value: "99%", label: "Barqarorlik" },
  ],
  RU: [
    { value: "50+", label: "Проектов" },
    { value: "30+", label: "Клиентов" },
    { value: "8мес+", label: "Опыт" },
    { value: "99%", label: "Аптайм" },
  ],
};

const titleWords: Record<string, string[]> = {
  EN: ["Our", "Partners"],
  UZ: ["Bizning", "Hamkorlar"],
  RU: ["Наши", "Партнёры"],
};

const subtitleText: Record<string, string> = {
  EN: "Trusted by Industry Leaders",
  UZ: "Sanoat Yetakchilari Ishonchi",
  RU: "Доверие Лидеров Индустрии",
};

/* ─── Icon-Only Marquee (Upper Row) ───────────────────────── */
function IconMarquee({ items, speed = 40 }: { items: typeof row1Partners, speed?: number }) {
  // 8 copies, CSS shifts -25% (= 2 full sets) — seamless loop on the compositor,
  // zero per-frame JS. Same visual speed as before (speed / 4 ≙ -25% vs -50%).
  const duped = Array(8).fill(items).flat();

  return (
    <div className="group/marquee relative w-full overflow-hidden py-2">
      <div
        className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
      />

      <div
        className="flex items-center gap-6 sm:gap-4 w-max animate-marquee-left group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${speed / 4}s` }}
      >
        {duped.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="shrink-0 flex items-center justify-center min-w-[110px] sm:min-w-[130px] h-10 sm:h-11 px-5 sm:px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-sm cursor-default group/logo transition-all duration-500 hover:scale-110 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)]"
          >
            {p.logo && (
              <img
                src={p.logo}
                alt={p.name}
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain grayscale opacity-40 dark:invert dark:opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 dark:group-hover/logo:opacity-100 group-hover/logo:drop-shadow-[0_0_10px_rgba(255,199,0,0.35)] transition-all duration-500"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Text-Only Marquee (Lower Row) ───────────────────────── */
function TextMarquee({ items, speed = 45 }: { items: typeof row2Partners, speed?: number }) {
  const duped = Array(8).fill(items).flat();

  return (
    <div className="group/marquee relative w-full overflow-hidden py-2">
      <div
        className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
      />

      <div
        className="flex items-center gap-5 sm:gap-6 w-max animate-marquee-right group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${speed / 4}s` }}
      >
        {duped.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="shrink-0 flex items-center justify-center min-w-[110px] sm:min-w-[130px] h-10 sm:h-11 px-5 sm:px-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-sm cursor-default group/text transition-all duration-500 hover:scale-110 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)]"
          >
            <span className="text-xs sm:text-sm font-sans font-bold text-foreground/25 group-hover/text:text-foreground/70 tracking-wider uppercase whitespace-nowrap transition-colors duration-500">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function Partners() {
  const { lang } = useLanguage();
  const stats = statsData[lang] || statsData.EN;
  const words = titleWords[lang] || titleWords.EN;
  const subtitle = subtitleText[lang] || subtitleText.EN;

  return (
    <section className="relative overflow-hidden bg-background">
      
      {/* ─── Section Title with ScrollFloat + TrueFocus ─── */}
      <div className="relative text-center pt-16 sm:pt-20 pb-6 px-4">
        {/* Radial glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-[#ffc700]/[0.035] dark:bg-[#ffc700]/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* Micro subtitle with ScrollFloat */}
        <ScrollFloat
          className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-foreground/30 mb-5"
          animationDuration={0.8}
          ease="back.out(1.5)"
          scrollStart="top 95%"
          scrollEnd="top 70%"
          stagger={0.02}
          tag="p"
        >
          {subtitle}
        </ScrollFloat>

        {/* Main heading with TrueFocus blur animation */}
        <TrueFocus
          words={words}
          className="text-3xl sm:text-5xl lg:text-6xl"
          blurAmount={5}
          borderColor="rgba(255, 199, 0, 0.5)"
          glowColor="rgba(255, 199, 0, 0.25)"
          animationDuration={0.6}
          pauseBetween={2}
        />

        {/* Decorative elements */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#ffc700]/70 shadow-[0_0_8px_rgba(255,199,0,0.5),0_0_16px_rgba(255,199,0,0.2)] animate-pulse" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#ffc700]/70 shadow-[0_0_8px_rgba(255,199,0,0.5),0_0_16px_rgba(255,199,0,0.2)] animate-pulse" />
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
        </div>
      </div>

      {/* ─── Upper Tier: Dual Marquee Showcase ─── */}
      <div className="py-4 sm:py-2 space-y-0">
        <IconMarquee items={row1Partners} speed={160} />
        <TextMarquee items={row2Partners} speed={180} />
      </div>

      {/* ─── Lower Tier: Glassmorphic Stats Bar ─── */}
      <ScrollReveal className="relative mt-2 mb-8" y={30} duration={0.6} stagger={0}>
        <div className="relative">
          {/* Top neon shimmer border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#ffc700]/30 to-transparent shadow-[0_0_8px_rgba(255,199,0,0.15)]" />

          {/* Glass container */}
          <div className="relative bg-white/[0.78] dark:bg-white/[0.03] backdrop-blur-xl py-5 sm:py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_16px_60px_rgba(0,0,0,0.08)] dark:shadow-none">
            <div className="max-w-4xl mx-auto px-4 flex items-center justify-around sm:justify-center sm:gap-14 lg:gap-20">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-0.5 group/stat cursor-default"
                >
                  <span className="text-xl sm:text-2xl lg:text-[2rem] font-sentient font-black tracking-tighter uppercase text-foreground/65 group-hover/stat:text-foreground group-hover/stat:drop-shadow-[0_0_12px_rgba(255,199,0,0.2)] transition-all duration-400 leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.3em] uppercase text-foreground/20 group-hover/stat:text-foreground/45 transition-colors duration-400">
                    {stat.label}
                  </span>
                  {/* Neon underline accent */}
                  <div className="mt-1 w-0 group-hover/stat:w-6 h-[1.5px] bg-[#ffc700]/50 group-hover/stat:shadow-[0_0_6px_rgba(255,199,0,0.5)] transition-all duration-500 ease-out" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom neon shimmer border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#ffc700]/30 to-transparent shadow-[0_0_8px_rgba(255,199,0,0.15)]" />
        </div>
      </ScrollReveal>
    </section>
  );
}
