"use client";

import { Download, Settings, Rocket, ArrowLeft } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * HowItWorks — 3-step process timeline.
 * "در ۳ قدم ساده شروع کنید"
 *
 * Steps (RTL → flows right to left):
 * 1. دانلود رایگان — دریافت نسخه از واتساپ
 * 2. نصب در ۵ دقیقه — بدون دانش تخصصی
 * 3. شروع فروش — همینه!
 */
export function HowItWorks() {
  return (
    <section
      id="how"
      dir="rtl"
      className="relative bg-gradient-to-b from-white via-blue-50/30 to-white py-20 sm:py-28"
      aria-labelledby="how-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="راه‌اندازی ساده"
          eyebrowIcon={Rocket}
          title="در ۳ قدم ساده"
          highlight="شروع کنید"
          subtitle="از دانلود تا اولین فروش، فقط ۵ دقیقه فاصله دارد. بدون دانش تخصصی، بدون تنظیمات پیچیده، بدون نیاز به اینترنت."
          tone="emerald"
        />

        {/* Steps */}
        <div className="mt-14 sm:mt-20 relative">
          {/* Connecting line (desktop only, runs behind cards) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[4.5rem] right-[16.66%] left-[16.66%] h-0.5 bg-gradient-to-l from-blue-200 via-blue-400 to-emerald-300"
          />

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <Step
              index={1}
              icon={<Download className="h-6 w-6" />}
              title="دانلود رایگان"
              body="روی دکمه واتساپ کلیک کنید، تیم ما در کمتر از ۱۰ دقیقه فایل نصب را برایتان می‌فرستد. حجم نرم‌افزار فقط ۸۵ مگابایت است."
              badge="واتساپ · ۸۵MB"
              tone="blue"
            />
            <Step
              index={2}
              icon={<Settings className="h-6 w-6" />}
              title="نصب در ۵ دقیقه"
              body="فایل را اجرا کنید، روی «بعدی» کلیک کنید، و تمام! اطلاعات دکان خود را وارد کنید — نام، آدرس، و شعبه. بدون نیاز به دانش کامپیوتر."
              badge="بدون تخصص"
              tone="violet"
              center
            />
            <Step
              index={3}
              icon={<Rocket className="h-6 w-6" />}
              title="شروع فروش!"
              body="اولین فروش خود را ثبت کنید، بل چاپ کنید، و راپور روزانه را ببینید. همین حالا تجارت شما مدرن شده است — تبریک می‌گوییم!"
              badge="آماده فروش"
              tone="emerald"
            />
          </ol>
        </div>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center gap-3">
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 px-7 py-3.5 text-base font-bold text-white shadow-premium-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              همین امروز شروع کنید — رایگان
              <ArrowLeft className="h-4 w-4" />
            </a>
            <p className="text-xs text-slate-500">
              بدون کارت اعتباری · بدون تعهد · هر زمان می‌توانید ارتقا دهید
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Step({
  index,
  icon,
  title,
  body,
  badge,
  tone,
  center,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  badge: string;
  tone: "blue" | "violet" | "emerald";
  center?: boolean;
}) {
  const tones = {
    blue:    { grad: "from-blue-600 to-blue-700",    chip: "bg-blue-50 text-blue-700",      dot: "bg-blue-500" },
    violet:  { grad: "from-violet-600 to-violet-700",chip: "bg-violet-50 text-violet-700",  dot: "bg-violet-500" },
    emerald: { grad: "from-emerald-600 to-emerald-700", chip: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  } as const;
  const t = tones[tone];

  return (
    <Reveal delay={(index - 1) * 120}>
      <li className="relative flex flex-col items-center text-center">
        {/* Number + icon circle (above the connecting line) */}
        <div className="relative z-10 mb-5">
          <div
            className={`relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${t.grad} text-white shadow-premium-lg`}
          >
            {icon}
            {/* Step number badge */}
            <span className="absolute -top-2 -right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900 text-xs font-extrabold shadow-premium border border-slate-100 num-fa">
              {["۰", "۱", "۲", "۳"][index]}
            </span>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full ${t.chip} text-[11px] font-bold px-2.5 py-0.5 mb-2`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
          {badge}
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{title}</h3>
        <p
          className={`mt-2 text-sm sm:text-base text-slate-600 leading-relaxed ${
            center ? "lg:max-w-xs" : "max-w-xs"
          }`}
        >
          {body}
        </p>
      </li>
    </Reveal>
  );
}
