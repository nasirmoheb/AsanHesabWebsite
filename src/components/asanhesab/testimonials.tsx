"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Testimonials — 3 cards with avatars, ratings, and quotes.
 */
export function Testimonials() {
  const t = useT();
  const { formatNumber } = useLanguage();

  const testimonials = [
    { name: t.testimonials.t1Name, role: t.testimonials.t1Role, initials: getInitials(t.testimonials.t1Name), tone: "blue" as const, stars: 5, quote: t.testimonials.t1Quote },
    { name: t.testimonials.t2Name, role: t.testimonials.t2Role, initials: getInitials(t.testimonials.t2Name), tone: "emerald" as const, stars: 5, quote: t.testimonials.t2Quote },
    { name: t.testimonials.t3Name, role: t.testimonials.t3Role, initials: getInitials(t.testimonials.t3Name), tone: "violet" as const, stars: 5, quote: t.testimonials.t3Quote },
  ];

  return (
    <section
      className="relative bg-gradient-to-b from-slate-50/60 to-white dark:from-slate-900/50 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="testimonials-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          eyebrowIcon={Star}
          title={t.testimonials.title}
          highlight={t.testimonials.highlight}
          subtitle={t.testimonials.subtitle}
          tone="amber"
        />

        <Reveal delay={80}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">{formatNumber(t.testimonials.ratingAvg)}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">{t.testimonials.ratingCount}</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((tc, i) => (
            <Reveal key={tc.name} delay={i * 120}>
              <TestimonialCard {...tc} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-premium">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { stat: t.testimonials.trust1Stat, label: t.testimonials.trust1Label },
                { stat: t.testimonials.trust2Stat, label: t.testimonials.trust2Label },
                { stat: t.testimonials.trust3Stat, label: t.testimonials.trust3Label },
                { stat: t.testimonials.trust4Stat, label: t.testimonials.trust4Label },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gradient-blue">
                    {s.stat}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function getInitials(name: string): string {
  // For Persian/Pashto names, take first letters of first two words
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) {
    return parts[0][0] + "." + parts[1][0];
  }
  return name.slice(0, 2);
}

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
  tone: "blue" | "emerald" | "violet";
  stars: number;
  quote: string;
}) {
  const tones = {
    blue:    "from-blue-600 to-blue-700",
    emerald: "from-emerald-600 to-emerald-700",
    violet:  "from-violet-600 to-violet-700",
  } as const;

  return (
    <article className="relative h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col">
      <Quote className="absolute top-5 left-5 h-10 w-10 text-slate-100 dark:text-slate-800" aria-hidden />

      <div className="relative flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < stars
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700"
            }`}
          />
        ))}
      </div>

      <p className="relative text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed flex-1">
        «{quote}»
      </p>

      <div className="relative mt-6 pt-5 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${tones[tone]} text-white font-bold text-sm shadow-premium`}
        >
          {initials}
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
        </div>
      </div>
    </article>
  );
}
