"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export type Locale = "fa" | "en" | "ps";

interface Translations {
  [key: string]: string;
}

interface LanguageInfo {
  code: Locale;
  name: string;
  nativeName: string;
  dir: "rtl" | "ltr";
  flag: string;
}

export const languages: LanguageInfo[] = [
  { code: "fa", name: "Dari", nativeName: "دری", dir: "rtl", flag: "🇦🇫" },
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇺🇸" },
  { code: "ps", name: "Pashto", nativeName: "پښتو", dir: "rtl", flag: "🇦🇫" },
];

// Import translations from separate files
import { fa } from "@/app/translations/fa";
import { en } from "@/app/translations/en";
import { ps } from "@/app/translations/ps";

const translationMap: Record<Locale, Translations> = { fa, en, ps };

interface LanguageContextType {
  locale: Locale;
  dir: "rtl" | "ltr";
  lang: string;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "fa",
  dir: "rtl",
  lang: "fa",
  setLocale: () => {},
  t: (key: string) => key,
});

export function useI18n() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  const langInfo = useMemo(() => {
    return languages.find((l) => l.code === locale)!;
  }, [locale]);

  const t = useCallback(
    (key: string): string => {
      return translationMap[locale]?.[key] || translationMap.fa?.[key] || key;
    },
    [locale]
  );

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("asanhesab-locale", newLocale);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("asanhesab-locale") as Locale | null;
    if (stored && languages.find((l) => l.code === stored)) {
      setLocaleState(stored);
    }
  }, []);

  // Update html dir and lang attributes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", langInfo.dir);
    html.setAttribute("lang", locale);
  }, [locale, langInfo.dir]);

  return (
    <LanguageContext.Provider value={{ locale, dir: langInfo.dir, lang: locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
