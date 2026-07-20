"use client";

import { BookX, Wallet, FileWarning, Users, ArrowDown } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * PainPoints — problem agitation.
 *
 * Polish pass:
 *  - Replaced identical 4-column card grid with an asymmetric 2×2 bento layout:
 *    two cards per row, first card in each row is wider (2/3) with a prominent
 *    visual accent; the second is narrower (1/3) with a quieter treatment.
 *    This creates visual narrative escalation rather than a feature-list feel.
 *  - Removed eyebrow from SectionHeading (was identical small-caps pattern
 *    across every section — AI grammar). Title stands on its own.
 *  - `dir` driven by language context instead of hardcoded "rtl".
 *  - `mt-25` (non-standard) replaced with `mt-24`.
 *  - Icon containers: kept gradient bg (not gradient text — not banned).
 *  - Body text bumped to text-slate-700 dark:text-slate-200 for contrast on
 *    tinted card backgrounds (was text-slate-600 dark:text-slate-300).
 *  - Hover: added `hover:-translate-y-1` lift alongside shadow.
 *  - Transition bridge arrow: enriched with contextual label and proper aria-hidden.
 *  - SectionHeading replaced with inline heading to avoid the global gradient-text
 *    default that SectionHeading applies when highlightClass falls through.
 */
export function PainPoints() {
  const t = useT();
  const { dir } = useLanguage();

  const pains: {
    icon: React.ReactNode;
    tone: "rose" | "amber" | "violet" | "blue";
    title: string;
    body: string;
    wide?: boolean;
  }[] = [
    { icon: <BookX  className="h-6 w-6" />, tone: "rose",   title: t.pain.card1Title, body: t.pain.card1Body, wide: true  },
    { icon: <FileWarning className="h-6 w-6" />, tone: "amber", title: t.pain.card2Title, body: t.pain.card2Body, wide: false },
    { icon: <Wallet className="h-6 w-6" />, tone: "violet", title: t.pain.card3Title, body: t.pain.card3Body, wide: false },
    { icon: <Users  className="h-6 w-6" />, tone: "blue",   title: t.pain.card4Title, body: t.pain.card4Body, wide: true  },
  ];

  return (
    <section
      dir={dir}
      className="relative bg-linear-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="pain-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading — inline to avoid SectionHeading's gradient-text default */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="pain-headline"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.pain.title}{" "}
              <span className="text-rose-600 dark:text-rose-400">{t.pain.highlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t.pain.subtitle}
            </p>
          </Reveal>
        </div>

        {/*
         * Asymmetric 2-column bento.
         * Row 1: wide card (col-span-2) + narrow card (col-span-1)
         * Row 2: narrow card (col-span-1) + wide card (col-span-2)
         * Alternating wide/narrow creates visual cadence and avoids the
         * identical-card-grid pattern.
         */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Row 1 — card 0 (wide) + card 1 (narrow) */}
          <Reveal className="md:col-span-2">
            <PainCard {...pains[0]} />
          </Reveal>
          <Reveal delay={80}>
            <PainCard {...pains[1]} />
          </Reveal>

          {/* Row 2 — card 2 (narrow) + card 3 (wide) */}
          <Reveal delay={120}>
            <PainCard {...pains[2]} />
          </Reveal>
          <Reveal delay={160} className="md:col-span-2">
            <PainCard {...pains[3]} />
          </Reveal>
        </div>

        {/* Transition bridge — problem → solution */}
        <Reveal delay={200}>
          <div className="mt-24 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span className="h-px w-12 bg-slate-300 dark:bg-slate-700" aria-hidden />
              <span>{t.pain.transition}</span>
              <span className="h-px w-12 bg-slate-300 dark:bg-slate-700" aria-hidden />
            </div>
            <div
              className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white shadow-[0_0_32px_-4px_rgba(37,99,235,0.5)] animate-float-slow"
              aria-hidden
            >
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Pain Card ───────────────────────────────────────────────────────────────

const TONE_STYLES = {
  rose: {
    bg:     "bg-rose-50 dark:bg-rose-950/25",
    border: "border-rose-100/80 dark:border-rose-900/40",
    icon:   "bg-linear-to-br from-rose-500 to-rose-600",
    accent: "bg-rose-500/10 dark:bg-rose-400/10",
    ring:   "ring-rose-200/60 dark:ring-rose-800/40",
  },
  amber: {
    bg:     "bg-amber-50 dark:bg-amber-950/25",
    border: "border-amber-100/80 dark:border-amber-900/40",
    icon:   "bg-linear-to-br from-amber-500 to-amber-600",
    accent: "bg-amber-500/10 dark:bg-amber-400/10",
    ring:   "ring-amber-200/60 dark:ring-amber-800/40",
  },
  violet: {
    bg:     "bg-violet-50 dark:bg-violet-950/25",
    border: "border-violet-100/80 dark:border-violet-900/40",
    icon:   "bg-linear-to-br from-violet-500 to-violet-600",
    accent: "bg-violet-500/10 dark:bg-violet-400/10",
    ring:   "ring-violet-200/60 dark:ring-violet-800/40",
  },
  blue: {
    bg:     "bg-blue-50 dark:bg-blue-950/25",
    border: "border-blue-100/80 dark:border-blue-900/40",
    icon:   "bg-linear-to-br from-blue-500 to-blue-600",
    accent: "bg-blue-500/10 dark:bg-blue-400/10",
    ring:   "ring-blue-200/60 dark:ring-blue-800/40",
  },
} as const;

function PainCard({
  icon,
  tone,
  title,
  body,
  wide,
}: {
  icon: React.ReactNode;
  tone: keyof typeof TONE_STYLES;
  title: string;
  body: string;
  wide?: boolean;
}) {
  const s = TONE_STYLES[tone];

  return (
    <article
      className={[
        "group relative h-full rounded-2xl border overflow-hidden",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-premium",
        s.bg,
        s.border,
        wide ? "p-6 sm:p-8" : "p-6",
      ].join(" ")}
    >
      {/* Subtle corner accent — tinted circle, not a stripe */}
      <div
        aria-hidden
        className={[
          "absolute -top-10 -inset-e-10 h-32 w-32 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity",
          s.accent,
        ].join(" ")}
      />

      <div className="relative">
        {/* Icon */}
        <span
          className={[
            "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
            "text-white shadow-sm",
            s.icon,
          ].join(" ")}
          aria-hidden
        >
          {icon}
        </span>

        {/* Title */}
        <h3
          className={[
            "mt-4 font-extrabold text-slate-900 dark:text-white",
            wide ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
          ].join(" ")}
        >
          {title}
        </h3>

        {/* Body — text-slate-700 for sufficient contrast on tinted bg */}
        <p
          className={[
            "mt-2 leading-relaxed text-slate-700 dark:text-slate-200",
            wide ? "text-base" : "text-sm",
          ].join(" ")}
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {body}
        </p>
      </div>
    </article>
  );
}
