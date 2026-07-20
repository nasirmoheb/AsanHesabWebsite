"use client";

import { Star, Quote } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * MarqueeTestimonials — horizontally scrolling mini-testimonials.
 *
 * Polish pass:
 *  - dir from language context (was hardcoded "rtl").
 *  - Avatar tones object: full bg-linear-to-br strings per key (JIT fix).
 *  - text-[10px] role label → text-[11px].
 *  - Uppercase tracking-wider label → sentence-case (was small-caps eyebrow
 *    pattern in plain text form).
 *  - bg-gradient-to-l/r/br → bg-linear-to-l/r/br (Tailwind v4).
 *  - group-hover:[animation-play-state:paused] → group-hover:paused (v4).
 *  - flex-shrink-0 → shrink-0 (v4).
 *  - prefers-reduced-motion: marquee paused (was only paused on hover).
 *  - Marquee direction: translateX(50%) scrolls items toward end (correct for
 *    RTL — content flows right-to-left, new items enter from start/right).
 *    For LTR layouts the direction would need to flip; noted in comment.
 */
export function MarqueeTestimonials() {
  const t = useT();
  const { dir } = useLanguage();

  const items = [
    { quote: t.testimonials.t1Quote.split("۔")[0] + "…", name: t.testimonials.t1Name, role: t.testimonials.t1Role, tone: "blue"    as const },
    { quote: t.testimonials.t2Quote.split("۔")[0] + "…", name: t.testimonials.t2Name, role: t.testimonials.t2Role, tone: "emerald" as const },
    { quote: t.testimonials.t3Quote.split("۔")[0] + "…", name: t.testimonials.t3Name, role: t.testimonials.t3Role, tone: "violet"  as const },
    { quote: t.testimonials.t1Quote.split("،")[0] + "…", name: t.testimonials.t1Name, role: t.testimonials.t1Role, tone: "amber"   as const },
  ];

  // Duplicate for seamless infinite loop (2× content = seamless 50% translate)
  const looped = [...items, ...items];

  return (
    <section
      dir={dir}
      className="relative bg-slate-50 dark:bg-slate-900/50 py-12 sm:py-16 overflow-hidden border-y border-slate-100 dark:border-slate-800"
      aria-label={t.premium.marquee.title}
    >
      {/* Fade edges — mask content at viewport boundaries */}
      <div
        aria-hidden
        className="absolute inset-y-0 inset-e-0 w-24 sm:w-32 bg-linear-to-s from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 inset-s-0 w-24 sm:w-32 bg-linear-to-e from-slate-50 dark:from-slate-900/50 to-transparent z-10 pointer-events-none"
      />

      {/* Section label — sentence case, not uppercase tracking */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <Reveal>
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
            {t.premium.marquee.title}
          </p>
        </Reveal>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden group">
        <div
          className="flex shrink-0 gap-4 sm:gap-6 pe-4 sm:pe-6 motion-reduce:paused group-hover:paused"
          style={{ animation: "marquee-scroll 60s linear infinite" }}
        >
          {looped.map((item, i) => (
            <MarqueeCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/*
       * Keyframe: translateX(50%) scrolls the track toward the end (positive =
       * rightward in CSS). In RTL this moves content left-to-right visually,
       * which matches the reading direction. For LTR the sign would flip to -50%.
       * prefers-reduced-motion: the @media rule overrides animation to none,
       * surfacing the first set of cards as a static row.
       */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group .motion-reduce\\:paused {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Avatar tones ─────────────────────────────────────────────────────────────
// Full gradient strings per key — Tailwind JIT must see the complete class string.

const AVATAR_TONES = {
  blue:    "bg-linear-to-br from-blue-500 to-blue-600",
  emerald: "bg-linear-to-br from-emerald-500 to-emerald-600",
  violet:  "bg-linear-to-br from-violet-500 to-violet-600",
  amber:   "bg-linear-to-br from-amber-500 to-amber-600",
} as const;

// ─── Marquee Card ─────────────────────────────────────────────────────────────

function MarqueeCard({
  item,
}: {
  item: {
    quote: string;
    name: string;
    role: string;
    tone: keyof typeof AVATAR_TONES;
  };
}) {
  return (
    <article className="shrink-0 w-72 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-premium p-5">
      <div className="flex items-start gap-3">
        <Quote className="h-6 w-6 text-slate-200 dark:text-slate-700 shrink-0 mt-0.5" aria-hidden />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-0.5 mb-2" aria-hidden>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-3 w-3 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed line-clamp-2 mb-3"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            «{item.quote}»
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-[11px] font-bold ${AVATAR_TONES[item.tone]}`}
              aria-hidden
            >
              {item.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
              {/* Raised from text-[10px] — below readable floor */}
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.role}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
