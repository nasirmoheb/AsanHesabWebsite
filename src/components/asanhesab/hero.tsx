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

      {/* Clean ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badges */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-500 shrink-0" aria-hidden />
                <span>{t.hero.badgeDualMode}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-300 dark:bg-slate-700" aria-hidden />
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 shrink-0" aria-hidden />
                <span>{t.hero.badgeTrust}</span>
              </div>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={100}>
            <style>{`
              @keyframes drawPath {
                to { stroke-dashoffset: 0; }
              }
            `}</style>
            <h1
              id="hero-headline"
              className="mt-8 mx-auto w-full max-w-none sm:max-w-7xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.3] sm:leading-[1.4]"
            >
              <span className="block mb-2 sm:mb-4 px-2 xl:whitespace-nowrap">{t.hero.headlineLead}</span>
              <span className="block mt-2">
                {t.hero.headlineTail}{" "}
                <span className="relative inline-block px-2 pb-1 group">
                  <span className="absolute left-0 bottom-1 w-full h-3 sm:h-4 bg-gradient-to-r from-blue-200/60 to-indigo-200/60 dark:from-blue-800/40 dark:to-indigo-800/40 -rotate-1 rounded-sm transition-all duration-500 ease-out group-hover:h-[calc(100%-4px)] group-hover:-rotate-0 group-hover:bottom-1" aria-hidden />
                  <span className="relative text-blue-700 dark:text-blue-300 font-black z-10 drop-shadow-sm transition-colors duration-500 group-hover:text-blue-900 dark:group-hover:text-blue-100">
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
              <div className="flex flex-row items-center justify-center gap-3 w-full">
                <a
                  href={DOWNLOAD_URL}
                  onClick={handleDownloadClick}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 min-h-11"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-y-0.5 shrink-0" />
                  <span className="whitespace-nowrap">{t.hero.primaryCta}</span>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 min-h-11"
                >
                  <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">{t.hero.secondaryCta}</span>
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
        <div className="relative mt-16 sm:mt-20 w-full">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-105 w-[85%] rounded-full blur-[100px] pointer-events-none bg-blue-400/25 dark:bg-blue-500/20"
          />

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
      className="relative mx-auto w-full max-w-7xl"
      aria-label={t.hero.dashboardAria}
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

      <div className="h-1 bg-slate-300 dark:bg-slate-950 rounded-b-lg" />
      <div className="mx-auto h-1 w-24 sm:w-32 rounded-b-lg bg-slate-200 dark:bg-slate-800" />
    </figure>
  );
}
