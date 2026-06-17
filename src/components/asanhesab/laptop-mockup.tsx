import {
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Wallet,
  ShoppingCart,
  Users,
  Package,
  ChevronDown,
} from "lucide-react";

/**
 * LaptopMockup — pure CSS/SVG dashboard inside a stylized laptop frame.
 * No external image dependencies; renders crisp at any size.
 *
 * Floating glassmorphism card on the bottom-left corner shows:
 * "رشد فایده خالص +۴۷٪" with a small green trend line.
 */
export function LaptopMockup() {
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
        {/* Screen — intentionally kept light to show the app UI */}
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
                رشد فایده خالص
              </p>
              <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 num-fa">
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
            نسبت به ماه گذشته
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
            <p className="text-[11px] font-semibold text-slate-900">پشتیبانی آنلاین</p>
            <p className="text-[10px] text-slate-500">همیشه آنلاین · واتساپ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inner dashboard screen — represents the AsanHesab desktop UI */
function DashboardScreen() {
  return (
    <div dir="rtl" className="flex h-[280px] sm:h-[420px] w-full bg-slate-50">
      {/* Sidebar (mini) */}
      <aside className="hidden sm:flex flex-col gap-1.5 w-14 lg:w-16 bg-white border-l border-slate-200 p-2">
        <div className="mb-2 h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 mx-auto flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
        {[
          { active: true, icon: <Wallet className="h-4 w-4" /> },
          { active: false, icon: <ShoppingCart className="h-4 w-4" /> },
          { active: false, icon: <Package className="h-4 w-4" /> },
          { active: false, icon: <Users className="h-4 w-4" /> },
          { active: false, icon: <TrendingUp className="h-4 w-4" /> },
        ].map((item, i) => (
          <div
            key={i}
            className={`h-8 w-8 mx-auto rounded-lg flex items-center justify-center transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-700"
                : "text-slate-400"
            }`}
          >
            {item.icon}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-3 sm:px-5 h-12 sm:h-14 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
              داشبورد فروش امروز
            </h3>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              ۱۴۰۵/۰۳/۲۷
              <ChevronDown className="h-3 w-3" />
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-slate-100 text-slate-500 w-32 lg:w-44">
              <Search className="h-3.5 w-3.5" />
              <span className="text-[10px] text-slate-400">جستجو…</span>
            </div>
            <button className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
              <Bell className="h-3.5 w-3.5" />
            </button>
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 ring-2 ring-white" />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 p-3 sm:p-4 overflow-hidden">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <StatCard
              label="فروش امروز"
              value="۸۴٬۵۰۰ ؋"
              delta="+12.4%"
              up
              tone="blue"
            />
            <StatCard
              label="فایده خالص"
              value="۲۳٬۱۲۰ ؋"
              delta="+47.1%"
              up
              tone="emerald"
            />
            <StatCard
              label="قرض‌ها"
              value="۱۵٬۰۰۰ ؋"
              delta="-3.2%"
              up={false}
              tone="amber"
            />
            <StatCard
              label="موجودی گدام"
              value="۱٬۲۴۰ جنس"
              delta="+8.0%"
              up
              tone="slate"
            />
          </div>

          {/* Chart row */}
          <div className="mt-3 sm:mt-4 grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3">
            {/* Bar chart */}
            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h4 className="text-[11px] sm:text-xs font-bold text-slate-700">
                  فروش هفتگی
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500">
                    <span className="h-2 w-2 rounded-sm bg-blue-600" /> فروش
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500">
                    <span className="h-2 w-2 rounded-sm bg-emerald-500" /> فایده
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-20 sm:h-28">
                {[
                  { s: 55, p: 32 },
                  { s: 72, p: 48 },
                  { s: 48, p: 28 },
                  { s: 88, p: 62 },
                  { s: 65, p: 40 },
                  { s: 95, p: 70 },
                  { s: 78, p: 52 },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div className="w-full flex items-end gap-0.5 h-full">
                      <div
                        className="flex-1 rounded-t bg-blue-600"
                        style={{ height: `${bar.s}%` }}
                      />
                      <div
                        className="flex-1 rounded-t bg-emerald-500"
                        style={{ height: `${bar.p}%` }}
                      />
                    </div>
                    <span className="text-[8px] sm:text-[10px] text-slate-400 num-fa">
                      {["ش", "ی", "د", "س", "چ", "پ", "ج"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent transactions */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
              <h4 className="text-[11px] sm:text-xs font-bold text-slate-700 mb-2 sm:mb-3">
                آخرین معاملات
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "برنج کابل", amt: "+1,200", up: true },
                  { name: "روغن غاز", amt: "+850", up: true },
                  { name: "پرداخت قرض", amt: "-2,000", up: false },
                  { name: "چای山市", amt: "+640", up: true },
                ].map((tx, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`h-6 w-6 shrink-0 rounded-md flex items-center justify-center ${
                          tx.up
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {tx.up ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-medium text-slate-700 truncate">
                        {tx.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold num-fa ${
                        tx.up ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {tx.amt} ؋
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  up,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  tone: "blue" | "emerald" | "amber" | "slate";
}) {
  const tones: Record<string, { bg: string; text: string; iconBg: string }> = {
    blue:   { bg: "bg-blue-50",    text: "text-blue-700",    iconBg: "bg-blue-600" },
    emerald:{ bg: "bg-emerald-50", text: "text-emerald-700", iconBg: "bg-emerald-500" },
    amber:  { bg: "bg-amber-50",   text: "text-amber-700",   iconBg: "bg-amber-500" },
    slate:  { bg: "bg-slate-100",  text: "text-slate-700",   iconBg: "bg-slate-600" },
  };
  const t = tones[tone];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3">
      <div className="flex items-center justify-between">
        <span className={`h-6 w-6 rounded-md ${t.iconBg} opacity-90`} />
        <span
          className={`inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-semibold num-fa ${
            up ? "text-emerald-600" : "text-amber-600"
          }`}
        >
          {up ? (
            <TrendingUp className="h-2.5 w-2.5" />
          ) : (
            <TrendingDown className="h-2.5 w-2.5" />
          )}
          {delta}
        </span>
      </div>
      <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-slate-500">
        {label}
      </p>
      <p className="text-sm sm:text-lg font-extrabold text-slate-900 num-fa leading-tight">
        {value}
      </p>
    </div>
  );
}
