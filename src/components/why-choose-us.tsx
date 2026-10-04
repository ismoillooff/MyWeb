import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Code2, TrendingUp, Headphones, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { ReactNode, MouseEvent } from "react";

// ─── Individual Bento Card Component ──────────────────────────────────────────
interface FeatureCopy {
  label: string;
  title: string;
  description: string;
  metric: string;
  cta: string;
}

interface BentoCardProps {
  feature: FeatureCopy;
  icon: ReactNode;
  className?: string;
  index: number;
}

const copy: Record<string, { label: string; title: string; lead: string; features: FeatureCopy[] }> = {
  EN: {
    label: "Capabilities",
    title: "Why Choose Us",
    lead: "A tight operating system for digital work: fast delivery, clean engineering, scalable foundations, and support that stays close after launch.",
    features: [
      {
        label: "Speed",
        title: "Fast Delivery",
        description: "Focused sprints, clear checkpoints, and launch-ready builds without dragging the project through extra noise.",
        metric: "01 / Sprint",
        cta: "Built to move",
      },
      {
        label: "Quality",
        title: "Clean Code",
        description: "Readable architecture, reusable patterns, and maintainable systems that future teams can understand quickly.",
        metric: "02 / Core",
        cta: "Built to last",
      },
      {
        label: "Growth",
        title: "Scalable",
        description: "Product foundations that can grow from first release to heavier traffic, new features, and bigger business needs.",
        metric: "03 / Scale",
        cta: "Built to expand",
      },
      {
        label: "Care",
        title: "24/7 Support",
        description: "Fast response, practical guidance, and steady technical care when your product needs attention after launch.",
        metric: "04 / Support",
        cta: "Built to stay",
      },
    ],
  },
  UZ: {
    label: "Imkoniyatlar",
    title: "Nega Aynan Biz",
    lead: "Raqamli ishlar uchun ixcham tizim: tez yetkazish, toza kod, kengayadigan poydevor va launchdan keyin ham yaqin support.",
    features: [
      {
        label: "Tezlik",
        title: "Tez Yetkazish",
        description: "Aniq sprintlar, ravshan checkpointlar va ortiqcha shovqinsiz ishga tushirishga tayyor natija.",
        metric: "01 / Sprint",
        cta: "Harakatga tayyor",
      },
      {
        label: "Sifat",
        title: "Toza Kod",
        description: "O'qilishi oson arxitektura, qayta ishlatiladigan patternlar va keyingi jamoa ham tez tushunadigan tizim.",
        metric: "02 / Yadro",
        cta: "Uzoqqa tayyor",
      },
      {
        label: "O'sish",
        title: "Kengayuvchan",
        description: "Birinchi relizdan katta trafik, yangi funksiyalar va kattaroq biznes ehtiyojlarigacha o'sadigan poydevor.",
        metric: "03 / Scale",
        cta: "O'sishga tayyor",
      },
      {
        label: "E'tibor",
        title: "24/7 Support",
        description: "Launchdan keyin mahsulotga e'tibor kerak bo'lganda tez javob, amaliy maslahat va barqaror texnik yordam.",
        metric: "04 / Support",
        cta: "Yonma-yon ishlash",
      },
    ],
  },
  RU: {
    label: "Возможности",
    title: "Почему Мы",
    lead: "Собранная система для цифровой работы: быстрые релизы, чистая инженерия, масштабируемая основа и поддержка после запуска.",
    features: [
      {
        label: "Скорость",
        title: "Быстрая Доставка",
        description: "Четкие спринты, понятные контрольные точки и готовый к запуску результат без лишнего шума.",
        metric: "01 / Спринт",
        cta: "Создано двигаться",
      },
      {
        label: "Качество",
        title: "Чистый Код",
        description: "Понятная архитектура, повторяемые паттерны и системы, которые будущая команда быстро разберет.",
        metric: "02 / Ядро",
        cta: "Создано надолго",
      },
      {
        label: "Рост",
        title: "Масштаб",
        description: "Основа продукта, которая растет от первого релиза до большего трафика, функций и задач бизнеса.",
        metric: "03 / Scale",
        cta: "Создано расти",
      },
      {
        label: "Забота",
        title: "24/7 Поддержка",
        description: "Быстрый ответ, практичные рекомендации и стабильная техническая помощь после запуска продукта.",
        metric: "04 / Support",
        cta: "Создано рядом",
      },
    ],
  },
};

const BentoCard = ({ feature, icon, className, index }: BentoCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group h-full min-h-[280px] rounded-[2rem] p-7 sm:p-8 overflow-hidden transition-[border-color,background-color,box-shadow] duration-500 border border-white/70 bg-white/[0.82] dark:bg-white/[0.014] backdrop-blur-xl ring-1 ring-black/[0.055] dark:ring-0 shadow-[0_22px_70px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.86)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#ffc700]/40 hover:bg-white/[0.9] hover:shadow-[0_26px_84px_rgba(0,0,0,0.16),0_0_30px_rgba(255,199,0,0.10),inset_0_1px_0_rgba(255,255,255,0.95)] dark:border-foreground/[0.06] dark:hover:shadow-[0_24px_90px_rgba(0,0,0,0.42),0_0_34px_rgba(255,199,0,0.07),inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.64),transparent_36%,rgba(255,199,0,0.07)_100%)] opacity-75 dark:opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/30 to-transparent opacity-70 dark:opacity-50" />
      <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full border border-[#ffc700]/15 opacity-0 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#ffc700]/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-full flex flex-col">
        <div className="mb-auto">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div className="w-12 h-12 rounded-2xl bg-black/[0.055] dark:bg-foreground/[0.05] ring-1 ring-black/10 dark:ring-foreground/5 flex items-center justify-center text-black/65 dark:text-foreground/60 group-hover:text-black dark:group-hover:text-[#ffc700] group-hover:bg-[#ffc700]/20 dark:group-hover:bg-[#ffc700]/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              {icon}
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/35 dark:text-foreground/25 group-hover:text-[#9b7600] dark:group-hover:text-[#ffc700]/70 transition-colors duration-500">
                {feature.label}
              </span>
              <span className="rounded-full border border-black/10 dark:border-foreground/10 bg-white/55 dark:bg-foreground/[0.03] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.22em] text-black/45 dark:text-foreground/35">
                {feature.metric}
              </span>
            </div>
          </div>
          <h3 className="text-2xl sm:text-[1.85rem] font-sentient font-extrabold tracking-tight mb-3 text-black/90 dark:text-foreground text-pretty">
            {feature.title}
          </h3>
          <p className="text-sm sm:text-base text-black/62 dark:text-foreground/50 font-medium leading-relaxed max-w-[420px]">
            {feature.description}
          </p>
        </div>
        
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-foreground/[0.06] pt-5">
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-black/45 dark:text-foreground/35 group-hover:text-[#9b7600] dark:group-hover:text-[#ffc700] transition-colors duration-500">
            {feature.cta}
          </span>
          <ArrowUpRight className="h-4 w-4 text-black/35 dark:text-foreground/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9b7600] dark:group-hover:text-[#ffc700]" />
        </div>
      </div>

      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#ffc700]/5 blur-3xl rounded-full group-hover:bg-[#ffc700]/10 transition-colors duration-700" />
    </motion.div>
  );
};

// ─── Main Section Component ───────────────────────────────────────────────────
export function WhyChooseUs() {
  const { lang } = useLanguage();
  const d = copy[lang] || copy.EN;

  const icons = [
    <Zap size={24} />,
    <Code2 size={24} />,
    <TrendingUp size={24} />,
    <Headphones size={24} />,
  ];

  const cardClasses = [
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 overflow-hidden bg-background">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ffc700]/[0.045] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-foreground/[0.025] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-1/2 top-8 h-px w-[min(720px,82vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffc700]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* FLUID TYPOGRAPHY HEADING */}
        <header className="mb-16 sm:mb-24 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.5em] text-[#d3a300] dark:text-[#ffc700] font-bold mb-4 block"
          >
            {d.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sentient font-black tracking-tighter leading-[0.9] text-foreground text-balance"
            style={{ fontSize: "clamp(2.5rem, 8vw + 1rem, 7.5rem)" }}
          >
            {d.title}<span className="text-[#d3a300] dark:text-[#ffc700]">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-foreground/50 sm:text-base md:mx-0"
          >
            {d.lead}
          </motion.p>
        </header>

        {/* BENTO GRID 2.0 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
          {d.features.map((feature, i) => (
            <BentoCard
              key={feature.title}
              index={i}
              feature={feature}
              icon={icons[i]}
              className={cardClasses[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
