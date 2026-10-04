import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/smooth-scroll";
import App from "@/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
