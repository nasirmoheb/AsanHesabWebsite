"use client";

import { Zap, Clock, Shield, Monitor, Star, Download } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";
import { useTheme } from "next-themes";
import { useEffect, useState, useId, useCallback } from "react";
import Image from "next/image";
import { WhatsAppIcon } from "./whatsapp-icon";

const DOWNLOAD_URL =
  "https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe";
const WHATSAPP_URL = "https://wa.me/93799422717";

function isWindows(): boolean {
  if (typeof navigator === "undefined") return true;
  return /Windows/i.test(navigator.userAgent);
}

export function Hero() {
  const t = useT();
  const { formatNumber } = useLanguage();
  const [nonWindowsWarning, setNonWindowsWarning] = useState(false);

  const handleDownloadClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isWindows()) {
        setNonWindowsWarning(false);
        return;
      }
      e.preventDefault();
      setNonWindowsWarning(true);
    },
    []
  );

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden bg-background pt-24 pb-20 sm:pt-32 sm:pb-28"
      aria-labelledby="hero-headline"
    >
      {/* Line grid — radially faded from center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.07) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)",
        }}
      />

      {/* Single ambient glow — center only */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-blue-500/20 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badges — split: offline claim + active shop count */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 dark:border-blue-800/50 bg-white/60 dark:bg-slate-900/50 px-3 py-1.5 backdrop-blur-md shadow-sm">
                <span className="flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 p-1">
                  <Zap className="h-3 w-3 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  {t.hero.offlineBadge}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/50 bg-white/60 dark:bg-slate-900/50 px-3 py-1.5 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full motion-safe:animate-ping motion-reduce:animate-none rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-400 num-fa">
                  {formatNumber("100")}+ {t.stats.stat1Label}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={100}>
            <h1
              id="hero-headline"
              className="mt-8 mx-auto max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] sm:leading-[1.15]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.hero.headlineLead}{" "}
              <span className="relative inline-block">
                <span className="text-primary">{t.hero.headlineHighlight}</span>
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-primary/25"
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
            <p
              className="mt-8 max-w-2xl text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t.hero.subheadline}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center gap-3 w-full max-w-lg">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full">
                <a
                  href={DOWNLOAD_URL}
                  onClick={handleDownloadClick}
                  className="group relative flex flex-1 items-center justify-center gap-2 rounded-2xl bg-linear-to-b from-blue-500 to-blue-600 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.7)] active:scale-[0.98] overflow-hidden border border-blue-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-11"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[150%] motion-reduce:transition-none motion-reduce:group-hover:translate-x-[-100%]"
                  />
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-y-0.5 shrink-0" />
                  <span>{t.hero.primaryCta}</span>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/70 dark:bg-slate-800/50 px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-slate-900 dark:text-white ring-1 ring-slate-200 dark:ring-slate-700 backdrop-blur-md transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background min-h-11"
                >
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/70 shrink-0">
                    <WhatsAppIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 num-fa">
                {t.hero.downloadMeta}
              </p>

              {nonWindowsWarning && (
                <p
                  role="alert"
                  className="rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed"
                >
                  {t.hero.downloadNonWindows}
                </p>
              )}
            </div>
          </Reveal>

          {/* Social proof — rating + trust pills */}
          <Reveal delay={400}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="sr-only">{t.testimonials.ratingCount}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 num-fa">
                  {formatNumber("4.9")}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400 num-fa">
                  ({formatNumber("800")}+)
                </span>
              </div>

              <span className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-700" aria-hidden />

              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1">
                  <Clock className="h-3.5 w-3.5 text-blue-500 shrink-0" aria-hidden />
                  {t.hero.trust1}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1">
                  <Shield className="h-3.5 w-3.5 text-emerald-500 shrink-0" aria-hidden />
                  {t.hero.trust2}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1">
                  <Monitor className="h-3.5 w-3.5 text-slate-500 shrink-0" aria-hidden />
                  {formatNumber(t.hero.trust4)}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Laptop Mockup */}
        <Reveal delay={600} className="relative mt-16 sm:mt-20 w-full">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-105 w-[85%] rounded-full blur-[100px] pointer-events-none bg-blue-400/25 dark:bg-blue-500/20"
          />

          <DotGridOverlay />
          <DashboardMockup />
        </Reveal>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" aria-hidden />
    </section>
  );
}

function DotGridOverlay() {
  const id = useId();
  const patternId = `dots-${id}`;
  const gradId = `dotFade-${id}`;
  const maskId = `dotMask-${id}`;

  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-[10%] bottom-0 pointer-events-none overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.35] dark:opacity-[0.2]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="fill-slate-400 dark:fill-slate-600" />
          </pattern>
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={`url(#${gradId})`} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} mask={`url(#${maskId})`} />
      </svg>
    </div>
  );
}

function DashboardMockup() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark ? "/dashboard-dark.avif" : "/dashboard-light.avif";

  const blurLight = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750"><rect width="1200" height="750" fill="#e8edf5"/></svg>`
  )}`;
  const blurDark = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750"><rect width="1200" height="750" fill="#0f172a"/></svg>`
  )}`;

  return (
    <figure
      className="relative mx-auto w-full max-w-7xl"
      aria-label="تصویر داشبورد آسان حساب در لپ‌تاپ"
    >
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-full blur-3xl bg-linear-to-b from-blue-100/60 via-blue-50/40 to-transparent dark:from-blue-500/20 dark:to-transparent"
      />

      <div className="rounded-t-xl bg-slate-200 dark:bg-slate-950 p-0.5 shadow-premium-lg ring-1 ring-slate-300/80 dark:ring-white/5">
        <div
          aria-hidden
          className="absolute left-1/2 top-1 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-slate-400 dark:bg-slate-700"
        />
        <div className="overflow-hidden rounded-[9px] border border-slate-300 dark:border-slate-800">
          <Image
            key={src}
            src={src}
            alt="داشبورد آسان حساب — نمای کلی فروش، گدام و گزارش مالی"
            width={1200}
            height={750}
            priority
            placeholder="blur"
            blurDataURL={isDark ? blurDark : blurLight}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            className="w-full h-auto block"
            style={{ width: "100%", height: "auto" }}
            suppressHydrationWarning
          />
        </div>
      </div>

      <div className="h-1 bg-slate-300 dark:bg-slate-950 rounded-b-lg" />
      <div className="mx-auto h-1 w-24 sm:w-32 rounded-b-lg bg-slate-200 dark:bg-slate-800" />
    </figure>
  );
}
