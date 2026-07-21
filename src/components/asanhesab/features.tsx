"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  Barcode,
  BookOpen,
  Warehouse,
  BarChart3,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Package,
  CircleDollarSign,
  AlertCircle,
} from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { useLanguage, useT } from "./i18n/language-context";
import type { Dict } from "./i18n/dictionary";

const balanceText = { textWrap: "balance" } as CSSProperties;
const prettyText = { textWrap: "pretty" } as CSSProperties;

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 motion-reduce:transform-none dark:bg-slate-900";

const cardBorders = {
  blue: "border-blue-100/80 hover:border-blue-200 dark:border-blue-900/40 dark:hover:border-blue-800",
  amber: "border-amber-100/80 hover:border-amber-200 dark:border-amber-900/40 dark:hover:border-amber-800",
  emerald:
    "border-emerald-100/80 hover:border-emerald-200 dark:border-emerald-900/40 dark:hover:border-emerald-800",
  slate:
    "border-slate-100 hover:border-blue-200 dark:border-slate-800 dark:hover:border-blue-800",
} as const;

const iconTones = {
  blue: "bg-blue-600 text-white",
  amber: "bg-amber-500 text-white",
  emerald: "bg-emerald-500 text-white",
  slate: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
} as const;

const checkTones = {
  blue: "text-blue-600 dark:text-blue-300",
  amber: "text-amber-600 dark:text-amber-300",
  emerald: "text-emerald-600 dark:text-emerald-300",
  slate: "text-slate-600 dark:text-slate-300",
} as const;

type Tone = keyof typeof cardBorders;
type FeaturesCopy = Dict["features"];

/**
 * Features — concrete product proof after the promise.
 */
export function Features() {
  const t = useT();
  const { formatNumber, dir } = useLanguage();
  const f = t.features;

  return (
    <section
      id="features"
      dir={dir}
      className="relative bg-linear-to-b from-white via-slate-50/40 to-white py-20 dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 sm:py-28"
      aria-labelledby="features-headline"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-blue-50/40 to-transparent dark:from-blue-950/20"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          headlineId="features-headline"
          title={f.title}
          highlight={f.highlight}
          subtitle={f.subtitle}
          tone="blue"
        />

        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {/* POS — wide */}
          <Reveal
            as="article"
            className={`${cardBase} ${cardBorders.blue} lg:col-span-4 sm:p-8`}
          >
            <SoftOrb tone="blue" size="large" />
            <div className="relative flex flex-1 flex-col">
              <div className="flex flex-wrap items-center gap-3">
                <FeatureIcon tone="blue">
                  <Barcode className="h-5 w-5" aria-hidden />
                </FeatureIcon>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:ring-blue-900/50">
                  {f.card1Tag}
                </span>
              </div>

              <h3
                className="mt-5 text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl"
                style={balanceText}
              >
                {f.card1Title}
              </h3>
              <p
                className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base"
                style={prettyText}
              >
                {f.card1Body}
              </p>

              <PointOfSalePanel copy={f} formatNumber={formatNumber} />

              <FeatureList
                tone="blue"
                items={[f.card1Feature1, f.card1Feature2, f.card1Feature3]}
              />
            </div>
          </Reveal>

          {/* Debt — narrow */}
          <Reveal
            as="article"
            delay={80}
            className={`${cardBase} ${cardBorders.amber} lg:col-span-2 sm:p-7`}
          >
            <SoftOrb tone="amber" />
            <div className="relative flex flex-1 flex-col">
              <FeatureTitleRow
                tone="amber"
                icon={<BookOpen className="h-5 w-5" aria-hidden />}
                title={f.card2Title}
              />
              <p
                className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                style={prettyText}
              >
                {f.card2Body}
              </p>

              <DebtPanel copy={f} formatNumber={formatNumber} />

              <FeatureList
                tone="amber"
                items={[f.card2Feature1, f.card2Feature2, f.card2Feature3]}
              />
            </div>
          </Reveal>

          {/* Warehouse — narrow */}
          <Reveal
            as="article"
            delay={160}
            className={`${cardBase} ${cardBorders.emerald} lg:col-span-2 sm:p-7`}
          >
            <SoftOrb tone="emerald" />
            <div className="relative flex flex-1 flex-col">
              <FeatureTitleRow
                tone="emerald"
                icon={<Warehouse className="h-5 w-5" aria-hidden />}
                title={f.card3Title}
              />
              <p
                className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                style={prettyText}
              >
                {f.card3Body}
              </p>

              <InventoryPanel copy={f} formatNumber={formatNumber} />

              <FeatureList
                tone="emerald"
                items={[f.card3Feature1, f.card3Feature2, f.card3Feature3]}
              />
            </div>
          </Reveal>

          {/* Reports — wide */}
          <Reveal
            as="article"
            delay={240}
            className={`${cardBase} ${cardBorders.slate} lg:col-span-4 sm:p-8`}
          >
            <SoftOrb tone="blue" size="large" />
            <div className="relative grid flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-5 lg:gap-8">
              <div className="lg:col-span-2">
                <FeatureTitleRow
                  tone="slate"
                  icon={<BarChart3 className="h-5 w-5" aria-hidden />}
                  title={f.card4Title}
                  large
                />
                <p
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base"
                  style={prettyText}
                >
                  {f.card4Body}
                </p>
                <a
                  href="/reports"
                  className="group/link mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-xl px-1 py-2 text-sm font-bold text-blue-700 transition-colors hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200"
                >
                  {f.card4Link}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>

              <ReportPanel copy={f} formatNumber={formatNumber} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureTitleRow({
  tone,
  icon,
  title,
  large = false,
}: {
  tone: Tone;
  icon: ReactNode;
  title: string;
  large?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <FeatureIcon tone={tone}>{icon}</FeatureIcon>
      <h3
        className={`font-extrabold text-slate-900 dark:text-white ${
          large ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
        }`}
        style={balanceText}
      >
        {title}
      </h3>
    </div>
  );
}

function FeatureIcon({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm ${iconTones[tone]}`}
      aria-hidden
    >
      {children}
    </span>
  );
}

function FeatureList({ tone, items }: { tone: Tone; items: string[] }) {
  return (
    <ul className="mt-auto space-y-2.5 pt-5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
          <CheckCircle2
            className={`mt-0.5 h-4 w-4 shrink-0 ${checkTones[tone]}`}
            aria-hidden
          />
          <span style={prettyText}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SoftOrb({
  tone,
  size = "default",
}: {
  tone: "blue" | "amber" | "emerald";
  size?: "default" | "large";
}) {
  const tones = {
    blue: "bg-blue-500/10 dark:bg-blue-400/10",
    amber: "bg-amber-500/10 dark:bg-amber-400/10",
    emerald: "bg-emerald-500/10 dark:bg-emerald-400/10",
  } as const;

  return (
    <div
      aria-hidden
      className={`absolute -top-12 -inset-e-12 rounded-full blur-2xl transition-opacity group-hover:opacity-90 ${
        size === "large" ? "h-56 w-56 opacity-70" : "h-36 w-36 opacity-75"
      } ${tones[tone]}`}
    />
  );
}

function PointOfSalePanel({
  copy,
  formatNumber,
}: {
  copy: FeaturesCopy;
  formatNumber: (n: number | string) => string;
}) {
  const lineItems = [
    { name: copy.card1PosItem1, price: copy.card1PosItem1Price },
    { name: copy.card1PosItem2, price: copy.card1PosItem2Price },
  ];

  return (
    <div
      className="mt-6 overflow-hidden rounded-2xl border border-blue-100/80 bg-linear-to-br from-slate-50 to-blue-50/60 dark:border-blue-900/30 dark:from-slate-800/50 dark:to-blue-950/20"
      aria-hidden
    >
      <div className="flex items-center justify-between gap-3 border-b border-blue-100/60 bg-white/70 px-4 py-2.5 dark:border-blue-900/30 dark:bg-slate-900/60">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
            {copy.card1SessionLabel}
          </p>
          <p dir="ltr" className="text-xs font-bold text-slate-800 dark:text-slate-100 num-fa">
            #{formatNumber("1240")} · {formatNumber("14:32")}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {copy.card1PosStatus}
        </span>
      </div>

      <ul className="divide-y divide-slate-100 px-4 dark:divide-slate-800">
        {lineItems.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-3 py-2.5">
            <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
              {item.name}
            </span>
            <span dir="ltr" className="shrink-0 text-sm font-bold text-blue-700 dark:text-blue-300 num-fa">
              {formatNumber(item.price)} ؋
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-blue-100/60 bg-blue-50/50 px-4 py-3 dark:border-blue-900/30 dark:bg-blue-950/20">
        <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
          {copy.card1PosPayment}
        </span>
        <div className="text-end">
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {copy.card1Total}
          </p>
          <p dir="ltr" className="text-base font-extrabold text-blue-700 dark:text-blue-300 num-fa">
            {formatNumber("8,450")} ؋
          </p>
        </div>
      </div>
    </div>
  );
}

function DebtPanel({
  copy,
  formatNumber,
}: {
  copy: FeaturesCopy;
  formatNumber: (n: number | string) => string;
}) {
  const rows = [
    {
      name: copy.card2Debt1Name,
      amount: copy.card2Debt1Amount,
      due: copy.card2Debt1Due,
      urgent: false,
    },
    {
      name: copy.card2Debt2Name,
      amount: copy.card2Debt2Amount,
      due: copy.card2Debt2Due,
      urgent: true,
    },
  ];

  return (
    <div
      className="mt-5 overflow-hidden rounded-xl border border-amber-100/80 bg-amber-50/60 dark:border-amber-900/30 dark:bg-amber-950/20"
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-amber-100/70 bg-amber-100/50 px-3 py-2 dark:border-amber-900/30 dark:bg-amber-950/40">
        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-700 dark:text-amber-300" />
        <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200">
          {copy.card2DebtAlert}
        </span>
      </div>

      <ul className="space-y-0 divide-y divide-amber-100/70 p-2 dark:divide-amber-900/30">
        {rows.map((row) => (
          <li
            key={row.name}
            className={`rounded-lg px-2.5 py-2.5 ${
              row.urgent
                ? "bg-amber-100/60 dark:bg-amber-900/25"
                : "bg-white/80 dark:bg-slate-900/80"
            }`}
          >
            <div className="flex min-w-0 items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                  {row.name}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                  {row.due}
                </p>
              </div>
              <span dir="ltr" className="shrink-0 text-xs font-extrabold text-amber-800 dark:text-amber-200 num-fa">
                {formatNumber(row.amount)} ؋
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InventoryPanel({
  copy,
  formatNumber,
}: {
  copy: FeaturesCopy;
  formatNumber: (n: number | string) => string;
}) {
  const rows = [
    {
      name: copy.card3Stock1,
      pct: Number(copy.card3Stock1Pct),
      tone: "bg-emerald-500",
      badge: null as string | null,
    },
    {
      name: copy.card3Stock2,
      pct: Number(copy.card3Stock2Pct),
      tone: "bg-amber-500",
      badge: copy.card3StockLow,
    },
    {
      name: copy.card3Stock3,
      pct: Number(copy.card3Stock3Pct),
      tone: "bg-blue-500",
      badge: null,
    },
  ];

  return (
    <div
      className="mt-5 space-y-3 rounded-xl border border-emerald-100/80 bg-emerald-50/60 p-3 dark:border-emerald-900/30 dark:bg-emerald-950/20"
      aria-hidden
    >
      {rows.map((row) => (
        <div key={row.name}>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="truncate text-xs font-medium text-slate-800 dark:text-slate-100">
              {row.name}
            </span>
            <div className="flex shrink-0 items-center gap-1.5">
              {row.badge && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                  {row.badge}
                </span>
              )}
              <span dir="ltr" className="text-[11px] font-bold text-slate-600 dark:text-slate-300 num-fa">
                {formatNumber(row.pct)}%
              </span>
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white dark:bg-slate-800">
            <div
              className={`h-full rounded-full ${row.tone}`}
              style={{ width: `${row.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportPanel({
  copy,
  formatNumber,
}: {
  copy: FeaturesCopy;
  formatNumber: (n: number | string) => string;
}) {
  const kpis = [
    {
      icon: <CircleDollarSign className="h-3.5 w-3.5" aria-hidden />,
      label: copy.card4Kpi1,
      value: formatNumber("84,500") + " ؋",
    },
    {
      icon: <Package className="h-3.5 w-3.5" aria-hidden />,
      label: copy.card4Kpi2,
      value: formatNumber("58,380") + " ؋",
    },
    {
      icon: <TrendingUp className="h-3.5 w-3.5" aria-hidden />,
      label: copy.card4Kpi3,
      value: formatNumber("30.9") + "%",
    },
  ];

  const months = [copy.card4ChartMonth1, copy.card4ChartMonth2, copy.card4ChartMonth3];
  const bars = [{ v: 45 }, { v: 58 }, { v: 50 }, { v: 72 }, { v: 65 }, { v: 88 }, { v: 95 }];

  return (
    <div className="lg:col-span-3" aria-hidden>
      <div className="rounded-2xl border border-slate-200/80 bg-linear-to-br from-slate-50 to-blue-50/50 p-4 dark:border-slate-700/60 dark:from-slate-800/50 dark:to-blue-950/20 sm:p-6">
        <div className="mb-4 flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
              {copy.card4Title2}
            </p>
            <p
              dir="ltr"
              className="mt-0.5 text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 sm:text-3xl num-fa"
            >
              {formatNumber("23,120")} ؋
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            {copy.card4Growth}
          </span>
        </div>

        <div className="relative h-32 sm:h-36">
          <div className="absolute inset-0 flex items-end justify-between gap-1 border-b border-slate-200/70 pb-5 dark:border-slate-700/60 sm:gap-1.5">
            {bars.map((bar, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end">
                <div
                  className="w-full rounded-t-sm bg-linear-to-t from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300"
                  style={{ height: `${bar.v}%` }}
                />
              </div>
            ))}
          </div>
          <svg
            className="absolute inset-0 h-full w-full text-emerald-600 dark:text-emerald-300"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M5,65 L19,55 L33,60 L48,40 L62,42 L76,18 L95,12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 px-0.5">
            {months.map((month) => (
              <span
                key={month}
                className="flex-1 text-center text-[10px] font-semibold text-slate-500 dark:text-slate-400"
              >
                {month}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-3">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="min-w-0 rounded-xl border border-white/80 bg-white/80 p-2 dark:border-slate-700/50 dark:bg-slate-900/70 sm:p-2.5"
            >
              <div className="flex min-w-0 items-center gap-1 text-slate-600 dark:text-slate-400">
                {kpi.icon}
                <span className="truncate text-[11px] font-medium">{kpi.label}</span>
              </div>
              <p
                dir="ltr"
                className="mt-1 truncate text-xs font-bold text-slate-800 dark:text-slate-100 sm:text-sm num-fa"
              >
                {kpi.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
