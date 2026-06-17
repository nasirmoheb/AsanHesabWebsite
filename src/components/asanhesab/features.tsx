"use client";

import {
  Barcode,
  BookOpen,
  Warehouse,
  BarChart3,
  TrendingUp,
  ArrowLeft,
  CheckCircle2,
  Package,
  Boxes,
  CircleDollarSign,
} from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Bento Grid Features — "همه چیز برای مدیریت دقیق دکان و شرکت"
 *
 * Layout (desktop ≥ lg):
 *   ┌───────────────┬───────────────┐
 *   │   Card 1 (L)  │   Card 2 (M)  │
 *   │   POS         │   قرض‌ها       │
 *   │               ├───────────────┤
 *   │               │   Card 3 (M)  │
 *   ├───────────────┴───────────────┤
 *   │   Card 4 (Wide — P&L Reports) │
 *   └───────────────────────────────┘
 *
 * Mobile: stacks 1fr / 1fr / 1fr / 1fr.
 */
export function Features() {
  return (
    <section
      id="features"
      dir="rtl"
      className="relative bg-white py-20 sm:py-28"
      aria-labelledby="features-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            <Boxes className="h-3.5 w-3.5 text-blue-600" />
            امکانات کلیدی
          </span>
          <h2
            id="features-headline"
            className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            همه چیز برای مدیریت دقیق{" "}
            <span className="text-gradient-blue">دکان و شرکت</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            از ثبت فروش تا گزارش‌گیری حرفه‌ای — همه ابزارهای لازم برای تجارت مدرن
            در یک نرم‌افزار واحد، سریع و آفلاین.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Card 1 — Large POS card (spans 1 col × 2 rows on lg) */}
          <Reveal as="article" className="lg:row-span-2 group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-premium p-6 sm:p-8 hover:shadow-premium-lg transition-all duration-300 h-full">
            {/* Decorative gradient corner */}
            <div
              aria-hidden
              className="absolute -top-16 -left-16 h-48 w-48 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-premium">
                  <Barcode className="h-6 w-6" />
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5">
                  محبوب‌ترین
                </span>
              </div>
              <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-slate-900">
                فروش سریع با POS
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                با اسکن بارکد یا یک کلیک، فروش را در چند ثانیه ثبت کنید. صفحه
                فروشگاهی ساده برای دکاندار، سریع برای مشتری. پشتیبانی از چاپ بل،
                تخفیف، و چند نوع پرداخت (نقد، قرض، کارت).
              </p>

              {/* Visual: POS illustration */}
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-1.5 rounded-full bg-blue-600" />
                    <div>
                      <p className="text-[10px] text-slate-500">جلسه فروش</p>
                      <p className="text-xs font-bold text-slate-800 num-fa">
                        #۱۲۴۰ · ۱۴:۳۲
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500">مجموع</p>
                    <p className="text-sm font-extrabold text-blue-700 num-fa">
                      ۸٬۴۵۰ ؋
                    </p>
                  </div>
                </div>
                {/* Barcode strip */}
                <div className="flex h-10 items-stretch gap-0.5 rounded-md bg-white p-1.5 overflow-hidden">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-slate-800"
                      style={{
                        width: `${[1, 2, 1, 3, 1, 2, 1, 1, 2, 1][i % 10]}px`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between text-[8px] font-mono text-slate-400 num-fa">
                  <span>۸ ۴ ۲۱۰ ۹۹۰۱۱</span>
                  <span>SCAN OK ✓</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {[
                  "چاپ بل خودکار بعد از هر فروش",
                  "پشتیبانی از بارکدخوان و ترازوی دیجیتال",
                  "ثبت سریع با کلیدهای میانبر کیبورد",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Card 2 — Medium: Debt notebook */}
          <Reveal as="article" delay={80} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-premium p-6 sm:p-7 hover:shadow-premium-lg transition-all duration-300 h-full">
            <div
              aria-hidden
              className="absolute -top-12 -left-12 h-32 w-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="relative">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-premium">
                <BookOpen className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-slate-900">
                کتابچه دیجیتال قرض‌ها
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                قرض مشتریان و تامین‌کنندگان را شفاف ثبت کنید. یادآوری خودکار سر
                رسید، و راپور کامل بدهی/بستانکاری.
              </p>
              {/* Mini ledger visual */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3 space-y-1.5">
                {[
                  { name: "احمد رضا", amt: "۲٬۵۰۰ ؋", days: "۳ روز" },
                  { name: "محمد یوسف", amt: "۸٬۰۰۰ ؋", days: "امروز" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-[11px] bg-white rounded-lg px-2.5 py-1.5"
                  >
                    <span className="font-medium text-slate-700">{r.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="font-bold text-amber-600 num-fa">{r.amt}</span>
                      <span className="text-[9px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded num-fa">
                        {r.days}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 3 — Medium: Smart warehouse */}
          <Reveal as="article" delay={160} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-premium p-6 sm:p-7 hover:shadow-premium-lg transition-all duration-300 h-full">
            <div
              aria-hidden
              className="absolute -top-12 -left-12 h-32 w-32 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="relative">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-premium">
                <Warehouse className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg sm:text-xl font-extrabold text-slate-900">
                مدیریت هوشمند گدام
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                موجودی هر جنس را در لحظه ببینید. هشدار کمبود، انتقال بین شعبه‌ها،
                و تاریخ انقضای کالاها — همه خودکار.
              </p>
              {/* Stock bars visual */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/50 p-3 space-y-2">
                {[
                  { name: "برنج کابل", pct: 78, tone: "bg-emerald-500" },
                  { name: "روغن غاز",  pct: 22, tone: "bg-amber-500" },
                  { name: "شکر سفید",  pct: 56, tone: "bg-blue-500" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="font-medium text-slate-700">{s.name}</span>
                      <span className="text-slate-500 num-fa">{s.pct}٪</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.tone}`}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 4 — Wide: P&L reports (spans 3 cols on lg) */}
          <Reveal as="article" delay={240} className="lg:col-span-3 group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-premium p-6 sm:p-8 hover:shadow-premium-lg transition-all duration-300">
            <div
              aria-hidden
              className="absolute -top-16 -right-16 h-56 w-56 bg-gradient-to-br from-blue-100 to-emerald-50 rounded-full blur-3xl opacity-70 group-hover:opacity-90 transition-opacity"
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-2">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-premium">
                  <BarChart3 className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900">
                  گزارش دقیق فایده و تاوان
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                  با یک کلیک، فایده خالص، خرج‌ها، و تاوان ماهانه را به تفکیک جنس،
                  مشتری، یا شعبه ببینید. خروجی PDF/Excel برای حسابدار یا بانک.
                </p>
                <a
                  href="#pricing"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800 group/link"
                >
                  مشاهده نمونه راپورها
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover/link:-translate-x-1" />
                </a>
              </div>

              {/* Report visualization */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/40 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[11px] text-slate-500">فایده خالص ماه جاری</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 num-fa">
                        ۲۳٬۱۲۰ ؋
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full num-fa">
                      <TrendingUp className="h-3.5 w-3.5" />
                      +۴۷٪
                    </span>
                  </div>

                  {/* Combined bar + line chart */}
                  <div className="relative h-32 sm:h-40">
                    <div className="absolute inset-0 flex items-end justify-between gap-1.5 sm:gap-2">
                      {[
                        { v: 45, label: "حمل" },
                        { v: 58, label: "ثور" },
                        { v: 50, label: "جوزا" },
                        { v: 72, label: "سرطان" },
                        { v: 65, label: "اسد" },
                        { v: 88, label: "سنبله" },
                        { v: 95, label: "میزان" },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                          <div
                            className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-500"
                            style={{ height: `${bar.v}%` }}
                          />
                          <span className="mt-1.5 text-[9px] sm:text-[10px] text-slate-500 num-fa">
                            {bar.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Trend line overlay */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M5,65 L19,55 L33,60 L48,40 L62,42 L76,18 L95,12"
                        fill="none"
                        stroke="rgb(5, 150, 105)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  {/* Footer KPIs */}
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { icon: <CircleDollarSign className="h-3.5 w-3.5" />, label: "فروش کل", val: "۸۴٬۵۰۰ ؋" },
                      { icon: <Package className="h-3.5 w-3.5" />, label: "خرج جنس", val: "۵۸٬۳۸۰ ؋" },
                      { icon: <TrendingUp className="h-3.5 w-3.5" />, label: "حاشیه فایده", val: "۳۰.۹٪" },
                    ].map((kpi, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-white border border-slate-100 p-2 sm:p-2.5"
                      >
                        <div className="flex items-center gap-1 text-slate-400">
                          {kpi.icon}
                          <span className="text-[9px] sm:text-[10px] font-medium">{kpi.label}</span>
                        </div>
                        <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-800 num-fa">
                          {kpi.val}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
