"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Globe, ChevronDown, Menu, X, Download } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { AsanHesabLogo } from "./logo";
import { useLanguage, useT } from "./i18n/language-context";
import { LOCALES, type Locale } from "./i18n/dictionary";

/**
 * Navbar — sticky, glassy, RTL-aware.
 * - Real theme toggle (light/dark via next-themes)
 * - Language switcher wired to LanguageProvider
 * - Custom uploaded logo
 * - Scroll-triggered compact CTA ("دانلود رایگان")
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const t = useT();

  useEffect(() => {
    // Use rAF to avoid synchronous setState in effect body
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setShowCta(y > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-premium"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label={t.nav.navLabel}
      >
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label={`${t.brand.name} — خانه`}
          >
            <AsanHesabLogo size={44} className="transition-transform duration-300 group-hover:scale-105" />
            <span className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.brand.name}
              </span>
              <span className="hidden sm:block text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5">
                {t.brand.tagline}
              </span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">{t.nav.features}</a>
            <a href="#how" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">{t.nav.how}</a>
            <a href="#audiences" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">{t.nav.audiences}</a>
            <a href="#pricing" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">{t.nav.faq}</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Scroll-triggered compact CTA (desktop) */}
            <a
              href="#download"
              className={`hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-premium hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300 ${
                showCta
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-4 pointer-events-none"
              }`}
            >
              <Download className="h-4 w-4" />
              {t.nav.download}
            </a>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-700 transition-all"
            >
              {/* Render both icons but hide one based on theme to avoid hydration mismatch */}
              <Sun
                className={`h-[18px] w-[18px] absolute transition-all ${
                  mounted && isDark ? "opacity-0 scale-50" : "opacity-100 scale-100"
                }`}
              />
              <Moon
                className={`h-[18px] w-[18px] absolute transition-all ${
                  mounted && isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={t.nav.language}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-blue-200 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 transition-all"
              >
                <Globe className="h-[18px] w-[18px]" />
                <span className="hidden sm:inline">
                  {LOCALES.find((l) => l.code === locale)?.label}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              {langOpen && (
                <ul
                  role="listbox"
                  className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1.5 shadow-premium-lg z-50 animate-soft-fade-up"
                >
                  {LOCALES.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        onClick={() => {
                          setLocale(l.code as Locale);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          locale === l.code
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span>{l.label}</span>
                        <span className="text-[10px] uppercase opacity-60">{l.code}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200"
              aria-label={t.nav.menu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-soft-fade-up">
            <div className="flex flex-col gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 shadow-premium">
              {[
                { href: "#features", label: t.nav.features },
                { href: "#how", label: t.nav.how },
                { href: "#audiences", label: t.nav.audiences },
                { href: "#pricing", label: t.nav.pricing },
                { href: "#faq", label: t.nav.faq },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 px-3 py-2.5 text-sm font-bold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t.nav.downloadMobile}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
