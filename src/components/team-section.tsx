import { useLanguage } from "@/lib/i18n";
import { ScrollFloat } from "./ui/scroll-float";
import { AnimatedTitle } from "./ui/animated-title";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

const teamData = {
  EN: {
    words: ["Our", "Team"],
    subtitle: "MyWeb Digital Agency Core",
    founder: {
      name: "Founder Name",
      role: "Founder & CEO",
      avatar: "https://i.pravatar.cc/150?img=11",
      info: "Visionary leader driving the agency's global tech strategy and scale.",
    },
    devs: [
      { name: "Engineer", role: "Backend Architecture", avatar: "https://i.pravatar.cc/150?img=12", info: "Expert in scalable microservices and serverless architectures." },
      { name: "Specialist", role: "AI & Data Science", avatar: "https://i.pravatar.cc/150?img=13", info: "Specializing in predictive models, deep learning, and data pipelines." },
      { name: "Designer", role: "UX/UI Design", avatar: "https://i.pravatar.cc/150?img=5", info: "Crafting intuitive, pixel-perfect user experiences that drive conversion." },
      { name: "Engineer", role: "Frontend Interfaces", avatar: "https://i.pravatar.cc/150?img=9", info: "Building highly interactive and optimized modern React/Vite interfaces." },
      { name: "Analyst", role: "Cyber Security", avatar: "https://i.pravatar.cc/150?img=14", info: "Ensuring zero-trust security and proactive enterprise threat modeling." },
      { name: "Manager", role: "Project Management", avatar: "https://i.pravatar.cc/150?img=33", info: "Orchestrating agile workflows and ensuring timely delivery." },
    ],
  },
  UZ: {
    words: ["Bizning", "Jamoa"],
    subtitle: "MyWeb Digital Agency",
    founder: {
      name: "Asoschi Ismi",
      role: "Asoschi va CEO",
      avatar: "https://i.pravatar.cc/150?img=11",
      info: "Agentlikning global tech-strategiyasi va xalqaro miqyosini boshqaruvchi rahbar.",
    },
    devs: [
      { name: "Dasturchi", role: "Backend Arxitektura", avatar: "https://i.pravatar.cc/150?img=12", info: "Kengayuvchan mikroxizmatlar va ishonchli server arxitekturasi eksperti." },
      { name: "Mutaxassis", role: "AI va Data Science", avatar: "https://i.pravatar.cc/150?img=13", info: "Sun'iy idrok modellari va katta ma'lumotlar tahliliga ixtisoslashgan." },
      { name: "Dizayner", role: "UX/UI Dizayn", avatar: "https://i.pravatar.cc/150?img=5", info: "Konversiyani oshiruvchi intuitiv va pixel-perfect vizuallar yaratuvchi." },
      { name: "Dasturchi", role: "Frontend Interfeys", avatar: "https://i.pravatar.cc/150?img=9", info: "O'ta tezkor, interaktiv va optimizatsiya qilingan React interfeyslar." },
      { name: "Tahlilchi", role: "Kiberxavfsizlik", avatar: "https://i.pravatar.cc/150?img=14", info: "Hujumlarni oldini olish menejeri va ilovalar xavfsizligi ta'minotchisi." },
      { name: "Menejer", role: "Loyihalar Boshqaruvi", avatar: "https://i.pravatar.cc/150?img=33", info: "Agile jarayonlarini muvofiqlashtirib, loyihalarni o'z vaqtida yetkazuvchi." },
    ],
  },
  RU: {
    words: ["Наша", "Команда"],
    subtitle: "MyWeb Digital Agency",
    founder: {
      name: "Имя Основателя",
      role: "Основатель и CEO",
      avatar: "https://i.pravatar.cc/150?img=11",
      info: "Главный лидер, управляющий глобальной IT-стратегией агентства.",
    },
    devs: [
      { name: "Инженер", role: "Backend Разработка", avatar: "https://i.pravatar.cc/150?img=12", info: "Эксперт в области масштабируемых микросервисов и serverless-архитектуры." },
      { name: "Специалист", role: "AI и Data Science", avatar: "https://i.pravatar.cc/150?img=13", info: "Специалист по моделям ИИ, deep learning и пайплайнам данных." },
      { name: "Дизайнер", role: "UX/UI Дизайн", avatar: "https://i.pravatar.cc/150?img=5", info: "Создает идеальные визуальные интерфейсы с высокой конверсией." },
      { name: "Инженер", role: "Frontend Интерфейсы", avatar: "https://i.pravatar.cc/150?img=9", info: "Разработка высокоинтерактивных и оптимизированных React приложений." },
      { name: "Аналитик", role: "Кибербезопасность", avatar: "https://i.pravatar.cc/150?img=14", info: "Обеспечение безопасности Zero-trust и защита корпоративных данных." },
      { name: "Менеджер", role: "Управление Проектами", avatar: "https://i.pravatar.cc/150?img=33", info: "Координация agile-процессов и обеспечение своевременной сдачи." },
    ],
  },
};

function MemberCard({ member, isFounder = false, lang = "EN" }: { member: any; isFounder?: boolean; lang?: string }) {
  const btnLabel = lang === "UZ" ? "Batafsil" : lang === "RU" ? "Подробнее" : "View More";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`relative flex items-center p-4 lg:p-5 rounded-[2rem] border border-black/5 dark:border-white/[0.04] bg-white/[0.60] dark:bg-white/[0.015] backdrop-blur-3xl ring-1 ring-black/[0.03] dark:ring-0 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,199,0,0.2)] group overflow-hidden ${isFounder ? 'w-full max-w-[420px] sm:max-w-[500px] p-6 lg:p-8' : 'w-full lg:min-w-[310px] xl:max-w-[340px] mx-auto'}`}
    >
       
       {/* ─── Premium Mouse Spotlight Bloom ─── */}
       <motion.div
         className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
         style={{
           background: useMotionTemplate`
             radial-gradient(
               450px circle at ${mouseX}px ${mouseY}px,
               rgba(255, 199, 0, 0.12),
               transparent 80%
             )
           `,
         }}
       />
       {/* ─── Premium Border Flare Tracking Mouse ─── */}
       <motion.div
         className="pointer-events-none absolute inset-0 rounded-[2rem] border border-[#ffc700] opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay dark:mix-blend-screen"
         style={{
           WebkitMaskImage: useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
           maskImage: useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, black, transparent)`
         }}
       />
       
       {/* Horizontal Layout: Floating Avatar Frame */}
       <div className={`relative flex-shrink-0 p-[2px] rounded-[1.5rem] bg-gradient-to-b from-black/10 to-transparent dark:from-white/20 dark:to-transparent shadow-[0_10px_30px_-5px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.4)] group-hover:shadow-[0_15px_40px_-5px_rgba(255,199,0,0.25)] transition-all duration-700 group-hover:scale-105 z-10 ${isFounder ? 'w-24 h-24 sm:w-28 sm:h-28 mr-6 sm:mr-8' : 'w-20 h-20 sm:w-20 sm:h-20 mr-4 sm:mr-5'}`}>
          <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-background">
             <img src={member.avatar} alt={member.name} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
             <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[1.5rem] pointer-events-none" />
          </div>
          
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#ffc700] rounded-full border-[3px] border-[#fafafa] dark:border-[#070707] shadow-[0_0_10px_rgba(255,199,0,0.5)] scale-0 group-hover:scale-100 transition-transform duration-500 delay-150" />
       </div>
       
       <div className="relative z-10 flex flex-col items-start w-full text-left">
         {/* Name Label */}
         <h4 className={`font-sentient font-bold text-foreground line-clamp-1 mb-0.5 transition-colors duration-500 group-hover:text-primary ${isFounder ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>
           {member.name}
         </h4>
         
         {/* Simple Tag Role (Removed pill for smaller height flow) */}
         <p className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-primary/80 mb-2">
           {member.role}
         </p>

         {/* P info tag */}
         <p className="text-[10px] sm:text-[11px] leading-relaxed text-foreground/50 transition-colors duration-500 group-hover:text-foreground/70 line-clamp-2 md:line-clamp-3 mb-3 w-full">
           {member.info}
         </p>

         {/* Batafsil Button (Minimal text button) */}
         <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ffc700]/70 hover:text-[#ffc700] transition-colors duration-300 group/btn">
            {btnLabel} <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
         </button>
       </div>
       
       {/* Hover Edge Shine Highlight */}
       <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-transparent group-hover:ring-primary/25 transition-all duration-700 pointer-events-none" />
    </div>
  );
}

// ─── Data Flow Animation Components ───
function VerticalDataPulse() {
  return (
    <motion.div
      initial={{ top: "-10%" }}
      animate={{ top: "110%" }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
      className="absolute left-1/2 -translate-x-1/2 w-[2px] h-[30px] bg-gradient-to-b from-transparent via-[#ffc700] to-transparent shadow-[0_0_8px_#ffc700] z-20"
    />
  );
}

function HorizontalDataPulse({ reverse = false }: { reverse?: boolean }) {
  return (
    <motion.div
      initial={{ left: reverse ? "110%" : "-10%" }}
      animate={{ left: reverse ? "-10%" : "110%" }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
      className="absolute top-1/2 -translate-y-1/2 h-[2px] w-[50px] bg-gradient-to-r from-transparent via-[#ffc700] to-transparent shadow-[0_0_8px_#ffc700] z-20"
    />
  );
}


export function TeamSection() {
  const { lang } = useLanguage();
  const d = teamData[lang as keyof typeof teamData] || teamData.EN;
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 65%", "end 80%"] });
  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      
      {/* ─── Ambient Background Glow ─── */}
      <motion.div 
        style={{ y: yGlow }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] min-w-[500px] bg-[#ffc700]/[0.035] dark:bg-[#ffc700]/[0.05] rounded-[100%] blur-[120px] pointer-events-none" 
      />

      {/* ─── TITLE AREA ─── */}
      <div className="relative text-center pb-12 lg:pb-16 px-4">
        <ScrollFloat
          className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-foreground/30 mb-5"
          animationDuration={0.8}
          ease="back.out(1.5)"
          scrollStart="top 95%"
          scrollEnd="top 70%"
          stagger={0.02}
          tag="p"
        >
          {d.subtitle}
        </ScrollFloat>

        <div className="relative inline-block px-4">
          <AnimatedTitle
            text={d.words.join(" ")}
            effect="flip"
            className="text-4xl sm:text-5xl lg:text-6xl font-sentient"
          />
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
          <span className="w-[4px] h-[4px] rotate-45 bg-[#ffc700] shadow-[0_0_10px_rgba(255,199,0,0.6)] opacity-80" />
          <span className="w-[4px] h-[4px] rotate-45 bg-[#ffc700] shadow-[0_0_10px_rgba(255,199,0,0.6)] opacity-80" />
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
        </div>
      </div>

      {/* ─── TECHNICAL DIAGRAM ─── */}
      <div className="max-w-[1700px] xl:w-[98%] mx-auto px-2 lg:px-4 relative z-10 pb-12 overflow-x-auto hide-scrollbar">
        
        {/* DESKTOP LAYOUT (Neural Tree Structure) */}
        <div className="hidden lg:flex flex-col items-center w-full max-w-5xl mx-auto pb-8 relative">
          
          {/* Scroll-Driven Central Trunk Line */}
          <div className="absolute top-[7.5rem] bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-primary/10 pointer-events-none z-0 rounded-full overflow-hidden">
             <motion.div 
               style={{ height: spineHeight }}
               className="w-full bg-gradient-to-b from-transparent via-[#ffc700] to-[#ffc700] shadow-[0_0_15px_rgba(255,199,0,0.8)] rounded-full origin-top"
             />
          </div>

          {/* Founder Node */}
          <div className="relative z-30 mb-20 flex justify-center w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <MemberCard member={d.founder} isFounder lang={lang} />
            </motion.div>
          </div>
          
          <div className="relative w-full flex flex-col gap-12 z-20">
             
             {/* ROW 1: Dev 1 & Dev 2 */}
             <div className="flex w-full justify-between items-center relative">
               {/* Left Node */}
               <div className="w-[45%] flex justify-end relative">
                  {/* Connection Line */}
                  <motion.div 
                     initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                     className="absolute top-1/2 -right-[11.2%] w-[11.2%] h-px bg-gradient-to-l from-primary/40 to-transparent origin-left overflow-hidden"
                  >
                     <HorizontalDataPulse />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full max-w-[380px]">
                     <MemberCard member={d.devs[0]} lang={lang} />
                  </motion.div>
               </div>
               
               {/* Center Junction Diamond */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-background border border-primary rotate-45 z-30 shadow-[0_0_10px_rgba(255,199,0,0.5)]" />

               {/* Right Node */}
               <div className="w-[45%] flex justify-start relative">
                  {/* Connection Line */}
                  <motion.div 
                     initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                     className="absolute top-1/2 -left-[11.2%] w-[11.2%] h-px bg-gradient-to-r from-primary/40 to-transparent origin-right overflow-hidden"
                  >
                     <HorizontalDataPulse reverse />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full max-w-[380px]">
                     <MemberCard member={d.devs[1]} lang={lang} />
                  </motion.div>
               </div>
             </div>

             {/* ROW 2: Dev 3 & Dev 4 */}
             <div className="flex w-full justify-between items-center relative">
               <div className="w-[45%] flex justify-end relative">
                  <motion.div 
                     initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                     className="absolute top-1/2 -right-[11.2%] w-[11.2%] h-px bg-gradient-to-l from-primary/40 to-transparent origin-left overflow-hidden"
                  >
                     <HorizontalDataPulse />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full max-w-[380px]">
                     <MemberCard member={d.devs[2]} lang={lang} />
                  </motion.div>
               </div>
               
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-background border border-primary rotate-45 z-30 shadow-[0_0_10px_rgba(255,199,0,0.5)]" />

               <div className="w-[45%] flex justify-start relative">
                  <motion.div 
                     initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                     className="absolute top-1/2 -left-[11.2%] w-[11.2%] h-px bg-gradient-to-r from-primary/40 to-transparent origin-right overflow-hidden"
                  >
                     <HorizontalDataPulse reverse />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full max-w-[380px]">
                     <MemberCard member={d.devs[3]} lang={lang} />
                  </motion.div>
               </div>
             </div>

             {/* ROW 3: Dev 5 & Dev 6 */}
             <div className="flex w-full justify-between items-center relative">
               <div className="w-[45%] flex justify-end relative">
                  <motion.div 
                     initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
                     className="absolute top-1/2 -right-[11.2%] w-[11.2%] h-px bg-gradient-to-l from-primary/40 to-transparent origin-left overflow-hidden"
                  >
                     <HorizontalDataPulse />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="w-full max-w-[380px]">
                     <MemberCard member={d.devs[4]} lang={lang} />
                  </motion.div>
               </div>
               
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-background border border-primary rotate-45 z-30 shadow-[0_0_10px_rgba(255,199,0,0.5)]" />

               <div className="w-[45%] flex justify-start relative">
                  <motion.div 
                     initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
                     className="absolute top-1/2 -left-[11.2%] w-[11.2%] h-px bg-gradient-to-r from-primary/40 to-transparent origin-right overflow-hidden"
                  >
                     <HorizontalDataPulse reverse />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="w-full max-w-[380px]">
                     <MemberCard member={d.devs[5]} lang={lang} />
                  </motion.div>
               </div>
             </div>
          </div>
        </div>

        {/* MOBILE / TABLET LAYOUT (Tech Branching) */}
        <div className="flex lg:hidden flex-col w-full relative pl-6 max-w-sm mx-auto">
          {/* Main Vertical Spine */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent origin-top overflow-hidden" 
          >
             <VerticalDataPulse />
             <VerticalDataPulse />
          </motion.div>
          
          {/* Founder Node */}
          <div className="relative mb-12">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <MemberCard member={d.founder} isFounder lang={lang} />
            </motion.div>
          </div>

          <div className="space-y-8 pt-4 pl-8 relative">
             {d.devs.map((dev, i) => (
               <div key={i} className="relative flex justify-end sm:justify-center">
                  {/* T-Junction Diamond on Spine */}
                  <div className="absolute top-1/2 -left-8 -translate-x-[0.5px] -translate-y-1/2 w-[5px] h-[5px] bg-background border border-primary rotate-45 z-20 shadow-[0_0_8px_rgba(255,199,0,0.3)]" />
                  
                  {/* Horizontal Branch Line */}
                  <motion.div 
                     initial={{ scaleX: 0 }}
                     whileInView={{ scaleX: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                     className="absolute top-1/2 -left-8 w-8 h-px bg-gradient-to-r from-primary/40 to-primary/10 origin-left overflow-hidden" 
                  >
                     <HorizontalDataPulse />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }} className="w-full">
                    <MemberCard member={dev} lang={lang} />
                  </motion.div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
}
