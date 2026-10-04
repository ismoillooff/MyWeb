import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "MyWeb",
  description: "Modern Digital Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
