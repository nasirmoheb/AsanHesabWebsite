"use client";

import { Zap, Clock, Shield, Headphones, Monitor, Play, ChevronDown, Sparkles, Star } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { LaptopMockup } from "./laptop-mockup";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Hero — the hook.
 * Enhanced with:
 *  - Aurora gradient mesh background (animated drift)
 *  - Particle texture overlay for depth
 *  - Glowing primary CTA with pulse halo
 *  - "Live users" badge with animated dot
 *  - Star rating mini-badge
 *  - Refined trust pills with gradient icons
 *  - Scroll indicator with bounce
 */
export function Hero() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-soft-radial bg-aurora"
      aria-labelledby="hero-headline"
    >
      {/* Subtle grid texture overlay */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none" aria-hidden />

      {/* Particles texture */}
      <div className="absolute inset-0 bg-particles pointer-events-none opacity-60" aria-hidden />

      {/* Animated aurora blobs */}
      <div
        aria-hidden
        className="absolute -top-24 right-1/2 translate-x-1/2 h-72 w-[40rem] bg-blue-300/40 dark:bg-blue-500/20 blur-3xl rounded-full pointer-events-none animate-aurora-drift"
      />
      <div
        aria-hidden
        className="absolute top-40 -left-20 h-64 w-64 bg-emerald-300/30 dark:bg-emerald-500/20 blur-3xl rounded-full pointer-events-none animate-aurora-drift"
        style={{ animationDelay: "5s" }}
      />
      <div
        aria-hidden
        className="absolute top-60 -right-20 h-72 w-72 bg-violet-300/25 dark:bg-violet-500/15 blur-3xl rounded-full pointer-events-none animate-aurora-drift"
        style={{ animationDelay: "10s" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Top badge — enhanced with shimmer + live dot */}
          <Reveal>
            <div className="relative inline-flex">
              {/* Pulse halo behind badge */}
              <span aria-hidden className="absolute inset-0 rounded-full bg-blue-400/30 blur-md animate-pulse-ring" />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-premium">
                <Zap className="h-3.5 w-3.5 fill-blue-600 dark:fill-blue-400 text-blue-600 dark:text-blue-400" />
                <span>{t.hero.badge}</span>
                {/* Live indicator dot */}
                <span className="inline-flex items-center gap-1 ms-1 ps-2 border-s border-blue-200 dark:border-blue-800">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping-soft" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300">{formatNumber("۵٬۰۰۰")}+ {t.stats.stat1Label}</span>
                </span>
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={60}>
            <h1
              id="hero-headline"
              className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] sm:leading-[1.1] max-w-4xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.hero.headlineLead}{" "}
              <span className="relative inline-block">
                <span className="text-gradient-blue">{t.hero.headlineHighlight}</span>
                {/* Underline accent */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 4"
                    fill="none"
                    stroke="url(#underline-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              {t.hero.headlineTail}
            </h1>
          </Reveal>

          {/* Sub-headline */}
          <Reveal delay={120}>
            <p className="mt-8 sm:mt-10 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.subheadline}
            </p>
          </Reveal>

          {/* CTAs — with glow on primary */}
          <Reveal delay={180}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#download"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 sm:px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white glow-blue hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer overlay */}
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                <WhatsAppIcon className="h-5 w-5 relative" />
                <span className="relative">{t.hero.primaryCta}</span>
              </a>
              <a
                href="#video"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm px-6 sm:px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors group-hover:scale-110">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </span>
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </Reveal>

          {/* Inline reassurance + star rating */}
          <Reveal delay={220}>
            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 num-fa">{formatNumber("4.9")}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">({formatNumber("۸۰۰")}+)</span>
              </div>
              <span className="hidden sm:inline h-3 w-px bg-slate-300 dark:bg-slate-700" />
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                {t.hero.reassurance}
              </p>
            </div>
          </Reveal>

          {/* Trust badges — enhanced with gradient icons */}
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

        {/* Scroll indicator — refined */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500" aria-hidden>
          <span className="text-xs font-medium tracking-wide">{t.hero.scroll}</span>
          <div className="relative h-9 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center pt-1.5 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
            <span className="block h-2 w-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 animate-bounce" />
          </div>
          <ChevronDown className="h-3 w-3 -mt-1 animate-bounce" />
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
    blue:    { wrap: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/20 border-blue-200/60 dark:border-blue-800/50 text-blue-700 dark:text-blue-300", icon: "bg-gradient-to-br from-blue-500 to-blue-600 text-white", dot: "bg-blue-500" },
    emerald: { wrap: "bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/50 dark:to-emerald-900/20 border-emerald-200/60 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300", icon: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white", dot: "bg-emerald-500" },
    violet:  { wrap: "bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/50 dark:to-violet-900/20 border-violet-200/60 dark:border-violet-800/50 text-violet-700 dark:text-violet-300", icon: "bg-gradient-to-br from-violet-500 to-violet-600 text-white", dot: "bg-violet-500" },
    slate:   { wrap: "bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/20 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200", icon: "bg-gradient-to-br from-slate-600 to-slate-700 text-white", dot: "bg-slate-500" },
  } as const;
  const t = tones[tone];
  return (
    <li
      className={`group relative inline-flex items-center justify-center gap-2 rounded-2xl border ${t.wrap} px-3 py-2.5 text-xs sm:text-sm font-semibold backdrop-blur-sm hover-lift hover:shadow-premium`}
    >
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${t.icon} shadow-sm group-hover:scale-110 transition-transform`}>
        {icon}
      </span>
      <span>{label}</span>
    </li>
  );
}
