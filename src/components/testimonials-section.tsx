import { useLanguage } from "@/lib/i18n";
import { ScrollFloat } from "./ui/scroll-float";
import { AnimatedTitle } from "./ui/animated-title";
import { Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
};

const titleWords: Record<string, string[]> = {
  EN: ["Client", "Reviews"],
  UZ: ["Mijozlar", "Fikri"],
  RU: ["Отзывы", "Клиентов"],
};

const subtitleText: Record<string, string> = {
  EN: "What They Say About Us",
  UZ: "Ishonchli hamkorlik va raqamli natijalar",
  RU: "Доверие, построенное на успехе",
};

const copy: Record<string, { items: Testimonial[] }> = {
  EN: {
    items: [
      {
        id: "1",
        name: "Sherzod Abdullaev",
        role: "CEO",
        company: "TechNova",
        content: "Their approach to web systems is unlike anything we've seen. Sharp, fast, and incredibly reliable.",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      {
        id: "2",
        name: "Mariya Ivanova",
        role: "Marketing Director",
        company: "Global Retail",
        content: "We saw a 40% increase in conversion after the redesign. The automated systems are a game changer.",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "3",
        name: "Bekzod Yusupov",
        role: "Founder",
        company: "Yusupov Consulting",
        content: "Attention to detail is their greatest strength. Every interaction serves a business purpose.",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      {
        id: "4",
        name: "Alex Chen",
        role: "CTO",
        company: "Nexus Systems",
        content: "The automated workflows they built scaled our operations instantly. Top tier engineering.",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      {
        id: "5",
        name: "Aziza Rustamova",
        role: "Product Manager",
        company: "FinTech Solutions",
        content: "A rare combination of stunning design and robust functionality. Highly recommended.",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: "6",
        name: "David Miller",
        role: "Operations Head",
        company: "Logistix AI",
        content: "They transformed our entire digital ecosystem in months, not years. An absolute pleasure.",
        avatar: "https://i.pravatar.cc/150?img=14",
      },
      {
        id: "7",
        name: "Sardor Karimov",
        role: "Regional Director",
        company: "Retail Hub Uz",
        content: "The highest level of professionalism we've seen in the IT sector. Perfect delivery.",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      {
        id: "8",
        name: "Oksana Volkova",
        role: "CMO",
        company: "ArtSpace",
        content: "Our brand identity and web presence are completely elevated. Outstanding results all around.",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    ],
  },
  UZ: {
    items: [
      {
        id: "1",
        name: "Sherzod Abdullayev",
        role: "Bosh direktor",
        company: "TechNova",
        content: "Veb-tizimlarga yondashuvi biz mahalliy bozorda ko'rgan narsalardan tubdan farq qiladi. Aniq, tez va ishonchli.",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      {
        id: "2",
        name: "Mariya Ivanova",
        role: "Marketing direktori",
        company: "Global Retail",
        content: "Qayta dizayndan so'ng konversiya 40% ga oshdi. Avtomatlashgan tizimlar jamoamiz uchun yangi imkoniyatlar ochdi.",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "3",
        name: "Bekzod Yusupov",
        role: "Asoschi",
        company: "Yusupov Consulting",
        content: "Detallarga e'tibor - ularning eng katta ishonch omili. Har bir interaksiya biznes maqsadiga xizmat qiladi.",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      {
        id: "4",
        name: "Alex Chen",
        role: "Texnik direktor",
        company: "Nexus Systems",
        content: "Ular qurgan avtomatlashtirilgan oqimlar operatsiyalarimizni darhol kengaytirdi. Mukammal muhandislik.",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      {
        id: "5",
        name: "Aziza Rustamova",
        role: "Mahsulot menejeri",
        company: "FinTech Solutions",
        content: "Ajoyib dizayn va kuchli funksionallikning noyob uyg'unligi. Barchaga tavsiya qilaman.",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: "6",
        name: "Devid Miller",
        role: "Operatsiyalar rahbari",
        company: "Logistix AI",
        content: "Raqamli ekotizimimizni yillar emas, oylar ichida o'zgartirdilar. Ajoyib tajriba.",
        avatar: "https://i.pravatar.cc/150?img=14",
      },
      {
        id: "7",
        name: "Sardor Karimov",
        role: "Mintaqaviy direktor",
        company: "Retail Hub Uz",
        content: "IT sohasida biz ko'rgan eng yuqori darajadagi professionallik. Mukammal yetkazib berish.",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      {
        id: "8",
        name: "Oksana Volkova",
        role: "Marketing boshlig'i",
        company: "ArtSpace",
        content: "Brendimiz o'ziga xosligi va veb saytimiz mutlaqo yangi bosqichga ko'tarildi. Ajoyib natija.",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    ],
  },
  RU: {
    items: [
      {
        id: "1",
        name: "Шерзод Абдуллаев",
        role: "Генеральный директор",
        company: "TechNova",
        content: "Их подход к веб-системам не похож ни на что из того, что мы видели. Точно, быстро и невероятно надежно.",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      {
        id: "2",
        name: "Мария Иванова",
        role: "Маркетинг-директор",
        company: "Global Retail",
        content: "Редизайн увеличил конверсию на 40%. Системы автоматизации сэкономили нам сотни рабочих часов.",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: "3",
        name: "Бекзод Юсупов",
        role: "Основатель",
        company: "Yusupov Consulting",
        content: "Внимание к деталям — их главная сила. Каждое взаимодействие служит бизнес-целям компании.",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      {
        id: "4",
        name: "Алекс Чен",
        role: "Технический директор",
        company: "Nexus Systems",
        content: "Построенные ими автоматизированные процессы мгновенно масштабировали наши операции. Высший уровень инженерии.",
        avatar: "https://i.pravatar.cc/150?img=13",
      },
      {
        id: "5",
        name: "Азиза Рустамова",
        role: "Продакт-менеджер",
        company: "FinTech Solutions",
        content: "Редкое сочетание потрясающего дизайна и мощного функционала. Очень рекомендую.",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: "6",
        name: "Дэвид Миллер",
        role: "Руководитель операций",
        company: "Logistix AI",
        content: "Они полностью трансформировали нашу цифровую экосистему за месяцы, а не за годы. Приятно работать.",
        avatar: "https://i.pravatar.cc/150?img=14",
      },
      {
        id: "7",
        name: "Сардор Каримов",
        role: "Региональный директор",
        company: "Retail Hub Uz",
        content: "Высочайший уровень профессионализма, который мы видели в IT-секторе. Идеальное исполнение.",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
      {
        id: "8",
        name: "Оксана Волкова",
        role: "Директор по маркетингу",
        company: "ArtSpace",
        content: "Наш бренд и сайт перешли на совершенно новый уровень. Выдающиеся результаты во всем.",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    ],
  },
};

export function TestimonialsSection() {
  const { lang } = useLanguage();
  const words = titleWords[lang] || titleWords.EN;
  const subtitle = subtitleText[lang] || subtitleText.EN;
  const items = copy[lang]?.items || copy.EN.items;

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      
      {/* ─── Section Title with ScrollFloat + TrueFocus ─── */}
      <div className="relative text-center pb-16 px-4">
        {/* Radial glow behind title */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[20vw] min-w-[300px] min-h-[200px] bg-primary/[0.035] dark:bg-primary/[0.05] rounded-[100%] blur-[100px] pointer-events-none" />

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

        {/* Main heading with TrueFocus */}
        <div className="relative inline-block px-4">
          <AnimatedTitle
            text={words.join(" ")}
            effect="wave"
            className="text-4xl sm:text-5xl lg:text-6xl font-sentient"
          />
        </div>

        {/* Decorative diamond lines */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
          <span className="w-[5px] h-[5px] rotate-45 bg-[#ffc700] shadow-[0_0_8px_rgba(255,199,0,0.5),0_0_16px_rgba(255,199,0,0.2)] animate-pulse" />
          <span className="w-[5px] h-[5px] rotate-45 bg-[#ffc700] shadow-[0_0_8px_rgba(255,199,0,0.5),0_0_16px_rgba(255,199,0,0.2)] animate-pulse" />
          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#ffc700]/20 to-[#ffc700]/30 shadow-[0_0_6px_rgba(255,199,0,0.15)]" />
        </div>
      </div>

      {/* ─── Infinite Horizontal Carousel ─── */}
      <div className="relative w-full overflow-hidden pb-12 pt-4">
        {/* Custom CSS for seamless scroll */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-infinite-scroll {
              animation: infinite-scroll 45s linear infinite;
            }
            .animate-infinite-scroll:hover {
              animation-play-state: paused;
            }
          `
        }} />

        {/* Cinematic Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }} />

        {/* Scrolling Track */}
        <div className="flex animate-infinite-scroll w-max gap-6 sm:gap-8 hover:cursor-grab active:cursor-grabbing px-4 sm:px-[12.5%]">
          {[...items, ...items].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="relative w-[340px] sm:w-[440px] flex-shrink-0 flex flex-col p-8 sm:p-10 transition-all duration-700 hover:-translate-y-2 group rounded-[2rem] border border-white/70 bg-white/[0.8] dark:bg-white/[0.014] backdrop-blur-xl ring-1 ring-black/[0.055] dark:ring-0 shadow-[0_22px_70px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.86)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden"
            >
              
              {/* Premium Background Accent inside Card */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.58),transparent_42%,rgba(255,199,0,0.055)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%,rgba(255,199,0,0.02)_100%)] pointer-events-none opacity-50 transition-opacity duration-700 group-hover:opacity-100" />
              
              {/* Visual Corner Accent */}
              <div className="absolute right-0 top-0 h-10 w-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10">
                 <div className="absolute right-6 top-6 h-px w-6 bg-primary/40" />
                 <div className="absolute right-6 top-6 h-6 w-px bg-primary/40" />
              </div>

              {/* Rating */}
              <div className="relative mb-8 sm:mb-10 flex gap-0.5 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500 z-10">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary drop-shadow-[0_0_4px_rgba(255,199,0,0.3)]" />
                 ))}
              </div>

              {/* Quote */}
              <blockquote className="relative mb-10 sm:mb-12 flex-grow z-10">
                 <p className="font-sentient text-lg sm:text-xl font-bold leading-tight text-foreground/90 tracking-tight group-hover:text-primary transition-colors duration-500 line-clamp-4">
                   "{item.content}"
                 </p>
              </blockquote>

              {/* Author Info */}
              <div className="relative flex items-center gap-4 sm:gap-5 pt-8 border-t border-black/[0.05] dark:border-white/[0.05] z-10">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full ring-2 ring-primary/20 transition-transform duration-700 group-hover:scale-110 shrink-0 shadow-[0_0_15px_rgba(255,199,0,0.15)]">
                  <img 
                    src={item.avatar} 
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold tracking-tight text-foreground line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-foreground/50 group-hover:text-foreground/70 transition-colors duration-500 line-clamp-1">
                    {item.role} @ {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
