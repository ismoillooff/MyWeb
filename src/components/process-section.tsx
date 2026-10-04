import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Layout, Code, Rocket, LifeBuoy } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type Step = {
  id: string;
  icon: any;
  title: string;
  desc: string;
  color: string;
};

const copy: Record<string, { label: string; title: string; lead: string; steps: Step[] }> = {
  EN: {
    label: "Growth Path",
    title: "Our Process",
    lead: "A minimalist development cycle engineered for high-performance digital products.",
    steps: [
      { id: "01", icon: Search, title: "Discovery", desc: "Uncovering goals and mission-critical requirements.", color: "from-[#ffc700] to-[#ff9d00]" },
      { id: "02", icon: Layout, title: "Planning", desc: "Defining the architecture and strategic roadmap.", color: "from-[#00c6ff] to-[#0072ff]" },
      { id: "03", icon: Code, title: "Build", desc: "Translating logic into scalable, high-speed code.", color: "from-[#8e2de2] to-[#4a00e0]" },
      { id: "04", icon: Rocket, title: "Launch", desc: "Optimizing infrastructure for the global stage.", color: "from-[#f85032] to-[#e73827]" },
      { id: "05", icon: LifeBuoy, title: "Scale", desc: "Ensuring long-term evolution and stability.", color: "from-[#24fe41] to-[#00ae1a]" },
    ],
  },
  UZ: {
    label: "Rivojlanish yo'li",
    title: "Bizning Jarayon",
    lead: "Yuqori samaradorlikka ega raqamli mahsulotlar uchun muhandislik bosqichlari.",
    steps: [
      { id: "01", icon: Search, title: "Tahlil", desc: "Maqsadlar va muhim talablarni aniqlash.", color: "from-[#ffc700] to-[#ff9d00]" },
      { id: "02", icon: Layout, title: "Reja", desc: "Arxitektura va strategik yo'l xaritasini tuzish.", color: "from-[#00c6ff] to-[#0072ff]" },
      { id: "03", icon: Code, title: "Qurish", desc: "Logikani kengayuvchan va tezkor kodga aylantirish.", color: "from-[#8e2de2] to-[#4a00e0]" },
      { id: "04", icon: Rocket, title: "Taqdimot", desc: "Global sahna uchun infratuzilmani sozlash.", color: "from-[#f85032] to-[#e73827]" },
      { id: "05", icon: LifeBuoy, title: "Rivoj", desc: "Uzoq muddatli o'sish va barqarorlikni ta'minlash.", color: "from-[#24fe41] to-[#00ae1a]" },
    ],
  },
  RU: {
    label: "Путь Роста",
    title: "Наш Процесс",
    lead: "Минималистичный цикл разработки для высокопроизводительных систем.",
    steps: [
      { id: "01", icon: Search, title: "Анализ", desc: "Выявление целей и критически важных требований.", color: "from-[#ffc700] to-[#ff9d00]" },
      { id: "02", icon: Layout, title: "Планирование", desc: "Определение архитектуры и стратегии успеха.", color: "from-[#00c6ff] to-[#0072ff]" },
      { id: "03", icon: Code, title: "Сборка", desc: "Перевод логики в масштабируемый и быстрый код.", color: "from-[#8e2de2] to-[#4a00e0]" },
      { id: "04", icon: Rocket, title: "Запуск", desc: "Оптимизация инфраструктуры для глобальной арены.", color: "from-[#f85032] to-[#e73827]" },
      { id: "05", icon: LifeBuoy, title: "Развитие", desc: "Обеспечение долгосрочного роста и стабильности.", color: "from-[#24fe41] to-[#00ae1a]" },
    ],
  },
};

export function ProcessSection() {
  const { lang } = useLanguage();
  const d = copy[lang] || copy.EN;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-transparent py-24 sm:py-32">
      {/* Background Flow Line (Desktop) */}
      <div className="absolute left-0 top-1/2 mt-20 hidden h-px w-full bg-white/[0.05] lg:block">
        <motion.div 
          style={{ scaleX: pathLength }}
          className="h-full w-full origin-left bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mb-16 sm:mb-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center gap-4"
          >
            <div className="h-px w-10 bg-primary/30" />
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/60">{d.label}</span>
            <div className="h-px w-10 bg-primary/30" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-white/95 to-white/62 bg-clip-text font-sentient text-6xl font-black tracking-tight text-transparent sm:text-8xl lg:text-9xl"
          >
            {d.title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-[14px] font-bold uppercase tracking-[0.4em] text-white/40 sm:text-base lg:max-w-3xl"
          >
            {d.lead}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4">
          {d.steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Premium Adaptive Card Face */}
              <div className="relative flex h-full flex-col items-center border border-white/70 bg-white/[0.82] p-12 text-center shadow-[0_22px_70px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.86)] ring-1 ring-black/[0.055] backdrop-blur-[30px] transition-all duration-700 hover:-translate-y-4 hover:border-primary/45 hover:bg-white/[0.9] hover:shadow-[0_26px_84px_rgba(0,0,0,0.16),0_0_30px_rgba(255,199,0,0.10)] dark:border-white/[0.07] dark:bg-white/[0.018] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-0 dark:hover:bg-white/[0.04] dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] translate-z-0 will-change-transform">
                
                {/* Outlined Background ID */}
                <div className="absolute right-6 top-4 select-none font-sentient text-8xl font-black text-black/[0.03] dark:text-white/[0.02] group-hover:text-primary/[0.06] transition-colors duration-500">
                  {step.id}
                </div>

                {/* Animated Gradient Accent */}
                <div className={`absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${step.color} opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-30`} />

                {/* Adaptive Icon Vessel */}
                <div className="relative mb-14 flex h-24 w-24 items-center justify-center rounded-3xl bg-black/[0.055] text-black/65 ring-1 ring-black/10 transition-all duration-500 group-hover:bg-primary/20 group-hover:text-black dark:bg-white/[0.03] dark:text-white/30 dark:border-white/5 dark:group-hover:bg-primary/20 dark:group-hover:text-primary">
                  <step.icon className="relative z-10 h-8 w-8 transition-transform duration-500 group-hover:scale-110" />
                </div>

                <h3 className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-black/80 transition-colors duration-500 group-hover:text-black dark:text-white/80 dark:group-hover:text-primary">
                  {step.title}
                </h3>
                
                <p className="line-clamp-4 text-[12px] font-bold leading-relaxed tracking-wider text-black/55 transition-colors duration-500 group-hover:text-black/80 dark:text-white/30 dark:group-hover:text-white/60">
                  {step.desc}
                </p>

                {/* Vertical Progress Mark */}
                <div className={`absolute bottom-0 left-1/2 h-0 w-[2px] -translate-x-1/2 bg-primary transition-all duration-700 ease-out group-hover:h-12`} />
              </div>

              {/* Connecting Dot (Desktop) */}
              {idx < d.steps.length - 1 && (
                <div className="absolute -right-2 top-1/2 z-20 hidden lg:block">
                   <div className="h-2 w-2 rounded-full border border-black/10 bg-white transition-all duration-500 group-hover:bg-primary group-hover:shadow-[0_0_12px_rgba(255,199,0,0.6)] dark:border-white/10 dark:bg-background" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
