"use client";

import { Zap, ShieldCheck, Clock, Check, ArrowRight, Download } from "lucide-react";
import { Reveal } from "./reveal";
import { useT } from "./i18n/language-context";

/**
 * FinalCTA — closing argument with urgency.
 * Enhanced with:
 *  - Animated gradient mesh background
 *  - Floating confetti particles
 *  - Glow ring around primary CTA
 *  - Pulse halo behind badge
 */
export function FinalCTA() {
  const t = useT();

  return (
    <section
      id="download"
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 dark:from-blue-800 dark:via-blue-900 dark:to-slate-950 py-24 sm:py-32"
      aria-labelledby="final-cta-headline"
    >
      {/* Animated gradient mesh */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0, transparent 35%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.3) 0, transparent 40%), radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0, transparent 45%)",
        }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Floating confetti particles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: "10%", top: "20%", delay: "0s",   size: "h-2 w-2",  color: "bg-amber-300",   shape: "rounded-full" },
          { left: "85%", top: "15%", delay: "0.5s", size: "h-3 w-3",  color: "bg-emerald-300", shape: "rounded-sm" },
          { left: "15%", top: "70%", delay: "1s",   size: "h-2 w-2",  color: "bg-violet-300",  shape: "rounded-full" },
          { left: "75%", top: "75%", delay: "1.5s", size: "h-2.5 w-2.5", color: "bg-blue-300",  shape: "rounded-sm" },
          { left: "50%", top: "10%", delay: "2s",   size: "h-1.5 w-1.5", color: "bg-rose-300", shape: "rounded-full" },
          { left: "30%", top: "85%", delay: "2.5s", size: "h-2 w-2",  color: "bg-amber-300",   shape: "rounded-sm" },
          { left: "90%", top: "50%", delay: "3s",   size: "h-2 w-2",  color: "bg-emerald-300", shape: "rounded-full" },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute ${p.size} ${p.color} ${p.shape} opacity-60 animate-float-slow`}
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="relative inline-flex">
            {/* Pulse halo */}
            <span aria-hidden className="absolute inset-0 rounded-full bg-amber-400/30 blur-md animate-pulse-ring" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-1.5 text-xs sm:text-sm font-semibold text-white">
              <Zap className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              <span>{t.finalCta.badge}</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2
            id="final-cta-headline"
            className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {t.finalCta.titleLead}{" "}
            <span className="bg-gradient-to-l from-amber-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              {t.finalCta.titleHighlight}
            </span>
            {t.finalCta.titleTail}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t.finalCta.body}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-4 text-base sm:text-lg font-bold text-blue-700 shadow-premium-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer */}
              <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              <Download className="h-5 w-5 text-emerald-600 relative" />
              <span className="relative">{t.finalCta.primaryCta}</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-7 py-4 text-base sm:text-lg font-bold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              {t.finalCta.secondaryCta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform" />
            </a>
          </div>
        </Reveal>

        {/* Reassurance row with refined styling */}
        <Reveal delay={240}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-blue-100">
            {[
              { icon: <Check className="h-4 w-4 text-emerald-300" strokeWidth={3} />, label: t.finalCta.reassurance1 },
              { icon: <ShieldCheck className="h-4 w-4 text-emerald-300" />,           label: t.finalCta.reassurance2 },
              { icon: <Clock className="h-4 w-4 text-emerald-300" />,                 label: t.finalCta.reassurance3 },
            ].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
