import { cn } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/lib/i18n";

export const MobileMenu = ({
  className,
  onNavigate,
  onHome
}: {
  className?: string;
  onNavigate: (section: string) => void;
  onHome: () => void;
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["home", "services", "portfolio", "pricing", "about", "contact"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group lg:hidden p-2 text-foreground/80 hover:text-foreground transition-colors bg-foreground/5 border border-foreground/10 rounded-full hover:bg-foreground/10",
          className
        )}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* FULLSCREEN PREMUIM MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[100] h-[100dvh] w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* SOLID BACKDROP WITH HEAVY BLUR */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-background/95 backdrop-blur-3xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "scale-100" : "scale-110"
            }`}
        />

        <div className="relative z-10 flex flex-col h-full p-6 sm:p-10 pointer-events-none">

          {/* HEADER IN MODAL */}
          <div className="flex items-center justify-between mt-2 pointer-events-auto">
            <span className="font-sans font-bold text-foreground/40 tracking-[0.2em] text-[10px] uppercase pl-2">{t("nav.menu")}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/80 hover:text-foreground hover:bg-foreground/10 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col justify-center flex-1 mt-8 space-y-4 sm:space-y-6 pointer-events-auto overflow-y-auto no-scrollbar">
            {menuItems.map((item, i) => (
              <button
                key={item}
                onClick={() => {
                  setIsOpen(false);
                  item === "home" ? onHome() : onNavigate(t(`nav.${item}`));
                }}
                className="text-left text-[2.5rem] leading-none sm:text-6xl font-sentient font-light text-foreground/70 hover:text-foreground hover:-translate-y-1 hover:pl-4 transition-all duration-300 w-fit group bg-transparent border-none"
                style={{
                  transitionDelay: isOpen ? `${100 + i * 40}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isOpen ? 1 : 0,
                  transitionProperty: 'opacity, transform, padding, color',
                  transitionDuration: '700ms',
                  transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)'
                }}
              >
                {t(`nav.${item}`)}
                <span className="inline-block ml-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity font-sans text-3xl font-light">&rarr;</span>
              </button>
            ))}
          </nav>

          {/* BOTTOM ACTIONS */}
          <div
            className="mt-auto mb-4 border-foreground/10 flex flex-col gap-4 pointer-events-auto"
            style={{
              transitionDelay: isOpen ? '400ms' : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isOpen ? 1 : 0,
              transition: 'all 700ms cubic-bezier(0.22,1,0.36,1)'
            }}
          >
            <div className="w-full relative z-50">
              <LanguageSwitcher className="w-full !mr-0 [&>button]:h-[56px] [&>button]:w-full [&>button]:justify-between [&>button]:px-6 [&>button]:text-sm" />
            </div>

            <a
              className="flex items-center justify-center gap-2.5 w-full h-[56px] overflow-hidden group transition-all duration-500 font-sans text-sm font-bold uppercase tracking-widest text-[#1a1a1a] bg-gradient-to-r from-primary to-[#ffc800] rounded-full shadow-[0_4px_24px_rgba(255,199,0,0.4)] hover:shadow-[0_8px_32px_rgba(255,199,0,0.6)]"
              href="tel:+998950051545"
            >
              <Phone size={18} className="fill-[#1a1a1a]" />
              {t("nav.call")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
