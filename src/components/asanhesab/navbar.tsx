"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Globe, ChevronDown, Menu, X, Download } from "lucide-react";
import { AsanHesabLogo } from "./logo";
import { DownloadLink } from "./download-link";
import { useLanguage, useT } from "./i18n/language-context";
import { LOCALES, type Locale } from "./i18n/dictionary";

/**
 * Navbar — Polish pass:
 *  - resolvedTheme replaces theme for correct system-preference detection
 *  - Hardcoded dark bg tokens → CSS design tokens (bg-background)
 *  - ARIA fixed: listbox → menu/menuitem role pair; aria-controls added
 *  - Desktop language dropdown: click-outside closes on all screen sizes
 *  - Escape key closes both mobile drawer and language dropdown
 *  - focus-visible rings added to logo, all buttons, mobile CTA
 *  - Active press state added to desktop CTA (active:scale-95)
 *  - Conditional divider replaced with always-present invisible spacer to
 *    prevent layout shift when scroll-triggered CTA slides in
 *  - overflow-hidden CTA wrapper removed (was clipping focus rings)
 *  - text-[10px] raised to text-[11px] — still compact but above minimum
 *  - Mobile drawer id added for aria-controls pairing
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const t = useT();

  // Refs for click-outside detection
  const langRef = useRef<HTMLDivElement>(null);
  const mobileDrawerId = "navbar-mobile-drawer";

  // Prevent hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  // Scroll effects
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

  // Close language dropdown on outside click (works on all screen sizes)
  useEffect(() => {
    if (!langOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [langOpen]);

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (langOpen) setLangOpen(false);
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [langOpen, mobileOpen]);

  // resolvedTheme handles "system" preference correctly (vs raw `theme`)
  const isDark = mounted && resolvedTheme === "dark";

  const closeLang = useCallback((code: Locale) => {
    setLocale(code);
    setLangOpen(false);
  }, [setLocale]);

  const navLinks = [
    { href: "#features",        label: t.nav.features },
    { href: "#how",             label: t.nav.how },
    { href: "#invoice-preview", label: t.nav.invoices },
    { href: "#comparison",      label: t.nav.comparison },
    { href: "#pricing",         label: t.nav.pricing },
    { href: "#faq",             label: t.nav.faq },
  ] as const;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-2 sm:py-0 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
          : "bg-transparent border-b border-transparent py-4 sm:py-2"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label={t.nav.navLabel}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a
            href="#"
            className="flex items-center gap-3 group shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`${t.brand.name} — خانه`}
          >
            <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
              <AsanHesabLogo size={40} className="relative z-10 drop-shadow-sm" />
              <div
                aria-hidden
                className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <span className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t.brand.name}
              </span>
              {/* Raised from text-[10px] to text-[11px] — below 10px is below readable floor */}
              <span className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide mt-0.5">
                {t.brand.tagline}
              </span>
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-2.5 xl:px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors duration-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100/50 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Actions Zone ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/*
             * Scroll-triggered CTA (Desktop)
             * Wrapper no longer has overflow-hidden (was clipping focus rings).
             * Divider is always rendered as an invisible element when CTA is
             * hidden — prevents layout shift when CTA slides in.
             */}
            <DownloadLink
              href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
              className={`hidden lg:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-500 hover:opacity-90 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                showCta
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-8 pointer-events-none"
              }`}
            >
              <Download className="h-4 w-4" />
              {t.nav.download}
            </DownloadLink>

            {/* Always-present divider — invisible when CTA is hidden; no layout shift */}
            <div
              aria-hidden
              className={`hidden lg:block w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1 transition-opacity duration-500 ${
                showCta ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* ── Language Dropdown ── */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                id="lang-trigger"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
                aria-controls="lang-menu"
                aria-label={t.nav.language}
                className="inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden />
                <span className="hidden sm:inline">
                  {LOCALES.find((l) => l.code === locale)?.label}
                </span>
                <ChevronDown
                  aria-hidden
                  className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu
               * Role corrected: listbox → menu; items use menuitem role.
               * A listbox requires option children; menu + menuitem is
               * correct for a button-driven selection widget.
               */}
              {langOpen && (
                <ul
                  id="lang-menu"
                  role="menu"
                  aria-labelledby="lang-trigger"
                  className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-40 rounded-2xl border border-slate-100 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-2 duration-200 origin-top"
                >
                  {LOCALES.map((l) => (
                    <li key={l.code} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => closeLang(l.code as Locale)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                          locale === l.code
                            ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <span>{l.label}</span>
                        {/* Raised from text-[10px] to text-[11px] */}
                        <span className="text-[11px] uppercase font-bold tracking-wider opacity-50" aria-hidden>
                          {l.code}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Theme Toggle ── */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
              className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Sun
                aria-hidden
                className={`h-4 w-4 absolute transition-all duration-500 ${
                  mounted && isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <Moon
                aria-hidden
                className={`h-4 w-4 absolute transition-all duration-500 ${
                  mounted && isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </button>

            {/* ── Mobile Menu Toggle ── */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={t.nav.menu}
              aria-expanded={mobileOpen}
              aria-controls={mobileDrawerId}
            >
              {mobileOpen
                ? <X className="h-4 w-4" aria-hidden />
                : <Menu className="h-4 w-4" aria-hidden />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileOpen && (
          <div
            id={mobileDrawerId}
            className="lg:hidden absolute left-4 right-4 top-full mt-2 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 z-50"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-slate-200/60 dark:bg-white/10 my-2" aria-hidden />
              <DownloadLink
                href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-md active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Download className="h-5 w-5" aria-hidden />
                {t.nav.downloadMobile}
              </DownloadLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
