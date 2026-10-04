import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { AnimatedTitle } from "./ui/animated-title";
import { ScrollFloat } from "./ui/scroll-float";
import { Plus, Minus } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   FAQ DATA
   ═══════════════════════════════════════════════════════════ */
const faqData = {
  EN: {
    subtitle: "Got Questions?",
    words: ["Frequently", "Asked"],
    items: [
      { q: "How long does a typical project take?", a: "Project timelines vary depending on scope, but a standard corporate website typically takes 4-6 weeks from initial research to final launch." },
      { q: "How much does a premium website cost?", a: "Pricing is tailored to the exact requirements of your project. After our initial discovery call, we provide a detailed proposal matching your vision." },
      { q: "What does your process look like?", a: "We follow a 4-step agile process: Discovery, Design/Prototyping, Full-stack Development, and Quality Assurance testing before deployment." },
      { q: "Do you provide long-term support?", a: "Yes. Every project includes a warranty period, and we offer dedicated monthly retainers for ongoing maintenance and SEO scaling." },
      { q: "Which technologies do you specialize in?", a: "Our core stack includes React, Next.js, Vue, Node.js, and modern styling solutions like Tailwind CSS, backed by scalable cloud databases." },
      { q: "Can you redesign our existing platform?", a: "Absolutely. A large part of our work involves taking older platforms and bringing them up to elite logic, design and performance standards." },
      { q: "Do you guarantee SEO optimization?", a: "Yes. SEO-friendly architecture, schema markup, semantic HTML, and lightning-fast load times are built inherently into everything we code." },
      { q: "How are project payments handled?", a: "We typically work on milestone-based payments (e.g., 40% upfront, 30% after design approval, 30% before final live deployment)." },
      { q: "Will the site be fully mobile responsive?", a: "100%. We design with a mobile-first philosophy ensuring pixel-perfect functionality on all smartphones and tablets." },
      { q: "Can you integrate third-party APIs?", a: "Yes, we handle complex API integrations including payment gateways (Stripe, PayPal), CRM systems, AI models, and marketing tools." },
      { q: "Who owns the final source code?", a: "Once the final payment is cleared, you own 100% of the intellectual property, source code, and design assets for the project." },
      { q: "What do you need from us to get started?", a: "Simply a brief describing your goals. During our first meeting, we will gather all necessary brand assets and functional requirements." }
    ]
  },
  UZ: {
    subtitle: "Savollaringiz Bormi?",
    words: ["Ko'p", "So'raladiganlar"],
    items: [
      { q: "Loyiha odatda qancha vaqt oladi?", a: "Loyiha hajmi va murakkabligiga qarab farq qiladi, lekin standart korporativ veb-sayt boshlang'ich tahlildan ishga tushgunga qadar 4-6 hafta vaqt oladi." },
      { q: "Premium sayt yaratish qancha turadi?", a: "Narxlar loyihangizning aniq talablariga qarab belgilanadi. Dastlabki muzokaradan so'ng biz sizning maqsadingizga mos batafsil taklif taqdim etamiz." },
      { q: "Sizning ishlash jarayoningiz qanday?", a: "Biz 4 bosqichli jarayondan foydalanamiz: Tahlil, Dizayn/Prototip, Full-stack Dasturlash va foydalanishga topshirishdan oldingi Qat'iy Test." },
      { q: "Uzoq muddatli texnik yordam berasizmi?", a: "Ha. Har bir loyiha kafolat davrini o'z ichiga oladi va biz doimiy xizmat ko'rsatish va rivojlantirish uchun oylik shartnomalar taklif qilamiz." },
      { q: "Qaysi texnologiyalarga ixtisoslashgansiz?", a: "Asosiy stekimiz React, Next.js, Vue, Node.js va Tailwind CSS kabi zamonaviy texnologiyalardan iborat bo'lib, ular xavfsiz backend bilan ishlaydi." },
      { q: "Mavjud saytimizni qayta loyihalay olasizmi?", a: "Albatta. Bizning asosiy xizmatlarimizdan biri eski platformalarni zamonaviy xalqaro dizayn va tezlik standartlarigacha ko'tarishdir." },
      { q: "SEO optimizatsiyasi kafolatlanadimi?", a: "Kodni yozishda boshidanoq qidiruv tizimlariga mos arxitektura, semantik HTML taglar va o'ta tez yuklanishni ta'minlaymiz." },
      { q: "To'lovlar qanday amalga oshiriladi?", a: "To'lovlar odatda bosqichma-bosqich qabul qilinadi (Masalan: 40% oldindan, 30% dizayn tasdiqlangach, 30% to'liq topshirishdan oldin)." },
      { q: "Sayt mobil qurilmalarga mos keladimi?", a: "100%. Biz 'Mobile-first' falsafasi bilan ishlaymiz, shuning uchun saytingiz barcha smartfon va planshetlarda mukammal ishlaydi." },
      { q: "Boshqa xizmatlarga (API) integratsiya qilasizmi?", a: "Ha, biz to'lov tizimlari (Stripe, Click, Payme), CRM, AI (Sun'iy idrok) va turli ijtimoiy tarmoqlar integratsiyalarini osonlikcha bajaramiz." },
      { q: "Qurilgan sayt kodiga kim egalik qiladi?", a: "Yakuniy to'lov amalga oshirilgandan so'ng, barcha dizayn, ma'lumotlar bazasi va to'liq manba kodlari (source code) 100% sizning mulkingizga aylanadi." },
      { q: "Boshlash uchun bizdan nima talab qilinadi?", a: "Bizga shunchaki yechim izlayotgan muammongiz va maqsadingizni aytishingiz kifoya. Qolgan barcha texnik savollarni o'zimiz hal qilamiz." }
    ]
  },
  RU: {
    subtitle: "Есть Вопросы?",
    words: ["Частые", "Вопросы"],
    items: [
      { q: "Сколько времени занимает типичный проект?", a: "Сроки зависят от объема проекта, но стандартный корпоративный сайт обычно занимает от 4 до 6 недель от анализа до запуска." },
      { q: "Сколько стоит создание премиум сайта?", a: "Цены формируются исходя из точных требований вашего проекта. После первого обсуждения мы предоставляем детальное коммерческое предложение." },
      { q: "Как выглядит ваш процесс работы?", a: "Мы используем 4-этапный подход: Анализ (Discovery), Дизайн/Прототип, Full-stack разработка и строгое Тестирование качества." },
      { q: "Предоставляете ли вы долгосрочную поддержку?", a: "Да. Каждый проект включает гарантийный срок, и мы предлагаем ежемесячное обслуживание для дальнейшей оптимизации." },
      { q: "В каких технологиях вы специализируетесь?", a: "Наш основной стек включает React, Next.js, Vue, Node.js и Tailwind CSS, поддерживаемые современными облачными решениями." },
      { q: "Можете ли вы обновить наш существующий сайт?", a: "Абсолютно. Большая часть нашей работы — это обновление устаревших платформ до топовых мировых стандартов." },
      { q: "Вы гарантируете SEO-оптимизацию?", a: "Да. SEO-адаптивная архитектура, семантический HTML и молниеносная скорость загрузки изначально встроены в наш код." },
      { q: "Как осуществляются платежи по проекту?", a: "Обычно мы работаем поэтапно (например: 40% аванс, 30% после утверждения дизайна, 30% перед финальным запуском)." },
      { q: "Будет ли сайт адаптирован для мобильных устройств?", a: "На 100%. Мы используем подход 'Mobile-first', гарантируя идеальную функциональность на всех смартфонах и планшетах." },
      { q: "Можете интегрировать сторонние API?", a: "Да, мы выполняем сложные интеграции, включая платежные шлюзы, CRM, искусственный интеллект (AI) и инструменты аналитики." },
      { q: "Кому принадлежит исходный код?", a: "После полного завершения оплаты все права, дизайн и исходные коды (source code) 100% переходят к вам на праве собственности." },
      { q: "Что нужно от нас для старта?", a: "Достаточно просто рассказать о ваших целях. Всю техническую и маркетинговую архитектуру мы возьмем на себя на первой встрече." }
    ]
  }
};

/* ═══════════════════════════════════════════════════════════
   ACCORDION CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */
function FaqItem({ item, isOpen, onClick, idx }: { item: any; isOpen: boolean; onClick: () => void; idx: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (idx % 6) * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`relative group rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${
        isOpen ? 'border-primary/30 bg-white/[0.8] dark:bg-white/[0.03] shadow-[0_15px_40px_-5px_rgba(255,199,0,0.15)]' : 'border-black/5 dark:border-white/[0.04] bg-white/[0.6] dark:bg-white/[0.012] hover:border-primary/20 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(255,199,0,0.1)]'
      } backdrop-blur-3xl`}
    >
       {/* ─── Mouse Spotlight Bloom ─── */}
       <motion.div
         className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
         style={{
           background: useMotionTemplate`
             radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 199, 0, 0.08), transparent 80%)
           `,
         }}
       />
       {/* ─── Hover Border Trace ─── */}
       <motion.div
         className="pointer-events-none absolute inset-0 rounded-2xl border border-[#ffc700] opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay dark:mix-blend-screen"
         style={{
           WebkitMaskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
           maskImage: useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, black, transparent)`
         }}
       />

       {/* Question Button Header */}
       <div className="w-full flex items-center justify-between p-5 sm:p-6 lg:p-7 text-left z-10 relative">
         <span className={`font-sentient font-bold text-base sm:text-lg pr-6 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-foreground/80'}`}>
           {item.q}
         </span>
         
         {/* Toggle Icon Container */}
         <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'border-primary bg-primary/10 text-primary rotate-180 shadow-[0_0_10px_rgba(255,199,0,0.3)]' : 'border-black/10 dark:border-white/10 text-foreground/50 group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/5'}`}>
           <Minus className={`w-4 h-4 absolute transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
           <Plus className={`w-4 h-4 absolute transition-all duration-300 ${!isOpen ? 'opacity-100 scale-100' : 'opacity-0 -scale-50 rotate-90'}`} />
         </div>
       </div>

       {/* Animated Answer Body */}
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
           >
             <div className="px-5 sm:px-6 lg:px-7 pb-6 sm:pb-7 pt-0 relative z-10">
               <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-5" />
               <p className="text-sm sm:text-[15px] text-foreground/70 leading-relaxed pl-3 border-l-[3px] border-primary/40">
                 {item.a}
               </p>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
   ═══════════════════════════════════════════════════════════ */
export function FaqSection() {
  const { lang } = useLanguage();
  const d = faqData[lang as keyof typeof faqData] || faqData.EN;
  const [openIndex, setOpenIndex] = useState<number | null>(null); // None open by default

  const midpoint = Math.ceil(d.items.length / 2);
  const leftCol = d.items.slice(0, midpoint);
  const rightCol = d.items.slice(midpoint);

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      {/* ─── Ambient Glow ─── */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] min-w-[500px] bg-[#ffc700]/[0.02] dark:bg-[#ffc700]/[0.035] rounded-[100%] blur-[120px] pointer-events-none" />

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
            effect="blur"
            className="text-4xl sm:text-5xl lg:text-6xl font-sentient"
          />
        </div>

        {/* Decorative Diamond Separator */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
          <span className="w-[4px] h-[4px] rotate-45 bg-[#ffc700] shadow-[0_0_10px_rgba(255,199,0,0.6)] opacity-80" />
          <span className="w-[4px] h-[4px] rotate-45 bg-[#ffc700] shadow-[0_0_10px_rgba(255,199,0,0.6)] opacity-80" />
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
        </div>
      </div>

      {/* ─── MASONRY DUAL-COLUMN GRID ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            
            {/* Left Column (Items 1-6) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {leftCol.map((item, i) => (
                <FaqItem 
                  key={`left-${i}`} 
                  item={item} 
                  isOpen={openIndex === i} 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                  idx={i} 
                />
              ))}
            </div>
            
            {/* Right Column (Items 7-12) */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {rightCol.map((item, i) => {
                const globalIdx = i + midpoint;
                return (
                  <FaqItem 
                    key={`right-${globalIdx}`} 
                    item={item} 
                    isOpen={openIndex === globalIdx} 
                    onClick={() => setOpenIndex(openIndex === globalIdx ? null : globalIdx)} 
                    idx={globalIdx} 
                  />
                )
              })}
            </div>

         </div>
      </div>
    </section>
  );
}
