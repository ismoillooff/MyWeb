"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Cloud,
  Code2,
  LayoutPanelTop,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type ServiceData = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  cta: string;
  signal: string;
};

const servicesData: Record<
  string,
  { sectionLabel: string; sectionTitle: string; sectionLead: string; items: ServiceData[] }
> = {
  EN: {
    sectionLabel: "Our Expertise",
    sectionTitle: "Interactive Service Matrix",
    sectionLead:
      "Every service is shaped as a sharp, scalable system: clear strategy, clean execution, and polish that survives launch day.",
    items: [
      {
        id: "01",
        icon: Code2,
        title: "Web Development",
        desc: "High-performance digital flagships built for speed, conversion, and long-term product growth.",
        cta: "View Details",
        signal: "Launch-grade",
      },
      {
        id: "02",
        icon: Smartphone,
        title: "Mobile Development",
        desc: "Seamless iOS and Android experiences crafted with reliable cross-platform engineering.",
        cta: "View Details",
        signal: "Cross-platform",
      },
      {
        id: "03",
        icon: Bot,
        title: "Telegram Bot Dev",
        desc: "Smart bot systems for CRM, sales automation, operations, and high-load business flows.",
        cta: "View Details",
        signal: "Automation-ready",
      },
      {
        id: "04",
        icon: Sparkles,
        title: "AI & Automation",
        desc: "AI agents and workflow automation that remove repetitive work and speed up decisions.",
        cta: "View Details",
        signal: "Intelligent flows",
      },
      {
        id: "05",
        icon: LayoutPanelTop,
        title: "UI/UX Design",
        desc: "Precise interfaces shaped around clarity, trust, and practical user movement.",
        cta: "View Details",
        signal: "Conversion-first",
      },
      {
        id: "06",
        icon: Cloud,
        title: "Cloud & Infra",
        desc: "Secure, resilient, and scalable foundations for products that need to keep moving.",
        cta: "View Details",
        signal: "Resilient core",
      },
    ],
  },
  UZ: {
    sectionLabel: "Bizning Ekspertiza",
    sectionTitle: "Interaktiv Xizmatlar",
    sectionLead:
      "Har bir xizmat aniq strategiya, toza ijro va launchdan keyin ham barqaror qoladigan polish bilan quriladi.",
    items: [
      {
        id: "01",
        icon: Code2,
        title: "Veb Dasturlash",
        desc: "Tezkor, konversiyaga yo'naltirilgan va uzoq muddatli o'sishga tayyor web mahsulotlar.",
        cta: "Batafsil",
        signal: "Launch tayyor",
      },
      {
        id: "02",
        icon: Smartphone,
        title: "Mobil Dasturlash",
        desc: "Ishonchli cross-platform engineering bilan yaratilgan iOS va Android tajribalari.",
        cta: "Batafsil",
        signal: "Har platforma",
      },
      {
        id: "03",
        icon: Bot,
        title: "Telegram Bot",
        desc: "CRM, savdo, operatsiya va yuqori yuklanishli biznes oqimlari uchun aqlli bot tizimlari.",
        cta: "Batafsil",
        signal: "Avtomatizatsiya",
      },
      {
        id: "04",
        icon: Sparkles,
        title: "AI va Avtomatizatsiya",
        desc: "Takroriy ishlarni kamaytiradigan va qarorlarni tezlashtiradigan AI agentlar va workflowlar.",
        cta: "Batafsil",
        signal: "Aqlli oqimlar",
      },
      {
        id: "05",
        icon: LayoutPanelTop,
        title: "UI/UX Dizayn",
        desc: "Aniqlik, ishonch va foydalanuvchining tabiiy harakatiga tayangan interfeyslar.",
        cta: "Batafsil",
        signal: "Konversiya",
      },
      {
        id: "06",
        icon: Cloud,
        title: "Bulutli Arxitektura",
        desc: "Doimiy ishlashi kerak bo'lgan mahsulotlar uchun xavfsiz va kengayadigan poydevor.",
        cta: "Batafsil",
        signal: "Barqaror yadro",
      },
    ],
  },
  RU: {
    sectionLabel: "Наша Экспертиза",
    sectionTitle: "Интерактивные Услуги",
    sectionLead:
      "Каждая услуга собирается как точная система: ясная стратегия, чистая реализация и полировка после запуска.",
    items: [
      {
        id: "01",
        icon: Code2,
        title: "Веб-разработка",
        desc: "Быстрые и конверсионные веб-продукты, готовые к долгосрочному росту.",
        cta: "Подробнее",
        signal: "Готово к запуску",
      },
      {
        id: "02",
        icon: Smartphone,
        title: "Мобильная Разработка",
        desc: "Надежный опыт для iOS и Android с аккуратной кроссплатформенной инженерией.",
        cta: "Подробнее",
        signal: "Кроссплатформа",
      },
      {
        id: "03",
        icon: Bot,
        title: "Telegram Боты",
        desc: "Умные bot-системы для CRM, продаж, операций и нагруженных бизнес-процессов.",
        cta: "Подробнее",
        signal: "Автоматизация",
      },
      {
        id: "04",
        icon: Sparkles,
        title: "ИИ и Автоматизация",
        desc: "AI-агенты и workflow, которые снимают рутину и ускоряют принятие решений.",
        cta: "Подробнее",
        signal: "Умные потоки",
      },
      {
        id: "05",
        icon: LayoutPanelTop,
        title: "UI/UX Дизайн",
        desc: "Точные интерфейсы вокруг ясности, доверия и естественного движения пользователя.",
        cta: "Подробнее",
        signal: "Конверсия",
      },
      {
        id: "06",
        icon: Cloud,
        title: "Облачная Инфраструктура",
        desc: "Безопасная, устойчивая и масштабируемая основа для продуктов в движении.",
        cta: "Подробнее",
        signal: "Надежное ядро",
      },
    ],
  },
};

function ServiceCard({
  item,
  index,
  active,
  onSelect,
}: {
  item: ServiceData;
  index: number;
  active: boolean;
  onSelect: (title: string) => void;
}) {
  const Icon = item.icon;
  const cardRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const [glowPos, setGlowPos] = useState({ x: 150, y: 150 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      x.set(normX);
      y.set(normY);
      setGlowPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setGlowPos({ x: 150, y: 150 });
  }, [x, y]);

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(item.title)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[300px] rounded-[2rem] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#ffc700]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      initial={{ opacity: 0, y: 64, rotateX: 14, scale: 0.97, transformPerspective: 1200 }}
      animate={active ? { opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1200 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="group relative h-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/[0.82] shadow-[0_22px_70px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.86)] ring-1 ring-black/[0.055] backdrop-blur-[30px] transition-[border-color,background-color,box-shadow] duration-500 will-change-transform hover:border-[#ffc700]/45 hover:bg-white/[0.9] hover:shadow-[0_26px_84px_rgba(0,0,0,0.16),0_0_30px_rgba(255,199,0,0.10),inset_0_1px_0_rgba(255,255,255,0.95)] dark:border-white/[0.07] dark:bg-white/[0.018] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-0 dark:hover:shadow-[0_24px_90px_rgba(0,0,0,0.45),0_0_34px_rgba(255,199,0,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, rgba(255, 199, 0, 0.08), transparent 40%)`,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.64),transparent_36%,rgba(255,199,0,0.07)_100%)] opacity-75 transition-opacity duration-500 pointer-events-none dark:opacity-0" />
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-70 dark:via-white/30 dark:opacity-60" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full border border-[#ffc700]/15 opacity-0 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#ffc700]/[0.045] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div
          className="relative z-10 flex h-full flex-col p-6 sm:p-8 lg:p-10"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 md:mb-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.055] text-black/65 ring-1 ring-black/10 transition-all duration-500 group-hover:bg-[#ffc700]/20 group-hover:text-black group-hover:shadow-[0_0_22px_rgba(255,199,0,0.25)] dark:bg-foreground/5 dark:text-foreground/60 dark:ring-foreground/5 dark:group-hover:bg-[#ffc700]/15 dark:group-hover:text-[#ffc700]">
              <Icon className="h-6 w-6 transition-transform duration-500 ease-out group-hover:scale-110" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-black/55 transition-colors duration-500 group-hover:text-[#7a5d00] sm:text-sm dark:text-foreground/30 dark:group-hover:text-[#ffc700]/75">
                {item.id}
              </span>
              <span className="rounded-full border border-black/15 bg-white/80 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.24em] text-black/65 transition-colors duration-500 group-hover:border-[#ffc700]/45 group-hover:text-black/85 dark:border-foreground/10 dark:bg-foreground/[0.03] dark:text-foreground/40 dark:group-hover:border-[#ffc700]/25 dark:group-hover:text-foreground/70">
                {item.signal}
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="mb-3 font-sentient text-2xl font-bold tracking-tight text-black/90 transition-colors duration-300 group-hover:text-black sm:text-[1.7rem] dark:text-foreground/85 dark:group-hover:text-foreground dark:group-hover:drop-shadow-[0_0_8px_rgba(255,199,0,0.16)]">
              {item.title}
            </h3>
            <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-black/78 transition-colors duration-300 group-hover:text-black/92 sm:text-base dark:text-foreground/55 dark:group-hover:text-foreground/75">
              {item.desc}
            </p>

            <div className="relative inline-flex items-center gap-2 pb-1 text-xs font-semibold uppercase tracking-widest text-black/72 transition-colors duration-300 group-hover:text-[#7a5d00] sm:text-sm dark:text-foreground/55 dark:group-hover:text-[#ffc700]">
              <span>{item.cta}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <div className="absolute bottom-0 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-[#ffc700] transition-all duration-500 ease-out group-hover:w-full group-hover:shadow-[0_0_8px_rgba(255,199,0,0.6)]" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

export function ServicesSection({ onSelect = () => {} }: { onSelect?: (section: string) => void }) {
  const { lang } = useLanguage();
  const d = servicesData[lang] || servicesData.EN;
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffc700]/[0.06] blur-[120px] pointer-events-none dark:bg-[#ffc700]/[0.03]" />
      <div className="absolute left-1/2 top-10 -z-10 h-px w-[min(760px,80vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffc700]/25 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-4xl text-center sm:mb-20">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#ffc700]/30 to-[#ffc700]/50 shadow-[0_0_8px_rgba(255,199,0,0.2)] sm:w-20" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#ffc700] shadow-[0_0_12px_rgba(255,199,0,0.6)] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/68 drop-shadow-[0_0_8px_rgba(255,199,0,0.16)] sm:text-xs dark:text-foreground/45">
              {d.sectionLabel}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-[#ffc700] shadow-[0_0_12px_rgba(255,199,0,0.6)] animate-pulse" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent via-[#ffc700]/30 to-[#ffc700]/50 shadow-[0_0_8px_rgba(255,199,0,0.2)] sm:w-20" />
          </div>

          <motion.h2
            className="bg-gradient-to-b from-white/95 to-white/62 bg-clip-text font-sentient text-4xl font-extrabold tracking-tighter text-transparent sm:text-5xl lg:text-6xl dark:from-foreground/90 dark:to-foreground/40"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {d.sectionTitle}
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base dark:text-foreground/55"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {d.sectionLead}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {d.items.map((item, index) => (
            <ServiceCard
              key={item.id}
              item={item}
              index={index}
              active={inView}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
