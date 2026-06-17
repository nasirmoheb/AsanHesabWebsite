"use client";

import { useEffect, useRef, useState } from "react";
import { Store, Banknote, TrendingUp, Star } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * StatsBand — animated counters showing social proof.
 * Numbers count up via rAF when scrolled into view.
 */
export function StatsBand() {
  const t = useT();
  const { formatNumber, locale } = useLanguage();

  const stats = [
    { icon: <Store className="h-5 w-5" />,     value: t.stats.stat1Value, suffix: t.stats.stat1Suffix, label: t.stats.stat1Label, tone: "blue" as const },
    { icon: <Banknote className="h-5 w-5" />,  value: t.stats.stat2Value, suffix: t.stats.stat2Suffix, label: t.stats.stat2Label, tone: "emerald" as const },
    { icon: <TrendingUp className="h-5 w-5" />,value: t.stats.stat3Value, suffix: t.stats.stat3Suffix, label: t.stats.stat3Label, tone: "violet" as const },
    { icon: <Star className="h-5 w-5 fill-current" />, value: t.stats.stat4Value, suffix: t.stats.stat4Suffix, label: t.stats.stat4Label, tone: "amber" as const, decimals: 1 },
  ];

  return (
    <section
      className="relative bg-white dark:bg-slate-950 py-12 sm:py-16 border-y border-slate-100 dark:border-slate-800"
      aria-label={t.stats.stat1Label}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <StatItem
              key={i}
              icon={s.icon}
              value={s.value}
              decimals={s.decimals ?? 0}
              suffix={s.suffix}
              label={s.label}
              tone={s.tone}
              formatNumber={formatNumber}
              locale={locale}
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
  formatNumber,
  locale,
}: {
  icon: React.ReactNode;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  tone: "blue" | "emerald" | "violet" | "amber";
  formatNumber: (n: number | string) => string;
  locale: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = false;
    // Defer the reset to avoid synchronous setState in effect body
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
            const duration = 1400;
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
    blue:    { grad: "from-blue-500 to-blue-600",       text: "text-blue-700 dark:text-blue-300" },
    emerald: { grad: "from-emerald-500 to-emerald-600", text: "text-emerald-700 dark:text-emerald-300" },
    violet:  { grad: "from-violet-500 to-violet-600",   text: "text-violet-700 dark:text-violet-300" },
    amber:   { grad: "from-amber-500 to-amber-600",     text: "text-amber-700 dark:text-amber-300" },
  } as const;
  const t = tones[tone];

  return (
    <Reveal>
      <div ref={ref} className="flex flex-col items-center text-center">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${t.grad} text-white shadow-premium`}
        >
          {icon}
        </span>
        <p className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold ${t.text}`}>
          {formatNumber(display.toFixed(decimals))}
          <span className="text-2xl sm:text-3xl">{suffix}</span>
        </p>
        <p className="mt-1 text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </Reveal>
  );
}
