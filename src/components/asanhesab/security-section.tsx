"use client";

import { Lock, Cloud, WifiOff, KeyRound, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useT } from "./i18n/language-context";

/**
 * SecuritySection — dedicated trust block for security & compliance.
 * Addresses the #1 concern for accounting software: "Is my data safe?"
 *
 * 4 cards: AES-256 Encryption, Cloud Backup, Offline Operation, No Lock-in
 * Plus a bottom row of trust badges (ISO-style, even if illustrative).
 */
export function SecuritySection() {
  const t = useT();

  const cards = [
    { icon: <Lock className="h-6 w-6" />,        tone: "blue" as const,    title: t.premium.security.card1Title, body: t.premium.security.card1Body },
    { icon: <Cloud className="h-6 w-6" />,       tone: "emerald" as const, title: t.premium.security.card2Title, body: t.premium.security.card2Body },
    { icon: <WifiOff className="h-6 w-6" />,     tone: "violet" as const,  title: t.premium.security.card3Title, body: t.premium.security.card3Body },
    { icon: <KeyRound className="h-6 w-6" />,    tone: "amber" as const,   title: t.premium.security.card4Title, body: t.premium.security.card4Body },
  ];

  return (
    <section
      dir="rtl"
      className="relative bg-white dark:bg-slate-950 py-20 sm:py-28 overflow-hidden"
      aria-labelledby="security-headline"
    >
      {/* Subtle background pattern */}
      <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.premium.security.eyebrow}
          eyebrowIcon={ShieldCheck}
          title={t.premium.security.title}
          highlight={t.premium.security.highlight}
          highlightClass="text-gradient-blue"
          subtitle={t.premium.security.subtitle}
          tone="blue"
        />

        {/* 4 security cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <SecurityCard {...c} />
            </Reveal>
          ))}
        </div>

        {/* Trust badges row */}
        <Reveal delay={400}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              { icon: <ShieldCheck className="h-4 w-4" />, label: "AES-256" },
              { icon: <Lock className="h-4 w-4" />,         label: "End-to-End Encrypted" },
              { icon: <Cloud className="h-4 w-4" />,       label: "Daily Backup" },
              { icon: <WifiOff className="h-4 w-4" />,     label: "100% Offline" },
              { icon: <KeyRound className="h-4 w-4" />,    label: "You Own Your Data" },
            ].map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                <span className="text-emerald-600 dark:text-emerald-400">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SecurityCard({
  icon,
  tone,
  title,
  body,
}: {
  icon: React.ReactNode;
  tone: "blue" | "emerald" | "violet" | "amber";
  title: string;
  body: string;
}) {
  const tones = {
    blue:    { grad: "from-blue-500 to-blue-600",       bg: "bg-blue-50 dark:bg-blue-950/30",     border: "border-blue-100 dark:border-blue-900/50" },
    emerald: { grad: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30",border: "border-emerald-100 dark:border-emerald-900/50" },
    violet:  { grad: "from-violet-500 to-violet-600",   bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-100 dark:border-violet-900/50" },
    amber:   { grad: "from-amber-500 to-amber-600",     bg: "bg-amber-50 dark:bg-amber-950/30",   border: "border-amber-100 dark:border-amber-900/50" },
  } as const;
  const t = tones[tone];

  return (
    <article className={`group relative h-full rounded-2xl border ${t.border} ${t.bg} p-6 hover-lift hover:shadow-premium transition-all duration-300 overflow-hidden`}>
      {/* Decorative corner glow */}
      <div
        aria-hidden
        className={`absolute -top-12 -left-12 h-32 w-32 rounded-full bg-gradient-to-br ${t.grad} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
      />
      <span className={`relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${t.grad} text-white shadow-premium group-hover:scale-110 transition-transform`}>
        {icon}
      </span>
      <h3 className="relative mt-4 text-lg font-extrabold text-slate-900 dark:text-white">{title}</h3>
      <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{body}</p>
    </article>
  );
}
