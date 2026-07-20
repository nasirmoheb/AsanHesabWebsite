"use client";

import { Store, Building2, Pill, Factory, ShoppingBag, Truck } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * TrustBar — "Trusted by Afghan businesses" strip with industry icons.
 * Placed right after the hero to establish credibility.
 *
 * Polish pass:
 *  - dir="rtl" hardcode removed — locale direction handled by <html dir> in
 *    LanguageProvider; hardcoding broke English (LTR) visitors
 *  - bg-white / dark:bg-slate-950 → bg-background / border-border tokens
 *  - Title text bumped from text-slate-500 → text-slate-600 for contrast safety margin
 *  - Subtitle text-slate-400 (fails WCAG AA at 12px on white) → text-slate-500
 *    (≈4.0:1) and size raised to text-xs font-medium; still tight, note below
 *  - Icons marked aria-hidden — screen readers no longer announce SVG paths
 *  - Industry labels fixed: no longer borrow strings from wrong namespaces
 *    (footer.linkFeatures, dashboard.sidebar.suppliers). Dedicated ind1-6 keys
 *    added to t.premium.trustBar for all three locales
 *  - Grid items individually Revealed with stagger (not all in one block) —
 *    creates a wave entrance instead of all-at-once
 *  - key={i} → key={ind.id} using stable identifier
 *  - group-hover:scale-110 overflow handled by overflow-visible on grid
 */
export function TrustBar() {
  const t = useT();
  const { formatNumber } = useLanguage();

  const industries = [
    { id: "grocery",       icon: <Store        className="h-5 w-5" aria-hidden />, label: t.premium.trustBar.ind1 },
    { id: "wholesale",     icon: <Building2    className="h-5 w-5" aria-hidden />, label: t.premium.trustBar.ind2 },
    { id: "pharmacy",      icon: <Pill         className="h-5 w-5" aria-hidden />, label: t.premium.trustBar.ind3 },
    { id: "manufacturing", icon: <Factory      className="h-5 w-5" aria-hidden />, label: t.premium.trustBar.ind4 },
    { id: "clothing",      icon: <ShoppingBag  className="h-5 w-5" aria-hidden />, label: t.premium.trustBar.ind5 },
    { id: "logistics",     icon: <Truck        className="h-5 w-5" aria-hidden />, label: t.premium.trustBar.ind6 },
  ];

  return (
    <section
      className="relative bg-background py-10 sm:py-12 border-b border-border"
      aria-label={t.premium.trustBar.title}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <Reveal>
          <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
            {t.premium.trustBar.title}
          </p>
        </Reveal>

        {/* Subtitle — raised from text-slate-400 (fail) to text-slate-500 (pass at 12px) */}
        <Reveal delay={60}>
          <p className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5 mb-8 sm:mb-10">
            {t.premium.trustBar.subtitle} · {formatNumber("100")}+ {t.stats.stat1Label}
          </p>
        </Reveal>

        {/*
         * Grid items staggered individually so each icon enters in sequence
         * (wave effect) rather than all appearing as one block.
         * overflow-visible ensures scale-110 hover doesn't clip at grid edges.
         */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 items-center overflow-visible">
          {industries.map((ind, i) => (
            <Reveal key={ind.id} delay={120 + i * 60}>
              <div className="group flex flex-col items-center gap-2.5 text-center">
                <span className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:scale-110 transition-all duration-200">
                  {ind.icon}
                </span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-tight">
                  {ind.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
