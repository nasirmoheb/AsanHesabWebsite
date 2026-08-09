"use client";

import { Download, Settings, Rocket, ArrowRight } from "lucide-react";
import { DownloadLink } from "./download-link";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * HowItWorks — 3-step process timeline.
 *
 * Polish pass:
 *  - Removed SectionHeading eyebrow badge (same small-caps-pill-above-every-
 *    heading pattern removed from PainPoints and SolutionIntro).
 *  - Replaced SectionHeading (defaults highlightClass to text-gradient-blue,
 *    a banned pattern) with an inline heading block. Highlight uses solid
 *    text-emerald-700 dark:text-emerald-400.
 *  - Step tones object: gradient classes moved to full strings per key so
 *    Tailwind JIT can scan them (same fix as PainPoints icon). Separate
 *    `bg-linear-to-br` prefix removed — now embedded per tone.
 *  - All bg-gradient-* → bg-linear-* (Tailwind v4).
 *  - top-[4.5rem] → top-18.
 *  - Connector line: right/left positional → inset-x-[16.66%] for RTL parity.
 *  - `dir` driven from language context.
 *  - CTA button: bg-linear-to-br, focus-visible ring, active:scale-[0.98],
 *    group + arrow hover translate — matches Hero / SolutionIntro pattern.
 *  - `center` prop removed — was applying the same max-w-xs conditionally
 *    with no meaningful difference. Unified to max-w-xs on all steps.
 *  - Numbers kept: this is a genuine ordered sequence; numbers carry
 *    information (step 1 before step 2 before step 3 is the whole point).
 */
export function HowItWorks() {
  const t = useT();
  const { formatNumber, dir } = useLanguage();

  const steps = [
    {
      index: 1,
      icon: <Download className="h-6 w-6" />,
      title: t.how.step1Title,
      body: t.how.step1Body,
      badge: t.how.step1Badge,
      tone: "blue" as const,
    },
    {
      index: 2,
      icon: <Settings className="h-6 w-6" />,
      title: t.how.step2Title,
      body: t.how.step2Body,
      badge: t.how.step2Badge,
      tone: "violet" as const,
    },
    {
      index: 3,
      icon: <Rocket className="h-6 w-6" />,
      title: t.how.step3Title,
      body: t.how.step3Body,
      badge: t.how.step3Badge,
      tone: "emerald" as const,
    },
  ];

  return (
    <section
      id="how"
      dir={dir}
      className="relative bg-linear-to-b from-white via-blue-50/30 to-white dark:from-slate-950 dark:via-blue-950/10 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="how-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Inline heading — avoids SectionHeading's gradient-text default */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="how-headline"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.how.title}{" "}
              <span className="text-emerald-700 dark:text-emerald-400">
                {t.how.highlight}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t.how.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 sm:mt-20 relative">
          {/*
           * Connector line between step icons.
           * inset-x-[16.66%] is direction-agnostic (replaces right/left) so
           * the line spans correctly in both LTR and RTL layouts.
           * bg-linear-to-l: gradient flows from blue → emerald left to right
           * visually mirroring the step sequence.
           */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-18 inset-x-[16.66%] h-0.5 bg-linear-to-l from-blue-200 dark:from-blue-800 via-blue-400 dark:via-blue-500 to-emerald-300 dark:to-emerald-700"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((s) => (
              <Step
                key={s.index}
                {...s}
                formatNumber={formatNumber}
              />
            ))}
          </ol>
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center gap-3">
            <DownloadLink
              href="https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 px-7 py-3.5 text-base font-bold text-white shadow-premium-lg hover:shadow-[0_0_40px_-8px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.how.cta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </DownloadLink>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.how.ctaReassurance}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────

/*
 * Tone styles: full class strings per key so Tailwind JIT can scan them.
 * Splitting "bg-linear-to-br" + "from-X to-Y" across separate string
 * concatenations prevents the scanner from finding the gradient stops.
 */
const STEP_TONES = {
  blue: {
    grad: "bg-linear-to-br from-blue-600 to-blue-700",
    chip: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",
    dot:  "bg-blue-500",
  },
  violet: {
    grad: "bg-linear-to-br from-violet-600 to-violet-700",
    chip: "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300",
    dot:  "bg-violet-500",
  },
  emerald: {
    grad: "bg-linear-to-br from-emerald-600 to-emerald-700",
    chip: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",
    dot:  "bg-emerald-500",
  },
} as const;

function Step({
  index,
  icon,
  title,
  body,
  badge,
  tone,
  formatNumber,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  badge: string;
  tone: keyof typeof STEP_TONES;
  formatNumber: (n: number | string) => string;
}) {
  const s = STEP_TONES[tone];
  const stepNum = ["۰", "۱", "۲", "۳"][index];

  return (
    <Reveal delay={(index - 1) * 120}>
      <li className="relative flex flex-col items-center text-center">

        {/* Icon container with step number badge */}
        <div className="relative z-10 mb-5">
          <div
            className={`relative inline-flex h-20 w-20 items-center justify-center rounded-3xl text-white shadow-premium-lg ${s.grad}`}
          >
            {icon}
            <span
              className="absolute -top-2 -inset-e-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-extrabold shadow-premium border border-slate-100 dark:border-slate-700"
              aria-hidden
            >
              {stepNum}
            </span>
          </div>
        </div>

        {/* Status chip */}
        <span
          className={`inline-flex items-center gap-1 rounded-full text-[11px] font-bold px-2.5 py-0.5 mb-2 ${s.chip}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
          {badge}
        </span>

        <h3
          className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {title}
        </h3>

        <p
          className="mt-2 max-w-xs text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {body}
        </p>
      </li>
    </Reveal>
  );
}
