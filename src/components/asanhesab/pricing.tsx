"use client";

import { Check, Star, Sparkles, Download, ShieldCheck, Zap, Lock, Gift } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Pricing — 2 cards with bonus bundle and reassurance.
 */
export function Pricing() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <section
      id="pricing"
      className="relative bg-gradient-to-b from-white via-slate-50/40 to-white dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 py-20 sm:py-28"
      aria-labelledby="pricing-headline"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[50rem] bg-blue-100/30 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          eyebrowIcon={Sparkles}
          title={t.pricing.title}
          highlight={t.pricing.highlight}
          subtitle={t.pricing.subtitle}
          tone="blue"
        />

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
                { label: t.pricing.freeFeature1, included: true },
                { label: t.pricing.freeFeature2, included: true },
                { label: t.pricing.freeFeature3, included: true },
                { label: t.pricing.freeFeature4, included: true },
                { label: t.pricing.freeFeature5, included: true },
                { label: t.pricing.freeFeature6, included: false },
                { label: t.pricing.freeFeature7, included: false },
                { label: t.pricing.freeFeature8, included: false },
                { label: t.pricing.freeFeature9, included: false },
              ]}
              cta={{ label: t.pricing.freeCta, icon: <Download className="h-4 w-4" />, variant: "ghost" }}
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
                { label: t.pricing.stdFeature6, included: true },
                { label: t.pricing.stdFeature7, included: true },
                { label: t.pricing.stdFeature8, included: true },
                { label: t.pricing.stdFeature9, included: true },
              ]}
              cta={{ label: t.pricing.stdCta, icon: <WhatsAppIcon className="h-4 w-4" />, variant: "solid" }}
            />
          </Reveal>
        </div>

        {/* Bonus bundle */}
        <Reveal delay={180}>
          <div className="mt-8 rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-l from-blue-50 to-emerald-50/50 dark:from-blue-950/30 dark:to-emerald-950/20 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-premium">
                <Gift className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  {t.pricing.bonusTitle}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                    {t.pricing.bonus1}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                    {t.pricing.bonus2}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                    {t.pricing.bonus3}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                    {t.pricing.bonus4}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reassurance */}
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              {t.pricing.reassurance1}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t.pricing.reassurance2}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              {t.pricing.reassurance3}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <WhatsAppIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {t.pricing.reassurance4}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
  iconTone: "blue" | "slate";
  features: { label: string; included: boolean }[];
  cta: { label: string; icon: React.ReactNode; variant: "solid" | "ghost" };
  highlighted?: boolean;
  popularBadge?: boolean;
  bonusNote?: string;
}) {
  const t = useT();
  const tones = {
    blue:  "from-blue-600 to-blue-700",
    slate: "from-slate-600 to-slate-700",
  } as const;

  return (
    <article
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col h-full transition-all duration-300 ${
        highlighted
          ? `bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 shadow-premium-lg lg:-translate-y-3 hover:-translate-y-4 glow-blue`
          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-premium hover:shadow-premium-lg hover-lift"
      }`}
    >
      {/* Glow halo behind highlighted card */}
      {highlighted && (
        <div aria-hidden className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-blue-400/30 via-emerald-400/20 to-violet-400/20 blur-xl opacity-70" />
      )}

      {popularBadge && (
        <div className="absolute -top-3.5 right-6 sm:right-8 z-10">
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-premium-lg">
            {/* Shimmer overlay */}
            <span aria-hidden className="absolute inset-0 rounded-full shimmer" />
            <Star className="h-3.5 w-3.5 fill-white relative" />
            <span className="relative">{t.pricing.stdPopular}</span>
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[iconTone]} text-white shadow-premium`}
          >
            {icon}
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">{tier}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tagline}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span
          className={`text-4xl sm:text-5xl font-extrabold ${
            highlighted ? "text-gradient-blue" : "text-slate-900 dark:text-white"
          }`}
        >
          {price}
        </span>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{unit}</span>
      </div>
      {bonusNote && (
        <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 inline-flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg">
          <Gift className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          {bonusNote}
        </p>
      )}
      <div className="mt-3 h-px bg-slate-100 dark:bg-slate-700" />

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
            >
              {f.included ? (
                <Check className="h-3 w-3" strokeWidth={3} />
              ) : (
                <span className="text-[10px]">✕</span>
              )}
            </span>
            <span className={f.included ? "" : "line-through"}>{f.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {cta.variant === "solid" ? (
          <a
            href="#download"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            {cta.icon}
            <span>{cta.label}</span>
          </a>
        ) : (
          <a
            href="#download"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3.5 text-base font-bold text-slate-700 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300"
          >
            {cta.icon}
            <span>{cta.label}</span>
          </a>
        )}
      </div>
    </article>
  );
}
