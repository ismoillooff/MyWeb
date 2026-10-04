"use client";

import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import { Partners } from "@/components/partners";
import { WhyChooseUs } from "@/components/why-choose-us";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { ProjectGallerySection } from "@/components/project-gallery-section";
import { ProcessSection } from "@/components/process-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TeamSection } from "@/components/team-section";
import { FaqSection } from "@/components/faq-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { PlaceholderPage } from "@/components/placeholder-page";
import { useState } from "react";

export default function Page() {
  const [view, setView] = useState<"home" | "placeholder">("home");
  const [activeSection, setActiveSection] = useState("");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setView("placeholder");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header onNavigate={handleNavigate} currentView={view} onHome={() => setView("home")} />
      <main>
        {view === "home" ? (
          <>
            <Hero onStartProject={() => handleNavigate("Start Project")} />
            <Partners />
            <WhyChooseUs />
            <ServicesSection onSelect={handleNavigate} />
            <StatsSection />
            <div id="projects" className="scroll-mt-24">
              <ProjectGallerySection onProjectSelect={handleNavigate} />
            </div>
            <ProcessSection />
            <TestimonialsSection />
            <TeamSection />
            <FaqSection />
            <CtaSection onStart={() => handleNavigate("Start Project")} />
          </>
        ) : (
          <PlaceholderPage sectionName={activeSection} onBack={() => setView("home")} />
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
