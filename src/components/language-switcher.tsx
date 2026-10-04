import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage, Language } from "@/lib/i18n";

const languages: { code: Language; name: string; flagUrl: string }[] = [
  { code: "EN", name: "English", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { code: "UZ", name: "O'zbekcha", flagUrl: "https://flagcdn.com/w40/uz.png" },
  { code: "RU", name: "Русский", flagUrl: "https://flagcdn.com/w40/ru.png" },
];

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative z-50 ${className || ""}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 transition-all duration-300 text-foreground/70 hover:text-foreground font-sans text-[10px] tracking-wider font-bold uppercase group"
      >
        <Globe size={12} className="opacity-80 group-hover:opacity-100 transition-opacity" />
        {lang}
        <ChevronDown size={12} className={`transition-transform duration-300 opacity-80 group-hover:opacity-100 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* DROPDOWN */}
      <div
        className={`absolute top-[calc(100%+0.5rem)] right-0 w-36 p-1.5 rounded-2xl bg-background/95 backdrop-blur-3xl border border-foreground/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 origin-top-right ${isOpen ? "opacity-100 scale-100 visible translate-y-0" : "opacity-0 scale-95 invisible -translate-y-2"}`}
      >
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => {
              setLang(l.code);
              setIsOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-sans tracking-wide transition-all duration-200 mt-0.5 first:mt-0 ${lang === l.code ? "bg-primary/10 text-primary font-bold" : "text-foreground/60 hover:text-foreground hover:bg-foreground/5 font-medium"}`}
          >
            <div className="flex items-center gap-2">
              <img src={l.flagUrl} alt={l.code} className="w-3.5 h-3.5 object-cover rounded-full shadow-sm bg-foreground/10" />
              <span>{l.name}</span>
            </div>
            {lang === l.code && <div className="size-1 rounded-full bg-primary shadow-[0_0_8px_rgba(255,199,0,0.8)]" />}
          </button>
        ))}
      </div>
    </div>
  );
};
