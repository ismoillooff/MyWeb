import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

export const Logo = ({ className, imgClassName }: { className?: string, imgClassName?: string }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const iconSrc = mounted && resolvedTheme === "light" ? "/dark-icon.png" : "/icon.png";

  return (
    <div className={`font-sentient font-bold tracking-tighter text-foreground flex items-center gap-2.5 ${className || "text-2xl md:text-3xl"}`}>
      <img src={iconSrc} alt="MyWeb Logo" className={`w-auto object-contain ${imgClassName || "h-16 md:h-16"}`} />
      <span className="font-bold tracking-tight">My<span className="text-primary font-bold">Web</span></span>
    </div>
  );
};
