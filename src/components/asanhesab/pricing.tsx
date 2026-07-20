"use client";

import { Check, X, Star, Download, ShieldCheck, Zap, Lock, Gift } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { Reveal } from "./reveal";
import { CountdownTimer } from "./countdown-timer";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Pricing — 2 cards with bonus bundle and reassurance.
 *
 * Polish pass:
 *  - Removed SectionHeading eyebrow badge; inline heading with solid highlight.
 *  - `text-gradient-blue` on the price number removed (banned). Price is the
 *    most important information on the card — solid text-primary, legible.
 *  - Decorative blur halo behind highlighted card removed (glassmorphism as
 *    default is banned). border-2 + glow-blue shadow differentiates it cleanly.
 *  - CTA solid variant: WhatsApp CTA now links to WhatsApp instead of the
 *    .exe download (was a functional bug — label said واتساپ, href was .exe).
 *  - All CTA variants: focus-visible ring, active:scale-[0.98] added.
 *  - `tones` object: full bg-linear-to-br strings embedded per key for JIT.
 *  - `text-[10px]` ✕ cross on excluded features replaced with X icon (lucide).
 *  - All bg-gradient-* → bg-linear-* (Tailwind v4).
 *  - w-[50rem] → w-200, h-72 kept (standard scale).
 *  - `dir` from language context.
 *  - Unused `Sparkles` import removed.
 */
export function Pricing() {
  const t = useT();
  const { formatNumber, dir } = useLanguage();

  return (
    <section
      id="pricing"
      dir={dir}
      className="relative bg-linear-to-b from-white via-slate-50/40 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="pricing-headline"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-200 bg-blue-100/30 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Inline heading — avoids SectionHeading gradient-text default */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Reveal>
            <h2
              id="pricing-headline"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {t.pricing.title}{" "}
              <span className="text-primary">{t.pricing.highlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {t.pricing.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Countdown timer — limited offer urgency */}
        <div className="mt-8 flex justify-center">
          <CountdownTimer />
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          <Reveal>
            <PricingCard
              tier={t.pricing.freeTier}
              price={formatNumber(t.pricing.freePrice)}
              unit={t.pricing.freeUnit}
              tagline={t.pricing.freeTagline}
              icon={<Download className="h-5 w-5" />}
              iconTone="slate"
              features={[
                { label: t.pricing.freeFeature1, included: true  },
                { label: t.pricing.freeFeature2, included: true  },
                { label: t.pricing.freeFeature3, included: true  },
                { label: t.pricing.freeFeature4, included: true  },
                { label: t.pricing.freeFeature5, included: true  },
                { label: t.pricing.freeFeature6, included: false },
                { label: t.pricing.freeFeature7, included: false },
                { label: t.pricing.freeFeature8, included: false },
                { label: t.pricing.freeFeature9, included: false },
              ]}
              cta={{
                label: t.pricing.freeCta,
                icon: <Download className="h-4 w-4" />,
                variant: "ghost",
                href: "https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe",
              }}
            />
          </Reveal>

          <Reveal delay={120}>
            <PricingCard
              tier={t.pricing.stdTier}
              price={formatNumber(t.pricing.stdPrice)}
              unit={t.pricing.stdUnit}
              tagline={t.pricing.stdTagline}
              icon={<ShieldCheck className="h-5 w-5" />}
              iconTone="blue"
              highlighted
              popularBadge
              bonusNote={t.pricing.stdBonusNote}
              features={[
                { label: t.pricing.freeFeature1, included: true },
                { label: t.pricing.freeFeature2, included: true },
                { label: t.pricing.freeFeature3, included: true },
                { label: t.pricing.freeFeature4, included: true },
                { label: t.pricing.freeFeature5, included: true },
                { label: t.pricing.stdFeature6,  included: true },
                { label: t.pricing.stdFeature7,  included: true },
                { label: t.pricing.stdFeature8,  included: true },
                { label: t.pricing.stdFeature9,  included: true },
              ]}
              cta={{
                label: t.pricing.stdCta,
                icon: <WhatsAppIcon className="h-4 w-4" />,
                variant: "solid",
                // WhatsApp link — label explicitly says واتساپ
                href: "https://wa.me/93700000000",
              }}
            />
          </Reveal>
        </div>

        {/* Bonus bundle */}
        <Reveal delay={180}>
          <div className="mt-8 rounded-2xl border border-blue-200 dark:border-blue-800 bg-linear-to-l from-blue-50 to-emerald-50/50 dark:from-blue-950/30 dark:to-emerald-950/20 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400 to-amber-500 text-white shadow-premium">
                <Gift className="h-5 w-5" aria-hidden />
              </span>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {t.pricing.bonusTitle}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {[t.pricing.bonus1, t.pricing.bonus2, t.pricing.bonus3, t.pricing.bonus4].map((bonus) => (
                    <li key={bonus} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" strokeWidth={3} aria-hidden />
                      {bonus}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reassurance strip */}
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden />
              {t.pricing.reassurance1}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
              {t.pricing.reassurance2}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4 shrink-0 text-slate-600 dark:text-slate-400" aria-hidden />
              {t.pricing.reassurance3}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
              {t.pricing.reassurance4}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────

/*
 * Full gradient strings per key — Tailwind JIT must see the complete class
 * string to generate the gradient stop utilities.
 */
const ICON_TONES = {
  blue:  "bg-linear-to-br from-blue-600 to-blue-700",
  slate: "bg-linear-to-br from-slate-600 to-slate-700",
} as const;

function PricingCard({
  tier,
  price,
  unit,
  tagline,
  icon,
  iconTone,
  features,
  cta,
  highlighted,
  popularBadge,
  bonusNote,
}: {
  tier: string;
  price: string;
  unit: string;
  tagline: string;
  icon: React.ReactNode;
  iconTone: keyof typeof ICON_TONES;
  features: { label: string; included: boolean }[];
  cta: { label: string; icon: React.ReactNode; variant: "solid" | "ghost"; href: string };
  highlighted?: boolean;
  popularBadge?: boolean;
  bonusNote?: string;
}) {
  const t = useT();

  return (
    <article
      className={[
        "relative rounded-3xl p-6 sm:p-8 flex flex-col h-full transition-all duration-300",
        highlighted
          ? "bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-premium-lg lg:-translate-y-3 hover:-translate-y-4 glow-blue"
          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-premium hover:shadow-premium-lg hover:-translate-y-1",
      ].join(" ")}
    >
      {/* Popular badge */}
      {popularBadge && (
        <div className="absolute -top-3.5 inset-e-6 sm:inset-e-8 z-10">
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-400 to-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-premium-lg">
            {/* Purposeful shimmer — single deliberate highlight badge */}
            <span aria-hidden className="absolute inset-0 rounded-full shimmer" />
            <Star className="h-3.5 w-3.5 fill-white relative" aria-hidden />
            <span className="relative">{t.pricing.stdPopular}</span>
          </span>
        </div>
      )}

      {/* Card header */}
      <div className="flex items-start gap-3">
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-premium ${ICON_TONES[iconTone]}`}
          aria-hidden
        >
          {icon}
        </span>
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {tier}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tagline}</p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-2">
        {/*
         * Gradient text removed (banned: bg-clip-text + gradient).
         * Price is the most important signal on this card — solid, legible.
         * Highlighted card → text-primary; free card → slate.
         */}
        <span
          className={`text-4xl sm:text-5xl font-extrabold ${
            highlighted ? "text-primary" : "text-slate-900 dark:text-white"
          }`}
        >
          {price}
        </span>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{unit}</span>
      </div>

      {bonusNote && (
        <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 inline-flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg">
          <Gift className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden />
          {bonusNote}
        </p>
      )}

      <div className="mt-3 h-px bg-slate-100 dark:bg-slate-700" />

      {/* Feature list */}
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li
            key={f.label}
            className={`flex items-start gap-2.5 text-sm ${
              f.included ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"
            }`}
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                f.included
                  ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600"
              }`}
              aria-hidden
            >
              {f.included
                ? <Check className="h-3 w-3" strokeWidth={3} />
                : <X className="h-3 w-3" strokeWidth={2.5} />
              }
            </span>
            <span className={f.included ? "" : "line-through"}>{f.label}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        {cta.variant === "solid" ? (
          <a
            href={cta.href}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium hover:shadow-[0_0_40px_-8px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {cta.icon}
            <span>{cta.label}</span>
          </a>
        ) : (
          <a
            href={cta.href}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3.5 text-base font-bold text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300 active:scale-[0.98] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {cta.icon}
            <span>{cta.label}</span>
          </a>
        )}
      </div>
    </article>
  );
}
