"use client";

import { Check, Star, Sparkles, Download, ShieldCheck, Zap, Lock, Gift } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * Pricing — 2 cards with anchoring, bonus bundle, and reassurance row.
 */
export function Pricing() {
  return (
    <section
      id="pricing"
      dir="rtl"
      className="relative bg-gradient-to-b from-white via-slate-50/40 to-white py-20 sm:py-28"
      aria-labelledby="pricing-headline"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[50rem] bg-blue-100/30 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="قیمت‌گذاری ساده"
          eyebrowIcon={Sparkles}
          title="یک‌بار خرید کنید،"
          highlight="همیشه استفاده کنید"
          subtitle="بدون فیس ماهوار. بدون هزینه‌های پنهان. بدون اشتراک اجباری. یک بار پرداخت می‌کنید، برای همیشه مالک هستید."
          tone="blue"
        />

        {/* Pricing cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          <Reveal>
            <PricingCard
              tier="نسخه رایگان"
              price="۰"
              unit="افغانی"
              tagline="برای دکان‌های کوچک که تازه شروع می‌کنند"
              icon={<Download className="h-5 w-5" />}
              iconTone="slate"
              features={[
                { label: "ثبت نامحدود فروشات روزانه", included: true },
                { label: "مدیریت موجودی گدام", included: true },
                { label: "مدیریت قرض مشتریان", included: true },
                { label: "پشتیبانی از تاریخ هجری شمسی", included: true },
                { label: "۲ زبان: دری و پشتو", included: true },
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
          </Reveal>

          <Reveal delay={120}>
            <PricingCard
              tier="نسخه معیاری"
              price="۲٬۹۰۰"
              unit="افغانی · یک‌بار"
              tagline="ابزارهای کامل برای رشد و حرفه‌ای شدن تجارت"
              icon={<ShieldCheck className="h-5 w-5" />}
              iconTone="blue"
              highlighted
              popularBadge
              bonusNote="شامل هدیه: ۱ ساعت آموزش واتساپ رایگان + ضمانت ۷ روزه برگشت پول"
              features={[
                { label: "ثبت نامحدود فروشات روزانه", included: true },
                { label: "مدیریت موجودی گدام", included: true },
                { label: "مدیریت قرض مشتریان", included: true },
                { label: "پشتیبانی از تاریخ هجری شمسی", included: true },
                { label: "۲ زبان: دری و پشتو", included: true },
                { label: "چاپ بل فروش با لوگوی شما", included: true },
                { label: "صفحه POS حرفه‌ای + بارکدخوان", included: true },
                { label: "راپور فایده خالص و P&L", included: true },
                { label: "بکاپ اتوماتیک ابری", included: true },
              ]}
              cta={{
                label: "خرید لایسنس (واتساپ)",
                icon: <WhatsAppIcon className="h-4 w-4" />,
                variant: "solid",
              }}
            />
          </Reveal>
        </div>

        {/* Bonus bundle strip */}
        <Reveal delay={180}>
          <div className="mt-8 rounded-2xl border border-blue-200 bg-gradient-to-l from-blue-50 to-emerald-50/50 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-premium">
                <Gift className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  با خرید نسخه معیاری، این هدایا را هم می‌گیرید:
                </h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                    ۱ ساعت آموزش واتساپ رایگان
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                    ضمانت ۷ روزه برگشت پول
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                    پشتیبانی دایمی واتساپ
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                    آپدیت‌های رایگان ۱ ساله
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reassurance row */}
        <Reveal delay={240}>
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
              <Lock className="h-4 w-4 text-slate-600" />
              پرداخت امن از طریق واتساپ
            </span>
            <span className="inline-flex items-center gap-1.5">
              <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
              پاسخگویی در کمتر از ۱۰ دقیقه
            </span>
          </div>
        </Reveal>
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
  bonusNote,
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
  bonusNote?: string;
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
      {bonusNote && (
        <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 inline-flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg">
          <Gift className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          {bonusNote}
        </p>
      )}
      <div className="mt-3 h-px bg-slate-100" />

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
