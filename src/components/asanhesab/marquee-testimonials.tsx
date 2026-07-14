"use client";

import { Star, Quote } from "lucide-react";
import { Reveal } from "./reveal";
import { useT } from "./i18n/language-context";

/**
 * MarqueeTestimonials — horizontally scrolling mini-testimonials.
 * Adds dynamic social proof between sections.
 *
 * Uses CSS animation (marquee) with duplicated content for seamless loop.
 * Pauses on hover.
 */
export function MarqueeTestimonials() {
  const t = useT();

  // Short snippets derived from existing testimonials
  const items = [
    { quote: t.testimonials.t1Quote.split("۔")[0] + "…", name: t.testimonials.t1Name, role: t.testimonials.t1Role, tone: "blue" as const },
    { quote: t.testimonials.t2Quote.split("۔")[0] + "…", name: t.testimonials.t2Name, role: t.testimonials.t2Role, tone: "emerald" as const },
    { quote: t.testimonials.t3Quote.split("۔")[0] + "…", name: t.testimonials.t3Name, role: t.testimonials.t3Role, tone: "violet" as const },
    { quote: t.testimonials.t1Quote.split("،")[0] + "…", name: t.testimonials.t1Name, role: t.testimonials.t1Role, tone: "amber" as const },
  ];

  // Duplicate for seamless loop
  const looped = [...items, ...items];

  const tones = {
    blue:    "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    violet:  "from-violet-500 to-violet-600",
    amber:   "from-amber-500 to-amber-600",
  } as const;

  return (
    <section
      dir="rtl"
      className="relative bg-slate-50 dark:bg-slate-900/50 py-12 sm:py-16 overflow-hidden border-y border-slate-100 dark:border-slate-800"
      aria-label={t.premium.marquee.title}
    >
      {/* Fade edges */}
      <div aria-hidden className="absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none" />
      <div aria-hidden className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <Reveal>
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t.premium.marquee.title}
          </p>
        </Reveal>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden group">
        <div
          className="flex shrink-0 gap-4 sm:gap-6 pe-4 sm:pe-6 group-hover:[animation-play-state:paused]"
          style={{
            animation: "marquee-rtl 60s linear infinite",
          }}
        >
          {looped.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-premium p-5"
            >
              <div className="flex items-start gap-3">
                <Quote className="h-6 w-6 text-slate-200 dark:text-slate-700 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed line-clamp-2 mb-3">
                    «{item.quote}»
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${tones[item.tone]} text-white text-[10px] font-bold`}>
                      {item.name.split(" ").slice(0, 2).map(w => w[0]).join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes for marquee */}
      <style>{`
        @keyframes marquee-rtl {
          0%   { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </section>
  );
}
