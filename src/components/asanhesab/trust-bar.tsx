"use client";

import { Store, Building2, Pill, Factory, ShoppingBag, Truck } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * TrustBar — "Trusted by Afghan businesses" strip with industry icons.
 * Placed right after the hero to establish credibility.
 *
 * Uses generic industry icons (since we don't have real client logos)
 * arranged in a clean horizontal bar with a centered title.
 */
export function TrustBar() {
  const t = useT();
  const { formatNumber } = useLanguage();

  const industries = [
    { icon: <Store className="h-5 w-5" />,        label: t.audiences.tab1 },
    { icon: <Building2 className="h-5 w-5" />,    label: t.audiences.tab2 },
    { icon: <Pill className="h-5 w-5" />,         label: t.audiences.tab3 },
    { icon: <Factory className="h-5 w-5" />,      label: t.testimonials.trust2Label },
    { icon: <ShoppingBag className="h-5 w-5" />,  label: t.footer.linkFeatures },
    { icon: <Truck className="h-5 w-5" />,        label: t.dashboard.sidebar.suppliers },
  ];

  return (
    <section
      dir="rtl"
      className="relative bg-white dark:bg-slate-950 py-10 sm:py-12 border-b border-slate-100 dark:border-slate-800"
      aria-label={t.premium.trustBar.title}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t.premium.trustBar.title}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-1 mb-6 sm:mb-8">
            {t.premium.trustBar.subtitle} · {formatNumber("۵٬۰۰۰")}+ {t.stats.stat1Label}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 items-center">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:scale-110 transition-all">
                  {ind.icon}
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {ind.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
