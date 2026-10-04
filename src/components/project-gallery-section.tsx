"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { AnimatedTitle } from "./ui/animated-title";

type Category = "All" | "Web" | "AI" | "Bots" | "Mobile";

type Project = {
  id: string;
  title: string;
  desc: string;
  stack: string;
  category: Exclude<Category, "All">;
  result: string;
  featured?: boolean;
  layout: "regular" | "tall" | "wide";
  palette: string;
};

type CopyBlock = {
  label: string;
  title: string;
  lead: string;
  viewProject: string;
  featuredLabel: string;
  resultLabel: string;
  stackLabel: string;
  modalButton: string;
  viewAll: string;
  filters: Category[];
};

const copy: Record<string, CopyBlock> = {
  EN: {
    label: "Project Gallery",
    title: "Project Collage",
    lead: "A premium masonry wall with coding-tech mockups, live filters, and measurable outcomes.",
    viewProject: "View Project",
    featuredLabel: "Featured Project",
    resultLabel: "Result",
    stackLabel: "Stack",
    modalButton: "Start Similar Project",
    viewAll: "View All Projects",
    filters: ["All", "Web", "AI", "Bots", "Mobile"],
  },
  UZ: {
    label: "Project Gallery",
    title: "Project Collage",
    lead: "Coding-tech mockuplar, live filter va aniq natijalar bilan premium masonry portfolio.",
    viewProject: "Loyihani Korish",
    featuredLabel: "Asosiy Loyiha",
    resultLabel: "Natija",
    stackLabel: "Stack",
    modalButton: "Oxshash Loyihani Boshlash",
    viewAll: "Barcha Loyihalarni Ko'rish",
    filters: ["All", "Web", "AI", "Bots", "Mobile"],
  },
  RU: {
    label: "Project Gallery",
    title: "Project Collage",
    lead: "Премиальная masonry-галерея с coding-tech mockup-визуалом, фильтрами и метриками результата.",
    viewProject: "Смотреть Проект",
    featuredLabel: "Ключевой Проект",
    resultLabel: "Результат",
    stackLabel: "Stack",
    modalButton: "Запустить Похожий Проект",
    viewAll: "Все Проекты",
    filters: ["All", "Web", "AI", "Bots", "Mobile"],
  },
};

const projectsByLang: Record<string, Project[]> = {
  EN: [
    {
      id: "p1",
      title: "AI CRM Dashboard",
      desc: "Automation system for sales teams with predictive lead scoring and smart follow-up routing.",
      stack: "Next.js  Node  OpenAI",
      category: "AI",
      result: "+180% conversion",
      featured: true,
      layout: "wide",
      palette: "from-[#2b1f03] via-[#123046] to-[#0b1119]",
    },
    {
      id: "p2",
      title: "Commerce Flow Pro",
      desc: "High-converting storefront rebuilt around mobile speed and one-step checkout.",
      stack: "React  Node  Stripe",
      category: "Web",
      result: "10k users in 6 weeks",
      layout: "wide",
      palette: "from-[#4d3310] via-[#154460] to-[#0f1722]",
    },
    {
      id: "p3",
      title: "Support Bot Mesh",
      desc: "Multi-intent Telegram bot layer for support, FAQ, escalation, and ticket sync.",
      stack: "Python  Telegram API  Redis",
      category: "Bots",
      result: "42% faster response",
      layout: "regular",
      palette: "from-[#42331a] via-[#25485f] to-[#121923]",
    },
    {
      id: "p4",
      title: "Field Ops Mobile",
      desc: "Offline-first mobile app for dispatch teams with realtime task lifecycle tracking.",
      stack: "React Native  Expo  Supabase",
      category: "Mobile",
      result: "3.2x task completion",
      layout: "tall",
      palette: "from-[#3f2a0f] via-[#1e3e4a] to-[#111820]",
    },
    {
      id: "p5",
      title: "AI Funnel Studio",
      desc: "Campaign optimization cockpit using AI-generated segment and offer orchestration.",
      stack: "Next.js  Postgres  OpenAI",
      category: "AI",
      result: "+94% qualified leads",
      layout: "wide",
      palette: "from-[#5b3d11] via-[#214d5a] to-[#0d1520]",
    },
    {
      id: "p6",
      title: "Loyalty Engine",
      desc: "Gamified retention backend integrated with payment and membership systems.",
      stack: "Vue  NestJS  MySQL",
      category: "Web",
      result: "+27% repeat orders",
      layout: "regular",
      palette: "from-[#503715] via-[#294861] to-[#121a24]",
    },
  ],
  UZ: [
    {
      id: "p1",
      title: "AI CRM Dashboard",
      desc: "Savdo jamoalari uchun predictive lead scoring va smart follow-up bilan avtomatlashtirilgan tizim.",
      stack: "Next.js  Node  OpenAI",
      category: "AI",
      result: "+180% konversiya",
      featured: true,
      layout: "wide",
      palette: "from-[#2b1f03] via-[#123046] to-[#0b1119]",
    },
    {
      id: "p2",
      title: "Commerce Flow Pro",
      desc: "Mobil tezlik va bir qadamli checkoutga moslab qayta qurilgan storefront.",
      stack: "React  Node  Stripe",
      category: "Web",
      result: "6 haftada 10k user",
      layout: "wide",
      palette: "from-[#4d3310] via-[#154460] to-[#0f1722]",
    },
    {
      id: "p3",
      title: "Support Bot Mesh",
      desc: "Support, FAQ, eskalatsiya va ticket sync uchun Telegram bot qatlami.",
      stack: "Python  Telegram API  Redis",
      category: "Bots",
      result: "42% tez javob",
      layout: "regular",
      palette: "from-[#42331a] via-[#25485f] to-[#121923]",
    },
    {
      id: "p4",
      title: "Field Ops Mobile",
      desc: "Dispatch jamoalari uchun offline-first mobil ilova va realtime task tracking.",
      stack: "React Native  Expo  Supabase",
      category: "Mobile",
      result: "3.2x task completion",
      layout: "tall",
      palette: "from-[#3f2a0f] via-[#1e3e4a] to-[#111820]",
    },
    {
      id: "p5",
      title: "AI Funnel Studio",
      desc: "AI yordamida segment va offer orchestration qiladigan campaign panel.",
      stack: "Next.js  Postgres  OpenAI",
      category: "AI",
      result: "+94% sifatli lead",
      layout: "wide",
      palette: "from-[#5b3d11] via-[#214d5a] to-[#0d1520]",
    },
    {
      id: "p6",
      title: "Loyalty Engine",
      desc: "Payment va membership bilan integratsiyalashgan retention backend.",
      stack: "Vue  NestJS  MySQL",
      category: "Web",
      result: "+27% qayta buyurtma",
      layout: "regular",
      palette: "from-[#503715] via-[#294861] to-[#121a24]",
    },
  ],
  RU: [
    {
      id: "p1",
      title: "AI CRM Dashboard",
      desc: "Система автоматизации продаж с predictive scoring лидов и smart follow-up логикой.",
      stack: "Next.js  Node  OpenAI",
      category: "AI",
      result: "+180% конверсия",
      featured: true,
      layout: "wide",
      palette: "from-[#2b1f03] via-[#123046] to-[#0b1119]",
    },
    {
      id: "p2",
      title: "Commerce Flow Pro",
      desc: "Storefront, оптимизированный под мобильную скорость и one-step checkout.",
      stack: "React  Node  Stripe",
      category: "Web",
      result: "10k пользователей за 6 недель",
      layout: "wide",
      palette: "from-[#4d3310] via-[#154460] to-[#0f1722]",
    },
    {
      id: "p3",
      title: "Support Bot Mesh",
      desc: "Telegram bot-слой для поддержки, FAQ, эскалации и синхронизации тикетов.",
      stack: "Python  Telegram API  Redis",
      category: "Bots",
      result: "Ответ быстрее на 42%",
      layout: "regular",
      palette: "from-[#42331a] via-[#25485f] to-[#121923]",
    },
    {
      id: "p4",
      title: "Field Ops Mobile",
      desc: "Offline-first мобильное приложение для dispatch-команд с realtime task tracking.",
      stack: "React Native  Expo  Supabase",
      category: "Mobile",
      result: "3.2x рост завершения задач",
      layout: "tall",
      palette: "from-[#3f2a0f] via-[#1e3e4a] to-[#111820]",
    },
    {
      id: "p5",
      title: "AI Funnel Studio",
      desc: "Campaign-панель с AI orchestration для сегментов и офферов.",
      stack: "Next.js  Postgres  OpenAI",
      category: "AI",
      result: "+94% квалифицированных лидов",
      layout: "wide",
      palette: "from-[#5b3d11] via-[#214d5a] to-[#0d1520]",
    },
    {
      id: "p6",
      title: "Loyalty Engine",
      desc: "Retention backend с интеграцией платежей и membership-логики.",
      stack: "Vue  NestJS  MySQL",
      category: "Web",
      result: "+27% повторных заказов",
      layout: "regular",
      palette: "from-[#503715] via-[#294861] to-[#121a24]",
    },
  ],
};

const layoutClass: Record<Project["layout"], string> = {
  regular: "row-span-2",
  tall: "row-span-4",
  wide: "lg:col-span-2 row-span-2",
};

export function ProjectGallerySection({
  onProjectSelect,
}: {
  onProjectSelect?: (projectTitle: string) => void;
}) {
  const { lang } = useLanguage();
  const d = copy[lang] || copy.EN;
  const allProjects = projectsByLang[lang] || projectsByLang.EN;

  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return allProjects;
    return allProjects.filter((p) => p.category === activeFilter);
  }, [allProjects, activeFilter]);

  const featuredProject = useMemo(() => {
    return filteredProjects.find((p) => p.featured) || filteredProjects[0] || null;
  }, [filteredProjects]);

  const masonryProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);
  const loopProjects = [...filteredProjects, ...filteredProjects, ...filteredProjects];

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-px w-[min(1200px,94vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffc700]/40 to-transparent" />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_10%_14%,rgba(255,199,0,0.1),transparent_34%)] dark:bg-[radial-gradient(circle_at_10%_14%,rgba(255,199,0,0.06),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ffc700]/35 bg-[#ffc700]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.32em] text-black/72 dark:text-[#ffd762] sm:text-xs">
            {d.label}
          </div>
          <AnimatedTitle
            text={d.title}
            effect="expand"
            className="font-sentient text-4xl font-black tracking-tight text-black/92 dark:text-foreground sm:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-black/60 dark:text-foreground/50 sm:text-lg">
            {d.lead}
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-black/5 bg-white/[0.6] p-2 backdrop-blur-md ring-1 ring-black/[0.04] dark:border-white/[0.08] dark:bg-white/[0.01] dark:ring-0">
            {d.filters.map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`relative rounded-2xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 sm:text-xs ${
                    active
                      ? "text-black"
                      : "text-black/50 hover:text-black dark:text-foreground/40 dark:hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="filter-bg"
                      className="absolute inset-0 z-0 rounded-2xl bg-[#e3b400]"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-black/10 bg-white/[0.4] px-4 py-4 backdrop-blur-sm ring-1 ring-black/[0.04] dark:border-white/[0.08] dark:bg-white/[0.015] dark:ring-0 translate-z-0">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max items-center gap-4 py-1 animate-marquee-left will-change-transform" style={{ animationDuration: "40s" }}>
            {loopProjects.map((project, idx) => (
              <button
                key={`${project.id}-${idx}`}
                type="button"
                onClick={() => setSelectedProject(project)}
                className="group shrink-0 rounded-2xl border border-black/8 bg-white/40 px-5 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#ffc700]/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-br ${project.palette}`} />
                  <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-black/40 dark:text-foreground/35">{project.category}</p>
                </div>
                <p className="mt-1 text-[13px] font-bold tracking-tight text-black/80 dark:text-foreground/80">{project.title}</p>
              </button>
            ))}
          </div>
        </div>

        {featuredProject && (
          <motion.button
            type="button"
            onClick={() => setSelectedProject(featuredProject)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mt-12 block w-full overflow-hidden rounded-[2.5rem] border border-black/10 text-left transition-all duration-700 hover:-translate-y-2 dark:border-white/[0.1] will-change-transform translate-z-0"
          >
            <div className="aspect-[16/8] min-h-[420px] w-full">
              <ProjectVisual project={featuredProject} isFeatured />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute left-0 right-0 bottom-0 z-20 p-8 sm:p-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/90">
                <span className="h-1 w-1 animate-pulse rounded-full bg-[#ffc700]" />
                {d.featuredLabel}
              </div>
              <h3 className="text-4xl font-sentient font-black tracking-tight text-white sm:text-6xl">{featuredProject.title}</h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{featuredProject.desc}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">{d.resultLabel}</p>
                  <p className="mt-0.5 font-bold text-white/90">{featuredProject.result}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">{d.stackLabel}</p>
                  <p className="mt-0.5 font-bold text-white/90">{featuredProject.stack}</p>
                </div>
                <div className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#ffc700]">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </div>
            </div>
          </motion.button>
        )}

        <div className="mt-12 grid auto-rows-[140px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {masonryProjects.map((project, idx) => (
            <motion.button
              key={project.id}
              type="button"
              layout="position"
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative w-full overflow-hidden rounded-[2.2rem] border border-black/10 text-left transition-all duration-700 hover:-translate-y-2 dark:border-white/[0.1] will-change-transform translate-z-0 ${layoutClass[project.layout]}`}
            >
              <ProjectVisual project={project} />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:from-black/100 group-hover:via-black/75" />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 text-white">
                <div className="translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 will-change-transform">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em]">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-sentient font-extrabold tracking-tight">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/70">{project.desc}</p>
                  
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ffc700]">
                      {project.result}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-300 group-hover:bg-[#ffc700] group-hover:text-black">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between transition-opacity duration-300 group-hover:opacity-0 will-change-opacity">
                  <div className="flex items-center gap-2 text-white/50">
                    <div className={`h-1 w-1 rounded-full bg-gradient-to-br ${project.palette}`} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em]">{project.category}</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/20">#{idx + 1}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#111] px-10 py-5 text-sm font-bold uppercase tracking-[0.4em] text-white shadow-xl transition-all duration-500 hover:scale-105 active:scale-95 will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffc700]/10 via-transparent to-[#ffc700]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10 transition-colors group-hover:text-[#ffc700]">{d.viewAll}</span>
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#ffc700]">
              <ArrowRight className="h-5 w-5" />
            </div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-md" 
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full max-h-[850px] w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0a0a0a] shadow-2xl translate-z-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 z-30 rounded-full border border-white/15 bg-black/40 p-3 text-white/70 transition-all hover:scale-110 hover:border-white/30 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex h-full flex-col md:flex-row">
                <div className="relative h-64 w-full md:h-full md:w-1/2">
                  <ProjectVisual project={selectedProject} isModal />
                  <div className="absolute inset-0 bg-gradient-to-t from-black md:bg-gradient-to-r md:from-transparent md:to-black/20" />
                </div>

                <div className="flex flex-1 flex-col justify-between p-8 sm:p-12">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ffc700]/30 bg-[#ffc700]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#ffc700]">
                      {selectedProject.category}
                    </div>
                    <h3 className="text-4xl font-sentient font-black text-white sm:text-5xl">{selectedProject.title}</h3>
                    <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">{selectedProject.desc}</p>
                    
                    <div className="mt-10 grid grid-cols-2 gap-6">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">{d.resultLabel}</p>
                        <p className="mt-1.5 text-lg font-bold text-white/90">{selectedProject.result}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">{d.stackLabel}</p>
                        <p className="mt-1.5 text-base font-medium text-white/80">{selectedProject.stack.replace(/  /g, " • ")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => onProjectSelect?.(selectedProject.title)}
                      className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-8 text-[13px] font-bold uppercase tracking-[0.24em] text-black transition-all hover:scale-[1.02] hover:bg-[#ffc700]"
                    >
                      {d.modalButton}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 px-8 text-[13px] font-bold uppercase tracking-[0.24em] text-white/60 transition-all hover:border-white/20 hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectVisual({ project, isFeatured, isModal }: { project: Project; isFeatured?: boolean; isModal?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.palette} transition-transform duration-1000 group-hover:scale-105 will-change-transform`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_40%)]" />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className={`relative w-full max-w-[85%] transition-all duration-700 ${isFeatured ? "scale-100" : "scale-90 group-hover:scale-95"} will-change-transform`}>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4 shadow-xl translate-z-0">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
              <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
              <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
            </div>
            <div className="h-1 w-12 rounded-full bg-white/10" />
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
              <div className="h-1 w-1/2 rounded-full bg-white/5" />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded-lg bg-white/5 border border-white/5" />
              <div className="h-12 rounded-lg bg-white/5 border border-white/5" />
            </div>

            <div className="space-y-1.5">
              <div className="h-1 w-full rounded-full bg-white/5" />
              <div className="h-1 w-5/6 rounded-full bg-white/5" />
            </div>

            <div className="flex gap-2 pt-1">
              <div className="h-6 flex-1 rounded-md border border-white/5 bg-white/5" />
              <div className="h-6 flex-1 rounded-md border border-white/5 bg-white/5" />
              <div className="h-6 flex-1 rounded-md border border-white/5 bg-[#ffc700]/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
