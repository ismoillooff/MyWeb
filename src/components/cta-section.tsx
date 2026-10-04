"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { AnimatedTitle } from "./ui/animated-title";
import { Magnetic } from "./ui/magnetic";

const ctaData = {
  EN: {
    badge: "Start Your Journey",
    title: "Ready to Scale Your Business?",
    desc: "Join top industry leaders who trust MyWeb Digital Agency. We blend cutting-edge engineering with elite design to build digital experiences that drive real revenue.",
    btn: "Start A Project",
    secondaryBtn: "Book a Consultation"
  },
  UZ: {
    badge: "Loyiha Yaratish",
    title: "Biznesingizni yangi bosqichga olib chiqamizmi?",
    desc: "MyWeb Digital Agency'ga ishonch bildirgan ilg'or kompaniyalar safiga qo'shiling. Haqiqiy daromad keltiruvchi raqamli platformalar yaratish uchun shu yerdamiz.",
    btn: "Loyihani Boshlash",
    secondaryBtn: "Konsultatsiya Olish"
  },
  RU: {
    badge: "Начните Свой Путь",
    title: "Готовы масштабировать ваш бизнес?",
    desc: "Присоединяйтесь к лидерам рынка, доверяющим MyWeb Digital Agency. Мы создаем премиум IT-решения, которые приносят реальную прибыль вашему бизнесу.",
    btn: "Начать Проект",
    secondaryBtn: "Заказать Консультацию"
  }
};

export function CtaSection({ onStart }: { onStart?: () => void }) {
  const { lang } = useLanguage();
  const d = ctaData[lang as keyof typeof ctaData] || ctaData.EN;

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-transparent py-24 sm:py-32 flex items-center justify-center min-h-[70vh]">
      
      {/* ─── Massive Ambient Neon Glows (Transparent Background Setup) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,199,0,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,199,0,0.15),transparent_70%)] blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,199,0,0.05),transparent_60%)] blur-[80px] pointer-events-none -z-10 animate-pulse duration-[4000ms]" />
      
      {/* Floating Neon Orbs */}
      <motion.div 
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-32 h-32 bg-[#ffc700]/10 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div 
        animate={{ y: [30, -30, 30], x: [20, -20, 20] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-[#ffc700]/10 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* ─── The Glassmorphic Neon Card ─── */}
        <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-[1px] overflow-hidden group">
          
          {/* Animated Neon Rotating Border Gradient */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,199,0,0.4)_360deg)] animate-[spin_6s_linear_infinite]" />
          
          {/* Pure Glass Container */}
          <div className="relative h-full w-full rounded-[2.4rem] sm:rounded-[2.9rem] bg-black/[0.02] dark:bg-black/[0.1] backdrop-blur-md px-4 py-16 sm:py-20 lg:p-24 flex flex-col items-center text-center border border-black/10 dark:border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.05)] dark:shadow-none">
             
             {/* Subtitle Badge with Neon Stroke */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#ffc700]/30 bg-[#ffc700]/10 px-4 py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-black/80 dark:text-[#ffc700]"
             >
               <Sparkles className="w-3.5 h-3.5 text-[#ffc700]" />
               {d.badge}
             </motion.div>

             {/* Main Title using AnimatedTitle utility */}
             <div className="max-w-4xl mb-8 w-full px-2">
               <AnimatedTitle 
                  text={d.title}
                  effect="blur"
                  className="font-sentient text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black tracking-tight text-foreground leading-[1.2] sm:leading-[1.1] sm:text-balance"
               />
             </div>

             {/* Description text */}
             <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-foreground/60 mb-12 px-4"
             >
               {d.desc}
             </motion.p>

             {/* Action Buttons */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-4"
             >
               {/* Primary Neon Button */}
               <Magnetic strength={0.2} className="w-full sm:w-auto">
               <button
                 onClick={onStart}
                 className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#ffc700] px-8 py-4 sm:py-5 text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.24em] text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_25px_rgba(255,199,0,0.4)]"
               >
                 <span className="relative z-10">{d.btn}</span>
                 <div className="relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:rotate-45">
                   <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
                 </div>
               </button>
               </Magnetic>

               {/* Secondary Outline Button */}
               <Magnetic strength={0.2} className="w-full sm:w-auto">
               <button
                 onClick={onStart}
                 className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent px-8 py-4 sm:py-5 text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.24em] text-foreground transition-all duration-300 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/5 dark:hover:bg-white/5"
               >
                 {d.secondaryBtn}
               </button>
               </Magnetic>
             </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
