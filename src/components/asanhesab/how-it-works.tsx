"use client";

import { Download, Settings, Rocket, ArrowLeft } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * HowItWorks — 3-step process timeline.
 */
export function HowItWorks() {
  const t = useT();
  const { formatNumber } = useLanguage();

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
      center: true,
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
      className="relative bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-950 dark:via-blue-950/10 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="how-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.how.eyebrow}
          eyebrowIcon={Rocket}
          title={t.how.title}
          highlight={t.how.highlight}
          subtitle={t.how.subtitle}
          tone="emerald"
        />

        <div className="mt-14 sm:mt-20 relative">
          <div
            aria-hidden
            className="hidden lg:block absolute top-[4.5rem] right-[16.66%] left-[16.66%] h-0.5 bg-gradient-to-l from-blue-200 dark:from-blue-800 via-blue-400 dark:via-blue-500 to-emerald-300 dark:to-emerald-700"
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
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-7 py-3.5 text-base font-bold text-white shadow-premium-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              {t.how.cta}
              <ArrowLeft className="h-4 w-4" style={{ transform: "scaleX(-1)" }} />
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.how.ctaReassurance}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Step({
  index,
  icon,
  title,
  body,
  badge,
  tone,
  center,
  formatNumber,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  badge: string;
  tone: "blue" | "violet" | "emerald";
  center?: boolean;
  formatNumber: (n: number | string) => string;
}) {
  const tones = {
    blue:    { grad: "from-blue-600 to-blue-700",      chip: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",          dot: "bg-blue-500" },
    violet:  { grad: "from-violet-600 to-violet-700",  chip: "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300",dot: "bg-violet-500" },
    emerald: { grad: "from-emerald-600 to-emerald-700",chip: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  } as const;
  const tCls = tones[tone];

  const persianStepNum = ["۰", "۱", "۲", "۳"][index];

  return (
    <Reveal delay={(index - 1) * 120}>
      <li className="relative flex flex-col items-center text-center">
        <div className="relative z-10 mb-5">
          <div
            className={`relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${tCls.grad} text-white shadow-premium-lg`}
          >
            {icon}
            <span className="absolute -top-2 -right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-extrabold shadow-premium border border-slate-100 dark:border-slate-700">
              {persianStepNum}
            </span>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full ${tCls.chip} text-[11px] font-bold px-2.5 py-0.5 mb-2`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${tCls.dot}`} />
          {badge}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{title}</h3>
        <p
          className={`mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed ${
            center ? "lg:max-w-xs" : "max-w-xs"
          }`}
        >
          {body}
        </p>
      </li>
    </Reveal>
  );
}
