"use client";

import { Check, Star, Sparkles, Download, ShieldCheck, Zap } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";

/**
 * Pricing — 2 cards.
 * Card 1: نسخه رایگان (Free)
 * Card 2: نسخه معیاری (Standard — highlighted, with "محبوب‌ترین" star badge)
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      dir="rtl"
      className="relative bg-gradient-to-b from-white via-slate-50/40 to-white py-20 sm:py-28"
      aria-labelledby="pricing-headline"
    >
      {/* Soft backdrop */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[50rem] bg-blue-100/30 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            قیمت‌گذاری ساده
          </span>
          <h2
            id="pricing-headline"
            className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            یک‌بار خرید کنید،{" "}
            <span className="text-gradient-blue">همیشه استفاده کنید</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            بدون فیس ماهوار. بدون هزینه‌های پنهان.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* Card 1 — Free */}
          <PricingCard
            tier="نسخه رایگان"
            price="۰"
            unit="افغانی"
            tagline="برای دکان‌های کوچک که تازه شروع می‌کنند"
            icon={<Download className="h-5 w-5" />}
            iconTone="slate"
            features={[
              { label: "ثبت فروشات روزانه", included: true },
              { label: "مدیریت موجودی گدام", included: true },
              { label: "مدیریت قرض مشتریان", included: true },
              { label: "پشتیبانی از تاریخ هجری شمسی", included: true },
              { label: "چاپ بل فروش", included: false },
              { label: "صفحه POS حرفه‌ای", included: false },
              { label: "راپور فایده خالص", included: false },
              { label: "بکاپ اتوماتیک ابری", included: false },
            ]}
            cta={{
              label: "دانلود رایگان",
              icon: <Download className="h-4 w-4" />,
              variant: "ghost",
            }}
          />

          {/* Card 2 — Standard (highlighted) */}
          <PricingCard
            tier="نسخه معیاری"
            price="۲٬۹۰۰"
            unit="افغانی / یک‌بار"
            tagline="برایط کامل برای رشد و حرفه‌ای شدن تجارت"
            icon={<ShieldCheck className="h-5 w-5" />}
            iconTone="blue"
            highlighted
            popularBadge
            features={[
              { label: "ثبت فروشات روزانه", included: true },
              { label: "مدیریت موجودی گدام", included: true },
              { label: "مدیریت قرض مشتریان", included: true },
              { label: "پشتیبانی از تاریخ هجری شمسی", included: true },
              { label: "چاپ بل فروش", included: true },
              { label: "صفحه POS حرفه‌ای", included: true },
              { label: "راپور فایده خالص", included: true },
              { label: "بکاپ اتوماتیک ابری", included: true },
            ]}
            cta={{
              label: "خرید لایسنس (واتساپ)",
              icon: <WhatsAppIcon className="h-4 w-4" />,
              variant: "solid",
            }}
          />
        </div>

        {/* Reassurance row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-blue-600" />
            نصب در ۵ دقیقه
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            ضمانت ۷ روزه برگشت پول
          </span>
          <span className="inline-flex items-center gap-1.5">
            <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
            پاسخگویی واتساپ در کمتر از ۱۰ دقیقه
          </span>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  price,
  unit,
  tagline,
  icon,
  iconTone,
  features,
  cta,
  highlighted,
  popularBadge,
}: {
  tier: string;
  price: string;
  unit: string;
  tagline: string;
  icon: React.ReactNode;
  iconTone: "blue" | "slate";
  features: { label: string; included: boolean }[];
  cta: { label: string; icon: React.ReactNode; variant: "solid" | "ghost" };
  highlighted?: boolean;
  popularBadge?: boolean;
}) {
  const tones = {
    blue:  "from-blue-600 to-blue-700",
    slate: "from-slate-600 to-slate-700",
  } as const;

  return (
    <article
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col h-full transition-all duration-300 ${
        highlighted
          ? "bg-white border-2 border-blue-600 shadow-premium-lg lg:-translate-y-2 hover:-translate-y-3"
          : "bg-white border border-slate-200 shadow-premium hover:shadow-premium-lg"
      }`}
    >
      {popularBadge && (
        <div className="absolute -top-3 right-6 sm:right-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-premium">
            <Star className="h-3.5 w-3.5 fill-white" />
            محبوب‌ترین
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[iconTone]} text-white shadow-premium`}
          >
            {icon}
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">{tier}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{tagline}</p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-2">
        <span
          className={`text-4xl sm:text-5xl font-extrabold num-fa ${
            highlighted ? "text-gradient-blue" : "text-slate-900"
          }`}
        >
          {price}
        </span>
        <span className="text-sm font-medium text-slate-500">{unit}</span>
      </div>
      <div className="mt-1 h-px bg-slate-100" />

      {/* Features */}
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li
            key={f.label}
            className={`flex items-start gap-2.5 text-sm ${
              f.included ? "text-slate-700" : "text-slate-400"
            }`}
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                f.included
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-slate-100 text-slate-300"
              }`}
            >
              {f.included ? (
                <Check className="h-3 w-3" strokeWidth={3} />
              ) : (
                <span className="text-[10px]">✕</span>
              )}
            </span>
            <span className={f.included ? "" : "line-through"}>{f.label}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        {cta.variant === "solid" ? (
          <a
            href="#download"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-3.5 text-base font-bold text-white shadow-premium hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            {cta.icon}
            <span>{cta.label}</span>
          </a>
        ) : (
          <a
            href="#download"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-all duration-300"
          >
            {cta.icon}
            <span>{cta.label}</span>
          </a>
        )}
      </div>
    </article>
  );
}
