"use client";

import { Clock, Shield, Monitor, Star, Download, RefreshCw } from "lucide-react";
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
      className="relative flex flex-col items-center justify-center overflow-hidden bg-background bg-soft-radial pt-24 pb-20 sm:pt-32 sm:pb-28"
      aria-labelledby="hero-headline"
    >
      {/* Clean premium background overlay */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badges */}
          <Reveal>
            <div className="inline-flex items-center gap-3 sm:gap-4 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-500 shrink-0" aria-hidden />
                <span>{t.hero.badgeDualMode}</span>
              </div>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" aria-hidden />
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500 shrink-0" aria-hidden />
                <span>{t.hero.badgeTrust}</span>
              </div>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={100}>
            <h1
              id="hero-headline"
              className="mt-8 mx-auto w-full max-w-5xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug text-balance"
            >
              <span className="block mb-2 sm:mb-3">{t.hero.headlineLead}</span>
              <span className="block">
                {t.hero.headlineTail}{" "}
                <span className="relative inline-block mx-1 group whitespace-nowrap">
                  <span className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-lg -skew-x-6 transition-transform duration-500 ease-out group-hover:skew-x-0" aria-hidden />
                  <span className="absolute inset-0 border border-blue-200 dark:border-blue-800/80 rounded-lg -skew-x-6 transition-transform duration-500 ease-out group-hover:skew-x-0" aria-hidden />
                  <span className="relative z-10 text-blue-800 dark:text-blue-200 px-3 py-0.5 block font-extrabold">
                    {t.hero.headlineHighlight}
                  </span>
                </span>
              </span>
            </h1>
          </Reveal>

          {/* Sub-headline */}
          <Reveal delay={200}>
            <p
              className="mt-8 mx-auto max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed text-pretty"
            >
              {t.hero.subheadline}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center gap-3 w-full max-w-lg">
              <div className="flex flex-row items-center justify-center gap-4 w-full">
                <a
                  href={DOWNLOAD_URL}
                  onClick={handleDownloadClick}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-primary-foreground shadow-premium transition-[transform,box-shadow,background-color] duration-200 ease-out hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 min-h-11"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span className="whitespace-nowrap">{t.hero.primaryCta}</span>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 min-h-11"
                >
                  <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                  <span className="whitespace-nowrap">{t.hero.secondaryCta}</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 num-fa">
                {t.hero.downloadMeta}
              </p>

              {nonWindowsWarning && (
                <p
                  role="alert"
                  className="w-full rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed animate-soft-fade-up"
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

              <span className="hidden sm:block h-4 w-px bg-slate-300 dark:bg-slate-600" aria-hidden />

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-500" aria-hidden />
                  {t.hero.trust1}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-500" aria-hidden />
                  {t.hero.trust2}
                </span>
                <span className="flex items-center gap-1.5">
                  <Monitor className="h-4 w-4 text-slate-500" aria-hidden />
                  {formatNumber(t.hero.trust4)}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Laptop Mockup — no Reveal wrapper; loads immediately as LCP element */}
        <div className="relative mt-16 sm:mt-24 w-full">
          <DotGridOverlay />
          <DashboardMockup t={t} />
        </div>
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

function DashboardMockup({ t }: { t: ReturnType<typeof useT> }) {
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
      className="relative mx-auto w-full max-w-7xl hover-lift"
      aria-label={t.hero.dashboardAria}
    >
      {/* Laptop lid / screen chrome */}
      <div className="rounded-t-lg sm:rounded-t-xl bg-slate-200 dark:bg-slate-900 px-0.5 pt-1 pb-0 sm:px-2 sm:pt-2.5 shadow-premium-lg border border-b-0 border-slate-300 dark:border-slate-800">
        {/* Webcam notch */}
        <div
          aria-hidden
          className="mx-auto mb-0.5 sm:mb-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-slate-400 dark:bg-slate-600"
        />
        <div className="overflow-hidden rounded-t-[3px] sm:rounded-t-[6px] border border-b-0 border-slate-300 dark:border-slate-700">
          <Image
            key={src}
            src={src}
            alt={t.hero.dashboardAlt}
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

      {/* Laptop hinge bar */}
      <div className="h-1 sm:h-2 bg-slate-300 dark:bg-slate-800 border-x border-b border-slate-300 dark:border-slate-700 rounded-b-sm" aria-hidden />
      {/* Laptop base / stand */}
      <div className="relative h-1.5 sm:h-3" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-1.5 sm:h-3 bg-slate-200 dark:bg-slate-900 rounded-b-xl sm:rounded-b-2xl border-x border-b border-slate-300 dark:border-slate-800" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 sm:w-36 h-1.5 sm:h-3 bg-slate-300/60 dark:bg-slate-700/60 rounded-b-xl sm:rounded-b-2xl" />
      </div>
    </figure>
  );
}
