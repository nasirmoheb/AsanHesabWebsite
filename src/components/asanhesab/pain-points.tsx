"use client";

import { BookX, Wallet, FileWarning, Users, ArrowDown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useT } from "./i18n/language-context";

/**
 * PainPoints — problem agitation.
 */
export function PainPoints() {
  const t = useT();

  const pains = [
    { icon: <BookX className="h-6 w-6" />,        tone: "rose" as const,   title: t.pain.card1Title, body: t.pain.card1Body },
    { icon: <FileWarning className="h-6 w-6" />,  tone: "amber" as const,  title: t.pain.card2Title, body: t.pain.card2Body },
    { icon: <Wallet className="h-6 w-6" />,       tone: "violet" as const, title: t.pain.card3Title, body: t.pain.card3Body },
    { icon: <Users className="h-6 w-6" />,        tone: "blue" as const,   title: t.pain.card4Title, body: t.pain.card4Body },
  ];

  return (
    <section
      dir="rtl"
      className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="pain-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.pain.eyebrow}
          eyebrowIcon={FileWarning}
          title={t.pain.title}
          highlight={t.pain.highlight}
          highlightClass="text-rose-600 dark:text-rose-400"
          subtitle={t.pain.subtitle}
          tone="amber"
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <PainCard {...p} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-25 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
              {t.pain.transition}
              <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-premium-lg animate-float-slow">
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PainCard({
  icon,
  tone,
  title,
  body,
}: {
  icon: React.ReactNode;
  tone: "rose" | "amber" | "violet" | "blue";
  title: string;
  body: string;
}) {
  const tones = {
    rose:   { bg: "bg-rose-50 dark:bg-rose-950/30",    border: "border-rose-100 dark:border-rose-900/50",    icon: "from-rose-500 to-rose-600" },
    amber:  { bg: "bg-amber-50 dark:bg-amber-950/30",  border: "border-amber-100 dark:border-amber-900/50",  icon: "from-amber-500 to-amber-600" },
    violet: { bg: "bg-violet-50 dark:bg-violet-950/30",border: "border-violet-100 dark:border-violet-900/50",icon: "from-violet-500 to-violet-600" },
    blue:   { bg: "bg-blue-50 dark:bg-blue-950/30",    border: "border-blue-100 dark:border-blue-900/50",    icon: "from-blue-500 to-blue-600" },
  } as const;
  const t = tones[tone];

  return (
    <article
      className={`group relative h-full rounded-2xl border ${t.border} ${t.bg} p-6 transition-all duration-300 hover:shadow-premium`}
    >
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${t.icon} text-white shadow-premium`}
      >
        {icon}
      </span>
      <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{body}</p>
    </article>
  );
}
