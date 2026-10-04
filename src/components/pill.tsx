import { cn } from "@/lib/utils";

export const Pill = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full",
        "bg-foreground/[0.03] backdrop-blur-md border border-foreground/[0.08]",
        "shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]",
        "transition-all duration-500 hover:border-primary/30 group cursor-default",
        className
      )}
    >
      {/* Animated Live Dot */}
      <div className="relative flex size-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75"></span>
        <span className="relative inline-flex size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,199,0,0.8)]"></span>
      </div>

      {/* Text Content */}
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-foreground/80 group-hover:text-foreground transition-colors duration-300">
        {children}
      </span>

      {/* Subtle Bottom Shine */}
      <div className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
