"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * Testimonials — 3 cards with avatars (initials), names, business types,
 * star ratings, and Persian quotes from Afghan shopkeepers.
 *
 * Note: names/quotes are illustrative — replace with real reviews before launch.
 */
export function Testimonials() {
  const testimonials = [
    {
      name: "احمد رضا کریمی",
      role: "دکان خواربار · کابل",
      initials: "ا.ک",
      tone: "blue",
      stars: 5,
      quote:
        "قبل از آسان حساب، قرض مشتریانم را در سه دفترچه مختلف می‌نوشتم. حالا در یک کلیک می‌بینم چه کسی چقدر به من قرض دارد. در ۲ ماه، ۱۸٬۰۰۰ افغانی قرض فراموش‌شده را پس گرفتم!",
    },
    {
      name: "محمد یوسف نوری",
      role: "عمده‌فروش · مزارشریف",
      initials: "م.ن",
      tone: "emerald",
      stars: 5,
      quote:
        "دو شعبه دارم — یکی در مزار و یکی در کابل. قبلش موجودی هر شعبه را تلفنی می‌گرفتم. حالا در یک صفحه می‌بینم کدام شعبه چی دارد و کدام کم دارد. آسان حساب وقت مرا نصف کرده.",
    },
    {
      name: "دکتر فرزانه احمدی",
      role: "داروخانه · هرات",
      initials: "ف.ا",
      tone: "violet",
      stars: 5,
      quote:
        "به‌عنوان داروساز، بزرگ‌ترین ترسم از تاریخ انقضای داروها بود. آسان حساب خودش به من یادآوری می‌کند. ماه گذشته ۳۸٬۰۰۰ افغانی ضرر از داروهای منقضی‌شده را جلوگیری کردم. معجزه است.",
    },
  ];

  return (
    <section
      dir="rtl"
      className="relative bg-gradient-to-b from-slate-50/60 to-white py-20 sm:py-28"
      aria-labelledby="testimonials-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="رضایت کاربران"
          eyebrowIcon={Star}
          title="تجار افغان به آسان حساب"
          highlight="اعتماد کرده‌اند"
          subtitle="بیش از ۵٬۰۰۰ دکان در سراسر افغانستان از آسان حساب استفاده می‌کنند. این‌ها چند نمونه از تجربه‌های واقعی آن‌هاست."
          tone="amber"
        />

        {/* Average rating banner */}
        <Reveal delay={80}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-5 w-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <span className="text-lg font-extrabold text-slate-900 num-fa">۴.۹ / ۵</span>
            <span className="text-sm text-slate-500">از بیش از ۸۰۰ نظر کاربر</span>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <TestimonialCard {...t} />
            </Reveal>
          ))}
        </div>

        {/* Trust strip */}
        <Reveal delay={400}>
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-premium">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { stat: "۵٬۰۰۰+", label: "دکان فعال" },
                { stat: "۳۲", label: "ولایت تحت پوشش" },
                { stat: "۱۲۰M+ ؋", label: "افغانی ثبت شده" },
                { stat: "۹۸٪", label: "نرخ تمدید لایسنس" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gradient-blue num-fa">
                    {s.stat}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  initials,
  tone,
  stars,
  quote,
}: {
  name: string;
  role: string;
  initials: string;
  tone: "blue" | "emerald" | "violet";
  stars: number;
  quote: string;
}) {
  const tones = {
    blue:    "from-blue-600 to-blue-700",
    emerald: "from-emerald-600 to-emerald-700",
    violet:  "from-violet-600 to-violet-700",
  } as const;

  return (
    <article className="relative h-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col">
      {/* Quote icon watermark */}
      <Quote
        className="absolute top-5 left-5 h-10 w-10 text-slate-100"
        aria-hidden
      />

      {/* Stars */}
      <div className="relative flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < stars
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 fill-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="relative text-sm sm:text-base text-slate-700 leading-relaxed flex-1">
        «{quote}»
      </p>

      {/* Author */}
      <div className="relative mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${tones[tone]} text-white font-bold text-sm shadow-premium`}
        >
          {initials}
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </article>
  );
}
