"use client";

import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * SolutionIntro — the "aha" transition.
 */
export function SolutionIntro() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-slate-950 py-10 sm:py-10"
      aria-labelledby="solution-headline"
    >
      <div
        aria-hidden
        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 h-[30rem] w-[60rem] bg-blue-100/30 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                {t.solution.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2
                id="solution-headline"
                className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
              >
                {t.solution.title}{" "}
                <span className="text-gradient-blue">{t.solution.highlight}</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.solution.body}
              </p>
            </Reveal>

            <ul className="mt-8 space-y-3.5">
              {[t.solution.promise1, t.solution.promise2, t.solution.promise3, t.solution.promise4].map((promise, i) => (
                <Reveal key={i} delay={180 + i * 60}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                      {promise}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={480}>
              <a
                href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t.solution.cta}
                <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform" />
              </a>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={120}>
            <BeforeAfter
              beforeLabel={t.solution.beforeLabel}
              beforeCaption={t.solution.beforeCaption}
              afterLabel={t.solution.afterLabel}
              afterTitle={t.solution.afterTitle}
              afterDelta={t.solution.afterDelta}
              afterVsLast={t.solution.afterVsLast}
              kpi1Label={t.solution.kpi1}
              kpi2Label={t.solution.kpi2}
              kpi3Label={t.solution.kpi3}
              formatNumber={formatNumber}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({
  beforeLabel,
  beforeCaption,
  afterLabel,
  afterTitle,
  afterDelta,
  afterVsLast,
  kpi1Label,
  kpi2Label,
  kpi3Label,
  formatNumber,
}: {
  beforeLabel: string;
  beforeCaption: string;
  afterLabel: string;
  afterTitle: string;
  afterDelta: string;
  afterVsLast: string;
  kpi1Label: string;
  kpi2Label: string;
  kpi3Label: string;
  formatNumber: (n: number | string) => string;
}) {
  return (
    <div className="relative">
      {/* Before card (faded, slightly rotated) */}
      <div className="absolute -top-30 -right-2 sm:-right-6 w-[88%] rotate-3 z-0">
        <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 p-5 shadow-premium opacity-90">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-full">
              {beforeLabel}
            </span>
            <span className="text-[10px] text-rose-400 dark:text-rose-500">{beforeCaption}</span>
          </div>
          <div className="space-y-2">
            {[1, 1, 0.6, 1, 0.4].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded-full bg-rose-200/70 dark:bg-rose-900/40"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 rounded-md bg-rose-100/60 dark:bg-rose-900/30" />
            ))}
          </div>
        </div>
      </div>

      {/* After card (vibrant, on top) */}
      <div className="relative mt-24 sm:mt-28 z-10">
        <div className="rounded-3xl border-2 border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-900 p-6 shadow-premium-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {afterLabel}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">{formatNumber("1405/03/27")}</span>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{afterTitle}</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-gradient-blue">
                {formatNumber("23,120")} ؋
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-full">
              {afterDelta}
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-1.5 h-16">
            {[40, 55, 48, 68, 62, 82, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: kpi1Label, val: formatNumber("84,500") + " ؋" },
              { label: kpi2Label, val: formatNumber("15,000") + " ؋" },
              { label: kpi3Label, val: formatNumber("1,240") },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 p-2 text-center"
              >
                <p className="text-[9px] text-slate-500 dark:text-slate-400">{k.label}</p>
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100">{k.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
