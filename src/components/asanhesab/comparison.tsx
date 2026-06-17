"use client";

import { Check, X, Minus, FileSpreadsheet, BookX, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useT } from "./i18n/language-context";

/**
 * Comparison — side-by-side table.
 */
export function Comparison() {
  const t = useT();

  const rows: { label: string; asan: boolean | "partial"; excel: boolean | "partial"; paper: boolean | "partial" }[] = [
    { label: t.comparison.row1,  asan: true,  excel: "partial", paper: false },
    { label: t.comparison.row2,  asan: true,  excel: false,    paper: "partial" },
    { label: t.comparison.row3,  asan: true,  excel: "partial", paper: false },
    { label: t.comparison.row4,  asan: true,  excel: "partial", paper: false },
    { label: t.comparison.row5,  asan: true,  excel: "partial", paper: false },
    { label: t.comparison.row6,  asan: true,  excel: false,    paper: "partial" },
    { label: t.comparison.row7,  asan: true,  excel: false,    paper: "partial" },
    { label: t.comparison.row8,  asan: true,  excel: true,     paper: true },
    { label: t.comparison.row9,  asan: true,  excel: false,    paper: false },
    { label: t.comparison.row10, asan: true,  excel: false,    paper: true },
  ];

  return (
    <section
      className="relative bg-white dark:bg-slate-950 py-20 sm:py-28"
      aria-labelledby="comparison-headline"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.comparison.eyebrow}
          eyebrowIcon={FileSpreadsheet}
          title={t.comparison.title}
          highlight={t.comparison.highlight}
          subtitle={t.comparison.subtitle}
          tone="blue"
        />

        {/* Desktop table */}
        <Reveal delay={120}>
          <div className="mt-12 hidden md:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-premium">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-900/60">
                  <th scope="col" className="text-right p-4 font-bold text-slate-700 dark:text-slate-200 w-1/2">
                    {t.comparison.row1.split(" ")[0]}…
                  </th>
                  <th scope="col" className="p-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white px-3 py-1 text-xs font-bold shadow-premium">
                        <Sparkles className="h-3.5 w-3.5" />
                        {t.comparison.colAsan}
                      </span>
                      <span className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold">{t.comparison.colAsanTag}</span>
                    </div>
                  </th>
                  <th scope="col" className="p-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200 text-xs font-bold">
                        <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        {t.comparison.colExcel}
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="p-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-200 text-xs font-bold">
                        <BookX className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        {t.comparison.colPaper}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white dark:bg-slate-950" : "bg-slate-50/40 dark:bg-slate-900/30"}
                  >
                    <td className="p-4 text-right text-slate-700 dark:text-slate-200 font-medium">{row.label}</td>
                    <td className="p-4 text-center bg-blue-50/40 dark:bg-blue-950/20">
                      <Cell value={row.asan} highlight />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.excel} />
                    </td>
                    <td className="p-4 text-center">
                      <Cell value={row.paper} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile stacked cards */}
        <div className="mt-12 md:hidden space-y-4">
          {rows.map((row, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-premium">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">{row.label}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-2">
                    <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 mb-1">{t.comparison.colAsan}</p>
                    <Cell value={row.asan} highlight />
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">{t.comparison.colExcel}</p>
                    <Cell value={row.excel} />
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1">{t.comparison.colPaper}</p>
                    <Cell value={row.paper} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ value, highlight }: { value: boolean | "partial"; highlight?: boolean }) {
  if (value === true) {
    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          highlight ? "bg-emerald-500 text-white" : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300"
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
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300"
        aria-label="partial"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
      aria-label="no"
    >
      <X className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
  );
}
