"use client";

import { useCallback, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import {
  Store,
  Boxes,
  Smartphone,
  Check,
  ArrowRight,
  Users,
  AlertCircle,
  Barcode,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useLanguage, useT } from "./i18n/language-context";
import type { Dict } from "./i18n/dictionary";

const DOWNLOAD_URL =
  "https://github.com/nasirmoheb/AsanHesab/releases/download/v1.0.0-beta/AsanHesab-1.0.0-Setup.exe";

const balanceText = { textWrap: "balance" } as CSSProperties;
const prettyText = { textWrap: "pretty" } as CSSProperties;

type TabId = 0 | 1 | 2;
type Tone = "blue" | "emerald" | "violet";

const toneStyles = {
  blue: {
    active: "bg-blue-600 text-white shadow-premium",
    soft: "bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
    check: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    cta: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-600",
    orb: "bg-blue-500/10 dark:bg-blue-400/10",
    bar: "bg-blue-500",
  },
  emerald: {
    active: "bg-emerald-600 text-white shadow-premium",
    soft: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    check: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    cta: "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-600",
    orb: "bg-emerald-500/10 dark:bg-emerald-400/10",
    bar: "bg-emerald-500",
  },
  violet: {
    active: "bg-violet-600 text-white shadow-premium",
    soft: "bg-violet-50 text-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
    check: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
    cta: "bg-violet-600 hover:bg-violet-700 focus-visible:ring-violet-600",
    orb: "bg-violet-500/10 dark:bg-violet-400/10",
    bar: "bg-violet-500",
  },
} as const;

/**
 * Audiences — interactive tabs for shopkeeper, wholesaler, and mobile shop.
 */
export function Audiences() {
  const [active, setActive] = useState<TabId>(0);
  const t = useT();
  const { dir } = useLanguage();
  const a = t.audiences;

  const tabs: {
    id: TabId;
    key: string;
    label: string;
    icon: ReactNode;
    title: string;
    body: string;
    features: string[];
    cta: string;
    tone: Tone;
    visual: (copy: Dict["audiences"]) => ReactNode;
  }[] = [
    {
      id: 0,
      key: "shopkeeper",
      label: a.tab1,
      icon: <Store className="h-4 w-4" aria-hidden />,
      title: a.panel1Title,
      body: a.panel1Body,
      features: [a.panel1Feature1, a.panel1Feature2, a.panel1Feature3, a.panel1Feature4],
      cta: a.panel1Cta,
      tone: "blue",
      visual: (copy) => <ShopkeeperMockup copy={copy} />,
    },
    {
      id: 1,
      key: "wholesaler",
      label: a.tab2,
      icon: <Boxes className="h-4 w-4" aria-hidden />,
      title: a.panel2Title,
      body: a.panel2Body,
      features: [a.panel2Feature1, a.panel2Feature2, a.panel2Feature3, a.panel2Feature4],
      cta: a.panel2Cta,
      tone: "emerald",
      visual: (copy) => <WholesalerMockup copy={copy} />,
    },
    {
      id: 2,
      key: "mobile",
      label: a.tab3,
      icon: <Smartphone className="h-4 w-4" aria-hidden />,
      title: a.panel3Title,
      body: a.panel3Body,
      features: [a.panel3Feature1, a.panel3Feature2, a.panel3Feature3, a.panel3Feature4],
      cta: a.panel3Cta,
      tone: "violet",
      visual: (copy) => <MobileStoreMockup copy={copy} />,
    },
  ];

  const activeTab = tabs[active];
  const tone = toneStyles[activeTab.tone];

  const handleTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: TabId) => {
      const prev = dir === "rtl" ? 1 : -1;
      const next = dir === "rtl" ? -1 : 1;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((((index + next + 3) % 3) as TabId));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((((index + prev + 3) % 3) as TabId));
      } else if (e.key === "Home") {
        e.preventDefault();
        setActive(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActive(2);
      }
    },
    [dir]
  );

  return (
    <section
      id="audiences"
      dir={dir}
      className="relative bg-linear-to-b from-white via-slate-50/40 to-white py-20 dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 sm:py-28"
      aria-labelledby="audiences-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          headlineId="audiences-headline"
          eyebrow={a.eyebrow}
          eyebrowIcon={Users}
          title={a.title}
          highlight={a.highlight}
          subtitle={a.subtitle}
          tone="emerald"
        />

        <Reveal delay={120}>
          <div className="mt-10 flex justify-center sm:mt-12">
            <div
              role="tablist"
              aria-label={a.tablistLabel}
              className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-premium dark:border-slate-700 dark:bg-slate-900"
            >
              {tabs.map((tab) => {
                const isActive = active === tab.id;
                const tabTone = toneStyles[tab.tone];
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.key}`}
                    id={`tab-${tab.key}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
                      isActive
                        ? tabTone.active
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
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
          className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div
            key={`copy-${active}`}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:fill-mode-both motion-reduce:animate-none"
          >
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${tone.soft}`}
            >
              {activeTab.icon}
              {activeTab.label}
            </span>
            <h3
              className="mt-4 text-2xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl"
              style={balanceText}
            >
              {activeTab.title}
            </h3>
            <p
              className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200"
              style={prettyText}
            >
              {activeTab.body}
            </p>
            <ul className="mt-6 space-y-3">
              {activeTab.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone.check}`}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-100 sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={DOWNLOAD_URL}
              className={`mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold text-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none ${tone.cta}`}
            >
              {activeTab.cta}
              <ArrowRight
                className="h-4 w-4 transition-transform rtl:rotate-180"
                aria-hidden
              />
            </a>
          </div>

          <div
            key={`visual-${active}`}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500 motion-safe:delay-100 motion-safe:fill-mode-both motion-reduce:animate-none"
          >
            <div className="relative">
              <div
                aria-hidden
                className={`absolute -inset-6 -z-10 rounded-3xl opacity-50 blur-2xl ${tone.orb}`}
              />
              {activeTab.visual(a)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockShell({ children }: { children: ReactNode }) {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-premium-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800/50">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden />
        <span className="ms-auto text-[10px] text-slate-500 dark:text-slate-400 num-fa">
          {t.brand.name} · {formatNumber("1405/03/27")}
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function ShopkeeperMockup({ copy }: { copy: Dict["audiences"] }) {
  const { formatNumber } = useLanguage();

  const items = [
    { name: copy.mock1Item1, qty: "×2", price: "1,700" },
    { name: copy.mock1Item2, qty: "×1", price: "850" },
    { name: copy.mock1Item3, qty: "×3", price: "450" },
  ];

  return (
    <MockShell>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            {copy.mock1Customer}
          </p>
          <p dir="ltr" className="text-sm font-bold text-slate-800 dark:text-slate-100 num-fa">
            #{formatNumber("1240")} · {formatNumber("14:32")}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          {copy.mock1Status}
        </span>
      </div>

      <div className="mb-3 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            <Barcode className="h-3.5 w-3.5" aria-hidden />
          </span>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{copy.tab1}</p>
        </div>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between gap-2 rounded-md border border-slate-100 bg-white px-2 py-1.5 text-[11px] dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="truncate font-medium text-slate-700 dark:text-slate-200">
                {item.name}
              </span>
              <span className="shrink-0 text-slate-500 num-fa">{formatNumber(item.qty)}</span>
              <span dir="ltr" className="shrink-0 font-bold text-blue-700 dark:text-blue-300 num-fa">
                {formatNumber(item.price)} ؋
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
          {copy.mock1Print}
        </span>
        <span dir="ltr" className="text-lg font-extrabold text-blue-700 dark:text-blue-400 num-fa">
          {formatNumber("8,450")} ؋
        </span>
      </div>
    </MockShell>
  );
}

function WholesalerMockup({ copy }: { copy: Dict["audiences"] }) {
  const { formatNumber } = useLanguage();

  const branches = [
    { name: copy.mock2Branch1, items: "1,240", val: "890,000", pct: 78 },
    { name: copy.mock2Branch2, items: "680", val: "420,000", pct: 52 },
    { name: copy.mock2Branch3, items: "320", val: "210,000", pct: 28 },
  ];

  return (
    <MockShell>
      <p className="mb-3 text-xs font-bold text-slate-800 dark:text-slate-100">
        {copy.mock2Header}
      </p>
      <ul className="space-y-2.5">
        {branches.map((branch, i) => (
          <li
            key={branch.name}
            className="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 num-fa">
                  {formatNumber(i + 1)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                    {branch.name}
                  </p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400">
                    {formatNumber(branch.items)} {copy.mock2ItemsLabel}
                  </p>
                </div>
              </div>
              <span dir="ltr" className="shrink-0 text-xs font-bold text-emerald-800 dark:text-emerald-300 num-fa">
                {formatNumber(branch.val)} ؋
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${branch.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-2.5 text-center dark:border-blue-900/40 dark:bg-blue-950/40">
          <p className="text-[10px] text-slate-600 dark:text-slate-400">{copy.mock2KpiProfit}</p>
          <p dir="ltr" className="text-sm font-extrabold text-blue-800 dark:text-blue-300 num-fa">
            {formatNumber("23,120")} ؋
          </p>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-2.5 text-center dark:border-emerald-900/40 dark:bg-emerald-950/40">
          <p className="text-[10px] text-slate-600 dark:text-slate-400">{copy.mock2KpiGrowth}</p>
          <p dir="ltr" className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300 num-fa">
            {formatNumber("+47")}%
          </p>
        </div>
      </div>
    </MockShell>
  );
}

function MobileStoreMockup({ copy }: { copy: Dict["audiences"] }) {
  const { formatNumber } = useLanguage();

  const categories = [
    { label: copy.mock3CatOtc, count: "42", tone: "bg-violet-100 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300" },
    { label: copy.mock3CatRx, count: "186", tone: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300" },
    { label: copy.mock3CatCold, count: "64", tone: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300" },
  ];

  const devices = [
    { name: copy.mock3Med1, sold: "12", stock: "3", low: true },
    { name: copy.mock3Med2, sold: "8", stock: "5", low: false },
    { name: copy.mock3Med3, sold: "24", stock: "18", low: false },
  ];

  return (
    <MockShell>
      <p className="mb-3 text-xs font-bold text-slate-800 dark:text-slate-100">
        {copy.mock3Header}
      </p>

      <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
        <div>
          <p className="text-[11px] font-bold text-amber-900 dark:text-amber-200">
            {copy.mock3AlertTitle}
          </p>
          <p className="mt-0.5 text-[10px] text-amber-800 dark:text-amber-300">
            {copy.mock3AlertSub}
          </p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        {categories.map((cat) => (
          <div key={cat.label} className={`rounded-lg p-2.5 text-center ${cat.tone}`}>
            <p className="text-[10px] font-medium opacity-90">{cat.label}</p>
            <p className="text-base font-extrabold num-fa">{formatNumber(cat.count)}</p>
          </div>
        ))}
      </div>

      <p className="mb-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300">
        {copy.mock3ListHeader}
      </p>
      <ul className="space-y-1">
        {devices.map((device) => (
          <li
            key={device.name}
            className="flex items-center justify-between gap-2 rounded-md border border-slate-100 bg-white px-2 py-1.5 text-[11px] dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="min-w-0 flex-1 truncate font-medium text-slate-800 dark:text-slate-100">
              {device.name}
            </span>
            <span className="shrink-0 text-slate-500 num-fa">{formatNumber(device.sold)}</span>
            <span
              className={`shrink-0 font-bold num-fa ${
                device.low ? "text-amber-700 dark:text-amber-400" : "text-slate-800 dark:text-slate-100"
              }`}
            >
              {device.low ? copy.mock3Low : formatNumber(device.stock)}
            </span>
          </li>
        ))}
      </ul>
    </MockShell>
  );
}
