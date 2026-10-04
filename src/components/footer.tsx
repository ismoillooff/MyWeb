import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Github, Twitter, Mail, MapPin, Phone, ChevronRight } from "lucide-react";

const footerData = {
  EN: {
    desc: "Building premium digital experiences, automated systems, and high-converting platforms for standard-setting brands worldwide.",
    lists: [
      {
        title: "Navigation",
        items: ["Services", "Process", "Projects", "Team"]
      },
      {
        title: "Specialties",
        items: ["AI Automation", "Web Applications", "Telegram Bots", "Enterprise CRM"]
      }
    ],
    contact: {
      title: "Contact Us",
      address: "Tashkent, Uzbekistan, IT Park",
      email: "hello@myweb.uz",
      phone: "+998 90 000 00 00"
    },
    rights: "© 2024 MyWeb Digital Agency. All rights reserved.",
    links: ["Privacy Policy", "Terms of Service"]
  },
  UZ: {
    desc: "Sifatli raqamli loyihalar, avtomatlashtirilgan tizimlar va yetakchi brendlar uchun yuqori darajadagi platformalar yaratamiz.",
    lists: [
      {
        title: "Navigatsiya",
        items: ["Xizmatlar", "Jarayon", "Loyihalar", "Jamoa"]
      },
      {
        title: "Yo'nalishlar",
        items: ["AI Avtomatlashtirish", "Veb Ilovalar", "Telegram Botlar", "Korporativ CRM"]
      }
    ],
    contact: {
      title: "Aloqa",
      address: "Toshkent, O'zbekiston, IT Park",
      email: "hello@myweb.uz",
      phone: "+998 90 000 00 00"
    },
    rights: "© 2024 MyWeb Digital Agency. Barcha huquqlar himoyalangan.",
    links: ["Maxfiylik siyosati", "Foydalanish shartlari"]
  },
  RU: {
    desc: "Создаем премиальные цифровые проекты, автоматизированные системы и высококонверсионные платформы для ведущих брендов.",
    lists: [
      {
        title: "Навигация",
        items: ["Услуги", "Процесс", "Проекты", "Команда"]
      },
      {
        title: "Специализация",
        items: ["AI Автоматизация", "Веб Приложения", "Telegram Боты", "Корпоративные CRM"]
      }
    ],
    contact: {
      title: "Контакты",
      address: "Ташкент, Узбекистан, IT Park",
      email: "hello@myweb.uz",
      phone: "+998 90 000 00 00"
    },
    rights: "© 2024 MyWeb Digital Agency. Все права защищены.",
    links: ["Политика Конфиденциальности", "Условия Использования"]
  }
};

const socials = [
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Facebook, href: "#" },
];

export function Footer({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const { lang } = useLanguage();
  const d = footerData[lang as keyof typeof footerData] || footerData.EN;

  return (
    <footer className="relative bg-white dark:bg-black text-black dark:text-white overflow-hidden pt-20 pb-8 mt-12 border-t border-black/10 dark:border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
       {/* ─── Ambient Footer Glows & Grid ─── */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(255,199,0,0.08),transparent_70%)] pointer-events-none -z-10" />
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-black/10 dark:border-white/10">
             
             {/* Column 1: Brand / Description */}
             <div className="lg:col-span-2">
                <a href="#" className="inline-block mb-6 group cursor-pointer focus:outline-none">
                  <div className="relative text-2xl font-black tracking-tighter sm:text-3xl font-mono text-black dark:text-white transition-all duration-300">
                    <span className="opacity-90 group-hover:opacity-100">MyWeb</span>
                    <span className="text-[#ffc700] ml-1 opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(255,199,0,0.6)]">.</span>
                  </div>
                </a>
                <p className="text-black/60 dark:text-white/50 text-[14px] sm:text-[15px] leading-relaxed max-w-sm mb-8">
                  {d.desc}
                </p>
                <div className="flex items-center gap-3">
                   {socials.map((Social, i) => (
                      <a 
                        key={i} 
                        href={Social.href} 
                        className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-[#ffc700] hover:border-[#ffc700]/50 hover:bg-[#ffc700]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,199,0,0.2)]"
                      >
                        <Social.icon className="w-4 h-4" />
                      </a>
                   ))}
                </div>
             </div>

             {/* Columns 2 & 3: Lists */}
             {d.lists.map((list, idx) => (
               <div key={idx} className="lg:col-span-1">
                 <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/30 mb-6">
                   {list.title}
                 </h4>
                 <ul className="space-y-4">
                   {list.items.map((item, i) => (
                     <li key={i}>
                       <button 
                         onClick={() => onNavigate?.(item)}
                         className="text-[14px] text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                       >
                         {/* Animated Chevron Arrow on Hover */}
                         <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#ffc700]" />
                         <span className="-translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                           {item}
                         </span>
                       </button>
                     </li>
                   ))}
                 </ul>
               </div>
             ))}

             {/* Column 4: Contact */}
             <div className="lg:col-span-1">
               <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/30 mb-6">
                 {d.contact.title}
               </h4>
               <ul className="space-y-5">
                 <li>
                   <a href="#" className="flex items-start gap-3 w-max group">
                     <div className="w-8 h-8 shrink-0 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/40 group-hover:text-[#ffc700] dark:group-hover:text-[#ffc700] group-hover:border-[#ffc700]/40 transition-colors duration-300">
                       <MapPin className="w-3.5 h-3.5" />
                     </div>
                     <span className="text-[14px] text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 leading-tight pt-1.5 max-w-[180px]">
                       {d.contact.address}
                     </span>
                   </a>
                 </li>
                 <li>
                   <a href={`mailto:${d.contact.email}`} className="flex items-center gap-3 w-max group">
                     <div className="w-8 h-8 shrink-0 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/40 group-hover:text-[#ffc700] dark:group-hover:text-[#ffc700] group-hover:border-[#ffc700]/40 transition-colors duration-300">
                       <Mail className="w-3.5 h-3.5" />
                     </div>
                     <span className="text-[14px] text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 w-max">
                       {d.contact.email}
                     </span>
                   </a>
                 </li>
                 <li>
                   <a href={`tel:${d.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 w-max group">
                     <div className="w-8 h-8 shrink-0 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black/50 dark:text-white/40 group-hover:text-[#ffc700] dark:group-hover:text-[#ffc700] group-hover:border-[#ffc700]/40 transition-colors duration-300">
                       <Phone className="w-3.5 h-3.5" />
                     </div>
                     <span className="text-[14px] text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 w-max font-mono">
                       {d.contact.phone}
                     </span>
                   </a>
                 </li>
               </ul>
             </div>

          </div>

          {/* ─── Bottom Bar ─── */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-[13px] text-black/40 dark:text-white/30 tracking-wide font-mono text-center md:text-left">
               {d.rights}
             </p>
             <div className="flex items-center gap-6 text-[13px] text-black/40 dark:text-white/30">
               {d.links.map((link, i) => (
                 <a key={i} href="#" className="hover:text-black dark:hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-black/10 dark:decoration-white/10 hover:decoration-black/40 dark:hover:decoration-white/40">
                   {link}
                 </a>
               ))}
             </div>
          </div>
       </div>
    </footer>
  );
}
