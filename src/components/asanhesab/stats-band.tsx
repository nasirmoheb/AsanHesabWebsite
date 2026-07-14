"use client";

import { useEffect, useRef, useState } from "react";
import { Store, Banknote, TrendingUp, Star } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * StatsBand — animated counters in polished gradient cards.
 * Each stat has its own gradient accent + icon chip + sparkline.
 */
export function StatsBand() {
  const t = useT();
  const { formatNumber, locale } = useLanguage();

  const stats = [
    { icon: <Store className="h-5 w-5" />,            value: t.stats.stat1Value, suffix: t.stats.stat1Suffix, label: t.stats.stat1Label, tone: "blue" as const,    sparkPath: "M0 18 L10 14 L20 16 L30 10 L40 12 L50 6 L60 4" },
    { icon: <Banknote className="h-5 w-5" />,         value: t.stats.stat2Value, suffix: t.stats.stat2Suffix, label: t.stats.stat2Label, tone: "emerald" as const, sparkPath: "M0 16 L10 18 L20 12 L30 14 L40 8 L50 10 L60 2" },
    { icon: <TrendingUp className="h-5 w-5" />,       value: t.stats.stat3Value, suffix: t.stats.stat3Suffix, label: t.stats.stat3Label, tone: "violet" as const,  sparkPath: "M0 20 L10 16 L20 14 L30 8 L40 10 L50 4 L60 0" },
    { icon: <Star className="h-5 w-5 fill-current" />,value: t.stats.stat4Value, suffix: t.stats.stat4Suffix, label: t.stats.stat4Label, tone: "amber" as const,   sparkPath: "M0 12 L10 14 L20 8 L30 10 L40 6 L50 8 L60 4", decimals: 1 },
  ];

  return (
    <section
      className="relative bg-white dark:bg-slate-950 py-14 sm:py-20 border-y border-slate-100 dark:border-slate-800 overflow-hidden"
      aria-label={t.stats.stat1Label}
    >
      {/* Subtle aurora in background */}
      <div aria-hidden className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <StatItem
              key={i}
              icon={s.icon}
              value={s.value}
              decimals={s.decimals ?? 0}
              suffix={s.suffix}
              label={s.label}
              tone={s.tone}
              sparkPath={s.sparkPath}
              formatNumber={formatNumber}
              locale={locale}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  icon,
  value,
  decimals = 0,
  suffix,
  label,
  tone,
  sparkPath,
  formatNumber,
  locale,
  delay,
}: {
  icon: React.ReactNode;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  tone: "blue" | "emerald" | "violet" | "amber";
  sparkPath: string;
  formatNumber: (n: number | string) => string;
  locale: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = false;
    const id = requestAnimationFrame(() => setDisplay(0));
    return () => cancelAnimationFrame(id);
  }, [locale]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(value * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  const tones = {
    blue:    { grad: "from-blue-500 to-blue-600",       text: "text-blue-700 dark:text-blue-300",    glow: "shadow-blue-500/20",    stroke: "rgb(59, 130, 246)",  fill: "rgba(59, 130, 246, 0.1)" },
    emerald: { grad: "from-emerald-500 to-emerald-600", text: "text-emerald-700 dark:text-emerald-300",glow: "shadow-emerald-500/20", stroke: "rgb(16, 185, 129)",  fill: "rgba(16, 185, 129, 0.1)" },
    violet:  { grad: "from-violet-500 to-violet-600",   text: "text-violet-700 dark:text-violet-300", glow: "shadow-violet-500/20",  stroke: "rgb(139, 92, 246)",  fill: "rgba(139, 92, 246, 0.1)" },
    amber:   { grad: "from-amber-500 to-amber-600",     text: "text-amber-700 dark:text-amber-300",   glow: "shadow-amber-500/20",   stroke: "rgb(245, 158, 11)",  fill: "rgba(245, 158, 11, 0.1)" },
  } as const;
  const t = tones[tone];

  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="group relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-premium hover-lift hover:shadow-premium-lg overflow-hidden"
      >
        {/* Decorative corner glow */}
        <div
          aria-hidden
          className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${t.grad} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
        />

        <div className="relative flex items-center justify-between mb-3">
          <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${t.grad} text-white shadow-premium ${t.glow} group-hover:scale-110 transition-transform`}>
            {icon}
          </span>
          {/* Mini sparkline */}
          <svg viewBox="0 0 60 20" className="h-5 w-16 opacity-70" preserveAspectRatio="none" aria-hidden>
            <path d={sparkPath} fill="none" stroke={t.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d={`${sparkPath} L60 20 L0 20 Z`} fill={t.fill} />
          </svg>
        </div>
        <p className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold ${t.text}`}>
          {formatNumber(display.toFixed(decimals))}
          <span className="text-2xl sm:text-3xl">{suffix}</span>
        </p>
        <p className="mt-1 text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </Reveal>
  );
}
