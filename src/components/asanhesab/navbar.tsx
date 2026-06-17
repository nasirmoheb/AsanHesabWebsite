"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Globe, ChevronDown, Menu, X } from "lucide-react";

/**
 * Navbar — sticky, glassy, RTL-aware.
 * Left: Logo (آسان حساب + blue 'A' icon)
 * Right: Light/Dark toggle (decorative — design is strict light mode),
 *        Language dropdown (دری / پشتو / English)
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"دری" | "پشتو" | "English">("دری");
  const [mobileOpen, setMobileOpen] = useState(false);
  // Strict light-mode design — toggle is decorative, defaults to light.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-premium"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        dir="rtl"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="ناوبری اصلی"
      >
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo — appears on the RIGHT in RTL */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            aria-label="آسان حساب — خانه"
          >
            <span className="relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-extrabold text-lg shadow-premium transition-transform duration-300 group-hover:scale-105">
              A
              <span className="absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                آسان حساب
              </span>
              <span className="hidden sm:block text-[10px] font-medium text-slate-500 -mt-0.5">
                AsanHesab · سیستم حسابداری
              </span>
            </span>
          </a>

          {/* Desktop: nav links (center) */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-700 transition-colors">امکانات</a>
            <a href="#pricing" className="hover:text-blue-700 transition-colors">قیمت‌گذاری</a>
            <a href="#download" className="hover:text-blue-700 transition-colors">دانلود</a>
            <a href="#contact" className="hover:text-blue-700 transition-colors">تماس</a>
          </div>

          {/* Actions — appear on the LEFT in RTL */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setIsDark((v) => !v)}
              aria-label="تغییر حالت روشن/تاریک"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 hover:text-blue-700 hover:border-blue-200 transition-all"
            >
              {isDark ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="انتخاب زبان"
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white/80 px-3 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-700 transition-all"
              >
                <Globe className="h-[18px] w-[18px]" />
                <span className="hidden sm:inline">{lang}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <ul
                  role="listbox"
                  className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-premium-lg z-50 animate-soft-fade-up"
                >
                  {(["دری", "پشتو", "English"] as const).map((l) => (
                    <li key={l}>
                      <button
                        type="button"
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          lang === l
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {l}
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
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700"
              aria-label="منوی موبایل"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-soft-fade-up">
            <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-premium">
              {[
                { href: "#features", label: "امکانات" },
                { href: "#pricing", label: "قیمت‌گذاری" },
                { href: "#download", label: "دانلود" },
                { href: "#contact", label: "تماس" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
