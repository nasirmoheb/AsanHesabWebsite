"use client";

import {
  Barcode,
  BookOpen,
  Warehouse,
  BarChart3,
  TrendingUp,
  ArrowLeft,
  CheckCircle2,
  Package,
  Boxes,
  CircleDollarSign,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Bento Grid Features.
 */
export function Features() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <section
      id="features"
      className="relative bg-white dark:bg-slate-950 py-20 sm:py-28"
      aria-labelledby="features-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.features.eyebrow}
          eyebrowIcon={Boxes}
          title={t.features.title}
          highlight={t.features.highlight}
          subtitle={t.features.subtitle}
          tone="blue"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Card 1 — Large POS card */}
          <Reveal as="article" className="lg:row-span-2 group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-premium p-6 sm:p-8 hover:shadow-premium-lg transition-all duration-300 h-full">
            <div
              aria-hidden
              className="absolute -top-16 -left-16 h-48 w-48 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-950/10 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-premium">
                  <Barcode className="h-6 w-6" />
                </span>
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 rounded-full px-2.5 py-0.5">
                  {t.features.card1Tag}
                </span>
              </div>
              <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {t.features.card1Title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.features.card1Body}
              </p>

              {/* POS illustration */}
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800/50 dark:to-blue-950/20 border border-slate-100 dark:border-slate-700 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.features.card1SessionLabel}</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {formatNumber("#1240")} · {formatNumber("14:32")}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.features.card1Total}</p>
                    <p className="text-sm font-extrabold text-blue-700 dark:text-blue-300">
                      {formatNumber("8,450")} ؋
                    </p>
                  </div>
                </div>
                <div className="flex h-10 items-stretch gap-0.5 rounded-md bg-white dark:bg-slate-900 p-1.5 overflow-hidden">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-slate-800 dark:bg-slate-200"
                      style={{
                        width: `${[1, 2, 1, 3, 1, 2, 1, 1, 2, 1][i % 10]}px`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between text-[8px] font-mono text-slate-400 dark:text-slate-500">
                  <span>{formatNumber("8 4 210 99011")}</span>
                  <span>SCAN OK ✓</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {[t.features.card1Feature1, t.features.card1Feature2, t.features.card1Feature3].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Card 2 — Medium: Debt notebook */}
          <Reveal as="article" delay={80} className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-premium p-6 sm:p-7 hover:shadow-premium-lg transition-all duration-300 h-full">
            <div
              aria-hidden
              className="absolute -top-12 -left-12 h-32 w-32 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-950/10 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="relative">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-premium">
                <BookOpen className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {t.features.card2Title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.features.card2Body}
              </p>
              <div className="mt-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 p-3 space-y-1.5">
                {[
                  { name: t.testimonials.t1Name.split(" ").slice(0, 2).join(" "), amt: formatNumber("2,500") + " ؋" },
                  { name: t.testimonials.t2Name.split(" ").slice(0, 2).join(" "), amt: formatNumber("8,000") + " ؋" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-[11px] bg-white dark:bg-slate-900 rounded-lg px-2.5 py-1.5"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-200">{r.name}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{r.amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 3 — Medium: Smart warehouse */}
          <Reveal as="article" delay={160} className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-premium p-6 sm:p-7 hover:shadow-premium-lg transition-all duration-300 h-full">
            <div
              aria-hidden
              className="absolute -top-12 -left-12 h-32 w-32 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-950/10 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="relative">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-premium">
                <Warehouse className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {t.features.card3Title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.features.card3Body}
              </p>
              <div className="mt-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 p-3 space-y-2">
                {[
                  { name: t.testimonials.t1Role.split(" · ")[0], pct: 78, tone: "bg-emerald-500" },
                  { name: t.testimonials.t2Role.split(" · ")[0], pct: 22, tone: "bg-amber-500" },
                  { name: t.testimonials.t3Role.split(" · ")[0], pct: 56, tone: "bg-blue-500" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-200">{s.name}</span>
                      <span className="text-slate-500 dark:text-slate-400">{formatNumber(s.pct)}٪</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.tone}`}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 4 — Wide: P&L reports */}
          <Reveal as="article" delay={240} className="lg:col-span-3 group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-premium p-6 sm:p-8 hover:shadow-premium-lg transition-all duration-300">
            <div
              aria-hidden
              className="absolute -top-16 -right-16 h-56 w-56 bg-gradient-to-br from-blue-100 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-950/10 rounded-full blur-3xl opacity-70 group-hover:opacity-90 transition-opacity"
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-2">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-200 dark:to-slate-400 text-white dark:text-slate-900 shadow-premium">
                  <BarChart3 className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {t.features.card4Title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.features.card4Body}
                </p>
                <a
                  href="#pricing"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 group/link"
                >
                  {t.features.card4Link}
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover/link:-translate-x-1 rtl:flip" style={{ transform: "scaleX(-1)" }} />
                </a>
              </div>

              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-slate-800/50 dark:to-blue-950/20 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.features.card4Title2}</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-gradient-blue">
                        {formatNumber("23,120")} ؋
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-full">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {formatNumber("+47")}٪
                    </span>
                  </div>

                  <div className="relative h-32 sm:h-40">
                    <div className="absolute inset-0 flex items-end justify-between gap-1.5 sm:gap-2">
                      {[
                        { v: 45 }, { v: 58 }, { v: 50 }, { v: 72 }, { v: 65 }, { v: 88 }, { v: 95 },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                          <div
                            className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400"
                            style={{ height: `${bar.v}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M5,65 L19,55 L33,60 L48,40 L62,42 L76,18 L95,12"
                        fill="none"
                        stroke="rgb(5, 150, 105)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { icon: <CircleDollarSign className="h-3.5 w-3.5" />, label: t.features.card4Kpi1, val: formatNumber("84,500") + " ؋" },
                      { icon: <Package className="h-3.5 w-3.5" />,         label: t.features.card4Kpi2, val: formatNumber("58,380") + " ؋" },
                      { icon: <TrendingUp className="h-3.5 w-3.5" />,      label: t.features.card4Kpi3, val: formatNumber("30.9") + "٪" },
                    ].map((kpi, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 p-2 sm:p-2.5"
                      >
                        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                          {kpi.icon}
                          <span className="text-[9px] sm:text-[10px] font-medium">{kpi.label}</span>
                        </div>
                        <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                          {kpi.val}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
