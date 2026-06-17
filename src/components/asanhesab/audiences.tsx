"use client";

import { useState } from "react";
import { Store, Boxes, Pill, Check, ArrowLeft } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Audiences — tabs for different user types.
 * دکاندار / عمده‌فروش / داروساز
 *
 * Each tab shows: hero copy + 4 feature bullets + visual mockup.
 * RTL aware — the active tab indicator animates between tabs.
 */
export function Audiences() {
  const [active, setActive] = useState<0 | 1 | 2>(0);

  const tabs = [
    {
      id: 0,
      key: "shopkeeper",
      label: "دکاندار",
      icon: <Store className="h-4 w-4" />,
      title: "برای دکاندار که می‌خواهد سریع‌تر بفروشد",
      body: "اگر یک دکان خواربار، لوازم خانگی، یا الکترونیک دارید — آسان حساب سرعت فروش شما را چند برابر می‌کند. با بارکدخوان، در ۳ ثانیه فروش را ثبت کنید، بل چاپ کنید، و سر دومین مشتری را نگه دارید.",
      features: [
        "فروش با بارکد در کمتر از ۳ ثانیه",
        "چاپ بل استاندارد با لوگوی دکان شما",
        "مدیریت قرض مشتریان دایمی با یادآوری خودکار",
        "راپور روزانه فروش و فایده در یک نگاه",
      ],
      visual: <ShopkeeperMockup />,
      tone: "blue" as const,
    },
    {
      id: 1,
      key: "wholesaler",
      label: "عمده‌فروش",
      icon: <Boxes className="h-4 w-4" />,
      title: "برای عمده‌فروش که با چندین شعبه کار می‌کند",
      body: "اگر تجارت عمده فروشی دارید — چه از کاپیسا، چه مزار، چه هرات — آسان حساب موجودی چندین گدام را در یک‌جا مدیریت می‌کند. انتقال جنس بین شعبه‌ها، قیمت‌گذاری مختلف برای هر مشتری، و راپور فایده به تفکیک شعبه.",
      features: [
        "مدیریت چندین گدام و شعبه در یک سیستم",
        "قیمت‌گذاری مختلف برای عمده‌فروشان، خرده‌فروشان، و دکانداران",
        "انتقال موجودی بین شعبه‌ها با راپور کامل",
        "راپور فایده و تاوان به تفکیک هر شعبه",
      ],
      visual: <WholesalerMockup />,
      tone: "emerald" as const,
    },
    {
      id: 2,
      key: "pharmacist",
      label: "داروساز",
      icon: <Pill className="h-4 w-4" />,
      title: "برای داروساز که دقت و امنیت می‌خواهد",
      body: "داروخانه شما نیاز به دقت بیشتر دارد — تاریخ انقضا، دستور نسخه، و ردیابی هر دارو. آسان حساب با هشدار خودکار تاریخ انقضا و مدیریت دسته‌بندی داروها، خطا را به حداقل می‌رساند و اعتماد بیماران را حفظ می‌کند.",
      features: [
        "هشدار خودکار تاریخ انقضای داروها",
        "گدام به تفکیک دسته‌بندی دارویی (OTC, نسخه‌ای, سرد)",
        "ثبت نسخه و بیمار با تاریخچه کامل خرید",
        "راپور فروش داروهای پر مصرف برای سفارش مجدد",
      ],
      visual: <PharmacistMockup />,
      tone: "violet" as const,
    },
  ];

  const activeTab = tabs[active];
  const toneClasses = {
    blue:    { active: "bg-blue-600 text-white",            soft: "bg-blue-50 text-blue-700",            ring: "ring-blue-200" },
    emerald: { active: "bg-emerald-600 text-white",         soft: "bg-emerald-50 text-emerald-700",      ring: "ring-emerald-200" },
    violet:  { active: "bg-violet-600 text-white",          soft: "bg-violet-50 text-violet-700",        ring: "ring-violet-200" },
  } as const;
  const t = toneClasses[activeTab.tone];

  return (
    <section
      id="audiences"
      dir="rtl"
      className="relative bg-gradient-to-b from-white to-slate-50/50 py-20 sm:py-28"
      aria-labelledby="audiences-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${t.soft} border-current/10`}>
              {activeTab.icon}
              ساخته شده برای شما
            </span>
            <h2
              id="audiences-headline"
              className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2]"
            >
              هر تجارتی، یک راه‌حل{" "}
              <span className="text-gradient-blue">ویژه</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              چه دکان خواربار باشید، چه عمده‌فروش چندشعبه‌ای، چه داروخانه — آسان حساب
              خود را با نیاز شما تنظیم می‌کند. نوع تجارت خود را انتخاب کنید.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={120}>
          <div className="mt-10 sm:mt-12 flex justify-center">
            <div
              role="tablist"
              aria-label="انتخاب نوع تجارت"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-premium"
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
                        ? `${t.active} shadow-premium`
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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

        {/* Active panel */}
        <div
          role="tabpanel"
          id={`panel-${activeTab.key}`}
          aria-labelledby={`tab-${activeTab.key}`}
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Copy side */}
          <Reveal key={`copy-${active}`} delay={100}>
            <div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full ${t.soft} px-3 py-1 text-xs font-bold`}
              >
                {activeTab.icon}
                {activeTab.label}
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                {activeTab.title}
              </h3>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {activeTab.body}
              </p>
              <ul className="mt-6 space-y-3">
                {activeTab.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${t.soft}`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base text-slate-700 font-medium">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                شروع کنید — مخصوص {activeTab.label}
                <ArrowLeft className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          {/* Visual side */}
          <Reveal key={`visual-${active}`} delay={180}>
            <div className="relative">
              <div
                aria-hidden
                className={`absolute -inset-6 -z-10 rounded-3xl ${t.soft} opacity-50 blur-2xl`}
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
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-premium-lg overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-100">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="mr-auto text-[10px] text-slate-400">آسان حساب · ۱۴۰۵/۰۳/۲۷</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function ShopkeeperMockup() {
  return (
    <MockShell>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] text-slate-500">فروش جدید</p>
          <p className="text-sm font-bold text-slate-800 num-fa">#۱۲۴۰ · ۱۴:۳۲</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
          ✓ ثبت شد
        </span>
      </div>
      {/* Barcode scan line */}
      <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 text-blue-700 text-xs font-bold">
              A
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">برنج کابل ۵kg</p>
              <p className="text-[10px] text-slate-500 num-fa">بارکد: ۸۴۲۱۰۹۹۰</p>
            </div>
          </div>
          <p className="text-xs font-bold text-blue-700 num-fa">۵۵۰ ؋</p>
        </div>
      </div>
      {/* Item list */}
      <ul className="space-y-1.5 mb-3">
        {[
          { n: "روغن غاز ۵L", q: "×۲", a: "۱٬۷۰۰ ؋" },
          { n: "شکر سفید ۱kg", q: "×۳", a: "۲۴۰ ؋" },
          { n: "چای علی‌قلی ۵۰۰g", q: "×۱", a: "۳۲۰ ؋" },
        ].map((i, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between text-[11px] bg-white rounded-md px-2 py-1.5 border border-slate-100"
          >
            <span className="font-medium text-slate-700">{i.n}</span>
            <span className="text-slate-400 num-fa">{i.q}</span>
            <span className="font-bold text-slate-800 num-fa">{i.a}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <span className="text-xs font-bold text-slate-700">مجموع</span>
        <span className="text-lg font-extrabold text-gradient-blue num-fa">۸٬۴۵۰ ؋</span>
      </div>
      <button className="mt-3 w-full rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-bold py-2.5">
        چاپ بل و تکمیل فروش
      </button>
    </MockShell>
  );
}

function WholesalerMockup() {
  const branches = [
    { name: "گدام اصلی کابل", items: "۱٬۲۴۰", val: "۸۹۰٬۰۰۰ ؋", pct: 78 },
    { name: "شعبه مزارشریف", items: "۶۸۰",   val: "۴۲۰٬۰۰۰ ؋", pct: 52 },
    { name: "شعبه هرات",     items: "۳۲۰",   val: "۲۱۰٬۰۰۰ ؋", pct: 28 },
  ];
  return (
    <MockShell>
      <p className="text-xs font-bold text-slate-800 mb-3">مدیریت چند شعبه</p>
      <ul className="space-y-2.5">
        {branches.map((b, i) => (
          <li key={i} className="rounded-lg bg-slate-50 border border-slate-100 p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-800">{b.name}</p>
                  <p className="text-[10px] text-slate-500 num-fa">{b.items} جنس</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 num-fa">{b.val}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-l from-emerald-500 to-emerald-400"
                style={{ width: `${b.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-blue-50 p-2.5 text-center">
          <p className="text-[10px] text-slate-500">فایده کل ماه</p>
          <p className="text-sm font-extrabold text-gradient-blue num-fa">۲۳٬۱۲۰ ؋</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-2.5 text-center">
          <p className="text-[10px] text-slate-500">رشد فایده</p>
          <p className="text-sm font-extrabold text-emerald-700 num-fa">+۴۷٪</p>
        </div>
      </div>
    </MockShell>
  );
}

function PharmacistMockup() {
  return (
    <MockShell>
      <p className="text-xs font-bold text-slate-800 mb-3">مدیریت داروخانه</p>
      {/* Expiry alert */}
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3 flex items-start gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs">
          ⚠
        </span>
        <div>
          <p className="text-[11px] font-bold text-amber-800">۳ دارو در ۳۰ روز آینده منقضی می‌شوند</p>
          <p className="text-[10px] text-amber-700 mt-0.5">آموکسی‌سیلین ۵۰۰mg · پاراسیتامول · اسید فولیک</p>
        </div>
      </div>
      {/* Categories */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { c: "OTC", count: "۱۲۰", tone: "bg-violet-50 text-violet-700" },
          { c: "نسخه‌ای", count: "۸۵", tone: "bg-blue-50 text-blue-700" },
          { c: "سرد", count: "۱۲", tone: "bg-cyan-50 text-cyan-700" },
        ].map((cat, i) => (
          <div key={i} className={`rounded-lg ${cat.tone} p-2.5 text-center`}>
            <p className="text-[10px] font-medium opacity-80">{cat.c}</p>
            <p className="text-base font-extrabold num-fa">{cat.count}</p>
          </div>
        ))}
      </div>
      {/* Top medicines */}
      <p className="text-[10px] font-bold text-slate-600 mb-1.5">داروهای پر مصرف</p>
      <ul className="space-y-1">
        {[
          { n: "آموکسی‌سیلین ۵۰۰mg", sold: "۴۸", stock: "۱۲", low: false },
          { n: "پاراسیتامول ۵۰۰mg", sold: "۳۶", stock: "۲۴", low: false },
          { n: "لوزنگ سرفه", sold: "۲۸", stock: "۸",  low: true  },
        ].map((m, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-[11px] bg-white rounded-md px-2 py-1.5 border border-slate-100"
          >
            <span className="font-medium text-slate-700">{m.n}</span>
            <span className="text-slate-400 num-fa">فروخته: {m.sold}</span>
            <span className={`font-bold num-fa ${m.low ? "text-amber-600" : "text-slate-800"}`}>
              موجود: {m.stock}
            </span>
          </li>
        ))}
      </ul>
    </MockShell>
  );
}
