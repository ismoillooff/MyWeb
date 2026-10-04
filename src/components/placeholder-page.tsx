import { useLanguage } from "@/lib/i18n";
import { ArrowLeft, Cpu, Activity, ShieldCheck, Globe } from "lucide-react";
import { Pill } from "./pill";
import { useState, useEffect } from "react";

export const PlaceholderPage = ({ sectionName, onBack }: { sectionName: string; onBack: () => void }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const jump = Math.floor(Math.random() * 20) + 60;
    setProgress(jump);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98;
        return prev + (Math.random() > 0.7 ? 1 : 0);
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans selection:bg-primary/30">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="fixed top-0 left-0 w-full h-1 z-[100] transition-all duration-1000 ease-out bg-foreground/5 overflow-hidden">
         <div 
           className="h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse shadow-[0_0_15px_rgba(255,199,0,0.5)]" 
           style={{ width: `${progress}%` }} 
         />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <button 
          onClick={onBack}
          className="group mb-12 sm:mb-16 inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:border-primary/30 transition-all duration-500 text-foreground/50 hover:text-foreground backdrop-blur-md"
        >
          <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1.5" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">{t("blueprint.console")}</span>
        </button>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-24 items-start">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div>
              <Pill className="mb-8 scale-110 origin-left border-primary/20 text-primary">{t("blueprint.core")}</Pill>
              <h1 className="text-[clamp(2.8rem,10vw,7rem)] font-sentient tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/20 mb-8 py-2 break-words">
                {sectionName}
              </h1>
              <div className="flex items-center gap-4 text-primary font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold">
                <Activity size={18} className="animate-pulse" />
                {t("blueprint.arch")}
              </div>
            </div>

            <div className="space-y-6 max-w-2xl p-8 sm:p-10 rounded-[2.5rem] bg-foreground/[0.02] border border-foreground/5 backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="flex justify-between items-end mb-1">
                <span className="text-foreground/40 font-mono text-[10px] uppercase tracking-widest font-bold">{t("blueprint.status")}</span>
                <span className="text-primary font-sentient text-2xl font-bold tracking-tighter">{progress}%</span>
              </div>
              <div className="h-[1.5px] w-full bg-foreground/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_#ffc700]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <p className="text-foreground/40 text-sm font-light leading-relaxed">
                  {t("blueprint.deploy").replace("architecture", `${sectionName} architecture`)}
                </p>
                <div className="space-y-3 font-mono text-[9px] uppercase tracking-widest text-foreground/20 border-l border-foreground/5 pl-6">
                   <div className="flex justify-between"><span className="text-primary/60">{t("blueprint.s_title")}:</span> <span className="text-foreground/70">Active</span></div>
                   <div className="flex justify-between"><span className="text-primary/60">{t("blueprint.s_lat")}:</span> <span className="text-foreground/70">2ms</span></div>
                   <div className="flex justify-between"><span className="text-primary/60">{t("blueprint.s_branch")}:</span> <span className="text-foreground/70">Production</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
             <div className="p-8 rounded-[2.5rem] border border-foreground/5 bg-foreground/[0.01] backdrop-blur-xl space-y-8 relative group overflow-hidden shadow-2xl">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-colors duration-1000" />
                
                <h4 className="text-[9px] font-mono uppercase tracking-[0.5em] text-foreground/20 border-b border-foreground/5 pb-5 font-bold">{t("blueprint.logs")}</h4>
                
                {[
                  { icon: Cpu, label: t("blueprint.p_core"), val: t("blueprint.v_core") },
                  { icon: ShieldCheck, label: t("blueprint.p_guard"), val: t("blueprint.v_guard") },
                  { icon: Globe, label: t("blueprint.p_deploy"), val: t("blueprint.v_deploy") }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-6 group/item cursor-default">
                    <div className="p-3 rounded-2xl bg-foreground/5 border border-foreground/10 text-primary group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-500">
                      <spec.icon size={20} />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-foreground/20 mb-1 font-bold">{spec.label}</div>
                      <div className="text-xs font-bold text-foreground/50 group-hover/item:text-foreground transition-colors duration-300">{spec.val}</div>
                    </div>
                  </div>
                ))}
             </div>

             <div className="h-36 rounded-[2.5rem] border border-dashed border-foreground/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent animate-scan pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-2">
                   <div className="flex gap-1">
                      {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i*200}ms` }} />)}
                   </div>
                   <span className="text-[9px] font-mono uppercase tracking-[0.6em] text-foreground/20 group-hover:text-primary transition-colors duration-500 font-bold">{t("blueprint.scan")}</span>
                </div>
             </div>
          </div>
        </div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[160px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[160px] rounded-full pointer-events-none animate-pulse" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(150%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-150%); opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}} />
    </div>
  );
};
