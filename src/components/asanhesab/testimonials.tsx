"use client";

import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Testimonials — 3 cards with avatars, ratings, and quotes.
 *
 * Polish pass:
 *  - Removed SectionHeading eyebrow; inline heading with solid highlight.
 *  - text-gradient-blue on trust stats removed (banned). Stats are the
 *    strongest credibility signal on the page — solid text-primary.
 *  - Hero-metric template (big number, small label, 4-up grid) reworked:
 *    stats now appear as an inline proof strip with context labels rather
 *    than isolated metric blocks.
 *  - TestimonialCard tones object: full bg-linear-to-br strings per key
 *    so Tailwind JIT can scan gradient stop utilities.
 *  - Verified badge: duplicate ✓ character removed (icon + text was redundant).
 *  - text-[10px] on verified badge → text-[11px].
 *  - -right-12 decorative corner → -inset-e-12 for RTL.
 *  - left-4 on Quote watermark → start-4 for RTL.
 *  - bg-gradient-to-b/br → bg-linear-to-b/br (Tailwind v4).
 *  - dir from language context.
 */
export function Testimonials() {
  const t = useT();
  const { formatNumber, dir } = useLanguage();

  const testimonials = [
    { name: t.testimonials.t1Name, role: t.testimonials.t1Role, initials: getInitials(t.testimonials.t1Name), tone: "blue" as const,    stars: 5, quote: t.testimonials.t1Quote },
    { name: t.testimonials.t2Name, role: t.testimonials.t2Role, initials: getInitials(t.testimonials.t2Name), tone: "emerald" as const, stars: 5, quote: t.testimonials.t2Quote },
    { name: t.testimonials.t3Name, role: t.testimonials.t3Role, initials: getInitials(t.testimonials.t3Name), tone: "violet" as const,  stars: 5, quote: t.testimonials.t3Quote },
  ];

  const trustStats = [
    { stat: t.testimonials.trust1Stat, label: t.testimonials.trust1Label },
    { stat: t.testimonials.trust2Stat, label: t.testimonials.trust2Label },
    { stat: t.testimonials.trust3Stat, label: t.testimonials.trust3Label },
    { stat: t.testimonials.trust4Stat, label: t.testimonials.trust4Label },
  ];

  return (
    <section
      dir={dir}
      className="relative bg-linear-to-b from-slate-50/60 to-white dark:from-slate-900/50 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="testimonials-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Inline heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="testimonials-headline"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.testimonials.title}{" "}
              <span className="text-amber-600 dark:text-amber-400">{t.testimonials.highlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t.testimonials.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Aggregate rating */}
        <Reveal delay={80}>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-1" aria-hidden>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              {formatNumber(t.testimonials.ratingAvg)}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {t.testimonials.ratingCount}
            </span>
          </div>
        </Reveal>

        {/* Testimonial cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((tc, i) => (
            <Reveal key={tc.name} delay={i * 120}>
              <TestimonialCard {...tc} />
            </Reveal>
          ))}
        </div>

        {/*
         * Proof strip — replaces the banned hero-metric template (big number,
         * small label, 4-up grid with gradient accent).
         * Now rendered as a horizontal rule strip: stat + separator + label,
         * all inline. Visual weight stays proportional; no number shouts.
         */}
        <Reveal delay={400}>
          <div className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 sm:px-10 py-6 shadow-premium">
            <dl className="flex flex-wrap items-center justify-center gap-x-0 gap-y-5 sm:divide-x sm:divide-slate-200 sm:dark:divide-slate-700">
              {trustStats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center sm:px-8 w-1/2 sm:w-auto"
                >
                  {/*
                   * Gradient text removed (banned). Solid text-primary keeps
                   * the numbers legible and on-brand without decoration.
                   */}
                  <dt className="text-2xl sm:text-3xl font-extrabold text-primary">
                    {s.stat}
                  </dt>
                  <dd className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) return parts[0][0] + "." + parts[1][0];
  return name.slice(0, 2);
}

// Full gradient strings per key — Tailwind JIT must see complete class strings.
const CARD_TONES = {
  blue:    "bg-linear-to-br from-blue-600 to-blue-700",
  emerald: "bg-linear-to-br from-emerald-600 to-emerald-700",
  violet:  "bg-linear-to-br from-violet-600 to-violet-700",
} as const;

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({
  name,
  role,
  initials,
  tone,
  stars,
  quote,
}: {
  name: string;
  role: string;
  initials: string;
  tone: keyof typeof CARD_TONES;
  stars: number;
  quote: string;
}) {
  const { formatNumber } = useLanguage();

  return (
    <article className="group relative h-full rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-premium hover:shadow-premium-lg hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">

      {/* Decorative tinted corner glow — not glassmorphism, just a tint */}
      <div
        aria-hidden
        className={`absolute -top-12 -inset-e-12 h-32 w-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity ${CARD_TONES[tone]}`}
      />

      {/* Large quote watermark */}
      <Quote
        className="absolute top-4 inset-s-4 h-14 w-14 text-slate-100 dark:text-slate-800 group-hover:scale-110 transition-transform"
        aria-hidden
      />

      {/* Stars */}
      <div className="relative flex items-center gap-1 mb-4" aria-label={`${stars} ستاره`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < stars
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700"
            }`}
            aria-hidden
          />
        ))}
        <span className="ms-2 text-xs font-bold text-slate-500 dark:text-slate-400 num-fa" aria-hidden>
          {formatNumber("5.0")}
        </span>
      </div>

      {/* Quote */}
      <p className="relative text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed flex-1"
        style={{ textWrap: "pretty" } as React.CSSProperties}
      >
        «{quote}»
      </p>

      {/* Attribution */}
      <div className="relative mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
        {/* Avatar */}
        <span className="relative shrink-0">
          <span
            className={`absolute -inset-0.5 rounded-full opacity-30 blur-sm ${CARD_TONES[tone]}`}
            aria-hidden
          />
          <span
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-sm shadow-premium ${CARD_TONES[tone]}`}
          >
            {initials}
          </span>
        </span>

        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{role}</p>
        </div>

        {/* Verified badge — icon only, no duplicate ✓ text */}
        <span className="ms-auto inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-full shrink-0">
          <CheckCircle2 className="h-3 w-3" aria-hidden />
          <span className="sr-only">تأیید شده</span>
        </span>
      </div>
    </article>
  );
}
