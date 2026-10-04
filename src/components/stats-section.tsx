"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { ScrollFloat } from "./ui/scroll-float";
import { AnimatedTitle } from "./ui/animated-title";

/* ═══════════════════════════════════════════════════════════
   i18n Data
   ═══════════════════════════════════════════════════════════ */
interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: Record<string, { sectionLabel: string; sectionTitle: string; sectionLead: string; stats: StatItem[] }> = {
  EN: {
    sectionLabel: "Trusted by Numbers",
    sectionTitle: "Measured Momentum",
    sectionLead: "Compact proof points from delivery, reliability, and client outcomes.",
    stats: [
      { value: 50, suffix: "+", label: "Projects" },
      { value: 30, suffix: "+", label: "Clients" },
      { value: 99, suffix: "%", label: "Satisfaction" },
      { value: 8, suffix: "mo+", label: "Experience" },
    ],
  },
  UZ: {
    sectionLabel: "Raqamlar Bilan Isbotlangan",
    sectionTitle: "O'lchanadigan Natija",
    sectionLead: "Yetkazish, barqarorlik va mijoz natijalaridan qisqa isbotlar.",
    stats: [
      { value: 50, suffix: "+", label: "Loyihalar" },
      { value: 30, suffix: "+", label: "Mijozlar" },
      { value: 99, suffix: "%", label: "Mamnuniyat" },
      { value: 8, suffix: "oy+", label: "Tajriba" },
    ],
  },
  RU: {
    sectionLabel: "Подтверждено Цифрами",
    sectionTitle: "Измеримый Темп",
    sectionLead: "Короткие доказательства по доставке, надежности и результатам клиентов.",
    stats: [
      { value: 50, suffix: "+", label: "Проектов" },
      { value: 30, suffix: "+", label: "Клиентов" },
      { value: 99, suffix: "%", label: "Довольны" },
      { value: 8, suffix: "мес+", label: "Опыт" },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════
   Tech Stack — 60+ technologies with simple-icons
   ═══════════════════════════════════════════════════════════ */
const SI = "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons";

interface TechItem {
  name: string;
  icon: string;
}

// Row 1: Languages + Frontend (scrolls LEFT)
const row1: TechItem[] = [
  { name: "JavaScript", icon: `${SI}/javascript.svg` },
  { name: "TypeScript", icon: `${SI}/typescript.svg` },
  { name: "Python", icon: `${SI}/python.svg` },
  { name: "PHP", icon: `${SI}/php.svg` },
  { name: "Java", icon: `${SI}/openjdk.svg` },
  { name: "C#", icon: `${SI}/csharp.svg` },
  { name: "Go", icon: `${SI}/go.svg` },
  { name: "Rust", icon: `${SI}/rust.svg` },
  { name: "Swift", icon: `${SI}/swift.svg` },
  { name: "Kotlin", icon: `${SI}/kotlin.svg` },
  { name: "Ruby", icon: `${SI}/ruby.svg` },
  { name: "Dart", icon: `${SI}/dart.svg` },
  { name: "React", icon: `${SI}/react.svg` },
  { name: "Next.js", icon: `${SI}/nextdotjs.svg` },
  { name: "Vue.js", icon: `${SI}/vuedotjs.svg` },
  { name: "Angular", icon: `${SI}/angular.svg` },
  { name: "Svelte", icon: `${SI}/svelte.svg` },
  { name: "HTML5", icon: `${SI}/html5.svg` },
  { name: "CSS3", icon: `${SI}/css3.svg` },
  { name: "Tailwind", icon: `${SI}/tailwindcss.svg` },
  { name: "Sass", icon: `${SI}/sass.svg` },
];

// Row 2: Backend + Databases (scrolls RIGHT)
const row2: TechItem[] = [
  { name: "Node.js", icon: `${SI}/nodedotjs.svg` },
  { name: "Express", icon: `${SI}/express.svg` },
  { name: "NestJS", icon: `${SI}/nestjs.svg` },
  { name: "Django", icon: `${SI}/django.svg` },
  { name: "Flask", icon: `${SI}/flask.svg` },
  { name: "Laravel", icon: `${SI}/laravel.svg` },
  { name: "FastAPI", icon: `${SI}/fastapi.svg` },
  { name: "Spring", icon: `${SI}/spring.svg` },
  { name: "PostgreSQL", icon: `${SI}/postgresql.svg` },
  { name: "MySQL", icon: `${SI}/mysql.svg` },
  { name: "MongoDB", icon: `${SI}/mongodb.svg` },
  { name: "Redis", icon: `${SI}/redis.svg` },
  { name: "SQLite", icon: `${SI}/sqlite.svg` },
  { name: "Prisma", icon: `${SI}/prisma.svg` },
  { name: "Supabase", icon: `${SI}/supabase.svg` },
  { name: "Firebase", icon: `${SI}/firebase.svg` },
  { name: "Elasticsearch", icon: `${SI}/elasticsearch.svg` },
];

// Row 3: Cloud, DevOps, AI, Mobile, Tools (scrolls LEFT)
const row3: TechItem[] = [
  { name: "Docker", icon: `${SI}/docker.svg` },
  { name: "Kubernetes", icon: `${SI}/kubernetes.svg` },
  { name: "Nginx", icon: `${SI}/nginx.svg` },
  { name: "AWS", icon: `${SI}/amazonaws.svg` },
  { name: "Vercel", icon: `${SI}/vercel.svg` },
  { name: "Netlify", icon: `${SI}/netlify.svg` },
  { name: "GitHub Actions", icon: `${SI}/githubactions.svg` },
  { name: "Terraform", icon: `${SI}/terraform.svg` },
  { name: "OpenAI", icon: `${SI}/openai.svg` },
  { name: "TensorFlow", icon: `${SI}/tensorflow.svg` },
  { name: "PyTorch", icon: `${SI}/pytorch.svg` },
  { name: "LangChain", icon: `${SI}/langchain.svg` },
  { name: "React Native", icon: `${SI}/react.svg` },
  { name: "Expo", icon: `${SI}/expo.svg` },
  { name: "Flutter", icon: `${SI}/flutter.svg` },
  { name: "Git", icon: `${SI}/git.svg` },
  { name: "GitHub", icon: `${SI}/github.svg` },
  { name: "GraphQL", icon: `${SI}/graphql.svg` },
  { name: "Figma", icon: `${SI}/figma.svg` },
  { name: "Three.js", icon: `${SI}/threedotjs.svg` },
  { name: "WebSocket", icon: `${SI}/socketdotio.svg` },
  { name: "Stripe", icon: `${SI}/stripe.svg` },
];

/* ═══════════════════════════════════════════════════════════
   Count-Up Hook
   ═══════════════════════════════════════════════════════════ */
function useCountUp(end: number, active: boolean, duration = 1600): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);
  return val;
}

/* ═══════════════════════════════════════════════════════════
   Stat Cell
   ═══════════════════════════════════════════════════════════ */
function StatCell({ stat, active, delay }: { stat: StatItem; active: boolean; delay: number }) {
  const count = useCountUp(stat.value, active, 1400 + delay * 150);

  return (
    <motion.div
      className="relative flex min-h-[142px] flex-col items-center justify-center py-8 sm:py-10 group/stat cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Neon glow behind number on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-10 rounded-full bg-[#ffc700]/0 group-hover/stat:bg-[#ffc700]/[0.08] blur-2xl transition-all duration-700 pointer-events-none" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/stat:opacity-100" />

      <div className="flex items-baseline gap-0.5 mb-2">
        <span
          className="text-4xl sm:text-5xl lg:text-6xl font-sentient font-black tracking-tighter leading-none text-foreground/75 group-hover/stat:text-foreground transition-all duration-500"
          style={{
            fontVariantNumeric: "tabular-nums",
            textShadow: "none",
          }}
          onMouseEnter={(e) => e.currentTarget.style.textShadow = "0 0 20px rgba(255,199,0,0.3), 0 0 40px rgba(255,199,0,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.textShadow = "none"}
        >
          {count}
        </span>
        <span className="text-base sm:text-lg lg:text-xl font-sentient font-extrabold text-foreground/20 group-hover/stat:text-[#ffc700] transition-all duration-500 group-hover/stat:drop-shadow-[0_0_8px_rgba(255,199,0,0.4)]">
          {stat.suffix}
        </span>
      </div>
      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.45em] text-foreground/20 group-hover/stat:text-foreground/40 transition-colors duration-500">
        {stat.label}
      </span>
      <div className="mt-2.5 w-0 group-hover/stat:w-8 h-[1.5px] bg-[#ffc700]/70 group-hover/stat:shadow-[0_0_8px_rgba(255,199,0,0.5)] transition-all duration-500 ease-out" />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Tech Marquee Row — icon + name cards
   ═══════════════════════════════════════════════════════════ */
function TechRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: TechItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const duped = [...items, ...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="group/marquee relative w-full overflow-x-clip overflow-y-visible">
      <div
        className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
      />
      <div
        className={`flex items-center gap-3 sm:gap-4 w-max py-[2px] sm:py-1 ${animClass} group-hover/marquee:[animation-play-state:paused]`}
        style={{ willChange: "transform", animationDuration: `${speed}s` }}
      >
        {duped.map((t, i) => (
          <div key={`${t.name}-${i}`} className="shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-3.5 px-4 sm:px-6 lg:px-7 h-9 sm:h-12 lg:h-14 rounded-xl sm:rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] cursor-default group/tech transition-[transform,background-color,border-color,box-shadow] duration-500 hover:scale-105 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:border-primary/25 hover:shadow-[0_0_15px_rgba(255,199,0,0.08),0_4px_20px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_0_15px_rgba(255,199,0,0.12),0_4px_20px_rgba(255,255,255,0.03)]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img
                src={t.icon}
                alt={t.name}
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 object-contain opacity-30 dark:invert dark:opacity-30 group-hover/tech:opacity-80 dark:group-hover/tech:opacity-80 group-hover/tech:drop-shadow-[0_0_6px_rgba(255,199,0,0.3)] transition-all duration-500"
                loading="lazy"
              />
              <span className="text-[10px] sm:text-xs lg:text-sm font-sans font-semibold text-foreground/20 group-hover/tech:text-foreground/60 tracking-wide whitespace-nowrap transition-colors duration-500">
                {t.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function StatsSection() {
  const { lang } = useLanguage();
  const d = statsData[lang] || statsData.EN;
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const stackTitle: Record<string, string[]> = {
    EN: ["Tech", "Stack"],
    UZ: ["Texno", "Stack"],
    RU: ["Стек", "Технологий"],
  };
  const stackSubtitle: Record<string, string> = {
    EN: "60+ Technologies & Tools",
    UZ: "60+ texnologiya va asboblardan foydalanish",
    RU: "60+ технологий и инструментов",
  };
  const words = stackTitle[lang] || stackTitle.EN;
  const subtitle = stackSubtitle[lang] || stackSubtitle.EN;

  return (
    <section ref={sectionRef} className="relative bg-[#fafafa] dark:bg-[#070707] transition-colors duration-500 overflow-hidden py-16 sm:py-24">
      {/* ─── Top Shimmer ─── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent" />
      <div className="absolute left-1/2 top-0 h-40 w-[min(820px,88vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,199,0,0.08),transparent_62%)] pointer-events-none" />


      {/* ─── Tech Stack Title (TrueFocus Style) ─── */}
      <div className="relative text-center pb-12 px-4 flex flex-col items-center">
        {/* Radial glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-primary/[0.03] dark:bg-primary/[0.04] rounded-full blur-[80px] pointer-events-none" />

        {/* Micro subtitle with ScrollFloat */}
        <ScrollFloat
          className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-foreground/30 mb-4"
          animationDuration={0.8}
          ease="back.out(1.5)"
          scrollStart="top 95%"
          scrollEnd="top 70%"
          stagger={0.02}
          tag="p"
        >
          {subtitle}
        </ScrollFloat>

        {/* Main heading with TrueFocus */}
        <div className="relative inline-block">
          <AnimatedTitle
            text={words.join(" ")}
            effect="stagger-fade"
            className="text-3xl sm:text-4xl lg:text-[3.5rem] font-sentient"
          />
        </div>

        {/* Double Gold Diamonds */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-[4px] rotate-45 bg-[#ffc700] shadow-[0_0_10px_rgba(255,199,0,0.6)] opacity-80" />
            <div className="w-[4px] h-[4px] rotate-45 bg-[#ffc700] shadow-[0_0_10px_rgba(255,199,0,0.6)] opacity-80" />
          </div>
          <span className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
        </div>
      </div>

      {/* ─── Row 1: Languages + Frontend → LEFT ─── */}
      <div className="mb-1 sm:mb-1.5">
        <TechRow items={row1} direction="left" speed={35} />
      </div>

      {/* ─── Row 2: Backend + Databases → RIGHT ─── */}
      <div className="mb-1 sm:mb-1.5">
        <TechRow items={row2} direction="right" speed={30} />
      </div>

      {/* ─── Row 3: Cloud, AI, Mobile, Tools → LEFT ─── */}
      <div className="pb-8 sm:pb-10">
        <TechRow items={row3} direction="left" speed={32} />
      </div>

      {/* ─── Bottom Shimmer ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent" />
    </section>
  );
}
