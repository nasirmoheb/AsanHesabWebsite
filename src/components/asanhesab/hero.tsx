"use client";

import { Zap, Clock, Shield, Headphones, Monitor, Play, ChevronDown, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { LaptopMockup } from "./laptop-mockup";
import { Reveal } from "./reveal";

/**
 * Hero — the hook.
 * Top badge → headline (with "آسان شده" in blue) → sub-headline →
 * two CTAs → 4 trust pills → laptop mockup with floating glass card →
 * scroll indicator.
 */
export function Hero() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-soft-radial"
      aria-labelledby="hero-headline"
    >
      {/* Subtle grid texture overlay */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none" aria-hidden />

      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-24 right-1/2 translate-x-1/2 h-72 w-[40rem] bg-blue-200/30 blur-3xl rounded-full pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-40 -left-20 h-64 w-64 bg-emerald-200/25 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Top badge */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
              <span className="num-fa">۱۰۰٪ آفلاین — بدون نیاز به اینترنت</span>
            </span>
          </Reveal>

          {/* Headline */}
          <Reveal delay={60}>
            <h1
              id="hero-headline"
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.25] sm:leading-[1.2] max-w-4xl"
            >
              حسابداری،{" "}
              <span className="text-gradient-blue">آسان شده</span>{" "}
              برای دکانداران افغانستان
            </h1>
          </Reveal>

          {/* Sub-headline */}
          <Reveal delay={120}>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
              سیستم حسابداری و فروشگاهی مدرن برای تجار افغان. ثبت دقیق فروشات،
              مدیریت قرض‌ها، و پشتیبانی کامل از زبان‌های دری، پشتو و تاریخ هجری شمسی.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={180}>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#download"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 sm:px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white shadow-premium-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>دریافت نسخه رایگان (واتساپ)</span>
              </a>
              <a
                href="#video"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white/70 backdrop-blur-sm px-6 sm:px-7 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-white transition-all duration-300"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </span>
                <span>تماشای ویدیو</span>
              </a>
            </div>
          </Reveal>

          {/* Inline reassurance under CTAs */}
          <Reveal delay={220}>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              بدون کارت اعتباری · نصب در ۵ دقیقه · همیشه رایگان برای شروع
            </p>
          </Reveal>

          {/* Trust badges — 4 soft pills */}
          <Reveal delay={260}>
            <ul className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-3xl">
              <TrustPill icon={<Clock className="h-4 w-4" />} label="نصب در ۵ دقیقه" tone="blue" />
              <TrustPill icon={<Shield className="h-4 w-4" />} label="کاملاً آفلاین و امن" tone="emerald" />
              <TrustPill icon={<Headphones className="h-4 w-4" />} label="پشتیبانی دایمی" tone="violet" />
              <TrustPill icon={<Monitor className="h-4 w-4" />} label="ویندوز ۱۰ و ۱۱" tone="slate" />
            </ul>
          </Reveal>
        </div>

        {/* Hero image — laptop mockup */}
        <Reveal delay={320} className="relative mt-16 sm:mt-20 lg:mt-24">
          <LaptopMockup />
        </Reveal>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-slate-400" aria-hidden>
          <span className="text-xs font-medium tracking-wide">برای دیدن بیشتر اسکرول کنید</span>
          <div className="relative h-9 w-5 rounded-full border-2 border-slate-300 flex justify-center pt-1.5">
            <span className="block h-2 w-1 rounded-full bg-slate-400 animate-bounce" />
          </div>
          <ChevronDown className="h-3 w-3 -mt-1" />
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none"
      />
    </section>
  );
}

function TrustPill({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "blue" | "emerald" | "violet" | "slate";
}) {
  const tones = {
    blue:    { wrap: "bg-blue-50/80 border-blue-100 text-blue-700", icon: "bg-blue-100 text-blue-700" },
    emerald: { wrap: "bg-emerald-50/80 border-emerald-100 text-emerald-700", icon: "bg-emerald-100 text-emerald-700" },
    violet:  { wrap: "bg-violet-50/80 border-violet-100 text-violet-700", icon: "bg-violet-100 text-violet-700" },
    slate:   { wrap: "bg-slate-50/80 border-slate-200 text-slate-700", icon: "bg-slate-100 text-slate-700" },
  } as const;
  const t = tones[tone];
  return (
    <li
      className={`inline-flex items-center justify-center gap-2 rounded-xl border ${t.wrap} px-3 py-2.5 text-xs sm:text-sm font-semibold backdrop-blur-sm`}
    >
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${t.icon}`}>
        {icon}
      </span>
      <span className="num-fa">{label}</span>
    </li>
  );
}
