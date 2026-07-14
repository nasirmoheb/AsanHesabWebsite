"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Globe, ChevronDown, Menu, X, Download } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { AsanHesabLogo } from "./logo";
import { useLanguage, useT } from "./i18n/language-context";
import { LOCALES, type Locale } from "./i18n/dictionary";

/**
 * Navbar — Awwwards/Dribbble Inspired.
 * - Ultra-clean glassmorphic background on scroll (`backdrop-blur-xl`)
 * - Minimalist, hardware-like circular buttons for theme & language
 * - Smooth fade & slide animations for the scroll-triggered CTA
 * - Elegant typography and hover states
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

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setShowCta(y > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-2 sm:py-0 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent border-b border-transparent py-4 sm:py-2"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label={t.nav.navLabel}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">
          
          {/* Logo Zone */}
          <a
            href="#"
            className="flex items-center gap-3 group shrink-0 outline-none"
            aria-label={`${t.brand.name} — خانه`}
          >
            <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
              <AsanHesabLogo size={40} className="relative z-10 drop-shadow-sm" />
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t.brand.name}
              </span>
              <span className="hidden sm:block text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wide mt-0.5">
                {t.brand.tagline}
              </span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { href: "#features", label: t.nav.features },
              { href: "#how", label: t.nav.how },
              { href: "#audiences", label: t.nav.audiences },
              { href: "#pricing", label: t.nav.pricing },
              { href: "#faq", label: t.nav.faq },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors duration-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100/50 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Scroll-triggered CTA (Desktop) */}
            <div className="hidden lg:block overflow-hidden">
              <a
                href="#download"
                className={`inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-500 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] ${
                  showCta
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 translate-x-8 pointer-events-none"
                }`}
              >
                <Download className="h-4 w-4" />
                {t.nav.download}
              </a>
            </div>

            {/* Divider */}
            {showCta && <div className="hidden lg:block w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1 transition-opacity duration-500" />}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={t.nav.language}
                className="inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300"
              >
                <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="hidden sm:inline">
                  {LOCALES.find((l) => l.code === locale)?.label}
                </span>
                <ChevronDown
                  className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              
              {/* Dropdown Menu */}
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setLangOpen(false)} />
                  <ul
                    role="listbox"
                    className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-40 rounded-2xl border border-slate-100 dark:border-white/10 bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top"
                  >
                    {LOCALES.map((l) => (
                      <li key={l.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setLocale(l.code as Locale);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            locale === l.code
                              ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <span>{l.label}</span>
                          <span className="text-[10px] uppercase font-bold tracking-wider opacity-50">{l.code}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Theme Toggle (Hardware style button) */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
              className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300"
            >
              <Sun
                className={`h-4 w-4 absolute transition-all duration-500 ${
                  mounted && isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <Moon
                className={`h-4 w-4 absolute transition-all duration-500 ${
                  mounted && isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300"
              aria-label={t.nav.menu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Glassmorphic Popover) */}
        {mobileOpen && (
          <div className="lg:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/95 dark:bg-[#111]/95 backdrop-blur-xl p-3 shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 z-50">
            <div className="flex flex-col gap-1">
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
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-slate-200/60 dark:bg-white/10 my-2" />
              <a
                href="#download"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md active:scale-95 transition-transform"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.nav.downloadMobile}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}