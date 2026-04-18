"use client";

import { useI18n, languages, type Locale } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, dir } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale)!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-brand-deep dark:hover:text-brand-light transition-colors bg-gray-100/80 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 cursor-pointer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="text-xs font-semibold">{currentLang.name}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute ${dir === "rtl" ? "left-0" : "right-0"} top-full mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-xl shadow-brand-deep/10 dark:shadow-black/30 border border-gray-100 dark:border-white/10 py-1.5 min-w-[160px] z-50 overflow-hidden`}
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code as Locale);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors cursor-pointer ${
                  locale === lang.code
                    ? "bg-brand-surface dark:bg-brand-mid/10 text-brand-deep dark:text-brand-light font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
                whileHover={{ x: dir === "rtl" ? -2 : 2 }}
              >
                <span>{lang.name}</span>
                {locale === lang.code && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-brand-mid"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
