"use client";

import {
  Home,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  FileText,
  CreditCard,
  PieChart,
  Settings,
  Bell,
  Shield,
  RefreshCw,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Sun,
  PenLine,
} from "lucide-react";
import { useLanguage, useT } from "./i18n/language-context";

/**
 * LaptopMockup — pure CSS/SVG dashboard inside a stylized laptop frame.
 * Recreated to faithfully match the real AsanHesab desktop app screenshots:
 *  - Right sidebar with menu items (Profile/Accounts/Sales/.../Settings)
 *  - Top bar: logo + bell + shield + refresh on the right, date/time in center, search + user on the left
 *  - 4 KPI cards (Account Balance, Sales, Purchases, Net P&L)
 *  - Financial chart with income/expense lines + 4 summary bars above
 *  - 2 bottom cards (Failed Receipts, Success Rate)
 *  - Quick-access toolbar with action icons
 *
 * Floating glassmorphism card on the bottom-left corner shows:
 * "رشد فایده خالص +۴۷٪" with a small green trend line.
 */
export function LaptopMockup() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Soft glow behind the laptop */}
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-10 bottom-0 -z-10 bg-gradient-to-b from-blue-100/60 via-blue-50/40 dark:from-blue-500/20 dark:to-transparent blur-3xl rounded-full"
      />

      {/* Laptop frame */}
      <div className="relative rounded-t-2xl bg-slate-800 dark:bg-slate-950 p-2.5 sm:p-3 shadow-premium-lg ring-1 ring-slate-900/10 dark:ring-white/5">
        {/* Camera dot */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-600 dark:bg-slate-700"
        />
        {/* Screen — intentionally kept light to show the actual app UI */}
        <div className="overflow-hidden rounded-lg border border-slate-700 dark:border-slate-800 bg-slate-100">
          <DashboardScreen />
        </div>
      </div>

      {/* Laptop base / hinge */}
      <div className="relative h-2 bg-slate-700 dark:bg-slate-950 rounded-b-xl" />
      <div className="mx-auto h-1.5 w-28 sm:w-36 rounded-b-xl bg-slate-600 dark:bg-slate-800" />

      {/* Floating glassmorphism card — bottom-left overlap */}
      <div
        dir="rtl"
        className="absolute -bottom-6 right-2 sm:-right-6 sm:bottom-8 z-20 w-52 sm:w-64 animate-float-slow"
      >
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500">
                {t.solution.afterTitle}
              </p>
              <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                {formatNumber("+47")}<span className="text-lg sm:text-xl text-emerald-600">٪</span>
              </p>
            </div>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          {/* Mini trend line */}
          <svg
            viewBox="0 0 120 36"
            className="mt-2 h-9 w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 30 L15 26 L30 28 L45 20 L60 22 L75 14 L90 12 L105 6 L120 4"
              fill="none"
              stroke="rgb(5, 150, 105)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0 30 L15 26 L30 28 L45 20 L60 22 L75 14 L90 12 L105 6 L120 4 L120 36 L0 36 Z"
              fill="url(#trendFill)"
            />
          </svg>
          <p className="mt-1 text-[10px] sm:text-[11px] font-medium text-emerald-700">
            {t.solution.afterVsLast}
          </p>
        </div>
      </div>

      {/* Secondary floating badge — top-right corner (WhatsApp availability) */}
      <div
        dir="rtl"
        className="absolute -top-4 left-2 sm:-left-6 z-20 hidden sm:block animate-float-slow"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="glass-card rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold text-slate-900">{t.features.card3Title}</p>
            <p className="text-[10px] text-slate-500">{t.footer.contactSupport}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inner dashboard screen — recreates the actual AsanHesab desktop UI */
function DashboardScreen() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <div dir="rtl" className="flex h-[300px] sm:h-[460px] w-full bg-slate-100 text-[10px] sm:text-xs">
      {/* MAIN CONTENT (left in RTL) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <TopBar />

        {/* Quick access toolbar */}
        <QuickAccessToolbar />

        {/* Scrollable body */}
        <div className="flex-1 overflow-hidden p-2.5 sm:p-3 space-y-2.5 sm:space-y-3">
          {/* 4 KPI cards */}
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
            <KpiCard
              icon={<DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              tone="emerald"
              label={t.stats.stat1Label}
              value={formatNumber("9,635.85")}
              currency="؋"
            />
            <KpiCard
              icon={<ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              tone="rose"
              label={t.audiences.tab1}
              value={formatNumber("3,000")}
              currency="؋"
            />
            <KpiCard
              icon={<TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              tone="blue"
              label={t.audiences.tab2}
              value={formatNumber("32,850")}
              currency="؋"
            />
            <KpiCard
              icon={<Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              tone="amber"
              label={t.features.card4Title}
              value={formatNumber("-15,540")}
              currency="؋"
              negative
            />
          </div>

          {/* Chart section with summary bars above */}
          <div className="rounded-lg border border-slate-200 bg-white p-2 sm:p-2.5">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <h4 className="text-[10px] sm:text-xs font-bold text-slate-700">
                {t.features.card4Title2}
              </h4>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-500">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" /> {t.solution.kpi1}
                </span>
                <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-500">
                  <span className="h-2 w-2 rounded-sm bg-rose-500" /> {t.solution.kpi2}
                </span>
              </div>
            </div>

            {/* 4 summary bars */}
            <div className="grid grid-cols-4 gap-1 sm:gap-1.5 mb-2 sm:mb-2.5">
              <SummaryBar tone="bg-blue-500"     value={formatNumber("-15,540")} />
              <SummaryBar tone="bg-rose-700"     value={formatNumber("-17,540")} />
              <SummaryBar tone="bg-emerald-600"  value={formatNumber("34,450")} />
              <SummaryBar tone="bg-teal-500"     value={formatNumber("16,910")} />
            </div>

            {/* Area chart with 2 lines */}
            <div className="relative h-20 sm:h-28">
              <DualLineChart />
              {/* Y-axis labels */}
              <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-[7px] sm:text-[9px] text-slate-400 num-fa pl-1">
                <span>۱۸k</span>
                <span>۱۴k</span>
                <span>۹k</span>
                <span>۵k</span>
                <span>۰</span>
              </div>
              {/* X-axis labels */}
              <div className="flex justify-between text-[7px] sm:text-[9px] text-slate-400 num-fa mt-1 pr-6">
                <span>۰۲/۱۰</span>
                <span>۰۲/۰۳</span>
                <span>۰۹/۰۳</span>
              </div>
            </div>
          </div>

          {/* Bottom 2 cards */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <BottomCard
              icon={<AlertCircle className="h-3.5 w-3.5" />}
              tone="amber"
              title={t.pain.card1Title}
              value={formatNumber("2")}
              sub={t.audiences.tab2}
            />
            <BottomCard
              icon={<CheckCircle2 className="h-3.5 w-3.5" />}
              tone="emerald"
              title={t.testimonials.trust4Label}
              value={formatNumber("100.0") + "٪"}
              trend="up"
            />
          </div>
        </div>
      </div>

      {/* SIDEBAR (right in RTL) */}
      <Sidebar />
    </div>
  );
}

/** Top bar — matches real AsanHesab layout */
function TopBar() {
  const t = useT();
  const { formatNumber } = useLanguage();

  return (
    <div className="flex items-center justify-between gap-2 px-2.5 sm:px-3 h-9 sm:h-11 bg-white border-b border-slate-200">
      {/* Right side (RTL start) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[10px] font-bold">
          A
        </span>
        <span className="hidden sm:inline text-[10px] font-bold text-slate-700">{t.brand.name}</span>
        <div className="relative">
          <Bell className="h-3.5 w-3.5 text-slate-500" />
          <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-white text-[7px] font-bold">
            ۶
          </span>
        </div>
        <Shield className="h-3.5 w-3.5 text-slate-500" />
        <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
      </div>

      {/* Center — date/time */}
      <div className="hidden sm:flex flex-col items-center text-center">
        <span className="text-[9px] text-slate-500 num-fa">
          {formatNumber("1405")} {t.testimonials.t3Role.split(" · ")[0]} · {formatNumber("10")}
        </span>
        <span className="text-[9px] text-slate-400 num-fa">{formatNumber("17:33")} · {t.pain.transition}</span>
      </div>

      {/* Left side (RTL end) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="hidden sm:flex items-center gap-1.5 h-7 px-2 rounded-md bg-slate-100 text-slate-500 w-24 lg:w-32">
          <Search className="h-3 w-3" />
          <span className="text-[9px] text-slate-400">{t.nav.features}…</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline text-[10px] font-bold text-slate-700">{t.testimonials.t1Name.split(" ").slice(0,2).join(" ")}</span>
          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 ring-2 ring-white flex items-center justify-center text-white text-[9px] font-bold">
            م
          </div>
        </div>
        <button className="h-7 w-7 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
          <Sun className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/** Quick-access toolbar below top bar — action icons */
function QuickAccessToolbar() {
  // The real app has icons like Dashboard, Receive Payment, Record Payment, Record Expense, etc.
  const actions = [
    { icon: <Home className="h-3.5 w-3.5" />,        tone: "blue" },
    { icon: <CreditCard className="h-3.5 w-3.5" />,  tone: "slate" },
    { icon: <DollarSign className="h-3.5 w-3.5" />,  tone: "slate" },
    { icon: <TrendingDown className="h-3.5 w-3.5" />,tone: "slate" },
    { icon: <TrendingUp className="h-3.5 w-3.5" />,  tone: "slate" },
    { icon: <FileText className="h-3.5 w-3.5" />,    tone: "slate" },
    { icon: <ShoppingCart className="h-3.5 w-3.5" />,tone: "slate" },
    { icon: <Package className="h-3.5 w-3.5" />,     tone: "slate" },
  ];
  return (
    <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-white border-b border-slate-200 overflow-hidden">
      {actions.map((a, i) => (
        <button
          key={i}
          className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
            a.tone === "blue"
              ? "bg-blue-50 text-blue-700"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          {a.icon}
        </button>
      ))}
      <div className="mr-auto flex items-center gap-1.5">
        <span className="text-[9px] text-slate-500">TEST BUSINESS</span>
        <button className="inline-flex items-center gap-1 rounded-md bg-blue-600 text-white text-[9px] font-bold px-2 py-1">
          <PenLine className="h-3 w-3" />
          نوشتن
        </button>
      </div>
    </div>
  );
}

/** Sidebar — right side in RTL with menu items */
function Sidebar() {
  const t = useT();

  const menuItems = [
    { icon: <Home className="h-4 w-4" />,          label: t.nav.download,        active: false },
    { icon: <DollarSign className="h-4 w-4" />,    label: t.pricing.freeUnit,    active: false },
    { icon: <ShoppingCart className="h-4 w-4" />,  label: t.audiences.tab1,      active: false },
    { icon: <Package className="h-4 w-4" />,       label: t.audiences.tab2,      active: false },
    { icon: <CreditCard className="h-4 w-4" />,    label: t.solution.kpi2,       active: false },
    { icon: <Users className="h-4 w-4" />,         label: t.testimonials.t1Role.split(" · ")[0], active: false },
    { icon: <BarChart3 className="h-4 w-4" />,     label: t.features.card4Title, active: true },
    { icon: <FileText className="h-4 w-4" />,      label: t.features.card2Title, active: false },
    { icon: <PieChart className="h-4 w-4" />,      label: t.audiences.eyebrow,   active: false },
    { icon: <Settings className="h-4 w-4" />,      label: t.nav.themeLight,      active: false },
  ];

  return (
    <aside className="hidden sm:flex flex-col gap-0.5 w-12 lg:w-14 bg-white border-r border-slate-200 p-1.5">
      {menuItems.map((item, i) => (
        <div
          key={i}
          className={`flex flex-col items-center gap-0.5 py-1.5 rounded-md transition-colors ${
            item.active
              ? "bg-blue-50 text-blue-700"
              : "text-slate-400"
          }`}
          title={item.label}
        >
          {item.icon}
          {i === 0 && <span className="block h-0.5 w-4 rounded-full bg-blue-600" />}
        </div>
      ))}
    </aside>
  );
}

/** KPI Card — matches real app style: icon + label + value + currency */
function KpiCard({
  icon,
  tone,
  label,
  value,
  currency,
  negative,
}: {
  icon: React.ReactNode;
  tone: "emerald" | "rose" | "blue" | "amber";
  label: string;
  value: string;
  currency: string;
  negative?: boolean;
}) {
  const tones = {
    emerald: { iconBg: "bg-emerald-100 text-emerald-600", valText: "text-emerald-700" },
    rose:    { iconBg: "bg-rose-100 text-rose-600",       valText: "text-rose-700" },
    blue:    { iconBg: "bg-blue-100 text-blue-600",       valText: "text-blue-700" },
    amber:   { iconBg: "bg-amber-100 text-amber-600",     valText: "text-amber-700" },
  } as const;
  const t = tones[tone];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-1.5 sm:p-2 overflow-hidden">
      <div className="flex items-center justify-between mb-1 sm:mb-1.5">
        <span className={`inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md ${t.iconBg}`}>
          {icon}
        </span>
        <span className="text-[7px] sm:text-[9px] text-slate-400 num-fa">۰.۰٪ —</span>
      </div>
      <p className="text-[7px] sm:text-[9px] text-slate-500 truncate">{label}</p>
      <p className={`text-[10px] sm:text-sm font-bold ${negative ? "text-rose-600" : t.valText} num-fa truncate`}>
        {value} <span className="text-[8px] sm:text-[10px] opacity-70">{currency}</span>
      </p>
      {/* Mini sparkline */}
      <svg viewBox="0 0 60 12" className="mt-0.5 h-2 w-full" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0 8 L10 6 L20 9 L30 4 L40 7 L50 3 L60 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={tone === "emerald" ? "text-emerald-400" : tone === "rose" ? "text-rose-400" : tone === "blue" ? "text-blue-400" : "text-amber-400"}
        />
      </svg>
    </div>
  );
}

/** Summary bar shown above the main chart */
function SummaryBar({ tone, value }: { tone: string; value: string }) {
  return (
    <div className={`rounded-md ${tone} text-white px-1.5 py-1 text-center`}>
      <p className="text-[7px] sm:text-[9px] opacity-90 num-fa leading-tight">{value}</p>
    </div>
  );
}

/** Dual-line area chart (income green, expense red) */
function DualLineChart() {
  return (
    <svg viewBox="0 0 240 80" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(244, 63, 94)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(244, 63, 94)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[16, 32, 48, 64].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="240"
          y2={y}
          stroke="rgb(241, 245, 249)"
          strokeWidth="1"
        />
      ))}
      {/* Expense area + line (red) */}
      <path
        d="M0 50 L40 45 L80 55 L120 40 L160 50 L200 35 L240 30 L240 80 L0 80 Z"
        fill="url(#expenseFill)"
      />
      <path
        d="M0 50 L40 45 L80 55 L120 40 L160 50 L200 35 L240 30"
        fill="none"
        stroke="rgb(244, 63, 94)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Income area + line (green) */}
      <path
        d="M0 65 L40 60 L80 55 L120 45 L160 35 L200 25 L240 15 L240 80 L0 80 Z"
        fill="url(#incomeFill)"
      />
      <path
        d="M0 65 L40 60 L80 55 L120 45 L160 35 L200 25 L240 15"
        fill="none"
        stroke="rgb(16, 185, 129)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Data points */}
      {[[0,65],[40,60],[80,55],[120,45],[160,35],[200,25],[240,15]].map(([x,y], i) => (
        <circle key={`g${i}`} cx={x} cy={y} r="1.5" fill="rgb(5, 150, 105)" />
      ))}
      {[[0,50],[40,45],[80,55],[120,40],[160,50],[200,35],[240,30]].map(([x,y], i) => (
        <circle key={`r${i}`} cx={x} cy={y} r="1.5" fill="rgb(225, 29, 72)" />
      ))}
    </svg>
  );
}

/** Bottom card — Failed Receipts or Success Rate */
function BottomCard({
  icon,
  tone,
  title,
  value,
  sub,
  trend,
}: {
  icon: React.ReactNode;
  tone: "amber" | "emerald";
  title: string;
  value: string;
  sub?: string;
  trend?: "up" | "down";
}) {
  const tones = {
    amber:   { bg: "bg-amber-50",    border: "border-amber-200",    icon: "bg-amber-100 text-amber-600",   valText: "text-amber-700" },
    emerald: { bg: "bg-emerald-50",  border: "border-emerald-200",  icon: "bg-emerald-100 text-emerald-600",valText: "text-emerald-700" },
  } as const;
  const t = tones[tone];

  return (
    <div className={`rounded-lg border ${t.border} ${t.bg} p-2 sm:p-2.5 flex items-center gap-2`}>
      <span className={`relative inline-flex h-8 w-8 items-center justify-center rounded-lg ${t.icon}`}>
        {icon}
        {tone === "amber" && (
          <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-white text-[7px] font-bold">
            ۶
          </span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[8px] sm:text-[10px] text-slate-500 truncate">{title}</p>
        <div className="flex items-baseline gap-1">
          <p className={`text-sm sm:text-base font-bold ${t.valText} num-fa truncate`}>{value}</p>
          {sub && <p className="text-[7px] sm:text-[9px] text-slate-400 truncate">{sub}</p>}
          {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />}
        </div>
      </div>
    </div>
  );
}
