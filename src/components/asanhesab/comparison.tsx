"use client";

import { Check, X, Minus, Sparkles, Trophy, FileSpreadsheet } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useT } from "./i18n/language-context";

export function Comparison() {
  const t = useT();

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

  const cols = [
    { key: "asan", label: t.comparison.colAsan,  sub: t.comparison.colAsanTag, highlight: true  },
    { key: "a",    label: t.comparison.colA,     sub: t.comparison.colA_sub,   highlight: false },
    { key: "b",    label: t.comparison.colB,     sub: t.comparison.colB_sub,   highlight: false },
    { key: "c",    label: t.comparison.colC,     sub: t.comparison.colC_sub,   highlight: false },
  ] as const;

  return (    <section
      className="relative bg-slate-50 dark:bg-slate-900/50 py-20 sm:py-28 overflow-hidden"
      aria-labelledby="comparison-headline"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-400/10 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.comparison.eyebrow}
          eyebrowIcon={FileSpreadsheet}
          title={t.comparison.title}
          highlight={t.comparison.highlight}
          subtitle={t.comparison.subtitle}
          tone="blue"
        />

        {/* ── Desktop table ── */}
        <Reveal delay={120} className="mt-12 hidden md:block">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium-lg bg-white dark:bg-slate-950">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr>
                  {/* Feature column */}
                  <th className="w-[42%] px-6 py-4 text-start" />

                  {/* AsanHesab — highlighted */}
                  <th className="px-4 py-4 text-center relative">
                    {/* Top accent bar */}
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-blue-600 dark:bg-blue-500 rounded-t-sm" />
                    <div className="inline-flex flex-col items-center gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 text-white px-3 py-1 text-xs font-bold shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        {t.comparison.colAsan}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                        <Trophy className="h-3 w-3 fill-amber-400 text-amber-500" />
                        {t.comparison.colAsanTag}
                      </span>
                    </div>
                  </th>

                  {/* Other columns */}
                  {[
                    { label: t.comparison.colA, sub: t.comparison.colA_sub },
                    { label: t.comparison.colB, sub: t.comparison.colB_sub },
                    { label: t.comparison.colC, sub: t.comparison.colC_sub },
                  ].map((col) => (
                    <th key={col.label} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{col.label}</span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">{col.sub}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    {/* Feature label */}
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 text-start">
                      {row.label}
                    </td>

                    {/* AsanHesab cell */}
                    <td className="px-4 py-3.5 text-center bg-blue-50/50 dark:bg-blue-950/20">
                      <Cell value={row.asan} highlight />
                    </td>

                    {/* Other cells */}
                    <td className="px-4 py-3.5 text-center"><Cell value={row.a} /></td>
                    <td className="px-4 py-3.5 text-center"><Cell value={row.b} /></td>
                    <td className="px-4 py-3.5 text-center"><Cell value={row.c} /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Legend */}
            <div className="flex items-center justify-end gap-5 px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
              <LegendItem icon="check"   label={t.comparison.yes}     />
              <LegendItem icon="partial" label={t.comparison.partial} />
              <LegendItem icon="x"       label={t.comparison.no}      />
            </div>
          </div>
        </Reveal>

        {/* ── Mobile: horizontally scrollable table ── */}
        <Reveal delay={120} className="mt-8 md:hidden">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-premium bg-white dark:bg-slate-950">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[380px]">
                {/* Header */}
                <thead>
                  <tr>
                    <th className="sticky start-0 z-10 bg-white dark:bg-slate-950 w-[40%] px-4 py-3 text-start" />

                    {/* AsanHesab */}
                    <th className="px-3 py-3 text-center relative min-w-[72px]">
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-blue-600 dark:bg-blue-500" />
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <span className="inline-flex items-center gap-1 rounded-md bg-blue-600 text-white px-2 py-0.5 text-[10px] font-bold">
                          <Sparkles className="h-2.5 w-2.5" />
                          {t.comparison.colAsan}
                        </span>
                        <span className="text-[9px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                          <Trophy className="h-2.5 w-2.5 fill-amber-400 text-amber-500" />
                          {t.comparison.colAsanTag}
                        </span>
                      </div>
                    </th>

                    {/* Other cols */}
                    {[
                      { label: t.comparison.colA, sub: t.comparison.colA_sub },
                      { label: t.comparison.colB, sub: t.comparison.colB_sub },
                      { label: t.comparison.colC, sub: t.comparison.colC_sub },
                    ].map((col) => (
                      <th key={col.label} className="px-3 py-3 text-center min-w-[72px]">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{col.label}</span>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500">{col.sub}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
                      <td className="sticky start-0 z-10 bg-white dark:bg-slate-950 px-4 py-3 text-xs font-medium text-slate-700 dark:text-slate-200 text-start">
                        {row.label}
                      </td>
                      <td className="px-3 py-3 text-center bg-blue-50/50 dark:bg-blue-950/20">
                        <Cell value={row.asan} highlight />
                      </td>
                      <td className="px-3 py-3 text-center"><Cell value={row.a} /></td>
                      <td className="px-3 py-3 text-center"><Cell value={row.b} /></td>
                      <td className="px-3 py-3 text-center"><Cell value={row.c} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-4 px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
              <LegendItem icon="check"   label={t.comparison.yes}     />
              <LegendItem icon="partial" label={t.comparison.partial} />
              <LegendItem icon="x"       label={t.comparison.no}      />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Cell ── */
function Cell({ value, highlight }: { value: boolean | "partial"; highlight?: boolean }) {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          highlight
            ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
            : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
        }`}
        aria-label="yes"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
        aria-label="partial"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600"
      aria-label="no"
    >
      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  );
}

/* ── Legend item ── */
function LegendItem({ icon, label }: { icon: "check" | "partial" | "x"; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      {icon === "check"   && <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"><Check  className="h-2.5 w-2.5" strokeWidth={3} /></span>}
      {icon === "partial" && <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-100  dark:bg-amber-900/40  text-amber-600  dark:text-amber-400" ><Minus  className="h-2.5 w-2.5" strokeWidth={3} /></span>}
      {icon === "x"       && <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-100  dark:bg-slate-800       text-slate-400  dark:text-slate-500" ><X      className="h-2.5 w-2.5" strokeWidth={2.5} /></span>}
      {label}
    </div>
  );
}
