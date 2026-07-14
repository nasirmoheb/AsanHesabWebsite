"use client";

import { Zap, Clock, Shield, Monitor, Play, Star, Download } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Modern Hero Section
 * Features:
 *  - Native Tailwind grid background with radial fade mask
 *  - Soft, ambient "aurora" glowing orbs
 *  - Glassmorphic badges and trust pills
 *  - Premium gradient typography with subtle SVG underline
 *  - Shimmering primary CTA & frosted secondary CTA
 */
export function Hero() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#090E17] pt-24 pb-20 sm:pt-32 sm:pb-28"
      aria-labelledby="hero-headline"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      {/* 1. Subtle Grid Pattern with Radial Fade */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />
      
      {/* 2. Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/20 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" aria-hidden />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" aria-hidden />
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-violet-500/10 dark:bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Badge: Glassmorphic Pill with Live Pulse */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200/60 dark:border-blue-800/50 bg-white/60 dark:bg-slate-900/50 px-3 py-1.5 backdrop-blur-md shadow-sm transition-transform hover:scale-105">
              <span className="flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 p-1">
                <Zap className="h-3 w-3 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                {t.hero.badge}
              </span>
              <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 mx-0.5" />
              <div className="flex items-center gap-1.5 pr-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {formatNumber("100")}+ {t.stats.stat1Label}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={100}>
            <h1
              id="hero-headline"
              className="mt-8 mx-auto max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] sm:leading-[1.15]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.hero.headlineLead}{" "}
              <span className="relative whitespace-nowrap">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
                  {t.hero.headlineHighlight}
                </span>
                {/* Curved underline accent */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-blue-500/30 dark:text-blue-400/30"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 9.5C65 -2.5 135 -2.5 198 9.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              {t.hero.headlineTail}
            </h1>
          </Reveal>

          {/* Sub-headline */}
          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
              {t.hero.subheadline}
            </p>
          </Reveal>

          {/* Call to Actions */}
          <Reveal delay={300}>
            <div className="mt-10 flex flex-row items-center justify-center gap-3 w-full">
              <a
                href="#download"
                className="group relative flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-blue-500 to-blue-600 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)] overflow-hidden border border-blue-400/50"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                <Download className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-y-0.5 shrink-0" />
                <span>{t.hero.primaryCta}</span>
              </a>

              <a
                href="#video"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-white/70 dark:bg-slate-800/50 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-slate-900 dark:text-white ring-1 ring-slate-200 dark:ring-slate-700 backdrop-blur-md transition-all hover:bg-white dark:hover:bg-slate-800 hover:scale-[1.02] whitespace-nowrap"
              >
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/50 shrink-0">
                  <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-0.5 fill-current" />
                </div>
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </Reveal>

          {/* Social Proof, Rating & Trust */}
          <Reveal delay={400}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Star rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 num-fa">{formatNumber("4.9")}</span>
                <span className="text-sm text-slate-400 dark:text-slate-500">({formatNumber("800")}+)</span>
              </div>

              <span className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-700" />

              {/* Trust items */}
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1">
                  <Clock className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  {t.hero.trust1}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1">
                  <Shield className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  {t.hero.trust2}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1">
                  <Monitor className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  {formatNumber(t.hero.trust4)}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Laptop Mockup Presentation */}
        <Reveal delay={600} className="relative mt-15 sm:mt-20 w-full">
          {/* Glow behind the laptop */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[60%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
          <DashboardMockup />
        </Reveal>
        
      </div>
      
      {/* Bottom fade out gradient to seamlessly blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#090E17] to-transparent pointer-events-none" />
    </section>
  );
}

/**
 * DashboardMockup — laptop frame with real dashboard screenshot.
 * Uses useTheme() to reliably swap images after hydration.
 */
function DashboardMockup() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render the correct image after mount
  useEffect(() => { setMounted(true); }, []);

  const src = !mounted || resolvedTheme !== "dark"
    ? "/dashboard-light.avif"
    : "/dashboard-dark.avif";

  const alt = resolvedTheme === "dark"
    ? "AsanHesab dashboard — dark mode"
    : "AsanHesab dashboard — light mode";

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Glow behind screen */}
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-full blur-3xl
          bg-gradient-to-b from-blue-100/60 via-blue-50/40 to-transparent
          dark:from-blue-500/20 dark:to-transparent"
      />

      {/* Laptop lid / screen bezel */}
      <div className="rounded-t-xl bg-slate-200 dark:bg-slate-950 p-0.5 shadow-premium-lg ring-1 ring-slate-300/80 dark:ring-white/5">
        {/* Camera dot */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-slate-400 dark:bg-slate-700"
        />
        {/* Screen */}
        <div className="overflow-hidden rounded-[9px] border border-slate-300 dark:border-slate-800">
          <img
            key={src}
            src={src}
            alt={alt}
            className="w-full h-auto block"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Laptop base / hinge */}
      <div className="h-1 bg-slate-300 dark:bg-slate-950 rounded-b-lg" />
      <div className="mx-auto h-1 w-24 sm:w-32 rounded-b-lg bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}


