"use client";

import {
  LayoutGrid,
  ShoppingCart,
  Package,
  Boxes,
  Truck,
  Wallet,
  BarChart3,
  HelpCircle,
  Keyboard,
  Flag,
  Database,
  Bell,
  Shield,
  RefreshCw,
  Search,
  Sun,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Plus,
  FileText,
  Lock,
  ChevronDown,
} from "lucide-react";
import { useT } from "./i18n/language-context";

/**
 * LaptopMockup — recreates the real AsanHesab desktop app dashboard,
 * faithfully matching the uploaded screenshot (Screenshot 2026-05-31 173349.png).
 *
 * Layout (LTR app shell, RTL text within):
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │ TOP BAR (blue #007ADF): logo + icons | search + user        │
 *   ├─────────────────────────────────────────────────────────┬───┤
 *   │ MAIN CONTENT (white)                                     │ S │
 *   │  greeting row + 4 KPI cards + 7 action buttons          │ I │
 *   │  + 4 summary cards + line chart + 2 bottom cards        │ D │
 *   └─────────────────────────────────────────────────────────┴───┤
 *   │ LAPTOP BASE / HINGE                                          │
 *   └──────────────────────────────────────────────────────────────┘
 *
 * Floating glass card "+47%" preserved on bottom-left corner.
 */
export function LaptopMockup() {
  const t = useT();

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Soft glow behind the laptop */}
      <div
        aria-hidden
        className="absolute -inset-x-10 -top-10 bottom-0 -z-10 bg-gradient-to-b from-blue-100/60 via-blue-50/40 dark:from-blue-500/20 dark:to-transparent blur-3xl rounded-full"
      />

      {/* Laptop frame */}
      <div className="relative rounded-t-2xl bg-slate-800 dark:bg-slate-950 p-2 sm:p-3 shadow-premium-lg ring-1 ring-slate-900/10 dark:ring-white/5">
        {/* Camera dot */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1 h-1 w-1 -translate-x-1/2 rounded-full bg-slate-600 dark:bg-slate-700"
        />
        {/* Screen — intentionally kept light to show the actual app UI */}
        <div className="overflow-hidden rounded-lg border border-slate-700 dark:border-slate-800 bg-white">
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
                +۴۷<span className="text-lg sm:text-xl text-emerald-600">٪</span>
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

      {/* Secondary floating badge — top-right corner */}
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

/* ============================================================
   DASHBOARD SCREEN — matches the real AsanHesab app screenshot
   ============================================================ */
function DashboardScreen() {
  const t = useT();

  return (
    <div dir="rtl" className="flex h-[320px] sm:h-[480px] w-full bg-[#f9f9f9] text-[9px] sm:text-[11px] leading-tight">
      {/* MAIN CONTENT (left in RTL = main area) */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <MainContent />
      </div>

      {/* SIDEBAR (right in RTL) */}
      <Sidebar />
    </div>
  );
}

/* ---------- TOP BAR (blue, LTR inside) ---------- */
function TopBar() {
  const t = useT();

  return (
    <div
      dir="ltr"
      className="flex items-center justify-between gap-2 px-2 sm:px-3 h-8 sm:h-10 bg-[#007ADF] text-white shrink-0"
    >
      {/* LEFT: Logo + icons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-[10px] sm:text-xs font-bold tracking-tight">AsanHesab</span>
        {/* Window controls */}
        <span className="mx-1 h-3 w-px bg-white/30" />
        <button className="h-5 w-5 rounded hover:bg-white/20 flex items-center justify-center">
          <span className="block h-0.5 w-2.5 bg-white" />
        </button>
        <button className="h-5 w-5 rounded hover:bg-white/20 flex items-center justify-center">
          <span className="block h-2 w-2 border border-white" />
        </button>
        <button className="h-5 w-5 rounded hover:bg-white/20 flex items-center justify-center">
          <span className="block text-[10px] leading-none">×</span>
        </button>
        <span className="mx-1 h-3 w-px bg-white/30" />
        {/* Action icons */}
        <TbIcon><RefreshCw className="h-3 w-3 sm:h-3.5 sm:w-3.5" /></TbIcon>
        <TbIcon><Sun className="h-3 w-3 sm:h-3.5 sm:w-3.5" /></TbIcon>
        <TbIcon><Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-rose-300" /></TbIcon>
        <TbIcon>
          <span className="relative">
            <Bell className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-rose-500 text-white text-[7px] font-bold ring-1 ring-[#007ADF]">
              ۶
            </span>
          </span>
        </TbIcon>
        <TbIcon><ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" /></TbIcon>
      </div>

      {/* RIGHT: Search + user */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 h-5 sm:h-6 px-2 rounded bg-white text-slate-500 w-24 sm:w-44">
          <Search className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span className="text-[8px] sm:text-[10px] truncate" dir="rtl">{t.dashboard.topbar.search}</span>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5">
          <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-white flex items-center justify-center text-white text-[8px] font-bold">
            م
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[9px] font-bold text-white" dir="rtl">{t.dashboard.topbar.user}</span>
            <span className="text-[8px] text-blue-100" dir="rtl">{t.dashboard.topbar.business}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

function TbIcon({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-5 w-5 sm:h-6 sm:w-6 rounded hover:bg-white/20 flex items-center justify-center">
      {children}
    </button>
  );
}

/* ---------- MAIN CONTENT ---------- */
function MainContent() {
  const t = useT();

  return (
    <div className="flex-1 overflow-hidden p-1.5 sm:p-2.5 space-y-1.5 sm:space-y-2">
      {/* Greeting row */}
      <div className="flex items-center justify-between text-[9px] sm:text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-800" dir="rtl">{t.dashboard.greeting.goodDay}</span>
          <span className="text-slate-400">·</span>
          <span className="font-bold text-blue-700" dir="rtl">{t.dashboard.topbar.business}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500" dir="rtl">{t.dashboard.greeting.weekday}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <span dir="rtl">{t.dashboard.greeting.date}</span>
          <span className="text-slate-400">·</span>
          <span dir="ltr">{t.dashboard.greeting.time}</span>
        </div>
      </div>

      {/* 4 KPI cards */}
      <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
        <KpiCard
          icon={<DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
          tone="blue"
          label={t.dashboard.kpi.cashBankLabel}
          value={t.dashboard.kpi.cashBankValue}
          sparkColor="#007ADF"
        />
        <KpiCard
          icon={<TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
          tone="emerald"
          label={t.dashboard.kpi.incomeLabel}
          value={t.dashboard.kpi.incomeValue}
          sparkColor="#10b981"
        />
        <KpiCard
          icon={<TrendingDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
          tone="rose"
          label={t.dashboard.kpi.expenseLabel}
          value={t.dashboard.kpi.expenseValue}
          sparkColor="#cc2929"
        />
        <KpiCard
          icon={<Wallet className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
          tone="amber"
          label={t.dashboard.kpi.profitLabel}
          value={t.dashboard.kpi.profitValue}
          sparkColor="#d97706"
          negative
        />
      </div>

      {/* 7 Action buttons row */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        <ActionButton icon={<ShoppingCart className="h-3 w-3" />} label={t.dashboard.actions.newSale} tone="blue" />
        <ActionButton icon={<Package className="h-3 w-3" />} label={t.dashboard.actions.newPurchase} tone="blue" />
        <ActionButton icon={<Plus className="h-3 w-3" />} label={t.dashboard.actions.addExpense} tone="slate" />
        <ActionButton icon={<Plus className="h-3 w-3" />} label={t.dashboard.actions.addCustomer} tone="slate" />
        <ActionButton icon={<Plus className="h-3 w-3" />} label={t.dashboard.actions.addItem} tone="slate" />
        <ActionButton icon={<Lock className="h-3 w-3" />} label={t.dashboard.actions.closeDay} tone="slate" />
        <ActionButton icon={<FileText className="h-3 w-3" />} label={t.dashboard.actions.reports} tone="slate" />
      </div>

      {/* 4 Summary cards */}
      <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
        <SummaryCard
          label={t.dashboard.summary.totalIn}
          value={t.dashboard.summary.totalInValue}
          tone="emerald"
        />
        <SummaryCard
          label={t.dashboard.summary.totalOut}
          value={t.dashboard.summary.totalOutValue}
          tone="rose"
        />
        <SummaryCard
          label={t.dashboard.summary.netCashFlow}
          value={t.dashboard.summary.netCashFlowValue}
          tone="amber"
        />
        <SummaryCard
          label={t.dashboard.summary.cashOnHand}
          value={t.dashboard.summary.cashOnHandValue}
          tone="blue"
        />
      </div>

      {/* Chart with bottom 2 cards split */}
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5 flex-1 min-h-0">
        {/* Chart (2/3 width) */}
        <div className="col-span-2 rounded-md border border-slate-200 bg-white p-1.5 sm:p-2 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[8px] sm:text-[10px] font-bold text-slate-700" dir="rtl">{t.dashboard.chart.title}</span>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[7px] sm:text-[9px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" /> {t.solution.kpi1}
              </span>
              <span className="inline-flex items-center gap-1 text-[7px] sm:text-[9px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#cc2929]" /> {t.solution.kpi2}
              </span>
            </div>
          </div>
          <Chart />
        </div>

        {/* 2 bottom cards (1/3 width, stacked) */}
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <BottomAlertCard
            icon={<AlertTriangle className="h-3 w-3" />}
            title={t.dashboard.bottom.alertsTitle}
            value={t.dashboard.bottom.alertsValue}
            sub={t.dashboard.bottom.alertsSub}
            tone="amber"
          />
          <BottomPerfCard
            icon={<CheckCircle2 className="h-3 w-3" />}
            title={t.dashboard.bottom.perfTitle}
            value={t.dashboard.bottom.perfValue}
            tone="emerald"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- SIDEBAR (right in RTL) ---------- */
function Sidebar() {
  const t = useT();

  const items = [
    { icon: <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.dashboard, active: true },
    { icon: <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.sales },
    { icon: <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.purchases },
    { icon: <Boxes className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.items },
    { icon: <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.suppliers },
    { icon: <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.treasury },
    { icon: <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.reports },
    { icon: <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.help },
    { icon: <Keyboard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.shortcuts },
    { icon: <Flag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.reportIssue },
    { icon: <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, label: t.dashboard.sidebar.changeDb },
  ];

  return (
    <aside className="hidden sm:flex flex-col gap-0 w-24 lg:w-32 bg-white border-r border-slate-200 py-1.5 px-1">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-1.5 px-1.5 py-1 rounded-md transition-colors text-[8px] lg:text-[9px] ${
            item.active
              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
              : "text-slate-600 hover:bg-slate-50"
          }`}
          title={item.label}
        >
          <span className={item.active ? "text-blue-600" : "text-slate-400"}>
            {item.icon}
          </span>
          <span className="truncate" dir="rtl">{item.label}</span>
        </div>
      ))}
    </aside>
  );
}

/* ---------- KPI CARD ---------- */
function KpiCard({
  icon,
  tone,
  label,
  value,
  sparkColor,
  negative,
}: {
  icon: React.ReactNode;
  tone: "blue" | "emerald" | "rose" | "amber";
  label: string;
  value: string;
  sparkColor: string;
  negative?: boolean;
}) {
  const t = useT();
  const tones = {
    blue:    "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose:    "bg-rose-50 text-rose-600 border-rose-100",
    amber:   "bg-amber-50 text-amber-600 border-amber-100",
  } as const;
  const toneCls = tones[tone];
  const valueColor = negative ? "text-rose-600" : "text-slate-800";

  return (
    <div className="rounded-md border border-slate-200 bg-white p-1 sm:p-1.5 overflow-hidden">
      <div className="flex items-center justify-between mb-0.5">
        <span className={`inline-flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded ${toneCls} border`}>
          {icon}
        </span>
        <span className="text-[6px] sm:text-[8px] text-slate-400" dir="ltr">{t.dashboard.kpi.trend}</span>
      </div>
      <p className="text-[7px] sm:text-[9px] text-slate-500 truncate" dir="rtl">{label}</p>
      <p className={`text-[9px] sm:text-xs font-bold ${valueColor} truncate`} dir="ltr">
        {value} <span className="text-[7px] opacity-70">؋</span>
      </p>
      {/* Mini sparkline */}
      <svg viewBox="0 0 50 8" className="mt-0.5 h-1.5 w-full" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0 6 L8 5 L16 6 L24 3 L32 4 L40 2 L50 1"
          fill="none"
          stroke={sparkColor}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ---------- ACTION BUTTON ---------- */
function ActionButton({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "blue" | "slate";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    slate: "bg-slate-50 text-slate-600 hover:bg-slate-100",
  } as const;
  const t = tones[tone];

  return (
    <button className={`flex flex-col items-center gap-0.5 rounded-md ${t} p-1 transition-colors`}>
      {icon}
      <span className="text-[7px] sm:text-[8px] font-medium truncate w-full text-center" dir="rtl">{label}</span>
    </button>
  );
}

/* ---------- SUMMARY CARD ---------- */
function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "rose" | "amber" | "blue";
}) {
  const tones = {
    emerald: { bar: "bg-emerald-500", text: "text-emerald-700" },
    rose:    { bar: "bg-rose-500",    text: "text-rose-700" },
    amber:   { bar: "bg-amber-500",   text: "text-amber-700" },
    blue:    { bar: "bg-blue-500",    text: "text-blue-700" },
  } as const;
  const t = tones[tone];

  return (
    <div className="rounded-md border border-slate-200 bg-white p-1 sm:p-1.5 overflow-hidden relative">
      <span className={`absolute top-0 right-0 h-full w-0.5 ${t.bar}`} />
      <p className="text-[7px] sm:text-[8px] text-slate-500 truncate pr-1" dir="rtl">{label}</p>
      <p className={`text-[8px] sm:text-[10px] font-bold ${t.text}`} dir="ltr">{value} ؋</p>
    </div>
  );
}

/* ---------- CHART (dual-line area chart) ---------- */
function Chart() {
  const t = useT();
  // Y-axis labels from screenshot: 18k, 14k, 9k, 5k, 0
  // X-axis labels: 02/10, 03/02, 03/09 (right to left in RTL)
  const yLabels = [t.dashboard.chart.y18k, t.dashboard.chart.y14k, t.dashboard.chart.y9k, t.dashboard.chart.y5k, t.dashboard.chart.y0];

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-[6px] sm:text-[8px] text-slate-400 py-1 pl-1 num-fa">
          {yLabels.map((y, i) => (
            <span key={i}>{y}</span>
          ))}
        </div>
        {/* Chart SVG */}
        <div className="flex-1 relative">
          <svg viewBox="0 0 240 80" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="incomeFillArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="expenseFillArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(204, 41, 41)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(204, 41, 41)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[8, 24, 40, 56, 72].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="240"
                y2={y}
                stroke="rgb(241, 245, 249)"
                strokeWidth="0.5"
              />
            ))}
            {/* Expense area + line (red) */}
            <path
              d="M0 55 L40 50 L80 58 L120 45 L160 52 L200 38 L240 32 L240 80 L0 80 Z"
              fill="url(#expenseFillArea)"
            />
            <path
              d="M0 55 L40 50 L80 58 L120 45 L160 52 L200 38 L240 32"
              fill="none"
              stroke="rgb(204, 41, 41)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Income area + line (green) */}
            <path
              d="M0 68 L40 62 L80 56 L120 46 L160 36 L200 26 L240 16 L240 80 L0 80 Z"
              fill="url(#incomeFillArea)"
            />
            <path
              d="M0 68 L40 62 L80 56 L120 46 L160 36 L200 26 L240 16"
              fill="none"
              stroke="rgb(5, 150, 105)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Data points */}
            {[[0,68],[40,62],[80,56],[120,46],[160,36],[200,26],[240,16]].map(([x,y], i) => (
              <circle key={`g${i}`} cx={x} cy={y} r="1" fill="rgb(5, 150, 105)" />
            ))}
            {[[0,55],[40,50],[80,58],[120,45],[160,52],[200,38],[240,32]].map(([x,y], i) => (
              <circle key={`r${i}`} cx={x} cy={y} r="1" fill="rgb(204, 41, 41)" />
            ))}
          </svg>
        </div>
      </div>
      {/* X-axis labels */}
      <div className="flex justify-between text-[6px] sm:text-[8px] text-slate-400 pt-0.5 pr-4 num-fa" dir="ltr">
        <span>{t.dashboard.chart.x1}</span>
        <span>{t.dashboard.chart.x2}</span>
        <span>{t.dashboard.chart.x3}</span>
      </div>
    </div>
  );
}

/* ---------- BOTTOM ALERT CARD (left of bottom row) ---------- */
function BottomAlertCard({
  icon,
  title,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
  tone: "amber";
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-1.5 sm:p-2 flex-1 min-h-0 flex flex-col">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="relative inline-flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded bg-amber-100 text-amber-600">
          {icon}
          <span className="absolute -top-1 -right-1 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-rose-500 text-white text-[6px] font-bold ring-1 ring-white">
            ۶
          </span>
        </span>
        <span className="text-[7px] sm:text-[9px] font-bold text-slate-700 truncate" dir="rtl">{title}</span>
      </div>
      <div className="flex items-baseline gap-1 mt-auto">
        <span className="text-base sm:text-lg font-extrabold text-amber-700 num-fa">{value}</span>
        <span className="text-[7px] sm:text-[8px] text-rose-600 font-bold bg-rose-50 px-1 py-0.5 rounded" dir="rtl">{sub}</span>
      </div>
    </div>
  );
}

/* ---------- BOTTOM PERFORMANCE CARD (right of bottom row) ---------- */
function BottomPerfCard({
  icon,
  title,
  value,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  tone: "emerald";
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-1.5 sm:p-2 flex-1 min-h-0 flex flex-col">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="inline-flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded bg-emerald-100 text-emerald-600">
          {icon}
        </span>
        <span className="text-[7px] sm:text-[9px] font-bold text-slate-700 truncate" dir="rtl">{title}</span>
      </div>
      <div className="flex items-baseline gap-1 mt-auto">
        <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-500" />
        <span className="text-base sm:text-lg font-extrabold text-emerald-700 num-fa">{value}</span>
      </div>
    </div>
  );
}
