"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  dictionaries,
  LOCALES,
  type Dict,
  type Locale,
} from "./dictionary";

type LanguageContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  dict: Dict;
  setLocale: (locale: Locale) => void;
  /** Convert ASCII digits to the locale's numeral system (Persian/Pashto use Persian digits) */
  formatNumber: (n: number | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "asanhesab-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "fa";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored in dictionaries) return stored as Locale;
  } catch {
    /* ignore */
  }
  // Default: Dari
  return "fa";
}

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianDigits(input: string): string {
  return input.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with "fa" on SSR to keep markup stable; sync to localStorage after mount.
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    // Sync from localStorage after mount; use rAF to avoid synchronous setState.
    const id = requestAnimationFrame(() => setLocaleState(getInitialLocale()));
    return () => cancelAnimationFrame(id);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  // Reflect locale on <html lang> + <html dir> for proper RTL/LTR + a11y.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const meta = LOCALES.find((l) => l.code === locale);
    if (!meta) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  // Update document.title when locale changes
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = dictionaries[locale].meta.title;
  }, [locale]);

  const formatNumber = useCallback(
    (n: number | string) => {
      const str = typeof n === "number" ? n.toString() : n;
      if (locale === "en") return str;
      return toPersianDigits(str);
    },
    [locale]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: LOCALES.find((l) => l.code === locale)?.dir ?? "rtl",
      dict: dictionaries[locale],
      setLocale,
      formatNumber,
    }),
    [locale, setLocale, formatNumber]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

/** Convenience hook returning just the dictionary. */
export function useT(): Dict {
  return useLanguage().dict;
}
