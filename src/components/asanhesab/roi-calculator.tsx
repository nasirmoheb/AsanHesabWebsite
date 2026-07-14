"use client";

import { useState, useMemo } from "react";
import { Calculator, Clock, Banknote, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * ROICalculator — interactive savings calculator.
 * Users adjust 3 sliders (monthly sales, employees, hours/week on accounting)
 * and see real-time savings: time saved, money saved, extra profit, total annual.
 *
 * Calculations are illustrative marketing estimates:
 *  - Time saved: ~80% reduction in accounting hours
 *  - Money saved: time × hourly rate (assumed 200 AFN/hr)
 *  - Extra profit: 2% of monthly sales recovered from forgotten debts
 */
export function ROICalculator() {
  const t = useT();
  const { formatNumber, locale } = useLanguage();

  const [monthlySales, setMonthlySales] = useState(500000);
  const [employees, setEmployees] = useState(3);
  const [hoursWeek, setHoursWeek] = useState(20);

  const results = useMemo(() => {
    // Time saved: 80% of weekly accounting hours → monthly
    const hoursSavedPerMonth = Math.round(hoursWeek * 0.8 * 4.33);
    // Money saved: hours × 200 AFN/hr
    const moneySavedPerMonth = hoursSavedPerMonth * 200;
    // Extra profit: 2% of monthly sales recovered
    const extraProfitPerMonth = Math.round(monthlySales * 0.02);
    // Total annual
    const totalAnnual = (moneySavedPerMonth + extraProfitPerMonth) * 12;
    return {
      hoursSavedPerMonth,
      moneySavedPerMonth,
      extraProfitPerMonth,
      totalAnnual,
    };
  }, [monthlySales, employees, hoursWeek]);

  return (
    <section
      dir="rtl"
      className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-20 sm:py-28 overflow-hidden"
      aria-labelledby="roi-headline"
    >
      {/* Background decoration */}
      <div aria-hidden className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.premium.roi.eyebrow}
          eyebrowIcon={Calculator}
          title={t.premium.roi.title}
          highlight={t.premium.roi.highlight}
          highlightClass="text-gradient-emerald"
          subtitle={t.premium.roi.subtitle}
          tone="emerald"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Inputs */}
          <Reveal>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-premium h-full">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                {t.premium.roi.eyebrow}
              </h3>

              <div className="space-y-6">
                {/* Monthly sales slider */}
                <SliderInput
                  label={t.premium.roi.monthlySalesLabel}
                  value={monthlySales}
                  min={50000}
                  max={5000000}
                  step={50000}
                  onChange={setMonthlySales}
                  formatValue={(v) => formatNumber(v.toLocaleString()) + " ؋"}
                  tone="emerald"
                />

                {/* Employees slider */}
                <SliderInput
                  label={t.premium.roi.employeesLabel}
                  value={employees}
                  min={1}
                  max={20}
                  step={1}
                  onChange={setEmployees}
                  formatValue={(v) => formatNumber(v.toString())}
                  tone="blue"
                />

                {/* Hours per week slider */}
                <SliderInput
                  label={t.premium.roi.hoursLabel}
                  value={hoursWeek}
                  min={2}
                  max={60}
                  step={1}
                  onChange={setHoursWeek}
                  formatValue={(v) => formatNumber(v.toString()) + " h"}
                  tone="violet"
                />
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal delay={120}>
            <div className="relative rounded-3xl border-2 border-emerald-500 dark:border-emerald-600 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-slate-900 p-6 sm:p-8 shadow-premium-lg h-full overflow-hidden">
              {/* Decorative glow */}
              <div aria-hidden className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />

              <div className="relative">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  {t.premium.roi.vsAfter}
                </h3>

                {/* Result rows */}
                <div className="space-y-4">
                  <ResultRow
                    icon={<Clock className="h-4 w-4" />}
                    label={t.premium.roi.resultTimeSaved}
                    value={formatNumber(results.hoursSavedPerMonth.toLocaleString()) + " h"}
                    tone="violet"
                  />
                  <ResultRow
                    icon={<Banknote className="h-4 w-4" />}
                    label={t.premium.roi.resultMoneySaved}
                    value={formatNumber(results.moneySavedPerMonth.toLocaleString()) + " ؋"}
                    tone="blue"
                  />
                  <ResultRow
                    icon={<TrendingUp className="h-4 w-4" />}
                    label={t.premium.roi.resultExtraProfit}
                    value={formatNumber(results.extraProfitPerMonth.toLocaleString()) + " ؋"}
                    tone="amber"
                  />
                </div>

                {/* Total */}
                <div className="mt-6 pt-6 border-t border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {t.premium.roi.resultTotal}
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-gradient-emerald animate-count-pop" key={results.totalAnnual}>
                      {formatNumber(results.totalAnnual.toLocaleString())}
                    </span>
                    <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">؋</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-premium glow-emerald hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t.premium.roi.cta}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  tone,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
  tone: "emerald" | "blue" | "violet";
}) {
  const tones = {
    emerald: { accent: "accent-emerald-500", text: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    blue:    { accent: "accent-blue-500",    text: "text-blue-700 dark:text-blue-300",       bg: "bg-blue-50 dark:bg-blue-950/30" },
    violet:  { accent: "accent-violet-500",  text: "text-violet-700 dark:text-violet-300",   bg: "bg-violet-50 dark:bg-violet-950/30" },
  } as const;
  const t = tones[tone];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
        <span className={`inline-flex items-center gap-1 rounded-lg ${t.bg} px-2.5 py-1 text-xs font-bold ${t.text} num-fa`}>
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer ${t.accent}`}
        aria-label={label}
      />
      <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1 num-fa">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

function ResultRow({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "violet" | "blue" | "amber";
}) {
  const tones = {
    violet: "bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300",
    blue:   "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    amber:  "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300",
  } as const;
  const t = tones[tone];

  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700">
      <div className="flex items-center gap-2 min-w-0">
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${t}`}>
          {icon}
        </span>
        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{label}</span>
      </div>
      <span className={`text-sm sm:text-base font-bold ${t} num-fa shrink-0`} dir="ltr">{value}</span>
    </div>
  );
}
