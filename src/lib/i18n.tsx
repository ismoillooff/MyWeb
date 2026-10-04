import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "EN" | "UZ" | "RU" ;

export const translations = {
  EN: {
    nav: { home: "Home", services: "Services", portfolio: "Portfolio", pricing: "Pricing", about: "About", contact: "Contact", call: "CALL NOW", menu: "Navigation" },
    hero: {
      badge: "DIGITAL AGENCY", agency: "Agency",
      desc: "We engineer dynamic, premium web applications and intelligent systems customized for modern enterprises.",
      btn: "Start Your Project",
      chat: "Chat",
      p1: "Digital Solutions", p2: "AI & Automation", p3: "Innovative Digital", p4: "Build Scalable", p5: "Smart Solutions"
    },
    stats: {
      title: "Our Journey & Results",
      subtitle: "The platform is under active development. Here is a glimpse of our achievements.",
      completed: "Projects Delivered",
      ongoing: "In Progress",
      exp: "Experience",
      happy: "Happy Clients",
      val_completed: "50+", val_ongoing: "10+", val_exp: "8 Months +", val_happy: "94%"
    },
    blueprint: {
      console: "Main Console", core: "System Core v2.0", arch: "Architecting Premium Experience",
      status: "Development Status", deploy: "Our engineers are currently deploying the architecture. High-performance modules are being compiled into the primary core.",
      s_title: "Status", s_lat: "Latency", s_branch: "Branch", logs: "Operational Logs",
      p_core: "Core Processor", p_guard: "Data Guard", p_deploy: "Deployment",
      v_core: "Neural AI Engine", v_guard: "Quantum Secure", v_deploy: "Global Node Cluster",
      scan: "Scanning Core Assets..."
    }
  },
  UZ: {
    nav: { home: "Asosiy", services: "Xizmatlar", portfolio: "Portfolio", pricing: "Narxlar", about: "Haqida", contact: "Aloqa", call: "QO'NG'IROQ", menu: "Menyu" },
    hero: {
      badge: "RAQAMLI AGENTLIK", agency: "Agentligi",
      desc: "Biz zamonaviy korxonalar uchun dinamik, premium veb-ilovalar va aqlli tizimlarni loyihalashtiramiz.",
      btn: "Loyihani Boshlash",
      chat: "Suhbatlashish",
      p1: "Raqamli Yechimlar", p2: "AI & Avtomatlashtirish", p3: "Innovatsion Raqamli", p4: "Kengayuvchi Tizimlar", p5: "Aqlli Yechimlar"
    },
    stats: {
      title: "Bizning Yo'limiz va Natijalar",
      subtitle: "Sayt hozirda faol ishlab chiqilmoqda. Mana bizning asosiy ko'rsatkichlarimiz.",
      completed: "Topshirilgan Loyiha",
      ongoing: "Jarayonda",
      exp: "Tajriba",
      happy: "Mamnun Mijoz",
      val_completed: "50+", val_ongoing: "10+", val_exp: "8 Oy +", val_happy: "94%"
    },
    blueprint: {
      console: "Asosiy Konsol", core: "Tizim Yadrosi v2.0", arch: "Premium Tajriba Arxitekturasi",
      status: "Ishlab Chiqish Holati", deploy: "Muhandislarimiz hozirda arxitekturani joriy etishmoqda. Yuqori samarali modullar yadroga birlashtirilmoqda.",
      s_title: "Holat", s_lat: "Kechikish", s_branch: "Tarmoq", logs: "Operatsion Jurnallar",
      p_core: "Yadro Protsessori", p_guard: "Ma'lumotlar Himoyasi", p_deploy: "Joriy Etish",
      v_core: "Neyron AI Dvigateli", v_guard: "Kvant Xavfsizligi", v_deploy: "Global Tugun Klasteri",
      scan: "Yadro Aktivlarini Skanerlash..."
    }
  },
  RU: {
    nav: { home: "Главная", services: "Услуги", portfolio: "Портфолио", pricing: "Цены", about: "О Нас", contact: "Контакты", call: "ПОЗВОНИТЬ", menu: "Меню" },
    hero: {
      badge: "DIGITAL АГЕНТСТВО", agency: "Агентство",
      desc: "Мы разрабатываем динамичные веб-приложения премиум-класса и интеллектуальные системы для современных предприятий.",
      btn: "Начать Проект",
      chat: "Чат",
      p1: "Цифровые Решения", p2: "ИИ и Автоматизация", p3: "Инновации", p4: "Масштабируемость", p5: "Умные Решения"
    },
    stats: {
      title: "Наш путь и результаты",
      subtitle: "Сайт находится в активной разработке. Вот наши ключевые показатели.",
      completed: "Завершено Проектов",
      ongoing: "В Процессе",
      exp: "Опыт",
      happy: "Довольных Клиентов",
      val_completed: "50+", val_ongoing: "10+", val_exp: "8 Мес. +", val_happy: "94%"
    },
    blueprint: {
      console: "Главная Консоль", core: "Ядро Системы v2.0", arch: "Архитектура Премиум-Класса",
      status: "Статус Разработки", deploy: "Наши инженеры внедряют архитектуру. Высокопроизводительные модули интегрируются в основное ядро.",
      s_title: "Статус", s_lat: "Задержка", s_branch: "Ветка", logs: "Операционные Логи",
      p_core: "Ядерный Процессор", p_guard: "Защита Данных", p_deploy: "Развертывание",
      v_core: "Нейронный ИИ-Движок", v_guard: "Квантовая Защита", v_deploy: "Глобальный Кластер",
      scan: "Сканирование Активов..."
    }
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("EN");

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[lang];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
