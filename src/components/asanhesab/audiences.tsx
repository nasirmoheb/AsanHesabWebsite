"use client";

import { useState } from "react";
import { Store, Boxes, Pill, Check, ArrowLeft } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * Audiences — interactive tabs for different user types.
 */
export function Audiences() {
  const [active, setActive] = useState<0 | 1 | 2>(0);
  const t = useT();
  const { formatNumber } = useLanguage();

  const tabs = [
    {
      id: 0,
      key: "shopkeeper",
      label: t.audiences.tab1,
      icon: <Store className="h-4 w-4" />,
      title: t.audiences.panel1Title,
      body: t.audiences.panel1Body,
      features: [t.audiences.panel1Feature1, t.audiences.panel1Feature2, t.audiences.panel1Feature3, t.audiences.panel1Feature4],
      cta: t.audiences.panel1Cta,
      visual: <ShopkeeperMockup />,
      tone: "blue" as const,
    },
    {
      id: 1,
      key: "wholesaler",
      label: t.audiences.tab2,
      icon: <Boxes className="h-4 w-4" />,
      title: t.audiences.panel2Title,
      body: t.audiences.panel2Body,
      features: [t.audiences.panel2Feature1, t.audiences.panel2Feature2, t.audiences.panel2Feature3, t.audiences.panel2Feature4],
      cta: t.audiences.panel2Cta,
      visual: <WholesalerMockup />,
      tone: "emerald" as const,
    },
    {
      id: 2,
      key: "pharmacist",
      label: t.audiences.tab3,
      icon: <Pill className="h-4 w-4" />,
      title: t.audiences.panel3Title,
      body: t.audiences.panel3Body,
      features: [t.audiences.panel3Feature1, t.audiences.panel3Feature2, t.audiences.panel3Feature3, t.audiences.panel3Feature4],
      cta: t.audiences.panel3Cta,
      visual: <PharmacistMockup />,
      tone: "violet" as const,
    },
  ];

  const activeTab = tabs[active];
  const toneClasses = {
    blue:    { active: "bg-blue-600 text-white",            soft: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300",            icon: "" },
    emerald: { active: "bg-emerald-600 text-white",         soft: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300",icon: "" },
    violet:  { active: "bg-violet-600 text-white",          soft: "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300",  icon: "" },
  } as const;
  const tCls = toneClasses[activeTab.tone];

  return (
    <section
      id="audiences"
      className="relative bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/50 py-20 sm:py-28"
      aria-labelledby="audiences-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className={`inline-flex items-center gap-1.5 rounded-full border border-current/10 ${tCls.soft} px-3 py-1 text-xs font-semibold`}>
              {activeTab.icon}
              {t.audiences.eyebrow}
            </span>
            <h2
              id="audiences-headline"
              className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]"
            >
              {t.audiences.title}{" "}
              <span className="text-gradient-blue">{t.audiences.highlight}</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.audiences.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 sm:mt-12 flex justify-center">
            <div
              role="tablist"
              aria-label={t.audiences.eyebrow}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1.5 shadow-premium"
            >
              {tabs.map((tab) => {
                const isActive = active === tab.id;
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.key}`}
                    id={`tab-${tab.key}`}
                    onClick={() => setActive(tab.id as 0 | 1 | 2)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? `${tCls.active} shadow-premium`
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`panel-${activeTab.key}`}
          aria-labelledby={`tab-${activeTab.key}`}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          <Reveal key={`copy-${active}`} delay={100}>
            <div>
              <span className={`inline-flex items-center gap-1.5 rounded-full ${tCls.soft} px-3 py-1 text-xs font-bold`}>
                {activeTab.icon}
                {activeTab.label}
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {activeTab.title}
              </h3>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeTab.body}
              </p>
              <ul className="mt-6 space-y-3">
                {activeTab.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tCls.soft}`}>
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {activeTab.cta}
                <ArrowLeft className="h-4 w-4" style={{ transform: "scaleX(-1)" }} />
              </a>
            </div>
          </Reveal>

          <Reveal key={`visual-${active}`} delay={180}>
            <div className="relative">
              <div
                aria-hidden
                className={`absolute -inset-6 -z-10 rounded-3xl ${tCls.soft} opacity-50 blur-2xl`}
              />
              {activeTab.visual}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----- Mini visual mockups per audience ----- */

function MockShell({ children }: { children: React.ReactNode }) {
  const t = useT();
  const { formatNumber } = useLanguage();
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-premium-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="mr-auto text-[10px] text-slate-400 dark:text-slate-500">
          {t.brand.name} · {formatNumber("1405/03/27")}
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function ShopkeeperMockup() {
  const t = useT();
  const { formatNumber } = useLanguage();
  return (
    <MockShell>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.features.card1SessionLabel}</p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{formatNumber("#1240")} · {formatNumber("14:32")}</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
          ✓
        </span>
      </div>
      <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold">
              A
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{t.audiences.tab1}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{formatNumber("84210990")}</p>
            </div>
          </div>
          <p className="text-xs font-bold text-blue-700 dark:text-blue-300">{formatNumber("550")} ؋</p>
        </div>
      </div>
      <ul className="space-y-1.5 mb-3">
        {[
          { n: t.testimonials.t1Role.split(" · ")[0], q: formatNumber("×2"), a: formatNumber("1,700") + " ؋" },
          { n: t.testimonials.t2Role.split(" · ")[0], q: formatNumber("×3"), a: formatNumber("240") + " ؋" },
          { n: t.testimonials.t3Role.split(" · ")[0], q: formatNumber("×1"), a: formatNumber("320") + " ؋" },
        ].map((i, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between text-[11px] bg-white dark:bg-slate-900 rounded-md px-2 py-1.5 border border-slate-100 dark:border-slate-700"
          >
            <span className="font-medium text-slate-700 dark:text-slate-200">{i.n}</span>
            <span className="text-slate-400 dark:text-slate-500">{i.q}</span>
            <span className="font-bold text-slate-800 dark:text-slate-100">{i.a}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.features.card1Total}</span>
        <span className="text-lg font-extrabold text-gradient-blue">{formatNumber("8,450")} ؋</span>
      </div>
      <button className="mt-3 w-full rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-bold py-2.5">
        {t.features.card1Feature1}
      </button>
    </MockShell>
  );
}

function WholesalerMockup() {
  const t = useT();
  const { formatNumber } = useLanguage();
  const branches = [
    { name: t.footer.contactLocation,                       items: formatNumber("1,240"), val: formatNumber("890,000") + " ؋", pct: 78 },
    { name: t.testimonials.t2Role.split(" · ")[1] || "B",   items: formatNumber("680"),   val: formatNumber("420,000") + " ؋", pct: 52 },
    { name: t.testimonials.t3Role.split(" · ")[1] || "C",   items: formatNumber("320"),   val: formatNumber("210,000") + " ؋", pct: 28 },
  ];
  return (
    <MockShell>
      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-3">{t.audiences.panel2Feature1}</p>
      <ul className="space-y-2.5">
        {branches.map((b, i) => (
          <li key={i} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{b.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{b.items}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">{b.val}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-l from-emerald-500 to-emerald-400"
                style={{ width: `${b.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-2.5 text-center">
          <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.solution.afterTitle}</p>
          <p className="text-sm font-extrabold text-gradient-blue">{formatNumber("23,120")} ؋</p>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-2.5 text-center">
          <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.stats.stat3Label}</p>
          <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">{formatNumber("+47")}٪</p>
        </div>
      </div>
    </MockShell>
  );
}

function PharmacistMockup() {
  const t = useT();
  const { formatNumber } = useLanguage();
  return (
    <MockShell>
      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-3">{t.audiences.panel3Title}</p>
      <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 mb-3 flex items-start gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs">
          ⚠
        </span>
        <div>
          <p className="text-[11px] font-bold text-amber-800 dark:text-amber-200">{t.audiences.panel3Feature1}</p>
          <p className="text-[10px] text-amber-700 dark:text-amber-300 mt-0.5">{t.audiences.panel3Feature2}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { c: "OTC", count: formatNumber("120"), tone: "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300" },
          { c: "Rx",  count: formatNumber("85"),  tone: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300" },
          { c: "Cold",count: formatNumber("12"),  tone: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300" },
        ].map((cat, i) => (
          <div key={i} className={`rounded-lg ${cat.tone} p-2.5 text-center`}>
            <p className="text-[10px] font-medium opacity-80">{cat.c}</p>
            <p className="text-base font-extrabold">{cat.count}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mb-1.5">{t.audiences.panel3Feature4}</p>
      <ul className="space-y-1">
        {[
          { n: t.audiences.panel3Title, sold: formatNumber("48"), stock: formatNumber("12"), low: false },
          { n: t.audiences.tab3,        sold: formatNumber("36"), stock: formatNumber("24"), low: false },
          { n: t.audiences.panel3Cta,   sold: formatNumber("28"), stock: formatNumber("8"),  low: true  },
        ].map((m, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-[11px] bg-white dark:bg-slate-900 rounded-md px-2 py-1.5 border border-slate-100 dark:border-slate-700"
          >
            <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[40%]">{m.n}</span>
            <span className="text-slate-400 dark:text-slate-500">{m.sold}</span>
            <span className={`font-bold ${m.low ? "text-amber-600 dark:text-amber-400" : "text-slate-800 dark:text-slate-100"}`}>
              {m.stock}
            </span>
          </li>
        ))}
      </ul>
    </MockShell>
  );
}
