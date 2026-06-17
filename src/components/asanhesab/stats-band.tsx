"use client";

import { useEffect, useRef, useState } from "react";
import { Store, Banknote, TrendingUp, Star } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * StatsBand — animated counters showing social proof.
 * Numbers count up when the section enters the viewport.
 *
 * The numbers are illustrative marketing figures and should be
 * replaced with real metrics before production launch.
 */
export function StatsBand() {
  return (
    <section
      dir="rtl"
      className="relative bg-white py-12 sm:py-16 border-y border-slate-100"
      aria-label="آمار موفقیت"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <StatItem
            icon={<Store className="h-5 w-5" />}
            value={5000}
            suffix="+"
            label="دکان فعال"
            tone="blue"
          />
          <StatItem
            icon={<Banknote className="h-5 w-5" />}
            value={120}
            suffix="M+ ؋"
            label="افغانی ثبت شده"
            tone="emerald"
          />
          <StatItem
            icon={<TrendingUp className="h-5 w-5" />}
            value={47}
            suffix="٪"
            label="میانگین رشد فایده"
            tone="violet"
          />
          <StatItem
            icon={<Star className="h-5 w-5 fill-current" />}
            value={4.9}
            decimals={1}
            suffix=""
            label="امتیاز کاربران"
            tone="amber"
          />
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
}: {
  icon: React.ReactNode;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  tone: "blue" | "emerald" | "violet" | "amber";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

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
              // easeOutCubic
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
    blue:    "from-blue-500 to-blue-600 text-blue-700",
    emerald: "from-emerald-500 to-emerald-600 text-emerald-700",
    violet:  "from-violet-500 to-violet-600 text-violet-700",
    amber:   "from-amber-500 to-amber-600 text-amber-700",
  } as const;
  const t = tones[tone];
  const [gradient, textTone] = t.split(" text-");

  const formatFa = (n: number) => {
    const fixed = n.toFixed(decimals);
    // Convert ASCII digits to Persian
    return fixed.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);
  };

  return (
    <Reveal>
      <div ref={ref} className="flex flex-col items-center text-center">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-premium`}
        >
          {icon}
        </span>
        <p className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold num-fa text-${textTone}`}>
          {formatFa(display)}
          <span className="text-2xl sm:text-3xl">{suffix}</span>
        </p>
        <p className="mt-1 text-sm sm:text-base font-medium text-slate-500">{label}</p>
      </div>
    </Reveal>
  );
}
