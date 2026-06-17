"use client";

import { Check, Sparkles, ArrowLeft } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * SolutionIntro — the "aha" transition.
 * "با آسان حساب، همه چیز آسان می‌شود."
 * Frames the value prop + 4 key promises + CTA.
 */
export function SolutionIntro() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
      aria-labelledby="solution-headline"
    >
      {/* Soft blue radial backdrop */}
      <div
        aria-hidden
        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 h-[30rem] w-[60rem] bg-blue-100/30 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                راه‌حل
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2
                id="solution-headline"
                className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2]"
              >
                با آسان حساب، همه چیز{" "}
                <span className="text-gradient-blue">آسان می‌شود</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
                یک سیستم واحد که فروش، گدام، قرض و راپور را در یک‌جا مدیریت می‌کند.
                طراحی شده برای دکانداران افغان — با زبان دری و پشتو، تاریخ هجری شمسی،
                و چاپ بلهای استاندارد افغانستان.
              </p>
            </Reveal>

            {/* 4 promises */}
            <ul className="mt-8 space-y-3.5">
              {[
                "هر فروش در کمتر از ۵ ثانیه ثبت می‌شود — با بارکد یا کلیک.",
                "موجودی گدام و قرض‌ها در هر لحظه شفاف و قابل دیدن است.",
                "راپور فایده خالص با یک کلیک — برای حسابدار، بانک، یا خودتان.",
                "کاملاً آفلاین. اینترنت قطع شود هم، تجارت شما نمی‌ایستد.",
              ].map((promise, i) => (
                <Reveal key={i} delay={180 + i * 60}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                      {promise}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={480}>
              <a
                href="#download"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                شروع کنید — رایگان است
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          {/* Right: before/after visual */}
          <Reveal delay={120}>
            <BeforeAfter />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <div className="relative">
      {/* Before card (faded, slightly rotated) */}
      <div className="absolute -top-4 -right-2 sm:-right-6 w-[88%] rotate-3 z-0">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 shadow-premium opacity-90">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              قبل
            </span>
            <span className="text-[10px] text-rose-400">دفتر کاغذی</span>
          </div>
          <div className="space-y-2">
            {[1, 1, 0.6, 1, 0.4].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded-full bg-rose-200/70"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 rounded-md bg-rose-100/60" />
            ))}
          </div>
        </div>
      </div>

      {/* After card (vibrant, on top) */}
      <div className="relative mt-12 sm:mt-16 z-10">
        <div className="rounded-3xl border-2 border-blue-200 bg-white p-6 shadow-premium-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              بعد · آسان حساب
            </span>
            <span className="text-[10px] text-slate-400 num-fa">۱۴۰۵/۰۳/۲۷</span>
          </div>

          {/* Big number */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] text-slate-500">فایده خالص این ماه</p>
              <p className="text-3xl sm:text-4xl font-extrabold text-gradient-blue num-fa">
                ۲۳٬۱۲۰ ؋
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full num-fa">
              ↑ ۴۷٪
            </span>
          </div>

          {/* Mini chart */}
          <div className="mt-4 flex items-end justify-between gap-1.5 h-16">
            {[40, 55, 48, 68, 62, 82, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-blue-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* 3 KPI chips */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "فروشات", val: "۸۴٬۵۰۰ ؋" },
              { label: "قرض‌ها", val: "۱۵٬۰۰۰ ؋" },
              { label: "گدام", val: "۱٬۲۴۰ جنس" },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-lg bg-slate-50 border border-slate-100 p-2 text-center"
              >
                <p className="text-[9px] text-slate-500">{k.label}</p>
                <p className="text-[11px] font-bold text-slate-800 num-fa">{k.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
