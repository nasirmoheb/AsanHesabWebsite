"use client";

import { useState, useEffect } from "react";
import { Timer, Flame } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * CountdownTimer — limited-time offer countdown.
 * Counts down to a target date (default: 3 days from first visit).
 * Persists target in localStorage so it doesn't reset on every visit.
 *
 * Displays: Days / Hours / Minutes / Seconds in pill-style boxes.
 */
export function CountdownTimer() {
  const t = useT();
  const { formatNumber, locale } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Get or set target date (3 days from first visit)
    const STORAGE_KEY = "asanhesab-offer-deadline";
    let deadline = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!deadline) {
      const d = new Date();
      d.setDate(d.getDate() + 3);
      d.setHours(23, 59, 59, 0);
      deadline = d.toISOString();
      try {
        window.localStorage.setItem(STORAGE_KEY, deadline);
      } catch {
        /* ignore */
      }
    }
    const target = new Date(deadline).getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [mounted]);

  const units = [
    { value: timeLeft.days,    label: t.premium.countdown.days },
    { value: timeLeft.hours,   label: t.premium.countdown.hours },
    { value: timeLeft.minutes, label: t.premium.countdown.minutes },
    { value: timeLeft.seconds, label: t.premium.countdown.seconds },
  ];

  if (!mounted) return null;

  return (
    <Reveal>
      <div
        dir="rtl"
        className="relative inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/20 border border-rose-200 dark:border-rose-900/50 px-5 py-3 shadow-premium"
      >
        {/* Pulsing flame icon */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-premium">
            <Flame className="h-4 w-4" />
            <span aria-hidden className="absolute inset-0 rounded-full bg-rose-400 animate-ping-soft opacity-50" />
          </span>
          <div className="text-right">
            <p className="text-xs font-bold text-rose-700 dark:text-rose-300">{t.premium.countdown.title}</p>
            <p className="text-[10px] text-rose-600/80 dark:text-rose-400/80">{t.premium.countdown.subtitle}</p>
          </div>
        </div>

        {/* Timer units */}
        <div className="flex items-center gap-1.5">
          {units.map((u, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="flex flex-col items-center min-w-[2.75rem]">
                <div className="px-2 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm">
                  <span className="text-base sm:text-lg font-extrabold text-rose-700 dark:text-rose-300 num-fa tabular-nums" dir="ltr">
                    {formatNumber(String(u.value).padStart(2, "0"))}
                  </span>
                </div>
                <span className="text-[9px] text-rose-600/70 dark:text-rose-400/70 mt-0.5">{u.label}</span>
              </div>
              {i < units.length - 1 && (
                <span className="text-rose-400 dark:text-rose-600 font-bold text-lg leading-none -mt-3">:</span>
              )}
            </div>
          ))}
        </div>

        <Timer className="h-4 w-4 text-rose-500 dark:text-rose-400 shrink-0 hidden sm:block" />
      </div>
    </Reveal>
  );
}
