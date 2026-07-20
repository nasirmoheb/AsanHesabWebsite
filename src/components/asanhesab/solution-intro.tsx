"use client";

import { Check, ArrowRight } from "lucide-react";
import { useId } from "react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * SolutionIntro — the "aha" transition from pain to proof.
 */
export function SolutionIntro() {
  const t = useT();
  const { formatNumber, dir } = useLanguage();

  return (
    <section
      dir={dir}
      className="relative isolate overflow-hidden bg-white dark:bg-slate-950 py-20 sm:py-28"
      aria-labelledby="solution-headline"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 h-120 w-240 bg-blue-100/30 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Copy */}
          <div className="max-w-xl lg:max-w-none">
            <Reveal>
              <h2
                id="solution-headline"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {t.solution.title}{" "}
                <span className="text-primary">{t.solution.highlight}</span>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p
                className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                {t.solution.body}
              </p>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {[
                t.solution.promise1,
                t.solution.promise2,
                t.solution.promise3,
                t.solution.promise4,
              ].map((promise, i) => (
                <Reveal key={i} delay={160 + i * 60}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/60">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                      {promise}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={440}>
              <a
                href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
                className="group mt-9 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium-lg transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_-10px_rgba(37,99,235,0.55)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none sm:w-auto"
              >
                {t.solution.cta}
                <ArrowRight
                  className="h-4 w-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  aria-hidden
                />
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

// Before / After visual

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
  const visualTitleId = useId();

  return (
    <figure
      className="relative overflow-hidden px-1 pt-28 pb-2 sm:overflow-visible sm:px-2 sm:pt-36"
      aria-labelledby={visualTitleId}
    >
      <figcaption id={visualTitleId} className="sr-only">
        {beforeLabel}: {beforeCaption}. {afterLabel}: {afterTitle}, {afterVsLast}.
      </figcaption>

      {/* Before card — faded, tilted, behind */}
      <div
        className="absolute inset-x-2 top-0 z-0 rotate-2 sm:inset-x-6"
        aria-hidden
      >
        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/55 p-4 opacity-80 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/20 sm:p-5">
          <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
            <span className="inline-flex shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
              {beforeLabel}
            </span>
            <span className="min-w-0 truncate text-[11px] font-medium text-rose-600/75 dark:text-rose-300/70">
              {beforeCaption}
            </span>
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

      {/* After card — vivid, on top */}
      <div className="relative z-10">
        <div
          className="rounded-2xl bg-linear-to-br from-white to-blue-50/45 p-5 shadow-premium-lg dark:from-slate-900 dark:to-blue-950/25 sm:p-6"
          aria-hidden
        >

          {/* Header row */}
          <div className="mb-4 flex min-w-0 items-center justify-between gap-3">
            <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              <span className="truncate">{afterLabel}</span>
            </span>
            <span
              dir="ltr"
              className="shrink-0 text-[11px] font-medium text-slate-500 dark:text-slate-400"
            >
              {formatNumber("1405/03/27")}
            </span>
          </div>

          {/* Profit figure — solid color, not gradient text */}
          <div className="flex min-w-0 items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{afterTitle}</p>
              <p
                dir="ltr"
                className="mt-0.5 text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 sm:text-4xl"
              >
                {formatNumber("23,120")} ؋
              </p>
            </div>
            <span
              dir="ltr"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              {afterDelta}
            </span>
          </div>

          {/* Mini bar chart */}
          <div
            className="mt-4 flex h-16 items-end justify-between gap-1.5 border-b border-slate-200/70 pb-1 dark:border-slate-700/60"
            aria-hidden
          >
            {[40, 55, 48, 68, 62, 82, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-linear-to-t from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 text-center">
            {afterVsLast}
          </p>

          {/* KPI grid */}
          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { label: kpi1Label, val: formatNumber("84,500") + " ؋" },
              { label: kpi2Label, val: formatNumber("15,000") + " ؋" },
              { label: kpi3Label, val: formatNumber("1,240") },
            ].map((k) => (
              <div
                key={k.label}
                className="min-w-0 rounded-xl border border-slate-100 bg-white/70 p-2 text-center dark:border-slate-700/80 dark:bg-slate-800/60"
              >
                <p className="truncate text-[11px] leading-tight text-slate-500 dark:text-slate-400">{k.label}</p>
                <p
                  dir="ltr"
                  className="mt-1 truncate text-xs font-bold text-slate-800 dark:text-slate-100"
                >
                  {k.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
