"use client";

import { Check, X, Minus, Sparkles, Trophy } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Comparison — feature comparison table.
 *
 * Polish pass:
 *  - Removed SectionHeading eyebrow + replaced component with inline heading
 *    (avoids text-gradient-blue default on `highlight`; eyebrow pill removed
 *    to break the identical small-caps pattern across all sections).
 *  - `id="comparison-headline"` now wired on the actual <h2> so
 *    aria-labelledby on <section> resolves correctly (was dangling before).
 *  - `dir` driven from language context.
 *  - Dead `cols` array removed.
 *  - Mobile sub-labels: text-[9px] → text-[11px] (below 10px floor).
 *  - Sticky label cell on mobile: hover state now matches row hover
 *    (bg-slate-50/bg-slate-900/60 on group-hover rather than fixed white).
 *  - Unused `FileSpreadsheet` import removed.
 *  - aria-label on Cell values now uses the translated text from context
 *    rather than hardcoded English "yes"/"no"/"partial".
 */
export function Comparison() {
  const t = useT();
  const { dir } = useLanguage();

  const rows: {
    label: string;
    asan: boolean | "partial";
    a: boolean | "partial";
    b: boolean | "partial";
    c: boolean | "partial";
  }[] = [
    { label: t.comparison.row1, asan: true,      a: false,     b: "partial", c: "partial" },
    { label: t.comparison.row2, asan: true,      a: false,     b: false,     c: "partial" },
    { label: t.comparison.row3, asan: true,      a: false,     b: "partial", c: true      },
    { label: t.comparison.row4, asan: true,      a: false,     b: false,     c: "partial" },
    { label: t.comparison.row5, asan: true,      a: false,     b: false,     c: false     },
    { label: t.comparison.row6, asan: true,      a: false,     b: false,     c: "partial" },
    { label: t.comparison.row7, asan: true,      a: "partial", b: true,      c: true      },
    { label: t.comparison.row8, asan: true,      a: false,     b: false,     c: false     },
  ];

  /* Competitor column headers — shared between desktop and mobile */
  const competitors = [
    { label: t.comparison.colA, sub: t.comparison.colA_sub },
    { label: t.comparison.colB, sub: t.comparison.colB_sub },
    { label: t.comparison.colC, sub: t.comparison.colC_sub },
  ];

  const yesNoPartial = {
    yes:     t.comparison.yes,
    no:      t.comparison.no,
    partial: t.comparison.partial,
  };

  return (
    <section
      id="comparison"
      dir={dir}
      className="relative bg-slate-50 dark:bg-slate-900/50 py-20 sm:py-28 overflow-hidden"
      aria-labelledby="comparison-headline"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-96 bg-blue-400/10 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Inline heading — avoids SectionHeading gradient-text default */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="comparison-headline"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.comparison.title}{" "}
              <span className="text-primary">{t.comparison.highlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t.comparison.subtitle}
            </p>
          </Reveal>
        </div>

        {/* ── Desktop table ── */}
        <Reveal delay={120} className="mt-12 hidden md:block">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium-lg bg-white dark:bg-slate-950">
            <table className="w-full">
              <thead>
                <tr>
                  {/* Feature label column */}
                  <th className="w-[42%] px-6 py-4 text-start" />

                  {/* AsanHesab — highlighted column */}
                  <th className="px-4 py-4 text-center relative">
                    <div
                      aria-hidden
                      className="absolute top-0 inset-x-0 h-0.5 bg-blue-600 dark:bg-blue-500 rounded-t-sm"
                    />
                    <div className="inline-flex flex-col items-center gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-3 py-1 text-xs font-bold shadow-sm">
                        <Sparkles className="h-3 w-3" aria-hidden />
                        {t.comparison.colAsan}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        <Trophy className="h-3 w-3 fill-amber-400 text-amber-500" aria-hidden />
                        {t.comparison.colAsanTag}
                      </span>
                    </div>
                  </th>

                  {/* Competitor columns */}
                  {competitors.map((col) => (
                    <th key={col.label} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {col.label}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          {col.sub}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 text-start">
                      {row.label}
                    </td>
                    <td className="px-4 py-3.5 text-center bg-blue-50/50 dark:bg-blue-950/20">
                      <Cell value={row.asan} highlight labels={yesNoPartial} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell value={row.a} labels={yesNoPartial} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell value={row.b} labels={yesNoPartial} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell value={row.c} labels={yesNoPartial} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Legend t={yesNoPartial} className="px-6 py-3" />
          </div>
        </Reveal>

        {/* ── Mobile: horizontally scrollable ── */}
        <Reveal delay={120} className="mt-8 md:hidden">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium bg-white dark:bg-slate-950">
            <div className="overflow-x-auto">
              <table className="w-full min-w-95">
                <thead>
                  <tr>
                    {/* Sticky feature label column */}
                    <th className="sticky inset-s-0 z-10 bg-white dark:bg-slate-950 w-[40%] px-4 py-3 text-start" />

                    {/* AsanHesab */}
                    <th className="px-3 py-3 text-center relative min-w-18">
                      <div
                        aria-hidden
                        className="absolute top-0 inset-x-0 h-0.5 bg-blue-600 dark:bg-blue-500"
                      />
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <span className="inline-flex items-center gap-1 rounded-md bg-blue-600 text-white px-2 py-0.5 text-[10px] font-bold">
                          <Sparkles className="h-2.5 w-2.5" aria-hidden />
                          {t.comparison.colAsan}
                        </span>
                        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                          <Trophy className="h-2.5 w-2.5 fill-amber-400 text-amber-500" aria-hidden />
                          {t.comparison.colAsanTag}
                        </span>
                      </div>
                    </th>

                    {/* Competitors */}
                    {competitors.map((col) => (
                      <th key={col.label} className="px-3 py-3 text-center min-w-18">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                            {col.label}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500">
                            {col.sub}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                    >
                      {/*
                       * Sticky label cell: group-hover syncs background with
                       * the row's hover state so it doesn't visually detach.
                       */}
                      <td className="sticky inset-s-0 z-10 bg-white dark:bg-slate-950 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/60 transition-colors px-4 py-3 text-xs font-medium text-slate-700 dark:text-slate-200 text-start">
                        {row.label}
                      </td>
                      <td className="px-3 py-3 text-center bg-blue-50/50 dark:bg-blue-950/20">
                        <Cell value={row.asan} highlight labels={yesNoPartial} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Cell value={row.a} labels={yesNoPartial} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Cell value={row.b} labels={yesNoPartial} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <Cell value={row.c} labels={yesNoPartial} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Legend t={yesNoPartial} className="px-4 py-2.5" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Cell ──────────────────────────────────────────────────────────────────────

function Cell({
  value,
  highlight,
  labels,
}: {
  value: boolean | "partial";
  highlight?: boolean;
  labels: { yes: string; no: string; partial: string };
}) {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          highlight
            ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
            : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
        }`}
        aria-label={labels.yes}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
        aria-label={labels.partial}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600"
      aria-label={labels.no}
    >
      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  );
}

// ─── Legend ────────────────────────────────────────────────────────────────────

function Legend({
  t,
  className,
}: {
  t: { yes: string; no: string; partial: string };
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-end gap-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" aria-hidden>
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
        {t.yes}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400" aria-hidden>
          <Minus className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
        {t.partial}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500" aria-hidden>
          <X className="h-2.5 w-2.5" strokeWidth={2.5} />
        </span>
        {t.no}
      </div>
    </div>
  );
}
