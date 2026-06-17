"use client";

import { Zap, Clock, Shield, Headphones, Monitor, Play, ChevronDown, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { LaptopMockup } from "./laptop-mockup";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Hero — the hook.
 */
export function Hero() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-soft-radial"
      aria-labelledby="hero-headline"
    >
      {/* Subtle grid texture overlay */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none" aria-hidden />

      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-24 right-1/2 translate-x-1/2 h-72 w-[40rem] bg-blue-200/30 dark:bg-blue-500/15 blur-3xl rounded-full pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-40 -left-20 h-64 w-64 bg-emerald-200/25 dark:bg-emerald-500/15 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Top badge */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-950/40 px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 fill-blue-600 dark:fill-blue-400 text-blue-600 dark:text-blue-400" />
              <span>{t.hero.badge}</span>
            </span>
          </Reveal>

          {/* Headline */}
          <Reveal delay={60}>
            <h1
              id="hero-headline"
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.25] sm:leading-[1.2] max-w-4xl"
            >
              {t.hero.headlineLead}{" "}
              <span className="text-gradient-blue">{t.hero.headlineHighlight}</span>{" "}
              {t.hero.headlineTail}
            </h1>
          </Reveal>

          {/* Sub-headline */}
          <Reveal delay={120}>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.subheadline}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={180}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#download"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 sm:px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white shadow-premium-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{t.hero.primaryCta}</span>
              </a>
              <a
                href="#video"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm px-6 sm:px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </span>
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </Reveal>

          {/* Inline reassurance */}
          <Reveal delay={220}>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {t.hero.reassurance}
            </p>
          </Reveal>

          {/* Trust badges */}
          <Reveal delay={260}>
            <ul className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-3xl">
              <TrustPill icon={<Clock className="h-4 w-4" />} label={t.hero.trust1} tone="blue" />
              <TrustPill icon={<Shield className="h-4 w-4" />} label={t.hero.trust2} tone="emerald" />
              <TrustPill icon={<Headphones className="h-4 w-4" />} label={t.hero.trust3} tone="violet" />
              <TrustPill icon={<Monitor className="h-4 w-4" />} label={formatNumber(t.hero.trust4)} tone="slate" />
            </ul>
          </Reveal>
        </div>

        {/* Laptop mockup */}
        <Reveal delay={320} className="relative mt-16 sm:mt-20 lg:mt-24">
          <LaptopMockup />
        </Reveal>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500" aria-hidden>
          <span className="text-xs font-medium tracking-wide">{t.hero.scroll}</span>
          <div className="relative h-9 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-1.5">
            <span className="block h-2 w-1 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" />
          </div>
          <ChevronDown className="h-3 w-3 -mt-1" />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-slate-950 pointer-events-none"
      />
    </section>
  );
}

function TrustPill({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "blue" | "emerald" | "violet" | "slate";
}) {
  const tones = {
    blue:    { wrap: "bg-blue-50/80 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/60 text-blue-700 dark:text-blue-300", icon: "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300" },
    emerald: { wrap: "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300", icon: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300" },
    violet:  { wrap: "bg-violet-50/80 dark:bg-violet-950/40 border-violet-100 dark:border-violet-900/60 text-violet-700 dark:text-violet-300", icon: "bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300" },
    slate:   { wrap: "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200", icon: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200" },
  } as const;
  const tCls = tones[tone];
  return (
    <li
      className={`inline-flex items-center justify-center gap-2 rounded-xl border ${tCls.wrap} px-3 py-2.5 text-xs sm:text-sm font-semibold backdrop-blur-sm`}
    >
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tCls.icon}`}>
        {icon}
      </span>
      <span>{label}</span>
    </li>
  );
}
