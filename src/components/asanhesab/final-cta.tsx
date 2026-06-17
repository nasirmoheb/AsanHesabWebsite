"use client";

import { Zap, ShieldCheck, Clock, Check } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { Reveal } from "./reveal";
import { useT } from "./i18n/language-context";

/**
 * FinalCTA — closing argument with urgency.
 */
export function FinalCTA() {
  const t = useT();

  return (
    <section
      id="download"
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 dark:from-blue-800 dark:via-blue-900 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="final-cta-headline"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0, transparent 35%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.25) 0, transparent 40%)",
        }}
      />
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

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs sm:text-sm font-semibold text-white">
            <Zap className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            <span>{t.finalCta.badge}</span>
          </span>
        </Reveal>

        <Reveal delay={60}>
          <h2
            id="final-cta-headline"
            className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.2]"
          >
            {t.finalCta.titleLead}{" "}
            <span className="bg-gradient-to-l from-amber-300 to-emerald-300 bg-clip-text text-transparent">
              {t.finalCta.titleHighlight}
            </span>
            {t.finalCta.titleTail}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {t.finalCta.body}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/937000000000"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-4 text-base sm:text-lg font-bold text-blue-700 shadow-premium-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <WhatsAppIcon className="h-5 w-5 text-emerald-600" />
              <span>{t.finalCta.primaryCta}</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-7 py-4 text-base sm:text-lg font-bold text-white hover:bg-white/20 transition-all duration-300"
            >
              {t.finalCta.secondaryCta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-blue-100">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-300" strokeWidth={3} />
              {t.finalCta.reassurance1}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              {t.finalCta.reassurance2}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-300" />
              {t.finalCta.reassurance3}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
